"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApprovalDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getApprovalDetails = exports.getApprovalDetails = function getApprovalDetails(status) {
  var isEditable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)(getView(status).header))
      }
    },
    viewOne: (0, _utils.getCommonContainer)({
      approvedBy: (0, _utils.getLabelWithValue)(getView(status).subHeader1.label, getView(status).subHeader1.json),
      approvalComments: (0, _utils.getLabelWithValue)(getView(status).subHeader2.label, getView(status).subHeader2.json)
    }),
    viewTow: (0, _utils.getCommonContainer)({
      lbl: (0, _extends3.default)({
        gridDefination: {
          xs: 12
        },
        visible: true,
        props: {
          style: {
            padding: "12px 24px 12px 0"
          }
        }
      }, (0, _utils.getCommonCaption)({
        labelName: "Uploaded Documents",
        labelKey: "TL_EMP_APPLICATION_UP_DOC"
      })),

      editSection: {
        componentPath: "Button",
        props: {
          color: "primary"
        },
        gridDefination: {
          xs: 12,
          sm: 2,
          align: "right"
        },
        visible: isEditable,
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
            labelKey: "TL_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _footer.changeStep)(state, dispatch, "", 2);
          }
        }
      },
      documents: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-tradelicence",
        componentPath: "DownloadFileContainer",
        props: {
          sourceJsonPath: "LicensesTemp[0].verifyDocData"
        }
      }
    })
  });
};

var getView = function getView(status) {
  switch (status) {
    case "approved":
      return getDetails({
        labelName: "Approval Details",
        labelKey: "TL_EMP_APPROVAL_DETAILS"
      }, getSubHeader("Approved By", "TL_EMP_APPLICATION_APPR_BY", "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.approvedBy"), getSubHeader("Approval Comments", "TL_EMP_APPLICATION_APPR_COM", "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.comments"));

    case "rejected":
      return getDetails({
        labelName: "Rejection Details",
        labelKey: "TL_EMP_APPLICATION_REJ_DETAILS"
      }, getSubHeader("Rejected By", "TL_EMP_APPLICATION_REJ_BY", "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.rejectedBy"), getSubHeader("Rejection Comments", "TL_EMP_APPLICATION_REJ_COM", "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.comments"));

    case "cancelled":
      return getDetails({
        labelName: "Cancellation Details",
        labelKey: "TL_EMP_APPLICATION_CANC_DET"
      }, getSubHeader("Cancelled By", "TL_EMP_APPLICATION_CANC_BY", "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.cancelledBy"), getSubHeader("Cancellation Comments", "TL_EMP_APPLICATION_CANC_COM", "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.comments"));

    default:
      return getDetails({
        labelName: "",
        labelKey: ""
      }, getSubHeader("", "", ""), getSubHeader("", "", ""));
  }
};

var getDetails = function getDetails(header, subHeader1, subHeader2) {
  return {
    header: header,
    subHeader1: subHeader1,
    subHeader2: subHeader2
  };
};
var getSubHeader = function getSubHeader(labelName, labelKey, jsonPath) {
  return { label: { labelName: labelName, labelKey: labelKey }, json: { jsonPath: jsonPath } };
};