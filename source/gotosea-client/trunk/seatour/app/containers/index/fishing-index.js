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
import Swiper from 'react-native-swiper';
import IconSpan3 from 'components/common/icon-span3'
const { width, height }  = Dimensions.get('window');

import routeListStyle from 'styles/route/route-list';

export default class FishingIndex extends Component {
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
    getText(){
      let { datas } = this.state;
      let result = datas.map((v,k)=>{
        return(
          <TouchableOpacity key={'img-'+k} style={ styles.messageView }>
            <View style = { styles.messageLeft }>
              <Image source={require('images/index/icon_px.png')} style={ styles.panxie }/>
              <Text style = { styles.messageText }>{v.title}</Text>
            </View>
            <Text style = { styles.day }>2017-02-03</Text>
          </TouchableOpacity>
        )
      })
      return result;
    }
    getList( data ){
      data.tags = ['卡的风景','大法','发呆发呆发'];
      return (
        <TouchableOpacity style = {routeListStyle.cell} onPress = {()=>{Tool.to('routeDetail',{routeId: 1})}}>
          <ImageBackground source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.thumbnail } >
            <View style={ [routeListStyle.typeView, styles.typeView ]}>
              <Text style={ [routeListStyle.typeText, styles.typeText ] }>{'当地服务'}</Text>
            </View>
            <View style={ [routeListStyle.priceView,{backgroundColor:'#ff6e63'}]}>
                <Text style={ routeListStyle.priceText}>¥<Text style={ routeListStyle.price}>{7600}</Text>起</Text>
            </View>
          </ImageBackground>
          <View style={[routeListStyle.routeDetail,{paddingLeft:0,paddingRight:0}]}>
            <View>
              <Text style = {routeListStyle.routeName}>{'这是名称'}</Text>
              <View style={{ flexDirection: 'row'}}>
                {
                  data.tags && data.tags.map((v,k)=>{
                    return <Text key = {'r-tag'+k} style={routeListStyle.tagText}>{v}</Text>
                  })
                }
              </View>
            </View>
            <Text style = { routeListStyle.soldNum}>{'预约数'+'77'}</Text>
          </View>
        </TouchableOpacity>
      )
    }
	  render() {
	    return (
  	       <ScrollView style={styles.container}>
              <Image source={require('images/index/icon_tuijian.png')} style={styles.banner}/>
              <View style = { styles.center }>
                <Text style = { styles.title }>鱼情简讯</Text>
                <Swiper
                   loop = { true }
                   height = { 25 }
                   autoplay = { true }
                   horizontal = {true}
                   showsPagination = {false}
                   autoplayTimeout = {3}
                   >
                   {this.getText()}
                 </Swiper>
               </View>

              <View style={ styles.fnMoudle}>
                <IconSpan3
                  style = {{padding:15}}
                  title = {'去约船'}
                  defaultText = {'更多'}
                  titleStyle = {{fontSize: 17}}
                  textStyle = {{fontSize: 15}}
                  click = {()=>{Tool.to('routelist')}}
                />
                <FlatList
                  style = { styles.list }
                  data={ this.state.datas }
                  keyExtractor = {(item, index) => `route-${index}`}
                  renderItem={ (ret)=>this.getList(ret.item)}
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
	    backgroundColor: '#f0f0f0',
	  },
    banner:{
      width: width,
      height: 160,
    },
    center:{
      backgroundColor: '#ffffff',
      padding: 10,
      marginBottom: 10,
    },
    title:{
      fontSize: 17,
      color: '#323232',
      padding: 15,
      paddingLeft: 0,
    },
    messageView:{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    messageLeft:{
      flex: 1,
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflow: 'hidden',
      flexWrap: 'nowrap',
    },
    panxie:{
      width: 20,
      height: 16,
      marginRight: 5,
    },
    messageText:{
      flexWrap: 'nowrap',
      fontSize: 15,
      color: '#ff6e63',
      height: Platform.OS == 'ios'?16:18,
    },
    day:{
      width: 110,
      fontSize: 15,
      color: '#323232',
      textAlign: 'right',
    },
    fnMoudle: {
      backgroundColor: '#ffffff',
    },
    list:{
      padding: 10,
      paddingTop: 0,
    },
    thumbnail:{
      justifyContent: 'space-between',
      width: width - 20,
      height: 200,
      borderRadius:3,
    },
    typeView:{
      marginLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    typeText:{
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
});
