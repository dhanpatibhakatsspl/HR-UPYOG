"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../../ui-utils/commons");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN"));
var transfomedKeys = (0, _commons.transformById)(localizationLabels, "code");
var tenantId = (0, _localStorageUtils.getTenantId)();

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, key, responseFromAPI, Payments, response, i, serviceTypeLabel, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryObject = [{
              key: "tenantId",
              value: tenantId
            },
            // { key: "limit", value: "10" },
            { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ucSearchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid) {
              _context.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context.next = 25;
            break;

          case 8:
            if (!(Object.keys(searchScreenObject).length == 0 || checkEmptyFields(searchScreenObject))) {
              _context.next = 12;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context.next = 25;
            break;

          case 12:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context.next = 16;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, "Please fill From Date", "warning"));
            _context.next = 25;
            break;

          case 16:
            //  showHideProgress(true, dispatch);
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && key === "businessServices" && searchScreenObject['businessServices']) {
                queryObject.push({ key: key, value: searchScreenObject[key] });
              } else if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] && searchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _utils.convertDateToEpoch)(searchScreenObject[key], "daystart")
                  });
                } else if (key === "toDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _utils.convertDateToEpoch)(searchScreenObject[key], "dayend")
                  });
                } else {
                  queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                }
              }
            }

            _context.next = 19;
            return (0, _commons2.getSearchResults)(queryObject);

          case 19:
            responseFromAPI = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("PaymentsSearchResponse", responseFromAPI));

            Payments = responseFromAPI && responseFromAPI.Payments || [];
            response = [];

            for (i = 0; i < Payments.length; i++) {
              serviceTypeLabel = (0, _commons.getTransformedLocale)((0, _get2.default)(Payments[i], "paymentDetails[0].bill.businessService"));

              response[i] = {
                receiptNumber: (0, _get2.default)(Payments[i], "paymentDetails[0].receiptNumber"),
                consumerCode: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.consumerCode"),
                payeeName: (0, _get2.default)(Payments[i], "paidBy"), // changed by DC
                serviceType: serviceTypeLabel,
                receiptdate: (0, _get2.default)(Payments[i], "paymentDetails[0].receiptDate"),
                amount: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.totalAmount"),
                status: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.status"),
                tenantId: (0, _get2.default)(Payments[i], "tenantId")
              };
            }

            try {
              data = response.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_RECEIPT_NO', item.receiptNumber || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_CONSUMERCODE', item.consumerCode || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_PAYEE_NAME', item.payeeName || "-"), (0, _defineProperty3.default)(_ref2, 'UC_SERVICE_TYPE_LABEL', (0, _utils.getTextToLocalMapping)("BILLINGSERVICE_BUSINESSSERVICE_" + item.serviceType) || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_DATE', (0, _utils.convertEpochToDate)(item.receiptdate) || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_AMOUNT', item.amount || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId || "-"), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResult", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResult", "props.rows", data.length));

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResult"));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
              console.log(error);
            }

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResult", "visible", booleanHideOrShow));
};

var checkEmptyFields = function checkEmptyFields(searchScreenObject) {
  var businessServices = (0, _get2.default)(searchScreenObject, 'businessServices', null);
  var mobileNumber = (0, _get2.default)(searchScreenObject, 'mobileNumber', null);
  var receiptNumbers = (0, _get2.default)(searchScreenObject, 'receiptNumbers', null);
  if (checkEmpty(businessServices) && checkEmpty(mobileNumber) && checkEmpty(receiptNumbers)) {
    return true;
  }
  return false;
};
var checkEmpty = function checkEmpty(value) {
  value = typeof value == "string" ? value.trim() : value;
  if (value && value != null && value.length > 0) {
    return false;
  }
  return true;
};