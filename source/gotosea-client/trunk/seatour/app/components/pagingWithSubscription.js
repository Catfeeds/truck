import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import EmptyList from 'components/EmptyList'
import PropTypes from 'prop-types'
import Tool from 'utils/tool'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function( WrappedComponent ){
    class PagingHandler extends React.PureComponent {
        constructor(props) {
            super(props);
        	this.loading = false;
            this.toggle;
            this.deletage = new Promise( resolve => this.toggle = resolve )
            this.state = {
            	page : 1,
                pageSize : 10,
                totalPages : 1,
                dataSource : []
            };
        }
        static propTypes = {
        }
        static defaultProps = {
        }
        /**
         * 加载数据列表
         * @param  {Number}  page
         * @param  {Boolean} loadMore  使用分页加载
         */
        fetchData = ( page = 1, loadMore = false ) =>{
            let {
                pageSize,
            } = this.state,
            {
                url,
                params
            } = this.props;

        	if( this.loading ) return Promise.reject()
                console.info( url, params )
            return Tool.get( url, Object.assign( {}, params || {}, { page, pageSize } ))
            .then( json => {
                if( Array.isArray( json.content ) ){
                    this.setState( { dataSource : json.content, page, pageSize : json.pageSize, totalPages : json.totalPages })
                }
                this.loading = false
            })
        }
        componentDidMount(){
            this.toggle()
        }
        render() {       	
            return (
            	<WrappedComponent _setState = { ( state, fn ) => this.setState( state, fn ) } deletage = { this.deletage } { ...this.props } fetchData = { this.fetchData } { ...this.state } />
            )
        }
    }
    hoistNonReactStatic( PagingHandler, WrappedComponent )
    return PagingHandler
}