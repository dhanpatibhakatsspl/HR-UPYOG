"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.card = exports.cardDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _payeeDetails = require("./payeeDetails");

var cardDetails = exports.cardDetails = (0, _utils.getCommonContainer)({
  last4Digits: (0, _utils.getSelectField)({
    label: {
      labelName: "Last 4 digits",
      labelKey: "TL_CARD_LAST_DIGITS_LABEL"
    },
    placeholder: {
      labelName: "Enter Last 4 digits of the card",
      labelKey: "TL_PAYMENT_LABEL_LAST_DIGITS"
    },
    required: true
  }),
  TrxNo: (0, _utils.getTextField)({
    label: {
      labelName: "Transaction No.",
      labelKey: "TL_PAYMENT_TRANS_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "TL_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    required: true
  }),
  repeatTrxNo: (0, _utils.getTextField)({
    label: {
      labelName: "Re-Enter Transaction No.",
      labelKey: "TL_PAYMENT_RENTR_TRANS_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "TL_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    required: true
  })
});

var card = exports.card = (0, _utils.getCommonContainer)({
  payeeDetails: _payeeDetails.payeeDetails,
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Card Details:",
    labelKey: "TL_EMP_APPLICATION_CARD_DETAILS"
  }),
  cardDetails: cardDetails
});