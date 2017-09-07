import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  Alert,
  Picker,
  Image,
  ImageBackground,
  View,
  TouchableOpacity
} from 'react-native';

import Tool from '../../utils/tool'
import IconSpan from '../../components/common/icon-span';
import personalIndex from '../../styles/personal/index';

export default class Personal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    }
  }
  componentWillMount(){
    Tool.fetch(null,`${config.appUrlPath}rest/cust`,'get', null, (ret)=>{
      this.setState({
        info: ret
      })
    });
  }
  getTags(){
    let{ info } = this.state;
    let view;
    if( info.tagsName ){
      let list = info.tagsName.split(',');
      view = list.map( (v,k)=>{
        return   <View key = {`tag-${k}`} style={personalIndex.personlLabel}>
                    <Text style={personalIndex.personlLabelText}>{v}</Text>
                </View>
      });
    }
    return view;
  }
  render(){
    let { info } = this.state;
    return(
      <ScrollView style={{ backgroundColor:'#f0f0f0'}}>

        <ImageBackground source={require('images/personal/pic_beijing.png')} style={ personalIndex.info }>
          <TouchableOpacity style ={personalIndex.messageView}>
            <Image source={require('images/personal/icon_xiaoxi.png')} style={personalIndex.message}/>
          </TouchableOpacity>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style = { personalIndex.headView } onPress = { ()=>{Tool.to('infoModify',{info:info})} }>
              <Image source={ {uri:info.picture } } style={ personalIndex.headerPic}/>
            </TouchableOpacity>
            <View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={personalIndex.name}>{ info.name} </Text>
                <Image source={ info.sex == 1 ? require('images/personal/icon_boy.png') : require('images/personal/icon_girl.png')} style={personalIndex.sex}/>
                <ImageBackground source={require('images/personal/icon_lv.png')} style={personalIndex.lv}>
                 <Text style={personalIndex.lvText}>{'LV '+info.level}</Text>
                </ImageBackground>
              </View>
              <View style={personalIndex.labelView}>
                { this.getTags() }
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={personalIndex.gzView} onPress={ ()=>{ Tool.to('friend',{friend:1})}} >
                  <Image source={require('images/personal/icon_guanzhu.png')} style={personalIndex.gzimg}/>
                  <Text style={personalIndex.gzText}>关注 {15} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={personalIndex.gzView} onPress={ ()=>{ Tool.to('friend',{friend:2}) }} >
                  <Image source={require('images/personal/icon_fans.png')} style={personalIndex.gzimg}/>
                  <Text style={personalIndex.gzText}>粉丝 {15} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={ [personalIndex.statistics, personalIndex.borderStyle,{marginBottom:10}]}>
          <TouchableOpacity style={personalIndex.statisticsView}>
            <Image source={require('images/personal/icon_dt.png')} style={personalIndex.statisticsImg}/>
            <View>
              <Text style={personalIndex.statisticsText}>8</Text>
              <Text style={personalIndex.statisticsText}>动态</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={personalIndex.statisticsView}>
            <Image source={require('images/personal/icon_hd.png')} style={personalIndex.statisticsImg}/>
            <View>
              <Text style={personalIndex.statisticsText}>4</Text>
              <Text style={personalIndex.statisticsText}>活动</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={personalIndex.statisticsView} onPress = { ()=>Tool.to('integral',{detail:info})}>
            <Image source={require('images/personal/icon_jf.png')} style={personalIndex.statisticsImg}/>
            <View>
              <Text style={personalIndex.statisticsText}>{info.credits}</Text>
              <Text style={personalIndex.statisticsText}>积分</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={ [personalIndex.borderStyle, {marginBottom:10}] }>

          <TouchableOpacity style={personalIndex.orderTitle } onPress={()=>Tool.to('orderList')}>
            <Text style={personalIndex.myOrderText }>我的订单</Text>
            <Text style={personalIndex.allOrderText }>
              查看全部订单
            </Text>
            <Image source={require('images/personal/Setting.png')} style={ personalIndex.arrow }/>
          </TouchableOpacity>

          <View style={ personalIndex.order}>
            <TouchableOpacity>
              <View style={ personalIndex.orderItem }>
                <Image source={require('images/personal/icon_dzy.png')} style={personalIndex.orderImg} />
                <View style={personalIndex.bagde}><Text style={personalIndex.bagdeText}>32</Text></View>
                <Text style={personalIndex.orderText}>待支付</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={ personalIndex.orderItem }>
                <Image source={require('images/personal/icon_dcx.png')} style={personalIndex.orderImg}></Image>
                <View style={personalIndex.bagde}><Text style={personalIndex.bagdeText}>6</Text></View>
                <Text style={personalIndex.orderText}>待出行</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={ personalIndex.orderItem }>
                <Image source={require('images/personal/icon_dpj.png')} style={personalIndex.orderImg}></Image>
                <Text style={personalIndex.orderText}>待评价</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={ personalIndex.orderItem }>
                <Image source={require('images/personal/icon_tk.png')} style={personalIndex.orderImg}></Image>
                <Text style={personalIndex.orderText}>退款</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <IconSpan icon = {require('images/personal/icon_ddgl.png')} text = {'商家中心'} click = { ()=>Tool.to('merchantIndex')}/>
        <IconSpan icon = {require('images/personal/icon_wdyhj.png')} text = {'我的优惠券'} click = { ()=>Tool.to('couponList')}/>
        <IconSpan icon = {require('images/personal/icon_wdsc.png')} text = {'我的收藏'} click = { ()=>Tool.to('collectIndex')}/>
        {/*<IconSpan icon = {require('images/personal/icon_cgx.png')} text = {'草稿箱'}  />*/}
        {/*<IconSpan icon = {require('images/personal/icon_yqpy.png')} text = {'邀请朋友'} click = { ()=>Tool.to('invite')}/>*/}
        <IconSpan icon = {require('images/personal/icon_yjfk.png')} text = {'意见反馈'} click = { ()=>Tool.to('feedback')} />
        <IconSpan icon = {require('images/personal/icon_sz.png')} text = {'设置'}  click= { ()=>Tool.to('setting')}/>

        <View style = { personalIndex.sqsj}>
          <TouchableOpacity style = { personalIndex.sqsjView } onPress = {()=>{ Tool.to('authentication')}}>
              <Text style = {personalIndex.sqsjText}>申请商家</Text>
          </TouchableOpacity>
        </View>
        <Text style = { personalIndex.btoText }>~约你出海玩</Text>
      </ScrollView>
    )
  }
}
