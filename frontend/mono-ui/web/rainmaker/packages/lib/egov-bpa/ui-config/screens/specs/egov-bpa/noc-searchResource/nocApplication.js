"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocApplication = exports.resetFields = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _functions = require("./functions");

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("noc-search", "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.appNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("noc-search", "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.sourceAppNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("noc-search", "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.nocNo", "props.value", ""));
};

var nocApplication = exports.nocApplication = (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Application for NOC",
    labelKey: "NOC_RESULTS_HEADER"
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "BPA_HOME_SEARCH_RESULTS_DESC"
  }),
  appBPAHomeSearchResultsContainer: (0, _utils.getCommonContainer)({
    appNo: (0, _utils.getTextField)({
      label: {
        labelName: "Application number",
        labelKey: "BPA_NOC_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Application number",
        labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.applicationNo"
    }),
    sourceAppNo: (0, _utils.getTextField)({
      label: {
        labelName: "Sourde module Application number",
        labelKey: "SOURCE_MODULE_NUMBER"
      },
      placeholder: {
        labelName: "Enter Source Application number",
        labelKey: "ENTER_SOURCE_MODULE_NUMBER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.sourceRefId"
    }),
    nocNo: (0, _utils.getTextField)({
      label: {
        labelName: "NOC number",
        labelKey: "NOC_NUMBER"
      },
      placeholder: {
        labelName: "Enter noc number",
        labelKey: "ENTER_NOC_NUMBER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.nocNo"
    }),
    nocType: (0, _utils.getSelectField)({
      label: {
        labelName: "NOC Type",
        labelKey: "NOC_TYPE"
      },
      localePrefix: {
        moduleName: "NOC",
        masterName: "NOC_TYPE"
      },
      props: {
        disabled: true,
        className: "tl-trade-type"
      },
      jsonPath: "nocType",
      sourceJsonPath: "applyScreenMdmsData.NOC.NocType",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  }),
  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            borderColor: "#FE7A51",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Reset",
            labelKey: "BPA_HOME_SEARCH_RESET_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFields
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Search",
            labelKey: "BPA_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.searchApiCall
        }
      }
    })
  })
});