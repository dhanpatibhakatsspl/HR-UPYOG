"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeSubmitHook = exports.tradeReviewDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _receiptTransformer = require("../utils/receiptTransformer");

var _footer = require("./applyResource/footer");

var _reviewDocuments = require("./applyResource/review-documents");

var _reviewOwner = require("./applyResource/review-owner");

var _reviewTrade = require("./applyResource/review-trade");

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
    var queryObject, payload, sts, businessService, businessServiceQueryObject, LicenseData, fetchFromReceipt;
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
            (0, _set2.default)(payload, "Licenses[0].assignee", []);
            (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") && (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(".")[0] === "INDIVIDUAL" ? (0, _utils2.setMultiOwnerForSV)(action, true) : (0, _utils2.setMultiOwnerForSV)(action, false);

            if ((0, _get2.default)(payload, "Licenses[0].licenseType")) {
              (0, _utils2.setValidToFromVisibilityForSV)(action, (0, _get2.default)(payload, "Licenses[0].licenseType"));
            }

            _context.next = 11;
            return (0, _commons.setDocuments)(payload, "Licenses[0].tradeLicenseDetail.applicationDocuments", "LicensesTemp[0].reviewDocData", dispatch, 'TL');

          case 11:
            sts = (0, _utils2.getTransformedStatus)((0, _get2.default)(payload, "Licenses[0].status"));

            payload && dispatch((0, _actions.prepareFinalObject)("Licenses[0]", payload.Licenses[0]));
            payload && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].oldOwners", [].concat((0, _toConsumableArray3.default)(payload.Licenses[0].tradeLicenseDetail.owners))));

            //set business service data

            businessService = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].workflowCode");
            businessServiceQueryObject = [{ key: "tenantId", value: tenantId }, {
              key: "businessServices",
              value: businessService ? businessService : "NewTL"
            }];
            _context.next = 18;
            return (0, _commons.setBusinessServiceDataToLocalStorage)(businessServiceQueryObject, dispatch);

          case 18:

            //set Trade Types

            payload && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeDetailsResponse", getTradeTypeSubtypeDetails(payload)));
            LicenseData = payload.Licenses[0];
            fetchFromReceipt = sts !== "pending_payment";

            // generate estimate data

            (0, _utils2.createEstimateData)(LicenseData, "LicensesTemp[0].estimateCardData", dispatch, {}, fetchFromReceipt);

          case 22:
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
    var licenseNumber, queryObjectSearch, payload, length, status, financialYear, data, obj, appDocuments, applicationDocs, removedDocs, businessService, mdmsBody, _payload, statusCont, printCont, CitizenprintCont, applicationType, _headerrow;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch((0, _actions.unMountScreen)("search"));
            dispatch((0, _actions.unMountScreen)("apply"));
            (0, _generatePDF.loadUlbLogo)(tenantId);

            //Search details for given application Number

            if (!applicationNumber) {
              _context2.next = 66;
              break;
            }

            _context2.t0 = !(0, _commons.getQueryArg)(window.location.href, "edited");

            if (!_context2.t0) {
              _context2.next = 8;
              break;
            }

            _context2.next = 8;
            return searchResults(action, state, dispatch, applicationNumber);

          case 8:

            //check for renewal flow
            licenseNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].licenseNumber");
            queryObjectSearch = [{
              key: "tenantId",
              value: tenantId
            }, { key: "offset", value: "0" }, { key: "licenseNumbers", value: licenseNumber }];
            _context2.next = 12;
            return (0, _commons2.getSearchResults)(queryObjectSearch);

          case 12:
            payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("AllLicences", (0, _get2.default)(payload, "Licenses", [])));
            length = payload && payload.Licenses.length > 0 ? (0, _get2.default)(payload, "Licenses", []).length : 0;

            dispatch((0, _actions.prepareFinalObject)("licenseCount", length));
            (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") && (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(".")[0] === "INDIVIDUAL" ? (0, _utils2.setMultiOwnerForSV)(action, true) : (0, _utils2.setMultiOwnerForSV)(action, false);
            status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].status");
            financialYear = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].financialYear");
            data = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
            obj = setStatusBasedValue(status);
            appDocuments = (0, _get2.default)(data, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);

            if (!appDocuments) {
              _context2.next = 31;
              break;
            }

            applicationDocs = [];

            appDocuments.forEach(function (doc) {
              if (doc.length !== 0) {
                applicationDocs.push(doc);
              }
            });
            applicationDocs = applicationDocs.filter(function (document) {
              return document;
            });

            removedDocs = (0, _get2.default)(data, "LicensesTemp[0].removedDocs", []);

            if (removedDocs.length > 0) {
              removedDocs.map(function (removedDoc) {
                applicationDocs = applicationDocs.filter(function (appDocument) {
                  return !(appDocument.documentType === removedDoc.documentType && appDocument.fileStoreId === removedDoc.fileStoreId);
                });
              });
            }
            dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.applicationDocuments", applicationDocs));
            _context2.next = 31;
            return (0, _commons.setDocuments)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject"), "Licenses[0].tradeLicenseDetail.applicationDocuments", "LicensesTemp[0].reviewDocData", dispatch, 'TL');

          case 31:
            businessService = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].businessService");
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{ name: "uiCommonPay", filter: "[?(@.code==\"" + businessService + "\")]" }]
                }, {
                  moduleName: "TradeLicense",
                  masterDetails: [{ name: "TradeRenewal" }]
                }]
              }
            };
            _context2.prev = 33;
            _payload = null;
            _context2.next = 37;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 37:
            _payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("renewalPeriod", (0, _get2.default)(_payload.MdmsRes, "TradeLicense.TradeRenewal[0].renewalPeriod")));
            dispatch((0, _actions.prepareFinalObject)("uiCommonConfig", (0, _get2.default)(_payload.MdmsRes, "common-masters.uiCommonPay[0]")));
            _context2.next = 45;
            break;

          case 42:
            _context2.prev = 42;
            _context2.t1 = _context2["catch"](33);

            console.log(_context2.t1);

          case 45:
            statusCont = {
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
              cancelledLabel: (0, _extends3.default)({}, (0, _utils.getCommonHeader)({
                labelName: "Cancelled",
                labelKey: "TL_COMMON_STATUS_CANC"
              }, { variant: "body1", style: { color: "#E54D42" } }), {
                visible: false
              })
            };
            printCont = (0, _footer.downloadPrintContainer)(action, state, dispatch, status, applicationNumber, tenantId);
            CitizenprintCont = (0, _footer.footerReviewTop)(action, state, dispatch, status, applicationNumber, tenantId, financialYear);


            if (status !== "INITIATED") {
              process.env.REACT_APP_NAME === "Citizen" ? (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children", CitizenprintCont) : (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children", printCont);
            }

            // Get approval details based on status and set it in screenconfig

            if (!(status === "APPROVED" || status === "REJECTED" || status === "CANCELLED")) {
              _context2.next = 59;
              break;
            }

            (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible", true);

            if (!(0, _get2.default)(data, "Licenses[0].tradeLicenseDetail.verificationDocuments")) {
              _context2.next = 56;
              break;
            }

            _context2.next = 54;
            return (0, _commons.setDocuments)(data, "Licenses[0].tradeLicenseDetail.verificationDocuments", "LicensesTemp[0].verifyDocData", dispatch, 'TL');

          case 54:
            _context2.next = 57;
            break;

          case 56:
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl", "visible", false));

          case 57:
            _context2.next = 60;
            break;

          case 59:
            (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible", false);

          case 60:
            applicationType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].applicationType");
            _headerrow = (0, _utils.getCommonContainer)({
              header: (0, _utils.getCommonHeader)({
                labelName: "Trade License Application (2018-2019)",
                labelKey: applicationType === "RENEWAL" ? "TL_TRADE_RENEW_APPLICATION" : "TL_TRADE_APPLICATION"
              }),
              applicationLicence: (0, _utils.getCommonContainer)({
                applicationNumber: {
                  uiFramework: "custom-atoms-local",
                  moduleName: "egov-tradelicence",
                  componentPath: "ApplicationNoContainer",
                  props: {
                    number: applicationNumber
                  }
                },
                licenceNumber: {
                  uiFramework: "custom-atoms-local",
                  moduleName: "egov-tradelicence",
                  componentPath: "licenceNoContainer",
                  visible: licenseNumber ? true : false,
                  props: {
                    number: licenseNumber
                  }
                }
              })
            });

            (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.headertop", _headerrow);

            if (status === "cancelled") (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children.cancelledLabel.visible", true);
            setActionItems(action, obj);
            (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenantId);

          case 66:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[33, 42]]);
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
        titleText: "Review the Trade License",
        titleKey: "TL_REVIEW_TRADE_LICENSE",
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

var headerrow = (0, _utils.getCommonContainer)({});

var estimate = (0, _utils.getCommonGrayCard)({
  estimateSection: (0, _utils2.getFeesEstimateCard)({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

var reviewTradeDetails = (0, _reviewTrade.getReviewTrade)(false);

var reviewOwnerDetails = (0, _reviewOwner.getReviewOwner)(false);

var reviewDocumentDetails = (0, _reviewDocuments.getReviewDocuments)(false, false);

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
  viewBreakupButton: (0, _utils2.getDialogButton)("VIEW BREAKUP", "TL_PAYMENT_VIEW_BREAKUP", "search-preview"),
  reviewTradeDetails: reviewTradeDetails,
  reviewOwnerDetails: reviewOwnerDetails,
  reviewDocumentDetails: reviewDocumentDetails
});

var beforeSubmitHook = exports.beforeSubmitHook = function beforeSubmitHook() {
  var Licenses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];

  var state = _store2.default.getState();
  var oldOwners = JSON.parse(JSON.stringify((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.LicensesTemp[0].oldOwners", {})));
  Licenses && Array.isArray(Licenses) && Licenses.length > 0 && (0, _set2.default)(Licenses[0], "tradeLicenseDetail.owners", (0, _commons2.checkValidOwners)((0, _get2.default)(Licenses[0], "tradeLicenseDetail.owners", []), oldOwners));

  return Licenses;
};
var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    // dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    //To set the application no. at the  top
    (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.applicationNumber.props.number", applicationNumber);
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
              }
            }
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          // visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "Licenses",
            moduleName: "NewTL",
            updateUrl: "/tl-services/v1/_update",
            beforeSubmitHook: beforeSubmitHook
          }
        },
        // actionDialog: {
        //   uiFramework: "custom-containers-local",
        //   componentPath: "ResubmitActionContainer",
        //   moduleName: "egov-tradelicence",
        //   visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
        //   props: {
        //     open: true,
        //     dataPath: "Licenses",
        //     moduleName: "NewTL",
        //     updateUrl: "/tl-services/v1/_update",
        //     data: {
        //       buttonLabel: "RESUBMIT",
        //       moduleName: "NewTL",
        //       isLast: false,
        //       dialogHeader: {
        //         labelName: "RESUBMIT Application",
        //         labelKey: "WF_RESUBMIT_APPLICATION"
        //       },
        //       showEmployeeList: false,
        //       roles: "CITIZEN",
        //       isDocRequired: false
        //     }
        //   }
        // },
        tradeReviewDetails: tradeReviewDetails
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