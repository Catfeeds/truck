import React, { Component } from 'react';
import{
	Platform,
	Dimensions,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';

import Tool from 'utils/tool';
import { Calendar } from 'react-native-calendars';
import OrderTool2 from 'components/route/order-tool2';
import AccumulationSpan from 'components/common/accumulation-span';
import IconSpan3 from 'components/common/icon-span3';
import WheelPicker from 'components/common/wheel-picker';
let { width, height } = Dimensions.get('window');

export default class SelectDate extends Component{
	constructor(props){
		super(props);
		let { detail } = this.props;
    let now = new Date(),
    minDate = now.format('yyyy-MM-dd'),
    maxDate = now.add('m',6).format('yyyy-MM-dd');
    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      seletDate: [],
			count: 1,
			maxCount: 30,
			preferPrice: detail.preferPrice,  //默认价格
			price: detail.preferPrice,        //日期价格
			allprice: detail.preferPrice,     //总价
			week: '',
			times: [],
			time: null,
    }
	}
	componentWillReceiveProps(props){
		let { detail } = props;
		this.setState({
			price: detail.price,
		})
	}
	componentWillMount() {
		let date = new Date();
		// this.priceFetch(date);
	}
	onDayPress(day, dayMarked){
    let date = new Date();
    date.setTime(day.timestamp);
		this.priceFetch(date,dayMarked)
  }
	priceFetch( date, dayMarked ){

		let { detail } = this.props;
		let {preferPrice, price, allprice, count } = this.state;

		let selet = date.format('yyyy-MM-dd');
		let week = "星期" + "日一二三四五六".charAt(date.getDay())

		Tool.fetch(null,`${config.appUrlPath}rest/prod/sale/${detail.id}/${selet}`,'get',null,(ret)=>{
			this.setState({
				seletDate: [selet],
				selectMarked: dayMarked,
				week: week,
			});
			if( ret && ret.price ){
				allprice = ret.price * count;
				this.setState({
					price: ret.price,
					allprice: allprice
				});
			}else{
				//当天无定价则用默认下单价格
				allprice = preferPrice * count;
				this.setState({
					price: preferPrice,
					allprice: allprice
				});
			}
		});
	}
	countChange( count ){
		let { allprice, price } = this.state;
		allprice = price * count,
		this.setState({count, allprice});
	}
	pickTime(){
		let { times } = this.state;
		WheelPicker.timePicker(times,(times, time)=>{
			this.setState({times,time,})
		});
	}
	submit(){
		let { detail } = this.props;
		let{ seletDate, count, maxCount, allprice, time } = this.state;
		if(seletDate.length <= 0){
			Tool.alert('请选择出行日期');
			return;
		}else if(!time){
			Tool.alert('请选择出行时间');
			return;
		}else
			Tool.to('orderConfirm',{ detail:detail, departure:seletDate[0], num:count, allprice:allprice, time: time });
	}
	render(){
		let { detail } = this.props;
		let { time, minDate, maxDate, seletDate, week, count, maxCount, allprice} = this.state;
		return(
			<View style = { styles.parentsView }>
				<ScrollView style = {{flex:1, backgroundColor:'#f0f0f0'}}>
					<Text style={ styles.title }>{detail.name}</Text>
					<Calendar
						minDate = { minDate }
						maxDate = { maxDate }
						onDayPress = { this.onDayPress.bind(this) }
						onMonthChange = { (month) => {}}
						selected = { seletDate }
						firstDay = { 1 }
						style = { styles.calendar }
						hideExtraDays = { false }
						theme={{
							calendarBackground: '#ffffff',
							textSectionTitleColor: '#b6c1cd',
							selectedDayBackgroundColor: '#34a5f0',
							selectedDayTextColor: '#ffffff',
							todayTextColor: '#34a5f0',
							dayTextColor: '#323232',
							textDisabledColor: '#d9e1e8',
							dotColor: '#00adf5',
							selectedDotColor: '#ffffff',
							arrowColor: '#34a5f0',
							monthTextColor: '#323232'
						}}
					/>
					<View style = { styles.content}>
						<View style={ [styles.selItem, styles.borerBto] }>
							<Text style={ styles.dateText}>已选出行日期:</Text>
							<Text style={ styles.dateText}>{seletDate+' '+week}</Text>
						</View>
						<AccumulationSpan
							style = { styles.borerBto }
							title = {'请选择数量'}
							tipText = { '如需更多人数请咨询客服' }
							count = { count }
							maxCount = { maxCount }
							onChange = {count=>{this.countChange(count)}}
						/>
						<IconSpan3 style = { styles.time } title = {'出行时间'} text = { time } defaultText = { '请选择...' } click = { this.pickTime.bind(this) }/>
					</View>
				</ScrollView>

				<OrderTool2
					text = { '总价' }
					orderText = { '下一步' }
					allprice = { allprice }
					order = {this.submit.bind(this) }
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	parentsView: {
		width: width,
		height: Platform.OS == 'ios' ? height-64 : height - 76,
	},
	title:{
		alignSelf: 'center',
		fontSize: 14,
		color: '#323232',
		padding: 20,
	},
	calendar: {
		width: width,
		marginBottom: 10,
	},
	content:{
		backgroundColor: '#ffffff',
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 10,
	},
	selItem:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
	},
	dateText:{
		fontSize: 14,
		color: '#323232'
	},
	borerBto:{
		borderBottomWidth: 0.5,
		borderColor: '#dbdbdb',
	},
});
