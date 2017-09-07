import React, { Component } from 'react';
import{
	ScrollView,
	StyleSheet,
	View,
	Text,
} from 'react-native';

import Tool from 'utils/tool';

export default class CouponExplanation extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<ScrollView style = { styles.containers }>
				<Text style = { styles.title }>优惠券种类</Text>
				<Text style = { styles.text }>1. 满减券</Text>
				<Text style = { styles.text }>    在海约平台上下单，总金额满达一定价钱可减，在支付时候体现，支付时自动结算优惠后费用。</Text>
				<Text style = { styles.text }>2. 代金券</Text>
				<Text style = { styles.text }>    在海约平台上下单支付时使用，直接扣减代金券所示优惠金额。支付时自动结算优惠后费用。</Text>
				<Text style = { styles.title }>使用规则</Text>
				<Text style = { styles.text }>1、优惠券可以用于所有平台线路（特价线路如有标示不可使用的除外）；</Text>
				<Text style = { styles.text }>2、优惠券有效期为三个月；</Text>
				<Text style = { styles.text }>3、同类型优惠券不可叠加使用，代金券与满减券可同时使用；</Text>
				<Text style = { styles.text }>4、优惠券不可赠与，只能本人使用，满减券只能发起人使用</Text>
				<Text style = { styles.text }>5、如有问题请拨打客服咨询，客服电话。</Text>
				<Text style = { styles.title }>获取渠道</Text>
				<Text style = { styles.text }>1、订单完成后可获得优惠券满减券及代金券。</Text>
				<Text style={ { height: 50} }>2、可积分换取满减券</Text>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex: 1,
		backgroundColor: '#ffffff',
		padding: 20,
		paddingTop: 0,
	},
	title:{
		fontSize: 15,
		color: '#34a5f0',
		lineHeight: 30,
		paddingTop: 20,
	},
	text: {
		fontSize: 14,
		color: '#323232',
		lineHeight: 25,
	},
});
