import React, { Component } from 'react';
import{
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Dimensions,
}from 'react-native';

const { width } = Dimensions.get('window');
const tabWidth = width/3;

import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NewOrder from './new-order';
import TailOrder from './tail-order';
import EndOrder from './end-order';

import CustomTabBar from 'containers/community/component/CustomTabBar'

export default class OrderIdex extends Component{
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
				<NewOrder tabLabel="新订单" />
				<TailOrder tabLabel="跟单中" />
				<EndOrder tabLabel="已结束" />
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
