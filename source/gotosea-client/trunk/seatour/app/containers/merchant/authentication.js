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
  TouchableOpacity
} from 'react-native';
import Tool from '../../utils/tool';
import {Actions} from 'react-native-router-flux';
import Loading from '../../components/common/loading';
import OssUtils from '../../utils/oss-utils';

export default class Authentication extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading_visible: false,
      merchantStatus: 1,
      name: null,
      idCard: null,
      pic_id_z_n: require('../../images/merchant/btn_sfzzm.png'),
      pic_id_f_n: require('../../images/merchant/btn_sfzbm.png'),
      pic_id_z: null,
      pic_id_f: null,
      pic_id_z_url: null,
      pic_id_f_url: null,
    }
  }
  componentWillMount(){
      //merchantStatus:  1--未认证，2--已申请，3--认证成功，4--认证失败
     Tool.fetch(null, `${config.appUrlPath}rest/merchant`,'get',null,(ret)=>{
       if( !ret.merchantStatus || ret.merchantStatus == 1 || ret.merchantStatus == 4 ){
         Actions.refresh({
             rightTitle: '提交',
             rightButtonTextStyle: { color: '#34a5f0'},
             onRight: () => {
                 this.submit();
             },
         });
       }
       if( ret.merchantStatus == 2 || ret.merchantStatus == 4)
         this.setState({
           merchantStatus: ret.merchantStatus || 1,
           name: ret.realName,
           idCard: ret.idNum,
           pic_id_z: {uri: ret.idPicture1},
           pic_id_f: {uri: ret.idPicture2},
           pic_id_z_url: ret.idPicture1,
           pic_id_f_url: ret.idPicture2,
         });
     })
  }
  upload( key ){
    OssUtils.uploadImage( this, (ret) => {
      if( key ==1 ){
        this.setState({
          pic_id_z: { uri: ret.fullUrl},
          pic_id_z_url: ret.fullUrl,
        });
      }
      else if( key == 2){
        this.setState({
          pic_id_f: { uri: ret.fullUrl},
          pic_id_f_url: ret.fullUrl,
        });
      }
    })
  }
  submit(){
    let { name, idCard, pic_id_z_url, pic_id_f_url } = this.state;
    if(!name || !idCard || !pic_id_z_url || !pic_id_f_url){
      Tool.alert('请完成信息填写');
      return;
    }
    let params = {
      realName: name,
      idNum: idCard,
      idPicture1: pic_id_z_url,
      idPicture2: pic_id_f_url,
    }
    Tool.fetch(this, `${config.appUrlPath}rest/merchant`, 'post', params, (ret)=>{
      Tool.alert('提交成功');
      this.setState({merchantStatus:2},()=>{
        Actions.refresh({
            rightTitle: '',
            rightButtonTextStyle: { color: '#34a5f0'},
            onRight: () => {
                console.log('ok');
            },
        });
      });
    })
  }
  render(){
    let {
      merchantStatus,
      name,
      idCard,
      pic_id_z_n,
      pic_id_f_n,
      pic_id_z,
      pic_id_f,
    } = this.state;
    let tip = '商家进行身份认证后成为平台正式商户，可享受平台返利补贴。';
    if(merchantStatus==2)
      tip = '资料正在审核中，我们会尽快答复您。';
    else if(merchantStatus==4)
      tip = '身份认证失败，请重新提交认证资料。'
    return(
      <ScrollView style = { styles.containers }>
        <Loading  visible={this.state.loading_visible} />
        <View style = { styles.tip }>
          <Text style = { merchantStatus == 4 ? styles.tipNotText : styles.tipText }>{tip}</Text>
        </View>
        <View style = { styles.content }>
          <View style = { styles.textContent }>
            <Text style = { styles.textStyle }>姓      名</Text>
            <TextInput
              defaultValue= { name }
              placeholder="请输入真实姓名"
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              onChangeText={(text)=>{ this.setState({name:text})}}
              style={styles.inputText}
            />
          </View>
          <View style = { styles.textContent }>

            <Text style = { styles.textStyle }>身份证号</Text>
            <TextInput
              defaultValue= { idCard }
              placeholder="请输入身份证号"
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              onChangeText={(text)=>{ this.setState({idCard:text})}}
              style={styles.inputText}
            />
          </View>

          <View style = { styles.imgContent }>
            <Text style = { styles.imgTitle }>上传身份证正面</Text>
            <TouchableOpacity onPress={()=>{
              if(!merchantStatus || merchantStatus == 1 || merchantStatus == 4){
                this.upload(1);
              }
            }}>
              <Image source={ pic_id_z || pic_id_z_n } style = { styles.imgStyle }/>
            </TouchableOpacity>
          </View>
          <View style = { styles.imgContent }>
            <Text style = { styles.imgTitle }>上传身份证反面</Text>
            <TouchableOpacity onPress={()=>{
              if(!merchantStatus || merchantStatus == 1 || merchantStatus == 4){
                this.upload(2);
              }
            }}>
              <Image source={  pic_id_f || pic_id_f_n } style = { styles.imgStyle }/>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containers:{
    backgroundColor: '#f0f0f0',
  },
  tip: {
    padding: 20,
  },
  tipText: {
    color: '#acacac',
    fontSize: 14,
    lineHeight: 25,
  },
  tipNotText: {
    color: 'red',
    fontSize: 14,
    lineHeight: 25,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  textContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#bdbdbd',
    borderBottomWidth: 0.5,
  },
  textStyle: {
    color: '#323232',
    width: 60,
    fontSize: 14,
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
  },
  imgContent: {
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#bdbdbd',
    borderBottomWidth: 0.5,
  },
  imgTitle: {
    fontSize: 14,
    paddingLeft: 32,
    paddingBottom: 10,
    color: '#323232',
  },
  imgStyle: {
    width: 275,
    height: 172,
    alignSelf: 'center',
  },
})
