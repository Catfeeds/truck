import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Navigator,
  Text,
  Alert,
  Picker,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import Loading from '../components/common/loading';
import ImagePicker from 'react-native-image-picker';
import {Actions, ActionConst} from 'react-native-router-flux';
import Carousel from 'react-native-looped-carousel';
import Tool from '../utils/tool';
import OssUtils from '../utils/oss-utils';
import Scan from '../components/scan';
import StorageUtil from '../utils/storage-util';
import HTMLView from 'react-native-htmlview';
import * as wechat from 'react-native-wechat';
import MyCalendar from '../components/common/calendar'
const { width, height }  = Dimensions.get('window');
import Button from 'apsl-react-native-button';
import MyButton from '../components/common/button';
import Rating from '../components/common/rating';
import * as QQAPI from 'react-native-qq';
import Alipay from 'react-native-payment-alipay';

import * as IM from './im';

export default class Test extends Component {
	constructor(props){
			super(props);
      let now = new Date();

			this.state = {
        loading_visible: false,
				language:'Java',
        imageUrl: {uri:"https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg"},
        size: { width: width, height: 280 },
        date: now.format('yyyy-MM-dd'),
        loadtest: false
			};
		}
    componentDidMount(){
      StorageUtil.load('user',(u)=>{
        if(u){
          //alert(u.name)
        }
        else{
          let user = {
            id:1,
            name: 'lin'
          }
          StorageUtil.save('user',user);
        }
      });
		}
    imActon(){
      // IM.login('15112133455','123456');
      IM.enterChatWindow('15088061473','https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/image/default_head.jpg')
    }
		onButtonPress(){
      //Actions.refresh()
      Tool.to('routelist',{lin:888})
		}
    pick(){
      OssUtils.uploadImage(this,(ret) => {
        this.setState({
          imageUrl: {uri: ret.fullUrl}
        });
      })
    }
    takePicture(){
      const options = {};
      this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
    scan(){
      Tool.to('scan',{callback:(response)=>{
        alert(this.state.language)
        Tool.to('mylistview')
        //alert(response.data)
      }})
    }
    wechataciton(){
      // wechat.openWXApp();
      let result = "await";
      // wechat.shareToSession({
      //   type: 'imageResource',
      //   title: 'resource image',
      //   description: 'share resource image to time line',
      //   mediaTagName: 'email signature',
      //   messageAction: undefined,
      //   messageExt: undefined,
      //   imageUrl: this.state.imageUrl.uri
      // });
      wechat.sendAuthRequest("snsapi_userinfo",'haiyue')
      .then(ret=>{
          fetch(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wechatAppID}&secret=${config.wechatAppSecret}&code=${ret.code}&grant_type=authorization_code`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:''
          })
          .then( (response) => {
            return response.json();
          })
          .then( (result ) => {
            console.log(result);
          })
          .catch((error) => {
            Tool.alertLong('微信登录失败！')
          });
      })
      .catch(e=>{
        console.log(e);
      });
      console.log('share resource image to time line successful', result);
    }
    toggleCalendar(){
      this.refs.calendar.open();
    }
    confirmFn(day){
      this.setState({
        date:day
      })
    }
    loadtest(){
      // this.setState({
      //   loadtest:true,
      // });
      // setTimeout(()=>{
      //   this.setState({
      //     loadtest:false,
      //   });
      // },3000);
    let data =   {
        	type: 'news',
        	title: '描述',
        	description: '描述',
        	webpageUrl: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/',
        	imageUrl: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg',
        }

      QQAPI.login('get_simple_userinfo')
      .then(ret=>{
        console.log(ret)
        QQAPI.shareToQQ(data)
        .then(ret=>{
          console.log(ret);
        })
        .catch(err=>{
          console.log(err);
        })
      })
    }
    alipay(){
      Alipay.pay("<form id=\"alipaysubmit\" name=\"alipaysubmit\" action=\"https://mapi.alipay.com/gateway.do?_input_charset=utf-8\" method=\"post\"><input type=\"hidden\" name=\"payment_type\" value=\"1\"/><input type=\"hidden\" name=\"out_trade_no\" value=\"500817113500021293\"/><input type=\"hidden\" name=\"service\" value=\"alipay.wap.create.direct.pay.by.user\"/><input type=\"hidden\" name=\"_input_charset\" value=\"utf-8\"/><input type=\"hidden\" name=\"total_fee\" value=\"1\"/><input type=\"hidden\" name=\"app_pay\" value=\"Y\"/><input type=\"hidden\" name=\"sign\" value=\"null\"/><input type=\"hidden\" name=\"return_url\" value=\"http://null\"/><input type=\"hidden\" name=\"notify_url\" value=\"http://null\"/><input type=\"hidden\" name=\"body\" value=\"598c336a42c4951134a493c6\"/><input type=\"hidden\" name=\"sign_type\" value=\"RSA\"/><input type=\"submit\" value=\"submit\" style=\"display:none;\"></form><script>document.forms['alipaysubmit'].submit();</script>").then(function(data){
                          alert('1'+data);
                      }, function (err) {
                          alert('2'+err);
                      });
    }
    onRate(rate){
      alert(rate)
    }
	  render() {
	    return (
        <View style={styles.container}>
  	      <ScrollView>
            <HTMLView
              value = '<p><a href="http://baidu.com">nice job!</a></p>'
              stylesheet = { styles.html_styles }
            />
            <Loading visible = {this.state.loading_visible}/>
            <MyButton onPress={this.toggleCalendar.bind(this)}>{'选择日期：'+this.state.date}</MyButton>
	           <Text style={styles.instructions}>
  	            welcome to haile, let us go fishing 66688
	           </Text>
             <Rating max={5} rating ={4} onRate = {this.onRate.bind(this)}/>
             <MyButton
               onPress = { ()=>{Tool.to('login')}} >
               login
             </MyButton>
              <MyButton
                onPress = { this.wechataciton.bind(this)} >
                wechataciton
              </MyButton>
              <Carousel
                delay={3000}
                style={this.state.size}
                autoplay
                onAnimateNextPage={(p) => {}}
                >
                <Image source={this.state.imageUrl} style={this.state.size}/>
                <Image source={this.state.imageUrl} style={this.state.size}/>
                <Image source={this.state.imageUrl} style={this.state.size}/>
              </Carousel>
              <MyButton
                isLoading = {this.state.loadtest}
                onPressOut = {this.loadtest.bind(this)}
              >
              loading
              </MyButton>
              <MyButton
                onPress={this.imActon.bind(this)}
                type = {2}
              >
              即使通讯
              </MyButton>
              <MyButton
                onPress={this.alipay.bind(this)}
              >
              支付宝
              </MyButton>
  	          <MyButton
  	          	onPress={this.onButtonPress.bind(this)}
                type = {2}
  	          >
              routelist
              </MyButton>
              <MyButton
  	          	onPress={ ()=>{ Tool.to('seawebview', {url: config.pagePath+'lineList', title:'列表'}) } }
                type = {3}
  	          >
              webview
              </MyButton>
              <MyButton onPress = {()=>Tool.to('video')}>
              video
              </MyButton>
              <MyButton onPress = {this.pick.bind(this)}>
              选择图片
              </MyButton>
              <TextInput
                underlineColorAndroid='transparent'
                selectionColor='#00cfff'
                style={{height:40,borderColor:'gray', borderWidth:0.5, borderRadius:3, marginBottom:10,marginLeft:10,marginRight:10}}
                placeholder="请输入"
              />
              <Image source={this.state.imageUrl} style={{width:400,height:200}}/>
              <Text onPress={this.scan.bind(this)} style={{padding:20,margin:20}}>扫描</Text>
  	      </ScrollView>
          <MyCalendar
            ref = { 'calendar' }
            seletDate = {this.state.date}
            markedDates = {{
              '2017-07-20': {price:'123456'},
              '2017-07-21': {price:'9234'},
              '2017-07-22': {price:'23456'},
              '2017-07-23': {price:'123456'},
              '2017-07-30': {selected: true, marked: true},
              '2017-07-24': {marked: true},
              '2017-07-25': {disabled: true},
              '2017-08-02': {marked: true},
              '2017-08-03': {price:'123456'}
            }}
            confirmFn={this.confirmFn.bind(this)}/>
        </View>
	    );
	  }
}

const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#eeeeee',
	  },
	  welcome: {
	    fontSize: 20,
	    textAlign: 'center',
	    margin: 10,
	  },
	  instructions: {
	    textAlign: 'center',
	    color: '#333333',
	    marginBottom: 5,
	  },
	  textColor:{
	  	backgroundColor:'#00CFFF',
	  	color:'#fff',
	  	borderRadius:18
	  },
	  picker:{
	  	width:200,
	  	height:50
	  }
});


const html_styles = StyleSheet.create({
  a:{
    color: "red",
  },
  img:{
    width: width,
    height: 50,
  }
});
