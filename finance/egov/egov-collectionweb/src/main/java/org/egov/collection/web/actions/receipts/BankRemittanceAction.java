/*
 *    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) 2017  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *            Further, all user interfaces, including but not limited to citizen facing interfaces,
 *            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *            derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *            For any further queries on attribution, including queries on brand guidelines,
 *            please contact contact@egovernments.org
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 *
 */
package org.egov.collection.web.actions.receipts;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.validation.SkipValidation;
import org.egov.collection.bean.ReceiptBean;
import org.egov.collection.constants.CollectionConstants;
import org.egov.collection.entity.CollectionBankRemittanceReport;
import org.egov.collection.entity.ReceiptHeader;
import org.egov.collection.service.RemittanceServiceImpl;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.commons.Accountdetailtype;
import org.egov.commons.Bankaccount;
import org.egov.commons.CChartOfAccounts;
import org.egov.commons.CFinancialYear;
import org.egov.commons.CFunction;
import org.egov.commons.CVoucherHeader;
import org.egov.commons.dao.BankaccountHibernateDAO;
import org.egov.commons.dao.FinancialYearDAO;
import org.egov.commons.service.ChartOfAccountDetailService;
import org.egov.commons.utils.EntityType;
import org.egov.egf.commons.CommonsUtil;
import org.egov.egf.commons.EgovCommon;
import org.egov.eis.web.actions.workflow.GenericWorkFlowAction;
import org.egov.eis.web.contract.WorkflowContainer;
import org.egov.eis.web.controller.workflow.GenericWorkFlowController;
import org.egov.infra.admin.master.entity.AppConfigValues;
import org.egov.infra.admin.master.service.AppConfigValueService;
import org.egov.infra.exception.ApplicationException;
import org.egov.infra.exception.ApplicationRuntimeException;
import org.egov.infra.microservice.models.BankAccountServiceMapping;
import org.egov.infra.microservice.models.BusinessDetails;
import org.egov.infra.microservice.models.BusinessService;
import org.egov.infra.microservice.models.Receipt;
import org.egov.infra.utils.DateUtils;
import org.egov.infra.validation.exception.ValidationError;
import org.egov.infra.validation.exception.ValidationException;
import org.egov.infra.web.struts.actions.BaseFormAction;
import org.egov.infra.web.struts.annotation.ValidationErrorPage;
import org.egov.infra.workflow.entity.StateAware;
import org.egov.model.bills.EgBillPayeedetails;
import org.egov.model.bills.EgBilldetails;
import org.egov.model.bills.EgBillregister;
import org.egov.model.voucher.WorkflowBean;
import org.egov.utils.Constants;
import org.egov.utils.FinancialConstants;
import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

@Results({
        @Result(name = BankRemittanceAction.NEW, location = "bankRemittance-new.jsp"),
        @Result(name = BankRemittanceAction.PRINT_BANK_CHALLAN, type = "redirectAction", location = "remittanceStatementReport-printCashBankChallan.action", params = {
                "namespace", "/reports", "totalCashAmount", "${totalCashAmount}", "totalChequeAmount",
                "${totalChequeAmount}", "bank", "${bank}", "bankAccount", "${bankAccount}", "remittanceDate",
                "${remittanceDate}" }),
        @Result(name = BankRemittanceAction.INDEX, location = "bankRemittance-index.jsp") })
