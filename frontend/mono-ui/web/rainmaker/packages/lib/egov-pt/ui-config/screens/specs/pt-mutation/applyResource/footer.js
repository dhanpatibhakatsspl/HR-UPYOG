"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _compact = require("lodash/compact");

var _compact2 = _interopRequireDefault(_compact);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

var _utils2 = require("../../utils");

var _transfereeDetails = require("../applyResourceMutation/transfereeDetails");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setReviewPageRoute = function setReviewPageRoute(state, dispatch) {
  var tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property.tenantId");
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property.acknowldgementNumber");
  var appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  var reviewUrl = appendUrl + "/pt-mutation/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  dispatch((0, _actions.setRoute)(reviewUrl));
};
var moveToReview = function moveToReview(state, dispatch) {
  var documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ptmDocumentsUploadRedux"));

  var validateDocumentField = false;

  for (var i = 0; i < documentsFormat.length; i++) {
    var isDocumentRequired = (0, _get2.default)(documentsFormat[i], "isDocumentRequired");
    var isDocumentTypeRequired = (0, _get2.default)(documentsFormat[i], "isDocumentTypeRequired");

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
        dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please upload mandatory documents!", labelKey: "" }, "warning"));
        validateDocumentField = false;
        break;
      }
    } else {
      validateDocumentField = true;
    }
  }

  if (validateDocumentField) {
    return true;
    // setReviewPageRoute(state, dispatch);
  } else {
    return false;
  }
};

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.tenantId");
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "MutationDocuments" }] }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;


            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.PropertyTax.Documents", payload.MdmsRes.PropertyTax.MutationDocuments));
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

