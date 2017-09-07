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

import Tool from 'utils/tool';
import {Actions} from 'react-native-router-flux';
import InputItem from 'components/common/input-item';
import InputItemSelect from 'components/common/input-item-select';
import MyButton from 'components/common/button';
import MyPicker from 'components/common/picker';

let { width, height } = Dimensions.get('window');

export default class BankAdd extends Component{
  constructor(props) {
    super(props);
    let { detail } = props;
    this.state = {
      cardNo: null,
      bankType: null,
      bankTypeName: null,
      bankList: [],
    }
  }
  componentWillMount(){
    let { action, detail } = this.props;

    Actions.refresh({
      onBack: () => {
        Tool.back({refresh: ({doRefresh: true})})
      },
    });
    Tool.fetch(null, `${config.appUrlPath}rest/bank/type`,'get',null,(ret)=>{
      let banks = [];
      ret.map((v,k)=>{
        banks.push({key: v.code, value: v.remark})
      });
      this.setState({bankList: banks});
    })
  }
  save(){
    let {cardNo, bankType } = this.state;
    if( !cardNo || !bankType ){
      Tool.alert('请完成表单！');
      return;
    }
    let params = {
      cardNo,
      bank: bankType,
    }
    Tool.fetch(null, `${config.appUrlPath}rest/bank`,'post',params,(ret)=>{
      Tool.alert('添加成功')
    })
  }
  render(){
    let { bankType, bankTypeName, bankList } = this.state;
    return(
      <View style={{ height: height}}>
        <ScrollView style = { styles.containers }>
          {/*<InputItem
            title = {'持卡人'}
            placeholder = { '请输入持卡人姓名' }
            style = { styles.borderBto }
            onChangeText = { (text)=>this.setState({name: text}) }/>*/}
            <InputItemSelect
               title = {'选择银行'}
               value = { bankTypeName }
               placeholder = { '请选择...' }
               style = { styles.borderBto }
               click = { (text)=>this.refs.picker.open()}/>
            <InputItem
              title = {'银行卡号'}
              placeholder = { '请输入银行卡号' }
              style = { styles.borderBto }
              onChangeText = { (text)=>this.setState({cardNo: text}) }/>
          <MyButton style = { styles.btn } onPress = { this.save.bind(this)} >{'确认绑定'}</MyButton>
        </ScrollView>
        <MyPicker
          ref = { 'picker'}
          selectKey = { bankType }
          title =  {'请选择证件类型'}
          datas = { bankList }
          click = {(data)=>{
            this.setState({
              bankType: data.key,
              bankTypeName: data.value,
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
    marginRight: 20,
    marginLeft: 20,
    marginTop: 50,
  },
})
