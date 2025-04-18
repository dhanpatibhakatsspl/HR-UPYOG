'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyIDDetails = exports.propertyID = exports.propertyHeader = undefined;

var _utils = require('egov-ui-framework/ui-config/screens/specs/utils');

var _functions = require('./functions');

var _utils2 = require('../../utils');

var _commons = require('egov-ui-framework/ui-utils/commons');

var isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
isMode = isMode ? isMode.toUpperCase() : "";
var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
var connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
var action = (0, _commons.getQueryArg)(window.location.href, "action");
var modeaction = (0, _commons.getQueryArg)(window.location.href, "modeaction");

var mode = (0, _commons.getQueryArg)(window.location.href, "mode");

var modifyLink = void 0;
if (isMode === "MODIFY") {
  modifyLink = '/wns/apply?';
  modifyLink = applicationNumber ? modifyLink + ('applicationNumber=' + applicationNumber) : modifyLink;
  modifyLink = connectionNumber ? modifyLink + ('&connectionNumber=' + connectionNumber) : modifyLink;
  modifyLink = action ? modifyLink + ('&action=' + action) : modifyLink;
  modifyLink = modeaction ? modifyLink + ('&modeaction=' + modeaction) : modifyLink;
  modifyLink = mode ? modifyLink + ('&mode=' + mode) : modifyLink;
} else {
  modifyLink = "/wns/apply";
}

var resetScreen = function resetScreen() {
  isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
  isMode = isMode ? isMode.toUpperCase() : "";
  applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
  connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
  tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
  action = (0, _commons.getQueryArg)(window.location.href, "action");

  if (isMode === "MODIFY") {
    modifyLink = '/wns/apply?';
    modifyLink = applicationNumber ? modifyLink + ('applicationNumber=' + applicationNumber) : modifyLink;
    modifyLink = connectionNumber ? modifyLink + ('&connectionNumber=' + connectionNumber) : modifyLink;
    modifyLink = action ? modifyLink + ('&action=' + action) : modifyLink;
    modifyLink = modeaction ? modifyLink + ('&modeaction=' + modeaction) : modifyLink;
    modifyLink = mode ? modifyLink + ('&mode=' + mode) : modifyLink;
  } else {
    modifyLink = "/wns/apply";
  }
};
var propertyHeader = exports.propertyHeader = (0, _utils.getCommonSubHeader)({
  lKey: resetScreen(),
  labelKey: "WS_COMMON_PROP_DETAIL",
  labelName: "Property Details"
});

var propertyID = exports.propertyID = (0, _utils.getCommonContainer)({
  propertyID: (0, _utils.getTextField)({
    label: { labelKey: "WS_PROPERTY_ID_LABEL" },
    placeholder: { labelKey: "WS_PROPERTY_ID_PLACEHOLDER" },
    gridDefination: { xs: 12, sm: 5, md: 5 },
    required: true,
    props: {
      style: {
        width: "100%"
      }
    },
    sourceJsonPath: "applyScreen.property.propertyId",
    title: {
      value: "Fill the form by searching your old approved trade license"
      // key: "TL_OLD_TL_NO"
    },
    pattern: /^[a-zA-Z0-9-]*$/i,
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    jsonPath: "searchScreen.propertyIds"
  }),
  wnsPtySearchButton: {
    componentPath: "Button",
    gridDefination: { xs: 12, sm: 1, md: 1 },
    props: {
      variant: "contained",
      style: {
        color: "white",
        marginTop: "19px",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
        borderRadius: "2px",
        width: "95%",
        height: "32px"
      }
    },
    children: {
      buttonLabel: (0, _utils.getLabel)({
        labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: _functions.propertySearchApiCall
    }
  },
  clickHereLink: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "AddLinkForProperty",
    props: { url: modifyLink, isMode: isMode },
    gridDefination: { xs: 12, sm: 4, md: 4 }
  }
});

var propertyDetails = (0, _utils.getCommonContainer)({
  propertyType: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_TYPE_LABEL"
  }, {
    jsonPath: "applyScreen.property.propertyType",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPTYPE"
    }

  }),
  propertyUsageType: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_USAGE_TYPE_LABEL"
  }, {
    jsonPath: "applyScreen.property.usageCategory",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPUSGTYPE"
    }
  }),
  propertySubUsageType: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_SUB_USAGE_TYPE_LABEL",
    labelName: "Property Sub Usage Type"
  }, {
    jsonPath: "applyScreen.property.units[0].usageCategory",
    callBack: _utils2.handlePropertySubUsageType,
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPSUBUSGTYPE"
    }
  }),
  plotSize: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_PLOT_SIZE_LABEL"
  }, {
    jsonPath: "applyScreen.property.landArea",
    callBack: _utils2.handleNA

  }),
  numberOfFloors: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_NO_OF_FLOOR_LABEL",
    labelName: "Number Of Floors"
  }, {
    jsonPath: "applyScreen.property.noOfFloors",
    callBack: _utils2.handleNA
  }),
  rainwaterHarvestingFacility: (0, _utils.getLabelWithValue)({
    labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC",
    labelName: "Rainwater Harvesting Facility"
  }, {
    jsonPath: "applyScreen.property.additionalDetails.isRainwaterHarvesting",
    callBack: _utils2.handleNA
  })
});

var getPropertyIDDetails = exports.getPropertyIDDetails = function getPropertyIDDetails() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonContainer)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }
      }
    },
    viewTwo: propertyDetails
  });
};