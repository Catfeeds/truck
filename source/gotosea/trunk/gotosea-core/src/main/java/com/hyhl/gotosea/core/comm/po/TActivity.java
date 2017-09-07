package com.hyhl.gotosea.core.comm.po;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_activity")
public class TActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "activity_title")
    private String activityTitle;

    private String summary;

    @Column(name = "pay_customers")
    private Integer payCostomers; //已付款人数

    private Integer destination;

    @Column(name = "apply_end_time")
    private Date applyEndTime;  //报名截止时间

    @Column(name = "post_id")
    private Long postId;    //帖子id

    @Column(name = "activity_days")
    private Integer activityDays;

    @Column(name = "begin_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginDate;

    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @Column(name = "gather_time")
    private Date gatherTime;

    @Column(name = "min_customers")
    private Integer minCustomers;

    @Column(name = "cur_customers")
    private Integer curCustomers;

    @Column(name = "max_customers")
    private Integer maxCustomers;

    @Column(name = "business_unit_id")
    private Integer businessUnitId;

    /**
     * 0--待发布
            1--已发布
            2--已确认
            3--已下订待出行
            4--行程中
            5--已结束
            100-已撤销
     */
    private Integer status;

    @Column(name = "refresh_time")
    private Date refreshTime;

    public Date getApplyEndTime() {
        return applyEndTime;
    }

    public void setApplyEndTime(Date applyEndTime) {
        this.applyEndTime = applyEndTime;
    }

    public Integer getPayCostomers() {
        return payCostomers;
    }

    public void setPayCostomers(Integer payCostomers) {
        this.payCostomers = payCostomers;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Integer getCurCustomers() {
        return curCustomers;
    }

    public void setCurCustomers(Integer curCustomers) {
        this.curCustomers = curCustomers;
    }

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return activity_title
     */
    public String getActivityTitle() {
        return activityTitle;
    }

    /**
     * @param activityTitle
     */
    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle == null ? null : activityTitle.trim();
    }

    /**
     * @return summary
     */
    public String getSummary() {
        return summary;
    }

    /**
     * @param summary
     */
    public void setSummary(String summary) {
        this.summary = summary == null ? null : summary.trim();
    }

    /**
     * @return destination
     */
    public Integer getDestination() {
        return destination;
    }

    /**
     * @param destination
     */
    public void setDestination(Integer destination) {
        this.destination = destination;
    }

    /**
     * @return activity_days
     */
    public Integer getActivityDays() {
        return activityDays;
    }

    /**
     * @param activityDays
     */
    public void setActivityDays(Integer activityDays) {
        this.activityDays = activityDays;
    }

    /**
     * @return begin_date
     */
    public Date getBeginDate() {
        return beginDate;
    }

    /**
     * @param beginDate
     */
    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    /**
     * @return end_date
     */
    public Date getEndDate() {
        return endDate;
    }

    /**
     * @param endDate
     */
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    /**
     * @return gather_time
     */
    public Date getGatherTime() {
        return gatherTime;
    }

    /**
     * @param gatherTime
     */
    public void setGatherTime(Date gatherTime) {
        this.gatherTime = gatherTime;
    }

    /**
     * @return min_customers
     */
    public Integer getMinCustomers() {
        return minCustomers;
    }

    /**
     * @param minCustomers
     */
    public void setMinCustomers(Integer minCustomers) {
        this.minCustomers = minCustomers;
    }

    /**
     * @return max_customers
     */
    public Integer getMaxCustomers() {
        return maxCustomers;
    }

    /**
     * @param maxCustomers
     */
    public void setMaxCustomers(Integer maxCustomers) {
        this.maxCustomers = maxCustomers;
    }

    /**
     * @return business_unit_id
     */
    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    /**
     * @param businessUnitId
     */
    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    /**
     * 获取0--待发布
            1--已发布
            2--已确认
            3--已下订待出行
            4--行程中
            5--已结束
            100-已撤销
     *
     * @return status - 0--待发布
            1--已发布
            2--已确认
            3--已下订待出行
            4--行程中
            5--已结束
            100-已撤销
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置0--待发布
            1--已发布
            2--已确认
            3--已下订待出行
            4--行程中
            5--已结束
            100-已撤销
     *
     * @param status 0--待发布
            1--已发布
            2--已确认
            3--已下订待出行
            4--行程中
            5--已结束
            100-已撤销
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * @return refresh_time
     */
    public Date getRefreshTime() {
        return refreshTime;
    }

    /**
     * @param refreshTime
     */
    public void setRefreshTime(Date refreshTime) {
        this.refreshTime = refreshTime;
    }
}