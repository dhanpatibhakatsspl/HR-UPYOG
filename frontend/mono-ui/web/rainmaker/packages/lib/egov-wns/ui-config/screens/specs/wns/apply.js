"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.connectionHolderDetails = exports.Details = exports.IDDetails = exports.ownerDetails = exports.getData = exports.getMdmsData = exports.documentDetails = exports.reviewModificationsDetails = exports.reviewDocumentDetails = exports.reviewOwnerDetails = exports.reviewConnDetails = exports.header = exports.getHeaderLabel = exports.stepper = exports.stepperData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _lodash = require("lodash");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _toggleFeilds = require("../../../../ui-containers-local/CheckboxContainer/toggleFeilds");

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _index = require("./../utils/index");

var _additionalDetails = require("./applyResource/additionalDetails");

var _connectionDetails = require("./applyResource/connectionDetails");

var _connectionHolder = require("./applyResource/connectionHolder");

var _footer = require("./applyResource/footer");

var _ownerDetails = require("./applyResource/ownerDetails");

var _propertyLocationDetails = require("./applyResource/property-locationDetails");

var _propertyDetails = require("./applyResource/propertyDetails");

var _reviewConnectionDetails = require("./applyResource/reviewConnectionDetails");

var _reviewDocuments = require("./applyResource/reviewDocuments");

var _reviewModificationsEffective = require("./applyResource/reviewModificationsEffective");

var _reviewOwner = require("./applyResource/reviewOwner");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isMode = (0, _commons2.isModifyMode)();
var stepperData = exports.stepperData = function stepperData() {
  if (process.env.REACT_APP_NAME === "Citizen") {
    return [{ labelKey: "WS_COMMON_CONNECTION_DETAILS" }, { labelKey: "WS_COMMON_DOCS" }, { labelKey: "WS_COMMON_SUMMARY" }];
  } else if ((0, _commons2.isModifyMode)()) {
    return [{ labelKey: "WS_COMMON_PROPERTY_DETAILS" }, { labelKey: "WS_COMMON_ADDN_DETAILS" }, { labelKey: "WS_COMMON_DOCS" }, { labelKey: "WS_COMMON_SUMMARY" }];
  } else {
    return [{ labelKey: "WS_COMMON_CONNECTION_DETAILS" }, { labelKey: "WS_COMMON_DOCS" }, { labelKey: "WS_COMMON_ADDN_DETAILS" }, { labelKey: "WS_COMMON_SUMMARY" }];
  }
};
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0, classes: { root: "wns-stepper" } } }, stepperData());

var getHeaderLabel = exports.getHeaderLabel = function getHeaderLabel() {
  if ((0, _commons2.isModifyMode)()) {
    return process.env.REACT_APP_NAME === "Citizen" ? "WS_MODIFY_NEW_CONNECTION_HEADER" : "WS_MODIFY_CONNECTION_HEADER";
  }
  return process.env.REACT_APP_NAME === "Citizen" ? "WS_APPLY_NEW_CONNECTION_HEADER" : "WS_APPLICATION_NEW_CONNECTION_HEADER";
};

var header = exports.header = (0, _utils.getCommonContainer)({
  headerDiv: (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelKey: getHeaderLabel()
    })
  }),

  applicationNumberWater: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ApplicationNoContainer",
    props: { number: "NA", mode: (0, _commons2.isModifyMode)() },
    visible: false
  },

  applicationNumberSewerage: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ApplicationNoContainer",
    props: { number: "NA", mode: (0, _commons2.isModifyMode)() },
    visible: false
  }

});

var reviewConnDetails = exports.reviewConnDetails = (0, _reviewConnectionDetails.reviewConnectionDetails)();

var reviewOwnerDetails = exports.reviewOwnerDetails = (0, _reviewOwner.reviewOwner)(process.env.REACT_APP_NAME !== "Citizen");

var reviewDocumentDetails = exports.reviewDocumentDetails = (0, _reviewDocuments.reviewDocuments)();

var reviewModificationsDetails = exports.reviewModificationsDetails = (0, _commons2.isModifyMode)() ? (0, _reviewModificationsEffective.reviewModificationsEffective)(process.env.REACT_APP_NAME !== "Citizen") : {};

