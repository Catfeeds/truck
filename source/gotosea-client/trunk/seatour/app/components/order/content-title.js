import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
  Text,
}from 'react-native';

import BorderLine from 'components/common/border-line';

export default class ContentTitle extends Component{
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    title: PropTypes.string,         //标题
  }
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(props){

  }
  render(){
    let { title, titleStyle , style } = this.props;
    return (
        <View style={ [styles.containers, style] }>
          <Text style={ [styles.title, titleStyle] }>{ title }</Text>
          <BorderLine style = {{ borderBottomWidth:1 }}/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title:{
    width: 70,
    fontSize: 14,
    color: '#323232',
  },
})
