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
import _styles from 'components/commonStyles'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Tag from './tag'
import Button from './button'
import LevelLabel from './LevelLabel'
import DynamicView from './DynamicView'
import {Actions} from 'react-native-router-flux';

let stampImages = [
    require("../../../images/community/pic_diao.png"),
	require("../../../images/community/pic_you.png"),
]
export default class ListSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    static propTypes = {
        locInfo : PropTypes.string,
        buttons : PropTypes.arrayOf(PropTypes.shape({
            value : PropTypes.string
        })),
        onPress : PropTypes.func,
        userInfo : PropTypes.shape({
            name : PropTypes.string,
            headPic : PropTypes.string,
            level : PropTypes.number,
            id : PropTypes.any,
            tags : PropTypes.arrayOf(PropTypes.shape({
                tagName : PropTypes.string,
                tagId : PropTypes.number,
            }))
        }).isRequired,
        otherInfo : PropTypes.object,
        time : PropTypes.string,
        style : ViewPropTypes.style,
        type : PropTypes.number,
        //头像不可点击
        headUnclickable : PropTypes.bool,
    }
    static defaultProps = {
        userInfo : {},
        otherInfo : {},
        onPress : function(){}
    }
    handleOnPressHeadPic( uid ){
        if( !this.props.headUnclickable ) Actions.personalCenter({ uid })
    }
    getImageByType( type ){
        switch( type ){
            case 1:
                return stampImages[0]
            case 2:
                return stampImages[1]
            default:
                return null
        }
    }
    render() {
    	let {
                onPress,
                buttons,
                locInfo,
                otherInfo,
                userInfo,
                time,
                style,
                type,
                children,
            } = this.props,
            _buttons;

        Array.isArray( buttons ) && (_buttons = buttons.map( ( v, k ) => {
            return (
                <Button 
                    key = { `buttons_${k}` }
                    icon = { v.icon }
                    type = { v.type }
                    style = {{ marginRight:10 }}
                    buttonStyle = { styles.buttonStyle }
                    textStyle = { styles.buttonTextStyle }
                    onPress = { v.onPress }
                >{ v.value }</Button>
            )
        }))
        return (
        	<View style = { [_styles.bgColor, styles.container, style ] }>
        	   <View style = { styles.infoDesc1 }>
	        		<TouchableOpacity style = {{position: "absolute",top: 0,left: 0,borderRadius: 20,overflow: "hidden",}} onPress = { () => this.handleOnPressHeadPic( userInfo.id ) }>
                        <Image style = { styles.headPic } source = { { uri: userInfo.headPic } }/>
                    </TouchableOpacity>
	        		<View style = { styles.infoDesc2 }>
	        			<View style = { styles.name }>
	        				<Text style = { [_styles.fontSize,_styles.textColor] }>{ userInfo.name }</Text>
                            <LevelLabel style = {{ marginLeft : 5 }}>{ userInfo.level }</LevelLabel>
	        			</View>
	        			<View style = { styles.tag }>
                            {
                                Array.isArray( userInfo.tags ) && userInfo.tags.map( v => <Tag key = { v.tagId }>{ v.tagName }</Tag> )
                            }
	        			</View>
	        		</View>
	        		<Image style = { styles.stamp } source = { this.getImageByType(type) }/>
	        		<View style = { styles.date }>
	        			<Text style = { [ _styles.fontSize, _styles.descTextColor ] }>{ time }</Text>
	        		</View>
        		</View>
                <TouchableOpacity onPress = { onPress }>
        			<Text style = { [_styles.textColor,{ fontSize: 17, lineHeight: 20 }] }>{ otherInfo.content }</Text>
        			{/*<DynamicView style = {{ marginTop: 10 }}/>*/}
                    {/* !isEmpty( otherInfo.images ) && <ImagePreview imageOnPress = { index => otherInfo.imageOnPress( index ) } style = {{ marginTop: 10 }} imageStyle = { styles.imagePreview } maxLength = { 3 } rowNumber = { 3 } photoes = { otherInfo.images }/> */}
                    { children }
                </TouchableOpacity>
        		{
                    (locInfo || !isEmpty( buttons )) && <View style = { styles.addAopera }>
                        <Location locInfo = { locInfo }/>
            			<ButtonArea buttons = { buttons }/>
            		</View>
                }
        	</View>
        )
    }
}

const Location = ( props ) => {
    return (
        <View style = { styles.address }>
            {
                props.locInfo && [
                    <Image key = "loc_icon" style = {{ marginRight : 5 }} source = { require("../../../images/community/icon_Location-Pin.png") }/>,
                    <Text key = "loc_info" style = { [_styles.textColor,{ fontSize :12 }] }>{ props.locInfo }</Text>
                ]    
            }  
        </View>
    )
}

const ButtonArea = ( props ) => {
    return <View style = { styles.buttons }>
        {
            Array.isArray( props.buttons ) && ( props.buttons.map( ( v, k ) => {
                return (
                    <Button 
                        key = { `buttons_${k}` }
                        icon = { v.icon }
                        type = { v.type }
                        style = {{ marginRight:10 }}
                        buttonStyle = { styles.buttonStyle }
                        textStyle = { styles.buttonTextStyle }
                        onPress = { v.onPress }
                    >{ v.value }</Button>
                )
            }))
        }
    </View>

}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    infoDesc1: {
        height: 55,
        position: "relative",
    },
    headPic: {
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: "hidden",
    },
    infoDesc2: {
        position: "absolute",
        top: 0,
        left: 52,
    },
    name: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    tag: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    stamp: {
        position: "absolute",
        right: 80,
        top: -15,
        height: 35,
        width: 50,
    },
    date: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        height: 40,
    },
    addAopera: { 
        marginTop: 15,
    	flexDirection: "row", 
    	justifyContent: "space-between", 
    	alignItems: "center" 
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    address: { 
    	flexDirection: "row", 
    	justifyContent: "center", 
    	alignItems: "center" 
    },
    buttonStyle :{
        height:22,
        paddingLeft:7,
        paddingRight:7,
    },
    buttonTextStyle : {
        fontSize: 12,
    }
})