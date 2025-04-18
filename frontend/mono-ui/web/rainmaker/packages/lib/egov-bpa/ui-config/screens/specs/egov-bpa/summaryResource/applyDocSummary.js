"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDocSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../applyResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyDocSummary = exports.applyDocSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Document and NOC details",
        labelKey: "BPA_DOCUMENT_AND_NOC_DETAILS_HEADER"
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
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Edit",
            labelKey: "BPA_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _footer.changeStep)(state, dispatch, "", 3);
          }
        }
      }
    }
  },
  documentDetailsCard: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "DocumentSummaryContainer",
    props: {
      sourceJsonPath: "documentDetailsPreview",
      className: "noc-review-documents"
    }
  }
});