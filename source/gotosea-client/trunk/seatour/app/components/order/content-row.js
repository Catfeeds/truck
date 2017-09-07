import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
  Text,
}from 'react-native';

/**
 * @type {Object}
 */
export default class ContentRow extends Component{
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
        <View style={ [styles.containers, style] }>
          <Text style={ [styles.title, titleStyle] }>{ title }</Text>
          <Text style={ [styles.text, textStyle] }>{ text }</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
  },
  title:{
    width: 80,
    fontSize: 14,
    color: '#acacac',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#323232',
    paddingRight: 10,
    textAlign: 'left',
  },
})