@ParentPackage("egov")
public class BankRemittanceAction extends GenericWorkFlowAction {
    protected static final String PRINT_BANK_CHALLAN = "printBankChallan";
    private static final long serialVersionUID = 1L;
    private static final Logger LOGGER = Logger.getLogger(BankRemittanceAction.class);
    private static final String BANK_ACCOUNT_NUMBER_QUERY = "select distinct ba.accountnumber from BANKACCOUNT ba where ba.accountnumber =:accountNumberId";
    private static final String SERVICE_FUND_QUERY = new StringBuilder()
            .append("select distinct sd.code as servicecode,fd.code as fundcode from BANKACCOUNT ba,")
            .append("EGCL_BANKACCOUNTSERVICEMAPPING asm,EGCL_SERVICEDETAILS sd,FUND fd where asm.BANKACCOUNT=ba.ID ")
            .append("and asm.servicedetails=sd.ID and fd.ID=ba.FUNDID and ba.id= :accountNumberId").toString();
    private transient List<HashMap<String, Object>> paramList = null;
    private final ReceiptHeader receiptHeaderIntsance = new ReceiptHeader();
    private List<ReceiptHeader> voucherHeaderValues = new ArrayList<>(0);
    private String[] serviceNameArray;
    private String[] totalCashAmountArray;
    private String[] totalChequeAmountArray;
    private String[] totalCardAmountArray;
    private String[] receiptDateArray;
    private String[] receiptNumberArray;
    private String[] fundCodeArray;
    private String[] departmentCodeArray;
    private String[] instrumentIdArray;
    private String accountNumberId;
    private transient CollectionsUtil collectionsUtil;
    private Integer branchId;
    private static final String ACCOUNT_NUMBER_LIST = "accountNumberList";
    private Boolean isListData = false;
    // Added for Manual Work Flow
    private Integer positionUser;
    private Integer designationId;
    private Date remittanceDate;
    private String selectedRowsId;

    @Autowired
    private transient FinancialYearDAO financialYearDAO;
    @Autowired
    private transient BankaccountHibernateDAO bankaccountHibernateDAO;

