package org.egov.model.masters;

import org.egov.infra.persistence.validator.annotation.OptionalPattern;
import org.egov.utils.FinancialConstants;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.SafeHtml;

/**
 * 
 * @author subhash
 *
 */
public class VendorSearchRequest {

	@SafeHtml
	@OptionalPattern(regex = FinancialConstants.alphaNumericwithspecialcharForContraWOAndSupplierName, message = "Special Characters are not allowed in Name")
	@Length(max = 100, message = "Maximum of 100 Characters allowed for Name")
	private String name;

	@SafeHtml
	@Length(max = 50, message = "Maximum of 50 Characters allowed for Code")
	@OptionalPattern(regex = FinancialConstants.alphaNumericwithspecialchar, message = "Special Characters are not allowed in Code")
	private String code;

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

}
