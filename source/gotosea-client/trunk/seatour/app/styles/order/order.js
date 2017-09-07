import{
	StyleSheet,
}from 'react-native';

export default orderStyles = StyleSheet.create({
    container:{
			flex: 1,
			backgroundColor: '#f0f0f0',
    },
		item:{
			backgroundColor: '#ffffff',
			marginBottom: 10,
		},
		itemContent:{
			paddingLeft: 20,
			paddingRight: 20,
			paddingBottom: 23,
		},
		orderNo:{
			paddingTop: 20,
			paddingBottom: 13,
		},
		tool:{
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			height: 55,
		},
		toolLeft: {
			paddingLeft: 20,
		},
		toolRight: {
			marginRight: 10,
			width: 75,
			height: 33,
			backgroundColor: '#34a5f0',
			borderRadius: 3,
			justifyContent: 'center',
		},
		priceTitle: {
			fontSize: 14,
			color: '#323232',
		},
		price: {
			color: 'red',
		},
		confirmText:{
			fontSize: 14,
			color: '#ffffff',
			textAlign: 'center',
		},
		colorConfirm: {
			color: '#acacac',
		},
		colorWait: {
			color: '#4dd77e',
		},
		colorIng: {
			color: '#34a5f0',
		},
})
