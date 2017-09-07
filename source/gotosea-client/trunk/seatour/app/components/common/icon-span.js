import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
}from 'react-native';

/**
 * [点击工具栏： 图+标题+右箭头]
 * @type {Object}
 */
export default class IconSpan extends Component{
  static propTypes = {
    icon: PropTypes.number,          //require('img.png')
    text: PropTypes.string,         //标题
    click: PropTypes.func,         //点击回调
  }
  constructor(props){
    super(props);
  }
  render(){
    let { icon, text, click } = this.props;
    return (
        <TouchableOpacity onPress={click}>
          <View style={ styles.containers } >
            <Image source={ icon } style={ styles.images }/>
            <Text style={ styles.text }>{ text }</Text>
            <Image source={require('../../images/personal/Setting.png')} style={ styles.arrow }/>
          </View>
        </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  containers: {
    padding: 15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb',
  },
  images: {
    width: 21,
    height: 20,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#323232',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
  arrow: {
    width: 9,
    height: 16,
  }
})
