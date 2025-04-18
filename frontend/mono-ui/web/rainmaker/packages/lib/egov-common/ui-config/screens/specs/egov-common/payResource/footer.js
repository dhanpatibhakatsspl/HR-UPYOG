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

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../../ui-utils/api");

var _utils2 = require("../../utils");

var _constants = require("./constants");

require("./index.css");

var _payGov = require("./payGov");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkAmount = function checkAmount(totalAmount, customAmount, businessService) {
  if (totalAmount !== 0 && customAmount === 0) {
    return true;
  } else if (totalAmount === 0 && customAmount === 0 && (businessService === "WS" || businessService === "SW")) {
    return true;
  } else {
    return false;
  }
};

var callPGService = exports.callPGService = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var isAdvancePaymentAllowed, tenantId, consumerCode, businessService, url, redirectUrl, callbackUrl, _state$screenConfigur, screenConfiguration, _screenConfiguration$, preparedFinalObject, _preparedFinalObject$, ReceiptTemp, billPayload, taxAmount, amtToPay, isFormValid, payerInfo, user, taxAndPayments, buttonJsonpath, requestBody, goToPaymentGateway, srcQuery, searchResponse, transactionId, ackUrl, successUrl, _redirectUrl, gatewayParam, newForm, orderForNDSLPaymentSite, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isAdvancePaymentAllowed = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
            businessService = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].businessService");
            url = (0, _commons.isPublicSearch)() ? "withoutAuth/egov-common/paymentRedirectPage" : "egov-common/paymentRedirectPage";
            redirectUrl = process.env.NODE_ENV === "production" ? "citizen/" + url : url;
            // const businessService = getQueryArg(window.location.href, "businessService"); businessService

            callbackUrl = window.origin + "/" + redirectUrl;
            _state$screenConfigur = state.screenConfiguration, screenConfiguration = _state$screenConfigur === undefined ? {} : _state$screenConfigur;
            _screenConfiguration$ = screenConfiguration.preparedFinalObject, preparedFinalObject = _screenConfiguration$ === undefined ? {} : _screenConfiguration$;
            _preparedFinalObject$ = preparedFinalObject.ReceiptTemp, ReceiptTemp = _preparedFinalObject$ === undefined ? {} : _preparedFinalObject$;
            billPayload = ReceiptTemp[0];
            taxAmount = Number((0, _get2.default)(billPayload, "Bill[0].totalAmount"));
            amtToPay = state.screenConfiguration.preparedFinalObject.AmountType === "partial_amount" ? state.screenConfiguration.preparedFinalObject.AmountPaid : taxAmount;

            amtToPay = amtToPay ? Number(amtToPay) : taxAmount;

            if (!(amtToPay > taxAmount && !isAdvancePaymentAllowed)) {
              _context.next = 17;
              break;
            }

            alert("Advance Payment is not allowed");
            return _context.abrupt("return");

          case 17:
            isFormValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePayerDetails.children.cardContent.children.payerDetailsCardContainer.children", state, dispatch, "pay");

            if (isFormValid) {
              _context.next = 21;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Transaction numbers don't match !",
              labelKey: "ERR_FILL_ALL_FIELDS"
            }, "error"));
            return _context.abrupt("return");

          case 21:
            if (!checkAmount(taxAmount, Number(state.screenConfiguration.preparedFinalObject.AmountPaid), businessService)) {
              _context.next = 24;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please enter an amount greater than zero!", labelKey: "ERR_ENTER_AMOUNT_MORE_THAN_ZERO" }, "error"));
            return _context.abrupt("return");

          case 24:
            if (!checkAmount(taxAmount, Number(state.screenConfiguration.preparedFinalObject.AmountPaid), businessService)) {
              _context.next = 27;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please enter an amount greater than zero!", labelKey: "ERR_ENTER_AMOUNT_MORE_THAN_ZERO" }, "error"));
            return _context.abrupt("return");

          case 27:
            payerInfo = (0, _get2.default)(billPayload, "Bill[0].payer", '').replace("COMMON_", '');
            user = {
              name: (0, _get2.default)(billPayload, "Bill[0].paidBy", (0, _get2.default)(billPayload, "Bill[0].payerName")),
              mobileNumber: (0, _get2.default)(billPayload, "Bill[0].payerMobileNumber", (0, _get2.default)(billPayload, "Bill[0].mobileNumber")),
              tenantId: tenantId
            };
            taxAndPayments = [];

            taxAndPayments.push({
              // taxAmount:taxAmount,
              // businessService: businessService,
              billId: (0, _get2.default)(billPayload, "Bill[0].id"),
              amountPaid: amtToPay
            });
            buttonJsonpath = _constants.paybuttonJsonpath + ("" + (process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"));
            _context.prev = 32;


            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("pay", buttonJsonpath, "props.disabled", true));

            requestBody = {
              Transaction: {
                tenantId: tenantId,
                txnAmount: amtToPay,
                module: businessService,
                billId: (0, _get2.default)(billPayload, "Bill[0].id"),
                consumerCode: consumerCode,
                productInfo: "Common Payment",
                gateway: "PAYGOV",
                taxAndPayments: taxAndPayments,
                user: user,
                callbackUrl: callbackUrl,
                additionalDetails: { isWhatsapp: localStorage.getItem('pay-channel') == 'whatsapp' ? true : false,
                  paidBy: payerInfo }
              }
            };
            _context.next = 37;
            return (0, _api.httpRequest)("post", "pg-service/transaction/v1/_create", "_create", [], requestBody);

          case 37:
            goToPaymentGateway = _context.sent;

            if (!((0, _get2.default)(goToPaymentGateway, "Transaction.txnAmount") == 0)) {
              _context.next = 49;
              break;
            }

            srcQuery = "?tenantId=" + (0, _get2.default)(goToPaymentGateway, "Transaction.tenantId") + "&billIds=" + (0, _get2.default)(goToPaymentGateway, "Transaction.billId");
            _context.next = 42;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessService) + srcQuery, "_search", [], {});

          case 42:
            searchResponse = _context.sent;
            transactionId = (0, _get2.default)(searchResponse, "Payments[0].paymentDetails[0].receiptNumber");
            ackUrl = "/egov-common/acknowledgement?status=" + "success" + "&consumerCode=" + consumerCode + "&tenantId=" + tenantId + "&receiptNumber=" + transactionId + "&businessService=" + businessService;
            successUrl = (0, _commons.isPublicSearch)() ? "/withoutAuth" + ackUrl : ackUrl;

            dispatch((0, _actions.setRoute)(successUrl));
            _context.next = 88;
            break;

          case 49:
            _context.prev = 49;

            console.log("goToPaymentGatewaygoToPaymentGatewaygoToPaymentGateway", goToPaymentGateway, goToPaymentGateway.Transaction.redirectUrl);
            debugger;
            _redirectUrl = goToPaymentGateway.Transaction.redirectUrl;
            gatewayParam = _redirectUrl.split("?").slice(1).join("?").split("&").reduce(function (curr, acc) {
              var d = acc.split("=");
              curr[d[0]] = d[1];
              return curr;
            }, {});
            newForm = (0, _jquery2.default)("<form>", {
              action: gatewayParam.txURL,
              method: "POST",
              target: "_top"
            });
            orderForNDSLPaymentSite = ["checksum", "messageType", "merchantId", "serviceId", "orderId", "customerId", "transactionAmount", "currencyCode", "requestDateTime", "successUrl", "failUrl", "additionalField1", "additionalField2", "additionalField3", "additionalField4", "additionalField5"];

            // override default date for UPYOG Custom pay

            gatewayParam["requestDateTime"] = gatewayParam["requestDateTime"].split(new Date().getFullYear()).join(new Date().getFullYear() + " ");

            gatewayParam["successUrl"] = _redirectUrl.split("successUrl=")[1].split("eg_pg_txnid=")[0] + 'eg_pg_txnid=' + gatewayParam.orderId;
            gatewayParam["failUrl"] = _redirectUrl.split("failUrl=")[1].split("eg_pg_txnid=")[0] + 'eg_pg_txnid=' + gatewayParam.orderId;
            // gatewayParam["successUrl"]= data?.Transaction?.callbackUrl;
            // gatewayParam["failUrl"]= data?.Transaction?.callbackUrl;

            // var formdata = new FormData();

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 62;
            for (_iterator = orderForNDSLPaymentSite[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              key = _step.value;


              // formdata.append(key,gatewayParam[key]);

              newForm.append((0, _jquery2.default)("<input>", {
                name: key,
                value: gatewayParam[key]
                // type: "hidden",
              }));
            }
            _context.next = 70;
            break;

          case 66:
            _context.prev = 66;
            _context.t0 = _context["catch"](62);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 70:
            _context.prev = 70;
            _context.prev = 71;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 73:
            _context.prev = 73;

            if (!_didIteratorError) {
              _context.next = 76;
              break;
            }

            throw _iteratorError;

          case 76:
            return _context.finish(73);

          case 77:
            return _context.finish(70);

          case 78:
            (0, _jquery2.default)(document.body).append(newForm);
            newForm.submit();
            console.log("newForm", newForm);
            debugger;
            (0, _payGov.makePayment)(gatewayParam.txURL, newForm);

            _context.next = 88;
            break;

          case 85:
            _context.prev = 85;
            _context.t1 = _context["catch"](49);

            console.log("Error in payment redirect ", _context.t1);
            //window.location = redirectionUrl;

          case 88:
            _context.next = 94;
            break;

          case 90:
            _context.prev = 90;
            _context.t2 = _context["catch"](32);

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("pay", buttonJsonpath, "props.disabled", false));
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context.t2.message, labelKey: _context.t2.message }, "error"));
            /*     // }else{
                  moveToFailure(dispatch);
                }
             */

          case 94:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[32, 90], [49, 85], [62, 66, 70, 78], [71,, 73, 77]]);
  }));

  return function callPGService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var moveToSuccess = function moveToSuccess(dispatch, receiptNumber) {
  var consumerCode = (0, _commons.getQueryArg)(window.location, "consumerCode");
  var tenantId = (0, _commons.getQueryArg)(window.location, "tenantId");
  var businessService = (0, _commons.getQueryArg)(window.location, "businessService");
  var status = "success";
  var appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  var moduleName = "egov-common";
  if (businessService && businessService.indexOf("BPA") > -1) {
    moduleName = "egov-bpa";
  }
  var url = appendUrl + "/" + moduleName + "/acknowledgement?status=" + status + "&consumerCode=" + consumerCode + "&tenantId=" + tenantId + "&receiptNumber=" + receiptNumber + "&businessService=" + businessService + "&purpose=" + "pay";
  var ackSuccessUrl = (0, _commons.isPublicSearch)() ? "/withoutAuth" + url : url;
  dispatch((0, _actions.setRoute)(ackSuccessUrl));
};
var moveToFailure = function moveToFailure(dispatch) {
  var consumerCode = (0, _commons.getQueryArg)(window.location, "consumerCode");
  var tenantId = (0, _commons.getQueryArg)(window.location, "tenantId");
  var businessService = (0, _commons.getQueryArg)(window.location, "businessService");
  var status = "failure";
  var appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  var url = appendUrl + "/egov-common/acknowledgement?status=" + status + "&consumerCode=" + consumerCode + "&tenantId=" + tenantId + "&businessService=" + businessService;
  var ackFailureUrl = (0, _commons.isPublicSearch)() ? "/withoutAuth" + url : url;
  dispatch((0, _actions.setRoute)(ackFailureUrl));
};

