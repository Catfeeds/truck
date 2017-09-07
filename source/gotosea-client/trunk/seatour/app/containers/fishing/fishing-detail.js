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
import IconSpan3 from 'components/common/icon-span3';
import GalleryPagination from 'components/route/gallery-pagination';

import { connect } from 'react-redux'
import {
		setDIYProject,
	} from 'actions/activity/publish'

import styles from 'styles/route/route-detail'

let { width, height } = Dimensions.get('window');

const injectScript = `
		(function () {
		  var height = null;
		  function changeHeight() {
		    if (document.body.scrollHeight != height) {
		      height = document.body.scrollHeight;
		      if (window.postMessage) {
		        window.postMessage(height)
		      }
		    }
		  }
		  setInterval(changeHeight, 300);
		}());
		`;

export default connect( state => ({
	projectList : state.activity.publish.DIYProjects
}))(class FishingDetail extends Component{
				constructor(props){
		super(props);
		this.state = {
			loading_visible: false,
			activeTap: 1,
			wh1:100,
			y1: 0,
			picture: config.defaultImg,
			imglength: 1,
			detail:{},
		}
	}
	componentWillMount() {
		let { routeId } = this.props;
		Tool.fetch(null,`${config.appUrlPath}rest/prod/charter/${routeId}`,'get',null,(ret)=>{
			this.setState({
				detail:ret,
				picture: ret.carouselPics ? ret.carouselPics[0] : config.defaultImg,
				imglength: ret.carouselPics ? ret.carouselPics.length : 1,
			});
		});
	}
	redirectOrder = () => {
	let { detail } = this.state,
		{
			projectType,
			dispatch,
			projectList,
		} = this.props,
		projectDetail;
	if( projectType === "DIY" ){
		projectDetail = {
			serviceId : detail.id,
			cover : detail.picture,
			title : detail.name,
			activityServiceType : 1,
		}
		dispatch( setDIYProject( [ ...projectList, projectDetail ] ) )
		Actions.popTo("activityPublish")
	}else Actions.fishingOrder( { detail, projectType })
}
	collect(){
		let { routeId } = this.props;
		let { detail } = this.state;
		let method = 'post';
		if( detail.flag == false){
			detail.flag = true
		}
		else{
			detail.flag = false;
			method = 'delete';
		}
		Tool.fetch(null,`${config.appUrlPath}rest/favorite/${routeId}/3`,method,null,(ret)=>{
			this.setState({detail});
		});
	}
	render(){
		let me = this;
		let { routeId, projectType } = this.props;
		let { detail, wh1, picture, imglength} = this.state;
		return(
			<View style = { styles.parentsView }>
				<ScrollView ref = 'scroll' style = {{flex:1, backgroundColor:'#f0f0f0'}}>
					<Loading  visible={this.state.loading_visible} />
					<TouchableOpacity onPress={()=>Tool.to('seaGallery',{images: detail.carouselPics})}>
						<ImageBackground
							source={{ uri: picture }}
							style={ styles.img}>
							<View style={ styles.toolView}>
								<TouchableOpacity style = { styles.pressArea} onPress={()=>Tool.back()}>
									<Image source = { require('images/route/btn_ARROW---LEFT.png')} style = { styles.toolImg} />
								</TouchableOpacity>
								{/*<TouchableOpacity style = { styles.pressArea} onPress={()=>{ this.refs.modal.open()}}>
									<Image source = { require('images/route/btn_share.png')} style = {{ width: 22, height: 18}} />
								</TouchableOpacity>*/}
							</View>
							<GalleryPagination num = { imglength } style = { fishingStyles.gNum }/>
						</ImageBackground>
					</TouchableOpacity>
					<View style={styles.content}>

						<View style={ styles.contentTop }>
							<View style={{flex:1}}>
								<Text style = { styles.routeName }>{detail.name}</Text>
								<View style = {{ flexDirection: 'row', flexWrap: 'wrap'}}>
									{
										detail.tags && detail.tags.map((v,k)=>{
											return <Text key = {'d-tag'+k} style={styles.tagText}>{v}</Text>
										})
									}
								</View>
							</View>
							<View>
								<Text style={{color:'#323232'}}><Text style={{fontSize: 18, color:'red'}}>¥ <Text style={{fontSize:21}}>{detail.price}</Text></Text> 起/船</Text>
							</View>
						</View>

						<View style = { fishingStyles.addrView }>
							<Image source = { require('images/route/icon_Location-Pin.png')}  style = { fishingStyles.addrImg }/>
							<Text style = { fishingStyles.addrText }>{detail.areaId}</Text>
						</View>

					</View>

					<Service
						style = {{ marginBottom: 10}}
						insurance = { detail.insurance }
						coupon = { detail.coupon }
						redeem = { detail.redeem }/>

					<View style={ { marginBottom: 10 } }>
						<TouchableOpacity style = { fishingStyles.ratView }>
							<View  style = { fishingStyles.ratItem }>
								<Text style={ fishingStyles.ratText}>4分</Text>
							 	<Rating max={5} rating = {parseInt(detail.grade)} editable={false}/>
							</View>
							<View style = { fishingStyles.ratItem }>
								<Text style={ [fishingStyles.ratText,{ paddingRight: 10 }] }>{ `共${detail.discuss}条评论` }</Text>
		            <Image source={require('images/personal/Setting.png')} style={ fishingStyles.arrow }/>
							</View>
						</TouchableOpacity>
						<IconSpan3 style = { fishingStyles.merchantInfo } titleStyle={{color: '#acacac'}} title = {'商家信息'} text = { detail.merchant && detail.merchant.merchant } click = {()=>{ Tool.to('merchantDetail',{detail: detail.merchant})}}/>
					</View>

					<View style={styles.container}>
						<View onLayout={ (event) => { this.setState({ y1: event.nativeEvent.layout.y }) } }>
							<WebView
								style={{width: width, height: wh1}}
								javaScriptEnabled = {true}
								injectedJavaScript={injectScript}
								onMessage={(even)=>{
									let { data } = even.nativeEvent;
									if( data != '[object Object]'){
										this.setState({
											wh1:(parseInt(data))
										});
									}
								}}
								source={{uri: `${config.appUrlPath}rest/prod/serve/${routeId}/items`}}
							/>
						</View>
					</View>
				</ScrollView>

				<OrderTool
					isCollect = { detail.flag }
					collect = { this.collect.bind(this) }
					order = { this.redirectOrder }
					orderTitle = { projectType && "添加" }
				/>

			</View>
		)
	}
})

const fishingStyles = StyleSheet.create({
	addrView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	addrImg: {
		width: 9,
		height: 12,
	},
	addrText: {
		fontSize: 12,
		color: '#acacac',
		paddingLeft: 5,
	},
	merchantInfo:{
		paddingLeft: 15,
		paddingRight: 15,
	},
	ratView:{
		flexDirection:'row',
		justifyContent: 'space-between',
		backgroundColor: '#ffffff',
		borderBottomWidth: 0.5,
		borderColor:'#dbdbdb',
		padding: 15,
	},
	ratItem:{
		flexDirection:'row',
		alignItems: 'center',
	},
	ratText:{
		color: '#acacac',
		fontSize: 14,
	},
	arrow: {
		width: 9,
		height: 16,
	},
	gNum:{
		margin: 15,
		alignSelf: 'flex-end',
	}
})
