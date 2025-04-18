"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.billGenSearchCard = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _functions = require("./functions");

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = hasButton && hasButton === "false" ? false : true;

var billGenSearchCard = exports.billGenSearchCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)({
    year: (0, _utils.getSelectField)({
      label: {
        labelName: "Year",
        labelKey: "ABG_YEAR_LABEL"
      },
      placeholder: {
        labelName: "Select Year",
        labelKey: "ABG_YEAR_PLACEHOLDER"
      },
      required: true,
      visible: true,
      jsonPath: "searchScreen.year",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "2018-19"
      }, {
        code: "2019-20"
      }]
    }),
    service: (0, _utils.getSelectField)({
      label: {
        labelName: "Service",
        labelKey: "ABG_SERVICE_LABEL"
      },
      placeholder: {
        labelName: "Select Service",
        labelKey: "ABG_SERVICE_PLACEHOLDER"
      },
      required: true,
      jsonPath: "searchScreen.service",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "service-1"
      }, {
        code: "service-2"
      }]
    }),
    ulb: (0, _utils.getSelectField)({
      label: {
        labelName: "ULB",
        labelKey: "ABG_ULB_LABEL"
      },
      placeholder: {
        labelName: "Select ULB",
        labelKey: "ABG_ULB_PLACEHOLDER"
      },
      required: true,
      jsonPath: "searchScreen.ulb",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "ULB-1"
      }, {
        code: "ULB-2"
      }]
    }),
    locMohalla: (0, _utils.getSelectField)({
      label: {
        labelName: "Location/Mohalla",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Location/Mohalla",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.locMohalla",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "Ajit Nagar"
      }, {
        code: "Cinema road-1"
      }]
    })
  }),

  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            backgroundColor: "#FE7A51",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "GENERATE BILL",
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.searchApiCall
        }
      },
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }
    })
  })
});