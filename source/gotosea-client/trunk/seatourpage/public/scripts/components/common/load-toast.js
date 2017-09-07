import React,{ Component } from 'react';
import 'styles/common/load-toast.less';

export default class LoadToast extends Component {
	constructor(props) {
	   super(props);
	   this.state={
	   		show : true,
	   		msg : "",
	   		closeable : false,
	   }
	}
	hide(){
		if( !!this.state.show )
			this.setState( Object.assign( {}, this.state, { show : false } ) );
	}
	close(){
		if( this.state.closeable )
			this.hide();
	}
	show( msg, closeable ){
		if( !this.state.show )
			this.setState( Object.assign( {}, this.state, { show : true , msg, closeable } ) );
	}
    render() {
	    return (
	    	<div style = { { display : ( this.state.show ? "block" : "none" ) } }>
				<div className="ui-loading-block">
				    <div className="ui-loading-cnt">
				      <i className="ui-loading-bright"></i>
				      <p>{ this.state.msg || "数据加载中"}</p>
				   </div>
				</div>
			</div>
	    )
  }
}

