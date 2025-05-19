"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.getCommonApplyFooter = exports.callPGService = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _api = require("../../../../../ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils2 = require("../../utils");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callPGService = exports.callPGService = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, callbackUrl, queryObj, billPayload, taxAndPayments, requestBody, goToPaymentGateway, redirectionUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            callbackUrl = document.location.origin + "/" + (process.env.NODE_ENV === "production" ? "citizen" : "") + "/tradelicense-citizen/PaymentRedirectPage";
            _context.prev = 2;
            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
            }, {
              key: "businessService",
              value: "TL"
            }];
            _context.next = 6;
            return (0, _utils2.getBill)(queryObj);

          case 6:
            billPayload = _context.sent;
            taxAndPayments = (0, _get2.default)(billPayload, "billResponse.Bill[0].taxAndPayments", []).map(function (item) {
              if (item.businessService === "TL") {
                item.amountPaid = (0, _get2.default)(billPayload, "billResponse.Bill[0].billDetails[0].totalAmount");
              }
              return item;
            });
            _context.prev = 8;
            requestBody = {
              Transaction: {
                tenantId: tenantId,
                txnAmount: (0, _get2.default)(billPayload, "billResponse.Bill[0].billDetails[0].totalAmount"),
                module: "TL",
                taxAndPayments: taxAndPayments,
                billId: (0, _get2.default)(billPayload, "billResponse.Bill[0].id"),
                consumerCode: (0, _get2.default)(billPayload, "billResponse.Bill[0].billDetails[0].consumerCode"),
                productInfo: "Trade License Payment",
                gateway: "AXIS",
                callbackUrl: callbackUrl
              }
            };
            _context.next = 12;
            return (0, _api.httpRequest)("post", "pg-service/transaction/v1/_create", "_create", [], requestBody);

          case 12:
            goToPaymentGateway = _context.sent;
            redirectionUrl = (0, _get2.default)(goToPaymentGateway, "Transaction.redirectUrl");

            window.location = redirectionUrl;
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](8);

            console.log(_context.t0);

          case 20:
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](2);

            console.log(_context.t1);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 22], [8, 17]]);
  }));

  return function callPGService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var moveToSuccess = function moveToSuccess(href, dispatch, receiptNumber) {
  var applicationNo = (0, _commons.getQueryArg)(href, "applicationNumber");
  var tenantId = (0, _commons.getQueryArg)(href, "tenantId");
  var purpose = "pay";
  var status = "success";
  dispatch((0, _actions.setRoute)("/tradelicence/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&tenantId=" + tenantId + "&secondNumber=" + receiptNumber));
};

var convertDateFieldToEpoch = function convertDateFieldToEpoch(finalObj, jsonPath) {
  var dateConvertedToEpoch = (0, _utils2.convertDateToEpoch)((0, _get2.default)(finalObj, jsonPath), "daystart");
  (0, _set2.default)(finalObj, jsonPath, dateConvertedToEpoch);
};

