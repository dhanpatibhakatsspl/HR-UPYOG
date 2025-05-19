package org.egov.infra.microservice.models;

import org.hibernate.validator.constraints.SafeHtml;

public class Designation {

    private Long id;
    @SafeHtml
    private String name;
    @SafeHtml
    private String code;
    @SafeHtml
    private String description;
    @SafeHtml
    private String chartOfAccounts;
    private Boolean active;
    
    private Double minamount;
    
    private Double maxamount;
    @SafeHtml
    private String tenantId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getChartOfAccounts() {
		return chartOfAccounts;
	}
	public void setChartOfAccounts(String chartOfAccounts) {
		this.chartOfAccounts = chartOfAccounts;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public Double getMinamount() {
		return minamount;
	}
	public void setMinamount(Double minamount) {
		this.minamount = minamount;
	}
	public Double getMaxamount() {
		return maxamount;
	}
	public void setMaxamount(Double maxamount) {
		this.maxamount = maxamount;
	}
	public String getTenantId() {
		return tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	@Override
	public String toString() {
		return "Designation [id=" + id + ", name=" + name + ", code=" + code + ", description=" + description
				+ ", chartOfAccounts=" + chartOfAccounts + ", active=" + active + ", minamount=" + minamount
				+ ", maxamount=" + maxamount + ", tenantId=" + tenantId + ", getId()=" + getId() + ", getName()="
				+ getName() + ", getCode()=" + getCode() + ", getDescription()=" + getDescription()
				+ ", getChartOfAccounts()=" + getChartOfAccounts() + ", getActive()=" + getActive()
				+ ", getMinamount()=" + getMinamount() + ", getMaxamount()=" + getMaxamount() + ", getTenantId()="
				+ getTenantId() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	public Designation(Long id, String name, String code, String description, String chartOfAccounts, Boolean active,
			Double minamount, Double maxamount, String tenantId) {
		super();
		this.id = id;
		this.name = name;
		this.code = code;
		this.description = description;
		this.chartOfAccounts = chartOfAccounts;
		this.active = active;
		this.minamount = minamount;
		this.maxamount = maxamount;
		this.tenantId = tenantId;
	}
	public Designation() {
		super();
		// TODO Auto-generated constructor stub
	}

    
}