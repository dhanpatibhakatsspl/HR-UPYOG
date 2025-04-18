"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeSubmitHook = exports.ifUserRoleExists = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

var _commons3 = require("../../../../ui-utils/commons");

require("../egov-bpa/applyResource/index.css");

require("../egov-bpa/applyResource/index.scss");

var _estimateSummary = require("../egov-bpa/summaryResource/estimateSummary");

var _index = require("../utils/index");

var _citizenFooter = require("./searchResource/citizenFooter");

var _declarations = require("./summaryResource/declarations");

var _documentAndNocSummary = require("./summaryResource/documentAndNocSummary");

var _fieldinspectionSummary = require("./summaryResource/fieldinspectionSummary");

var _fieldSummary = require("./summaryResource/fieldSummary");

var _permitConditions = require("./summaryResource/permitConditions");

var _permitListSummary = require("./summaryResource/permitListSummary");

var _scrutinySummary = require("./summaryResource/scrutinySummary");

var _noc = require("../egov-bpa/noc");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifUserRoleExists = exports.ifUserRoleExists = function ifUserRoleExists(role) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var roles = (0, _get2.default)(userInfo, "roles");
  var roleCodes = roles ? roles.map(function (role) {
    return role.code;
  }) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

var titlebar = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    leftContainerH: (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "Application details",
        labelKey: "BPA_TASK_DETAILS_HEADER"
      }),
      applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "ApplicationNoContainer",
        props: {
          number: "NA"
        }
      }
    }),
    rightContainerH: (0, _utils.getCommonContainer)({
      footNote: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "NoteAtom",
        props: {
          number: "NA"
        },
        visible: false
      }
    })
  }
};

