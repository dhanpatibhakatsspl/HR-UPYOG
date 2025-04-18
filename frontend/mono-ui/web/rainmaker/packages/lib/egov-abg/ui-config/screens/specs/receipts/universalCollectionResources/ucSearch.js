"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UCSearchCard = exports.resetFields = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _function = require("./function");

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  var compJson = "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children";

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".receiptNumber", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".receiptNumber", "props.error", false));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".consumerNumber", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".consumerNumber", "props.error", false));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".serviceType", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".serviceType", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".serviceType", "props.helperText", ""));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".mobileNumber", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", compJson + ".mobileNumber", "props.error", false));
};

var UCSearchCard = exports.UCSearchCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Search Receipt",
    labelKey: "CR_SEARCH_COMMON_HEADER"
  }),
  subheader: (0, _utils.getCommonSubHeader)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "CR_SEARCH_COMMON_SUB_HEADER"
  }),
  searchContainer: (0, _utils.getCommonContainer)({
    serviceType: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-uc",
      componentPath: "AutosuggestContainer",
      props: {
        className: "autocomplete-dropdown",
        label: {
          labelName: "Service Category",
          labelKey: "CR_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select Service Category",
          labelKey: "CR_SERVICE_CATEGORY_PLACEHOLDER"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        sourceJsonPath: "applyScreenMdmsData.businessServices",
        jsonPath: "receiptCancelSearch.businessService"
      },
      required: true,
      jsonPath: "receiptCancelSearch.businessService",
      gridDefination: {
        xs: 12,
        sm: 4
      }
      // beforeFieldChange: async (action, state, dispatch) => {
      //   const serviceCategory = get(
      //     state.screenConfiguration,
      //     "preparedFinalObject.applyScreenMdmsData.serviceCategories"
      //   );
      //   const selectedCategory = serviceCategory.find(
      //     item => item.code === action.value
      //   );
      //   const serviceTypes =
      //     selectedCategory &&
      //     ((selectedCategory.child &&
      //     selectedCategory.child.length > 0) ?
      //     selectedCategory.child.map(item => item.code) : selectedCategory.code);
      //   dispatch(
      //     prepareFinalObject("receiptCancelSearch.businessServices", serviceTypes)
      //   );
      //   return action;
      // }
    },
    consumerNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Receipt Number.",
        labelKey: "CR_CONSUMER_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Receipt No.",
        labelKey: "CR_ENTER_CONSUMER_NO_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "receiptCancelSearch.consumerCodes",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    receiptNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Receipt Number.",
        labelKey: "CR_RECEPIT_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Receipt No.",
        labelKey: "CR_ENTER_RECEPIT_NO_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "receiptCancelSearch.receiptNumbers",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    mobileNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No.",
        labelKey: "CR_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile NO.",
        labelKey: "CR_MOBILE_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: (0, _utils.getPattern)("MobileNo"),
      errorMessage: "Invalid Mobile No..",
      jsonPath: "receiptCancelSearch.mobileNumber"
    })
  }),

  buttonContainer: (0, _utils.getCommonContainer)({
    firstCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    resetButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 3
        // align: "center"
      },
      props: {
        variant: "outlined",
        style: {
          color: "#FE7A51",
          // backgroundColor: "#FE7A51",
          border: "#FE7A51 solid 1px",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "80%" : "100%",
          height: "48px"
        }
      },
      children: {
        buttonLabel: (0, _utils.getLabel)({
          labelName: "RESET",
          labelKey: "CR_RESET_BUTTON"
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
        sm: 3
        // align: "center"
      },
      props: {
        variant: "contained",
        style: {
          color: "white",
          backgroundColor: "#696969",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "80%" : "100%",
          height: "48px"
        }
      },
      children: {
        buttonLabel: (0, _utils.getLabel)({
          labelName: "SEARCH",
          labelKey: "CR_SEARCH_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          (0, _function.searchApiCall)(state, dispatch);
        }
      }
    },

    lastCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    }
  })
}, {
  style: { overflow: "visible" }
});