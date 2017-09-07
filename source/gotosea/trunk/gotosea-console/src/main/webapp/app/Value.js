Ext.define('Rich.Value',{
	singleton: true,
	all:'all',
	vistor:'vistor',
	owner:'owner',
	captain:'captain',
	boatman:'boatman',
	online:'online',
	history:'history',
	store:'store',
	route:'route',
	ship:'ship',
	fish:'fish',
	
	admin_user:["admin_user_findList","admin_user_add","admin_user_find","admin_user_del","admin_user_update"],
	admin_user_findList:"admin_user_findList",//"权限管理-用户管理","查询用户列表"),
	admin_user_add:"admin_user_add",//"权限管理-用户管理","新增用户"),
	admin_user_find:"admin_user_find",//"权限管理-用户管理","查找用户"),
	admin_user_del:"admin_user_del",//"权限管理-用户管理","删除用户"),
	admin_user_resetPassword:"admin_user_resetPassword",//"权限管理-用户管理","重置密码"),
	admin_user_updatePassword:"admin_user_updatePassword",//"权限管理-用户管理","修改密码"),
	admin_user_update:"admin_user_update",//"权限管理-用户管理","修改用户"),
	/*用户角色管理*/
	admin_userrole:["admin_role_listUserRole","admin_role_addRoleUser","admin_role_delRoleUser"],
	admin_role_listUserRole:"admin_role_listUserRole",//"权限管理-用户角色管理","查找用户角色"),
	admin_role_addRoleUser:"admin_role_addRoleUser",//"权限管理-用户角色管理","新增用户的角色"),
	admin_role_delRoleUser:"admin_role_delRoleUser",//"权限管理-用户角色管理","删除用户的角色"),
	/*组织管理*/
	admin_org:["admin_org_add","admin_org_del","admin_org_update","admin_org_find"],
	admin_org_add:"admin_org_add",//"权限管理-组织管理","新增组织"),
	admin_org_del:"admin_org_del",//"权限管理-组织管理","删除组织"),
	admin_org_update:"admin_org_update",//"权限管理-组织管理","修改组织"),
	admin_org_find:"admin_org_find",//"权限管理-组织管理","查找组织"),
	/*组织角色管理*/
	admin_orgrole:["admin_role_listOrgRole","admin_role_addRoleOrg","admin_role_delRoleOrg"],
	admin_role_listOrgRole:"admin_role_listOrgRole",//"权限管理-组织角色管理","查找组织角色"),
	admin_role_addRoleOrg:"admin_role_addRoleOrg",//"权限管理-组织角色管理","新增组织的角色"),
	admin_role_delRoleOrg:"admin_role_delRoleOrg",//"权限管理-组织角色管理","删除组织的角色"),
	/*角色管理       角色资源管理*/
	
	admin_role:["admin_role_add","admin_role_update","admin_role_del","admin_role_find","admin_role_findList","admin_role_addRoleResource","admin_role_delRoleResource"],
	admin_role_add:"admin_role_add",//"权限管理-角色管理","新增角色"),
	admin_role_update:"admin_role_update",//"权限管理-角色管理","修改角色"),
	admin_role_del:"admin_role_del",//"权限管理-角色管理","删除角色"),
	admin_role_find:"admin_role_find",//"权限管理-角色管理","查找角色"),
	admin_role_findList:"admin_role_findList",//"权限管理-角色资源管理","查找角色列表"),
	
	admin_role_addRoleResource:"admin_role_addRoleResource",//"权限管理-角色资源管理","给角色添加资源"),
	admin_role_delRoleResource:"admin_role_delRoleResource",//"权限管理-角色资源管理","给角色删除资源"),
	
	/**
	 * 客户管理
	 */
	client:["rest_custs","rest_cust_id","rest_cust_id_status","rest_merchants","rest_merchant_custId","rest_audit_merchants","rest_cust_detail","rest_cust_id_audit_status"],
	//用户
	cust:["rest_custs","rest_cust_id","rest_cust_id_status"],
	rest_custs:"rest_custs",//"客户管理","分页查询客户列表"
	rest_cust_id:"rest_cust_id",//"客户管理","查询客户详情"
	rest_cust_id_status:"rest_cust_id_status",//"客户管理","修改客户禁启用状态"
	//商家
	merchant:["rest_merchants","rest_merchant_custId"],
	rest_merchants:"rest_merchants",//"商家管理","分页查询商家列表"
	rest_merchant_custId:"rest_merchant_custId",//"商家管理","查询商家详情"
	//审核
	check:["rest_audit_merchants","rest_cust_detail","rest_cust_id_audit_status"],
	rest_audit_merchants:"rest_audit_merchants",//"审核管理","分页查询审核列表"
	rest_cust_detail:"rest_cust_detail",//"审核管理","查询待审核人信息"
	rest_cust_id_audit_status:"rest_cust_id_audit_status",//"审核管理","商家资格认证"
	
	/**
	 * 服务管理
	 */
	server:["rest_prod_serve_switch","rest_prod_serve_page","rest_prod_serve_route_add","rest_prod_serve_route_detail_id","rest_prod_serve_route_update",
	"rest_prod_serve_page","rest_prod_serve_charter_add","rest_prod_serve_charter_detail_id","rest_prod_serve_charter_updat","rest_prod_serve_sale_page_serveId",
	"rest_prod_serve_sale_add","rest_prod_serve_sale_del_id"],
	//线路服务
	route:["rest_prod_serve_switch","rest_prod_serve_page","rest_prod_serve_route_add","rest_prod_serve_route_detail_id","rest_prod_serve_route_update"],
	rest_prod_serve_switch:"rest_prod_serve_switch",//"服务管理","线路服务上/下线"
	rest_prod_serve_page:"rest_prod_serve_page",//"服务管理","分页查询线路服务管理"
	rest_prod_serve_route_add:"rest_prod_serve_route_add",//"服务管理","新增线路类型服务"
	rest_prod_serve_route_detail_id:"rest_prod_serve_route_detail_id",//"服务管理","查询线路服务详情"
	rest_prod_serve_route_update:"rest_prod_serve_route_update",//"服务管理","修改线路详情内容"
	//租船
	ship:["rest_prod_serve_page","rest_prod_serve_charter_add","rest_prod_serve_charter_detail_id","rest_prod_serve_charter_updat"],
	rest_prod_serve_page:"rest_prod_serve_page",//"服务管理","分页查询租船服务管理"
	rest_prod_serve_charter_add:"rest_prod_serve_charter_add",//"服务管理","新增租船类型服务"
	rest_prod_serve_charter_detail_id:"rest_prod_serve_charter_detail_id",//"服务管理","修改租船服务详情"
	rest_prod_serve_charter_updat:"rest_prod_serve_charter_updat",//"服务管理","修改租船服务详情"
	
	/**
	 * 商家资源管理
	 * @type 
	 */
	merchResource:["rest_prod_merchResource_list","rest_prod_merchResource","rest_prod_merchResource_detail","rest_prod_merchResource_id","rest_prod_merchResource_a"],
	rest_prod_merchResource_list:"rest_prod_merchResource_list",//"商家资源管理","分页查询商家资源"
	rest_prod_merchResource:"rest_prod_merchResource",//"商家资源管理","新增商家资源"
	rest_prod_merchResource_detail:"rest_prod_merchResource_detail",//"商家资源管理","商家资源详情"
	rest_prod_merchResource_id:"rest_prod_merchResource_id",//"商家资源管理","修改商家资源"
	rest_prod_merchResource_a:"rest_prod_merchResource_a",//"商家资源管理","修改商家资源上下线状态"
	
	/**
	 * 文章
	 * @type 
	 */
	essay:["rest_art_list","rest_art_add","rest_art_detail","rest_art_status","rest_art_delete"],
	rest_art_list:"rest_art_list",//"文章管理","分页查询文章管理"
	rest_art_add:"rest_art_add",//"文章管理","新增文章"
	rest_art_detail:"rest_art_detail",//"文章管理","查看文章详情"
	rest_art_status:"rest_art_status",//"文章管理","修改文章发布状态"
	rest_art_delete:"rest_art_delete",//"文章管理","删除文章"
	
	/**
	 * 活动
	 * @type 
	 */
	activity:["rest_act_list","rest_act_actId"],
	rest_act_list:"rest_act_list",//"活动管理","分页查询活动管理"
	rest_act_actId:"rest_act_actId",//"活动管理","查询活动管理详情"
	
	/**
	 * 优惠券
	 * @type 
	 */
	coupon:["rest_coup_all","rest_coup","rest_coup_state","rest_coup_id","rest_coup_detail"],
	rest_coup_all:"rest_coup_all",//"优惠券管理","分页查询优惠券列表"
	rest_coup:"rest_coup",//"优惠券管理","新增优惠券"
	rest_coup_state:"rest_coup_state",//"优惠券管理","修改优惠券禁启用状态"
	rest_coup_id:"rest_coup_id",//"优惠券管理","修改内容优惠券"
	rest_coup_detail:"rest_coup_detail",//"优惠券管理","查看优惠券详情"
	
	/**
	 * 首页管理
	 * @type 
	 */
	//广告
	banner:["rest_banner_list","rest_banner_add","rest_banner_detail","rest_banner_status"],
	rest_banner_list:"rest_banner_list",//"首页管理","分页查询广告列表"
	rest_banner_add:"rest_banner_add",//"首页管理","新增广告"
	rest_banner_detail:"rest_banner_detail",//"首页管理","修改广告详情"
	rest_banner_status:"rest_banner_status",//"首页管理","修改广告状态"
		
	/**
	 * 订单
	 * @type 
	 */
	order:["rest_order_merc_list","rest_order_merc_detail_id","rest_order_list","rest_order_detail_id"],
	terrace:["rest_order_merc_list","rest_order_merc_detail_id"],
	rest_order_merc_list:"rest_order_merc_list",//"订单管理","分页查询商家订单列表"
	rest_order_merc_detail_id:"rest_order_merc_detail_id",//"订单管理","查询商家订单详情"
	player:["rest_order_list","rest_order_detail_id"],
	rest_order_list:"rest_order_list",//"订单管理","分页查询玩家订单列表"
	rest_order_detail_id:"rest_order_detail_id",//"订单管理","查询玩家订单详情"
	
	/**
	 * 财务
	 * @type 
	 */
	//提现
	drowback:["rest_withdraws","rest_withdraw_id"],
	rest_withdraws:"rest_withdraws",//"提现管理","分页查询提现列表"
	rest_withdraw_id:"rest_withdraw_id",//"提现管理","修改提现成功与否状态"
	
	
	/**
	 * 数据字典
	 * @type 
	 */
	dictionary:["rest_dic_list","rest_dic_add"],	
	rest_dic_list:"rest_dic_list",//"数据字典管理","分页查询数据字典数据"
	rest_dic_add:"rest_dic_add"//"数据字典管理","新增数据字典数据"
	
	
	
},function(){
	var v = Rich.V = Rich.Value;
	
	
	Rich.V.admin_ = [].concat(v.admin_user,v.admin_userrole,v.admin_org,v.admin_orgrole,v.admin_role);
});