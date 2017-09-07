import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Tool from '../../utils/tool';
let { width } = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';

export default class MerchantTag extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tagIds: [],
    }
  }
  componentWillMount(){
    Actions.refresh({
      rightTitle: '跳过',
      rightButtonTextStyle: {color:'#acacac'},
      onRight: () => {
          Tool.to('indexTabs',{type:'reset'})
      },
    });
    Tool.fetch(null,`${config.appUrlPath}rest/tag/merchanttags`,'get',null,(ret)=>{
      this.setState({
        tags: ret || []
      });
    });
  }
  getContent(){
    let { tags, tagIds } = this.state;
    let list = null;
    if(tags.length>0){
      list = tags.map( ( v, k )=>{
        let vs, ts = styles.tagTextUnSelect;
        if( tagIds.indexOf(v.id) > -1){
          vs = styles.tagViewSelect;
          ts = styles.tagTextSelect;
        }
        return <TouchableOpacity key={k} style = {[styles.tagView,vs]} onPress={()=>{this.select(v.id)}} >
                <Text style={[styles.tagText,ts]}>{v.name}</Text>
               </TouchableOpacity>
      })
    }
    return list;
  }
  select(key){
    let { tags,tagIds } = this.state;
    let ids = [];
    let index = tagIds.indexOf(key);
    if(index > -1){
      tagIds.splice(index,1)
    }else{
      tagIds.push(key);
    };
    this.setState({
      tagIds: tagIds,
    })
  }
  subimt(){
    let {tagIds} = this.state;
    if(tagIds.length==0){
      Tool.to('indexTabs',{type: 'replace'});
      return;
    }
    Tool.fetch(null,`${config.appUrlPath}rest/custtag/merchant`,'post',{tagIds},(ret)=>{
      Tool.to('indexTabs',{type: 'replace'})
    })
  }
  render(){
    return(
      <View style = { styles.containers }>
        <Text style={styles.title}>猜你喜欢</Text>
        <View style={styles.tagslist}>
          {this.getContent()}
        </View>
        <TouchableOpacity onPress={()=>{this.subimt()}} >
            <Text style={ styles.subimtText }>下一步</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    padding: 25,
  },
  title: {
    fontSize: 16,
    color: '#acacac',
    paddingLeft: 5,
  },
  tagslist:{
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagView: {
    width: 90,
    height: 35,
    marginRight: 25,
    marginTop: 20,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#89b9f3',
    justifyContent: 'center',
  },
  tagViewSelect: {
    backgroundColor: '#89b9f3',
  },
  tagText: {
    fontSize: 16,
    alignSelf: 'center',
  },
  tagTextUnSelect: {
    color: '#89b9f3',
  },
  tagTextSelect: {
    color: '#ffffff',
  },
  subimtText:{
    marginTop: 60,
    fontSize: 15,
    alignSelf: 'center',
    color:'#323232',
  }
})
