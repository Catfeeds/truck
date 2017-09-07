Ext.define('Rich.Url',{
	singleton: true,
	
	//文章模块
	essayPagePath:'/rest/art/list',//文章分页查询
	essayAllPath:'/rest/art',//文章增/删/改/查
	
	//用户
	custsListPath:'/rest/custs',//客户列表
	custsChangeStatusPath:'/rest/cust/',//修改客户状态
	custsSengMsgPath:'/rest/sendmsg',//发送消息
	custsSynUserPath:'/rest/synim',//同步用户
	custDetailPath:'/rest/cust/',
	custsCheckPath:'/rest/audit/merchant/',//审核客户-商家角色  
	
	//商家
	merchantListPath:'/rest/merchants',//商家管理
	merchantDetailPath:'/rest/merchant/',//商家详情
	merchantCheckListPath:'/rest/audit/merchants',//商家审核列表
	
	//优惠劵
	conponListPath:'rest/coup/all',//优惠劵列表
	conponAddPath:'rest/coup',//新增优惠券
	conponStatusPath:'rest/coup/state',//优惠券状态修改
	conponTermPath:'rest/coup/listways',//优惠券条件查询
	
	//数据字典
	dictionaryListPath:'rest/dic/list',//字典节点查询 
	dictionaryUpdaPath:'rest/dic/update',//字典书记修改
	dictionaryAddPath:'rest/dic/add',//数据字典新增节点
	dictionaryDeletePath:'rest/dic/del/',
	
	//商家资源
	prodLabelPath:'/rest/prod/merchResType/list',//商家资源类型标签
	prodListPath:'/rest/prod/merchResource/list',//商家资源列表
	prodAddPath:'/rest/prod/merchResource',//新增商家资源
	prodUpdatePath:'/rest/prod/merchResource/',//商家资源修改
	prodDeletePath:'/rest/prod/merchResource',//删除商家资源
	
	//订单
	//OrderListPath:'app/data/dictionary.json',
	orderMercListPath:'/rest/order/merc/list',//商家订单列表
	orderMercDetailPath:'/rest/order/merc/detail/',//商家订单详情
	orderTerraceListPath:'/rest/order/list',//平台订单列表
	orderTerraceDetailPath:'/rest/order/detail/',//品台订单详情
	orderMercSurePath:'rest/order/sure/',
	orderMercReturnPath:'rest/order/return/',
	
	//活动
	actiListPath:'/rest/act/list',//活动列表
	actiDetailPath:'/rest/act/',//活动详情
	
	//线路
	routeTypePath:'/rest/prod/serve/type',//线路服务类型
	routeUnitPath:'rest/ref/bus/unit',//服务业务板块类型
	routeTagPath:'rest/ref/serve/tag',//服务标签
	routeAreaPath:'/rest/local/area/link',//目的地
	routeAddPath:'/rest/prod/serve/route/add',//新增目的地
	routeListPath:'/rest/prod/serve/page',//分页查询线路
	routeSwichPath:'/rest/prod/serve/switch/',//线路上下架服务
	routeDetailPath:'/rest/prod/serve/route/detail/',//海岛游线路详情
	routeUpdatePath:'/rest/prod/serve/route/update',//修改线路详情
	
	//线路船舶
	shipListPath:'/rest/prod/serve/charter/add',//新增租船
	shipDetailPath:'/rest/prod/serve/charter/detail/',//租船详情
	shipUpdatePathL:'/rest/prod/serve/charter/update',//修改租船
	shipTagListPath:'/rest/prod/serve/reso/page/',//船舶资源服务列表
	shipTagTypePath:'/rest/prod/serve/reso/list/',//根据资源类型选择资源数据
	shipTagAddPath:'/rest/prod/serve/reso/add',//新增租船服务定价
	shipTagDelPath:'/rest/prod/serve/reso/del/',//删除租船定价服务
	
	//线路销售计划
	routeSaleAPath:'/rest/prod/serve/sale/add',//添加线路销售计划
	routeSaleDPath:'/rest/prod/serve/sale/page/',//线路销售计划详情
	routeSaleEPath:'/rest/prod/serve/sale/del/',//删除销售计划
	
	//财务
	withdrawListPath:'/rest/withdraws',//提现的列表
	withdrawStatusPathL:'/rest/withdraw/',//提现结果
	
	//地区
	locatLabelPath:'/rest/locator/list',//地区下拉框
	
	//广告
	bannerListPath:'/rest/banner/list',//查询广告列表
	bannerAddPath:'rest/banner',//新增广告
	
	
	/**
	 * 图片上传地址
	 * @type String
	 */
	upLoadArticlePath:'/oss/article/image',//上传文章图片 
	upLoadProdPath:'/oss/prod/image',//资源上传图片
	/**
	 * system 权限
	 */
	loginPath:'auth/login',//登录系统
	logoutPath:'auth/logout',//退出系统
	userInfoPath:'sys/user/info',//当前登录用户信息
	updateMyInfoPath:'sys/user/updateMyInfo',//修改当前登录用户信息
	checkCodeImgletPath:'./verify/code',//验证码路径
	
	rightPath:'sys/permission/myPermission',
	
	auserAddPath:'sys/admin/add',
	orgAuserListPath:'sys/admin/list',
	auserUpdatePath:'sys/admin/update',
	
	orgTreePath:'sys/org/listCurrentUserOrg',
    //根据组织id查询组织信息
    orgInfoPath:'sys/org/find',//参数为id 值:组织id
    
    addOrgPath:'sys/org/add',//参数为org.xx 
    
    editOrgPath:'sys/org/update',//参数为org.xx
    
    delOrgPath:'sys/org/del',//参数为id 值:组织id
    
    
    //根据组织id查询用户
    searchUserByOrgIdPath:'sys/user/list',//参数为orgId 值:组织id
    //根据用户userName/主键 查询用户资料
    searchUserByIdPath:'sys/user/find',//参数为user.userName 
    //修改用户信息
    editUserPath:'sys/user/update',//参数为user.xx
    //删除用户
    delUserPath:'sys/user/del',//参数为user.userName 
    //新增用户
    addUserPath:'sys/user/add',//参数为user.xx 
    
    
    //查询用户角色
    searchRoleByUserName:'sys/role/listUserRole',//参数:userName
    //添加角色给用户
    appendRoleToUser:'sys/role/addRoleUser',// userName,roleIds
    //移除用户的角色
    removeRoleFromUser:'sys/role/delRoleUser',
    
    //查询组织的角色
    searchRoleByOrgId:'sys/role/listOrgRole',//参数:orgId
    //添加组织的角色
    appendRoleToOrg:'sys/role/addRoleOrg',//参数:orgId ,roleIds
    //移除组织的角色
    removeRoleFromOrg:'sys/role/delRoleOrg',//参数:orgId ,roleIds
	
	
	//所有角色列表
    searchAllRoles:'sys/role/list',
    //添加角色
    addRole:'sys/role/add',//参数: role.roleName ....
    //删除角色
    delRole:'sys/role/del',//参数: roleId
    //修改角色
    editRole:'sys/role/update',//参数:role.roleName .....
    //添加 角色的资源
    addRoleResourceRef:'sys/role/addRoleResource', //参数:roleId(角色id),resIds(资源id,格式为: 11,22,33),resAddDele(说明: 增 0 /减 1 操作)
    //移除角色的资源
    delRoleResourceRef:'sys/role/delRoleResource', //参数:roleId(角色id),resIds(资源id,格式为: 11,22,33)
    //获得角色的资源
    searchRoleResourceRef:'sys/permission/listByRoleId', //参数:roleId(角色id)
    //获取所有资源列表
    searchAllResources:'sys/permission/listAll',
	
	
	
	
	
	
	/**
	 * 图标
	 * 可以这么访问   Rich.Url.icons_19 (resources/images/icons目录下查找想用的图标)
	 */
	iconsPath:'resources/images/icons'
	/*
    skinPaths:[{rightId:'skin-blue',path:'skin/skin-blue.css'},{rightId:'skin-green',path:'skin/skin-green.css'},{rightId:'skin-black',path:'skin/skin-black.css'},{rightId:'skin-orange',path:'skin/skin-orange.css'}],
    getSkinPath:function(index,nocache){
    	var res = this.skinPaths[index].path;
    	if(res){
    		res = Ext.PATH_APP_RESOURCES + res;
    		if(nocache){
        		res = res +'?_dc='+ new Date().getTime();
        	}
    	}
    	return res;
    },
    getFullPath:function(){
    	
    }
    */
},function(me){
	for(var i=1;i<47;i++){
		me['icons_'+i] = me.iconsPath + '/'+i+'.png';
	}
});