"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.showRisktypeWarning = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

require("./index.css");

var _commons = require("../../../../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showRisktypeWarning = exports.showRisktypeWarning = function showRisktypeWarning(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.cityPickerDialog", "props.open", !toggle));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.div.children.selectButton", "visible", false));
};

var kathaNoAndPlotNoValidation = function kathaNoAndPlotNoValidation(state, dispatch) {
  var ocEdcrKathaNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ocScrutinyDetails.planDetail.planInformation.khataNo");
  var edcrKathaNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails.planDetail.planInformation.khataNo");
  var ocEdcrPlotNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ocScrutinyDetails.planDetail.planInformation.plotNo");
  var edcrPlotNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails.planDetail.planInformation.plotNo");
  if (ocEdcrKathaNo && edcrKathaNo && ocEdcrPlotNo && edcrPlotNo) {
    if (ocEdcrPlotNo == edcrPlotNo && ocEdcrKathaNo == edcrKathaNo) {
      return true;
    } else {
      var errorMessage = {};
      if (ocEdcrKathaNo != edcrKathaNo && ocEdcrPlotNo == edcrPlotNo) {
        errorMessage = {
          labelName: "Khata number from permit order XXXX(permit order number) is not matching with the khata number from occupancy certificate. You cannot proceed with the application",
          labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
        };
      } else if (ocEdcrPlotNo != edcrPlotNo && ocEdcrKathaNo == edcrKathaNo) {
        errorMessage = {
          labelName: "Plot number from permit order XXXX(permit order number) is not matching with the Plot number from occupancy certificate. You cannot proceed with the application",
          labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
        };
      } else if (ocEdcrPlotNo != edcrPlotNo && ocEdcrKathaNo != edcrKathaNo) {
        errorMessage = {
          labelName: "Khata No and plot No from permit order XXXX(permit order number) is not matching with the Khata No and plot No from occupancy certificate. You cannot proceed with the application",
          labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
        };
      }
      dispatch((0, _actions.toggleSnackbar)(true, errorMessage, "error"));
      return false;
    }
  }
};

var riskTypeValidation = function riskTypeValidation(state, dispatch, activeStep) {
  var riskTypes = { LOW: 0, MEDIUM: 1, HIGH: 2 };

  var ocEdcrRiskType = (0, _utils2.getRiskType)(state, dispatch);
  // get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "BPA.riskType"
  // );
  var edcrRisktype = (0, _utils2.getRiskType)(state, dispatch, true);
  // get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "bpaDetails.riskType"
  // );
  if (riskTypes[edcrRisktype] < riskTypes[ocEdcrRiskType]) {
    dispatch((0, _actions.toggleSnackbar)(true, {
      labelName: "The Risk type from permit order XXXX(permit order number) to occupancy certificate application is changed from Low to high .You cannot proceed with the application.",
      labelKey: "BPA_RISK_TYPE_VALIDATION_ERROR"
    }, "error"));
    return false;
  } else if (riskTypes[edcrRisktype] > riskTypes[ocEdcrRiskType]) {
    showRisktypeWarning(state, dispatch, activeStep);
    return false;
  } else {
    // const riskTypeValid = get(
    //   state,
    //   "screenConfiguration.preparedFinalObject.BPA.riskType",
    //   []
    // );
    // if (riskTypeValid.length === 0) {
    //   let errorMessage = {
    //     labelName: "Please search scrutiny details linked to the scrutiny number",
    //     labelKey: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_SEARCH_TITLE"
    //   };
    //   dispatch(toggleSnackbar(true, errorMessage, "warning"));
    //   return false;
    // }
    return true;
  }
};

var prepareDocumentsDetailsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, reduxDocuments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux", {});

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0 && doc.dropDownValues) {
                doc.documents.forEach(function (docDetail) {
                  documentsPreview.push({
                    title: (0, _commons2.getTransformedLocale)(doc.documentCode),
                    name: docDetail.fileName,
                    fileStoreId: docDetail.fileStoreId,
                    linkText: "View",
                    link: docDetail.fileUrl && docDetail.fileUrl.split(",")[0]
                  });
                });
              }
            });
            dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", documentsPreview));

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
    var applicationNumber, tenantId, ocDetails, bpaDetails;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.applicationNo");
            tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
            ocDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ocScrutinyDetails");
            bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA");

            (0, _utils2.generateBillForBPA)(dispatch, applicationNumber, tenantId, "BPA.NC_OC_APP_FEE");
            prepareDocumentsDetailsView(state, dispatch);
            (0, _utils2.applicantNameAppliedByMaping)(state, dispatch, bpaDetails, ocDetails);

          case 7:
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

var callBackForNext = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, isBasicDetailsCardValid, bpaStatus, isKathaNoAndPlotNoValidation, isRiskTypeValidation, applicationNumber, tenantId, payload, documentsFormat, validateDocumentField, i, isDocumentRequired, isDocumentTypeRequired, documents, nocData, errorMessage;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            window.scrollTo(0, 0);
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;
            hasFieldToaster = false;

            if (!(activeStep === 0)) {
              _context3.next = 39;
              break;
            }

            isBasicDetailsCardValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.basicDetails.children.cardContent.children.basicDetailsContainer.children", state, dispatch);
            /**
             * @TODO There is a bug in validation after fixing that the below statement will be removed 
             */

            isBasicDetailsCardValid = true;

            if (isBasicDetailsCardValid) {
              _context3.next = 12;
              break;
            }

            isFormValid = false;
            hasFieldToaster = true;
            _context3.next = 37;
            break;

          case 12:
            bpaStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.status", "");

            if (bpaStatus) {
              _context3.next = 27;
              break;
            }

            _context3.next = 16;
            return kathaNoAndPlotNoValidation(state, dispatch);

          case 16:
            isKathaNoAndPlotNoValidation = _context3.sent;
            _context3.next = 19;
            return riskTypeValidation(state, dispatch, activeStep);

          case 19:
            isRiskTypeValidation = _context3.sent;

            if (!(!isKathaNoAndPlotNoValidation || !isRiskTypeValidation)) {
              _context3.next = 22;
              break;
            }

            return _context3.abrupt("return", false);

          case 22:
            _context3.next = 24;
            return (0, _commons.createUpdateOCBpaApplication)(state, dispatch, "INITIATE");

          case 24:
            isFormValid = _context3.sent;

            if (!isFormValid) {
              hasFieldToaster = false;
            }
            (0, _commons.prepareDocumentsUploadData)(state, dispatch);

          case 27:
            applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.applicationNo");
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.tenantId");
            _context3.next = 31;
            return (0, _commons.getNocSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "sourceRefId", value: applicationNumber }], state);

          case 31:
            payload = _context3.sent;

            payload.Noc.sort(_index.compare);
            dispatch((0, _actions.prepareFinalObject)("Noc", payload.Noc));
            _context3.next = 36;
            return (0, _commons.prepareNOCUploadData)(state, dispatch);

          case 36:
            (0, _utils2.prepareNocFinalCards)(state, dispatch);

          case 37:
            _context3.next = 76;
            break;

          case 39:
            if (!(activeStep === 1)) {
              _context3.next = 76;
              break;
            }

            documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentDetailsUploadRedux"));
            validateDocumentField = false;

            if (!(documentsFormat && documentsFormat.length)) {
              _context3.next = 75;
              break;
            }

            i = 0;

          case 44:
            if (!(i < documentsFormat.length)) {
              _context3.next = 72;
              break;
            }

            isDocumentRequired = (0, _get2.default)(documentsFormat[i], "isDocumentRequired");
            isDocumentTypeRequired = (0, _get2.default)(documentsFormat[i], "isDocumentTypeRequired");
            documents = (0, _get2.default)(documentsFormat[i], "documents");

            if (!isDocumentRequired) {
              _context3.next = 68;
              break;
            }

            if (!(documents && documents.length > 0)) {
              _context3.next = 63;
              break;
            }

            if (!isDocumentTypeRequired) {
              _context3.next = 60;
              break;
            }

            if (!(0, _get2.default)(documentsFormat[i], "dropDownValues.value")) {
              _context3.next = 55;
              break;
            }

            validateDocumentField = true;
            _context3.next = 58;
            break;

          case 55:
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please select type of Document!", labelKey: "BPA_FOOTER_SELECT_DOC_TYPE" }, "warning"));
            validateDocumentField = false;
            return _context3.abrupt("break", 72);

          case 58:
            _context3.next = 61;
            break;

          case 60:
            validateDocumentField = true;

          case 61:
            _context3.next = 66;
            break;

          case 63:
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please uplaod mandatory documents!", labelKey: "BPA_FOOTER_UPLOAD_MANDATORY_DOC" }, "warning"));
            validateDocumentField = false;
            return _context3.abrupt("break", 72);

          case 66:
            _context3.next = 69;
            break;

          case 68:
            validateDocumentField = true;

          case 69:
            i++;
            _context3.next = 44;
            break;

          case 72:
            if (!validateDocumentField) {
              isFormValid = false;
              hasFieldToaster = true;
            } else {
              getSummaryRequiredDetails(state, dispatch);
            }
            _context3.next = 76;
            break;

          case 75:
            getSummaryRequiredDetails(state, dispatch);

          case 76:
            if (!(activeStep !== 4)) {
              _context3.next = 92;
              break;
            }

            if (!isFormValid) {
              _context3.next = 82;
              break;
            }

            if (activeStep === 1) {
              nocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "nocForPreview", []);

              if (nocData && nocData.length > 0) {
                nocData.map(function (items) {
                  if (!items.readOnly) items.readOnly = items.readOnly ? false : true;
                });
                dispatch((0, _actions.prepareFinalObject)("nocForPreview", nocData));
              }
            }
            // createUpdateOCBpaApplication(state, dispatch, "INITIATE")
            changeStep(state, dispatch);
            _context3.next = 92;
            break;

          case 82:
            if (!hasFieldToaster) {
              _context3.next = 92;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents !",
              labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
            };
            _context3.t0 = activeStep;
            _context3.next = _context3.t0 === 0 ? 87 : _context3.t0 === 1 ? 89 : 91;
            break;

          case 87:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Scrutiny Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_SCRUTINY_DETAILS_TOAST"
            };
            return _context3.abrupt("break", 91);

          case 89:
            errorMessage = {
              labelName: "Please upload all the required documents!",
              labelKey: "ERR_UPLOAD_REQUIRED_DOCUMENTS"
            };
            return _context3.abrupt("break", 91);

          case 91:
            dispatch((0, _actions.toggleSnackbar)(true, errorMessage, "warning"));

          case 92:
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
  var isNextButtonVisible = activeStep < 2 ? true : false;
  var isSendToCitizenButtonVisible = activeStep === 2 ? true : false;
  var isSubmitButtonVisible = activeStep === 2 ? true : false;

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
  }, {
    path: "components.div.children.footer.children.sendToCitizen",
    property: "visible",
    value: isSendToCitizenButtonVisible
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
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardThirdStep"), dispatch);
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
  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (activeStep === 2) {
    var nocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "nocForPreview", []);
    if (nocData && nocData.length > 0) {
      nocData.map(function (items) {
        if (items.readOnly) items.readOnly = items.readOnly ? false : true;
      });
      dispatch((0, _actions.prepareFinalObject)("nocForPreview", nocData));
    }
  }
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
      callBack: _commons.submitBpaApplication
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "APPLY"
    },
    visible: false
  },
  sendToCitizen: {
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
      sendToCitizenLabel: (0, _utils.getLabel)({
        labelName: "SEND TO CITIZEN",
        labelKey: "BPA_SEND_TO_CITIZEN_BUTTON"
      }),
      sendToCitizenIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: _commons.updateOcBpaApplication
    },
    visible: false
  }
});