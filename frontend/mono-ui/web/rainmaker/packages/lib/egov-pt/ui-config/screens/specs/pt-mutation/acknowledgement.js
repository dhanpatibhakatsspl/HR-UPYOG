"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setData = exports.header = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _generatePTMAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generatePTMAcknowledgement");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _index = require("../utils/index");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _footers = require("./acknowledgementResource/footers");

var _mutationSummary = require("./applyResourceMutation/mutationSummary");

require("./index.css");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _propertySummary = require("./summaryResource/propertySummary");

var _registrationSummary = require("./summaryResource/registrationSummary");

var _transfereeSummary = require("./summaryResource/transfereeSummary");

var _transferorSummary = require("./summaryResource/transferorSummary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application for Transfer of Ownership",
    labelKey: "PT_MUTATION_APPLICATION_HEADER"
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
    },
    visible: true
  }
});

var downloadprintMenu = function downloadprintMenu(state, applicationNumber, tenantId, purpose, moduleName) {
  var certificateDownloadObject = {
    label: { labelName: "PT Certificate", labelKey: "PT_CERTIFICATE" },
    link: function link() {
      (0, _index.downloadCertificateForm)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Properties"), "ptmutationcertificate", tenantId, applicationNumber);
    },
    leftIcon: "book"
  };
  var certificatePrintObject = {
    label: { labelName: "PT Certificate", labelKey: "PT_CERTIFICATE" },
    link: function link() {
      (0, _index.downloadCertificateForm)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Properties"), "ptmutationcertificate", tenantId, applicationNumber, 'print');
    },
    leftIcon: "book"
  };

  var applicationDownloadObject = {
    label: { labelName: "PT Application", labelKey: "PT_APPLICATION" },
    link: function link() {
      (0, _generatePTMAcknowledgement.generatePTMAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "mutation-acknowledgement-" + applicationNumber + ".pdf");
      // generatePdfFromDiv("download", applicationNumber, ".print-mutation-application-pdf")
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "PT Application", labelKey: "PT_APPLICATION" },
    link: function link() {
      // const { Licenses,LicensesTemp } = state.screenConfiguration.preparedFinalObject;
      // const documents = LicensesTemp[0].reviewDocData;
      // set(Licenses[0],"additionalDetails.documents",documents)
      // downloadAcknowledgementForm(Licenses,'print');
      (0, _generatePTMAcknowledgement.generatePTMAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), 'print');
      // generatePdfFromDiv("print", applicationNumber, ".print-mutation-application-pdf")
    },
    leftIcon: "assignment"
  };
  var downloadMenu = [];
  var printMenu = [];
  var visibility = moduleName == 'ASMT' || moduleName == "PT.CREATE" ? "hidden" : "visible";
  switch (purpose) {
    case "approve":
      downloadMenu = [certificateDownloadObject];
      printMenu = [certificatePrintObject];
      break;
    case "apply":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "verify":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }

  return {

    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "downloadprint-menu",
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
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", visibility: visibility, marginRight: "5px" }, className: "pt-download-button" },
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
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", visibility: visibility }, className: "pt-print-button" },
            menu: printMenu
          }
        }
      }

    }
    // gridDefination: {
    //   xs: 12,
    //   sm: 6
    // }


  };
};
/** END */
var getDocumentDetailsCard = function getDocumentDetailsCard() {
  return {
    body: (0, _extends3.default)({}, (0, _utils.getCommonCard)({
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
    }, {}, { className: "print-mutation-application-pdf" }), {
      props: {
        style: {
          height: "100%",
          position: "fixed",
          zIndex: -9999,
          opacity: 0
        }
      }
    })
  };
};

