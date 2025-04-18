"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeSubmitHook = exports.prepareDocumentsView = exports.downloadPrintContainer = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-common/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _generateNOCAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateNOCAcknowledgement");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _lodash = require("lodash");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons3 = require("../../../../ui-utils/commons");

var _index = require("../utils/index");

var _receiptPdf = require("../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

var _receiptTransformer = require("../utils/receiptTransformer");

require("./index.css");

var _applicantSummary = require("./summaryResource/applicantSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _nocSummary = require("./summaryResource/nocSummary");

var _propertySummary = require("./summaryResource/propertySummary");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titlebar = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Task Details",
    labelKey: "NOC_TASK_DETAILS_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-firenoc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons2.getQueryArg)(window.location.href, "applicationNumber")
    }
  }
});
var downloadPrintContainer = exports.downloadPrintContainer = function downloadPrintContainer(state, dispatch) {
  /** MenuButton data based on status */

  var preparedFinalObject = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {});
  var status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.status");
  var downloadMenu = [];
  var printMenu = [];
  var certificateDownloadObject = {
    label: { labelName: "NOC Certificate", labelKey: "NOC_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  var certificatePrintObject = {
    label: { labelName: "NOC Certificate", labelKey: "NOC_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "NOC_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails, "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.FireNOCs[0], "tenantId") }, { key: "businessService", value: 'FIRENOC' }];
      (0, _commons.download)(receiptQueryString, "download", "consolidatedreceipt", 'PAYMENT', state);
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "NOC_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails, "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.FireNOCs[0], "tenantId") }, { key: "businessService", value: 'FIRENOC' }];
      (0, _commons.download)(receiptQueryString, "print", "consolidatedreceipt", 'PAYMENT', state);
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: function link() {
      (0, _generateNOCAcknowledgement.generateNOCAcknowledgement)(preparedFinalObject, "noc-acknowledgement-" + (0, _get2.default)(preparedFinalObject, 'FireNOCs[0].fireNOCDetails.applicationNumber', ''));
      // generatePdf(state, dispatch, "application_download");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: function link() {
      (0, _generateNOCAcknowledgement.generateNOCAcknowledgement)(preparedFinalObject, 'print');
      // generatePdf(state, dispatch, "application_print");
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [certificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [certificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "DOCUMENTVERIFY":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "REJECTED":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-molecules",
          componentPath: "DownloadPrintButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "tl-download-button" },
              menu: downloadMenu
            }
          }
        },
        printMenu: {
          uiFramework: "custom-molecules",
          componentPath: "DownloadPrintButton",
          props: {
            data: {
              label: { labelName: "PRINT", labelKey: "TL_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
              menu: printMenu
            }
          }
        }

      }
      // gridDefination: {
      //   xs: 12,
      //   sm: 6
      // }
    }
  };
};
var prepareDocumentsView = exports.prepareDocumentsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, firenoc, buildingDocuments, applicantDocuments, otherDocuments, allDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];

            // Get all documents from response

            firenoc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0]", {});
            buildingDocuments = _jsonpath2.default.query(firenoc, "$.fireNOCDetails.buildings.*.applicationDocuments.*");
            applicantDocuments = _jsonpath2.default.query(firenoc, "$.fireNOCDetails.applicantDetails.additionalDetail.documents.*");
            otherDocuments = _jsonpath2.default.query(firenoc, "$.fireNOCDetails.additionalDetail.documents.*");
            allDocuments = [].concat((0, _toConsumableArray3.default)(buildingDocuments), (0, _toConsumableArray3.default)(applicantDocuments), (0, _toConsumableArray3.default)(otherDocuments));


            allDocuments.forEach(function (doc) {
              documentsPreview.push({
                title: (0, _commons2.getTransformedLocale)(doc.documentType),
                fileStoreId: doc.fileStoreId,
                linkText: "View"
              });
            });
            fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return (0, _commons2.getFileUrlFromAPI)(fileStoreIds);

          case 11:
            _context.t0 = _context.sent;
            _context.next = 15;
            break;

          case 14:
            _context.t0 = {};

          case 15:
            fileUrls = _context.t0;

            documentsPreview = documentsPreview.map(function (doc, index) {
              doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons2.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
              doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons2.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              return doc;
            });
            documentsPreview = (0, _lodash.uniqBy)(documentsPreview, "fileStoreId");
            dispatch((0, _actions.prepareFinalObject)("documentsPreview", documentsPreview));
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.additionalDetail.documents", documentsPreview));

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

var prepareUoms = function prepareUoms(state, dispatch) {
  var buildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings", []);
  buildings.forEach(function (building, index) {
    var uoms = (0, _get2.default)(building, "uoms", []);
    var uomsMap = {};
    uoms.forEach(function (uom) {
      uomsMap[uom.code] = uom.value;
    });
    dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap", uomsMap));

    // Display UOMS on search preview page
    uoms.forEach(function (item) {
      var labelElement = (0, _utils.getLabelWithValue)({
        labelName: item.code,
        labelKey: "NOC_PROPERTY_DETAILS_" + item.code + "_LABEL"
      }, {
        jsonPath: "FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap." + item.code,
        // callBack: checkValueForNA,
        callBack: function callBack(value) {
          if (value == 0 || value == '0') {
            return "0";
          } else if (value) {
            return value;
          } else {
            return _index.checkValueForNA;
          }
        }
      });

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children", item.code, labelElement));

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.items[" + index + "].item" + index + ".children.cardContent.children.propertyContainer.children", item.code, labelElement));
    });
  });
};

