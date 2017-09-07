import React, { Component } from 'react';
import{
	ScrollView,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Text,
} from 'react-native';

import Tool from 'utils/tool';
import {Actions} from 'react-native-router-flux';

export default class SelectCoupon extends Component{
	constructor(props){
		super(props);
		let { couponId1, couponId2, coupon1, coupon2, discountAmount } = props
    this.state = {
			couponId1: couponId1,  //代金券id
			couponId2: couponId2,  //满减券id
			coupon1: coupon1,  //代金券
			coupon2: coupon2,  //满减券
			discountAmount: discountAmount,
			datas: [],
    }
	}
	componentWillMount() {
		Actions.refresh({
      onBack: () => {
          let { couponId1, couponId2, coupon1, coupon2 } = this.state;
					let da = 0;
					if(coupon1)da += coupon1.amount;
					if(coupon2)da += coupon2.amount;
          Tool.back({refresh:({couponId1, couponId2, coupon1, coupon2, discountAmount: da })})
      },
    });
		let { id , money } = this.props;
		Tool.fetch(null,`${config.appUrlPath}rest/coup/orders`,'get',{id, money},(ret)=>{
			this.setState({
				datas:ret
			})
		})
	}
	select( ob ){
		let { couponId1, couponId2, coupon1, coupon2 } = this.state;
		if( ob.typeId == 1){
			if(couponId1 == ob.custCoupId ){
				this.setState({
					couponId1: null,
					coupon1: null,
				})
			}else{
				this.setState({
					couponId1: ob.custCoupId,
					coupon1: ob,
				})
			}
		}else{
			if(couponId2 == ob.custCoupId ){
				this.setState({
					couponId2: null,
					coupon2: null,
				})
			}else{
				this.setState({
					couponId2: ob.custCoupId,
					coupon2: ob,
				})
			}
		}
	}
	render(){
		let { datas, couponId1, couponId2 } = this.state;
		return(
				<ScrollView style = {{flex:1, backgroundColor:'#ffffff'}}>
					<Text style={ styles.tip }>最多选择1张代金券和一张优惠券哦～</Text>
					<View style = { styles.content }>
						{
							datas && datas.map((v,k)=>{
								let sel = false;
								if(couponId1 == v.custCoupId || couponId2 == v.custCoupId)sel = true;
								return <TouchableOpacity key = {`coupon-${k}`} style = { styles.item } onPress = { this.select.bind(this,v) }>
													{ sel ? <Image source={ require('images/community/btn_Ok_blue_s.png')} style={ [styles.imgSel, styles.left] }/> : <View style = { [styles.unSelect,styles.left ]}/>}
													<View style = { styles.right }>
														<View style ={ [styles.type, v.typeId == 1 ? styles.type1 : styles.type2 ] }>
															<Text style = { styles.typeText }>{v.typeId == 1 ? '代金' : '满减'}</Text>
														</View>
														<View style = { styles.couponDetail }>
															<Text style = { styles.title }>{v.typeId == 2 ? `满${v.consumptionMin}减 ` : ''}<Text style = { [styles.money, v.typeId == 1 ? styles.money1 : styles.money2 ] }><Text style = {{ fontSize: 14}}>¥</Text>{v.amount}</Text></Text>
															<Text style = { styles.text }>剩余数量：{v.surplusNum}</Text>
															<Text style = { styles.text }>{v.beginDate} - {v.endDate}</Text>
														</View>
													</View>
											 </TouchableOpacity>
							})
						}
					</View>
				</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	tip:{
		color: '#323232',
		fontSize: 14,
		padding: 15,
		backgroundColor: '#f0f0f0',
	},
	content:{
		padding: 15,
	},
	item:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	left:{
		marginLeft: 10,
		marginRight: 20,
	},
	imgSel:{
		width: 16,
		height: 16,
	},
	unSelect:{
		width: 16,
		height: 16,
		borderRadius: 8,
		borderColor: '#bdbdbd',
		borderWidth: 1,
	},
	right:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center',
		borderWidth: 1,
		borderColor: '#dbdbdb',
		borderRadius: 5,
		padding: 10,
	},
	typeText:{
		fontSize: 35,
		color: '#ffffff',
	},
	type: {
		width: 80,
		height: 80,
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
	},
	type1: {
		backgroundColor: '#ffc715',
	},
	type2: {
		backgroundColor: '#4dd77e',
	},
	couponDetail: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	title:{
		fontSize: 14,
		color: '#323232',
		marginBottom: 5,
	},
	text: {
		fontSize: 12,
		color: '#acacac',
		lineHeight: 16,
	},
	money: {
		fontSize: 25,
	},
	money1: {
		color: '#ffc715'
	},
	money2: {
		color: '#4dd77e'
	},
});
