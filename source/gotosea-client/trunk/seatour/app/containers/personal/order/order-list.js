import React, { Component } from 'react';
import{
	ScrollView,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Text,
} from 'react-native';

import Tool from 'utils/tool';
import Loading from 'components/common/loading';
import SeaListView from 'components/sea-listview';
import {Actions} from 'react-native-router-flux';

export default class OrderList extends Component{
	constructor(props){
		super(props);
    this.state = {
			typeId: 0,
			paging: {
				pageNumber: 1,
				totalPages: 1,
			},
			datas: [{type:1},{type:1},{type:2},{type:2}],
    }
	}
	componentWillMount() {

	}
	//flag: 1加载第一页，2加载更多
	load(flag){
		let { datas, paging, typeId} = this.state;
		let p = paging.pageNumber;
		if(flag == 1)
			p = 1;
		else if(flag == 2)
			p = p+1;

		let params = {
			page: p,
		}
		if(typeId)params['type'] = typeId;
		// Tool.fetch(null,`${config.appUrlPath}rest/prod/serves`,'get',params,(ret)=>{
		// 	paging.pageNumber = ret.pageNumber;
		// 	paging.totalPages = ret.totalPages;
		// 	let p = [];
		// 	if(flag == 1)p = ret.content || [];
		// 	else p = datas.concat(ret.content);
		// 	this.setState({
		// 		datas: p,
		// 		paging: paging,
		// 	});
		// });
	}
	typeChange( typeId ) {
		this.setState({typeId},()=>{
			this.load();
		})
	}
	getRenderRow(data){
		return <View style = { styles.item }>
						<View style = { styles.orderTop }>
							<Text style = { styles.orderNo }>订单编号：664646464646464</Text>
							<Text style = { styles.orderStatus }>已完成</Text>
						</View>
						{
							data.type == 1 && <TouchableOpacity style = { styles.detail } onPress = { ()=>{ Tool.to('orderDetail')}}>
																	<Text style = { styles.orderNo }> 阿斯顿积分辣豆腐沙拉放到家了</Text>
																	<Text style = { styles.text }>【订单类型】 线路订单</Text>
																	<Text style = { styles.text }>【出发日期】 2017-06-22</Text>
																	<Text style = { styles.text }>【出行人数】 5人</Text>
																	<View style = { styles.priceView }>
																		<Text style = { styles.text }>【购买数量】 1份</Text>
																		<Text style = { styles.price }>¥12345</Text>
																	</View>
																</TouchableOpacity>
						}
						{
							data.type == 2 && <TouchableOpacity style = { styles.detail }>
																	<Text style = { styles.orderNo }> 阿斯顿积分辣豆腐沙拉放到家了</Text>
																	<Text style = { styles.text }>【订单类型】 活动订单</Text>
																	<Text style = { styles.text }>【出发日期】 2017-06-22</Text>
																	<View style = { styles.priceView }>
																		<Text style = { styles.text }>【出行人数】 4人</Text>
																		<Text style = { styles.price }>¥12345</Text>
																	</View>
																</TouchableOpacity>
						}
						<View style = { styles.btoTool }>
							<TouchableOpacity style = { styles.btoToolView } onPress={()=>Tool.to('orderEvaluate')}>
								<Text style = { styles.toolText }>{data.type == 1 ? '评价晒图' : '去付款'}</Text>
							</TouchableOpacity>
						</View>
					 </View>;
	}
	render(){
		let { datas,typeId, paging } = this.state;
		return(
				<View style = {{flex:1, backgroundColor:'#f0f0f0'}}>
					<Loading  visible={this.state.loading_visible} />
					<View style = { styles.typeTool }>
						<TouchableOpacity style = { [styles.typeView, typeId == 0 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 0)}>
							<Text style = { [styles.typeScreen, typeId == 0 && styles.typeSel] }>全部</Text>
						</TouchableOpacity>
						<TouchableOpacity style = { [styles.typeView, typeId == 1 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 1)}>
							<Text style = { [styles.typeScreen, typeId == 1 && styles.typeSel] }>待支付</Text>
						</TouchableOpacity>
						<TouchableOpacity style = { [styles.typeView, typeId == 2 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 2)}>
							<Text style = { [styles.typeScreen, typeId == 2 && styles.typeSel] }>待出行</Text>
						</TouchableOpacity>
						<TouchableOpacity style = { [styles.typeView, typeId == 3 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 3)}>
							<Text style = { [styles.typeScreen, typeId == 3 && styles.typeSel] }>待评价</Text>
						</TouchableOpacity>
						<TouchableOpacity style = { [styles.typeView, typeId == 4 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 4)}>
							<Text style = { [styles.typeScreen, typeId == 4 && styles.typeSel] }>退款</Text>
						</TouchableOpacity>
					</View>
					<View style = { styles.content }>
						<SeaListView
							data = {datas}
							paging = {paging}
							renderRow = { this.getRenderRow.bind(this) }
							loadMore = {this.load.bind(this,2)}
							loadFirst = {this.load.bind(this,1)}
						/>
					</View>
				</View>
		)
	}
}

const styles = StyleSheet.create({
	typeTool:{
		backgroundColor: '#ffffff',
		flexDirection: 'row',
		justifyContent: 'center',
		height: 40,
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
	},
	typeScreen:{
		width: 50,
		fontSize: 14,
		color: '#323232',
		textAlign: 'center',
	},
	typeSel: {
		color: '#34a5f0',
	},
	typeView:{
		marginLeft: 10,
		marginRight: 10,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	typeViewSel: {
		borderBottomWidth: 2,
		borderColor: '#34a5f0',
	},
	tipView:{
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	content:{
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	item:{
		backgroundColor: '#ffffff',
		marginBottom: 10,
	},
	orderTop:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
	orderNo:{
		fontSize: 14,
		color: '#323232',
	},
	orderStatus:{
		fontSize: 14,
		color: '#34a5f0',
		paddingLeft: 10,
	},
	text:{
		fontSize: 12,
		lineHeight: 20,
		color: '#323232',
	},
	price:{
		fontSize: 18,
		color: '#323232',
	},
	detail:{
		paddingTop: 10,
		paddingLeft: 18,
		paddingRight: 15,
		paddingBottom: 6,
		backgroundColor: '#f0f0f0',
	},
	priceView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	btoTool:{
		backgroundColor: '#ffffff',
		padding: 15,
		alignItems: 'flex-end',
	},
	btoToolView:{
		width: 70,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#34a5f0',
		borderWidth: 1,
	},
	toolText:{
		fontSize: 12,
		color: '#34a5f0',
	}
});
