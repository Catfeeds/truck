import React, { Component } from 'react';
import 'styles/common/dialog.less'

export default class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			title: "",
			info: "",
			btnText: "确定",
			closeByMask: true,
		}
	}
	onTouchTap() {
		this.hide();
		typeof this.state.fn === "function" && this.state.fn();
	}
	hide() {
		if (this.state.closeByMask)
			this.setState(Object.assign({}, this.state, {
				show: false
			}));
	}
	show(title, info, fn, btnText, closeByMask) {
		this.setState(Object.assign({}, this.state, {
			show: true,
			title,
			info,
			fn,
			btnText,
			closeByMask
		}));
	}
	render() {
		let {
			show,
			title,
			info,
			btnText,
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
				        <div className="ui-dialog-ft" onClick = { ()=>{ this.hide() } }>
							<div className = 'alert-ok'> {btnText || '确定'} </div>
				        </div>
				    </div>        
				</div>
			</div>
		)
	}
}