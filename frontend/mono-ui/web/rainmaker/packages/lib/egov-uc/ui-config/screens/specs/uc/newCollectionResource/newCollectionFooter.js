"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processChallan = exports.newCollectionFooter = exports.showHideConfirmationPopup = exports.getRedirectionURL = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("egov-ui-framework/ui-utils/api");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

require("../../../../../index.css");

var _confirmationDialog = require("../confirmationDialog");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _localStorageUtils.getTenantId)();
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/uc/pay" : "/inbox";
  return redirectionURL;
};

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};
//to show up confirmation dialog on click of cancel button
var showHideConfirmationPopup = exports.showHideConfirmationPopup = function showHideConfirmationPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.div.children.newCollectionFooter.children.cancelConfirmationDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.div.children.newCollectionFooter.children.cancelConfirmationDialog", "props.open", !toggle));
};
var newCollectionFooter = exports.newCollectionFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "gen-challan-btn"
    },
    children: {
      generateChallanButtonLabel: (0, _utils.getLabel)({
        labelName: "Generate Challan",
        labelKey: "UC_ECHALLAN"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        processChallan(state, dispatch, "CREATE");
      }
    },
    visible: false
  },
  updateChallan: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "gen-challan-btn"
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Update RECEIPT",
        labelKey: "UC_UPDATE_CHALLAN"
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
      callBack: function callBack(state, dispatch) {
        processChallan(state, dispatch, "UPDATE");
      }
    },
    visible: false
  }
});

var convertDateFieldToEpoch = function convertDateFieldToEpoch(finalObj, jsonPath) {
  var dateConvertedToEpoch = (0, _utils2.convertDateToEpoch)((0, _get2.default)(finalObj, jsonPath));
  (0, _set2.default)(finalObj, jsonPath, dateConvertedToEpoch);
};

