import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  FlatList,
  View,
} from 'react-native';

import Tool from 'utils/tool';

const { width, height }  = Dimensions.get('window');

export default class IslandIndex extends Component {
	constructor(props){
			super(props);
			this.state = {
        imageUrl: {uri:"https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg"},
        datas:[
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg',title:'标题2',content:'内容',author: 'lin'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/22/f4adc673139e4965aca8bc9240a595cf.jpg',title:'标题标题标题标题标标题标题标题标题标标题标题标题',content:'这个是内容这个是内容这个是容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容',author: 'lin'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg',title:'标题3',content:'内容',author: 'lin'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg',title:'标题4',content:'内容',author: 'lin'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/22/f4adc673139e4965aca8bc9240a595cf.jpg',title:'标题6',content:'内容',author: 'lin'}
        ]
			};
		}
    componentDidMount(){

		}
    getMerchant( data ){
      return <TouchableOpacity style = { styles.item }>
                <View style = { styles.itemView} >
                  <Image source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.img } />
                  <View style = { styles.content }>
                    <Text style = { styles.title }>撒娇飞机啊发撒娇飞机啊发</Text>
                    <View style = { styles.textView }>
                      <Text style = { styles.money }>¥</Text>
                      <Text style = { styles.price }>123456</Text>
                      <Text style = { styles.qi }>起</Text>
                    </View>
                  </View>
                </View>
             </TouchableOpacity>
    }
	  render() {
	    return (
  	       <ScrollView style={styles.container}>
              <Image source={require('images/index/icon_tuijian.png')} style={styles.banner}/>

              <View style={ styles.fnMoudle}>
                <ImageBackground source={require('images/index/icon_tuijian.png')} style={styles.listBg}>
                  <View style = { styles.tool }>
                    <Text style = { styles.toolText }>推荐</Text>
                    <TouchableOpacity style = { styles.moreView }>
                      <Text style = { styles.toolText }>更多</Text>
                      <Image source={require('images/index/bnt_ARROW---LEFT.png')} style={ styles.arrow }/>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
                <FlatList
                  style = { styles.list }
                  horizontal = {true}
                  data={ this.state.datas }
                  keyExtractor = {(item, index) => `merchanet-${index}`}
                  renderItem={ (ret)=>this.getMerchant(ret.item)}
                />
              </View>

              <View style={ styles.fnMoudle}>
                <ImageBackground source={require('images/index/icon_lmdj.png')} style={styles.listBg}>
                  <View style = { styles.tool }>
                    <Text style = { styles.toolText }>浪漫度假</Text>
                    <TouchableOpacity style = { styles.moreView }>
                      <Text style = { styles.toolText }>更多</Text>
                      <Image source={require('images/index/bnt_ARROW---LEFT.png')} style={ styles.arrow }/>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
                <FlatList
                  style = { styles.list }
                  horizontal = {true}
                  data={ this.state.datas }
                  keyExtractor = {(item, index) => `merchanet-${index}`}
                  renderItem={ (ret)=>this.getMerchant(ret.item)}
                />
              </View>

              <View style={ styles.fnMoudle}>
                <ImageBackground source={require('images/index/icon_cwty.png')} style={styles.listBg}>
                  <View style = { styles.tool }>
                    <Text style = { styles.toolText }>蜜月之选</Text>
                    <TouchableOpacity style = { styles.moreView }>
                      <Text style = { styles.toolText }>更多</Text>
                      <Image source={require('images/index/bnt_ARROW---LEFT.png')} style={ styles.arrow }/>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
                <FlatList
                  style = { styles.list }
                  horizontal = {true}
                  data={ this.state.datas }
                  keyExtractor = {(item, index) => `merchanet-${index}`}
                  renderItem={ (ret)=>this.getMerchant(ret.item)}
                />
              </View>
              <View style = {{height: 30}}/>
  	       </ScrollView>
	    );
	  }
}

const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#ffffff',
	  },
    banner:{
      width: width,
      height: 160,
      marginBottom: 5,
    },
    listBg:{
      width: width - 20,
      height: 160,
      borderRadius: 5,
    },
    fnMoudle: {
      margin: 10,
      height: 275,
    },
    list:{
      position: 'absolute',
      marginTop: 60,
    },
    item:{
      width: 145,
      height: 230,
      marginLeft: 10,
    },
    itemView:{
      borderRadius: 3,
      borderColor:'#dbdbdb',
      borderWidth: 0.3,
      borderTopWidth: 0,
      backgroundColor: '#ffffff',
      width: 140,
      height: 215,
      shadowColor: '#000000',
      shadowOpacity: 0.15,
      shadowRadius: 2,
      shadowOffset:{ height: 2},
      elevation: 2,
    },
    content:{
      padding: 10,
      paddingTop: 0,
      height: 100,
      justifyContent: 'space-between',
    },
    title:{
      fontSize: 15,
      color: '#646464',
      lineHeight: 25,
      paddingTop: 5,
    },
    img:{
      width:140,
      height: 115,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    textView:{
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 15,
    },
    money:{
      fontSize: 14,
      color: '#646464',
    },
    price: {
      fontSize: 16,
      color: '#34a5f0',
    },
    qi:{
      fontSize: 14,
      color: '#acacac',
    },
    tool:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      paddingTop: 20,
    },
    toolText:{
      fontSize: 15,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    moreView:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrow: {
      width: 9,
      height: 16,
      marginLeft: 5,
    },
});
