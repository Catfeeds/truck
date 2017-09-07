import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    Dimensions,
} from 'react-native';
import _styles from 'components/commonStyles'
import Slot from './component/slot'
import Tool from 'utils/tool'
import DateTool from 'utils/date-tool'
import ListSection from './component/ListSection'
import EmptyList from 'components/EmptyList'
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';
import ListPagingComponent from 'components/ListPagingComponent'
import isEmpty from 'lodash/isEmpty'
import { ImagePreview } from './dynamicPublish'

let buttonImages = [
    {
        selected : require("../../images/community/btn_pinglun_s.png"),
        init : require("../../images/community/btn_pinglun_n.png"),
    },
    {
        selected : require("../../images/community/btn_dianzan_s.png"),
        init : require("../../images/community/btn_dianzan_n.png"),
    },
    {
        selected : require("../../images/community/btn_shoucang_s.png"),
        init : require("../../images/community/btn_shoucang_n.png"),
    },
],imagePreviewWAH = parseInt((Dimensions.get("window").width - 30 - 20)/3);

export default class DynamicShare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    /**
     * 点赞
     * @param  {Number} id
     */
    goodHandle( id, index, dataSource, setState ){
        Tool.post(`${ config.ajaxPath }/rest/post/thumb/${id}`)
        .then(()=>{
            let newDataSource = dataSource.slice();
            newDataSource[index] = Object.assign({},dataSource[index],{ isThumb : !dataSource[index].isThumb })
            setState( { dataSource : newDataSource } )
        })
        .catch( e => {})
    }

    /**
     * 收藏操作
     * @param  {Number} id
     */
    collecHandle( id, index, dataSource, setState ){
        Tool.get(`${ config.ajaxPath }/post/favorite/${id}`, { sectionId : 1 })
        .then(()=>{
            let newDataSource = dataSource.slice();
            newDataSource[index] = Object.assign({},dataSource[index],{ isFavorite : !dataSource[index].isFavorite })
            setState( { dataSource : newDataSource } )
            // this.setState( Object.assign( {}, this.state, { dataSource : newDataSource } ) )
        })
        .catch( e => {})
    }
    getButtons( v, k, dataSource, setState ){
        return [
            {
                icon : buttonImages[0].init,
                value : "评论",
                onPress : () => this.redirectDetail( v.id )
            },
            {
                icon : v.isThumb ? buttonImages[1].selected : buttonImages[1].init,
                type : v.isThumb ? "primary" : "default",
                value : "点赞",
                onPress : () => this.goodHandle( v.id, k, dataSource, setState )
            },
            {
                icon : v.isFavorite ? buttonImages[2].selected : buttonImages[2].init,
                type : v.isFavorite ? "primary" : "default",
                value : "收藏",
                onPress : () => this.collecHandle( v.id, k, dataSource, setState )
            },
        ]
    }
    redirectDetail( id ){
        Actions.dynamicDetail({ id })
    }
    renderListRow = ( item, index, props )=>{
            // item.thumbnail = images
        return <ListSection
                userInfo = {{
                    name : item.custCommVo.name,
                    headPic : item.custCommVo.picture,
                    level : item.custCommVo.level,
                    id : item.custCommVo.id,
                    tags : item.custCommVo.custTagVos,
                }}
                otherInfo = {{
                    content : item.content,
                    postTime : item.postTime,
                }}
                type = { item.businessUnitId }
                time = { getStringByTime( item.postTime, "MM-DD" ) }
                locInfo = { item.postLocation }
                onPress = { () => this.redirectDetail( item.id ) }
                buttons = { this.getButtons( item, index, props.dataSource, props._setState ) }
            >
                { !isEmpty( item.thumbnail ) && <ImagePreview imageOnPress = { () => this.redirectDetail( item.id ) } style = {{ marginTop: 10 }} imageStyle = { styles.imagePreview } maxLength = { 3 } rowNumber = { 3 } photoes = { item.thumbnail }/> }
            </ListSection>
    }
    render(){
        let {
                bizid
            } = this.props;
        return <ListPagingComponent
                    key = { bizid }
                    ItemSeparatorComponent = { Slot }
                    // emptyData = {[{ id:0, custCommVo:{} }]}
                    url = { `${ config.ajaxPath }/rest/post/list` }
                    params = {{ sectionId : 1, bizId : bizid }}
                    renderRow = { this.renderListRow }
                />
    }
}

const styles = StyleSheet.create({
    imagePreview : {
        width : imagePreviewWAH,
        height : imagePreviewWAH,
        marginRight:10,
        marginLeft:0,
    }
})

export function getStringByTime( time, pattern ){
    let date = new Date( time ),
        toDay = new Date();
    if( toDay.getTime - date.getTime >= DateTool.dayOfMs )
        return toDay.getDate() === date.getDate() ? "今天" : "昨天"
    else 
        return DateTool.dateToString( date, pattern )
}