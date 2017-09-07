import React, { Component } from 'react';
import{
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity
}from 'react-native';

import {
  MapView,
  MapTypes,
  MapModule,
  Geolocation
} from 'react-native-baidu-map';

import stylesMap from '../styles/map/map-index';
import Modal from 'react-native-modalbox';
import Tool from '../utils/tool';
import Loading from '../components/common/loading';
import Rating from 'components/common/rating';

/**
 itemId: '13',
 longitude: 113.309315,
 latitude: 23.13427,
 title: "气象局"
 */
export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = {
      btnTypes: [],
      searchKey: 1,
      searchName: null,
      pointDetail: {},
      mapType: MapTypes.NORMA,
      zoom: 12,
      center: {
        longitude: 113.572343,
        latitude: 22.278941
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: []
    };
  }
  componentWillMount(){
    //当前位置作为中心点
    Geolocation.getCurrentPosition()
    .then( ret =>{
      let center = {
        longitude: ret.longitude,
        latitude: ret.latitude,
      }
      // this.setState({center})
    });

    Tool.fetch(null,`${config.appUrlPath}rest/locator/types`,'get',null,(ret)=>{
      this.setState({btnTypes: ret || []})
    });

   this.typeSearch();

  }
  typeSearch(type, index){
    let { searchKey, searchName } = this.state;
    if( type ){
      this.setState({ searchKey: type});
    }
    //更新标注
    let params = {
      locatorTypeId: type || searchKey,
    };
    if(searchName)
      params['name'] = searchName;
      Tool.fetch(null,`${config.appUrlPath}rest/locator/list`,'get',params,(ret)=>{
        let markers = [];
        if( Tool.isArray(ret)){
          markers = ret.map( (v,k)=>{
            return {
              itemId: v.id,
              longitude: v.lng,
              latitude: v.lat,
              title: v.name,
            }
          })
        }
        this.setState({markers})
      });
  }
  fetchPointDetail(e){
    console.log(e);
    if(!e.cluster){
      let locatorId = e.itemId;
      let me = this;
      Tool.fetch(null,`${config.appUrlPath}rest/locator/baseInfo/${e.itemId}`,'get',null,(ret)=>{
        me.setState({pointDetail:ret},()=>{
          me.refs.detail.open();
        });
      });
    }

  }
  getPointDetail(){
    let { searchKey, pointDetail } = this.state;
    let content;
    if(searchKey==1){
      content = <View style={ stylesMap.pointDetail }>
                  <View style = {stylesMap.ddTitle}>
                    <Text style = {stylesMap.resourceName}>{pointDetail.resourceName}</Text>
                    <Text style = {stylesMap.yq}>{'鱼情指数 '+pointDetail.fishIndex}</Text>
                  </View>
                  <Text style = {stylesMap.address}>{pointDetail.address}</Text>
                  <Text  style = {stylesMap.moreDetail}>{pointDetail.minTemperature+'～'+pointDetail.maxTemperature+'°C  '}{pointDetail.windDirection+pointDetail.windGrade}{'  潮差'+pointDetail.tideSub+'m'}</Text>
                  <View style={stylesMap.tqView}>
                    <TouchableOpacity style = { stylesMap.tqbtn}>
                      <Text style = {stylesMap.tqText}>天气</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { stylesMap.tqbtn}>
                      <Text style = {stylesMap.tqText}>线路</Text>
                    </TouchableOpacity>
                  </View>
                </View>
    }else{
      let {featureTags} = pointDetail;
      content = <View style={ stylesMap.pointDetail }>
                <View style = {stylesMap.ddTitle}>
                  <Text style = {stylesMap.resourceName}>{pointDetail.resourceName}</Text>
                  <Rating max={5} editable = {false} rating ={stylesMap.grade} style = {stylesMap.grad}/>
                </View>
                <Text style = {stylesMap.address}>{pointDetail.address}</Text>
                <View style={{flexDirection:'row'}}>
                  {
                    featureTags && featureTags.map((v,k)=>{
                      return <Text key = {'tag-'+k} style = {[stylesMap.moreDetail,{marginRight:10}]}>{v}</Text>
                    })
                  }
                </View>
            </View>
    }
    return content;
  }
  render(){
    let { searchKey } = this.state;
    return(
      <View style={stylesMap.containers}>
        <Loading  visible={this.state.loading_visible} />
        <View style={ [stylesMap.top, stylesMap.floatView ] }>
          <TouchableOpacity onPress={()=>Tool.back()}>
            <Image source={require('../images/map/bth_guanbi.png')}  style={ stylesMap.topImg}/>
          </TouchableOpacity>
          <View style={ stylesMap.search }>
            <TextInput
              placeholder="搜索地点/项目/关键字"
              underlineColorAndroid='transparent'
              style={stylesMap.searchText}
              onChangeText={ (text)=>this.setState({searchName:text})}
              onSubmitEditing = {()=>this.typeSearch()}
            />
          </View>
          <TouchableOpacity onPress={()=>{Tool.to('routelist')}}>
            <Image source={require('../images/map/btn_liebiao.png')}  style={ stylesMap.topRightImg}/>
          </TouchableOpacity>
        </View>
        <View style={ [stylesMap.bottom, stylesMap.floatView ]}>
          <FlatList
            ref = 'typeList'
            key = { this.state.searchKey }
            getItemLayout = {(data, index) => ({length: 65, offset: 65 * index, index})}
            horizontal = {true}
            data={ this.state.btnTypes }
            keyExtractor = {(item, index) => `mapkey-${index}`}
            renderItem={ (ret, index)=>{
              let selectText ,
                  selectBtn = stylesMap.typeUnSelect;
              if(ret.item.id == searchKey){
                selectBtn = stylesMap.typeSelect;
                selectText = stylesMap.textSelcet;
              }
               return (
                 <TouchableOpacity onPress = {this.typeSearch.bind(this, ret.item.id, ret.index)} style = {[stylesMap.btnTypes,selectBtn]}>
                     <Text style = {[stylesMap.typeText,selectText]}>{ret.item.name}</Text>
                 </TouchableOpacity>
               )
              }
            }
          />
        </View>
        <Modal backdropOpacity={0} style = { stylesMap.modal } position = { 'bottom' } ref = { 'detail' }  backdropPressToClose = { true }>
          {this.getPointDetail()}
        </Modal>
        <MapView
          zoomControlsVisible = { false }
          trafficEnabled = {this.state.trafficEnabled}
          baiduHeatMapEnabled = {this.state.baiduHeatMapEnabled}
          zoom = {this.state.zoom}
          mapType = {this.state.mapType}
          center = {this.state.center}
          markers = {this.state.markers}
          style = {stylesMap.map}
          onMarkerClick={(e,b) => {
            console.log(e);
            this.fetchPointDetail(e);
          }}
        >
        </MapView>
      </View>
    )

  }
}
