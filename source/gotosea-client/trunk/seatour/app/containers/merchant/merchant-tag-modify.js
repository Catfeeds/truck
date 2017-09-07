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

export default class MerchantTagModify extends Component{

  constructor(props) {
    super(props);
    let { tagIds } = this.props;
    this.state = {
      tags: [],
      tagIds: tagIds || [],
      tagNames: '',
    }
  }
  componentWillMount(){
    let me = this;
    Actions.refresh({
      rightTitle: '保存',
      rightButtonTextStyle: {color:'#34a5f0'},
      onRight: () => {
        me.save();
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
  save(){
    let {tagIds, tags} = this.state;
    let name = '';
    if( tagIds.length > 0 ){
      tagIds.map( (vs, ks)=>{
        tags.map( (va,ka)=>{
          if(vs == va.id){
            name += va.name+',';
          }
        })
      })
    }else{
      Tool.alert('请选择标签');
      return;
    }
    Tool.back({ refresh: ({tagIdsNew: tagIds, tagName: name.substring(0,name.length-1)  }) })
  }
  render(){
    return(
      <View style = { styles.containers }>
        <View style={styles.tagslist}>
          {this.getContent()}
        </View>
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
