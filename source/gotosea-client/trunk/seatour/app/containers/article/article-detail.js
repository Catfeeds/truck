import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
	Dimensions,
	View,
	TouchableOpacity,
	Image,
	Text,
  ScrollView,
  WebView,
} from 'react-native';

import Tool from 'utils/tool';
let { width, height } = Dimensions.get('window');

const injectScript = `
		(function () {
		  var height = null;
		  function changeHeight() {
		    if (document.body.scrollHeight != height) {
		      height = document.body.scrollHeight;
		      if (window.postMessage) {
		        window.postMessage(height)
		      }
		    }
		  }
		  setInterval(changeHeight, 300);
		}());
		`;

export default class ArticleDetail extends Component {
		constructor(props){
				super(props);
        this.state = {
    			loading_visible: false,
          wh1: 1,
          isThumb: props.isThumb,
    		}
		}
		componentWillMount(){

		}
    dz(){
      let { id, isThumb } = this.props;
      if(isThumb){
        Tool.alert('您已点过赞了哦！');
        return;
      }
      Tool.fetch(null,`${config.appUrlPath}rest/art/thumb/${id}`,'post',{artId:id},(ret)=>{
        this.setState({isThumb: true});
      });
    }
	  render() {
      let { id } = this.props,
          { wh1 , isThumb} = this.state;
      return(
        <ScrollView style = {{flex:1, backgroundColor:'#f0f0f0'}}>
          <WebView
            style={{width: width, height: wh1}}
            javaScriptEnabled = {true}
            injectedJavaScript={injectScript}
            onMessage={(even)=>{
              let { data } = even.nativeEvent;
              if( data != '[object Object]'){
                this.setState({
                  wh1:(parseInt(data))
                });
              }
            }}
            source={{uri: `${config.appUrlPath}rest/art/${id}`}}
          />
          <View style={ styles.dzView}>
            <Text style = { styles.text }>你的点赞时我的进步的动力</Text>
            <TouchableOpacity style = { [styles.zView, isThumb && styles.zViewed]} onPress={this.dz.bind(this)}>
              <Image source={require('images/index/icon_thumbs-up.png')} style={ styles.dianzImg }/>
              <Text style = { [styles.text, isThumb && styles.textEd] }>赞</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
	    );
	  }
}

const styles = StyleSheet.create({
  dzView:{
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text:{
    fontSize: 14,
    color: '#acacac',
    paddingTop: 15,
    paddingBottom: 15,
  },
  zView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: 110,
    borderRadius: 3,
  },
  zViewed:{
    backgroundColor: '#34a5f0',
  },
  textEd:{
    color: '#ffffff',
  },
  dianzImg:{
    width: 18,
    height: 14,
    marginRight: 5,
  }
});
