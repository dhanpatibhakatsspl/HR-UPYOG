"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.billSearchCard = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _function = require("./function");

// const tenantId = process.env.REACT_APP_NAME === "Employee" ?  getTenantId() : JSON.parse(getUserInfo()).permanentCity;
var resetFields = function resetFields(state, dispatch) {
  var tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.ulb", "props.value", tenantId));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.consumerCode", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.billNumber", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.mobileNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.helperText", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen", { tenantId: tenantId, businesService: "" }));
};

var billSearchCard = exports.billSearchCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Search Bill",
    labelKey: "ABG_SEARCH_BILL_COMMON_HEADER"
  }),
  subheader: (0, _utils.getCommonSubHeader)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "ABG_SEARCH_BILL_COMMON_SUB_HEADER"
  }),
  searchContainer: (0, _utils.getCommonContainer)({
    ulb: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-abg",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "ULB",
          labelKey: "ABG_ULB_LABEL"
        },
        labelPrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Select ULB",
          labelKey: "ABG_ULB_PLACEHOLDER"
        },
        required: true,
        labelsFromLocalisation: true,
        // isClearable: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        jsonPath: "searchScreen.tenantId",
        disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true
      },
      required: true,
      jsonPath: "searchScreen.tenantId",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    },
    serviceCategory: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-abg",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Service Category",
          labelKey: "ABG_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select Service Category",
          labelKey: "ABG_SERVICE_CATEGORY_PLACEHOLDER"
        },
        required: true,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        // isClearable: true,
        jsonPath: "searchScreen.businesService",
        localePrefix: {
          moduleName: "BillingService",
          masterName: "BusinessService"
        },
        sourceJsonPath: "searchScreenMdmsData.BillingService.BusinessService"
      },
      required: true,
      jsonPath: "searchScreen.businesService",
      gridDefination: {
        xs: 12,
        sm: 4
      },

      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        var labelName = {
          labelKey: "ABG_" + action.value + "_CONSUMER_CODE_LABEL",
          labelName: "Consumer Code"
        };
        var placeHolder = {
          labelKey: "ABG_" + action.value + "_CONSUMER_CODE_PLACEHOLDER",
          labelName: "Enter Consumer Code"
        };
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.consumerCode", "props.label", labelName));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("billSearch", "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.consumerCode", "props.placeholders", placeHolder));
      }
    },
    consumerCode: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Code",
        labelKey: "ABG_CONSUMER_CODE_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Code",
        labelKey: "ABG_CONSUMER_CODE_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.consumerCode",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    billNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Bill No.",
        labelKey: "ABG_BILL_NUMBER_LABEL"
      },
      placeholder: {
        labelName: "Enter Bill No.",
        labelKey: "ABG_BILL_NUMBER_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.billNo",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    mobileNo: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No.",
        labelKey: "ABG_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No.",
        labelKey: "ABG_MOBILE_NO_PLACEHOLDER"
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
      jsonPath: "searchScreen.mobileNumber"
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
          labelKey: "ABG_RESET_BUTTON"
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
          labelKey: "ABG_SEARCH_BUTTON"
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
});