"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.getSummaryRequiredDetails = exports.summaryAdjustmentAmountDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preparingDocumentsReview = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, reduxDocuments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0 && doc.dropdown) {
                doc.documents.forEach(function (docDetail) {
                  var obj = {};
                  obj.title = (0, _commons.getTransformedLocale)(doc.documentCode);
                  obj.name = docDetail.fileName;
                  obj.fileStoreId = docDetail.fileStoreId;
                  obj.linkText = "View";
                  obj.link = docDetail.fileUrl && docDetail.fileUrl.split(",")[0];
                  documentsPreview.push(obj);
                });
              }
            });
            dispatch((0, _actions.prepareFinalObject)("bill-amend-review-document-data", documentsPreview));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function preparingDocumentsReview(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var summaryAdjustmentAmountDetails = exports.summaryAdjustmentAmountDetails = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var fetchBillDetails, amountType, billDetails;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchBillDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "fetchBillDetails", []);
            amountType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BILL.AMOUNTTYPE", "");
            billDetails = [];

            fetchBillDetails.map(function (bill) {
              if (bill.reducedAmountValue || bill.additionalAmountValue) {
                billDetails.push({
                  taxHeadMasterCode: bill.taxHeadCode,
                  taxAmount: amountType == "reducedAmount" ? parseFloat(bill.reducedAmountValue) : parseFloat(bill.additionalAmountValue),
                  amountType: amountType
                });
              }
            });
            dispatch((0, _actions.prepareFinalObject)("AmendmentTemp[0].estimateCardData", billDetails, []));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function summaryAdjustmentAmountDetails(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getSummaryRequiredDetails = exports.getSummaryRequiredDetails = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var effectiveFrom, effectiveTill, formatedeffectiveFrom, formatedeffectiveTill;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            effectiveFrom = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.effectiveFrom", "");
            effectiveTill = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.effectiveTill", "");

            if (effectiveFrom && effectiveFrom.length > 0) {
              formatedeffectiveFrom = effectiveFrom.split('-')[2] + "-" + effectiveFrom.split('-')[1] + "-" + effectiveFrom.split('-')[0];

              dispatch((0, _actions.prepareFinalObject)("AmendmentTemp.effectiveFrom", formatedeffectiveFrom, ""));
            }
            if (effectiveTill && effectiveTill.length > 0) {
              formatedeffectiveTill = effectiveTill.split('-')[2] + "-" + effectiveTill.split('-')[1] + "-" + effectiveTill.split('-')[0];

              dispatch((0, _actions.prepareFinalObject)("AmendmentTemp.effectiveTill", formatedeffectiveTill, ""));
            }
            _context3.next = 6;
            return (0, _utils2.onDemandRevisionBasis)(state, dispatch);

          case 6:
            _context3.next = 8;
            return preparingDocumentsReview(state, dispatch);

          case 8:
            _context3.next = 10;
            return summaryAdjustmentAmountDetails(state, dispatch);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getSummaryRequiredDetails(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var callBackForNext = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, isAddDemandRevisionBasisCard, demandRevisionBasisValue, amountType, fetchBillDetails, amountValue, i, _i, errorMessage, fromDate, toDate, _errorMessage, documentsFormat, validateDocumentField, _i2, isDocumentRequired, isDocumentTypeRequired, documents, _errorMessage2;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            window.scrollTo(0, 0);
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;
            hasFieldToaster = false;

            if (!(activeStep === 0)) {
              _context4.next = 56;
              break;
            }

            isAddDemandRevisionBasisCard = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children", state, dispatch);
            demandRevisionBasisValue = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.amendmentReason", "");

            if (isAddDemandRevisionBasisCard) {
              _context4.next = 12;
              break;
            }

            isFormValid = false;
            hasFieldToaster = true;
            _context4.next = 56;
            break;

          case 12:
            amountType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BILL.AMOUNTTYPE", "");
            fetchBillDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "fetchBillDetails", []);
            amountValue = false;

            if (!(amountType && amountType == "reducedAmount")) {
              _context4.next = 26;
              break;
            }

            i = 0;

          case 17:
            if (!(i < fetchBillDetails.length)) {
              _context4.next = 24;
              break;
            }

            if (!(fetchBillDetails[i].reducedAmountValue > 0)) {
              _context4.next = 21;
              break;
            }

            amountValue = true;
            return _context4.abrupt("break", 24);

          case 21:
            i++;
            _context4.next = 17;
            break;

          case 24:
            _context4.next = 34;
            break;

          case 26:
            _i = 0;

          case 27:
            if (!(_i < fetchBillDetails.length)) {
              _context4.next = 34;
              break;
            }

            if (!(fetchBillDetails[_i].additionalAmountValue > 0)) {
              _context4.next = 31;
              break;
            }

            amountValue = true;
            return _context4.abrupt("break", 34);

          case 31:
            _i++;
            _context4.next = 27;
            break;

          case 34:
            if (amountValue) {
              _context4.next = 39;
              break;
            }

            isFormValid = false;
            errorMessage = {
              labelName: "All Tax Heads Amount cant't be 0",
              labelKey: "ERR_NON_ZERO_AMOUNT_TOAST"
            };

            dispatch((0, _actions.toggleSnackbar)(true, errorMessage, "warning"));
            return _context4.abrupt("return");

          case 39:
            if (!(demandRevisionBasisValue !== "COURT_CASE_SETTLEMENT")) {
              _context4.next = 53;
              break;
            }

            fromDate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.effectiveFrom");
            toDate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.effectiveTill");

            if (!(new Date(fromDate) >= new Date(toDate))) {
              _context4.next = 48;
              break;
            }

            isFormValid = false;
            _errorMessage = {
              labelName: "From Date should be less than To Date",
              labelKey: "ERR_FROM_TO_DATE_TOAST"
            };

            dispatch((0, _actions.toggleSnackbar)(true, _errorMessage, "warning"));
            _context4.next = 51;
            break;

          case 48:
            _context4.next = 50;
            return (0, _utils2.prepareDocumentsUploadData)(state, dispatch);

          case 50:
            dispatch((0, _actions.prepareFinalObject)("AmendmentTemp.amendmentReason", demandRevisionBasisValue));

          case 51:
            _context4.next = 56;
            break;

          case 53:
            _context4.next = 55;
            return (0, _utils2.prepareDocumentsUploadData)(state, dispatch);

          case 55:
            dispatch((0, _actions.prepareFinalObject)("AmendmentTemp.amendmentReason", demandRevisionBasisValue));

          case 56:
            if (!(activeStep === 1)) {
              _context4.next = 93;
              break;
            }

            documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux"));
            validateDocumentField = false;

            if (!(documentsFormat && documentsFormat.length)) {
              _context4.next = 92;
              break;
            }

            _i2 = 0;

          case 61:
            if (!(_i2 < documentsFormat.length)) {
              _context4.next = 89;
              break;
            }

            isDocumentRequired = (0, _get2.default)(documentsFormat[_i2], "isDocumentRequired");
            isDocumentTypeRequired = (0, _get2.default)(documentsFormat[_i2], "isDocumentTypeRequired");
            documents = (0, _get2.default)(documentsFormat[_i2], "documents");

            if (!isDocumentRequired) {
              _context4.next = 85;
              break;
            }

            if (!(documents && documents.length > 0)) {
              _context4.next = 80;
              break;
            }

            if (!isDocumentTypeRequired) {
              _context4.next = 77;
              break;
            }

            if (!(0, _get2.default)(documentsFormat[_i2], "dropdown.value")) {
              _context4.next = 72;
              break;
            }

            validateDocumentField = true;
            _context4.next = 75;
            break;

          case 72:
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please select type of Document!",
              labelKey: "BILL_FOOTER_SELECT_DOC_TYPE"
            }, "warning"));
            validateDocumentField = false;
            return _context4.abrupt("break", 89);

          case 75:
            _context4.next = 78;
            break;

          case 77:
            validateDocumentField = true;

          case 78:
            _context4.next = 83;
            break;

          case 80:
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please uplaod mandatory documents!",
              labelKey: "BILL_FOOTER_UPLOAD_MANDATORY_DOC"
            }, "warning"));
            validateDocumentField = false;
            return _context4.abrupt("break", 89);

          case 83:
            _context4.next = 86;
            break;

          case 85:
            validateDocumentField = true;

          case 86:
            _i2++;
            _context4.next = 61;
            break;

          case 89:
            if (!validateDocumentField) {
              isFormValid = false;
              hasFieldToaster = true;
            } else {
              getSummaryRequiredDetails(state, dispatch);
            }
            _context4.next = 93;
            break;

          case 92:
            getSummaryRequiredDetails(state, dispatch);

          case 93:
            if (!(activeStep !== 4)) {
              _context4.next = 106;
              break;
            }

            if (!isFormValid) {
              _context4.next = 98;
              break;
            }

            changeStep(state, dispatch);
            _context4.next = 106;
            break;

          case 98:
            if (!hasFieldToaster) {
              _context4.next = 106;
              break;
            }

            _errorMessage2 = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context4.t0 = activeStep;
            _context4.next = _context4.t0 === 0 ? 103 : 105;
            break;

          case 103:
            _errorMessage2 = {
              labelName: "Please, provide required details",
              labelKey: "BILL_ERR_PROVIDE_REQ_DETAILS_TOAST"
            };
            return _context4.abrupt("break", 105);

          case 105:
            dispatch((0, _actions.toggleSnackbar)(true, _errorMessage2, "warning"));

          case 106:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function callBackForNext(_x7, _x8) {
    return _ref4.apply(this, arguments);
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
        labelKey: "BILL_COMMON_BUTTON_PREV_STEP"
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
        labelKey: "BILL_COMMON_BUTTON_NXT_STEP"
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
        labelKey: "BILL_COMMON_BUTTON_SUBMIT"
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
      callBack: _utils2.submitApplication
    },
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   action: "APPLY"
    // },
    visible: false
  }
});