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
import Loading from 'components/common/loading';
import {Actions} from 'react-native-router-flux';

export default class CouponList extends Component{
	constructor(props){
		super(props);
    this.state = {
			typeId: 1,
			use1: require('images/personal/btn_shiyong_g.png'),
			use2: require('images/personal/btn_shiyong_y.png'),
			datas: [],
    }
	}
	componentWillMount() {
		Actions.refresh({
        rightTitle: '兑换优惠',
        rightButtonTextStyle: { color: '#34a5f0', fontSize: 15},
        onRight: () => {
					Tool.to('integral');
        },
    });
		this.fetch();
	}
	fetch(){
		let { typeId } = this.state;
		Tool.fetch(null,`${config.appUrlPath}rest/coup/owner`,'get',{typeId},(ret)=>{
			this.setState({
				datas:ret
			})
		})
	}
	typeChange( typeId ) {
		this.setState({typeId},()=>{
			this.fetch();
		})
	}
	render(){
		let { datas,typeId, use1, use2 } = this.state;
		return(
				<ScrollView style = {{flex:1, backgroundColor:'#f0f0f0'}}>
					<TouchableOpacity style = { styles.tipView } onPress={()=>{Tool.to('couponExplanation')}}>
						<View style = { styles.tanhao }>
							<Text style={ styles.tip}>!</Text>
						</View>
						<Text style={ styles.tip }>海约代金券、满减券使用说明</Text>
					</TouchableOpacity>
					<Loading  visible={this.state.loading_visible} />
					<View style = { styles.typeTool }>
						<TouchableOpacity style = { [styles.typeView, typeId == 1 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 1)}>
							<Text style = { [styles.typeScreen, typeId == 1 && styles.typeSel] }>代金券</Text>
						</TouchableOpacity>
						<TouchableOpacity style = { [styles.typeView, typeId == 2 && styles.typeViewSel] } onPress={ this.typeChange.bind(this, 2)}>
							<Text style = { [styles.typeScreen, typeId == 2 && styles.typeSel] }>满减券</Text>
						</TouchableOpacity>
					</View>
					<View style = { styles.content }>
						{
							datas && datas.map((v,k)=>{
								let sel = false;
								return <View key = {`coupon-${k}`} style = { styles.item }>
													<View style = { styles.right }>
														<View style ={ [styles.type, v.typeId == 1 ? styles.type1 : styles.type2 ] }>
															<Text style = { styles.typeText }>{v.typeId == 1 ? '代金' : '满减'}</Text>
														</View>
														<View style = { styles.couponDetail }>
															<Text style = { styles.title }>{v.typeId == 2 ? `满${v.consumptionMin}减 ` : ''}<Text style = { [styles.money, v.typeId == 1 ? styles.money1 : styles.money2 ] }><Text style = {{ fontSize: 14}}>¥</Text>{v.amount}</Text></Text>
															<Text style = { styles.text }>剩余数量：{v.surplusNum}</Text>
															<Text style = { styles.text }>{v.beginDate}-{v.endDate}</Text>
														</View>
													</View>
													<TouchableOpacity onPress = {()=>Tool.to('routelist')}>
														<Image source={ v.typeId  == 2 ? use1 : use2 } style={ styles.useImg}/>
													</TouchableOpacity>
											 </View>
							})
						}
					</View>
				</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	typeTool:{
		backgroundColor: '#ffffff',
		flexDirection: 'row',
		justifyContent: 'center',
		height: 40,
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
	},
	typeScreen:{
		width: 50,
		fontSize: 15,
		color: '#323232',
		textAlign: 'center',
	},
	typeSel: {
		color: '#34a5f0',
	},
	typeView:{
		marginLeft: 10,
		marginRight: 10,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	typeViewSel: {
		borderBottomWidth: 2,
		borderColor: '#34a5f0',
	},
	tipView:{
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	tip:{
		color: '#acacac',
		fontSize: 12,
	},
	tanhao:{
		width: 12,
		height: 12,
		borderWidth: 0.5,
		borderColor: '#acacac',
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 5,
	},
	content:{
		padding: 15,
	},
	item:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	left:{
		marginLeft: 10,
		marginRight: 20,
	},
	right:{
		flex: 1,
		height: 96,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		padding: 10,
		backgroundColor: '#ffffff',
	},
	typeText:{
		fontSize: 30,
		color: '#ffffff',
	},
	type: {
		width: 70,
		height: 70,
		borderRadius: 35,
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
		marginBottom: 3,
	},
	text: {
		fontSize: 12,
		color: '#acacac',
		lineHeight: 16,
	},
	money: {
		fontSize: 20,
	},
	money1: {
		color: '#ffc715'
	},
	money2: {
		color: '#4dd77e'
	},
	useImg:{
		width: 94,
		height: 96,
	}
});
