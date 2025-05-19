"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../utils");

var _footer = require("./approveResource/footer");

var _commons2 = require("../../../../ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryValueAN = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Trade License Application (" + (0, _utils2.getCurrentFinancialYear)() + ")"
    // labelKey: "TL_APPROVAL_REJ_MESSAGE_HEAD"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
    componentPath: "ApplicationNoContainer",
    props: {
      number: queryValueAN
    }
  }
});

var getApproveCard = function getApproveCard(queryValuePurpose) {
  return (0, _utils.getCommonCard)({
    headerOne: queryValuePurpose === "cancel" ? (0, _utils.getCommonSubHeader)({
      labelName: "Cancellation Remarks",
      labelKey: "BPA_CANCEL_CHECKLIST_HEAD"
    }) : (0, _utils.getCommonSubHeader)({
      labelName: "Verification Details",
      labelKey: "BPA_APPROVAL_CHECKLIST_HEAD"
    }, {
      style: {
        fontSize: "20px"
      }
    }),

    commentSection: (0, _utils2.getContainerWithElement)({
      children: {
        div: (0, _utils2.getApprovalTextField)(queryValuePurpose)
      },
      props: {
        style: {
          marginTop: 20
        }
      }
    }),
    commentInfo: (0, _utils.getCommonParagraph)({
      labelName: "Max. Character Limit 500*"
    }, {
      style: {
        fontSize: 12,
        marginBottom: 0,
        color: "rgba(0, 0, 0, 0.6000000238418579)"
      }
    }),
    uploadFileHeader: (0, _utils.getCommonSubHeader)({
      labelName: "Supporting Documents",
      labelKey: "BPA_APPROVAL_UPLOAD_HEAD"
    }, {
      style: { marginTop: 15 }
    }),
    uploadFileInfo: (0, _utils.getCommonParagraph)({
      labelName: "Only .jpg and .pdf files. 5MB max file size.",
      labelKey: "BPA_APPROVAL_UPLOAD_SUBHEAD"
    }, {
      style: {
        fontSize: 12,
        marginBottom: 0,
        marginTop: 5,
        color: "rgba(0, 0, 0, 0.6000000238418579)"
      }
    }),
    uploadFiles: (0, _utils2.getUploadFilesMultiple)("Licenses[0].tradeLicenseDetail.verificationDocuments"),
    checkBoxContainer: (0, _utils2.getCheckbox)("Self declaration provided by the applicant has been found correct and the trade running on the premises is same as given in the application form.", (0, _utils2.getCheckBoxJsonpath)(queryValuePurpose))
  });
};

var getTopChildren = function getTopChildren(queryValueAN, queryValueTenantId, queryValuePurpose) {
  return {
    header: header,
    getApproveCard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        form: getApproveCard(queryValuePurpose)
      }
    },
    footerApprove: (0, _footer.footerApprove)(queryValueAN, queryValueTenantId, queryValuePurpose)
  };
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "approve",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var queryValuePurpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
    var queryValueAN = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var queryValueTenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

    if (queryValueAN) {
      (0, _commons2.updatePFOforSearchResults)(action, state, dispatch, queryValueAN, queryValuePurpose);
    }
    var data = getTopChildren(queryValueAN, queryValueTenantId, queryValuePurpose);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    (0, _set2.default)(action, "screenConfig.components.div.props.id", "action_" + queryValuePurpose);
    return action;
  }
};

exports.default = screenConfig;