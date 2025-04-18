"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentsSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentsSummary = exports.documentsSummary = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Documents",
        labelKey: "PT_SUMMARY_DOCUMENTS_HEADER"
      })),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        }
        // children: {
        //   editIcon: {
        //     uiFramework: "custom-atoms",
        //     componentPath: "Icon",
        //     props: {
        //       iconName: "edit"
        //     }
        //   },
        // buttonLabel: getLabel({
        //   labelName: "Edit",
        //   labelKey: "PT_EDIT"
        // })
        //  },
        // onClickDefination: {
        //   action: "condition",
        //   callBack: (state, dispatch) => {
        //     gotoApplyWithStep(state, dispatch, 1);
        //   }
        // }
      }
    }
  },
  body: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pt",
    componentPath: "DownloadFileContainer",
    props: {
      sourceJsonPath: "documentsPreview",
      className: "pt-review-documents"
    }
  }
});