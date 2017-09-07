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


export default class Modify extends Component{
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      password2: null,
    }
  }
  update(){
    let { password, password2 } = this.state;
    if(!password || !password2 ){
      Tool.alertLong('请输入密码');
      return;
    }else if( password.length<6 || password.length > 18 ){
      Tool.alertLong('密码长度有不正确');
      return;
    }else if(password != password2 ){
      Tool.alertLong('两次输入密码不一致');
      return;
    }else{
      Tool.fetch(null, `${config.appUrlPath}rest/cust/pwd`, 'put',{ password }, ()=>{
        Tool.alert('密码修改成功');
      })
    }
  }
  render(){
    return(
      <ScrollView style={ styles.containers }>
        <View style={ styles.content }>
          <View style={[styles.textView, { borderBottomWidth: 0.5}]}>
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
        <MyButton style = {styles.loginBtn} onPress = { this.update.bind(this) } >确认</MyButton>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers:{
    backgroundColor: '#f0f0f0',
  },
  content:{
    margin: 10,
    backgroundColor: '#ffffff'
  },
  textView: {
    height:40,
    borderColor:'#dbdbdb',
  },
  textStyle: {
    padding: 10,
    height:40,
    fontSize: 14,
  },
  loginBtn: {
    marginLeft:10,
    marginRight:10,
    alignSelf: 'center',
  }
})
