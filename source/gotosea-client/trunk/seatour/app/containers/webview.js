import React, { Component } from 'react';
import{
	StyleSheet,
	View,
	WebView,
	Dimensions,
	Text
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Tool from '../utils/tool';
const { width, height }  = Dimensions.get('window');

/**
 * [公用H5页面 description]
 ** @param  {[string]} url     [页面地址， 必传]
 ** @param  {[string]} title   [头部显示标题， 必传]
 */
export default class SeaWebView extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		let { title } = this.props;
		Actions.refresh({
				title: title
		});
	}
	/**
	 * data： 为H5页面的title
	 */
	onMessage( even ){
		let { data } = even.nativeEvent;
		if( data != '[object Object]'){
			Actions.refresh({
					title: data
			});
		}
	}
	render(){
		return(
			<WebView
				javaScriptEnabled = {true}
				onMessage = { this.onMessage.bind(this) }
				source={{uri: this.props.url}}
			/>
		)
	}
}

const styles = StyleSheet.create({
	wb:{
		flex: 1,
		color:'#fff',
		backgroundColor:'#00cfff'
	}
})
