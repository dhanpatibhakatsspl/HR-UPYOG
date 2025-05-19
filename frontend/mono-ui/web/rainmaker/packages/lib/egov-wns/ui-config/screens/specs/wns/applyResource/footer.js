"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footerReview = exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderStepsCitizen = exports.renderSteps = exports.isNextButton = exports.changeStep = undefined;

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

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

var _utils2 = require("../../utils");

require("./index.css");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isMode = (0, _commons2.isModifyMode)();
var isModeAction = (0, _commons2.isModifyModeAction)();
var setReviewPageRoute = function setReviewPageRoute(state, dispatch) {
  var roadCuttingInfo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.roadCuttingInfo", []);
  if (roadCuttingInfo && roadCuttingInfo.length > 0) {
    var formatedRoadCuttingInfo = roadCuttingInfo.filter(function (value) {
      return value.isEmpty !== true;
    });
    dispatch((0, _actions2.prepareFinalObject)("applyScreen.roadCuttingInfo", formatedRoadCuttingInfo));
  }
  var tenantId = (0, _localStorageUtils.getTenantIdCommon)();
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.applicationNo");
  var appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  var reviewUrl = appendUrl + "/wns/search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId + "&edited=true&history=true&isValidEdit=true";
  if ((0, _commons2.isModifyMode)() && (0, _commons2.isModifyModeAction)()) {
    reviewUrl += "&mode=MODIFY";
  }
  if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.locality", null) === null) {
    dispatch((0, _actions2.prepareFinalObject)("WaterConnection[0].additionalDetails.locality", (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].property.address.locality.code")));
  }
  dispatch((0, _actions.setRoute)(reviewUrl));
};
var moveToReview = function moveToReview(state, dispatch) {
  var documentsFormat = Object.values((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux"));

  var validateDocumentField = false;

  for (var i = 0; i < documentsFormat.length; i++) {
    var isDocumentRequired = (0, _get2.default)(documentsFormat[i], "isDocumentRequired");
    var isDocumentTypeRequired = (0, _get2.default)(documentsFormat[i], "isDocumentTypeRequired");

    if (isDocumentRequired) {
      var documents = (0, _get2.default)(documentsFormat[i], "documents");
      if (documents && documents.length > 0) {
        if (isDocumentTypeRequired) {
          var dropdownData = (0, _get2.default)(documentsFormat[i], "dropdown.value");
          if (dropdownData) {
            // if (get(documentsFormat[i], "dropdown.value") !== null && get(documentsFormat[i]).dropdown !==undefined ){
            validateDocumentField = true;
          } else {
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please select type of Document!", labelKey: "" }, "warning"));
            validateDocumentField = false;
            break;
          }
        } else {
          validateDocumentField = true;
        }
      } else if (!(0, _commons2.isModifyMode)()) {
        dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Please uplaod mandatory documents!", labelKey: "" }, "warning"));
        validateDocumentField = false;
        break;
      } else {
        validateDocumentField = true;
      }
    } else {
      validateDocumentField = true;
    }
  }

  return validateDocumentField;
};

var showHideFeilds = function showHideFeilds(dispatch, value) {
  var mStep = (0, _commons.getQueryArg)(window.location.href, "mode") && (0, _commons.getQueryArg)(window.location.href, "mode").toUpperCase() == 'MODIFY' ? 'formwizardSecondStep' : 'formwizardThirdStep';
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate", "visible", value));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId", "visible", value));
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
                tenantId: _common2.default.tenantId, moduleDetails: [{ moduleName: "ws-services-masters", masterDetails: [{ name: "Documents" }] }, { moduleName: "sw-services-calculation", masterDetails: [{ name: "Documents" }] }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.applyScreen.Documents", payload.MdmsRes['ws-services-masters'].Documents));
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

var callBackForNext = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, application, uploadedDocData, reviewDocData, applyScreenObject, applyScreenObj, connectionHolderObj, holderData, arrayHolderData, roadCuttingInfoDetails, waterSourceType, waterSubSource, water, sewerage, searchPropertyId, _applyScreenObject, _connectionHolderObj, _holderData, _arrayHolderData, waterData, sewerData, waterChecked, sewerChecked, modifyAppCreated, validate, errorMessage, applicationStatus, connType, applicationNumber, roadCuttingInfo, raodCuttingInfos, formatedRoadCuttingInfo, _connType, _roadCuttingInfo, roadCuttingInfos, _applicationStatus, _waterSourceType, _waterSubSource, multipleRoadTypeCardPath, multipleRoadTypeCardItems, isMultipleRoadTypeCardValid, j, _errorMessage, connectionDetailsCard, activeDetailsCard, _errorMessage2, b, i, filteredInfo, _j, _applyScreenObject2, _applyScreenObj, waterId, sewerId, _roadCuttingInfo2, _formatedRoadCuttingInfo, _errorMessage3;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            window.scrollTo(0, 0);
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;
            hasFieldToaster = false;
            /* validations for property details screen */

            if (!(activeStep === 0)) {
              _context2.next = 121;
              break;
            }

            // if (validatePropertyLocationDetails && validatePropertyDetails && validateForm) {
            //   isFormValid = await appl;
            // }

            (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children", state, dispatch);
            (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.holderDetails.children", state, dispatch);

            (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children", state, dispatch);

            if (!((0, _commons.getQueryArg)(window.location.href, "action") === "edit" && !(0, _commons2.isModifyMode)())) {
              _context2.next = 32;
              break;
            }

            application = (0, _commons2.findAndReplace)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
            uploadedDocData = application.documents;
            reviewDocData = uploadedDocData && uploadedDocData.map(function (item) {
              return {
                title: "WS_" + item.documentType,
                link: item.fileUrl && item.fileUrl.split(",")[0],
                linkText: "View",
                name: item.fileName
              };
            });

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.reviewDocData", reviewDocData));
            applyScreenObject = (0, _commons2.findAndReplace)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
            applyScreenObj = (0, _commons2.findAndReplace)(applyScreenObject, 0, null);
            //connectionholdercode

            connectionHolderObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "connectionHolders");
            holderData = connectionHolderObj[0];

            if (holderData !== null && holderData !== undefined) {
              if (holderData.sameAsPropertyAddress === true) {
                holderData = null;
              }
            }
            if (holderData == null) {
              applyScreenObject.connectionHolders = holderData;
            } else {
              arrayHolderData = [];

              arrayHolderData.push(holderData);
              applyScreenObj.connectionHolders = arrayHolderData;
            }

            if ((0, _commons2.isActiveProperty)(applyScreenObj.property)) {
              _context2.next = 24;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, { labelKey: "ERR_WS_PROP_STATUS_" + applyScreenObj.property.status, labelName: "Property Status is " + applyScreenObj.property.status }, "warning"));
            (0, _commons2.showHideFieldsFirstStep)(dispatch, "", false);
            dispatch((0, _actions2.prepareFinalObject)("applyScreen", applyScreenObj));
            return _context2.abrupt("return", false);

          case 24:
            roadCuttingInfoDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.roadCuttingInfo");

            if (roadCuttingInfoDetails === null) {
              dispatch((0, _actions2.prepareFinalObject)("applyScreen.roadCuttingInfo", []));
            }

            waterSourceType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceType", "");
            waterSubSource = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSubSource", "");

            if (waterSourceType == null || waterSourceType == "null") {
              dispatch((0, _actions2.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceTypewaterSource.selectedValues[0].waterSourceType", ""));
            }
            if (waterSubSource.includes("null")) {
              dispatch((0, _actions2.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceTypewaterSource.selectedValues[0].waterSourceType", ""));
            }
            _context2.next = 120;
            break;

          case 32:
            water = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.water");
            sewerage = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage");
            searchPropertyId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen.propertyIds");
            _applyScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen");

            //connectionholdercode

            _connectionHolderObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "connectionHolders");
            _holderData = _connectionHolderObj[0];

            if (_holderData !== null && _holderData !== undefined) {
              if (_holderData.sameAsPropertyAddress === true) {
                _holderData = null;
              }
            }
            if (_holderData == null) {
              _applyScreenObject.connectionHolders = _holderData;
            } else {
              _arrayHolderData = [];

              _arrayHolderData.push(_holderData);
              _applyScreenObject.connectionHolders = _arrayHolderData;
            }

            if (!(searchPropertyId !== undefined && searchPropertyId !== "")) {
              _context2.next = 118;
              break;
            }

            if ((0, _commons2.isActiveProperty)(_applyScreenObject.property)) {
              _context2.next = 45;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, { labelKey: "ERR_WS_PROP_STATUS_" + _applyScreenObject.property.status, labelName: "Property Status is " + _applyScreenObject.property.status }, "warning"));
            (0, _commons2.showHideFieldsFirstStep)(dispatch, "", false);
            return _context2.abrupt("return", false);

          case 45:
            if (!(0, _commons2.validateConnHolderDetails)(_applyScreenObject)) {
              _context2.next = 114;
              break;
            }

            isFormValid = true;
            hasFieldToaster = false;

            if (!(_applyScreenObject.water || _applyScreenObject.sewerage)) {
              _context2.next = 110;
              break;
            }

            if (_applyScreenObject.hasOwnProperty("property") && !_.isUndefined(_applyScreenObject["property"]) && !_.isNull(_applyScreenObject["property"]) && !_.isEmpty(_applyScreenObject["property"])) {
              if (water && sewerage) {
                if ((0, _commons2.validateFeildsForBothWaterAndSewerage)(_applyScreenObject)) {
                  isFormValid = true;
                  hasFieldToaster = false;
                } else {
                  isFormValid = false;
                  dispatch((0, _actions2.toggleSnackbar)(true, {
                    labelKey: "WS_FILL_REQUIRED_FIELDS",
                    labelName: "Please fill Required details"
                  }, "warning"));
                }
              } else if (water) {
                if ((0, _commons2.validateFeildsForWater)(_applyScreenObject)) {
                  isFormValid = true;
                  hasFieldToaster = false;
                } else {
                  isFormValid = false;
                  dispatch((0, _actions2.toggleSnackbar)(true, {
                    labelKey: "WS_FILL_REQUIRED_FIELDS",
                    labelName: "Please fill Required details"
                  }, "warning"));
                }
              } else if (sewerage) {
                if ((0, _commons2.validateFeildsForSewerage)(_applyScreenObject)) {
                  isFormValid = true;
                  hasFieldToaster = false;
                } else {
                  isFormValid = false;
                  dispatch((0, _actions2.toggleSnackbar)(true, {
                    labelKey: "WS_FILL_REQUIRED_FIELDS",
                    labelName: "Please fill Required details"
                  }, "warning"));
                }
              }
            } else {
              isFormValid = false;
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelKey: "ERR_WS_PROP_NOT_FOUND",
                labelName: "No Property records found, please search or create a new property"
              }, "warning"));
            }
            waterData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection");
            sewerData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection");
            waterChecked = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.water");
            sewerChecked = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.sewerage");
            modifyAppCreated = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.modifyAppCreated");

            if (!isFormValid) {
              _context2.next = 108;
              break;
            }

            if (!(waterData && waterData.length > 0 || sewerData && sewerData.length > 0)) {
              _context2.next = 83;
              break;
            }

            if (!(waterChecked && sewerChecked)) {
              _context2.next = 69;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.service", "Water And Sewerage"));

            if (!(sewerData && sewerData.length > 0 && waterData.length === 0)) {
              _context2.next = 64;
              break;
            }

            _context2.next = 62;
            return (0, _commons2.applyForWater)(state, dispatch);

          case 62:
            _context2.next = 67;
            break;

          case 64:
            if (!(waterData && waterData.length > 0 && sewerData.length === 0)) {
              _context2.next = 67;
              break;
            }

            _context2.next = 67;
            return (0, _commons2.applyForSewerage)(state, dispatch);

          case 67:
            _context2.next = 81;
            break;

          case 69:
            if (!(sewerChecked && sewerData.length === 0 || (0, _commons2.isModifyMode)() && sewerData.length === 1 && !modifyAppCreated)) {
              _context2.next = 76;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.service", _.capitalize(_commons2.serviceConst.SEWERAGE)));

            if (window.location.href.includes("mode=MODIFY&action=edit")) {
              _context2.next = 74;
              break;
            }

            _context2.next = 74;
            return (0, _commons2.applyForSewerage)(state, dispatch);

          case 74:
            _context2.next = 81;
            break;

          case 76:
            if (!(waterChecked && waterData.length === 0 || (0, _commons2.isModifyMode)() && waterData.length === 1 && !modifyAppCreated)) {
              _context2.next = 81;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.service", _.capitalize(_commons2.serviceConst.WATER)));

            if (window.location.href.includes("mode=MODIFY&action=edit")) {
              _context2.next = 81;
              break;
            }

            _context2.next = 81;
            return (0, _commons2.applyForWater)(state, dispatch);

          case 81:
            _context2.next = 108;
            break;

          case 83:
            if (!(waterChecked && sewerChecked)) {
              _context2.next = 92;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.service", "Water And Sewerage"));

            if (!(waterData.length === 0 && sewerData.length === 0)) {
              _context2.next = 90;
              break;
            }

            if (window.location.href.includes("mode=MODIFY&action=edit")) {
              _context2.next = 90;
              break;
            }

            _context2.next = 89;
            return (0, _commons2.applyForWaterOrSewerage)(state, dispatch);

          case 89:
            isFormValid = _context2.sent;

          case 90:
            _context2.next = 108;
            break;

          case 92:
            if (!waterChecked) {
              _context2.next = 101;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.service", _.capitalize(_commons2.serviceConst.WATER)));

            if (!(waterData.length === 0)) {
              _context2.next = 99;
              break;
            }

            if (window.location.href.includes("mode=MODIFY&action=edit")) {
              _context2.next = 99;
              break;
            }

            _context2.next = 98;
            return (0, _commons2.applyForWaterOrSewerage)(state, dispatch);

          case 98:
            isFormValid = _context2.sent;

          case 99:
            _context2.next = 108;
            break;

          case 101:
            if (!sewerChecked) {
              _context2.next = 108;
              break;
            }

            dispatch((0, _actions2.prepareFinalObject)("applyScreen.service", _.capitalize(_commons2.serviceConst.SEWERAGE)));

            if (!(sewerData.length === 0)) {
              _context2.next = 108;
              break;
            }

            if (window.location.href.includes("mode=MODIFY&action=edit")) {
              _context2.next = 108;
              break;
            }

            _context2.next = 107;
            return (0, _commons2.applyForWaterOrSewerage)(state, dispatch);

          case 107:
            isFormValid = _context2.sent;

          case 108:
            _context2.next = 112;
            break;

          case 110:
            isFormValid = false;
            hasFieldToaster = true;

          case 112:
            _context2.next = 116;
            break;

          case 114:
            isFormValid = false;
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelKey: "WS_FILL_REQUIRED_HOLDER_FIELDS",
              labelName: "Please fill Required details"
            }, "warning"));

          case 116:
            _context2.next = 120;
            break;

          case 118:
            isFormValid = false;
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelKey: "WS_FILL_REQUIRED_FIELDS",
              labelName: "Please fill Required details"
            }, "warning"));

          case 120:
            (0, _commons2.prepareDocumentsUploadData)(state, dispatch);

          case 121:
            if (!(activeStep === 1)) {
              _context2.next = 152;
              break;
            }

            if (!(0, _commons2.isModifyMode)()) {
              _context2.next = 134;
              break;
            }

            validate = (0, _commons.validateFields)("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.modificationsEffectiveFrom.children.cardContent.children.modificationEffectiveDate.children", state, dispatch);

            if (!validate) {
              _context2.next = 129;
              break;
            }

            isFormValid = true;
            hasFieldToaster = false;
            _context2.next = 132;
            break;

          case 129:
            errorMessage = {
              labelName: "Please fill all mandatory fields!",
              labelKey: "WS_FILL_REQUIRED_FIELDS"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
            return _context2.abrupt("return");

          case 132:
            _context2.next = 152;
            break;

          case 134:
            if (!moveToReview(state, dispatch)) {
              _context2.next = 150;
              break;
            }

            _context2.next = 137;
            return (0, _commons2.pushTheDocsUploadedToRedux)(state, dispatch);

          case 137:
            applicationStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationStatus", "");
            connType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.connectionType", "");
            applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationNo", "");

            if (applicationStatus === "PENDING_FOR_CONNECTION_ACTIVATION" && window.location.href.includes("action=edit")) {
              if (applicationNumber.includes("WS")) {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[0]", "isRequired", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[0]", "requiredValue", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[1]", "isRequired", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[1]", "requiredValue", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "props.required", true));

                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "props.required", false));
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "props.required", true));

                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[0]", "isRequired", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[0]", "requiredValue", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[1]", "isRequired", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[1]", "requiredValue", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "props.required", false));
              }

              if (connType === undefined || connType === "Non Metered" || connType === "Bulk-supply" || connType !== "Metered") {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "props.required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "required", false));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "props.required", false));
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "props.required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "required", true));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "props.required", true));
              }
            } else if (applicationStatus === "PENDING_FOR_FIELD_INSPECTION") {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea", "required", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea", "props.required", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType", "required", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType", "props.required", true));
            } else {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "props.required", false));

              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[0]", "isRequired", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[0]", "requiredValue", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[1]", "isRequired", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.props.dropdownFields[1]", "requiredValue", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "props.required", false));

              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType", "props.required", false));

              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.connectionExecutionDate", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "props.required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "props.required", false));
            }
            if (connType === undefined || connType === "Non Metered" || connType === "Bulk-supply" || connType !== "Metered") {
              showHideFeilds(dispatch, false);
            } else {
              showHideFeilds(dispatch, true);
            }
            isFormValid = true;hasFieldToaster = false;
            if (process.env.REACT_APP_NAME === "Citizen" && (0, _commons.getQueryArg)(window.location.href, "action") === "edit") {
              setReviewPageRoute(state, dispatch);
            }
            roadCuttingInfo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.roadCuttingInfo", []);
            raodCuttingInfos = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.raodCuttingInfos", []);


            if (roadCuttingInfo && roadCuttingInfo.length > 0) {
              dispatch((0, _actions2.prepareFinalObject)("applyScreen.tempRoadCuttingInfo", roadCuttingInfo));
              formatedRoadCuttingInfo = roadCuttingInfo.filter(function (value) {
                return value.emptyObj !== true;
              });

              dispatch((0, _actions2.prepareFinalObject)("applyScreen.roadCuttingInfo", formatedRoadCuttingInfo));
            }
            _context2.next = 152;
            break;

          case 150:
            isFormValid = false;
            hasFieldToaster = true;

          case 152:
            if (!(activeStep === 2 && process.env.REACT_APP_NAME !== "Citizen")) {
              _context2.next = 194;
              break;
            }

            if (!(0, _commons2.isModifyMode)()) {
              _context2.next = 167;
              break;
            }

            _connType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.connectionType", "");

            if (_connType === undefined || _connType === "Non Metered" || _connType === "Bulk-supply" || _connType !== "Metered") {
              showHideFeilds(dispatch, false);
            } else {
              showHideFeilds(dispatch, true);
            }

            if (!moveToReview(state, dispatch)) {
              _context2.next = 163;
              break;
            }

            _context2.next = 159;
            return (0, _commons2.pushTheDocsUploadedToRedux)(state, dispatch);

          case 159:
            isFormValid = true;hasFieldToaster = false;
            // if (process.env.REACT_APP_NAME === "Citizen" && getQueryArg(window.location.href, "action") === "edit") {
            //   setReviewPageRoute(state, dispatch);
            // }
            _context2.next = 165;
            break;

          case 163:
            isFormValid = true;
            hasFieldToaster = false;

          case 165:
            _context2.next = 190;
            break;

          case 167:
            _roadCuttingInfo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.roadCuttingInfo", []);
            roadCuttingInfos = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.roadCuttingInfos", []);
            _applicationStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationStatus", "");

            if (_applicationStatus === "PENDING_FOR_CONNECTION_ACTIVATION") {
              _waterSourceType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceType", "");
              _waterSubSource = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSubSource", "");

              if (_waterSourceType == null || _waterSourceType == "null" || _waterSourceType == "NA") {
                dispatch((0, _actions2.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceType", ""));
              }
              if (_waterSubSource.includes("null") || _waterSubSource == "NA") {
                dispatch((0, _actions2.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSubSource", ""));
              }
            }

            // Multiple roadtype cards validations
            multipleRoadTypeCardPath = "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.items";
            multipleRoadTypeCardItems = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, multipleRoadTypeCardPath, []);
            isMultipleRoadTypeCardValid = true;

            for (j = 0; j < multipleRoadTypeCardItems.length; j++) {
              if ((multipleRoadTypeCardItems[j].isDeleted === undefined || multipleRoadTypeCardItems[j].isDeleted !== false) && !(0, _commons.validateFields)(multipleRoadTypeCardPath + "[" + j + "].item" + j + ".children.cardContent.children.roadDetails.children", state, dispatch, "apply")) isMultipleRoadTypeCardValid = false;
            }

            if (isMultipleRoadTypeCardValid) {
              _context2.next = 179;
              break;
            }

            _errorMessage = {
              labelName: "Please fill all mandatory fields!",
              labelKey: "WS_FILL_REQUIRED_FIELDS"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage, "warning"));
            return _context2.abrupt("return");

          case 179:
            if (!(_applicationStatus === "PENDING_FOR_CONNECTION_ACTIVATION")) {
              _context2.next = 186;
              break;
            }

            connectionDetailsCard = (0, _utils2.validateFieldOfWNS)("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children", state, dispatch, "apply");
            activeDetailsCard = (0, _commons.validateFields)("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children", state, dispatch, "apply");

            if (!(!activeDetailsCard || !connectionDetailsCard)) {
              _context2.next = 186;
              break;
            }

            _errorMessage2 = {
              labelName: "Please fill all mandatory fields!",
              labelKey: "WS_FILL_REQUIRED_FIELDS"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage2, "warning"));
            return _context2.abrupt("return");

          case 186:
            if (roadCuttingInfos && roadCuttingInfos.length > 0) {
              for (b = 0; b < _roadCuttingInfo.length; b++) {
                if ((0, _get2.default)(roadCuttingInfos[b], "status") == "INACTIVE") {
                  _roadCuttingInfo.push(roadCuttingInfos[b]);
                }
              }
            }
            if (_roadCuttingInfo && _roadCuttingInfo.length > 0) {
              for (i = 0; i < _roadCuttingInfo.length; i++) {
                if (_roadCuttingInfo[i] == undefined) {
                  _roadCuttingInfo[i] = {};
                  _roadCuttingInfo[i].isEmpty = true;
                }
              }
              filteredInfo = [];

              _roadCuttingInfo.forEach(function (info) {
                if (info.isDeleted == false) {
                  info.status = "INACTIVE";
                }
              });
              dispatch((0, _actions2.prepareFinalObject)("applyScreen.roadCuttingInfos", _roadCuttingInfo));
              for (_j = 0; _j < _roadCuttingInfo.length; _j++) {
                if (_roadCuttingInfo[_j].isDeleted != false) {
                  filteredInfo.push(_roadCuttingInfo[_j]);
                } else {
                  filteredInfo.push({ emptyObj: true });
                }
              }
              // roadCuttingInfo.forEach(info => {
              //   if(info.isDeleted !=false) filteredInfo.push(info);
              //   else filteredInfo.push({isEmpty: true})
              // });
              // roadCuttingInfo.map(info => {
              //   if(info.isDeleted !=false) filteredInfo.push(info);
              // });
              dispatch((0, _actions2.prepareFinalObject)("applyScreen.roadCuttingInfo", filteredInfo));
            }

            if ((0, _commons.getQueryArg)(window.location.href, "action") === "edit" && (!(0, _commons2.isModifyMode)() || (0, _commons2.isModifyMode)() && (0, _commons2.isModifyModeAction)())) {
              setReviewPageRoute(state, dispatch);
            }
            isFormValid = true;

          case 190:
            _applyScreenObject2 = (0, _commons2.findAndReplace)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
            _applyScreenObj = (0, _commons2.findAndReplace)(_applyScreenObject2, 0, null);

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.snackbarWarningMessage", "props.propertyId", (0, _get2.default)(_applyScreenObj, "property.propertyId", '')));
            if ((0, _commons2.isActiveProperty)(_applyScreenObj.property)) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.snackbarWarningMessage", "visible", false));
            }

          case 194:
            if (!(activeStep === 3)) {
              _context2.next = 214;
              break;
            }

            waterId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].id");
            sewerId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].id");
            _roadCuttingInfo2 = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.roadCuttingInfo", []);

            if (_roadCuttingInfo2 && _roadCuttingInfo2.length > 0) {
              _formatedRoadCuttingInfo = _roadCuttingInfo2.filter(function (value) {
                return value.isEmpty !== true;
              });

              dispatch((0, _actions2.prepareFinalObject)("applyScreen.roadCuttingInfo", _formatedRoadCuttingInfo));
            }

            if (!(waterId && sewerId)) {
              _context2.next = 205;
              break;
            }

            _context2.next = 202;
            return acknoledgementForBothWaterAndSewerage(state, activeStep, isFormValid, dispatch);

          case 202:
            isFormValid = _context2.sent;
            _context2.next = 214;
            break;

          case 205:
            if (!waterId) {
              _context2.next = 211;
              break;
            }

            _context2.next = 208;
            return acknoledgementForWater(state, activeStep, isFormValid, dispatch);

          case 208:
            isFormValid = _context2.sent;
            _context2.next = 214;
            break;

          case 211:
            _context2.next = 213;
            return acknoledgementForSewerage(state, activeStep, isFormValid, dispatch);

          case 213:
            isFormValid = _context2.sent;

          case 214:
            if (!(activeStep !== 3)) {
              _context2.next = 229;
              break;
            }

            if (!isFormValid) {
              _context2.next = 219;
              break;
            }

            changeStep(state, dispatch);
            _context2.next = 229;
            break;

          case 219:
            if (!hasFieldToaster) {
              _context2.next = 229;
              break;
            }

            _errorMessage3 = {
              labelName: "Please fill all mandatory fields!",
              labelKey: "WS_FILL_REQUIRED_FIELDS"
            };
            _context2.t0 = activeStep;
            _context2.next = _context2.t0 === 1 ? 224 : _context2.t0 === 2 ? 226 : 228;
            break;

          case 224:
            _errorMessage3 = {
              labelName: "Please upload all Mandatory Document!",
              labelKey: "WS_UPLOAD_MANDATORY_DOCUMENTS"
            };
            return _context2.abrupt("break", 228);

          case 226:
            _errorMessage3 = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context2.abrupt("break", 228);

          case 228:
            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage3, "warning"));

          case 229:
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

