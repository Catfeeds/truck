import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
}from 'react-native';

/**
 * [点击工具栏： 标题+内容+右箭头]
 * @type {Object}
 */
export default class IconSpan3 extends Component{

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    title: PropTypes.string,        //左标题
    defaultText: PropTypes.string,  //默认显示
    text: PropTypes.string,         //显示文字
    click: PropTypes.func,         //点击回调
  }
  constructor(props){
    super(props);
    this.state = {
      text: props.text,
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      text: props.text,
    });
  }
  render(){
    let { text } = this.state;
    let { title, defaultText, click , style, titleStyle, textStyle} = this.props;
    return (
        <View style={ [styles.containers, style] }>
            <Text style={ [styles.text, { textAlign: 'left', width: 90}, titleStyle] }>{ title }</Text>
            <TouchableOpacity onPress={click} style={ styles.rightView }>
              <Text style={ [styles.text, { textAlign: 'right'}, !text && { color: '#acacac'}, text && textStyle] }>{ text || defaultText }</Text>
              <Image source={require('images/personal/Setting.png')} style={ styles.arrow }/>
            </TouchableOpacity>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    height: 45,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#323232',
    paddingRight: 10,
    textAlign: 'left',
  },
  arrow: {
    width: 9,
    height: 16,
  },
  rightView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})
