import React, { Component } from 'react';
import{
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
}from 'react-native';

import MyButton from 'components/common/button';
import BorderLine from 'components/common/border-line';
import ContentRow3 from 'components/order/content-row3';
import SeaListView from 'components/sea-listview';

import Tool from 'utils/tool';

export default class MerchantIncomeDetail extends Component{
	constructor(props) {
 		super(props);
		this.state = {

		};
	}
	componentWillMount(){
		// Tool.fetch(null,`${config.appUrlPath}rest/prod/serves`,'get',params,(ret)=>{
		//
		// });
	}

	render(){
		let { datas,paging } = this.state;
		return (
			<ScrollView style={ styles.containers }>
				<View style = { styles.top }>
					<Text style = { styles.typeName }>收入</Text>
					<Text style = { styles.amount }>6000.00</Text>
				</View>
				<BorderLine />
				<View style = { styles.btom }>
					<ContentRow3 title = {'类型'} text = '收入' titleStyle = {{flex: 0, width: 60}} textStyle={{flex:1}}/>
					<ContentRow3 title = {'时间'} text = '2017-22-22 12:23:00' titleStyle = {{flex: 0, width: 60}} textStyle={{flex:1}}/>
					<ContentRow3 title = {'交易号'} text = '123456789' titleStyle = {{flex: 0, width: 60}} textStyle={{flex:1}}/>
					<ContentRow3 title = {'备注说明'} text = '订单表红领巾阿迪力地方' titleStyle = {{flex: 0, width: 60}} textStyle={{flex:1}}/>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex: 1,
		backgroundColor: '#ffffff',
	},
	top:{
		height: 110,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	typeName:{
		fontSize: 14,
		color: '#acacac',
	},
	amount: {
		fontSize: 36,
		color: '#ff0000'
	},
	btom: {
		padding: 10,
	}
})