var allDateToEpoch = function allDateToEpoch(finalObj, jsonPaths) {
  jsonPaths.forEach(function (jsonPath) {
    if ((0, _get2.default)(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

var callBackForPay = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var href, isFormValid, selectedPaymentType, _getSelectedTabIndex, selectedTabIndex, selectedPaymentMode, fieldsToValidate, ReceiptDataTemp, finalReceiptData, ReceiptBody, response, receiptNumber;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            href = window.location.href;
            isFormValid = true;

            // --- Validation related -----//

            selectedPaymentType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.instrumentType.name");
            _getSelectedTabIndex = (0, _commons.getSelectedTabIndex)(selectedPaymentType), selectedTabIndex = _getSelectedTabIndex.selectedTabIndex, selectedPaymentMode = _getSelectedTabIndex.selectedPaymentMode, fieldsToValidate = _getSelectedTabIndex.fieldsToValidate;


            isFormValid = fieldsToValidate.map(function (curr) {
              return (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + selectedTabIndex + "].tabContent." + selectedPaymentMode + ".children." + curr + ".children", state, dispatch, "pay");
            }).indexOf(false) === -1;
            if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Bill[0].billDetails[0].manualReceiptDate")) {
              isFormValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.g8Details.children.cardContent.children.receiptDetailsCardContainer.children", state, dispatch, "pay");
            }

            //------------ Validation End -------------//

            //------------- Form related ----------------//

            ReceiptDataTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0]");
            finalReceiptData = (0, _cloneDeep2.default)(ReceiptDataTemp);


            allDateToEpoch(finalReceiptData, ["Bill[0].billDetails[0].manualReceiptDate", "instrument.transactionDateInput"]);
            if ((0, _get2.default)(finalReceiptData, "instrument.transactionDateInput")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentDate", (0, _get2.default)(finalReceiptData, "instrument.transactionDateInput"));
            }

            if ((0, _get2.default)(finalReceiptData, "instrument.transactionNumber")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentNumber", (0, _get2.default)(finalReceiptData, "instrument.transactionNumber"));
            }

            if (!(selectedPaymentType === "Card")) {
              _context2.next = 15;
              break;
            }

            if (!((0, _get2.default)(finalReceiptData, "instrument.transactionNumber") !== (0, _get2.default)(finalReceiptData, "instrument.transactionNumberConfirm"))) {
              _context2.next = 15;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Transaction numbers don't match !",
              labelKey: "ERR_TRASACTION_NUMBERS_DONT_MATCH"
            }, "error"));
            return _context2.abrupt("return");

          case 15:

            //------------- Form End ----------------//

            ReceiptBody = {
              Receipt: []
            };


            ReceiptBody.Receipt.push(finalReceiptData);

            //---------------- Create Receipt ------------------//

            if (!isFormValid) {
              _context2.next = 35;
              break;
            }

            _context2.prev = 18;

            dispatch((0, _actions2.toggleSpinner)());
            _context2.next = 22;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_create", "_create", [], ReceiptBody, [], {});

          case 22:
            response = _context2.sent;
            receiptNumber = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", null);

            dispatch((0, _actions2.toggleSpinner)());
            moveToSuccess(href, dispatch, receiptNumber);
            _context2.next = 33;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](18);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context2.t0.message }, "error"));
            dispatch((0, _actions2.toggleSpinner)());
            console.log(_context2.t0);

          case 33:
            _context2.next = 36;
            break;

          case 35:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill all mandatory fields and upload the documents !",
              labelKey: "ERR_FILL_MANDATORY_FIELDS"
            }, "warning"));

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[18, 28]]);
  }));

  return function callBackForPay(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var footer = exports.footer = getCommonApplyFooter({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    },
    roleDefination: {
      rolePath: "user-info.roles",
      //roles: ["TL_CEMP"]
      action: "PAY"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
  },
  // downloadConfirmationform: {
  //   componentPath: "Button",
  //   props: {
  //     variant: "outlined",
  //     color: "primary",
  //     style: {
  //       minWidth: "200px",
  //       height: "48px",
  //       marginRight: "45px"
  //     }
  //   },
  //   children: {
  //     submitButtonLabel: getLabel({
  //       labelName: "DOWNLOAD CONFIRMATION FORM",
  //       labelKey: "TL_COMMON_BUTTON_DOWNLOAD_CONFIRMATION_FORM"
  //     })
  //   },
  //   onClickDefination: {
  //     action: "condition",
  //     callBack: callBackForPay
  //   },
  //   roleDefination: {
  //     rolePath: "user-info.roles"
  //     roles: ["CITIZEN"]
  //   }
  // },
  // printConfirmationform: {
  //   componentPath: "Button",
  //   props: {
  //     variant: "outlined",
  //     color: "primary",
  //     style: {
  //       minWidth: "200px",
  //       height: "48px",
  //       marginRight: "45px"
  //     }
  //   },
  //   children: {
  //     submitButtonLabel: getLabel({
  //       labelName: "PRINT CONFIRMATION FORM",
  //       labelKey: "TL_COMMON_BUTTON_PRINT_CONFIRMATION_FORM"
  //     })
  //   },
  //   onClickDefination: {
  //     action: "condition",
  //     callBack: callBackForPay
  //   },
  //   roleDefination: {
  //     rolePath: "user-info.roles"
  //     roles: ["CITIZEN"]
  //   }
  // },
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "framework-responsive-button"
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "MAKE PAYMENT",
        labelKey: "TL_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callPGService
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "PAY"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});