"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var header = (0, _utils.getCommonHeader)({
  labelName: "How It Works",
  labelKey: "BND_HOW_IT_WORKS"
}, {
  classes: {
    root: "common-header-cont"
  }
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "HowItWorks",

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        howitWoorksDiv: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-bnd",
          componentPath: "HowItWorks",
          props: {
            className: "common-div-css"
          }
        }
      }
    }
  }
};

exports.default = screenConfig;