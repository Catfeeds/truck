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

import orderStyles from 'styles/order/order';

export default class MerchantOrderDetail extends Component{
	constructor(props) {
 		super(props);
		this.state = {
			datas: {},
		};
	}
	componentWillMount(){
		// Tool.fetch(null,`${config.appUrlPath}rest/prod/serves`,'get',params,(ret)=>{
		//
		// });
	}


	render(){
		let { datas } = this.state;
		return (
			<ScrollView style={ styles.containers }>
				<View style={ styles.content }>
					<Text style = { styles.stuatsText }>订单状态：<Text style = { orderStyles.colorConfirm }>待确认</Text></Text>
					<Text style = { styles.tip }>请在6月30号24点前确认订单，否则订单将被取消</Text>
					<View style = { styles.concatContent }>
						<TouchableOpacity style = { styles.concatItem }>
							<View  style = { styles.concatView }>
								<Text style = { styles.contactText }>联系人：那个谁</Text>
								<Text style = { styles.contactText }>电话：123456789</Text>
							</View>
							<Image source={require('images/merchant/btn_phone.png')}  style={ orderStyles.img }/>
						</TouchableOpacity>
						<TouchableOpacity style = { [styles.concatItem, styles.concatItemRight] }>
							<Image source={require('images/merchant/btn_chat.png')}  style={ orderStyles.img }/>
							<Text style = { styles.contactText }>群聊</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={ styles.content }>
					<ContentTitle title = { '订单信息' } />
					<ContentRow title = {'订单编号：'} text = '8686868' />
					<ContentRow title = {'服务名称：'} text = '8686868' />
					<ContentRow title = {'订单类型：'} text = '8686868' />
					<ContentRow title = {'出发日期：'} text = '8686868' />
					<ContentRow title = {'出行人数：'} text = '8686868' />
					<ContentRow title = {'购买份数'} text = '8686868' />
					<ContentTitle title = { '套餐信息' } />
					<ContentRow title = {'矶钓点：'} text = '8686868' />
					<ContentTitle title = { '费用说明' } />
					<ContentRow3 title = {'套餐'} text = '¥666'/>
					<ContentRow3 title = {'皮皮虾*15'} text = '¥888888' />
					<ContentRow3 title = {'黄鳝*666'} text = '¥888888' />
					<ContentRow3 title = {'住宿*3'} text = '¥888888' />
					<ContentRow3 title = {'合计'} text = '¥888888' textStyle={{color:'#f2000d'}}/>
				</View>
				<Text style = { styles.creatTime }>创建时间：2033-33-33</Text>
				<MyButton
					style = {{ margin: 15}}
					onPress= {()=>{}}>
					确认订单
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
	tip:{
		fontSize: 12,
		color: '#e41b1e',
	},
	concatContent:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
	},
	concatItem:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		borderRadius: 40,
		padding: 10,
	},
	concatItemRight:{
		flex: 0,
		width: 95,
		marginLeft: 10,
	},
	concatView:{
		flex: 1,
		paddingLeft: 10,
	},
	contactText:{
		color: '#acacac',
		fontSize: 14,
		marginBottom: 2,
		marginTop: 2,
	},
	img:{
		width: 40,
		height: 40,
	},
	content:{
		backgroundColor: '#ffffff',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 10,
	},
	stuatsText:{
		fontSize: 18,
		color: '#323232',
		paddingTop: 25,
		paddingBottom: 10,
	},
	creatTime:{
		fontSize: 12,
		color: '#acacac',
		paddingLeft: 15,
	}
})
