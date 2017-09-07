import React, { Component } from 'react';
import { connect } from 'react-redux';
import{
	Platform,
	Dimensions,
	View,
	TouchableOpacity,
	TextInput,
	Image,
	Text
} from 'react-native';


import Loading from 'components/common/loading';
import Tool from 'utils/tool';
import SeaListView from 'components/sea-listview';

import routeListStyle from 'styles/route/route-list';

let { width, height } = Dimensions.get('window');



/**
 * type	Integer	服务类型：海岛游(2001),海钓(2002),租船(1001),饵料(1002),住宿(1003),餐饮(1004),烧烤(1005),露营(1006),潜水(1007),
 * category	Integer	服务类别：1单品服务，不显示；2线路游，显示
*/
class CollectRoute extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading_visible: false,
			datas:[],
			paging: {
				pageNumber: 1,
				totalPages: 1,
			}
		}
	}
	componentWillMount() {

			this.load(1);
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
		if( data.type == 2001 || data.type == 2002){
			Tool.to('routeDetail',{routeId: data.id})
		}else if( data.type == 1001 ){
			Tool.to('fishingDetail',{routeId: data.id})
		}else{
			Tool.alert('未知服务');
		}
	}
	getRenderRow(data, sectionID, rowID){
		return (
			<TouchableOpacity style = {routeListStyle.cell} onPress = { this.toDetail.bind(this, data) }>
				<Image source={{uri: data.thumbnail || 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ routeListStyle.thumbnail }>
					<View style={ routeListStyle.typeView}>
						{ data.category == 2 && <Text style={ routeListStyle.typeText}>{'线路游 | '+data.destination}</Text>}
					</View>
					<View style={ routeListStyle.priceView}>
							<Text style={ routeListStyle.priceText}>¥<Text style={ routeListStyle.price}>{data.price}</Text>起</Text>
					</View>
				</Image>
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
	render(){
		let me = this;
		let { datas, paging } = this.state;
		return(
			<View style = {{flex:1, backgroundColor:'#f0f0f0'}}>
				<Loading  visible={this.state.loading_visible} />
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

}))(CollectRoute)
