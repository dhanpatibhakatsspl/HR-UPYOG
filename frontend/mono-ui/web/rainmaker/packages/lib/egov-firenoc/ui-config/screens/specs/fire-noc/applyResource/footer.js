"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

var _utils2 = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setReviewPageRoute = function setReviewPageRoute(state, dispatch) {
  var tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.propertyDetails.address.city");
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber");
  var appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  var reviewUrl = appendUrl + "/fire-noc/summary?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  dispatch((0, _actions.setRoute)(reviewUrl));
};
var moveToReview = function moveToReview(state, dispatch) {
  var documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux"));

  var validateDocumentField = false;

  for (var i = 0; i < documentsFormat.length; i++) {
    var isDocumentRequired = (0, _get2.default)(documentsFormat[i], "isDocumentRequired");
    // let isDocumentTypeRequired = get(documentsFormat[i], "isDocumentTypeRequired");
    var isDocumentTypeRequired = false;

    var documents = (0, _get2.default)(documentsFormat[i], "documents");
    if (isDocumentRequired) {
      if (documents && documents.length > 0) {
        if (isDocumentTypeRequired) {
          if ((0, _get2.default)(documentsFormat[i], "dropdown.value")) {
            validateDocumentField = true;
          } else {
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please select type of Document!", labelKey: "" }, "warning"));
            validateDocumentField = false;
            break;
          }
        } else {
          validateDocumentField = true;
        }
      } else {
        dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please uplaod mandatory documents!", labelKey: "" }, "warning"));
        validateDocumentField = false;
        break;
      }
    } else {
      validateDocumentField = true;
    }
  }

  if (validateDocumentField) {
    setReviewPageRoute(state, dispatch);
  }
};

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city");
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{ moduleName: "FireNoc", masterDetails: [{ name: "Documents" }] }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;


            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.FireNoc.Documents", payload.MdmsRes.FireNoc.Documents));
            (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function getMdmsData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var callBackForNext = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, isMultiownerSelected, isMultiBuildingSelected, isPropertyLocationCardValid, isSinglePropertyCardValid, multiplePropertyCardPath, multiplePropertyCardItems, typeOfBuilding, multiplePropertyCardItemsData, errorMessage, isMultiplePropertyCardValid, j, noOfBuildings, isApplicantTypeCardValid, isSingleApplicantCardValid, isInstitutionCardValid, multipleApplicantCardPath, multipleApplicantCardItems, isMultipleApplicantCardValid, selectedApplicantType, ownersArray, ownersArraylength, tenantId, ownerDocs, buildDocs, docs, docsForEdit, documentsUploadRedux, businessId, updateMessage, responseStatus, response, _errorMessage, _errorMessage2;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            // console.log(activeStep);

            isFormValid = true;
            hasFieldToaster = false;
            isMultiownerSelected = false;
            isMultiBuildingSelected = false;


            if (activeStep === 1) {
              isPropertyLocationCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children", state, dispatch);
              isSinglePropertyCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children", state, dispatch);

              // Multiple buildings cards validations

              multiplePropertyCardPath = "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.children.multipleBuilding.props.items";
              multiplePropertyCardItems = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, multiplePropertyCardPath, []);
              typeOfBuilding = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings", "single");
              multiplePropertyCardItemsData = multiplePropertyCardItems && multiplePropertyCardItems.length > 0 && multiplePropertyCardItems.filter(function (data) {
                return data.isDeleted != false;
              });


              if (multiplePropertyCardItemsData.length < 2 && typeOfBuilding == "MULTIPLE") {
                isMultiBuildingSelected = true;
                isFormValid = false;
                errorMessage = {
                  labelName: "Please add all the building details!",
                  labelKey: "ERR_FILL_MULTIPLE_BUILDING_LABEL"
                };

                dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
              }

              isMultiplePropertyCardValid = true;

              for (j = 0; j < multiplePropertyCardItems.length; j++) {
                if ((multiplePropertyCardItems[j].isDeleted === undefined || multiplePropertyCardItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(multiplePropertyCardPath + "[" + j + "].item" + j + ".children.cardContent.children.multipleBuildingCard.children", state, dispatch, "apply")) isMultiplePropertyCardValid = false;
              }

              noOfBuildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings");

              if (noOfBuildings === "SINGLE") {
                isMultiplePropertyCardValid = true;
              } else {
                isSinglePropertyCardValid = true;
              }

              if (!isSinglePropertyCardValid || !isPropertyLocationCardValid || !isMultiplePropertyCardValid) {
                isFormValid = false;
                hasFieldToaster = true;
              }
              (0, _commons2.setDocsForEditFlow)(state, dispatch);
            }

            if (activeStep === 2) {
              isApplicantTypeCardValid = (0, _utils2.validateFields)("components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantTypeSelection.children", state, dispatch);
              isSingleApplicantCardValid = (0, _utils2.validateFields)("components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children", state, dispatch);
              isInstitutionCardValid = (0, _utils2.validateFields)("components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.applicantCard.children", state, dispatch);

              // Multiple applicants cards validations

              multipleApplicantCardPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items";
              // "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[0].item0.children.cardContent.children.applicantCard"

              multipleApplicantCardItems = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, multipleApplicantCardPath, []);
              isMultipleApplicantCardValid = true;

              for (j = 0; j < multipleApplicantCardItems.length; j++) {
                if ((multipleApplicantCardItems[j].isDeleted === undefined || multipleApplicantCardItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(multipleApplicantCardPath + "[" + j + "].item" + j + ".children.cardContent.children.applicantCard.children", state, dispatch, "apply")) isMultipleApplicantCardValid = false;
              }

              selectedApplicantType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "SINGLE");

              if (selectedApplicantType.includes("INSTITUTIONAL")) {
                isSingleApplicantCardValid = true;
                isMultipleApplicantCardValid = true;
              } else if (selectedApplicantType.includes("MULTIPLEOWNERS")) {
                isSingleApplicantCardValid = true;
                isInstitutionCardValid = true;
                ownersArray = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.owners", []);
                ownersArraylength = ownersArray && ownersArray.length;

                if (ownersArraylength < 2) {
                  isMultiownerSelected = true;
                  isFormValid = false;
                }
              } else {
                isMultipleApplicantCardValid = true;
                isInstitutionCardValid = true;
              }

              if (!isApplicantTypeCardValid || !isSingleApplicantCardValid || !isInstitutionCardValid || !isMultipleApplicantCardValid) {
                isFormValid = false;
                hasFieldToaster = true;
              }
            }

            if (activeStep === 3) {
              tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

              if ((0, _commons.getQueryArg)(window.location.href, "action") === "edit") {
                ownerDocs = [];
                buildDocs = [];
                docs = [];
                docsForEdit = {};
                documentsUploadRedux = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});

                Object.keys(documentsUploadRedux).map(function (key, index) {
                  if (documentsUploadRedux[key].documents && Array.isArray(documentsUploadRedux[key].documents) && documentsUploadRedux[key].documents.length > 0) {
                    var documentObj = {
                      fileName: documentsUploadRedux[key].documents[0].fileName || "Document - " + (index + 1),

                      fileUrl: documentsUploadRedux[key].documents[0].fileUrl,
                      documentType: documentsUploadRedux[key].documents[0].documentType,
                      fileStoreId: documentsUploadRedux[key].documents[0].fileStoreId,
                      tenantId: tenantId
                    };
                    if (documentsUploadRedux[key].documentType == "OWNER") {

                      ownerDocs.push((0, _extends3.default)({}, documentObj));
                      docsForEdit[documentsUploadRedux[key].documentCode] = (0, _extends3.default)({}, documentObj);
                    } else if (documentsUploadRedux[key].documentType == "BUILDING") {
                      var key1 = documentsUploadRedux[key].documentSubCode ? documentsUploadRedux[key].documentSubCode : documentsUploadRedux[key].documentCode;
                      buildDocs.push((0, _extends3.default)({}, documentObj, { documentType: key1 }));
                      docsForEdit[key1] = (0, _extends3.default)({}, documentObj);
                    }
                    docs.push((0, _extends3.default)({}, documentObj));
                  }
                });
                dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.documents", [].concat(ownerDocs)));
                dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.buildings[0].applicationDocuments", [].concat(buildDocs)));
                dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.additionalDetail.ownerAuditionalDetail", [].concat(ownerDocs)));
                dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.additionalDetail.documents", [].concat(docs)));

                //EDIT FLOW
                businessId = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");


                dispatch((0, _actions.setRoute)("/fire-noc/search-preview?applicationNumber=" + businessId + "&tenantId=" + tenantId + "&edited=true"));
                updateMessage = {
                  labelName: "Rates will be updated on submission",
                  labelKey: "TL_COMMON_EDIT_UPDATE_MESSAGE"
                };

                dispatch((0, _actions2.toggleSnackbar)(true, updateMessage, "info"));
              } else {
                moveToReview(state, dispatch);
              }
            }

            if (!(activeStep !== 3)) {
              _context2.next = 36;
              break;
            }

            if (!isFormValid) {
              _context2.next = 21;
              break;
            }

            responseStatus = "success";

            if (activeStep === 1) {
              (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            }

            if (!(activeStep === 2)) {
              _context2.next = 18;
              break;
            }

            getMdmsData(state, dispatch);
            _context2.next = 16;
            return (0, _commons2.createUpdateNocApplication)(state, dispatch, "INITIATE");

          case 16:
            response = _context2.sent;

            responseStatus = (0, _get2.default)(response, "status", "");

          case 18:
            responseStatus === "success" && changeStep(state, dispatch);
            _context2.next = 36;
            break;

          case 21:
            if (!isMultiownerSelected) {
              _context2.next = 26;
              break;
            }

            _errorMessage = {
              labelName: "Please add all the owner details!",
              labelKey: "ERR_FILL_MULTIPLE_OWNER"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage, "warning"));

            _context2.next = 36;
            break;

          case 26:
            if (!hasFieldToaster) {
              _context2.next = 36;
              break;
            }

            _errorMessage2 = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context2.t0 = activeStep;
            _context2.next = _context2.t0 === 1 ? 31 : _context2.t0 === 2 ? 33 : 35;
            break;

          case 31:
            _errorMessage2 = {
              labelName: "Please check the Missing/Invalid field for Property Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
            };
            return _context2.abrupt("break", 35);

          case 33:
            _errorMessage2 = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context2.abrupt("break", 35);

          case 35:
            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage2, "warning"));

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function callBackForNext(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    // if (activeStep === 2 && mode === "next") {
    //   const isDocsUploaded = get(
    //     state.screenConfiguration.preparedFinalObject,
    //     "LicensesTemp[0].reviewDocData",
    //     null
    //   );
    //   activeStep = isDocsUploaded ? 3 : 2;
    // } else {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    // }
  } else {
    activeStep = defaultActiveStep;
  }

  var isPreviousButtonVisible = activeStep > 0 ? true : false;
  var isNextButtonVisible = activeStep < 4 ? true : false;
  var isPayButtonVisible = activeStep === 4 ? true : false;
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
        // minWidth: "200px",
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
        labelKey: "NOC_COMMON_BUTTON_PREV_STEP"
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
        // minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: (0, _utils.getLabel)({
        labelName: "Next Step",
        labelKey: "NOC_COMMON_BUTTON_NXT_STEP"
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
        //minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "NOC_COMMON_BUTTON_SUBMIT"
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