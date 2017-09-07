package com.hyhl.gotosea.console.system.permission;

import com.hfocean.common.auth.system.permission.eumn.IPermissionEnum;

public enum ExtPermissionEumn implements IPermissionEnum{
	
	//客户
	客户列表("rest_custs","客户管理","分页查询客户列表"),
	客户详情("rest_cust_id","客户管理","查询客户详情"),
	修改客户状态("rest_cust_id_status","客户管理","修改客户禁启用状态"),
	
	//商家
	商家列表("rest_merchants","商家管理","分页查询商家列表"),
	商家详情("rest_merchant_custId","商家管理","查询商家详情"),
	
	//审核
	审核列表("rest_audit_merchants","审核管理","分页查询审核列表"),
	审核商家用户详情("rest_cust_detail","审核管理","查询待审核人信息"),
	资格认证("rest_cust_id_audit_status","审核管理","商家资格认证"),
	
	//线路服务 
	线路服务上下架("rest_prod_serve_switch","服务管理","线路服务上/下线"),
	查询线路服务("rest_prod_serve_page","服务管理","分页查询线路服务管理"),
	新增线路服务("rest_prod_serve_route_add","服务管理","新增线路类型服务"),
	查询线路服务详情("rest_prod_serve_route_detail_id","服务管理","查询线路服务详情"),
	修改线路服务("rest_prod_serve_route_update","服务管理","修改线路详情内容"),
	
	//船舶服务
	查询租船服务("rest_prod_serve_page","服务管理","分页查询租船服务管理"),
	新增租船服务("rest_prod_serve_charter_add","服务管理","新增租船类型服务"),
	查询租船服务详情("rest_prod_serve_charter_detail_id","服务管理","修改租船服务详情"),
	修改租船服务("rest_prod_serve_charter_updat","服务管理","修改租船服务详情"),
	
	//销售计划
	查询服务销售计划("rest_prod_serve_sale_page_serveId","服务管理","分页查询销售计划"),
	添加服务销售计划("rest_prod_serve_sale_add","服务管理","添加服务销售计划"),
	删除服务销售计划("rest_prod_serve_sale_del_id","服务管理","删除服务销售计划"),
	
	//商家资源 
	查询商家资源("rest_prod_merchResource_list","商家资源管理","分页查询商家资源"),
	新增商家资源("rest_prod_merchResource","商家资源管理","新增商家资源"),
	商家资源详情("rest_prod_merchResource_detail","商家资源管理","商家资源详情"),
	修改商家资源("rest_prod_merchResource_id","商家资源管理","修改商家资源"),
	修改商家资源状态("rest_prod_merchResource_a","商家资源管理","修改商家资源上下线状态"),

	//文章
	文章列表("rest_art_list","文章管理","分页查询文章管理"),
	文章新增("rest_art_add","文章管理","新增文章"),
	文章详情("rest_art_detail","文章管理","查看文章详情"),
	文章修改状态("rest_art_status","文章管理","修改文章发布状态"),
	文章删除("rest_art_delete","文章管理","删除文章"),
	
	//活动
	活动列表("rest_act_list","活动管理","分页查询活动管理"),
	活动详情("rest_act_actId","活动管理","查询活动管理详情"),
	
	//优惠券
	优惠券列表("rest_coup_all","优惠券管理","分页查询优惠券列表"),
	优惠券新增("rest_coup","优惠券管理","新增优惠券"),
	优惠券禁启用("rest_coup_state","优惠券管理","修改优惠券禁启用状态"),
	优惠券修改("rest_coup_id","优惠券管理","修改内容优惠券"),
	优惠券详情("rest_coup_detail","优惠券管理","查看优惠券详情"),
	优惠卷获取条件("rest_coup_ways","优惠券管理","查看优惠券获取条件"),
	
	//数据字典
	数据字典列表("rest_dic_list","数据字典管理","分页查询数据字典数据"),
	新增数据字典数据("rest_dic_add","数据字典管理","新增数据字典数据"),

	//广告
	查询广告列表("rest_banner_list","首页管理","分页查询广告列表"),
	新增广告("rest_banner_add","首页管理","新增广告"),
	广告详情("rest_banner_detail","首页管理","修改广告详情"),	
	修改状态("rest_banner_status","首页管理","修改广告状态"),
		
	//订单
	查询商家订单列表("rest_order_merc_list","订单管理","分页查询商家订单列表"),
	查询商家订单详情("rest_order_merc_detail_id","订单管理","查询商家订单详情"),
	查询玩家订单列表("rest_order_list","订单管理","分页查询玩家订单列表"),
	查询玩家订单详情("rest_order_detail_id","订单管理","查询玩家订单详情"),
	
	//提现
	查询提现列表("rest_withdraws","提现管理","分页查询提现列表"),
	修改提现状态("rest_withdraw_id","提现管理","修改提现成功与否状态")
	
	
	;
	
	
	public String value;public String component;public String desc;
	
	ExtPermissionEumn(String value,String component,String desc){
		this.value = value;this.component = component;this.desc = desc;
	}

	public String value() {
		return value;
	}


	public String component() {
		return component;
	}
	
	public String desc(){
		return desc;
	}

	

}
