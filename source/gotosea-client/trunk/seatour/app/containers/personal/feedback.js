import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Tool from 'utils/tool'

import {Actions} from 'react-native-router-flux';

export default class Feedback extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: null,
    }
  }
  componentWillMount(){
    Actions.refresh({
        rightTitle: '提交',
        rightButtonTextStyle: { color: '#34a5f0'},
        onRight: () => {
          // Tool.fetch(null, `${config.appUrlPath}rest/traveler/${detail.id}`,'delete',null,(ret)=>{
          //   this.back();
          // });
        },
    });
  }
  render(){
    return(
      <ScrollView style={{ backgroundColor:'#f0f0f0'}}>
        <TextInput
          placeholder= {'您的意见对我们非常重要，感谢您的支持。'}
          multiline = { true }
          underlineColorAndroid='transparent'
          selectionColor='#34a5f0'
          clearButtonMode='while-editing'
          onChangeText={(text)=>{
            this.setState({text})
          }}
          style={ styles.text }
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#ffffff',
    fontSize: 14,
    minHeight: 220,
    padding: 15,
    paddingTop: 15,
    textAlignVertical: 'top',
    marginTop: 10,
  },
})
