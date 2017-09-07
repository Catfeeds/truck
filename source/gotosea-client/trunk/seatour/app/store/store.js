import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// const composedCreateStroe = compose(
// 	applyMiddleware(thunk)
// )(createStore);

const composedCreateStroe = 	applyMiddleware(thunk)(createStore);

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
export default function configureStore(initalState = {}){
	let store = composedCreateStroe(rootReducer,initalState);
	return store;
}
