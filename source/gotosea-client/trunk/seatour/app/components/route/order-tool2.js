import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
}from 'react-native';

import Tool from 'utils/tool';


export default class OrderTool2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      allprice: props.allprice,
    }
  }
  componentWillReceiveProps( props ){
    this.setState({ allprice: props.allprice })
  }
  render(){
    let { text, orderText, order } = this.props;
    let { allprice } = this.state;
    return (
      <View style={ styles.botTool}>
        <Text style = { styles.priceText}>{ text || '总价'}: <Text style={ styles.allprice}><Text style={{fontSize: 10}}>¥</Text>{allprice}</Text></Text>
        <TouchableOpacity style = { styles.orderView } onPress={ ()=>{ Tool.isFunction(order) && order.call(this) }}>
          <Text style={ styles.orderText}>{ orderText }</Text>
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
		alignItems: 'center',
		justifyContent: 'center',
  },
	priceText:{
		flex: 1,
		fontSize: 16,
		color: '#323232',
		paddingLeft: 10,
	},
	allprice:{
		fontSize: 18,
		color: 'red',
	},
  orderView:{
    width: 160,
		height: 50,
    backgroundColor: '#34a5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText:{
    color: '#ffffff',
    fontSize: 18,
  }
})
