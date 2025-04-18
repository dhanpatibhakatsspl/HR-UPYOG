"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFourthStep = exports.getData = exports.getMdmsData = exports.tradeDocumentDetails = exports.header = exports.stepper = exports.stepsData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _footer = require("./applyResource/footer");

var _tradeReviewDetails = require("./applyResource/tradeReviewDetails");

var _tradeDetails = require("./applyResource/tradeDetails");

var _tradeLocationDetails = require("./applyResource/tradeLocationDetails");

var _tradeOwnerDetails = require("./applyResource/tradeOwnerDetails");

var _documentList = require("./applyResource/documentList");

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Trade Details", labelKey: "TL_COMMON_TR_DETAILS" }, { labelName: "Owner Details", labelKey: "TL_COMMON_OWN_DETAILS" }, { labelName: "Documents", labelKey: "TL_COMMON_DOCS" }, { labelName: "Summary", labelKey: "TL_COMMON_SUMMARY" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);
// export const queryValue = getQueryArg(
//   window.location.href,
//   "applicationNumber"
// );

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Apply for New Trade License (" + (0, _utils2.getCurrentFinancialYear)() + ")",
    labelKey: "TL_COMMON_APPL_NEW_LICe"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA"
    },
    visible: false
  }
});

var tradeDocumentDetails = exports.tradeDocumentDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Required Documents",
    labelKey: "TL_NEW-UPLOAD-DOCS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  paragraph: (0, _utils.getCommonParagraph)({
    labelName: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "TL_NEW-UPLOAD-DOCS_SUBHEADER"
  }),
  documentList: _documentList.documentList
});

var getMdmsData = exports.getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var mdmsBody, payload, localities;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "TradeLicense",
                  masterDetails: [{ name: "TradeType", filter: "[?(@.type == \"TL\")]" }, { name: "AccessoriesCategory" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{ name: "StructureType" }, { name: "OwnerType" }, { name: "OwnerShipCategory" }, { name: "DocumentType" }, { name: "UOM" }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }]
              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            (0, _set2.default)(payload, "MdmsRes.TradeLicense.MdmsTradeType", (0, _get2.default)(payload, "MdmsRes.TradeLicense.TradeType", []));
            payload = (0, _utils2.commonTransform)(payload, "MdmsRes.TradeLicense.TradeType");
            payload = (0, _utils2.commonTransform)(payload, "MdmsRes.common-masters.OwnerShipCategory");
            (0, _set2.default)(payload, "MdmsRes.common-masters.OwnerShipCategoryTransformed", (0, _utils2.objectToDropdown)((0, _get2.default)(payload, "MdmsRes.common-masters.OwnerShipCategory", [])));
            localities = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.tenant.localities", []);

            if (localities && localities.length > 0) {
              payload.MdmsRes.tenant.localities = localities;
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 15]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getData = exports.getData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var queryValue;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryValue = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
            _context2.next = 3;
            return getMdmsData(action, state, dispatch);

          case 3:
            _context2.next = 5;
            return (0, _utils2.getAllDataFromBillingSlab)((0, _localStorageUtils.getTenantId)(), dispatch);

          case 5:
            if (!queryValue) {
              _context2.next = 10;
              break;
            }

            _context2.next = 8;
            return (0, _commons2.updatePFOforSearchResults)(action, state, dispatch, queryValue);

          case 8:
            _context2.next = 12;
            break;

          case 10:
            //hardcoding license type to permanent
            dispatch((0, _actions.prepareFinalObject)("Licenses", [{ licenseType: "PERMANENT" }]));
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp", []));

          case 12:
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

var formwizardFourthStep = exports.formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    tradeReviewDetails: _tradeReviewDetails.tradeReviewDetails
  },
  visible: false
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  // hasBeforeInitAsync:true,
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("Licenses", [{ licenseType: "PERMANENT" }]));
    dispatch((0, _actions.prepareFinalObject)("LicensesTemp", []));
    // getData(action, state, dispatch);
    getData(action, state, dispatch).then(function (responseAction) {
      var tenantId = (0, _localStorageUtils.getTenantId)();
      var queryObj = [{ key: "tenantId", value: tenantId }];
      (0, _commons2.getBoundaryData)(action, state, dispatch, queryObj);
      var props = (0, _get2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props", {});
      props.value = tenantId;
      props.disabled = true;
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props", props);
      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address.city", tenantId));
      //hardcoding license type to permanent
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLicenseType.props.value", "PERMANENT");
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
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer"
        }
      }
    }
  }
};

exports.default = screenConfig;