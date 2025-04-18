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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("../../../../ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _footer = require("../bpastakeholder/applyResource/footer");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _apply = require("../bpastakeholder/apply");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _utils = require("../utils");

var _commons3 = require("egov-ui-kit/utils/commons");

var _actions2 = require("egov-ui-kit/redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, tenantId) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _apply.getMdmsData)(action, state, dispatch);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var updateSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, queryValue, tenantId) {
    var aa, subOwnerShipCategory, queryValueFromUrl;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getData(action, state, dispatch, tenantId);

          case 2:
            _context2.next = 4;
            return (0, _commons.updatePFOforSearchResults)(action, state, dispatch, queryValue, "", tenantId);

          case 4:
            aa = _context2.sent;

            (0, _utils.addressDestruct)(action, state, dispatch);
            subOwnerShipCategory = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory");

            // setOrganizationVisibility(action, state, dispatch, subOwnerShipCategory);

            queryValueFromUrl = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");

            if (!queryValueFromUrl) {
              dispatch((0, _actions.prepareFinalObject)("Licenses[0].oldLicenseNumber", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].applicationNumber", "")));
              dispatch((0, _actions.prepareFinalObject)("Licenses[0].applicationNumber", ""));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", false));
            }

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateSearchResults(_x5, _x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();
var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    if (window.location.pathname.includes("openlink")) {
      (0, _set2.default)(state, "screenConfiguration.moduleName", "BPAREG");
      (0, _set2.default)(action.screenConfig, "components.div.children.footer.props.style", {
        width: "100vw"
      });
      (0, _localStorageUtils.setModule)((0, _commons3.getModuleName)());
      var _tenantId = (0, _localStorageUtils.getTenantId)();
      var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
      dispatch((0, _actions2.fetchLocalizationLabel)(locale, _tenantId, _tenantId));
    }
    var queryValue = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
    var applicationNo = queryValue;
    dispatch((0, _actions.prepareFinalObject)("Licenses[0]", {}));
    dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0]", {}));

    if (applicationNo) {
      updateSearchResults(action, state, dispatch, applicationNo, tenantId);
    } else {
      getData(action, state, dispatch, tenantId);
      // setOrganizationVisibility(action, state, dispatch, "INDIVIDUAL");
      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[0].gender", "MALE"));
      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", "INDIVIDUAL"));

      if (!window.location.pathname.includes("openlink")) {
        (0, _utils.setMobileNoField)(action, state, dispatch);
        (0, _utils.setNameOfUser)(action, state, dispatch);
      }
    }
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
            }, _apply.header)
          }
        },
        stepper: _apply.stepper,
        formwizardFirstStep: _apply.formwizardFirstStep,
        formwizardSecondStep: _apply.formwizardSecondStep,
        formwizardThirdStep: _apply.formwizardThirdStep,
        formwizardFourthStep: _apply.formwizardFourthStep,
        footer: _footer.footer
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "apply"
      }
    }
  }
};

exports.default = screenConfig;