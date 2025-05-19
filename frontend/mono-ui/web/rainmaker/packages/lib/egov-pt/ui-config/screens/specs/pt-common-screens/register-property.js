"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = exports.formwizardFirstStep = exports.header = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("../../../../ui-utils");

var _commons = require("../../../../ui-utils/commons");

var _footer = require("./applyResource/footer");

var _propertyAssemblyDetails = require("./applyResourceMutation/propertyAssemblyDetails");

var _propertyLocationDetails = require("./applyResourceMutation/propertyLocationDetails");

var _propertyOwnershipDetails = require("./applyResourceMutation/propertyOwnershipDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelKey: "PT_COMMON_REGISTER_NEW_PROPERTY"
  })
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    propertyAssemblyDetails: _propertyAssemblyDetails.propertyAssemblyDetails,
    propertyLocationDetails: _propertyLocationDetails.propertyLocationDetails,
    propertyOwnershipDetails: _propertyOwnershipDetails.propertyOwnershipDetails
  }
};
var getMDMSPropertyData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var mdmsBody, payload, PropertyType, UsageType, array1, array2, ptWorkflowDetails;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "PropertyType" }, { name: "UsageCategory" }, { name: "UsageCategoryMajor" }, { name: "UsageCategoryMinor" }, { name: "UsageCategorySubMinor" }, { name: "PTWorkflow" }]
                }]

              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;
            PropertyType = [];
            UsageType = [];

            payload.MdmsRes.PropertyTax.PropertyType.filter(function (item) {
              if (item.name != "Built Up") {
                PropertyType.push({
                  name: item.name,
                  code: item.code,
                  isActive: item.active
                });
              }
            });
            payload.MdmsRes.PropertyTax.PropertyType = PropertyType;

            payload.MdmsRes.PropertyTax.UsageCategory.forEach(function (item) {
              if (item.code.split(".").length <= 2 && item.code != "NONRESIDENTIAL") {
                UsageType.push({
                  active: item.active,
                  name: item.name,
                  code: item.code,
                  fromFY: item.fromFY
                });
              }
            });
            payload.MdmsRes.PropertyTax.UsageType = UsageType;
            array1 = [];
            array2 = [];

            payload.MdmsRes.PropertyTax.UsageCategory.forEach(function (item) {
              var itemCode = item.code.split(".");
              var codeLength = itemCode.length;
              if (codeLength > 3) {
                array1.push(item);
              } else if (codeLength === 3) {
                array2.push(item);
              }
            });
            array1.forEach(function (item) {
              array2 = array2.filter(function (item1) {
                return !item.code.includes(item1.code);
              });
            });
            array1 = array2.concat(array1);

            payload.MdmsRes.PropertyTax.subUsageType = array1;

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            ptWorkflowDetails = (0, _get2.default)(payload, "MdmsRes.PropertyTax.PTWorkflow", []);

            ptWorkflowDetails.forEach(function (data) {
              if (data.enable) {
                if (data.businessService.includes("WNS")) {
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', "components.div.children.footer.children.payButton", "visible", false));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', "components.div.children.footer.children.nextButton", "visible", true));
                  dispatch((0, _actions.prepareFinalObject)("isFromWNS", true));
                } else {
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', "components.div.children.footer.children.payButton", "visible", true));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', "components.div.children.footer.children.nextButton", "visible", false));
                  dispatch((0, _actions.prepareFinalObject)("isFromWNS", false));
                }
              }
            });
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 23]]);
  }));

  return function getMDMSPropertyData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getMdmsData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var tenantId, mdmsBody, payload, OwnerShipCategory, institutions, localities;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }]
                }, {
                  moduleName: "egov-location",
                  masterDetails: [{
                    name: "TenantBoundary"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }, { name: "citymodule" }]
                }]
              }
            };
            _context2.prev = 2;
            payload = null;
            _context2.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context2.sent;
            OwnerShipCategory = (0, _get2.default)(payload, "MdmsRes.common-masters.OwnerShipCategory");
            institutions = [];

            OwnerShipCategory = OwnerShipCategory.map(function (category) {
              if (category.code.includes("INDIVIDUAL")) {
                return category.code;
              } else {
                var code = category.code.split(".");
                institutions.push({ code: code[1], parent: code[0], active: true });
                return code[0];
              }
            });
            OwnerShipCategory = OwnerShipCategory.filter(function (v, i, a) {
              return a.indexOf(v) === i;
            });
            OwnerShipCategory = OwnerShipCategory.map(function (val) {
              return { code: val, active: true };
            });

            payload.MdmsRes['common-masters'].Institutions = institutions;
            payload.MdmsRes['common-masters'].OwnerShipCategory = OwnerShipCategory;
            localities = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.tenant.localities", []);

            if (localities && localities.length > 0) {
              payload.MdmsRes.tenant.localities = localities;
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant", payload.MdmsRes.tenant));
            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](2);

            console.log(_context2.t0);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 21]]);
  }));

  return function getMdmsData(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getFirstListFromDotSeparated = function getFirstListFromDotSeparated(list) {
  list = list.map(function (item) {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [].concat((0, _toConsumableArray3.default)(new Set(list))).map(function (item) {
    return { code: item };
  });
  return list;
};
var getData = exports.getData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getMdmsData(action, state, dispatch);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getData(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "register-property",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    getMDMSPropertyData(dispatch);
    dispatch((0, _actions.prepareFinalObject)("Property", {}));

    //Set Module Name
    (0, _set2.default)(state, "screenConfiguration.moduleName", "egov-pt");

    getData(action, state, dispatch).then(function (responseAction) {
      var tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;

      var queryObj = [{ key: "tenantId", value: tenantId }];
      (0, _commons.getBoundaryData)(action, state, dispatch, queryObj);
      if (process.env.REACT_APP_NAME != "Citizen") {
        var props = (0, _get2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.city.props", {});
        props.value = tenantId;
        props.isDisabled = true;
        (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.city.props", props);
        dispatch((0, _actions.prepareFinalObject)("Property.address.city", tenantId));
      }
      var mohallaLocalePrefix = {
        moduleName: tenantId,
        masterName: "REVENUE"
      };
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla.props.localePrefix", mohallaLocalePrefix);
    });

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(function () {
      var ownershipCategory = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory", []);
      //  ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch((0, _actions.prepareFinalObject)("OwnershipCategory", ownershipCategory));
    });

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        formwizardFirstStep: formwizardFirstStep,
        footer: _footer.footer
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "SuccessPTPopupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "register-property"
      }
    }
  }
};

exports.default = screenConfig;