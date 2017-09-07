import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Tabs from 'react-native-tabs';
import Tool from '../../utils/tool';
import MyButton from '../../components/common/button';
import OssUtils from '../../utils/oss-utils';
import Loading from '../../components/common/loading';

import {Actions} from 'react-native-router-flux';

let { width } = Dimensions.get('window');

export default class MerchantInfo extends Component {
    // static defaultProps = {
    //   tagIdsOld: [],
    //   tagIdsNew: [],
    //   tagName: '',
    // };

		constructor(props){
        super(props);
        this.state = {
          edit: false,
          btnText: '编辑资料',
          tagIdsOld: [],
          tagIdsNew: [],
          tagName: '',
          datas: {
            merchant: '',
            phone: '',
            address: '',
            introduction: '',
            pictures: [],
          },
          imgAddBtn: require('../../images/merchant/btn_add.png')
        };
		}
    componentWillMount(){
      let { tagIdsOld, tagIdsNew, tagName} = this.props;
      Tool.fetch(null, `${config.appUrlPath}rest/merchant`,'get',null,(ret)=>{
        let datas = {
          merchant: ret.merchant,
          phone: ret.phone,
          address: ret.address,
          introduction: ret.introduction,
          pictures: ret.carouselPicsArr || [],
        };
        this.setState({
          tagIdsOld: ret.tagIds.clone(),
          tagIdsNew: ret.tagIds,
          tagName: ret.tagsName,
          datas:datas
        });
      });
		}
    componentWillReceiveProps(props){
      let { tagIdsNew, tagName } = props;
      this.setState({
        tagIdsNew,
        tagName
      })
    }
    getImgList(){
      let { edit, datas,imgAddBtn } = this.state;
      let list;
      let { pictures } = datas
      list = pictures.map((v, k) => {
          return <Image key = { k }  source={{ uri: v}} style = { styles.img }>
                  {edit && <TouchableOpacity style = { styles.delView } onPress={ ()=>{ this.delImg( k ) }}><Image source = {require('../../images/merchant/btn_x.png')} style = { styles.delImg }/></TouchableOpacity>}
                 </Image>
      });
      if(edit)
        list.push(<TouchableOpacity key = { 'btn_add' } style = { styles.addView } onPress={ ()=>{ this.addImg() }}><Image source = {imgAddBtn} style = { styles.img }/></TouchableOpacity>);
      return list;
    }
    addImg(){
      let { datas } = this.state;
      let imgs = datas.pictures;
      OssUtils.uploadImage( this, (ret) => {
        imgs.push(ret.fullUrl);
        this.setState({datas})
      });
    }
    delImg( index ){
      let { datas } = this.state;
      datas.pictures.splice(index,1);
      this.setState({
        datas: datas,
      })
    }
    edit(){
      let { edit,
            btnText,
            tagIdsOld,
            tagIdsNew,
            datas,
          } = this.state;

      if( !edit ){
        edit = true,
        btnText = '保存修改';
        this.setState({
          edit,
          btnText
        });
      }else{
        edit = false,
        btnText = '编辑资料';

        let add = [], del = [];
        if(tagIdsNew.length > 0){
          //获取新增
          tagIdsNew.map( (vn, kn)=>{
            let isNew = true;
            for (var i = 0; i < tagIdsOld.length; i++) {
              if( vn == tagIdsOld[i])isNew = false;
            }
            if(isNew)add.push(vn)
          });
          //获取删除
          tagIdsOld.map( (vn, kn)=>{
            let isDel = true;
            for (var i = 0; i < tagIdsNew.length; i++) {
              if( vn == tagIdsNew[i])isDel = false;
            }
            if(isDel)del.push(vn)
          });
        }

        let params = {
          merchant: datas.merchant,
          address: datas.address,
          introduction: datas.introduction,
          phone: datas.phone,
          carouselPicsArray: datas.pictures,
          ids: del,
          tagIds: add,
        };

        Tool.fetch(this, `${config.appUrlPath}rest/merchant`,'put',params,(ret)=>{
          this.setState({
            edit,
            btnText
          });
        });

      }
    }
	  render() {
      let { edit, btnText, datas, tagIdsNew, tagName } = this.state;
	    return (
        <ScrollView style={styles.container}>
          <Loading  visible={this.state.loading_visible} />
          <View style = { styles.chunk }>
            <Text style = { styles.name }>商家名称</Text>
            <View style={ styles.textView }>
              <TextInput
                defaultValue = { datas.merchant }
                editable = { edit }
                underlineColorAndroid='transparent'
                selectionColor='#34a5f0'
                clearButtonMode='while-editing'
                onChangeText={(text)=>{
                  datas.merchant = text;
                  this.setState({datas})
                }}
                style={ styles.textStyle }
              />
            </View>
          </View>
          <View style = { styles.chunk }>
            <Text style = { styles.name }>商家电话</Text>
            <View style={ styles.textView }>
              <TextInput
                defaultValue = { datas.phone }
                editable = { edit }
                underlineColorAndroid='transparent'
                selectionColor='#34a5f0'
                clearButtonMode='while-editing'
                onChangeText={(text)=>{
                  datas.phone = text;
                  this.setState({datas})
                }}
                style={ styles.textStyle }
              />
            </View>
          </View>
          <View style = { styles.chunk }>
            <Text style = { styles.name }>商家地址</Text>
            <View style={ styles.textView }>
              <TextInput
                defaultValue = { datas.address }
                editable = { edit }
                underlineColorAndroid='transparent'
                selectionColor='#34a5f0'
                clearButtonMode='while-editing'
                onChangeText={(text)=>{
                  datas.address = text;
                  this.setState({datas})
                }}
                style={ styles.textStyle }
              />
            </View>
          </View>
          <View style = { styles.chunk }>
            <Text style = { styles.name }>商家标签</Text>
            <TouchableOpacity style = { [styles.textView, styles.tags] } onPress={ ()=>{edit&&Tool.to('merchantTagModify',{tagIds: tagIdsNew }) }}>
              <Text style={ styles.tagText }> {tagName } </Text>
              { edit && <Image source= {require('../../images/merchant/icon_ARROW--17.png')} style ={{ width: 9, height: 16} }/>}
            </TouchableOpacity>
          </View>
          <View style = { styles.imgChunk }>
            <Text style = { styles.name }>商家照片</Text>
            <View style = { styles.imgList }>
              { this.getImgList() }
            </View>
          </View>
          <View style = { styles.des }>
            <Text style = { [styles.name, styles.sjjs] }>商家介绍</Text>
            <TextInput
              defaultValue = { datas.introduction }
              editable = { edit }
              multiline = { true }
              underlineColorAndroid='transparent'
              selectionColor='#34a5f0'
              clearButtonMode='while-editing'
              onChangeText={(text)=>{
                datas.introduction = text;
                this.setState({datas})
              }}
              style={ [styles.textStyle, styles.textDes, edit && { backgroundColor: '#f0f0f0'}] }
            />
          </View>
          <MyButton
            style = { styles.btn }
            onPress = { this.edit.bind(this)} >
            {btnText}
          </MyButton>
        </ScrollView>
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  chunk: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  imgChunk: {
    flexDirection: 'row',
    marginTop: 20,
  },
  name: {
    width: 60,
    marginRight: 10,
    fontSize: 14,
    color: '#323232',
  },
  textView: {
    flex: 1,
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5,
  },
  textStyle: {
    flex: 1,
    fontSize: 14,
    color: '#323232',
  },
  des: {
    flexDirection: 'row',
    height: 150,
    marginTop: 10,
  },
  textDes: {
    fontSize: 14,
    minHeight: 150,
    padding: 0,
    paddingTop: Platform.Os == 'IOS'?0:6,
    textAlignVertical: 'top',
  },
  btn: {
    marginTop: 30,
    marginBottom: 50,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  sjjs: {
    paddingTop: 5,
  },
  tagText:{
    fontSize: 14,
    color: '#323232'
  },
  imgList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  img: {
    width: (width - 140)/3,
    height: (width - 140)/3,
    marginRight: 10,
    marginBottom: 10,
  },
  addView: {
    width: 80,
    height: 80,
  },
  delView: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  delImg: {
    width: 21,
    height: 21,
  }
});
