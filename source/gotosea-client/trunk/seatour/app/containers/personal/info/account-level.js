import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Tool from 'utils/tool';
import {Actions} from 'react-native-router-flux';

import styles from 'styles/personal/account-level';

let { width, height } = Dimensions.get('window');

export default class AccountLevel extends Component{
  constructor(props) {
    super(props);
    let { info } = props;
    this.state = {
      level:  info ? info.level : 0,
      maxLevel:5,
      experienceOfficial:[
        {text: '通过平台完成完整行程',experience: 100},
        {text: '行程结束后进行文字评论',experience: 5},
        {text: '行程结束后进行图文评论',experience: 10},
        {text: '行程结束后分享到第三方社区',experience: 10},
        {text: '社区广场发布一篇渔获帖子',experience: 5},
        {text: '社区广场对其它帖子进行评论',experience: 2},
        {text: '新用户推荐后实名注册',experience: 30},
      ],
      experienceValue:[
        {level:1, experience: 0},
        {level:2, experience: 300},
        {level:3, experience: 800},
        {level:4, experience: 2500},
        {level:5, experience: 5000},
      ],
    }
  }
  componentWillMount(){

  }
  getAwardView(){
    let view = [];
    let { maxLevel, level } = this.state;
    for (var i = 1; i <= maxLevel; i++) {
      let v = <View key = {`award-${i}`} style={ [styles.awardItem, i == level && styles.awardItemCur] }>
                <View style = { styles.spaceCenter }>
                  <Text style={ styles.leveTip }>level</Text>
                  <Text style={ [ styles.text,{color:'#ffffff'}]}>签到</Text>
                </View>
                <View style = { styles.spaceCenter }>
                  <Text style = { styles.levelBig }>{i}</Text>
                  <Text style = { styles.textExperience }>{`+${i}积分`}</Text>
                </View>
              </View>
      view.push(v);
    }
    return view;
  }
  getExperienceView(){
    let { experienceOfficial } = this.state;
    let view = experienceOfficial.map((v,k)=>{
      return <View key = {`experienceOfficial-${k}`} style = { styles.experienceItem }>
                <Text style={ [styles.textExperience,{ flex: 1}] }>{v.text}</Text>
                <View style = { styles.experienceRight }>
                  <Text style={ [ styles.text,{color:'#ffffff', textAlign: 'right' }]}>经验</Text>
                  <Text style={ [styles.textExperience,{ textAlign: 'right' }] }>{`+${v.experience}`}</Text>
                </View>
             </View>
    })
    return view;
  }
  getExperienceValueVeiw(){
    let { experienceValue } = this.state;
    let view = experienceValue.map((v,k)=>{
      return <View key = {`experienceValue-${k}`} style = { [styles.experienceValueItem, k%2==0 && { backgroundColor: '#fafafa'}] }>
              <View style = { styles.experienceValueLeft }>
                <ImageBackground source={require('images/personal/icon_lv.png')} style = { styles.leveImg}>
                  <Text style = { [styles.textExperience,{backgroundColor: 'transparent'}] }>{`lv.${v.level}`}</Text>
                </ImageBackground>
              </View>
              <Text style={ [styles.text,{flex:1}] }>{`    累计${v.experience}经验值`}</Text>
             </View>
    });
    return view;
  }
  getHeadVie(){
    let { level,experienceValue } = this.state;
    let  data1 = experienceValue[level-2],
         data2 = experienceValue[level];
    return <View style = { styles.headView }>

              <View style = { styles.headViewItem }>
                <View style = { styles.lvView }>
                  <Text style = { [styles.textExperience,{color: '#323232'}]}>{`Lv.${data1?data1.level:0}`}</Text>
                </View>
                <View style={ styles.lineView }>
                  <View style = { styles.headLine}/>
                  <View style = { styles.headCricle}/>
                  <View style = { styles.headLine}/>
                </View>
                <Text style={ styles.textExperience }>{data1?data1.experience:0}</Text>
              </View>

              <View style = { styles.imgView1}>
                <View style = { styles.imgView2}>
                  <Image source={{uri:'https://haiyuexing.oss-cn-shenzhen.aliyuncs.com/pub/attachment/2017/05/08/152b32f8b54242a49e06ed7a4291b78b.jpg'}} style={ styles.headPic }/>
                </View>
              </View>

              <View style = { styles.headViewItem }>
                <View style = { styles.lvView }>
                  <Text style = { [styles.textExperience,{color: '#323232'}]}>{data2?`Lv.${data2.level}`:'max'}</Text>
                </View>
                <View style={ styles.lineView }>
                  <View style = { styles.headLine}/>
                  <View style = { [styles.headCricle]}/>
                  <View style = { [styles.headLine]}/>
                </View>
                <Text style={ styles.textExperience }>{data2?data2.experience:'max'}</Text>
              </View>

           </View>
  }
  render(){
    let { info } = this.props;
    return(
        <ScrollView style={ styles.containers }>

          <View style = { styles.top }>

            <View style={ styles.toolView}>
              <TouchableOpacity style = { styles.pressArea} onPress={()=>Tool.back()}>
                <Image source = { require('images/route/btn_ARROW---LEFT.png')} style = { styles.toolImg} />
              </TouchableOpacity>
              <Text style={ [styles.name, styles.toolTitle] }>账号等级</Text>
            </View>

            <View style={ styles.curLevel }>
              <Text style={ styles.text }>当前等级 Lv.{info.level}</Text>
            </View>
            { this.getHeadVie() }
            <Text style={ styles.textExperience }>当前经验值 {info.experenceValue}</Text>
            <View style = { [styles.jusCenter, {marginTop: 20, marginBottom: 16}] }>
              <Text style={ styles.name }>那个谁  </Text>
              <Text style={ styles.textExperience }>ID {info.account}</Text>
            </View>
            <View style={ styles.curintegral }>
              <Image source={ require('images/personal/icon_jifen.png')} style={ { width: 19, height:16 } }/>
              <Text style={ styles.text }> 当前积分{info.credits}</Text>
            </View>
          </View>

          <View style = { styles.introduce }>

            <View style = { styles.djjlTitle }>
              <Text style={ styles.text }>经验等级奖励</Text>
              <TouchableOpacity style = { styles.tipView } onPress={ ()=>Tool.to('integral',{detail:info}) }>
    						<View style = { styles.tanhao }>
    							<Text style={ styles.tip}>?</Text>
    						</View>
    						<Text style={ styles.tip }>积分可用于兑换优惠券</Text>
    					</TouchableOpacity>
            </View>
            <View style = { styles.awarView}>
              {this.getAwardView()}
            </View>

            <Text style={ [styles.text, styles.jyhqTitle] }>经验获取</Text>
            <View style = { styles.experienceView}>
              {this.getExperienceView()}
            </View>

            <Text style={ [styles.text, styles.jyhqTitle] }>等级晋升条件</Text>
            <View style = { styles.experienceValueView}>
              {this.getExperienceValueVeiw()}
            </View>

            <View style={{height: 50}}/>
          </View>
        </ScrollView>
    )
  }
}
