"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotoHomeFooter = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var getRedirectionURL = function getRedirectionURL() {
  /* Mseva 2.0 changes */
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? // ? "/tradelicense-citizen/home"
  "/" : "/inbox";
  return redirectionURL;
};

var getRedirectionOCURL = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, edcrNumber, environment, origin;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            edcrNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "edcrDetail[0].edcrNumber", "");

            if (!edcrNumber) {
              edcrNumber = (0, _commons.getQueryArg)(window.location.href, "edcrNumber");
            }
            environment = process.env.NODE_ENV === "production" ? "citizen" : "";
            origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;

            window.location.assign("" + origin + environment + "/oc-bpa/apply?tenantId=" + tenantId + "&edcrNumber=" + edcrNumber);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getRedirectionOCURL(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getRedirectionBPAURL = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var tenantId, edcrNumber, environment, origin;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            edcrNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "edcrDetail[0].edcrNumber", "");

            if (!edcrNumber) {
              edcrNumber = (0, _commons.getQueryArg)(window.location.href, "edcrNumber");
            }
            environment = process.env.NODE_ENV === "production" ? "citizen" : "";
            origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;

            window.location.assign("" + origin + environment + "/egov-bpa/apply?tenantId=" + tenantId + "&edcrNumber=" + edcrNumber);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRedirectionBPAURL(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var gotoHomeFooter = exports.gotoHomeFooter = getCommonApplyFooter({
  gotoHome: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "GO TO HOME",
        labelKey: "BPA_HOME_BUTTON"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: getRedirectionURL()
    }
  },
  ocCreateApp: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
      // disabled: true
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "CREATE OCUPANCY CERTIFICATE APPLICATION",
        labelKey: "EDCR_OC_CREATE_APP_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: getRedirectionOCURL
    },
    visible: false
  },
  bpaCreateApp: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "CREATE BUILDING PLAN APPLICATION",
        labelKey: "EDCR_CREATE_APP_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: getRedirectionBPAURL
    },
    visible: false
  }
});