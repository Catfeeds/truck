import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import _styles from './commonStyles'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'
import DynamicView from './component/DynamicView'
import Tool from 'utils/tool'
import ProjectOptions from './component/ProjectOptions'
import { ProjectTitle } from './activityDetail'
import Slot from './component/slot'
import ButtonBar, { PrimaryButton, EmptyBlock } from './component/ButtonBar'
import Price from './component/Price'
import InputInsurance from 'components/order/InputInsurance'


let { width, height } = Dimensions.get('window')
export default class OrderConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail : {}
        };
    }
    static propTypes = {
    }
    static defaultProps = {
    }
    componentDidMount(){
        let {
            activityId
        } = this.props;
        activityId = 79
    	//获取活动详情
        Tool.get(`${ config.ajaxPath }/rest/act/${ activityId }`)
        .then( json => {
            this.setState({ detail : json })
        })
        .catch( e =>{
            console.info( e )
        })
    }

    renderRight(){
        return <Text style = { [ _styles.selectedTextColor, _styles.fontSize ] }>请选择</Text>
    }

    selectProjectDetail( type ){
        switch( type ){
            default:
                return;
        }
    }

    render() {
        let {
                detail,
            } = this.state,
            {
                activityId,
            } = this.props,
            DIYProjects = [],
            AAProjects = [];

            Array.isArray( detail.activityServiceVos ) && detail.activityServiceVos.forEach( v => {
                console.info( v )
                // 1 AA付费项目
                // 2 自选付费项目
                switch( v.activityServiceType ){
                    case 1:
                        return AAProjects.push(<ProjectOptions title = { v.serviceName } key = { v.serviceId } desc = { !!v.pubResourceName ? `矶钓点：${ v.pubResourceName }` : null } renderRight = { () => <Price value = { v.payFee }/> } cover = {{ uri: v.picture }}/>)
                    case 2:
                        return DIYProjects.push(<TouchableOpacity onPress = { () => this.selectProjectDetail( v ) } key = { v.serviceId }><ProjectOptions title = { v.serviceName } desc = { !!v.pubResourceName ? `矶钓点：${ v.pubResourceName }` : null } renderRight = { this.renderRight } cover = {{ uri: v.picture }}/></TouchableOpacity>)
                    default:
                        return
                }
            })

        return (
        	<View style = { styles.container }>
                <ScrollView style = {{ flex : 1}}>
            		<View style = {{ padding:10 }}>
                        <DynamicView data = {{
                            destination : detail.destination,
                            beginTime : detail.beginDate,
                            endTime: detail.endDate,
                            gatherTime: detail.gatherTime,
                            day : detail.activityDays,
                            minPeople : detail.minCustomers,
                            maxPeople : detail.maxCustomers,
                        }}/>      
                    </View>
                    <View style = {{ paddingBottom : 10 }}>
                        <ProjectTitle style = {{ marginBottom : 10 }} desc = "该费用您需和出行人员共同分摊">AA付费项目</ProjectTitle>
                        {
                            AAProjects
                        }
                        <SubTotal people = { 0 } total = { "0.00" }/>
                    </View>
                    <Slot/>
                    <View style = {{ paddingTop: 10, paddingBottom : 10 }}>
                        <ProjectTitle style = {{ marginBottom : 10 }} desc = "您可根据自身情况选择以下服务">自选付费项目</ProjectTitle>
                        {
                            DIYProjects
                        }
                        <SubTotal people = { 0 } total = { "0.00" }/>
                    </View>
                    <Slot/>
                    <InputInsurance>
                        <InputInsurance.Info name = "张三丰" value = "4588888888888888888" deletabled = { true }/>
                        <InputInsurance.Info name = "张三丰" value = "4588888888888888888"/>
                        <InputInsurance.Button/>
                    </InputInsurance>
                </ScrollView>
                <ButtonBar>
                    <EmptyBlock width = { width - 150 } textStyle = { styles.totalPrice } style = { styles.totalPriceBlock }>
                        总价：<Price/>
                    </EmptyBlock>
                    <PrimaryButton width = { 150 }>提交订单</PrimaryButton>
                </ButtonBar>
        	</View>
        )
    }
}

const SubTotal = props => {
    let {
        people,
        total,
    } = props;
    return (
        <View style = {{ flexDirection: "row", justifyContent: "flex-end", alignItems : "center", paddingLeft: 15, paddingRight: 15 }}>
            <Text style = {[{ marginRight: 10, }, _styles.fontSize ]}>共{ people }项共享服务</Text>
            <Text style = { [{ marginRight: 5, fontSize: 12 }, _styles.descTextColor ]}>人均</Text>
            <Price unitStyle = {{ fontSize : 12 }} value = { total }/>
        </View>
    )
}

const styles = StyleSheet.create({
	container : {
        flex:1
	},
    totalPriceBlock : Object.assign({},_styles.contentBorderColor, {
        borderTopWidth: 1, 
        alignItems: "flex-start",
    }),
    totalPrice : Object.assign({},_styles.textColor,{
        paddingLeft : 15
    }),

})