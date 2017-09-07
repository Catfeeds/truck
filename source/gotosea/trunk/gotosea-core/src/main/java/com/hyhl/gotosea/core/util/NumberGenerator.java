package com.hyhl.gotosea.core.util;

import com.hyhl.gotosea.core.order.mapper.SerialNumberMapper;
import com.hyhl.gotosea.core.order.po.SerialNumber;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.apache.commons.lang.StringUtils;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * 编号生成器
 *
 * @author Leslie.Lam
 * @create 2017-06-21 15:41
 **/
public class NumberGenerator {
	
	private static final int custNameLength = 6;
	
	public static String getCustName(){
		return getStringRandom(custNameLength);
	}

    private static final SerialNumberMapper serialNumberMapper= AppContextHelper.getBean(SerialNumberMapper.class);

	 //生成随机数字和字母,
    public static String getStringRandom(int length) {

        String val = "";
        Random random = new Random();

        //参数length，表示生成几位随机数
        for(int i = 0; i < length; i++) {

            String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
            //输出字母还是数字
            if( "char".equalsIgnoreCase(charOrNum) ) {
                //输出是大写字母还是小写字母
                int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
                val += (char)(random.nextInt(26) + temp);
            } else if( "num".equalsIgnoreCase(charOrNum) ) {
                val += String.valueOf(random.nextInt(10));
            }
        }
        return val;
    }

    /**
     * 服务编号 类型3  11位
     * 类型(1) + 0  + 随机数(3) + 类型(1) + 随机数(3)
     * @return
     */
    public static String getServeNo(){
        return new StringBuilder().append(30)
                .append(StringUtils.substring(Math.random()+"", 4, 7)).append(3)
                .append(StringUtils.substring(Math.random()+"", 4, 7)).toString();
    }

    /**
     * 玩家订单 类型5  18位
     * 活动（1）+月（2）+日（2）+年（2）+自增长（4）+随机（3）
     * @return
     */
    public static String getOrderNo(boolean isAct){
        return new StringBuilder().append(isAct?1:0)
                .append(DateUtil.dateToString(new Date(), "MMddyy"))
                .append(getMaxSerialNo("order_max_num",5))
                .append(Math.random()+"", 4, 7)
                .toString();
    }

    /**
     * 商家订单 类型6  13位
     * 类型(1) + 0 + 月(2) + 日(2) + 随机数(3)+ 类型(1) + 随机数(3)
     * @return
     */
    public static String getMercOrderNo(){
        return new StringBuilder().append(60).append(DateUtil.dateToString(new Date(), "MMdd"))
                .append(Math.random()+"", 4, 7).append(6)
                .append(Math.random()+"", 4, 7)
                .toString();
    }

    /**
     * 获取当前时间年份后两位(2位)拼当前第几天(3位),共5位
     * @return
     */
    private static String getYearDayStr(){
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        int year = c.get(Calendar.YEAR);
        int day = c.get(Calendar.DAY_OF_YEAR);
        String dayStr = String.valueOf(year).substring(2);
        return new StringBuffer().append(dayStr).append(getEnoughStr(day,3)).toString();
    }

    private  static String getMaxSerialNo(String serialName,Integer length) {
        SerialNumber sn = serialNumberMapper.selectOne(new SerialNumber(serialName));
        return null==sn?null:getMaxSerialNo(sn,length);
    }

    private  static String getMaxSerialNo(SerialNumber sn,Integer length){
        Integer serialNo = sn.getSerialNo();
        String serialNoStr = getEnoughStr(serialNo, length);
        int i = serialNumberMapper.updtaeSerialNumber(serialNo + 1,sn.getId(), serialNo);
        return i==0?getMaxSerialNo(sn,length):serialNoStr;
    }

    private static String getEnoughStr(Integer number,Integer length){
        return String.format(new StringBuffer().append("%0").append(length).append('d').toString(), number);
    }
      
}
