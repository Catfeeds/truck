import React, { Component } from 'react';
import{
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
}from 'react-native';

import Tool from 'utils/tool';
import MyButton from 'components/common/button'
import BorderLine from 'components/common/border-line'


export default class OrderRefund extends Component{
	constructor(props) {
 		super(props);
	}
	componentWillMount(){

	}
	render(){
		return (
			<ScrollView style={ styles.containers }>
				<Text style = { styles.tip }>提交退款申请后，我们会在1-7个工作日内为您退款，请耐心等待。</Text>
				<View style = { styles.detail }>
					<Text style = { [styles.title,{marginBottom: 10}] }>邓丽君阿道夫了活动</Text>
					<Text style = { styles.text }>订单支持部分出行人退订</Text>
					<Text style = { styles.text }>出行前1天0点（含）之后退订，收取100%违约金</Text>
					<Text style = { styles.text }>平台原因造成用户损失，可全额退款</Text>
				</View>
				<View style={{height: 10,backgroundColor:'#f0f0f0'}}/>
				<Text style = { [styles.title, styles.tjTitile ] }>退款金额</Text>
				<BorderLine />
				<View style = { styles.priceView }>
					<Text style = { styles.title }>可退金额</Text>
					<Text style = { [styles.title, { color: 'red'}] }>{`¥${500}`}</Text>
				</View>
				<MyButton
					style = {{ margin: 15, marginTop: 40}}
					onPress= {()=>{}}>
					提交申请
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
	tip:{
		backgroundColor: '#f0f0f0',
		fontSize: 14,
		color: '#323232',
		padding: 15,
		lineHeight: 20,
	},
	detail:{
		backgroundColor: '#ffffff',
		padding: 15,
	},
	title: {
		fontSize: 16,
		color: '#323232',
	},
	text:{
		fontSize: 12,
		color: '#646464',
		lineHeight: 18,
	},
	priceView:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
	},
	tjTitile:{
		padding: 15,
	}
})
