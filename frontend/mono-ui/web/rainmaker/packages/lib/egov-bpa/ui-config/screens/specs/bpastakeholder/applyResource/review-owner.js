"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewOwner = exports.reviewOwnerPAN = exports.reviewOwnerEmail = exports.reviewOwnerPhoneNo = exports.reviewOwnerDOB = exports.reviewOwnerGender = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _footer = require("./footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewOwnerGender = exports.reviewOwnerGender = (0, _utils.getLabelWithValue)({
  labelName: "Gender",
  labelKey: "BPA_COMMON_GENDER_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
  localePrefix: {
    moduleName: "COMMON",
    masterName: "GENDER"
  },
  callBack: _utils2.checkValueForNA
});

var reviewOwnerDOB = exports.reviewOwnerDOB = (0, _utils.getLabelWithValue)({
  labelName: "Date of Birth",
  labelKey: "BPA_APPLICANT_DOB_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
  callBack: _utils2.convertEpochToDate
});

var reviewOwnerPhoneNo = exports.reviewOwnerPhoneNo = (0, _utils.getLabelWithValue)({
  labelName: "Mobile No.",
  labelKey: "BPA_APPLICANT_MOBILE_NO_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
  callBack: _utils2.checkValueForNA
});
var reviewOwnerEmail = exports.reviewOwnerEmail = (0, _utils.getLabelWithValue)({
  labelName: "Email",
  labelKey: "BPA_APPLICANT_EMAIL_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId",
  callBack: _utils2.checkValueForNA
});
var reviewOwnerPAN = exports.reviewOwnerPAN = (0, _utils.getLabelWithValue)({
  labelName: "PAN No.",
  labelKey: "BPA_APPLICANT_PAN_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].pan",
  callBack: _utils2.checkValueForNA
});

var getReviewOwner = exports.getReviewOwner = function getReviewOwner() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelName: "Applicant Details",
          labelKey: "BPA_COMMON_AP_DETAILS"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
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
              (0, _footer.changeStep)(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    multiOwner: (0, _utils.getCommonContainer)({
      viewFive: (0, _utils.getCommonContainer)({
        reviewApplicantName: (0, _utils.getLabelWithValue)({
          labelName: "Applicant Name",
          labelKey: "BPA_APPLICANT_NAME_LABEL"
        }, { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name" }),
        reviewOwnerGender: reviewOwnerGender,
        reviewOwnerDOB: reviewOwnerDOB,
        reviewOwnerPhoneNo: reviewOwnerPhoneNo,
        reviewOwnerEmail: reviewOwnerEmail,
        reviewOwnerPAN: reviewOwnerPAN
      })
    })
  });
};