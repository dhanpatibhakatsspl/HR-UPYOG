"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentMethods = exports.cash = exports.card = exports.cardDetails = exports.demandDraft = exports.demandDraftDetails = exports.postal_order = exports.neftRtgs = exports.offline_rtgs = exports.offline_neft = exports.cheque = exports.poDetails = exports.chequeDetails = exports.onlineDetails = exports.payeeDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onIconClick = function onIconClick(state, dispatch, index) {
  var ifscCode = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.ifscCode");
  if (ifscCode) {
    dispatch((0, _actions.toggleSpinner)());
    fetch("https://ifsc.razorpay.com/" + ifscCode).then(function (response) {
      return response.json();
    }).then(function (payload) {
      if (payload === "Not Found") {
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.bank.name", ""));
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.branchName", ""));
        dispatch((0, _actions.toggleSnackbar)(true, {
          labelName: "Bankdetails not found for this IFSC",
          labelKey: "ERR_BANK_DETAILS_NOT_FOUND_FOR_IFSC"
        }, "error"));
        dispatch((0, _actions.toggleSpinner)());
      } else {
        var bankName = (0, _get2.default)(payload, "BANK");
        var bankBranch = (0, _get2.default)(payload, "BRANCH");
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.bank.name", bankName));
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.branchName", bankBranch));
        dispatch((0, _actions.prepareFinalObject)("validIfscCode", ifscCode));
        dispatch((0, _actions.toggleSpinner)());
      }
    }).catch(function (error) {
      console.log(error);
      dispatch((0, _actions.toggleSpinner)());
    });
  }
};

var payeeDetails = exports.payeeDetails = (0, _utils.getCommonContainer)({
  paidBy: (0, _utils.getSelectField)({
    label: {
      labelName: "Paid By",
      labelKey: "NOC_PAYMENT_PAID_BY_LABEL"
    },
    placeholder: {
      labelName: "Paid By",
      labelKey: "NOC_PAYMENT_PAID_BY_PLACEHOLDER"
    },
    data: [{
      code: "COMMON_OWNER"
    }, {
      code: "COMMON_OTHER"
    }],
    jsonPath: "ReceiptTemp[0].Bill[0].payer",
    required: true,
    beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
      var tabIndex = 0;
      var tabs = (0, _get2.default)(state.screenConfiguration.screenConfig, "pay.components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs", []);
      var tabValue = (0, _get2.default)(tabs[tabIndex], "code", '').toLowerCase();
      var componentPath = process.env.REACT_APP_NAME === "Citizen" ? "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePayerDetails.children.cardContent.children.payerDetailsCardContainer" : "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + tabIndex + "].tabContent." + tabValue + ".children.payeeDetails";
      var payerOtherName = process.env.REACT_APP_NAME === "Citizen" ? (0, _commons.getQueryArg)(window.location.href, "name") : "" || "";
      var payerOtherNumber = process.env.REACT_APP_NAME === "Citizen" ? (0, _commons.getQueryArg)(window.location.href, "mobileNumber") : "" || "";
      if (action.value === "COMMON_OTHER") {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerName", "props.value", payerOtherName));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerMobileNo", "props.value", payerOtherNumber));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerName", "props.error", false));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerMobileNo", "props.error", false));

        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerName", "props.disabled", false));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerMobileNo", "props.disabled", false));
      } else {
        /* To disable the payer name and mobile number incase the user is not owner */
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerName", "props.disabled", true));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerMobileNo", "props.disabled", true));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerName", "props.value", (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].payerName", '')));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentPath + ".children.payerMobileNo", "props.value", (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].mobileNumber", '')));
      }
    }

  }),
  payerName: (0, _utils.getTextField)({
    label: {
      labelName: "Payer Name",
      labelKey: "NOC_PAYMENT_PAYER_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Name",
      labelKey: "NOC_PAYMENT_PAYER_NAME_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].paidBy",
    pattern: (0, _utils.getPattern)("Name"),
    required: true
  }),
  payerMobileNo: (0, _utils.getTextField)({
    label: {
      labelName: "Payer Mobile No.",
      labelKey: "NOC_PAYMENT_PAYER_MOB_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Mobile No.",
      labelKey: "NOC_PAYMENT_PAYER_MOB_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].payerMobileNumber",
    pattern: (0, _utils.getPattern)("MobileNo"),
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    iconObj: {
      position: "start",
      label: "+91 |"
    },
    required: true
  })
});

