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

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

require("./index.css");

var _mutationMethods = require("./mutation-methods");

var _propertySearchTabs = require("./property-search-tabs");

var _propertySearchTabs2 = _interopRequireDefault(_propertySearchTabs);

var _searchResults = require("./searchResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
var tenant = (0, _localStorageUtils.getTenantId)();

//console.log(captureMutationDetails);

var getMDMSData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, dispatch) {
    var moduleDetails;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            moduleDetails = [{
              moduleName: "PropertyTax",
              masterDetails: [{ name: "Documents" }]
            }, {
              moduleName: "tenant",
              masterDetails: [{
                name: "tenants"
              }, { name: "citymodule" }]
            }];


            try {
              (0, _commons.getRequiredDocData)(action, dispatch, moduleDetails).then(function (payload) {
                if (process.env.REACT_APP_NAME != "Citizen") {
                  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.tenantId", tenant));
                  (0, _set2.default)(action.screenConfig, "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity.props.isDisabled", true);
                  (0, _set2.default)(action.screenConfig, "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity.isDisabled", true);
                  (0, _mutationMethods.cityChange)(dispatch, tenant);
                }
                var tenants = (0, _get2.default)(payload, 'payload.MdmsRes.tenant.tenants', []).sort(function (t1, t2) {
                  return t1.code.localeCompare(t2.code);
                });
                dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.tenant.tenants", tenants));
              });
            } catch (e) {
              console.log(e);
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMDMSData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var header = (0, _utils.getCommonHeader)({
  labelName: "Property Tax",
  labelKey: "PROPERTY_TAX"
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "propertySearch",

  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _mutationMethods.resetFields)(state, dispatch);
    dispatch((0, _actions.unMountScreen)("search-preview"));
    getMDMSData(action, dispatch);
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
                  labelName: "Add New Property",
                  labelKey: "PT_ADD_NEW_PROPERTY_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {
                  (0, _commons.showHideAdhocPopup)(state, dispatch, "propertySearch");
                }
              }
              // roleDefination: {
              //   rolePath: "user-info.roles",
              //   path : "tradelicence/apply"

              // }
            }
          }
        },
        propertySearchTabs: _propertySearchTabs2.default,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchPropertyTable: _searchResults.searchPropertyTable,
        searchApplicationTable: _searchResults.searchApplicationTable

      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "propertySearch"
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = screenConfig;