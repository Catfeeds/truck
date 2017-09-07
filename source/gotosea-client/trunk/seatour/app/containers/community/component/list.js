import React, { Component } from 'react';
import {
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
} from 'react-native';
import _styles from 'components/commonStyles'

let rightArrow = require("../../../images/common/icon_ARROW--17.png")

export default class List extends React.Component{
	render(){
		let {
			beforeIcon,
			afterIcon,
			showAfterIcon,
			children,
			onPress,
			style,
			...others
		} = this.props;
		if( typeof onPress === "function" ){
			return (
				<View style = { [_styles.contentBorderColor, { borderTopWidth: 1,borderBottomWidth: 1, }, style ] } { ...others }>
					<TouchableOpacity style = { [ styles.container, style ] } onPress = { onPress }>
						{ beforeIcon && <Image source = { beforeIcon } /> }
						<View style = { styles.content }>{ children }</View>
						{ showAfterIcon !== false && <Image style = {{ marginLeft:10 }} source = { afterIcon || rightArrow } /> }
					</TouchableOpacity>
				</View>
			)
		}else{
			return (
				<View { ...others } style = { [ styles.container, style ] }>
					{ beforeIcon && <Image source = { beforeIcon } /> }
					<View style = {{flex:1}}>{ children }</View>
					{ showAfterIcon !== false && afterIcon && <Image source = { afterIcon } /> }
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		paddingLeft:15,
		paddingRight:15,
		paddingTop:13,
		paddingBottom:13,
		position:"relative",
	},
	content: {
	    flex: 1,
	    flexDirection: "row",
	    justifyContent: "space-between",
	    alignItems: "center",
	}
})