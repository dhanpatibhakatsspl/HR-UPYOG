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

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _utils = require("../../utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, serviceObject, isAdvancePayment, responseFromAPI, bills, billTableData, uiConfigs, configObject, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen.tenantId");
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, { key: "limit", value: "10" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.billSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "billSearch");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.billSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "billSearch");

            if (!(!isSearchBoxFirstRowValid || !isSearchBoxSecondRowValid)) {
              _context.next = 10;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "ABG_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 31;
            break;

          case 10:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 14;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "ABG_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 31;
            break;

          case 14:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] == "") {
                delete searchScreenObject[key];
              }
            }
            serviceObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.BillingService.BusinessService").filter(function (item) {
              return item.code === searchScreenObject.businesService;
            });


            searchScreenObject.url = serviceObject && serviceObject[0] && serviceObject[0].billGineiURL;
            isAdvancePayment = serviceObject && serviceObject[0] && serviceObject[0].isAdvanceAllowed;

            if (searchScreenObject.url) {
              _context.next = 21;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Selected Service Category is Not Available for Search",
              labelKey: "ABG_SEARCH_BILLGINEIURL_NOTFOUND"
            }, "error"));
            return _context.abrupt("return");

          case 21:
            searchScreenObject.tenantId = process.env.REACT_APP_NAME === "Citizen" ? tenantId : (0, _localStorageUtils.getTenantId)();
            _context.next = 24;
            return (0, _commons.getGroupBillSearch)(dispatch, searchScreenObject);

          case 24:
            responseFromAPI = _context.sent;
            bills = responseFromAPI && responseFromAPI.Bills || [];
            billTableData = bills.map(function (item) {
              return {
                billNumber: (0, _get2.default)(item, "billNumber"),
                billId: (0, _get2.default)(item, "id"),
                consumerCode: (0, _get2.default)(item, "consumerCode"),
                consumerName: (0, _get2.default)(item, "payerName"),
                billDate: (0, _get2.default)(item, "billDate"),
                billAmount: (0, _get2.default)(item, "totalAmount"),
                status: (0, _get2.default)(item, "status"),
                action: getActionItem((0, _get2.default)(item, "status")),
                tenantId: (0, _get2.default)(item, "tenantId")
              };
            });

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.billSearchResponse", bills));
            uiConfigs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.common-masters.uiCommonPay");
            configObject = uiConfigs.filter(function (item) {
              return item.code === searchScreenObject.businesService;
            });


            try {
              data = billTableData.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_BILL_NO', item.billNumber || "-"), (0, _defineProperty3.default)(_ref2, "PAYMENT_COMMON_CONSUMER_CODE", item.consumerCode || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_CONSUMER_NAME', item.consumerName || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_BILL_DATE', (0, _index.convertEpochToDate)(item.billDate) || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_BILL_AMOUNT', item.billAmount || item.billAmount === 0 ? item.billAmount : "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_ACTION', item.action || "-"), (0, _defineProperty3.default)(_ref2, "BUSINESS_SERVICE", searchScreenObject.businesService), (0, _defineProperty3.default)(_ref2, "RECEIPT_KEY", (0, _get2.default)(configObject[0], "receiptKey", "consolidatedreceipt") || "consolidatedreceipt"), (0, _defineProperty3.default)(_ref2, "BILL_KEY", (0, _get2.default)(configObject[0], "billKey", "consolidatedbill") || "consolidatedbill"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref2, "BILL_ID", item.billId), (0, _defineProperty3.default)(_ref2, "BILL_SEARCH_URL", searchScreenObject.url), (0, _defineProperty3.default)(_ref2, "ADVANCE_PAYMENT", isAdvancePayment), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "props.tableData", billTableData));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "props.rows", billTableData.length));

              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
            }

          case 31:
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var getActionItem = function getActionItem(status) {
  switch (status) {
    case "ACTIVE":
      return "ABG_PAY";
    case "CANCELLED":
    case "EXPIRED":
      return "ABG_GENERATE_NEW_BILL";
    case "PAID":
      return "ABG_DOWNLOAD_RECEIPT";
    case "PARTIALLY_PAID":
      return "ABG_PARTIALLY_PAID";
  }
};