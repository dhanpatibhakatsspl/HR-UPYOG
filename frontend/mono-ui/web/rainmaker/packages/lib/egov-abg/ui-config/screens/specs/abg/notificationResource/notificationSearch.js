"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationSearchCard = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

var NotificationSearchCard = exports.NotificationSearchCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)({
    usage: (0, _utils.getSelectField)({
      label: {
        labelName: "usage",
        labelKey: "ABG_USAGE_LABEL"
      },
      placeholder: {
        labelName: "Select Usage",
        labelKey: "ABG_USAGE_PLACEHOLDER"
      },
      required: true,
      visible: true,
      jsonPath: "searchScreen.usage",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "Usage-1"
      }, {
        code: "Usage-2"
      }]
    }),
    locMohalla: (0, _utils.getSelectField)({
      label: {
        labelName: "Locality/Mohalla",
        labelKey: "ABG_LOCALITY/MOHALLA_LABEL"
      },
      placeholder: {
        labelName: "Select Locality/Mohalla",
        labelKey: "ABG_LOCALITY/MOHALLA_PLACEHOLDER"
      },
      required: true,
      jsonPath: "searchScreen.locMohalla",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "Gandhi Nagar"
      }, {
        code: "Kormangala road-1"
      }]
    }),
    billAmount: (0, _utils.getTextField)({
      label: {
        labelName: "Bill Amount",
        labelKey: "ABG_BILL_AMOUNT_LABEL"
      },
      placeholder: {
        labelName: "Enter Bill Amount",
        labelKey: "ABG_BILL_AMOUNT_PLACEHOLDER"
      },
      required: true,
      jsonPath: "searchScreen.billAmount",
      gridDefination: {
        xs: 12,
        sm: 4

      }
    }),

    propertyUid: (0, _utils.getSelectField)({
      label: {
        labelName: "Property UID",
        labelKey: "ABG_PROPERTY_UID_LABEL"
      },
      placeholder: {
        labelName: "Select Property UID ",
        labelKey: "ABG_PROPERTY_UID_PLACEHOLDER"
      },
      required: true,
      jsonPath: "searchScreen.propertyUid",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "12345"
      }, {
        code: "132434"
      }]
    }),

    date: (0, _utils.getDateField)({
      label: {
        labelName: "Date",
        labelKey: "ABG_DATE_LABEL"
      },
      placeholder: {
        labelName: "Select Date",
        labelKey: "ABG_DATE_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "searchScreen.date"
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
            labelName: "SEND NOTIFICATION",
            labelKey: "ABG_NOTIFICATION_BUTTON"
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