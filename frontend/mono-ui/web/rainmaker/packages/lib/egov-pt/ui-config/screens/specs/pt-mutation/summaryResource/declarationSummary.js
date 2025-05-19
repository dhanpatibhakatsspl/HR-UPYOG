"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.declarationSummary = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var declarationDetails = (0, _utils.getCommonContainer)({
  checkbox: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "Checkbox",
    props: {
      content: 'PT_MUTATION_DECLARATION',
      jsonPath: "Property.declaration"
    },

    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});

var declarationSummary = exports.declarationSummary = (0, _utils.getCommonContainer)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { margin: "10px" }
    },
    children: {
      body: declarationDetails
    }
  }

});