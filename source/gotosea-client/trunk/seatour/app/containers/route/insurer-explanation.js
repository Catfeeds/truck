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

let { width, height } = Dimensions.get('window');

export default class InsurerExplanation extends Component{
	constructor(props){
		super(props);
	}
	componentWillReceiveProps(props){
		let { detail } = props;
		this.setState({
			price: detail.price,
		})
	}
	render(){
		return(
			<ScrollView style = { styles.containers }>
				<Text style={ [styles.text, styles.paddingBto] }>所有通过海约平台下单的用户，都必须购买旅游意外保险， 保险由美亚AIG“驴行天下”境内旅游保障公司提供。</Text>
				<Text style={ styles.title }>意外伤害及医疗保障：</Text>
				<Text style={ styles.text }>意外身古／伤残   10万元</Text>
				<Text style={ styles.text }>在旅行期间遭遇意外事故,保险公司按保险单上所载被保险人相应的保险金额给付身故保险金、伤残保险金。(未满18周岁的未成年人的“意外身故及伤残保障”的保险金额为10万元)</Text>

				<Text style={ styles.title }>生命健康及医疗保障：</Text>
				<Text style={ styles.text }>意外医药补偿 18000元</Text>
				<Text style={ styles.text }>旅行期间遭受约定的意外事故，补偿被保险人已支出的、必需且合理的实际医药费用(仅包含意外医疗)。（医疗费用）</Text>

				<Text style={ styles.title }>紧急救援保障：</Text>
				<Text style={ styles.text }>医疗运送和送返  5万元</Text>
				<Text style={ styles.text }>若任何被保险人于旅行期间遭受主合同约定的意外事故或罹患疾病,经美国国际支援服务(AIG ASSIST)机构或其授权代表从医疗角度认定为有运送必要的,则将该被保险人送至当地或其他就近地区符合治疗条件的医院。经美国国际支援服务(AIG ASSIST)机构或其授权代表从医疗角度认定为有送返必要的,则将被保险人送返至其合法有效证件所载的住所地。</Text>
				<Text style={ styles.text }>身故遗体送返  2万元</Text>
				<Text style={ styles.text }>遗体送返保险金:在本附加合同有效期内,若任何被保险人于旅行期间遭受主合同约定的意外事故或罹患疾病,并以此为直接且单独原因导致被保险人于三十天内身 故,则美国国际支援服务(AIG ASSIST)机构或其授权代表,依当地实际情况安排遗体保存或火化,且将该被保险人之遗体或骨灰送返被保险人的合法有效证件所载的住所地。(其中丧葬保 险金以16000元为限)。</Text>
				<Text style={ { height: 50} }></Text>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	containers:{
		flex: 1,
		backgroundColor: '#ffffff',
		padding: 20,
		paddingBottom: 0,
	},
	title:{
		fontSize: 15,
		color: '#34a5f0',
		lineHeight: 30,
		paddingTop: 20,
	},
	text: {
		fontSize: 14,
		color: '#323232',
		lineHeight: 25,
	},
});
