import React, { Component } from 'react';
import{
	Platform,
	Dimensions,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	Text,
	WebView,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Loading from 'components/common/loading';
import Tool from 'utils/tool';
import Rating from 'components/common/rating';
import Modal from 'react-native-modalbox';
import Service from 'components/route/service';
import OrderTool from 'components/route/order-tool';
import IconSpan2 from 'components/common/icon-span2';
import Comment from 'components/route/comment';
import GalleryPagination from 'components/route/gallery-pagination';

import styles from 'styles/route/route-detail'

let { width, height } = Dimensions.get('window');

export default class MerchantDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading_visible: false,
			detail:{},
			picture: config.defaultImg,
			commentsCount: 0,
			comments: []
		}
	}
	componentWillMount() {
		let { detail } = this.props;
		//商家详情
		Tool.fetch(null,`${config.appUrlPath}rest/merchant/detail/${detail.custId}`,'get',null,(ret)=>{
			this.setState({
				detail:ret,
				picture: ret.carouselPics ? ret.carouselPics[0] : config.defaultImg,
			});
		});

		//商家评价
		Tool.fetch(null,`${config.appUrlPath}rest/orderServe/merchant/serverEvas/${detail.custId}`,'get',{merchantId: detail.custId },(ret)=>{
			this.setState({
				commentsCount: ret.totalElements,
				comments: ret.content,
			});
		});
	}
	toDetail( data ){
		if( data.serviceTypeId == 2001 || data.serviceTypeId == 2002){
			Tool.to('routeDetail',{routeId: data.id})
		}else if( data.serviceTypeId == 1001 ){
			Tool.to('fishingDetail',{routeId: data.id})
		}else{
			Tool.alert('未知服务');
		}
	}
	getService(){
		let { detail } = this.state;
		let services = detail.mercServes,
		    view;
		if(services && services.length > 0){
			view = services.map((v,k)=>{
				return <View key = {`sitem-${k}`} style = { [sjstyles.serviceItem, sjstyles.borderTop ]}>
									<View style = { sjstyles.siTop}>
										<Text style = { sjstyles.siName }>{ v.name }</Text>
										<Text style = { [sjstyles.siName,{ fontWeight: 'bold'}] }>{`¥${v.price}`}<Text style = {{fontSize:11}}> 起</Text></Text>
									</View>
									<View style = { sjstyles.siTop}>
										<View style={{ flex: 1}}>
											<View style={{ flexDirection: 'row', marginBottom: 5, flexWrap:'wrap'}}>
												{
													v.tags && v.tags.map((v,k)=>{
														return <Text key = {'r-tag'+k} style={sjstyles.tagText}>{v}</Text>
													})
												}
											</View>
											{ v.soldNum > 0 && <Text style = { sjstyles.grayText }>{ `已售 ${v.soldNum}` }</Text>}
										</View>
										<TouchableOpacity style = { sjstyles.orderView } onPress={this.toDetail.bind(this, v)}>
											<Text style = { sjstyles.orderText }>{ '立即预定' }</Text>
										</TouchableOpacity>
									</View>
							 </View>
			})
		}
		return view;
	}
	render(){
		let me = this;
		let { detail, picture, comments, commentsCount } = this.state;
		return(
			<View style = { styles.parentsView }>
				<ScrollView ref = 'scroll' style = {{flex:1, backgroundColor:'#f0f0f0'}}>
					<Loading  visible={this.state.loading_visible} />
					<TouchableOpacity onPress={()=>Tool.to('seaGallery',{images: detail.carouselPics})}>
						<ImageBackground
							source={{ uri: picture }}
							style={ styles.img}>
							<View style={ styles.toolView}>
								<TouchableOpacity style = { [styles.pressBg]} onPress={()=>Tool.back()}>
									<Image source = { require('images/route/btn_ARROW---LEFT.png')} style = { styles.toolImg} />
								</TouchableOpacity>
							</View>
							<View style = { sjstyles.nameView }>
								<Text style = { sjstyles.name }>{detail.merchant}</Text>
								<GalleryPagination num = {6} />
							</View>
						</ImageBackground>
					</TouchableOpacity>
					<View style={sjstyles.content}>

						<View style = { sjstyles.top }>
							<TouchableOpacity style = { sjstyles.sjjs } onPress={()=>Tool.to('merchantIntroduce',{introduction: detail.introduction})}>
								<View style={{ flexDirection: 'row', alignItems: 'center'}}>
									<Text style = { sjstyles.jsText }>商家介绍</Text>
									<View style = { sjstyles.rzView }>
										<Text style = { sjstyles.rzText }>商家认证</Text>
									</View>
								</View>
								<Image source = {require('images/personal/Setting.png')} style={ sjstyles.arrow }/>
							</TouchableOpacity>
							<View style = { sjstyles.rateView }>
								<Rating max={5} rating = { parseInt(detail.grade) } editable={false}/>
								<Text style={ sjstyles.ratText}>{detail.grade}分</Text>
							</View>
						</View>

						<View style = { sjstyles.borderBto }/>

						<View style = { sjstyles.serviceView }>
							<Text style={ sjstyles.serviceTitle }>服务类型</Text>
							{
								detail.resources && detail.resources.map((v,k)=>{
									return <Text key = {`resources-${k}`} style={ sjstyles.serviceText }>{v}</Text>
								})
							}
						</View>

						<View style = { sjstyles.borderBto }/>

						<View style = { sjstyles.serviceView }>
							<Image source = { require('images/route/icon_Location-Pin.png')}  style = { sjstyles.addrImg }/>
							<Text style = { sjstyles.addrText }>{detail.address}</Text>
						</View>
					</View>

					<View style={ [sjstyles.content,{ paddingLeft: 15, paddingRight: 15}]}>
						<Text style = { sjstyles.count}>商家服务（{detail.mercServes ? detail.mercServes.length : 0}）</Text>
						{ this.getService() }
					</View>

					<View style={ sjstyles.content}>
						<IconSpan2 textStyle = {{ fontSize: 15 }} text = {`评论（${commentsCount}）`} click = {()=>{console.log('more');}} />
						<Comment datas = { comments }/>
					</View>

				</ScrollView>


			</View>
		)
	}
}

