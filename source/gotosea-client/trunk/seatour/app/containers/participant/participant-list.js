import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  View,
  Picker,
  TouchableOpacity
} from 'react-native';
import Tool from '../../utils/tool';
import {Actions} from 'react-native-router-flux';
import Loading from '../../components/common/loading';

export default class ParticipantList extends Component{
  constructor(props) {
    super(props);
    let { ids, selectDates } = props;
    this.state = {
      loading_visible: false,
      ids: ids || [],
      selectDates: selectDates || [],
      datas: [],
    }
  }
  componentWillReceiveProps(props){
    let{ doRefresh } = props;
    if( doRefresh === true)this.fetch();
  }
  componentWillMount(){
    Actions.refresh({
        rightTitle: '完成',
        rightButtonTextStyle: { color: '#34a5f0'},
        onBack: () => {
            let { ids, selectDates } = this.state;
            Tool.back({refresh:({participantIds: ids, participantList: selectDates })})
        },
        onRight: () => {
            let { ids, selectDates } = this.state;
            Tool.back({refresh:({participantIds: ids, participantList: selectDates })})
        },
    });
    this.fetch();
  }
  fetch(){
    Tool.fetch(null, `${config.appUrlPath}rest/travelers`,'get',null,(ret)=>{
      this.setState({datas: ret});
    })
  }
  listContent(){
    let { ids, datas } = this.state;
    let view;
    if(datas.length > 0){
      view = datas.map( (v,k)=>{
        let select = false;
        if(ids.indexOf(v.id) > -1)select = true;
        return <View key = { 'idCard-' + k } style = { styles.item}>
                <TouchableOpacity style = { styles.touchView} onPress={ ()=>Tool.to('participantDetail',{action:'edit', detail: v}) }>
                  <Image source={ require('images/route/icon_Pencil.png')} style={{ width: 16, height: 16}}/>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.detail }  onPress={ this.select.bind(this,v) }>
                  <Text style={ styles.name} >{ v.name }</Text>
                  <Text style={ styles.idCard} >{ v.credTypeName+'：'+v.credNum }</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = { styles.touchViewRight} onPress={ this.select.bind(this,v) }>
                  {select && <Image source={ require('images/community/btn_Ok_blue_s.png')} style={{ width: 16, height: 16 }}/>}
                  {!select && <View style = { styles.unSelect }/>}
                </TouchableOpacity>
               </View>
      });
    }
    return view;
  }
  select( ob ){
    let { ids, selectDates } = this.state;
    let index =  ids.indexOf(ob.id);
    if(index > -1){
      ids.splice( index, 1);
      selectDates.splice( index, 1);
    }
    else{
      ids.push(ob.id);
      selectDates.push(ob);
    }

    this.setState({ids,selectDates});
  }
  render(){
    return(
      <ScrollView style = { styles.containers }>
        <Loading  visible = {this.state.loading_visible} />
        <TouchableOpacity style = { styles.add } onPress={ ()=>Tool.to('participantDetail',{action:'add'}) }>
          <View style = { styles.addIcocVIew }><Text style = { styles.addIcon }>+</Text></View>
          <Text style = { styles.addText }>新增出行人员</Text>
        </TouchableOpacity>
        <View style = { styles.content }>
          { this.listContent() }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  add:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:15,
    paddingBottom: 15,
  },
  addIcocVIew:{
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon:{
    color: '#ffffff',
    fontSize: 12,
  },
  addText:{
    color: '#acacac',
    fontSize: 14,
    paddingLeft: 10,
  },
  content:{
    paddingLeft: 20,
    paddingRight: 20,
  },
  item:{
    flexDirection: 'row',
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5,
    height: 70,
    alignItems: 'center',
  },
  touchView:{
    padding: 20,
    paddingLeft: 0,
  },
  touchViewRight:{
    padding: 20,
    paddingRight: 0,
  },
  detail:{
    flex: 1,
  },
  name:{
    fontSize: 16,
    color: '#323232',
  },
  idCard: {
    fontSize: 14,
    color: '#323232',
  },
  unSelect:{
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: '#bdbdbd',
    borderWidth: 1,
  }
})
