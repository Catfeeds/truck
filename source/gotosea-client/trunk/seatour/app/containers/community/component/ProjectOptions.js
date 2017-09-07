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

export default class ProjectOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    static propTypes = {
        cover : Image.propTypes.source.isRequired,
        onDelete : PropTypes.func,
        renderRight : PropTypes.func,
        deletabled : PropTypes.bool,
        style : ViewPropTypes.style,
    }
    static defaultProps = {
        onDelete : function(){}
    }
    componentDidMount() {

    }
    render() {
    	let {
            title,
    		cover,
    		style,
            desc,
            deletabled,
            onDelete,
            renderRight,
    		...others,
    	} = this.props,
        _rightContent,
        deleteContent;
        if( deletabled ){
            deleteContent = (
                <TouchableOpacity onPress = { onDelete } style = {{ marginLeft: 10 }}>
                    <Image source = { require("../../../images/community/btn_Delete-.png") }/>
                </TouchableOpacity>
            )
        }
        if( renderRight ){
            _rightContent = renderRight( this.props )
        }
        return (
        	<View style = { [styles.container,style] } {...others}>
        		<View style = {{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <View style = { styles.imageWrap }>
                        <Image style = {{ width: 60, height: 60 }} resizeMode = "cover" source = { cover }/>
                    </View>
        			<View style = {{ padding:10 }}>
        				<Text style = {[_styles.fontSize,_styles.textColor,{}]}>{ title }</Text>
        				{ !!desc && <Text style = { [{fontSize : 12, marginTop:10, }, _styles.descTextColor ]}>{ desc }</Text> }
        			</View>
        		</View>
                <View style = {{ flexDirection: "row", justifyContent : "space-between", alignItems: "center" }}>
                    { _rightContent }
                    { deleteContent }
                </View>
        	</View>
        )
    }
}

const styles = StyleSheet.create({
	container : Object.assign({},_styles.contentBorderColor,{
		paddingRight:10,
		borderWidth:1,
		flexDirection: "row",
		justifyContent:"space-between",
		alignItems:"center",
        padding: 5,
        borderRadius: 5,
        overflow:"hidden",
        marginLeft:15,
        marginRight:15,
        marginBottom: 10,
 	}),
    imageWrap:{
        borderRadius: 5,
        overflow:"hidden",
    }

})