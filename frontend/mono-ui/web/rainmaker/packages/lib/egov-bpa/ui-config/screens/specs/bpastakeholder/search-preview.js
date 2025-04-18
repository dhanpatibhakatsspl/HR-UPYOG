"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradeReviewDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _footer = require("./applyResource/footer");

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _reviewOrganization = require("./applyResource/review-organization");

var _reviewOwner = require("./applyResource/review-owner");

var _reviewLicense = require("./applyResource/review-license");

var _reviewLocation = require("./applyResource/review-location");

var _reviewDocuments = require("./applyResource/review-documents");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
var headerSideText = { word1: "", word2: "" };

var getTradeTypeSubtypeDetails = function getTradeTypeSubtypeDetails(payload) {
  var tradeUnitsFromApi = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.tradeUnits", []);
  var tradeUnitDetails = [];
  tradeUnitsFromApi.forEach(function (tradeUnit) {
    var tradeType = tradeUnit.tradeType;

    var tradeDetails = tradeType.split(".");
    tradeUnitDetails.push({
      trade: (0, _get2.default)(tradeDetails, "[0]", ""),
      tradeType: (0, _get2.default)(tradeDetails, "[1]", ""),
      tradeSubType: (0, _get2.default)(tradeDetails, "[2]", "")
    });
  });
  return tradeUnitDetails;
};

var searchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, applicationNo) {
    var queryObject, payload, moduleName, sts, LicenseData, fetchFromReceipt, validTo;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "applicationNumber", value: applicationNo }];
            _context.next = 3;
            return (0, _commons2.getSearchResults)(queryObject);

          case 3:
            payload = _context.sent;


            headerSideText = (0, _utils2.getHeaderSideText)((0, _get2.default)(payload, "Licenses[0].status"), (0, _get2.default)(payload, "Licenses[0].licenseNumber"));
            (0, _set2.default)(payload, "Licenses[0].headerSideText", headerSideText);

            (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") && (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(".")[0] === "INDIVIDUAL" ? (0, _utils2.setMultiOwnerForSV)(action, true) : (0, _utils2.setMultiOwnerForSV)(action, false);

            if ((0, _get2.default)(payload, "Licenses[0].licenseType")) {
              (0, _utils2.setValidToFromVisibilityForSV)(action, (0, _get2.default)(payload, "Licenses[0].licenseType"));
            }

            moduleName = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType").split(".")[0];


            (0, _set2.default)(action, "screenConfig.components.div.children.taskStatus.props.moduleName", moduleName);

            _context.next = 12;
            return (0, _commons.setDocuments)(payload, "Licenses[0].tradeLicenseDetail.applicationDocuments", "LicensesTemp[0].reviewDocData", dispatch, 'BPA');

          case 12:
            sts = (0, _utils2.getTransformedStatus)((0, _get2.default)(payload, "Licenses[0].status"));

            payload && dispatch((0, _actions.prepareFinalObject)("Licenses[0]", payload.Licenses[0]));
            payload && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeDetailsResponse", getTradeTypeSubtypeDetails(payload)));
            LicenseData = payload.Licenses[0];
            fetchFromReceipt = sts !== "pending_payment";

            (0, _utils2.createEstimateData)(LicenseData, "LicensesTemp[0].estimateCardData", dispatch, {});
            validTo = false;

            if ((0, _get2.default)(payload, "Licenses[0].validTo")) {
              validTo = true;
            }
            (0, _set2.default)(action.screenConfig, "components.div.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewValidityPeriod.visible", validTo);

            //Fetch Bill and populate estimate card
            // const code = get(
            //   payload,
            //   "Licenses[0].tradeLicenseDetail.address.locality.code"
            // );
            // const queryObj = [{ key: "tenantId", value: tenantId }];
            // // getBoundaryData(action, state, dispatch, queryObj, code);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchResults(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var beforeInitFn = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, applicationNumber) {
    var tradeType, businessService, queryObject, _status, data, obj, footer, status;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!applicationNumber) {
              _context2.next = 31;
              break;
            }

            _context2.t0 = !(0, _commons.getQueryArg)(window.location.href, "edited");

            if (!_context2.t0) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return searchResults(action, state, dispatch, applicationNumber);

          case 5:

            // const status = getTransformedStatus(
            //   get(state, "screenConfiguration.preparedFinalObject.Licenses[0].status")
            // );

            // const subOwnerShipCategory = get(
            //   state.screenConfiguration.preparedFinalObject,
            //   "Licenses[0].tradeLicenseDetail.subOwnerShipCategory"
            // );
            // if (subOwnerShipCategory == "INDIVIDUAL") {
            //   set(
            //     action,
            //     "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOrganizationDetails.visible",
            //     false
            //   );
            // } else {
            //   set(
            //     action,
            //     "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOrganizationDetails.visible",
            //     true
            //   );
            // }

            tradeType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType");

            if (tradeType.split(".").length > 1) {
              if (tradeType.split(".")[0] == "ARCHITECT") (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo.visible", true);else (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo.visible", false);
              (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewLicenseeSubType.visible", true);
              dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.tradeUnits[0].tradeType", tradeType.split(".")[0]));
            } else {
              dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.tradeUnits[0].tradeType", tradeType));
              (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewLicenseeSubType.visible", false);
              (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo.visible", false);
            }
            businessService = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType").split(".")[0];
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: businessService }];


            (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);

            _status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].status");
            data = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
            obj = setStatusBasedValue(_status);

            if (!(0, _get2.default)(data, "Licenses[0].tradeLicenseDetail.applicationDocuments")) {
              _context2.next = 16;
              break;
            }

            _context2.next = 16;
            return (0, _commons.setDocuments)(data, "Licenses[0].tradeLicenseDetail.applicationDocuments", "LicensesTemp[0].reviewDocData", dispatch, 'BPA');

          case 16:
            if (!(_status === "APPROVED" || _status === "REJECTED" || _status === "CANCELLED")) {
              _context2.next = 26;
              break;
            }

            (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible", true);

            if (!(0, _get2.default)(data, "Licenses[0].tradeLicenseDetail.verificationDocuments")) {
              _context2.next = 23;
              break;
            }

            _context2.next = 21;
            return (0, _commons.setDocuments)(data, "Licenses[0].tradeLicenseDetail.verificationDocuments", "LicensesTemp[0].verifyDocData", dispatch, 'BPA');

          case 21:
            _context2.next = 24;
            break;

          case 23:
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl", "visible", false));

          case 24:
            _context2.next = 27;
            break;

          case 26:
            (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible", false);

          case 27:
            footer = (0, _footer.footerReview)(action, state, dispatch, _status, applicationNumber, tenantId);

            process.env.REACT_APP_NAME === "Citizen" ? (0, _set2.default)(action, "screenConfig.components.div.children.footer", footer) : (0, _set2.default)(action, "screenConfig.components.div.children.footer", {});

            setActionItems(action, obj);
            // loadReceiptGenerationData(applicationNumber, tenantId);
            (0, _utils2.addressDestruct)(action, state, dispatch);

          case 31:
            status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].status");


            (0, _footer.updateDownloadandPrintMenu)(action, state, dispatch, status);
            _context2.t1 = status;
            _context2.next = _context2.t1 === "PENDINGDOCVERIFICATION" ? 36 : _context2.t1 === "PENDINGAPPROVAL" ? 36 : _context2.t1 === "REJECTED" ? 36 : _context2.t1 === "APPROVED" ? 36 : 38;
            break;

          case 36:
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv", "visible", true));
            return _context2.abrupt("break", 39);

          case 38:
            return _context2.abrupt("break", 39);

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function beforeInitFn(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var titleText = "";

var setStatusBasedValue = function setStatusBasedValue(status) {
  switch (status) {
    case "approved":
      return {
        titleText: "Review the stakeholder License",
        titleKey: "BPA_REVIEW_LICENSE",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "pending_payment":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "TL_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_CEMP"]
        }
      };
    case "pending_approval":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "TL_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "cancelled":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
    case "rejected":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };

    default:
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
  }
};

