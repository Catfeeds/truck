import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import _styles from '../commonStyles'

export default class EmptyList extends React.Component {
	componentDidMount(){
		console.info( 111 )
	}
    render() {
        return (
        	<View style = { styles.container }>
        		<Image source = { require("../../../images/icon_n.png")}/>
        		<Text>内容被吃掉了～</Text>
        	</View>
        )
    }
}

const styles = StyleSheet.create({
	container : {
		height: 300,
		width:300,
		backgroundColor : "#fff",
		// flex : 1
	}
})