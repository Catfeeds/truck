import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
}from 'react-native';

/**
 * @type {Object}
 */
export default class ListChunk extends Component{
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    datas: PropTypes.array,         //数据源
    renderItem: PropTypes.func,     //行渲染回调
  }
  constructor(props){
    super(props);
    let { datas } = props;
    this.state = {
      datas: datas || [],
      all: false,
    };
  }
  componentWillReceiveProps(props){
    this.setState({  all: false, datas: props.datas || [] });
  }
  getItem(){
    let { renderItem, itemKey } = this.props,
        { datas, all } = this.state,
        content,
        length = datas.length;

    content = datas.map((v,k)=>{
      if( !all &&  k>1 && length > 2 )return;
      return (<View key = {`${itemKey}-${k}`}>{renderItem.call(this, v, k)}</View>)
    })

    if( !all && length >2 ){
      let more = <TouchableOpacity key = {`${itemKey}-more`} style = { styles.moreView } onPress={ ()=>{ this.setState({all: true})}}>
                    <Text style={ styles.normalText }>{`查看更多(${length-2})`}</Text>
                  </TouchableOpacity>

      content.push(more);
    }

    return content;
  }
  render(){
    let { style, title } = this.props;
    let { datas } = this.state;

    if( datas.length > 0 ){
      return (
        <View>
          <Text style = { [styles.title, styles.normalText] }>{ title }</Text>
          <View style = { [styles.chunk, style] }>
            {this.getItem()}
          </View>
        </View>
        )
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  chunk:{
    backgroundColor: '#ffffff'
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  normalText:{
    fontSize: 14,
    color: '#323232',
  },
  moreView:{
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dbdbdb',
    borderTopWidth: 0.5,
  },
})
