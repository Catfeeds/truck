import Tool from '../../utils/tool';
import {
	ACTION_LIST,
	UPDATE_PARAMS
} from '../action-type';

const paging = {
  pageSize: 5,
  currentPage: 1,
  totalPages: null
};

export const initState = {
	paging,
	list: [],
	params:{}
}

export function loadList(cmp, list, params, callback, loadMore, loadFirst ){
	if(loadFirst)paging.currentPage = 1;
	if(loadMore)paging.currentPage += 1
	if(loadMore||loadFirst)cmp = null;
 	params = Object.assign({}, params, paging);
	return dispatch => new Promise((resolve, reject) => {
		Tool.fetch(cmp, `${config.appUrlPath}wechat/route/list`, 'post', params, ret => resolve(ret))
	})
	.then(ret =>{
		let datas = [];
		if(loadMore){
			datas = list.concat(ret.pageData||[]);
		}else
			datas = Tool.concat(ret.pageData||[]);
		if( Tool.isFunction(callback) )callback.apply(this, arguments);
		paging.currentPage = ret.currentPage;
		paging.totalPages = ret.totalPages;
		dispatch ({
			type: ACTION_LIST,
			data: datas,
			paging: paging
		})
	})
	.then( ret => {
		dispatch(updateParams(params))
	})

}

export function updateParams( params ){
	return {
		type: UPDATE_PARAMS,
		data: params
	}
}
