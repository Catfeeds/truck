import React, { Component, PropTypes } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modalbox';
import Tool from 'utils/tool'

const { width, height }  = Dimensions.get('window');


/**
*datas [] 格式为：[{key: 1, value: 'test'}]
*/
export default class MyPicker extends Component{
  static propTypes = {
    click: PropTypes.func,   //确定回调函数
    datas: PropTypes.array,    //数据源
  }
  static defaultProps = {
    datas: [],
  }
  constructor(props){
    super(props);
    this.state = {
      options: props.datas || []
    }
  }
  componentWillReceiveProps(props){
    let { datas, selectKey } = props;
    this.setState({
      options: datas || [],
      selectKey: selectKey,
    })
  }
  open(){
    this.refs.modal.open();
  }
  close(){
    this.refs.modal.close();
  }
  click( data ){
    let { click } = this.props;
    this.close();
    this.setState({selectKey: data.key})
    if(Tool.isFunction(click)){
      click.call(this, data);
    }

  }
  render(){
    let { options, selectKey } = this.state;
    let { title } = this.props;
    return(
      <Modal style = { [styles.modal,{ height: options.length*47}] }
        position = { 'center' }
        ref = { 'modal' }
        backdropPressToClose = { true }
        >
        <FlatList
          data={ options }
          ref = {'list'}
          key = {selectKey}
          style = { styles.list }
          keyExtractor = {(item, index) => `pick-${index}`}
          renderItem={ (ret )=>{
             return <TouchableOpacity style = { styles.textView } onPress = { this.click.bind(this, ret.item)}>
                      <Text style = { [styles.text, ret.item.key == selectKey && styles.textSel]}>{ ret.item.value }</Text>
                    </TouchableOpacity>
            }}
        />
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  modal: {
    width: width - 100,
    maxHeight: 350,
    justifyContent: 'center',
    borderRadius: 5,
  },
  textView:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb',
  },
  text:{
    fontSize: 14,
    color: '#323232',
  },
  textSel:{
    color: '#34a5f0',
    fontWeight: 'bold',
  },
  list:{
  }
});
