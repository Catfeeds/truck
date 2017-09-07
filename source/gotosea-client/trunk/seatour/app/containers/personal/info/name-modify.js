import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
} from 'react-native';

import Tool from 'utils/tool';
import {Actions} from 'react-native-router-flux';

let { width, height } = Dimensions.get('window');

export default class NameModify extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    }
  }
  componentWillMount(){
    Actions.refresh({
      rightTitle: '保存',
      rightButtonTextStyle: {color: '#34a5f0'},
      onBack: ()=>{
        let { name } = this.state;
        if( !name ){
          Tool.alert('请输入昵称');
          return;
        }
        Tool.back({refresh: ({name})})
      },
      onRight:()=>{
        let { name } = this.state;
        if( !name ){
          Tool.alert('请输入昵称');
          return;
        }
        Tool.fetch(null,`${config.appUrlPath}rest/cust`,'put',{name},(ret)=>{
          Tool.alert('信息更新成功');
        });
      }
    })
  }
  render(){
    let { name } = this.state;
    return(
        <ScrollView style={ styles.containers }>
          <View style={ styles.textView }>
            <TextInput
              placeholder="请输入昵称"
              defaultValue= { name }
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              onChangeText={(text)=>{ this.setState({name:text})} }
              style={ styles.textStyle }
            />
          </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers:{
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  textView:{
    backgroundColor: '#ffffff',
    height: 40,
    borderRadius: 3,
    width: width - 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    width: width - 20,
    height: 40,
    fontSize: 14,
    color: '#323232',
    paddingLeft: 10,
  }
})
