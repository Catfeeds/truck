import {
	createStore, 
	applyMiddleware, 
	compose
} from 'redux'
import Tool from 'utils/tool'
import thunk from 'redux-thunk';
/*thunk支持异步加载*/
import reducer from '../reducers';  
/*es6会默认引入reducers文件下的index*/


const composedCreateStroe = compose(
	applyMiddleware(thunk)
)(createStore);

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

function configureStore(initalState = {}){
	const store = composedCreateStroe(reducer);
	if( process.env.NODE_ENV !== 'production'){
		store.subscribe( function( action ){
			console.info(store.getState())
		});
	}
	return store;
}

export default Tool.singleton( configureStore );
