import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containers:{
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top:{
    height: Platform.OS == 'ios'?350: 340,
    backgroundColor:'#34a5f0',
    alignItems: 'center',
  },
  curLevel:{
    width: 115,
    height: 34,
    backgroundColor: '#ffffff',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 14,
    color: '#323232',
  },
  textExperience:{
    fontSize: 12,
    color: '#ffffff'
  },
  name:{
    fontSize: 18,
    color: '#ffffff',
  },
  jusCenter:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spaceCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  curintegral:{
    flexDirection: 'row',
    width: 160,
    height: 34,
    backgroundColor: '#ffffff',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introduce:{
  },
  tipView:{
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	tip:{
		color: '#acacac',
		fontSize: 12,
	},
	tanhao:{
		width: 12,
		height: 12,
		borderWidth: 0.5,
		borderColor: '#acacac',
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 5,
	},
  djjlTitle:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },
  awarView:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
  },
  awardItem:{
    backgroundColor: '#e1e1e1',
    margin: 5,
    width: (width - 50)/3,
    borderRadius: 3,
    padding: 5,
  },
  awardItemCur:{
    backgroundColor:'#34a5f0',
  },
  leveTip:{
    width: 30,
    fontSize: 9,
    color: '#ffffff',
    fontStyle : 'italic'
  },
  levelBig: {
    width: 30,
    fontSize: 24,
    color: '#ffffff',
    fontStyle : 'italic'
  },
  jyhqTitle:{
    padding: 15,
  },
  experienceView: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  experienceItem: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#34a5f0',
    margin: 5,
    width: (width - 40)/2,
    height: 60,
    borderRadius: 3,
    padding: 10,
  },
  experienceRight:{
    width: 40,
  },
  experienceValueView:{
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5,
  },
  experienceValueItem:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    borderBottomWidth: 0,
  },
  experienceValueLeft:{
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dbdbdb',
    borderRightWidth: 0.5,
  },
  leveImg:{
    width: 49,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolView:{
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: Platform.OS == 'ios'? 20 : 5,
  },
  pressArea:{
    padding: 15,
    width: 50,
  },
  toolImg:{
    width: 10,
    height: 18,
  },
  toolTitle:{
    width: width - 100,
    textAlign: 'center',
  },
  headView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 10,
  },
  headViewItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lvView:{
    width: 50,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  lineView:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headLine:{
    flex: 1,
    height: 6,
    backgroundColor:'#ffffff',
  },
  headCricle:{
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ffffff',
  },
  headPic:{
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  imgView1:{
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#ffffff',
    padding:6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView2:{
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#34a5f0',
    padding:6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  garyBg:{
    backgroundColor: '#e1e1e1'
  }
})

export default styles;
