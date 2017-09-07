package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

public class MqImPush implements Serializable{
	private static final long serialVersionUID = 1L;
	@NotBlank
	private String phone;
	private String aboutUser;
	@NotBlank
	private String imMsg;
	/**目前类型有
	 * 1.订单消息
	 * 2.活动消息
	 * 3.评论消息
	 * 4.系统消息
	 * 5.赞消息
	 */
	@NotBlank
	private String imType;
	private String imMsgId;
	private String imTitle;

	public MqImPush() {
	}

	public MqImPush(String phone, String imMsg, String imTitle) {
		this.phone = phone;
		this.imMsg = imMsg;
		this.imTitle = imTitle;
	}

	public String getAboutUser() {
		return aboutUser;
	}
	public void setAboutUser(String aboutUser) {
		this.aboutUser = aboutUser;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getImMsg() {
		return imMsg;
	}
	public void setImMsg(String imMsg) {
		this.imMsg = imMsg;
	}
	public String getImType() {
		return imType;
	}
	public void setImType(String imType) {
		this.imType = imType;
	}
	public String getImMsgId() {
		return imMsgId;
	}
	public void setImMsgId(String imMsgId) {
		this.imMsgId = imMsgId;
	}
	public String getImTitle() {
		return imTitle;
	}
	public void setImTitle(String imTitle) {
		this.imTitle = imTitle;
	}
	@Override
	public String toString() {
		return "MqImPush [phone=" + phone + ", imMsg=" + imMsg + ", imType=" + imType + ", imMsgId=" + imMsgId
				+ ", imTitle=" + imTitle + "]";
	}
}