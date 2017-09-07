import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import MyButton from '../../components/common/button';
import Tool from '../../utils/tool';
import {Actions} from 'react-native-router-flux';
import Loading from '../../components/common/loading';

let interval = null;

export default class Login extends Component{
  constructor(props) {
    super(props);
    //1验证码登录，2密码登录
    this.state = {
      loginType: 1,
      loading_visible: false,
      phone: null,
      password: null,
      yzm: null,
      isGetYzm: false,
      second: 30,
    }
  }
  componentWillUnmount(){
      interval && clearInterval(interval);
  }
  componentWillMount(){
    let {loginType} = this.state;
    this.refreshTitle(loginType);
  }
  refreshTitle(loginType){
    let me = this;
    let lef_btn, right_btn;
    if(loginType==1){
      lef_btn = [styles.textLeftView,styles.textViewSelect];
      right_btn = [styles.textRightView, styles.textViewUnSelect]
    }else{
      lef_btn = [styles.textLeftView,styles.textViewUnSelect];
      right_btn = [styles.textRightView, styles.textViewSelect]
    }
    Actions.refresh({
        backButtonImage: require('../../images/btn_guanbi.png'),
        leftButtonIconStyle: {width: 18, height: 18},
        renderTitle:()=>{
          return (
              <View style={styles.title}>
                <TouchableOpacity style = { lef_btn } onPress={()=>{me.changeLoginType(1)}}>
                  <Text style={ loginType==1?styles.typeTextSelect:styles.typeTextUnSelect}>验证码登录</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {right_btn } onPress={()=>{me.changeLoginType(2)}}>
                  <Text style={ loginType==2?styles.typeTextSelect:styles.typeTextUnSelect }>密码登录</Text>
                </TouchableOpacity>
              </View>
        )
        }
    });
  }
  changeLoginType( type ){
    let { loginType } = this.state;
    if( loginType == 1){
      this.refreshTitle(2);
      this.setState({
        loginType: 2,
      });
    }else{
      this.refreshTitle(1);
      this.setState({
        loginType: 1,
      });
    }
  }
  getYzm(){
    let me = this;
    let { phone } = this.state;
    if(phone==null){
      Tool.alert('请输入手机号',true);
      return;
    }else{
      me.setState({isGetYzm: true});
      interval = setInterval(()=>{
        let{ second } = me.state;
        //console.log(second);
        if(second>0){
          let s = second -1;
          me.setState({second: s});
        }else if(second==0){
          clearInterval(interval);
          me.setState({
            second: 30,
            isGetYzm: false,
          })
        }
      },1000);
      Tool.fetch(null, config.appUrlPath+'rest/sms/code','get',{phone:phone}, null, (ret)=>{
        clearInterval(interval);
        me.setState({
          second: 30,
          isGetYzm: false,
        })
      });
    }
  }
  getYzmCotent(){
    let { isGetYzm, second } = this.state;
    if(isGetYzm){
      return <Text style={[styles.pass_yzm,{color:'gray'}]} >{ second+'秒后重发' }</Text>;
    }else{
      return <Text style={styles.pass_yzm} onPress={ this.getYzm.bind(this) }>获取验证码</Text>;
    }
  }
  getContent(){
    let { loginType } = this.state;
    let content = null;
    if( loginType==1 ){
      content = (
        <View style={[styles.textView,{flexDirection:'row', justifyContent:'space-between'}]}>
          <TextInput
            placeholder="请输入验证码"
            underlineColorAndroid='transparent'
            selectionColor='#34a5f0'
            clearButtonMode='while-editing'
            onChangeText={(text)=>{ this.setState({yzm:text})}}
            style={[styles.textStyle,{flex:1}]}
          />
          { this.getYzmCotent() }
        </View>
      )
    }else{
      content = (
        <View>
          <View style={[styles.textView,{flexDirection:'row', justifyContent:'space-between'}]}>
            <TextInput
              placeholder="请输入密码"
              secureTextEntry = {true}
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              onChangeText={(text)=>{ this.setState({password:text})}}
              style={[styles.textStyle,{flex:1}]}
            />
          </View>
          <Text onPress = {()=>{Tool.to('resetPass')}} style={ styles.changeLoginType} >忘记密码</Text>
        </View>
      )
    }
    return content;
  }
  login(){
    let { loginType, phone, password, yzm } = this.state;
    if( loginType == 1){
      if(!phone || !yzm){
        Tool.alert('请输入手机或验证码');
        return;
      }
      Tool.fetch(this,`${config.appUrlPath}rest/cust/logincode`,'post',{phone: phone,code:yzm },(ret)=>{
        if(ret.ifFirst){
          Tool.to('selectrole',{type: 'replace'});
        }else{
          Tool.to('indexTabs',{type:'reset'})
        }
      })
    }else{
      if(!phone || !password){
        Tool.alert('请输入手机或密码');
        return;
      }
      Tool.fetch(this,`${config.appUrlPath}rest/cust/loginpwd`,'post',{phone: phone,password:password },(ret)=>{
        if(ret.ifFirst){
          Tool.to('selectrole',{type: 'replace'});
        }else{
          Tool.to('indexTabs',{type:'reset'});
        }
      });
    }
  }
  render(){
    return(
      <View>
        <Loading  visible={this.state.loading_visible} />
        <View>
          <Image  style={styles.logo} source={require('../../images/logo.png')}/>
        </View>
        <View>
          <View style={styles.textView}>
            <TextInput
              placeholder="请输入手机号"
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              onChangeText={(text)=>{ this.setState({phone:text})}}
              style={styles.textStyle}
            />
          </View>
          { this.getContent() }
        </View>
        <MyButton
          style = {styles.loginBtn}
          onPress = { this.login.bind(this) }
          >
          登录
        </MyButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    width: 220,
    height: 30,
    marginTop: Platform.OS == 'ios'?25:10,
    borderRadius: 15,
    justifyContent:'space-between',
    alignSelf: 'center',
    flexDirection:'row',
    borderColor: '#34a5f0',
    borderWidth: 0.5,
  },
  textLeftView:{
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  textRightView:{
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  textViewSelect:{
    flex: 1,
    height:29,
    backgroundColor: '#34a5f0',
  },
  textViewUnSelect:{
    flex: 1,
    height:29,
    backgroundColor: '#ffffff',
  },
  typeTextSelect:{
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: 25,
    color: '#ffffff',
  },
  typeTextUnSelect:{
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: 25,
    color: '#323232',
  },
  logo: {
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 30,
    marginBottom: 30,
  },
  textView: {
    borderColor:'#dbdbdb',
    borderBottomWidth: 0.5,
    marginLeft:25,
    marginRight:25
  },
  textStyle: {
    height:40,
    marginTop:5,
  },
  loginBtn: {
    marginTop:30,
    marginLeft:25,
    marginRight:25,
    borderRadius: 25,
    alignSelf: 'center',
  },
  pass_yzm:{
    color:'#34a5f0',
    width: 80,
    textAlign:'center',
    lineHeight: Platform.OS == 'ios'?45:35,
  },
  changeLoginType:{
    alignSelf:'flex-end',
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#acacac',
  }
})
