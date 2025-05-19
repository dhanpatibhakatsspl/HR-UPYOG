"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = exports.getWfBusinessData = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

var _functions = require("../bpastakeholder/searchResource/functions");

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "My Applications",
  labelKey: "BPA_MY_APPLICATIONS"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var getWfBusinessData = exports.getWfBusinessData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, businessService) {
    var tenantId, BSqueryObject, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = getTenantId();
            BSqueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: businessService }];
            _context.next = 4;
            return httpRequest("post", "egov-workflow-v2/egov-wf/businessservice/_search", "_search", BSqueryObject);

          case 4:
            payload = _context.sent;

            if (payload && payload.BusinessServices && payload.BusinessServices.length > 0) {
              dispatch(prepareFinalObject(businessService, (0, _get2.default)(payload, "BusinessServices[0]")));
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getWfBusinessData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getAllBusinessServicesDataForStatus = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var businessServices;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            businessServices = ["BPA", "BPA_OC", "ARCHITECT"];

            businessServices.forEach(function (service) {
              getWfBusinessData(action, state, dispatch, service);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllBusinessServicesDataForStatus(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications-stakeholder",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        stakeholderMyappsConatiner: (0, _utils.getCommonContainer)({
          myApplicationsCard: {
            uiFramework: "custom-molecules",
            name: "my-applications-stakeholder",
            componentPath: "Table",
            props: {
              columns: [{
                name: "Application No", labelKey: "BPA_COMMON_TABLE_COL_APP_NO"
              }, {
                name: "Application Type", labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
              }, {
                name: "Service type", labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
              }, {
                name: "Assigned To", labelKey: "BPA_COL_ASSIGNEDTO"
              }, {
                name: "SLA(Days Remaining)", labelKey: "BPA_COMMON_SLA"
              }, {
                name: "Status", labelKey: "BPA_COMMON_TABLE_COL_STATUS_LABEL"
              }, {
                name: "tenantId",
                labelKey: "tenantId",
                options: {
                  display: false
                }
              }, {
                name: "serviceType",
                labelKey: "serviceType",
                options: {
                  display: false
                }
              }, {
                name: "type",
                labelKey: "type",
                options: {
                  display: false
                }
              }, {
                name: "appStatus", labelKey: "BPA_COMMON_TABLE_COL_APP_STATUS_LABEL",
                options: {
                  display: false
                }
              }],
              title: {
                labelName: "Search Results for BPA Applications",
                labelKey: "BPA_SEARCH_RESULTS_FOR_APP"
              },
              rows: "",
              options: {
                filter: false,
                download: false,
                responsive: "stacked",
                selectableRows: false,
                hover: true,
                viewColumns: false,
                onRowClick: function onRowClick(row, index) {
                  _onRowClick(row);
                },
                serverSide: false
              },
              customSortColumn: {
                column: "Application Date",
                sortingFn: function sortingFn(data, i, sortDateOrder) {
                  var epochDates = data.reduce(function (acc, curr) {
                    acc.push([].concat((0, _toConsumableArray3.default)(curr), [(0, _utils2.getEpochForDate)(curr[4], "dayend")]));
                    return acc;
                  }, []);
                  var order = sortDateOrder === "asc" ? true : false;
                  var finalData = (0, _utils2.sortByEpoch)(epochDates, !order).map(function (item) {
                    item.pop();
                    return item;
                  });
                  return { data: finalData, currentOrder: !order ? "asc" : "desc" };
                }
              }
            }
          }
        })
      }
    }
  }
};

