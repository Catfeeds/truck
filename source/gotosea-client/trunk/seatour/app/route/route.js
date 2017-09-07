import React, { Component } from 'react';
import{
	StyleSheet,
	Image,
	Alert,
	BackAndroid,
	ToastAndroid,
	Platform
}from 'react-native';

import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';

import Test from 'containers/test';
import IndexTabs from 'containers/index-tabs';
import MyListView from 'containers/listview';
import Scan from 'components/scan';
import Video from 'components/video';
import SeaWebView from 'containers/webview';
import Map from 'containers/map';

//登录
import Login from 'containers/login/login'
import ResetPass from 'containers/login/reset-pass'
import SetPass from 'containers/login/set-pass'
import Modify from 'containers/login/modify'

//角色
import SelectRole from 'containers/role/select-role';
import MerchantTag from 'containers/role/merchant-tag';
import TouristTag from 'containers/role/tourist-tag';

//设置
import Setting from 'containers/setting';
import AboutUs from 'containers/setting/about-us';

//社区
import CommunityDynamicDetail from 'containers/community/dynamicDetail'
import CommunityDynamicPublish from 'containers/community/dynamicPublish'
import CommunityActivityPublish from 'containers/community/activityPublish'
import CommunityActivityDetail from 'containers/community/activityDetail'
import CommunityActivityPublishSucc from 'containers/community/activityPublishSucc'
import CommunityPersonalCenter from 'containers/community/personalCenter'
import CommunityOrderConfirm from 'containers/community/orderConfirm'

//商家
import MerchantIndex from 'containers/merchant/merchant-index';
import Authentication from 'containers/merchant/authentication';
import Authenticationed from 'containers/merchant/authenticationed';
import MerchantInfo from 'containers/merchant/info';
import MerchantSet from 'containers/merchant/merchant-set';
import MerchantTagModify from 'containers/merchant/merchant-tag-modify';
import MerchantDetail from 'containers/merchant/merchant-detail';
import MerchantIntroduce from 'containers/merchant/merchant-introduce';
import MerchantOrderDetail from 'containers/merchant/order/merchant-order-detail';
import MerchantIncomeDetail from 'containers/merchant/wallet/merchant-income-detail';
import MerchantList from 'containers/merchant/merchant-list';
import WithdrawDeposit from 'containers/merchant/wallet/withdraw-deposit';
import BankList from 'containers/merchant/wallet/bank-list';
import BankAdd from 'containers/merchant/wallet/bank-add';
import WithdrawSuccess from 'containers/merchant/wallet/withdraw-success';

//线路
import RouteList from 'containers/route/routelist';
import RouteDetail from 'containers/route/route-detail';
import SelectDate from 'containers/route/select-date';
import SelectCoupon from 'containers/route/select-coupon';
import OrderConfirm from 'containers/route/order-confirm';
import InsurerExplanation from 'containers/route/insurer-explanation';
import Pay from 'containers/route/pay';
import PaySuccess from 'containers/route/pay-success';

//海钓
import FishingDetail from 'containers/fishing/fishing-detail';
import FishingOrder from 'containers/fishing/fishing-order';


//出行人
import ParticipantList from 'containers/participant/participant-list';
import ParticipantDetail from 'containers/participant/participant-detail';

//图片画廊
import Gallery from 'components/gallery'
import SeaGallery from 'components/sea-gallery'

//首页
import Search from 'containers/index/search';
import SearchResult from 'containers/index/search-result';
import IslandIndex from 'containers/index/island-index';
import FishingIndex from 'containers/index/fishing-index';

//文章
import ArticleList from 'containers/article/article-list';
import ArticleDetail from 'containers/article/article-detail';

//我的
import Feedback from 'containers/personal/feedback';
import CouponList from 'containers/personal/coupon/coupon-list';
import CouponExplanation from 'containers/personal/coupon/coupon-explanation';
import Friend from 'containers/personal/friend';
import Invite from 'containers/personal/invite';
import InfoModify from 'containers/personal/info/info-modify';
import NameModify from 'containers/personal/info/name-modify';
import AccountLevel from 'containers/personal/info/account-level';
import TouristTagModify from 'containers/personal/info/tourist-tag-modify';
import Integral from 'containers/personal/integral/integral';
import IntegralDetail from 'containers/personal/integral/integral-detail';
import IntegralExplanation from 'containers/personal/integral/integral-explanation';
import OrderList from 'containers/personal/order/order-list';
import OrderEvaluate from 'containers/personal/order/order-evaluate';
import OrderDetail from 'containers/personal/order/order-detail';
import OrderRefund from 'containers/personal/order/order-refund';
import CollectIndex from 'containers/personal/collect/collect-index';

