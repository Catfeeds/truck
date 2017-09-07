import React, { Component } from 'react';
import{
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Dimensions,
}from 'react-native';

const { width } = Dimensions.get('window');
const tabWidth = width/4;

import ScrollableTabView,{ ScrollableTabBar } from 'react-native-scrollable-tab-view';
import CollectRoute from './route';
import CollectArticle from './article';
import CustomTabBar from 'containers/community/component/CustomTabBar'

export default class CollectIndex extends Component{
	constructor(props) {
 		super(props);
		this.state = {
			tabIndex : 0
		};
	}
	componentDidMount(){

	}
	render(){
		let {
				tabIndex
			} = this.state
		return (
			<ScrollableTabView
				style = { styles.container }
				page = { tabIndex }
				tabBarActiveTextColor = '#34a5f0'
				tabBarInactiveTextColor = '#323232'
				tabBarTextStyle = {{
				}}
				tabBarUnderlineStyle = {{
					backgroundColor : '#34a5f0',
					height:2,
				}}
				onChangeTab = { (o) => {} }
				renderTabBar = { () => <CustomTabBar tabWidth = { tabWidth }/> }>
				<Text tabLabel="动态" >test</Text>
				<CollectRoute tabLabel="线路" />
				<Text tabLabel="活动" >test</Text>
				<CollectArticle tabLabel="文章" />
			</ScrollableTabView>
		)
	}
}

const styles = StyleSheet.create({
    container:{
			flex: 1,
			backgroundColor: '#ffffff',
    },
})