var getHeader = function getHeader(applicationNumber, moduleName) {
  if (moduleName == 'PT.CREATE') {
    return (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for Transfer of Ownership",
        labelKey: "PT_CREATE_APPLICATION_HEADER"
      })
    });
  }if (moduleName == 'PT.UPDATE') {
    return (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for Transfer of Ownership",
        labelKey: "PT_UPDATE_APPLICATION_HEADER"
      })
    });
  } else if (moduleName == 'ASMT') {
    return (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for Transfer of Ownership",
        labelKey: "PT_ASSESSMENT_APPLICATION_HEADER"
      })
    });
  } else if (moduleName == 'PT.MUTATION') {
    return (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for Transfer of Ownership",
        labelKey: "PT_MUTATION_APPLICATION_HEADER"
      })
    });
  } else {

    return (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for Transfer of Ownership",
        labelKey: "PT_APPLICATION_HEADER"
      })
    });
  }
};
var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, moduleName) {
  if (purpose === "apply" && status === "success") {
    // loadPdfGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      dpmenu: downloadprintMenu(state, applicationNumber, tenant, purpose),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: (0, _extends3.default)({

          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "PT_MUTATION_ACKNOWLEDGEMENT_SUCCESS_HEADER"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to both Transferor and Transferee at registered Mobile No. Please note your application  No for future reference.",
              labelKey: "PT_MUTATION_ACKNOWLEDGEMENT_SUCCESS_MESSAGE"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }, getDocumentDetailsCard())
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: (0, _footers.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "apply" && status === "failure") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Application Submitted Failed",
              labelKey: "PT_MUTATION_ACKNOWLEDGEMENT_FAILURE_HEADER"
            },
            body: {
              labelName: "A notification regarding Application Submission failure has been sent to both Transferor and Transferee at registered Mobile No.",
              labelKey: "PT_MUTATION_ACKNOWLEDGEMENT_FAILURE_MESSAGE"
            }
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "resubmit" && status === "success") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          // style: {
          //   position: "absolute",
          //   width: "95%"
          // }
        },
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "PT_APPLICATION_RESUBMIT_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_APPLICATION_RESUBMIT_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }
      },

      applicationSuccessFooter: (0, _footers.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "approve" && status === "success") {

    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      // dpmenu:downloadprintMenu(state,applicationNumber,tenant,purpose,moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is Approved Successfully",
              labelKey: "PT_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
          // ...getDocumentDetailsCard()
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "verified" && status === "failure") {
    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Verification Failed",
              labelKey: "PT_VERIFY_FAILURE_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_VERIFY_FAILURE_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "verify" && status === "success") {
    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      // dpmenu: downloadprintMenu(state,applicationNumber,tenant,purpose),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is Verified Successfully",
              labelKey: "PT_VERIFIED_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_VERIFIED_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
          // ...getDocumentDetailsCard()
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "sendback" && status === "success") {
    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is sent back Successfully",
              labelKey: "PT_SENDBACK_CHECKLIST_MESSAGE_HEAD"
            },
            // body: {
            //   labelName:
            //     "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
            //   labelKey: "PT_SENDBACK_CHECKLIST_MESSAGE_SUB"
            // },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "sendbacktocitizen" && status === "success") {
    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is sent back to Citizen Successfully",
              labelKey: "PT_SENDBACK_TOCITIZEN_CHECKLIST_MESSAGE_HEAD"
            },
            // body: {
            //   labelName:
            //     "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
            //   labelKey: "TL_SENDBACK_CHECKLIST_MESSAGE_SUB"
            // },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "reopen" && status === "success") {
    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is Reopend Successfully",
              labelKey: "PT_REOPEN_MESSAGE_HEAD"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Application Rejected",
              labelKey: "PT_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_APPROVAL_REJ_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Cancelled",
              labelKey: "PT_PT_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_PT_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      header: getHeader(applicationNumber, moduleName),
      // dpmenu: downloadprintMenu(state,applicationNumber,tenant,purpose),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: "PT_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
              labelKey: "PT_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "PT_MUTATION_APPLICATION_NO"
            },
            number: applicationNumber
          })
          // ...getDocumentDetailsCard()
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  }
};

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
        jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap." + item.code
      });

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children", item.code, labelElement));
    });
  });
};

var setApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, applicationNumber, tenant) {
    var queryObject, response, properties, property, workflow, ownersTemp, owners, transfereeOwners, transferorOwners, transfereeOwnersDid, transferorOwnersDid;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenant
            }, {
              key: "acknowledgementIds",
              value: applicationNumber
            }];
            _context.next = 3;
            return (0, _commons2.getSearchResults)(queryObject);

          case 3:
            response = _context.sent;
            properties = (0, _get2.default)(response, "Properties", []);
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

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transfereeSummary", "visible", false));
            } else {

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transfereeInstitutionSummary", "visible", false));
            }

            if ((0, _get2.default)(property, 'ownersInit[0].altContactNumber', 0)) {

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transferorSummary", "visible", false));
            } else {

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transferorInstitutionSummary", "visible", false));
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
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType", "props.style.display", 'none'));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID", "props.style.display", 'none'));
            }
            if (transfereeOwnersDid) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerDocumentId", "props.style.display", 'none'));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType", "props.style.display", 'none'));
            }

            dispatch((0, _actions.prepareFinalObject)("Property", property));
            // dispatch(prepareFinalObject("documentsUploadRedux", property.documents));
            (0, _index.prepareDocumentsView)(state, dispatch);
            // prepareUoms(state, dispatch);
            // await loadPdfGenerationData(applicationNumber, tenantId);
            // setDownloadMenu(state, dispatch, tenantId, applicationNumber);
            dispatch((0, _actions.prepareFinalObject)("Properties", (0, _get2.default)(response, "Properties", [])));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setApplicationData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var setData = exports.setData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, applicationNumber, tenantId) {
    var response, properties, propertyId, auditResponse, property, ownersTemp, owners, transfereeOwners, transferorOwners, propertiesAudit, previousActiveProperty;
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
            properties = (0, _get2.default)(response, "Properties", []);
            propertyId = (0, _get2.default)(response, "Properties[0].propertyId", []);
            _context2.next = 7;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "propertyIds", value: propertyId }, {
              key: "audit",
              value: true
            }]);

          case 7:
            auditResponse = _context2.sent;
            property = properties && properties.length > 0 && properties[0] || {};


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
            }

            transfereeOwners = (0, _get2.default)(property, "ownersTemp", []);
            transferorOwners = (0, _get2.default)(property, "ownersInit", []);


            if (auditResponse && Array.isArray((0, _get2.default)(auditResponse, "Properties", [])) && (0, _get2.default)(auditResponse, "Properties", []).length > 0) {
              propertiesAudit = (0, _get2.default)(auditResponse, "Properties", []);
              previousActiveProperty = propertiesAudit.filter(function (property) {
                return property.status == 'ACTIVE';
              }).sort(function (x, y) {
                return y.auditDetails.lastModifiedTime - x.auditDetails.lastModifiedTime;
              })[0];


              property.ownershipCategoryInit = previousActiveProperty ? previousActiveProperty.ownershipCategory : "";
              if (previousActiveProperty && property.ownershipCategoryInit && property.ownershipCategoryInit.startsWith("INSTITUTION")) {
                property.institutionInit = previousActiveProperty.institution;
              }
            }

            // auditResponse
            dispatch((0, _actions.prepareFinalObject)("Property", property));
            dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", property.documents));
            dispatch((0, _actions.prepareFinalObject)("Properties", (0, _get2.default)(response, "Properties", [])));

          case 19:
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
var screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var moduleName = (0, _commons.getQueryArg)(window.location.href, "moduleName");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    (0, _generatePDF.loadUlbLogo)(tenant);
    setData(state, dispatch, applicationNumber, tenant);
    setApplicationData(state, dispatch, applicationNumber, tenant);
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, moduleName);

    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    // Hiding edit section
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.registrationSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.applicationSuccessCard.children.body.children.cardContent.children.transferorInstitutionSummary.children.cardContent.children.header.children.editSection.visible", false);
    return action;
  }
};
exports.default = screenConfig;