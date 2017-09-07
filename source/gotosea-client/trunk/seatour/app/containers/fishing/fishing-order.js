import React, { Component } from 'react';
import{
	Platform,
	Dimensions,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Text,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Loading from 'components/common/loading';
import Tool from 'utils/tool';
import InputItem from 'components/common/input-item';
import IconSpan3 from 'components/common/icon-span3';
import OrderTool2 from 'components/route/order-tool2';
import Participant from 'components/route/participant';
import WheelPicker from 'components/common/wheel-picker';
import AccumulationSpan from 'components/common/accumulation-span'

import ButtonBar, { PrimaryButton } from 'containers/community/component/ButtonBar'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import {
		setAAProject,
	} from 'actions/activity/publish'

let { width, height } = Dimensions.get('window');


export default connect( state => ({
	projectList : state.activity.publish.AAProjects
}))(class FishingOrder extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading_visible: false,
			participantList:[],
			participantIds: [],
			point: null,
			spots: [],
			times: [],
			date: '',
			time: '',
			count: 1,
			datetime: '',
			allprice: 0,     //折扣后价格
			originalPrice: 0, //包船原价
			couponId1: null,  //代金券
			couponId2: null, //满减券
			coupon1: null,
			coupon2: null,
			discountAmount: 0, //优惠价格
		}
	}
	componentWillMount() {
		let{ detail, projectType } = this.props;
		if( !!projectType ) Actions.refresh({ title : "选择出行信息" })
		Tool.fetch(null, `${config.appUrlPath}rest/prod/charter/point/${detail.id}`,'get',null,(ret)=>{
			this.setState({spots:ret || []});
		})
	}
	componentWillReceiveProps(props){
		let { allprice, originalPrice } = this.state;
		let { participantIds, participantList, couponId1, couponId2, coupon1, coupon2, discountAmount} = props;
		allprice = originalPrice;
		if(discountAmount)allprice -= discountAmount;
		this.setState({
			participantIds,
			participantList,
			couponId1,
			couponId2,
			coupon1,
			coupon2,
			discountAmount,
			allprice,
		})
	}
	getSpots(){
		let { spots, point } = this.state;
		let view = spots.map((v,k)=>{
			let sel = false;
			if( point == v.key )sel = true;
			return <TouchableOpacity key = {`spot-${k}`} style = { [styles.spotView, sel? styles.spotViewSel : styles.spotViewUnSel]} onPress = { this.addSpots.bind(this, v) }>
							<Text style = { sel ? styles.spotTextSel : styles.spotTextUnSel}>{ v.value }</Text>
						 </TouchableOpacity>
		});
		return view;
	}
	addSpots( v ){
		let { point ,allprice, count, originalPrice, discountAmount } = this.state;
		this.setState({
			point: v.key,
			originalPrice: v.preferPrice,
			allprice: v.preferPrice - discountAmount,
			couponId1: null,
			couponId2: null,
			coupon1: null,
			coupon2: null,
			discountAmount: 0,
		})
	}
	addProject = () => {
		let {
			detail,
			projectList,
			dispatch,
		} = this.props,
		{
			point,
			datetime,
			spots,
		} = this.state,
		projectDetail = {
			serviceId : detail.id,
			serviceTime : datetime,
			activityServiceType : 1,
			cover : detail.picture,
			title : detail.name,
			spot : spots[findIndex( spots, o => o.key === point )],//钓点
		};
		console.info( detail )
		dispatch( setAAProject([ ...projectList, projectDetail ]))
		Actions.popTo("activityPublish")
	}
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
	pickTime(){
		let { times } = this.state;
		WheelPicker.dateTimePicker(times,( data, date, time)=>{
			this.setState({
				times: data,
				date: date,
				time: time,
				datetime: date+' '+time,
			})
		});
	}
	submit(){
		let { detail } = this.props;
		let{ datetime, count, name, phone, remark, participantIds, couponId1, couponId2, point } = this.state;
		if( !point ){
			Tool.alert(	'请选择钓点' );
			return;
		}
		else if( !datetime ){
			Tool.alert(	'请选择出行时间');
			return;
		}
		else if(!name || !phone){
			Tool.alert('请填写联系人信息');
			return;
		}else if( participantIds.length != count){
			Tool.alert(`请添加${count}个被保人`);
			return;
		}
		else{
			let params = {
				point,
				id: detail.id,
				departure: datetime,
				contacter: name,
				contacterPhone: phone,
				contacterRemark: remark,
				togethers: participantIds,
			}
			if(couponId1)params['voucher'] = couponId1;
			if(couponId2)params['coupon'] = couponId2;
			Tool.fetch(null, `${config.appUrlPath}rest/order/charter`,'post', params,(ret)=>{
				Tool.to('pay',{orderDetail: ret })
			})
		}
	}
	render(){
		let { detail } = this.props;
		let { participantIds, participantList, datetime, count, allprice, originalPrice, discountAmount, couponId1, couponId2, coupon1, coupon2 } = this.state,
				orderabled = this.props.projectType;
		return(
			<View style = { styles.parentsView }>
				<ScrollView  style = {{flex:1, backgroundColor:'#f0f0f0'}}>

					<View style = { styles.top }>
						<Text style = { styles.name }>{ detail.name }</Text>
						<Image source={ {uri: detail.fishPointPic || config.defaultImg } } style={ styles.fmImg }/>
						<Text style = { styles.xzTitle }>请选择钓点</Text>
						<View style = { styles.spotsList }>
							{ this.getSpots() }
						</View>
					</View>
					{
						!orderabled ? <AccumulationSpan
							style = {{ paddingLeft: 15, paddingRight: 15, marginBottom: 10}}
							title = {`请选择出行人数(最高限制${detail.maxPersons}人)`}
							count = { count }
							maxCount = { detail.maxPersons }
							onChange = { (num)=>{
								this.setState({count: num
							})} }
						/>
						:
						<View style = {{ paddingLeft:15, paddingRight: 15, marginBottom: 10, backgroundColor : "#fff" }}>
							<Text>请选择出行人数(最高限制6人)</Text>
						</View>
					}

					<IconSpan3 style = { styles.time } title = {'出行时间'} text = { datetime } defaultText = { '请选择...' } click = { this.pickTime.bind(this) }/>

					{ !orderabled && <Participant
							key = {`participant-${count}`}
							style = {{ marginBottom: 10}}
							datas = { participantList }
							del = { this.delparticipant.bind(this) }
							btnText = {`请添加${count}位被保人`}
							add = { ()=>{ Tool.to('participantList',{ids: participantIds, selectDates:participantList}) } } />
					}
					{ !orderabled && <View style={ styles.orderDetail }>
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
									onChangeText = { (text)=>this.setState({phone: text}) }/>
							 <InputItem
										title = {'备      注'}
										style = {{ height: 38 }}
										titleStyle = {{color: '#acacac'}}
										placeholder = { '请输入备注' }
										onChangeText = { (text)=>this.setState({remark: text}) }/>
						</View>
					}
					{ !orderabled && <View style={ [styles.orderDetail, { paddingBottom: 5}] }>
							<Text style={ [ styles.insuranceTitle, styles.lxr] }>优惠信息</Text>
							<View style={ [styles.borerBto,{ marginBottom: 10}] }/>
							<IconSpan3
								title = {'使用优惠券'}
								defaultText = { '请选择优惠券' }
								text = { discountAmount ? `-${discountAmount}` : null }
								textStyle = {{ color:'red'}}
								click = {()=>Tool.to('selectCoupon',{id:detail.id, money:originalPrice,couponId1, couponId2, coupon1, coupon2, discountAmount})}/>
						</View>
					}
					{ !orderabled && <View style={ styles.xy}>
							<Text style={ styles.insuranceAssist}>点击“提交订单”表示已经阅读并同意</Text>
							<TouchableOpacity><Text  style={ styles.insuranceAssist}>《海约服务使用协议》</Text></TouchableOpacity>
						</View>
					}

				</ScrollView>
				{ !orderabled ? <OrderTool2
						text = { '总价' }
						orderText = { '提交订单' }
						allprice = { allprice }
						order = { this.submit.bind(this) }
					/>
				:
					<ButtonBar>
						<PrimaryButton width = { width } onPress = { this.addProject }>确定</PrimaryButton>
					</ButtonBar>
				}
			</View>
		)
	}
})

