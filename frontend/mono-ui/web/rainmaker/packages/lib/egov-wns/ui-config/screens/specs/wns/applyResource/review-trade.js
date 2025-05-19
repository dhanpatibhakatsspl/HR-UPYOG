"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionHolderSameAsOwnerDetails = exports.connectionHolderDetails = exports.propertyOwnerDetail = exports.propertyDetails = exports.locationDetails = exports.getReviewConnectionDetails = exports.propertyOwnerDetailsHeader = exports.connectionDetailsHeader = exports.propertyLocationDetailsHeader = exports.propertyDetailsHeader = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _taskConnectiondetails = require("./../applyResource/task-connectiondetails");

var _taskOwnerDetails = require("../applyResource/task-owner-details");

var _utils2 = require("../../utils");

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

var propertyDetailsHeader = exports.propertyDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PROP_DETAIL"
});

var propertyLocationDetailsHeader = exports.propertyLocationDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PROP_LOC_DETAIL_HEADER"
});

var connectionDetailsHeader = exports.connectionDetailsHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

var propertyOwnerDetailsHeader = exports.propertyOwnerDetailsHeader = getHeader({
  labelKey: "WS_TASK_PROP_OWN_HEADER"
});

var getReviewConnectionDetails = exports.getReviewConnectionDetails = function getReviewConnectionDetails() {
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
          labelName: "Connection Details",
          labelKey: "WS_COMMON_CONNECTION_DETAILS"
        })),
        editSection: {
          componentPath: "Button",
          props: { color: "primary" },
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
              props: { iconName: "edit" }
            },
            buttonLabel: (0, _utils.getLabel)({
              labelName: "Edit",
              labelKey: "WS_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition"
            // callBack: (state, dispatch) => {
            //   changeStep(state, dispatch, "", 0);
            // }
          }
        }
      }
    },
    viewOne: getPropertyDetails,
    viewTwo: propertyLocationDetails,
    viewThree: ownerDetails,
    viewFour: (0, _taskConnectiondetails.getConnectionDetails)(),
    viewFive: taskConnHolderDetailsSummary(),
    viewSix: connHolderDetailsSameAsOwnerSummary()

  });
};

var locationDetails = exports.locationDetails = {
  reviewCity: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "City",
    labelKey: "WS_PROP_DETAIL_CITY"
  }, {
    jsonPath: "WaterConnection[0].property.address.city",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.address.city", callBack: _utils2.handleNA }),
  reviewDoorOrHouseNumber: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Door/House No.",
    labelKey: "WS_PROP_DETAIL_DHNO"
  }, { jsonPath: "WaterConnection[0].property.address.doorNo",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.address.doorNo", callBack: _utils2.handleNA }),
  reviewBuildingOrColonyName: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Building/Colony Name",
    labelKey: "WS_PROP_DETAIL_BUILD_NAME_LABEL"
  }, { jsonPath: "WaterConnection[0].property.address.buildingName",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.address.buildingName", callBack: _utils2.handleNA }),
  reviewStreetName: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Street Name",
    labelKey: "WS_PROP_DETAIL_STREET_NAME"
  }, { jsonPath: "WaterConnection[0].property.address.street",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.address.street", callBack: _utils2.handleNA }),
  reviewLocalityOrMohalla: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Locality/Mohalla",
    labelKey: "WS_PROP_DETAIL_LOCALITY_MOHALLA_LABEL"
  }, { jsonPath: "WaterConnection[0].property.address.locality.name",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.locality.name", callBack: _utils2.handleNA }),
  reviewPincode: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Pincode",
    labelKey: "WS_PROP_DETAIL_PINCODE"
  }, { jsonPath: "WaterConnection[0].property.address.pincode",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.address.pincode", callBack: _utils2.handleNA })
};

var propertyLocationDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "common-div-css search-preview",
    scheama: (0, _utils.getCommonGrayCard)({
      div1: propertyLocationDetailsHeader,
      propertyLocationDetailsContainer: (0, _utils.getCommonContainer)(locationDetails)
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "WaterConnection[0].property.address",
    prefixSourceJsonPath: "children.cardContent.children.propertyLocationDetailsContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var propertyDetails = exports.propertyDetails = {
  reviewPropertyId: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Property Id",
    labelKey: "WS_PROPERTY_ID_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.propertyId",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.propertyId", callBack: _utils2.handleNA }),
  reviewPropertyType: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Property Type",
    labelKey: "WS_PROPERTY_TYPE_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.propertyType",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPTYPE"
    }

  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].property.propertyType",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPTYPE"
    }

  }),
  reviewPropertyUsageType: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Property Usage Type",
    labelKey: "WS_PROPERTY_USAGE_TYPE_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.usageCategory",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPUSGTYPE"
    }
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].property.usageCategory",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPUSGTYPE"
    }

  }),

  reviewPropertySubUsageType: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Property Sub usage type",
    labelKey: "WS_PROPERTY_SUB_USAGE_TYPE_LABEL"
  }, { jsonPath: "WaterConnection[0].property.units[0].usageCategory",
    callBack: _utils2.handlePropertySubUsageType,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPSUBUSGTYPE"
    }
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].property.units[0].usageCategory",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPSUBUSGTYPE"
    }

  }),
  reviewPlotSize: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Plot Size (in sq metres)",
    labelKey: "WS_PROP_DETAIL_PLOT_SIZE_LABEL"
  }, { jsonPath: "WaterConnection[0].property.landArea",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].property.landArea",
    callBack: _utils2.handleNA
  }),
  reviewNumberOfFloors: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Number Of Floors",
    labelKey: "WS_PROPERTY_NO_OF_FLOOR_LABEL"
  }, { jsonPath: "WaterConnection[0].property.noOfFloors",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].property.noOfFloors",
    callBack: _utils2.handleNA
  }),
  rainwaterHarvestingFacility: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC",
    labelName: "Rain Water Harvesting Facility"
  }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].property.additionalDetails.isRainwaterHarvesting",
    callBack: _utils2.handleNA
  })
};

var getPropertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "common-div-css search-preview",
    scheama: (0, _utils.getCommonGrayCard)({
      div2: propertyDetailsHeader,
      getPropertyDetailsContainer: (0, _utils.getCommonContainer)(propertyDetails)
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits",
    prefixSourceJsonPath: "children.cardContent.children.getPropertyDetailsContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var propertyOwnerDetail = exports.propertyOwnerDetail = {
  mobileNumber: (0, _utils.getLabelWithValue)({
    labelName: "Mobile Number",
    labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
  }, { jsonPath: "WaterConnection[0].property.owners[0].mobileNumber",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].mobileNumber", callBack: _utils2.handleNA }),
  name: (0, _utils.getLabelWithValue)({
    labelName: "Name",
    labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.owners[0].name",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].name", callBack: _utils2.handleNA }),
  email: (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_OWN_EMAIL_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.owners[0].emailId",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].emailId", callBack: _utils2.handleNA }),
  gender: (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.owners[0].gender",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "COMMON",
      masterName: "GENDER"
    }
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].gender", callBack: _utils2.handleNA }),
  dateOfBirth: (0, _utils.getLabelWithValue)({
    labelName: "Date Of Birth",
    labelKey: "WS_OWN_DETAIL_DOB_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.owners[0].dob",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].dob", callBack: _utils2.handleNA }),
  fatherName: (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_FATHER_OR_HUSBAND_NAME"
  }, { jsonPath: "WaterConnection[0].property.owners[0].fatherOrHusbandName",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].fatherOrHusbandName", callBack: _utils2.handleNA }),
  relationship: (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_RELATION_LABEL"
  }, { jsonPath: "WaterConnection[0].property.owners[0].relationship",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].relationship", callBack: _utils2.handleNA }),
  correspondenceAddress: (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_CROSADD"
  }, { jsonPath: "WaterConnection[0].property.owners[0].correspondenceAddress",
    callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].correspondenceAddress", callBack: _utils2.handleNA }), specialApplicantCategory: (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.owners[0].ownerType",
    localePrefix: {
      moduleName: "COMMON_MASTERS",
      masterName: "OWNERTYPE"
    },
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].property.owners[0].ownerType", localePrefix: { moduleName: "COMMON_MASTERS", masterName: "OWNERTYPE" }, callBack: _utils2.handleNA })
};

var ownerDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "common-div-css search-preview",
    scheama: (0, _utils.getCommonGrayCard)({
      div3: propertyOwnerDetailsHeader,
      propertyLocationDetailsContainer: (0, _utils.getCommonContainer)(propertyOwnerDetail)
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "WaterConnection[0].property.owners",
    prefixSourceJsonPath: "children.cardContent.children.propertyLocationDetailsContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};
var holderHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
  labelName: "Connection Holder Details"
});

var connectionHolderDetails = exports.connectionHolderDetails = {
  mobileNumber: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_MOBILE_NO_LABEL"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].mobileNumber", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].mobileNumber", callBack: _utils2.handleNA }),
  name: (0, _utils.getLabelWithValue)({
    labelName: "Name",
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_OWN_NAME_LABEL"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].name", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].name", callBack: _utils2.handleNA }),
  gender: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_GENDER_LABEL"
  }, {
    jsonPath: "WaterConnection[0].connectionHolders[0].gender",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].gender", callBack: _utils2.handleNA }),
  fatherName: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_COMMON_FATHER_OR_HUSBAND_NAME"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].fatherOrHusbandName", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].fatherOrHusbandName", callBack: _utils2.handleNA }),
  relationship: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_RELATION_LABEL"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].relationship", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].relationship", callBack: _utils2.handleNA }),
  correspondenceAddress: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_CROSADD"
  }, {
    jsonPath: "WaterConnection[0].connectionHolders[0].correspondenceAddress",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].correspondenceAddress", callBack: _utils2.handleNA }),
  specialApplicantCategory: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
  }, {
    jsonPath: "WaterConnection[0].connectionHolders[0].ownerType",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "WaterConnectionOld[0].connectionHolders[0].ownerType", callBack: _utils2.handleNA })
};
var taskConnHolderDetailsSummary = function taskConnHolderDetailsSummary() {
  return {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "common-div-css search-preview",
      scheama: (0, _utils.getCommonGrayCard)({
        div4: holderHeader,
        connHoldDetail: (0, _utils.getCommonContainer)(connectionHolderDetails)
      }),
      items: [],
      hasAddItem: false,
      sourceJsonPath: "WaterConnection[0].connectionHolders",
      prefixSourceJsonPath: "children.cardContent.children.connHoldDetail.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  };
};

var connectionHolderSameAsOwnerDetails = exports.connectionHolderSameAsOwnerDetails = {
  sameAsOwnerDetails: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_SAME_AS_OWNER_DETAILS"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].sameAsPropertyAddress" })
};

var connHolderDetailsSameAsOwnerSummary = function connHolderDetailsSameAsOwnerSummary() {
  return {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "common-div-css search-preview",
      scheama: (0, _utils.getCommonGrayCard)({
        div4: holderHeader,
        sameAsOwnerDetails: (0, _utils.getCommonContainer)(connectionHolderSameAsOwnerDetails)
      }),
      items: [],
      hasAddItem: false,
      sourceJsonPath: "WaterConnection[0].connectionHolders[0].sameAsPropertyAddress",
      prefixSourceJsonPath: "children.cardContent.children.sameAsOwnerDetails.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  };
};