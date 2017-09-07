import React, { Component } from 'react';
import{
	ScrollView,
	StyleSheet,
	Platform,
	Dimensions,
	View,
	Image,
	TouchableOpacity,
	Text,
	TextInput,
} from 'react-native';

import Tool from 'utils/tool';
import Loading from 'components/common/loading';
import SeaListView from 'components/sea-listview';
import Rating from 'components/common/rating';
import BorderLine from 'components/common/border-line'
import {Actions} from 'react-native-router-flux';

let { width, height } = Dimensions.get('window');

export default class OrderEvaluate extends Component{
	constructor(props){
		super(props);
    this.state = {
			typeId: 0,
			rat: 0,
			imgs: [],
			text: null,
    }
	}
	componentWillMount() {

	}
	addImg(){
		let { imgs } = this.state;
		OssUtils.uploadImage( this, (ret) => {
			imgs.push(ret.fullUrl);
			this.setState({imgs})
		});
	}
	delImg( index ){
		let { imgs } = this.state;
		imgs.splice(index,1);
		this.setState({imgs})
	}
	getImgList(){
		let { imgs,imgAddBtn } = this.state;
		let list;
		list = imgs.map((v, k) => {
				return <Image key = { k }  source={{ uri: v}} style = { styles.img }>
								<TouchableOpacity style = { styles.delView } onPress={ ()=>{ this.delImg( k ) }}><Image source = {require('images/merchant/btn_x.png')} style = { styles.delImg }/></TouchableOpacity>
							 </Image>
		});
			list.push(<TouchableOpacity key = { 'btn_add' } style = { styles.addView } onPress={ ()=>{ this.addImg() }}><Image source = {require('images/personal/btn_tjtp.png')} style = { styles.img }/></TouchableOpacity>);
		return list;
	}
	render(){
		let { datas,typeId, paging, rat } = this.state;
		return(
				<View style = { styles.parentsView }>
					<ScrollView ref = 'scroll' style = {{flex:1, backgroundColor:'#f0f0f0'}}>
						<Loading  visible={this.state.loading_visible} />
						<View style = {{backgroundColor: '#ffffff'}}>
							<View style = { styles.titleView }>
								<Text style = { styles.title }>【海岛游】将阿兰德斯加辣豆腐啦副书记</Text>
							</View>
							<TextInput
								placeholder = "说说哪里满意，帮大家选择"
								multiline = { true }
								underlineColorAndroid='transparent'
								selectionColor='#34a5f0'
								clearButtonMode='while-editing'
								onChangeText={(text)=>{
									this.setState({datas})
								}}
								style={  styles.textDes }
							/>
							<View style = { styles.imgList }>
								{ this.getImgList() }
							</View>
							<BorderLine />
							<View style = { styles.ratView }>
								<Text style = { styles.ratText }>整体满意度</Text>
								<Rating max={5} rating = { rat } editable={true} onRate = {(num)=>this.setState({rat:num})}/>
							</View>
						</View>
					</ScrollView>
					<View style={ styles.botTool}>
						<Text style = { styles.tip}>上传图片评价可得33积分</Text>
						<TouchableOpacity style = { styles.orderView } onPress={ ()=>{ } }>
							<Text style={ styles.orderText}>{ '提交评价' }</Text>
						</TouchableOpacity>
					</View>
				</View>
		)
	}
}

const styles = StyleSheet.create({
	parentsView: {
		width: width,
		height: Platform.OS == 'ios' ? height-64 : height - 76,
	},
	titleView:{
		padding: 10,
		paddingLeft: 15,
		paddingRight: 15,
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
	},
	title: {
		fontSize: 14,
		color: '#323232',
	},
	textDes: {
		color: '#323232',
		fontSize: 14,
		minHeight: 150,
		padding: 20,
		paddingTop: Platform.OS == 'IOS'?0:6,
		textAlignVertical: 'top',
	},
	imgList: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
	},
	img: {
		width: (width - 75)/4,
		height: (width - 75)/4,
		marginLeft: 15,
		marginBottom: 10,
	},
	addView: {

	},
	delView: {
		position: 'absolute',
		top: 6,
		right: 6,
	},
	delImg: {
		width: 21,
		height: 21,
	},
	ratView:{
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding: 15,
	},
	ratText:{
		fontSize: 14,
		color: '#acacac',
		marginRight: 15,
	},
	botTool:{
		flexDirection: 'row',
		height: 50,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tip:{
		flex: 1,
		fontSize: 14,
		color: '#acacac',
		paddingLeft: 10,
	},
	orderView:{
		width: 160,
		height: 50,
		backgroundColor: '#34a5f0',
		alignItems: 'center',
		justifyContent: 'center',
	},
	orderText:{
		color: '#ffffff',
		fontSize: 18,
	}
});
