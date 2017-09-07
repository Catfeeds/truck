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
} from 'react-native';
import _styles from 'components/commonStyles'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'
import Dimensions from 'Dimensions'

const ScreenWidth = Dimensions.get('window').width,
	ScreenHeight = Dimensions.get('window').height,
	buttonMarginBottom = 100,
	buttonHeight = 45,
	navigationHeight = 62,
	needHeight = buttonHeight + buttonMarginBottom + navigationHeight,
	contextHeight = contextHeight <= needHeight ? needHeight : ( ScreenHeight - needHeight );

export default class ActivityPublicSucc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    handleOnRight(){

    }
    componentDidMount() {
    	Actions.refresh({
    		back: false,
    		rightTitle: "分享",
    		onRight: () => this.handleOnRight(),
    	})
    }
    render() {
        return (
        	<View style = { styles.container }>
        		<View style = { styles.context }>
	        		<Image source = { require("../../images/community/btn_CALENDAR---OK.png") } />
	        		<Text style = {[_styles.descTextColor,{ fontSize:18, marginTop: 22 }]}>发布成功</Text>
	        	</View>
        		<TouchableOpacity>
	        		<View style = { styles.button }>
						<Text style = { { fontSize: 18, color: "#fff" } }>去看看</Text>
	        		</View>
    			</TouchableOpacity>
        	</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    	height: ScreenHeight,
    	// justifyContent:"center",
    	alignItems:"center",
    },
    context:{
    	height: contextHeight,
		justifyContent:"center",
    	alignItems:"center",
    },
    button:{
    	width:140,
    	height:buttonHeight,
    	overflow:"hidden",
    	backgroundColor:_styles.themeColor,
    	borderRadius:70,
    	justifyContent:"center",
    	alignItems:"center"
    }
})