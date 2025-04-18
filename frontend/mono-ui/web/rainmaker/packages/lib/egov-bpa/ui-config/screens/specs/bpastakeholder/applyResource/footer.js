"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDownloadandPrintMenu = exports.footerReview = exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.callBackForNext = exports.generatePdfFromDiv = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("../../../../../ui-utils/commons");

var _commons2 = require("egov-common/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _commons3 = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

require("./index.css");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveToSuccess = function moveToSuccess(LicenseData, dispatch) {
  var applicationNo = (0, _get2.default)(LicenseData, "applicationNumber");
  var tenantId = (0, _localStorageUtils.getTenantId)(); //process.env.REACT_APP_DEFAULT_TENANT_ID;
  var financialYear = (0, _get2.default)(LicenseData, "financialYear");
  var purpose = "apply";
  var status = "success";
  if (window.location.pathname.includes("openlink")) {
    dispatch((0, _actions2.setRoute)("/openlink/bpastakeholder/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&FY=" + financialYear + "&tenantId=" + tenantId));
  } else {
    dispatch((0, _actions2.setRoute)("/bpastakeholder/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&FY=" + financialYear + "&tenantId=" + tenantId));
  }
};
var generatePdfFromDiv = exports.generatePdfFromDiv = function generatePdfFromDiv(action, applicationNumber) {
  var target = document.querySelector("#custom-atoms-div");
  (0, _html2canvas2.default)(target, {
    onclone: function onclone(clonedDoc) {
      // clonedDoc.getElementById("custom-atoms-footer")[
      //   "data-html2canvas-ignore"
      // ] = "true";
      clonedDoc.getElementById("custom-atoms-footer").style.display = "none";
    }
  }).then(function (canvas) {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    var doc = new _jspdf2.default("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    if (action === "download") {
      doc.save("preview-" + applicationNumber + ".pdf");
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

var prepareDocumentsDetailsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, reduxDocuments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.bparegDocumentDetailsUploadRedux", {});

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0) {
                documentsPreview.push({
                  title: (0, _commons3.getTransformedLocale)(doc.documentCode),
                  name: doc.documents[0].fileName,
                  fileStoreId: doc.documents[0].fileStoreId,
                  linkText: "View",
                  link: doc.documents[0].fileUrl && doc.documents[0].fileUrl.length > 0 && doc.documents[0].fileUrl.split(",")[0]
                });
              }
            });
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].reviewDocData", documentsPreview));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function prepareDocumentsDetailsView(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getSummaryRequiredDetails = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var LicenseData, getLicenceValidData, tradeType;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            LicenseData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0]", {});

            (0, _utils2.createEstimateData)(LicenseData, "LicensesTemp[0].estimateCardData", dispatch, {}, true); //get bill and populate estimate card
            getLicenceValidData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.tradeSubType[0].validityPeriod", 0);

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.footnoteOFLicenceValid.children.footNote", "props.labelKey[1]", getLicenceValidData));
            tradeType = (0, _get2.default)(LicenseData, "tradeLicenseDetail.tradeUnits[0].tradeType");

            if (tradeType.split('.')[0] == "ARCHITECT") {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo", "visible", true));
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo", "visible", false));
            }
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewValidityPeriod", "visible", false));

            prepareDocumentsDetailsView(state, dispatch);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getSummaryRequiredDetails(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var callBackForNext = exports.callBackForNext = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, isLicenseeTypeValid, isLicenseeSubTypeValid, isLicenseeCOAValid, licenseType, data, isTradeDetailsValid, isPermanentAddrValid, isCommunicationAddrValid, isDocsEdit, tenantIdInLocastorage, tenantId, documentsFormat, validateDocumentField, i, isDocumentRequired, isDocumentTypeRequired, documents, LicenseData, isDeclared, errorMessage, _errorMessage;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;
            hasFieldToaster = true;

            if (activeStep === 0) {
              isLicenseeTypeValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container1.children", state, dispatch);
              isLicenseeSubTypeValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children", state, dispatch);
              isLicenseeCOAValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children", state, dispatch);
              licenseType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType", "");

              if (licenseType && licenseType != "BUILDER.CLASSA") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.declarationSummary.children.header.children.body.children.checkbox", "visible", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.declarationSummary.children.header.children.body.children.checkbox2", "visible", true));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.declarationSummary.children.header.children.body.children.checkbox2", "visible", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.declarationSummary.children.header.children.body.children.checkbox", "visible", true));
              }

              if (!isLicenseeCOAValid || !isLicenseeSubTypeValid || !isLicenseeTypeValid) {
                isFormValid = false;
              }
            }

            if (!(activeStep === 1)) {
              _context3.next = 25;
              break;
            }

            data = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject");
            isTradeDetailsValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children", state, dispatch);
            // let isTradeOrganizationValid = true;

            // let ownershipType = get(
            //   data,
            //   "Licenses[0].tradeLicenseDetail.subOwnerShipCategory"
            // );

            // if (ownershipType != "INDIVIDUAL") {
            //   isTradeOrganizationValid = validateFields(
            //     "components.div.children.formwizardFirstStep.children.organizationDetails.children.cardContent.children.organizationDetailsConatiner.children",
            //     state,
            //     dispatch
            //   );
            // }

            isPermanentAddrValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondtep.children.permanentAddr.children.cardContent.children.tradeDetailsConatiner.children", state, dispatch);
            isCommunicationAddrValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.corrospondanceAddr.children.cardContent.children.AddressWithCheckBoxContainer.children.addressContainer.children", state, dispatch);

            if (!(!isTradeDetailsValid || !isPermanentAddrValid || !isCommunicationAddrValid)) {
              _context3.next = 13;
              break;
            }

            isFormValid = false;
            _context3.next = 25;
            break;

          case 13:
            isDocsEdit = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].isDocsEdit", "");
            _context3.next = 16;
            return (0, _utils2.getDocList)(state, dispatch);

          case 16:
            if (!(isDocsEdit != true)) {
              _context3.next = 19;
              break;
            }

            _context3.next = 19;
            return (0, _utils2.prepareBPAREGDocumentDetailsUploadRedux)(state, dispatch);

          case 19:
            _context3.next = 21;
            return (0, _commons.applyTradeLicense)(state, dispatch);

          case 21:
            isFormValid = _context3.sent;

            if (!isFormValid) {
              hasFieldToaster = false;
            }
            tenantIdInLocastorage = (0, _localStorageUtils.getTenantId)();

            if (!tenantIdInLocastorage || tenantIdInLocastorage == "null") {
              tenantId = window.globalConfigs.getConfig("STATE_LEVEL_TENANT_ID") || process.env.REACT_APP_DEFAULT_TENANT_ID;

              (0, _localStorageUtils.setTenantId)(tenantId);
              localStorage.setItem("Citizen.tenant-id", tenantId);
            }

          case 25:
            if (!(activeStep === 2)) {
              _context3.next = 62;
              break;
            }

            documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bparegDocumentDetailsUploadRedux"));
            validateDocumentField = false;

            if (!(documentsFormat && documentsFormat.length)) {
              _context3.next = 61;
              break;
            }

            i = 0;

          case 30:
            if (!(i < documentsFormat.length)) {
              _context3.next = 58;
              break;
            }

            isDocumentRequired = (0, _get2.default)(documentsFormat[i], "isDocumentRequired");
            isDocumentTypeRequired = (0, _get2.default)(documentsFormat[i], "isDocumentTypeRequired");
            documents = (0, _get2.default)(documentsFormat[i], "documents");

            if (!isDocumentRequired) {
              _context3.next = 54;
              break;
            }

            if (!(documents && documents.length > 0)) {
              _context3.next = 49;
              break;
            }

            if (!isDocumentTypeRequired) {
              _context3.next = 46;
              break;
            }

            if (!(0, _get2.default)(documentsFormat[i], "dropDownValues.value")) {
              _context3.next = 41;
              break;
            }

            validateDocumentField = true;
            _context3.next = 44;
            break;

          case 41:
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please select type of Document!", labelKey: "BPA_FOOTER_SELECT_DOC_TYPE" }, "warning"));
            validateDocumentField = false;
            return _context3.abrupt("break", 58);

          case 44:
            _context3.next = 47;
            break;

          case 46:
            validateDocumentField = true;

          case 47:
            _context3.next = 52;
            break;

          case 49:
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please uplaod mandatory documents!", labelKey: "BPA_FOOTER_UPLOAD_MANDATORY_DOC" }, "warning"));
            validateDocumentField = false;
            return _context3.abrupt("break", 58);

          case 52:
            _context3.next = 55;
            break;

          case 54:
            validateDocumentField = true;

          case 55:
            i++;
            _context3.next = 30;
            break;

          case 58:
            if (!validateDocumentField) {
              isFormValid = false;
              hasFieldToaster = true;
            } else {
              getSummaryRequiredDetails(state, dispatch);
            }
            _context3.next = 62;
            break;

          case 61:
            getSummaryRequiredDetails(state, dispatch);

          case 62:
            if (!(activeStep === 3)) {
              _context3.next = 74;
              break;
            }

            LicenseData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0]");
            isDeclared = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp.isDeclared");

            if (!isDeclared) {
              _context3.next = 72;
              break;
            }

            _context3.next = 68;
            return (0, _commons.applyTradeLicense)(state, dispatch, 2);

          case 68:
            isFormValid = _context3.sent;

            moveToSuccess(LicenseData, dispatch);
            _context3.next = 74;
            break;

          case 72:
            errorMessage = {
              labelName: "Please confirm the declaration!",
              labelKey: "ERR_FILL_DECLARATION_MESSAGE"
            };

            dispatch((0, _actions.toggleSnackbar)(true, errorMessage, "warning"));

          case 74:
            if (!(activeStep !== 3)) {
              _context3.next = 91;
              break;
            }

            if (!isFormValid) {
              _context3.next = 79;
              break;
            }

            changeStep(state, dispatch);
            _context3.next = 91;
            break;

          case 79:
            if (!hasFieldToaster) {
              _context3.next = 91;
              break;
            }

            _errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents !",
              labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
            };
            _context3.t0 = activeStep;
            _context3.next = _context3.t0 === 0 ? 84 : _context3.t0 === 1 ? 86 : _context3.t0 === 2 ? 88 : 90;
            break;

          case 84:
            _errorMessage = {
              labelName: "Please fill all mandatory fields for Stakeholder Registration, then do next!",
              labelKey: "ERR_FILL_BPA_FIELDS"
            };
            return _context3.abrupt("break", 90);

          case 86:
            _errorMessage = {
              labelName: "Please fill all mandatory fields for Stakeholder Registration, then do next!",
              labelKey: "ERR_FILL_BPA_FIELDS"
            };
            return _context3.abrupt("break", 90);

          case 88:
            _errorMessage = {
              labelName: "Please upload all the required documents!",
              labelKey: "ERR_UPLOAD_REQUIRED_DOCUMENTS"
            };
            return _context3.abrupt("break", 90);

          case 90:
            dispatch((0, _actions.toggleSnackbar)(true, _errorMessage, "warning"));

          case 91:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function callBackForNext(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
  } else {
    activeStep = defaultActiveStep;
  }

  var isPreviousButtonVisible = activeStep > 0 ? true : false;
  var isNextButtonVisible = activeStep < 3 ? true : false;
  var isSubmitButtonVisible = activeStep === 3 ? true : false;
  var actionDefination = [{
    path: "components.div.children.stepper.props",
    property: "activeStep",
    value: activeStep
  }, {
    path: "components.div.children.footer.children.previousButton",
    property: "visible",
    value: isPreviousButtonVisible
  }, {
    path: "components.div.children.footer.children.nextButton",
    property: "visible",
    value: isNextButtonVisible
  }, {
    path: "components.div.children.footer.children.submitButton",
    property: "visible",
    value: isSubmitButtonVisible
  }];
  (0, _utils.dispatchMultipleFieldChangeAction)("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

var renderSteps = exports.renderSteps = function renderSteps(activeStep, dispatch) {
  switch (activeStep) {
    case 0:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFirstStep"), dispatch);
      break;
    case 1:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardSecondStep"), dispatch);
      break;
    case 2:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardThirdStep"), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
  }
};

var getActionDefinationForStepper = exports.getActionDefinationForStepper = function getActionDefinationForStepper(path) {
  var actionDefination = [{
    path: "components.div.children.formwizardFirstStep",
    property: "visible",
    value: true
  }, {
    path: "components.div.children.formwizardSecondStep",
    property: "visible",
    value: false
  }, {
    path: "components.div.children.formwizardThirdStep",
    property: "visible",
    value: false
  }, {
    path: "components.div.children.formwizardFourthStep",
    property: "visible",
    value: false
  }];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], {
      value: false
    });
    if (path === actionDefination[i].path) {
      actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], {
        value: true
      });
    }
  }
  return actionDefination;
};

