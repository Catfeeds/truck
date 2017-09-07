import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
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
    ViewPropTypes,
} from 'react-native'

export default class LevelLabel extends React.Component{
	static propTypes = {
		children : PropTypes.node,
		style : ViewPropTypes.style,
		textStyle : Text.propTypes.style,
	}
	static defaultProps = {
		children : 1
	}
	render(){
		let {
				style,
				textStyle,
				children
			} = this.props;
		return (
			<LinearGradient style = { [ styles.container, style ] } colors={['#eea849','#f46b45']}>
				<Text style = { [ styles.text, textStyle ] }>Lv.{ children }</Text>
			</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container : {
	    borderRadius: 2,
        overflow: "hidden",
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 3,
        paddingRight: 3,
	    justifyContent:"center",
	    alignItems : 'center',
	},
	text : {
		fontSize: 10,
	    color: '#fff',
	    backgroundColor: 'transparent',
	}
})