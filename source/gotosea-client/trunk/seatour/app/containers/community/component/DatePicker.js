 import React from 'react'
import {
     View,
     Text,
     TouchableOpacity,
     Dimensions
 } from 'react-native';

import Modal from 'react-native-modalbox'
import Picker from 'react-native-picker'

function createDateData() {
    let date = {};
    for (let i = 1950; i < 2050; i++) {
        let month = {};
        for (let j = 1; j < 13; j++) {
            let day = [];
            if (j === 2) {
                for (let k = 1; k < 29; k++) {
                    day.push(k + '日');
                }
            } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                for (let k = 1; k < 32; k++) {
                    day.push(k + '日');
                }
            } else {
                for (let k = 1; k < 31; k++) {
                    day.push(k + '日');
                }
            }
            month[j + '月'] = day;
        }
        date[i + '年'] = month;
    }
    return date;
};

 export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {};
    }

    _onPressHandle() {
        this.picker.toggle();
    }

    receiveRef = el =>{
        this.props.pickerRef( this.datePicker = el )
    }
    render() {
        return (
            <Modal backdrop = { true } ref = { this.receiveRef } style = {{ height:370 }} position = "bottom">
                <View style={{height: Dimensions.get('window').height}}>
                    <TouchableOpacity style={{marginTop: 20}} onPress={this._onPressHandle.bind(this)}>
                        <Text>点我</Text>
                    </TouchableOpacity>
                    <Picker
                        ref = { picker => this.picker = picker }
                        style = {{ height: 320 }}
                        showDuration = { 300 }
                        pickerData = { createDateData() }
                        selectedValue = {['2015年', '12月', '12日']}
                        onPickerDone = { pickedValue => {
                            console.log(pickedValue);
                        }}
                    ></Picker>
                </View>
            </Modal>
        );
    }
 };