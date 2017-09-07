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
import PropTypes from 'prop-types'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default class ListComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    static propTypes = {
    	commentInfo : PropTypes.shape({
    		name : PropTypes.string,
    		id : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    		content : PropTypes.string,
    		headPic : PropTypes.string,
    	}).isRequired,
    	replyInfo : PropTypes.shape({
    		name : PropTypes.string,
    		id : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    		content : PropTypes.string,
    	})
    }
    handleOnPress(id ){
        Actions.personalCenter({ id })
    }
    render() {
    	let {
    		commentInfo,
    		replyInfo,
    		time,
    	} = this.props,
    	replyArea;

    	if( replyInfo ){
    		replyArea = (
    			<TouchableOpacity onPress = { () => this.handleOnPress( replyInfo.id ) } style = { styles.replyArea }>
    				<Text style = { styles.replyContent }><Text style = { styles.replyName }>{ replyInfo.name }</Text>  { replyInfo.content }</Text>
    			</TouchableOpacity>
    		)
    	}
        return (
        	<View style = { [styles.container, this.props.style ] }>
        		<TouchableOpacity onPress = { () => this.handleOnPress( commentInfo.id ) }>
        			<Image style = { styles.headPic } source = { { uri : commentInfo.headPic } }/>
        		</TouchableOpacity>
        		<View style = { styles.rightText }>
        			<Text style = { [_styles.textColor, _styles.fontSize, { lineHeight: 20 } ] }>{ commentInfo.name }</Text>
        			<Text style = { [_styles.descTextColor, { fontSize :12, lineHeight:20 } ] }>今天10：01</Text>
        			{ replyArea }
        			<Text style = { [_styles.textColor, { fontSize : 13, lineHeight :20 } ] }>{ commentInfo.content }</Text>
        		</View>
        	</View>
        )
    }
}

const styles = StyleSheet.create({
	container : {
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"flex-start",
		padding: 15,
	},
	headPic : {
		width:40,
		height:40,
		borderRadius:20,
		overflow:"hidden",
		marginRight:10,	
	},
	replyArea:Object.assign({},_styles.contentBgColor,{
		padding:8,
		marginTop:5,
		marginBottom:5,
	}),
	replyName : Object.assign({},_styles.selectedTextColor,{
		fontSize : 12,
		lineHeight : 16,
	}),
	replyContent : Object.assign({},_styles.descTextColor,{
		fontSize : 12,
		lineHeight : 16,
	}),
	rightText:{
		flex:1,
		// marginTop:7,
	}
})