import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import Tool from '../../utils/tool';
let { width } = Dimensions.get('window');

export default class SelectRole extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <ScrollView styles = { styles.containers }>
        <TouchableOpacity onPress={ ()=>Tool.to('touristtag') } >
          <Image source={require('../../images/role/btn_wxw.png')} style={ styles.img }/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=>Tool.to('merchanttag') } >
          <Image source={require('../../images/role/btn_wyzy.png')} style={ styles.img }/>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {

  },
  img: {
    width: width - 30,
    height: 200,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  }
})
