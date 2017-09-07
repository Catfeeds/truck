import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import Tool from 'utils/tool'

export default class Invite extends Component{
  constructor(props) {
    super(props);

  }
  componentWillMount(){

  }
  render(){
    return(
      <ScrollView style={ styles.containers }>
        <View style = { styles.view }>
          <Image source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.img }/>
          <Text style = { styles.text }>朋友通过您的二维码成功注册后，您将获得100快代金券</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers:{
    flex: 1,
    backgroundColor: '#ffffff',
  },
  view:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    width: 200,
    height: 200,
    marginTop: 100,
  },
  text: {
    fontSize: 14,
    color: '#acacac',
    marginTop: 30,
  },
})
