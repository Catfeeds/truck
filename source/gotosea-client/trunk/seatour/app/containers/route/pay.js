import React, { Component } from 'react';
import{
	Platform,
	Dimensions,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Image,
} from 'react-native';

import Tool from 'utils/tool';

let { width, height } = Dimensions.get('window');
import MyButton from 'components/common/button';
import * as wechat from 'react-native-wechat';
import Alipay from 'react-native-payment-alipay';

let paysi;

export default class Pay extends Component{
	constructor(props){
		super(props);
		let { orderDetail } = this.props;
		let array = orderDetail.restTime.split(':');
    this.state = {
			loading: false,
			type: null,
			m: array[1],
			s: array[2],
    }
	}
	static defaultProps = {
		si: null,
	}
	componentWillMount() {
		let { si } = this.props;
		let { m, s } = this.state;
	  paysi = setInterval(()=>{
			if(s > 0)s--;
			else s = 59,m --;
			if(m < 0) s=0,m=0,clearInterval(paysi);
			this.setState({m,s});
		},1000);
	}
	componentWillUnmount(){
		if(paysi)
		 clearInterval(paysi);
	}
	changePayType( type ){
		this.setState({type});
	}
	pay(){
		let { type } = this.state;
		let { orderDetail } = this.props;
		if(!type){
			Tool.alert('请选择支付方式');
			return;
		}
		let params = {
			sign: orderDetail.sign,
			orderNo: orderDetail.orderNo,
			payFee: orderDetail.payFee,
			payType: type
		}
		this.setState({loading:true});
		if( type == 1 ){
			Tool.fetch(null, `${config.appUrlPath}rest/order/pay`,'post', params,(ret)=>{
				Alipay.pay(ret)
					.then(
						()=>{ Tool.to('paySuccess',{orderDetail}) },
						()=>{ Tool.alert('支付失败') }
					)
					.finally( ret => this.setState({loading:false}) );
			})
		}else{
			Tool.fetch(null, `${config.appUrlPath}rest/order/pay`,'post', params,(ret)=>{
				let p = {
					partnerId: ret.partnerid,
					prepayId: ret.prepayid,
					nonceStr: ret.noncestr,
					timeStamp: ret.timestamp,
					package: ret.package,
					sign: ret.sign,
				}
				wechat.pay(p)
					.then(ret=>{
						Tool.to('paySuccess',{orderDetail});
					})
					.finally( ret => this.setState({loading:false}) );
			})
		}

	}
	render(){
		let { orderDetail } = this.props;
		let { type, m, s, loading } = this.state;
		return(
				<ScrollView style = { styles.containers }>
					<Text style={ styles.payTime }>剩余支付时间 0:{m}:{s}</Text>

					<View style={ styles.orderVew }>
						<Text style = { styles.orderTitle }>应付金额：<Text style = { styles.price }>¥{orderDetail.payFee}</Text></Text>
						<Text style = { styles.orderTitle }>下单时间：<Text style = { styles.rightText }>{orderDetail.orderTime}</Text></Text>
						<Text style = { styles.orderTitle }>订单编号：<Text style = { styles.rightText }>{orderDetail.orderNo}</Text></Text>
					</View>

					<View style={ styles.orderVew }>
						<Text style={ styles.payTitle}>请选择支付方式</Text>
						<TouchableOpacity style={ [styles.payTypeView,{ marginBottom: 20}]} onPress={()=>this.changePayType(1)}>
							<Image source={ require('images/route/icon_zhifubao_pay.png')} style={ styles.img }/>
							<Text style={ styles.name }>支付宝支付</Text>
							{type == 1 ? <Image source={ require('images/community/btn_Ok_blue_s.png')} style={ styles.imgSel }/> : <View style = { styles.unSelect }/>}
						</TouchableOpacity>
						<TouchableOpacity style={ styles.payTypeView} onPress={()=>this.changePayType(2)}>
							<Image source={ require('images/route/icon_weixin_pay.png')} style={ styles.img }/>
							<Text style={ styles.name }>微信支付</Text>
							{type == 2 ? <Image source={ require('images/community/btn_Ok_blue_s.png')} style={ styles.imgSel }/> : <View style = { styles.unSelect }/>}
						</TouchableOpacity>
					</View>

					<MyButton
					  isLoading = { loading }
					  style = { styles.btn }
						onPress = { this.pay.bind(this)} >
							{'支付订单'}
						</MyButton>

				</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex:1,
		backgroundColor:'#f0f0f0',
	},
	payTime:{
		color: '#34a5f0',
		fontSize: 14,
		padding: 15,
		alignSelf: 'center'
	},
	orderVew:{
		padding: 15,
		paddingBottom: 0,
		backgroundColor: '#ffffff',
		marginBottom: 10,
	},
	orderTitle:{
		color:'#acacac',
		fontSize: 14,
		paddingBottom: 15,
	},
	price:{
		fontSize: 18,
		color: 'red',
	},
	rightText:{
		color: '#323232',
	},
	payTitle:{
		fontSize: 14,
		color: '#323232',
		paddingBottom: 20,
	},
	payTypeView:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	img:{
		width: 29,
		height: 29,
	},
	imgSel:{
		width: 16,
		height: 16,
	},
	name: {
		flex: 1,
		color: '#323232',
		fontSize: 14,
		paddingLeft: 12,
	},
	btn:{
		margin: 40,
	},
	unSelect:{
		width: 16,
		height: 16,
		borderRadius: 8,
		borderColor: '#bdbdbd',
		borderWidth: 1,
	}
});
