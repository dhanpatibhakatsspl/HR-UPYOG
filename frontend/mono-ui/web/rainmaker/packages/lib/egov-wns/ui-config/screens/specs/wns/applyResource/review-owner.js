"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderServiceForSW = exports.renderServiceForWater = exports.renderService = exports.additionDetailsSewerage = exports.additionDetailsWater = exports.connectionSewerage = exports.connectionWater = exports.activateDetailsNonMeter = exports.activateDetailsMeter = exports.roadCuttingCharges = exports.roadDetails = exports.plumberDetails = exports.getReviewOwner = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../../utils");

var _commons2 = require("../../../../../ui-utils/commons");

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

var getReviewOwner = exports.getReviewOwner = function getReviewOwner() {
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
              changeStep(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails
    viewFive: connectionDetailsHeader,
    viewSixWS: renderServiceForWater(),
    viewSixVS: renderServiceForSW(),
    // viewSix: connectionDetails,
    viewSeven: connectionChargeDetailsHeader,
    viewEight: connectionChargeDetails,
    viewNine: roadCuttingChargesHeader,
    viewTen: roadCuttingCharges,
    viewEleven: activationDetailsHeader,
    viewTwelve: activationDetails
  });
};

var plumberDetails = exports.plumberDetails = {
  reviewPlumberProvidedBy: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Plumber provided by",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
  }, {
    jsonPath: "WaterConnection[0].additionalDetails.detailsProvidedBy",
    callBack: function callBack(value) {
      return value ? "WS_PLUMBER_" + value.toUpperCase() : "NA";
    }
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].additionalDetails.detailsProvidedBy",
    callBack: function callBack(value) {
      return value ? "WS_PLUMBER_" + value.toUpperCase() : "NA";
    }
  }),
  reviewPlumberLicenseNo: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Plumber licence No",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
  }, {
    jsonPath: "WaterConnection[0].plumberInfo[0].licenseNo",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].plumberInfo[0].licenseNo",
    callBack: _utils2.handleNA
  }),
  reviewPlumberName: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Plumber Name",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
  }, { jsonPath: "WaterConnection[0].plumberInfo[0].name",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].plumberInfo[0].name",
    callBack: _utils2.handleNA }),
  reviewPlumberMobileNo: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Plumber mobile No.",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
  }, { jsonPath: "WaterConnection[0].plumberInfo[0].mobileNumber",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].plumberInfo[0].mobileNumber",
    callBack: _utils2.handleNA })

};
var connectionChargeDetails = (0, _utils.getCommonContainer)(plumberDetails);

var roadDetails = exports.roadDetails = {
  reviewRoadType: (0, _utils.getLabelWithValue)({
    labelName: "Road Type",
    labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
  }, {
    jsonPath: "WaterConnection[0].roadCuttingInfo[0].roadType",
    callBack: _utils2.handleRoadType
  }),
  reviewArea: (0, _utils.getLabelWithValue)({
    labelName: "Area (in sq ft)",
    labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
  }, {
    jsonPath: "WaterConnection[0].roadCuttingInfo[0].roadCuttingArea",
    callBack: _utils2.handleNA
  })
};
var roadCuttingCharges = exports.roadCuttingCharges = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "applicant-summary",
    scheama: (0, _utils.getCommonContainer)(roadDetails),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "WaterConnection[0].roadCuttingInfo",
    prefixSourceJsonPath: "children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var activateDetailsMeter = exports.activateDetailsMeter = {
  reviewConnectionExecutionDate: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Connection Execution Date",
    labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
  }, {
    jsonPath: "WaterConnection[0].connectionExecutionDate",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }),
  reviewMeterId: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Meter ID",
    labelKey: "WS_SERV_DETAIL_METER_ID"
  }, { jsonPath: "WaterConnection[0].meterId",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].meterId",
    callBack: _utils2.handleNA }),
  reviewMeterInstallationDate: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Meter Installation Date",
    labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE"
  }, {
    jsonPath: "WaterConnection[0].meterInstallationDate",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].meterInstallationDate",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }),
  reviewInitialMeterReading: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Initial Meter Reading",
    labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
  }, { jsonPath: "WaterConnection[0].additionalDetails.initialMeterReading",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].additionalDetails.initialMeterReading",
    callBack: _utils2.handleNA })

};
var activateDetailsNonMeter = exports.activateDetailsNonMeter = {
  reviewConnectionExecutionDate: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Connection Execution Date",
    labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
  }, {
    jsonPath: "WaterConnection[0].connectionExecutionDate",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
    callBack: _utils2.convertEpochToDateAndHandleNA
  })
};
var activationDetails = (0, _utils.getCommonContainer)(activateDetailsMeter);

