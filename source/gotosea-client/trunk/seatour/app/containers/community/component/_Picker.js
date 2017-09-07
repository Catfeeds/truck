import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Switch,
    Dimensions,
    Picker,
} from 'react-native';
import _styles from '../commonStyles'
import Modal from 'react-native-modalbox'
import Tool from 'utils/tool'
import PropTypes from 'prop-types'

export default class extends React.Component{
	constructor(props) {
		super(props);
	
		this.state = {};
	}
	static propTypes = {
		items : PropTypes.array,
		pickerRef : function(){},
	}
	componentDidMount(){

	}
	renderItem( items ){
		return Array.isArray( items ) && items.map( v => <Picker.Item style = { styles.pickerItem } key = { v.value } value = { String(v.value) } label = { String(v.label) }/>)
	}
	renderPicker( items ){
		let width = Array.isArray( items[0] ) && this.getPickerWidth( items.length )

		if( !!width ){
			return items.map( ( v, k ) => {
				return (
					<Picker key = { k } style = {{ width, marginLeft: 10, marginRight: 10 }} itemStyle = { styles.pickerItem }>
						{ this.renderItem( v ) }
					</Picker>
				)
			})
		}else{
			return (
				<Picker key = { k } itemStyle = { styles.pickerItem }>
					{ this.renderItem( items ) }
				</Picker>
			)
		}
	}
	getPickerWidth( len ){
		if( !len ) return 0
		return parseInt( Dimensions.get("window").width / len - 20 )
	}
	receiveRef = el => {
		this.props.pickerRef( this.picker = el )
	}
	render(){
		let {
			items,
		} = this.props;
		// items = [
		// 	[
		// 		{
		// 			label : "最小出行人数",
		// 			value : -1
		// 		},
		// 	],
		// 	[
		// 		{
		// 			label : "最大出行人数",
		// 			value : -1
		// 		},
		// 	],
		// ]
		return (
			<Modal backdrop = { true } ref = { this.receiveRef } style = {{ justifyContent:"center", flexDirection: "row", height:200 }} position = "bottom">
				{
					this.renderPicker( items )
				}
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	datePicker : {

	},
	pickerItem : Object.assign({},_styles.fontSize, _styles.textColor,{

	})
})