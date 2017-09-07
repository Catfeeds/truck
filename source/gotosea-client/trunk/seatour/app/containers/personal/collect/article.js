import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
	Dimensions,
	View,
	TouchableOpacity,
	Image,
	Text
} from 'react-native';

import Tool from 'utils/tool';
import Loading from 'components/common/loading';
import SeaListView from 'components/sea-listview';

import {Actions} from 'react-native-router-flux';

export default class CollectArticle extends Component {
		constructor(props){
				super(props);
        this.state = {
    			loading_visible: false,
          type:1,
    			datas: [],
    			paging: {
    				pageNumber: 1,
    				totalPages: 1,
    			}
    		}
		}
		componentWillMount(){
			this.load(1);
		}
    //flag: 1加载第一页，2加载更多
    load(flag){
      let { datas, paging, type} = this.state;
      let p = paging.pageNumber;
      if(flag == 1)
        p = 1;
      else if(flag == 2)
        p = p+1;

      let params = {
        bizId: type,
        page: p,
      }
      Tool.fetch(null,`${config.appUrlPath}rest/art/biz/${type}`,'get',params,(ret)=>{
        paging.pageNumber = ret.pageNumber;
        paging.totalPages = ret.totalPages;
        let d  = [];
        if(flag == 1)d = ret.content || [];
        else d = datas.concat(ret.content);
        this.setState({
          datas: d,
          paging: paging,
        });
      });
    }
    getRenderRow(data, sectionID, rowID){
      return (
          <TouchableOpacity style={ styles.articleItem } onPress={ ()=>Tool.to('articleDetail',{id:data.id, isThumb: data.isThumb}) }>
             <View style={ styles.articleView }>
               <Image source={{uri: data.thumbnail}} style={ styles.articelImg }/>
               <View style={ styles.articleDetail }>
                 <Text style={ styles.articleTitle }>{data.title}</Text>
                 <View style = { styles.articleBto}>
                   <Text style = { styles.articleText }>来自•<Text style={{color:'#34a5f0'}}>{data.businessUnitName}</Text></Text>
                   <View style = {{flexDirection:'row'}}>
                     <View style = {{flexDirection:'row',alignItems: 'center'}}>
                         <Image source={require('images/index/icon_VIEW.png')} style={ styles.dianzImg }/>
                         <Text style = { [styles.articleText,{ paddingLeft: 5, paddingRight: 15}]}>{data.readQuantity}</Text>
                     </View>
                     <View style = {{flexDirection:'row',alignItems: 'center'}}>
                         <Image source={require('images/index/icon_thumbs-up.png')} style={ styles.dianzImg }/>
                         <Text style = { [styles.articleText,{ paddingLeft: 5}] }>{data.thumbQuantity}</Text>
                     </View>
                   </View>
                 </View>
               </View>
             </View>
          </TouchableOpacity>
        )
    }
    typeChange( type ){
      this.setState({type},()=>{
        this.load(1);
      });
    }
	  render() {
      let me = this;
  		let { datas, paging, type } = this.state;
        return(
          <View style = {{flex:1, backgroundColor:'#f0f0f0'}}>
            <Loading  visible={this.state.loading_visible} />
            <SeaListView
              data = {datas}
              paging = {paging}
              renderRow = { this.getRenderRow.bind(this) }
              loadMore = {this.load.bind(this,2)}
              loadFirst = {this.load.bind(this,1)}
            />
            </View>
	    );
	  }
}

const styles = StyleSheet.create({
  articleItem:{
    backgroundColor: '#ffffff',
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
  }
});