// const prepareDocumentsUploadRedux = (state, dispatch) => {
//   dispatch(prepareFinalObject("documentsUploadRedux", documentsUploadRedux));
// };

var setSearchResponse = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, applicationNumber, tenantId) {
    var edited, response, additionalDocuments, status, printCont;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            edited = (0, _commons2.getQueryArg)(window.location.href, "edited");

            if (!edited) {
              _context2.next = 5;
              break;
            }

            _context2.t0 = { FireNOCs: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'FireNOCs') };
            _context2.next = 8;
            break;

          case 5:
            _context2.next = 7;
            return (0, _commons3.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNumber", value: applicationNumber }]);

          case 7:
            _context2.t0 = _context2.sent;

          case 8:
            response = _context2.t0;

            // const response = sampleSingleSearch();

            if (response && response.FireNOCs.length && response.FireNOCs[0].fireNOCDetails && response.FireNOCs[0].fireNOCDetails.buildings && !edited) {
              response.FireNOCs[0].fireNOCDetails.buildings.reverse();
            }

            response.FireNOCs[0].fireNOCDetails.buildings.forEach(function (data) {
              var filterData = data.uoms.filter(function (uom) {
                return uom.active == true;
              });
              data.uoms = filterData;
            });

            if (!edited) {
              dispatch((0, _actions.prepareFinalObject)("fireNOCsDetailsTemp", (0, _cloneDeep2.default)(response.FireNOCs[0])));
            }

            (0, _set2.default)(response, 'FireNOCs[0].fireNOCDetails.additionalDetail.assignee[0]', '');
            (0, _set2.default)(response, 'FireNOCs[0].fireNOCDetails.additionalDetail.comment', '');
            (0, _set2.default)(response, 'FireNOCs[0].fireNOCDetails.additionalDetail.wfDocuments', []);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", (0, _get2.default)(response, "FireNOCs", [])));
            additionalDocuments = (0, _cloneDeep2.default)((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.additionalDetail.documents", []));

            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.additionalDetail.document", additionalDocuments));

            // Set Institution/Applicant info card visibility
            if ((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "").includes("INDIVIDUAL")) {
              (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible", true);
              (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible", false);
            } else {
              (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible", false);
              (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible", true);
            }

            _context2.next = 21;
            return prepareDocumentsView(state, dispatch);

          case 21:
            _context2.next = 23;
            return (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenantId);

          case 23:
            status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.status");
            printCont = downloadPrintContainer(state, dispatch);

            if (status !== "INITIATED") {

              (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children", printCont);
            }
            if (status) {
              (0, _index.generateBill)(dispatch, applicationNumber, tenantId, status);
            }
            _context2.next = 29;
            return prepareUoms(state, dispatch);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function setSearchResponse(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var beforeSubmitHook = exports.beforeSubmitHook = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var state, fireNocDetails, otherDocuments, allDocuments, fireNOCsDetailsTemp, oldBuildings, newBuildings;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state = _store2.default.getState();
            fireNocDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs", {});
            otherDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.additionalDetail.document", []);
            allDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.additionalDetail.documents", []);
            fireNOCsDetailsTemp = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.fireNOCsDetailsTemp", {});

            otherDocuments.forEach(function (data) {
              allDocuments.map(function (allData) {
                if (data.documentType && data.documentType.split('.').length == 2 && allData && allData.title.includes(data.documentType.split('.')[1]) && allData.fileStoreId != data.fileStoreId) {
                  data.fileStoreId = allData.fileStoreId;
                }
              });
            });
            fireNocDetails[0].fireNOCDetails.additionalDetail.documents = fireNocDetails[0].fireNOCDetails.additionalDetail.document;

            oldBuildings = fireNOCsDetailsTemp.fireNOCDetails.buildings || [];
            newBuildings = fireNocDetails[0].fireNOCDetails.buildings || [];


            newBuildings.map(function (newUom) {
              oldBuildings.map(function (oldUom) {
                if (newUom.id == oldUom.id) {
                  newUom.uoms.forEach(function (nwUM) {
                    oldUom.uoms.map(function (odUM) {
                      if (nwUM.code == odUM.code) nwUM.id = odUM.id;
                    });
                  });
                }
              });
            });

            fireNocDetails[0].fireNOCDetails.buildings = newBuildings;

            return _context3.abrupt("return", fireNocDetails);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function beforeSubmitHook() {
    return _ref3.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicationNumber");
    var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
    (0, _generatePDF.loadUlbLogo)(tenantId);
    var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "FIRENOC" }];
    (0, _commons2.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);

    setSearchResponse(action, state, dispatch, applicationNumber, tenantId);
    // Hide edit buttons
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumber.props.number", applicationNumber);
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
                sm: 8
              }
            }, titlebar),
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
          props: {
            dataPath: "FireNOCs",
            moduleName: "FIRENOC",
            updateUrl: "/firenoc-services/v1/_update",
            beforeSubmitHook: beforeSubmitHook
          }
        },
        body: (0, _utils.getCommonCard)({
          estimateSummary: _estimateSummary.estimateSummary,
          nocSummary: _nocSummary.nocSummary,
          propertySummary: _propertySummary.propertySummary,
          applicantSummary: _applicantSummary.applicantSummary,
          institutionSummary: _applicantSummary.institutionSummary,
          documentsSummary: _documentsSummary.documentsSummary
        }),
        citizenFooter: process.env.REACT_APP_NAME === "Citizen" ? {} : {}
      }
    }
  }
};

exports.default = screenConfig;