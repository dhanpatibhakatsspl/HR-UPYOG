"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewOwner = exports.reviewInitialMeterReading = exports.reviewMeterInstallationDate = exports.reviewMeterId = exports.reviewConnectionExecutionDate = exports.reviewArea = exports.reviewRoadType = exports.reviewPlumberMobileNo = exports.reviewPlumberName = exports.reviewPlumberLicenseNo = exports.reviewPlumberProvidedBy = exports.reviewNumberOfToilets = exports.reviewWaterClosets = exports.reviewPipeSize = exports.reviewWaterSubSource = exports.reviewWaterSource = exports.reviewNumberOfTaps = exports.reviewConnectionType = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _footer = require("./footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var connectionDetailsHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

var connectionChargeDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PLUMBER_DETAILS"
});

var roadCuttingChargesHeader = getHeader({
  labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILS"
});

var activationDetailsHeader = getHeader({
  labelKey: "WS_ACTIVATION_DETAILS"
});

var reviewConnectionType = exports.reviewConnectionType = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Connection Type",
  labelKey: "WS_SERV_DETAIL_CONN_TYPE"
}, {
  jsonPath: "applyScreen.connectionType",
  localePrefix: {
    moduleName: "WS_SERVICES_MASTERS",
    masterName: "WATERSOURCE"
  },
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.connectionType",
  localePrefix: {
    moduleName: "WS_SERVICES_MASTERS",
    masterName: "WATERSOURCE"
  },
  callBack: _utils2.handleNA
});
var reviewNumberOfTaps = exports.reviewNumberOfTaps = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "No. of Taps",
  labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
}, {
  jsonPath: "applyScreen.noOfTaps",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.noOfTaps",
  callBack: _utils2.handleNA
});
var reviewWaterSource = exports.reviewWaterSource = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Water Source",
  labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
}, {
  jsonPath: "WaterConnection[0].waterSource",
  localePrefix: {
    moduleName: "WS_SERVICES_MASTERS",
    masterName: "WATERSOURCE"
  },
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.waterSource",
  callBack: _utils2.handleNA
});
var reviewWaterSubSource = exports.reviewWaterSubSource = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Water Sub Source",
  labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
}, {
  jsonPath: "WaterConnection[0].waterSubSource",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.waterSubSource",
  callBack: _utils2.handleNA
});
var reviewPipeSize = exports.reviewPipeSize = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Pipe Size (in inches)",
  labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
}, {
  jsonPath: "applyScreen.pipeSize",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.pipeSize",
  callBack: _utils2.handleNA
});

var reviewWaterClosets = exports.reviewWaterClosets = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "No. of Water Closets",
  labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
}, {
  jsonPath: "applyScreen.noOfWaterClosets",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.noOfWaterClosets",
  callBack: _utils2.handleNA
});

var reviewNumberOfToilets = exports.reviewNumberOfToilets = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "No. of Water Closets",
  labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
}, {
  jsonPath: "applyScreen.noOfToilets",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.noOfToilets",
  callBack: _utils2.handleNA
});

var reviewPlumberProvidedBy = exports.reviewPlumberProvidedBy = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Plumber Provided By",
  labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
}, {
  jsonPath: "applyScreen.additionalDetails.detailsProvidedBy",
  callBack: function callBack(value) {
    return value ? "WS_PLUMBER_" + value.toUpperCase() : _utils2.handleNA;
  }
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.additionalDetails.detailsProvidedBy",
  callBack: function callBack(value) {
    return value ? "WS_PLUMBER_" + value.toUpperCase() : _utils2.handleNA;
  }
});
var reviewPlumberLicenseNo = exports.reviewPlumberLicenseNo = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Plumber License No.",
  labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
}, {
  jsonPath: "applyScreen.plumberInfo[0].licenseNo",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.plumberInfo[0].licenseNo",
  callBack: _utils2.handleNA
});
var reviewPlumberName = exports.reviewPlumberName = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Plumber Name",
  labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
}, { jsonPath: "applyScreen.plumberInfo[0].name",
  callBack: _utils2.handleNA }, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.plumberInfo[0].name",
  callBack: _utils2.handleNA
});

var reviewPlumberMobileNo = exports.reviewPlumberMobileNo = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Plumber Mobile No.",
  labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
}, {
  jsonPath: "applyScreen.plumberInfo[0].mobileNumber",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.plumberInfo[0].mobileNumber",
  callBack: _utils2.handleNA
});

