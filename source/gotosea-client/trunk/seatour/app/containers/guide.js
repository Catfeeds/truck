import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  Picker,
  Image,
  Dimensions,
  View,
  TouchableHighlight
} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import {Actions} from 'react-native-router-flux';

import Tool from '../utils/tool';

const { width, height } = Dimensions.get('window');

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs:[
        'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/03/2a83a929a6b441999d6bb56f48c9123b.jpg',
        'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/02/ce11adbd88e644cda2897b67a5da4676.jpg',
        'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/22/f4adc673139e4965aca8bc9240a595cf.jpg',

      ]
    }
  }
  componentWillMount(){

  }
  action(){
    let{ callback } = this.props;
    callback()
  }
  render(){
    return(
      <Carousel
        style={styles.imgStyle}
        autoplay = {false}
        pageInfo = {false}
        bullets = {true}
        onAnimateNextPage={(p)=>{}}
        >
        <Image source={{uri:this.state.imgs[0]}} style={styles.imgStyle}>
          <Text style={styles.ignore} onPress = {this.action.bind(this)}>跳过</Text>
        </Image>
        <Image source={{uri:this.state.imgs[1]}} style={styles.imgStyle}>
          <Text style={styles.ignore} onPress = {this.action.bind(this)}>跳过</Text>
        </Image>
        <Image source={{uri:this.state.imgs[2]}} style={styles.imgStyle}>
          <Text style={styles.enter}  onPress = {this.action.bind(this)}>立即体验</Text>
        </Image>
      </Carousel>
    )
  }
}

const styles = StyleSheet.create({
  imgStyle:{
    width: width,
    height: Platform.OS === 'ios'?height:(height-20),
  },
  ignore: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    right: 20,
    top: 40,
  },
  enter: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    top: height - 120,
  },
})
