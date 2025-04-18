"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.getData = exports.getMdmsData = exports.tradeDocumentDetails = exports.header = exports.stepper = exports.stepsData = undefined;

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

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _documentList = require("./applyResource/documentList");

var _footer = require("./applyResource/footer");

var _tradeDetails = require("./applyResource/tradeDetails");

var _tradeLocationDetails = require("./applyResource/tradeLocationDetails");

var _tradeOwnerDetails = require("./applyResource/tradeOwnerDetails");

var _tradeReviewDetails = require("./applyResource/tradeReviewDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Trade Details", labelKey: "TL_COMMON_TR_DETAILS" }, { labelName: "Owner Details", labelKey: "TL_COMMON_OWN_DETAILS" }, { labelName: "Documents", labelKey: "TL_COMMON_DOCS" }, { labelName: "Summary", labelKey: "TL_COMMON_SUMMARY" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);
var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _commons.getQueryArg)(window.location.href, "action") !== "edit" ? (0, _utils.getCommonHeader)({
    labelName: "Apply for New Trade License " + (process.env.REACT_APP_NAME === "Citizen" ? "(" + (0, _utils2.getCurrentFinancialYear)() + ")" : ""),
    // dynamicArray: getQueryArg(window.location.href, "action") === "EDITRENEWAL" ? [getnextFinancialYear(getCurrentFinancialYear())]:[getCurrentFinancialYear()],
    labelKey: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? "TL_COMMON_APPL_RENEWAL_LICENSE_YEAR" : "TL_COMMON_APPL_NEW_LICENSE_YEAR"

  }) : {},
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
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
    var mdmsBody, payload, localities, financialYearData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "TradeLicense",
                  masterDetails: [{ name: "AccessoriesCategory" }, { name: "ApplicationType" }, { name: "documentObj" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{ name: "OwnerType" }, { name: "DocumentType" }, { name: "UOM" }, { name: "StructureType" }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }, {
                  moduleName: "egf-master",
                  masterDetails: [{ name: "FinancialYear" }]
                }]
              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;
            localities = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.tenant.localities", []);

            if (localities && localities.length > 0) {
              payload.MdmsRes.tenant.localities = localities;
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            financialYearData = (0, _get2.default)(payload, "MdmsRes.egf-master.FinancialYear", []).filter(function (item) {
              return item.module === "TL" && item.active === true;
            });

            (0, _set2.default)(payload, "MdmsRes.egf-master.FinancialYear", financialYearData);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 13]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getData = exports.getData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var queryValue, tenantId, applicationNo, applicationType, isEditRenewal, oldApplicationNo;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryValue = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            applicationNo = queryValue ? queryValue : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].oldLicenseNumber", null);
            _context2.next = 5;
            return getMdmsData(action, state, dispatch);

          case 5:
            _context2.next = 7;
            return (0, _utils2.getAllDataFromBillingSlab)((0, _localStorageUtils.getTenantId)(), dispatch);

          case 7:
            if (!applicationNo) {
              _context2.next = 14;
              break;
            }

            //Edit/Update Flow ----
            applicationType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType", null);
            isEditRenewal = (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL";


            if ((0, _commons.getQueryArg)(window.location.href, "action") !== "edit" && !isEditRenewal) {
              dispatch((0, _actions.prepareFinalObject)("Licenses", [{
                licenseType: "PERMANENT",
                oldLicenseNumber: queryValue ? "" : applicationNo,
                tradeLicenseDetail: {
                  additionalDetail: {
                    applicationType: applicationType ? applicationType : "NEW"
                  }
                }
              }]));
            }
            // dispatch(prepareFinalObject("LicensesTemp", []));
            _context2.next = 13;
            return (0, _commons2.updatePFOforSearchResults)(action, state, dispatch, applicationNo, tenantId);

          case 13:

            if (!queryValue) {
              oldApplicationNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].applicationNumber", null);

              dispatch((0, _actions.prepareFinalObject)("Licenses[0].oldLicenseNumber", oldApplicationNo));
              if (oldApplicationNo !== null) {
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].financialYear", ""));
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.additionalDetail.applicationType", "APPLICATIONTYPE.RENEWAL"));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.financialYear", "props.value", ""));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.applicationType", "props.value", "APPLICATIONTYPE.RENEWAL"));
              }

              dispatch((0, _actions.prepareFinalObject)("Licenses[0].applicationNumber", ""));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", false));
            }

          case 14:
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

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    tradeDetails: _tradeDetails.tradeDetails,
    tradeLocationDetails: _tradeLocationDetails.tradeLocationDetails
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    tradeOwnerDetails: _tradeOwnerDetails.tradeOwnerDetails
  },
  visible: false
};

var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    tradeDocumentDetails: tradeDocumentDetails
  },
  visible: false
};

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
    // let { isRequiredDocuments } = state.screenConfiguration.preparedFinalObject;
    dispatch((0, _actions.unMountScreen)("search"));
    dispatch((0, _actions.unMountScreen)("search-preview"));
    var tenantId = (0, _localStorageUtils.getTenantId)();
    var URL = window.location.href;
    var URLsplit = URL.split("/");
    if (URLsplit[URLsplit.length - 1] == "apply") {
      (0, _utils2.pageResetAndChange)(state, dispatch, tenantId);
    }
    // dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    getData(action, state, dispatch).then(function (responseAction) {
      var queryObj = [{ key: "tenantId", value: tenantId }];
      (0, _commons2.getBoundaryData)(action, state, dispatch, queryObj);
      var props = (0, _get2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props", {});
      props.value = tenantId;
      props.disabled = true;
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props", props);
      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address.city", tenantId));
      var mohallaLocalePrefix = {
        moduleName: tenantId,
        masterName: "REVENUE"
      };
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla.props.localePrefix", mohallaLocalePrefix);
      //hardcoding license type to permanent
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLicenseType.props.value", "PERMANENT");
    });
    //hardcoding license type to permanent
    if ((0, _commons.getQueryArg)(window.location.href, "action") == null) {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.financialYear.props.disabled", false);
    } else {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.financialYear.props.disabled", true);
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
            }, header)
          }
        },
        stepper: stepper,
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        formwizardFourthStep: formwizardFourthStep,
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