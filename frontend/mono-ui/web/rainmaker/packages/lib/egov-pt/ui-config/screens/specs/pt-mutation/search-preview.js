"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _generatePTMAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generatePTMAcknowledgement");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _index = require("../utils/index");

var _receiptTransformer = require("../utils/receiptTransformer");

var _mutationSummary = require("./applyResourceMutation/mutationSummary");

var _functions = require("./functions");

var _transfereeSummary = require("./searchPreviewResource/transfereeSummary");

var _transferorSummary = require("./searchPreviewResource/transferorSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _propertySummary = require("./summaryResource/propertySummary");

var _registrationSummary = require("./summaryResource/registrationSummary");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titlebar = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application Details",
    labelKey: "PT_MUTATION_APPLICATION_DETAILS"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber"),
      label: {
        labelValue: "Application No.",
        labelKey: "PT_MUTATION_APPLICATION_NO"
      }
    }
  }
});

var setDownloadMenu = function setDownloadMenu(state, dispatch, tenantId, applicationNumber) {
  /** MenuButton data based on status */
  var status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property.status");
  var downloadMenu = [];
  var printMenu = [];
  var certificateDownloadObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: function link() {
      (0, _index.downloadCertificateForm)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Properties"), "ptmutationcertificate", tenantId, applicationNumber);
    },
    leftIcon: "book"
  };
  var certificatePrintObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: function link() {
      (0, _index.downloadCertificateForm)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Properties"), "ptmutationcertificate", tenantId, applicationNumber, 'print');
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: function link() {
      (0, _index.downloadReceitForm)(tenantId, applicationNumber, "download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: function link() {
      (0, _index.downloadReceitForm)(tenantId, applicationNumber, 'print');
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: function link() {
      (0, _generatePTMAcknowledgement.generatePTMAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "mutation-acknowledgement-" + applicationNumber + ".pdf");
      // generatePdfFromDiv("download", applicationNumber, "#material-ui-cardContent")
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: function link() {
      (0, _generatePTMAcknowledgement.generatePTMAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), 'print');
      // generatePdfFromDiv("print", applicationNumber, "#material-ui-cardContent")
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "ACTIVE":
      downloadMenu = [certificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [certificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "INWORKFLOW":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.downloadMenu", "props.data.menu", downloadMenu));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.printMenu", "props.data.menu", printMenu));
  /** END */
};

var setSearchResponse = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, applicationNumber, tenantId) {
    var response, properties, propertyId, auditResponse, property, workflow, ownersTemp, owners, transfereeOwners, transferorOwners, transfereeOwnersDid, transferorOwnersDid, propertiesAudit, propertyIndex, previousActiveProperty;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "acknowledgementIds", value: applicationNumber }]);

          case 2:
            response = _context.sent;
            properties = (0, _get2.default)(response, "Properties", []);
            propertyId = (0, _get2.default)(response, "Properties[0].propertyId", []);
            _context.next = 7;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "propertyIds", value: propertyId }, {
              key: "audit",
              value: true
            }]);

          case 7:
            auditResponse = _context.sent;
            property = properties && properties.length > 0 && properties[0] || {};


            if (!property.workflow) {
              workflow = {
                id: null,
                tenantId: (0, _commons.getQueryArg)(window.location.href, "tenantId"),
                businessService: "PT.MUTATION",
                businessId: (0, _commons.getQueryArg)(window.location.href, "applicationNumber"),
                action: "",
                moduleName: "PT",
                state: null,
                comment: null,
                documents: null,
                assignes: null
              };

              property.workflow = workflow;
            }

            if (property && property.owners && property.owners.length > 0) {
              ownersTemp = [];
              owners = [];

              property.owners.map(function (owner) {
                owner.documentUid = owner.documents ? owner.documents[0].documentUid : "NA";
                owner.documentType = owner.documents ? owner.documents[0].documentType : "NA";
                if (owner.status == "ACTIVE") {

                  ownersTemp.push(owner);
                } else {
                  owners.push(owner);
                }
              });

              property.ownersInit = owners;
              property.ownersTemp = ownersTemp;
            }
            property.ownershipCategoryTemp = property.ownershipCategory;
            property.ownershipCategoryInit = 'NA';
            // Set Institution/Applicant info card visibility
            if ((0, _get2.default)(response, "Properties[0].ownershipCategory", "").startsWith("INSTITUTION")) {
              property.institutionTemp = property.institution;

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transfereeSummary", "visible", false));
            } else {

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transfereeInstitutionSummary", "visible", false));
            }

            transfereeOwners = (0, _get2.default)(property, "ownersTemp", []);
            transferorOwners = (0, _get2.default)(property, "ownersInit", []);
            transfereeOwnersDid = true;
            transferorOwnersDid = true;

            transfereeOwners.map(function (owner) {
              if (owner.ownerType != 'NONE') {
                transfereeOwnersDid = false;
              }
            });
            transferorOwners.map(function (owner) {
              if (owner.ownerType != 'NONE') {
                transferorOwnersDid = false;
              }
            });
            if (transferorOwnersDid) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType", "props.style.display", 'none'));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID", "props.style.display", 'none'));
            }
            if (transfereeOwnersDid) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerDocumentId", "props.style.display", 'none'));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType", "props.style.display", 'none'));
            }

            if (auditResponse && Array.isArray((0, _get2.default)(auditResponse, "Properties", [])) && (0, _get2.default)(auditResponse, "Properties", []).length > 0) {
              propertiesAudit = (0, _get2.default)(auditResponse, "Properties", []);
              propertyIndex = property.status == 'ACTIVE' ? 1 : 0;
              previousActiveProperty = propertiesAudit.filter(function (property) {
                return property.status == 'ACTIVE';
              }).sort(function (x, y) {
                return y.auditDetails.lastModifiedTime - x.auditDetails.lastModifiedTime;
              })[propertyIndex];


              property.ownershipCategoryInit = previousActiveProperty.ownershipCategory;
              property.ownersInit = previousActiveProperty.owners.filter(function (owner) {
                return owner.status == "ACTIVE";
              });

              if (property.ownershipCategoryInit.startsWith("INSTITUTION")) {
                property.institutionInit = previousActiveProperty.institution;

                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transferorSummary", "visible", false));
              } else {

                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.transferorInstitutionSummary", "visible", false));
              }
            }

            // auditResponse
            dispatch((0, _actions.prepareFinalObject)("Property", property));
            dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", property.documents));
            (0, _index.prepareDocumentsView)(state, dispatch);

            _context.next = 28;
            return (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenantId);

          case 28:
            setDownloadMenu(state, dispatch, tenantId, applicationNumber);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setSearchResponse(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var setData = exports.setData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, applicationNumber, tenantId) {
    var response, queryObj, responsePayments;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "acknowledgementIds", value: applicationNumber }]);

          case 2:
            response = _context2.sent;


            dispatch((0, _actions.prepareFinalObject)("Properties", (0, _get2.default)(response, "Properties", [])));
            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }, {
              key: "businessService",
              value: 'PT.MUTATION'
            }];
            _context2.next = 7;
            return (0, _index.getpayments)(queryObj);

          case 7:
            responsePayments = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("Payments", (0, _get2.default)(responsePayments, "Payments", [])));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function setData(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getPropertyConfigurationMDMSData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    var mdmsBody, payload, propertyConfiguation;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _formUtils.getCommonTenant)(),
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "PropertyConfiguration" }]
                }]
              }
            };
            _context3.prev = 1;
            payload = null;
            _context3.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context3.sent;
            propertyConfiguation = (0, _get2.default)(payload, "MdmsRes.PropertyTax.PropertyConfiguration");

            dispatch((0, _actions.prepareFinalObject)("PropertyConfiguration", propertyConfiguation));
            (0, _index.showHideMutationDetailsCard)(action, state, dispatch);
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);

            console.log(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 11]]);
  }));

  return function getPropertyConfigurationMDMSData(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    // dispatch(unMountScreen("propertySearch"));
    // dispatch(unMountScreen("apply"));
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    dispatch((0, _actions.prepareFinalObject)("Property", {}));
    setSearchResponse(state, dispatch, applicationNumber, tenantId);
    (0, _generatePDF.loadUlbLogo)(tenantId);
    var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "PT.MUTATION" }];
    (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    // Hide edit buttons
    setData(state, dispatch, applicationNumber, tenantId);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.registrationSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.transferorInstitutionSummary.children.cardContent.children.header.children.editSection.visible", false);

    // set(
    //   action,
    //   "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
    //   false
    // );
    var printCont = (0, _functions.downloadPrintContainer)(action, state, dispatch, status, applicationNumber, tenantId);

    (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children", printCont);
    getPropertyConfigurationMDMSData(action, state, dispatch);
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
            header1: (0, _extends3.default)({
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
            dataPath: "Property",
            moduleName: "PT.MUTATION",
            updateUrl: "/property-services/property/_update"
          }
        },
        body: (0, _utils.getCommonCard)({
          pdfHeader: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "pdfHeader"
          },
          propertySummary: _propertySummary.propertySummary,
          transferorSummary: _transferorSummary.transferorSummary,
          transferorInstitutionSummary: _transferorSummary.transferorInstitutionSummary,
          transfereeSummary: _transfereeSummary.transfereeSummary,
          transfereeInstitutionSummary: _transfereeSummary.transfereeInstitutionSummary,
          mutationSummary: _mutationSummary.mutationSummary,
          registrationSummary: _registrationSummary.registrationSummary,
          documentsSummary: _documentsSummary.documentsSummary
        })
      }
    }
  }
};

exports.default = screenConfig;