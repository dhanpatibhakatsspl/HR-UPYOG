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

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

require("../../../../index.css");

var _uiUtils = require("../../../../ui-utils");

var _utils2 = require("../utils");

var _cityPicker = require("./createResource/cityPicker");

var _searchForm = require("./searchResource/searchForm");

var _searchResults = require("./searchResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var header = (0, _utils.getCommonHeader)({
  labelName: "Employee Management",
  labelKey: "HR_COMMON_HEADER"
});

var getMDMSData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{ name: "Department", filter: "[?(@.active == true)]" }, { name: "Designation", filter: "[?(@.active == true)]" }]
                }, {
                  moduleName: "egov-hrms",
                  masterDetails: [{
                    name: "Degree",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "EmployeeStatus",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "EmployeeType",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "DeactivationReason",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "EmploymentTest",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "Specalization",
                    filter: "[?(@.active == true)]"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{ name: "tenants" }]
                }, { "moduleName": "ACCESSCONTROL-ROLES", "masterDetails": [{ "name": "roles", "filter": "$.[?(@.code!='CITIZEN')]" }] }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 9]]);
  }));

  return function getMDMSData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var setUlbSelect = function setUlbSelect(action, state, dispatch) {
  var adminRoles = (0, _utils2.getAdminRole)(state);
  if (adminRoles.hasAdminRole) {
    // set(
    //   action.screenConfig,
    //   "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.ulb.roleDefination.roles",
    //   adminRoles.configAdminRoles
    // );
  } else {
    (0, _set2.default)(action.screenConfig, "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.ulb.required", false);
  }
};

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

var adminCityPickerCheck = function adminCityPickerCheck(state, dispatch) {
  var adminRoles = (0, _utils2.getAdminRole)(state);
  if (adminRoles.hasAdminRole) {
    dispatch((0, _actions.prepareFinalObject)("hrmsPickerFlag", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.cityDropdown", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.cityDropdown", "props.required", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.cityDropdown", "required", true));
    (0, _utils2.showCityPicker)(state, dispatch);
  } else {
    dispatch((0, _actions.prepareFinalObject)("hrmsPickerFlag", false));
    (0, _utils2.createEmployee)(state, dispatch);
  }
};

var employeeSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("hrmsSearchScreen", {}));
    getData(action, state, dispatch);
    setUlbSelect(action, state, dispatch);
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
                  labelName: "Add Employee",
                  labelKey: "HR_ADD_NEW_EMPLOYEE_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: adminCityPickerCheck
              },
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["SUPERUSER", "HRMS_ADMIN"]
              }
            }
          }
        },
        searchForm: _searchForm.searchForm,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    },
    cityPickerDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        className: "hrmsCityPickerDialog",
        style: { overflow: "visible" }
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            style: {
              overflow: "visible"
            }
          },
          children: {
            popup: _cityPicker.cityPicker
          }
        }
      }
    }
  }
};

exports.default = employeeSearchAndResult;