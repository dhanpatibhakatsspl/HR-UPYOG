"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorkFlowDataForBPA = exports.getWorkFlowData = exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../..//ui-utils/commons");

var _utils = require("../../utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertMillisecondsToDays = function convertMillisecondsToDays(milliseconds) {
  return Math.round(milliseconds / (1000 * 60 * 60 * 24));
};
var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, response, businessIdToOwnerMapping, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryObject = [{
              key: "tenantId",
              value: (0, _localStorageUtils.getTenantId)().lastIndexOf(".") > 0 ? (0, _localStorageUtils.getTenantId)().substr(0, (0, _localStorageUtils.getTenantId)().lastIndexOf(".")) : (0, _localStorageUtils.getTenantId)()
            }, { key: "offset", value: "0" }, { key: "limit", value: "100" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.tradeLicenseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "ERR_FILL_VALID_FIELDS"
            }, "warning"));
            _context.next = 25;
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
              labelKey: "ERR_FILL_ONE_FIELDS"
            }, "warning"));
            _context.next = 25;
            break;

          case 13:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            _context.next = 25;
            break;

          case 17:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "daystart")
                  });
                } else if (key === "toDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "dayend")
                  });
                } else {
                  queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                }
              }
            }
            _context.next = 20;
            return (0, _commons.getSearchResults)(queryObject);

          case 20:
            response = _context.sent;
            _context.next = 23;
            return getWorkFlowData(response.Licenses);

          case 23:
            businessIdToOwnerMapping = _context.sent;

            try {
              response.Licenses.sort(function (item1, item2) {
                return item1.applicationDate > item2.applicationDate ? -1 : 1;
              });
              data = response.Licenses.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_APP_NO", item.applicationNumber || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL", item.tradeLicenseDetail.owners[0].name || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_LICENSEE_TYPE", (0, _index.getTextToLocalMapping)("TRADELICENSE_TRADETYPE_" + item.tradeLicenseDetail.tradeUnits[0].tradeType.split('.')[0].toUpperCase()) || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_STATUS_LABEL", item.status || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_ASSIGN_TO", (0, _get2.default)(businessIdToOwnerMapping[item.applicationNumber], "assignee") || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_APP_DATE_LABEL", (0, _index.convertEpochToDate)(item.applicationDate) || "-"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), _ref2;
              });


              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", response.Licenses.length));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var getWorkFlowData = exports.getWorkFlowData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(Licenses) {
    var businessIds, queryObject, payload, businessIdToOwnerMapping;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            businessIds = [];

            Licenses.forEach(function (item) {
              businessIds.push(item.applicationNumber);
            });
            queryObject = [{
              key: "tenantId",
              value: (0, _localStorageUtils.getTenantId)().lastIndexOf(".") > 0 ? (0, _localStorageUtils.getTenantId)().substr(0, (0, _localStorageUtils.getTenantId)().lastIndexOf(".")) : (0, _localStorageUtils.getTenantId)()
            }, {
              key: "businessIds",
              value: businessIds
            }];
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

          case 6:
            payload = _context2.sent;
            businessIdToOwnerMapping = {};

            payload.ProcessInstances.filter(function (record) {
              return record.moduleName === "BPAREG";
            }).forEach(function (item) {
              businessIdToOwnerMapping[item.businessId] = {
                assignee: (0, _get2.default)(item, "assignes[0].name"),
                sla: item.businesssServiceSla && convertMillisecondsToDays(item.businesssServiceSla)
              };
            });
            return _context2.abrupt("return", businessIdToOwnerMapping);

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", []);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 12]]);
  }));

  return function getWorkFlowData(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getWorkFlowDataForBPA = exports.getWorkFlowDataForBPA = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(Licenses) {
    var businessIds, tenantMap, processInstanceArray, appNumbers, key, i, queryObject, payload, businessIdToOwnerMapping;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            businessIds = [];
            tenantMap = {};
            processInstanceArray = [];
            appNumbers = [];

            Licenses.forEach(function (item) {
              var appNums = tenantMap[item.tenantId] || [];
              appNumbers = appNums;
              appNums.push(item.applicationNo);
              tenantMap[item.tenantId] = appNums;
            });

            _context3.t0 = _regenerator2.default.keys(tenantMap);

          case 6:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 29;
              break;
            }

            key = _context3.t1.value;
            i = 0;

          case 9:
            if (!(i < appNumbers.length / 100)) {
              _context3.next = 24;
              break;
            }

            queryObject = [{
              key: "tenantId",
              value: key
            }, {
              key: "businessIds",
              value: tenantMap[key].slice(i * 100, i * 100 + 100)
            }];
            _context3.prev = 11;
            _context3.next = 14;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

          case 14:
            payload = _context3.sent;

            processInstanceArray = processInstanceArray.concat(payload.ProcessInstances);

            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t2 = _context3["catch"](11);
            return _context3.abrupt("return", []);

          case 21:
            i++;
            _context3.next = 9;
            break;

          case 24:
            businessIdToOwnerMapping = {};

            processInstanceArray.filter(function (record) {
              return record.moduleName.includes("bpa-services");
            }).forEach(function (item) {
              businessIdToOwnerMapping[item.businessId] = {
                assignee: (0, _get2.default)(item, "assignes[0].name"),
                sla: item.businesssServiceSla && convertMillisecondsToDays(item.businesssServiceSla),
                state: item.state.state
              };
            });
            return _context3.abrupt("return", businessIdToOwnerMapping);

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[11, 18]]);
  }));

  return function getWorkFlowDataForBPA(_x4) {
    return _ref4.apply(this, arguments);
  };
}();