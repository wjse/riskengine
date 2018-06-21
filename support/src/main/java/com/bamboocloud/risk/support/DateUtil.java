package com.bamboocloud.risk.support;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtil {

    public static final String PATTERN_DEFAULT = "yyyy/MM/dd";
    public static final String DEFAULT = "yyyy-MM-dd HH:mm:ss";

    private DateUtil() {
    }

    public static String getCurDateStr(String pattern) {
        return getStringByDate(new Date(), StringUtils.isNotBlank(pattern) ? pattern : DEFAULT);
    }

    public static Date getDateByStr(String dateStr, String pattern) throws ParseException {
        if (StringUtils.isNotBlank(dateStr)) {
            dateStr = dateStr.replace("T", " ");
            if (dateStr.indexOf('+') >= 0) {
                dateStr = dateStr.split("\\+")[0];
            }
        }
        SimpleDateFormat sdf = new SimpleDateFormat(StringUtils.isNotBlank(pattern) ? pattern : DEFAULT);
        return sdf.parse(dateStr);
    }

    public static String getStringByDate(Date date, String pattern) {
        if (null == date) {
            return "";
        }
        return DateFormatUtils.format(date, StringUtils.isNotBlank(pattern) ? pattern : DEFAULT);
    }

    public static Date getBeforeDate() {
        Calendar calendar = new GregorianCalendar();
        int day = calendar.get(Calendar.DATE);
        calendar.set(Calendar.DATE, day - 1);
        return calendar.getTime();
    }

    public static Date getBeforeDate(String dateString) {
        Calendar calendar = new GregorianCalendar();
        try {
            calendar.setTime(getDateByStr(dateString, PATTERN_DEFAULT));
            int day = calendar.get(Calendar.DATE);
            calendar.set(Calendar.DATE, day - 1);
            return calendar.getTime();
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public static Date getAfterDate(String dateString) {
        Calendar calendar = new GregorianCalendar();
        try {
            calendar.setTime(getDateByStr(dateString, PATTERN_DEFAULT));
            int day = calendar.get(Calendar.DATE);
            calendar.set(Calendar.DATE, day + 1);
            return calendar.getTime();
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }

    /**
     *  获取传入日期那周的第一天的日期
     *  startDay 一周以星期几开始
     *  date 传入日期
     * @param startDay
     * @return
     */
    public static Date getFirstDayOfWeek(int startDay,Date date){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        if (Calendar.SUNDAY == cal.get(Calendar.DAY_OF_WEEK)) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        cal.setFirstDayOfWeek(startDay);
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - cal.get(Calendar.DAY_OF_WEEK));
        cal.set(cal.get(Calendar.YEAR),cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH),
                0,0,0);
        return cal.getTime();
    }

    /**
     *  获取传入日期那周的最后一天的日期
     *  startDay 一周以星期几开始
     *  date 传入日期
     * @param startDay
     * @return
     */
    public static Date getLastDayOfWeek(int startDay,Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        if (Calendar.SUNDAY == cal.get(Calendar.DAY_OF_WEEK)) {
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }
        cal.setFirstDayOfWeek(startDay);
        cal.add(Calendar.DATE, Calendar.SATURDAY - cal.get(Calendar.DAY_OF_WEEK));
        cal.set(cal.get(Calendar.YEAR),cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH),
                23,59,59);
        return cal.getTime();
    }

    /**
     *  获取下周第一天时间
     *  startDay 一周以星期几开始
     *  firstDay 传入本周开始的日期
     * @param startDay
     * @return
     */
    public static Date getNextWeekFirstDay(int startDay,Date firstDay) {
        Calendar cal = Calendar.getInstance();
        cal.setFirstDayOfWeek(startDay);
        cal.setTime(firstDay);
        cal.add(Calendar.DATE, 7);
        return cal.getTime();
    }

    /**
     *  获取传入时间是一周的第几天
     * @param date
     * @return
     */
    public static int getDayOfWeek(Date date){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.DAY_OF_WEEK);
    }

    /**
     * 时间戳转默认日期
     * @return
     */
    public static String transForDate(long s) {
        return new SimpleDateFormat(DEFAULT).format(new Date(s));
    }

    public static Date getCurDateByPattern(String pattern) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.parse(sdf.format(new Date()));
    }
}
