"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMDMSData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _uiUtils = require("../../../../ui-utils");

var _billSearchCard = require("./billSearchResources/billSearchCard");

var _searchResults = require("./billSearchResources/searchResults");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Bill Cancellation",
  labelKey: "ABG_BILL_CANCELLATION_HEADER"
});
var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var getMDMSData = exports.getMDMSData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, mdmsBody, payload, filteredData, serviceListData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "BillingService",
                  masterDetails: [{
                    name: "BusinessService"
                  }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "uiCommonPay"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            payload.MdmsRes.BillingService.BusinessService = payload.MdmsRes.BillingService.BusinessService.filter(function (service) {
              return service.billGineiURL;
            });
            filteredData = payload.MdmsRes["common-masters"].uiCommonPay.filter(function (data) {
              if (data.cancelBill) return data;
            });
            serviceListData = [];

            filteredData && filteredData.length > 0 && filteredData.forEach(function (data) {
              payload.MdmsRes.BillingService.BusinessService.forEach(function (service) {
                if (service.code === data.code) {
                  serviceListData.push(service);
                }
              });
            });
            payload.MdmsRes.BillingService.BusinessService = serviceListData;
            payload.MdmsRes["common-masters"].uiCommonPay;
            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            return _context.abrupt("return", payload.MdmsRes);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 16]]);
  }));

  return function getMDMSData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getMDMSData(action, state, dispatch);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getData(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var billSearchAndResult = {
  uiFramework: "material-ui",
  name: "billSearch",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    getData(action, state, dispatch);
    var tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;
    if (tenantId) {
      dispatch((0, _actions.prepareFinalObject)("searchScreen", { tenantId: tenantId }));
      var ulbComponentJsonPath = "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.ulb";
      var disableUlb = process.env.REACT_APP_NAME === "Citizen" ? false : true;
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", ulbComponentJsonPath, "props.value", tenantId));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", ulbComponentJsonPath, "props.disabled", disableUlb));
    }

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "billSearch"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header)
          }
        },
        billSearchCard: _billSearchCard.billSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = billSearchAndResult;