"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMdmsTenantsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _searchTabs = require("./searchResource/searchTabs");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _searchResults = require("./searchResource/searchResults");

var _searchApplicationResults = require("./searchResource/searchApplicationResults");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../utils");

require("./index.css");

var _api = require("../../../../ui-utils/api");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMDMSData = function getMDMSData(action, dispatch) {
  var moduleDetails = [{
    moduleName: "ws-services-masters",
    masterDetails: [{ name: "Documents" }]
  }];
  try {
    (0, _commons.getRequiredDocData)(action, dispatch, moduleDetails);
  } catch (e) {}
};

var getMDMSAppType = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var mdmsBody, applicationType, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // getMDMS data for ApplicationType
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "ws-services-masters", masterDetails: [{ name: "ApplicationType" }]
                }]
              }
            };
            _context.prev = 1;
            applicationType = [];
            payload = null;
            _context.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context.sent;

            if (payload && payload.MdmsRes['ws-services-masters'] && payload.MdmsRes['ws-services-masters'].ApplicationType !== undefined) {
              payload.MdmsRes['ws-services-masters'].ApplicationType.forEach(function (obj) {
                return applicationType.push({ code: obj.code.replace(/_/g, ' '), name: obj.name, businessService: obj.businessService });
              });
              applicationType.forEach(function (type) {
                return getBusinessService(type.businessService, dispatch);
              });
              dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.searchScreen.applicationType", applicationType));
            }
            _context.next = 12;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 10]]);
  }));

  return function getMDMSAppType(_x) {
    return _ref.apply(this, arguments);
  };
}();

var header = (0, _utils.getCommonHeader)({
  labelKey: "WS_SEARCH_CONNECTION_HEADER"
});

var getBusinessService = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(businessService, dispatch) {
    var queryObject, payload, applicationStatus, _applicationStatus;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, { key: "businessServices", value: businessService }];
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/businessservice/_search", "_search", queryObject);

          case 3:
            payload = _context2.sent;

            if (payload.BusinessServices[0].businessService === "NewWS1" || payload.BusinessServices[0].businessService === "NewSW1") {
              applicationStatus = commonGetAppStatus(payload);

              dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.searchScreen.applicationStatusNew", applicationStatus));
            } else {
              if (payload.BusinessServices[0].businessService === "ModifyWSConnection" || payload.BusinessServices[0].businessService === "ModifySWConnection") {
                _applicationStatus = commonGetAppStatus(payload);

                dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.searchScreen.applicationStatusModify", _applicationStatus));
              }
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getBusinessService(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getMdmsTenantsData = exports.getMdmsTenantsData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }, {
                    name: "citymodule"
                  }]
                }]
              }
            };
            _context3.prev = 1;
            payload = null;
            _context3.next = 5;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context3.sent;

            payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant", payload.MdmsRes.tenant));

            _context3.next = 12;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 10]]);
  }));

  return function getMdmsTenantsData(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var commonGetAppStatus = function commonGetAppStatus(payload) {
  var _ref4 = payload.BusinessServices[0] || [],
      states = _ref4.states;

  if (states && states.length > 0) {
    var status = states.map(function (item) {
      return { code: item.applicationStatus };
    });
    return status.filter(function (item) {
      return item.code != null;
    });
  }
};
var employeeSearchResults = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    // dispatch(handleField("apply",
    // "components",
    // "div", {}));
    // dispatch(handleField("search-preview",
    // "components",
    // "div", {}));
    dispatch((0, _actions.prepareFinalObject)('searchConnection', {}));
    dispatch((0, _actions.prepareFinalObject)('searchScreen', {}));
    dispatch((0, _actions.unMountScreen)("apply"));
    dispatch((0, _actions.unMountScreen)("search-preview"));
    getMDMSData(action, dispatch);
    (0, _utils2.resetFieldsForConnection)(state, dispatch);
    (0, _utils2.resetFieldsForApplication)(state, dispatch);
    getMDMSAppType(dispatch);
    getMdmsTenantsData(dispatch);
    dispatch((0, _actions.prepareFinalObject)("searchConnection.tenantId", (0, _localStorageUtils.getTenantIdCommon)()));
    dispatch((0, _actions.prepareFinalObject)("currentTab", "SEARCH_CONNECTION"));
    localStorage.setItem("WS_ADDITIONAL_DETAILS_FOR_DATA", JSON.stringify({}));
    localStorage.setItem("IS_WS_ADDITIONAL_DETAILS_FOR_DATA", JSON.stringify(false));
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
              visible: true,
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
                  labelKey: "WS_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {
                  (0, _commons.showHideAdhocPopup)(state, dispatch, "search");
                }
              }
              // onClickDefination: {
              //   action: "condition",
              //   callBack: (state, dispatch) => {
              //     pageResetAndChange(state, dispatch);
              //   }
              // }
            }
          }
        },
        showSearches: _searchTabs.showSearches,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults,
        searchApplicationResults: _searchApplicationResults.searchApplicationResults
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "search"
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = employeeSearchResults;