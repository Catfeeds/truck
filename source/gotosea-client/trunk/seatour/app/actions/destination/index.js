import Tool from 'utils/tool'

export const actionTypes = {
	LOAD : 'app/actions/destination/load_destination_list'
}

//加载目的地列表
export function loadDestination(){
	return dispatch => Tool.get(`${ config.ajaxPath }/rest/prod/dest/list`)
	.then( data => dispatch({
		type : actionTypes.LOAD,
		data,
	}))
}