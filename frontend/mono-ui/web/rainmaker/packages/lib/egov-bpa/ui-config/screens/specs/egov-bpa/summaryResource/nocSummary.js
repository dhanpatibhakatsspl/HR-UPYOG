"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _updateNocDetails = require("../applyResource/updateNocDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var nocSummary = exports.nocSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "NOC Details",
        labelKey: "BPA_NOC_DETAILS"
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
            (0, _index.gotoApplyWithStep)(state, dispatch, 5);
          }
        }
      }
    }
  },
  nocDocumentDetailsCard: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        body: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-bpa",
          componentPath: "DownloadFileContainer",
          props: {
            sourceJsonPath: "nocDocumentsPreview",
            className: "noc-review-documents"
          }
        }
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      // sourceJsonPath: "",
      prefixSourceJsonPath: "children.cardContent.children.totalBuildUpAreaDetailsContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
  uploadedNocDocumentDetailsCard: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        statusOfNocDetails: _updateNocDetails.statusOfNocDetails
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "scrutinyDetails.planDetail.blocks[0].building",
      prefixSourceJsonPath: "children.cardContent.children.totalBuildUpAreaDetailsContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});