var headerrow = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Stakeholder Registration Application",
    labelKey: "BPA_REG_APPLICATION"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
    componentPath: "ApplicationNoContainer",
    props: {
      number: applicationNumber
    }
  }
});

var estimate = (0, _utils.getCommonGrayCard)({
  estimateSection: (0, _utils2.getFeesEstimateCard)({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

// const reviewOrganizationDetails = getOrganizationDetails(false);

var reviewPermanentDetails = (0, _reviewLocation.getPermanentDetails)(false);
var reviewCommunicationDetails = (0, _reviewLocation.getCommunicactionDetails)(false);

var reviewOwnerDetails = (0, _reviewOwner.getReviewOwner)(false);
var reviewLicenseDetails = (0, _reviewLicense.getReviewLicenseDetails)(false);

var reviewDocumentDetails = (0, _reviewDocuments.getReviewDocuments)(false);

// let approvalDetails = getApprovalDetails(status);
var title = (0, _utils.getCommonTitle)({ labelName: titleText });

var setActionItems = function setActionItems(action, object) {
  (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title", (0, _utils.getCommonTitle)({
    labelName: (0, _get2.default)(object, "titleText"),
    labelKey: (0, _get2.default)(object, "titleKey")
  }));
  (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title.visible", (0, _get2.default)(object, "titleVisibility"));
  (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title.roleDefination", (0, _get2.default)(object, "roleDefination"));
};

var tradeReviewDetails = exports.tradeReviewDetails = (0, _utils.getCommonCard)({
  title: title,
  estimate: estimate,
  reviewLicenseDetails: reviewLicenseDetails,
  reviewOwnerDetails: reviewOwnerDetails,
  // reviewOrganizationDetails,
  reviewPermanentDetails: reviewPermanentDetails,
  reviewCommunicationDetails: reviewCommunicationDetails,
  reviewDocumentDetails: reviewDocumentDetails
});

var rightdiv = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  visible: false,
  props: {
    style: { textAlign: "right", display: "flex" }
  },
  children: {
    downloadMenu: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "MenuButton",
      props: {
        data: {
          label: { labelName: "DOWNLOAD", labelKey: "BPA_DOWNLOAD" },
          leftIcon: "cloud_download",
          rightIcon: "arrow_drop_down",
          props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-download-button" }
          // menu: downloadMenu
        }
      }
    },
    printMenu: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "MenuButton",
      props: {
        data: {
          label: { labelName: "PRINT", labelKey: "BPA_PRINT" },
          leftIcon: "print",
          rightIcon: "arrow_drop_down",
          props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" }
          // menu: printMenu
        }
      }
    }
  }
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    //To set the application no. at the  top
    (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.applicationNumber.props.number", applicationNumber);
    if (status !== "pending_payment") {
      (0, _set2.default)(action.screenConfig, "components.div.children.tradeReviewDetails.children.cardContent.children.viewBreakupButton.visible", false);
    }
    beforeInitFn(action, state, dispatch, applicationNumber);

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 8
              }
            }, headerrow),
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              },
              children: process.env.REACT_APP_NAME === "Employee" ? {
                rightdiv: rightdiv
              } : {
                word1: (0, _extends3.default)({}, (0, _utils.getCommonTitle)({
                  jsonPath: "Licenses[0].headerSideText.word1"
                }, {
                  style: {
                    marginRight: "10px",
                    color: "rgba(0, 0, 0, 0.6000000238418579)"
                  }
                })),
                word2: (0, _extends3.default)({}, (0, _utils.getCommonTitle)({
                  jsonPath: "Licenses[0].headerSideText.word2"
                })),
                rightdiv: rightdiv
              }
            }
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "Licenses",
            updateUrl: "/tl-services/v1/BPAREG/_update"
          }
        },
        tradeReviewDetails: tradeReviewDetails
        //footer
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "search-preview"
      }
    }
  }
};

exports.default = screenConfig;