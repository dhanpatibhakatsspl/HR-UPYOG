"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = exports.getWorkflowDataForNocs = exports.getNOCSearchResults = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _index = require("../../utils/index");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _api = require("../../../../../ui-utils/api");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNOCSearchResults = exports.getNOCSearchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/noc-services/v1/noc/_search?offset=0&limit=-1", "", queryObject);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelCode: _context.t0.message }, "error"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getNOCSearchResults(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getWorkflowDataForNocs = exports.getWorkflowDataForNocs = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(nocs) {
    var businessIds, tenantMap, processInstanceArray, appNumbers, key, i, queryObject, payload, businessIdToOwnerMapping;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            businessIds = [];
            tenantMap = {};
            processInstanceArray = [];
            appNumbers = [];

            nocs.forEach(function (item) {
              var appNums = tenantMap[item.tenantId] || [];
              appNumbers = appNums;
              appNums.push(item.applicationNo);
              tenantMap[item.tenantId] = appNums;
            });

            _context2.t0 = _regenerator2.default.keys(tenantMap);

          case 6:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 29;
              break;
            }

            key = _context2.t1.value;
            i = 0;

          case 9:
            if (!(i < appNumbers.length / 100)) {
              _context2.next = 24;
              break;
            }

            queryObject = [{
              key: "tenantId",
              value: key
            }, {
              key: "businessIds",
              value: tenantMap[key].slice(i * 100, i * 100 + 100)
            }];
            _context2.prev = 11;
            _context2.next = 14;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

          case 14:
            payload = _context2.sent;

            processInstanceArray = processInstanceArray.concat(payload.ProcessInstances);

            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t2 = _context2["catch"](11);
            return _context2.abrupt("return", []);

          case 21:
            i++;
            _context2.next = 9;
            break;

          case 24:
            businessIdToOwnerMapping = {};

            processInstanceArray.filter(function (record) {
              return record.moduleName.includes("noc-services");
            }).forEach(function (item) {
              businessIdToOwnerMapping[item.businessId] = {
                assignee: (0, _get2.default)(item, "assignes[0].name"),
                sla: item.businesssServiceSla && convertMillisecondsToDays(item.businesssServiceSla),
                state: item.state.state
              };
            });
            return _context2.abrupt("return", businessIdToOwnerMapping);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[11, 18]]);
  }));

  return function getWorkflowDataForNocs(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var convertMillisecondsToDays = function convertMillisecondsToDays(milliseconds) {
  return Math.round(milliseconds / (1000 * 60 * 60 * 24));
};

var searchApiCall = exports.searchApiCall = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var tenantId, nocType, queryObject, searchScreenObject, key, response, businessIdToOwnerMappingForNOC, data;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            showHideTable(false, dispatch);
            tenantId = (0, _localStorageUtils.getTenantId)();
            nocType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "nocType", "");
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "nocType",
              value: nocType
            }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});

            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context3.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "BPA_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context3.next = 25;
            break;

          case 9:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
            }
            _context3.prev = 10;
            _context3.next = 13;
            return getNOCSearchResults(queryObject);

          case 13:
            response = _context3.sent;
            _context3.next = 16;
            return getWorkflowDataForNocs(response.Noc);

          case 16:
            businessIdToOwnerMappingForNOC = _context3.sent;
            data = response.Noc.map(function (item) {
              var _ref4;

              return _ref4 = {}, (0, _defineProperty3.default)(_ref4, "BPA_COMMON_TABLE_COL_APP_NO", item.applicationNo || "-"), (0, _defineProperty3.default)(_ref4, "SOURCE_MODULE_NUMBER", item.sourceRefId || "-"), (0, _defineProperty3.default)(_ref4, "BPA_NOC_MODULE_SOURCE_LABEL", (0, _utils.getTextToLocalMapping)("CS_COMMON_INBOX_" + item.source) || "-"), (0, _defineProperty3.default)(_ref4, "WF_INBOX_HEADER_CURRENT_OWNER", (0, _get2.default)(businessIdToOwnerMappingForNOC[item.applicationNo], "assignee", null) || "NA"), (0, _defineProperty3.default)(_ref4, "BPA_COMMON_TABLE_COL_STATUS_LABEL", item.applicationStatus || "-"), _ref4;
            });


            dispatch((0, _actions.handleScreenConfigurationFieldChange)("noc-search", "components.div.children.searchResults", "props.data", data));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("noc-search", "components.div.children.searchResults", "props.rows", response.Noc.length));
            showHideTable(true, dispatch);
            _context3.next = 25;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](10);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[10, 23]]);
  }));

  return function searchApiCall(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("noc-search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};