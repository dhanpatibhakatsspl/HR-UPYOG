"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demandDraft = exports.demandDraftDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _payeeDetails = require("./payeeDetails");

var demandDraftDetails = exports.demandDraftDetails = (0, _utils.getCommonContainer)({
  ddNo: (0, _utils.getTextField)({
    label: {
      labelName: "DD No",
      labelKey: "TL_PAYMENT_DD_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter DD  no.",
      labelKey: "TL_PAYMENT_DD_NO_PLACEHOLDER"
    },
    required: true
  }),
  ddDate: (0, _utils.getDateField)({
    label: { labelName: "DD Date", labelKey: "TL_PAYMENT_DD_DATE_LABEL" },
    placeholder: { labelName: "dd/mm/yy" },
    required: true
  }),
  ddIFSC: (0, _utils.getTextField)({
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

var demandDraft = exports.demandDraft = (0, _utils.getCommonContainer)({
  payeeDetails: _payeeDetails.payeeDetails,
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Demand Draft Details: ",
    labelKey: "TL_EMP_APPLICATION_DD_DETAILS"
  }),
  demandDraftDetails: demandDraftDetails
});