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
    Dimensions,
    ViewPropTypes,
} from 'react-native'
import PropTypes from 'prop-types'
import _styles from 'components/commonStyles'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    static propTypes = {
    	borderWidth : PropTypes.number,
    	children : PropTypes.oneOfType([
    		PropTypes.arrayOf(( propValue, key, componentName, location, propFullName ) =>{
    			try{
    				if( ["IconButton","PrimaryButton","EmptyBlock"].indexOf( propValue[key].type.name ) === -1 ) throw new Error()
    			}catch(e){
    				return new Error(`Invald prop ${ propFullName } supplied to ${ componentName } Validation failed.`)
    			}
    		}),
    		function( props, propName, componentName ){
    			try{
    				if( ["IconButton","PrimaryButton","EmptyBlock"].indexOf( props[propName].type.name ) === -1 ) throw new Error()
    			}catch(e){
    				return new Error(`Invald prop ${ propName } supplied to ${ componentName } Validation failed.`)
    			}
    		}
    	]),
    }
    static defaultProps = {
    	borderWidth : 1,
    }
    componentDidMount(){
    	
    }
    // getButtonWidth( count, windowWidth, borderWidth = 1 ){
    // 	return ( windowWidth - ( ( count - 1 ) * borderWidth ) ) / count
    // }
    getButtonWidth(){
    	let {
    		children,
    		borderWidth,
    	} = this.props,
    	windowWidth = Dimensions.get('window').width,
    	count = 0,
    	totalWidth = 0;

    	React.Children.map( children, v => {
    		if( !!v.props.width ){
    			totalWidth += v.props.width
    			return
    		}
    		count++
    	})
    	if( windowWidth < totalWidth) throw new Error("button width was error")
    	return ( windowWidth - totalWidth - ( ( count - 1 ) * borderWidth ) ) / count
    }
    render() {
    	let {
    		borderWidth,
    		children,
    	} = this.props,
    	count = React.Children.count( children ),
    	width = this.getButtonWidth(),
    	first = 0,
    	last = count - 1,
    	_props;

        return (
        	<View style = { styles.container }>
        		{
        			React.Children.map( children, ( v, k ) => {
        				
        				if( v.type && v.type.name === 'PrimaryButton' ) return v

        				_props = {
        					style : {
        						width,
        						borderTopWidth : borderWidth,
        					}
        				}
			    		if( k === first ){
			    			_props.style.borderLeftWidth = 0
			    		}else if( k === last ){
			    			_props.style.borderRightWidth = 0
			    			_props.style.borderLeftWidth = borderWidth
			    		}else{
			    			_props.style.borderLeftWidth = borderWidth
			    		}
			    		_props.key = `__iconbutton_${ k }`
			    		return React.cloneElement( v, _props )
			    	})
        		}
        	</View>
        )
    }
}

export class IconButton extends React.Component{
	static propTypes = {
		icon : Image.propTypes.source,
		onPress : PropTypes.func,
		style : ViewPropTypes.style,
		iconStyle : ViewPropTypes.style,
		textStyle : Text.propTypes.style,
		children : PropTypes.node,
    }
	render(){
		let {
			icon,
			style,
			iconStyle,
			textStyle,
			children,
			onPress,
		} = this.props;
		return (
				<View style = { [ styles.iconContainer, style ] }>
					<TouchableOpacity style = { styles.iconTouch } onPress = { onPress }>
						<Image style = { [ iconStyle ]} source = { icon }/>
						<Text style = { [ styles.iconText, textStyle ] }>{ children }</Text>
					</TouchableOpacity>
				</View>
		)
	}
}

export class PrimaryButton extends React.Component{
	static propTypes = {
		width : PropTypes.number.isRequired,
		style : ViewPropTypes.style,
		textStyle : Text.propTypes.style,
		onPress : PropTypes.func,
		children : PropTypes.node,
	}
	render(){
		let {
			style,
			textStyle,
			children,
			onPress,
			width,
		} = this.props,
		_style = {};
		width && ( _style.width = width )
		return (
			<TouchableOpacity style = { [ styles.primaryContainer, _style, style ] } onPress = { onPress }>
				<Text style = { [ styles.primaryText, textStyle ] }>{ children }</Text>
			</TouchableOpacity>
		)
	}
}

export class EmptyBlock extends React.Component{
	static propTypes = {
		width : PropTypes.number.isRequired,
		style : ViewPropTypes.style,
		textStyle : Text.propTypes.style,
		children : PropTypes.node,
	}
	render(){
		let {
			style,
			textStyle,
			children,
			width,
		} = this.props,
		_style = {};
		width && ( _style.width = width )
		return (
			<View style = { [ styles.emptyBlockContainer, _style, style ] }>
				<Text style = { [ styles.emptyBlockText, _styles.textColor, _style, textStyle ] }>{ children }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		position:"absolute",
		bottom:0,
		height: 50,
		overflow : "hidden",
		justifyContent : "center",
		alignItems : "center",
		flexDirection : "row",
	},
	iconContainer : Object.assign({},_styles.contentBorderColor,{

	}),
	iconTouch : Object.assign({},_styles.bgColor,{
		justifyContent:"center",
		alignItems : "center",
		paddingTop:7,
		paddingBottom:7,
	}),
	iconText : Object.assign({},_styles.textColor,{
		marginTop: 5,
		fontSize : 11,
	}),
	primaryContainer : {
		backgroundColor : _styles.themeColor,
		justifyContent : "center",
		alignItems : "center",
		height : 50,
	},
	primaryText : {
		fontSize : 18,
		color : "#fff",
	},
	emptyBlockContainer : {
		backgroundColor : "#fff",
		justifyContent : "center",
		alignItems : "center",
		height : 50,
	},
	emptyBlockText : {
		fontSize : 18,
	},
})