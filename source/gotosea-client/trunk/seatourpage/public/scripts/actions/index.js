import Promise from 'promise'
import Tool from 'utils/tool'
import {
    LOGOUT_USER,
    RESET_ORDER_INFO,
} from 'actions/action-types'

export function resetOrder() {
    return {
        type: RESET_ORDER_INFO
    }
}

// 注销
export function logout() {
    return dispatch => new Promise((resolve, reject) => {
            Tool.ajax(`${ config.ajaxPath }wechat/user/logout`, null, () => resolve())
        })
        .then(() => dispatch({
            type: LOGOUT_USER
        }))
}
