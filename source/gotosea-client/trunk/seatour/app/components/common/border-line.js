import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
}from 'react-native';

export default class BorderLine extends Component{

  constructor(props){
    super(props);
  }
  render(){
    let { style } = this.props;
    return (
        <View style = { [styles.containers, style]}></View>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    height: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb',
  },
})