const styles = StyleSheet.create({
	parentsView: {
    width: width,
    height: Platform.OS == 'ios' ? height - 64 : height - 76,
  },
	top:{
		backgroundColor: '#ffffff',
		marginBottom: 10,
	},
	name:{
		color: '#323232',
		fontSize: 18,
		paddingLeft: 15,
		paddingTop: 15,
	},
	fmImg:{
		width: width - 30,
		height: 200,
		margin: 15,
	},
	xzTitle:{
		color: '#323232',
		fontSize: 14,
		paddingLeft: 15,
		paddingBottom: 10,
	},
	spotsList:{
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 5,
	},
	spotView:{
		borderRadius: 5,
		marginLeft: 15,
		marginBottom: 10,
		width: 100,
		height: 35,
		justifyContent:'center',
		alignItems: 'center',
	},
	spotViewSel:{
		backgroundColor: '#34a5f0',
	},
	spotViewUnSel:{
		borderColor:'#dbdbdb',
		borderWidth: 0.5,
	},
	spotTextSel:{
		padding: 2,
		fontSize: 14,
		color: '#ffffff'
	},
	spotTextUnSel:{
		padding: 2,
		fontSize: 14,
		color: '#acacac'
	},
	orderDetail:{
		backgroundColor: '#ffffff',
		padding: 15,
		marginBottom: 10,
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
	time:{
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 10,
	}
})
