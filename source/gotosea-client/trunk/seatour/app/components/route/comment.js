import React,{ Component, PropTypes } from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Text,
}from 'react-native';

let { width, height } = Dimensions.get('window');

/**
 * @type {Object}
 */
export default class Comment extends Component{
  constructor(props){
    super(props);
    this.state = {
      datas: props.datas ,
    }
  }
  componentWillReceiveProps(props){
    this.setState({datas: props.datas || []})
  }
  compenment
  render(){
    let { datas } = this.state;
    return (
      <View style = { styles.containers }>
      {
        datas.map((v,k)=>{
          return <View key = {`pl-item-${k}`} style = { styles.items }>
                    <Image source={{ uri: v.custCommVo.picture  }} style={ styles.headPic } />
                    <View style = {{flex:1}}>

                      <View style = { styles.top }>
                        <View style = { styles.topLeft }>
                          <Text style = { [styles.fontText,{ paddingRight:5, marginTop:5 }] }>{ v.custCommVo.name }</Text>
                          <View style = {{ flexDirection: 'row', flexWrap:'wrap'}}>
                            {
                              v.custCommVo.custTagVos && v.custCommVo.custTagVos.map((vt,kt)=>{
                                return <Text key = {'r-tag'+kt} style = { styles.tagText }>{ vt }</Text>
                              })
                            }
                           </View>
                        </View>
                        <TouchableOpacity style = { styles.topRight }>
                          <Text style = { styles.dzCount}>12</Text>
                          <Image source = { require('images/community/btn_dianzan_n.png') } style={ styles.dzImg } />
                        </TouchableOpacity>
                      </View>

                      <Text style = { styles.time }>{ v.evaluationTime }</Text>
                      <Text style = { [ styles.fontText, {paddingBottom: 10} ] }>{ v.evaluationContent }</Text>

                      <View style = { styles.imgs }>
                        {
                          v.imgs && v.imgs.map((vi,ki)=>{
                            return   <Image  key = {'pl-img-'+ki} source={{ uri: vi }} style={ styles.img } />
                          })
                        }
                      </View>

                    </View>
                 </View>
        })
      }
      </View>
      )
  }
}

const styles = StyleSheet.create({
  containers:{
    backgroundColor: '#ffffff',
  },
  items:{
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 5,
    borderColor: '#dbdbdb',
    borderTopWidth: 0.5,
  },
  headPic:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
    marginTop: 5,
  },
  top:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
  },
  topRight:{
    flexDirection: 'row',
    width: 30,
  },
  dzCount:{
    color: '#acacac',
    fontSize: 12,
    paddingRight: 5,
  },
  dzImg:{
    width: 12,
    height: 12,
  },
  time:{
    fontSize: 12,
    color: '#acacac',
    paddingBottom: 10,
  },
  fontText:{
    fontSize: 15,
    color: '#323232',
  },
  imgs:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img:{
    width: (width - 30 - 60 - 30)/3,
    height: (width - 30 - 60 - 30)/3,
    marginRight: 10,
    marginBottom: 10
  },
})
