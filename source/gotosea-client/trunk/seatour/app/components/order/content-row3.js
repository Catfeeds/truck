import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
  Text,
}from 'react-native';

import ContentRow from 'components/order/content-row';


export default class ContentRow3 extends Component{
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    title: PropTypes.string,         //标题
    text: PropTypes.string,         //内容
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
    let { title, titleStyle , style, textStyle } = this.props;
    let { text } = this.state;
    return (
        <ContentRow
          title = {title}
          text = {text}
          style = { [styles.containers, style] }
          titleStyle={ [styles.titleStyle, titleStyle] }
          textStyle={ [styles.textStyle, textStyle]}/>
      )
  }
}

const styles = StyleSheet.create({
  containers:{
		justifyContent: 'space-between',
	},
	titleStyle:{
		flex:1,
	},
	textStyle:{
		flex: 0,
		width: 80,
		textAlign: 'right',
	}
})
