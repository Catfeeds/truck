import React, { Component } from 'react';
import{
	Text,
	View,
	StyleSheet,
	Image,
	Alert,
	BackAndroid,
	ToastAndroid,
	Platform,
	PixelRatio,
	TouchableOpacity,
}from 'react-native';
import _styles from 'components/commonStyles'
import Dropdown from '../../components/common/dropdown'
import Tabs from 'react-native-tabs'
import CustomTabBar from './component/CustomTabBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ListSection from './component/ListSection'
import ActivityCP from './activityCp'
import DynamicShare from './dynamicShare'
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';

let tabHeight = 50,
titleDDOptions = [
	{
		key : 0,
		value : "推荐",
	},
	{
		key : 1,
		value : "海钓",
	},
	{
		key : 2,
		value : "海岛游",
	},
],titleDDOptionsImgs = [
	{
		selected : require("../../images/community/btn_tuijian1_s.png"),
		init : require("../../images/community/btn_tuijian1_n.png"),
	},
	{
		selected : require("../../images/community/btn_haidiao_s.png"),
		init : require("../../images/community/btn_haidiao_n.png"),
	},
	{
		selected : require("../../images/community/btn_haidiaoyou_s.png"),
		init : require("../../images/community/btn_haidiaoyou_n.png"),
	},
],addDDOptions = [
	{
		key : 0,
		value : "晒动态",
	},
	{
		key : 1,
		value : "发活动",
	},
],addDDOptionsImgs = [
	require("../../images/community/icon_sdt.png"),
	require("../../images/community/icon_fhd.png"),
]
export default class CommunityIndexApp extends React.Component{
	constructor(props) {
 		super(props);

		this.state = {
			tabIndex : 0,
			//0 推荐 1海钓 2海岛游
			bizid : 0,
		};
	}
	componentDidMount(){
		Actions.refresh({
			renderTitle : () => <Title onChange = { this.handleChangeBiz }/>,
			renderLeftButton : () => <LeftTitle/>,
			renderRightButton : () => <RightTitle/>,
			hideNavBar : false
		})
	}
	// handleOnLeft(){

	// }
	// handleOnRight(){

	// }
	componentWillUnmount(){
		Actions.refresh({
			renderTitle : null,
			renderLeftButton : null,
			renderRightButton : null,
		})
	}
	handleChangeBiz = value => {
		this.setState({ bizid : value })
	}
	handleTabSelect = ( o ) => {
		this.setState({ tabIndex : o.ref.props.tabIndex })
	}
	render(){
		let {
				tabIndex,
				bizid,
			} = this.state
		return (
			<ScrollableTabView
				style = { styles.container }
				page = { tabIndex }
				tabBarActiveTextColor = { _styles.selectedTextColor.color }
				tabBarInactiveTextColor = { _styles.textColor.color }
				tabBarTextStyle = {{
				}}
				tabBarUnderlineStyle = {{
					backgroundColor : _styles.selectedBorderColor.borderColor,
					height:2,
				}}
				onChangeTab = { this.handleTabSelect }
				renderTabBar = { () => <CustomTabBar tabWidth = { 100 }/> }>
				<DynamicShare tabIndex = { 0 } bizid = { bizid } tabLabel="动态分享"></DynamicShare>
				<ActivityCP tabIndex = { 1 } bizid = { bizid } tabLabel="活动约伴"></ActivityCP>
				{/*<ActivityCP tabLabel="活动约伴"></ActivityCP>*/}
			</ScrollableTabView>
		)
	}
}

const styles = StyleSheet.create({
    container: Object.assign({},_styles.bgColor,{
    	position: "relative",
    	marginTop:Platform.OS === 'ios' ? 64 : 54,
        flex: 1,
    }),
    subContainer : Object.assign({},_styles.bgColor,{
    	flex:1,
    	position : "absolute",
    	top:( Platform.OS === 'ios' ? 64 : 54 ) + tabHeight,
    	bottom:0,
    	left:0,
    	right:0,
    }),
    tabs:Object.assign({},_styles.bgColor,_styles.contentBorderColor,{
    	flex:1,
    	position : "absolute",
    	// top:Platform.OS === 'ios' ? 64 : 54,
    	top:0,
    	left:0,
    	right:0,
    	bottom:0,
        borderBottomWidth: 1 / PixelRatio.get(),
    }),
    tabIcon : {
    	flex:0,
    },
    tab:{
    	paddingLeft:15,
    	paddingRight:15,
    	height : tabHeight,
    	alignItems: 'center',
    	justifyContent: 'center',
    	borderColor : "transparent",
    	borderBottomWidth : 2,
    },
    tabSelect : Object.assign({},_styles.selectedBorderColor,{
    }),
    DDRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 15,
    },
    DDRowBorderStyle: Object.assign({}, _styles.titleBorderColor, {
        borderBottomWidth: 1 / PixelRatio.get(),
    }),
    titleDD: {
        flex: 1,
        // marginTop: 10,
    },
    titldDDStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        marginTop: 10,
    },
    titleDDTextStyle: {
        fontSize: 18,
        textAlign: "center",
    },
    titleTextStyle: Object.assign({}, _styles.textColor, {
        fontSize: 18,
        textAlign: "center"
    }),
    titleWrapStyle:{
    	marginTop: 5,
	    position: 'absolute',
	    ...Platform.select({
	      ios: {
	        top: 20,
	      },
	      android: {
	        top: 5,
	      },
	      windows: {
	        top: 5,
	      },
	    }),
	    left: 0,
	    right: 0,
    }
})