var getSelectedTabIndex = function getSelectedTabIndex(paymentType) {
  switch (paymentType) {
    case "CASH":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "CHEQUE":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };

    case "CARD":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    case "OFFLINE_NEFT":
      return {
        selectedPaymentMode: "offline_neft",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "onlineDetails"]
      };
    case "OFFLINE_RTGS":
      return {
        selectedPaymentMode: "offline_rtgs",
        selectedTabIndex: 4,
        fieldsToValidate: ["payeeDetails", "onlineDetails"]
      };
    case "POSTAL_ORDER":
      return {
        selectedPaymentMode: "postal_order",
        selectedTabIndex: 5,
        fieldsToValidate: ["payeeDetails", "poDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 6,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };

    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};

var validateString = function validateString() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  str = str && str != null && str.trim() || "";
  if (str.length > 0) {
    return true;
  }
  return false;
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

var updatePayAction = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, consumerCode, tenantId, receiptNumber) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              moveToSuccess(dispatch, receiptNumber);
            } catch (e) {
              moveToFailure(dispatch);
              dispatch((0, _actions2.toggleSnackbar)(true, { labelName: e.message, labelKey: e.message }, "error"));
              console.log(e);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updatePayAction(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var callBackForPay = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var isFormValid, isAdvancePaymentAllowed, roleExists, selectedPaymentType, _getSelectedTabIndex, selectedTabIndex, selectedPaymentMode, fieldsToValidate, ReceiptDataTemp, finalReceiptData, ifscCode, branchName, bankName, ReceiptBody, ReceiptBodyNew, totalAmount, amtPaid, buttonJsonpath, response, receiptNumber, consumerCode, tenantId;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isFormValid = true;
            isAdvancePaymentAllowed = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");
            roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");

            if (!roleExists) {
              _context3.next = 6;
              break;
            }

            alert("You are not Authorized!");
            return _context3.abrupt("return");

          case 6:

            // --- Validation related -----//

            selectedPaymentType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.instrumentType.name");
            _getSelectedTabIndex = getSelectedTabIndex(selectedPaymentType), selectedTabIndex = _getSelectedTabIndex.selectedTabIndex, selectedPaymentMode = _getSelectedTabIndex.selectedPaymentMode, fieldsToValidate = _getSelectedTabIndex.fieldsToValidate;


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

            // if (get(finalReceiptData, "Bill[0].billDetails[0].manualReceiptDate")) {
            //   convertDateFieldToEpoch(
            //     finalReceiptData,
            //     "Bill[0].billDetails[0].manualReceiptDate"
            //   );
            // }

            // if (get(finalReceiptData, "instrument.transactionDateInput")) {
            //   convertDateFieldToEpoch(
            //     finalReceiptData,
            //     "Bill[0].billDetails[0].manualReceiptDate"
            //   );
            // }
            if ((0, _get2.default)(finalReceiptData, "instrument.transactionDateInput")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentDate", (0, _get2.default)(finalReceiptData, "instrument.transactionDateInput"));
            }

            if ((0, _get2.default)(finalReceiptData, "instrument.transactionNumber")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentNumber", (0, _get2.default)(finalReceiptData, "instrument.transactionNumber"));
            }

            if (!(selectedPaymentType === "CARD")) {
              _context3.next = 19;
              break;
            }

            if (!((0, _get2.default)(finalReceiptData, "instrument.transactionNumber") !== (0, _get2.default)(finalReceiptData, "instrument.transactionNumberConfirm"))) {
              _context3.next = 19;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Transaction numbers don't match !",
              labelKey: "ERR_TRANSACTION_NO_DONT_MATCH"
            }, "error"));
            return _context3.abrupt("return");

          case 19:
            if (!(selectedPaymentType === "CHEQUE" || selectedPaymentType === "OFFLINE_NEFT" || selectedPaymentType === "OFFLINE_RTGS")) {
              _context3.next = 28;
              break;
            }

            //Extra check - to verify ifsc and bank details are populated 


            ifscCode = (0, _get2.default)(finalReceiptData, "instrument.ifscCode", "");
            branchName = (0, _get2.default)(finalReceiptData, "instrument.branchName", "");
            bankName = (0, _get2.default)(finalReceiptData, "instrument.bank.name", "");

            if (!(!validateString(ifscCode) || !validateString(branchName) || !validateString(bankName) || ifscCode !== (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "validIfscCode", ""))) {
              _context3.next = 28;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.bank.name", ""));
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.branchName", ""));
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Enter a Valid IFSC code !",
              labelKey: "ERR_ENTER_VALID_IFSC"
            }, "error"));
            return _context3.abrupt("return");

          case 28:

            //------------- Form End ----------------//

            ReceiptBody = {
              Receipt: []
            };
            ReceiptBodyNew = {
              Payment: { paymentDetails: [] }
            };


            ReceiptBody.Receipt.push(finalReceiptData);
            totalAmount = Number(finalReceiptData.Bill[0].totalAmount);


            ReceiptBodyNew.Payment["tenantId"] = finalReceiptData.tenantId;
            ReceiptBodyNew.Payment["totalDue"] = totalAmount;

            ReceiptBodyNew.Payment["paymentMode"] = finalReceiptData.instrument.instrumentType.name;
            ReceiptBodyNew.Payment["paidBy"] = finalReceiptData.Bill[0].payer;
            ReceiptBodyNew.Payment["mobileNumber"] = finalReceiptData.Bill[0].payerMobileNumber;
            ReceiptBodyNew.Payment["payerName"] = finalReceiptData.Bill[0].paidBy ? finalReceiptData.Bill[0].paidBy : finalReceiptData.Bill[0].payerName || finalReceiptData.Bill[0].payer;
            if (finalReceiptData.instrument.transactionNumber) {
              ReceiptBodyNew.Payment["transactionNumber"] = finalReceiptData.instrument.transactionNumber;
            }
            if (finalReceiptData.instrument.instrumentNumber) {
              ReceiptBodyNew.Payment["instrumentNumber"] = finalReceiptData.instrument.instrumentNumber;
            }
            if (finalReceiptData.instrument.instrumentDate) {
              ReceiptBodyNew.Payment["instrumentDate"] = finalReceiptData.instrument.instrumentDate;
            }
            if (finalReceiptData.instrument.ifscCode) {
              ReceiptBodyNew.Payment["ifscCode"] = finalReceiptData.instrument.ifscCode;
            }
            amtPaid = state.screenConfiguration.preparedFinalObject.AmountType === "partial_amount" ? state.screenConfiguration.preparedFinalObject.AmountPaid : finalReceiptData.Bill[0].totalAmount;

            amtPaid = amtPaid ? Number(amtPaid) : totalAmount;

            if (!(amtPaid > totalAmount && !isAdvancePaymentAllowed)) {
              _context3.next = 47;
              break;
            }

            alert("Advance Payment is not allowed");
            return _context3.abrupt("return");

          case 47:
            if (!checkAmount(totalAmount, Number(state.screenConfiguration.preparedFinalObject.AmountPaid), finalReceiptData.Bill[0].businessService)) {
              _context3.next = 50;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please enter an amount greater than zero!", labelKey: "ERR_ENTER_AMOUNT_MORE_THAN_ZERO" }, "error"));
            return _context3.abrupt("return");

          case 50:

            ReceiptBodyNew.Payment.paymentDetails.push({
              manualReceiptDate: finalReceiptData.Bill[0].billDetails[0].manualReceiptDate,
              manualReceiptNumber: finalReceiptData.Bill[0].billDetails[0].manualReceiptNumber,
              businessService: finalReceiptData.Bill[0].businessService,
              billId: finalReceiptData.Bill[0].id,
              totalDue: totalAmount,
              totalAmountPaid: amtPaid
            });
            ReceiptBodyNew.Payment["totalAmountPaid"] = amtPaid;

            //---------------- Create Receipt ------------------//

            if (!isFormValid) {
              _context3.next = 73;
              break;
            }

            buttonJsonpath = _constants.paybuttonJsonpath + ("" + (process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"));

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("pay", buttonJsonpath, "props.disabled", true));
            _context3.prev = 55;
            _context3.next = 58;
            return (0, _api.httpRequest)("post", "collection-services/payments/_create", "_create", [], ReceiptBodyNew, [], {});

          case 58:
            response = _context3.sent;
            receiptNumber = (0, _get2.default)(response, "Payments[0].paymentDetails[0].receiptNumber", null);

            // Search NOC application and update action to PAY

            consumerCode = (0, _commons.getQueryArg)(window.location, "consumerCode");
            tenantId = (0, _commons.getQueryArg)(window.location, "tenantId");
            _context3.next = 64;
            return updatePayAction(state, dispatch, consumerCode, tenantId, receiptNumber);

          case 64:
            _context3.next = 71;
            break;

          case 66:
            _context3.prev = 66;
            _context3.t0 = _context3["catch"](55);


            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("pay", buttonJsonpath, "props.disabled", false));
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context3.t0.message, labelKey: _context3.t0.message }, "error"));
            console.log(_context3.t0);

          case 71:
            _context3.next = 74;
            break;

          case 73:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill all the mandatory fields",
              labelKey: "ERR_FILL_ALL_FIELDS"
            }, "error"));

          case 74:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[55, 66]]);
  }));

  return function callBackForPay(_x9, _x10) {
    return _ref3.apply(this, arguments);
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
  generateReceipt: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "gen-receipt-com"
      // style: {
      //   width: "379px",
      //   height: "48px ",
      //   right: "19px ",
      //   position: "relative",
      //   borderRadius: "0px "
      // }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "GENERATE RECEIPT",
        labelKey: "COMMON_GENERATE_RECEIPT"
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
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   roles: ["NOC_CEMP"],
    //   action: "PAY"
    // },
    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
  },
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "make-payment-com"
      // style: {
      //   width: "363px",
      //   height: "48px ",
      //   right: "19px",
      //   position: "relative",
      //   borderRadius: "0px "
      // }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "MAKE PAYMENT",
        labelKey: "COMMON_MAKE_PAYMENT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right",
          className: ""
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callPGService
    },
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   roles: ["CITIZEN"],
    //   action: "PAY"
    // },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});