var fetchData = exports.fetchData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    var searchConvertedArray, sortConvertedArray, bpaResponse, response, businessIdToOwnerMappingForBPA, businessIdToOwnerMapping;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            searchConvertedArray = [];
            sortConvertedArray = [];
            _context3.next = 4;
            return (0, _commons2.getBpaSearchResults)();

          case 4:
            bpaResponse = _context3.sent;
            _context3.next = 7;
            return (0, _commons2.getSearchResults)();

          case 7:
            response = _context3.sent;

            if (!(bpaResponse && bpaResponse.BPA && bpaResponse.BPA.length > 0)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 11;
            return (0, _functions.getWorkFlowDataForBPA)(bpaResponse.BPA);

          case 11:
            businessIdToOwnerMappingForBPA = _context3.sent;

            bpaResponse.BPA.forEach(function (element) {
              var _searchConvertedArray;

              var status = (0, _utils2.getTextToLocalMapping)("WF_BPA_" + (0, _get2.default)(businessIdToOwnerMappingForBPA[element.applicationNo], "state", null));
              var service = (0, _utils2.getTextToLocalMapping)("BPA_APPLICATIONTYPE_" + (0, _get2.default)(element, "applicationType"));
              service += " - " + (0, _utils2.getTextToLocalMapping)("BPA_SERVICETYPE_" + (0, _get2.default)(element, "serviceType"));
              var modifiedTime = element.auditDetails.lastModifiedTime;
              var primaryowner = "-";
              var businessService = (0, _get2.default)(element, "businessService", null);
              var type = void 0;
              if (businessService == "BPA_LOW") {
                type = "LOW";
              } else if (businessService == "BPA" || businessService == "BPA_OC") {
                type = "HIGH";
              }
              var owners = (0, _get2.default)(element, "owners", []);
              owners.map(function (item) {
                if (item.isPrimaryOwner) {
                  primaryowner = item.name;
                }
              });
              var bService = (0, _get2.default)(element, "businessService");
              var appType = (0, _utils2.getBpaTextToLocalMapping)("WF_BPA_BUILDING_PLAN_SCRUTINY");
              var serType = (0, _utils2.getBpaTextToLocalMapping)("WF_BPA_NEW_CONSTRUCTION");
              if (bService === "BPA_OC") {
                appType = (0, _utils2.getBpaTextToLocalMapping)("WF_BPA_BUILDING_OC_PLAN_SCRUTINY");
              }
              searchConvertedArray.push((_searchConvertedArray = {}, (0, _defineProperty3.default)(_searchConvertedArray, "BPA_COMMON_TABLE_COL_APP_NO", element.applicationNo || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "BPA_COMMON_TABLE_COL_STATUS_LABEL", status || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL", appType), (0, _defineProperty3.default)(_searchConvertedArray, "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL", serType), (0, _defineProperty3.default)(_searchConvertedArray, "BPA_COMMON_SLA", (0, _get2.default)(businessIdToOwnerMappingForBPA[element.applicationNo], "sla", null) || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "BPA_COL_ASSIGNEDTO", (0, _get2.default)(businessIdToOwnerMappingForBPA[element.applicationNo], "assignee", null) || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "BPA_COMMON_TABLE_COL_APP_STATUS_LABEL", element.status), (0, _defineProperty3.default)(_searchConvertedArray, "applicationType", (0, _utils2.getBpaTextToLocalMapping)("BPA_APPLY_SERVICE")), (0, _defineProperty3.default)(_searchConvertedArray, "modifiedTime", modifiedTime), (0, _defineProperty3.default)(_searchConvertedArray, "sortNumber", 1), (0, _defineProperty3.default)(_searchConvertedArray, "serviceType", businessService), (0, _defineProperty3.default)(_searchConvertedArray, "tenantId", (0, _get2.default)(element, "tenantId", null)), (0, _defineProperty3.default)(_searchConvertedArray, "type", type), _searchConvertedArray));
            });

          case 13:
            if (!(response && response.Licenses && response.Licenses.length > 0)) {
              _context3.next = 18;
              break;
            }

            _context3.next = 16;
            return (0, _functions.getWorkFlowData)(response.Licenses);

          case 16:
            businessIdToOwnerMapping = _context3.sent;

            response.Licenses.forEach(function (element) {
              var _searchConvertedArray2;

              var service = (0, _utils2.getTextToLocalMapping)("MODULE_" + (0, _get2.default)(element, "businessService"));
              var status = (0, _utils2.getTextToLocalMapping)("WF_ARCHITECT_" + (0, _get2.default)(element, "status"));
              var modifiedTime = element.auditDetails.lastModifiedTime;
              var licensetypeFull = element.tradeLicenseDetail.tradeUnits[0].tradeType;
              if (licensetypeFull.split(".").length > 1) {
                service += " - " + (0, _utils2.getTextToLocalMapping)("TRADELICENSE_TRADETYPE_" + (0, _commons.getTransformedLocale)(licensetypeFull.split(".")[0]));
              }
              searchConvertedArray.push((_searchConvertedArray2 = {}, (0, _defineProperty3.default)(_searchConvertedArray2, "BPA_COMMON_TABLE_COL_APP_NO", element.applicationNumber || "-"), (0, _defineProperty3.default)(_searchConvertedArray2, "BPA_COMMON_TABLE_COL_STATUS_LABEL", status || "-"), (0, _defineProperty3.default)(_searchConvertedArray2, "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL", (0, _utils2.getBpaTextToLocalMapping)("BPAREG_SERVICE")), (0, _defineProperty3.default)(_searchConvertedArray2, "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL", service), (0, _defineProperty3.default)(_searchConvertedArray2, "BPA_COMMON_SLA", (0, _get2.default)(businessIdToOwnerMapping[element.applicationNumber], "sla", null) || "-"), (0, _defineProperty3.default)(_searchConvertedArray2, "BPA_COL_ASSIGNEDTO", (0, _get2.default)(businessIdToOwnerMapping[element.applicationNumber], "assignee", null) || "-"), (0, _defineProperty3.default)(_searchConvertedArray2, "applicationType", (0, _utils2.getBpaTextToLocalMapping)("BPAREG_SERVICE")), (0, _defineProperty3.default)(_searchConvertedArray2, "modifiedTime", modifiedTime), (0, _defineProperty3.default)(_searchConvertedArray2, "sortNumber", 0), (0, _defineProperty3.default)(_searchConvertedArray2, "serviceType", "BPAREG"), (0, _defineProperty3.default)(_searchConvertedArray2, "tenantId", (0, _get2.default)(element, "tenantId", null)), _searchConvertedArray2));
            });

          case 18:

            sortConvertedArray = [].slice.call(searchConvertedArray).sort(function (a, b) {
              return new Date(b.modifiedTime) - new Date(a.modifiedTime) || a.sortNumber - b.sortNumber;
            });
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications-stakeholder", "components.div.children.stakeholderMyappsConatiner.children.myApplicationsCard", "props.data", sortConvertedArray));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications-stakeholder", "components.div.children.stakeholderMyappsConatiner.children.myApplicationsCard", "props.rows", sortConvertedArray.length));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function fetchData(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var _onRowClick = function _onRowClick(rowData) {
  var environment = process.env.NODE_ENV === "production" ? "citizen" : "";
  var origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;
  if (rowData[7] === "BPAREG") {
    switch (rowData[4]) {
      case "INITIATED":
        window.location.assign("" + origin + environment + "/bpastakeholder/apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
        break;
      default:
        window.location.assign("" + origin + environment + "/bpastakeholder/search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
    }
  } else if (rowData[7] === "BPA" || rowData[7] == "BPA_LOW") {
    switch (rowData[9]) {
      case "INITIATED":
        window.location.assign("" + origin + environment + "/egov-bpa/apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
        break;
      default:
        window.location.assign("" + origin + environment + "/egov-bpa/search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6] + "&type=" + rowData[8]);
    }
  } else {
    switch (rowData[9]) {
      case "INITIATED":
        window.location.assign("" + origin + environment + "/oc-bpa/apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
        break;
      default:
        window.location.assign("" + origin + environment + "/oc-bpa/search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
    }
  }
};

exports.default = screenConfig;