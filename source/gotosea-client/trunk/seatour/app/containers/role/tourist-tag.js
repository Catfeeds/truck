import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Tool from '../../utils/tool';
let { width } = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';

//海钓1001， 海岛游：1002，游艇1003
export default class TouristTag extends Component{
  constructor(props) {
    super(props);
    this.state = {
      parentId: null,
      list: [],
      tags: [],
      tagIds: [],
    }
  }
  componentWillMount(){
    Actions.refresh({
      rightTitle: '跳过',
      rightButtonTextStyle: {color:'#acacac'},
      onRight: () => {
          Tool.to('indexTabs',{type:'reset'});
      },
    });

    Tool.fetch(null,`${config.appUrlPath}rest/tag/travelertags`,'get',null,(ret)=>{
      this.setState({
        list: ret || []
      });
    });
  }
  changeParent( key ){
    let { list } = this.state;
    if( list.length > 0 ){
      let datas = [];
      list.map((v,k)=>{
        if(v.id == key){
          datas = v.tags;
        }
      })
      this.setState({
        parentId: key,
        tags: datas || []
      })
    }

  }
  getParent(){
    let {parentId} = this.state;
    let view =
          (
            <View style={ styles.parentTagView }>
              <TouchableOpacity style = { styles.parentTagImgV } onPress={ ()=>{ this.changeParent(1001)} } >
                <Image source={ parentId == 1001 ? require('../../images/role/btn_hd_s.png') : require('../../images/role/btn_hd_n.png')} style={styles.parentTagImg}/>
              </TouchableOpacity>
              <TouchableOpacity style = { styles.parentTagImgV } onPress={ ()=>{ this.changeParent(1002)} }>
                <Image source={ parentId == 1002 ? require('../../images/role/btn_hdy_s.png') : require('../../images/role/btn_hdy_n.png')} style={styles.parentTagImg}/>
              </TouchableOpacity>
              <TouchableOpacity style = { styles.parentTagImgV } onPress={ ()=>{ this.changeParent(1003)} }>
                <Image source={ parentId == 1003 ? require('../../images/role/btn_yt_s.png') : require('../../images/role/btn_yt_n.png')} style={styles.parentTagImg}/>
              </TouchableOpacity>
            </View>
          )
      return view;
  }
  getContent(){
    let { tags, tagIds } = this.state;
    let list = null;
    if(tags.length>0){
      list = tags.map( ( v, k )=>{
        let vs, ts, bos;
        switch (v.pid) {
          case 1001:
            ts = styles.tagTextUnSelect_hd;
            bos = styles.border_hd;
            break;
          case 1002:
            ts = styles.tagTextUnSelect_hdy;
            bos = styles.border_hdy;
            break;
          case 1003:
            ts = styles.tagTextUnSelect_yt;
            bos = styles.border_yt;
            break;
          default:
            ts = styles.tagTextUnSelect_hd;
            bos = styles.border_hd;
        }
        if( tagIds.indexOf(v.id) > -1){
          vs = styles.tagViewSelect;
          ts = styles.tagTextSelect;
          switch (v.pid) {
            case 1001:
              vs = styles.tagViewSelect_hd;
              break;
            case 1002:
              vs = styles.tagViewSelect_hdy;
              break;
            case 1003:
              vs = styles.tagViewSelect_yt;
              break;
            default:
              vs = styles.tagViewSelect_hd;
          }
        }
        return <TouchableOpacity key={k} style = {[styles.tagView,vs,bos]} onPress={()=>{this.select(v.id)}} >
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
    let { tagIds } = this.state;
    console.log(tagIds);
    Tool.fetch(null,`${config.appUrlPath}rest/custtag/traveller`,'post',{tagIds},(ret)=>{

    });
  }
  render(){
    return(
      <View style = { styles.containers }>
        <Text style={styles.title}>猜你喜欢</Text>
        {this.getParent()}
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
  parentTagView: {
    flexDirection: 'row',
  },
  parentTagImgV:{
    flex: 1,
    alignItems: 'center',
  },
  parentTagImg:{
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 20,
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
    justifyContent: 'center',
  },
  border_hd:{
    borderColor: '#89b9f3',
  },
  border_hdy:{
    borderColor: '#8adac8',
  },
  border_yt:{
    borderColor: '#f7b77a',
  },
  tagViewSelect_hd: {
    backgroundColor: '#89b9f3',
  },
  tagViewSelect_hdy: {
    backgroundColor: '#8adac8',
  },
  tagViewSelect_yt: {
    backgroundColor: '#f7b77a',
  },
  tagText: {
    fontSize: 16,
    alignSelf: 'center',
  },
  tagTextUnSelect_hd: {
    color: '#89b9f3',
  },
  tagTextUnSelect_hdy: {
    color: '#8adac8',
  },
  tagTextUnSelect_yt: {
    color: '#f7b77a',
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
