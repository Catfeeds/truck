
import {
	ACTION_LIST,
	UPDATE_PARAMS
} from '../../actions/action-type';

import { initState } from '../../actions/line/list'

export default function list(state = initState, action ){
	switch (action.type){
		case ACTION_LIST :
			return Object.assign({}, state, {list: action.data, paging: action.paging});
		case UPDATE_PARAMS :
			return Object.assign({}, state, {params: action.data});
		default :
			return state;
	}
}
