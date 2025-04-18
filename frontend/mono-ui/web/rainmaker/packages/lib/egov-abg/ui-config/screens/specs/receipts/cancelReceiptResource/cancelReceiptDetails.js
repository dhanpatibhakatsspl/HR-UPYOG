"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewReceiptDetailsCard = exports.cancelReceiptDetailsCard = exports.receiptSummary = exports.receiptPaymentDetails = exports.receiptSummaryDetails = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var receiptSummaryDetails = exports.receiptSummaryDetails = {
  receiptNumber: (0, _utils.getLabelWithValue)({
    labelName: "Reason for Transfer",
    labelKey: "CR_RECEIPT_NUMBER"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].receiptNumber",
    callBack: _utils2.checkValueForNA
  }),
  consumerNo: (0, _utils.getLabelWithValue)({
    labelName: "Document Issue Date",
    labelKey: "CR_RECEIPT_CONSUMER_NUMBER"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].bill.consumerCode",
    callBack: _utils2.checkValueForNA
  }), paymentDate: (0, _utils.getLabelWithValue)({
    labelName: "Document Value",
    labelKey: "CR_RECEIPT_PAYMENT_DATE"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].receiptDate",
    callBack: function callBack(value) {
      return (0, _index.convertEpochToDate)(value);
    }
  }),
  payerName: (0, _utils.getLabelWithValue)({
    labelName: "Remarks",
    labelKey: "CR_RECEIPT_PAYER_NAME"
  }, {
    jsonPath: "PaymentReceipt.payerName",
    callBack: _utils2.checkValueForNA
  }), payerNumber: (0, _utils.getLabelWithValue)({
    labelName: "Remarks",
    labelKey: "CR_RECEIPT_PAYER_NUMBER"
  }, {
    jsonPath: "PaymentReceipt.mobileNumber",
    callBack: _utils2.checkValueForNA
  })
};
var receiptPaymentDetails = exports.receiptPaymentDetails = {
  serviceType: (0, _utils.getLabelWithValue)({

    labelName: "Market Value",
    labelKey: "CR_RECEIPT_SERVICE_TYPE"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].businessService",
    callBack: _utils2.checkValueForNA
  }),
  billPeriod: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_BILL_PERIOD"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].bill.billDetails[0].fromPeriod",
    callBack: function callBack(value) {
      return (0, _index.convertEpochToDate)(value);
    }
  }), receiptAmount: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_AMOUNT"
  }, {
    jsonPath: "PaymentReceipt.totalAmountPaid",
    callBack: _utils2.checkValueForNA
  }), pendingAmount: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_PENDING_AMOUNT"
  }, {
    jsonPath: "PaymentReceipt.pendingAmountCalculated",
    callBack: _utils2.checkValueForNA
  }), paymentMode: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_PAYMENT_MODE"
  }, {
    jsonPath: "PaymentReceipt.paymentMode",
    callBack: _utils2.checkValueForNA
  }), txnId: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_TXN_ID"
  }, {
    jsonPath: "PaymentReceipt.transactionNumber",
    callBack: _utils2.checkValueForNA
  }), g8ReceiptNo: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_G8_RECEIPT_NO"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].manualReceiptNumber",
    callBack: _utils2.checkValueForNA
  }), g8ReceiptDate: (0, _utils.getLabelWithValue)({
    labelName: "Document No.",
    labelKey: "CR_RECEIPT_G8_RECEIPT_DATE"
  }, {
    jsonPath: "PaymentReceipt.paymentDetails[0].manualReceiptDate",
    callBack: function callBack(value) {
      return (0, _index.convertEpochToDate)(value);
    }
  })
};
var receiptDetails = (0, _utils.getCommonGrayCard)({
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
        labelName: "Registration Details",
        labelKey: "CR_RECEIPT_SUMMARY"
      }))
    }
  },
  receiptPayeeDetails: (0, _utils.getCommonCard)({ receiptPayeeContainer: (0, _utils.getCommonContainer)(receiptSummaryDetails) }),
  receiptPaymentDetails: (0, _utils.getCommonCard)({ receiptPaymentContainer: (0, _utils.getCommonContainer)(receiptPaymentDetails) })
});

var receiptSummary = exports.receiptSummary = (0, _utils.getCommonGrayCard)({
  cardOne: receiptDetails
});

var cancelReceiptDetailsCard = exports.cancelReceiptDetailsCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)({
    reason: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-abg",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Reason",
          labelKey: "CR_RECEIPT_CANCELLATION_REASON_LABEL"
        },
        localePrefix: {
          moduleName: "CR",
          masterName: "REASON"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Select Reason",
          labelKey: "CR_SELECT_RECEIPT_CANCELLATION_REASON_LABEL"
        },
        required: true,
        labelsFromLocalisation: true,
        isClearable: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "applyScreenMdmsData.reasonForReceiptCancel"
      },
      required: true,
      jsonPath: "paymentWorkflows[0].reason",
      gridDefination: {
        xs: 12,
        sm: 8
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var additionalDetailsJson;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  additionalDetailsJson = "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.addtionalDetails";

                  if (action.value == "OTHER") {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "props.disabled", false));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "required", true));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "props.required", true));
                  } else {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "props.disabled", true));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "required", false));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "props.required", false));
                  }
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "props.value", ""));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelReceipt', additionalDetailsJson, "props.error", false));
                  return _context.abrupt("return", action);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    addtionalDetails: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Name",
        labelKey: "CR_MORE_DETAILS_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Name",
        labelKey: "CR_SELECT_MORE_DETAILS_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 8
      },
      required: false,
      disabled: true,
      // multiline: true,
      // rows: "4",
      visible: true,
      pattern: (0, _utils.getPattern)("Address"),
      errorMessage: "Invalid Details.",
      jsonPath: "paymentWorkflows[0].additionalDetails"
    }),

    addtionalPenalty: (0, _utils.getTextField)({
      label: {
        labelName: "Comments",
        labelKey: "CR_ADDITIONAL_PENALTY"
      },
      placeholder: {
        labelName: "Enter Comment ",
        labelKey: "CR_ADDITIONAL_PENALTY_PLACEHOLDER"
      },
      required: false,
      gridDefination: {
        xs: 12,
        sm: 8
      },
      pattern: (0, _utils.getPattern)("Amount"),
      jsonPath: "paymentWorkflows[0].additionalPenalty",
      disabled: true
    })
  })
});
var viewReceiptDetailsCard = exports.viewReceiptDetailsCard = (0, _utils.getCommonCard)({

  receiptDetails: receiptSummary

});