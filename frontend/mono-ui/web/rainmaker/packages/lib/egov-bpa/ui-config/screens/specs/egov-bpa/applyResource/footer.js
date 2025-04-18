"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.showApplyLicencePicker = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

require("./index.css");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

var _index = require("../../../specs/utils/index");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.citizenTenantId.value");
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "DocumentType"
                  }, {
                    name: "OwnerType"
                  }, {
                    name: "OwnerShipCategory"
                  }]
                }, {
                  moduleName: "BPA",
                  masterDetails: [{
                    name: "DocTypeMapping"
                  }, {
                    name: "ApplicationType"
                  }, {
                    name: "ServiceType"
                  }],
                  RiskTypeComputation: [{
                    fromPlotArea: 500,
                    toPlotArea: "Infinity",
                    fromBuildingHeight: 15,
                    toBuildingHeight: "Infinity",
                    RiskType: "HIGH"
                  }, {
                    fromPlotArea: 300,
                    toPlotArea: 500,
                    fromBuildingHeight: 10,
                    toBuildingHeight: 15,
                    RiskType: "MEDIUM"
                  }, {
                    fromPlotArea: 0,
                    toPlotArea: 300,
                    fromBuildingHeight: 0,
                    toBuildingHeight: 10,
                    RiskType: "LOW"
                  }]
                }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            _context.next = 12;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

          case 12:
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

var getFloorDetail = function getFloorDetail(index) {
  var floorNo = ['Ground', 'First', 'Second', 'Third', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
  if (index) {
    return floorNo[index] + " floor";
  }
};

var showApplyLicencePicker = exports.showApplyLicencePicker = function showApplyLicencePicker(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.cityPickerDialog", "props.open", !toggle));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.div.children.selectButton", "visible", false));
};

