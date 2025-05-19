"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchHandleField = exports.getTemp = exports.validateAmountInput = undefined;

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _constants = require("./constants");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonJsonpath = _constants.paybuttonJsonpath + ("" + (process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"));
var validateAmountInput = exports.validateAmountInput = function validateAmountInput(pattern, action, dispatch, state, minAmountPayable) {
  var totalAmount = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].totalAmount");
  if (totalAmount > minAmountPayable) {
    var temp = getTemp(action, pattern, minAmountPayable);
    if (temp === 1) {
      handleValidation(action, _constants.numberPattern, dispatch, "AMOUNT_LESS_THAN_" + minAmountPayable, true);
    } else if (temp === 3) {
      handleValidation(action, _constants.numberPattern, dispatch, "AMOUNT_EMPTY", true);
    } else if (temp === 2) {
      handleValidation(action, pattern, dispatch, "AMOUNT_INVALID", true);
    } else {
      handleValidation(action, pattern, dispatch, "", false);
    }
  } else if (totalAmount === undefined) {
    handleValidation(action, pattern, dispatch, "", true);
  }
};

var getTemp = exports.getTemp = function getTemp(action, pattern, minAmountPayable) {
  if (action.value) {
    if (pattern.test(action.value) && parseInt(action.value) < minAmountPayable) {
      return 1;
    }
    if (!pattern.test(action.value)) {
      return 2;
    }
  } else if (!action.value) {
    return 3;
  }
};

var handleButton = function handleButton(dispatch, disabled) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", buttonJsonpath, "props.disabled", disabled));
};

var handleValidation = function handleValidation(action, pattern, dispatch, message, disabled) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", action.componentJsonpath, "pattern", pattern));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", action.componentJsonpath, "isFieldValid", !disabled));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", action.componentJsonpath, "props.errorMessage", message));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", action.componentJsonpath, "props.error", disabled));
  handleButton(dispatch, disabled);
};

var dispatchHandleField = exports.dispatchHandleField = function dispatchHandleField(dispatch, property, value) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", _constants.componentJsonpath, property, value));
};