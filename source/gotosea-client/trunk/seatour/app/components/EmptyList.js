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
import _styles from 'components/commonStyles'

export default class EmptyList extends React.Component {
    render() {
        return (
        	<View style = { styles.container }>
        		<Image source = { require("images/icon_n.png")}/>
        		<Text style = {[ _styles.fontSize, _styles.descTextColor, { marginTop: 15 }]}>内容被吃掉了～</Text>
        	</View>
        )
    }
}

const styles = StyleSheet.create({
	container : {
		backgroundColor : "#fff",
        justifyContent:"center",
        alignItems : "center",
		flex : 1,
        marginTop:30,
	}
})