var summaryScreenCitizen = (0, _utils.getCommonCard)({
  reviewConnDetails: reviewConnDetails,
  reviewDocumentDetails: reviewDocumentDetails
});
var summaryScreenEMP = (0, _utils.getCommonCard)({
  reviewConnDetails: reviewConnDetails,
  reviewModificationsDetails: reviewModificationsDetails,
  reviewDocumentDetails: reviewDocumentDetails,
  reviewOwnerDetails: reviewOwnerDetails
});
var summaryScreen = process.env.REACT_APP_NAME === "Citizen" ? summaryScreenCitizen : summaryScreenEMP;
var documentDetails = exports.documentDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({ labelName: "Required Documents", labelKey: "WS_DOCUMENT_DETAILS_HEADER" }, { style: { marginBottom: 18 } }),
  subText: (0, _utils.getCommonParagraph)({
    labelName: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "WS_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: (0, _utils.getBreak)(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "DocumentListContainer",
    props: {
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "WS_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      // description: "Only .jpg and .pdf files. 6MB max file size.",
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      maxFileSize: 5000
    },
    type: "array"
  }
});

var getMdmsData = exports.getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var mdmsBody, payload, pipeSize, waterSource, GROUND, SURFACE, BULKSUPPLY, filtered, OwnerShipCategory, institutions;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{ moduleName: "common-masters", masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }] }, { moduleName: "tenant", masterDetails: [{ name: "tenants" }] }, { moduleName: "sw-services-calculation", masterDetails: [{ name: "Documents" }, { name: "RoadType" }] }, { moduleName: "ws-services-calculation", masterDetails: [{ name: "PipeSize" }] }, {
                  moduleName: "ws-services-masters", masterDetails: [{ name: "Documents" }, { name: "ModifyConnectionDocuments" }, { name: "waterSource" }, { name: "connectionType" }, { name: "PropertySearch" }]
                }, { moduleName: "PropertyTax", masterDetails: [{ name: "PTWorkflow" }] }]
              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;

            if (payload.MdmsRes['ws-services-calculation'].PipeSize !== undefined && payload.MdmsRes['ws-services-calculation'].PipeSize.length > 0) {
              pipeSize = [];

              payload.MdmsRes['ws-services-calculation'].PipeSize.forEach(function (obj) {
                return pipeSize.push({ code: obj.size, name: obj.id, isActive: obj.isActive });
              });
              payload.MdmsRes['ws-services-calculation'].pipeSize = pipeSize;
              waterSource = [], GROUND = [], SURFACE = [], BULKSUPPLY = [];

              payload.MdmsRes['ws-services-masters'].waterSource.forEach(function (obj) {
                waterSource.push({
                  code: obj.code.split(".")[0],
                  name: obj.name,
                  isActive: obj.active
                });
                if (obj.code.split(".")[0] === "GROUND") {
                  GROUND.push({
                    code: obj.code.split(".")[1],
                    name: obj.name,
                    isActive: obj.active
                  });
                } else if (obj.code.split(".")[0] === "SURFACE") {
                  SURFACE.push({
                    code: obj.code.split(".")[1],
                    name: obj.name,
                    isActive: obj.active
                  });
                } else if (obj.code.split(".")[0] === "BULKSUPPLY") {
                  BULKSUPPLY.push({
                    code: obj.code.split(".")[1],
                    name: obj.name,
                    isActive: obj.active
                  });
                }
              });
              filtered = waterSource.reduce(function (filtered, item) {
                if (!filtered.some(function (filteredItem) {
                  return JSON.stringify(filteredItem.code) == JSON.stringify(item.code);
                })) filtered.push(item);
                return filtered;
              }, []);

              payload.MdmsRes['ws-services-masters'].waterSource = filtered;
              payload.MdmsRes['ws-services-masters'].GROUND = GROUND;
              payload.MdmsRes['ws-services-masters'].SURFACE = SURFACE;
              payload.MdmsRes['ws-services-masters'].BULKSUPPLY = BULKSUPPLY;
            }

            //related to ownershipcategory
            OwnerShipCategory = (0, _get2.default)(payload, "MdmsRes.common-masters.OwnerShipCategory");
            institutions = [];

            OwnerShipCategory = OwnerShipCategory.map(function (category) {
              if (category.code.includes("INDIVIDUAL")) {
                return category.code;
              } else {
                var code = category.code.split(".");
                institutions.push({ code: code[1], parent: code[0], active: true });
                return code[0];
              }
            });
            OwnerShipCategory = OwnerShipCategory.filter(function (v, i, a) {
              return a.indexOf(v) === i;
            });
            OwnerShipCategory = OwnerShipCategory.map(function (val) {
              return { code: val, active: true };
            });

            payload.MdmsRes['common-masters'].Institutions = institutions;
            payload.MdmsRes['common-masters'].OwnerShipCategory = OwnerShipCategory;
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            _context.next = 19;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](1);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 17]]);
  }));

  return function getMdmsData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var showHideFieldModifyConnection = function showHideFieldModifyConnection(action) {
  var fieldsChanges = [["components.div.children.formwizardFirstStep.children.OwnerInfoCard", false], ["components.div.children.formwizardFourthStep.children.snackbarWarningMessage.children.clickHereLink", true], ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSeven", false], ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight", false], ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewNine", false], ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTen", false]];
  for (var i = 0; i < fieldsChanges.length; i++) {
    (0, _lodash.set)(action.screenConfig, fieldsChanges[i][0] + ".visible", fieldsChanges[i][1]);
  }
};

