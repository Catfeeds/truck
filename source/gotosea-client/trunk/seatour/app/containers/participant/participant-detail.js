import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import Tool from '../../utils/tool';
import {Actions} from 'react-native-router-flux';
import InputItem from 'components/common/input-item';
import InputItemSelect from 'components/common/input-item-select';
import MyButton from 'components/common/button';
import MyPicker from 'components/common/picker';

let { width, height } = Dimensions.get('window');

export default class ParticipantList extends Component{
  constructor(props) {
    super(props);
    let { detail } = props;
    this.state = {
      id: detail && detail.id || null,
      name: detail && detail.name || null,
      credNum: detail && detail.credNum || null,
      credType: detail && detail.credType || null,
      credTypeName: detail && detail.credTypeName || null,
    }
  }
  componentWillMount(){
    let { action, detail } = this.props;

    Actions.refresh({
      onBack: () => {
        this.back();
      },
    });

    if( action == 'edit' ){
      Actions.refresh({
          rightTitle: '删除',
          title: '编辑出行人',
          rightButtonTextStyle: { color: '#34a5f0'},
          onBack: () => {
            this.back();
          },
          onRight: () => {
            Tool.fetch(null, `${config.appUrlPath}rest/traveler/${detail.id}`,'delete',null,(ret)=>{
              this.back();
            });
          },
      });
    }
  }
  back(){
    Tool.back({refresh: ({doRefresh: true})})
  }
  save(){
    let { action } = this.props;
    let { id, name, credType, credNum } = this.state;
    let params = {
      id,
      name,
      credType,
      credNum,
    }
    if( action == 'edit' ){
       Tool.fetch(null, `${config.appUrlPath}rest/traveler/${id}`,'put',params,(ret)=>{
         Tool.alert('修改成功')
       })
    }else{
      Tool.fetch(null, `${config.appUrlPath}rest/traveler`,'post',params,(ret)=>{
        this.setState({
          id: null,
          name: null,
          credType: null,
          credTypeName: null,
          credNum: null,
        },()=>Tool.alert('添加成功'))
      });
    }
  }
  render(){
    let { id, name, credType, credTypeName, credNum } = this.state;
    let { action , detail} = this.props;
    return(
      <View style={{ height: height}}>
        <ScrollView style = { styles.containers }>
          <InputItem
            title = {'真实姓名'}
            placeholder = { '请输入姓名' }
            defaultValue = { name }
            style = { styles.borderBto }
            onChangeText = { (text)=>this.setState({name: text}) }/>
          <InputItemSelect
             title = {'证件类型'}
             style = { styles.borderBto }
             value = { credTypeName }
             click = { (text)=>this.refs.picker.open()}/>
          <InputItem
            title = {'证件号'}
            placeholder = { '请输入证件号' }
            defaultValue = { credNum }
            style = { styles.borderBto }
            onChangeText = { (text)=>this.setState({credNum: text}) }/>
          <Text style = { styles.tip }>请确保您填写的信息为真实身份信息，该认证信息将被用于：购买船票及意外险</Text>
          <MyButton style = { styles.btn } onPress = { this.save.bind(this)} >{'保存'}</MyButton>
        </ScrollView>
        <MyPicker
          ref = { 'picker'}
          selectKey = { credType }
          title =  {'请选择证件类型'}
          datas = {[{key:1, value: '身份证'},{key:2, value: '港澳居民身份证'},{key:3, value: '回乡证'},{key:4, value: '台胞证'},{key:5, value: '护照'}]}
          click = {(data)=>{
            this.setState({
              credType: data.key,
              credTypeName: data.value,
            })
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containers:{
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  borderBto:{
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5
  },
  tip:{
    color: '#acacac',
    fontSize: 12,
    paddingTop: 15,
  },
  btn:{
    flex: 1,
    alignSelf: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 50,
  },
})
