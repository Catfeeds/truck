import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Tool from 'utils/tool';
import MyButton from 'components/common/button';
import {Actions} from 'react-native-router-flux';

let { width, height } = Dimensions.get('window');

export default class Integral extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount(){

  }
  conversion(){
    let { detail } = this.props;
    if( detail && detail.couponId ){
      Tool.fetch(null,`${config.appUrlPath}rest/credit/coupon/${detail.couponId}`,'post',{id: detail.couponId,number:1},(ret)=>{
  			Tool.alert('兑换成功');
  		});
    }
  }
  render(){
    let { detail } = this.props;
    return(
        <ScrollView style={ styles.containers }>
          <Image
            source={ require('images/personal/pic_dj.png')}
            style={ styles.imgBg}>
            <View style = { styles.titleView }>
              <View style = { styles.line }/>
              <Text style = { styles.name }>满减券</Text>
              <View style = { styles.line }/>
            </View>
            <Text style = { [styles.name, styles.amount] }>{`¥${detail.denomination}`}</Text>
            <Text style = { [styles.name,{marginLeft: 35}] }>{`${detail.integral}积分`}</Text>
          </Image>
          <View style={ styles.content }>
            <Text style={ styles.xxsm }>详细说明</Text>
            <Text style={ styles.titleName }>商品介绍：</Text>
            <Text style={ styles.text }>面值：{detail.denomination}元</Text>
            <Text style={ styles.text }>类型：任意线路及服务</Text>
            <Text style={ styles.text }>门槛：不可重复使用同一种优惠券</Text>
            <Text style={ styles.text }>有效期：领取后3月内有效</Text>
            <Text style={ styles.titleName }>兑换流程：</Text>
            <Text style={ styles.text }>1.点击[立即兑换]，优惠券即使发放至兑换账号；</Text>
            <Text style={ styles.text }>2.优惠券信息可在“我的优惠券”中查看；</Text>
            <Text style={ styles.titleName }>注意事项：</Text>
            <Text style={ styles.text }>1.优惠券不可赠与，只能本人使用；</Text>
            <Text style={ styles.text }>2.如有问题请拨打客服电话4000042010；</Text>
          </View>
          <MyButton style = { styles.btn } onPress = { this.conversion.bind(this)} >{'马上兑换'}</MyButton>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imgBg:{
    margin: 10,
    width: width - 20,
    height: 190,
  },
  name: {
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  titleView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginTop: 30,
  },
  line:{

  },
  amount:{
    fontSize: 36,
    marginLeft: 35,
    marginBottom: 30,
  },
  content:{
    width: width - 20,
    margin: 10,
    borderColor:'#dbdbdb',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 3,
  },
  xxsm:{
    fontSize: 14,
    color: '#acacac',
  },
  titleName:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#323232',
    marginTop: 15,
  },
  text:{
    fontSize: 12,
    color: '#323232',
    lineHeight: 18,
  },
  btn:{
    alignSelf: 'center',
    width: 140,
    marginTop: 30,
    marginBottom: 50,
  }
});
