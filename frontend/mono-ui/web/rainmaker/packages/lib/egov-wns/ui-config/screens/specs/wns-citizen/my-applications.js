"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _myApplicationDetails = require("./myApplicationDetails/myApplicationDetails");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var header = (0, _utils.getCommonHeader)({
  labelKey: "WS_MYAPPLICATIONS_HEADER"

}, {
  classes: {
    root: "common-header-cont"
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _myApplicationDetails.fetchData)(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        // className: "common-div-css"
      },
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-wns",
          componentPath: "Applications"
        }
      }
    }
  }
};

exports.default = screenConfig;