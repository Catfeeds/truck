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
import ListSection from './component/ListSection'
import EmptyList from 'components/EmptyList'
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';
import ListPagingComponent from 'components/ListPagingComponent'
import isEmpty from 'lodash/isEmpty'
import DynamicView from './component/DynamicView'
import { getStringByTime } from './dynamicShare'

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

export default class ActivityCP extends React.Component {
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
        Tool.get(`${ config.ajaxPath }/post/favorite/${id}`, { sectionId : 2 })
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
                onPress : () => this.redirectDetail( v.activityId, v.id )
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
    redirectDetail( activityId, id ){
        Actions.activityDetail({ activityId, id })
    }
    renderListRow = ( item, index, props ) => {
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
                onPress = { () => this.redirectDetail( item.activityId, item.id ) }
                buttons = { this.getButtons( item, index, props.dataSource, props._setState ) }
            >
                { item.activityListVo && <DynamicView data = {{
                        destination : item.activityListVo.destination,
                        beginTime : item.activityListVo.beginDate,
                        endTime: item.activityListVo.endDate,
                        gatherTime: item.activityListVo.gatherTime,
                        day : item.activityListVo.activityDays,
                        minPeople : item.activityListVo.minCustomers,
                        maxPeople : item.activityListVo.maxCustomers,
                    }}/>
                }
            </ListSection>
}
    render(){
        let {
                bizid
            } = this.props;
        return <ListPagingComponent
                    key = { bizid }
                    ItemSeparatorComponent = { Slot }
                    url = { `${ config.ajaxPath }/rest/post/list` }
                    params = {{ sectionId : 2, bizId : bizid }}
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