import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Tool from 'utils/tool';

/**
 * [左边标题，右边可点输入框]
 * @type {Object}
 */
export default class InputItemSelect extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),     //整行样式
    title: PropTypes.string,          //左边标题
    value: PropTypes.string,          //显示值
    placeholder: PropTypes.string,    //提示
    click: PropTypes.func,            //点击后回调
  }
  constructor(props) {
    super(props);
    this.state = {
      value : props.value
    }
  }
  componentWillReceiveProps(props){
    this.setState({value : props.value})
  }
  render() {
    let { value } = this.state;
    let { style, title, placeholder, click } = this.props
    return (
      <View style = { [styles.textContent, style] }>
        <Text style = { styles.textStyle }>{ title }</Text>
        <TouchableOpacity style = {{ flex: 1}} onPress={()=>{Tool.isFunction(click) && click()} }>
          <TextInput
            defaultValue = { value }
            editable = { false }
            placeholder = { placeholder || '请选择...' }
            underlineColorAndroid = 'transparent'
            selectionColor = '#34a5f0'
            clearButtonMode = 'while-editing'
            style = {styles.inputText}
          />
        </TouchableOpacity>
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
