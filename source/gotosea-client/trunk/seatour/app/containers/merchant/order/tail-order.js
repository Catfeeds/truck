import React, { Component } from 'react';
import{
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
}from 'react-native';

import SeaListView from 'components/sea-listview';
import ContentRow from 'components/order/content-row';
import ContentRow2 from 'components/order/content-row2';
import BorderLine from 'components/common/border-line';
import Tool from 'utils/tool';

import orderStyles from 'styles/order/order';

export default class TailOrder extends Component{
	constructor(props) {
 		super(props);
		this.state = {
			tabIndex : 0,
			paging: {
				pageNumber: 1,
				totalPages: 1,
			},
			datas: [{},{},{},{}],
		};
	}
	componentWillMount(){
		//this.load();
	}
	//flag: 1加载第一页，2加载更多
	load(flag){
		let { datas, paging} = this.state;
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
			this.setState({
				datas: ret.content,
				paging: paging,
			});
		});
	}
	getRenderRow(data, sectionID, rowID){
		return (
			<View style = { orderStyles.item } >
				<TouchableOpacity style = { orderStyles.itemContent } onPress={()=>Tool.to('merchantOrderDetail')}>
					<ContentRow2 title = {'订单编号：'} text = '8686868' status = { '即将开始' }  style = { orderStyles.orderNo } statusStyle = {{ color:'#4dd77e'}}/>
					<ContentRow title = {'服务名称：'} text = '8686868'/>
					<ContentRow title = {'订单类型：'} text = '活动订单' />
					<ContentRow title = {'出发日期：'} text = '8686868' />
					<ContentRow title = {'购买份数：'} text = '6人' />
				</TouchableOpacity>
				<BorderLine/>
				<View style = { orderStyles.tool }>
					<View style = { orderStyles.toolLeft }>
						<Text style = { orderStyles.priceTitle }>联系人：那个谁</Text>
					</View>
					<View style = { styles.imgRight }>
						<TouchableOpacity style = { styles.imgView}>
							<Image source={require('images/merchant/btn_phone.png')}  style={ orderStyles.img }/>
						</TouchableOpacity>
						<TouchableOpacity style = { styles.imgView}>
							<Image source={require('images/merchant/btn_chat.png')}  style={ orderStyles.img }/>
						</TouchableOpacity>
					</View>
				</View>
				<BorderLine/>
			</View>
		)
	}
	render(){
		let { datas,paging } = this.state;
		return (
			<SeaListView
				style = { orderStyles.container}
				data = {datas}
				paging = {paging}
				renderRow = { this.getRenderRow.bind(this) }
				loadMore = {this.load.bind(this,2)}
				loadFirst = {this.load.bind(this,1)}
			/>
		)
	}
}

const styles = StyleSheet.create({
	imgRight:{
		width: 100,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	imgView:{
		marginRight: 10,
	},
	img:{
		width: 40,
		height: 40,
	}
})
