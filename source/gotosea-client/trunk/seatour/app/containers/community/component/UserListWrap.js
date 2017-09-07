import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import _styles from 'components/commonStyles'

export default class UserListWrap extends React.Component {
    render() {
    	let {
	    		style,
	    		desc,
	    		children,
	    	} = this.props;
        return (
        	<View style = { [ styles.container, style ] }>
                { desc && <Text style = { styles.desc }>{ desc }</Text> }
                { children }
        	</View>
        )
    }
}

const styles = StyleSheet.create({
	container : Object.assign({},_styles.contentBorderColor,{
		borderTopWidth:1,
		borderBottomWidth:1,
		padding:15,
	}),
	desc : Object.assign({},_styles.descTextColor,_styles.fontSize,{
		marginBottom: 15,
	})
})