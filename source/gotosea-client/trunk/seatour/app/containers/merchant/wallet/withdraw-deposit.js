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
import BorderLine from 'components/common/border-line';

import Tool from 'utils/tool';

export default class WithdrawDeposit extends Component{
	constructor(props) {
 		super(props);
		this.state = {
			totalMoney: props.detail.totalMoney,
			bank: null,
			bankImg: null,
			money: null,
		};
	}
	componentWillMount(){

	}
	componentWillReceiveProps(props){
    let{ bank, bankImg } = props;
    this.setState({bank, bankImg});
  }
	submit(){
		let { bank, money, totalMoney } = this.state;
		if( !bank ){
			Tool.alert('请选择银行卡');
			return;
		}
		if( !money ){
			Tool.alert('请输入提现金额');
			return;
		}
		if( money > totalMoney ){
			Tool.alert('提现金额输入有误');
			return;
		}
		let params = {
			money,
			cardId: bank.id,
		}
		Tool.fetch(null, `${config.appUrlPath}rest/wallet/withdraw`,'post',params,(ret)=>{
			this.setState({
				totalMoney: totalMoney - money,
				money: null,
			},()=>Tool.to('withdrawSuccess'));
		})
	}
	render(){
		let { bank, bankImg, money, totalMoney } = this.state;
		return (
			<ScrollView style={ styles.containers }>
				<TouchableOpacity style = { styles.txView} onPress={()=>{Tool.to('bankList',{bank})}}>
					{
						bank && <View style = { {flexDirection: 'row', alignItems: 'center'}}>
											<Image source = { bankImg } style = { styles.bankLogo }/>
											<View>
												<Text style = { styles.bankName }>{bank.bankName}</Text>
												<Text style = { styles.bankNo }>{`尾号${bank.cardNo}储蓄卡`}</Text>
											</View>
										</View>
					}
					{ !bank && <Text style = { styles.selTip}>请选择银行卡</Text>}
					<Image source = {require('images/merchant/btn_right_arrow.png')} style = { styles.rightImg }/>
				</TouchableOpacity>
				<View style = { styles.content }>
					<Text style = { styles.title }>提现金额</Text>
					<View style = {styles.moneyView }>
						<Text style={ styles.moneyIco }>¥</Text>
						<View style = { styles.textContent }>
	            <TextInput
	              defaultValue= { money && String(money) }
	              placeholder=""
	              underlineColorAndroid='transparent'
	              selectionColor='#34a5f0'
	              clearButtonMode='while-editing'
								keyboardType = 'numeric'
	              onChangeText={(text)=>{ this.setState({money:text})}}
	              style={styles.inputText}
	            />
	          </View>
					</View>
					<View style = { styles.tipView}>
						<Text style={ styles.tip }>可提现金额{totalMoney}元</Text>
						<TouchableOpacity onPress={ ()=>this.setState({money: totalMoney})}>
							<Text style={ styles.all }>全部提现</Text>
						</TouchableOpacity>
					</View>
				</View>
				<MyButton
					style = {styles.tixiang}
					onPress= { this.submit.bind(this) }>
					提现
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
		backgroundColor: '#ffffff',
		padding: 10,
	},
	tixiang:{
		margin: 20,
	},
	title:{
		fontSize: 14,
		color: '#323232',
		marginTop: 10,
		marginBottom: 40,
	},
	moneyView:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	moneyIco:{
		width: 30,
		paddingLeft: 5,
		fontSize: 24,
		color: '#323232',
	},
	textContent: {
		flex: 1,
		height: 50,
		borderColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	inputText: {
		flex: 1,
		paddingLeft: 10,
		fontSize: 24,
	},
	tipView:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		marginBottom: 10,
	},
	tip:{
		color: '#acacac',
		fontSize: 16,
	},
	all:{
		fontSize: 16,
		color: '#34a5f0',
	},
	txView:{
		height: 100,
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: '#34a5f0',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rightImg:{
		width: 10,
		height: 18,
	},
	selTip:{
		fontSize: 15,
		color: '#ffffff',
	},
	bankLogo:{
		width: 29,
		height: 29,
		marginRight: 15,
	},
	bankName:{
		fontSize: 14,
		color: '#ffffff',
		marginBottom: 7,
	},
	bankNo:{
		fontSize: 18,
		color: '#ffffff',
	}
})
