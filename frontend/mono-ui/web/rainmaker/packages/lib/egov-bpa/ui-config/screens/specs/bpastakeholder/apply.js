"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.getMdmsData = exports.tradeDocumentDetails = exports.header = exports.getOrganizationReqd = exports.stepper = exports.stepsData = undefined;

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

var _organizationDetails = require("./applyResource/organizationDetails");

var _tradeLocationDetails = require("./applyResource/tradeLocationDetails");

var _tradeOwnerDetails = require("./applyResource/tradeOwnerDetails");

var _licenseeDetails = require("./applyResource/licenseeDetails");

var _documentList = require("./applyResource/documentList");

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{
  labelName: "Licensee Details",
  labelKey: "BPA_LICENSEE_DETAILS_HEADER_OWNER_INFO"
}, { labelName: "Applicant Details", labelKey: "BPA_COMMON_AP_DETAILS" }, { labelName: "Document Upload", labelKey: "BPA_COMMON_DOCS" }, { labelName: "Summary", labelKey: "BPA_COMMON_SUMMARY" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var getOrganizationReqd = exports.getOrganizationReqd = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-bpa",

  componentPath: "RadioGroupWithLabelContainer",
  gridDefination: {
    xs: 12,
    sm: 12,
    md: 6
  },
  jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",

  props: {
    ValueToHide: "INDIVIDUAL",
    componentPathToHide: ["components.div.children.formwizardSecondStep.children.organizationDetails", "components.div.children.formwizardForthStep.children.tradeReviewDetails.children.cardContent.children.reviewOrganizationDetails"],
    label: {
      name: "On behalf of any organization?",
      key: "BPA_ORGANIZATION_REQD_LABEL"
    },
    buttons: [{
      labelName: "Yes",
      labelKey: "BPA_ORG_YES_LABEL",
      value: "INSTITUTIONAL"
    }, {
      label: "No",
      labelKey: "BPA_ORG_NO_LABEL",
      value: "INDIVIDUAL"
    }],
    jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
    required: true
  },
  required: true,
  type: "array"
};

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _commons.getQueryArg)(window.location.href, "action") !== "edit" ? (0, _utils.getCommonHeader)({
    labelName: "Register Technical Person/Builder",
    dynamicArray: [(0, _utils2.getCurrentFinancialYear)()],
    labelKey: process.env.REACT_APP_NAME === "Citizen" ? "BPA_COMMON_APPL_NEW_LICENSE" : "BPA_COMMON_APPL_NEW_LICENSE"
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
    labelKey: "BPA_DOCUMENT_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  paragraph: (0, _utils.getCommonParagraph)({
    labelName: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "BPA_DOCUMENT_DETAILS_SUBTEXT"
  }),
  documentList: _documentList.documentList
});

var getMdmsData = exports.getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var mdmsBody, payload, tradeTypes, tradeTypeDdData, localities, financialYearData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "TradeLicense",
                  masterDetails: [{ name: "TradeType", filter: "[?(@.type == \"BPA\")]" }, { name: "AccessoriesCategory" }, { name: "ApplicationType" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }, { name: "DocumentType" }, { name: "UOM" }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }, {
                  moduleName: "egf-master",
                  masterDetails: [{ name: "FinancialYear" }]
                }, {
                  moduleName: "StakeholderRegistraition",
                  masterDetails: [{ name: "TradeTypetoRoleMapping" }]
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
            tradeTypes = (0, _get2.default)(payload, "MdmsRes.TradeLicense.TradeType", []);
            tradeTypeDdData = (0, _utils2.getLicenseeTypeDropdownData)(tradeTypes);

            tradeTypeDdData && (0, _set2.default)(payload, "MdmsRes.TradeLicense.TradeTypeTransformed", tradeTypeDdData);

            // payload = commonTransform(payload, "MdmsRes.TradeLicense.TradeType");
            payload = (0, _utils2.commonTransform)(payload, "MdmsRes.common-masters.OwnerShipCategory");
            (0, _set2.default)(payload, "MdmsRes.common-masters.OwnerShipCategoryTransformed", (0, _utils2.objectToDropdown)((0, _get2.default)(payload, "MdmsRes.common-masters.OwnerShipCategory", [])));
            localities = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.tenant.localities", []);

            if (localities && localities.length > 0) {
              payload.MdmsRes.tenant.localities = localities;
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            financialYearData = (0, _get2.default)(payload, "MdmsRes.egf-master.FinancialYear", []).filter(function (item) {
              return item.module === "TL" && item.active === true;
            });

            (0, _set2.default)(payload, "MdmsRes.egf-master.FinancialYear", financialYearData);
            _context.next = 21;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 19]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// export const getData = async (action, state, dispatch) => {
//   const queryValue = getQueryArg(window.location.href, "applicationNumber");
//   const applicationNo = queryValue;

//   await getMdmsData(action, state, dispatch);
//   // await getAllDataFromBillingSlab(getTenantId(), dispatch);

//   if (applicationNo) {
//     //Edit/Update Flow ----
//     const applicationType = get(
//       state.screenConfiguration.preparedFinalObject,
//       "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType",
//       null
//     );
//     getQueryArg(window.location.href, "action") !== "edit" &&
//       dispatch(
//         prepareFinalObject("Licenses", [
//           {
//             licenseType: "PERMANENT",
//             oldLicenseNumber: queryValue ? "" : applicationNo,
//             tradeLicenseDetail: {
//               additionalDetail: {
//                 applicationType: applicationType ? applicationType : "NEW"
//               }
//             }
//           }
//         ])
//       );
//     // dispatch(prepareFinalObject("LicensesTemp", []));

//     await updatePFOforSearchResults(action, state, dispatch, applicationNo);
//     addressDestruct(action, state, dispatch);
//     if (!queryValue) {
//       const oldApplicationNo = get(
//         state.screenConfiguration.preparedFinalObject,
//         "Licenses[0].applicationNumber",
//         null
//       );
//       dispatch(
//         prepareFinalObject("Licenses[0].oldLicenseNumber", oldApplicationNo)
//       );
//       if (oldApplicationNo !== null) {
//         dispatch(prepareFinalObject("Licenses[0].financialYear", ""));
//         dispatch(
//           prepareFinalObject(
//             "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType",
//             "APPLICATIONTYPE.RENEWAL"
//           )
//         );
//         dispatch(
//           handleField(
//             "apply",
//             "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.financialYear",
//             "props.value",
//             ""
//           )
//         );
//         dispatch(
//           handleField(
//             "apply",
//             "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.applicationType",
//             "props.value",
//             "APPLICATIONTYPE.RENEWAL"
//           )
//         );
//       }

//       dispatch(prepareFinalObject("Licenses[0].applicationNumber", ""));
//       dispatch(
//         handleField(
//           "apply",
//           "components.div.children.headerDiv.children.header.children.applicationNumber",
//           "visible",
//           false
//         )
//       );
//     }
//   }
// };

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    LicenseeCard: _licenseeDetails.LicenseeCard
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    OwnerInfoCard: _tradeOwnerDetails.OwnerInfoCard,
    breakAfterSearch: (0, _utils.getBreak)(),
    // getOrganizationReqd,
    // organizationDetails,
    permanentAddr: _tradeLocationDetails.permanentAddr,
    corrospondanceAddr: _tradeLocationDetails.corrospondanceAddr
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