var showHideFiedsPendingForConnectionActivation = function showHideFiedsPendingForConnectionActivation(action, state, dispatch) {
  var applicationStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationStatus", "");
  if (applicationStatus === "PENDING_FOR_CONNECTION_ACTIVATION") {

    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps.props.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize.props.isDisabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.props.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets.props.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets.props.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.hasAddItem", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea.props.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType.props.isDisabled", true);
  } else {
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps.props.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize.props.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.props.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets.props.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets.props.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.hasAddItem", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea.props.disabled", false);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType.props.disabled", false);
  }
  if ((0, _commons.getQueryArg)(window.location.href, "action") == 'edit') {
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.props.disabled", true);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.disabled", true);
  }
};

var getData = exports.getData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var applicationNo, connectionNo, tenantId, propertyID, actionType, mStep, queryObject, payloadWater, payloadSewerage, waterConnections, sewerageConnections, combinedArray, oldcombinedArray, data, _queryObject, propId, docs, applicationStatus, _queryObject2;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            applicationNo = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
            connectionNo = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            propertyID = (0, _commons.getQueryArg)(window.location.href, "propertyId");
            actionType = (0, _commons.getQueryArg)(window.location.href, "action");
            mStep = (0, _commons2.isModifyMode)() ? 'formwizardSecondStep' : 'formwizardThirdStep';
            _context2.next = 8;
            return getMdmsData(dispatch);

          case 8:
            if (!applicationNo) {
              _context2.next = 69;
              break;
            }

            //Edit/Update Flow ----
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "applicationNumber", value: applicationNo }];

            if (!(actionType && actionType.toUpperCase() === "EDIT")) {
              _context2.next = 67;
              break;
            }

            if (connectionNo) {
              (0, _commons2.handleApplicationNumberDisplay)(dispatch, connectionNo);
            } else {
              (0, _commons2.handleApplicationNumberDisplay)(dispatch, applicationNo);
            }
            payloadWater = void 0, payloadSewerage = void 0;

            if (!applicationNo.includes("SW")) {
              _context2.next = 29;
              break;
            }

            _context2.prev = 14;
            _context2.next = 17;
            return (0, _commons2.getSearchResultsForSewerage)(queryObject, dispatch);

          case 17:
            payloadSewerage = _context2.sent;
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](14);
            console.error(_context2.t0);

          case 23:
            payloadSewerage.SewerageConnections[0].water = false;
            payloadSewerage.SewerageConnections[0].sewerage = true;
            payloadSewerage.SewerageConnections[0].service = "Sewerage";
            dispatch((0, _actions.prepareFinalObject)("SewerageConnection", payloadSewerage.SewerageConnections));
            _context2.next = 44;
            break;

          case 29:
            _context2.prev = 29;
            _context2.next = 32;
            return (0, _commons2.getSearchResults)(queryObject);

          case 32:
            payloadWater = _context2.sent;
            _context2.next = 38;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t1 = _context2["catch"](29);
            console.error(_context2.t1);

          case 38:
            ;
            payloadWater.WaterConnection[0].water = true;
            payloadWater.WaterConnection[0].sewerage = false;
            payloadWater.WaterConnection[0].service = "Water";
            dispatch((0, _actions.prepareFinalObject)("WaterConnection", payloadWater.WaterConnection));
            if ((0, _get2.default)(payloadWater, "WaterConnection[0].waterSource", null) && (0, _get2.default)(payloadWater, "WaterConnection[0].waterSubSource", null)) {
              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues", [{
                waterSourceType: (0, _get2.default)(payloadWater, "WaterConnection[0].waterSource", null),
                waterSubSource: (0, _get2.default)(payloadWater, "WaterConnection[0].waterSourceSubSource", null)
              }]));
            } else if ((0, _get2.default)(payloadWater, "WaterConnection[0].waterSource", null)) {
              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues", [{
                waterSourceType: (0, _get2.default)(payloadWater, "WaterConnection[0].waterSource", null),
                waterSubSource: (0, _get2.default)(payloadWater, "WaterConnection[0].waterSourceSubSource", null)
              }]));
            }

          case 44:
            waterConnections = payloadWater ? payloadWater.WaterConnection : [];

            if (waterConnections.length > 0) {
              waterConnections[0].additionalDetails.locality = (0, _get2.default)(waterConnections[0], "property.address.locality.code");
            }
            sewerageConnections = payloadSewerage ? payloadSewerage.SewerageConnections : [];

            if (sewerageConnections.length > 0) {
              sewerageConnections[0].additionalDetails.locality = (0, _get2.default)(sewerageConnections[0], "property.address.locality.code");
            }
            combinedArray = waterConnections.concat(sewerageConnections);


            if (!window.location.href.includes("propertyId")) {
              if (!(0, _commons2.isActiveProperty)(combinedArray[0].property)) {
                dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_PROP_STATUS_" + combinedArray[0].property.status, labelName: "Property Status is " + combinedArray[0].property.status }, "warning"));
                (0, _commons2.showHideFieldsFirstStep)(dispatch, "", false);
              }
            }
            // For Modify connection details
            if ((0, _commons2.isModifyMode)() && !(0, _commons2.isModifyModeAction)()) {
              // this delete for initiate modify connection 
              if (!window.location.href.includes("mode=MODIFY&action=edit")) delete combinedArray[0].id;combinedArray[0].documents = [];
            }
            if ((0, _commons2.isModifyMode)() && (0, _commons2.isModifyModeAction)()) {
              // ModifyEdit should not call create.
              dispatch((0, _actions.prepareFinalObject)("modifyAppCreated", true));
            }

            dispatch((0, _actions.prepareFinalObject)("applyScreen", (0, _commons2.findAndReplace)(combinedArray[0], "null", "NA")));
            // For oldvalue display
            oldcombinedArray = (0, _cloneDeep2.default)(combinedArray[0]);

            dispatch((0, _actions.prepareFinalObject)("applyScreenOld", (0, _commons2.findAndReplace)(oldcombinedArray, "null", "NA")));
            if (combinedArray[0].connectionHolders && combinedArray[0].connectionHolders !== "NA") {
              combinedArray[0].connectionHolders[0].sameAsPropertyAddress = false;
              dispatch((0, _actions.prepareFinalObject)("connectionHolders", combinedArray[0].connectionHolders));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.sameAsOwner.children.sameAsOwnerDetails", "props.isChecked", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.holderDetails", "visible", true));
              (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardFirstStep.children.connectionHolderDetails.visible", true);
            }
            data = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen");

            if (data.connectionType !== "Metered") {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", false));
            }
            if (data.additionalDetails !== undefined && data.additionalDetails.detailsProvidedBy !== undefined) {
              if (data.additionalDetails.detailsProvidedBy === "Self") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberLicenceNo", "visible", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberName", "visible", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberMobNo", "visible", false));
              } else if (data.additionalDetails.detailsProvidedBy === "ULB") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberLicenceNo", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberName", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberMobNo", "visible", true));
              }
            }
            if (propertyID) {
              _queryObject = [{ key: "tenantId", value: tenantId }, { key: "propertyIds", value: propertyID }];

              getApplyPropertyDetails(_queryObject, dispatch, propertyID);
            } else {
              propId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.property.propertyId");

              dispatch((0, _actions.prepareFinalObject)("searchScreen.propertyIds", propId));
            }
            //For Modify Connection hide the connection details card
            if ((0, _commons2.isModifyMode)()) {
              showHideFieldModifyConnection(action);
            }
            docs = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
            _context2.next = 64;
            return (0, _commons2.prefillDocuments)(docs, "displayDocs", dispatch);

          case 64:
            showHideFiedsPendingForConnectionActivation(action, state, dispatch);
            applicationStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationStatus", "");

            if (applicationStatus === "PENDING_FOR_FIELD_INSPECTION") {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea", "required", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.enterArea", "props.required", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType", "required", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.roadCuttingChargeContainer.children.cardContent.children.applicantTypeContainer.children.roadCuttingChargeInfoCard.children.multipleApplicantInfo.props.scheama.children.cardContent.children.roadDetails.children.roadType", "props.required", true));
            }

          case 67:
            _context2.next = 70;
            break;

          case 69:
            if (propertyID) {
              _queryObject2 = [{ key: "tenantId", value: tenantId }, { key: "propertyIds", value: propertyID }];

              getApplyPropertyDetails(_queryObject2, dispatch, propertyID);
            }

          case 70:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[14, 20], [29, 35]]);
  }));

  return function getData(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getApplicationNoLabel = function getApplicationNoLabel() {
  if ((0, _commons2.isModifyMode)() && !(0, _commons2.isModifyModeAction)()) {
    return "WS_ACKNO_CONNECTION_NO_LABEL";
  }
  return "WS_ACKNO_APP_NO_LABEL";
};

var getApplyPropertyDetails = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject, dispatch, propertyID) {
    var payload, propertyObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _commons2.getPropertyResults)(queryObject, dispatch);

          case 2:
            payload = _context3.sent;
            propertyObj = payload.Properties[0];

            if (!(0, _commons2.isActiveProperty)(propertyObj)) {
              dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_PROP_STATUS_" + propertyObj.status, labelName: "Property Status is " + propertyObj.status }, "warning"));
              (0, _commons2.showHideFieldsFirstStep)(dispatch, propertyObj.propertyId, false);
            }
            if (propertyObj && propertyObj.owners && propertyObj.owners.length > 0) {
              propertyObj.owners = propertyObj.owners.filter(function (owner) {
                return owner.status == "ACTIVE";
              });
            }
            if (propertyObj.units == "NA" && propertyObj.additionalDetails && propertyObj.additionalDetails.subUsageCategory) {
              propertyObj.units = [];
              propertyObj.units.push({ usageCategory: propertyObj.additionalDetails.subUsageCategory });
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreen.property", (0, _commons2.findAndReplace)(propertyObj, null, "NA")));
            dispatch((0, _actions.prepareFinalObject)("searchScreen.propertyIds", propertyID));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getApplyPropertyDetails(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var propertyDetail = (0, _propertyLocationDetails.getPropertyDetails)();
var propertyIDDetails = (0, _propertyDetails.getPropertyIDDetails)();
var ownerDetail = (0, _ownerDetails.getOwnerDetails)();
var holderDetails = (0, _connectionHolder.getHolderDetails)();

var ownerDetails = exports.ownerDetails = (0, _utils.getCommonCard)({ ownerDetailsHeader: _ownerDetails.ownerDetailsHeader, ownershipType: _ownerDetails.ownershipType, ownerDetail: ownerDetail });
var IDDetails = exports.IDDetails = (0, _utils.getCommonCard)({ propertyHeader: _propertyDetails.propertyHeader, propertyID: _propertyDetails.propertyID, propertyIDDetails: propertyIDDetails });
var Details = exports.Details = (0, _utils.getCommonCard)({ propertyDetail: propertyDetail });
var connectionHolderDetails = exports.connectionHolderDetails = (0, _utils.getCommonCard)({ holderHeader: _connectionHolder.holderHeader, sameAsOwner: _connectionHolder.sameAsOwner, holderDetails: holderDetails });

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form1" },
  children: { IDDetails: IDDetails, Details: Details, ownerDetails: ownerDetails, connectionHolderDetails: connectionHolderDetails, OwnerInfoCard: _connectionDetails.OwnerInfoCard }
};
var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form2" },
  children: { documentDetails: documentDetails },
  visible: false
};

