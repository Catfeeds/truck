import Promise from 'promise'
import Tool from 'utils/tool'

// action types
import {
    LOAD_LINE_LIST,
    UPDATE_LINE_PARAMS,
} from 'actions/action-types'

const paging = {
    pageSize: 12,
    currentPage: 1,
    totalPages: 1
};

// init state data
export const initState = {
    list: null,
    listParams: null,
    paging,
}


/**
 * @param {Array} list [旧列表]
 * @param {Object} params [参数]
 * @param {Boolean} loadMore [是否加载更多]
 * @return {type}
 */
export function loadLineList(list, params, loadMore) {
    return dispatch => new Promise((resolve, reject) => {
            Tool.fetch(config.ajaxPath + 'wechat/route/list', params, ret => {
                resolve(ret)
            })
        })
        .catch(e => {
            console.info(e)
        })
        .then(data => {
            let result = {
                    type: LOAD_LINE_LIST,
                }
                // 返回数据为空，初始化分页对象和历史对象到state中
            if (!data || !data.pageData || data.pageData.length === 0) {
                paging.currentPage = 1;
                paging.totalPages = 1;
                result.list = null;
                result.paging = paging;
            } else {
                paging.currentPage = data.currentPage;
                paging.totalPages = data.totalPages;
                result.list = (!!loadMore ? list.concat(data.pageData) : data.pageData);
                result.paging = paging;
            }
            return result;
        })
        .then(result => dispatch(result))
}

export function updateLineParams(listParams) {
    return {
        type: UPDATE_LINE_PARAMS,
        data: listParams
    }
}