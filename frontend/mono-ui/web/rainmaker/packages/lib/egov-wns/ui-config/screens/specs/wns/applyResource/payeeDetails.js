"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payeeDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var payeeDetails = exports.payeeDetails = (0, _utils.getCommonContainer)({
  paidBy: (0, _utils.getSelectField)({
    label: {
      labelName: "Paid By",
      labelKey: "TL_EMP_APPLICATION_PAID_BY"
    },
    required: false,
    jsonPath: ""
  }),

  //"Paid By", "Paid By", false, ""),
  payerName: (0, _utils.getTextField)({
    labelName: "Payer Name",
    labelKey: "TL_PAYMENT_PAYER_NAME_LABEL"
  }, {
    labelName: "Enter Payer Name",
    labelKey: "TL_PAYMENT_PAYER_NAME_PLACEHOLDER"
  }, false, ""),
  payerMobileNo: (0, _utils.getTextField)({
    labelName: "Payer Mobile No.",
    labelKey: "TL_PAYMENT_PAYER_MOB_LABEL"
  }, {
    labelName: "Enter Payer Mobile No.",
    labelKey: "TL_PAYMENT_PAYER_MOB_PLACEHOLDER"
  }, false, "")
});