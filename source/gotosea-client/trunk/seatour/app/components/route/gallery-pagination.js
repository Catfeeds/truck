import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
}from 'react-native';

/**
 * @type {Object}
 */
export default class GalleryPagination extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentWillReceiveProps(props){

  }
  render(){
    let { style ,num } = this.props;
    return (
      <View style = { [styles.containers, style]}>
        <Text style = { styles.text }>1/{num}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  containers:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 40,
    height: 30,
  },
  text:{
    fontSize: 14,
    color: '#ffffff',
  }
})
