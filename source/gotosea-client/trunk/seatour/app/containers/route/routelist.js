import React, { Component } from 'react';
import { connect } from 'react-redux';
import{
	Platform,
	Dimensions,
	View,
	TouchableOpacity,
	TextInput,
	Image,
	ImageBackground,
	Text
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Dropdown from '../../components/common/dropdown';
import DropdownLinkage from '../../components/common/dropdown-linkage';

import Loading from '../../components/common/loading';
import Tool from '../../utils/tool';
import SeaListView from '../../components/sea-listview';
import routeListStyle from 'styles/route/route-list';

let { width, height } = Dimensions.get('window');

import {
	loadList,
	updateParams
}from '../../actions/line/list'


/**
 * type	Integer	服务类型：海岛游(2001),海钓(2002),租船(1001),饵料(1002),住宿(1003),餐饮(1004),烧烤(1005),露营(1006),潜水(1007),
 * category	Integer	服务类别：1单品服务，不显示；2线路游，显示
*/
class RouteList extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading_visible: false,
			searchText: null,
			type: null,
			city: null,
			orderType: null,
			types: [],
			citys: [],
			datas: [],
			paging: {
				pageNumber: 1,
				totalPages: 1,
			}
		}
	}
	componentWillMount() {
			let me = this,
				{
					projectType,
					destination,
				} = this.props;
	    Actions.refresh({
					//rightButtonImage: require('../../images/common/btn_ditu.png'),
          // rightTitle: '搜索',
          // rightButtonTextStyle: { color: '#34a5f0'},
	        // onRight: () => {
	        //     Tool.back();
	        // },
					renderTitle:()=>{
						return (
								<View style={routeListStyle.search}>
									<TextInput
										defaultValue = { destination }
										editable = { !destination }
										placeholder='搜索目的地/景点/酒店等'
										style={routeListStyle.searchText}
										returnKeyType = 'search'
										underlineColorAndroid='transparent'
										onChangeText = {(text)=>{
											me.setState({searchText:text});
										}}
										onSubmitEditing = {(a,b,c)=>{
											me.load()
										}}
								/>
						</View>)
					}
	    });

			Tool.fetch(null,`${config.appUrlPath}rest/prod/serveType`,'get',null,(ret)=>{
				this.setState({
					types:ret,
				});
			});

			Tool.fetch(null,`${config.appUrlPath}rest/local/route`,'get',null,(ret)=>{
				this.setState({
					citys: ret,
				});
			});
		// if( !!destination ) this.setState({ searchText : destination}, () => this.load(1))
		this.load(1)
	}
	//flag: 1加载第一页，2加载更多
	load(flag){
		let { datas, paging, searchText, type, city, orderType} = this.state;
		let p = paging.pageNumber;
		if(flag == 1)
			p = 1;
		else if(flag == 2)
			p = p+1;

		let params = {
			page: p,
		}
		if(type)params['type'] = type;
		if(city)params['city'] = city;
		if(orderType)params['orderType'] = orderType;
		if(searchText)params['word'] = searchText;
		Tool.fetch(null,`${config.appUrlPath}rest/prod/serves`,'get',params,(ret)=>{
			paging.pageNumber = ret.pageNumber;
			paging.totalPages = ret.totalPages;
			let p = [];
			if(flag == 1)p = ret.content || [];
			else p = datas.concat(ret.content);
			this.setState({
				datas: p,
				paging: paging,
			});
		});
	}
	toDetail( data ){
		let { projectType } = this.props;
		if( data.type == 2001 || data.type == 2002){
			Tool.to('routeDetail',{routeId: data.id})
		}else if( data.type == 1001 ){
			// Tool.to('fishingDetail', {})
			Tool.to('fishingDetail',{routeId: data.id, projectType })
		}else{
			Tool.alert('未知服务');
		}
	}
	getRenderRow(data, sectionID, rowID){
		return (
			<TouchableOpacity style = {routeListStyle.cell} onPress = { this.toDetail.bind(this, data) }>
				<ImageBackground source={{uri: data.thumbnail || 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ routeListStyle.thumbnail }>
					<View style={ routeListStyle.typeView}>
						{ data.category == 2 && <Text style={ routeListStyle.typeText}>{'线路游 | '+data.destination}</Text>}
					</View>
					<View style={ routeListStyle.priceView}>
							<Text style={ routeListStyle.priceText}>¥<Text style={ routeListStyle.price}>{data.price}</Text>起</Text>
					</View>
				</ImageBackground>
				<View style={routeListStyle.routeDetail}>
					<View>
						<Text style = {routeListStyle.routeName}>{data.name}</Text>
						<View style={{ flexDirection: 'row'}}>
							{
								data.tags && data.tags.map((v,k)=>{
									return <Text key = {'r-tag'+k} style={routeListStyle.tagText}>{v}</Text>
								})
							}
						</View>
					</View>
					{ data.soldNum > 0 && <Text style = { routeListStyle.soldNum}>{'预约数'+data.soldNum}</Text>}
				</View>
			</TouchableOpacity>
		)
	}
	getTitle(value, index){
		return (
			<View style = {{ flexDirection: 'row', alignItems:'center'}}>
				<Text>{value}</Text>
				<Image source={require('../../images/common/btn_tuijian.png')}  style={ routeListStyle.titleImg}/>
			</View>
		)
	}
	render(){
		let me = this;
		let { datas, paging, types, citys, type, city, orderType} = this.state,
			{ destination } = this.props;
		return(
			<View style = {{flex:1, backgroundColor:'#f0f0f0'}}>
				<Loading  visible={this.state.loading_visible} />
				{
						!destination && <View style={ routeListStyle.dropMenu}>
							<Dropdown
								style={ routeListStyle.dropMenuItem }
								dropdownStyle = { routeListStyle.dropdownStyle }
								textStyle = { routeListStyle.titleStyle }
								dropdownTextStyle = { routeListStyle.dropdownTextStyle }
								options={ types }
								defaultIndex={-1}
								defaultValue={'类型'}
								renderTitle = { this.getTitle.bind(this)}
								onSelect = {(key, value)=>{
									me.setState({type:key},()=>{me.load(1)});
								}}
							/>
							<DropdownLinkage
								style={ routeListStyle.dropMenuItem }
								textStyle = { routeListStyle.titleStyle }
								dropdownStyle = { routeListStyle.dropdownStyle }
								dropdownTextStyle = { routeListStyle.dropdownTextStyle }
								dropdownLeftTextStyle = {{ paddingLeft: 25 }}
								options={ citys }
								defaultIndex={-1}
								defaultValue={'区域位置'}
								renderTitle = { this.getTitle.bind(this)}
								onSelect={(key, value)=>{
									me.setState({city:key},()=>{me.load(1)});
								}}
							/>
							<Dropdown
								style={ routeListStyle.dropMenuItem }
								textStyle = { routeListStyle.titleStyle }
								dropdownStyle = { routeListStyle.dropdownStyle }
								dropdownTextStyle = { routeListStyle.dropdownTextStyle }
								options={[{key:0, value:'智能排序'}, {key:1, value:'好评优先'}, {key:2, value:'人气最高'}]}
								defaultIndex={0}
								defaultValue={'智能排序'}
								renderTitle = { this.getTitle.bind(this)}
								onSelect={(key, value)=>{
									me.setState({type:orderType},()=>{me.load(1)});
								}}
							/>
					</View>
				}
				<SeaListView
					style = { routeListStyle.listview}
					data = {datas}
					paging = {paging}
					renderRow = { this.getRenderRow.bind(this) }
					loadMore = {this.load.bind(this,2)}
					loadFirst = {this.load.bind(this,1)}
				/>
				</View>
		)
	}
}

export default connect(state =>({
	list: state.line.list.list,
}))(RouteList)
