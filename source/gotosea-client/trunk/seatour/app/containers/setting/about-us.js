import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Tool from '../../utils/tool'
import IconSpan2 from '../../components/common/icon-span2';
import MyButton from '../../components/common/button';

let { width, height } = Dimensions.get('window');

export default class AboutUs extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <ScrollView style={ styles.containers }>
        <View style={styles.contentView}>
          <Text style={styles.content}>
          海约行平台是广州市海约互联网信息服务有限公司全力打造的亲近海洋文化、体验渔家风情、投身海上垂钓、体验海岛休闲的综合信息平台。平台整合全球优质海洋娱乐资源，客户可直接在平台上制定行程、寻找船舶、组织出行。我们提供一站式服务，让客户以最低的价格、最高的品质、最便捷的方式，来开启您的海上休闲体验。
          </Text>
          <View style = { styles.copyright}>
            <Text style={styles.textGray}> Copyright @ 2017</Text>
            <Text style={styles.textGray}> 广州市海约互联网信息服务有限公司</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor:'#ffffff',
    padding: 20,
  },
  contentView: {
    minHeight: height-80,
  },
  content: {
    color: '#323232',
    fontSize: 14,
    lineHeight: 25,
  },
  copyright:{
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  textGray:{
    alignSelf: 'center',
    color: '#acacac',
    lineHeight: 20,
    fontSize: 12,
  }
})
