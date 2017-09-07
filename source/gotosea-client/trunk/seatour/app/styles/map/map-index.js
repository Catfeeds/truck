import{
  Platform,
  StyleSheet,
  Dimensions,
}from 'react-native';

const width =  Dimensions.get('window').width;
const height =  Dimensions.get('window').height;

const stylesMap = StyleSheet.create({
  containers: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    zIndex: 0,
    width: width,
    height: Platform.OS == 'ios' ? height : height - 22 ,
    marginBottom: 16
  },
  floatView: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    marginTop: 23,
    flexDirection: 'row',
    height: 48,
  },
  topImg: {
    width: 14,
    height: 14,
    margin: 10
  },
  topRightImg: {
    width: 22,
    height: 13,
    margin: 10
  },
  search:{
    flex:1,
    height: 28,
    marginTop: 10 ,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#dbdbdb",
    justifyContent:'center'
  },
  searchText:{
    height: 38,
    fontSize: 18,
    padding:0,
  },
  bottom: {
    bottom: 15,
    padding: 5,
    height: 58,
  },
  btnTypes: {
    width: 55,
    height: 38,
    margin: 5,
    borderRadius: 5,
    justifyContent:'center',
  },
  typeSelect:{
    backgroundColor:'#33a6f1',
  },
  typeUnSelect:{
    backgroundColor:'#f0f0f0',
  },
  typeText:{
    fontSize: 16,
    alignSelf: 'center',
    color: '#353535',
  },
  textSelcet: {
    color: '#ffffff',
  },
  modal:{
    height: 203,
    backgroundColor: 'transparent',
  },
  pointDetail:{
    height: 134,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 68,
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb',
  },
  ddTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
  },
  resourceName:{
    flex: 1,
    fontSize: 16,
    color: '#323232',
  },
  yq:{
    fontSize: 12,
    width: 80,
    color: '#34a5f0',
    textAlign: 'right',
  },
  grad:{
    width: 105,
  },
  address:{
    color: '#acacac',
    fontSize: 14,
    height: 20,
  },
  moreDetail:{
    color: '#acacac',
    fontSize: 12,
    height: 15,
    marginBottom: 10,
  },
  tqView:{
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#dbdbdb',
  },
  tqbtn:{
    flex: 1,
    height: Platform.OS == 'ios' ? 45: 36,
    alignItems: 'center',
  },
  tqText:{
    fontSize: 16,
    color: '#323232',
    lineHeight: Platform.OS == 'ios' ? 45: 36,
  }

});

export default stylesMap;
