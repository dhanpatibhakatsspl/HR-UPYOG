"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.amountToBePaid = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var amountToBePaid = exports.amountToBePaid = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Amount to be Paid",
        labelKey: "ABG_AMOUNT_TO_BE_PAID_HEADER"
      })),
      amountRadioGroup: {
        uiFramework: "custom-containers",
        moduleName: "egov-abg",
        componentPath: "RadioGroupContainer",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        jsonPath: "ReceiptTemp[0].Bill[0].billDetails[0].amountToBePaid",
        props: {
          buttons: [{
            labelName: "Full Amount",
            labelKey: "ABG_FULL_AMOUNT_RADIOBUTTON",
            value: "FULL AMOUNT"
          }, {
            labelName: "Partial Amount",
            labelKey: "ABG_PARTIAL_AMOUNT_RADIOBUTTON",
            value: "PARTIAL AMOUNT"
          }],
          jsonPath: "ReceiptTemp[0].Bill[0].billDetails[0].amountPaid"
        },
        type: "array"
      },
      amountToPay: (0, _utils.getTextField)({
        labelName: "Amount to pay(INR)",
        labelKey: "ABG_AMOUNT_TO_PAY_LABEL"
      }, {
        jsonPath: "ReceiptTemp[0].Bill[0].billDetails[0].amountPaidPartially"
      })
    }
  }
});