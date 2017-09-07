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

let { width, height } = Dimensions.get('window');

export default class Integral extends Component{
  constructor(props) {
    super(props);
    this.state = {
      credits: 0,
      imgs:[
        {couponId: null, denomination: 30, integral: 300,  limitAmount: 500, img:require('images/personal/icon_30mj.png')},
        {couponId: null, denomination: 100, integral: 1000,  limitAmount: 800, img:require('images/personal/icon_100mj.png')},
        {couponId: null, denomination: 200, integral: 2000,  limitAmount: 1500, img:require('images/personal/icon_200mj.png')},
        {couponId: null, denomination: 500, integral: 5000,  limitAmount: 3000, img:require('images/personal/icon_500mj.png')},
      ]
    }
  }
  componentWillMount(){
    let { imgs } = this.state;

    Tool.fetch(null,`${config.appUrlPath}rest/credit`,'get',null,(ret)=>{
			this.setState({ credits: ret.credits });
		});

    Tool.fetch(null,`${config.appUrlPath}rest/coup/all`,'get',null,(ret)=>{
      ret.map((v,k)=>{
        imgs.map((vi,ki)=>{
          if(v.amount == vi.denomination)
            vi.couponId = v.couponId;
        })
      })
      this.setState({ imgs });
    });

  }
  render(){
    let { imgs,credits } = this.state;
    return(
        <ScrollView style={ styles.containers }>
          <ImageBackground
            source={require('images/personal/pic_wdjfbeijing.png')}
            style={ styles.imgBg}>
            <View style={ styles.toolView}>
              <TouchableOpacity style = { styles.pressArea} onPress={()=>Tool.back()}>
                <Image source = { require('images/route/btn_ARROW---LEFT.png')} style = { styles.toolImg} />
              </TouchableOpacity>
              <Text style = { styles.headTitle}>我的积分</Text>
              <TouchableOpacity style = { styles.pressArea} onPress={()=>Tool.to('integralExplanation')}>
                <Text style = { styles.explain}>说明</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.curIntegral}>
              <View style = { styles.curView}>
                <Text style={ styles.dqjfText }>当前积分</Text>
              </View>
              <Text style = { [styles.headTitle, styles.integralNum] }>{credits}分</Text>
            </View>
          </ImageBackground>
          <Text style={ styles.title }>满减券</Text>
          <View style = { styles.imgs }>
            {
              imgs.map((v,k)=>{
                return <TouchableOpacity key = {`img-${k}`} onPress = {()=>Tool.to('integralDetail',{detail:v})}>
                          <Image source = {v.img}  style = { styles.img }/>
                       </TouchableOpacity>
              })
            }
          </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imgBg:{
    width: width,
    height: 160,
  },
  toolView:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios'? 20 : 5,
  },
  pressArea:{
    padding: 15,
  },
  toolImg:{
    width: 10,
    height: 18,
  },
  headTitle:{
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  explain:{
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  curIntegral:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  curView:{
    width: 60,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 7,
  },
  dqjfText:{
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  integralNum:{
    fontWeight: 'bold',
    marginTop: 4,
    marginLeft: 1,
  },
  title:{
    fontSize: 16,
    color: '#323232',
    padding: 10,
    paddingTop: 15,
  },
  imgs:{
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  img:{
    width: (width- 60)/2,
    height: 71,
    margin: 15,
    marginTop: 0,
  },
});
