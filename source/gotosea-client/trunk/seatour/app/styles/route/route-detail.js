import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  parentsView: {
    width: width,
    height: Platform.OS == 'ios' ? height : height - 22,
  },
	img:{
		width: width,
		height: 180,
		justifyContent: 'space-between',
	},
	toolView:{
		flexDirection: 'row',
		justifyContent:'space-between',
		marginTop: Platform.OS == 'ios'? 20 : 5,
	},
	pressArea:{
		padding: 15,
	},
  pressBg:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
    marginLeft: 10,
    paddingRight: 2,
  },
	toolImg:{
		width: 10,
		height: 18,
	},
	typeView:{
		margin: 15,
		flexDirection: 'row',
		justifyContent:'flex-start',
		height: 25,
		borderRadius: 13,
	},
	typeText:{
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 12,
		backgroundColor: 'rgba(0,0,0,0.4)',
		color: '#ffffff',
		borderRadius: 20,
	},
	content:{
		padding: 15,
		backgroundColor: '#ffffff',
	},
	contentTop:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	routeName: {
		color: '#323232',
		fontSize: 16,
		marginBottom: 7,
	},
	orderCount:{
		textAlign: 'right',
		color: '#acacac',
		fontSize: 12,
	},
	tagText:{
		color: '#34a5f0',
		borderColor: '#34a5f0',
		borderWidth: 0.5,
		padding: 2,
		paddingLeft: 5,
		paddingRight: 5,
		marginRight: 5,
		fontSize: 11,
		borderRadius: 3,
	},
	ratView:{
		flexDirection: 'row',
    alignItems: 'center',
	},
	ratText:{
		fontSize: 12,
		color: '#323232',
	},
	tjContent:{
		backgroundColor: '#ffffff',
		padding: 15,
		marginBottom: 10,
	},
	tjTitle:{
		color: '#34a5f0',
		fontSize: 16,
		marginBottom: 5,
	},
	tjText:{
		color: '#323232',
		fontSize: 14,
		marginTop: 10,
	},
	container:{
		backgroundColor: '#ffffff',
	},
	tapView:{
		flexDirection: 'row',
		height: 40,
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
	},
	tapTouch:{
		flex:1,
		alignItems: 'center',
	},
	tapText:{
		padding: 0,
		width: 58,
		fontSize: 14,
		height: Platform.OS=='ios'?38:29,
		color: '#323232',
		lineHeight: Platform.OS=='ios'?38: 29,
	},
	tapTextAcitve:{
		flex:1,
		borderBottomWidth: 2,
		borderColor: '#34a5f0',
	},
  modal: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shareView:{
    width: 53,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareImg:{
    width: 53,
    height: 53,
  },
  shareText:{
    fontSize: 14,
    color: '#323232',
    paddingTop: 5,
  },
});

export default styles;
