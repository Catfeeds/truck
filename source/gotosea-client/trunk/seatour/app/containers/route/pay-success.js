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

import Tool from 'utils/tool';
import MyButton from 'components/common/button';
import BorderLine from 'components/common/border-line';
import {Actions} from 'react-native-router-flux';

export default class PaySuccess extends Component{
	constructor(props) {
 		super(props);
	}
	componentWillMount(){
		Actions.refresh({
      onBack: () => {
        Tool.back({popNum:2})
      },
    });
	}
	render(){
		let { orderDetail } = this.props;
		return (
			<ScrollView style={ styles.containers }>
				<View style = { styles.detail }>
					<View style = { styles.jsCenter }>
						<Image source={require('images/route/icon_chenggong.png')} style={ styles.img }/>
						<Text style = { [styles.title,{fontSize: 18}] }>您已付款成功</Text>
					</View>
					<Text style = { styles.text }>订单已提交，我们会尽快与您确认</Text>
					<Text style = { styles.text }>请您耐心等待</Text>
				</View>
				<Text style = { [styles.title, styles.tjTitile ] }>{orderDetail.remark}</Text>
				<BorderLine />
				<View style = { styles.orderDetail }>
					<Text style = { styles.text }>总 金  额：<Text style = {{color: '#f64203'}}>¥{orderDetail.payFee}</Text></Text>
					<Text style = { styles.text }>订单类型：{orderDetail.orderTypeDesc}</Text>
					<Text style = { styles.text }>出行日期：{orderDetail.departureTime}</Text>
					<Text style = { styles.text }>出行人数：{orderDetail.travelersNum}人</Text>
					<Text style = { styles.text }>购买数量：{orderDetail.num}份</Text>
					<Text style = { styles.text }></Text>
				</View>
				<MyButton
					style = {{ margin: 15, marginTop: 40}}
					onPress= {()=>{Tool.to('orderDetail')}}>
					查看订单
				</MyButton>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex: 1,
		backgroundColor: '#ffffff',
	},
	detail:{
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		padding: 25,
	},
	jsCenter:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
	},
	title: {
		fontSize: 15,
		color: '#323232',
	},
	img:{
		width: 26,
		height: 26,
		marginRight: 10,
	},
	text:{
		fontSize: 14,
		color: '#323232',
		lineHeight: 25,
	},
	orderDetail:{
		padding: 15,
		paddingTop: 10,
	},
	tjTitile:{
		padding: 15,
	},
})