var connectionWater = exports.connectionWater = {
  reviewConnectionType: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Connection Type",
    labelKey: "WS_SERV_DETAIL_CONN_TYPE"
  }, {
    jsonPath: "WaterConnection[0].connectionType",
    localePrefix: {
      moduleName: "WS_SERVICES_MASTERS",
      masterName: "WATERSOURCE"
    },
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].connectionType",
    localePrefix: {
      moduleName: "WS_SERVICES_MASTERS",
      masterName: "WATERSOURCE"
    },
    callBack: _utils2.handleNA
  }),
  reviewNumberOfTaps: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "No. of Taps",
    labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
  }, {
    jsonPath: "WaterConnection[0].noOfTaps",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].noOfTaps",
    callBack: _utils2.handleNA
  }),
  reviewWaterSource: (0, _utils.getLabelWithValueForModifiedLabel)({
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
    jsonPath: "WaterConnectionOld[0].waterSource",
    callBack: _utils2.handleNA
  }),
  reviewWaterSubSource: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Water Sub Source",
    labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
  }, {
    jsonPath: "WaterConnection[0].waterSubSource",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].waterSubSource",
    callBack: _utils2.handleNA
  }),
  reviewPipeSize: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Pipe Size (in inches)",
    labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
  }, {
    jsonPath: "WaterConnection[0].pipeSize",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].pipeSize",
    callBack: _utils2.handleNA
  })

};

var connectionSewerage = exports.connectionSewerage = {
  reviewConnectionType: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Connection Type",
    labelKey: "WS_SERV_DETAIL_CONN_TYPE"
  }, {
    jsonPath: "WaterConnection[0].connectionType",
    localePrefix: {
      moduleName: "WS_SERVICES_MASTERS",
      masterName: "WATERSOURCE"
    },
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].connectionType",
    localePrefix: {
      moduleName: "WS_SERVICES_MASTERS",
      masterName: "WATERSOURCE"
    },
    callBack: _utils2.handleNA
  }),
  reviewWaterClosets: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "No. of Water Closets",
    labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
  }, {
    jsonPath: "WaterConnection[0].noOfWaterClosets",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].noOfWaterClosets",
    callBack: _utils2.handleNA
  }),
  reviewNoOfToilets: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "No. of Toilets",
    labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
  }, {
    jsonPath: "WaterConnection[0].noOfToilets",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].noOfToilets",
    callBack: _utils2.handleNA
  })
};

var additionDetailsWater = exports.additionDetailsWater = connectionWater;

var additionDetailsSewerage = exports.additionDetailsSewerage = connectionSewerage;

var renderService = exports.renderService = function renderService() {
  var isService = (0, _commons.getQueryArg)(window.location.href, "service");
  if (isService === _commons2.serviceConst.WATER) {
    return (0, _utils.getCommonContainer)(connectionWater);
  } else if (isService === _commons2.serviceConst.SEWERAGE) {
    return (0, _utils.getCommonContainer)(connectionSewerage);
  }
};

var renderServiceForWater = exports.renderServiceForWater = function renderServiceForWater() {
  return (0, _utils.getCommonContainer)(connectionWater);
};

var renderServiceForSW = exports.renderServiceForSW = function renderServiceForSW() {
  return (0, _utils.getCommonContainer)(connectionSewerage);
};