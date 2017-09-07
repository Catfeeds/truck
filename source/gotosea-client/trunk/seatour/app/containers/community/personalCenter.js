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
import _styles from 'components/commonStyles'
import Slot from './component/slot'
import Tag from './component/tag'
import ListSection from './component/ListSection'
import LevelLabel from './component/LevelLabel'
import Tool from 'utils/tool'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'
import { getStringByTime } from './dynamicShare'
import ListPagingComponent from 'components/ListPagingComponent'
import DynamicView from './component/DynamicView'
import Tabs from 'react-native-tabs'
// import Community from 'containers/community'

const buttonImage = [
	{
		init : require("../../images/community/btn_guanzhu_n.png"),
		selected : require("../../images/community/btn_guanzhu_s.png"),
	},
	require("../../images/community/icon_MAIL.png"),
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
], genderImage = {
    female : require("../../images/personal/icon_girl.png"),
    male : require("../../images/personal/icon_boy.png"),
},imagePreviewWAH = parseInt((Dimensions.get("window").width - 30 - 20)/3);

export default class PersonalCenterApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personalInfo : {},
            tabIndex : 0,
        };
    }
    static propTypes = {
    }
    static defaultProps = {
    }
    componentDidMount(){
        let {
                uid
            } = this.props
    	Actions.refresh({
    		navigationBarStyle : {
    			backgroundColor : "transparent",
    			borderBottomWidth: 0,
    		},
    		title : null,
            hideNavBar : false,
            backButtonImage : require('../../images/route/btn_ARROW---LEFT.png'),
            onBack : () => Actions.pop(),
            rightButtonImage : require('../../images/route/btn_share.png'),
            onRight : () => Actions.pop(),
        })

        Tool.get(`${ config.ajaxPath }/rest/cust/info/${ uid }`)
        .then( data => {
            // data.isSelf = true
            // data.isContact = true
            this.setState({ personalInfo : data })
        })
    }
    /**
     * 关注按钮事件
     */
    subscribe = ( uid, isSubscribe ) =>{
        if( !uid ) return Actions.login()
        let {
                personalInfo
            } = this.state;
        Tool.post(`${ config.ajaxPath }/rest/contact/${ uid }`)
        .then( () => this.setState( Object.assign( {}, personalInfo, { isContact : !personalInfo.isContact })) )
        .catch( e => {})
    }
    directMessage = uid => {
        if( !uid ) return Actions.login()
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
        Tool.post(`${ config.ajaxPath }rest/post/collect/${id}`)
        .then(()=>{
            let newDataSource = dataSource.slice();
            newDataSource[index] = Object.assign({},dataSource[index],{ isFavorite : !dataSource[index].isFavorite })
            setState( { dataSource : newDataSource } )
        })
        .catch( e => {})
    }
    // postCustId
    handleTabSelect( el ){
        switch( el.props.name ){
            case 1:
                return this.setState({ tabIndex : 1 })
            case 0:
            default:
                return this.setState({ tabIndex : 0 })
        }
    }
    /**
     * 抽取方法，增加可读性。给每个渲染行组件返回按钮
     * @param  {number} type       0 动态。1 活动。
     * @param  {[type]} v          [description]
     * @param  {[type]} k          [description]
     * @param  {[type]} dataSource [description]
     * @param  {[type]} setState   [description]
     * @return {[type]}            [description]
     */
    getButtons( type, v, k, dataSource, setState ){
        return [
            {
                icon : buttonImage[2].init,
                value : "评论",
                onPress : ( type === 0 ? () => this.redirectDynamicDetail( v.id ) : this.redirectActivityDetail( v.activityId, v.id ) )
            },
            {
                icon : v.isThumb ? buttonImage[3].selected : buttonImage[3].init,
                type : v.isThumb ? "primary" : "default",
                value : "点赞",
                onPress : () => this.goodHandle( v.id, k, dataSource, setState )
            },
            {
                icon : v.isFavorite ? buttonImage[4].selected : buttonImage[4].init,
                type : v.isFavorite ? "primary" : "default",
                value : "收藏",
                onPress : () => this.collecHandle( v.id, k, dataSource, setState )
            },
        ]
    }
    /**
     * 跳转动态详情
     * @param  {String|Number} id         帖子id
     */
    redirectDynamicDetail( id ){
        Actions.dynamicDetail({ id })
    }
    /**
     * 渲染动态行
     * @param  {Object} item  dataSource[index] 数据集中的index索引的一个数据
     * @param  {Number} index 
     * @param  {Object} props 分页的props,使用setState和dataSoure可以不用重新加载数据，而更新其中的一个数据
     * @return {React.Element}       渲染一行的列表组件
     */
    renderDynamicRow = (item, index, props) => {
        let isSelf = this.state.personalInfo.isSelf
        return <ListSection
                userInfo = {{
                    name : item.custCommVo.name,
                    headPic : item.custCommVo.picture,
                    level : item.custCommVo.level,
                    id : item.custCommVo.id,
                    tags : item.custCommVo.custTagVos,
                }}
                headUnclickable = { true }
                otherInfo = {{
                    content : item.content,
                    postTime : item.postTime,
                }}
                type = { item.businessUnitId }
                time = { getStringByTime( item.postTime, "MM-DD" ) }
                locInfo = { item.postLocation }
                onPress = { () => this.redirectDynamicDetail( item.id ) }
                buttons = { isSelf ? [] : this.getButtons( 0, item, index, props.dataSource, props._setState ) }
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
    /**
     * 跳转活动详情
     * @param  {String|Number} activityId 活动id
     * @param  {String|Number} id         帖子id
     */
    redirectActivityDetail( activityId, id ){
        Actions.activityDetail({ activityId, id })
    }
    /**
     * 渲染活动行
     * @param  {Object} item  dataSource[index] 数据集中的index索引的一个数据
     * @param  {Number} index 
     * @param  {Object} props 分页的props,使用setState和dataSoure可以不用重新加载数据，而更新其中的一个数据
     * @return {React.Element}       渲染一行的列表组件
     */
    renderActivityRow = (item, index, props)=>{
        let isSelf = this.state.personalInfo.isSelf
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
                headUnclickable = { true }
                type = { item.businessUnitId }
                time = { getStringByTime( item.postTime, "MM-DD" ) }
                locInfo = { item.postLocation }
                onPress = { () => this.redirectActivityDetail( item.activityId, item.id ) }
                buttons = { isSelf ? [] : this.getButtons( 1, item, index, props.dataSource, props._setState ) }
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
    render() {
        let {
                uid,
            } = this.props,
            {
                personalInfo,
                tabIndex,
            } = this.state;

        switch( tabIndex ){
            case 1:
                subView = <ListPagingComponent
                                key = { tabIndex }
                                ItemSeparatorComponent = { Slot }
                                url = { `${ config.ajaxPath }/rest/post/list` }
                                params = {{ sectionId : 2,  }}
                                renderRow = { this.renderActivityRow }
                            />
                break;
            case 0:
            default:
                subView = <ListPagingComponent
                            key = { tabIndex }
                            ItemSeparatorComponent = { Slot }
                            url = { `${ config.ajaxPath }/rest/post/list` }
                            params = {{ sectionId : 1, }}
                            renderRow = { this.renderDynamicRow }
                        />
                break;
        }
        return (
        	<ScrollView style = { styles.container }>
        		<UserHeadPic onDirectMsg = { this.directMessage } onSubscribe = { this.subscribe } isSelf = { personalInfo.isSelf } headPic = { personalInfo.picture } uid = { uid } isSubscribe = { personalInfo.isContact }/>
        		<UserInfoSection name ={ personalInfo.name } tags = { personalInfo.custTagVos } gender = { personalInfo.sex } level = { personalInfo.level } />
        		<Slot/>
                <Tabs selected={ tabIndex }
                    style={ [styles.tabs] }
                    iconStyle = { styles.tabIcon }
                    onSelect={ el => this.handleTabSelect( el ) }>
                    <View style = { [ styles.tab, tabIndex === 0 && styles.tabSelect ] } name = { 0 }>
                        <Text style = { [ { fontSize : 16 },tabIndex === 0 ? _styles.selectedTextColor : _styles.descTextColor ] }>动态</Text>
                    </View>
                    <View style = { [ styles.tab, tabIndex === 1 && styles.tabSelect] } name = { 1 }>
                        <Text style = { [ { fontSize : 16 },tabIndex === 1 ? _styles.selectedTextColor : _styles.descTextColor ] }>活动</Text>
                    </View>
                </Tabs>
                <View style={styles.subContainer}>
                  { subView }
                </View>
        	</ScrollView>
        )
    }
}

const UserHeadPic = props => {
    let {
            headPic,
            uid,
            isSelf,
            isSubscribe,
            onSubscribe,
            onDirectMsg,
        } = props;
	return (
		<View style = {{ alignItems:"center" }}>
			<Image style = {{ width: Dimensions.get("window").width }} source = { require("../../images/personal/pic_beijing.png")}/>
			<View style = { styles.header }>
				{ !isSelf && <View style = { [styles.centerButtonWrap,{ marginRight: 26 }] }>
    					<TouchableOpacity onPress = { () => onSubscribe( isSubscribe, uid ) }>
    						<View style = { [ styles.centerButton,{ backgroundColor : "#fff" } ] }>
        						<Image source = { isSubscribe ? buttonImage[0].selected : buttonImage[0].init }/>
        					</View>
    					</TouchableOpacity>
    					<Text style = { styles.centerButtonText }>{ isSubscribe ? "已关注" : "关注"}</Text>
    				</View>
                }
				<View style = { styles.headPicWrap }>
					<Image style = { styles.headPicImage } source = { { uri: headPic } }/>
				</View>
                {
                    !isSelf && <View style = { [styles.centerButtonWrap,{ marginLeft: 26 }] }>
                        <TouchableOpacity onPress = { () => onDirectMsg( uid ) }>
                            <View style = { styles.centerButton }>
                                <Image source = { buttonImage[1] }/>
                            </View>
                        </TouchableOpacity>
                        <Text style = { styles.centerButtonText }>私信</Text>
                    </View>
                }
			</View>
		</View>
	)
}

const UserInfoSection = props => {
    let {
            level,
            tags,
            name,
            gender
        } = props;
	return (
		<View style = { styles.userInfoSection }>
			<View style = { styles.userInfo }>
				<Text style = {[_styles.textColor,{ fontSize: 18 },]}>{ name }</Text>
                <LevelLabel style = {{ marginLeft : 5 }}>{ level }</LevelLabel>
				<Image style = { styles.gender } source = { gender === 2 ? genderImage.female : genderImage.male }/>
			</View>
			<View style = { styles.tagList }>
                {
                    Array.isArray( tags ) && tags.map( ( v, k ) => {
                        return <Tag key = { v.tagId } style = { [ styles.tagStyle, ( k === 0 ? { marginLeft:0 } : {} ) ] } textStyle = {{ fontSize : 12 }}>{ v.tagName }</Tag>
                    })
                }
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flex:1,
	},
	header : {
		position:"absolute",
		top:80,
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
	},
	centerButtonWrap:{
		justifyContent:"center",
		alignItems:"center",
	},
	centerButton: {
		marginTop:24,
		borderColor:"#fff",
		borderWidth:2,
		height:42,
		width:42,
		justifyContent:"center",
		alignItems:"center",
		borderRadius:42,
		overflow:"hidden",
	},
	centerButtonText:{
		backgroundColor:"transparent",
		fontSize:12,
		color:"#fff",
		marginTop:12,
	},
	headPicWrap : {
		// backgroundColor:"#fff",
		justifyContent:"center",
		alignItems:"center",
		borderColor:"#fff",
		borderWidth:2,
		height:150,
		width:150,
		borderRadius:150,
		overflow:"hidden",
	},
	headPicImage:{
		height:150,
		width:150,
        ...Platform.select({
            borderRadius:150,
            overflow:"hidden",
    	})
    },
	userInfoSection: {
        backgroundColor: "transparent",
        paddingTop: 40,
        marginBottom: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    userInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    gender: {
        marginLeft: 10,
        height: 15,
        width: 15
    },
    tagList: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    tagStyle: {
        marginLeft: 10,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0,
        paddingBottom: 0
    },
    subContainer : Object.assign({},_styles.bgColor,{
        flex:1,
    }),
    tabs:Object.assign({},_styles.bgColor,_styles.contentBorderColor,{
        position:"relative",
        justifyContent:"center",
        borderBottomWidth: 1 / PixelRatio.get(),
    }),
    tabIcon : {
        flex:0,
    },
    tab:{
        marginLeft:15,
        paddingTop: 14,
        width:120,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor : "transparent",
        borderBottomWidth : 2,
    },
    tabSelect : Object.assign({},_styles.selectedBorderColor,{
    }),
    imagePreview : {
        width : imagePreviewWAH,
        height : imagePreviewWAH,
        marginRight:10,
        marginLeft:0,
    }
})