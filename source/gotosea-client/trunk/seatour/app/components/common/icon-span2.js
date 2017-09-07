import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
}from 'react-native';

/**
 * [点击工具栏： 标题+右箭头]
 * @type {Object}
 */
export default class IconSpan2 extends Component{
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    text: PropTypes.string,         //标题
    click: PropTypes.func,         //点击回调
  }
  constructor(props){
    super(props);
    this.state = {
      text: props.text || ''
    }
  }
  componentWillReceiveProps(props){
    this.setState({  text: props.text || '' });
  }
  render(){
    let { icon, click , style, textStyle } = this.props;
    let { text } = this.state;
    return (
        <TouchableOpacity onPress={click} style={ [styles.containers, style] }>
            <Text style={ [styles.text, textStyle] }>{ text }</Text>
            <Image source={require('images/personal/Setting.png')} style={ styles.arrow }/>
        </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    padding: 10,
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#323232',
    paddingRight: 10,
    textAlign: 'left',
  },
  arrow: {
    width: 9,
    height: 16,
  }
})
