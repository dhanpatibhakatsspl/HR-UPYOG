"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _citizenSearchFunctions = require("./searchResource/citizenSearchFunctions");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var header = (0, _utils.getCommonHeader)({
  labelName: "My Applications",
  labelKey: "PT_MUTATION_MY_APPLICATION_HEADER"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _citizenSearchFunctions.fetchData)(action, state, dispatch);
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
              label: "PT_MUTATION_APPLICATION_NO",
              jsonPath: "acknowldgementNumber"
            }, {
              label: "PT_MUTATION_PID",
              jsonPath: "propertyId"
            }, {
              label: "PT_MUTATION_APPLICATIONTYPE",
              jsonPath: "creationReason"
            }, {
              label: "PT_MUTATION_CREATION_DATE",
              jsonPath: "auditDetails.createdTime"
            }, {
              label: "PT_MUTATION_STATUS",
              jsonPath: "status",
              prefix: "WF_PT_"
            }],
            moduleName: "PT-MUTATION",
            homeURL: "/property-tax"
          }
        }
      }
    }
  }
};

exports.default = screenConfig;