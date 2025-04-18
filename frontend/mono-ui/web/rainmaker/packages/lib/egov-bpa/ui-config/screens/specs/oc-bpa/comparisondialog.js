"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparisondialog = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../utils");

var comparisondialog = exports.comparisondialog = (0, _utils.getCommonCard)({
  reportChildren: (0, _utils.getCommonContainer)({
    comparisionReport: {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-bpa",
      componentPath: "ComparisionLink",
      gridDefination: {
        xs: 12,
        sm: 12
      },
      props: {
        label: {
          labelName: "Building Permit Number",
          labelKey: "EDCR_BUILDING_PERMIT_NUM_LABEL"
        },
        jsonPath: "BPA.comparisionReport"
      },
      type: "array"
    },
    div2: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 12,
        alignItems: "center"
      },
      props: {
        style: {
          width: "100%",
          float: "right",
          cursor: "pointer"
        }
      },

      children: {
        submitButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              minWidth: "100px",
              height: "48px",
              float: "right"
            }
          },
          children: {
            submitButtonLabel: (0, _utils.getLabel)({
              labelName: "OK",
              labelKey: "BPA_COMMON_BUTTON_OK"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: _utils2.gotoHome
          },

          visible: true
        }
      }
    }
  })
});