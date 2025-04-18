"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _utils = require("../../utils");

var _index = require("../../utils/index");

var _api = require("egov-ui-kit/utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, serviceObject, isAdvancePayment, responseFromAPI, bills, expiredConsumers, billObject, requestBodies, endpoints, queries, consumerIds, i, acknowledgementId, billMap, resp, billTableData, _i, uiConfigs, configObject, data;

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
            _context.next = 49;
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
            _context.next = 49;
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
            return (0, _commons.getGroupBillSearch)(dispatch, (0, _extends3.default)({}, searchScreenObject, { billActive: "ACTIVE" }));

          case 24:
            responseFromAPI = _context.sent;
            bills = responseFromAPI && responseFromAPI.Bills || [];

            bills = bills.filter(function (bill) {
              return bill.status === "ACTIVE";
            });
            expiredConsumers = [];
            billObject = {};

            bills.map(function (bill) {
              billObject[bill.consumerCode] = bill;
              if (bill.billDetails[0].expiryDate < new Date().getTime()) {
                expiredConsumers.push(bill.consumerCode);
              }
            });

            if (!(expiredConsumers.length > 0)) {
              _context.next = 42;
              break;
            }

            requestBodies = [];
            endpoints = [];
            queries = [];
            consumerIds = [].concat(expiredConsumers);

            for (i = 0; i <= expiredConsumers.length + 200; i += 200) {
              acknowledgementId = consumerIds.splice(0, 200);

              if (acknowledgementId && acknowledgementId.length > 0) {
                queries.push([{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: acknowledgementId.join(',') }, { key: "businessService", value: searchScreenObject.businesService }]);
                requestBodies.push({});
                endpoints.push("/billing-service/bill/v2/_fetchbill");
              }
            }

            billMap = [];
            _context.next = 39;
            return (0, _api.multiHttpRequest)(endpoints, "_fetchBill", queries, requestBodies);

          case 39:
            resp = _context.sent;

            resp && resp.map(function (res) {
              if (res && res.Bill) {
                var bill = res.Bill;
                billMap = [].concat((0, _toConsumableArray3.default)(billMap), (0, _toConsumableArray3.default)(bill));
              }
            });
            billMap.map(function (bill) {
              billObject[bill.consumerCode] = bill;
            });

          case 42:
            bills = Object.values(billObject);
            billTableData = [];

            for (_i = 0; _i < bills.length; _i++) {
              if ((0, _get2.default)(bills[_i], "status") === "ACTIVE") {
                billTableData.push({
                  billNumber: (0, _get2.default)(bills[_i], "billNumber"),
                  billId: (0, _get2.default)(bills[_i], "id"),
                  consumerCode: (0, _get2.default)(bills[_i], "consumerCode"),
                  consumerName: (0, _get2.default)(bills[_i], "payerName"),
                  billDate: (0, _get2.default)(bills[_i], "billDetails[0].expiryDate"),
                  billAmount: (0, _get2.default)(bills[_i], "totalAmount"),
                  status: (0, _get2.default)(bills[_i], "status"),
                  action: getActionItem((0, _get2.default)(bills[_i], "status")),
                  tenantId: (0, _get2.default)(bills[_i], "tenantId")
                });
              }
            }
            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.billSearchResponse", bills));
            uiConfigs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.common-masters.uiCommonPay");
            configObject = uiConfigs.filter(function (item) {
              return item.code === searchScreenObject.businesService;
            });


            try {
              data = billTableData.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_BILL_NO', item.billNumber || "-"), (0, _defineProperty3.default)(_ref2, "PAYMENT_COMMON_CONSUMER_CODE", item.consumerCode || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_CONSUMER_NAME', item.consumerName || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_BILL_EXP_DATE', (0, _index.convertEpochToDate)(item.billDate) || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_BILL_AMOUNT', item.billAmount || item.billAmount === 0 ? item.billAmount : "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, 'ABG_COMMON_TABLE_COL_ACTION', item.action || "-"), (0, _defineProperty3.default)(_ref2, "BUSINESS_SERVICE", searchScreenObject.businesService), (0, _defineProperty3.default)(_ref2, "RECEIPT_KEY", (0, _get2.default)(configObject[0], "receiptKey", "consolidatedreceipt") || "consolidatedreceipt"), (0, _defineProperty3.default)(_ref2, "BILL_KEY", (0, _get2.default)(configObject[0], "billKey", "consolidatedbill") || "consolidatedbill"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref2, "BILL_ID", item.billId), (0, _defineProperty3.default)(_ref2, "BILL_SEARCH_URL", searchScreenObject.url), (0, _defineProperty3.default)(_ref2, "ADVANCE_PAYMENT", isAdvancePayment), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "props.tableData", billTableData));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.searchResults", "props.rows", billTableData.length));

              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
            }

          case 49:
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
      return "ABG_CANCEL_BILL";
  }
};