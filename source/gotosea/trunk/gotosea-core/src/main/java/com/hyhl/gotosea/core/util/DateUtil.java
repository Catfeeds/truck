package com.hyhl.gotosea.core.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
    private static final String yyyy = "yyyy";
    private static final String MMdd = "MMdd";
    private static final String YYYY_MM_DD = "yyyy-MM-dd";
    private static final String ymd = "yyyyMMdd";
    private static final String ymdHmsS = "yyMMddHHmmssSSS";
    private static final String ymdHms = "yyyy-MM-dd HH:mm:ss";
    private static final String hms = "HH:mm:ss";

    private static SimpleDateFormat getSdf(final String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf;
    }

    public static String formatY(Date date) {
        return getSdf(yyyy).format(date);
    }
    public static String formatMD(Date date) {
        return getSdf(MMdd).format(date);
    }

    public static Date parseDate(String source,String format) {
        try {
            SimpleDateFormat sdf =getSdf(format);
            return sdf.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取时间，精确到天
     */
    public static Date getDyyyyMMdd(Date date) throws Exception {
        return parse(dateToString(date,"yyyy-MM-dd"),"yyyy-MM-dd");
    }

    //获得日期小时
    public static Integer getDateHour(Date date){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.HOUR_OF_DAY);
    }

    // 将日期字符串转化成Date对象
    public static Date parse(String dateStr,String reg) throws Exception {
        return dateStr==null?null:new SimpleDateFormat(reg).parse(dateStr);
    }

    //将日期转换成制定格式的字符串
    public static String dateToString(Date date,String reg){
        return date==null?null:new SimpleDateFormat(reg).format(date);
    }

    // 由出生日期获得年龄
    public static int getAge(Date birthDay) throws Exception {
        Calendar cal = Calendar.getInstance();

        if (cal.before(birthDay)) {
            throw new IllegalArgumentException(
                    "The birthDay is before Now.It's unbelievable!");
        }
        int yearNow = cal.get(Calendar.YEAR);
        int monthNow = cal.get(Calendar.MONTH);
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);
        cal.setTime(birthDay);

        int yearBirth = cal.get(Calendar.YEAR);
        int monthBirth = cal.get(Calendar.MONTH);
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);

        int age = yearNow - yearBirth;

        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                if (dayOfMonthNow < dayOfMonthBirth)
                    age--;
            } else {
                age--;
            }
        }
        return age;
    }

    public static Date addMonth(Date date,int month){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MONTH, month);
        return c.getTime();
    }

    public static Date addDay(Date date,int days){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_MONTH, days);
        return c.getTime();
    }

    public static Date addSecond(Date date,int second){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.SECOND, second);
        return c.getTime();
    }

    public static Date addMinute(Date date,int minute){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MINUTE, minute);
        return c.getTime();
    }

    public static Date addHour(Date date,int hour){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.HOUR, hour);
        return c.getTime();
    }

    public static Date addTime(Date date,long time){
        return new Date(date.getTime()+time);
    }

    /**
     * 判断指定时间是否小于当前时间
     * @param expirationDay
     * @return
     */
    public static boolean isExpirated(Date expirationDay){
        Calendar d = Calendar.getInstance();
        d.setTime(expirationDay);
        Calendar now = Calendar.getInstance();
        now.setTime(new Date());
        return d.compareTo(now)==-1;
    }

    /**
     * 获取某个时间的当天日期时间
     * @param date
     * @return
     * @throws Exception
     */
    public static Date getDayTime(Date date) throws Exception {
        return parse(dateToString(date,"yyyyMMdd"),"yyyyMMdd");
    }

    /**
     * 比较两个时间大小
     * @return
     */
    public static int compare(Date from,Date to){
        Calendar d = Calendar.getInstance();
        d.setTime(from);
        Calendar now = Calendar.getInstance();
        now.setTime(to);
        return d.compareTo(now);
    }

    public static Date getDateTimePoint(Date date,int hour,int minute,int second){
        Calendar instance = Calendar.getInstance();
        instance.setTime(date);
        instance.set(Calendar.HOUR_OF_DAY,hour);
        instance.set(Calendar.MINUTE,minute);
        instance.set(Calendar.SECOND,second);
        return instance.getTime();
    }

    public static Date getTodayTimePoint(int hour,int minute){
        return getDateTimePoint(new Date(),hour,minute,0);
    }

    /**
     * DateTime类型转Date类型
     * @param date
     * @return
     */
    public static Date dateTimeToDate(Date date){
        if (date ==null)
            return null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return sdf.parse(sdf.format(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获取两个日期之间的天数间隔
     * @param from
     * @param to
     * @return
     * @throws ParseException
     */
    public static Integer daysBetween(Date from,Date to) throws ParseException
    {
        from = dateTimeToDate(from);
        to = dateTimeToDate(to);
        Calendar cal = Calendar.getInstance();

        cal.setTime(from);
        long fromMillis = cal.getTimeInMillis();
        cal.setTime(to);
        long toMillis = cal.getTimeInMillis();

        long between_days=(fromMillis-toMillis)/(1000*3600*24);

        return Integer.parseInt(String.valueOf(between_days));
    }
}
