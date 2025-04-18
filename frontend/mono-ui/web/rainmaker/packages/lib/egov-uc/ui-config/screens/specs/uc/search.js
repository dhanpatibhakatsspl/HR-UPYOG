"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uiUtils = require("../../../../ui-utils");

var _utils2 = require("../utils");

require("./index.css");

var _searchResults = require("./universalCollectionResources/searchResults");

var _ucSearch = require("./universalCollectionResources/ucSearch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _localStorageUtils.getTenantId)();
var header = (0, _utils.getCommonHeader)({
  labelName: "Receipt",
  labelKey: "UC_RECEIPT"
});

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var getData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getMDMSData(action, state, dispatch);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getMDMSData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "BillingService",
                  masterDetails: [{ name: "BusinessService", filter: "[?(@.type=='Adhoc')]" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "uiCommonPay"
                  }]
                }]
              }
            };
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.serviceCategories", (0, _get2.default)(payload, "MdmsRes.BillingService.BusinessService", [])));
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.uiCommonConfig", (0, _get2.default)(payload.MdmsRes, "common-masters.uiCommonPay")));
            (0, _utils2.setServiceCategory)((0, _get2.default)(payload, "MdmsRes.BillingService.BusinessService", []), dispatch, null, false);

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);

            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 10]]);
  }));

  return function getMDMSData(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var ucSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("ucSearchScreen", {}));
    getData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "universalCollection"
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
        UCSearchCard: _ucSearch.UCSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = ucSearchAndResult;