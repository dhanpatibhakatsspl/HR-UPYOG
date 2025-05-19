"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionDetailsFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

require("./index.css");

var connectionDetailsFooter = exports.connectionDetailsFooter = (0, _utils2.getCommonApplyFooter)("BOTTOM", {
  takeAction: {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "ActionFooter",
    props: {
      connectionNumber: (0, _commons.getQueryArg)(window.location.href, "connectionNumber"),
      tenantId: (0, _commons.getQueryArg)(window.location.href, "tenantId")
    }
  }
});