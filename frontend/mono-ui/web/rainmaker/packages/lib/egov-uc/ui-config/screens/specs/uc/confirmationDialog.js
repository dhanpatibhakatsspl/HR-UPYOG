"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmationDialog = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _searchPreview = require("./search-preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confirmationDialog = exports.confirmationDialog = (0, _utils.getCommonContainer)({

  confirmationContents: (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelName: "Do you really want to cancel challan",
      labelKey: "CANCEL_CHALLAN_HEADER"
    }, {
      style: {
        fontSize: "20px"
      }
    }),
    commentsField: (0, _utils.getTextField)({
      label: {
        labelName: "Enter Comments",
        labelKey: "CANCEL_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comments",
        labelKey: "CANCEL_COMMENT_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 12
      },
      props: {
        style: {
          width: "90%"
        }
      },
      pattern: (0, _utils.getPattern)("cancelChallan"),
      required: true,
      visible: true,
      jsonPath: "Challan.additionalDetail.cancellComment"
    }),
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          width: "90%",
          textAlign: "center"
        }
      },
      children: {
        yesButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              width: "40px",
              height: "20px",
              marginRight: "20px",
              marginTop: "16px"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)({
              labelName: "YES",
              labelKey: "CANCEL_YES"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              var cancelComment = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Challan.additionalDetail.cancellComment");
              if (cancelComment && cancelComment.length <= 100) {
                (0, _searchPreview.cancelChallan)(state, dispatch, "CANCELLED");
              } else {
                dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Comment should be less then 100 characters",
                  labelKey: "ERR_CANCEL_CHALLAN_INVALID_INPUT" }, "error"));
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
              width: "40px",
              height: "20px",
              marginRight: "4px",
              marginTop: "16px"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)({
              labelName: "NO",
              labelKey: "CANCEL_NO"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _searchPreview.showHideConfirmationPopup)(state, dispatch, "newCollection");
            }
          }
        }
      }
    }
  })
});