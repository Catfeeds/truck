import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;


const routeListStyle = StyleSheet.create({
	search:{
		width: width - 100,
		height: 35,
		marginTop: Platform.OS == 'ios'?22:10,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
	},
	searchText:{
		height: 40,
		paddingLeft: 20,
		paddingRight: 20,
		fontSize: 14,
		color: '#323232',
	},
	dropMenu:{
		flexDirection: 'row',
		height: 50,
		backgroundColor: '#ffffff',
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
		justifyContent:'space-between',
		alignItems:'center',
	},
	dropMenuItem:{
		flex:1,
		alignItems:'center',
	},
	dropdownStyle:{
		width: width,
		marginTop: 15,
		left: 0,
		top: 0,
	},
	titleStyle:{
		fontSize: 14,
		color: '#323232'
	},
	titleImg:{
		width: 8,
		height: 5,
		marginLeft: 5,
	},
	dropdownTextStyle:{
		fontSize: 14,
		paddingLeft: 30,
	},
  listview:{
    backgroundColor: '#f0f0f0',
  },
  cell:{
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  thumbnail:{
    justifyContent: 'space-between',
    width: width,
    height: 150,
  },
  typeView:{
    margin: 10,
    flexDirection: 'row',
    justifyContent:'flex-start',
    height: 25,
    borderRadius: 13,
  },
  typeText:{
    fontSize: 12,
    color: '#ffffff',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 13,
  },
  priceView:{
    alignSelf: 'flex-end',
    margin: 10,
    flexDirection: 'row',
    justifyContent:'center',
    width: 80,
    backgroundColor: '#ff6e63',
    borderRadius: 5,
  },
  priceText: {
    fontSize: 12,
    color: '#ffffff',
    padding: 5,
  },
  price: {
    fontSize: 18,
  },
  routeDetail:{
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeName:{
    fontSize: 16,
    color: '#323232',
    marginBottom: 7,
  },
  tagText:{
    color: '#34a5f0',
    borderColor: '#34a5f0',
    borderWidth: 0.5,
    padding: 3,
    marginRight: 5,
    fontSize: 11,
    borderRadius: 3,
  },
  soldNum:{
    width: 80,
    color: '#acacac',
    fontSize: 12,
    textAlign: 'right',
  }
})
export default routeListStyle;