    private Double totalCashAmount;
    private Double totalChequeAmount;
    private List<CollectionBankRemittanceReport> bankRemittanceList;
    private String bank;
    private String bankAccount;
    private Boolean showCardAndOnlineColumn = false;
    private Boolean showRemittanceDate = false;
    private Long finYearId;
    private RemittanceServiceImpl remittanceService;
    private String voucherNumber;
    private Date fromDate;
    private Date toDate;
    private Integer pageSize;
    private String remittanceAmount;
    private static final String REMITTANCE_LIST = "REMITTANCE_LIST";
    private Boolean isBankCollectionRemitter;
    private String remitAccountNumber;
    private List<ReceiptBean> resultList = new ArrayList<>();
    private List<ReceiptBean> finalList = new ArrayList<>();
    final SimpleDateFormat dateFomatter = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());

    /**
     * Change start by umesh...
     */
    private static final String STATE_TYPE = "stateType";
    protected WorkflowBean workflowBean = new WorkflowBean();
    private ReceiptHeader receiptHeader = new ReceiptHeader();
    private EgBillregister egBillregister = new EgBillregister();
    private Map<String, Object> billDetails;
    @Autowired
    private ChartOfAccountDetailService chartOfAccountDetailService;

    @Autowired
    private EgovCommon egovCommon;
    private static final String INVALID_APPROVER = "invalid.approver";
    private String mode = "";
    
    @Autowired
    private CommonsUtil commonsUtil;
    @Autowired
    private AppConfigValueService appConfigValuesService;
    private String action = "";
    private final static String FORWARD = "Forward";
    private static final String ACCDETAILTYPEQUERY = " from Accountdetailtype where id=?";
    
    private CVoucherHeader voucherHeader = new CVoucherHeader();

    /**
     * change end by umesh
     */
    /**
     * @param collectionsUtil the collectionsUtil to set
     */
    public void setCollectionsUtil(final CollectionsUtil collectionsUtil) {
        this.collectionsUtil = collectionsUtil;
    }

    @Override
    public void prepare() {
        super.prepare();
        final String showColumn = collectionsUtil.getAppConfigValue(CollectionConstants.MODULE_NAME_COLLECTIONS_CONFIG,
                CollectionConstants.APPCONFIG_VALUE_COLLECTION_BANKREMITTANCE_SHOWCOLUMNSCARDONLINE);
        if (!showColumn.isEmpty() && showColumn.equals(CollectionConstants.YES))
            showCardAndOnlineColumn = true;
        final String showRemitDate = collectionsUtil.getAppConfigValue(
                CollectionConstants.MODULE_NAME_COLLECTIONS_CONFIG,
                CollectionConstants.APPCONFIG_VALUE_COLLECTION_BANKREMITTANCE_SHOWREMITDATE);
        if (!showRemitDate.isEmpty() && showRemitDate.equals(CollectionConstants.YES))
            showRemittanceDate = true;

        isBankCollectionRemitter = collectionsUtil.isBankCollectionOperator(collectionsUtil.getLoggedInUser());
        addDropdownData("bankBranchList", Collections.emptyList());
        addDropdownData(ACCOUNT_NUMBER_LIST, Collections.emptyList());
    }

    @Action(value = "/receipts/bankRemittance-newform")
    @SkipValidation
    public String newform() {
    	
        populateRemittanceList();
        return NEW;
    }

    private void populateRemittanceList() {
        Map<String, BankAccountServiceMapping> accountNumberMap = new HashMap<>();
        for (BankAccountServiceMapping basm : microserviceUtils.getBankAcntServiceMappings()) {
            accountNumberMap.put(basm.getBankAccount(), basm);
        }
        addDropdownData("accountNumberList", new ArrayList<>(accountNumberMap.values()));
        addDropdownData("financialYearList", financialYearDAO.getAllActivePostingAndNotClosedFinancialYears());
    }

    @Action(value = "/receipts/bankRemittance-listData")
    @SkipValidation
    public String listData() {
    	//action = "save";   // added by umesh
    	validateSearchCriteria();
    	if (hasErrors()) {
    		populateRemittanceList();
    		return NEW;
    	}
        isListData = true;
        remitAccountNumber = "";
        if (accountNumberId != null) {

            final Query bankAccountQry = persistenceService.getSession().createSQLQuery(BANK_ACCOUNT_NUMBER_QUERY);
            bankAccountQry.setString("accountNumberId", accountNumberId);
            final Object bankAccountResult = bankAccountQry.uniqueResult();
            remitAccountNumber = (String) bankAccountResult;
        }
        populateRemittanceList();
        if (fromDate != null && toDate != null && toDate.before(fromDate))
            addActionError(getText("bankremittance.before.fromdate"));
        if (!hasErrors() && accountNumberId != null) {
            final List<String> serviceCodeList = new ArrayList<>(0);
            final HashSet<String> fundCodeSet = new HashSet<>(0);
            List<BankAccountServiceMapping> mappings = microserviceUtils
                    .getBankAcntServiceMappingsByBankAcc(accountNumberId.toString(),null);
            for (BankAccountServiceMapping basm : mappings) {
                serviceCodeList.add(basm.getBusinessDetails());
            }
            final CFinancialYear financialYear = financialYearDAO.getFinancialYearById(finYearId);
            resultList = remittanceService.findCashRemittanceDetailsForServiceAndFund("", StringUtils.join(serviceCodeList, ","),
                    StringUtils.join(fundCodeSet, ","), fromDate == null ? financialYear.getStartingDate() : fromDate,
                    toDate == null ? financialYear.getEndingDate() : toDate, CollectionConstants.INSTRUMENT_NEW_STATUS);
            if (fromDate != null && toDate != null)
                pageSize = resultList.size();
            else
                pageSize = CollectionConstants.DEFAULT_PAGE_SIZE;
        }
        return NEW;
    }

	private void validateSearchCriteria() {
		if ((finYearId == null || finYearId == -1) && (fromDate == null && toDate == null)) {
			addActionError(getText("msg.please.enter.either.financial.year.or.fromDate.and.toDate"));
		}

		if (StringUtils.isEmpty(accountNumberId) || accountNumberId.equals("-1")) {
			addActionError(getText("bankremittance.error.noaccountNumberselected"));
		}

		if (fromDate != null && toDate == null) {
			addActionError(getText("common.datemandatory.todate"));
		}

		if (toDate != null && fromDate == null) {
			addActionError(getText("common.datemandatory.fromdate"));
		}
	}

	@Action(value = "/receipts/bankRemittance-printBankChallan")
    @SkipValidation
    public String printBankChallan() {
        return PRINT_BANK_CHALLAN;
    }

    public String edit() {
        return EDIT;
    }

    public String save() {
        return SUCCESS;
    }
    
    /**
     * Created By : Umesh Kumar 
     * Created Date : 07-04-2025
     */
    public List<String> getValidActions() {

        List<String> validActions = Collections.emptyList();
        if (!action.equalsIgnoreCase("save"))
            if (null == getModel() || null == getModel().getId()
                    || getModel().getCurrentState().getValue().endsWith("NEW")) {
                validActions = Arrays.asList(FORWARD);
            } else {
                if (getModel().getCurrentState() != null) {
                    validActions = this.customizedWorkFlowService.getNextValidActions(getModel().getStateType(),
                            getWorkFlowDepartment(), getAmountRule(), getAdditionalRule(),
                            getModel().getCurrentState().getValue(), getPendingActions(), getModel().getCreatedDate());
                }
            }
        else {
            ReceiptHeader model = new ReceiptHeader();
            List<AppConfigValues> cutOffDateconfigValue = appConfigValuesService.getConfigValuesByModuleAndKey("EGF",
                    "DataEntryCutOffDate");
            if (cutOffDateconfigValue != null && !cutOffDateconfigValue.isEmpty()) {
                if (null == model || null == model.getId() || model.getCurrentState().getValue().endsWith("NEW")) {
                    validActions = Arrays.asList(FORWARD, FinancialConstants.CREATEANDAPPROVE);
                } else {
                    if (model.getCurrentState() != null) {
                        validActions = this.customizedWorkFlowService.getNextValidActions(model.getStateType(),
                                getWorkFlowDepartment(), getAmountRule(), getAdditionalRule(),
                                model.getCurrentState().getValue(), getPendingActions(), model.getCreatedDate());
                    }
                }
            } else {
                if (null == model || null == model.getId() || model.getCurrentState().getValue().endsWith("NEW")) {
                    validActions = Arrays.asList(FORWARD);
                } else {
                    if (model.getCurrentState() != null) {
                        validActions = this.customizedWorkFlowService.getNextValidActions(model.getStateType(),
                                getWorkFlowDepartment(), getAmountRule(), getAdditionalRule(),
                                model.getCurrentState().getValue(), getPendingActions(), model.getCreatedDate());
                    }
                }
            }
        }
        return validActions;
    }
    
    protected void populateWorkflowBean() {
        workflowBean.setApproverPositionId(approverPositionId);
        workflowBean.setApproverComments(approverComments);
        workflowBean.setWorkFlowAction(workFlowAction);
        workflowBean.setCurrentState(currentState);
    }
    
    public void getMasterDataForBill() throws ApplicationException {
        billDetails = new HashMap<String, Object>();
        CChartOfAccounts coa = null;
        Map<String, Object> temp = null;
        Map<String, Object> payeeMap = null;
        final List<Map<String, Object>> tempList = new ArrayList<Map<String, Object>>();
        final List<Map<String, Object>> payeeList = new ArrayList<Map<String, Object>>();

        final List<EgBilldetails> egBillDetails = persistenceService
                .findAllBy("from EgBilldetails where  egBillregister.id=? ", egBillregister.getId());

        for (final EgBilldetails billdetails : egBillDetails) {
            temp = new HashMap<String, Object>();
            if (billdetails.getFunctionid() != null)
                temp.put(Constants.FUNCTION, ((CFunction) getPersistenceService().find("from CFunction where id=?",
                        Long.valueOf(billdetails.getFunctionid() + ""))).getName());
            coa = (CChartOfAccounts) getPersistenceService().find("from CChartOfAccounts where id=?",
                    Long.valueOf(billdetails.getGlcodeid() + ""));
            temp.put(Constants.GLCODE, coa.getGlcode());
            temp.put("accounthead", coa.getName());
            temp.put(Constants.DEBITAMOUNT, billdetails.getDebitamount() == null ? 0 : billdetails.getDebitamount());
            temp.put(Constants.CREDITAMOUNT, billdetails.getCreditamount() == null ? 0 : billdetails.getCreditamount());
            temp.put("billdetailid", billdetails.getId());
            tempList.add(temp);

            for (final EgBillPayeedetails payeeDetails : billdetails.getEgBillPaydetailes()) {
                payeeMap = new HashMap<>();
                if (chartOfAccountDetailService.getByGlcodeIdAndDetailTypeId(
                        payeeDetails.getEgBilldetailsId().getGlcodeid().longValue(),
                        payeeDetails.getAccountDetailTypeId().intValue()) != null) {
                    payeeMap = getAccountDetails(payeeDetails.getAccountDetailTypeId(),
                            payeeDetails.getAccountDetailKeyId(), payeeMap);
                    payeeMap.put(Constants.GLCODE, coa.getGlcode());
                    payeeMap.put(Constants.DEBITAMOUNT,
                            payeeDetails.getDebitAmount() == null ? 0 : payeeDetails.getDebitAmount());
                    payeeMap.put(Constants.CREDITAMOUNT,
                            payeeDetails.getCreditAmount() == null ? 0 : payeeDetails.getCreditAmount());
                    payeeList.add(payeeMap);
                }

            }
        }
        billDetails.put("tempList", tempList);
        billDetails.put("payeeList", payeeList);
    }
    
    public Map<String, Object> getAccountDetails(final Integer detailtypeid, final Integer detailkeyid,
            final Map<String, Object> tempMap) throws ApplicationException {
        final Accountdetailtype detailtype = (Accountdetailtype) getPersistenceService().find(ACCDETAILTYPEQUERY,
                detailtypeid);
        tempMap.put("detailtype", detailtype.getDescription());
        tempMap.put("detailtypeid", detailtype.getId());
        tempMap.put("detailkeyid", detailkeyid);

        egovCommon.setPersistenceService(persistenceService);
        final EntityType entityType = egovCommon.getEntityType(detailtype, detailkeyid);
        if (entityType == null) {
            tempMap.put(Constants.DETAILKEY, detailkeyid + " " + Constants.MASTER_DATA_DELETED);
            tempMap.put(Constants.DETAILCODE, Constants.MASTER_DATA_DELETED);
        } else {
            tempMap.put(Constants.DETAILKEY, entityType.getName());
            tempMap.put(Constants.DETAILCODE, entityType.getCode());
        }
        return tempMap;
    }

    @ValidationErrorPage(value = "error")
    @Action(value = "/receipts/bankRemittance-create")
    public String create() throws ApplicationException {
    	System.out.println("Bank Remittance Create------------> OK");
        prepareBankRemittanceList();
        final long startTimeMillis = System.currentTimeMillis();
        if (accountNumberId == null || accountNumberId.isEmpty() || accountNumberId.equalsIgnoreCase("-1"))
            throw new ValidationException(Arrays.asList(new ValidationError("Please select Account number",
                    "bankremittance.error.noaccountNumberselected")));
        
        populateWorkflowBean();
        getMasterDataForBill();
        if (FinancialConstants.BUTTONFORWARD.equalsIgnoreCase(workflowBean.getWorkFlowAction())) {
            if (!commonsUtil.isValidApprover(voucherHeader, workflowBean.getApproverPositionId())) {
//                voucher();
                mode = "";
                addActionError(getText(INVALID_APPROVER));
                return "billview";
            }
        }
        
        List<Receipt> receipts = remittanceService.createCashBankRemittance(finalList, accountNumberId, remittanceDate,workflowBean);
        final long elapsedTimeMillis = System.currentTimeMillis() - startTimeMillis;
        LOGGER.info("$$$$$$ Time taken to persist the remittance list (ms) = " + elapsedTimeMillis);
        bankRemittanceList = remittanceService.prepareCashRemittanceReport(receipts);
        if (getSession().get(REMITTANCE_LIST) != null)
            getSession().remove(REMITTANCE_LIST);
        getSession().put(REMITTANCE_LIST, bankRemittanceList);
        populateNames(bankRemittanceList);
        final Bankaccount bankAcc = bankaccountHibernateDAO.getByAccountNumber(accountNumberId);
        bankAccount = bankAcc.getAccountnumber();
        bank = bankAcc.getBankbranch().getBank().getName();
        totalCashAmount = getSum(finalList);
        return INDEX;
    }
    
    public List<ReceiptBean> prepareBankRemittanceList() {
        finalList = new ArrayList<>();
        String[] selectedRowsIdArray;
        if (selectedRowsId != null)
            selectedRowsIdArray = selectedRowsId.split(";,");
        else
            selectedRowsIdArray = new String[0];
        for (int i = 0; i < selectedRowsIdArray.length; i++) {
            ReceiptBean receipt = new ReceiptBean();
            String[] items = selectedRowsIdArray[i].split("\\~");
            receipt.setService(items[0]);
            receipt.setFund(items[1]);
            receipt.setDepartment(items[2]);
            receipt.setInstrumentAmount(BigDecimal.valueOf(Double.valueOf(items[3])));
            receipt.setInstrumentType(items[4]);
            if (items[5] != null && !items[5].isEmpty()) {
                String item = items[5];
                if (item.contains(";"))
                    item = items[5].replace(";", "");
                receipt.setReceiptDate(item);
            }
            receipt.setSelected(true);
            finalList.add(receipt);
        }
        return finalList;
    }

    private void populateNames(List<CollectionBankRemittanceReport> bankRemittanceList) {
        List<BusinessService> businessServList = microserviceUtils.getBusinessService(null);
        Map<String, String> businessDetailsCodeNameMap = new HashMap<>();

        if (businessServList != null)
            for (BusinessService bd : businessServList) {
                businessDetailsCodeNameMap.put(bd.getCode(), bd.getBusinessService());
            }

        for (CollectionBankRemittanceReport rb : bankRemittanceList) {
            if (rb.getServiceType() != null && !rb.getServiceType().isEmpty())
                rb.setServiceName(businessDetailsCodeNameMap.get(rb.getServiceType()));
        }
    }

    private Double getSum(List<ReceiptBean> finalList) {
        Double sum = 0.0;
        for (final ReceiptBean r : finalList)
            if (r.getSelected() != null && r.getSelected() && r.getInstrumentAmount() != null)
                sum = sum + r.getInstrumentAmount().doubleValue();
        return sum;
    }

    private Double getSum(final String[] array) {
        Double sum = 0.0;
        for (final String num : array)
            if (!num.isEmpty())
                sum = sum + Double.valueOf(num);
        return sum;
    }

    @Override
    public void validate() {
        super.validate();
        populateRemittanceList();
        listData();
        if (receiptDateArray != null) {
            final String[] filterReceiptDateArray = removeNullValue(receiptDateArray);
            final String receiptEndDate = filterReceiptDateArray[filterReceiptDateArray.length - 1];
            try {
                if (!receiptEndDate.isEmpty() && remittanceDate != null
                        && remittanceDate.before(dateFomatter.parse(receiptEndDate)))
                    addActionError(getText("bankremittance.before.receiptdate"));
            } catch (final ParseException e) {
                LOGGER.debug("Exception in parsing date  " + receiptEndDate + " - " + e.getMessage());
                throw new ApplicationRuntimeException("Exception while parsing receiptEndDate date", e);
            }
        }
    }

    private String[] removeNullValue(String[] receiptDateArray) {
        final List<String> list = new ArrayList<>();
        for (final String s : receiptDateArray)
            if (s != null && s.length() > 0)
                list.add(s);
        return list.toArray(new String[list.size()]);
    }

    @Override
    public StateAware getModel() {   // Change return type Object to StateAware
        return receiptHeaderIntsance;
    }

    /**
     * @return the paramList
     */
    public List<HashMap<String, Object>> getParamList() {
        return paramList;
    }

    /**
     * @param paramList the paramList to set
     */
    public void setParamList(final List<HashMap<String, Object>> paramList) {
        this.paramList = paramList;
    }

    /**
     * @return the serviceName
     */
    public String[] getServiceNameArray() {
        return serviceNameArray;
    }

    /**
     * @param serviceName the serviceName to set
     */
    public void setServiceNameArray(final String[] serviceNameArray) {
        this.serviceNameArray = serviceNameArray;
    }

    /**
     * @return the totalCashAmount
     */
    public String[] getTotalCashAmountArray() {
        return totalCashAmountArray;
    }

    /**
     * @param totalCashAmount the totalCashAmount to set
     */
    public void setTotalCashAmountArray(final String[] totalCashAmountArray) {
        this.totalCashAmountArray = totalCashAmountArray;
    }

    /**
     * @return the totalChequeAmount
     */
    public String[] getTotalChequeAmountArray() {
        return totalChequeAmountArray;
    }

    /**
     * @param totalChequeAmount the totalChequeAmount to set
     */
    public void setTotalChequeAmountArray(final String[] totalChequeAmountArray) {
        this.totalChequeAmountArray = totalChequeAmountArray;
    }

    /**
     * @return the receiptDate
     */
    public String[] getReceiptDateArray() {
        return receiptDateArray;
    }

    /**
     * @param receiptDate the receiptDate to set
     */
    public void setReceiptDateArray(final String[] receiptDateArray) {
        this.receiptDateArray = receiptDateArray;
    }

    /**
     * @return the voucherHeaderValues
     */
    public List<ReceiptHeader> getVoucherHeaderValues() {
        return voucherHeaderValues;
    }

    /**
     * @param voucherHeaderValues the voucherHeaderValues to set
     */
    public void setVoucherHeaderValues(final List<ReceiptHeader> voucherHeaderValues) {
        this.voucherHeaderValues = voucherHeaderValues;
    }

    /**
     * @return the fundCodeArray
     */
    public String[] getFundCodeArray() {
        return fundCodeArray;
    }

    /**
     * @param fundCodeArray the fundCodeArray to set
     */
    public void setFundCodeArray(final String[] fundCodeArray) {
        this.fundCodeArray = fundCodeArray;
    }

    /**
     * @return the departmentCodeArray
     */
    public String[] getDepartmentCodeArray() {
        return departmentCodeArray;
    }

    /**
     * @param departmentCodeArray the departmentCodeArray to set
     */
    public void setDepartmentCodeArray(final String[] departmentCodeArray) {
        this.departmentCodeArray = departmentCodeArray;
    }

    /**
     * @return the totalCardAmountArray
     */
    public String[] getTotalCardAmountArray() {
        return totalCardAmountArray;
    }

    /**
     * @param totalCardAmountArray the totalCardAmountArray to set
     */
    public void setTotalCardAmountArray(final String[] totalCardAmountArray) {
        this.totalCardAmountArray = totalCardAmountArray;
    }

    /**
     * @return the positionUser
     */
    public Integer getPositionUser() {
        return positionUser;
    }

    /**
     * @param positionUser the positionUser to set
     */
    public void setPositionUser(final Integer positionUser) {
        this.positionUser = positionUser;
    }

    /**
     * @return the designationId
     */
    public Integer getDesignationId() {
        return designationId;
    }

    /**
     * @param designationId the designationId to set
     */
    public void setDesignationId(final Integer designationId) {
        this.designationId = designationId;
    }

    public String[] getReceiptNumberArray() {
        return receiptNumberArray;
    }

    public void setReceiptNumberArray(final String[] receiptNumberArray) {
        this.receiptNumberArray = receiptNumberArray;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(final Integer branchId) {
        this.branchId = branchId;
    }

    public String getAccountNumberId() {
        return accountNumberId;
    }

    public void setAccountNumberId(final String accountNumberId) {
        this.accountNumberId = accountNumberId;
    }

    public Boolean getIsListData() {
        return isListData;
    }

    public void setIsListData(final Boolean isListData) {
        this.isListData = isListData;
    }

    public Double getTotalCashAmount() {
        return totalCashAmount;
    }

    public void setTotalCashAmount(final Double totalCashAmount) {
        this.totalCashAmount = totalCashAmount;
    }

    public Double getTotalChequeAmount() {
        return totalChequeAmount;
    }

    public void setTotalChequeAmount(final Double totalChequeAmount) {
        this.totalChequeAmount = totalChequeAmount;
    }

    public List<CollectionBankRemittanceReport> getBankRemittanceList() {
        return bankRemittanceList;
    }

    public void setBankRemittanceList(final List<CollectionBankRemittanceReport> bankRemittanceList) {
        this.bankRemittanceList = bankRemittanceList;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(final String bank) {
        this.bank = bank;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(final String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Boolean getShowCardAndOnlineColumn() {
        return showCardAndOnlineColumn;
    }

    public void setShowCardAndOnlineColumn(final Boolean showCardAndOnlineColumn) {
        this.showCardAndOnlineColumn = showCardAndOnlineColumn;
    }

    public Boolean getShowRemittanceDate() {
        return showRemittanceDate;
    }

    public void setShowRemittanceDate(final Boolean showRemittanceDate) {
        this.showRemittanceDate = showRemittanceDate;
    }

    public Date getRemittanceDate() {
        return remittanceDate;
    }

    public void setRemittanceDate(final Date remittanceDate) {
        this.remittanceDate = remittanceDate;
    }

    public Long getFinYearId() {
        return finYearId;
    }

    public void setFinYearId(final Long finYearId) {
        this.finYearId = finYearId;
    }

    public void setRemittanceService(final RemittanceServiceImpl remittanceService) {
        this.remittanceService = remittanceService;
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(final String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }
    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public Integer getPageSize() {
        return pageSize;
    }
    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String getRemittanceAmount() {
        return remittanceAmount;
    }

    public void setRemittanceAmount(String remittanceAmount) {
        this.remittanceAmount = remittanceAmount;
    }

    public Boolean getIsBankCollectionRemitter() {
        return isBankCollectionRemitter;
    }

    public void setIsBankCollectionRemitter(Boolean isBankCollectionRemitter) {
        this.isBankCollectionRemitter = isBankCollectionRemitter;
    }

    public String getRemitAccountNumber() {
        return remitAccountNumber;
    }

    public void setRemitAccountNumber(String remitAccountNumber) {
        this.remitAccountNumber = remitAccountNumber;
    }

    public String[] getInstrumentIdArray() {
        return instrumentIdArray;
    }

    public void setInstrumentIdArray(String[] instrumentIdArray) {
        this.instrumentIdArray = instrumentIdArray;
    }

    public List<ReceiptBean> getResultList() {
        return resultList;
    }

    public void setResultList(List<ReceiptBean> resultList) {
        this.resultList = resultList;
    }

    public List<ReceiptBean> getFinalList() {
        return finalList;
    }

    public void setFinalList(List<ReceiptBean> finalList) {
        this.finalList = finalList;
    }
    public String getSelectedRowsId() {
        return selectedRowsId;
    }

    public void setSelectedRowsId(String selectedRowsId) {
        this.selectedRowsId = selectedRowsId;
    }

}