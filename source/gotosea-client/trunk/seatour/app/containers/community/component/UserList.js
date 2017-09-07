import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
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
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    static propTypes = {
    	dataSource : PropTypes.arrayOf(PropTypes.shape({
    		headPic : Image.propTypes.source,
    		// userName : PropTypes.string
    	})).isRequired,
    }
    render() {
    	let {
				dataSource
			} = this.props;
        return (
        	<View style = { styles.container }>
        		{
        			dataSource.map( ( v, k ) => {
        				return <UserPic style = { k === 0 ? { marginLeft: 0 } : {} } key = { `user_pic_${k}` } { ...v } />
        			})
        		}
        	</View>
        )
    }
}

const UserPic = props => {
	return (
		<View style = { [ styles.userContainer, props.style ] }>
			<View style = { styles.userImageWrap }>
				<Image style = { styles.userImage } source = { props.headPic }/>
			</View>
			{/*<Text style = { styles.userName }>{ props.userName }</Text>*/}
		</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flexDirection : "row",
		alignItems:"center",
	},
	userContainer : {
		marginLeft:15,
		justifyContent:"center",
		alignItems : "center",
	},
	userImageWrap : {
		borderRadius:40,
		overflow:"hidden",
	},
	userImage : {
		height:40,
		width:40,
	},
	userName : Object.assign({}, _styles.textColor,{
		fontSize : 12,
	})

})