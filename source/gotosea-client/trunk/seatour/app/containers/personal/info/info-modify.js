import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import Tool from 'utils/tool'
import IconSpan3 from 'components/common/icon-span3';
import  BorderLine from 'components/common/border-line';
import MyPicker from 'components/common/picker';
import WheelPicker from 'components/common/wheel-picker'
import OssUtils from 'utils/oss-utils';

import Loading from 'components/common/loading';

let { width, height } = Dimensions.get('window');

export default class InfoModify extends Component{
  constructor(props) {
    super(props);
    let { info } = this.props;
    this.state = {
      account: info.account,
      name: info.name,
      level: info.level,
      sex: info.sex,
      sexName: info.sexName,
      arearName: info.address,
      picture: info.picture,
      areas: [],
      selectAreas: info.address?info.address.split('-'):[],
      areaId: info.areaId,
    }

  }
  componentWillMount(){
    Tool.fetch(null,`${config.appUrlPath}rest/local/area/link`,'get',null,(ret)=>{
      this.setState({areas: ret || []});
    })
  }
  componentWillReceiveProps(props){
    this.setState({
      name: props.name
    })
  }
  update(){
    let { name, sex, areaId ,picture} = this.state;
    let params = {
      name,
      sex,
      picture,
      areaId,
    };
    Tool.fetch(null,`${config.appUrlPath}rest/cust`,'put',params,(ret)=>{
      console.log('信息更新成功');
    });
  }
  upload(){
    let { picture } = this.state;
    OssUtils.uploadImage( this, (ret) => {
      this.setState({picture: ret.fullUrl},()=>{this.update()});
    });
  }
  cityPicker(){
    let { areas, selectAreas } = this.state;
    WheelPicker.cityPicker(areas,selectAreas,(datas, keys, text)=>{
      this.setState({
        arearName: text,
        areaId: keys[1],
        selectAreas: datas,
      },()=>{this.update()})
    });
  }
  render(){
    let { info } = this.props;
    let { name, sex, sexName, arearName ,picture, account, level} = this.state;
    return(
      <View style={{ height:height, width:width }}>
        <Loading  visible={this.state.loading_visible} />
        <ScrollView style={ styles.containers }>
          <View style = { styles.headView }>
            <Text style={styles.title}>头像</Text>
            <TouchableOpacity style = { styles.imgView } onPress={this.upload.bind(this)}>
                <Image source={{uri: picture }} style={ styles.img }/>
            </TouchableOpacity>
          </View>
          <BorderLine/>
          <IconSpan3
            style = { styles.span }
            title = {'昵称'}
            defaultText = { '' }
            text = { name }
            click = {()=>{ Tool.to('nameModify',{name})}}/>
          <BorderLine/>
          <IconSpan3
            style = { styles.span }
            title = {'性别'}
            defaultText = { '' }
            text = { sexName }
            click = { (text)=>this.refs.picker.open()}/>
          <BorderLine/>
          <IconSpan3
            style = { styles.span }
            title = {'ID号'}
            defaultText = { account }
            click = {()=>{}}/>
          <BorderLine/>
          <IconSpan3
            style = { styles.span }
            title = {'地区'}
            defaultText = { '' }
            text = { arearName }
            click = { this.cityPicker.bind(this) }/>
          <View style={styles.gary} />
          <IconSpan3
            style = { styles.span }
            title = {'我的标签'}
            defaultText = { '' }
            click = {()=>{Tool.to('touristTagModify',{tagIds:info.tagIds})}}/>
          <BorderLine/>
          <IconSpan3
            style = { styles.span }
            title = {'等级'}
            text = { `Lv.${level}` }
            click = { ()=>{ Tool.to('accountLevel',{info}) } }/>
        </ScrollView>
        <MyPicker
          ref = { 'picker'}
          selectKey = { sex }
          title =  {''}
          datas = {[{key:1, value: '男'},{key:2, value: '女'}]}
          click = {(data)=>{
            this.setState({
              sex: data.key,
              sexName: data.value,
            },()=>{this.update()})
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
  },
  span:{
    paddingLeft: 10,
    paddingRight: 15,
  },
  gary:{
    backgroundColor: '#f0f0f0',
    height: 10,
  },
  headView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    paddingLeft: 10,
    paddingRight: 15,
  },
  title:{
    fontSize: 14,
    color:'#323232'
  },
  img:{
    width: 70,
    height: 70,
    borderRadius: 35,
  }
})
