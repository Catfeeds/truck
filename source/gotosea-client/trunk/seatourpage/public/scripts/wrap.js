import React from 'react'
import {withRouter} from "react-router-dom"
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
let _getHistory;

export function getHistory(){ 
	return _getHistory();
}

class WrapComponent extends React.Component{
	componentDidUpdate(){
		window.scrollTo(0, 0)
	}
	componentWillMount(){
		if( !_getHistory )
			_getHistory = () => this.props.history
	}
	componentDidMount(){
		console.info( this.props )
		_getHistory = () => this.props.history
	}
	render(){
		return (
			<ReactCSSTransitionGroup component='div' transitionAppearTimeout={500} transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={10}>
				{React.cloneElement(this.props.children || <div />, {key: this.props.location.pathname})}
			</ReactCSSTransitionGroup>
		)
	}
}

export default withRouter( WrapComponent )