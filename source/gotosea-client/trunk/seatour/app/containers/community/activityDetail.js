import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import Button from './component/button'
import Slot from './component/slot'
import _styles from 'components/commonStyles'
import ProjectOptions from './component/ProjectOptions'
import ListSection from './component/ListSection'
import UserListWrap from './component/UserListWrap'
import UserList from './component/UserList'
import CommentsSection from './component/CommentsSection'
import ButtonBar,{ IconButton, PrimaryButton } from './component/ButtonBar'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'
import { getStringByTime } from './dynamicShare'
import Tool from 'utils/tool'
import DateTool from 'utils/date-tool'
import isEmpty from 'lodash/isEmpty'
import DynamicView from './component/DynamicView'

const iconButtonImage = [
    {
        init : require("../../images/community/btn_dianzan_tab_n.png"),
        selected : require("../../images/community/btn_dianzan_tab_s.png"),
    },
    require("../../images/community/btn_pinglun_tab.png"),
    require("../../images/community/btn_Tools.png"),
    require("../../images/community/btn_bianji.png"),
],images = [
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503913139949&di=144362933531651f64ea431b92c26404&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F08%2F30%2Fjingxuan%2Fzhuoku019.jpg",
];

export default class ActivityDetailApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail : {},
            userList : [{
                headPic : { uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" },
                userName : "xx1",
            },{
                headPic : { uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" },
                userName : "xx1",
            },{
                headPic : { uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" },
                userName : "xx1",
            },{
                headPic : { uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" },
                userName : "xx1",
            },]
        };
    }
    static propTypes = {
    }
    static defaultProps = {
    }
    componentDidMount(){
        let activityId = this.props.activityId;

        Actions.refresh({
            hideNavBar : false,
            leftButtonImage : require('../../images/btn_back.png'),
            onLeft : () => Actions.pop(),
            rightButtonImage : require('../../images/community/btn_..._.png'),
            onRight : () => Actions.pop(),
        })

        //获取活动详情
        Tool.get(`${ config.ajaxPath }/rest/act/${ activityId }`)
        .then( json => {
            this.setState({ detail : json })
        })
        .catch( e =>{
            console.info( e )
        })

        //获取参与活动的用户列表
        Tool.get(`${ config.ajaxPath }/rest/act/actCust/${ activityId }`)
        .then( data => {
            console.info( data )
        })
    }
    renderRight(price){
        return (
            <Text style = {{ fontSize: 12, color : "#f0450b" }}>￥<Text style = {{ fontSize : 18 }}>{ price }</Text></Text>
        )
    }
    render() {
        let {
                userList,
                detail,
            } = this.state,
            {
                activityId,
                id,
            } = this.props,
            DIYProjects = [],
            AAProjects = [];

            Array.isArray( detail.activityServiceVos ) && detail.activityServiceVos.forEach( v => {
                // 1 AA付费项目
                // 2 自选付费项目
                switch( v.activityServiceType ){
                    case 1:
                        return AAProjects.push(<ProjectOptions key = { v.serviceId } desc = "" renderRight = { () => this.renderRight( v.payFee ) } cover = {{ uri: v.picture }}/>)
                    case 2:
                        return DIYProjects.push(<ProjectOptions key = { v.serviceId } desc = "" renderRight = { () => this.renderRight( v.payFee ) } cover = {{ uri: v.picture }}/>)
                    default:
                        return
                }
            })
        return (
            <View style = {{ flex: 1 }}>
            	<ScrollView style = { styles.container }>
            		<ListSection
                        userInfo = { !detail.custCommVo ? {} : {
                            name : detail.custCommVo.name,
                            headPic : detail.custCommVo.picture,
                            level : detail.custCommVo.level,
                            id : detail.custCommVo.id,
                            tags : detail.custCommVo.custTagVos,
                        }}
                        otherInfo = {{
                            content : detail.activityTitle,
                            postTime : detail.postTime,
                        }}
                        type = { detail.businessUnitId }
                        time = { getStringByTime( detail.postTime, "MM-DD" ) }
                        locInfo = { detail.postLocation }
                    >
                        <DynamicView data = {{
                            destination : detail.destination,
                            beginTime : detail.beginDate,
                            endTime: detail.endDate,
                            gatherTime: detail.gatherTime,
                            day : detail.activityDays,
                            minPeople : detail.minCustomers,
                            maxPeople : detail.maxCustomers,
                        }}/>
                    </ListSection>
                    <View style = { [ _styles.contentBorderColor,{ marginBottom: 15, paddingBottom: 10, paddingLeft: 15, paddingRight : 15, borderBottomWidth : 1 }] }>
                        <Text style = {[ _styles.fontSize, _styles.textColor, { lineHeight : 24 } ]}>{ detail.summary }</Text>
                    </View>
            		<ProjectTitle style = {{ marginTop : 0 }} desc = "该费用您需和出行人员共同分摊">AA付费项目</ProjectTitle>
    				{
                        AAProjects
                    }
            		<ProjectTitle desc = "您可根据自身情况选择以下服务">自选付费项目</ProjectTitle>
    				{
                        DIYProjects
                    }
                    <OperateArea endDate = { DateTool.dateToString( detail.endDate || Date.now(), "YYYY-MM-DD hh:mm:ss" )} />
                    <UserListWrap style = {{ borderBottomWidth: 0}} desc = { "已加入该活动的用户" }>
                        <UserList dataSource = { userList }/>
                    </UserListWrap>
                    <Slot/>
                    <CommentsSection id = { id } goodNumber = { detail.thumbsNum || 0 } commentNumber = { detail.commentsNum }/>
                </ScrollView>
                <ButtonBar>
                    <IconButton icon = { iconButtonImage[0].init }>点赞</IconButton>
                    <IconButton icon = { iconButtonImage[1] }>评论</IconButton>
                    <IconButton icon = { iconButtonImage[2] }>管理</IconButton>
                    <IconButton icon = { iconButtonImage[3] }>编辑</IconButton>
                    {/* <PrimaryButton width = { 150 }>立即报名</PrimaryButton>*/}
                </ButtonBar>
            </View>
        )
    }
}

export const ProjectTitle = ( props ) => {
    let {
            style,
            desc,
            ...others,
        } = props;
	return (
		<View { ...others } style = { [{ flexDirection:"row", alignItems:"center", marginLeft: 15, marginBottom: 5, marginTop:5 }, style] }>
			<Text style = { [_styles.fontSize,_styles.textColor] } >{ props.children }</Text>
            { desc && <Text style = {{ marginLeft:5,fontSize:10, color: _styles.themeColor }}>{ desc }</Text> }
		</View>
	)
}

class OperateArea extends React.Component{
    static propTypes = {
        endDate : PropTypes.string.isRequired,
    }
    render(){
        let {
            endDate,
        } = this.props;
        return (
            <View style = { styles.operateContainer }>
                <Text style = { [{ fontSize:12 }]}>活动截止时间：<Text style = { [{ color:"#ff2c00" }]}>{/*2017-06-20 24:00*/}{ endDate }</Text></Text>
                { this.props.children && <View style = { styles.operateArea }>{ this.props.children }</View> }
                {/*<View>
                    <Text style = { [_styles.descTextColor,{ fontSize : 12 }] }>免责声明</Text>
                    <View style = { [ _styles.contentBorderColor, { borderWidth:1 } ] }>
                        <Text>?</Text>
                    </View>
                </View>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container : {
        marginBottom:50,
        // height:200,
        // position: "absolute",
        // bottom:50,
        // left:0,
        // right:0,
        // top:0,
	},
    operateContainer:{
        marginTop: 10,
        marginBottom: 20,
        justifyContent:"center",
        alignItems:"center"
    },
    operateArea:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:15,
        marginBottom:10,
    },
})