import React, { Component } from 'react';
import{
	ScrollView,
	StyleSheet,
	View,
	Text,
} from 'react-native';

import Tool from 'utils/tool';

export default class IntegralExplanation extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<ScrollView style = { styles.containers }>
				<Text style = { styles.title }>积分说明</Text>
				<Text style = { styles.text }>1.积分只可兑换积分商城内的物品或优惠券；</Text>
				<Text style = { styles.text }>2.积分为累计制度，使用后自动扣减，没有有效期限制；</Text>
				<Text style = { styles.text }>3.消费获得的积分按消费方式获得，如全额支付时支付人或的全额消费积分，AA支付时，每个付款人获得相应积分；</Text>
				<Text style = { styles.text }>4.如有问题如有问题请拨打客服咨询，客服电话4000042010。</Text>
				<Text style = { styles.title }>获取方式</Text>
				<Text style = { styles.text }>1.平台消费，每消费1元累计1分。</Text>
				<Text style = { styles.text }>2.出行后评价，带图评论积5分，无图评论积3分。</Text>
				<Text style = { styles.text }>3.社区发表一篇动态和活动积5分，评论积1分</Text>
				<Text style = { styles.text }>4.发布活动，订单生成且所有人付款后积100分</Text>
				<Text style = { styles.text }>5.邀请好友成为会员，100分一人/次</Text>
				<Text style = { styles.text }>6.每日签到积分，1/2/3/4/5  分/日,登录APP后自动获取。</Text>
				<Text style={ { height: 50} }></Text>
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
