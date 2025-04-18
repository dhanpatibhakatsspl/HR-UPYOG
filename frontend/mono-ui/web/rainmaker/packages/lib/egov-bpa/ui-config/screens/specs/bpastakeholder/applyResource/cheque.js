"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cheque = exports.chequeDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _payeeDetails = require("./payeeDetails");

var chequeDetails = exports.chequeDetails = (0, _utils.getCommonContainer)({
  chequeNo: (0, _utils.getTextField)({
    label: {
      labelName: "Cheque No",
      labelKey: "TL_PAYMENT_CHQ_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter Cheque  no.",
      labelKey: "TL_PAYMENT_CHQ_NO_PLACEHOLDER"
    },
    required: true
  }),
  chequeDate: (0, _utils.getDateField)({
    label: { labelName: "Cheque Date", labelKey: "TL_PAYMENT_CHQ_DATE_LABEL" },
    placeholder: { labelName: "dd/mm/yy" },
    required: true
  }),
  chequeIFSC: (0, _utils.getTextField)({
    label: {
      labelName: "IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true
  })
});

var cheque = exports.cheque = (0, _utils.getCommonContainer)({
  payeeDetails: _payeeDetails.payeeDetails,
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Cheque Details:",
    labelKey: "TL_EMP_APPLICATION_CHECK_DETAILS"
  }),
  chequeDetails: chequeDetails
});