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
import OssUtils from '../utils/oss-utils'
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

const { width, height }  = Dimensions.get('window');

/**
*使用方法：tool.to('video',{callback: fn})
*fn为读取成功后回调函数
*/
export default class Video extends Component{
  constructor(props){
    super(props);
    this.camera = null;
    this.state = {
      visible:false,
      torchText: '开灯',
      torchMode: Camera.constants.TorchMode.off,
      isEndAnimation:false,  //结束动画标记
    };
  }
  componentDidMount(){
    this.readSucc = false;
  }
  takeVideo(){
    let me = this;
    const options = {
      mode: Camera.constants.CaptureMode.video,
      jpegQuality: 50,
      totalSeconds: 10,
      target:Camera.constants.CaptureTarget.disk
    };
    this.camera.capture(options)
      .then((data) => {
        console.log(data)
        let file = {
          uri: data.path,
          fileName: 'video'
        }
        OssUtils.upload(me ,data.path, config.videoFolder, (ret)=>{
          console.log(ret);
        })
      })
      .catch(err => console.error(err));
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
          ref={(cam) => {
            this.camera = cam;
          }}
          style = {styles.camera}
          ref = { (cam) => { this.camera = cam;} }
          flashMode = { Camera.constants.FlashMode.auto }
          torchMode = { this.state.torchMode }
          type = { Camera.constants.Type.back }
          playSoundOnCapture = { true }
          captureQuality = { Camera.constants.CaptureQuality["288p"] }
          aspect = { Camera.constants.Aspect.fill }>
          <Text onPress={this.takeVideo.bind(this)}>takeVideo
          </Text>
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
