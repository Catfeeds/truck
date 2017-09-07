import React, { Component } from 'react';
import {
  StyleSheet
}from 'react-native';
import Button from 'apsl-react-native-button'

/**
*type:按钮样式， 默认1
*1: 蓝底白字，
*2: 白底蓝字
*3: 白底灰字
*4: 不可点击状态
*/
export default class MyButton extends Component{
  render(){
    let{
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      textStyle,
      isLoading,
      isDisabled,
      activeOpacity,
      style,
      type,
    } = this.props,
    s = styles.btnStyle_blue,
    ts = styles.btnTextStyle_white ;
    if(type == 2){
      s = styles.btnStyle_white,
      ts = styles.btnTextStyle_blue ;
    }else if(type ==3 ){
      s = styles.btnStyle_gray,
      ts = styles.btnTextStyle_gray ;
    }else if(type ==4 ){
      s = styles.btnStyle_un,
      ts = styles.btnTextStyle_gray ;
    }

    return(
      <Button
        onPress = { onPress }
        onPressIn = { onPressIn }
        onPressOut = { onPressOut }
        onLongPress = { onLongPress }
        style = { [styles.btnStyle, style, s] }
        textStyle = { [textStyle, ts] }
        isLoading = { isLoading }
        isDisabled = { isDisabled }
        activeOpacity = { 0.7 }
      >
        {this.props.children}
      </Button>
    )
  }
}

let styles = StyleSheet.create({
  btnStyle:{

  },
  btnStyle_blue:{
    backgroundColor:'#34a5f0',
    borderColor:'#00bbe6'
  },
  btnStyle_white:{
    backgroundColor:'#ffffff',
    borderColor:'#34a5f0',
  },
  btnStyle_gray:{
    backgroundColor:'#ffffff',
    borderColor:'#dbdbdb',
  },
  btnStyle_un:{
    backgroundColor:'#f0f0f0',
    borderColor:'#f0f0f0',
  },
  btnTextStyle_white:{
    color: '#fff',
    fontSize: 18,
  },
  btnTextStyle_blue:{
    color: '#34a5f0',
    fontSize: 18,
  },
  btnTextStyle_gray:{
    color: '#acacac',
    fontSize: 18,
  }
})