var allDateToEpoch = function allDateToEpoch(finalObj, jsonPaths) {
  jsonPaths.forEach(function (jsonPath) {
    if ((0, _get2.default)(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

var processChallan = exports.processChallan = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, applicationStatus) {
    var isFormValid, ucConsumerValid, ucServiceDetailValid, objToPush;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isFormValid = true;
            ucConsumerValid = (0, _utils2.validateFields)("components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children", state, dispatch, "newCollection");
            ucServiceDetailValid = (0, _utils2.validateFields)("components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children", state, dispatch, "newCollection");


            if (!ucConsumerValid || !ucServiceDetailValid) {
              isFormValid = false;
            }

            if (!isFormValid) {
              _context.next = 29;
              break;
            }

            _context.prev = 5;

            dispatch((0, _actions2.toggleSpinner)());
            objToPush = prepareObj(state, dispatch);
            _context.t0 = applicationStatus;
            _context.next = _context.t0 === "CREATE" ? 11 : _context.t0 === "CANCELLED" ? 14 : _context.t0 === "UPDATE" ? 18 : 21;
            break;

          case 11:
            _context.next = 13;
            return createChallan(state, dispatch, objToPush);

          case 13:
            return _context.abrupt("break", 21);

          case 14:
            objToPush.applicationStatus = applicationStatus;
            _context.next = 17;
            return cancelChallan(state, dispatch, objToPush);

          case 17:
            return _context.abrupt("break", 21);

          case 18:
            _context.next = 20;
            return updateChallan(state, dispatch, objToPush);

          case 20:
            return _context.abrupt("break", 21);

          case 21:
            dispatch((0, _actions2.toggleSpinner)());
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](5);

            dispatch((0, _actions2.toggleSpinner)());

          case 27:
            _context.next = 30;
            break;

          case 29:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill the required fields.",
              labelKey: "UC_REQUIRED_FIELDS_ERROR_MSG"
            }, "warning"));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 24]]);
  }));

  return function processChallan(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var prepareObj = function prepareObj(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", []));
  var eChallans = (0, _cloneDeep2.default)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Challan"));
  eChallans[0].amount && eChallans[0].amount.forEach(function (item) {
    if (!item.amount) {
      item.amount = 0;
    }
  });
  (0, _set2.default)(eChallans[0], "taxPeriodFrom", (0, _utils2.convertDateToEpoch)(eChallans[0].taxPeriodFrom));
  (0, _set2.default)(eChallans[0], "taxPeriodTo", (0, _utils2.convertDateToEpoch)(eChallans[0].taxPeriodTo));
  // set(eChallans[0], "payer.mobileNumber", eChallans[0].citizen.mobileNumber);
  // set(eChallans[0], "payer.name",  eChallans[0].citizen.name);

  //Check if tax period fall between the tax periods coming from MDMS -- Not required as of now
  var taxPeriodValid = isTaxPeriodValid(dispatch, eChallans[0], state);
  if (taxPeriodValid) {
    return eChallans[0];
  }
  return null;
};

var postUpdate = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, payload, operation) {
    var consumerCode, businessService, tenant;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            consumerCode = (0, _get2.default)(payload, "challans[0].challanNo");
            businessService = (0, _get2.default)(payload, "challans[0].businessService");

            (0, _set2.default)(payload, "challans[0].mobileNumber", (0, _get2.default)(payload, "challans[0].citizen.mobileNumber"));
            (0, _set2.default)(payload, "challans[0].consumerName", (0, _get2.default)(payload, "challans[0].citizen.name"));
            //set(payload,"challans[0].businessService",businessService.split(".")[0]);
            dispatch((0, _actions2.prepareFinalObject)("Challan", payload.challans[0]));
            tenant = (0, _localStorageUtils.getTenantId)();
            _context2.next = 8;
            return generateBill(consumerCode, tenant, businessService, operation, dispatch);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function postUpdate(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var createChallan = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, challan) {
    var operation, payload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            operation = "challan";
            _context3.prev = 1;

            if (!(challan != null)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 5;
            return (0, _api.httpRequest)("post", "/echallan-services/eChallan/v1/_create", "", [], {
              Challan: challan
            });

          case 5:
            payload = _context3.sent;

            if (!(payload.challans.length > 0)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 9;
            return postUpdate(state, dispatch, payload, operation);

          case 9:
            _context3.next = 13;
            break;

          case 11:
            console.info("some error  happened while generating challan");
            dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));

          case 13:
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](1);

            console.info("error in challan creation==", _context3.t0);
            if (_context3.t0.message) {
              dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context3.t0.message }, "error"));
            } else {
              //Case some internal error happened, and not handled, then go to ackmt page
              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));
            }

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 15]]);
  }));

  return function createChallan(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var updateChallan = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch, challan) {
    var operation, payload;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            operation = "update";
            _context4.prev = 1;

            if (!(challan != null)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 5;
            return (0, _api.httpRequest)("post", "/echallan-services/eChallan/v1/_update", "", [], {
              Challan: challan
            });

          case 5:
            payload = _context4.sent;

            if (!(payload.challans.length > 0)) {
              _context4.next = 11;
              break;
            }

            _context4.next = 9;
            return postUpdate(state, dispatch, payload, operation);

          case 9:
            _context4.next = 13;
            break;

          case 11:
            console.info("some error  happened while updating challan");
            dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));

          case 13:
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](1);

            dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 15]]);
  }));

  return function updateChallan(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

var cancelChallan = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, dispatch, challan) {
    var operation, payload, consumerCode, businessService;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            operation = "cancel";
            _context5.prev = 1;

            if (!(challan != null)) {
              _context5.next = 7;
              break;
            }

            _context5.next = 5;
            return (0, _api.httpRequest)("post", "/echallan-services/eChallan/v1/_update", "", [], {
              Challan: challan
            });

          case 5:
            payload = _context5.sent;

            if (payload.challans.length > 0) {
              consumerCode = (0, _get2.default)(payload, "challans[0].challanNo");
              businessService = (0, _get2.default)(payload, "challans[0].businessService");

              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=success&tenantId=" + (0, _localStorageUtils.getTenantId)() + "&serviceCategory=" + businessService + "&challanNumber=" + consumerCode));
            } else {
              console.info("some error  happened while cancelling challan");
              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));
            }

          case 7:
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);

            dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 9]]);
  }));

  return function cancelChallan(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

var generateBill = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(consumerCode, tenantId, businessService, operation, dispatch) {
    var payload;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill?consumerCode=" + consumerCode + "&businessService=" + businessService + "&tenantId=" + tenantId, "", [], {});

          case 3:
            payload = _context6.sent;

            if (payload && payload.Bill[0]) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=success&tenantId=" + tenantId + "&billNumber=" + payload.Bill[0].billNumber + "&serviceCategory=" + businessService + "&challanNumber=" + consumerCode));
            } else {
              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));
            }
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);

            console.log(_context6.t0);
            dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function generateBill(_x17, _x18, _x19, _x20, _x21) {
    return _ref6.apply(this, arguments);
  };
}();

var createEstimateData = function createEstimateData(billObject) {
  var billDetails = billObject && billObject.billDetails;
  var fees = billDetails && billDetails[0].billAccountDetails && billDetails[0].billAccountDetails.map(function (item) {
    return {
      name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
      value: item.amount,
      info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
    };
  });
  return fees;
};

var isTaxPeriodValid = function isTaxPeriodValid(dispatch, challan, state) {
  var taxPeriods = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.BillingService.TaxPeriod", []);
  var selectedFrom = new Date(challan.taxPeriodFrom);
  var selectedTo = new Date(challan.taxPeriodTo);
  if (selectedFrom <= selectedTo) {
    return true;
  } else {
    dispatch((0, _actions2.toggleSnackbar)(true, {
      labelName: "Please select the right tax period",
      labelKey: "UC_NEW_COLLECTION_WRONG_TAX_PERIOD_MSG"
    }, "warning"));
    return false;
  }
};