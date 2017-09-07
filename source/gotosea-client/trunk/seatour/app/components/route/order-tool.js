import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
}from 'react-native';

import Tool from 'utils/tool';

export default class OrderTool extends Component{
  constructor(props){
    super(props);
    this.state = {
      isCollect: props.isCollect,
    }
  }
  componentWillReceiveProps( props ){
    this.setState({ isCollect: props.isCollect })
  }
  compenment
  render(){
    let { collect, order, orderTitle } = this.props;
    let { isCollect } = this.state;
    return (
      <View style={ styles.botTool}>
        <TouchableOpacity style={ [styles.btoImgView, styles.btoImgViewBorder]} onPress={ ()=>{ Linking.openURL(`tel:${config.phone}`) } }>
          <Image source = { require('images/route/icon_phone.png')} style = { styles.btoImg } />
          <Text style = { styles.btoText}>客服</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.btoImgView} onPress={()=>{ Tool.isFunction(collect) && collect.call(this) }}>
          <Image source = { isCollect ? require('images/route/btn_shoucan_s.png') : require('images/route/btn_shoucan_n.png')} style = { styles.btoImg} />
          <Text style = { styles.btoText}>收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style = { styles.orderView } onPress={()=>{ Tool.isFunction(order) && order.call(this) }}>
          <Text style={ styles.orderText}>{ orderTitle || "立即预定" }</Text>
        </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  botTool:{
    flexDirection: 'row',
    height: 50,
    borderTopWidth: 0.5,
    borderColor: '#dbdbdb',
    backgroundColor: '#ffffff',
  },
  btoImgView:{
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btoImgViewBorder:{
    borderColor: "#dbdbdb",
    borderRightWidth: 0.5,
  },
  btoImg:{
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  btoText:{
    color: '#323232',
    fontSize: 11,
  },
  orderView:{
    flex: 1,
    backgroundColor: '#34a5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText:{
    color: '#ffffff',
    fontSize: 18,
  },
})
