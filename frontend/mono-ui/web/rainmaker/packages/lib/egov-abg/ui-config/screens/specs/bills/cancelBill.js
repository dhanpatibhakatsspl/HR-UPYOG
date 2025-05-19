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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _lodash = require("lodash");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _cancelBillDetails = require("./viewBillResource/cancelBillDetails");

var _viewBillFooter = require("./viewBillResource/viewBillFooter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Cancel Bill",
    labelKey: "ABG_CANCEL_BILL"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "ApplicationContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "consumerNumber"),
      label: {
        labelValue: "Consumer No",
        labelKey: "WS_COMMON_CONSUMER_NO_LABEL"
      }
    },
    visible: true
  }
});
var getData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var requestBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "CancelCurrentBillReasons"
                  }]
                }]
              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

          case 5:
            payload = _context.sent;


            if (payload) {
              dispatch((0, _actions.prepareFinalObject)('applyScreenMdmsData.reasonForBillCancel', (0, _get2.default)(payload, 'MdmsRes.common-masters.CancelCurrentBillReasons', [])));
            }

            _context.next = 11;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function getData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "cancelBill",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    getData(action, state, dispatch);
    (0, _lodash.set)(action.screenConfig, "components.div.children.cancelBillDetailsCard.children.cardContent.children.searchContainer.children.reason.props.value", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'UpdateBillCriteria.additionalDetails.reason', ''));
    (0, _lodash.set)(action.screenConfig, "components.div.children.cancelBillDetailsCard.children.cardContent.children.searchContainer.children.addtionalPenalty.props.value", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'UpdateBillCriteria.additionalDetails.additionalPenalty', ''));
    var additionalDetailsJson = "components.div.children.cancelBillDetailsCard.children.cardContent.children.searchContainer.children.addtionalDetails";
    if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'UpdateBillCriteria.additionalDetails.reason', '') == "OTHER") {
      (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".required", true);
      (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".props.disabled", false);
      (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".props.required", true);
    } else {
      (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".required", false);
      (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".props.disabled", true);
      (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".props.required", false);
    }
    (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".props.value", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'UpdateBillCriteria.additionalDetails.additionalDetails', ''));
    (0, _lodash.set)(action.screenConfig, additionalDetailsJson + ".props.error", false);
    var consumerNumber = (0, _commons.getQueryArg)(window.location.href, "consumerNumber");
    (0, _lodash.set)(action.screenConfig, "components.div.children.headerDiv.children.header.children.applicationNumber.props.number", consumerNumber);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "cancelReceipt"
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
            }, header)
          }
        },
        cancelBillDetailsCard: _cancelBillDetails.cancelBillDetailsCard,
        cancelBillFooter: _viewBillFooter.cancelBillFooter
      }
    }
  }
};

exports.default = screenConfig;