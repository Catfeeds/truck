import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
} from 'react-native';
import _styles from 'components/commonStyles'
import Tag from './tag'
import Button from './button'
import Tool from 'utils/tool'
import DateTool from 'utils/date-tool'

export default class DynamicView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        let {
                destination,
                beginTime,
                endTime,
                gatherTime,
                day,
                minPeople,
                maxPeople,
            } = this.props.data;

        return (
        	<View style = { [styles.container, this.props.style ] }>
        		<View style = { styles.textRow }>
        			<Text style = { styles.text }>{ `【目  的  地】${ destination }` }</Text>
        		</View>
        		<View style = { styles.textRow }>
        			<Text style = { styles.text }>{ `【活动日期】${ DateTool.dateToString( beginTime ) }至${ DateTool.dateToString( endTime ) }` }</Text><Text style={ [ styles.text, { paddingLeft: 20 } ]}>{ `共${ day }天` }</Text>
        		</View>
        		<View style = { styles.textRow }>
        			<Text style = { styles.text }>{ `【集合日期】${ DateTool.dateToString( gatherTime ) }` }</Text>
        		</View>
        		<View style = { styles.textRow }>
        			<Text style = { styles.text }>{`【人       数】${ minPeople }/${ maxPeople } `}</Text>
        		</View>
        	</View>
        )
    }
}
const styles = StyleSheet.create({
	container : Object.assign({},_styles.contentBgColor,{
		padding:5,
	}),
	textRow : {
		paddingTop:5,
		flexDirection:"row",
		justifyContent:"flex-start",
		alignItems:"center",
	},
	text : Object.assign({},_styles.textColor,{
		fontSize:12,
	}),
})