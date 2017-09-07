import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
}from 'react-native';

/**
 * @type {Object}
 */
export default class Service extends Component{
  constructor(props){
    super(props);
    let { insurance, coupon, redeem } = props;
    this.state = {
      insurance: insurance,
      coupon: 0,
      redeem: redeem,
    }
  }
  componentWillReceiveProps(props){
    let { insurance, coupon, redeem } = props;
    this.setState({insurance, coupon, redeem})
  }
  render(){
    let { insurance, coupon, redeem } = this.state;
    return (
      <View style = { [styles.serviceView, this.props.style]}>
        { insurance == 1 &&
          <View style={styles.serviceItem}>
            <Image source = { require('images/route/icon_ok.png')} style = { styles.servieImg} />
            <Text style={ styles.serviceText}>保险服务</Text>
          </View>
        }
        { coupon == 1 &&
          <View style={styles.serviceItem}>
            <Image source = { require('images/route/icon_ok.png')} style = { styles.servieImg} />
            <Text style={ styles.serviceText}>支持优惠券</Text>
          </View>
        }
        { redeem == 1 &&
          <View style={styles.serviceItem}>
            <Image source = { require('images/route/icon_ok.png')} style = { styles.servieImg} />
            <Text style={ styles.serviceText}>积分兑换</Text>
          </View>
        }
      </View>
      )
  }
}

const styles = StyleSheet.create({
  serviceView:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderColor: '#dbdbdb',
    backgroundColor: '#ffffff',
  },
  serviceItem:{
    marginLeft: 15,
    flexDirection: 'row',
  },
  servieImg:{
    width: 14,
    height: 14
  },
  serviceText:{
    color: '#acacac',
    paddingLeft: 5,
    fontSize: 12,
  },
})
