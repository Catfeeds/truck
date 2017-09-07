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

export default class RouteDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading_visible: false,
			activeTap: 1,
			wh1:100,
			wh2:100,
			wh3:100,
			wh4:100,
			y1: 0,
			y2: 0,
			y3: 0,
			y4: 0,
			detail:{},
		}
	}
	componentWillMount() {
		let { routeId } = this.props;
		Tool.fetch(null,`${config.appUrlPath}rest/prod/island/${routeId}`,'get',null,(ret)=>{
			this.setState({
				detail:ret,
			});
		});
	}
	tapChange( value ){
		let { y1, y2, y3, y4 } = this.state;
		this.setState({activeTap: value},()=>{
			switch (value) {
				case 1:
					this.refs.scroll.scrollTo({y: y1})
					break;
				case 2:
					this.refs.scroll.scrollTo({y: y2})
					break;
				case 3:
					this.refs.scroll.scrollTo({y: y3})
					break;
				case 4:
					this.refs.scroll.scrollTo({y: y4})
					break;
			}
		})
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
		let { routeId } = this.props;
		let { activeTap, detail, wh1, wh2, wh3, wh4 } = this.state;
		return(
			<View style = { styles.parentsView }>
				<ScrollView ref = 'scroll' style = {{flex:1, backgroundColor:'#f0f0f0'}}>
					<Loading  visible={this.state.loading_visible} />
					<TouchableOpacity onPress={()=>Tool.to('seaGallery',{images: detail.carouselPics})}>
						<ImageBackground
							source={{ uri: detail.picture }}
							style={ styles.img}>
							<View style={ styles.toolView}>
								<TouchableOpacity style = { styles.pressArea} onPress={()=>Tool.back()}>
									<Image source = { require('images/route/btn_ARROW---LEFT.png')} style = { styles.toolImg} />
								</TouchableOpacity>
								{/*<TouchableOpacity style = { styles.pressArea} onPress={()=>{ this.refs.modal.open()}}>
									<Image source = { require('images/route/btn_share.png')} style = {{ width: 22, height: 18}} />
								</TouchableOpacity>*/}
							</View>
							<View style={ styles.typeView }>
								{ detail.category == 2 && <Text style={ styles.typeText }>{'线路游 | '+ detail.destination}</Text>}
							</View>
						</ImageBackground>
					</TouchableOpacity>
					<View style={styles.content}>

						<View style={ styles.contentTop }>
							<View style={{flex:1}}>
								<Text style={styles.routeName}>{detail.name}</Text>
								<View style={{ flexDirection: 'row'}}>
									{
										detail.tags && detail.tags.map((v,k)=>{
											return <Text key = {'d-tag'+k} style={styles.tagText}>{v}</Text>
										})
									}
								</View>
							</View>
							<Text style={styles.orderCount}>{'预约数'+detail.soldNum}</Text>
						</View>

						<View style={{flexDirection: 'row', justifyContent:'space-between',alignItems: 'center'}}>
							<Text style={{color:'#323232'}}><Text style={{fontSize: 18, color:'red'}}>¥ <Text style={{fontSize:21}}>{detail.price}</Text></Text> 起/份</Text>
							<View style={styles.ratView}>
								<Text style={ styles.ratText}>评分  </Text>
								 <Rating max={5} rating = {parseInt(detail.grade)} editable={false}/>
							</View>
						</View>

					</View>

					<Service
						style = {{ marginBottom: 10}}
						insurance = { detail.insurance }
						coupon = { detail.coupon }
						redeem = { detail.redeem }/>

					<View style={styles.tjContent}>
						<Text style={styles.tjTitle}>小约推荐</Text>
						{
							detail.recommend && detail.recommend.map((v,k)=>{
								return <Text key = {'d-tag'+k} style={styles.tjText}>{v}</Text>
							})
						}
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
					order = { ()=>Tool.to('selectDate',{ detail: detail}) } />

				<Modal style = { [styles.modal] }
	        position = { 'bottom' }
	        ref = { 'modal' }
	        backdropPressToClose = { true }
	        >
					<TouchableOpacity style = { styles.shareView }>
						<Image source = { require('images/route/icon_qq.png')} style = { styles.shareImg} />
						<Text style = { styles.shareText}>QQ</Text>
					</TouchableOpacity>
					<TouchableOpacity style = { styles.shareView }>
						<Image source = { require('images/route/icon_weixin.png')} style = { styles.shareImg} />
						<Text style = { styles.shareText}>微信</Text>
					</TouchableOpacity>
					<TouchableOpacity style = { styles.shareView }>
						<Image source = { require('images/route/icon_pengyouq.png')} style = { styles.shareImg} />
						<Text style = { styles.shareText}>朋友圈</Text>
					</TouchableOpacity>
				</Modal>

			</View>
		)
	}
}

// <View style={styles.tapView}>
// 	<TouchableOpacity style={styles.tapTouch} onPress={this.tapChange.bind(this,1)}>
// 		<View style = {activeTap == 1 && styles.tapTextAcitve }>
// 			<Text style={styles.tapText}>景点介绍</Text>
// 		</View>
// 	</TouchableOpacity>
// 	<TouchableOpacity style={styles.tapTouch} onPress={this.tapChange.bind(this,2)}>
// 		<View style = {activeTap == 2 && styles.tapTextAcitve }>
// 			<Text style={styles.tapText}>行程安排</Text>
// 		</View>
// 	</TouchableOpacity>
// 	<TouchableOpacity style={styles.tapTouch} onPress={this.tapChange.bind(this,3)}>
// 		<View style = {activeTap == 3 && styles.tapTextAcitve }>
// 			<Text style={styles.tapText}>费用说明</Text>
// 		</View>
// 	</TouchableOpacity>
// 	<TouchableOpacity style={styles.tapTouch} onPress={this.tapChange.bind(this,4)}>
// 		<View style = {activeTap == 4 && styles.tapTextAcitve }>
// 			<Text style={styles.tapText}>出现须知</Text>
// 		</View>
// 	</TouchableOpacity>
// </View>
//
// <View onLayout={ (event) => { this.setState({ y2: event.nativeEvent.layout.y }) } }>
// 	<WebView
// 		style={{width: width, height: wh2}}
// 		javaScriptEnabled = {true}
// 		injectedJavaScript={injectScript}
// 		onMessage={(even)=>{
// 			let { data } = even.nativeEvent;
// 			if( data != '[object Object]'){
// 				this.setState({
// 					wh2:(parseInt(data))
// 				});
// 			}
// 		}}
// 		source={{uri:'http://wechat.gotosea.com.cn/WeChat/home.html'}}
// 	/>
// </View>
// <View onLayout={ (event) => { this.setState({ y3: event.nativeEvent.layout.y }) } }>
// 	<WebView
// 		style={{width: width, height: wh3}}
// 		javaScriptEnabled = {true}
//
// 		source={{uri:'http://wechat.gotosea.com.cn/WeChat/home.html'}}
// 	/>
// </View>
// <View onLayout={ (event) => { this.setState({ y4: event.nativeEvent.layout.y }) } }>
// 	<WebView
// 		style={{width: width, height: wh4}}
// 		javaScriptEnabled = {true}
// 		injectedJavaScript={injectScript}
// 		onMessage={(even)=>{
// 			let { data } = even.nativeEvent;
// 			if( data != '[object Object]'){
// 				this.setState({
// 					wh4:(parseInt(data))
// 				});
// 			}
// 		}}
// 		source={{uri:'http://wechat.gotosea.com.cn/WeChat/home.html'}}
// 	/>
