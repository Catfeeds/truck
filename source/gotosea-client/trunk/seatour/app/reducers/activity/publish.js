import { actionTypes } from 'actions/activity/publish'

const {
		SET_ACTIVITY_TITLE,
		ADD_DESTINATION,
		SET_ACTIVITY_DATE,
		SET_GATHER_DATE,
		SET_TRAVEL_NUMBER,
		SET_AA_PROJECT,
		SET_DIY_PROJECT,
		SET_ACTIVITY_CONTENT,
		SET_ONLY_FRIEND,
		SET_PUBLISH_TYPE,
	} = actionTypes
let initState = {
	title : '',
	destination : "",
	startDate : '',
	endDate : '',
	gatherDate : '',
	minPeople : 0,
	maxPeople : 0,
	AAProjects : [],
	DIYProjects : [],
	activityContent : '',
	onlyFriend : false,
	publishType : 1,
}

export default function( state = initState, action ){

	switch( action.type ){
		case SET_ACTIVITY_TITLE:
			return Object.assign({}, state, { title : action.data })
		case ADD_DESTINATION:
			return Object.assign({}, state, { destination : action.data })
		case SET_ACTIVITY_DATE:
			return Object.assign({}, state, { startDate : action.startDate, endDate : action.endDate })
		case SET_GATHER_DATE:
			return Object.assign({}, state, { gatherDate : action.data })
		case SET_TRAVEL_NUMBER:
			return Object.assign({}, state, { minPeople : action.minPeople, maxPeople : action.maxPeople })
		case SET_AA_PROJECT:
			return Object.assign({}, state, { AAProjects : action.data })
		case SET_DIY_PROJECT:
			return Object.assign({}, state, { DIYProjects : action.data })
		case SET_ACTIVITY_CONTENT:
			return Object.assign({}, state, { activityContent : action.data })
		case SET_ONLY_FRIEND:
			return Object.assign({}, state, { onlyFriend : action.data })
		case SET_PUBLISH_TYPE:
			return Object.assign({}, state, { publishType : action.data })
		default:
			return state
	}

}