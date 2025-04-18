"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _citizenFunctions = require("./citizenSearchResource/citizenFunctions");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var header = (0, _utils.getCommonHeader)({
  labelName: "My Applications",
  labelKey: "TL_MY_APPLICATIONS_HEADER"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _citizenFunctions.fetchData)(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            contents: [{
              label: "TL_COMMON_TABLE_COL_APP_TYPE",
              jsonPath: "applicationType"
            }, {
              label: "TL_COMMON_TABLE_COL_TRD_NAME",
              jsonPath: "tradeName"
            }, {
              label: "TL_COMMON_TABLE_COL_APP_NO",
              jsonPath: "applicationNumber"
            }, {
              label: "TL_COMMON_TABLE_COL_OWN_NAME",
              jsonPath: "tradeLicenseDetail.owners[0].name"
            }, {
              label: "TL_COMMON_TABLE_COL_LIC_NO",
              jsonPath: "licenseNumber"
            }, {
              label: "TL_COMMON_TABLE_COL_STATUS",
              jsonPath: "status",
              prefix: "WF_NEWTL_"
            }],
            moduleName: "TL",
            homeURL: "/tradelicense-citizen/home"
          }
        }
      }
    }
  }
};

exports.default = screenConfig;