package com.hyhl.gotosea.core.common.page;

import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-07-27 15:55
**/
public class Pager<T> {
    private int pageNumber;//页数

    private long totalElements;//总条数

    private long totalPages;//总页数

    private int pageSize;//页大小

    private int numberOfElements;//当前页条数

    private List<T> content;

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getNumberOfElements() {
        return null==content?numberOfElements:content.size();
    }

    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public long getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(long totalPages) {
        this.totalPages = totalPages;
    }

    public List getContent() {
        return content;
    }

    public void setContent(List content) {
        this.content = content;
    }

}
