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
    Switch,
    Dimensions,
} from 'react-native';
import _styles from 'components/commonStyles'
import Slot from './component/slot'
import List from './component/list'
import isEmpty from 'lodash/isEmpty'
import findIndex from 'lodash/findIndex'
import ProjectOptions from './component/ProjectOptions'
import { connect } from 'react-redux'
import {
		setActivityTitle,
		addDestination,
		setActivityDate,
		setGatherDate,
		setTravelNumber,
		setAAProject,
		setDIYProject,
		setActivityContent,
		setOnlyFriend,
		setPublishType,
	} from 'actions/activity/publish'
import {
	loadDestination
} from 'actions/destination'
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux'
import Modal from 'react-native-modalbox'
import Tool from 'utils/tool'
import DateTool from 'utils/date-tool'
import PropTypes from 'prop-types'
import { Calendar } from 'react-native-calendars'
import Picker,{ TravelPeoplePicker, DateTimePicker } from './component/Picker'

const selectedImage = [
    {
        init : require("../../images/community/btn_xuanze_n.png"),
        selected : require("../../images/community/btn_xuanze_s.png")
    },
],publishTypes = [
	{
		value : 1,
		text : "海钓"
	},
	{
		value : 2,
		text : "海岛游",
	}
]

class ActivityPublicApp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	Title( props ){
        let {
            disabled
        } = props,
        style = {};
        if( disabled ) style = { opacity: 0.3 }
        return <Text style = { style }>发布</Text>
    }
	componentDidMount(){
		// Actions.refresh({
		// 	onRight : () => this.handleOnRight(),
		// 	rightTitle : "发布"
		// })
		Actions.refresh({
    		hideNavBar : false,
			onRight : function(){},
            rightTitle : <this.Title disabled = { true }/>,
    	})
	}
	/**
     * 更新右上角的发布按钮状态
     */
    componentDidUpdate(){
        let {
        		title,
				destination,
				startDate,
				endDate,
				gatherDate,
				minPeople,
				maxPeople,
				AAProjects,
				DIYProjects,
				activityContent,
				onlyFriend,
				publishType,
	        } = this.props.activityForm,
	        noEmpty = false;
        if( title && destination && startDate && gatherDate && minPeople && ( AAProjects.length > 0 || DIYProjects.length > 0 ) &&
        	activityContent ) noEmpty = true
        //内容不为空 并且 当前按钮不能点击的情况下才进行更新（添加可点击操作）
        if( noEmpty && !this.submitable ){
            this.submitable = true
            Actions.refresh({
                rightTitle : <this.Title/>,
                onRight : this.handleOnRight,
            })
        //内容为空。并且 当前按钮可以点击的情况下才进行更新（撤销可点击操作）
        }else if( !noEmpty && this.submitable ){
            this.submitable = false
            Actions.refresh({
                rightTitle : <this.Title disabled = { true }/>,
                onRight : function(){},
            })
        }
    }
	/**
	 * 发布按钮
	 */
	handleOnRight = ()=>{
		let {
				destinationList,
				activityForm,
			} = this.props,
			{
				title,
				destination,
				startDate,
				endDate,
				gatherDate,
				minPeople,
				maxPeople,
				AAProjects,
				DIYProjects,
				activityContent,
				onlyFriend,
				publishType,
			} = activityForm;
		Tool.post(`${ config.ajaxPath }/rest/post`,{
			businessUnitId : publishType,
			activityTitle : title,
			summary : activityContent,
			destination :destinationList[ findIndex( destinationList, o => o.name === destination )].id,
			beginDate: startDate,
			endDate,
			gatherTime : gatherDate,
			minCustomers : minPeople,
			maxCustomers : maxPeople,
			onlyForMutaulFans : onlyFriend ? 1 : 0,
			activityServiceDtos : AAProjects.map( v => ({
				serviceId : v.serviceId,
				activityServiceType : v.activityServiceType,
				serviceTime : v.serviceTime,
				serviceNum : 1,
				pubResourceId : v.spot.key,
			})).concat( DIYProjects.map( v => ({
				serviceId : v.serviceId,
				activityServiceType : v.activityServiceType,
			})))
		}, 3 ).then( () => Actions.activityPublishSucc() )
	}
	/**
	 * 选额服务项目
	 * 
	 * @param  {String} type  AA | DIY
	 * @return {[type]}      [description]
	 */
	redirectFishList = type =>{
		let {
			destination
		} = this.props.activityForm;
		if( !destination ) return Tool.alert("请选择目的地")
		Actions.routelist({ projectType: type , destination })
	}
	/**
	 * 发布类型
	 * @param  {[type]} value [description]
	 */
    handleChangeByPublishType = value => {
        this.props.dispatch( setPublishType( value ) )
    }
    /**
     * 仅朋友可见
     * @param  {[type]} value [description]
     */
    handleChangeByOnlyFriend = value =>{
    	this.props.dispatch( setOnlyFriend( value ) )
    }
    /**
     * 文本输入框值改变事件处理
     * @param  {[type]} name [description]
     * @param  {[type]} text [description]
     */
    handleChangeText( name, text ){
    	let {
	    		dispatch
	    	} = this.props;
    	switch( name ){
    		case "title":
    			return dispatch( setActivityTitle( text ) )
    		case "activityContent":
    			return dispatch( setActivityContent( text ) )
    		default:
    			return
    	}
    }
    /**
     * 显示选择目的地
     * @return {[type]} [description]
     */
    toggleDestinationPicker = () => {
    	let {
			dispatch,
			destinationList,
		} = this.props;
		( !isEmpty( destinationList ) ? Promise.resolve() : dispatch( loadDestination() ) )
		.then( () => this.destinationPicker.open() )
    }
    /**
     * 选择目的地
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    handleChangeByDestination = value => {
    	let {
    		dispatch,
    	} = this.props;
		dispatch( addDestination( value[0] ) )
	}
    /**
     * 显示选择集合时间
     * @return {[type]} [description]
     */
    toggleGatherTimePicker = () => {
    	this.gatherTimePicker.open()
    }
    /**
     * 选择集合时间
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    handleChangeByGatherTime = data =>{
    	this.props.dispatch( setGatherDate ( data.join("").replace(/(年|月|日|时|分)/g, a => {
    		switch( a ){
    			case "年":
    			case "月":
    				return "-"
    			case "日":
    				return " "
    			case "时":
    				return ":"
    			case "分":
    				return ""
    			default:
    				return a
    		}
    	})))
    }
    /**
     * 显示选择出行人数
     * @return {[type]} [description]
     */
    toggleTravelPeoplePicker = () => {
    	this.travelPeoplePicker.open()
    }
    /**
     * 选择最大出行人数
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    handleChangeByTravelPeople = data =>{
    	let {
    			dispatch,
	    	} = this.props;
		dispatch( setTravelNumber( parseInt( data[0] ), parseInt( data[1] ) ) )
    }
    /**
     * 最大出行人数组件
     * @param  {Object} props
     * @return {React.Element}
     */
    TravelPeopleText = props =>{
    	let {
    		minPeople,
    		maxPeople
    	} = props;
    	if( minPeople !== maxPeople ){
			return <Text>{ minPeople }-{ maxPeople }人</Text>
		}else if( minPeople ){
			return <Text>{ minPeople }人</Text>
		}
		return null
    }
    /**
     * 显示选择活动日期
     */
    toggleCalendar = () => {
		this.activityDateCalendar.open()
    }
    /**
     * 选择活动日期
     * @param  {[type]} startDate [description]
     * @param  {[type]} endDate   [description]
     * @return {[type]}           [description]
     */
    handleSelectedActivityDate = ( startDate, endDate = {} ) =>{
    	this.props.dispatch( setActivityDate( startDate.dateString, ( endDate || {} ).dateString ) )
    }
    /**
     * 活动日期组件
     * @param  {Object} props
     * @return {React.Element}
     */
    ActivityDateText = props =>{
    	let {
    		startDate,
    		endDate
    	} = props;
    	if( startDate && endDate ){
			return <Text>{ startDate }至{ endDate }</Text>
		}else if( startDate ){
			return <Text>{ startDate }</Text>
		}
		return null
    }
    /**
     * 渲染ProjectOption价格
     * @param  {[type]} props [description]
     * @return {[type]}       [description]
     */
    renderPrice(props){
    	return <Text style = {{ fontSize : 18, color: "#f04309" }}>￥{ props.price }</Text>
    }
    /**
     * 删除一项服务项目
     * @param  {[type]} type  [description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    handleOnDeleteProject( type, index ){
    	let {
	    		dispatch,
	    		activityForm,
	    	} = this.props,
	    	{
	    		AAProjects,
	    		DIYProjects,
	    	} = activityForm,
	    	newProject;
    	switch( type ){
    		case "AA":
    			newProject = [ ...AAProjects ]
    			newProject.splice( index, 1 )
    			return dispatch( setAAProject( newProject ) )
    		case "DIY":
    			newProject = [ ...DIYProjects ]
    			newProject.splice( index, 1 )
    			return dispatch( setDIYProject( newProject ) )
    		default:
    		break;
    	}
    }
	render(){
		let {
				destinationList,
				activityForm,
			} = this.props,
			{
				title,
				destination,
				startDate,
				endDate,
				gatherDate,
				minPeople,
				maxPeople,
				AAProjects,
				DIYProjects,
				activityContent,
				onlyFriend,
				publishType,
			} = activityForm,
			activityDate,
			_destinationList = [];
		if( destinationList.length > 0 ){
			_destinationList = destinationList.map( v => v.name )
		}
		// console.info( AAProjects, DIYProjects )
		return (
			<View style = {{ flex: 1 }}>
				<ScrollView style = { styles.container }>
					<View style = { _styles.bgColor }>
						<View style = { styles.titleInput }>
							<View>
		                    	<TextInput value = { title } onChangeText = { text => this.handleChangeText('title', text )} underlineColorAndroid="transparent" editable placeholderTextColor = { _styles.descTextColor.color } style = {[ _styles.textColor, _styles.fontSize, { height:20, padding:0, paddingLeft:15, paddingRight: 15 }]} placeholder = "活动标题"></TextInput>
		                    </View>
						</View>
						<List style = {{ borderTopWidth:0 }} onPress = { this.toggleDestinationPicker }>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>目的地</Text>
							{ !!destination && <Text>{ destination }</Text>}
						</List>
						<List style = {{ borderTopWidth:0 }} onPress = { this.toggleCalendar }>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>活动日期</Text>
							<this.ActivityDateText startDate = { startDate } endDate = { endDate }/>
						</List>
						<List style = {{ borderTopWidth:0 }} onPress = { this.toggleGatherTimePicker }>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>集合时间</Text>
							{ !!gatherDate && <Text>{ gatherDate }</Text> }
						</List>
						<List style = {{ borderTopWidth:0 }} onPress = { this.toggleTravelPeoplePicker }>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>出行人数</Text>
							<this.TravelPeopleText minPeople = { minPeople } maxPeople = { maxPeople }/>
						</List>
						
						<List style = {{ borderTopWidth:0,borderBottomWidth: 0, }} onPress = { () => this.redirectFishList("AA") }>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>AA付费项目</Text>
						</List>
						<View style = { styles.projects }>
							{/*<ProjectOptions deletabled = { true } renderRight = { this.renderPrice } price = { 111 } style = { styles.projectOptions } cover = {{ uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" }}>*/}
							{
								Array.isArray( AAProjects ) && AAProjects.map( ( v, k ) => <ProjectOptions onDelete = { () => this.handleOnDeleteProject("AA", k ) } deletabled = { true } renderRight = { this.renderPrice } price = { v.spot.preferPrice } deletabled = { true } key = { v.serviceId } title = { v.title } desc = { `矶钓点：${ v.spot.value }`} style = { styles.projectOptions } cover = {{ uri: v.cover }}/>)
							}
						</View>
						
						<List style = {{ borderBottomWidth:0,borderTopWidth:0 }} onPress = { () => this.redirectFishList("DIY") }>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>自选付费项目</Text>
							<Text style = {[ _styles.descTextColor,{ fontSize : 10 }]}>选择项目供大家参考</Text>
						</List>
						<View style = { styles.projects }>
							{
								Array.isArray( DIYProjects ) && DIYProjects.map( ( v, k ) => <ProjectOptions onDelete = { () => this.handleOnDeleteProject("DIY", k ) } deletabled = { true } key = { v.serviceId } title = { v.title } style = { styles.projectOptions } cover = {{ uri: v.cover }}/>)
							}
							{/*<ProjectOptions style = { styles.projectOptions } cover = {{ uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" }}></ProjectOptions>
							<ProjectOptions style = { styles.projectOptions } cover = {{ uri: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3002949908,779514991&fm=58" }}></ProjectOptions>*/}
						</View>
						
						<Slot/>
						<View style = { [ _styles.contentBorderColor, { height: 40, justifyContent: "center", borderBottomWidth : 1, marginLeft : 15 }]}>
							<Text style = {[ _styles.fontSize, _styles.textColor ]}>活动详情</Text>
						</View>
						<View style = { [_styles.contentBorderColor,{ borderBottomWidth : 1 }]}>
		                    <TextInput value = { activityContent } onChangeText = { text => this.handleChangeText( 'activityContent', text )} textAlignVertical = "top" underlineColorAndroid="transparent" placeholderTextColor = { _styles.descTextColor.color } multiline style = { styles.contentInput } placeholder = "请输入活动详情"></TextInput>
						</View>

						<Slot/>
						<List style = {{ borderBottomWidth:0,borderTopWidth:0, paddingTop:0, paddingBottom:0,height: 40 }}>
							<View style = {{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
								<Text style = {[ _styles.fontSize, _styles.textColor ]}>该活动只对朋友可见</Text>
								<Switch onValueChange = { this.handleChangeByOnlyFriend } value = { !!onlyFriend }/>
							</View>
						</List>

						<Slot/>
						<View style = { styles.publicText }>
		                    <Text style = {[ _styles.fontSize, _styles.textColor ]}>发布至</Text>
		                    {
		                        publishTypes.map( v => {
		                            return (
		                                <TouchableOpacity onPress = { () => this.handleChangeByPublishType( v.value )} key = { v.value } style = { styles.publicOption }>
		                                    <Image source = { publishType === v.value ? selectedImage[0].selected : selectedImage[0].init }/>
		                                    <Text style = {[ { marginLeft: 5 }, _styles.fontSize, _styles.textColor ]}>{ v.text }</Text>
		                                </TouchableOpacity>
		                            )
		                        })
		                    }
		                </View>
		            </View>
					<View style = {{ padding: 15 }}>
						<Text style = { [_styles.descTextColor,{ fontSize: 11}]}>发布活动即同意<Text style = {{ color : _styles.themeColor }}>《海约活动服务协议》</Text></Text>
					</View>
				</ScrollView>
				{
					_destinationList.length > 0 && (
						<Picker pickerTitleText = "请选择目的地" onPickerConfirm = { this.handleChangeByDestination } selectedValue = { [ destination || _destinationList[0] ] } pickerData = { _destinationList } ref = { el => this.destinationPicker = el }/>
					)
				}
				<ActivityCalendar onSelected = { this.handleSelectedActivityDate } calendarRef = { el => this.activityDateCalendar = el }/>
				<TravelPeoplePicker maxNumber = { 20 } pickerRef = { el => this.travelPeoplePicker = el } pickerTitleText = "请选择出行人数" onPickerConfirm = { this.handleChangeByTravelPeople } selectedValue = { [ minPeople, maxPeople ] }/>
				<DateTimePicker pickerRef = { el => this.gatherTimePicker = el } pickerTitleText = "请选择集合时间" onPickerConfirm = { this.handleChangeByGatherTime }/>
			</View>
		)
	}
}

