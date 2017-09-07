import React from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import _styles from 'components/commonStyles'
import Button from 'containers/community/component/button'

class InputInsurance extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {};
	}
	render(){
		return (
			<View style = { [ _styles.bgColor, styles.container ] }>
				<View style = { [ styles.wrapView, _styles.contentBorderColor ] }>
					<View style = { styles.view }>
						<Text style = {[ _styles.fontSize, _styles.textColor ]}>保险服务</Text>
						<Image style = { styles.icon } source = { require("images/icon_!.png") }/>
						<Text style = { [{ fontSize: 12, }, _styles.descTextColor ] }>为了您的安全请购买保险</Text>
					</View>
					<View style = { styles.view }>
						<Text style = { [ _styles.selectedTextColor, { fontSize : 12 }] }>注：</Text>
						<Text style = { [{ fontSize: 12, }, _styles.descTextColor ] }>保险由美亚AIG“驴行天下”境内旅游保险公司提供</Text>
					</View>
				</View>
				<View style = {{ padding:10 }}>
					{
						this.props.children
					}
				</View>
			</View>
		)
	}
}

InputInsurance.Info = function(props){
	let {
		name,
		value,
		deletabled,
		onDelete,
	} = props;
	return (
		<View style = { styles.infoContainer }>
			<View style = { styles.infoWrap }>
				<Text style = {[ _styles.fontSize, { width:70, marginRight:10, fontSize : 15, }]}>{ name }</Text>
				<Text style = { [ _styles.fontSize, { fontSize : 15 } ] }>{ value }</Text>
			</View>
			{
				deletabled && (
					<TouchableOpacity onPress = { onDelete } style = {{ marginLeft: 10 }}>
		                <Image source = { require("images/community/btn_Delete-.png") }/>
		            </TouchableOpacity>
		        )
	        }
		</View>
	)
}

InputInsurance.Button = function( props ){
	return (
		<Button type = "primary">添加1位被保人</Button>
	)
}


const styles = StyleSheet.create({
	container : {
	},
	wrapView : {
		paddingVertical: 10,
		marginHorizontal : 15,
		borderBottomWidth:1,
	},
	icon : {
		width:12,
		height:12,
		marginHorizontal : 5,
	},
	view : {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems : "center",
		padding:5
	},
	infoContainer : {
		paddingVertical: 10,
		paddingHorizontal : 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems : "center",
	},
	infoWrap : {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems : "center",
	}
})

export default InputInsurance