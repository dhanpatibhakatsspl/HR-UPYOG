"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployeeDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils2 = require("../../utils");

var _footer = require("../createResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gotoCreatePage = function gotoCreatePage(state, dispatch) {
  var createUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/create?step=0" : "/hrms/create?step=0";
  dispatch((0, _actions.setRoute)(createUrl));
};

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hrms",
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

var getEmployeeDetailsView = exports.getEmployeeDetailsView = function getEmployeeDetailsView() {
  var isReview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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
          labelName: "Employee Details",
          labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
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
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _footer.changeStep)(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    personalDetailsHeader: getHeader({
      labelName: "Personal Details",
      labelKey: "HR_SUMMARY_PERSONAL_DEATILS_SUBHEADER"
    }),
    break1: (0, _utils.getBreak)(),
    viewOne: (0, _utils.getCommonContainer)({
      reviewName: (0, _utils.getLabelWithValue)({
        labelName: "Name",
        labelKey: "HR_COMMON_TABLE_COL_NAME"
      }, { jsonPath: "Employee[0].user.name", callBack: _utils2.checkValueForNA }),
      reviewMobile: (0, _utils.getLabelWithValue)({ labelName: "Mobile No", labelKey: "HR_MOB_NO_LABEL" }, { jsonPath: "Employee[0].user.mobileNumber", callBack: _utils2.checkValueForNA }),
      reviewGuardian: (0, _utils.getLabelWithValue)({
        labelName: "Guardian's Name",
        labelKey: "HR_GUARDIAN_NAME_LABEL"
      }, { jsonPath: "Employee[0].user.fatherOrHusbandName", callBack: _utils2.checkValueForNA }),
      reviewFather: (0, _utils.getLabelWithValue)({
        labelName: "Relationship",
        labelKey: "HR_RELATIONSHIP_LABEL"
      }, { jsonPath: "Employee[0].user.relationship", callBack: _utils2.checkValueForNA }),
      reviewGender: (0, _utils.getLabelWithValue)({ labelName: "Gender", labelKey: "HR_GENDER_LABEL" }, {
        jsonPath: "Employee[0].user.gender",
        localePrefix: {
          moduleName: "COMMON",
          masterName: "GENDER"
        }, callBack: _utils2.checkValueForNA
      }),
      reviewDob: (0, _utils.getLabelWithValue)({ labelName: "Date Of Birth", labelKey: "HR_DOB_LABEL" }, {
        jsonPath: "Employee[0].user.dob", callBack: _utils2.checkValueForNA
      }),
      reviewEmail: (0, _utils.getLabelWithValue)({ labelName: "Email", labelKey: "HR_EMAIL_LABEL" }, {
        jsonPath: "Employee[0].user.emailId", callBack: _utils2.checkValueForNA
      }),
      reviewAddress: (0, _utils.getLabelWithValue)({
        labelName: "Correspondence Addres",
        labelKey: "HR_CORRESPONDENCE_ADDRESS_LABEL"
      }, {
        jsonPath: "Employee[0].user.correspondenceAddress", callBack: _utils2.checkValueForNA
      })
    }),
    professionalDetailsHeader: getHeader({
      labelName: "Professional Details",
      labelKey: "HR_SUMMARY_PROFESSIONAL_DEATILS_SUBHEADER"
    }),
    break2: (0, _utils.getBreak)(),
    viewTwo: (0, _utils.getCommonContainer)({
      reviewEmpID: (0, _utils.getLabelWithValue)({
        labelName: "Employee ID",
        labelKey: "HR_EMP_ID_LABEL"
      }, { jsonPath: "Employee[0].code", callBack: _utils2.checkValueForNA }),
      reviewDOA: (0, _utils.getLabelWithValue)({ labelName: "Date of Appointment", labelKey: "HR_APPT_DATE_LABEL" }, {
        jsonPath: "Employee[0].dateOfAppointment", callBack: _utils2.checkValueForNA
      }),
      reviewEmpType: (0, _utils.getLabelWithValue)({ labelName: "Employee Type", labelKey: "HR_EMP_TYPE_LABEL" }, {
        jsonPath: "Employee[0].employeeType", callBack: _utils2.checkValueForNA,
        localePrefix: {
          moduleName: "egov-hrms",
          masterName: "EmployeeType"
        }
      }),
      reviewStatus: (0, _utils.getLabelWithValue)({ labelName: "Status", labelKey: "HR_STATUS_LABEL" }, {
        jsonPath: "Employee[0].employeeStatus",
        localePrefix: {
          moduleName: "egov-hrms",
          masterName: "EmployeeStatus", callBack: _utils2.checkValueForNA
        }
      })
      // reviewRole: getLabelWithValue(
      //   { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
      //   {
      //     jsonPath: "hrms.reviewScreen.furnishedRolesList", callBack: checkValueForNA
      //   }
      // ),
    })
  });
};