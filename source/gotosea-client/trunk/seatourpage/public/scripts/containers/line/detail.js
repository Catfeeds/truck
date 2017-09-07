import React, {Component} from 'react';
import { connect } from 'react-redux'

import Tool from 'utils/tool';

class Detail extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		Tool.setTitle('详情')
	}
	render() {

		return (
			<div className = 'line_list'>
				this is another test page 
				<div style = {{ width:'100%', lineHeight: '40px', textAlign:'center'}} onClick = { ()=>Tool.back() }>Back</div>
			</div>
		)
	}
}

export default Detail;