var titlebar2 = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  props: {
    style: { textAlign: "right", display: "flex" }
  },
  children: {
    permitNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "ocPermitNumber",
      gridDefination: {},
      props: {
        number: "NA"
      }
    },
    rightContainer: (0, _utils.getCommonContainer)({
      downloadMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "DOWNLOAD", labelKey: "BPA_DOWNLOAD" },
            leftIcon: "cloud_download",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: 10 }, className: "tl-download-button" },
            menu: []
          }
        }
      },
      printMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "PRINT", labelKey: "BPA_PRINT" },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-download-button" },
            menu: []
          }
        }
      }
    })
  }
};
var sendToArchDownloadMenu = function sendToArchDownloadMenu(action, state, dispatch) {
  var downloadMenu = [];
  var sendToArchObject = {
    label: { labelName: "SEND TO ARCHITECT", labelKey: "BPA_SEND_TO_ARCHITECT_BUTTON" },
    link: function link() {
      (0, _citizenFooter.updateBpaApplication)(state, dispatch, "SEND_TO_ARCHITECT");
    }
  };
  var ApproveObject = {
    label: { labelName: "Approve", labelKey: "BPA_APPROVE_BUTTON" },
    link: function link() {
      (0, _citizenFooter.updateBpaApplication)(state, dispatch, "APPROVE");
    }
  };
  downloadMenu = [sendToArchObject, ApproveObject];
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.citizenFooter.children.sendToArch.children.buttons.children.downloadMenu", "props.data.menu", downloadMenu));
};
var setDownloadMenu = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, applicationNumber, tenantId) {
    var status, comparisonDetails, comparisonReport, downloadMenu, printMenu, appFeeDownloadObject, appFeePrintObject, sanFeeDownloadObject, sanFeePrintObject, occupancyCertificateDownloadObject, occupancyCertificatePrintObject, comparisonReportDownloadObject, comparisonReportPrintObject, queryObject, paymentPayload, businessServicesList, fee, lowAppPaymentPayload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /** MenuButton data based on status */
            status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.status");
            comparisonDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.comparisonDetails");
            comparisonReport = false;

            if (comparisonDetails) {
              comparisonReport = (0, _get2.default)(comparisonDetails, "report");
            }
            downloadMenu = [];
            printMenu = [];
            appFeeDownloadObject = {
              label: { labelName: "Payment Receipt", labelKey: "BPA_APP_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_OC_APP_FEE", "Download");
              },
              leftIcon: "book"
            };
            appFeePrintObject = {
              label: { labelName: "Payment Receipt", labelKey: "BPA_APP_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_OC_APP_FEE", "Print");
              },
              leftIcon: "book"
            };
            sanFeeDownloadObject = {
              label: { labelName: "Deviation Penality Receipt", labelKey: "BPA_OC_DEV_PEN_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_OC_SAN_FEE", "Download");
              },
              leftIcon: "receipt"
            };
            sanFeePrintObject = {
              label: { labelName: "Deviation Penality Receipt", labelKey: "BPA_OC_DEV_PEN_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_OC_SAN_FEE", "Print");
              },
              leftIcon: "receipt"
            };
            occupancyCertificateDownloadObject = {
              label: { labelName: "Occupancy Certificate", labelKey: "BPA_OC_CERTIFICATE" },
              link: function link() {
                (0, _index.permitOrderNoDownload)(action, state, dispatch, "Download");
              },
              leftIcon: "assignment"
            };
            occupancyCertificatePrintObject = {
              label: { labelName: "Occupancy Certificate", labelKey: "BPA_OC_CERTIFICATE" },
              link: function link() {
                (0, _index.permitOrderNoDownload)(action, state, dispatch, "Print");
              },
              leftIcon: "receipt"
            };
            comparisonReportDownloadObject = {};
            comparisonReportPrintObject = {};

            if (comparisonReport) {
              comparisonReportDownloadObject = {
                label: { labelName: "Comparison Report", labelKey: "BPA_COMPARISON_REPORT_LABEL" },
                link: function link() {
                  window.open(comparisonReport);
                },
                leftIcon: "assignment"
              };
              comparisonReportPrintObject = {
                label: { labelName: "Comparison Report", labelKey: "BPA_COMPARISON_REPORT_LABEL" },
                link: function link() {
                  var comparisonReports = void 0;
                  if (!comparisonReport.includes("https") && window.location.href.includes("https")) {
                    comparisonReports = comparisonReport.replace(/http/g, "https");
                  }
                  var downloadLink = comparisonReports ? comparisonReports : comparisonReport;
                  (0, _commons2.printPdf)(downloadLink);
                },
                leftIcon: "assignment"
              };
            }

            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }];
            paymentPayload = {};

            paymentPayload.Payments = [];
            businessServicesList = ["BPA.NC_OC_APP_FEE", "BPA.NC_OC_SAN_FEE"];
            fee = 0;

          case 20:
            if (!(fee < businessServicesList.length)) {
              _context.next = 28;
              break;
            }

            _context.next = 23;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessServicesList[fee], true), "", queryObject);

          case 23:
            lowAppPaymentPayload = _context.sent;

            if (lowAppPaymentPayload && lowAppPaymentPayload.Payments && lowAppPaymentPayload.Payments.length > 0) paymentPayload.Payments.push(lowAppPaymentPayload.Payments[0]);

          case 25:
            fee++;
            _context.next = 20;
            break;

          case 28:

            if (paymentPayload && paymentPayload.Payments.length == 1) {
              if ((0, _get2.default)(paymentPayload, "Payments[0].paymentDetails[0].businessService") === "BPA.NC_OC_APP_FEE") {
                downloadMenu.push(appFeeDownloadObject);
                printMenu.push(appFeePrintObject);
              } else if ((0, _get2.default)(paymentPayload, "Payments[0].paymentDetails[0].businessService") === "BPA.NC_OC_SAN_FEE") {
                downloadMenu.push(sanFeeDownloadObject);
                printMenu.push(sanFeePrintObject);
              }
            } else if (paymentPayload && paymentPayload.Payments.length == 2) {
              downloadMenu.push(appFeeDownloadObject);
              downloadMenu.push(sanFeeDownloadObject);
              printMenu.push(appFeePrintObject);
              printMenu.push(sanFeePrintObject);
            }

            _context.t0 = status;
            _context.next = _context.t0 === "APPROVED" ? 32 : _context.t0 === "DOC_VERIFICATION_INPROGRESS" ? 35 : _context.t0 === "FIELDINSPECTION_INPROGRESS" ? 35 : _context.t0 === "NOC_VERIFICATION_INPROGRESS" ? 35 : _context.t0 === "APPROVAL_INPROGRESS" ? 35 : _context.t0 === "PENDING_SANC_FEE_PAYMENT" ? 35 : _context.t0 === "PENDINGAPPROVAL" ? 35 : _context.t0 === "REJECTED" ? 35 : 38;
            break;

          case 32:
            downloadMenu.push(occupancyCertificateDownloadObject);
            printMenu.push(occupancyCertificatePrintObject);
            return _context.abrupt("break", 41);

          case 35:
            downloadMenu = downloadMenu;
            printMenu = printMenu;
            return _context.abrupt("break", 41);

          case 38:
            downloadMenu = [];
            printMenu = [];
            return _context.abrupt("break", 41);

          case 41:

            if (comparisonReport) {
              downloadMenu.push(comparisonReportDownloadObject);
              printMenu.push(comparisonReportPrintObject);
            }
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.rightContainer.children.downloadMenu", "props.data.menu", downloadMenu));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.rightContainer.children.printMenu", "props.data.menu", printMenu));
            /** END */

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setDownloadMenu(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var stakeholerRoles = (0, _commons3.getStakeHolderRoles)();

var getRequiredMdmsDetails = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "DocumentType"
                  }]
                }, {
                  moduleName: "BPA",
                  masterDetails: [{
                    name: "DocTypeMapping"
                  }, {
                    name: "CheckList"
                  }, {
                    name: "RiskTypeComputation"
                  }]
                }, {
                  moduleName: "NOC",
                  masterDetails: [{
                    name: "DocumentTypeMapping"
                  }]
                }]
              }
            };
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 3:
            payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRequiredMdmsDetails(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var setSearchResponse = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, applicationNumber, tenantId, action) {
    var isCitizen, response, payload, edcrNumber, status, edcrRes, userInfo, roles, isArchitect, _userInfo, _roles, owners, isTrue, isOwner;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isCitizen = process.env.REACT_APP_NAME === "Citizen" ? true : false;
            _context3.next = 3;
            return getRequiredMdmsDetails(state, dispatch);

          case 3:
            _context3.next = 5;
            return (0, _commons3.getAppSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNo", value: applicationNumber }]);

          case 5:
            response = _context3.sent;
            _context3.next = 8;
            return (0, _commons3.getNocSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "sourceRefId", value: applicationNumber }], state);

          case 8:
            payload = _context3.sent;

            dispatch((0, _actions.prepareFinalObject)("Noc", payload.Noc));
            payload.Noc.sort(_index.compare);
            // await prepareNOCUploadData(state, dispatch);
            // prepareNocFinalCards(state, dispatch);

            edcrNumber = (0, _get2.default)(response, "BPA[0].edcrNumber");
            status = (0, _get2.default)(response, "BPA[0].status");

            dispatch((0, _actions.prepareFinalObject)("BPA", response.BPA[0]));
            if ((0, _get2.default)(response, "BPA[0].status") == "CITIZEN_APPROVAL_INPROCESS") {
              // TODO if required to show for architect before apply, 
              //this condition should extend to OR with status INPROGRESS
              (0, _index.generateBillForBPA)(dispatch, applicationNumber, tenantId, "BPA.NC_OC_APP_FEE");
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.citizenFooter.children.sendToArch", "visible", true));
            }
            (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.estimateSummary.visible", (0, _get2.default)(response, "BPA[0].status") == "CITIZEN_APPROVAL_INPROCESS");
            _context3.next = 18;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + edcrNumber + "&tenantId=" + tenantId, "search", []);

          case 18:
            edcrRes = _context3.sent;


            dispatch((0, _actions.prepareFinalObject)("ocScrutinyDetails", edcrRes.edcrDetail[0]));
            _context3.next = 22;
            return (0, _index.edcrDetailsToBpaDetails)(state, dispatch);

          case 22:
            _context3.next = 24;
            return (0, _index.applicantNameAppliedByMaping)(state, dispatch, (0, _get2.default)(response, "BPA[0]"), (0, _get2.default)(edcrRes, "edcrDetail[0]"));

          case 24:
            _context3.next = 26;
            return (0, _index.setProposedBuildingData)(state, dispatch, "ocApply", "ocApply");

          case 26:

            // let businessServicesValue = "BPA_OC";
            // const queryObject = [
            //   { key: "tenantId", value: tenantId },
            //   { key: "businessServices", value: businessServicesValue }
            // ];
            // setBusinessServiceDataToLocalStorage(queryObject, dispatch);

            if (status && status == "INPROGRESS") {
              userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)()), roles = (0, _get2.default)(userInfo, "roles"), isArchitect = false;

              if (roles && roles.length > 0) {
                roles.forEach(function (role) {
                  if (stakeholerRoles.includes(role.code)) {
                    isArchitect = true;
                  }
                });
              }
              if (isArchitect) {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarationSummary.children.headers", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarationSummary.children.header.children.body.children.firstStakeholder", "visible", true));
              }
            }

            if (status && status === "CITIZEN_APPROVAL_INPROCESS" && isCitizen) {
              _userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)()), _roles = (0, _get2.default)(_userInfo, "roles"), owners = (0, _get2.default)(response.BPA["0"].landInfo, "owners"), isTrue = false, isOwner = true;

              if (_roles && _roles.length > 0) {
                _roles.forEach(function (role) {
                  if (stakeholerRoles.includes(role.code)) {
                    isTrue = true;
                  }
                });
              }

              if (isTrue && owners && owners.length > 0) {
                owners.forEach(function (owner) {
                  if (owner.mobileNumber === _userInfo.mobileNumber) {
                    if (owner.roles && owner.roles.length > 0) {
                      owner.roles.forEach(function (owrRole) {
                        if (stakeholerRoles.includes(owrRole.code)) {
                          isOwner = false;
                        }
                      });
                    }
                  }
                });
              }
              if (isTrue && isOwner) {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.citizenFooter", "visible", false));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarations.children.headers", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarations.children.header.children.body.children.citizenApproval", "visible", true));
              }
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarations.children.headers", "visible", false));
            }

            if (response && response.BPA["0"] && response.BPA["0"].documents) {
              dispatch((0, _actions.prepareFinalObject)("documentsTemp", response.BPA["0"].documents));
            }

            if (response && (0, _get2.default)(response, "BPA[0].approvalNo")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.permitNumber", "props.number", (0, _get2.default)(response, "BPA[0].approvalNo")));
            } else {

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.permitNumber", "visible", false));
            }

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header.children.leftContainerH.children.applicationNumber", "props.number", applicationNumber));

            // if (get(response, "Bpa[0].additionalDetails.validityDate")) {
            //   dispatch(
            //     handleField(
            //       "search-preview",
            //       "components.div.children.headerDiv.children.header.children.rightContainerH.children.footNote",
            //       "props.number",
            //       convertEpochToDate(get(response, "Bpa[0].additionalDetails.validityDate"))
            //     )
            //   );

            //   dispatch(
            //     handleField(
            //       "search-preview",
            //       "components.div.children.headerDiv.children.header.children.rightContainerH.children.footNote.visible",
            //       true
            //     )
            //   );
            // }

            dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", {}));
            (0, _index.requiredDocumentsData)(state, dispatch, action);
            _context3.next = 35;
            return setDownloadMenu(action, state, dispatch, applicationNumber, tenantId);

          case 35:
            sendToArchDownloadMenu(action, state, dispatch);
            dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), tenantId, tenantId));

          case 37:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setSearchResponse(_x8, _x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var beforeSubmitHook = exports.beforeSubmitHook = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var state, bpaDetails, isNocTrue, Noc, nocDocuments, count, data, documents, response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            state = _store2.default.getState();
            bpaDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});
            isNocTrue = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.isNocTrue", false);

            if (isNocTrue) {
              _context4.next = 25;
              break;
            }

            Noc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", []);
            nocDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocFinalCardsforPreview", []);

            if (!(Noc.length > 0)) {
              _context4.next = 23;
              break;
            }

            count = 0;
            data = 0;

          case 9:
            if (!(data < Noc.length)) {
              _context4.next = 23;
              break;
            }

            documents = (0, _get2.default)(nocDocuments[data], "documents", null);

            (0, _set2.default)(Noc[data], "documents", documents);
            _context4.next = 14;
            return (0, _api.httpRequest)("post", "/noc-services/v1/noc/_update", "", [], { Noc: Noc[data] });

          case 14:
            response = _context4.sent;

            if (!((0, _get2.default)(response, "ResponseInfo.status") == "successful")) {
              _context4.next = 20;
              break;
            }

            count++;

            if (!(Noc.length == count)) {
              _context4.next = 20;
              break;
            }

            _store2.default.dispatch((0, _actions.prepareFinalObject)("BPA.isNocTrue", true));
            return _context4.abrupt("return", bpaDetails);

          case 20:
            data++;
            _context4.next = 9;
            break;

          case 23:
            _context4.next = 26;
            break;

          case 25:
            return _context4.abrupt("return", bpaDetails);

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function beforeSubmitHook() {
    return _ref4.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var businessServicesValue = "BPA_OC";
    var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: businessServicesValue }];
    (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    setSearchResponse(state, dispatch, applicationNumber, tenantId, action);

    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.scrutinySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.documentAndNocSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.fieldSummary.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.fieldinspectionSummary.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.permitConditions.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.permitListSummary.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.declarations.children.headers.visible", false);

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css bpa-searchpview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6,
                md: 6
              }
            }, titlebar),
            header2: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 6,
                md: 6,
                align: "right"
              },
              children: {
                titlebar2: titlebar2
              }
            }
          }
        },

        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: true,
          props: {
            dataPath: "BPA",
            moduleName: "BPA_OC",
            updateUrl: "/bpa-services/v1/bpa/_update",
            beforeSubmitHook: beforeSubmitHook
          }
        },
        sendToArchPickerDialog: {
          componentPath: "Dialog",
          props: {
            open: false,
            maxWidth: "md"
          },
          children: {
            dialogContent: {
              componentPath: "DialogContent",
              props: {
                classes: {
                  root: "city-picker-dialog-style"
                }
              },
              children: {
                popup: (0, _utils.getCommonContainer)({
                  header: (0, _utils.getCommonHeader)({
                    labelName: "Forward Application",
                    labelKey: "BPA_FORWARD_APPLICATION_HEADER"
                  }),
                  cityPicker: (0, _utils.getCommonContainer)({
                    cityDropdown: {
                      uiFramework: "custom-molecules-local",
                      moduleName: "egov-bpa",
                      componentPath: "ActionDialog",
                      required: true,
                      gridDefination: {
                        xs: 12,
                        sm: 12
                      },
                      props: {}
                    }
                  })
                })
              }
            }
          }
        },
        body: (0, _utils.getCommonCard)({
          estimateSummary: _estimateSummary.estimateSummary,
          fieldinspectionSummary: _fieldinspectionSummary.fieldinspectionSummary,
          fieldSummary: _fieldSummary.fieldSummary,
          scrutinySummary: _scrutinySummary.scrutinySummary,
          documentAndNocSummary: _documentAndNocSummary.documentAndNocSummary,
          nocDetailsApply: _noc.nocDetailsSearch,
          permitConditions: _permitConditions.permitConditions,
          permitListSummary: _permitListSummary.permitListSummary,
          declarations: _declarations.declarations
        }),
        citizenFooter: process.env.REACT_APP_NAME === "Citizen" ? _citizenFooter.citizenFooter : {}
      }
    }
  }
};

exports.default = screenConfig;