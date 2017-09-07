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
import _styles from './commonStyles'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default class TemplateApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    static propTypes = {
    }
    static defaultProps = {
    }
    componentDidMount(){
    	
    }
    render() {
        return (
        	<View style = { styles.container }>
        		
        	</View>
        )
    }
}

const styles = StyleSheet.create({
	container : {

	}
})