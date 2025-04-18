"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paymentMethods = require("egov-common/ui-containers-local/CustomTabContainer/payment-methods");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var capturePayerDetails = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Payer Information",
    labelKey: "PAY_PAYER_DETAILS"
  }),
  payerDetailsCardContainer: _paymentMethods.payeeDetails
});

exports.default = capturePayerDetails;