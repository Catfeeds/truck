import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Platform,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import Gallery from 'react-native-gallery'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default class SeaGallery extends Component {
    constructor(props) {
        super(props);
        let { images } = this.props;
        this.state = {
        	index : 0,
        	length : images ? images.length : 0,
          images: images,
        };
    }
    componentWillReceiveProps(props){
      let { images } = this.props;
      this.setState({
        length : images ? images.length : 0,
        images: images,
      })
    }
    componentWillMount(){
      this.handleChangePage(0);
    }
    handleChangePage( index ){
    	let length = this.state.length;
    	this.setState({ index },function(){
	    	Actions.refresh({
          navigationBarStyle : styles.navigateStyle,
          titleStyle : styles.titleStyle,
          backButtonImage : require('../images/route/btn_ARROW---LEFT.png'),
	    		title : `${ index + 1 }/${length}`
	    	})
    	})
    }
    render() {
    	let { images } = this.state;
        return (
        	<Gallery
        		ref = { el => this.gallery = el }
    				style={{flex: 1, backgroundColor: 'black'}}
    				images={ images || [] }
    				onPageSelected = { index => this.handleChangePage( index ) }
				/>
        )
    }
}

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
