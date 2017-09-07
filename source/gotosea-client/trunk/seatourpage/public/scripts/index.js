import "styles/common.less"
import "styles/layout.less"
import "styles/clndr.less"
import "styles/route.less"

import 'babel-polyfill'
import 'utils/polyfill'
import React from "react"
import ReactDOM from "react-dom"
import route from './config/route'
import configureStore from './config/store' 
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();
import Tool from 'utils/tool'


let store = configureStore();
let rootEl = document.getElementById("hyhl");
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter forceRefresh = { !( 'pushState' in window.history ) } basename = { '/seatourpage' }>
			{ route }
		</BrowserRouter>
	</Provider>,
	rootEl
);
