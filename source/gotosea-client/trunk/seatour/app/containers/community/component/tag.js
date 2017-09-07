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
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types'
import _styles from 'components/commonStyles'

export default class Tag extends React.Component {
    static propTypes = {
        style : ViewPropTypes.style,
        textStyle : Text.propTypes.style,
    }
    render() {
        let {
                style,
                textStyle,
            } = this.props;
        return (
        	<View style = { [ _styles.selectedBorderColor,{
        		paddingTop:2,
        		paddingBottom:2,
        		paddingLeft:7,
        		paddingRight:7,
        		borderWidth:1/PixelRatio.get(),
        		borderRadius:15,
        		overflow:"hidden",
        		marginRight:5,
        	}, style ]}>
        		<Text style = { [_styles.selectedTextColor, { fontSize:10 }, textStyle ]}>{ this.props.children }</Text>
        	</View>
        )
    }
}