var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form3" },
  children: { additionDetails: _additionalDetails.additionDetails },
  visible: false
};

var formwizardFourthStep = exports.formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form4" },
  children: { snackbarWarningMessage: _reviewConnectionDetails.snackbarWarningMessage, summaryScreen: summaryScreen },
  visible: false
};

var pageReset = function pageReset(dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components", "div", {}));
  // dispatch(handleField("search",
  // "components",
  // "div", {}));
  // dispatch(handleField("search-preview",
  // "components",
  // "div", {}));
  dispatch((0, _actions.unMountScreen)("search"));
  dispatch((0, _actions.unMountScreen)("search-preview"));
  dispatch((0, _actions.prepareFinalObject)("WaterConnection", []));
  dispatch((0, _actions.prepareFinalObject)("SewerageConnection", []));
  dispatch((0, _actions.prepareFinalObject)("applyScreen", {}));
  dispatch((0, _actions.prepareFinalObject)("searchScreen", {}));
  dispatch((0, _actions.prepareFinalObject)("connectionHolders", []));
  dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", {}));
  dispatch((0, _actions.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource.selectedValues", []));
  propertyDetail = (0, _propertyLocationDetails.getPropertyDetails)();
  propertyIDDetails = (0, _propertyDetails.getPropertyIDDetails)();
  ownerDetail = (0, _ownerDetails.getOwnerDetails)();
  holderDetails = (0, _connectionHolder.getHolderDetails)();
  exports.ownerDetails = ownerDetails = (0, _utils.getCommonCard)({ ownerDetailsHeader: _ownerDetails.ownerDetailsHeader, ownershipType: _ownerDetails.ownershipType, ownerDetail: ownerDetail });
  exports.IDDetails = IDDetails = (0, _utils.getCommonCard)({ propertyHeader: _propertyDetails.propertyHeader, propertyID: _propertyDetails.propertyID, propertyIDDetails: propertyIDDetails });
  exports.Details = Details = (0, _utils.getCommonCard)({ propertyDetail: propertyDetail });
  exports.connectionHolderDetails = connectionHolderDetails = (0, _utils.getCommonCard)({ holderHeader: _connectionHolder.holderHeader, sameAsOwner: _connectionHolder.sameAsOwner, holderDetails: holderDetails });
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  // hasBeforeInitAsync:true,
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {

    // dispatch(prepareFinalObject("applyScreen.water", true));
    // dispatch(prepareFinalObject("applyScreen.sewerage", false));
    var propertyId = (0, _commons.getQueryArg)(window.location.href, "propertyId");

    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");

    if ((0, _commons.getQueryArg)(window.location.href, "edited") != "true") {
      pageReset(dispatch);
      getData(action, state, dispatch).then(function () {
        var ownershipCategory = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory", []);
        dispatch((0, _actions.prepareFinalObject)("OwnershipCategory", ownershipCategory));
      });
      dispatch((0, _actions.prepareFinalObject)("applyScreen.water", true));
      dispatch((0, _actions.prepareFinalObject)("applyScreen.sewerage", false));
      if (propertyId) {
        (0, _toggleFeilds.togglePropertyFeilds)(action, true);
        if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.water") && (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
          (0, _toggleFeilds.toggleWaterFeilds)(action, true);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, true);
        } else if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
          (0, _toggleFeilds.toggleWaterFeilds)(action, false);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, true);
        } else {
          (0, _toggleFeilds.toggleWaterFeilds)(action, true);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, false);
        }
      } else if (applicationNumber && (0, _commons.getQueryArg)(window.location.href, "action") === "edit") {
        (0, _toggleFeilds.togglePropertyFeilds)(action, true);
        if (applicationNumber.includes("SW")) {
          dispatch((0, _actions.prepareFinalObject)("applyScreen.water", false));
          dispatch((0, _actions.prepareFinalObject)("applyScreen.sewerage", true));
          (0, _toggleFeilds.toggleWaterFeilds)(action, false);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, true);
        } else {
          dispatch((0, _actions.prepareFinalObject)("applyScreen.water", true));
          dispatch((0, _actions.prepareFinalObject)("applyScreen.sewerage", false));
          (0, _toggleFeilds.toggleWaterFeilds)(action, true);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, false);
        }
      } else {
        (0, _toggleFeilds.togglePropertyFeilds)(action, false);
        if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.water") && (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
          (0, _toggleFeilds.toggleWaterFeilds)(action, true);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, true);
        } else if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
          (0, _toggleFeilds.toggleWaterFeilds)(action, false);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, true);
        } else {
          (0, _toggleFeilds.toggleWaterFeilds)(action, true);
          (0, _toggleFeilds.toggleSewerageFeilds)(action, false);
        }
      }
    } else {
      (0, _toggleFeilds.togglePropertyFeilds)(action, true);
      if (applicationNumber.includes("SW")) {
        dispatch((0, _actions.prepareFinalObject)("applyScreen.water", false));
        dispatch((0, _actions.prepareFinalObject)("applyScreen.sewerage", true));
        (0, _toggleFeilds.toggleWaterFeilds)(action, false);
        (0, _toggleFeilds.toggleSewerageFeilds)(action, true);
      } else {
        dispatch((0, _actions.prepareFinalObject)("applyScreen.water", true));
        dispatch((0, _actions.prepareFinalObject)("applyScreen.sewerage", false));
        (0, _toggleFeilds.toggleWaterFeilds)(action, true);
        (0, _toggleFeilds.toggleSewerageFeilds)(action, false);
      }
      (0, _lodash.set)(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumberWater.visible", true);
      (0, _lodash.set)(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumberWater.props.number", applicationNumber);
      showHideFiedsPendingForConnectionActivation(action, state, dispatch);
    }
    if ((0, _commons2.isModifyMode)()) {
      (0, _index.triggerModificationsDisplay)(action, true);
    } else {
      (0, _index.triggerModificationsDisplay)(action, false);
    }
    (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
    (0, _lodash.set)(action, "screenConfig.components.div.children.stepper.props.steps", stepperData());
    (0, _lodash.set)(action, 'screenConfig.components.div.children.headerDiv.children.header.children.headerDiv.children.header.children.key.props.labelKey', getHeaderLabel());
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components", "div", (0, _get2.default)(action, "screenConfig.components.div", {})));
    isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
    isMode = isMode ? isMode.toUpperCase() : "";
    var connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var action1 = (0, _commons.getQueryArg)(window.location.href, "action");

    var modeaction1 = (0, _commons.getQueryArg)(window.location.href, "modeaction");

    var mode = (0, _commons.getQueryArg)(window.location.href, "mode");
    var modifyLink = void 0;
    if (isMode === "MODIFY") {
      modifyLink = "/wns/apply?";
      modifyLink = applicationNumber ? modifyLink + ("applicationNumber=" + applicationNumber) : modifyLink;
      modifyLink = connectionNumber ? modifyLink + ("&connectionNumber=" + connectionNumber) : modifyLink;
      modifyLink = action1 ? modifyLink + ("&action=" + action1) : modifyLink;
      modifyLink = modeaction1 ? modifyLink + ("&modeaction=" + modeaction1) : modifyLink;
      modifyLink = isMode ? modifyLink + ("&mode=" + isMode) : modifyLink;
      modifyLink = tenantId ? modifyLink + ("&tenantId=" + tenantId) : modifyLink;
    } else {
      modifyLink = "/wns/apply";
    }
    (0, _lodash.set)(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumberSewerage.props.mode", (0, _commons2.isModifyMode)() && !(0, _commons2.isModifyModeAction)());
    (0, _lodash.set)(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumberWater.props.mode", (0, _commons2.isModifyMode)() && !(0, _commons2.isModifyModeAction)());
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.clickHereLink.props.url", modifyLink);
    (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.clickHereLink.props.isMode", isMode);
    if ((0, _commons.getQueryArg)(window.location.href, "action") == 'edit') {
      (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.props.disabled", true);
      (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.disabled", true);
    } else {
      (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.props.disabled", false);
      (0, _lodash.set)(action, "screenConfig.components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getCheckboxContainer.disabled", false);
    }
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: { className: "common-div-css search-preview" },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: { header: (0, _extends3.default)({ gridDefination: { xs: 12, sm: 10 } }, header) }
        },
        stepper: stepper,
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        formwizardFourthStep: formwizardFourthStep,
        footer: _footer.footer
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "ViewBreakupContainer",
      props: { open: false, maxWidth: "md", screenKey: "apply" }
    }
  }
};

exports.default = screenConfig;