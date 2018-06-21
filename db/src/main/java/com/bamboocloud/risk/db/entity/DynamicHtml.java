package com.bamboocloud.risk.db.entity;

/**
 * 动态html实体
 */
public class DynamicHtml {
    private String id;

    /**
     * 代码
     */
    private String code;

    /**
     * 网络路径
     */
    private String url;

    /**
     * 物理路径
     */
    private String path;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
