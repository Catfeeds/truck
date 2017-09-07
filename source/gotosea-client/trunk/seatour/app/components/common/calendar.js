import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modalbox';
import Tool from '../../utils/tool'

const { width, height }  = Dimensions.get('window');


/**
*props: seletDate, confirmFn
*seletDate (string): 选中日期
*confirmFn （fn）: 点击确定回调函数，return 'yyyy-MM-dd'
*/
export default class MyCalendar extends Component{
  constructor(props){
    super(props);
    let now = new Date(),
    minDate = now.format('yyyy-MM-dd'),
    maxDate = now.add('y',2).format('yyyy-MM-dd');
    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      seletDate: [minDate],
      selectMarked: {},
      markedDates: props.markedDates || {},
    }
  }
  onDayPress(day, dayMarked){
    let date = new Date();
    date.setTime(day.timestamp);
    let selet = date.format('yyyy-MM-dd');
    this.setState({
      seletDate: [selet],
      selectMarked: dayMarked
    });
  }
  open(){
    let {
      seletDate,
      markedDates
    } = this.props;
    if(seletDate)
      this.setState({
        seletDate: [seletDate],
        markedDates: markedDates,
      });
    this.refs.modal.open();
  }
  close(){
    this.refs.modal.close();
  }
  cancel(){
    this.close();
  }
  confirm(){
    let { confirmFn } = this.props;
    if( Tool.isFunction(confirmFn) ){
      let {
        seletDate,
        selectMarked
      } =  this.state,
      value;
      if( seletDate.length=1 )
        value = seletDate[0]
      else
        value = seletDate
      confirmFn.call(this,value, selectMarked);
    }
    this.close();
  }
  render(){
    return(
      <Modal style = { [styles.modal] }
        position = { 'bottom' }
        ref = { 'modal' }
        backdropPressToClose = { true }
        >
        <View style={ styles.tool }>
          <Text style={styles.btn} onPress={ this.cancel.bind(this) }>取消</Text>
          <Text style={styles.btn} onPress={ this.confirm.bind(this) }>确定</Text>
        </View>
        <Calendar
          minDate = { this.state.minDate }
          maxDate = { this.state.maxDate }
          onDayPress = { this.onDayPress.bind(this) }
          onMonthChange = { (month) => {}}
          selected = { this.state.seletDate }
          firstDay = { 1 }
          style = { styles.calendar }
          markedDates={ this.state.markedDates }
          hideExtraDays = { false }
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00cfff',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00cfff',
            dayTextColor: '#353535',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#00cfff',
            monthTextColor: '#353535'
          }}
        />
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  modal: {
    maxHeight: Platform.OS == 'ios' ? 430 : 440,
    justifyContent: 'center',
  },
  tool: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  btn: {
    color: '#00cfff',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  calendar: {
    width: width,
  }
});
