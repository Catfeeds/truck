import React, { Component } from 'react';
import{
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
}from 'react-native';

import MyButton from 'components/common/button';


import Tool from 'utils/tool';

export default class WithdrawSuccess extends Component{
	constructor(props) {
 		super(props);
	}
	componentWillMount(){

	}
	render(){
		return (
			<ScrollView style={ styles.containers }>
				<View style = { styles.content }>
					<Image source={ require('images/merchant/icon_ok_big.png')} style = { styles.img }/>
					<Text style = { styles.text }>提现申请已经提交</Text>
					<Text style = { styles.text }>预计两个小时内到账，请耐心等待。</Text>
				</View>
				<MyButton
					style = {styles.back}
					onPress= { ()=>{
						Tool.back( { popNum:2, refresh: ({doRefresh: true}) } )
					} }>
					返回钱包
				</MyButton>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	content:{
		alignItems:'center',
		justifyContent: 'center',
		marginTop: 50,
		marginBottom: 15,
	},
	text:{
		fontSize: 20,
		color: '#323232',
		marginBottom: 15,
	},
	img:{
		width: 100,
		height: 100,
		marginBottom: 30,
	},
	back:{
		margin: 20,
	}
})
