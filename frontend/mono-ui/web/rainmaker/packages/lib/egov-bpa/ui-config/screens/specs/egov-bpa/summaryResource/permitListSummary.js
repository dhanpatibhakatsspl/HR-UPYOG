"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permitListSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var permitListSummary = exports.permitListSummary = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Permit Conditions",
        labelKey: "BPA_PERMIT_CONDITIONS_LABEL"
      }))
    }
  },
  permitConditionsCardSummary: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "PermitListCondition",
    props: {
      sourceJsonPath: "permitList"
    },
    type: "array"
  }
});