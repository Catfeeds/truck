import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
  Text,
}from 'react-native';


export default class ContentRow extends Component{
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    title: PropTypes.string,         //标题
    text: PropTypes.string,         //内容
    status: PropTypes.string,       //状态
  }
  constructor(props){
    super(props);
    this.state = {
      text: props.text || '',
      status: props.status || '',
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      text: props.text || '',
      status: props.status || '',
    });
  }
  render(){
    let { title, titleStyle , style, textStyle, statusStyle } = this.props;
    let { text, status } = this.state;
    return (
        <View style={ [styles.containers, style] }>
          <View style = {{flex: 1, flexDirection: 'row'}}>
            <Text style={ [styles.title, titleStyle] }>{ title }</Text>
            <Text style={ [styles.text, textStyle] }>{ text }</Text>
          </View>
          <Text style={ [styles.status, statusStyle] }>{ status }</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  status:{
    fontSize: 14,
    width: 80,
    textAlign: 'right',
  }
})
