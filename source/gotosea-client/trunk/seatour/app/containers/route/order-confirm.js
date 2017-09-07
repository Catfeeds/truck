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
	TextInput,
} from 'react-native';

import Tool from 'utils/tool';
import { Calendar } from 'react-native-calendars';
import IconSpan3 from 'components/common/icon-span3';
import InputItem from 'components/common/input-item';
import OrderTool2 from 'components/route/order-tool2';
import Participant from 'components/route/participant';

let { width, height } = Dimensions.get('window');

export default class OrderConfirm extends Component{
	constructor(props){
		super(props);
		let { departure, time, num, allprice } = props;
    this.state = {
			departure: departure,
			time: time,
			num: num,
			originalPrice: allprice,  //原价
			price: allprice,          //抵扣后的价格
			name: null,
			phone: null,
			remark: null,
			participantList:[],
			participantIds: [],
			couponId1: null,  //代金券
			couponId2: null, //满减券
			coupon1: null,
			coupon2: null,
			discountAmount: null,
    }
	}
	componentWillReceiveProps(props){
		let { price, originalPrice } = this.state;
		let { participantIds, participantList, couponId1, couponId2, coupon1, coupon2, discountAmount} = props;
		price = originalPrice;
		if(discountAmount)price -= discountAmount;
		this.setState({
			participantIds,
			participantList,
			couponId1,
			couponId2,
			coupon1,
			coupon2,
			discountAmount,
			price,
		})
	}
	componentWillMount() {

	}
	submit(){
		let { detail } = this.props;
		let{departure, time, num, name, phone, remark, participantIds, couponId1,couponId2 } = this.state;

		if(!name || !phone){
			Tool.alert('请填写联系人信息');
			return;
		}else if( participantIds.length != num){
			Tool.alert(`请添加${num}个被保人`);
			return;
		}
		else{
			let params = {
				id: detail.id,
				departure: departure+' '+time,
				num: num,
				contacter: name,
				contacterPhone: phone,
				contacterRemark: remark,
				togethers: participantIds,
			}
			if(couponId1)params['voucher'] = couponId1;
			if(couponId2)params['coupon'] = couponId2;
			Tool.fetch(null, `${config.appUrlPath}rest/order/route`,'post', params,(ret)=>{
				Tool.to('pay',{orderDetail: ret })
			})
		}
	}
	/**
	 * [删除保险人]
	 * @return {[type]}    [description]
	 */
	delparticipant( ob ){
		let { participantList, participantIds } = this.state;

		let index = participantList.indexOf(ob);
		let idIndex = participantIds.indexOf(ob.id);
		participantList.splice(index,1);
		participantIds.splice(idIndex,1);

		this.setState({
			participantIds,
			participantList,
		});
	}
	render(){
		let { detail } = this.props;
		let { departure, time, num, originalPrice, price, participantList, participantIds, couponId1, couponId2, coupon1, coupon2, discountAmount } = this.state;
		return(
			<View style = { styles.parentsView }>
				<ScrollView style = {{flex:1, backgroundColor:'#f0f0f0'}}>

					<View style={ styles.orderDetail }>
						<Text style={ styles.name }>{ detail.name }</Text>
						<Text style={ styles.desText }>出行日期：{ departure+' '+time }</Text>
						<Text style={ styles.desText }>购买数量：{num}份</Text>
						<View style={ styles.borerBto }/>
						<Text style={ [styles.name,{ marginBottom: 10}] }>此服务需二次确认</Text>
						<Text style={ [styles.desText,{ lineHeight: 20}] }>付款后平台将在4个工小时内核实是否有位，若核实无位或超时未确认，将自动退款</Text>
					</View>

					<Participant
						style = {{ marginBottom: 10}}
						datas = { participantList }
						del = { this.delparticipant.bind(this) }
						btnText = {`请添加${num}位被保人`}
						add = { ()=>{ Tool.to('participantList',{ids: participantIds, selectDates:participantList}) } } />

					<View style={ styles.orderDetail }>
						<Text style={ [styles.insuranceTitle, styles.lxr] }>联系人信息</Text>
						<View style={ [styles.borerBto,{ marginBottom: 10}] }/>
						<InputItem
							title = {'联  系 人'}
							style = {{ height: 38 }}
							titleStyle = {{color: '#acacac'}}
							placeholder = { '请输入联系人' }
							onChangeText = { (text)=>this.setState({name: text}) }/>
						<InputItem
								title = {'手机号码'}
								style = {{ height: 38 }}
								titleStyle = {{color: '#acacac'}}
								placeholder = { '手机号码' }
								keyboardType = {'numeric'}
								onChangeText = { (text)=>this.setState({phone: text}) }/>
						 <InputItem
									title = {'备      注'}
									style = {{ height: 38 }}
									titleStyle = {{color: '#acacac'}}
									placeholder = { '请输入备注' }
									onChangeText = { (text)=>this.setState({remark: text}) }/>
					</View>

					<View style={ [styles.orderDetail, { paddingBottom: 5}] }>
						<Text style={ [ styles.insuranceTitle, styles.lxr] }>优惠信息</Text>
						<View style={ [styles.borerBto,{ marginBottom: 10}] }/>
						<IconSpan3
							title = {'使用优惠券'}
							defaultText = { '请选择优惠券' }
							text = { discountAmount ? `-${discountAmount}` : null }
							textStyle = {{ color:'red'}}
							click = {()=>Tool.to('selectCoupon',{id:detail.id, money:originalPrice,couponId1, couponId2, coupon1, coupon2, discountAmount})}/>
					</View>

					<View style={ styles.xy}>
						<Text style={ styles.insuranceAssist}>点击“提交订单”表示已经阅读并同意</Text>
						<TouchableOpacity><Text  style={ styles.insuranceAssist}>《海约服务使用协议》</Text></TouchableOpacity>
					</View>

				</ScrollView>

				<OrderTool2
					text = { '总价' }
					orderText = { '提交订单' }
					allprice = { price }
					order = {this.submit.bind(this) }
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	parentsView: {
		width: width,
		height: Platform.OS == 'ios' ? height-64 : height - 76,
	},
	orderDetail:{
		backgroundColor: '#ffffff',
		padding: 15,
		marginBottom: 10,
	},
	name:{
		fontSize: 16,
		fontWeight: 'bold',
		color: '#323232',
		marginBottom: 15,
	},
	desText:{
		fontSize: 14,
		color: '#323232',
		marginBottom: 15,
	},
	borerBto:{
		height: 0.5,
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
		marginBottom: 20,
	},
	lxr:{
		marginBottom: 15,
	},
	chunk: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 40,
	},
	nameFq: {
		width: 60,
		marginRight: 10,
		fontSize: 14,
		color: '#acacac',
	},
	textStyle: {
		flex: 1,
		fontSize: 14,
		color: '#323232',
	},
	xy:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20,
		paddingTop: 10,
	},
	insuranceTitle:{
		color: '#323232',
		fontSize: 14,
	},
	insuranceAssist:{
		fontSize: 12,
		color: '#acacac',
	},
});
