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
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types'
import _styles from 'components/commonStyles'

/**
 * 1、默认按钮(default)
 *     字体(_styles.fontSize,_styles.descTextColor)
 *     边框(borderWidt:1,borderColor:_styles.contentBorderColor) 
 *     背景(_styles.bgColor)
 *     高度30
 * 2、填充主题色按钮(fill)
 *     字体(_styles.fontSize,color:#fff)
 *     边框(borderWidt:1,borderColor:_styles.themeColor) 
 *     背景(backgroundColor:_styles.themeColor)
 *     高度30
 * 3、主题色按钮(primary)
 *     字体(_styles.fontSize,)
 *     边框(borderWidt:1,_style.selectedBorderColor) 
 *     背景(_styles.bgColor)
 *     高度30
 * 4、不可用按钮(disabled)
 *     字体(_styles.fontSize,_styles.descTextColor)
 *     边框(borderWidt:1,borderColor:_styles.contentBgColor.color) 
 *     背景(_styles.contentBgColor)
 *     高度30
 */
export default class Button extends React.Component {
    static propTypes = {
        type : PropTypes.oneOf(["default","primary","fill","disabled"]),
        buttonStyle : ViewPropTypes.style,
        textStyle : Text.propTypes.style,
        iconStyle : Image.propTypes.style,
        icon : Image.propTypes.source,
    }
    static defaultProps = {
        type : "default",
    }
    render() {
    	let {
    		icon,
    		buttonStyle,
            textStyle,
            iconStyle,
            type,
    		...others
    	} = this.props,
        _buttonStyle,
        _textStyle,
        _buttonContent;
        switch( type ){
            case "disabled":
                _buttonStyle = styles.disabledButton;
                _textStyle = styles.disabledText;
                break;
            case "fill":
                _buttonStyle = styles.fillButton;
                _textStyle = styles.fillText;
                break;
            case "primary":
                _buttonStyle = styles.primaryButton;
                _textStyle = styles.primaryText;
                break;
            default:
                _buttonStyle = styles.defaultButton;
                _textStyle = styles.defaultText;
                break;
        }

        _buttonContent = (
            <View style = { [ styles.container, _buttonStyle, buttonStyle ] }>
                { icon && <Image style = { [{ marginRight: 5 }, iconStyle ]} source={ icon }/> }
                <Text style = { [ _textStyle, textStyle ] }>{ this.props.children }</Text>
            </View>
        )

        return (
            type === "disabled" ? <View { ...others }>{ _buttonContent }</View> : <TouchableOpacity { ...others }>{ _buttonContent }</TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    defaultButton : Object.assign({},_styles.contentBorderColor,_styles.bgColor,{

    }),
    defaultText : Object.assign({},_styles.fontSize,_styles.descTextColor,{

    }),
    fillButton : {
        borderColor: _styles.themeColor,
        backgroundColor: _styles.themeColor,
    },
    fillText : Object.assign({},_styles.fontSize,{
        color : "#fff"
    }),
    primaryButton : Object.assign({},_styles.bgColor,{
        borderColor: _styles.themeColor,
    }),
    primaryText : Object.assign({},_styles.fontSize,_styles.selectedTextColor,{
        
    }),
    disabledButton : Object.assign({},_styles.contentBgColor,{
        borderColor : '#f0f0f0'
    }),
    disabledText : Object.assign({},_styles.fontSize,_styles.descTextColor,{
        
    }),
    container : {
        height:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:1000,
        borderWidth:1,
        overflow:"hidden",
        paddingLeft:15,
        paddingRight:15,
    }
    // container : {
    //     height:22,
    //     flexDirection:"row",
    //     justifyContent:"center",
    //     alignItems:"center",
    //     paddingLeft:7,
    //     paddingRight:7,
    //     borderWidth:1,
    //     borderRadius:15,
    //     overflow:"hidden",
    // }
})