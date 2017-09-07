import { combineReducers } from 'redux'
import line from 'reducers/line'

import {
    LOGOUT_USER,
    RESET_ORDER_INFO,
} from 'actions/action-types'

const appReducer = combineReducers({
    line,
});
const rootReducer = (state, action) => {
    console.info(action.type)
    switch (action.type) {
            // 注销
        case LOGOUT_USER:
            state.user = undefined;
            break;
            // 发起订单表单数据
        case RESET_ORDER_INFO:
            state.order = undefined;
            break;
    }
    return appReducer(state, action)
}
export default rootReducer;
