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
    WebView,
    Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

const {
	width,
	height,
} = Dimensions.get("window")

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
    	Actions.refresh({
			renderLeftButton : () => <LeftTitle/>,
			onRight : () => console.info("hello"),
            // renderTitle : null,
            // renderRightButton : null,
			title : "珠海",
			rightTitle : "我的收藏",
			hideNavBar : false,
		})
    }
    render() {
        return (
        	<WebView
        		style = { styles.container }
                source = {{
                uri : "https://app.gotosea.com.cn/meteor/index.html",
              }}/>
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

const styles = StyleSheet.create({
	container : {
    	marginTop:Platform.OS === 'ios' ? 64 : 54,
	}
})