var prepareDocumentsDetailsView = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var documentsPreview, reduxDocuments;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux", {});

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0 && doc.dropDownValues) {
                doc.documents.forEach(function (docDetail) {
                  var obj = {};
                  obj.title = (0, _commons.getTransformedLocale)(doc.documentCode);
                  obj.name = docDetail.fileName;
                  obj.fileStoreId = docDetail.fileStoreId;
                  obj.linkText = "View";
                  obj.link = docDetail.fileUrl && docDetail.fileUrl.split(",")[0];
                  if (docDetail.wfState === "SEND_TO_CITIZEN") {
                    obj.createdBy = "BPA_ARCHITECT";
                  } else if (docDetail.wfState === "DOC_VERIFICATION_PENDING") {
                    obj.createdBy = "BPA_DOC_VERIFIER";
                  } else if (docDetail.wfState === "FIELDINSPECTION_PENDING") {
                    obj.createdBy = "BPA_FIELD_INSPECTOR";
                  } else if (docDetail.wfState === "NOC_VERIFICATION_PENDING") {
                    obj.createdBy = "BPA_NOC_VERIFIER";
                  } else {
                    obj.createdBy = "BPA_ARCHITECT";
                  }

                  documentsPreview.push(obj);
                });
              }
            });
            dispatch((0, _actions2.prepareFinalObject)("documentDetailsPreview", documentsPreview));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function prepareDocumentsDetailsView(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getSummaryRequiredDetails = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var applicationNumber, tenantId, riskType, businessService;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.applicationNo");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            riskType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.businessService");
            businessService = "BPA.NC_APP_FEE";

            if (riskType === "BPA_LOW") {
              businessService = "BPA.LOW_RISK_PERMIT_FEE";
            }
            (0, _utils2.generateBillForBPA)(dispatch, applicationNumber, tenantId, businessService);
            prepareDocumentsDetailsView(state, dispatch);
            _context3.next = 9;
            return (0, _utils2.residentialType)(state, dispatch);

          case 9:
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
    var activeStep, isFormValid, hasFieldToaster, isBasicDetailsCardValid, isLocationDetailsCardValid, isDetailsofplotCardValid, isBuildingPlanScrutinyDetailsCardValid, isProposedBuildingDetailsCardValid, isDemolitiondetailsCardValid, isApplicantTypeCardValid, isSingleApplicantCardValid, isInstitutionCardValid, multipleApplicantCardPath, multipleApplicantCardItems, isMultipleApplicantCardValid, j, selectedApplicantType, documentsFormat, validateDocumentField, i, isDocumentRequired, isDocumentTypeRequired, documents, responseStatus, nocData, checkingOwner, ownerDetails, bpaStatus, primaryOwner, response, errorMessage, count, ownerPrimaryArray, _errorMessage, _response, _errorMessage2, applicationNumber, tenantId, payload, occupancytypeValid, _errorMessage3, _errorMessage4;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            window.scrollTo(0, 0);
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;
            hasFieldToaster = false;

            if (!(activeStep === 0)) {
              _context4.next = 12;
              break;
            }

            isBasicDetailsCardValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.basicDetails.children.cardContent.children.basicDetailsContainer.children", state, dispatch);
            isLocationDetailsCardValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.bpaDetailsConatiner.children", state, dispatch);
            isDetailsofplotCardValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.detailsofplot.children.cardContent.children.detailsOfPlotContainer.children", state, dispatch);


            if (!isBasicDetailsCardValid || !isLocationDetailsCardValid || !isDetailsofplotCardValid) {
              isFormValid = false;
              hasFieldToaster = true;
            }
            (0, _utils2.setProposedBuildingData)(state, dispatch);
            _context4.next = 12;
            return (0, _utils2.residentialType)(state, dispatch);

          case 12:

            if (activeStep === 1) {
              isBuildingPlanScrutinyDetailsCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.buildingPlanScrutinyDetails.children.cardContent.children.buildingPlanScrutinyDetailsContainer.children", state, dispatch);
              /*  let isBlockWiseOccupancyAndUsageDetailsCardValid = validateFields(
                 "components.div.children.formwizardSecondStep.children.blockWiseOccupancyAndUsageDetails.children.cardContent.children.blockWiseOccupancyAndUsageDetailscontainer.children.cardContent.children.applicantTypeSelection.children",
                 state, 
                 dispatch
               ); */

              isProposedBuildingDetailsCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.proposedBuildingDetails.children.cardContent.children.totalBuildUpAreaDetailsContainer.children", state, dispatch);
              isDemolitiondetailsCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.demolitiondetails.children.cardContent.children.demolitionDetailsContainer.children", state, dispatch);

              // let isabstractProposedBuildingDetailsCardValid = validateFields(
              //   "components.div.children.formwizardSecondStep.children.abstractProposedBuildingDetails.children.cardContent.children.proposedContainer.children.totalBuildUpAreaDetailsContainer.children",
              //   state,
              //   dispatch
              // );

              // if (
              //   !isBuildingPlanScrutinyDetailsCardValid || 
              //   //!isBlockWiseOccupancyAndUsageDetailsCardValid ||
              //   !isProposedBuildingDetailsCardValid ||
              //   !isDemolitiondetailsCardValid  
              //   // !isabstractProposedBuildingDetailsCardValid
              // ) {
              //   isFormValid = false;
              //   hasFieldToaster = true;
              // }

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

              selectedApplicantType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.landInfo.ownershipCategory", "SINGLE");

              if (selectedApplicantType.includes("INSTITUTIONAL")) {
                isSingleApplicantCardValid = true;
                isMultipleApplicantCardValid = true;
              } else if (selectedApplicantType.includes("MULTIPLEOWNERS")) {
                isSingleApplicantCardValid = true;
                isInstitutionCardValid = true;
              } else {
                isMultipleApplicantCardValid = true;
                isInstitutionCardValid = true;
              }

              if (!isApplicantTypeCardValid || !isSingleApplicantCardValid || !isInstitutionCardValid || !isMultipleApplicantCardValid) {
                isFormValid = false;
                hasFieldToaster = true;
              }
            }

            if (!(activeStep === 3)) {
              _context4.next = 51;
              break;
            }

            documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentDetailsUploadRedux"));
            validateDocumentField = false;

            if (!(documentsFormat && documentsFormat.length)) {
              _context4.next = 50;
              break;
            }

            i = 0;

          case 19:
            if (!(i < documentsFormat.length)) {
              _context4.next = 47;
              break;
            }

            isDocumentRequired = (0, _get2.default)(documentsFormat[i], "isDocumentRequired");
            isDocumentTypeRequired = (0, _get2.default)(documentsFormat[i], "isDocumentTypeRequired");
            documents = (0, _get2.default)(documentsFormat[i], "documents");

            if (!isDocumentRequired) {
              _context4.next = 43;
              break;
            }

            if (!(documents && documents.length > 0)) {
              _context4.next = 38;
              break;
            }

            if (!isDocumentTypeRequired) {
              _context4.next = 35;
              break;
            }

            if (!(0, _get2.default)(documentsFormat[i], "dropDownValues.value")) {
              _context4.next = 30;
              break;
            }

            validateDocumentField = true;
            _context4.next = 33;
            break;

          case 30:
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please select type of Document!", labelKey: "BPA_FOOTER_SELECT_DOC_TYPE" }, "warning"));
            validateDocumentField = false;
            return _context4.abrupt("break", 47);

          case 33:
            _context4.next = 36;
            break;

          case 35:
            validateDocumentField = true;

          case 36:
            _context4.next = 41;
            break;

          case 38:
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please uplaod mandatory documents!", labelKey: "BPA_FOOTER_UPLOAD_MANDATORY_DOC" }, "warning"));
            validateDocumentField = false;
            return _context4.abrupt("break", 47);

          case 41:
            _context4.next = 44;
            break;

          case 43:
            validateDocumentField = true;

          case 44:
            i++;
            _context4.next = 19;
            break;

          case 47:
            if (!validateDocumentField) {
              isFormValid = false;
              hasFieldToaster = true;
            } else {
              getSummaryRequiredDetails(state, dispatch);
            }
            _context4.next = 51;
            break;

          case 50:
            getSummaryRequiredDetails(state, dispatch);

          case 51:
            if (!(activeStep !== 4)) {
              _context4.next = 129;
              break;
            }

            if (!isFormValid) {
              _context4.next = 117;
              break;
            }

            responseStatus = "success";

            if (activeStep === 1) {
              // dispatch(prepareFinalObject("BPA.owners[0].primaryOwner", true));
              // dispatch(prepareFinalObject("BPA.owners[0].ownerType", "NONE"));
            }
            if (activeStep === 3) {
              nocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "nocForPreview", []);

              if (nocData && nocData.length > 0) {
                nocData.map(function (items) {
                  if (!items.readOnly) items.readOnly = items.readOnly ? false : true;
                });
                dispatch((0, _actions2.prepareFinalObject)("nocForPreview", nocData));
              }
            }

            if (!(activeStep === 2)) {
              _context4.next = 114;
              break;
            }

            checkingOwner = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.ownershipCategory");
            ownerDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners");
            bpaStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.status", "");

            if (!(checkingOwner && checkingOwner === "INDIVIDUAL.SINGLEOWNER")) {
              _context4.next = 79;
              break;
            }

            primaryOwner = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners[0].isPrimaryOwner");

            if (!(primaryOwner && primaryOwner === true)) {
              _context4.next = 75;
              break;
            }

            if (!bpaStatus) {
              _context4.next = 67;
              break;
            }

            changeStep(state, dispatch);
            _context4.next = 72;
            break;

          case 67:
            _context4.next = 69;
            return (0, _commons2.createUpdateBpaApplication)(state, dispatch, "INITIATE");

          case 69:
            response = _context4.sent;

            responseStatus = (0, _get2.default)(response, "status", "");
            responseStatus === "success" && changeStep(state, dispatch);

          case 72:
            (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            _context4.next = 77;
            break;

          case 75:
            errorMessage = {
              labelName: "Please check is primary owner",
              labelKey: "ERR_PRIMARY_OWNER_TOAST"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));

          case 77:
            _context4.next = 102;
            break;

          case 79:
            if (!(checkingOwner && checkingOwner === "INDIVIDUAL.MULTIPLEOWNERS")) {
              _context4.next = 102;
              break;
            }

            count = 0, ownerPrimaryArray = [];

            ownerDetails.forEach(function (owner, index) {
              var primaryOwner = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners[" + index + "].isPrimaryOwner");
              if (primaryOwner && primaryOwner === true) {
                ownerPrimaryArray.push(primaryOwner);
              }
            });

            if (!(ownerPrimaryArray && ownerPrimaryArray.length > 0)) {
              _context4.next = 100;
              break;
            }

            if (!(ownerPrimaryArray.length > 1)) {
              _context4.next = 88;
              break;
            }

            _errorMessage = {
              labelName: "Please check only one primary owner",
              labelKey: "ERR_PRIMARY_ONE_OWNER_TOAST"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage, "warning"));
            _context4.next = 98;
            break;

          case 88:
            if (!bpaStatus) {
              _context4.next = 92;
              break;
            }

            changeStep(state, dispatch);
            _context4.next = 97;
            break;

          case 92:
            _context4.next = 94;
            return (0, _commons2.createUpdateBpaApplication)(state, dispatch, "INITIATE");

          case 94:
            _response = _context4.sent;

            responseStatus = (0, _get2.default)(_response, "status", "");
            responseStatus === "success" && changeStep(state, dispatch);

          case 97:
            (0, _commons2.prepareDocumentsUploadData)(state, dispatch);

          case 98:
            _context4.next = 102;
            break;

          case 100:
            _errorMessage2 = {
              labelName: "Please check is primary owner",
              labelKey: "ERR_PRIMARY_OWNER_TOAST"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage2, "warning"));

          case 102:
            applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.applicationNo");
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.tenantId");
            _context4.next = 106;
            return (0, _commons2.getNocSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "sourceRefId", value: applicationNumber }], state);

          case 106:
            payload = _context4.sent;

            payload.Noc.sort(_index.compare);
            dispatch((0, _actions2.prepareFinalObject)("Noc", payload.Noc));
            _context4.next = 111;
            return (0, _commons2.prepareNOCUploadData)(state, dispatch);

          case 111:
            (0, _index.prepareNocFinalCards)(state, dispatch);
            _context4.next = 115;
            break;

          case 114:
            if (activeStep === 0) {
              occupancytypeValid = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.scrutinyDetails.planDetail.occupancies[0].typeHelper.type.code", []);

              if (occupancytypeValid.length === 0) {
                _errorMessage3 = {
                  labelName: "Please search scrutiny details linked to the scrutiny number",
                  labelKey: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_SEARCH_TITLE"
                };

                dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage3, "warning"));
              } else {
                responseStatus === "success" && changeStep(state, dispatch);
                /*let licenceType = get(
                  state.screenConfiguration.preparedFinalObject , 
                  "applyScreenMdmsData.licenceTypes", []
                  );
                let bpaStatus = get(
                  state.screenConfiguration.preparedFinalObject,
                  "BPA.status", ""
                )
                if(licenceType && licenceType.length > 1 && !bpaStatus) {
                  showApplyLicencePicker(state, dispatch, activeStep);
                } else {
                  responseStatus === "success" && changeStep(state, dispatch);
                }*/
              }
            } else {
              responseStatus === "success" && changeStep(state, dispatch);
            }

          case 115:
            _context4.next = 129;
            break;

          case 117:
            if (!hasFieldToaster) {
              _context4.next = 129;
              break;
            }

            _errorMessage4 = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context4.t0 = activeStep;
            _context4.next = _context4.t0 === 0 ? 122 : _context4.t0 === 1 ? 124 : _context4.t0 === 2 ? 126 : 128;
            break;

          case 122:
            _errorMessage4 = {
              labelName: "Please fill all mandatory fields for Basic Details, then proceed!",
              labelKey: "Please fill all mandatory fields for Basic Details, then proceed!"
            };
            return _context4.abrupt("break", 128);

          case 124:
            _errorMessage4 = {
              labelName: "Please fill all mandatory fields for Scrutiny Details, then proceed!",
              labelKey: "Please fill all mandatory fields for Scrutiny Details, then proceed!"
            };
            return _context4.abrupt("break", 128);

          case 126:
            _errorMessage4 = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context4.abrupt("break", 128);

          case 128:
            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage4, "warning"));

          case 129:
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
  var isNextButtonVisible = activeStep < 4 ? true : false;
  var isSendToCitizenButtonVisible = activeStep === 4 ? true : false;
  var isSubmitButtonVisible = activeStep === 4 ? true : false;

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
    case 2:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardThirdStep"), dispatch);
      break;
    case 3:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFifthStep"), dispatch);
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
  }, {
    path: "components.div.children.formwizardFourthStep",
    property: "visible",
    value: false
  }, {
    path: "components.div.children.formwizardFifthStep",
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
  if (activeStep === 4) {
    var nocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "nocForPreview", []);
    if (nocData && nocData.length > 0) {
      nocData.map(function (items) {
        if (items.readOnly) items.readOnly = items.readOnly ? false : true;
      });
      dispatch((0, _actions2.prepareFinalObject)("nocForPreview", nocData));
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
      callBack: _commons2.submitBpaApplication
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
      callBack: _commons2.updateBpaApplication
    },
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   action : "SEND_TO_CITIZEN"
    // },
    visible: false
  }
});