import React, { Component } from 'react';
import{
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
}from 'react-native';

import MyButton from 'components/common/button';
import BorderLine from 'components/common/border-line';
import SeaListView from 'components/sea-listview';

import Tool from 'utils/tool';

export default class MerchantWallet extends Component{
	constructor(props) {
 		super(props);
		this.state = {
			detail: {},
			paging: {
				pageNumber: 1,
				totalPages: 1,
			},
			datas: [],
		};
	}
	componentWillMount(){
		this.fetch();
		this.load(1);
	}
	componentWillReceiveProps(props){
		// let{ doRefresh } = props;
		// if( doRefresh === true){
			this.fetch();
			this.load(1);
		// }
	}
	fetch(){
		Tool.fetch(null,`${config.appUrlPath}rest/wallet`,'get',null,(ret)=>{
			this.setState({detail:ret || {} });
		});
	}
	load(flag){
		let { datas, paging} = this.state;
		let p = paging.pageNumber;
		if(flag == 1)
			p = 1;
		else if(flag == 2)
			p = p+1;

		let params = {
			page: p,
		}
		Tool.fetch(null,`${config.appUrlPath}rest/wallet/log`,'get',{page: p},(ret)=>{
			paging.pageNumber = ret.pageNumber;
			paging.totalPages = ret.totalPages;
			let pd = [];
			if(flag == 1)pd = ret.content;
			else pd = datas.concat(ret.content);
			this.setState({
				datas: pd,
				paging: paging,
			});
		});
	}
	getRenderRow(data, sectionID, rowID){
		return (
			<View>
				<TouchableOpacity style = { styles.detailItem } onPress={()=>Tool.to('merchantIncomeDetail')}>
					<View style = { styles.left }>
						<Text style = { styles.title }>{ data.changeTypeName }{ data.changeTypeName == 1 && `(${data.remark})`}</Text>
						<Text  style = { styles.statisticsTitle }>{ data.changeTime }</Text>
					</View>
					<Text style = { [styles.right, !data.positive && {color:'red'}] }>{(data.positive?'+':'-')+data.changeMoney}</Text>
				</TouchableOpacity>
				<BorderLine />
			</View>
		)
	}
	render(){
		let { detail, datas, paging } = this.state;
		return (
			<ScrollView style={ styles.containers }>

				<View style = { [styles.content, {padding: 10,}] }>
					<Text style = { [styles.title] }>账户金额（元）</Text>
					<Text  style = { styles.amount }>{detail.totalMoney}</Text>
					<View style = { styles.statistics }>
						<View style = { styles.statisticsItem }>
							<Text  style = { styles.statisticsTitle }>累计收入</Text>
							<Text  style = { styles.statisticsPrice }>¥ {detail.accumulatedIncome}</Text>
						</View>
						<View style = { styles.statisticsItem }>
							<Text  style = { styles.statisticsTitle }>累计奖励</Text>
							<Text  style = { styles.statisticsPrice }>¥ {detail.accumulatedRewards}</Text>
						</View>
						<View style = { styles.statisticsItem }>
							<Text  style = { styles.statisticsTitle }>累计提现</Text>
							<Text  style = { styles.statisticsPrice }>¥ {detail.accumulatedWithdraw}</Text>
						</View>
					</View>
					<MyButton
						style = {styles.tixiang}
						onPress= {()=>{Tool.to('withdrawDeposit',{detail})}}>
						提现
					</MyButton>
				</View>

				<View style = { styles.content }>
					<Text style = { [styles.title, { paddingLeft: 10, paddingTop: 15, paddingBottom: 15}] }>收支明细</Text>
					<BorderLine style = { {flex:0}}/>
					<SeaListView
						data = {datas}
						paging = {paging}
						renderRow = { this.getRenderRow.bind(this) }
						loadMore = {this.load.bind(this,2)}
						loadFirst = {this.load.bind(this,1)}
					/>
				</View>

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	content: {
		backgroundColor: '#ffffff',
		marginBottom: 10,
	},
	title: {
		color:'#323232',
		fontSize: 14,
		paddingTop: 5
	},
	amount:{
		fontSize: 60,
		color: '#323232',
		fontWeight: 'bold',
		paddingTop: 35,
		paddingBottom: 35,
		paddingLeft: 20,
	},
	statistics:{
		flexDirection: 'row',
	},
	statisticsItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	statisticsTitle: {
		color: '#acacac',
		fontSize: 14,
		marginBottom: 5,
	},
	statisticsPrice: {
		color: '#323232',
		fontSize: 12,
	},
	tixiang: {
		margin: 10,
		marginTop: 35,
	},
	detailItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	left:{
		flex:1,
	},
	right: {
		width: 70,
		textAlign: 'right',
	}
})