export default class AppRoute extends Component{
  constructor(props){
    super(props);
  }
	componentWillMount(){
		let me = this;
	}
  onExitApp(){
    // Alert.alert('提示','是否提出海约行',[
    // 	{text:'取消',onPress: ()=> {return false}},
    // 	{text:'确定',onPress: ()=> {BackAndroid.exitApp()}}
    // ])
    let now = new Date();
    if( this.lastBackPressed && this.lastBackPressed.add('s',2) >= now){
      return false;
    }
    this.lastBackPressed = now;
    ToastAndroid.show('再按一次退出海约行',ToastAndroid.SHORT);
    return true;
  }
  render(){
    return(
      <Router
        onExitApp = {this.onExitApp.bind(this)}
        navigationBarStyle = {{backgroundColor:'#ffffff', flex: 1, borderBottomColor: '#bdbdbd'}}
        backButtonTextStyle = {{backgroundColor:'#ffffff',color:'#34a5f0'}}
        backButtonImage = {require('../images/btn_back.png')}
        direction = 'horizontal'
        titleStyle = {{color:'#323232'}}>
        <Scene key='root' style={{}} passProps={true} hideNavBar = {false} >
					<Scene key='indexTabs' component={IndexTabs}
						title='海约行'
						hideBackImage={true}
						hideNavBar = {true}
						initial = {true}
					/>
					<Scene key='test' component={Test} title='test' style = {styles.scenStyle}/>
					<Scene key='map' component={Map} title='' hideNavBar = {true}  />
					<Scene key='mylistview' component={MyListView} title='mylistview' style = {styles.scenStyle}/>
					<Scene key='seawebview' component={SeaWebView} title='' style = {styles.scenStyle}/>
					<Scene key='scan' component={Scan} title='二维码/条码' direction = 'vertical' style = {styles.scenStyle}/>
					<Scene key='video' component={Video} title='视频' direction = 'vertical' style = {styles.scenStyle}/>

					{/*个人中心*/}
					<Scene key='setting' component={Setting} title='设置' style = {styles.scenStyle} />
		  		<Scene key='about' component={AboutUs} title='关于海约' style = {styles.scenStyle}/>

					{/*登录注册*/}
					<Scene key='login' component={Login} title='登录' direction = 'vertical'  style = {styles.scenStyle} />
					<Scene key='resetPass' component={ResetPass} title='重置密码' style = {styles.scenStyle}/>
					<Scene key='setpass' component={SetPass} title='设置密码' style = {styles.scenStyle}/>
					<Scene key='modify' component={Modify} title='重置密码' style = {styles.scenStyle}/>
					<Scene key='selectrole' component={SelectRole} title='' style = {styles.scenStyle} />
					<Scene key='merchanttag' component={MerchantTag} title='' style = {styles.scenStyle}/>
					<Scene key='touristtag' component={TouristTag} title='' style = {styles.scenStyle}/>

					{/*线路*/}
					<Scene key='routelist' component={RouteList} style = {styles.scenStyle}/>
					<Scene key='routeDetail' component={RouteDetail} hideNavBar = {true} />
					<Scene key='selectDate' component={SelectDate} title = '选择出行信息' style = {styles.scenStyle} />
					<Scene key='selectCoupon' component={SelectCoupon} title = '选择优惠券' style = {styles.scenStyle} />
					<Scene key='orderConfirm' component={OrderConfirm} title = '订单确认' style = {styles.scenStyle} />
					<Scene key='insurerExplanation' component={InsurerExplanation} title = '保险说明' style = {styles.scenStyle}/>
					<Scene key='pay' component={Pay} title = '收银台' style = {styles.scenStyle} />
					<Scene key='paySuccess' component={PaySuccess} title = '支付结果' style = {styles.scenStyle} />

					{/*海钓*/}
					<Scene key='fishingDetail' component={FishingDetail} hideNavBar = {true} />
					<Scene key='fishingOrder' component={FishingOrder} title = '订单确认' style = {styles.scenStyle} />

					{/*出行人*/}
					<Scene key='participantList' component={ParticipantList} title = '选择出行人' style = {styles.scenStyle} />
					<Scene key='participantDetail' component={ParticipantDetail} title = '新增出行人' style = {styles.scenStyle} />


					{/*社区*/}
		  			<Scene key='dynamicDetail' component={CommunityDynamicDetail} title='动态详情' style = {styles.scenStyle}/>
		  			<Scene key='dynamicPublish' component={CommunityDynamicPublish} title='发布动态' style = {styles.scenStyle}/>
					<Scene key='activityPublish' component={CommunityActivityPublish} title='发布活动' style = {styles.scenStyle}/>
					<Scene key='activityDetail' component={CommunityActivityDetail} title='活动详情' style = {styles.scenStyle}/>
					<Scene key='activityPublishSucc' component={CommunityActivityPublishSucc} title='发布活动' style = {styles.scenStyle}/>
					<Scene key='personalCenter' component={CommunityPersonalCenter} title='个人首页'/>
					<Scene key='orderConfirm' component={CommunityOrderConfirm} title='订单确认' style = {styles.scenStyle}/>

		  			{/*商家*/}
					<Scene key='merchantIndex' component={MerchantIndex} title='商家中心' style = {styles.scenStyle}/>
					<Scene key='authentication' component={Authentication} title='身份认证' style = {styles.scenStyle}/>
					<Scene key='authenticationed' component={Authenticationed} title='身份认证' style = {styles.scenStyle} />
					<Scene key='merchantInfo' component={MerchantInfo} title='商家信息' style = {styles.scenStyle}/>
					<Scene key='merchantTagModify' component={MerchantTagModify} title='商家标签' style = {styles.scenStyle}/>
					<Scene key='merchantSet' component={MerchantSet} title='商家标签' style = {styles.scenStyle}/>
					<Scene key='merchantDetail' component={MerchantDetail} hideNavBar = {true} />
					<Scene key='merchantIntroduce' component={MerchantIntroduce} title='商家简介' style = {styles.scenStyle} />
					<Scene key='merchantOrderDetail' component={MerchantOrderDetail} title='订单详情' style = {styles.scenStyle} />
					<Scene key='merchantIncomeDetail' component={MerchantIncomeDetail} title='收支详情' style = {styles.scenStyle} />

					<Scene key='merchantList' component={MerchantList} title='星级商家' style = {styles.scenStyle} />
					<Scene key='withdrawDeposit' component={WithdrawDeposit} title='提现' style = {styles.scenStyle} />
					<Scene key='bankList' component={BankList} title='选择银行卡' style = {styles.scenStyle} />
					<Scene key='bankAdd' component={BankAdd} title='添加银行卡' style = {styles.scenStyle}/>
					<Scene key='withdrawSuccess' component={WithdrawSuccess} title='提现详情' style = {styles.scenStyle}/>

					{/*图片画廊*/}
					<Scene key='gallery' component={Gallery} title='图片画廊' style = {styles.scenStyle} />
					<Scene key='seaGallery' component={SeaGallery} title='图片画廊' style = {styles.scenStyle} />

					{/*首页*/}
					<Scene key='search' component={Search} title='' style = {styles.scenStyle} direction = 'vertical'/>
					<Scene key='searchResult' component={SearchResult} title='' style = {styles.scenStyle} />
					<Scene key='islandIndex' component={IslandIndex} title='海岛游' style = {styles.scenStyle}/>
					<Scene key='fishingIndex' component={FishingIndex} title = '海钓' style = {styles.scenStyle}/>

					{/*文章*/}
					<Scene key='articleList' component={ArticleList} title='文章' style = {styles.scenStyle}/>
					<Scene key='articleDetail' component={ArticleDetail} title='文章' style = {styles.scenStyle}/>

					{/*我的*/}
					<Scene key='feedback' component={Feedback} title='意见反馈' style = {styles.scenStyle} />
					<Scene key='couponList' component={CouponList} title='优惠券' style = {styles.scenStyle} />
					<Scene key='couponExplanation' component={CouponExplanation} title='使用说明' style = {styles.scenStyle} />
					<Scene key='friend' component={Friend} title='' style = {styles.scenStyle} />
					<Scene key='invite' component={Invite} title='邀请朋友' style = {styles.scenStyle} />
					<Scene key='infoModify' component={InfoModify} title='个人信息' style = {styles.scenStyle} />
					<Scene key='nameModify' component={NameModify} title='昵称' style = {styles.scenStyle}/>
					<Scene key='accountLevel' component={AccountLevel} title=''  hideNavBar = {true}/>
					<Scene key='touristTagModify' component={TouristTagModify} title='游客标签' style = {styles.scenStyle}/>
					<Scene key='integral' component={Integral} title='积分'  hideNavBar = {true}/>
					<Scene key='integralDetail' component={IntegralDetail} title='详情'  style = {styles.scenStyle}/>
					<Scene key='integralExplanation' component={IntegralExplanation} title='积分说明'  style = {styles.scenStyle} />
					<Scene key='orderList' component={OrderList} title='我的订单'  style = {styles.scenStyle}/>
					<Scene key='orderEvaluate' component={OrderEvaluate} title='发表评价'  style = {styles.scenStyle}/>
					<Scene key='orderDetail' component={OrderDetail} title='订单详情'  style = {styles.scenStyle} />
					<Scene key='orderRefund' component={OrderRefund} title='退款申请'  style = {styles.scenStyle} />
					<Scene key='collectIndex' component={CollectIndex} title='我的收藏'  style = {styles.scenStyle}/>

        </Scene>
      </Router>
    )
  }
}
const styles = StyleSheet.create({
	scenStyle: {
		paddingTop:Platform.OS === 'ios' ? 64 : 54
	}
})

//hideNavBar hideTabBar
//Actions.key(params),进行跳转，key替换为对应的key名称
// const Root = () => (
// 	<Provider store={store}>
// 		<Router >
// 		 	<Scene key='root' >
// 	        	<Scene key='index' component={Index} title='index' initial={true}/>
// 	        	<Scene key='first' component={First} title='first' />
// 	        	<Scene key='listview' component={MyListView} title='listview' />
// 	        </Scene>
// 	    </Router>
// 	</Provider>
// );
//
// export default Root;
//

// <Scene key='listview' component={RouteList}
// 	style = {styles.scenStyle}
// 	title='listview'
// 	backTitle='back'
// 	onRight={()=>{console.log(99);}}
// 	rightButtonImage = {require('../images/menu_burger.png')}
// />
