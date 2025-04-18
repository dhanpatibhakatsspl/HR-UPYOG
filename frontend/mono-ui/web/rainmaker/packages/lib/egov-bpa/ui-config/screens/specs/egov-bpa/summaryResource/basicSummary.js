"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basicSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _index = require("../../utils/index");

var _footer = require("../applyResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
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

var basicSummary = exports.basicSummary = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Basic Details",
        labelKey: "BPA_BASIC_DETAILS_TITLE"
      })),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
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
            labelKey: "BPA_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _footer.changeStep)(state, dispatch, "", 0);
          }
        }
      }
    }
  },
  bpaBasicDetailsContainer: getHeader({
    labelName: "Basic Details",
    labelKey: "BPA_BASIC_DETAILS_TITLE"
  }),
  break1: (0, _utils.getBreak)(),
  basicDetailsContainer: (0, _utils.getCommonContainer)({
    scrutinynumber: (0, _utils.getLabelWithValue)({
      labelName: "Building plan scrutiny number",
      labelKey: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_LABEL"
    }, {
      jsonPath: "BPA.edcrNumber",
      callBack: _index.checkValueForNA
    }),
    occupancy: (0, _utils.getLabelWithValue)({
      labelName: "occupancy",
      labelKey: "BPA_BASIC_DETAILS_OCCUPANCY_LABEL"
    }, {
      localePrefix: {
        moduleName: "BPA",
        masterName: "OCCUPANCYTYPE"
      },
      jsonPath: "scrutinyDetails.planDetail.occupancies[0].typeHelper.type.code"
    }),
    applicationtype: (0, _utils.getLabelWithValue)({
      labelName: "Application Type",
      labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
    }, {
      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      jsonPath: "BPA.applicationType",
      callBack: _index.checkValueForNA
    }),
    servicetype: (0, _utils.getLabelWithValue)({
      labelName: "Service Type",
      labelKey: "Service Type"
    }, {
      jsonPath: "BPA.serviceType",
      callBack: _index.checkValueForNA
    }),
    risktype: (0, _utils.getLabelWithValue)({
      labelName: "Risk Type",
      labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
    }, {
      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      jsonPath: "BPA.riskType",
      callBack: _index.checkValueForNA
    }),
    applicationdate: (0, _utils.getLabelWithValue)({
      labelName: "Application Date",
      labelKey: "BPA_BASIC_DETAILS_APP_DATE_LABEL"
    }, {
      jsonPath: "scrutinyDetails.planDetail.applicationDate",
      callBack: function callBack(value) {
        return (0, _index.convertEpochToDate)(value) || _index.checkValueForNA;
      }
    }),
    remarks: (0, _utils.getLabelWithValue)({
      labelName: "Remarks",
      labelKey: "BPA_BASIC_DETAILS_REMARKS_LABEL"
    }, {
      jsonPath: "BPA.additionalDetails.remarks",
      callBack: _index.checkValueForNA
    })
  }),
  BlockWiseOccupancyAndUsageDetails: getHeader({
    labelName: "BPA Location Details",
    labelKey: "BPA_NEW_TRADE_DETAILS_HEADER_DETAILS"
  }),
  break3: (0, _utils.getBreak)(),
  viewFour: (0, _utils.getCommonContainer)({
    reviewCity: (0, _utils.getLabelWithValue)({
      labelName: "City",
      labelKey: "BPA_CITY_LABEL"
    }, {
      jsonPath: "BPA.landInfo.address.city",
      callBack: function callBack(value) {
        return (0, _commons.getQueryArg)(window.location.href, "tenantId");
      }
    }),
    reviewBuildingName: (0, _utils.getLabelWithValue)({
      labelName: "Building/Company Name",
      labelKey: "BPA_DETAILS_BLDG_NAME_LABEL"
    }, { jsonPath: "BPA.landInfo.address.buildingName", callBack: _index.checkValueForNA }),
    reviewStreetName: (0, _utils.getLabelWithValue)({
      labelName: "Street Name",
      labelKey: "BPA_DETAILS_SRT_NAME_LABEL"
    }, { jsonPath: "BPA.landInfo.address.street", callBack: _index.checkValueForNA }),
    reviewMohalla: (0, _utils.getLabelWithValue)({
      labelName: "Mohalla",
      labelKey: "BPA_DETAILS_MOHALLA_LABEL"
    }, {
      jsonPath: "BPA.landInfo.address.locality.code",
      localePrefix: {
        moduleName: (0, _commons.getQueryArg)(window.location.href, "tenantId") ? (0, _commons.getQueryArg)(window.location.href, "tenantId").replace('.', '_').toUpperCase() : "",
        masterName: "REVENUE"
      }, callBack: _index.checkValueForNA
    }),
    reviewPincode: (0, _utils.getLabelWithValue)({
      labelName: "Pincode",
      labelKey: "BPA_DETAILS_PIN_LABEL"
    }, { jsonPath: "BPA.landInfo.address.pincode", callBack: _index.checkValueForNA })
  }),

  DetailsOfPlot: getHeader({
    labelName: "Details Of Plot",
    labelKey: "BPA_BOUNDARY_PLOT_DETAILS_TITLE"
  }),
  break2: (0, _utils.getBreak)(),
  detailsOfPlotContainer: (0, _utils.getCommonContainer)({
    plotArea: (0, _utils.getLabelWithValue)({
      labelName: "Plot Area",
      labelKey: "BPA_BOUNDARY_PLOT_AREA_LABEL"
    }, {
      jsonPath: "scrutinyDetails.planDetail.plot.area",
      callBack: _index.checkValueForNA
    }),
    kathaNumber: (0, _utils.getLabelWithValue)({
      labelName: "Khata No.",
      labelKey: "BPA_BOUNDARY_KHATA_NO_LABEL"
    }, {
      jsonPath: "scrutinyDetails.planDetail.planInformation.khataNo",
      callBack: _index.checkValueForNA
    }),
    holdingNumber: (0, _utils.getLabelWithValue)({
      labelName: "Holding No.",
      labelKey: "BPA_BOUNDARY_HOLDING_NO_LABEL"
    }, {
      jsonPath: "BPA.additionalDetails.holdingNo",
      callBack: _index.checkValueForNA
    }),
    plotNo: (0, _utils.getLabelWithValue)({
      labelName: "Plot No(MSP)",
      labelKey: "BPA_BOUNDARY_PLOT_NO_LABEL"
    }, {
      jsonPath: "scrutinyDetails.planDetail.planInformation.plotNo",
      callBack: _index.checkValueForNA
    }),
    landRegDetails: (0, _utils.getLabelWithValue)({
      labelName: "Land Registration Details",
      labelKey: "BPA_BOUNDARY_LAND_REG_DETAIL_LABEL"
    }, {
      jsonPath: "BPA.additionalDetails.registrationDetails",
      callBack: _index.checkValueForNA
    })
  })
});