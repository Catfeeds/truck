import React,{ Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import Tool from 'utils/tool';

/**
 * [左边标题，右边输入框]
 * @type {Object}
 */
export default class InputItem extends React.Component {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),     //整行样式
    titleStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]), //左边标题样式
    title: PropTypes.string,          //左边标题
    defaultValue: PropTypes.string,   //默认值
    placeholder: PropTypes.string,    //提示
    onChangeText: PropTypes.func,     //输入变得回调
  }

  constructor(props) {
    super(props);
  }
  
  render() {
    let { style, title, defaultValue, placeholder, onChangeText, titleStyle } = this.props
    return (
      <View style = { [styles.textContent, style] }>
        <Text style = { [styles.textStyle, titleStyle] }>{ title }</Text>
        <TextInput
          defaultValue = { defaultValue }
          placeholder = { placeholder }
          underlineColorAndroid = 'transparent'
          selectionColor = '#34a5f0'
          clearButtonMode = 'while-editing'
          onChangeText = { (text)=>{ Tool.isFunction(onChangeText) && onChangeText(text) } }
          style = {styles.inputText}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  textContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  textStyle: {
    color: '#323232',
    width: 70,
    fontSize: 14,
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: '#323232'
  },
});
