import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  FlatList,
  View,
} from 'react-native';


import Tool from 'utils/tool';

import routeListStyle from 'styles/route/route-list';
import { Actions } from 'react-native-router-flux';
import ListChunk from 'components/index/list-chunk';
import Tags from 'components/common/tags';
import Rating from 'components/common/rating';

const { width, height }  = Dimensions.get('window');

export default class SearchResult extends Component {
	constructor(props){
			super(props);
      let { searchText } = props;
			this.state = {
        searchText: searchText,
        datas: [{},{},{},{}],
        all: false,
			};
		}
    componentWillMount(){
      let me = this;
      let { searchText } = this.props;
	    Actions.refresh({
          rightTitle: '搜索',
          rightButtonTextStyle: { color: '#34a5f0', fontSize: 15,},
	        onRight: () => {
            let { searchText } = me.state;
            me.search(searchText);
	        },
					renderTitle:()=>{
						return (
								<View style={routeListStyle.search}>
									<TextInput
										placeholder='搜索目的地/景点/酒店等'
										style={routeListStyle.searchText}
										returnKeyType = 'search'
                    defaultValue= { searchText }
										underlineColorAndroid='transparent'
                    clearButtonMode = 'always'
										onChangeText = {(text)=>{
											me.setState({searchText:text});
										}}
										onSubmitEditing = {(text)=>{
											me.search(text)
										}}
								/>
						</View>)
					}
	    });

		}
    search( text ){
      if(text){
        let id = text.replace('_','');
        storage.load({
          key: 'searchHistory',
          id: id,
        })
        .then(ret=>{})
        .catch(error=>{
            storage.save({
              key: 'searchHistory',
              id: id,
              data: text,
              expires: 1000 * 3600 * 24 * 31,
            })
        });
      }

      console.log(text)
    }
    getRouteItem(v,k){
      let tags = ['保险','三等奖等','三等奖等','三等奖等'];
      return <TouchableOpacity style = { styles.routeItem }>
                <Image source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.img } />
                <View style = { styles.routeView }>
                  <Text style = { [styles.normalText, styles.title ]}>标题标题</Text>
                  <Tags datas = {tags} itemKey = {'routTags'}/>
                  <Text style = { styles.price}>¥998<Text style = { styles.qi }>起</Text> </Text>
                </View>
             </TouchableOpacity>
    }
    getActivityItem(){
      return <TouchableOpacity style = { styles.activityContent }>
              <View style = { styles.activityItem }>
                <View style = { styles.activityLeft }>
                  <Text style = { styles.normalText }>标题题</Text>
                  <Text style = { styles.time }>活动日期：2017-12-12</Text>
                </View>
                <Text style={ styles.status}>召集中</Text>
              </View>
             </TouchableOpacity>
    }
    getMerchantItem(){
      return <TouchableOpacity style = { styles.routeItem }>
                <Image source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.img } />
                <View style = { styles.routeView }>
                  <Text style = { [styles.normalText, styles.title ]}>标题标题</Text>
                  <Text style = { styles.merchartAddr }>气象局吧</Text>
                  <View style={{ flexDirection: 'row'}}>
                    <Rating rating = {4} editable={false}/>
                    <Text style = { styles.merchartAddr}>11个服务</Text>
                  </View>
                </View>
             </TouchableOpacity>
    }
    getArticleItem(){
      return <TouchableOpacity style = { styles.routeItem }>
                <Image source={{uri: 'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.img } />
                <View style = { styles.routeView }>
                  <Text style = { [styles.normalText, styles.title,{ lineHeight: 25, paddingTop:0} ]}>标题标题标题标题标题标题标题标题标题标题标题标题标题标题</Text>
                  <Text style = { styles.merchartAddr }>来自•<Text style={{color:'#34a5f0'}}>海岛游</Text></Text>
                </View>
             </TouchableOpacity>
    }
	  render() {
      let { datas, histories } = this.state;
	    return (
  	       <ScrollView style={ styles.container }>
            <ListChunk
              title = {'相关线路'}
              datas = { datas }
              itemKey = 'routeKey'
              renderItem = { this.getRouteItem.bind(this) }
            />
            <ListChunk
              title = {'相关活动'}
              datas = { datas }
              itemKey = 'activityKey'
              renderItem = { this.getActivityItem.bind(this) }
            />
            <ListChunk
              title = {'相关船家'}
              datas = { datas }
              itemKey = 'merhantKey'
              renderItem = { this.getMerchantItem.bind(this) }
            />
            <ListChunk
              title = {'相关文章'}
              datas = { datas }
              itemKey = 'articleKey'
              renderItem = { this.getArticleItem.bind(this) }
            />
            {
              datas.length == 0 && <Text style = { styles.noResult }>暂无搜索结果</Text>
            }
  	       </ScrollView>
	    );
	  }
}


const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#f0f0f0',
      paddingBottom: 20,
	  },
    normalText:{
      fontSize: 14,
      color: '#323232',
    },
    title:{
      paddingTop: 5,
      paddingBottom: 10,
    },
    routeItem:{
      flexDirection: 'row',
      padding: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },
    img:{
      width: 90,
      height: 90,
      marginRight: 10,
    },
    routeView:{
      flex: 1,
    },
    price:{
      paddingTop: 10,
      fontSize: 18,
      color: 'red',
    },
    qi:{
      fontSize: 12,
      color: '#323232'
    },
    activityContent:{
      borderColor: '#dbdbdb',
      borderBottomWidth: 0.5,
    },
    activityItem:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    activityLeft:{
      flex:1,
    },
    time:{
      fontSize: 13,
      color: '#acacac',
      paddingTop: 15,
    },
    status:{
      width: 60,
      textAlign: 'right',
      fontSize: 14,
      color: '#34a5f0',
    },
    merchartAddr: {
      fontSize: 12,
      color: '#acacac',
      paddingBottom: 10,
    },
    noResult:{
      color: '#323232',
      fontSize: 14,
      alignSelf: 'center',
      paddingTop: 30,
    }
});