var moveToSuccess = function moveToSuccess(combinedArray, dispatch) {
  var tenantId = (0, _get2.default)(combinedArray[0].property, "tenantId") || (0, _get2.default)(combinedArray[0], "tenantId");
  var purpose = "apply";
  var status = "success";
  var applicationNoWater = (0, _get2.default)(combinedArray[0], "applicationNo");
  var applicationNoSewerage = (0, _get2.default)(combinedArray[1], "applicationNo");
  var mode = (0, _commons2.isModifyMode)() ? "&mode=MODIFY" : "";
  if ((0, _commons2.isModifyMode)()) {
    if ((0, _get2.default)(combinedArray[0], "applicationNo").includes("WS")) {
      applicationNoWater = (0, _get2.default)(combinedArray[0], "applicationNo");
      applicationNoSewerage = "";
    } else {
      applicationNoSewerage = (0, _get2.default)(combinedArray[0], "applicationNo");
      applicationNoWater = "";
    }
  }
  if (applicationNoWater && applicationNoSewerage) {
    dispatch((0, _actions.setRoute)("/wns/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumberWater=" + applicationNoWater + "&applicationNumberSewerage=" + applicationNoSewerage + "&tenantId=" + tenantId + mode));
  } else if (applicationNoWater) {
    dispatch((0, _actions.setRoute)("/wns/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNoWater + "&tenantId=" + tenantId + mode));
  } else {
    dispatch((0, _actions.setRoute)("/wns/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNoSewerage + "&tenantId=" + tenantId + mode));
  }
};

var acknoledgementForBothWaterAndSewerage = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, activeStep, isFormValid, dispatch) {
    var WaterConnection, SewerageConnection, combinedArray, errorMessage;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!isFormValid) {
              _context3.next = 13;
              break;
            }

            if (activeStep === 0) {
              (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            }

            if (!(activeStep === 3)) {
              _context3.next = 10;
              break;
            }

            _context3.next = 5;
            return (0, _commons2.applyForWaterOrSewerage)(state, dispatch);

          case 5:
            isFormValid = _context3.sent;
            WaterConnection = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection");
            SewerageConnection = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "SewerageConnection");
            combinedArray = WaterConnection.concat(SewerageConnection);

            if (isFormValid) {
              moveToSuccess(combinedArray, dispatch);
            }

          case 10:
            return _context3.abrupt("return", isFormValid);

          case 13:
            if (!hasFieldToaster) {
              _context3.next = 25;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context3.t0 = activeStep;
            _context3.next = _context3.t0 === 0 ? 18 : _context3.t0 === 1 ? 20 : _context3.t0 === 2 ? 22 : 24;
            break;

          case 18:
            errorMessage = {
              labelName: "Please check the Missing/Invalid field for Property Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
            };
            return _context3.abrupt("break", 24);

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

          case 25:
            return _context3.abrupt("return", !isFormValid);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function acknoledgementForBothWaterAndSewerage(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var acknoledgementForWater = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, activeStep, isFormValid, dispatch) {
    var combinedArray, errorMessage;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!isFormValid) {
              _context4.next = 11;
              break;
            }

            if (activeStep === 0) {
              (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            }

            if (!(activeStep === 3)) {
              _context4.next = 8;
              break;
            }

            _context4.next = 5;
            return (0, _commons2.applyForWaterOrSewerage)(state, dispatch);

          case 5:
            isFormValid = _context4.sent;
            combinedArray = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection");

            if (isFormValid) {
              moveToSuccess(combinedArray, dispatch);
            }

          case 8:
            return _context4.abrupt("return", true);

          case 11:
            if (!hasFieldToaster) {
              _context4.next = 21;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context4.t0 = activeStep;
            _context4.next = _context4.t0 === 1 ? 16 : _context4.t0 === 2 ? 18 : 20;
            break;

          case 16:
            errorMessage = {
              labelName: "Please check the Missing/Invalid field for Property Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
            };
            return _context4.abrupt("break", 20);

          case 18:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context4.abrupt("break", 20);

          case 20:
            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));

          case 21:
            return _context4.abrupt("return", false);

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function acknoledgementForWater(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var acknoledgementForSewerage = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, activeStep, isFormValid, dispatch) {
    var combinedArray, errorMessage;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!isFormValid) {
              _context5.next = 11;
              break;
            }

            if (activeStep === 0) {
              (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            }

            if (!(activeStep === 3)) {
              _context5.next = 8;
              break;
            }

            _context5.next = 5;
            return (0, _commons2.applyForWaterOrSewerage)(state, dispatch);

          case 5:
            isFormValid = _context5.sent;
            combinedArray = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "SewerageConnection");

            if (isFormValid) {
              moveToSuccess(combinedArray, dispatch);
            }

          case 8:
            return _context5.abrupt("return", true);

          case 11:
            if (!hasFieldToaster) {
              _context5.next = 21;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context5.t0 = activeStep;
            _context5.next = _context5.t0 === 1 ? 16 : _context5.t0 === 2 ? 18 : 20;
            break;

          case 16:
            errorMessage = {
              labelName: "Please check the Missing/Invalid field for Property Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
            };
            return _context5.abrupt("break", 20);

          case 18:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context5.abrupt("break", 20);

          case 20:
            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));

          case 21:
            return _context5.abrupt("return", false);

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function acknoledgementForSewerage(_x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  window.scrollTo(0, 0);
  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    if (activeStep === 1 && mode === "next") {
      var isDocsUploaded = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.documents", null);
      if (isDocsUploaded) {
        activeStep = process.env.REACT_APP_NAME === "Citizen" ? 3 : 2;
      } else if ((0, _commons2.isModifyMode)()) {
        activeStep = 2;
      }
    } else if (process.env.REACT_APP_NAME === "Citizen" && activeStep === 3) {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 2;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }
  if (activeStep === 0) {
    var conHolders = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.connectionHolders");
    var isCheckedSameAsProperty = conHolders && conHolders.length > 0 && !conHolders[0].sameAsPropertyAddress ? false : true;
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.sameAsOwner.children.sameAsOwnerDetails", "props.isChecked", isCheckedSameAsProperty));
  }

  var isPreviousButtonVisible = activeStep > 0 ? true : false;
  var isNextButtonVisible = isNextButton(activeStep);
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
  if (process.env.REACT_APP_NAME === "Citizen") {
    renderStepsCitizen(activeStep, dispatch);
  } else {
    renderSteps(activeStep, dispatch);
  }
};

var isNextButton = exports.isNextButton = function isNextButton(activeStep) {
  if (process.env.REACT_APP_NAME === "Citizen" && activeStep < 2) {
    return true;
  } else if (process.env.REACT_APP_NAME !== "Citizen" && activeStep < 3) {
    return true;
  } else return false;
};

var renderSteps = exports.renderSteps = function renderSteps(activeStep, dispatch) {
  switch (activeStep) {
    case 0:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFirstStep"), dispatch);
      break;
    case 1:
      var mStepSecond = (0, _commons2.isModifyMode)() ? 'formwizardThirdStep' : 'formwizardSecondStep';
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children." + mStepSecond), dispatch);
      break;
    case 2:
      var mStep = (0, _commons2.isModifyMode)() ? 'formwizardSecondStep' : 'formwizardThirdStep';
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children." + mStep), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);

  }
};

var renderStepsCitizen = exports.renderStepsCitizen = function renderStepsCitizen(activeStep, dispatch) {
  switch (activeStep) {
    case 0:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFirstStep"), dispatch);
      break;
    case 1:
      var mStepSecond = (0, _commons2.isModifyMode)() ? 'formwizardThirdStep' : 'formwizardSecondStep';
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children." + mStepSecond), dispatch);
      break;
    case 2:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
  }
};

var getActionDefinationForStepper = exports.getActionDefinationForStepper = function getActionDefinationForStepper(path) {
  var actionDefination = [];
  if (process.env.REACT_APP_NAME === "Citizen") {
    actionDefination = [{
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    }, {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    }, {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    }];
  } else {
    var mStep1 = "formwizardThirdStep";
    var mStep2 = "formwizardSecondStep";

    if ((0, _commons2.isModifyMode)()) {
      mStep1 = "formwizardSecondStep";
      mStep2 = "formwizardThirdStep";
    }

    actionDefination = [{
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    }, {
      path: "components.div.children." + mStep2,
      property: "visible",
      value: false
    }, {
      path: "components.div.children." + mStep1,
      property: "visible",
      value: false
    }, {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    }];
  }
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], { value: false });
    if (path === actionDefination[i].path) {
      actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], { value: true });
    }
  }
  return actionDefination;
};

