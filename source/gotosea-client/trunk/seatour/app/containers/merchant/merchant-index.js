import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import Tabs from 'react-native-tabs';
import Tool from '../../utils/tool';
import My from './my';
import OrderIdex from './order/index';
import MerchantWallet from './wallet/merchant-wallet';

import {Actions} from 'react-native-router-flux';

export default class MerchantIndex extends Component {
		constructor(props){
				super(props);
        this.state = {page:1};
		}
		componentWillMount(){
      let { index } = this.props;
      if(index){
        this.setState({page: index});
      }
		}
    onSelect( el ){
      let { name } = el.props;
      let title = '订单';
      if( name == 2 )
        title = '我的钱包';
      else if( name == 3 )
        title = '我的';
      this.setState({page: name},()=>{
        Actions.refresh({
          title: title,
        })
      });
    }
	  render() {
      let { page } = this.state,
          self = this,
          container_view = <Text>page</Text>;
      switch (page) {
        case 1:
          container_view = <OrderIdex />;
          break;
        case 2:
          container_view = <MerchantWallet />;
          break;
        case 3:
            container_view = <My/>;
            break;
        default:
          container_view = <Text>other page+{this.state.page}</Text>;
      }
	    return (
        <View style={styles.container}>
          <Tabs selected={this.state.page}
                style={ styles.tabs}
                onSelect={el=>this.onSelect(el)}>
              <View name={1}>
                <Image
                  source={page==1 ? require('../../images/merchant/btn_Newspaper_s.png') : require('../../images/merchant/btn_Newspaper_n.png')}
                  style={ styles.imagieIco}/>
                <Text
                  style={ [styles.text, page==1 && styles.activeText ] }>
                  订单
                </Text>
              </View>
              <View name={2}>
                <Image
                  source={page==2 ? require('../../images/merchant/btn_wallet_s.png') : require('../../images/merchant/btn_wallet_n.png')}
                  style={ styles.imagieIco}/>
                <Text
                  style={ [styles.text, page==2 && styles.activeText ] }>
                  钱包
                </Text>
              </View>
              <View name={3}>
                <Image
                  source={page==3 ? require('../../images/merchant/btn_User_s.png') : require('../../images/merchant/btn_User_n.png')}
                  style={ styles.imagieIco}/>
                <Text
                  style={ [styles.text, page==3 && styles.activeText ] }>
                  我的
                </Text>
              </View>
          </Tabs>
            <View style={styles.container_view}>
              {container_view}
            </View>
        </View>
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  tabs:{
    backgroundColor: '#ffffff',
    borderColor: '#bdbdbd',
    borderTopWidth : 0.5,
  },
  container_view:{
    flex:1,
    marginBottom: 50,
    backgroundColor:"#F5FCFF"
  },
  imagieIco: {
    width: 20,
    height: 20,
    marginBottom: 5,
    alignSelf: 'center',
  },
  text: {
    fontSize: 11,
    color: '#323232',
    alignSelf: 'center',
  },
  activeText:{
    color:'#34a5f0',
  },
});
