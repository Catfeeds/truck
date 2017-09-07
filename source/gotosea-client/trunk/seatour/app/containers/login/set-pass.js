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


export default class SetPass extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View>
        <View>
          <Text style={styles.tip}>首次登录请设置登录密码</Text>
          <View style={styles.textView}>
            <TextInput
              placeholder="请输入新密码（8-16位字母与数字组合）"
              secureTextEntry = {true}
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              style={styles.textStyle}
            />
          </View>
        </View>
        <MyButton style = {styles.loginBtn} onPress = { ()=>{}} >确认</MyButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tip:{
    fontSize: 14,
    color: '#323232',
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },
  textView: {
    borderColor:'#dbdbdb',
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
  },
  textStyle: {
    fontSize: 14,
    height:40,
    marginTop:5,
  },
  pass_yzm:{
    color:'#34a5f0',
    width: 80,
    textAlign:'center',
    lineHeight: Platform.OS == 'ios'?45:35,
  },
  loginBtn: {
    marginTop: 40,
    marginLeft:25,
    marginRight:25,
    borderRadius: 25,
    alignSelf: 'center',
  }
})
