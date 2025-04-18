"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadPrintContainer = exports.openPopup = exports.footerReviewTop = exports.footerReview = exports.renewTradelicence = exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.callBackForNext = exports.generatePdfFromDiv = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-common/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _generateTLAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement");

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _commons3 = require("../../../../../ui-utils/commons");

var _utils2 = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveToSuccess = function moveToSuccess(LicenseData, dispatch) {
  var applicationNo = (0, _get2.default)(LicenseData, "applicationNumber");
  var tenantId = (0, _get2.default)(LicenseData, "tenantId");
  var financialYear = (0, _get2.default)(LicenseData, "financialYear");
  var purpose = "apply";
  var status = "success";
  dispatch((0, _actions.setRoute)("/tradelicence/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&FY=" + financialYear + "&tenantId=" + tenantId));
};
var editRenewalMoveToSuccess = function editRenewalMoveToSuccess(LicenseData, dispatch) {
  var applicationNo = (0, _get2.default)(LicenseData, "applicationNumber");
  var tenantId = (0, _get2.default)(LicenseData, "tenantId");
  var financialYear = (0, _get2.default)(LicenseData, "financialYear");
  var licenseNumber = (0, _get2.default)(LicenseData, "licenseNumber");
  var purpose = "EDITRENEWAL";
  var status = "success";
  dispatch((0, _actions.setRoute)("/tradelicence/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&licenseNumber=" + licenseNumber + "&FY=" + financialYear + "&tenantId=" + tenantId));
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

var callBackForNext = exports.callBackForNext = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, isTradeDetailsValid, isTradeLocationValid, accessoriesJsonPath, accessories, isAccessoriesValid, i, tradeUnitJsonPath, tradeUnits, isTradeUnitValid, j, ownership, subOwnerShipCategoryType, isOwnerShipValid, _ownership, ownersJsonPath, owners, k, _ownersJsonPath, LicenseData, uploadedDocData, uploadedTempDocData, y, businessId, tenantId, oldOwners, updateMessage, reviewDocData, summaryLocalPrefix, _LicenseData, errorMessage;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;
            hasFieldToaster = true;

            if (activeStep === 0) {
              isTradeDetailsValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children", state, dispatch);
              isTradeLocationValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children", state, dispatch);
              accessoriesJsonPath = "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.accessoriesCard.props.items";
              accessories = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, accessoriesJsonPath, []);
              isAccessoriesValid = true;

              for (i = 0; i < accessories.length; i++) {
                if ((accessories[i].isDeleted === undefined || accessories[i].isDeleted !== false) && !(0, _utils2.validateFields)(accessoriesJsonPath + "[" + i + "].item" + i + ".children.cardContent.children.accessoriesCardContainer.children", state, dispatch)) isAccessoriesValid = false;
              }

              tradeUnitJsonPath = "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items";
              tradeUnits = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, tradeUnitJsonPath, []);
              isTradeUnitValid = true;


              for (j = 0; j < tradeUnits.length; j++) {
                if ((tradeUnits[j].isDeleted === undefined || tradeUnits[j].isDeleted !== false) && !(0, _utils2.validateFields)(tradeUnitJsonPath + "[" + j + "].item" + j + ".children.cardContent.children.tradeUnitCardContainer.children", state, dispatch)) isTradeUnitValid = false;
              }
              if (!isTradeDetailsValid || !isTradeLocationValid || !isAccessoriesValid || !isTradeUnitValid) {
                isFormValid = false;
              }
              ownership = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", "INDIVIDUAL");
              // ownership = ownership.split(".")[0];

              subOwnerShipCategoryType = ownership.split(".")[1];

              if (subOwnerShipCategoryType === "MULTIPLEOWNERS") {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", true));
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", false));
              }
            }

            if (!(activeStep === 1)) {
              _context.next = 22;
              break;
            }

            _context.next = 7;
            return (0, _utils2.getDocList)(state, dispatch);

          case 7:
            isOwnerShipValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownershipType.children", state, dispatch);
            _ownership = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", "INDIVIDUAL");

            _ownership = _ownership.split(".")[0];
            if (_ownership === "INDIVIDUAL") {
              ownersJsonPath = "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items";
              owners = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, ownersJsonPath, []);

              for (k = 0; k < owners.length; k++) {
                if ((owners[k].isDeleted === undefined || owners[k].isDeleted !== false) && !(0, _utils2.validateFields)(ownersJsonPath + "[" + k + "].item" + k + ".children.cardContent.children.tradeUnitCardContainer.children", state, dispatch)) isFormValid = false;
              }
            } else {
              _ownersJsonPath = "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional.children.cardContent.children.tradeUnitCardContainerInstitutional.children";

              if (!(0, _utils2.validateFields)(_ownersJsonPath, state, dispatch)) isFormValid = false;
            }

            // check for multiple owners

            if (!((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") === "INDIVIDUAL.MULTIPLEOWNERS" && (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners") && (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners").length <= 1)) {
              _context.next = 14;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please add multiple owners !",
              labelKey: "ERR_ADD_MULTIPLE_OWNERS"
            }, "error"));
            return _context.abrupt("return", false);

          case 14:
            if (!(isFormValid && isOwnerShipValid)) {
              _context.next = 21;
              break;
            }

            _context.next = 17;
            return (0, _commons3.applyTradeLicense)(state, dispatch, activeStep);

          case 17:
            isFormValid = _context.sent;

            if (!isFormValid) {
              hasFieldToaster = false;
            }
            _context.next = 22;
            break;

          case 21:
            isFormValid = false;

          case 22:
            if (activeStep === 2) {
              LicenseData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0]", {});


              (0, _get2.default)(LicenseData, "tradeLicenseDetail.subOwnerShipCategory") && (0, _get2.default)(LicenseData, "tradeLicenseDetail.subOwnerShipCategory").split(".")[0] === "INDIVIDUAL" ? (0, _utils2.setMultiOwnerForApply)(state, true) : (0, _utils2.setMultiOwnerForApply)(state, false);

              if ((0, _get2.default)(LicenseData, "licenseType")) {
                (0, _utils2.setValidToFromVisibilityForApply)(state, (0, _get2.default)(LicenseData, "licenseType"));
              }

              uploadedDocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
              uploadedTempDocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].applicationDocuments", []);

              for (y = 0; y < uploadedTempDocData.length; y++) {
                if (uploadedTempDocData[y].required && !(0, _some2.default)(uploadedDocData, { documentType: uploadedTempDocData[y].code })) {
                  isFormValid = false;
                }
              }

              if (isFormValid) {
                if ((0, _commons2.getQueryArg)(window.location.href, "action") === "edit") {
                  //EDIT FLOW
                  businessId = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
                  tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
                  oldOwners = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].tradeLicenseDetail.owners", [])));

                  dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", (0, _commons3.checkValidOwners)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners", []), oldOwners)));
                  dispatch((0, _actions.setRoute)("/tradelicence/search-preview?applicationNumber=" + businessId + "&tenantId=" + tenantId + "&edited=true"));
                  updateMessage = {
                    labelName: "Rates will be updated on submission",
                    labelKey: "TL_COMMON_EDIT_UPDATE_MESSAGE"
                  };

                  dispatch((0, _actions2.toggleSnackbar)(true, updateMessage, "info"));
                }
                uploadedDocData = uploadedDocData.filter(function (item) {
                  return item.fileUrl && item.fileName;
                });
                reviewDocData = uploadedDocData && uploadedDocData.map(function (item) {
                  return {
                    title: "TL_" + item.documentType,
                    link: item.fileUrl && item.fileUrl.split(",")[0],
                    linkText: "View",
                    name: item.fileName
                  };
                });

                (0, _utils2.createEstimateData)(LicenseData, "LicensesTemp[0].estimateCardData", dispatch); //get bill and populate estimate card
                dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].reviewDocData", reviewDocData));
                summaryLocalPrefix = {
                  masterName: "REVENUE",
                  moduleName: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tenantId", "").replace('.', '_').toUpperCase()
                };

                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewFour.children.reviewMohalla.children.value.children.key", "props.localePrefix", summaryLocalPrefix));
              }
            }

            if (!(activeStep === 3)) {
              _context.next = 29;
              break;
            }

            _LicenseData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0]");
            _context.next = 27;
            return (0, _commons3.applyTradeLicense)(state, dispatch, activeStep);

          case 27:
            isFormValid = _context.sent;

            if (isFormValid) {
              if ((0, _commons2.getQueryArg)(window.location.href, "action") === "EDITRENEWAL") editRenewalMoveToSuccess(_LicenseData, dispatch);else moveToSuccess(_LicenseData, dispatch);
            }

          case 29:
            if (!(activeStep !== 3)) {
              _context.next = 46;
              break;
            }

            if (!isFormValid) {
              _context.next = 34;
              break;
            }

            changeStep(state, dispatch);
            _context.next = 46;
            break;

          case 34:
            if (!hasFieldToaster) {
              _context.next = 46;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents !",
              labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
            };
            _context.t0 = activeStep;
            _context.next = _context.t0 === 0 ? 39 : _context.t0 === 1 ? 41 : _context.t0 === 2 ? 43 : 45;
            break;

          case 39:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Trade Details, then do next !",
              labelKey: "ERR_FILL_TRADE_MANDATORY_FIELDS"
            };
            return _context.abrupt("break", 45);

          case 41:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Owner Details, then do next !",
              labelKey: "ERR_FILL_OWNERS_MANDATORY_FIELDS"
            };
            return _context.abrupt("break", 45);

          case 43:
            errorMessage = {
              labelName: "Please upload all the required documents !",
              labelKey: "ERR_UPLOAD_REQUIRED_DOCUMENTS"
            };
            return _context.abrupt("break", 45);

          case 45:
            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function callBackForNext(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    if (activeStep === 2 && mode === "next") {
      var isDocsUploaded = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].reviewDocData", null);
      activeStep = isDocsUploaded ? 3 : 2;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }

  var isPreviousButtonVisible = activeStep > 0 ? true : false;
  var isNextButtonVisible = activeStep < 3 ? true : false;
  var isPayButtonVisible = activeStep === 3 ? true : false;
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
    path: "components.div.children.footer.children.payButton",
    property: "visible",
    value: isPayButtonVisible
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
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
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
        labelKey: "TL_COMMON_BUTTON_PREV_STEP"
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
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: (0, _utils.getLabel)({
        labelName: "Next Step",
        labelKey: "TL_COMMON_BUTTON_NXT_STEP"
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
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
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

var renewTradelicence = exports.renewTradelicence = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(financialYear, state, dispatch) {
    var licences, tenantId, nextFinancialYear, wfCode, response, renewedapplicationNo, licenseNumber;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            licences = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses");
            tenantId = (0, _get2.default)(licences[0], "tenantId");
            _context2.next = 4;
            return (0, _commons3.getNextFinancialYearForRenewal)(financialYear);

          case 4:
            nextFinancialYear = _context2.sent;
            wfCode = "DIRECTRENEWAL";

            (0, _set2.default)(licences[0], "action", "INITIATE");
            (0, _set2.default)(licences[0], "workflowCode", wfCode);
            (0, _set2.default)(licences[0], "applicationType", "RENEWAL");
            (0, _set2.default)(licences[0], "financialYear", nextFinancialYear);

            _context2.next = 12;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], {
              Licenses: licences
            });

          case 12:
            response = _context2.sent;
            renewedapplicationNo = (0, _get2.default)(response, "Licenses[0].applicationNumber");
            licenseNumber = (0, _get2.default)(response, "Licenses[0].licenseNumber");

            dispatch((0, _actions.setRoute)("/tradelicence/acknowledgement?purpose=EDITRENEWAL&status=success&applicationNumber=" + renewedapplicationNo + "&licenseNumber=" + licenseNumber + "&FY=" + nextFinancialYear + "&tenantId=" + tenantId + "&action=" + wfCode));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function renewTradelicence(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var footerReview = exports.footerReview = function footerReview(action, state, dispatch, status, applicationNumber, tenantId, financialYear) {
  /** MenuButton data based on status */
  var licenseNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "licenseNumber");
  var responseLength = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "licenseCount", 1);

  return (0, _utils2.getCommonApplyFooter)({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        rightdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {

            style: {
              float: "right",
              display: "flex"
            }
          },
          children: {

            resubmitButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "RESUBMIT",
                  labelKey: "TL_RESUBMIT"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: openPopup
              },
              visible: (0, _utils2.getButtonVisibility)(status, "RESUBMIT"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_CEMP", "CITIZEN"]
              }
            },
            editButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "16px",
                  borderRadius: "inherit"
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
                  labelName: "Edit for Renewal",
                  labelKey: "TL_RENEWAL_BUTTON_EDIT"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack() {
                  dispatch((0, _actions.setRoute)(
                  // `/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&FY=${financialYear}&tenantId=${tenantId}`
                  "/tradelicense-citizen/apply?applicationNumber=" + applicationNumber + "&licenseNumber=" + licenseNumber + "&tenantId=" + tenantId + "&action=EDITRENEWAL"));
                }

              },
              visible: ((0, _utils2.getButtonVisibility)(status, "APPROVED") || (0, _utils2.getButtonVisibility)(status, "EXPIRED")) && responseLength === 1
            },
            submitButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45px",
                  borderRadius: "inherit"
                }
              },
              children: {
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "Submit for Renewal",
                  labelKey: "TL_RENEWAL_BUTTON_SUBMIT"
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
                callBack: function callBack() {
                  renewTradelicence(financialYear, state, dispatch);
                }

              },
              visible: ((0, _utils2.getButtonVisibility)(status, "APPROVED") || (0, _utils2.getButtonVisibility)(status, "EXPIRED")) && responseLength === 1
            },
            makePayment: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45px",
                  borderRadius: "inherit"
                }
              },
              children: {
                submitButtonLabel: (0, _utils.getLabel)({
                  labelName: "MAKE PAYMENT",
                  labelKey: "TL_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack() {
                  dispatch((0, _actions.setRoute)("/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenantId + "&businessService=TL"));
                }

              },
              visible: process.env.REACT_APP_NAME === "Citizen" && (0, _utils2.getButtonVisibility)(status, "PENDINGPAYMENT") ? true : false
            }
          },
          gridDefination: {
            xs: 12,
            sm: 12
          }
        }
      }
    }
  });
};
var footerReviewTop = exports.footerReviewTop = function footerReviewTop(action, state, dispatch, status, applicationNumber, tenantId, financialYear) {
  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var licenseNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "licenseNumber");
  var uiCommonConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "uiCommonConfig");
  var receiptKey = (0, _get2.default)(uiCommonConfig, "receiptKey");
  var responseLength = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "licenseCount", 1);
  // let renewalMenu=[];
  var tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      var Licenses = state.screenConfiguration.preparedFinalObject.Licenses;

      (0, _utils2.downloadCertificateForm)(Licenses);
    },
    leftIcon: "book"
  };
  var tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      var Licenses = state.screenConfiguration.preparedFinalObject.Licenses;

      (0, _utils2.downloadCertificateForm)(Licenses, 'print');
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {

      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }, { key: "businessService", value: 'TL' }];
      (0, _commons.download)(receiptQueryString, "download", receiptKey || "consolidatedreceipt", 'PAYMENT', state);
      // generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }, { key: "businessService", value: 'TL' }];
      (0, _commons.download)(receiptQueryString, "print", receiptKey || "consolidatedreceipt", 'PAYMENT', state);
      // generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      var _state$screenConfigur = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur.Licenses,
          LicensesTemp = _state$screenConfigur.LicensesTemp;

      var documents = LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      (0, _generateTLAcknowledgement.generateTLAcknowledgement)(state.screenConfiguration.preparedFinalObject, "tl-acknowledgement-" + Licenses[0].applicationNumber);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      var _state$screenConfigur2 = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur2.Licenses,
          LicensesTemp = _state$screenConfigur2.LicensesTemp;

      var documents = LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      (0, _generateTLAcknowledgement.generateTLAcknowledgement)(state.screenConfiguration.preparedFinalObject, 'print');
    },
    leftIcon: "assignment"
  };

  switch (status) {
    case "APPROVED":
      downloadMenu = [tlCertificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [tlCertificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
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

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "MenuButton",
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
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "MenuButton",
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

var openPopup = exports.openPopup = function openPopup(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("ResubmitAction", true));
};

var downloadPrintContainer = exports.downloadPrintContainer = function downloadPrintContainer(action, state, dispatch, status, applicationNumber, tenantId) {
  /** MenuButton data based on status */
  var uiCommonConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "uiCommonConfig");
  var receiptKey = (0, _get2.default)(uiCommonConfig, "receiptKey");
  var downloadMenu = [];
  var printMenu = [];
  var tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      var Licenses = state.screenConfiguration.preparedFinalObject.Licenses;

      (0, _utils2.downloadCertificateForm)(Licenses);
    },
    leftIcon: "book"
  };
  var tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      var Licenses = state.screenConfiguration.preparedFinalObject.Licenses;

      (0, _utils2.downloadCertificateForm)(Licenses, 'print');
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }, { key: "businessService", value: 'TL' }];
      (0, _commons.download)(receiptQueryString, "download", receiptKey);
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }, { key: "businessService", value: 'TL' }];
      (0, _commons.download)(receiptQueryString, "print", receiptKey);
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      var _state$screenConfigur3 = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur3.Licenses,
          LicensesTemp = _state$screenConfigur3.LicensesTemp;

      var documents = LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      // downloadAcknowledgementForm(Licenses);
      (0, _generateTLAcknowledgement.generateTLAcknowledgement)(state.screenConfiguration.preparedFinalObject, "tl-acknowledgement-" + Licenses[0].applicationNumber);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      var _state$screenConfigur4 = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur4.Licenses,
          LicensesTemp = _state$screenConfigur4.LicensesTemp;

      var documents = LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      // downloadAcknowledgementForm(Licenses,'print');
      (0, _generateTLAcknowledgement.generateTLAcknowledgement)(state.screenConfiguration.preparedFinalObject, 'print');
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [tlCertificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [tlCertificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
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

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-download-button" },
              menu: downloadMenu
            }
          }
        },
        printMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "MenuButton",
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