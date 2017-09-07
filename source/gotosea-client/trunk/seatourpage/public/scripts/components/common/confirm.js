import React, { Component } from 'react';
import 'styles/common/dialog.less'

export default class Confirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			title: "",
			info: "",
			fn: null,
		}
	}
	hide() {
		this.setState(Object.assign({}, this.state, {
			show: false
		}));
	}
	submitHandle() {
		let {
			fn
		} = this.state;
		this.hide();
		if (typeof fn === "function")
			fn();
	}
	show(title, info, fn) {
		this.setState(Object.assign({}, this.state, {
			show: true,
			title,
			info,
			fn
		}));
	}
	render() {
		let {
			title,
			info
		} = this.state;
		return (
			<div style = { { display : ( this.state.show ? "block" : "none" ) } }>
				<div className="ui-dialog">
				    <div className="ui-dialog-cnt">
				      <div className="ui-dialog-hd ui-border-b">
				            {title}
				        </div>
				        <div className="ui-dialog-bd">
				          {info}
				        </div>
				        <div className="ui-dialog-ft ui-dialog-confirm">
				            <a href="javascript:void(0);" onClick = { () => this.hide() } className="ui-dialog-cancel ui-dialog-text">取消</a>
				            <a href="javascript:void(0);" onClick = { () => this.submitHandle() } className="ui-dialog-primary ui-dialog-text">确定</a>
				        </div>
				    </div>        
				</div>
			</div>
		)
	}
}