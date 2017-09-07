import { 
	initState,
} from 'actions/line/list'
import {
    LOAD_LINE_LIST,
    UPDATE_LINE_PARAMS,
} from 'actions/action-types'

export default function list( state = initState, action ){

	switch( action.type ){
		case LOAD_LINE_LIST:
			return Object.assign( {}, state, { list : action.list } )
		case UPDATE_LINE_PARAMS:
			return Object.assign( {}, state, { listParams : action.data } )			
		default:
			return state;
	}
}