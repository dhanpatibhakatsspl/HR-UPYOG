package org.egov.enums;

public enum VendorTypeEnum {
    
    FIRM("Firm"), INDIVIDUALS("Individuals");

    private String value;

    VendorTypeEnum(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

}
