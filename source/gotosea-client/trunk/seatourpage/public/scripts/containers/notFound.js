import React, {PropTypes, Component} from 'react';
import Tool from 'utils/tool'

class NotFound extends Component {

  constructor(props) {
    super(props)
  }
	toIndex(e){
		Tool.to("line/list/1");
	}
  render() {
		let root = config.projectRoot;
    return (
      <div>
        <div style={{textAlign: 'center',padding:'30% 0'}}>
          <h1>404</h1>
          <h2 style = {{ lineHeight: '100px'}}>页面没找到...</h2>
        </div>
      </div>
    )
  }
}

export default NotFound;
