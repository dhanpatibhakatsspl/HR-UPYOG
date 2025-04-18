"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewTrade = exports.tradeLocationDetails = exports.tradeReviewDetails = exports.tradetypeDetails = exports.tradeAccessoriesDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../../utils");

var _footer = require("./footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tradeAccessoriesDetails = exports.tradeAccessoriesDetails = {
  reviewAccessoryType: (0, _utils.getLabelWithValue)({
    labelName: "Accesory Type",
    labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].accessoryCategory",
    localePrefix: {
      moduleName: "TRADELICENSE",
      masterName: "ACCESSORIESCATEGORY"
    }
  }),
  reviewAccessoryUOM: (0, _utils.getLabelWithValue)({
    labelName: "UOM",
    labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uom", callBack: _utils2.checkValueForNA }),
  reviewAccessoryUOMValue: (0, _utils.getLabelWithValue)({
    labelName: "UOM Value",
    labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue", callBack: _utils2.checkValueForNA }),
  reviewAccessoryCount: (0, _utils.getLabelWithValue)({
    labelName: "Accessory Count",
    labelKey: "TL_NEW_TRADE_ACCESSORY_COUNT"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].count", callBack: _utils2.checkValueForNA })
};
var accessoriesCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-trade-search-preview",
    scheama: (0, _utils.getCommonGrayCard)({
      accessoriesCardContainer: (0, _utils.getCommonContainer)(tradeAccessoriesDetails)
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};
var tradetypeDetails = exports.tradetypeDetails = {
  reviewTradeCategory: (0, _utils.getLabelWithValue)({
    labelName: "Trade Category",
    labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
    localePrefix: {
      moduleName: "TRADELICENSE",
      masterName: "TRADETYPE"
    },
    callBack: function callBack(value) {
      return value ? value.split(".")[0] : "NA";
    }
  }),
  reviewTradeType: (0, _utils.getLabelWithValue)({
    labelName: "Trade Type",
    labelKey: "TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
    localePrefix: {
      moduleName: "TRADELICENSE",
      masterName: "TRADETYPE"
    },
    callBack: function callBack(value) {
      return value ? value.split(".")[1] : "NA";
    }
  }),
  reviewTradeSubtype: (0, _utils.getLabelWithValue)({
    labelName: "Trade Sub-Type",
    labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
    localePrefix: {
      moduleName: "TRADELICENSE",
      masterName: "TRADETYPE"
    },
    callBack: _utils2.checkValueForNA
  }),

  reviewTradeUOM: (0, _utils.getLabelWithValue)({
    labelName: "UOM (Unit of Measurement)",
    labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uom", callBack: _utils2.checkValueForNA }),
  reviewTradeUOMValue: (0, _utils.getLabelWithValue)({
    labelName: "UOM Value",
    labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue", callBack: _utils2.checkValueForNA })
};

var tradeTypeCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-trade-search-preview",
    scheama: (0, _utils.getCommonGrayCard)({
      tradeTypeCardContainer: (0, _utils.getCommonContainer)(tradetypeDetails)
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits",
    prefixSourceJsonPath: "children.cardContent.children.tradeTypeCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};
var tradeReviewDetails = exports.tradeReviewDetails = {
  reviewApplicationType: (0, _utils.getLabelWithValue)({
    labelName: "Application Type",
    labelKey: "TL_APPLICATION_TYPE"
  }, {
    jsonPath: "Licenses[0].applicationType",
    localePrefix: {
      moduleName: "TradeLicense",
      masterName: "ApplicationType"
    }
  }),
  reviewLicenceType: (0, _utils.getLabelWithValue)({
    labelName: "Licence Type",
    labelKey: "TL_COMMON_TABLE_COL_LICENSE_TYPE"
  }, {
    jsonPath: "Licenses[0].licenseType",
    localePrefix: {
      moduleName: "TRADELICENSE",
      masterName: "LICENSETYPE"
    }
  }),
  reviewTradeName: (0, _utils.getLabelWithValue)({
    labelName: "Trade Name",
    labelKey: "TL_COMMON_TABLE_COL_TRD_NAME"
  }, { jsonPath: "Licenses[0].tradeName" }),
  reviewFromDate: (0, _utils.getLabelWithValue)({ labelName: "From Date", labelKey: "TL_COMMON_FROM_DATE_LABEL" }, {
    jsonPath: "Licenses[0].validFrom",
    callBack: _utils2.convertEpochToDate
  }),
  reviewToDate: (0, _utils.getLabelWithValue)({ labelName: "To Date", labelKey: "TL_COMMON_TO_DATE_LABEL" }, {
    jsonPath: "Licenses[0].validTo",
    callBack: _utils2.convertEpochToDate
  }),
  reviewStructureType: (0, _utils.getLabelWithValue)({ labelName: "Structure Type", labelKey: "TL_STRUCTURE_TYPE" }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.structureType",
    localePrefix: {
      moduleName: "common-masters",
      masterName: "STRUCTURETYPE"
    },
    callBack: function callBack(value) {
      return value ? value.split(".")[0] : "NA";
    }
  }),
  reviewSubStructureType: (0, _utils.getLabelWithValue)({ labelName: "Structure Sub Type", labelKey: "TL_STRUCTURE_SUB_TYPE" }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.structureType",
    localePrefix: {
      moduleName: "common-masters",
      masterName: "STRUCTURETYPE"
    }
  }),
  reviewCommencementDate: (0, _utils.getLabelWithValue)({
    labelName: "Commencement Date",
    labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
  }, {
    jsonPath: "Licenses[0].commencementDate",
    callBack: _utils2.convertEpochToDate
  }),
  reviewGSTNo: (0, _utils.getLabelWithValue)({
    labelName: "GST No.",
    labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo",
    callBack: _utils2.checkValueForNA
  }),
  reviewOperationalArea: (0, _utils.getLabelWithValue)({
    labelName: "Operational Area",
    labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea",
    callBack: _utils2.checkValueForNA
  }),
  reviewNoOfEmployee: (0, _utils.getLabelWithValue)({
    labelName: "No of Employees",
    labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.noOfEmployees",
    callBack: _utils2.checkValueForNA
  })
};

var tradeLocationDetails = exports.tradeLocationDetails = {
  reviewPropertyID: (0, _utils.getLabelWithValue)({
    labelName: "Property Assessment ID",
    labelKey: "TL_EMP_APPLICATION_PT_ASS_ID"
  }, { jsonPath: "Licenses[0].propertyId", callBack: _utils2.checkValueForNA }),
  reviewCity: (0, _utils.getLabelWithValue)({
    labelName: "City",
    labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.address.city",
    localePrefix: {
      moduleName: "TENANT",
      masterName: "TENANTS"
    }
  }),
  reviewDoorNo: (0, _utils.getLabelWithValue)({
    labelName: "Door/House No.",
    labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.address.doorNo", callBack: _utils2.checkValueForNA }),
  reviewBuildingName: (0, _utils.getLabelWithValue)({
    labelName: "Building/Company Name",
    labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.address.buildingName", callBack: _utils2.checkValueForNA }),
  reviewStreetName: (0, _utils.getLabelWithValue)({
    labelName: "Street Name",
    labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.address.street", callBack: _utils2.checkValueForNA }),
  reviewMohalla: (0, _utils.getLabelWithValue)({
    labelName: "Mohalla",
    labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
    localePrefix: {
      moduleName: (0, _commons.getQueryArg)(window.location.href, "tenantId") ? (0, _commons.getQueryArg)(window.location.href, "tenantId").replace('.', '_').toUpperCase() : "",
      masterName: "REVENUE"
    }, callBack: _utils2.checkValueForNA
  }),
  reviewPincode: (0, _utils.getLabelWithValue)({
    labelName: "Pincode",
    labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.address.pincode", callBack: _utils2.checkValueForNA }),
  reviewElectricityNo: (0, _utils.getLabelWithValue)({
    labelName: "Electricity Connection No.",
    labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.electricityConnectionNo",
    callBack: _utils2.checkValueForNA
  })
};
var getReviewTrade = exports.getReviewTrade = function getReviewTrade() {
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
          labelName: "Trade Details",
          labelKey: "TL_COMMON_TR_DETAILS"
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
              (0, _footer.changeStep)(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    viewOne: (0, _utils.getCommonContainer)(tradeReviewDetails),
    div1: (0, _utils.getDivider)(),
    viewTwo: tradeTypeCard,
    div2: (0, _utils.getDivider)(),
    viewThree: accessoriesCard,

    div3: (0, _utils.getDivider)(),
    viewFour: (0, _utils.getCommonContainer)(tradeLocationDetails)
  });
};