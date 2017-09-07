package com.hyhl.gotosea.core.sms.enm;

/**
 * <p>Title: SMSHyEnum</p>
 * <p>Description: 海约互联_阿里大于_短信模版</p>
 * @author guan.sj
 * @since 2017年4月11日
 */
public enum SmsTemplate {

	/** 您正在使用海约APP服务进行短信认证，您的验证码为${code}，请在${time}分钟内完成验证。*/
	_01_验证码("SMS_85375042",new String[]{"code","time"}),
	
	/** 您好，您申请的商家身份已通过审核，请登录海约app查看详情。*/
	_02_商家认证成功("SMS_85410049",new String[]{}),
	
	/** 您好，您申请的商家身份未通过审核，请登录海约app查看详情重新提交资料进行审核。如有任何疑问，请致电海约客服热线${phone}。
	 * 	服务热线--> @SEE Constant.HYHL_HOTLINE
	 * */
	_03_商家认证失败("SMS_85415058",new String[]{"phone"}),
	
	/** 您参与的活动已成行，请登录海约app查看订单并完成付款。*/
	_04_活动成行("SMS_85475039",new String[]{}),
	
	/** 您参与的活动已取消，原因：${reason}，请登录海约app查看详情。*/
	_05_活动取消未成行("SMS_85355041",new String[]{"reason"}),
	
	/** 您参与的活动已取消，原因：${reason}，请登录海约app查看详情。如果您已付款，我们会在${time}个工作日内为您退款。*/
	_06_活动取消成行("SMS_85395053",new String[]{"reason","time"}),
	
	/** 您参与的活动已组织成功，出行日期：${time}。请与您的小伙伴做好出行准备，祝您旅途愉快。如有任何疑问，请致电海约客服热线${phone}。
	 * 	服务热线--> @SEE Constant.HYHL_HOTLINE
	 * */
	_07_活动组织成功("SMS_85455050",new String[]{"time","phone"}),
	
	/** 您的海约订单“${name}”正在等待您的支付。我们会为您保留订单${time}分钟，逾时系统将会自动关闭订单。请尽快完成支付，开启您的愉快旅程。如有任何疑问，请致电海约客服热线${phone}。
	 * 	服务热线--> @SEE Constant.HYHL_HOTLINE
	 * */
	_08_线路服务待付款 ("SMS_85535083",new String[]{"name","time","phone"}),
	
	/** 您的海约订单“${name}”已支付成功。我们将会在${time}小时内核实是否有位，请保持手机畅通。如有任何疑问，请致电海约客服热线${phone}。
	 * 	服务热线--> @SEE Constant.HYHL_HOTLINE
	 * */
	_09_线路服务付款成功("SMS_85455058",new String[]{"name","time","phone"}),
	
	/** 您预订的“${name}”已出单成功，出行日期：${time}。请做好出行准备，祝您旅途愉快。如有任何疑问，请致电海约客服热线${phone]。<br> 
	 * 	服务热线--> @SEE Constant.HYHL_HOTLINE
	 * */
	_10_线路服务出单成功("SMS_85385075",new String[]{"name","time","phone"}),
	
	/** 您预订的“${name}”出单失败。我们会在${time}个工作日内为您退款，对您的旅程产生影响，我们感到非常抱歉。如有任何疑问，请致电海约客服热线${phone}。
	 *	服务热线--> @SEE Constant.HYHL_HOTLINE
	 * */
	_11_线路服务出单失败("SMS_85390054",new String[]{"name","time","phone"}),

    
    ;
    private String template;
    private String[] param;
    
    private SmsTemplate(String template,String[] param){
        this.template = template;
        this.param = param;
    }
    public String getTemplate(){
        return this.template;
    }
    
    public String[] getParam(){
    	return this.param;
    }
    
}