const sjstyles = StyleSheet.create({
	content:{
		backgroundColor: '#ffffff',
		marginBottom: 10,
	},
	addrImg: {
		width: 9,
		height: 12,
	},
	addrText: {
		fontSize: 15,
		color: '#323232',
		paddingLeft: 5,
	},
	name:{
		backgroundColor: 'transparent',
		fontSize: 18,
		color: '#ffffff',
	},
	top:{
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	sjjs:{
		flex: 1,
		flexDirection: 'row',
		height: 45,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
		borderColor: '#dbdbdb',
		borderRightWidth: 0.5,
	},
	arrow: {
		width: 9,
		height: 16,
	},
	jsText:{
		fontSize: 18,
		color: '#323232',
		paddingRight: 5,
	},
	rzView:{
		width: 58,
		height: 18,
		backgroundColor:'#ff7200',
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rzText:{
		fontSize: 12,
		color: '#ffffff',
	},
	rateView:{
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ratText: {
		paddingLeft: 5,
		fontSize: 14,
		color: '#acacac',
	},
	borderBto: {
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
	},
	borderTop:{
		borderTopWidth: 0.5,
		borderColor: '#dbdbdb',
	},
	serviceView: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		paddingTop: 10,
		paddingBottom: 10,
	},
	serviceTitle:{
		fontSize: 15,
		color: '#323232'
	},
	serviceText: {
		fontSize: 15,
		color: '#acacac',
		paddingLeft: 10,
	},
	count: {
		flex: 1,
		fontSize: 16,
		color: '#323232',
		paddingTop: 10,
		paddingBottom: 10,
	},
	serviceItem:{
		paddingTop: 15,
		paddingBottom: 5,
	},
	siTop:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	siName: {
		fontSize: 15,
		color: '#323232',
	},
	grayText:{
		fontSize: 12,
		color: '#acacac',
	},
	tagText:{
		color: '#acacac',
		borderColor: '#acacac',
		borderWidth: 0.5,
		padding: 5,
		paddingTop: 3,
		paddingBottom: 3,
		marginRight: 5,
		fontSize: 11,
		borderRadius: 10,
		marginBottom: 5,
	},
	orderView:{
		width: 80,
		height: 30,
		backgroundColor: '#34a5f0',
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	orderText: {
		fontSize: 16,
		color: '#ffffff'
	},
	comment:{
		paddingLeft: 15,
		paddingRight: 15,
	},
	nameView:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 15,
		marginBottom: 10,

	}
})
