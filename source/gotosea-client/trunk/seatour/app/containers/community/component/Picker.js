import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import _styles from 'components/commonStyles'
import Modal from 'react-native-modalbox'
import Tool from 'utils/tool'
import PropTypes from 'prop-types'
import Picker from 'react-native-picker'
import DateTool from 'utils/date-tool'

/**
 * 创建级联二维数组
 * @param  {[type]} maxNumber [description]
 * @return {[type]}           [description]
 */
function createTravelNubmerSet( maxNumber ){
	let items = []
	for( let i = 1; i <= maxNumber; i++ ){
		let subItems = []
		for( let j = i; j <= maxNumber; j++){
			subItems.push( j )
		}
		items.push({
			[i] : subItems
		})
	}
	return items
}

export default class MyPicker extends React.Component{
	constructor(props) {
		super(props);
	
		this.state = {};
	}
	static defaultProps = {
		onPickerConfirm : function(){},
		onPickerCancel : function(){},
	}
	pickerOnClose(){
    	Picker.hide()
	}
	open(){
		let {
			onPickerConfirm,
			onPickerCancel,
			...others
		} = this.props;

		Picker.init({
			pickerConfirmBtnText: '确定',
			pickerCancelBtnText: '取消',
			...others,
			onPickerConfirm: data => {
				this.picker.close()
				onPickerConfirm( data )
			},
			onPickerCancel: () =>{
				this.picker.close()
				onPickerCancel()
			}
		})
		this.picker.open();
		Picker.show()
	}
	close(){
		this.picker.close()
		Picker.hide()
	}
	render(){
		return (
			<Modal onClosed = { this.pickerOnClose } style = {{ height:0 }} ref = { el => this.picker = el } />
		)
	}
}

export class TravelPeoplePicker extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {};
	}
	static propTypes = {
		maxNumber : PropTypes.number.isRequired
	}
	static defaultProps = {
		maxNumber : 1,
		pickerRef : function(){}
	}
	componentDidMount(){
		this.setState({ items : createTravelNubmerSet( this.props.maxNumber )})
	}
	receiveRef = el => {
		this.props.pickerRef( el )
	}
	render(){
		let {
			pickerRef,
			...others
		} = this.props;

		return (
			<MyPicker { ...others } ref = { this.receiveRef } pickerData = { this.state.items }/>
		)	

	}
}

export class DateTimePicker extends React.Component{
	constructor(props) {
		super(props);
		this.toDay = new Date()

		this.startYear = 1970
		this.endYear = this.toDay.getFullYear() + 1

		this.startMonth = 1
		this.endMonth = 12

		this.startDate = 1
		this.endDate = 31

		this.dayOf31 = [1,3,5,7,8,12]
		this.dayOf30 = [3,6,9,10,11]

		this.startHour = 1
		this.endHour = 60

		this.startMinute = 1
		this.endMinute = 60

		this.state = {
			defaultValue : []
		};
	}
	static propTypes = {
	}
	static defaultProps = {
		type: "datetime",
		pickerRef : function(){},
		value : new Date,
	}
	componentDidMount(){
		let {
				startYear,
				endYear,
				startMonth,
				endMonth,
				startDate,
				endDate,
				startHour,
				endHour,
				startMinute,
				endMinute,
			} = this,
			{
				type, //"date" or "datetime" or "time"
				value,
			} = this.props,
			items,
			defaultValue;
		switch( type ){
			case "date":
				items = [[],[],[]]
				while( startYear <= endYear ) items[0].push( `${ startYear++ }年` )
				while( startMonth <= endMonth ) items[1].push( `${ DateTool.subjoinZero( startMonth++ ) }月` )
				while( startDate <= endDate ) items[2].push( `${ DateTool.subjoinZero( startDate++ ) }日` )
				defaultValue = DateTool.getArrayOfDate( new Date( value ) )
				break;
			case "time":
				items = [[],[]]
				while( startHour <= endHour ) items[3].push( `${ DateTool.subjoinZero( startHour++ ) }时` )
				while( startMinute <= endMinute ) items[4].push( `${ DateTool.subjoinZero( startMinute++ ) }分` )
				defaultValue = DateTool.getArrayOfTime( new Date( value ) )
				break;
			default:
				items = [[],[],[],[],[]]
				while( startYear <= endYear ) items[0].push( `${ startYear++ }年` )
				while( startMonth <= endMonth ) items[1].push( `${ DateTool.subjoinZero( startMonth++ ) }月` )
				while( startDate <= endDate ) items[2].push( `${ DateTool.subjoinZero( startDate++ ) }日` )
				while( startHour <= endHour ) items[3].push( `${ DateTool.subjoinZero( startHour++ ) }时` )
				while( startMinute <= endMinute ) items[4].push( `${ DateTool.subjoinZero( startMinute++ ) }分` )
				defaultValue = DateTool.getArrayOfDateTime( new Date( value ) )
				break;
		}
		this.setState({
			items,
			defaultValue,
		})
	}
	receiveRef = el => {
		this.props.pickerRef( el )
	}
	// onPickerSelect = data => {
	// 	if( parseInt( data[1] ) === 2 ){
	// 		let items = this.state.items.slice(),
	// 			subItems = []
	// 			startMonth = this.state.startMonth;

	// 		while( startMonth <= 28 ) subItems.push( `${ DateTool.subjoinZero( startMonth++ ) }月` )
	// 		items[1] = subItems
	// 		Picker.init({
	// 			pickerData : items
	// 		})
	// 	}
	// }
	render(){
		let {
			pickerRef,
			...others
		} = this.props,
		{
			items,
			defaultValue,
		} = this.state;

		return (
			<MyPicker { ...others } ref = { this.receiveRef } pickerData = { items } selectedValue = { defaultValue }/>
		)
	}
}