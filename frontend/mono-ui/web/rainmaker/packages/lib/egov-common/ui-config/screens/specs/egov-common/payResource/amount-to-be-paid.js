"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("./utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmountToBePaid = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Amount to be Paid",
    labelKey: "PAY_AMOUNT_TO_BE_PAID"
  }),
  amountDetailsCardContainer: (0, _utils.getCommonContainer)({
    AmountToPaidButton: (0, _extends3.default)({}, (0, _utils.getRadioButton)([{
      labelName: "Full Amount",
      labelKey: "PAY_FULL_AMOUNT",
      value: "full_amount"
    }, {
      label: "Custom Amount",
      labelKey: "PAY_CUSTOM_AMOUNT",
      value: "partial_amount"
    }], "AmountType", "full_amount"), {
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        try {
          (0, _utils2.dispatchHandleField)(dispatch, "props.disabled", action.value === "full_amount" ? true : false);
          var payload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]");
          if (payload && payload.totalAmount && action.value === "full_amount") {
            (0, _utils2.dispatchHandleField)(dispatch, "props.value", payload.totalAmount);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }),
    lineBreak: (0, _utils.getBreak)(),
    displayAmount: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Amount to pay (Rs)",
        labelKey: "AMOUNT_TO_PAY"
      },
      pattern: (0, _utils.getPattern)("Amount"),
      jsonPath: "AmountPaid",
      // required: true,
      props: {
        disabled: true,
        className: 'pay-amount-text-field'
      }
    }), {
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        var pattern = (0, _utils.getPattern)("Amount");
        var minAmountPayable = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "businessServiceInfo.minAmountPayable");
        try {
          (0, _utils2.validateAmountInput)(pattern, action, dispatch, state, minAmountPayable);
        } catch (e) {
          console.log(e);
        }
      }
    })
  })
});

exports.default = AmountToBePaid;