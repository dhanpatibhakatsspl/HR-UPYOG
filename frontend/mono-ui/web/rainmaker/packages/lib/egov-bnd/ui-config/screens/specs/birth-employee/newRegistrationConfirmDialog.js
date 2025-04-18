"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmationDialog = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _newRegistration = require("./newRegistration");

var _newRegistrationFooter = require("./newRegistrationFooter");

var confirmationDialog = exports.confirmationDialog = (0, _utils.getCommonContainer)({
  closeButton: {
    componentPath: "Button",
    props: {
      style: {
        float: "right",
        color: "rgba(0, 0, 0, 0.60)"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "close"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        return (0, _newRegistration.showHideConfirmationPopup)(state, dispatch, "getCertificate");
      }
    }
  },
  header: (0, _utils.getCommonHeader)({
    labelName: "Confirm Download",
    labelKey: "BND_CONFIRM_SUBMIT"
  }, {
    style: {
      fontSize: "20px"
    }
  }),
  confirmationContents: (0, _utils.getCommonContainer)({
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row-reverse"
        }
      },
      children: {
        yesButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              minWidth: "100px",
              height: "20px",
              marginRight: "20px",
              marginTop: "16px",
              boxShadow: "none"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)({
              labelName: "YES",
              labelKey: "BND_DOWNLOAD_PROCEED"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _newRegistrationFooter.postData)(state, dispatch);
              (0, _newRegistration.showHideConfirmationPopup)(state, dispatch, "newRegistration");
            }
          }
        },
        cancelButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            style: {
              minWidth: "100px",
              height: "20px",
              marginRight: "4px",
              marginTop: "16px",
              color: "gray",
              border: "none"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)({
              labelName: "NO",
              labelKey: "CORE_COMMON_CANCEL"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _newRegistration.showHideConfirmationPopup)(state, dispatch, "newRegistration");
            }
          }
        }
      }
    }
  }, { className: "confirm-bnd-popup" })
}, { className: "confirm-bnd-popup" });