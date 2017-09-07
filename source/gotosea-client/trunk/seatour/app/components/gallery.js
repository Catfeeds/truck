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
} from 'react-native'
import PropTypes from 'prop-types'
import Gallery from 'react-native-gallery'
import { connect } from 'react-redux'
import { loadImage, removeImageByIndex } from 'actions/images'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default connect( state => ({
	images : state.images
}))(class GalleryApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	index : 0,
        	length : 0,
        };
    }
    static propTypes = {
    	galleryIndex : PropTypes.number,
    }
    static defaultProps = {
    	galleryIndex : 2,
    }
    componentDidMount(){
    	let {
    			images,
                deletable,
    			galleryIndex,
    		} = this.props,
    		length = images.length,
            options = {
                navigationBarStyle : styles.navigateStyle,
                titleStyle : styles.titleStyle,
                title : `${ galleryIndex + 1 }/${length}`,
                backButtonImage : require('../images/route/btn_ARROW---LEFT.png'),
                // onRight : () => this.handleOnRight(),
                onLeft : () => Actions.pop()
            };

    	this.setState({ index: galleryIndex, length }, () => {
            if( deletable ){
                options.onRight = () => this.handleOnRight()
                options.rightButtonImage = require("../images/btn_delete.png")
            }

    		Actions.refresh( options )
			this.gallery.getViewPagerInstance().setPage(galleryIndex)
    	})
    }
    componentWillUnmount(){
        let {
            deletable,
            images,
            dispatch,
        } = this.props;
        
        if( !deletable )  dispatch( loadImage() )
    }
    handleOnRight(){
    	let { dispatch } = this.props,
			{ 
				length,
				index
			} = this.state;
		if( length <= 1 ) return Actions.pop()

		dispatch( removeImageByIndex( index ) )

		this.setState({ length : --length, index: ( index >= length ? --index : index ) },function(){
			Actions.refresh({ title : `${ index + 1 }/${length}` })
			this.gallery.getViewPagerInstance().setPage(index)
		})
    }
    handleChangePage( index ){
    	let length = this.state.length;
    	this.setState({ index },function(){
	    	Actions.refresh({
	    		title : `${ index + 1 }/${length}`
	    	})
    	})
    }
    render() {
    	let {
	    		images
	    	} = this.props,
	    	__images;
	    Array.isArray( images ) && images.length > 0 && typeof images[0] !== "string" && ( __images = images.map( v => v.path || v.sourceURL || v.url || "" ))

        return (
        	<Gallery
        		ref = { el => this.gallery = el }
				style={{flex: 1, backgroundColor: 'black'}}
				images={ __images || images }
				onPageSelected = { index => this.handleChangePage( index ) }
				/>
        )
    }
})

const styles = StyleSheet.create({
	navigateStyle : {
		backgroundColor : "#000",
		borderBottomWidth: 0,
		opacity : 0.85,
	},
	titleStyle : {
		color : "#fff"
	}
})