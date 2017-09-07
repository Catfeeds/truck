import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import MyButton from '../../components/common/button';
import Tool from '../../utils/tool';
const resetinterval = null;

export default class Reset extends Component{
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      yzm: null,
      password: null,
      password2: null,
      isGetYzm: false,
      second: 30,
    }
  }
  reset(){
    let { phone, yzm, password, password2 } = this.state;
    if(!phone || !yzm || !password || !password2){
      Tool.alertLong('请完成信息填写');
      return;
    }else if(password != password2){
        Tool.alertLong('两次密码输入不一致');
        return;
    }else if(password.length < 6 || password.length > 18){
      Tool.alertLong('密码长度不正确');
      return;
    }else{
      Tool.fetch(this,`${config.appUrlPath}rest/cust/resetpwd`,'put',{code: yzm, password:password },(ret)=>{
        Tool.back();
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
      resetinterval = setInterval(()=>{
        let{ second } = me.state;
        if(second>0){
          let s = second -1;
          me.setState({second: s});
        }else if(second==0){
          clearInterval(resetinterval);
          me.setState({
            second: 30,
            isGetYzm: false,
          })
        }
      },1000);
      Tool.fetch(this, config.appUrlPath+'rest/sms/code','get',{phone:phone});
    }
  }
  render(){
    return(
      <View>
        <View>
          <View style={styles.textView}>
            <TextInput
              placeholder="请输入手机号"
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              style={styles.textStyle}
              onChangeText={(text)=>{ this.setState({phone:text})}}
            />
          </View>
          <View style={[styles.textView,{flexDirection:'row', justifyContent:'space-between'}]}>
            <TextInput
              placeholder="请输入验证码"
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              style={[styles.textStyle,{flex:1}]}
              onChangeText={(text)=>{ this.setState({yzm:text})}}
            />
            <Text style={styles.pass_yzm} onPress={ this.getYzm.bind(this) }>获取验证码</Text>
          </View>
          <View style={styles.textView}>
            <TextInput
              placeholder="请输入新密码（6-18位字母与数字组合）"
              secureTextEntry = {true}
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              style={styles.textStyle}
              onChangeText={(text)=>{ this.setState({password:text})}}
            />
          </View>
          <View style={styles.textView}>
            <TextInput
              placeholder="请再次输入新密码"
              secureTextEntry = {true}
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              style={styles.textStyle}
              onChangeText={(text)=>{ this.setState({password2:text})}}
            />
          </View>
        </View>
        <MyButton style = {styles.loginBtn} onPress = {this.reset.bind(this)} >确认</MyButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textView: {
    borderColor:'#dbdbdb',
    borderBottomWidth: 0.5,
  },
  textStyle: {
    fontSize: 14,
    height:40,
    marginTop:5,
    paddingLeft: 20,
  },
  pass_yzm:{
    color:'#34a5f0',
    width: 100,
    textAlign:'center',
    lineHeight: Platform.OS == 'ios'?45:35,
  },
  loginBtn: {
    marginTop: 40,
    marginLeft:20,
    marginRight:20,
    borderRadius: 25,
    alignSelf: 'center',
  }
})
