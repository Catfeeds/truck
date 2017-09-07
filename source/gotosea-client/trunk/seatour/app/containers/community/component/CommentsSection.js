import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    FlatList,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import _styles from 'components/commonStyles'
import ListComment from './ListComment'
import EmptyList from 'components/EmptyList'
import ListSection from './ListSection'
import Tool from 'utils/tool'
import Tabs from 'react-native-tabs'
import ListPagingComponent from 'components/ListPagingComponent'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default class CommentsSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex : 0,
        };
    }
    static propTypes = {
        id : PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]).isRequired,
        goodNumber : PropTypes.number.isRequired,
        commentNumber : PropTypes.number.isRequired,
    }
    static defaultProps = {
        commentNumber : 0,
        goodNumber : 0,
    }
    componentDidMount(){
    }
    handleTabSelect( el ){
        switch( el.props.name ){
            case 1:
                return this.setState({ tabIndex : 1 })
            case 0:
            default:
                return this.setState({ tabIndex : 0 })
        }
    }
    /**
     * 渲染一行评价信息
     * @param  {Object} item
     * @param  {Number} index
     * @return {React Element}
     */
    renderCommentRow( item, index ){
        let commentInfo = {
                name : item.cust.name,
                id : item.cust.id,
                content : item.content,
                headPic : item.cust.picture,
            },
            replyInfo;
            item.pidCust && ( replyInfo = {
                name : item.pidCust.name,
                id : item.pidCust.id,
                content : item.pidContent,
            })
        return <ListComment time = { item.time } commentInfo = { commentInfo } replyInfo = { replyInfo } />
    }
    renderGoodRow( item, index ){
        return <ListGood 
                    userInfo = {{
                        name : item.thumbCust.name,
                        headPic : item.thumbCust.picture,
                        id : item.thumbCust.id,
                    }}
                    time = { item.thumbTime }
                />
    }
    keyExtractor = item =>{
        return item.thumbTime
    }
    render() {
    	let {
				tabIndex
			} = this.state,
            {
                id,
                commentNumber,
                goodNumber
            } = this.props,
			subView;

		switch( tabIndex ){
			case 1:
				subView = <ListPagingComponent
                                key = 'goods'
                                keyExtractor = { this.keyExtractor }
                                url = { `${ config.ajaxPath }/rest/post/thumb/list/${ id }` }
                                renderRow = { this.renderGoodRow }
                            />
				break;
			case 0:
			default:
				subView = <ListPagingComponent
                                key = 'comments'
                                url = { `${ config.ajaxPath }/rest/post/comment/list/${ id }` }
                                renderRow = { this.renderCommentRow }
                            />
				break;
		}
        return (
        	<View style = { styles.container }>
        		<Tabs selected={ tabIndex }
	                style={ [styles.tabs] }
	                iconStyle = { styles.tabIcon }
	                onSelect={ el => this.handleTabSelect( el ) }>
	            	<View style = { [ styles.tab, tabIndex === 0 && styles.tabSelect ] } name = { 0 }>
	            		<Text style = { [ { fontSize : 16 },tabIndex === 0 ? _styles.selectedTextColor : _styles.descTextColor ] }>评论{ commentNumber }</Text>
	            	</View>
	            	<View style = { [ styles.tab, tabIndex === 1 && styles.tabSelect] } name = { 1 }>
	            		<Text style = { [ { fontSize : 16 },tabIndex === 1 ? _styles.selectedTextColor : _styles.descTextColor ] }>赞{ goodNumber }</Text>
	            	</View>
	            </Tabs>
	            <View style={styles.subContainer}>
	              { subView }
	            </View>
        	</View>
        )
    }
}

class ListGood extends React.Component{
    handleOnPress = id => {
        Actions.personalCenter({ id })
    }
    render(){
        let {
            style,
            userInfo,
            time,
        } = this.props;
        return (
            <TouchableOpacity onPress = { this.handleOnPress } style = { [styles.LGContainer, style ] }>
                <View style = {{ flexDirection : "row", justifyContent : 'flex-start', alignItems : 'center'}}>
                    <Image style = { styles.LGheadPic } source = { { uri : userInfo.headPic } }/>
                    <View>
                        <Text style = { [_styles.textColor, _styles.fontSize, { lineHeight: 20 } ] }>{ userInfo.name }</Text>
                        <Text style = { [_styles.textColor, _styles.fontSize, { lineHeight :20 } ] }>觉得很赞</Text>
                    </View>
                </View>
                <Text style = { [_styles.descTextColor, { fontSize :12, lineHeight:20 } ]} >今天 10:01</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
	container : {
        flex:1,
	},
	subContainer : Object.assign({},_styles.bgColor,{
    	flex:1,
    }),
    tabs:Object.assign({},_styles.bgColor,_styles.contentBorderColor,{
    	position:"relative",
    	justifyContent:"flex-start",
        borderBottomWidth: 1 / PixelRatio.get(),
    }),
    tabIcon : {
    	flex:0,
    },
    tab:{
    	marginLeft:15,
    	paddingTop: 14,
    	paddingBottom: 14,
    	alignItems: 'center',
    	justifyContent: 'center',
    	borderColor : "transparent",
    	borderBottomWidth : 2,
    },
    tabSelect : Object.assign({},_styles.selectedBorderColor,{
    }),
    LGContainer : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-start",
        padding: 15,
    },
    LGheadPic : {
        width:40,
        height:40,
        borderRadius:20,
        overflow:"hidden",
        marginRight:10, 
    },

})