package com.hyhl.gotosea.core.common.oss;

/**
 * @author Leslie.Lam
 * @create 2017-07-28 14:55
 **/
public enum PathEnum {

    /**
     * 文章HTML文件存放目录，格式：4位年份数字/4个月份和日期数字/ {文章ID}.html
     */
    ARTICLE_HEML("article/html/"),

    /**
     * 文章关联图片存放目录，格式：4位年份数字/4个月份和日期数字/ {唯一ID}.{文件后缀}
     */
    ARTICLE_IMAGE("article/image/"),

    /**
     * 文章关联附件存放目录，格式：4位年份数字/4个月份和日期数字/ {唯一ID}.{文件后缀}
     */
    ARTICLE_ATTACHMENT("article/attachment/"),

    /**
     * Android发布文件存放目录，格式：gotosea_版本号_8位年月日.apk
     */
    RELEASE_ANDROID("release/android/"),

    /**
     * IOS发布文件存放目录
     */
    RELEASE_IOS("release/ios/"),

    /**
     * 客户静态资源存放目录
     * 头像:4位年份数字/4个月份和日期数字/ head_{唯一ID}.{文件后缀}
     * 身份证:4位年份数字/4个月份和日期数字/ id_{唯一ID}.{文件后缀}
     * 营业执照:4位年份数字/4个月份和日期数字/ cer_{唯一ID}.{文件后缀}
     * 个性图片或介绍图片:4位年份数字/4个月份和日期数字/ detail_{唯一ID}.{文件后缀}
     */
    CUST("cust/"),

    /**
     * 系统静态资源存放目录,格式：广告:advert/4位年份数字/4个月份和日期数字/{唯一ID}.{文件后缀}
     */
    SYS_ADVERT("sys/advert/"),

    /**
     * 系统静态资源存放目录,格式：标签:tag/4位年份数字/4个月份和日期数字/ {唯一ID}.{文件后缀}
     */
    SYS_TAG("sys/tag/"),

    /**
     * 产品图片资源存放目录目录,格式：4位年份数字/4个月份和日期数字/ {唯一ID}.{文件后缀}
     */
    PROD_IMAGE("prod/image/"),

    /**
     * 产品HTML资源存放目录,格式：{产品类型，没有填0}/{产品ID } / {唯一ID}.html
     */
    PROD_HTML("prod/html/"),

    /**
     * 社区静态资源存放目录,格式：4位年份数字/4个月份和日期数字/ {唯一ID}.{文件后缀}
     */
    SOCIAL("social/"),
    ;

    private String path;

    PathEnum(String path) {
        this.path = path;
    }

    public String path() {
        return path;
    }
}
