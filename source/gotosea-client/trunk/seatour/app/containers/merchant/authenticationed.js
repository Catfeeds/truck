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
import Tool from '../../utils/tool';

export default class authenticationed extends Component{
  constructor(props) {
    super(props);
    this.state = {
      realName: '',
      idNum: '',
    }
  }
  componentWillMount(){
    //merchantStatus:  1--未认证，2--已申请，3--认证成功，4--认证失败
   Tool.fetch(null, `${config.appUrlPath}rest/merchant`,'get',null,(ret)=>{
       this.setState({
         realName: ret.realName,
         idNum: ret.idNum,
       });
   })
  }
  render(){
    let { realName, idNum } = this.state;
    return(
      <ScrollView style = { styles.containers }>
        <View style = { styles.tip }>
          <Text style = { styles.tipText }>商家进行身份认证后成为平台正式商户，可享受平台返利补贴。</Text>
        </View>
        <View style = { styles.content }>
          <View style = { styles.imgContent }>
            <Image source={ require('../../images/merchant/icon_renz.png')}/>
            <Text style = { styles.renzOk }>你已通过认证</Text>
          </View>
          <Text style = { styles.info }>{'真实姓名   '+realName}</Text>
          <Text style = { styles.info }>{'身  份  证   '+idNum}</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers:{
    backgroundColor: '#ffffff',
  },
  tip: {
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  tipText: {
    color: '#acacac',
    fontSize: 14,
    lineHeight: 25,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 50,
  },
  imgContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    width: 131,
    height: 115,
    marginBottom: 12,
  },
  renzOk: {
    fontSize: 18,
    color: '#34a5f0',
  },
  info: {
    color: '#323232',
    fontSize: 14,
    lineHeight: 30,
  }

})
