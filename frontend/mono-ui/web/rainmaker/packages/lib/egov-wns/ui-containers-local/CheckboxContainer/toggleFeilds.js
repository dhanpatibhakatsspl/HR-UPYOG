"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleWaterFeilds = exports.toggleSewerageFeilds = exports.togglePropertyFeilds = exports.toggleConnHolderDetails = exports.togglePlumberFeilds = exports.toggleSewerage = exports.toggleWater = undefined;

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons = require("./../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleWater = exports.toggleWater = function toggleWater(onFieldChange, value) {
  var isMode = (0, _commons.isModifyMode)();
  var mStep = isMode ? 'formwizardSecondStep' : 'formwizardThirdStep';
  onFieldChange("apply", "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNumberOfTapsPropsed", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewPipeSize", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSubSource", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSource", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewConnectionType", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading", "visible", value);
};

var toggleSewerage = exports.toggleSewerage = function toggleSewerage(onFieldChange, value) {
  var isMode = (0, _commons.isModifyMode)();
  var mStep = isMode ? 'formwizardSecondStep' : 'formwizardThirdStep';
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewConnectionType", "props.value", "Non Metered");
  onFieldChange("apply", "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfClosets", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfToilets", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterClosets", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfToilets", "visible", value);
};

var togglePlumberFeilds = exports.togglePlumberFeilds = function togglePlumberFeilds(onFieldChange, value) {
  var isMode = (0, _commons.isModifyMode)();
  var mStep = isMode ? 'formwizardSecondStep' : 'formwizardThirdStep';
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberLicenceNo", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberName", "visible", value);
  onFieldChange("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberMobNo", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.children.reviewPlumberMobileNo", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.children.reviewPlumberName", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.children.reviewPlumberLicenseNo", "visible", value);
};

var toggleConnHolderDetails = exports.toggleConnHolderDetails = function toggleConnHolderDetails(onFieldChange, value) {
  onFieldChange("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.holderDetails", "visible", value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewSix", "visible", !value);
  onFieldChange("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFive", "visible", value);
};

var togglePropertyFeilds = exports.togglePropertyFeilds = function togglePropertyFeilds(action, value) {
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyIDDetails.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.Details.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.ownerDetails.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.connectionHolderDetails.visible", value);
};

var toggleSewerageFeilds = exports.toggleSewerageFeilds = function toggleSewerageFeilds(action, value) {
  var isMode = (0, _commons.isModifyMode)();
  var mStep = isMode ? 'formwizardSecondStep' : 'formwizardThirdStep';
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets.visible", value);
  if (!value) {
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets.visible", value);
  }
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfToilets.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfClosets.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterClosets.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfToilets.visible", value);
};

var toggleWaterFeilds = exports.toggleWaterFeilds = function toggleWaterFeilds(action, value) {
  var isMode = (0, _commons.isModifyMode)();
  var mStep = isMode ? 'formwizardSecondStep' : 'formwizardThirdStep';
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSubSource.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading.visible", value);
  if (!value) {
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSubSource.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate.visible", value);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading.visible", value);
  }
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNumberOfTapsPropsed.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewPipeSize.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSubSource.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSource.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewConnectionType.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed.visible", value);
  (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps.visible", value);
  // set(
  //   action.screenConfig,
  //   "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId.visible",
  //   value
  // );
  // set(
  //   action.screenConfig,
  //   "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate.visible",
  //   value
  // );
  // set(
  //   action.screenConfig,
  //   "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading.visible",
  //   value
  // );
};