"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeSubmitHook = exports.ifUserRoleExists = undefined;

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

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

var _commons2 = require("../../../../ui-utils/commons");

require("../egov-bpa/applyResource/index.css");

require("../egov-bpa/applyResource/index.scss");

var _permitConditions = require("../egov-bpa/summaryResource/permitConditions");

var _permitListSummary = require("../egov-bpa/summaryResource/permitListSummary");

var _index = require("../utils/index");

var _citizenFooter = require("./searchResource/citizenFooter");

var _applicantSummary = require("./summaryResource/applicantSummary");

var _basicSummary = require("./summaryResource/basicSummary");

var _declarationSummary = require("./summaryResource/declarationSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _fieldinspectionSummary = require("./summaryResource/fieldinspectionSummary");

var _fieldSummary = require("./summaryResource/fieldSummary");

var _previewSummary = require("./summaryResource/previewSummary");

var _scrutinySummary = require("./summaryResource/scrutinySummary");

var _noc = require("./noc");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _commons3 = require("egov-ui-kit/utils/commons");

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
// import { loadPdfGenerationDataForBpa } from "../utils/receiptTransformerForBpa";


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
  // visible: false,
  props: {
    style: { textAlign: "right", display: "flex" }
  },
  children: {
    permitNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "PermitNumber",
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

var prepareDocumentsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, BPA, applicantDocuments, otherDocuments, allDocuments, fileStoreIds, fileUrls, documentDetailsPreview, nocDocumentsPreview;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];

            // Get all documents from response

            BPA = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});
            applicantDocuments = _jsonpath2.default.query(BPA, "$.documents.*");
            otherDocuments = _jsonpath2.default.query(BPA, "$.additionalDetail.documents.*");
            allDocuments = [].concat((0, _toConsumableArray3.default)(applicantDocuments), (0, _toConsumableArray3.default)(otherDocuments));


            allDocuments.forEach(function (doc) {

              documentsPreview.push({
                title: (0, _commons.getTransformedLocale)(doc.documentType),
                //title: doc.documentType,
                fileStoreId: doc.fileStore,
                linkText: "View"
              });
            });
            fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 10:
            _context.t0 = _context.sent;
            _context.next = 14;
            break;

          case 13:
            _context.t0 = {};

          case 14:
            fileUrls = _context.t0;

            documentsPreview = documentsPreview.map(function (doc, index) {
              doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
              doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              return doc;
            });
            documentDetailsPreview = [], nocDocumentsPreview = [];

            documentsPreview.forEach(function (doc) {
              if (doc && doc.title) {
                var type = doc.title.split("_")[0];
                if (type === "NOC") {
                  nocDocumentsPreview.push(doc);
                } else {
                  documentDetailsPreview.push(doc);
                }
              }
            });
            dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", documentDetailsPreview));
            dispatch((0, _actions.prepareFinalObject)("nocDocumentsPreview", nocDocumentsPreview));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function prepareDocumentsView(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// const prepareDocumentsUploadRedux = (state, dispatch) => {
//   dispatch(prepareFinalObject("documentsUploadRedux", documentsUploadRedux));
// };

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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, applicationNumber, tenantId) {
    var status, riskType, service, downloadMenu, printMenu, appFeeDownloadObject, appFeePrintObject, sanFeeDownloadObject, sanFeePrintObject, permitOrderDownloadObject, permitOrderPrintObject, lowAppFeeDownloadObject, lowAppFeePrintObject, revocationPdfDownlaodObject, revocationPdfPrintObject, queryObject, paymentPayload, lowAppPaymentPayload, businessServicesList, fee, _lowAppPaymentPayload;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            /** MenuButton data based on status */
            status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.status");
            riskType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.riskType");
            service = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.businessService");
            downloadMenu = [];
            printMenu = [];
            appFeeDownloadObject = {
              label: { labelName: "Payment Receipt", labelKey: "BPA_APP_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_APP_FEE", "Download");
              },
              leftIcon: "book"
            };
            appFeePrintObject = {
              label: { labelName: "Payment Receipt", labelKey: "BPA_APP_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_APP_FEE", "Print");
              },
              leftIcon: "book"
            };
            sanFeeDownloadObject = {
              label: { labelName: "Sanction Fee Receipt", labelKey: "BPA_SAN_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_SAN_FEE", "Download");
              },
              leftIcon: "receipt"
            };
            sanFeePrintObject = {
              label: { labelName: "Sanction Fee Receipt", labelKey: "BPA_SAN_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.NC_SAN_FEE", "Print");
              },
              leftIcon: "receipt"
            };
            permitOrderDownloadObject = {
              label: { labelName: "Permit Order Receipt", labelKey: "BPA_PERMIT_ORDER" },
              link: function link() {
                (0, _index.permitOrderNoDownload)(action, state, dispatch, "Download");
              },
              leftIcon: "assignment"
            };
            permitOrderPrintObject = {
              label: { labelName: "Permit Order Receipt", labelKey: "BPA_PERMIT_ORDER" },
              link: function link() {
                (0, _index.permitOrderNoDownload)(action, state, dispatch, "Print");
              },
              leftIcon: "assignment"
            };
            lowAppFeeDownloadObject = {
              label: { labelName: "Fee Receipt", labelKey: "BPA_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.LOW_RISK_PERMIT_FEE", "Download");
              },
              leftIcon: "book"
            };
            lowAppFeePrintObject = {
              label: { labelName: "Fee Receipt", labelKey: "BPA_FEE_RECEIPT" },
              link: function link() {
                (0, _index.downloadFeeReceipt)(state, dispatch, status, "BPA.LOW_RISK_PERMIT_FEE", "Print");
              },
              leftIcon: "book"
            };
            revocationPdfDownlaodObject = {
              label: { labelName: "Revocation Letter", labelKey: "BPA_REVOCATION_PDF_LABEL" },
              link: function link() {
                (0, _index.revocationPdfDownload)(action, state, dispatch, "Download");
              },
              leftIcon: "assignment"
            };
            revocationPdfPrintObject = {
              label: { labelName: "Revocation Letter", labelKey: "BPA_REVOCATION_PDF_LABEL" },
              link: function link() {
                (0, _index.revocationPdfDownload)(action, state, dispatch, "Print");
              },
              leftIcon: "assignment"
            };
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }];
            paymentPayload = {};

            paymentPayload.Payments = [];

            if (!(riskType === "LOW")) {
              _context2.next = 25;
              break;
            }

            _context2.next = 21;
            return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)("BPA.LOW_RISK_PERMIT_FEE", true), "", queryObject);

          case 21:
            lowAppPaymentPayload = _context2.sent;

            if (lowAppPaymentPayload && lowAppPaymentPayload.Payments && lowAppPaymentPayload.Payments.length > 0) paymentPayload.Payments.push(lowAppPaymentPayload.Payments[0]);
            _context2.next = 35;
            break;

          case 25:
            businessServicesList = ["BPA.NC_APP_FEE", "BPA.NC_SAN_FEE"];
            fee = 0;

          case 27:
            if (!(fee < businessServicesList.length)) {
              _context2.next = 35;
              break;
            }

            _context2.next = 30;
            return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)(businessServicesList[fee], true), "", queryObject);

          case 30:
            _lowAppPaymentPayload = _context2.sent;

            if (_lowAppPaymentPayload && _lowAppPaymentPayload.Payments) paymentPayload.Payments.push(_lowAppPaymentPayload.Payments[0]);

          case 32:
            fee++;
            _context2.next = 27;
            break;

          case 35:
            if (!(riskType === "LOW")) {
              _context2.next = 55;
              break;
            }

            if (paymentPayload && paymentPayload.Payments.length == 1) {
              downloadMenu.push(lowAppFeeDownloadObject);
              printMenu.push(lowAppFeePrintObject);
            }
            _context2.t0 = status;
            _context2.next = _context2.t0 === "DOC_VERIFICATION_INPROGRESS" ? 40 : _context2.t0 === "FIELDINSPECTION_INPROGRESS" ? 40 : _context2.t0 === "NOC_VERIFICATION_INPROGRESS" ? 40 : _context2.t0 === "APPROVAL_INPROGRESS" ? 40 : _context2.t0 === "APPROVED" ? 40 : _context2.t0 === "PERMIT REVOCATION" ? 45 : 50;
            break;

          case 40:
            downloadMenu.push(permitOrderDownloadObject);
            printMenu.push(permitOrderDownloadObject);
            downloadMenu = downloadMenu;
            printMenu = printMenu;
            return _context2.abrupt("break", 53);

          case 45:
            downloadMenu.push(revocationPdfDownlaodObject);
            printMenu.push(revocationPdfPrintObject);
            downloadMenu = downloadMenu;
            printMenu = printMenu;
            return _context2.abrupt("break", 53);

          case 50:
            downloadMenu = [];
            printMenu = [];
            return _context2.abrupt("break", 53);

          case 53:
            _context2.next = 68;
            break;

          case 55:

            if (paymentPayload && paymentPayload.Payments.length == 1) {
              if ((0, _get2.default)(paymentPayload, "Payments[0].paymentDetails[0].businessService") === "BPA.NC_APP_FEE") {
                downloadMenu.push(appFeeDownloadObject);
                printMenu.push(appFeePrintObject);
              } else if ((0, _get2.default)(paymentPayload, "Payments[0].paymentDetails[0].businessService") === "BPA.NC_SAN_FEE") {
                downloadMenu.push(sanFeeDownloadObject);
                printMenu.push(sanFeePrintObject);
              }
            } else if (paymentPayload && paymentPayload.Payments.length == 2) {
              downloadMenu.push(appFeeDownloadObject);
              downloadMenu.push(sanFeeDownloadObject);
              printMenu.push(appFeePrintObject);
              printMenu.push(sanFeePrintObject);
            }
            _context2.t1 = status;
            _context2.next = _context2.t1 === "DOC_VERIFICATION_INPROGRESS" ? 59 : _context2.t1 === "FIELDINSPECTION_INPROGRESS" ? 59 : _context2.t1 === "NOC_VERIFICATION_INPROGRESS" ? 59 : _context2.t1 === "APPROVAL_INPROGRESS" ? 59 : _context2.t1 === "PENDING_SANC_FEE_PAYMENT" ? 59 : _context2.t1 === "REJECTED" ? 59 : _context2.t1 === "APPROVED" ? 62 : 65;
            break;

          case 59:
            downloadMenu = downloadMenu;
            printMenu = printMenu;
            return _context2.abrupt("break", 68);

          case 62:
            downloadMenu.push(permitOrderDownloadObject);
            printMenu.push(permitOrderPrintObject);
            return _context2.abrupt("break", 68);

          case 65:
            downloadMenu = [];
            printMenu = [];
            return _context2.abrupt("break", 68);

          case 68:
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.rightContainer.children.downloadMenu", "props.data.menu", downloadMenu));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.rightContainer.children.printMenu", "props.data.menu", printMenu));
            /** END */

          case 70:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function setDownloadMenu(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var stakeholerRoles = (0, _commons2.getStakeHolderRoles)();

var getRequiredMdmsDetails = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 3:
            payload = _context3.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getRequiredMdmsDetails(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var setSearchResponse = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch, applicationNumber, tenantId, action) {
    var response, payload, type, businessService, queryObject, edcrNumber, status, _businessService, edcrRes, isCitizen, userInfo, roles, isArchitect, _userInfo, _roles, owners, isTrue, isOwner;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getRequiredMdmsDetails(state, dispatch);

          case 2:
            _context4.next = 4;
            return (0, _commons2.getAppSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNo", value: applicationNumber }]);

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return (0, _commons2.getNocSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "sourceRefId", value: applicationNumber }], state);

          case 7:
            payload = _context4.sent;

            dispatch((0, _actions.prepareFinalObject)("Noc", payload.Noc));
            payload.Noc.sort(_index.compare);
            // await prepareNOCUploadData(state, dispatch);
            // prepareNocFinalCards(state, dispatch);

            type = (0, _commons.getQueryArg)(window.location.href, "type", "");


            if (!type) {
              businessService = (0, _get2.default)(response, "BPA[0].businessService");
              queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: businessService }];

              (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
            }

            edcrNumber = (0, _get2.default)(response, "BPA[0].edcrNumber");
            status = (0, _get2.default)(response, "BPA[0].status");

            dispatch((0, _actions.prepareFinalObject)("BPA", response.BPA[0]));
            if ((0, _get2.default)(response, "BPA[0].status") == "CITIZEN_APPROVAL_INPROCESS") {
              // TODO if required to show for architect before apply, 
              //this condition should extend to OR with status INPROGRESS
              _businessService = "BPA.NC_APP_FEE";

              if ((0, _get2.default)(response, "BPA[0].businessService") == "BPA_LOW") {
                _businessService = "BPA.LOW_RISK_PERMIT_FEE";
              }
              (0, _index.generateBillForBPA)(dispatch, applicationNumber, tenantId, _businessService);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.citizenFooter.children.sendToArch", "visible", true));
            }
            (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.estimateSummary.visible", (0, _get2.default)(response, "BPA[0].status") == "CITIZEN_APPROVAL_INPROCESS");
            _context4.next = 19;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + edcrNumber + "&tenantId=" + tenantId, "search", []);

          case 19:
            edcrRes = _context4.sent;


            dispatch((0, _actions.prepareFinalObject)("scrutinyDetails", edcrRes.edcrDetail[0]));

            _context4.next = 23;
            return (0, _index.edcrDetailsToBpaDetails)(state, dispatch);

          case 23:
            isCitizen = process.env.REACT_APP_NAME === "Citizen" ? true : false;


            if (status && status == "INPROGRESS") {
              userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)()), roles = (0, _get2.default)(userInfo, "roles"), isArchitect = false;

              if (roles && roles.length > 0) {
                roles.forEach(function (role) {
                  if (stakeholerRoles.includes(role.code)) {
                    isArchitect = true;
                  }
                });
              }
              if (isArchitect && isCitizen) {
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
                    //owner.uuid === userInfo.uuid
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
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarationSummary.children.headers", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.declarationSummary.children.header.children.body.children.citizen", "visible", true));
              }
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

            // Set Institution/Applicant info card visibility
            if ((0, _get2.default)(response, "BPA.landInfo.ownershipCategory", "").startsWith("INSTITUTION")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.applicantSummary", "visible", false));
            };

            (0, _index.setProposedBuildingData)(state, dispatch);

            if ((0, _get2.default)(response, "BPA[0].additionalDetails.validityDate")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header.children.rightContainerH.children.footNote", "props.number", (0, _utils.convertEpochToDate)((0, _get2.default)(response, "BPA[0].additionalDetails.validityDate"))));

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header.children.rightContainerH.children.footNote.visible", true));
            }

            dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", {}));
            (0, _index.requiredDocumentsData)(state, dispatch, action);
            _context4.next = 37;
            return setDownloadMenu(action, state, dispatch, applicationNumber, tenantId);

          case 37:
            sendToArchDownloadMenu(action, state, dispatch);
            dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), tenantId, tenantId));

          case 39:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function setSearchResponse(_x10, _x11, _x12, _x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();

var beforeSubmitHook = exports.beforeSubmitHook = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var state, bpaDetails, isNocTrue, Noc, nocDocuments, count, data, documents, response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            state = _store2.default.getState();
            bpaDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});
            isNocTrue = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.isNocTrue", false);

            if (isNocTrue) {
              _context5.next = 25;
              break;
            }

            Noc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", []);
            nocDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocFinalCardsforPreview", []);

            if (!(Noc.length > 0)) {
              _context5.next = 23;
              break;
            }

            count = 0;
            data = 0;

          case 9:
            if (!(data < Noc.length)) {
              _context5.next = 23;
              break;
            }

            documents = (0, _get2.default)(nocDocuments[data], "documents", null);

            (0, _set2.default)(Noc[data], "documents", documents);
            _context5.next = 14;
            return (0, _api.httpRequest)("post", "/noc-services/v1/noc/_update", "", [], { Noc: Noc[data] });

          case 14:
            response = _context5.sent;

            if (!((0, _get2.default)(response, "ResponseInfo.status") == "successful")) {
              _context5.next = 20;
              break;
            }

            count++;

            if (!(Noc.length == count)) {
              _context5.next = 20;
              break;
            }

            _store2.default.dispatch((0, _actions.prepareFinalObject)("BPA.isNocTrue", true));
            return _context5.abrupt("return", bpaDetails);

          case 20:
            data++;
            _context5.next = 9;
            break;

          case 23:
            _context5.next = 26;
            break;

          case 25:
            return _context5.abrupt("return", bpaDetails);

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function beforeSubmitHook() {
    return _ref5.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var type = (0, _commons.getQueryArg)(window.location.href, "type", "");
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var businessServicesValue = "BPA";
    if (type) {
      if (type === "LOW") {
        businessServicesValue = "BPA_LOW";
      }
      var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: businessServicesValue }];
      (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    }

    setSearchResponse(state, dispatch, applicationNumber, tenantId, action);

    // Hide edit buttons

    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.previewSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.basicSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.scrutinySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.plotAndBoundaryInfoSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.uploadedNocDocumentDetailsCard.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.fieldSummary.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.fieldinspectionSummary.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.permitConditions.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.permitListSummary.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.declarationSummary.children.headers.visible", false);
    (0, _set2.default)(action, "components.div.children.body.children.cardContent.children.nocDetailsApply.visible", false);
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
            moduleName: "BPA",
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
          fieldSummary: _fieldSummary.fieldSummary,
          fieldinspectionSummary: _fieldinspectionSummary.fieldinspectionSummary,
          basicSummary: _basicSummary.basicSummary,
          scrutinySummary: _scrutinySummary.scrutinySummary,
          applicantSummary: _applicantSummary.applicantSummary,
          previewSummary: _previewSummary.previewSummary,
          nocDetailsApply: _noc.nocDetailsSearch,
          declarationSummary: _declarationSummary.declarationSummary,
          permitConditions: _permitConditions.permitConditions,
          permitListSummary: _permitListSummary.permitListSummary
        }),
        citizenFooter: process.env.REACT_APP_NAME === "Citizen" ? _citizenFooter.citizenFooter : {}
      }
    }
  }
};

exports.default = screenConfig;