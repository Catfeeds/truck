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

import Carousel from 'react-native-looped-carousel';
import Swiper from 'react-native-swiper';
import IconSpan3 from 'components/common/icon-span3'
import Rating from 'components/common/rating';
import Tool from 'utils/tool';

import routeListStyle from 'styles/route/route-list';

const { width, height }  = Dimensions.get('window');

export default class Index extends Component {
	constructor(props){
			super(props);
			this.state = {
        imageUrl: {uri:"https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg"},
        size: { width: width, height: 200 },
        ativities: [
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/22/f4adc673139e4965aca8bc9240a595cf.jpg'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'},
          {img:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/22/f4adc673139e4965aca8bc9240a595cf.jpg'}
        ],
        articles:[
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
    search(type){
      console.log(type)
    }
    getText(){
      let { articles } = this.state;
      let result = articles.map((article,index)=>{
        return(
          <TouchableOpacity key={'img-'+index} style={ styles.hdView }>
            <Image source={require('images/index/icon_qiqiiu.png')} style={{width:20, height: 21}}/>
            <Text style = { styles.hdText }>{article.title}</Text>
          </TouchableOpacity>
        )
      })
      return result;
    }
    gethd(){
      let { ativities ,size} = this.state;
      let result = ativities.map((img,index)=>{
        return(
          <TouchableOpacity key={`hd-${index}`}>
            <Image source={{uri:img.img}} style={size} />
          </TouchableOpacity>
        )
      })
      return result;
    }
    getConvene( data ){
      return <TouchableOpacity style = { styles.conveneItem }>
              <View style = { styles.conveneImgVIew }>
                <Image source={require('images/index/icon_zjz.png')} style={{width:20,height:50}}/>
                <Image source={require('images/logo.png')} style={styles.convenePic}/>
              </View>
              <View style = {{justifyContent:'center',alignItems:'center'}}>
                <Text style = { styles.conveneName }>那个谁</Text>
                <Text style = { styles.conveneTime }>活动日期 2012-22-11</Text>
                <Text style = { styles.conveneTitle }>阿娇到了放假啊都失联飞机阿</Text>
              </View>
             </TouchableOpacity>
    }
    getHotRoute(data){
      data.tags = ['卡的风景','大法','发呆发呆发'];
      return (
        <TouchableOpacity style = {routeListStyle.cell} onPress = {()=>{Tool.to('routeDetail',{routeId: 1})}}>
          <ImageBackground source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.thumbnail } >
            <View style={ routeListStyle.typeView}>
              <Text style={ routeListStyle.typeText}>{'线路游 | '+ '气象局啊'}</Text>
            </View>
            <View style={ routeListStyle.priceView }>
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
    getMerchant( data ){
      return <TouchableOpacity style = { styles.merchantItem }>
                <Image source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.merchantImg } />
                <Text style = { [styles.conveneName,{padding: 15, paddingLeft:0, paddingBottom:7}] }>那个谁</Text>
                <Rating rating = {4} editable={false}/>
             </TouchableOpacity>
    }
	  render() {
	    return (
  	       <ScrollView style={styles.container}>
              <View style = { styles.tool }>
                <TouchableOpacity style ={styles.imgView} onPress = {()=>Tool.to('search')}>
                  <Image source={require('images/index/btn_Search.png')} style={styles.toolImg}/>
                </TouchableOpacity>
                <TouchableOpacity style ={styles.imgView}>
                  <Image source={require('images/personal/icon_xiaoxi.png')} style={styles.toolImg}/>
                </TouchableOpacity>
              </View>
              <Carousel
                delay={3000}
                style={this.state.size}
                autoplay
                bullets = {true}
                onAnimateNextPage={(p) => {}}
                >
                {this.gethd()}
              </Carousel>

              <View style={styles.fnMoudle}>
                <View style = {{ flexDirection:'row' }}>
                  <TouchableOpacity onPress={ ()=>Tool.to('islandIndex') } style={ styles.businessView }>
                    <Image source={require('images/index/btn_island-tourism.png')} style={ styles.businessImg}/>
                  </TouchableOpacity>
                  <View style = {{ width: 10}}/>
                  <TouchableOpacity onPress={ ()=>Tool.to('fishingIndex') } style={ styles.businessView }>
                    <Image source={require('images/index/btn_sea-fishing.png')} style={ styles.businessImg}/>
                  </TouchableOpacity>
               </View>
               {/*活动*/}
               <View style = { styles.hdContent }>
                 <Swiper
                    loop = { true }
                    height = { 40 }
                    autoplay = { true }
                    horizontal = {false}
                    showsPagination = {false}
                    autoplayTimeout = {3}
                    >
                    {this.getText()}
                  </Swiper>
                  <TouchableOpacity onPress={this.search.bind(this,2)} style={{marginLeft: 10}}>
                    <Image source={require('images/index/btn_fbhd.png')} style={{width:83, height: 33}}/>
                  </TouchableOpacity>
                </View>
                <Text style={ styles.hdybTitle }>活动约伴</Text>
                <FlatList
                  horizontal = {true}
                  data={ this.state.ativities }
                  keyExtractor = {(item, index) => `key3-${index}`}
                  renderItem={ ( ret )=>this.getConvene( ret.item ) }
                />
              </View>
              {/*热门线路*/}
              <View style={ styles.fnMoudle }>
                <IconSpan3
                title = {'热门线路'}
                defaultText = {'更多'}
                titleStyle = {{fontSize: 17}} style={{marginBottom: 5}}
                click = {()=>{Tool.to('routelist')}}
                />
                <FlatList
                  data={ this.state.ativities }
                  keyExtractor = {(item, index) => `key1-${index}`}
                  renderItem={ (ret)=>this.getHotRoute(ret.item)}
                />
              </View>

              {/*服务商家*/}
              <View style={ styles.fnMoudle}>
                <IconSpan3
                  title = {'精选服务商'}
                  defaultText = {'更多'}
                  titleStyle = {{fontSize: 17, width: 100}} style={{marginBottom: 5}}
                  click = {()=>{Tool.to('merchantList')}}
                  />
                <FlatList
                  horizontal = {true}
                  data={ this.state.ativities }
                  keyExtractor = {(item, index) => `merchanet-${index}`}
                  renderItem={ (ret)=>this.getMerchant(ret.item)}
                />
              </View>

              {/*文章分享*/}
              <View style={ [styles.fnMoudle,{padding:0}]}>
                <IconSpan3
                  title = {'文章推荐'}
                  defaultText = {'更多'}
                  titleStyle = {{fontSize: 17}}
                  style={{paddingLeft: 10, paddingRight:10, paddingTop: 20}}
                  click = {()=>{Tool.to('articleList')}}
                  />
                <FlatList
                  data={ this.state.articles }
                  keyExtractor = {(item, index) => `key2-${index}`}
                  renderItem={ ( ret )=>{
                    let imgUri = { uri: ret.item.img}
                     return (
                       <TouchableOpacity style={ styles.articleItem } onPress={()=>console.log('list')}>
                          <View style={ styles.articleView }>
                            <Image source={imgUri} style={ styles.articelImg }/>
                            <View style={ styles.articleDetail }>
                              <Text style={ styles.articleTitle }>{ret.item.title}</Text>
                              <View style = { styles.articleBto}>
                                <Text style = { styles.articleText }>来自•<Text style={{color:'#34a5f0'}}>海岛游</Text></Text>
                                <View style = {{flexDirection:'row'}}>
                                  <View style = {{flexDirection:'row',alignItems: 'center'}}>
                                      <Image source={require('images/index/icon_VIEW.png')} style={ styles.dianzImg }/>
                                      <Text style = { [styles.articleText,{ paddingLeft: 5, paddingRight: 15}]}>1045</Text>
                                  </View>
                                  <View style = {{flexDirection:'row',alignItems: 'center'}}>
                                      <Image source={require('images/index/icon_thumbs-up.png')} style={ styles.dianzImg }/>
                                      <Text style = { [styles.articleText,{ paddingLeft: 5}] }>135</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                       </TouchableOpacity>
                     )
                    }
                  }
                />
              </View>

  	       </ScrollView>
	    );
	  }
}

const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#f0f0f0',
      zIndex: 1,
	  },
    tool:{
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      width: width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      ...Platform.select({
        ios:{
          paddingTop: 20,
        },
      })
    },
    imgView:{
      padding: 10,
    },
    toolImg:{
      width: 18,
      height: 18,
    },
    businessView: {
      justifyContent: 'center',
    },
    businessImg: {
      width: (width-30)/2,
      height: 75,
      borderRadius: 5,
    },
    fnMoudle: {
      backgroundColor: '#ffffff',
      padding: 10,
      marginBottom: 10,
    },
    titleView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      marginTop: 25,
    },
    title:{
      fontSize: 18,
      color: '#323232',
    },
    titleMore: {
      fontSize: 15,
      color: '#acacac',
    },
    hdContent:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
    hdView: {
      flex: 1,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    hdText:{
      flex: 1,
      fontSize: 15,
      color: '#323232',
      paddingLeft: 5,
      flexWrap: 'nowrap',
      overflow: 'hidden',
      ...Platform.select({
        ios:{
          height: 16,
        },
        android: {
          height: 18,
        }
      })
    },

    conveneItem:{
      width: 170,
      height: 240,
      borderColor: '#dbdbdb',
      borderWidth: 1,
      borderRightWidth: 0.5,
      borderLeftWidth: 0.5,
    },
    conveneImgVIew: {
      flexDirection:'row',
      marginLeft: 15,
    },
    convenePic:{
      marginTop: 30,
      width: 80,
      height: 80,
      borderRadius: 40,
      marginLeft: 10,
    },
    conveneName:{
      fontSize: 15,
      color: '#323232',
      padding: 13,
    },
    conveneTime:{
      fontSize: 12,
      color: '#acacac',
    },
    conveneTitle:{
      fontSize: 15,
      color: '#323232',
      lineHeight: 20,
      padding: 10,
    },
    thumbnail:{
      justifyContent: 'space-between',
      width: width - 20,
      height: 200,
      borderRadius: 3,
    },

    merchantItem:{
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 15,
    },
    merchantImg:{
      width:160,
      height: 200,
      borderRadius: 3,
    },
    articleItem:{
      borderBottomWidth: 0.5,
      borderColor: '#dbdbdb',
    },
    articleView:{
      flexDirection: 'row',
      padding: 15,
      paddingLeft: 10,
    },
    articelImg:{
      width: 120,
      height: 120,
      borderRadius: 3,
      marginRight: 15,
    },
    articleDetail:{
      flex:1,
      justifyContent:'space-between',
      overflow: 'hidden',
      paddingBottom: 10,
    },
    articleTitle:{
      fontSize: 16,
      color: '#323232',
      lineHeight: 30,
    },
    articleBto:{
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
    },
    articleText:{
      fontSize: 12,
      color: '#acacac',
    },
    dianzImg:{
      width: 18,
      height: 14,
    },
    hdybTitle:{
      fontSize: 17,
      color: '#323232',
      marginTop: 20,
      marginBottom: 20,

    }
});
