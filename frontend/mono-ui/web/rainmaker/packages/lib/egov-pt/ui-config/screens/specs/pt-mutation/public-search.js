"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _uiUtils = require("../../../../ui-utils");

require("./index.css");

var _searchResources = require("./publicSearchResource/search-resources");

var _searchTable = require("./publicSearchResource/search-table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
var tenant = (0, _localStorageUtils.getTenantId)();

var getMDMSData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  "moduleName": "PropertyTax",
                  "masterDetails": [{
                    "name": "UpdateNumber"
                  }]
                }, {
                  "moduleName": "tenant",
                  "masterDetails": [{
                    "name": "tenants"
                  }, { "name": "citymodule" }]
                }]
              }
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context.sent;

            payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
            // console.log("payload--", payload)
            payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.tenants.sort(function (t1, t2) {
              return t1.code.localeCompare(t2.code);
            });
            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            _context.next = 10;
            return (0, _commons2.getBusinessServiceMdmsData)(dispatch, _common2.default.tenantId, "PT");

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 12]]);
  }));

  return function getMDMSData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "public-search",

  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    //   resetFields(state, dispatch);
    (0, _localStorageUtils.setModule)((0, _commons2.getModuleName)());
    var tenantId = (0, _localStorageUtils.getTenantId)();
    // dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    getMDMSData(dispatch);

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "public-domain-search",
        id: "search"
      },
      children: {
        // header: {
        //   uiFramework: "custom-containers-local",
        //   componentPath: "HeaderContainer",
        //   moduleName: "egov-pt",
        //   props: {
        //     msevaLogo: msevaLogo
        //   }
        // },
        linkComponent: {
          uiFramework: "custom-atoms-local",
          componentPath: "LinkComponent",
          moduleName: "egov-pt"
        },
        searchPropertyDetails: _searchResources.searchPropertyDetails,
        breakAfterSearch3: (0, _utils.getBreak)(),
        searchPropertyTable: _searchTable.searchPropertyTable,
        breakAfterSearch4: (0, _utils.getBreak)()
      }
    }
  }
};

exports.default = screenConfig;