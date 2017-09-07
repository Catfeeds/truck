import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Tool from '../../utils/tool'
import IconSpan2 from '../../components/common/icon-span2';
import MyButton from '../../components/common/button';

export default class Setting extends Component{
  constructor(props) {
    super(props);
  }
  logout(){
    Tool.fetch(null,`${config.appUrlPath}rest/cust/logout`,'get',null,(ret)=>{
        Tool.to('indexTabs',{type:'reset'});
    });
  }
  render(){
    return(
      <ScrollView style={ styles.containers }>
        <IconSpan2 style={ [styles.spanBorder]}  text = {'清除缓存'}  click= { ()=>{ setTimeout(()=>{ Tool.alert('清除成功')}), 3000 } }/>
        <IconSpan2 style={ { marginBottom:5}}  text = {'密码管理'}  click= {()=>{ Tool.to('modify')}}/>
        <IconSpan2  text = {'关于海约'}  click= {()=>{ Tool.to('about')}}/>
        <MyButton style = { styles.btn} onPress = { this.logout.bind(this) } >退出登录</MyButton>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    borderRadius: 5,
    backgroundColor:'#f0f0f0',
    paddingTop: 10,
  },
  spanBorder: {
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb'
  },
  btn: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  }
})