class RightTitle extends React.Component{
	renderRightButton(){
		return (
			<View style = {{ flexDirection: 'row', alignItems:'center', justifyContent : "center",width: 30,height:30 }}>
				<Image source={require('../../images/community/btn_add_nav.png')}/>
			</View>
		)
	}
	renderDDRow(key,value,selected,image,showBottomBorder){
		let style = [styles.DDRowStyle];
		!!showBottomBorder && style.push( styles.DDRowBorderStyle )
		return (
			<View style = { style }>
				<Image style = {{ width:20, height: 20,}} source={ image }/>
				<Text style = {
					Object.assign({},( selected ? _styles.selectedTextColor : _styles.textColor ),{
						paddingLeft : 10,
						fontSize : 18,
				})}>{ value }</Text>
			</View>
		)
	}
	renderRightButtonOptionsRow( key, value, selected ){
		let image = addDDOptionsImgs[key],
			showBottomBorder = key !== addDDOptionsImgs.length - 1;

		return this.renderDDRow( key, value, false, image, showBottomBorder)
	}
	handleOnPublish( key ){
		switch( key ){
			case 1:
				Actions.activityPublish()
			break;
			case 0:
			default:
				Actions.dynamicPublish()
			break;
		}
	}
	render(){
		return (
			<View style = {{width: 30,height:30}}>
				<Dropdown
					style = { styles.titleDD }
					dropdownStyle = { styles.titldDDStyle }
					dropdownTextStyle = { styles.titleDDTextStyle }
					textStyle = { styles.titleTextStyle }
					options = { addDDOptions }
					renderTitle = { ( value, index ) => this.renderRightButton( value, index ) }
					renderRow = { ( value,key,selected ) => this.renderRightButtonOptionsRow( key, value, selected ) }
					onSelect = { (key, value) => this.handleOnPublish( key, value ) }
				></Dropdown>
			</View>
		)
	}
}
class Title extends React.Component{
	renderTitle(value, index){
		return (
			<View style = {{ flexDirection: 'row', alignItems:'center', justifyContent : "center", height : 30 }}>
				<Text style = {{ textAlign : "center", paddingRight : 5, fontSize : 18 }}>{value}</Text>
				<Image source={require('../../images/community/btn_tuijian.png')}/>
			</View>
		)
	}
	renderTitleOptionsRow( key, value, selected ){
		let image = selected ? titleDDOptionsImgs[key].selected : titleDDOptionsImgs[key].init,
			showBottomBorder = key !== titleDDOptionsImgs.length - 1;

		return this.renderDDRow( key, value, selected, image, showBottomBorder)
	}
	renderDDRow(key,value,selected,image,showBottomBorder){
		let style = [styles.DDRowStyle];
		!!showBottomBorder && style.push( styles.DDRowBorderStyle )
		return (
			<View style = { style }>
				<Image style = {{ width:20, height: 20,}} source={ image }/>
				<Text style = {
					Object.assign({},( selected ? _styles.selectedTextColor : _styles.textColor ),{
						paddingLeft : 10,
						fontSize : 18,
				})}>{ value }</Text>
			</View>
		)
	}
	handleOnSelectType = ( key, value )=>{
		let {
				onChange
			} = this.props,
			_value = 0;
		switch( value ){
			case "海钓":
				_value = 1
				break;
			case "海岛游":
				_value = 2
				break;
			case "推荐":
			default:
				_value = 0
				break;
		}
		typeof onChange === "function" && onChange( _value )
	}
	render(){
		return (
			<View style = { styles.titleWrapStyle } >
				<View style = {{ alignItems:"center", justifyContent : "center" }}>
					<Dropdown
						showsVerticalScrollIndicator = { false }
						style = { [ styles.titleDD ] }
						dropdownStyle = { [ styles.titldDDStyle ] }
						dropdownTextStyle = { styles.titleDDTextStyle }
						textStyle = { styles.titleTextStyle }
						defaultIndex = { 0 }
						defaultValue = { titleDDOptions[0].value }
						options = { titleDDOptions }
						renderTitle = { ( value, index ) => this.renderTitle( value, index ) }
						renderRow = { (value,key,selected) => this.renderTitleOptionsRow( key, value, selected ) }
						onSelect = { this.handleOnSelectType }
					></Dropdown>
				</View>
			</View>
		)
	}
}

class LeftTitle extends React.Component{
	render(){
		return (
			<TouchableOpacity>
				<View style = {{ height:30, width: 30, flexDirection: 'row', alignItems:'center', justifyContent : "center" }}>
					<Image source={require('../../images/community/btn_Search.png')}/>
				</View>
			</TouchableOpacity>
		)
	}
}
