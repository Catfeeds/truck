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
}from 'react-native';
import _styles from 'components/commonStyles'
import Dropdown from '../../components/common/dropdown'
import Tabs from 'react-native-tabs'
import ListSection from './component/ListSection'
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
		value : "晌动态",
	},
	{
		key : 1,
		value : "发动态",
	},
],addDDOptionsImgs = [
	require("../../images/community/icon_sdt.png"),
	require("../../images/community/icon_fhd.png"),
]
export default class CommunityIndexApp extends React.Component{
	constructor(props) {
 		super(props);
	
		this.state = {
			tabIndex : 1
		};
	}
	renderTitle(value, index){
		return (
			<View style = {{ flexDirection: 'row', alignItems:'center', justifyContent : "center" }}>
				<Text style = {{ textAlign : "center", paddingRight : 5, fontSize : 18 }}>{value}</Text>
				<Image source={require('../../images/community/btn_tuijian.png')}/>
			</View>
		)
	}
	renderRightButton(){
		return (
			<View style = {{ flexDirection: 'row', alignItems:'center', justifyContent : "center" }}>
				<Image source={require('../../images/community/btn_add_nav.png')}/>
			</View>
		)
	}
	renderLeftButton(){
		return (
			<View style = {{ paddingTop:7, height:30, width: 30, flexDirection: 'row', alignItems:'center', justifyContent : "center" }}>
				<Image source={require('../../images/community/btn_Search.png')}/>
			</View>
		)
	}
	renderTitleOptionsRow( key, value, selected ){
		let image = selected ? titleDDOptionsImgs[key].selected : titleDDOptionsImgs[key].init,
			showBottomBorder = key !== titleDDOptionsImgs.length - 1;

		return this.renderDDRow( key, value, selected, image, showBottomBorder)
	}
	renderRightButtonOptionsRow( key, value, selected ){
		let image = addDDOptionsImgs[key],
			showBottomBorder = key !== addDDOptionsImgs.length - 1;

		return this.renderDDRow( key, value, false, image, showBottomBorder)
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
	handleOnSelectType(){

	}
	componentDidMount(){
		Actions.refresh({
			title : (
					<View style = {{width: 80,height:30,}}>
						<Dropdown
							style = { styles.titleDD }
							dropdownStyle = { styles.titldDDStyle }
							dropdownTextStyle = { styles.titleDDTextStyle }
							textStyle = { styles.titleTextStyle }
							defaultIndex = { 0 }
							defaultValue = { titleDDOptions[0].value }
							options = { titleDDOptions }
							renderTitle = { ( value, index ) => this.renderTitle( value, index ) }
							renderRow = { (value,key,selected) => this.renderTitleOptionsRow( key, value, selected ) }
							onSelect = { (key, value) => this.handleOnSelectType( key, value ) }
						></Dropdown>
					</View>
				),
			rightTitle : (
				<View style = {{width: 30,height:30}}>
					<Dropdown
						style = { styles.titleDD }
						dropdownStyle = { styles.titldDDStyle }
						dropdownTextStyle = { styles.titleDDTextStyle }
						textStyle = { styles.titleTextStyle }
						options = { addDDOptions }
						renderTitle = { ( value, index ) => this.renderRightButton( value, index ) }
						renderRow = { ( value,key,selected ) => this.renderRightButtonOptionsRow( key, value, selected ) }
						onSelect = { (key, value) => this.handleOnSelectType( key, value ) }
					></Dropdown>
				</View>
			),
			leftTitle : this.renderLeftButton(),
			// rightButtonImage : require('../../images/community/btn_add_nav.png'),
			// leftButtonImage : require('../../images/community/btn_Search.png'),
			// leftTitle : <View style = {{ width : 20, height: 20 }}><Text>aa</Text></View>,
			onLeft : () => this.handleOnLeft(),
			onRight : () => this.handleOnRight(),
			hideNavBar : false
		})
	}
	handleOnLeft(){

	}
	handleOnRight(){

	}
	componentWillUnmount(){
		Actions.refresh({
			hideNavBar : true
		})
	}
	handleTabSelect( el ){
		switch( el.props.name ){
			case 2:
				return this.setState({ tabIndex : 2 })
			case 1:
			default:
				return this.setState({ tabIndex : 1 })
		}
	}
	render(){
		let {
				tabIndex
			} = this.state,
			subView = <View><ListSection></ListSection></View>
		return (
			<View style = { styles.container }>
				<Tabs selected={ tabIndex }
	                style={ styles.tabs }
	                iconStyle = { styles.tabIcon }
	                selectedStyle = { styles.tabSelect }
	                onSelect={ el => this.handleTabSelect( el ) }>
                	<View style = { [ styles.tab ] } name = { 1 }>
                		<Text style = { [ { fontSize : 16 },tabIndex === 1 ? _styles.selectedTextColor : _styles.textColor ] }>动态分享</Text>
                	</View>
                	<View style = { [ styles.tab ] } name = { 2 }>
                		<Text style = { [ { fontSize : 16 },tabIndex === 2 ? _styles.selectedTextColor : _styles.textColor ] }>活动约伴</Text>
                	</View>
                </Tabs>
                <View style={styles.subContainer}>
	              { subView }
	            </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: Object.assign({},_styles.bgColor,{
    	position: "relative",
        flex: 1,
    }),
    subContainer : Object.assign({},_styles.bgColor,{
    	flex:1,
    	position : "absolute",
    	top:( Platform.OS === 'ios' ? 64 : 54 ) + tabHeight,
    	bottom:0,
    	left:0,
    	right:0,
	    // backgroundColor:"#eee"
    }),
    tabs:Object.assign({},_styles.bgColor,_styles.contentBorderColor,{
    	position : "absolute",
    	top:Platform.OS === 'ios' ? 64 : 54,
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
        marginTop: 10,
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
    })
})