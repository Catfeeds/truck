import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;


const personalIndex = StyleSheet.create({
  borderStyle: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor: '#dbdbdb',
  },
  info: {
    width: width,
    height: 209,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: 20,
  },
  messageView:{
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  message:{
    width:18,
    height: 18,
  },
  name:{
    fontSize: 18,
  },
  sex:{
    marginLeft: 10,
    marginRight: 15,
    width: 17,
    height: 17,
  },
  lv:{
    width: 49,
    height: 22,
  },
  lvText:{
    color: '#ffffff',
    alignSelf: 'center',
    paddingTop: 3,
    fontSize: 12,
  },
  headView:{
    width: 85,
    height: 85,
    padding: 5,
    borderRadius: 43,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent:'center',
    marginRight: 25,
  },
  headerPic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  labelView:{
    width: width - 140,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 12,
    marginRight: 15,
    flexWrap: 'wrap',
  },
  personlLabel:{
    height: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    marginRight: 10,
    borderColor: '#ffffff',
    paddingTop: Platform.OS == 'ios'?4:1,
    paddingLeft: 7,
    paddingRight: 7,
    marginBottom: 5,
  },
  personlLabelText:{
    height: 20,
    fontSize: 12,
    color: '#ffffff',
    alignSelf: 'center',
  },
  gzView:{
    flexDirection: 'row',
    alignItems:'center',
    marginRight: 22,
  },
  gzimg:{
    width: 16,
    height: 14,
    marginRight: 5,
  },
  gzText:{
    fontSize: 14,
    color: '#ffffff',
  },
  statistics: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statisticsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statisticsImg:{
    width: 24,
    height: 25,
    marginRight: 5,
  },
  statisticsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#acacac',
  },
  orderTitle: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dbdbdb',
    borderBottomWidth: 0.5,
  },
  myOrderText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    color: '#323232',
  },
  allOrderText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#acacac',
  },
  arrow: {
    width: 9,
    height: 16,
    marginLeft: 10,
  },
  order:{
    padding: 15,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  orderItem:{
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImg: {
    width: 26,
    height: 26,
  },
  bagde: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  bagdeText: {
    fontSize: 12,
    lineHeight: 18,
    borderRadius: 10,
    alignSelf: 'center',
    color: '#fff',
  },
  orderText: {
    fontSize: 14,
    color: '#323232',
    paddingTop: 10,
  },
  sqsj:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 30,
  },
  sqsjView:{
    width: 80,
    height: 30,
    backgroundColor: '#ffffff',
    borderColor: '#34a5f0',
    borderWidth: 0.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
  },
  sqsjText: {
    fontSize: 14,
    color: '#323232',
    alignSelf: 'center',
  },
  btoText: {
    fontSize: 12,
    color: '#acacac',
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  }
})
export default personalIndex;