/*class MyPicker extends React.Component{
	constructor(props) {
		super(props);
	
		this.state = {};
	}
	static defaultProps = {
		onPickerConfirm : function(){},
		onPickerCancel : function(){},
		pickerRef : function(){}
	}
	pickerOnClose(){
    	Picker.hide()
	}
	open(){
		let {
			pickerRef,
			onPickerConfirm,
			onPickerCancel,
			...others
		} = this.props;
		Picker.init({
			// pickerTitleText: "请选择出行人数",
			pickerConfirmBtnText: '确定',
			pickerCancelBtnText: '取消',
			...others,
			// selectedValue : [ minPeople, maxPeople ],
			// pickerData : [ this.travelNubmerSet, this.travelNubmerSet ],
			onPickerConfirm: data => {
				// dispatch( setTravelNumber( data[0], data[1] ) )
				
				this.picker.close()
				onPickerConfirm( data )
			},
			onPickerCancel: () =>{
				this.picker.close()
				onPickerCancel()
			}
		})
		this.picker.open();
		Picker.show()
	}
	close(){
		this.picker.close()
		Picker.hide()
	}
	render(){
		let {
			pickerRef
		} = this.props;
		return (
			<Modal onClosed = { this.pickerOnClose } style = {{ height:0 }} ref = { el => this.picker = el } />
		)
	}
}*/

