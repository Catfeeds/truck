import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Spinner from './spinner';

export default class Loading extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false
    }
  }
  show(){
    this.setState({
      visible:true
    })
  }
  hide(){
    this.setState({
      visible:fale
    })
  }
  render(){
    let{visible, textContent} = this.props;
    return (
      <Spinner
          ref = {`spinner_${Date.now()}`}
          visible={visible}
          textContent={ textContent || '' }
          overlayColor='transparent'
          color='#34a5f0'
          textStyle={{color: '#34a5f0',fontSize:12}} />
      )
  }
}