var callBackForPrevious = exports.callBackForPrevious = function callBackForPrevious(state, dispatch) {
  window.scrollTo(0, 0);
  changeStep(state, dispatch, "previous");
};

var footer = exports.footer = (0, _utils2.getCommonApplyFooter)("BOTTOM", {
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
        labelKey: "WS_COMMON_BUTTON_PREV_STEP"
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
        labelKey: "WS_COMMON_BUTTON_NXT_STEP"
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
        labelKey: "WS_COMMON_BUTTON_SUBMIT"
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

var footerReview = exports.footerReview = function footerReview(action, state, dispatch, status) {
  var tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "WSCERTIFICATE" },
    link: function link() {
      var Licenses = state.screenConfiguration.preparedFinalObject.Licenses;

      downloadCertificateForm(Licenses);
    },
    leftIcon: "book"
  };
  var tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "WSCERTIFICATE" },
    link: function link() {
      var Licenses = state.screenConfiguration.preparedFinalObject.Licenses;

      downloadCertificateForm(Licenses, 'print');
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "WSRECEIPT" },
    link: function link() {

      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }];
      download(receiptQueryString);
      // generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "WSRECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "consumerCodes", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") }, { key: "tenantId", value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }];
      download(receiptQueryString, "print");
      // generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "WSAPPLICATION" },
    link: function link() {
      var _state$screenConfigur = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur.Licenses,
          LicensesTemp = _state$screenConfigur.LicensesTemp;

      var documents = LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      downloadAcknowledgementForm(Licenses);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "WSAPPLICATION" },
    link: function link() {
      var _state$screenConfigur2 = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur2.Licenses,
          LicensesTemp = _state$screenConfigur2.LicensesTemp;

      var documents = LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      downloadAcknowledgementForm(Licenses, 'print');
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      break;
    case "pending_approval":
      break;
    case "CANCELLED":
      break;
    case "REJECTED":
      break;
    default:
      break;
  }
};