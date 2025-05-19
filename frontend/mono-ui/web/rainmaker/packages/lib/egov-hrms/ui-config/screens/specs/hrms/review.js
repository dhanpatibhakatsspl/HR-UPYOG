"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subHeader = exports.header = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _employeeReview = require("./viewResource/employee-review");

var _functions = require("./viewResource/functions");

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Employee - Summary",
    labelKey: "HR_SUMMARY_HEADER"
  })
});

var subHeader = exports.subHeader = (0, _utils.getCommonContainer)({
  subHeader: (0, _utils.getCommonSubHeader)({
    labelName: "Verify entered details before submission. Details cannot be edited once submitted.",
    labelKey: "HR_SER_DET_SUB_HEADER"
  })
});

var tradeReview = (0, _employeeReview.employeeReviewDetails)(true);

var screenConfig = {
  uiFramework: "material-ui",
  name: "review",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    // COMMA SEPARATED ROLES IN REVIEW SCREEN
    (0, _functions.setRolesList)(state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        // headerDiv: {
        //   uiFramework: "custom-atoms",
        //   componentPath: "Container",
        //   children: {
        //     header: {
        //       gridDefination: {
        //         xs: 12,
        //         sm: 10
        //       },
        //       ...header
        //     },
        //     subHeader: {
        //       gridDefination: {
        //         xs: 12,
        //         sm: 10
        //       },
        //       ...subHeader
        //     }
        //   }
        // },
        tradeReview: tradeReview
      }
    }
  }
};

exports.default = screenConfig;