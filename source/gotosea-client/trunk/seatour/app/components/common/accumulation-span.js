import React,{ Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Tool from 'utils/tool';

/**
 * @type {Object}
 */
export default class AccumulationSpan extends React.Component {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),     //整行样式
    title: PropTypes.string,      //左边标题，  必传
    tipText: PropTypes.string,    //提示
    count: PropTypes.number,      //初始化数量，  必传
    maxCount: PropTypes.number,   //最大数量，  必传
    onChange: PropTypes.func,     //改变回调
  }

  constructor(props) {
    super(props);
    let { title, count, maxCount } = props;
    this.state = {
      title: title || '',
      count: count || 1,
      maxCount: maxCount || 30,
    }
  }
  componentWillReceiveProps(props){
    let { count, maxCount, title } = props;
    this.setState({count, maxCount, title});
  }
  /**
   * @param  {[type]} type [1删，2加]
   */
  countChange( type ){
    let { count, maxCount} = this.state;
    let { onChange } = this.props;

    if( type == 1){
      if( count == 1)return;
      else count --;
    }else{
      if( count == maxCount ) return;
      else count ++;
    }
    this.setState({count},()=>{
      if(Tool.isFunction(onChange))
        onChange.call(this,count);
    });
  }
  render() {
    let { style, tipText} = this.props
    let { count, maxCount, title } = this.state;
    return (
      <View style={ [styles.selItem, style] }>
        <View>
          <Text style={ styles.dateText}>{title}</Text>
          { tipText && <Text style={ styles.countTip}>{tipText}</Text>}
        </View>
        <View style={ styles.countBtn}>
          <TouchableOpacity onPress={ this.countChange.bind(this,1) }>
            <Text style={ [styles.countText, count == 1 && styles.countTextUn ]}>-</Text>
          </TouchableOpacity>
          <View style={ styles.count }><Text style={ [styles.countText]}>{ count }</Text></View>
          <TouchableOpacity onPress={ this.countChange.bind(this,2) }>
            <Text style={ [styles.countText, count == maxCount && styles.countTextUn] }>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  selItem:{
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  dateText:{
    fontSize: 14,
    color: '#323232'
  },
  borerBto:{
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb',
  },
  selText:{
    color: '#323232',
    fontSize: 14,
  },
  countTip:{
    color: '#acacac',
    fontSize: 10,
    paddingTop: 5,
  },
  countBtn:{
    flexDirection: 'row',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  countText:{
    fontSize: 14,
    color: '#323232',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  countTextUn:{
    color: '#dbdbdb',
  },
  count:{
    borderColor: '#dbdbdb',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
});
