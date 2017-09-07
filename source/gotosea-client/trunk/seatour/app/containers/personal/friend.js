import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Tool from 'utils/tool'
import SeaListView from 'components/sea-listview';
import {Actions} from 'react-native-router-flux';

export default class Friend extends Component{
  constructor(props) {
    super(props);
    this.state = {
      paging: {
        pageNumber: 1,
        totalPages: 1,
      },
      datas: [{},{},{}],
    }
  }
  componentWillMount(){
    let { friend } = this.props;
    Actions.refresh({
      title: friend == 1 ? '关注': '粉丝'
    });
  }
  //flag: 1加载第一页，2加载更多
	load(flag){
		let { datas, paging, type } = this.state;
		let p = paging.pageNumber;
		if(flag == 1)
			p = 1;
		else if(flag == 2)
			p = p+1;

		let params = {
			page: p,
      type: type,
		}
		Tool.fetch(null,`${config.appUrlPath}rest/prod/serves`,'get',params,(ret)=>{
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
    return <View style = { styles.item }>
              <View style = { styles.content }>
                <Image source={ require('images/personal/pic_beijing.png')} style={ styles.headPic}/>
                <View style = { styles.detail }>
                  <Text style = { styles.name }>张三</Text>
                  <Text style = { styles.signature }>撒娇的立法精神的放辣椒多放辣椒放到啦放假</Text>
                </View>
                <TouchableOpacity style = { styles.stateView }>
                  <Image source={ require('images/personal/icon_ygz.png')} style={ styles.statePic}/>
                  <Text style = { styles.stateText }>已关注</Text>
                </TouchableOpacity>
              </View>
            </View>
  }
  render(){
    let { paging, datas} = this.state;
    return(
      <SeaListView
        style = { styles.listview}
        data = {datas}
        paging = {paging}
        renderRow = { this.getRenderRow.bind(this) }
        loadMore = {this.load.bind(this,2)}
        loadFirst = {this.load.bind(this,1)}
      />
    )
  }
}

const styles = StyleSheet.create({
  listview: {
    backgroundColor: '#f0f0f0',
  },
  item:{
    backgroundColor: '#ffffff',
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5
  },
  content:{
    flexDirection:'row',
    padding: 10,
    alignItems: 'center',
  },
  headPic:{
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  detail:{
    flex: 1,
  },
  name:{
    fontSize: 18,
    color: '#323232',
    marginBottom: 10,
  },
  signature:{
    fontSize: 12,
    color: '#acacac',
    flexWrap: 'nowrap',
    height: 14,
  },
  stateView:{
    paddingLeft: 15,
    alignItems: 'center',
  },
  statePic:{
    width: 24,
    height: 22,
  },
  stateText:{
    fontSize: 12,
    marginTop: 5,
    color: '#323232',
  }
})