var onlineDetails = exports.onlineDetails = (0, _utils.getCommonContainer)({
  txnNo: (0, _utils.getTextField)({
    label: {
      labelName: "Transaction No.",
      labelKey: "PAYMENT_TXN_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter Transaction  no.",
      labelKey: "PAYMENT_TXN_NO_PLACEHOLDER"
    },
    //Pattern validation for Cheque number
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber",
    required: true
  }),
  txnDate: (0, _utils.getDateField)({
    label: {
      labelName: "Transaction Date",
      labelKey: "PAYMENT_TXN_DATE_LABEL"
    },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "PAYMENT_TXN_DATE_PLACEHOLDER"
    },
    pattern: (0, _utils.getPattern)("Date"),
    errorMessage: "PAYMENT_TX_ERROR_MESSAGE",
    required: true,
    isDOB: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput",
    props: {
      inputProps: {
        max: (0, _commons.getTodaysDateInYMD)()
      }
    }
  }),
  onlineIFSC: (0, _utils.getTextField)({
    label: {
      labelName: "IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.ifscCode",
    iconObj: {
      iconName: "search",
      position: "end",
      color: "#FE7A51",
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          onIconClick(state, dispatch, 1);
        }
      }
    }
  }),
  chequeBank: (0, _utils.getTextField)({
    label: {
      labelName: "Bank Name",
      labelKey: "NOC_PAYMENT_BANK_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter bank name",
      labelKey: "NOC_PAYMENT_BANK_NAME_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.bank.name"
  }),
  chequeBranch: (0, _utils.getTextField)({
    label: {
      labelName: "Bank Branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_LABEL"
    },
    placeholder: {
      labelName: "Enter bank branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.branchName"
  })
});

var chequeDetails = exports.chequeDetails = (0, _utils.getCommonContainer)({
  chequeNo: (0, _utils.getTextField)({
    label: {
      labelName: "Cheque No",
      labelKey: "NOC_PAYMENT_CHQ_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter Cheque  no.",
      labelKey: "NOC_PAYMENT_CHQ_NO_PLACEHOLDER"
    },
    //Pattern validation for Cheque number
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber",
    required: true
  }),
  chequeDate: (0, _utils.getDateField)({
    label: {
      labelName: "Cheque Date",
      labelKey: "NOC_PAYMENT_CHEQUE_DATE_LABEL"
    },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "NOC_PAYMENT_CHEQUE_DATE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput"
  }),
  chequeIFSC: (0, _utils.getTextField)({
    label: {
      labelName: "IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.ifscCode",
    iconObj: {
      iconName: "search",
      position: "end",
      color: "#FE7A51",
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          onIconClick(state, dispatch, 1);
        }
      }
    }
  }),
  chequeBank: (0, _utils.getTextField)({
    label: {
      labelName: "Bank Name",
      labelKey: "NOC_PAYMENT_BANK_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter bank name",
      labelKey: "NOC_PAYMENT_BANK_NAME_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.bank.name"
  }),
  chequeBranch: (0, _utils.getTextField)({
    label: {
      labelName: "Bank Branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_LABEL"
    },
    placeholder: {
      labelName: "Enter bank branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.branchName"
  })
});

var poDetails = exports.poDetails = (0, _utils.getCommonContainer)({
  ipoNo: (0, _utils.getTextField)({
    label: {
      labelName: "IPO No.",
      labelKey: "PAYMENT_IPO_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter IPO No.",
      labelKey: "PAYMENT_IPO_NO_PLACEHOLDER"
    },
    //Pattern validation for Cheque number
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber",
    required: true
  }),
  txnDate: (0, _utils.getDateField)({
    label: {
      labelName: "Transaction Date",
      labelKey: "PAYMENT_TXN_DATE_LABEL"
    },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "PAYMENT_TXN_DATE_PLACEHOLDER"
    },
    pattern: (0, _utils.getPattern)("Date"),
    errorMessage: "PAYMENT_TX_ERROR_MESSAGE",
    isDOB: true,
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput",
    props: {
      inputProps: {
        max: (0, _commons.getTodaysDateInYMD)()
      }
    }
  })
});

var cheque = exports.cheque = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  chequeDetails: chequeDetails
});

