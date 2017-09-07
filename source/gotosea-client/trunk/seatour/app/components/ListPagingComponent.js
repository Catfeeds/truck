import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import _styles from './commonStyles'
import EmptyList from 'components/EmptyList'
import PagingWithSubscription from 'components/pagingWithSubscription'
import PropTypes from 'prop-types'

class ListPagingComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing : true,
        }
    }
    static propTypes = {
        url : PropTypes.string,
    }
    static defaultProps = {
        renderRow : () => null
    }
    renderListRow = ({ item, index }) => {
        if( item.id === 0 ){
            return <EmptyList/>
        }else {
            return this.props.renderRow( item, index, this.props )
        }
    }
    componentDidMount(){
        let {
            deletage,
            fetchData,
        } = this.props;
        deletage.then( () => fetchData() )
        .then( () => {
            if( this.state.refreshing ) this.setState({ refreshing : false })
        })
    }
    onRefresh = ()=>{
        console.info( "onRefresh" )
        let {
            deletage,
            fetchData,
        } = this.props;
        if( this.state.refreshing ) return;
        this.setState( { refreshing : true } )
        deletage.then( () => fetchData() )
        .then( () => this.setState({ refreshing : false }))
    }
    onEndReached = ()=>{
        console.info( "onEndReached准备请求数据" )
        let {
            page,
            totalPages,
            deletage,
            fetchData,
        } = this.props;
        
        if( page >= totalPages ) return

        console.info( "onEndReached已经请求数据" )
        deletage.then( () => fetchData( ++page, true ) )
        .then( () => {
            if( this.state.refreshing ) this.setState({ refreshing : false })
        })
    }
    _keyExtractor = item => item.id
    render() {
        let {
            refreshing
        } = this.state,
        {
            page,
            totalPages,
            url,
            dataSource,
            ...others
        } = this.props,
        _isEmpty = isEmpty( dataSource );
        
        return (
            <FlatList 
                ListEmptyComponent = { EmptyList }
                ListFooterComponent = { _isEmpty || page > totalPages ? null : NoContentFooter }
                refreshing = { refreshing }
                onRefresh = { this.onRefresh }
                onEndReached = { this.onEndReached }
                keyExtractor = { this._keyExtractor }
                data = { dataSource } 
                renderItem = { this.renderListRow }
                { ...others }
                />
                
        )
    }
}

const NoContentFooter = props =>{
    return (
        <View style = {{ justifyContent : "center", alignItems : "center", marginVertical : 20, }}>
            <Text style = { [_styles.descTextColor, _styles.fontSize ]}>暂无更多数据！</Text>
        </View>
    )
}

export default PagingWithSubscription( ListPagingComponent )