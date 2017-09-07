import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
}from 'react-native';

import Tool from 'utils/tool';

export default class Participant extends Component{
  constructor(props){
    super(props);
    let { btnText, datas } = props;
    this.state = {
      btnText: btnText,
      datas: datas || [],
    }
  }
  componentWillReceiveProps( props ){
    let { btnText, datas } = this.props;
    this.setState({ btnText, datas: props.datas || [] })
  }
  render(){
    let { del, add, style } = this.props;
    let { datas, btnText } = this.state;
    return (
      <View style={ [styles.orderDetail, style] }>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text style={ styles.insuranceTitle }>保险服务</Text>
          <TouchableOpacity style = {{ padding: 5}} onPress={()=>{ Tool.to('insurerExplanation')}}>
            <View style = { styles.tanhao }>
              <Text style={ styles.insuranceAssist}>!</Text>
            </View>
          </TouchableOpacity>
          <Text style={ styles.insuranceAssist}>为了您的安全请购买保险</Text>
        </View>
        <Text style={ styles.insuranceZy }>注：<Text style={ styles.insuranceAssist}>保险由美亚AIG“驴行天下”境内旅游保障公司提供</Text></Text>
        <View style={ styles.borerBto }/>
        <View style={{ marginBottom: 10}}>
          {
            datas.map( (v,k)=>{
              return <View style = { styles.pItem } key = {`pt-${k}`}>
                        <Text style={ styles.idName }>{ v.name }</Text>
                        <Text style={ styles.credNum }>{ v.credNum }</Text>
                        <TouchableOpacity style = { styles.delView } onPress={ ()=>{ Tool.isFunction(del) && del.call(this,v) } }>
                          <Image source={ require('images/community/btn_Delete-.png')} style = { styles.delImg}/>
                        </TouchableOpacity>
                      </View>
            })
           }
        </View>
        <TouchableOpacity style = { styles.bbrBtn} onPress={  ()=>{ Tool.isFunction(add) && add.call(this) } }>
          <Text style={ styles.bbr }>{btnText}</Text>
        </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  orderDetail:{
    backgroundColor: '#ffffff',
    padding: 15,
  },
  invoice:{
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  tanhao:{
    width: 12,
    height: 12,
    borderWidth: 0.5,
    borderColor: '#acacac',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bbrBtn:{
    borderColor: '#34a5f0',
    borderWidth: 0.5,
    borderRadius: 3,
    width: 120,
    height: 30,
    alignSelf: 'center',
    justifyContent:'center',
    alignItems: 'center',
  },
  bbr:{
    color: '#34a5f0',
    fontSize: 14,
  },
  insuranceTitle:{
    color: '#323232',
    fontSize: 14,
  },
  insuranceAssist:{
    fontSize: 12,
    color: '#acacac',
  },
  tanghao:{
    color: '#acacac',
    borderColor: '#acacac',
    borderWidth: 0.5,
    borderRadius: 6,
  },
  insuranceZy:{
    fontSize: 12,
    color: '#34a5f0',
    paddingTop: 10,
    paddingBottom: 15,
  },
  pItem:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	idName:{
		fontSize: 15,
		color: '#323232',
		width: 65,
	},
	credNum:{
		flex: 1,
		fontSize: 15,
		color: '#323232',
		paddingLeft: 20,
	},
	delView:{
		width: 28,
		padding: 8,
	},
	delImg:{
		width: 18,
		height: 18
	},
})