var offline_neft = exports.offline_neft = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  onlineDetails: (0, _extends3.default)({}, onlineDetails)
});
var offline_rtgs = exports.offline_rtgs = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  onlineDetails: (0, _extends3.default)({}, onlineDetails)
});

var neftRtgs = exports.neftRtgs = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  onlineDetails: onlineDetails
});

var postal_order = exports.postal_order = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  poDetails: (0, _extends3.default)({}, poDetails)
});

var demandDraftDetails = exports.demandDraftDetails = (0, _utils.getCommonContainer)({
  ddNo: (0, _utils.getTextField)({
    label: {
      labelName: "DD No",
      labelKey: "NOC_PAYMENT_DD_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter DD  no.",
      labelKey: "NOC_PAYMENT_DD_NO_PLACEHOLDER"
    },
    required: true,
    //Pattern validation for DD no.
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber"
  }),
  ddDate: (0, _utils.getDateField)({
    label: { labelName: "DD Date", labelKey: "NOC_PAYMENT_DD_DATE_LABEL" },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "NOC_PAYMENT_DD_DATE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput"
  }),
  ddIFSC: (0, _utils.getTextField)({
    label: {
      labelName: "IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.ifscCode",
    iconObj: {
      iconName: "search",
      position: "end",
      color: "#FE7A51",
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          onIconClick(state, dispatch, 2);
        }
      }
    }
  }),
  ddBank: (0, _utils.getTextField)({
    label: {
      labelName: "Bank Name",
      labelKey: "NOC_PAYMENT_BANK_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter bank name",
      labelKey: "NOC_PAYMENT_BANK_NAME_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.bank.name"
  }),
  ddBranch: (0, _utils.getTextField)({
    label: {
      labelName: "Bank Branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_LABEL"
    },
    placeholder: {
      labelName: "Enter bank branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.branchName"
  })
});

var demandDraft = exports.demandDraft = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  demandDraftDetails: demandDraftDetails
});

var cardDetails = exports.cardDetails = (0, _utils.getCommonContainer)({
  last4Digits: (0, _utils.getTextField)({
    label: {
      labelName: "Last 4 digits",
      labelKey: "NOC_PAYMENT_CARD_LAST_DIGITS_LABEL"
    },
    placeholder: {
      labelName: "Enter Last 4 digits of the card",
      labelKey: "NOC_PAYMENT_CARD_LAST_DIGITS_LABEL_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.instrumentNumber",
    pattern: "^([0-9]){4}$",
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
  }),
  TrxNo: (0, _utils.getTextField)({
    label: {
      labelName: "Transaction No.",
      labelKey: "NOC_PAYMENT_TRANS_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "NOC_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    // Pattern validation for Transaction number
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber"
  }),
  repeatTrxNo: (0, _utils.getTextField)({
    label: {
      labelName: "Re-Enter Transaction No.",
      labelKey: "NOC_PAYMENT_RENTR_TRANS_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "NOC_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    // Pattern validation for Transaction number
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionNumberConfirm"
  })
});

var card = exports.card = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails,
  cardDetails: cardDetails
});

var cash = exports.cash = (0, _utils.getCommonContainer)({
  payeeDetails: payeeDetails
});

var paymentMethods = exports.paymentMethods = [{
  code: "CASH",
  tabButton: "COMMON_CASH",
  tabIcon: "Dashboard",
  tabContent: { cash: cash }
}, {
  code: "CHEQUE",
  tabButton: "COMMON_CHEQUE",
  tabIcon: "Schedule",
  tabContent: { cheque: cheque }
}, {
  code: "DD",
  tabButton: "COMMON_DD",
  tabIcon: "Schedule",
  tabContent: { demandDraft: demandDraft }
}, {
  code: "CARD",
  tabButton: "COMMON_CREDIT_DEBIT_CARD",
  tabIcon: "Schedule",
  tabContent: { card: card }
}, {
  code: "OFFLINE_NEFT",
  tabButton: "COMMON_NEFT",
  tabIcon: "Schedule",
  tabContent: { offline_neft: offline_neft }
}, {
  code: "OFFLINE_RTGS",
  tabButton: "COMMON_RTGS",
  tabIcon: "Schedule",
  tabContent: { offline_rtgs: offline_rtgs }
}, {
  code: "POSTAL_ORDER",
  tabButton: "COMMON_POSTAL_ORDER",
  tabIcon: "Schedule",
  tabContent: { postal_order: postal_order }
}];