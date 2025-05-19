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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _index = require("../../utils/index");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _receiptTransformer = require("../../utils/receiptTransformer");

var _utils = require("../../utils");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const tenantId = getTenantId();
var tenantId = (0, _localStorageUtils.getTenantId)();
var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, serviceObject, responseFromAPI, businessUrl, bills, uiConfigs, configObject, response, i, data, copyOfSearchScreenObject;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            showHideMergeButton(false, dispatch);
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchCriteria", {});
            isSearchBoxFirstRowValid = (0, _index.validateFields)("components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "groupBills");
            isSearchBoxSecondRowValid = (0, _index.validateFields)("components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "groupBills");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "ABG_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 29;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "ABG_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 29;
            break;

          case 13:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] === "") {
                delete searchScreenObject[key];
              }
            }
            serviceObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.BillingService.BusinessService").filter(function (item) {
              return item.code === searchScreenObject.businesService;
            });


            searchScreenObject.url = serviceObject && serviceObject[0] && serviceObject[0].billGineiURL;
            searchScreenObject.tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;
            searchScreenObject.billActive = "ACTIVE";
            _context.next = 20;
            return (0, _commons.getGroupBillSearch)(dispatch, searchScreenObject);

          case 20:
            responseFromAPI = _context.sent;
            businessUrl = (0, _cloneDeep2.default)(searchScreenObject.url);
            bills = responseFromAPI && responseFromAPI.Bills || [];

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.billSearchResponse", bills));

            uiConfigs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.common-masters.uiCommonPay");
            configObject = uiConfigs.filter(function (item) {
              return item.code === searchScreenObject.businesService;
            });
            response = [];

            for (i = 0; i < bills.length; i++) {
              if ((0, _get2.default)(bills[i], "status") === "ACTIVE") {
                response.push({
                  consumerId: (0, _get2.default)(bills[i], "consumerCode"),
                  billNo: (0, _get2.default)(bills[i], "billNumber"),
                  ownerName: (0, _get2.default)(bills[i], "payerName"),
                  billDate: (0, _get2.default)(bills[i], "billDate"),
                  status: (0, _get2.default)(bills[i], "status"),
                  tenantId: tenantId
                });
              }
            }
            try {
              data = response.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_BILL_NO", item.billNo || "-"), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_CONSUMER_ID", item.consumerId || "-"), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_OWN_NAME", item.ownerName || "-"), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_BILL_DATE", (0, _index.convertEpochToDate)(item.billDate) || "-"), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_STATUS", item.status && (0, _index.getTextToLocalMapping)(item.status.toUpperCase()) || "-"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref2, "BUSINESS_URL", businessUrl), (0, _defineProperty3.default)(_ref2, "BILL_KEY", (0, _get2.default)(configObject[0], "billKey", "consolidatedbill") || "consolidatedbill"), (0, _defineProperty3.default)(_ref2, "BUSINESS_SERVICE", searchScreenObject.businesService), _ref2;
              });
              copyOfSearchScreenObject = (0, _cloneDeep2.default)(searchScreenObject);

              dispatch((0, _actions.prepareFinalObject)("searchDetailsOfGroupBills", copyOfSearchScreenObject));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.searchResults", "props.rows", data.length));
              (0, _utils.getMergeAndDownloadList)(state, dispatch, data.length);
              showHideTable(true, dispatch);
              if (!(0, _isEmpty2.default)(response)) {
                showHideMergeButton(true, dispatch);
                (0, _receiptTransformer.loadUlbLogo)(tenantId);
              };
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
            }

          case 29:
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var showHideMergeButton = function showHideMergeButton(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.mergeDownloadButton.children.mergeButton", "visible", booleanHideOrShow));
};