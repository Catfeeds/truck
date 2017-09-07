import React, { Component } from 'react';
import{
	StyleSheet,
	View,
	ListView,
	RefreshControl,
	ActivityIndicator,
	Text
} from 'react-native';
import Tool from '../utils/tool';

/*
*headerField (string): 分组字段
*paging (object): 分页信息
*data (array): 数据列表
*renderRow（functon): 数据渲染
*loadFirst (function): 上拉加载第一页调用
*loadMore （function): 下拉加载更多时调用
*/

export default class SeaListView extends Component{
	constructor(props){
		super(props);
		this.isFirstTime = true;
		this.state = {
			isRefreshing: false,
			isShowBottomRefresh: false
		}
	}
	componentDidMount(){
		//this.isFirstTime = false;
	}
	getDataSource(){
		let { data, headerField } = this.props;
		//分组显示header
		if(headerField){
			let datas = {};
			if( Tool.isArray(data) && data.length>0){
				data.forEach(function( value ){
					let field  = value[headerField];
					if(field){
						if(!datas[field])datas[field]=[]
						datas[field].push(value);
					}
				})
			}
			var ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2
			});
			return ds.cloneWithRowsAndSections(datas||[]);
		}
		//未分组
		else{
			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			return ds.cloneWithRows(data);
		}
	}
	renderFooter() {
		let { data, paging } = this.props;
		if( paging && paging.totalPages <= paging.pageNumber )
		 	return (<Text style={styles.noMore}>暂无更多数据！</Text>);
		else if (Tool.isEmpty(this.props.data) ){
			return <View style = { styles.loadmoreTip } />;
		}
		else if(this.state && this.state.isShowBottomRefresh ){
			return (<View style = { styles.loadmoreTip }><ActivityIndicator /></View>);
		}
		return <View style = { styles.loadmoreTip } />;
	}
	onEndReached() {
		let { loadMore, paging } = this.props;
		if(Tool.isEmpty(this.props.data) || (paging && paging.totalPages == paging.pageNumber) ){
			this.isFirstTime = false;
			return;
		}

		if(!Tool.isEmpty(this.props.data) && this.isFirstTime){
			this.isFirstTime = false;
		}

  	if(this.isFirstTime){
			this.isFirstTime = false;
      return;
    }

    this.setState({isShowBottomRefresh: true});
		loadMore(()=>{
      this.setState({
        isShowBottomRefresh: false
      });
		})
  }
	getHeaher(data, sectionID){
		let { headerField } = this.props;
		if( headerField ){
			return (
				<View style={styles.header}>
					<Text style={styles.headerText}>{ sectionID }</Text>
				</View>
			)
		}else{
			return null;
		}
	}
	render(){
		let { loadFirst, loadMore, style } = this.props;
		return(
				<ListView
					style = {[style,{flex:1}]}
					enableEmptySections = { true}
					dataSource = { this.getDataSource() }
					renderRow = { this.props.renderRow }
					renderSectionHeader = { this.getHeaher.bind(this) }
					onEndReachedThreshold={ 1 }
					onEndReached = { Tool.isFunction(loadMore) ? this.onEndReached.bind(this) : null }
					renderFooter = { Tool.isFunction(loadMore) ? this.renderFooter.bind(this) : null }
					refreshControl = {
						Tool.isFunction( loadFirst ) ? <RefreshControl
							refreshing = { this.state.isRefreshing }
							onRefresh = { loadFirst}
								tintColor = "#666666"
								title = "数据加载中..."
								titleColor = "#666666"
								colors = {['#ff0000', '#00ff00', '#34a5f0']}
								progressBackgroundColor = "#34a5f0"
							/> : null
					}
				/>
		)
	}
}

const styles = StyleSheet.create({
	header:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#dbdbdb',
		height: 20,
	},
	headerText:{
		color: '#666666',
		paddingLeft: 10,
		lineHeight: 20,
		justifyContent: 'center',
	},
	noMore:{
		fontSize: 12,
		textAlign:'center',
		marginVertical: 20,
		marginBottom: 20,
		color: '#828387',
	},
	loadmoreTip:{
		marginVertical: 10,
		marginBottom: 20,
	}
})