var reviewRoadType = exports.reviewRoadType = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Road Type",
  labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
}, {
  jsonPath: "applyScreen.roadType",
  // localePrefix: {
  //   moduleName: "WS",
  //   masterName: "ROADTYPE"
  // },
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.roadType",
  callBack: _utils2.handleNA
});

var reviewArea = exports.reviewArea = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Area (in sq ft)",
  labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
}, {
  jsonPath: "applyScreen.roadCuttingArea",
  callBack: _utils2.handleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.roadCuttingArea",
  callBack: _utils2.handleNA
});
var reviewConnectionExecutionDate = exports.reviewConnectionExecutionDate = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Connection Execution Date",
  labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
}, {
  jsonPath: "applyScreen.connectionExecutionDate",
  callBack: _utils2.convertEpochToDateAndHandleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.connectionExecutionDate",
  callBack: _utils2.convertEpochToDateAndHandleNA
});
var reviewMeterId = exports.reviewMeterId = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Meter ID",
  labelKey: "WS_SERV_DETAIL_METER_ID"
}, { jsonPath: "applyScreen.meterId",
  callBack: _utils2.handleNA }, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.meterId",
  callBack: _utils2.handleNA
});

var reviewMeterInstallationDate = exports.reviewMeterInstallationDate = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Meter Installation Date",
  labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE"
}, {
  jsonPath: "applyScreen.meterInstallationDate",
  callBack: _utils2.convertEpochToDateAndHandleNA
}, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.meterInstallationDate",
  callBack: _utils2.convertEpochToDateAndHandleNA
});

var reviewInitialMeterReading = exports.reviewInitialMeterReading = (0, _utils.getLabelWithValueForModifiedLabel)({
  labelName: "Initial Meter Reading",
  labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
}, { jsonPath: "applyScreen.additionalDetails.initialMeterReading",
  callBack: _utils2.handleNA }, {
  labelKey: "WS_OLD_LABEL_NAME"
}, {
  jsonPath: "applyScreenOld.additionalDetails.initialMeterReading",
  callBack: _utils2.handleNA
});

var reviewOwner = exports.reviewOwner = function reviewOwner() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelName: "Additional Details ( To be filled by Municipal Employee)",
          labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: (0, _utils.getLabel)({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _footer.changeStep)(state, dispatch, "", 2);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails
    viewFive: connectionDetailsHeader,
    viewSix: connectionDetails,
    viewSeven: connectionChargeDetailsHeader,
    viewEight: connectionChargeDetails,
    viewNine: roadCuttingChargesHeader,
    viewTen: roadCuttingCharges,
    viewEleven: activationDetailsHeader,
    viewTwelve: activationDetails
  });
};

var connectionDetails = (0, _utils.getCommonContainer)({
  reviewConnectionType: reviewConnectionType,
  reviewNumberOfTaps: reviewNumberOfTaps,
  reviewWaterSource: reviewWaterSource,
  reviewWaterSubSource: reviewWaterSubSource,
  reviewPipeSize: reviewPipeSize,
  // reviewBillingType,
  reviewWaterClosets: reviewWaterClosets,
  reviewNumberOfToilets: reviewNumberOfToilets
});

var connectionChargeDetails = (0, _utils.getCommonContainer)({
  reviewPlumberProvidedBy: reviewPlumberProvidedBy,
  reviewPlumberLicenseNo: reviewPlumberLicenseNo,
  reviewPlumberName: reviewPlumberName,
  reviewPlumberMobileNo: reviewPlumberMobileNo
});

var roadCuttingCharges = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "applicant-summary",
    scheama: (0, _utils.getCommonContainer)({
      reviewRoadType: (0, _utils.getLabelWithValue)({
        labelName: "Road Type",
        labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
      }, {
        jsonPath: "applyScreen.roadCuttingInfo[0].roadType",
        callBack: _utils2.handleRoadType
      }),
      reviewArea: (0, _utils.getLabelWithValue)({
        labelName: "Area (in sq ft)",
        labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
      }, {
        jsonPath: "applyScreen.roadCuttingInfo[0].roadCuttingArea",
        callBack: _utils2.handleNA
      })

    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "applyScreen.roadCuttingInfo",
    prefixSourceJsonPath: "children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var activationDetails = (0, _utils.getCommonContainer)({
  reviewConnectionExecutionDate: reviewConnectionExecutionDate,
  reviewMeterId: reviewMeterId,
  reviewMeterInstallationDate: reviewMeterInstallationDate,
  reviewInitialMeterReading: reviewInitialMeterReading
});