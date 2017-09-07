export const actionTypes = {
	SET_ACTIVITY_TITLE : 'app/actions/activity/publish/set_activity_title',
	ADD_DESTINATION : 'app/actions/activity/publish/add_destination',
	SET_ACTIVITY_DATE : 'app/actions/activity/publish/set_activity_date',
	SET_GATHER_DATE : 'app/actions/activity/publish/set_gather_date',
	SET_TRAVEL_NUMBER : 'app/actions/activity/publish/set_travel_number',
	SET_AA_PROJECT : 'app/actions/activity/publish/set_aa_project',
	SET_DIY_PROJECT : 'app/actions/activity/publish/set_diy_project',
	SET_ACTIVITY_CONTENT : 'app/actions/activity/publish/set_activity_content',
	SET_ONLY_FRIEND : 'app/actions/activity/publish/set_only_friend',
	SET_PUBLISH_TYPE : 'app/actions/activity/publish/set_publish_type',
}

//设置活动标题
export function setActivityTitle( data ){
	return {
		type : actionTypes.SET_ACTIVITY_TITLE,
		data,
	}
}
//添加目的地
export function addDestination( data ){
	return {
		type : actionTypes.ADD_DESTINATION,
		data,
	}
}
//设置活动日期
export function setActivityDate( startDate, endDate ){
	return {
		type : actionTypes.SET_ACTIVITY_DATE,
		startDate,
		endDate,
	}
}
//设置集合日期
export function setGatherDate( data ){
	return {
		type : actionTypes.SET_GATHER_DATE,
		data,
	}
}
//设置出行人数
export function setTravelNumber( minPeople, maxPeople ){
	return {
		type : actionTypes.SET_TRAVEL_NUMBER,
		minPeople,
		maxPeople,
	}
}
//设置AA付费项目
export function setAAProject( data ){
	return {
		type : actionTypes.SET_AA_PROJECT,
		data,
	}
}
//设置自选付费项目
export function setDIYProject( data ){
	return {
		type : actionTypes.SET_DIY_PROJECT,
		data,
	}
}
//设置活动详情
export function setActivityContent( data ){
	return {
		type : actionTypes.SET_ACTIVITY_CONTENT,
		data,
	}
}
//设置只对朋友可见
export function setOnlyFriend( data ){
	return {
		type : actionTypes.SET_ONLY_FRIEND,
		data,
	}
}
//设置发布类型
export function setPublishType( data ){
	return {
		type : actionTypes.SET_PUBLISH_TYPE,
		data,
	}
}