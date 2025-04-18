"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

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

var _uiUtils = require("../../../../ui-utils");

var _utils2 = require("../utils");

var _deactivateEmployee = require("./viewResource/deactivate-employee");

var _employeeReview = require("./viewResource/employee-review");

var _footer = require("./viewResource/footer");

var _functions = require("./viewResource/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "View Employee Information",
    labelKey: "HR_VIEW_HEADER"
  })
});

var tradeView = (0, _employeeReview.employeeReviewDetails)(false);

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, tenantId) {
    var tenant, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenant = tenantId || (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenant,
                moduleDetails: [{
                  moduleName: "egov-hrms",
                  masterDetails: [{
                    name: "DeactivationReason",
                    filter: "[?(@.active == true)]"
                  }]
                }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("viewScreenMdmsData", payload.MdmsRes));
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

  return function getMdmsData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "view",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var employeeCode = (0, _commons.getQueryArg)(window.location.href, "employeeID");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    (0, _functions.getEmployeeData)(state, dispatch, employeeCode, tenantId);
    (0, _utils2.showHideAdhocPopup)(state, dispatch);
    getMdmsData(action, state, dispatch, tenantId);
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
        tradeView: tradeView,
        footer: (0, _footer.hrViewFooter)()
      }
    },
    // deactivateEmployee: {
    //   uiFramework: "custom-molecules-local",
    //   componentPath: "ActionDialog",
    //   props: {
    //     open: false
    //   },
    //   type: "array"
    // },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hrms",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "view"

      },
      children: {
        popup: _deactivateEmployee.deactivateEmployee
      }
    }
  }
};

exports.default = screenConfig;