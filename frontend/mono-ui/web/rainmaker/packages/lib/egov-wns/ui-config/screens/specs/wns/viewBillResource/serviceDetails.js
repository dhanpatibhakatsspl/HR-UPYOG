"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sewerDetailsCard = exports.waterDetailsCard = exports.getService = exports.lastMeterReading = exports.currentMeterReading = exports.consumption = exports.meterReadingDate = exports.meterStatus = exports.meterId = exports.connType = exports.propertyUsage = exports.serviceType = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = (0, _commons.getQueryArg)(window.location.href, "service");
var connectionType = (0, _commons.getQueryArg)(window.location.href, "connectionType");

var serviceType = exports.serviceType = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_SERV_LABEL"
}, {
    jsonPath: "WaterConnection[0].service"
});

var propertyUsage = exports.propertyUsage = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_PROP_USE_TYPE" // TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
}, {
    jsonPath: "WaterConnection[0].property.usageCategory"
});

var connType = exports.connType = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_CONN_TYPE"
}, {
    jsonPath: "WaterConnection[0].connectionType",
    localePrefix: {
        moduleName: "WS_SERVICES_MASTERS",
        masterName: "WATERSOURCE"
    }
});

var meterId = exports.meterId = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_METER_ID"
}, {
    jsonPath: "WaterConnection[0].meterId"
});

var meterStatus = exports.meterStatus = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_METER_STAT"
}, {
    jsonPath: "consumptionDetails[0].meterStatus"
});

var meterReadingDate = exports.meterReadingDate = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_METER_READ_DATE_LABEL"
}, {
    jsonPath: "consumptionDetails[0].currentReadingDate"
});

var consumption = exports.consumption = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_CONSUMP"
}, {
    jsonPath: "WaterConnection[0].consumption",
    callBack: function callBack(params) {
        if (params !== undefined && params !== null && params > 0) {
            return parseFloat(params).toFixed(2);
        } else if (params === 0) {
            return 0;
        } else return "NA";
    }
});

var currentMeterReading = exports.currentMeterReading = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_CUR_METER_READ"
}, {
    jsonPath: "consumptionDetails[0].currentReading"
});

var lastMeterReading = exports.lastMeterReading = (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_LAST_METER_READ"
}, {
    jsonPath: "consumptionDetails[0].lastReading"
});

var getService = exports.getService = function getService() {
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
                }, {
                    style: {
                        marginBottom: 18
                    }
                }))
            }
        },
        // serviceCardContainer: renderService()
        waterDetails: waterDetailsCard(),
        sewerDetails: sewerDetailsCard()
    });
};

// export const renderService = () => {
//     if (service === serviceConst.WATER) {
//         if (connectionType === "Metered") {
//             return getCommonContainer({ serviceType, propertyUsage, connType, meterId, meterStatus, meterReadingDate, consumption, currentMeterReading, lastMeterReading });
//         } else {
//             return getCommonContainer({ serviceType, propertyUsage, connType });
//         }
//     } else if (service === serviceConst.SEWERAGE) {
//         return getCommonContainer({ serviceType, propertyUsage })
//     }
// }

var waterDetailsCard = exports.waterDetailsCard = function waterDetailsCard() {
    if (connectionType === "Metered") {
        return (0, _utils.getCommonContainer)({ serviceType: serviceType, propertyUsage: propertyUsage, connType: connType, meterId: meterId, meterStatus: meterStatus, meterReadingDate: meterReadingDate, consumption: consumption, currentMeterReading: currentMeterReading, lastMeterReading: lastMeterReading });
    } else {
        return (0, _utils.getCommonContainer)({ serviceType: serviceType, propertyUsage: propertyUsage, connType: connType });
    }
};
var sewerDetailsCard = exports.sewerDetailsCard = function sewerDetailsCard() {
    return (0, _utils.getCommonContainer)({ serviceType: serviceType, propertyUsage: propertyUsage });
};