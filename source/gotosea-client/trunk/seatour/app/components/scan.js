import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Easing,
  Image,
  View
} from 'react-native';
import Tool from '../utils/tool';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

const { width, height }  = Dimensions.get('window');

/**
*使用方法：tool.to('scan',{callback: fn})
*fn为读取成功后回调函数
*/
export default class Scan extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      torchText: '开灯',
      torchMode: Camera.constants.TorchMode.off,
      fadeInOpacity: new Animated.Value(0), // 初始值
      isEndAnimation:false,  //结束动画标记
    };
     this.startAnimation = this.startAnimation.bind(this);
  }
  componentDidMount(){
    this.readSucc = false;
    this.startAnimation(false);
  }
  startAnimation(isEnd){
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }).start(() => {
         if(isEnd){
           this.setState({
               isEndAnimation:true
           })
           return;
         }
         if (!this.state.isEndAnimation){
           this.state.fadeInOpacity.setValue(0);
           this.startAnimation(false)
         }
     }
    );
  }
  toggleTorchMode(){
    let torchMode,  torchText;
    if(Camera.constants.TorchMode.off == this.state.torchMode){
      torchMode = Camera.constants.TorchMode.on,
      torchText = '关灯'
    }else{
      torchMode = Camera.constants.TorchMode.off,
      torchText = '开灯'
    }
    this.setState({
      torchMode: torchMode,
      torchText: torchText
    });
  }
  /**
  *readSucc控制程序不持续读取二维码，读取成功一次则返回
  */
  onBarCodeRead(response){
    if(this.readSucc)return;
    this.readSucc = true;
    Tool.back();
    let{ callback } = this.props;
    if(Tool.isFunction(callback))
      callback.call(this,response);
  }
  render(){
    return (
        <Camera
          style = {styles.camera}
          ref = { (cam) => { this.camera = cam;} }
          flashMode = { Camera.constants.FlashMode.auto }
          torchMode = { this.state.torchMode }
          type = { Camera.constants.Type.back }
          playSoundOnCapture = { true }
          onBarCodeRead = { this.onBarCodeRead.bind(this) }
          aspect = { Camera.constants.Aspect.fill }>
          <View style = {styles.centerContainer}/>
          <View style = {{flexDirection:'row'}}>
            <View style = {styles.fillView}/>
            <View style = {styles.preview}>
              <Animated.View style={ {
                opacity: 1,
                transform:[{
                  translateY:this.state.fadeInOpacity.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,220]
                  })
                  }]
                }}>
                <Image source={require('../images/scan_line.png')} style={{width:220,height:2}}/>
              </Animated.View>
            </View>
            <View style = {styles.fillView}/>
          </View>
          <View style = {styles.bottomContainer}>
            <Text style = {styles.textTip}>将二维码/条形码放入框内，即可自动扫描</Text>
            <Text style = {styles.lightText} onPress = {this.toggleTorchMode.bind(this)}>{ this.state.torchText }</Text>
          </View>
        </Camera>
    )
  }
}

const styles = StyleSheet.create({
    camera:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerContainer:{
        flex: 3,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottomContainer:{
        flex: 4,
        width: width,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    fillView:{
        width: (width-220)/2,
        height: 220,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    preview:{
      borderColor: '#fff',
      borderBottomWidth: 0.5,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderTopWidth: 0.5,
      zIndex: 2,
      width: 220,
      height: 220,
      alignSelf: 'center',
      backgroundColor: 'transparent',
    },
    lightText:{
      zIndex: 2,
      width: 60,
      textAlign: 'center',
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      color: '#fff',
      padding: 10,
      margin: 20
    },
    textTip:{
      color: '#eeeeee',
      fontSize: 10,
      marginTop: 10,
      marginBottom: 10,
    }
});
