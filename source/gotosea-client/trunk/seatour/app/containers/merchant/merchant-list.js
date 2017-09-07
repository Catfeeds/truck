import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
	Dimensions,
	View,
	TouchableOpacity,
	TextInput,
	Image,
	Text
} from 'react-native';

import Tool from 'utils/tool';
import Dropdown from 'components/common/dropdown';
import DropdownLinkage from 'components/common/dropdown-linkage';
import Loading from 'components/common/loading';
import SeaListView from 'components/sea-listview';
import Rating from 'components/common/rating';

import routeListStyle from 'styles/route/route-list';
import {Actions} from 'react-native-router-flux';

export default class MerchantList extends Component {
		constructor(props){
				super(props);
        this.state = {
    			loading_visible: false,
    			type: null,
    			city: null,
    			types: [],
    			citys: [],
    			datas: [],
    			paging: {
    				pageNumber: 1,
    				totalPages: 1,
    			}
    		}
		}
		componentWillMount(){
      Tool.fetch(null,`${config.appUrlPath}rest/prod/serveType`,'get',null,(ret)=>{
				this.setState({
					types:ret,
				});
			});

			Tool.fetch(null,`${config.appUrlPath}rest/local/route`,'get',null,(ret)=>{
				this.setState({
					citys: ret,
				});
			});

			this.load(1);
		}
    //flag: 1加载第一页，2加载更多
    load(flag){
      let { datas, paging, type, city} = this.state;
      let p = paging.pageNumber;
      if(flag == 1)
        p = 1;
      else if(flag == 2)
        p = p+1;

      let params = {
        page: p,
      }
      if(type)params['type'] = type;
      if(city)params['city'] = city;
      Tool.fetch(null,`${config.appUrlPath}rest/merchant/list`,'get',params,(ret)=>{
        paging.pageNumber = ret.pageNumber;
        paging.totalPages = ret.totalPages;
        let p = [];
  			if(flag == 1)p = ret.content || [];
  			else p = datas.concat(ret.content);
        this.setState({
          datas: p,
          paging: paging,
        });
      });
    }
    getRenderRow(data, sectionID, rowID){
      return <TouchableOpacity style = { styles.routeItem } onPress = { ()=>Tool.to('merchantDetail',{detail: data}) }>
                <Image source={{uri: data.thumbnail || config.defaultImg }} style={ styles.img } />
                <View style = { styles.routeView }>
                  <Text style = { styles.title}>{data.merchant}</Text>
                  <Text style = { styles.merchartAddr }>{ data.address }</Text>
                  <View style={{ flexDirection: 'row'}}>
                    <Rating rating = { parseInt(data.grade) } editable={false}/>
                    <Text style = { styles.merchartAddr}>{`${data.serviceCount}个服务`}</Text>
                  </View>
                </View>
             </TouchableOpacity>
    }
    getTitle(value, index){
      return (
        <View style = {{ flexDirection: 'row', alignItems:'center'}}>
          <Text>{value}</Text>
          <Image source={require('images/common/btn_tuijian.png')}  style={ routeListStyle.titleImg}/>
        </View>
      )
    }
	  render() {
      let me = this;
  		let { datas, paging, types, citys, type, city} = this.state;
        return(
          <View style = {{flex:1, backgroundColor:'#f0f0f0'}}>
            <Loading  visible={this.state.loading_visible} />
            <View style={ routeListStyle.dropMenu}>
              <Dropdown
                style={ routeListStyle.dropMenuItem }
                dropdownStyle = { routeListStyle.dropdownStyle }
                textStyle = { routeListStyle.titleStyle }
                dropdownTextStyle = { routeListStyle.dropdownTextStyle }
                options={ types }
                defaultIndex={-1}
                defaultValue={'类型'}
                renderTitle = { this.getTitle.bind(this)}
                onSelect = {(key, value)=>{
                  me.setState({type:key},()=>{me.load(1)});
                }}
              />
              <DropdownLinkage
                style={ routeListStyle.dropMenuItem }
                textStyle = { routeListStyle.titleStyle }
                dropdownStyle = { routeListStyle.dropdownStyle }
                dropdownTextStyle = { routeListStyle.dropdownTextStyle }
                dropdownLeftTextStyle = {{ paddingLeft: 25 }}
                options={ citys }
                defaultIndex={-1}
                defaultValue={'区域位置'}
                renderTitle = { this.getTitle.bind(this)}
                onSelect={(key, value)=>{
                  me.setState({city:key},()=>{me.load(1)});
                }}
              />
            </View>
            <SeaListView
              style = { routeListStyle.listview}
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
  routeItem:{
    flexDirection: 'row',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  routeView:{
    flex: 1,
  },
  img:{
    width: 90,
    height: 90,
    borderRadius: 3,
    marginRight: 10,
  },
  title:{
    fontSize: 14,
    color: '#323232',
    paddingTop: 5,
    paddingBottom: 10,
  },
  merchartAddr: {
    fontSize: 12,
    color: '#acacac',
    paddingBottom: 10,
  },
});
