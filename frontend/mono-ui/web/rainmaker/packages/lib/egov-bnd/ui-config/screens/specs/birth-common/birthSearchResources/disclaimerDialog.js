"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disclaimerDialog = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

var _birthSearchCard = require("./birthSearchCard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dSignAgreePath = "bnd.birth.iAgree";
var disclaimerDialog = exports.disclaimerDialog = (0, _utils.getCommonContainer)({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        marginBottom: "10px"
      }
    },
    children: {
      header0: (0, _utils.getCommonHeader)({
        labelName: "",
        labelKey: "BND_IMPORTANT"
      }, {
        style: {
          fontSize: "20px",
          display: "inline"
        }
      }),
      closeButton: {
        componentPath: "Button",
        props: {
          style: {
            margin: "-10px",
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
            return (0, _birthSearchCard.showHideConfirmationPopup)(state, dispatch, "getCertificate");
          }
        }
      }
    }
  },
  divider1: (0, _utils.getDivider)(),
  downloadNote: (0, _utils.getCommonContainer)({
    value0: (0, _utils.getCommonCaption)({
      labelName: "",
      labelKey: "BND_DOWNLOAD_NOTE"
    }, {
      style: {
        fontSize: "14px"
      }
    }),
    break1: (0, _utils.getBreak)()
  }),
  header: (0, _utils.getCommonHeader)({
    labelName: "Confirm Download",
    labelKey: "BND_DOWNLOAD_TERMS"
  }, {
    style: {
      fontSize: "20px"
    }
  }),
  confirmationContents: (0, _utils.getCommonContainer)({
    termsContainer: (0, _utils.getCommonGrayCard)({
      value0: (0, _utils.getCommonParagraph)({
        labelName: "Important : The application form is to be signed by the original lessee or his/her successors/heir. Otherwise considered invalid.",
        labelKey: "BND_DOWNLOAD_TERMS_CONTENT1"
      })
    }),

    break2: _utils.getBreak,
    checkBox: {
      required: true,
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bnd",
      componentPath: "Checkbox",
      props: {
        label: {
          labelKey: "BND_DOWNLOAD_IAGREE",
          labelName: "I agree and wish to continue"
        },
        jsonPath: dSignAgreePath
      }
    },
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
              var iAgree = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, dSignAgreePath);
              if (iAgree) {
                (0, _utils2.triggerDownload)("birth");
                (0, _birthSearchCard.showHideConfirmationPopup)(state, dispatch, "getCertificate");
              } else {
                dispatch((0, _actions.toggleSnackbar)(true, {
                  labelName: "You have to agree to terms and conditions before you proceed.",
                  labelKey: "ERR_BND_DOWNLOAD_IAGREE"
                }, "error"));
              }
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
              labelKey: "BND_CANCEL_DOWNLOAD_IAGREE"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _birthSearchCard.showHideConfirmationPopup)(state, dispatch, "getCertificate");
            }
          }
        }
      }
    }
  })
});