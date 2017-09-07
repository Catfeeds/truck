import React, { Component } from 'react';
import{
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
}from 'react-native';

import ContentRow from 'components/order/content-row';
import ContentRow3 from 'components/order/content-row3';
import ContentTitle from 'components/order/content-title';
import MyButton from 'components/common/button'
import Tool from 'utils/tool';

let continuPaysi;

export default class OrderDetail extends Component{
	constructor(props) {
 		super(props);
		let restTime = '00:28:32';
		let array = restTime.split(':');
    this.state = {
			m: array[1],
			s: array[2],
			detail:{
				p:[{},{},{}]
			}
    }
	}
	componentWillMount(){
		// Tool.fetch(null,`${config.appUrlPath}rest/prod/serves`,'get',params,(ret)=>{
		//
		// });
		//
		// 		let { si } = this.props;
		let { m, s } = this.state;
	  continuPaysi = setInterval(()=>{
			if(s > 0)s--;
			else s = 59,m --;
			if(m < 0) s=0,m=0,clearInterval(continuPaysi);
			this.setState({m,s});
		},1000);
	}
	componentWillUnmount(){
		if(continuPaysi)
		 clearInterval(continuPaysi);
	}
	getPriceView( style ){
		return 		<View style = {{ backgroundColor:'#ffffff', marginBottom: 10}}>
								<View style = { [styles.priceView, style] }>
									<ContentRow3 title = {'实付金额'} text = '¥888888' titleStyle = {{fontSize: 16, color: '#323232'}} textStyle={{fontSize: 16, color:'#f2000d'}}/>
									<ContentRow3 title = {'总价'} text = '¥888888' textStyle={{color:'#acacac'}}/>
									<ContentRow3 title = {'优惠金额'} text = '¥888888' titleStyle={{color:'#4dd77e'}} textStyle={{color:'#4dd77e'}}/>
								</View>
							</View>
	}
	render(){
		let { m, s, detail} = this.state;
		return (
			<ScrollView style={ styles.containers }>
				{/*未支付付显示金额*/}
				{
					<View>
						<View style = { styles.payTimeView}>
							<Text style = { styles.text }>剩余支付时间</Text>
							<Text style = { [styles.text,{color: '#34a5f0'}] }>0:{m}:{s}</Text>
						</View>
						{ this.getPriceView(styles.payView) }
					</View>
				}
				<View style={ styles.content }>
					<TouchableOpacity style = { styles.titleView }>
						<Text style = { styles.title }>拉萨的杰拉德积分辣豆腐订单</Text>
						<Image source={require('images/personal/Setting.png')} style={ styles.arrow }/>
					</TouchableOpacity>
					<ContentRow title = {'套餐类型'} text = '8686868' />
					<ContentRow title = {'出行时间'} text = '8686868' />
					<ContentRow title = {'购买数量'} text = '8686868' />
					<ContentRow title = {'附近服务'} text = '无' />
					<ContentTitle title = { '保险信息' } />
					{
						detail.p && detail.p.map((v,k)=>{
							return <ContentRow  key = {`participant-${k}`} title = {'张三'} text = '293749237432937429' titleStyle = {{color: '#323232'}}/>;
						})
					}
					<ContentTitle title = { '预定人信息' } titleStyle={{width: 85}}/>
					<ContentRow title = {'联系人'} text = '8686868' />
					<ContentRow title = {'手机号码'} text = '8686868' />
					{/*已付显示金额*/}
					{this.getPriceView()}
					<ContentTitle title = { '订单信息' } />
					<ContentRow title = {'订单编号'} text = '无' />
					<ContentRow title = {'下单时间'} text = '无' />
					<ContentRow title = {'付款时间'} text = '无' />

				</View>
				<Text style = { [styles.text, styles.tip] }>如果遇到商品信息相关问题，请拨打海约电话：4000042010</Text>
				<MyButton
					style = {{ margin: 15}}
					onPress= {()=>{ Tool.to('orderRefund') }}>
					继续支付／申请退款
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
	arrow:{
		width: 9,
    height: 16,
	},
	content:{
		backgroundColor: '#ffffff',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 10,
	},
	titleView:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 15,
		paddingBottom: 10,
	},
	title:{
		fontSize: 16,
		color: '#323232',
	},
	priceView:{
		borderColor: '#dbdbdb',
		borderTopWidth: 0.5,
		paddingTop: 10,
		marginTop: 10,
	},
	payView:{
		borderTopWidth: 0,
		padding: 15,
	},
	payTimeView: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text:{
		fontSize: 12,
		color: '#323232',
		lineHeight: 20,
	},
	tip:{
		alignSelf: 'center',
		fontSize: 11,
		marginTop: 20,
	}
})