/**
 * 活动日历选择器
 * 支持单选 多选
 */
export class ActivityCalendar extends React.Component{
	constructor(props) {
		super(props);
		this.markColor = [{ textColor : "#fff", color : _styles.themeColor, selected: true }]
		this.state = {
			startDate : null,
			endDate : null,
			completeable : false,
		};
	}
	static propTypes = {
		onSelected : PropTypes.func
	}
	static defaultProps = {
		calendarRef : function(){}
	}
	handleOnDayPress = day => {
		let {
			startDate,
			endDate,
		} = this.state;
		if( !startDate ){
			this.setState({ startDate : day, endDate : null, completeable: true })
		} else if( startDate.timestamp === day.timestamp ){
			this.setState({ startDate : null, endDate : null, completeable : false })
		}else if( day.timestamp < startDate.timestamp ){
			this.setState({ startDate : day, endDate : null, completeable : true })
		}else{
			this.setState( { endDate : day, completeable : true } )
		}
	}
	handleOnPress = () => {
		this.props.onSelected( this.state.startDate, this.state.endDate )
		this.calendar.close()
	}
	componentDidMount(){

	}
	receiveRef = el =>{
		this.props.calendarRef( this.calendar = el )
	}
	render(){
		let {
				calendarRef,
				onSelected,
			} = this.props,
			{
				startDate,
				endDate,
				completeable,
			} = this.state,
			markedDates = {},
			content,
			completeButton;

		if( startDate ){
			markedDates[startDate.dateString] = this.markColor
			content = DateTool.dateToString( startDate.timestamp, "YYYY年MM月DD日" )
		}
		if( endDate ){
			let startTimestamp = startDate.timestamp,
				endTimestamp = endDate.timestamp;
			content = DateTool.dateToString( startTimestamp, "YYYY年MM月DD日" )+'-'+DateTool.dateToString( endTimestamp, "YYYY年MM月DD日")

			while( ( startTimestamp += DateTool.dayOfMs ) <= endTimestamp ) markedDates[ DateTool.dateToString( startTimestamp ) ] = this.markColor
		}
		if( completeable ){
			completeButton = (
				<TouchableOpacity onPress = { this.handleOnPress }>
					<Text style = {[ _styles.fontSize, _styles.selectedTextColor ]}>完成</Text>
				</TouchableOpacity>
			)
		}else{
			completeButton = <Text style = {[ _styles.fontSize, _styles.descTextColor ]}>完成</Text>
		}
		return (
			<Modal backdrop = { true } ref = { this.receiveRef } style = {{ height:370 }} position = "bottom">
				<View style = { styles.calendar }>
					<Text style = {[ _styles.fontSize, _styles.descTextColor ]}>{ content ? content : "点按结束日期或完成" }</Text>
					{ completeButton }
				</View>
				<Calendar
					markedDates = { markedDates }
					markingType = { 'interactive' }
					minDate = { DateTool.dateToString() }
					onDayPress = { this.handleOnDayPress }
					/>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container : Object.assign({}, _styles.contentBgColor,{
		flex: 1
	}),
	titleInput : Object.assign({}, _styles.contentBorderColor,{
		// height:40,
		paddingTop:10,
		paddingBottom:10,
		// justifyContent:"center",
		// alignItems:"center",
		borderBottomWidth : 1,
	}),
	contentInput : Object.assign({}, _styles.textColor,_styles.fontSize,{
		marginTop:11,
		marginBottom:11,
		marginLeft:20,
		marginRight:20,
		height:110,
		padding:0,
	}),
	publicText:{
		// marginBottom: 15,
		paddingLeft:15,
		paddingRight:15,
        // marginTop:15,
        height: 40,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    publicOption:{
        marginLeft:15,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    projectOptions:{
    	marginBottom:10,
    	marginLeft:15,
    	marginRight:15,
    },
    projects:Object.assign({},_styles.contentBorderColor,{
    	borderBottomWidth:1,
    	paddingBottom:5,
    }),
    calendar : {
	    flexDirection: "row",
	    justifyContent: "space-between",
	    alignItems: "center",
	    paddingLeft: 15,
	    paddingRight: 15,
	    height: 40,
	},

})

export default connect( state => ({ 
	destinationList : state.destination,
	activityForm : state.activity.publish 
}))( ActivityPublicApp )