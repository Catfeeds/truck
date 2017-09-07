
import { combineReducers } from 'redux';
import line from './line/index';
import images from 'reducers/images'
import activity from 'reducers/activity'
import destination from 'reducers/destination'

const reducer = combineReducers({
	line,
	images,
	activity,
	destination,
});

const rootReducer = (state, action) =>{
	return reducer(state, action)
}

export default rootReducer;
