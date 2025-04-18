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

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _uiUtils = require("../../../../ui-utils");

require("./index.css");

var _mutationMethods = require("./mutation-methods");

var _searchResults = require("./searchResource/searchResults");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
// import { showHideAdhocPopup } from "../utils";

var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
var tenant = (0, _localStorageUtils.getTenantId)();

var getMDMSData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var mdmsBody, payload, ptWorkflowDetails;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }, { name: "citymodule" }]
                }, {
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "PTWorkflow" }]
                }]
              }
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context.sent;

            dispatch((0, _actions2.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.tenant", payload.MdmsRes.tenant));
            if (process.env.REACT_APP_NAME != "Citizen") {
              dispatch((0, _actions2.prepareFinalObject)("searchScreen.tenantId", tenant));
            }

            ptWorkflowDetails = (0, _get2.default)(payload, "MdmsRes.PropertyTax.PTWorkflow", []);

            ptWorkflowDetails.forEach(function (data) {
              if (data.enable) {
                dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.isCheckFromWNS", false));
                if (data.businessService.includes("WNS")) {
                  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.isCheckFromWNS", true));
                }
              }
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 13]]);
  }));

  return function getMDMSData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var header = (0, _utils.getCommonHeader)({
  labelName: "Property Registry",
  labelKey: "PT_COMMON_PROPERTY_REGISTRY_HEADER"
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "propertySearch",

  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _mutationMethods.resetFields)(state, dispatch);
    getMDMSData(dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
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
            }, header),
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px"
                    }
                  }
                },

                buttonLabel: (0, _utils.getLabel)({
                  labelName: "Register New Property",
                  labelKey: "PT_COMMON_REGISTER_NEW_PROPERTY_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack() {
                  var url = (0, _searchResults.getQueryRedirectUrl)();
                  var applicationNo = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
                  var connectionNo = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
                  var actionType = (0, _commons.getQueryArg)(window.location.href, "action");
                  var modeaction = (0, _commons.getQueryArg)(window.location.href, "modeaction");
                  var mode = (0, _commons.getQueryArg)(window.location.href, "mode");
                  url = applicationNo ? url + ("&applicationNumber=" + applicationNo) : url;
                  url = connectionNo ? url + ("&connectionNumber=" + connectionNo) : url;
                  url = actionType ? url + ("&action=" + actionType) : url;
                  url = modeaction ? url + ("&modeaction=" + modeaction) : url;
                  url = mode ? url + ("&mode=" + mode) : url;
                  _store2.default.dispatch((0, _actions.setRoute)("/pt-common-screens/register-property?redirectUrl=" + url));
                }
              }
            }
          }
        },
        searchPropertyDetails: _mutationMethods.searchPropertyDetails,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchPropertyTable: _searchResults.searchPropertyTable

      }
    }
  }
};

exports.default = screenConfig;