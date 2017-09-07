import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  View,
  Text,
}from 'react-native';

export default class Tags extends Component{

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    datas: PropTypes.array,        //数据源
    itemKey: PropTypes.string,     //key
  }
  constructor(props){
    super(props);
    this.state = {
      datas: props.datas || [],
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      text: props.datas || [],
    });
  }
  render(){
    let { datas } = this.state;
    let { style, itemKey } = this.props;
    if( datas.length>0 ){
      return (
          <View style={ styles.containers }>
            {
              datas && datas.map((v,k)=>{
                return <Text key = {itemKey+'-'+k} style={styles.tagText}>{v}</Text>
              })
            }
          </View>
        )
    }
    else
      return null
  }
}

const styles = StyleSheet.create({
  containers: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap:'wrap'
  },
  tagText:{
		color: '#acacac',
		borderColor: '#acacac',
		borderWidth: 0.5,
		padding: 5,
		paddingTop: 3,
		paddingBottom: 3,
		marginRight: 5,
		fontSize: 11,
		borderRadius: 10,
		marginBottom: 5,
	},
})
