import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
} from 'react-native';

import Tabs from 'react-native-tabs';
import Tool from '../utils/tool';
import Test from './test';
import Index from './index/index';
import CommunityIndex from './community'
import WeatherIndex from './weather'
import ListView from './listview';
import SeaWebView from './webview';
import Personal from './personal/index';

import {Actions} from 'react-native-router-flux';

export default class IndexTabs extends Component {
		constructor(props){
				super(props);
        this.state = {page:1};
		}
    componentDidMount(){
      Actions.orderConfirm()
      // Actions.dynamicPublish()
      // Actions.dynamicShare()
    }
		componentWillMount(){
      let { index } = this.props;
      if(index){
        this.setState({page: index});
      }
		}
    onSelect( el ){
      Actions.refresh({
        // hideNavBar : true,
        renderTitle : null,
        renderLeftButton : null,
        renderRightButton : null,
      })
      let { name } = el.props;
      let title = '海约';
      if( name == 1 || name == 3 || name == 5){
        Actions.refresh({
          hideNavBar: true
        })
      }
      if( name == 3){
        Actions.map();
      }
      // else if( name == 5 ){
      //   Tool.to('login')
      // }
      else{
        this.setState({page: name});
      }
    }
	  render() {
      let { page } = this.state,
          self = this,
          container_view = <Text>page</Text>;
      switch (page) {
        case 1:
          container_view = <Index/>;
          break;
        case 2:
          container_view = <CommunityIndex/>;
          break;
        case 3:
          container_view = <Text>{this.state.page}</Text>;
          break;
        case 4:
            container_view = <WeatherIndex/>
            break;
        case 5:
            container_view = <Personal/>;
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
                  source={page==1 ? require('../images/btn_Home_s.png') : require('../images/btn_Home_n.png')}
                  style={ styles.imagieIco}/>
                <Text
                  style={ [styles.text, page==1 && styles.activeText ] }>
                  首页
                </Text>
              </View>
              <View name={2}>
                <Image
                  source={page==2 ? require('../images/btn_Comment-_s.png') : require('../images/btn_Comment-_n.png')}
                  style={ styles.imagieIco }/>
                <Text
                  style={ [styles.text, page==2 && styles.activeText ] }>
                  社区
                </Text>
              </View>
              <View name={3}>
                <Image
                  source={page==3 ? require('../images/btn_ditu-_s.png') : require('../images/btn_ditu-_n.png')}
                  style={ styles.imagieIco }/>
                <Text
                  style={ [styles.text, page==3 && styles.activeText ] }>
                  地图
                </Text>
              </View>
              <View name={4}>
                <Image
                  source={page==4 ? require('../images/btn_Sun_s.png') : require('../images/btn_Sun_n.png')}
                  style={ styles.imagieIco }/>
                <Text
                  style={ [styles.text, page==4 && styles.activeText ] }>
                  天气
                </Text>
              </View>
              <View name={5}>
                <Image
                  source={page==5 ? require('../images/btn_User_s.png') : require('../images/btn_User_n.png')}
                  style={ styles.imagieIco }/>
                <Text
                  style={ [styles.text, page==5 && styles.activeText ] }>
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
    backgroundColor: '#F5FCFF',
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
    width: 24,
    height: 20,
    marginBottom: 5,
    alignSelf: 'center',
  },
  text: {
    fontSize: 12,
    color: '#323232',
    alignSelf: 'center',
  },
  activeText:{
    color:'#34a5f0',
  },
});
