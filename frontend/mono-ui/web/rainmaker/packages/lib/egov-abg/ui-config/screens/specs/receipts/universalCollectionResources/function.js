"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, key, responseFromAPI, Payments, response, i, serviceTypeLabel, uiConfigs, convertedConfig, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "receiptCancelSearch", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid) {
              _context.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "CR_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context.next = 25;
            break;

          case 8:
            if (!(Object.keys(searchScreenObject).length == 0 || checkEmptyFields(searchScreenObject))) {
              _context.next = 12;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "CR_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 25;
            break;

          case 12:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && key === "businessServices" && searchScreenObject['businessServices'] != null) {
                queryObject.push({ key: key, value: searchScreenObject[key] });
              } else if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
            }
            (0, _commons.disableFieldAndShowSpinner)('search', "components.div.children.UCSearchCard.children.cardContent.children.buttonContainer.children.searchButton", dispatch);
            _context.next = 16;
            return (0, _commons2.getPaymentSearchResults)(queryObject, dispatch);

          case 16:
            responseFromAPI = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse", responseFromAPI));
            Payments = responseFromAPI && responseFromAPI.Payments || [];
            response = [];

            for (i = 0; i < Payments.length; i++) {
              serviceTypeLabel = (0, _commons.getTransformedLocale)((0, _get2.default)(Payments[i], "paymentDetails[0].bill.businessService"));

              response[i] = {
                receiptNumber: (0, _get2.default)(Payments[i], "paymentDetails[0].receiptNumber"),
                payeeName: (0, _get2.default)(Payments[i], "payerName"),
                serviceType: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.businessService"),
                receiptdate: (0, _get2.default)(Payments[i], "paymentDetails[0].receiptDate"),
                amount: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.consumerCode"),
                status: (0, _get2.default)(Payments[i], "paymentStatus"),
                businessService: (0, _get2.default)(Payments[i], "paymentDetails[0].bill.businessService"),
                tenantId: (0, _get2.default)(Payments[i], "tenantId"),
                instrumentStatus: (0, _get2.default)(Payments[i], "instrumentStatus")
              };
            }
            uiConfigs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.uiCommonConfig");
            convertedConfig = {};

            uiConfigs.map(function (uiConfig) {
              convertedConfig[uiConfig.code] = (0, _extends3.default)({}, uiConfig);
            });
            try {
              data = response.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'CR_COMMON_TABLE_COL_RECEIPT_NO', item.receiptNumber || "-"), (0, _defineProperty3.default)(_ref2, 'CR_COMMON_TABLE_COL_PAYEE_NAME', item.payeeName || "-"), (0, _defineProperty3.default)(_ref2, 'CR_SERVICE_TYPE_LABEL', (0, _utils.getTextToLocalMapping)("BILLINGSERVICE_BUSINESSSERVICE_" + item.serviceType) || "-"), (0, _defineProperty3.default)(_ref2, 'CR_COMMON_TABLE_COL_DATE', (0, _utils.convertEpochToDate)(item.receiptdate) || "-"), (0, _defineProperty3.default)(_ref2, 'CR_COMMON_TABLE_CONSUMERCODE', item.amount || "-"), (0, _defineProperty3.default)(_ref2, 'CR_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, 'CR_COMMON_TABLE_ACTION', item.status !== "CANCELLED" && (item.instrumentStatus = "APPROVED" || item.instrumentStatus == "REMITTED") && (convertedConfig[item.businessService] ? convertedConfig[item.businessService].cancelReceipt : convertedConfig['DEFAULT'].cancelReceipt) ? "CANCEL" : "NA"), (0, _defineProperty3.default)(_ref2, "RECEIPT_KEY", (0, _get2.default)(uiConfigs.filter(function (item) {
                  return item.code === item.businessService;
                }), "0.receiptKey", "consolidatedreceipt")), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId || "-"), (0, _defineProperty3.default)(_ref2, "SERVICE_TYPE", item.serviceType), _ref2;
              });

              (0, _commons.enableFieldAndHideSpinner)('search', "components.div.children.UCSearchCard.children.cardContent.children.buttonContainer.children.searchButton", dispatch);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", data.length));

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults"));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
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

var checkEmptyFields = function checkEmptyFields(searchScreenObject) {
  var businessServices = (0, _get2.default)(searchScreenObject, 'businessServices', null);
  var mobileNumber = (0, _get2.default)(searchScreenObject, 'mobileNumber', null);
  var receiptNumbers = (0, _get2.default)(searchScreenObject, 'receiptNumbers', null);
  var consumerNumbers = (0, _get2.default)(searchScreenObject, 'consumerCodes', null);
  if (checkEmpty(businessServices) && checkEmpty(mobileNumber) && checkEmpty(consumerNumbers) && checkEmpty(receiptNumbers)) {
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};