"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = exports.getMdmsData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

var _functions = require("../../bpastakeholder/searchResource/functions");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMdmsData = exports.getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{ name: "citymodule" }]
                }, {
                  moduleName: "BPA",
                  masterDetails: [{ name: "ServiceType" }]
                }]
              }
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context.sent;
            return _context.abrupt("return", payload);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function getMdmsData() {
    return _ref.apply(this, arguments);
  };
}();
var fetchData = exports.fetchData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var fromMyApplicationPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var fromStakeHolderPage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var userInfo, mobileNumber, queryObj, response, bpaResponse, mdmsRes, tenants, myApplicationsCount, searchConvertedArray, sortConvertedArray, businessIdToOwnerMapping, businessIdToOwnerMappingForBPA;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            mobileNumber = (0, _get2.default)(userInfo, "mobileNumber");
            queryObj = [{
              key: "requestor",
              value: mobileNumber
            }];
            _context2.next = 5;
            return (0, _commons2.getSearchResults)();

          case 5:
            response = _context2.sent;
            _context2.next = 8;
            return (0, _commons2.getBpaSearchResults)(queryObj);

          case 8:
            bpaResponse = _context2.sent;
            _context2.next = 11;
            return getMdmsData(dispatch);

          case 11:
            mdmsRes = _context2.sent;
            tenants = mdmsRes && mdmsRes.MdmsRes && mdmsRes.MdmsRes.tenant.citymodule.find(function (item) {
              if (item.code === "BPAAPPLY") return true;
            });

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", mdmsRes.MdmsRes));
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.common-masters.citiesByModule.TL", tenants));
            _context2.prev = 15;

            if (!window.location.href.includes("bpastakeholder-citizen/home")) {
              _context2.next = 23;
              break;
            }

            myApplicationsCount = 0;

            if (response && response.Licenses) {
              myApplicationsCount += response.Licenses.length;
            }
            if (bpaResponse && bpaResponse.BPA) {
              myApplicationsCount += bpaResponse.BPA.length;
            }
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications", "components.div.children.header.children.key", "props.dynamicArray", myApplicationsCount ? [myApplicationsCount] : [0]));
            _context2.next = 38;
            break;

          case 23:
            searchConvertedArray = [];
            sortConvertedArray = [];

            if (!(response && response.Licenses && response.Licenses.length > 0)) {
              _context2.next = 30;
              break;
            }

            _context2.next = 28;
            return (0, _functions.getWorkFlowData)(response.Licenses);

          case 28:
            businessIdToOwnerMapping = _context2.sent;


            response.Licenses.forEach(function (element) {
              var service = (0, _index.getTextToLocalMapping)("MODULE_" + (0, _get2.default)(element, "businessService"));
              var status = (0, _index.getTextToLocalMapping)("WF_ARCHITECT_" + (0, _get2.default)(element, "status"));
              var modifiedTime = element.auditDetails.lastModifiedTime;
              var licensetypeFull = element.tradeLicenseDetail.tradeUnits[0].tradeType;
              if (licensetypeFull.split(".").length > 1) {
                service += " - " + (0, _index.getTextToLocalMapping)("TRADELICENSE_TRADETYPE_" + (0, _commons.getTransformedLocale)(licensetypeFull.split(".")[0]));
              }
              if (!fromStakeHolderPage) {
                searchConvertedArray.push({
                  applicationNumber: (0, _get2.default)(element, "applicationNumber", null),
                  ownername: (0, _get2.default)(element, "tradeLicenseDetail.owners[0].name", null),
                  businessService: service,
                  serviceType: "BPAREG",
                  assignedTo: (0, _get2.default)(businessIdToOwnerMapping[element.applicationNumber], "assignee", null),
                  status: status,
                  sla: (0, _get2.default)(businessIdToOwnerMapping[element.applicationNumber], "sla", null),
                  tenantId: (0, _get2.default)(element, "tenantId", null),
                  modifiedTime: modifiedTime,
                  sortNumber: 0
                });
              }
            });

          case 30:
            if (!(bpaResponse && bpaResponse.BPA && bpaResponse.BPA.length > 0)) {
              _context2.next = 35;
              break;
            }

            _context2.next = 33;
            return (0, _functions.getWorkFlowDataForBPA)(bpaResponse.BPA);

          case 33:
            businessIdToOwnerMappingForBPA = _context2.sent;

            bpaResponse.BPA.forEach(function (element) {
              var status = (0, _index.getTextToLocalMapping)("WF_BPA_" + (0, _get2.default)(businessIdToOwnerMappingForBPA[element.applicationNo], "state", null));
              var applicationStatus = (0, _get2.default)(element, "status");
              var bService = (0, _get2.default)(element, "businessService");
              var appType = "BUILDING_PLAN_SCRUTINY";
              var serType = "NEW_CONSTRUCTION";
              var type = void 0;
              if (bService === "BPA_OC") {
                appType = "BUILDING_OC_PLAN_SCRUTINY";
              }
              if (bService === "BPA_LOW") {
                type = "LOW";
              } else {
                type = "HIGH";
              }
              var service = (0, _index.getTextToLocalMapping)("BPA_APPLICATIONTYPE_" + appType);
              service += " - " + (0, _index.getTextToLocalMapping)("BPA_SERVICETYPE_" + serType);
              var modifiedTime = element.auditDetails.lastModifiedTime;
              var primaryowner = "-";
              var owners = (0, _get2.default)(element, "landInfo.owners", []);
              owners.map(function (item) {
                if (item.isPrimaryOwner) {
                  primaryowner = item.name;
                }
              });
              if (!fromStakeHolderPage) {
                searchConvertedArray.push({
                  applicationNumber: (0, _get2.default)(element, "applicationNo", null),
                  ownername: primaryowner,
                  businessService: service,
                  assignedTo: (0, _get2.default)(businessIdToOwnerMappingForBPA[element.applicationNo], "assignee", null),
                  status: status,
                  sla: (0, _get2.default)(businessIdToOwnerMappingForBPA[element.applicationNo], "sla", null),
                  tenantId: (0, _get2.default)(element, "tenantId", null),
                  modifiedTime: modifiedTime,
                  sortNumber: 1,
                  type: type,
                  serviceType: (0, _get2.default)(element, "businessService", null),
                  appStatus: applicationStatus
                });
              }
            });

          case 35:

            sortConvertedArray = [].slice.call(searchConvertedArray).sort(function (a, b) {
              return new Date(b.modifiedTime) - new Date(a.modifiedTime) || a.sortNumber - b.sortNumber;
            });

            dispatch((0, _actions.prepareFinalObject)("searchResults", sortConvertedArray));
            storeData(sortConvertedArray, dispatch, fromMyApplicationPage, fromStakeHolderPage);

          case 38:
            _context2.next = 42;
            break;

          case 40:
            _context2.prev = 40;
            _context2.t0 = _context2["catch"](15);

          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[15, 40]]);
  }));

  return function fetchData(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var storeData = function storeData(data, dispatch, fromMyApplicationPage, fromStakeHolderPage) {
  dispatch((0, _actions.prepareFinalObject)("myApplicationsCount", data.length));
  var myApplicationsCount = data.length;

  if (fromStakeHolderPage) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications-stakeholder", "components.div.children.applicationsCard", "props.data", data));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications-stakeholder", "components.div.children.header.children.key", "props.dynamicArray", myApplicationsCount ? [myApplicationsCount] : [0]));
  } else if (fromMyApplicationPage) {

    dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications", "components.div.children.header.children.key", "props.dynamicArray", myApplicationsCount ? [myApplicationsCount] : [0]));
  }
};