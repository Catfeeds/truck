package com.hyhl.common.validator.custom;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class IdCardValidator implements ConstraintValidator<IdCard, String> {

	private String message;

	@Override
	public void initialize(IdCard paramA) {
		this.message = paramA.message();
	}

	@Override
	public boolean isValid(String idCard, ConstraintValidatorContext paramConstraintValidatorContext) {
		if (idCard == null || idCard.trim().equals("")) {
			message = "身份证不能为空";
		} else {
			if (isIdCard(idCard)) {
				return true;
			} else {
				message = "身份证号码格式不正确";
			}
		}
		paramConstraintValidatorContext.disableDefaultConstraintViolation();
		paramConstraintValidatorContext.buildConstraintViolationWithTemplate(message).addConstraintViolation();
		return false;
	}

	public static boolean isIdCard(String num) {
		num = num.trim().toLowerCase();
		String[] ValCodeArr = { "1", "0", "x", "9", "8", "7", "6", "5", "4", "3", "2" };
		String[] Wi = { "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" };
		String Ai = "";
		// ================ 号码的长度 15位或18位 ================
		if (num.length() != 15 && num.length() != 18) {
			return false;
		}
		// =======================(end)========================

		// ================ 数字 除最后以为都为数字 ================
		if (num.length() == 18) {
			Ai = num.substring(0, 17);
		} else if (num.length() == 15) {
			Ai = num.substring(0, 6) + "19" + num.substring(6, 15);
		}
		if (isNumeric(Ai) == false) {
			return false;
		}
		// =======================(end)========================

		// ================ 出生年月是否有效 ================
		String strYear = Ai.substring(6, 10);// 年份
		String strMonth = Ai.substring(10, 12);// 月份
		String strDay = Ai.substring(12, 14);// 月份
		if (isDataFormat(strYear + "-" + strMonth + "-" + strDay) == false) {
			return false;
		}
		GregorianCalendar gc = new GregorianCalendar();
		SimpleDateFormat s = new SimpleDateFormat("yyyy-MM-dd");
		try {
			if ((gc.get(Calendar.YEAR) - Integer.parseInt(strYear)) > 150
					|| (gc.getTime().getTime() - s.parse(strYear + "-" + strMonth + "-" + strDay).getTime()) < 0) {
				return false;
			}
		} catch (Exception e) {
			return false;
		}
		if (Integer.parseInt(strMonth) > 12 || Integer.parseInt(strMonth) == 0) {
			return false;
		}
		if (Integer.parseInt(strDay) > 31 || Integer.parseInt(strDay) == 0) {
			return false;
		}
		// =====================(end)=====================

		// ================ 地区码时候有效 ================
		Hashtable<String, String> h = GetAreaCode();
		if (h.get(Ai.substring(0, 2)) == null) {
			return false;
		}
		// ==============================================

		// ================ 判断最后一位的值 ================
		int TotalmulAiWi = 0;
		for (int i = 0; i < 17; i++) {
			TotalmulAiWi = TotalmulAiWi + Integer.parseInt(String.valueOf(Ai.charAt(i))) * Integer.parseInt(Wi[i]);
		}
		int modValue = TotalmulAiWi % 11;
		String strVerifyCode = ValCodeArr[modValue];
		Ai = Ai + strVerifyCode;

		if (num.length() == 18) {
			if (Ai.equals(num) == false) {
				return false;
			}
		}
		// =====================(end)=====================
		return true;
	}

	/**
	 * 功能：判断字符串是否为数字
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile("[0-9]*");
		Matcher isNum = pattern.matcher(str);
		if (isNum.matches()) {
			return true;
		} else {
			return false;
		}
	}

	public static boolean isDataFormat(String str) {
		boolean flag = false;
		// String
		// regxStr="[1-9][0-9]{3}-[0-1][0-2]-((0[1-9])|([12][0-9])|(3[01]))";
		String regxStr = "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$";
		Pattern pattern1 = Pattern.compile(regxStr);
		Matcher isNo = pattern1.matcher(str);
		if (isNo.matches()) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 功能：设置地区编码
	 * 
	 * @return Hashtable 对象
	 */
	public static Hashtable<String, String> GetAreaCode() {
		Hashtable<String, String> hashtable = new Hashtable<String, String>();
		hashtable.put("11", "北京");
		hashtable.put("12", "天津");
		hashtable.put("13", "河北");
		hashtable.put("14", "山西");
		hashtable.put("15", "内蒙古");
		hashtable.put("21", "辽宁");
		hashtable.put("22", "吉林");
		hashtable.put("23", "黑龙江");
		hashtable.put("31", "上海");
		hashtable.put("32", "江苏");
		hashtable.put("33", "浙江");
		hashtable.put("34", "安徽");
		hashtable.put("35", "福建");
		hashtable.put("36", "江西");
		hashtable.put("37", "山东");
		hashtable.put("41", "河南");
		hashtable.put("42", "湖北");
		hashtable.put("43", "湖南");
		hashtable.put("44", "广东");
		hashtable.put("45", "广西");
		hashtable.put("46", "海南");
		hashtable.put("50", "重庆");
		hashtable.put("51", "四川");
		hashtable.put("52", "贵州");
		hashtable.put("53", "云南");
		hashtable.put("54", "西藏");
		hashtable.put("61", "陕西");
		hashtable.put("62", "甘肃");
		hashtable.put("63", "青海");
		hashtable.put("64", "宁夏");
		hashtable.put("65", "新疆");
		hashtable.put("71", "台湾");
		hashtable.put("81", "香港");
		hashtable.put("82", "澳门");
		hashtable.put("91", "国外");
		return hashtable;
	}

	/** 台湾身份首字母对应数字 */
	public static Map<String, Integer> twFirstCode = new HashMap<String, Integer>();
	/** 香港身份首字母对应数字 */
	public static Map<String, Integer> hkFirstCode = new HashMap<String, Integer>();

	static {
		twFirstCode.put("A", 10);
		twFirstCode.put("B", 11);
		twFirstCode.put("C", 12);
		twFirstCode.put("D", 13);
		twFirstCode.put("E", 14);
		twFirstCode.put("F", 15);
		twFirstCode.put("G", 16);
		twFirstCode.put("H", 17);
		twFirstCode.put("J", 18);
		twFirstCode.put("K", 19);
		twFirstCode.put("L", 20);
		twFirstCode.put("M", 21);
		twFirstCode.put("N", 22);
		twFirstCode.put("P", 23);
		twFirstCode.put("Q", 24);
		twFirstCode.put("R", 25);
		twFirstCode.put("S", 26);
		twFirstCode.put("T", 27);
		twFirstCode.put("U", 28);
		twFirstCode.put("V", 29);
		twFirstCode.put("X", 30);
		twFirstCode.put("Y", 31);
		twFirstCode.put("W", 32);
		twFirstCode.put("Z", 33);
		twFirstCode.put("I", 34);
		twFirstCode.put("O", 35);
		hkFirstCode.put("A", 1);
		hkFirstCode.put("B", 2);
		hkFirstCode.put("C", 3);
		hkFirstCode.put("R", 18);
		hkFirstCode.put("U", 21);
		hkFirstCode.put("Z", 26);
		hkFirstCode.put("X", 24);
		hkFirstCode.put("W", 23);
		hkFirstCode.put("O", 15);
		hkFirstCode.put("N", 14);
	}

	/**检查香港台湾澳门身份证
	 * 1香港澳门
	 * 2台湾
     * @param idCard
     * @return
     */
	public static boolean validateIdCard(String idCard, int type) {
		boolean result = false;
		String card = idCard.replaceAll("[\\(|\\)]", "");
		if (card.length() != 8 && card.length() != 9 && idCard.length() != 10) {
			return false;
		}
		switch (type) {
		case 1:
			if (idCard.matches("^[A-Z]{1,2}[0-9]{6}\\(?[0-9A]\\)?$")) // 香港
				result = validateHKCard(idCard);
			if (idCard.matches("^[1|5|7][0-9]{6}\\(?[0-9A-Z]\\)?$")) // 澳门
				result = true;
			break;
		case 2:
			if (idCard.matches("^[a-zA-Z][0-9]{9}$")) { // 台湾
				String char2 = idCard.substring(1, 2);
				if (char2.equals("1") || char2.equals("2")) {
					result = validateTWCard(idCard);
				}
			}
			break;
		default:
			break;
		}
		return result;
	}

	/**
	 * 检查回乡证
	 * 
	 * @param idCard
	 * @return
	 */
	public static boolean validateReturnPermitIdCard(String idCard) {
		return idCard.matches("^[H|M][0-9]{10}$");
	}

	/**
	 * 验证10位身份编码是否合法
	 * 
	 * @param idCard
	 *            身份编码
	 * @return 身份证信息数组
	 *         <p>
	 *         [0] - 台湾、澳门、香港 [1] - 性别(男M,女F,未知N) [2] - 是否合法(合法true,不合法false)
	 *         若不是身份证件号码则返回null
	 *         </p>
	 */
	public static String[] validateIdCard10(String idCard) {
		String[] info = new String[3];
		String card = idCard.replaceAll("[\\(|\\)]", "");
		if (card.length() != 8 && card.length() != 9 && idCard.length() != 10) {
			info[2] = "false";
			return info;
		}
		if (idCard.matches("^[a-zA-Z][0-9]{9}$")) { // 台湾
			info[0] = "台湾";
			String char2 = idCard.substring(1, 2);
			if (char2.equals("1")) {
				info[1] = "M";
			} else if (char2.equals("2")) {
				info[1] = "F";
			} else {
				info[1] = "N";
				info[2] = "false";
				return info;
			}
			info[2] = validateTWCard(idCard) ? "true" : "false";
		} else if (idCard.matches("^[1|5|7][0-9]{6}\\(?[0-9A-Z]\\)?$")) { // 澳门
			info[0] = "澳门";
			info[1] = "N";
			info[2] = "true";
		} else if (idCard.matches("^[A-Z]{1,2}[0-9]{6}\\(?[0-9A]\\)?$")) { // 香港
			info[0] = "香港";
			info[1] = "N";
			info[2] = validateHKCard(idCard) ? "true" : "false";
		} else {
			info[2] = "false";
			return info;
		}
		return info;
	}

	/**
	 * 验证台湾身份证号码
	 * 
	 * @param idCard
	 *            身份证号码
	 * @return 验证码是否符合
	 */
	public static boolean validateTWCard(String idCard) {
		String start = idCard.substring(0, 1);
		String mid = idCard.substring(1, 9);
		String end = idCard.substring(9, 10);
		Integer iStart = twFirstCode.get(start);
		Integer sum = iStart / 10 + (iStart % 10) * 9;
		char[] chars = mid.toCharArray();
		Integer iflag = 8;
		for (char c : chars) {
			sum = sum + Integer.valueOf(c + "") * iflag;
			iflag--;
		}
		return (sum % 10 == 0 ? 0 : (10 - sum % 10)) == Integer.valueOf(end) ? true : false;
	}

	/**
	 * 验证香港身份证号码(存在Bug，部份特殊身份证无法检查)
	 * <p>
	 * 身份证前2位为英文字符，如果只出现一个英文字符则表示第一位是空格，对应数字58 前2位英文字符A-Z分别对应数字10-35
	 * 最后一位校验码为0-9的数字加上字符"A"，"A"代表10
	 * </p>
	 * <p>
	 * 将身份证号码全部转换为数字，分别对应乘9-1相加的总和，整除11则证件号码有效
	 * </p>
	 * 
	 * @param idCard
	 *            身份证号码
	 * @return 验证码是否符合
	 */
	public static boolean validateHKCard(String idCard) {
		String card = idCard.replaceAll("[\\(|\\)]", "");
		Integer sum = 0;
		if (card.length() == 9) {
			sum = (Integer.valueOf(card.substring(0, 1).toUpperCase().toCharArray()[0]) - 55) * 9
					+ (Integer.valueOf(card.substring(1, 2).toUpperCase().toCharArray()[0]) - 55) * 8;
			card = card.substring(1, 9);
		} else {
			sum = 522 + (Integer.valueOf(card.substring(0, 1).toUpperCase().toCharArray()[0]) - 55) * 8;
		}
		String mid = card.substring(1, 7);
		String end = card.substring(7, 8);
		char[] chars = mid.toCharArray();
		Integer iflag = 7;
		for (char c : chars) {
			sum = sum + Integer.valueOf(c + "") * iflag;
			iflag--;
		}
		if (end.toUpperCase().equals("A")) {
			sum = sum + 10;
		} else {
			sum = sum + Integer.valueOf(end);
		}
		return (sum % 11 == 0) ? true : false;
	}
}
