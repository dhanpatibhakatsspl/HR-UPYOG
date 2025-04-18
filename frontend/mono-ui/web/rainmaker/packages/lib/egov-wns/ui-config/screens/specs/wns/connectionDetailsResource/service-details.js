"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceDetails = exports.sewerDetails = exports.waterDetails = exports.checkValueForNA = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../../ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value ? value : "NA";
};

// export const renderService = () => {
//   const tenantId = getTenantIdCommon()
// const connectionNumber = getQueryArg(window.location.href, "connectionNumber");
// const service = getQueryArg(window.location.href, "service")
// const connectionType = getQueryArg(window.location.href, "connectionType")
//   if (service === serviceConst.WATER) {
//     if (connectionType === "Metered") {
//       return getCommonContainer({
//         serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
//         connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
//         connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
//         meterID: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_METER_ID" }, { jsonPath: "WaterConnection[0].meterId" }),
//         pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
//         connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
//         rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
//         waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
//         waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
//         editSection: {
//           componentPath: "Button",
//           props: { color: "primary", style: { margin: "-16px" } },
//           visible: true,
//           gridDefination: { xs: 12, sm: 12, align: "left" },
//           children: { buttonLabel: getLabel({ labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL" }) },
//           onClickDefination: {
//             action: "page_change",
//             path: `meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`
//           }
//         },
//       })
//     } else {
//       return getCommonContainer({
//         serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
//         connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
//         connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
//         pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
//         connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
//         rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
//         waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
//         waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
//         numberOfTaps: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" }, { jsonPath: "WaterConnection[0].noOfTaps" })
//       })
//     }
//   } else if (service === serviceConst.SEWERAGE) {
//     return getCommonContainer({
//       serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service", callBack: checkValueForNA }),
//       connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate", callBack: checkValueForNA }),
//       unitOfMeasurement: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_UNIT_OF_MEASUREMENT" }, { jsonPath: "WaterConnection[0].uom", callBack: checkValueForNA }),
//       numberOfToilets: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TOILETS" }, { jsonPath: "WaterConnection[0].noOfToilets", callBack: checkValueForNA })
//     })
//   }
// }

var waterDetails = exports.waterDetails = function waterDetails() {
  var tenantId = (0, _localStorageUtils.getTenantIdCommon)();
  var connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
  var service = (0, _commons.getQueryArg)(window.location.href, "service");
  var connectionType = (0, _commons.getQueryArg)(window.location.href, "connectionType");
  if (connectionType === "Metered") {
    return (0, _utils.getCommonContainer)({
      serviceType: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service", callBack: checkValueForNA }),
      connectionCategory: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].additionalDetails.connectionCategory", callBack: checkValueForNA }),
      connectionType: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType", localePrefix: { moduleName: "WS_SERVICES_MASTERS", masterName: "WATERSOURCE" }, callBack: checkValueForNA }),
      meterID: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_METER_ID" }, { jsonPath: "WaterConnection[0].meterId", callBack: checkValueForNA }),
      pipeSize: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize", callBack: checkValueForNA }),
      connectionExecutionDate: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate", callBack: checkValueForNA }),
      waterSource: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource", localePrefix: { moduleName: "WS_SERVICES_MASTERS", masterName: "WATERSOURCE" }, callBack: checkValueForNA })
    });
  } else {
    return (0, _utils.getCommonContainer)({
      serviceType: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service", callBack: checkValueForNA }),
      connectionCategory: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].additionalDetails.connectionCategory", callBack: checkValueForNA }),
      connectionType: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType", localePrefix: { moduleName: "WS_SERVICES_MASTERS", masterName: "WATERSOURCE" }, callBack: checkValueForNA }),
      pipeSize: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize", callBack: checkValueForNA }),
      connectionExecutionDate: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate", callBack: checkValueForNA }),
      waterSource: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource", localePrefix: { moduleName: "WS_SERVICES_MASTERS", masterName: "WATERSOURCE" }, callBack: checkValueForNA }),
      // waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
      numberOfTaps: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" }, { jsonPath: "WaterConnection[0].noOfTaps", callBack: checkValueForNA })
    });
  }
};
var sewerDetails = exports.sewerDetails = function sewerDetails() {
  return (0, _utils.getCommonContainer)({
    serviceType: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service", callBack: checkValueForNA }),
    connectionExecutionDate: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate", callBack: checkValueForNA }),
    unitOfMeasurement: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_UNIT_OF_MEASUREMENT" }, { jsonPath: "WaterConnection[0].uom", callBack: checkValueForNA }),
    numberOfToilets: (0, _utils.getLabelWithValue)({ labelKey: "WS_SERV_DETAIL_NO_OF_TOILETS" }, { jsonPath: "WaterConnection[0].noOfToilets", callBack: checkValueForNA })
  });
};

var getServiceDetails = exports.getServiceDetails = function getServiceDetails() {

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
          labelKey: "WS_COMMON_SERV_DETAIL"
        }))
      }
    },
    // viewOne: renderService()
    waterDetails: waterDetails(),
    sewerDetails: sewerDetails()
  });
};