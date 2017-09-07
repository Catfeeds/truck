import React, { Component } from 'react';
import { connect} from 'react-redux'
import 'styles/container/line/list.less'

import Tool from 'utils/tool';

import { loadLineList } from 'actions/line/list';

class LineList extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		let {
			dispatch,
			listParams,
			list,
			paging,
		} = this.props;
		Tool.setTitle('列表');
		if (!list) {
			dispatch(loadLineList(list, null, false))
		}
	}
	render() {
		let {
			list
		} = this.props;
		return (
			<div className = 'line_list'>
			{
				list && list.map( (v ,index) => {
					return( 
						<div className = 'line_list_item' key = {index} onClick = { ()=>Tool.to('detail') }>
							<div className = 'line_list_item_content'>
								{v.name}
							</div>
						</div>
					)
				})
			}
			</div>
		)
	}
}

export default connect(state => ({
	list: state.line.list.list
}))(LineList)