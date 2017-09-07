import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Tabs from 'react-native-tabs';
import Tool from '../../utils/tool';
import Test from '../test';

import {Actions} from 'react-native-router-flux';

export default class My extends Component {
		constructor(props){
				super(props);
        this.state = {
          detail: {},
        };
		}
		componentWillMount(){
      Tool.fetch(null, `${config.appUrlPath}rest/merchant`,'get',null,(ret)=>{
          this.setState({
            detail: ret
          });
      });
		}
	  render() {
      let { detail } = this.state;
	    return (
        <ScrollView style={styles.container}>
          <View style = { styles.chunk }>
            <TouchableOpacity style = { styles.TopView }>
              <Text style = { styles.num }> {detail.orderCount} </Text>
              <Text style = { styles.numDes}> 总订单 </Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.TopView }>
              <Text style = { styles.num }> {detail.grade} </Text>
              <Text style = { styles.numDes}> 好评率 </Text>
            </TouchableOpacity>
          </View>

          <View style = { styles.chunk }>
            <TouchableOpacity style = { styles.bomView } onPress={ ()=>{
              if( detail.merchantStatus == 3)
                Tool.to('authenticationed')
              else
                Tool.to('authentication')
            } }>
              <Image source = {require('images/merchant/btn_shenfenz.png')} style = { styles.img } />
              <Text style = { styles.imgTitle}> 身份证认证 </Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.bomView } onPress={ ()=>Tool.to('merchantInfo') }>
              <Image source = {require('images/merchant/btn_sjxx.png')} style = { styles.img } />
              <Text style = { styles.imgTitle}> 商家信息 </Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.bomView } onPress={ ()=>Tool.to('merchantSet')}>
              <Image source = {require('images/merchant/btn_shezhi.png')} style = { styles.img } />
              <Text style = { styles.imgTitle}> 设置 </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  chunk: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  TopView: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bomView: {
    flex: 1,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  num: {
    color: '#323232',
    fontSize: 21,
    marginBottom: 5,
  },
  numDes: {
    color: '#acacac',
    fontSize: 14,
  },
  img: {
    width: 40,
    height: 40,
    marginBottom: 7
  },
  imgTitle: {
    color: '#323232',
    fontSize: 14,
  }
});
