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

require("./index.css");

var _pendingApprovals = require("./searchResource/pendingApprovals");

var _searchResults = require("./searchResource/searchResults");

var _tradeLicenseApplication = require("./searchResource/tradeLicenseApplication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { progressStatus } from "./searchResource/progressStatus";
var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
var tenant = (0, _localStorageUtils.getTenantId)();
var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var mdmsBody, payload, types;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "TradeLicense",
                  masterDetails: [{ name: "ApplicationType" }]
                }]
              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;
            types = [];

            if (payload && payload.MdmsRes) {
              types = (0, _get2.default)(payload.MdmsRes, "TradeLicense.ApplicationType").map(function (item, index) {
                return {
                  code: item.code.split(".")[1]
                };
              });
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.searchScreen.applicationType", types));
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function getMdmsData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var header = (0, _utils.getCommonHeader)({
  labelName: "Trade License",
  labelKey: "TL_COMMON_TL"
});
var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("searchScreen", {}));
    dispatch((0, _actions.unMountScreen)("apply"));
    dispatch((0, _actions.unMountScreen)("search-preview"));
    getMdmsData(dispatch);
    var moduleDetails = [{
      moduleName: 'TradeLicense',
      masterDetails: [{ name: 'Documents' }]
    }];
    (0, _commons.getRequiredDocData)(action, dispatch, moduleDetails, true);
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
                  labelName: "NEW APPLICATION",
                  labelKey: "TL_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {

                  (0, _commons.showHideAdhocPopup)(state, dispatch, 'search');
                  dispatch((0, _actions.prepareFinalObject)("Licenses", [{ licenseType: "PERMANENT" }]));
                  dispatch((0, _actions.prepareFinalObject)("LicensesTemp", []));
                }
              },
              roleDefination: {
                rolePath: "user-info.roles",
                path: "tradelicence/search?action=showRequiredDocuments"
              }
            }
          }
        },
        pendingApprovals: _pendingApprovals.pendingApprovals,
        tradeLicenseApplication: _tradeLicenseApplication.tradeLicenseApplication,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    },
    adhocDialog: {
      uiFramework: 'custom-containers',
      componentPath: 'DialogContainer',
      props: {
        open: (0, _commons.getQueryArg)(window.location.href, "action") === 'showRequiredDocuments' ? true : false,
        maxWidth: false,
        screenKey: 'search',
        reRouteURL: '/tradelicence/search'
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = tradeLicenseSearchAndResult;