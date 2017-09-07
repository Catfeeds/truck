import React, { Component } from 'react';
import{
	StyleSheet,
	View,
	ListView,
	Button,
	RefreshControl,
	ActivityIndicator,
	TouchableOpacity,
	Text
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Loading from '../components/common/loading';
import Tool from '../utils/tool';

export default class MyListView extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var datas = [];
		this.state = {
			visible:false,
			ds: ds,
			datas: datas,
			isRefreshing: false,
			isShowBottomRefresh: false,
			dataSource: ds.cloneWithRows(datas),
		}
	}
	componentWillMount(){
		let {
			datas,
			ds
		} = this.state,
		me = this;
		this.setState({visible:true})
		Tool.fetch(this, `${config.appUrlPath}wechat/route/list`, 'post', {type:[1,2],name:'test'}, function(ret){
			let newDataSource = datas.concat(ret.pageData);
			me.setState({
				visible: false,
				datas: newDataSource,
				dataSource: ds.cloneWithRows(newDataSource)
			})
		} );
	}
	renderFooter() {
			if(this.state && this.state.isShowBottomRefresh){
					return (<View style={{marginVertical: 10}}>
									<ActivityIndicator />
					</View>);
			}
			return <View style={{marginVertical: 10}} />;
	}
	onEndReached() {
  	if(this.isFirstTime){
        if(!this.state.isShowBottomRefresh){
        	this.isFirstTime = false;
        }
      	return;
      }
      this.isFirstTime = true;
      this.setState({isShowBottomRefresh: true});
      setTimeout(()=>{
          this.isFirstTime = true;
          this.setState({
              isShowBottomRefresh: false
          });
					this.loadMore();
      },3000);
  }
	loadTop(){
		let {
			datas,
			ds
		} = this.state,
		me = this;
		let newData = ['headerData','headerData','headerData'];
		let newDataSource = newData.concat(datas);
		me.setState({
			isRefreshing: false,
			datas: newDataSource,
			dataSource: ds.cloneWithRows(newDataSource)
		})
	}
	loadMore(){
		let {
			datas,
			ds
		} = this.state;
		let newData = ['footerData','footerData','footerData'];
		let newDataSource = datas.concat(newData)
		this.setState({isRefreshing: true});
		this.setState({
			isRefreshing: false,
			datas: newDataSource,
			dataSource: ds.cloneWithRows(newDataSource)
		})
	}
	render(){
		return(
			<View>
				<Loading  visible={this.state.loading_visible} />
				<ListView
					enableEmptySections
					dataSource = {this.state.dataSource}
					renderRow = { (data) => <Text style = {{ height:30}}>{data.name}</Text>}
					onEndReachedThreshold={1}
					onEndReached = {this.onEndReached.bind(this)}
					renderFooter={this.renderFooter.bind(this)}
					refreshControl = {
						<RefreshControl
							refreshing = { this.state.isRefreshing }
							onRefresh = { this.loadTop.bind(this) }
				            tintColor="#ff0000"
				            title="Loading..."
				            titleColor="#00cfff"
				            colors={['#ff0000', '#00ff00', '#0000ff']}
				            progressBackgroundColor="#ffff00"
			            />
					}
				/>
				</View>
		)
	}
}

const styles = StyleSheet.create({
	buttom:{
		color:'#fff',
		backgroundColor:'#00cfff'
	}
})
