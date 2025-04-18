"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commons = require("../../../../ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var header = (0, _utils.getCommonHeader)({
  labelKey: "WS_COMMON_PAST_PAYMENTS"
}, {
  classes: {
    root: "common-header-cont"
  }
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "my-connections",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _commons.getPastPaymentsForWater)(dispatch);
    (0, _commons.getPastPaymentsForSewerage)(dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-wns",
          componentPath: "PastPaymentsDetails"
        }
      }
    }
  }
};
exports.default = screenConfig;