"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFirstStep = exports.header = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uiUtils = require("../../../../ui-utils");

var _footer = require("./applyResource/footer");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _propertyAssemblySummary = require("./summaryResource/propertyAssemblySummary");

var _propertyLocationSummary = require("./summaryResource/propertyLocationSummary");

var _propertyOwnershipSummary = require("./summaryResource/propertyOwnershipSummary");

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
    propertyAssemblySummary: _propertyAssemblySummary.propertyAssemblySummary,
    propertyLocationSummary: _propertyLocationSummary.propertyLocationSummary,
    applicantSummary: _propertyOwnershipSummary.applicantSummary,
    institutionSummary: _propertyOwnershipSummary.institutionSummary
  }
};

var setSearchResponse = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, propertyId, tenantId, action) {
    var response, ownershipCategory;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _uiUtils.httpRequest)("post", "/property-services/property/_search", "", [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "propertyIds",
              value: propertyId
            }]);

          case 2:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("Property", (0, _get2.default)(response, "Properties[0]")));
            ownershipCategory = (0, _get2.default)(response, "Properties[0].ownershipCategory", "");

            if (ownershipCategory.includes("INDIVIDUAL")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("summary", "components.div.children.formwizardFirstStep.children.institutionSummary", "visible", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("summary", "components.div.children.formwizardFirstStep.children.applicantSummary", "visible", true));
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("summary", "components.div.children.formwizardFirstStep.children.institutionSummary", "visible", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("summary", "components.div.children.formwizardFirstStep.children.applicantSummary", "visible", false));
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setSearchResponse(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var getMDMSPropertyData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
    var mdmsBody, payload, ptWorkflowDetails;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "PTWorkflow" }]
                }]

              }
            };
            _context2.prev = 1;
            payload = null;
            _context2.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context2.sent;


            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            ptWorkflowDetails = (0, _get2.default)(payload, "MdmsRes.PropertyTax.PTWorkflow", []);

            ptWorkflowDetails.forEach(function (data) {
              if (data.enable) {
                var workFlow = {
                  tenantId: (0, _commons.getQueryArg)(window.location.href, "tenantId"),
                  businessService: data.businessService,
                  businessId: (0, _commons.getQueryArg)(window.location.href, "propertyId"),
                  action: "SUBMIT",
                  moduleName: "PT",
                  state: null,
                  comment: null,
                  documents: null,
                  assignes: null
                };
                dispatch((0, _actions.prepareFinalObject)("isWorkflowDetails", workFlow, null));
              }
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);

            console.log(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 11]]);
  }));

  return function getMDMSPropertyData(_x6) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var propertyId = (0, _commons.getQueryArg)(window.location.href, "propertyId");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    getMDMSPropertyData(dispatch);
    dispatch((0, _actions.prepareFinalObject)("Property", {}));
    dispatch((0, _actions.prepareFinalObject)("isFromWNS", false));
    setSearchResponse(state, dispatch, propertyId, tenantId, action);
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
        screenKey: "summary"
      }
    }
  }
};

exports.default = screenConfig;