var callBackForPrevious = exports.callBackForPrevious = function callBackForPrevious(state, dispatch) {
  changeStep(state, dispatch, "previous");
};

var footer = exports.footer = (0, _utils2.getCommonApplyFooter)({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: "BPA_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: (0, _utils.getLabel)({
        labelName: "Next Step",
        labelKey: "BPA_COMMON_BUTTON_NXT_STEP"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "BPA_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
    visible: false
  }
});

var footerReview = exports.footerReview = function footerReview(action, state, dispatch, status, applicationNumber, tenantId) {
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  var redirectionURL = roleExists ? "/tradelicense-citizen" : "/tradelicence";

  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  var tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      generatePdfFromDiv("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      generatePdfFromDiv("print", applicationNumber);
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [tlCertificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [tlCertificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "APPLIED":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "pending_approval":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return (0, _utils2.getCommonApplyFooter)({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        leftdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: { textAlign: "left", display: "flex" }
          },
          children: {
            // downloadMenu: {
            //   uiFramework: "custom-atoms-local",
            //   moduleName: "egov-tradelicence",
            //   componentPath: "MenuButton",
            //   props: {
            //     data: {
            //       label: "Download",
            //       leftIcon: "cloud_download",
            //       rightIcon: "arrow_drop_down",
            //       props: { variant: "outlined", style: { marginLeft: 10 } },
            //       menu: downloadMenu
            //     }
            //   }
            // },
            // printMenu: {
            //   uiFramework: "custom-atoms-local",
            //   moduleName: "egov-tradelicence",
            //   componentPath: "MenuButton",
            //   props: {
            //     data: {
            //       label: "Print",
            //       leftIcon: "print",
            //       rightIcon: "arrow_drop_down",
            //       props: { variant: "outlined", style: { marginLeft: 10 } },
            //       menu: printMenu
            //     }
            //   }
            // }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        },
        rightdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            rejectButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "16px"
                }
              },
              children: {
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "Reject",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_REJECT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/tradelicence/approve?purpose=reject&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId
              },
              visible: (0, _utils2.getButtonVisibility)(status, "REJECT"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            },
            approveButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "APPROVE",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_APPROVE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/tradelicence/approve?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId
              },
              visible: (0, _utils2.getButtonVisibility)(status, "APPROVE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            },
            proceedPayButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "PROCEED TO PAYMENT",
                  labelKey: "TL_COMMON_BUTTON_PROC_PMT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenantId + "&businessService=BPAREG"
                //path: `${redirectionURL}/pay?applicationNumber=${applicationNumber}&tenantId=${tenantId}&businessService=TL`
              },
              roleDefination: {
                rolePath: "user-info.roles",
                action: "PAY"
              }
            },
            cancelButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "CANCEL TRADE LICENSE",
                  labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/tradelicence/approve?purpose=cancel&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId
              },
              visible: (0, _utils2.getButtonVisibility)(status, "CANCEL TRADE LICENSE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      }
    }
  });
};

var updateDownloadandPrintMenu = exports.updateDownloadandPrintMenu = function updateDownloadandPrintMenu(action, state, dispatch, status) {
  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var receiptQueryString = [{
    key: "consumerCodes",
    value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber")
  }, {
    key: "tenantId",
    value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId")
  }, {
    key: "businessService",
    value: "BPAREG"

  }];
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      (0, _commons2.download)(receiptQueryString, "download", 'consolidatedreceipt', 'PAYMENT');
    },
    leftIcon: "receipt"
  };

  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      (0, _commons2.download)(receiptQueryString, "print", 'consolidatedreceipt', 'PAYMENT');
    },
    leftIcon: "receipt"
  };

  switch (status) {
    case "PENDINGDOCVERIFICATION":
    case "PENDINGAPPROVAL":
    case "REJECTED":
    case "APPROVED":
      downloadMenu = [receiptDownloadObject];
      printMenu = [receiptPrintObject];
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.downloadMenu.props", "data.menu", downloadMenu));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.printMenu.props", "data.menu", printMenu));
      break;
    default:
      break;
  }
};