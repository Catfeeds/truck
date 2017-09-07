import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    Dimensions,
} from 'react-native';
import _styles from 'components/commonStyles'
import Tool from 'utils/tool'
import Slot from './component/slot'
import CommentsSection from './component/CommentsSection'
import ListSection from './component/ListSection'
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';
import { connect } from 'react-redux'
import { loadImage } from 'actions/images'
import { getStringByTime } from './dynamicShare'
import { ImagePreview } from './dynamicPublish'
import isEmpty from 'lodash/isEmpty'

let imagePreviewWAH = parseInt((Dimensions.get("window").width - 30 - 20)/3);

class DynamicDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail : {}
        };
    }
    componentDidMount(){
        let id = this.props.id;
    	Actions.refresh({
    		hideNavBar : false,
			leftButtonImage : require('../../images/btn_back.png'),
			onLeft : () => Actions.pop(),
			rightButtonImage : require('../../images/community/btn_..._.png'),
			onRight : () => Actions.pop(),
    	})

        Tool.get(`${ config.ajaxPath }/rest/post/${ id }`)
        .then( json => {
            this.setState({ detail : json })
        })
    }
    imagePreview = ()=>{
        let {
                dispatch,
                detail,
            } = this.props;
        dispatch( loadImage( detail.postAttachments ) )
        Actions.gallery()
    }
    render() {
        let {
            detail
        } = this.state;
        return (
        	<ScrollView style = { styles.container }>
                <ListSection
                    userInfo = { !detail.custCommVo ? {} : {
                        name : detail.custCommVo.name,
                        headPic : detail.custCommVo.picture,
                        level : detail.custCommVo.level,
                        id : detail.custCommVo.id,
                        tags : detail.custCommVo.custTagVos,
                    }}
                    otherInfo = {{
                        content : detail.content,
                        postTime : detail.postTime || Date.now(),
                    }}
                    type = { detail.businessUnitId }
                    time = { getStringByTime( detail.postTime, "MM-DD" ) }
                    locInfo = { detail.postLocation }
                    onPress = { () => this.redirectDetail( detail.id ) }
                >
                    { !isEmpty( detail.postAttachments ) && <ImagePreview imageOnPress = { this.imagePreview } style = {{ marginTop: 10 }} imageStyle = { styles.imagePreview } maxLength = { 3 } rowNumber = { 3 } photoes = { detail.postAttachments }/> }
                </ListSection>
                <Slot/>
                <CommentsSection id = { this.props.id } goodNumber = { detail.thumbsNum || 0 } commentNumber = { detail.commentsNum }/>
        	</ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: Object.assign({},_styles.bgColor,{
        flex: 1,
    }),
    imagePreview : {
        width : imagePreviewWAH,
        height : imagePreviewWAH,
        marginRight:10,
        marginLeft:0,
    }
})

export default connect( state => ({}))(DynamicDetail)