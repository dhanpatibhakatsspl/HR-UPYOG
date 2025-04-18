"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchCard = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _function = require("./function");

var resetFields = function resetFields(state, dispatch) {
  var tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.ulb", "props.value", tenantId));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.consumerCode", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.billNumber", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.mobileNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.helperText", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen", { tenantId: tenantId, businessService: "", mobileNumber: "", amendmentId: "", consumerCode: "" }));
};

var searchCard = exports.searchCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Search Bill",
    labelKey: "BILL_SEARCH_BILL_COMMON_HEADER"
  }),
  subheader: (0, _utils.getCommonSubHeader)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "BILL_SEARCH_BILL_COMMON_SUB_HEADER"
  }),
  searchContainer: (0, _utils.getCommonContainer)({
    ulb: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-billamend",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "ULB",
          labelKey: "BILL_ULB_LABEL"
        },
        labelPrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Select ULB",
          labelKey: "BILL_ULB_PLACEHOLDER"
        },
        required: true,
        labelsFromLocalisation: true,
        // isClearable: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        jsonPath: "searchScreenBillAmend.tenantId",
        disabled: true,
        isDisabled: true
      },
      required: true,
      jsonPath: "searchScreenBillAmend.tenantId",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    },
    serviceCategory: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-billamend",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Service Category",
          labelKey: "BILL_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select Service Category",
          labelKey: "BILL_SERVICE_CATEGORY_PLACEHOLDER"
        },
        required: true,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        // isClearable: true,
        jsonPath: "searchScreenBillAmend.businessService",
        localePrefix: {
          moduleName: "BillingService",
          masterName: "BusinessService"
        },
        sourceJsonPath: "searchScreenMdmsData.BillingService.BusinessService"
      },
      required: true,
      jsonPath: "searchScreenBillAmend.businessService",
      gridDefination: {
        xs: 12,
        sm: 4
      },

      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        var labelName = {
          labelKey: "BILL_" + action.value + "_CONSUMER_CODE_LABEL",
          labelName: "Consumer Code"
        };
        var placeHolder = {
          labelKey: "BILL_" + action.value + "_CONSUMER_CODE_PLACEHOLDER",
          labelName: "Enter Consumer Code"
        };
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.consumerCode", "props.label", labelName));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchCard.children.cardContent.children.searchContainer.children.consumerCode", "props.placeholders", placeHolder));
      }
    },
    mobileNo: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No.",
        labelKey: "BILL_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No.",
        labelKey: "BILL_MOBILE_NO_PLACEHOLDER"
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
      // disabled: true,
      pattern: (0, _utils.getPattern)("MobileNo"),
      errorMessage: "Invalid Mobile No..",
      jsonPath: "searchScreenBillAmend.mobileNumber"
    }),
    billNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Bill No.",
        labelKey: "BILL_BILL_NUMBER_LABEL"
      },
      placeholder: {
        labelName: "Enter Bill No.",
        labelKey: "BILL_BILL_NUMBER_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "searchScreenBillAmend.amendmentId",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    consumerCode: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Code",
        labelKey: "BILL_CONSUMER_CODE_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Code",
        labelKey: "BILL_CONSUMER_CODE_PLACEHOLDER"
      },
      required: false,
      visible: true,
      pattern: /^[a-zA-Z0-9-/]*$/i,
      jsonPath: "searchScreenBillAmend.consumerCode",
      gridDefination: {
        xs: 12,
        sm: 4
      }
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
          labelKey: "BILL_RESET_BUTTON"
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
          labelKey: "BILL_SEARCH_BUTTON"
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