import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import _styles from 'components/commonStyles'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    static propTypes = {
    	unitStyle : Text.propTypes.style,
		textStyle : Text.propTypes.style,
    }
    static defaultProps = {
    	unit : "￥",
    	value : "0.00"
    }
    componentDidMount(){
    	
    }
    render() {
    	let {
    		unitStyle,
    		unit,
    		textStyle,
    		value,
    		children
    	} = this.props;

        return (
        	<Text style = { [ styles.price, unitStyle ] }>
        		{ unit }<Text style = { [ styles.priceSize, textStyle ] }>{ children || value }</Text>
        	</Text>
        )
    }
}

const styles = StyleSheet.create({
	price : {
		color : "#f34307",
		fontSize : 12,
	},
	priceSize : {
		fontSize : 18,
	}
})