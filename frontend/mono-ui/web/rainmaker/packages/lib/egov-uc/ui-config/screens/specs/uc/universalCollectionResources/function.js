"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchChallanApiCall = exports.searchApiCall = undefined;

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
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, key, responseFromAPI, Payments, response, i, serviceTypeLabel, uiConfigs, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            showHideReceiptTable(false, dispatch);
            queryObject = [];


            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, { key: "offset", value: "0" }];

            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ucSearchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid) {
              _context.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context.next = 23;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || checkEmptyFields(searchScreenObject))) {
              _context.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context.next = 23;
            break;

          case 13:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && key === "businessServices" && searchScreenObject['businessServices'] != null) {
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

            _context.next = 16;
            return (0, _commons2.getSearchResults)(queryObject);

          case 16:
            responseFromAPI = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse", responseFromAPI));
            Payments = responseFromAPI && responseFromAPI.Payments || [];
            response = [];

            for (i = 0; i < Payments.length; i++) {
              serviceTypeLabel = (0, _commons.getTransformedLocale)((0, _get2.default)(Payments[i], "paymentDetails[0].bill.businessService"));

              response[i] = {
                receiptNumber: (0, _get2.default)(Payments[i], "paymentDetails[0].receiptNumber"),
                consumerCode: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.consumerCode"),
                payeeName: (0, _get2.default)(Payments[i], "paidBy"), // Changed by DC
                serviceType: serviceTypeLabel,
                receiptdate: (0, _get2.default)(Payments[i], "paymentDetails[0].receiptDate"),
                amount: (0, _get2.default)(Payments[i], "paymentDetails[0].totalAmountPaid"),
                status: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.status"),
                businessService: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.businessService"),
                tenantId: (0, _get2.default)(Payments[i], "tenantId")
              };
            }
            uiConfigs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.uiCommonConfig");

            try {
              data = response.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_RECEIPT_NO', item.receiptNumber || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_CONSUMERCODE', item.consumerCode || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_PAYEE_NAME', item.payeeName || "-"), (0, _defineProperty3.default)(_ref2, 'UC_SERVICE_TYPE_LABEL', (0, _utils.getTextToLocalMapping)("BILLINGSERVICE_BUSINESSSERVICE_" + item.serviceType) || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_DATE', (0, _utils.convertEpochToDate)(item.receiptdate) || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_AMOUNT', item.amount || "-"), (0, _defineProperty3.default)(_ref2, 'UC_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, "RECEIPT_KEY", (0, _get2.default)(uiConfigs.filter(function (item) {
                  return item.code === item.businessService;
                }), "0.receiptKey", "consolidatedreceipt")), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId || "-"), (0, _defineProperty3.default)(_ref2, "SERVICE", item.businessService), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", data.length));

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults"));
              showHideReceiptTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
              console.log(error);
            }
            // } else {
            //   dispatch(
            //     toggleSnackbar(
            //       true,
            //       {
            //         labelName:
            //           "Please fill atleast one more field apart from service category !",
            //         labelKey: "ERR_FILL_ONE_MORE_SEARCH_FIELD"
            //       },
            //       "warning"
            //     )
            //   );
            // }

          case 23:
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
var searchChallanApiCall = exports.searchChallanApiCall = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var queryObject, challanSearchScreenObject, isSearchBoxFirstRowValid, key, responseFromAPI, challans, response, i, serviceTypeLabel, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            showHideTable(false, dispatch);
            queryObject = [];

            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, { key: "offset", value: "0" }];
            challanSearchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "challanSearchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.SearchChallanCard.children.cardContent.children.searchContainer.children", state, dispatch, "searchChallan" //screen name
            );

            if (isSearchBoxFirstRowValid) {
              _context2.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context2.next = 24;
            break;

          case 9:
            if (!(Object.keys(challanSearchScreenObject).length == 0 || checkSearchChallanEmptyFields(challanSearchScreenObject))) {
              _context2.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context2.next = 24;
            break;

          case 13:
            for (key in challanSearchScreenObject) {
              if (challanSearchScreenObject.hasOwnProperty(key) && key === "businessService" && challanSearchScreenObject['businessService'] != "") {
                queryObject.push({ key: key, value: challanSearchScreenObject[key] });
              } else if (challanSearchScreenObject.hasOwnProperty(key) && challanSearchScreenObject[key] && challanSearchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _utils.convertDateToEpoch)(challanSearchScreenObject[key], "daystart")
                  });
                } else if (key === "toDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _utils.convertDateToEpoch)(challanSearchScreenObject[key], "dayend")
                  });
                } else {
                  queryObject.push({ key: key, value: challanSearchScreenObject[key].trim() });
                }
              }
            }

            dispatch((0, _actions.toggleSpinner)());
            _context2.next = 17;
            return (0, _commons2.getChallanSearchResult)(queryObject);

          case 17:
            responseFromAPI = _context2.sent;


            dispatch((0, _actions.prepareFinalObject)("challanSearchResponse", responseFromAPI));
            dispatch((0, _actions.toggleSpinner)());
            challans = responseFromAPI && responseFromAPI.challans || [];
            response = [];

            for (i = 0; i < challans.length; i++) {
              serviceTypeLabel = (0, _commons.getTransformedLocale)(challans[i].businessService);


              response[i] = {
                challanNo: challans[i].challanNo,
                serviceType: serviceTypeLabel,
                consumerName: challans[i].citizen.name,
                status: challans[i].applicationStatus,
                tenantId: challans[i].tenantId,
                businessService: challans[i].businessService
              };
            }

            // const uiConfigs = get(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.uiCommonConfig");
            try {
              data = response.map(function (item) {
                var _ref4;

                return _ref4 = {}, (0, _defineProperty3.default)(_ref4, 'UC_CHALLAN_NO_LABEL', item.challanNo || "-"), (0, _defineProperty3.default)(_ref4, 'UC_COMMON_TABLE_COL_PAYEE_NAME', item.consumerName || "-"), (0, _defineProperty3.default)(_ref4, 'UC_SERVICE_TYPE_LABEL', (0, _utils.getTextToLocalMapping)("BILLINGSERVICE_BUSINESSSERVICE_" + item.serviceType) || "-"), (0, _defineProperty3.default)(_ref4, 'UC_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref4, "TENANT_ID", item.tenantId || "-"), (0, _defineProperty3.default)(_ref4, "BUSINESS_SERVICE", item.businessService || "-"), _ref4;
              });


              dispatch((0, _actions.handleScreenConfigurationFieldChange)("searchChallan", "components.div.children.SearchChallanResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("searchChallan", "components.div.children.SearchChallanResults", "props.rows", data.length));

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("searchChallan", "components.div.children.SearchChallanResults"));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
              console.log(error);
            }

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function searchChallanApiCall(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var checkSearchChallanEmptyFields = function checkSearchChallanEmptyFields(searchScreenObject) {
  var businessServices = (0, _get2.default)(searchScreenObject, 'businessService', null);
  var mobileNumber = (0, _get2.default)(searchScreenObject, 'mobileNumber', null);
  var consumerCodes = (0, _get2.default)(searchScreenObject, 'challanNo', null);
  if (checkEmpty(businessServices) && checkEmpty(mobileNumber) && checkEmpty(consumerCodes)) {
    return true;
  }
  return false;
};

var checkEmptyFields = function checkEmptyFields(searchScreenObject) {

  var businessServices = (0, _get2.default)(searchScreenObject, 'businessService', null);
  var mobileNumber = (0, _get2.default)(searchScreenObject, 'mobileNumber', null);
  var receiptNumbers = (0, _get2.default)(searchScreenObject, 'receiptNumbers', null);
  var consumerCodes = (0, _get2.default)(searchScreenObject, 'consumerCodes', null);
  var fromDate = (0, _get2.default)(searchScreenObject, 'fromDate', null);
  var toDate = (0, _get2.default)(searchScreenObject, 'toDate', null);
  if (checkEmpty(businessServices) && checkEmpty(mobileNumber) && checkEmpty(receiptNumbers) && checkEmpty(consumerCodes) && checkEmpty(fromDate) && checkEmpty(toDate)) {

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

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("searchChallan", "components.div.children.SearchChallanResults", "visible", booleanHideOrShow));
};

var showHideReceiptTable = function showHideReceiptTable(booleanHideOrShow, dispatch) {

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};