var callBackForApply = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var tenantId, consumerCode, propertyPayload, errorMessage, documentsUploadRedux, isDocumentValid, newDocuments, oldDocuments, queryObject, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
            propertyPayload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property");

            consumerCode = consumerCode == null ? propertyPayload.propertyId : consumerCode;

            if (!(process.env.REACT_APP_NAME === "Citizen" && propertyPayload && !propertyPayload.declaration)) {
              _context2.next = 8;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_CITIZEN_DECLARATION_TOAST"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
            return _context2.abrupt("return");

          case 8:
            documentsUploadRedux = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ptmDocumentsUploadRedux");
            isDocumentValid = true;

            Object.keys(documentsUploadRedux).map(function (key) {
              if (documentsUploadRedux[key].documents && documentsUploadRedux[key].documents.length > 0 && !(documentsUploadRedux[key].dropdown && documentsUploadRedux[key].dropdown.value)) {
                isDocumentValid = false;
              }
            });

            if (isDocumentValid) {
              _context2.next = 14;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please select document type for uploaded document", labelKey: "ERR_DOCUMENT_TYPE_MISSING" }, "error"));
            return _context2.abrupt("return");

          case 14:
            (0, _commons.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);

            propertyPayload.workflow = {
              "businessService": "PT.MUTATION",
              tenantId: tenantId,
              "action": (0, _commons.getQueryArg)(window.location.href, "action") === "edit" ? "REOPEN" : "OPEN",
              "moduleName": "PT"
            }, propertyPayload.owners.map(function (owner) {
              owner.status = "INACTIVE";
            });

            propertyPayload.ownersTemp.map(function (owner) {
              if (owner.documentUid && owner.documentType) {
                owner.documents = [{}];
                owner.documents[0].fileStoreId = owner.documentUid;
                owner.documents[0].documentType = owner.documentType;
                owner.documents[0].documentUid = owner.documentUid;
              }
            });
            propertyPayload.additionalDetails.documentDate = (0, _utils.convertDateToEpoch)(propertyPayload.additionalDetails.documentDate);

            if (propertyPayload.ownershipCategory.includes("INDIVIDUAL") && propertyPayload.ownershipCategoryTemp.includes("INDIVIDUAL")) {
              propertyPayload.ownersTemp.map(function (owner) {
                owner.status = "ACTIVE";
                // owner.ownerType = 'NONE';
              });
              propertyPayload.owners = [].concat((0, _toConsumableArray3.default)(propertyPayload.owners), (0, _toConsumableArray3.default)(propertyPayload.ownersTemp));
              delete propertyPayload.ownersTemp;
            } else if (propertyPayload.ownershipCategory.includes("INSTITUTIONAL") && propertyPayload.ownershipCategoryTemp.includes("INDIVIDUAL")) {
              propertyPayload.ownersTemp.map(function (owner) {
                owner.status = "ACTIVE";
                owner.ownerType = 'NONE';
              });
              propertyPayload.institution = null;
              propertyPayload.owners = [].concat((0, _toConsumableArray3.default)(propertyPayload.owners), (0, _toConsumableArray3.default)(propertyPayload.ownersTemp));
              delete propertyPayload.ownersTemp;
            } else if (propertyPayload.ownershipCategory.includes("INDIVIDUAL") && propertyPayload.ownershipCategoryTemp.includes("INSTITUTIONAL")) {
              propertyPayload.owners.map(function (owner) {
                owner.altContactNumber = propertyPayload.institutionTemp.landlineNumber;
              });
              propertyPayload.institution = {};
              propertyPayload.institution.nameOfAuthorizedPerson = propertyPayload.institutionTemp.name;
              propertyPayload.institution.name = propertyPayload.institutionTemp.institutionName;
              propertyPayload.institution.designation = propertyPayload.institutionTemp.designation;
              propertyPayload.institution.tenantId = tenantId;
              propertyPayload.institution.type = propertyPayload.institutionTemp.institutionType;

              propertyPayload.institutionTemp.altContactNumber = propertyPayload.institutionTemp.landlineNumber;
              propertyPayload.institutionTemp.ownerType = "NONE";
              propertyPayload.institutionTemp.status = "ACTIVE";
              // propertyPayload.institutionTemp.type = propertyPayload.ownershipCategoryTemp;
              propertyPayload.owners = [].concat((0, _toConsumableArray3.default)(propertyPayload.owners), [propertyPayload.institutionTemp]);
              delete propertyPayload.institutionTemp;
            } else if (propertyPayload.ownershipCategory.includes("INSTITUTIONAL") && propertyPayload.ownershipCategoryTemp.includes("INSTITUTIONAL")) {
              propertyPayload.institution = {};
              propertyPayload.institution.nameOfAuthorizedPerson = propertyPayload.institutionTemp.name;
              propertyPayload.institution.name = propertyPayload.institutionTemp.institutionName;
              propertyPayload.institution.designation = propertyPayload.institutionTemp.designation;
              propertyPayload.institution.tenantId = tenantId;
              propertyPayload.institution.type = propertyPayload.institutionTemp.institutionType;

              propertyPayload.institutionTemp.altContactNumber = propertyPayload.institutionTemp.landlineNumber;
              propertyPayload.institutionTemp.ownerType = "NONE";
              propertyPayload.institutionTemp.status = "ACTIVE";
              // propertyPayload.institutionTemp.type = propertyPayload.ownershipCategoryTemp;
              propertyPayload.owners = [].concat((0, _toConsumableArray3.default)(propertyPayload.owners), [propertyPayload.institutionTemp]);
              delete propertyPayload.institutionTemp;
            }
            propertyPayload.ownershipCategory = propertyPayload.ownershipCategoryTemp;
            delete propertyPayload.ownershipCategoryTemp;
            newDocuments = Object.values(documentsUploadRedux).map(function (document) {
              if (document.dropdown && document.dropdown.value && document.documents && document.documents[0] && document.documents[0].fileStoreId) {
                var documentValue = document.dropdown.value.includes('TRANSFERREASONDOCUMENT') ? document.dropdown.value.split('.')[2] : document.dropdown.value;
                return {
                  documentType: documentValue,
                  fileStoreId: document.documents[0].fileStoreId,
                  documentUid: document.documents[0].fileStoreId,
                  auditDetails: null,
                  status: "ACTIVE"
                };
              }
            });

            newDocuments = (0, _compact2.default)(newDocuments);
            oldDocuments = [];

            oldDocuments = propertyPayload.documents && Array.isArray(propertyPayload.documents) && propertyPayload.documents.filter(function (document) {
              return document.documentType.includes('USAGEPROOF') || document.documentType.includes('OCCUPANCYPROOF') || document.documentType.includes('CONSTRUCTIONPROOF');
            });
            oldDocuments = oldDocuments || [];
            propertyPayload.documents = [].concat((0, _toConsumableArray3.default)(newDocuments), (0, _toConsumableArray3.default)(oldDocuments));

            _context2.prev = 27;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "propertyIds",
              value: consumerCode
            }];

            propertyPayload.owners = propertyPayload.owners.filter(function (owner) {
              return owner.isDeleted !== false;
            });
            propertyPayload.creationReason = 'MUTATION';
            payload = null;
            _context2.next = 34;
            return (0, _uiUtils.httpRequest)("post", "/property-services/property/_update", "_update", queryObject, { Property: propertyPayload });

          case 34:
            payload = _context2.sent;

            // dispatch(prepareFinalObject("Properties", payload.Properties));
            // dispatch(prepareFinalObject("PropertiesTemp",cloneDeep(payload.Properties)));
            if (payload) {
              (0, _commons.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
              _store2.default.dispatch((0, _actions.setRoute)("acknowledgement?purpose=apply&status=success&applicationNumber=" + payload.Properties[0].acknowldgementNumber + "&moduleName=PT.MUTATION&tenantId=" + tenantId + "\n          "));
            } else {
              (0, _commons.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
              _store2.default.dispatch((0, _actions.setRoute)("acknowledgement?purpose=apply&status=failure&applicationNumber=" + consumerCode + "&tenantId=" + tenantId + "\n          "));
            }
            _context2.next = 43;
            break;

          case 38:
            _context2.prev = 38;
            _context2.t0 = _context2["catch"](27);

            (0, _commons.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
            console.log(_context2.t0);
            _store2.default.dispatch((0, _actions.setRoute)("acknowledgement?purpose=apply&status=failure&applicationNumber=" + consumerCode + "&tenantId=" + tenantId + "\n        "));

          case 43:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[27, 38]]);
  }));

  return function callBackForApply(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var validateMobileNumber = function validateMobileNumber(state) {
  var err = false;
  var ownershipCategoryTemp = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject.Property.ownershipCategoryTemp');

  if (ownershipCategoryTemp.includes('INSTITUTIONAL')) {
    var newOwners = [(0, _get2.default)(state, 'screenConfiguration.preparedFinalObject.Property.institutionTemp', {})];
    var owners = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject.Property.owners');
    var names = owners.map(function (owner) {
      return owner.name;
    });
    // const mobileNumbers = owners.map(owner => {
    //   if (owner.status == "ACTIVE") {
    //     return owner.mobileNumber;
    //   }
    // })
    // newOwners.map(owner => {
    //   if (mobileNumbers.includes(owner.mobileNumber)) {
    //     err = "OWNER_NUMBER_SAME";
    //   }
    // })
  } else {

    var _newOwners = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject.Property.ownersTemp');
    if (_newOwners && _newOwners.length && _newOwners.length > 1) {
      _newOwners = _newOwners.filter(function (object) {
        return !(object.isDeleted === false);
      });
    }
    var _owners = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject.Property.owners');
    // const names = owners.map(owner => {
    //   return owner.name
    // })
    // const mobileNumbers = owners.map(owner => {
    //   if (owner.status == "ACTIVE") {
    //     return owner.mobileNumber;
    //   }
    // })
    // newOwners.map(owner => {
    //   if (mobileNumbers.includes(owner.mobileNumber)) {
    //     err = "OWNER_NUMBER_SAME";
    //   }
    // })
    if (!err && ownershipCategoryTemp.includes('MULTIPLEOWNERS') && _newOwners.length == 1) {
      err = "OWNERSHIPTYPE_CANNOT_BE_MULTIPLE";
    }
  }

  return err;
};

var callBackForNext = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var activeStep, isMutationDetailsCard, errorMsg, isFormValid, hasFieldToaster, isSingleOwnerValid, isMutilpleOwnerValid, isInstitutionValid, isInstitutionTypeValid, isTransfereeDetailsCardValid, isApplicantTypeValid, ismutationCardValid, isregistrationCardValid, ownershipCategory, ownershipCategoryTemp, owner, _owner, institutionTemp, temp, ownerTemp, errorMessage, errorMes;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isMutationDetailsCard = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.PropertyConfiguration[0].Mutation.MutationDetails");
            // console.log(activeStep);

            errorMsg = false;
            isFormValid = true;
            hasFieldToaster = false;


            if (activeStep === 0) {
              isSingleOwnerValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children", state, dispatch);
              isMutilpleOwnerValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[0].item0.children.cardContent.children.applicantCard.children", state, dispatch);
              isInstitutionValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.institutionDetailsContainer.children", state, dispatch);
              isInstitutionTypeValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children", state, dispatch);
              isTransfereeDetailsCardValid = isSingleOwnerValid || isMutilpleOwnerValid || isInstitutionValid && isInstitutionTypeValid;
              isApplicantTypeValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.applicantTypeSelection.children", state, dispatch);
              ismutationCardValid = isMutationDetailsCard ? (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.mutationDetails.children.cardContent.children.mutationDetailsContainer.children", state, dispatch) : true;
              isregistrationCardValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.registrationDetails.children.cardContent.children.registrationDetailsContainer.children", state, dispatch);


              if (!isregistrationCardValid || !ismutationCardValid || !isTransfereeDetailsCardValid || !isApplicantTypeValid) {
                isFormValid = false;
                hasFieldToaster = true;
              }
              if (isFormValid) {
                errorMsg = validateMobileNumber(state);

                errorMsg ? isFormValid = false : {};
              }
              if ((0, _commons.getQueryArg)(window.location.href, "action") === "edit") {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)('apply', "components.div.children.footer.children.payButton.children.submitButtonLabel", 'props.labelKey', "PT_COMMON_BUTTON_RESUBMIT"));
                (0, _transfereeDetails.onChangeTypeOfOwnership)({ value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'Property.ownershipCategoryTemp', '') }, state, dispatch);
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)('apply', "components.div.children.footer.children.payButton.children.submitButtonLabel", 'props.labelKey', "PT_COMMON_BUTTON_SUBMIT"));
              }
            }

            if (activeStep === 1) {
              isFormValid = moveToReview(state, dispatch);

              ownershipCategory = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.ownershipCategory", '');
              ownershipCategoryTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.ownershipCategoryTemp", '');


              if (ownershipCategory.includes("INSTITUTIONAL")) {
                owner = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.owners", []);

                owner = owner.filter(function (own) {
                  return own.status == "ACTIVE";
                });

                dispatch((0, _actions2.prepareFinalObject)("Property.ownersInit", owner));
              } else {
                _owner = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.owners", []);

                _owner = _owner.filter(function (own) {
                  return own.status == "ACTIVE";
                });

                dispatch((0, _actions2.prepareFinalObject)("Property.ownersInit", _owner));
              }
              if (ownershipCategoryTemp.includes("INSTITUTIONAL")) {
                institutionTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.institutionTemp", '');
                temp = {};

                temp = (0, _extends3.default)({}, institutionTemp);
                temp.name = institutionTemp.institutionName;
                temp.fatherOrHusbandName = institutionTemp.name;
                temp.permanentAddress = institutionTemp.correspondenceAddress;
                ownerTemp = [temp];

                dispatch((0, _actions2.prepareFinalObject)("Property.ownersTemp", ownerTemp));
              }
            }
            if (activeStep === 2) {}

            if (!(activeStep !== 2)) {
              _context3.next = 28;
              break;
            }

            if (!isFormValid) {
              _context3.next = 15;
              break;
            }

            if (activeStep === 0) {
              (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            }
            if (activeStep === 1) {
              getMdmsData(state, dispatch);

              // let response = await createUpdateNocApplication(
              //   state,
              //   dispatch,
              //   "INITIATE"
              // );
              // responseStatus = get(response, "status", "");
            }
            !hasFieldToaster && changeStep(state, dispatch);
            _context3.next = 28;
            break;

          case 15:
            if (!hasFieldToaster) {
              _context3.next = 27;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context3.t0 = activeStep;
            _context3.next = _context3.t0 === 0 ? 20 : _context3.t0 === 1 ? 22 : 24;
            break;

          case 20:
            errorMessage = {
              labelName: "Please check the Missing/Invalid field for Property Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
            };
            return _context3.abrupt("break", 24);

          case 22:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context3.abrupt("break", 24);

          case 24:
            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
            _context3.next = 28;
            break;

          case 27:
            if (errorMsg) {
              errorMes = {
                labelName: "Duplicate Applicant Details",
                labelKey: errorMsg
              };

              dispatch((0, _actions2.toggleSnackbar)(true, errorMes, "warning"));
            }

          case 28:
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
  var isNextButtonVisible = activeStep < 2 ? true : false;
  var isPayButtonVisible = activeStep === 2 ? true : false;
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
        labelKey: "PT_COMMON_BUTTON_PREV_STEP"
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
        labelKey: "PT_COMMON_BUTTON_NXT_STEP"
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
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "PT_COMMON_BUTTON_SUBMIT"
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
      callBack: callBackForApply
    },
    visible: false
  }
});