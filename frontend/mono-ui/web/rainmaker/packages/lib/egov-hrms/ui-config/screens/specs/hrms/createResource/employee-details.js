"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.professionalDetails = exports.employeeDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var employeeDetails = exports.employeeDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Personal Details",
    labelKey: "HR_PERSONAL_DETAILS_FORM_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  employeeDetailsContainer: (0, _utils.getCommonContainer)({
    employeeName: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Name",
        labelKey: "HR_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Employee Name",
        labelKey: "HR_NAME_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Name") || null,
      jsonPath: "Employee[0].user.name"
    })),
    mobileNumber: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No.",
        labelKey: "HR_MOB_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No.",
        labelKey: "HR_MOB_NO_PLACEHOLDER"
      },
      title: {
        value: "Password/OTP will be sent to this number",
        key: "HR_MOB_NO_TOOLTIP_MESSAGE"
      },
      infoIcon: "info_circle",
      required: true,
      pattern: (0, _utils.getPattern)("MobileNo"),
      jsonPath: "Employee[0].user.mobileNumber"
    })),
    guardianName: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Guardian's Name",
        labelKey: "HR_GUARDIAN_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Guardian's Name",
        labelKey: "HR_GUARDIAN_NAME_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Name") || null,
      jsonPath: "Employee[0].user.fatherOrHusbandName"
    })),
    relationShipType: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hrms",
      componentPath: "AutosuggestContainer",
      jsonPath: "Employee[0].user.relationship",
      props: {
        className: "hr-generic-selectfield autocomplete-dropdown",
        data: [{
          code: "FATHER",
          name: "COMMON_RELATION_FATHER"
        }, {
          code: "HUSBAND",
          name: "COMMON_RELATION_HUSBAND"
        }],
        optionValue: "value",
        optionLabel: "label",
        label: { labelName: "Relationship", labelKey: "HR_RELATIONSHIP_LABEL" },
        placeholder: {
          labelName: "Select Relationship",
          labelKey: "HR_RELATIONSHIP_PLACEHOLDER"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        jsonPath: "Employee[0].user.relationship"
      },
      required: true,
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    },
    gender: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hrms",
      componentPath: "AutosuggestContainer",
      jsonPath: "Employee[0].user.gender",
      props: {
        className: "hr-generic-selectfield autocomplete-dropdown",
        data: [{
          code: "MALE",
          name: "COMMON_GENDER_MALE"
        }, {
          code: "FEMALE",
          name: "COMMON_GENDER_FEMALE"
        }, {
          code: "TRANSGENDER",
          name: "COMMON_GENDER_TRANSGENDER"
          // {
          //   value: "OTHERS",
          //   label: "COMMON_GENDER_OTHERS"
          // }
        }],
        optionValue: "value",
        optionLabel: "label",
        label: { labelName: "Gender", labelKey: "HR_GENDER_LABEL" },
        placeholder: {
          labelName: "Select Gender",
          labelKey: "HR_GENDER_PLACEHOLDER"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        jsonPath: "Employee[0].user.gender"
      },
      required: true,
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    },
    dateOfBirth: (0, _extends3.default)({}, (0, _utils.getDateField)({
      label: {
        labelName: "Date of Birth",
        labelKey: "HR_BIRTH_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter Date of Birth",
        labelKey: "HR_BIRTH_DATE_PLACEHOLDER"
      },
      required: true,
      isDOB: true,
      maxDate: (0, _commons.getMaxDate)(14),
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Employee[0].user.dob",
      props: {
        inputProps: {
          max: (0, _utils2.getTodaysDateInYMD)()
        }
      }
    })),
    email: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Email",
        labelKey: "HR_EMAIL_LABEL"
      },
      placeholder: {
        labelName: "Enter Email",
        labelKey: "HR_EMAIL_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Email"),
      jsonPath: "Employee[0].user.emailId"
    })),
    correspondenceAddress: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Correspondence Address",
        labelKey: "HR_CORRESPONDENCE_ADDRESS_LABEL"
      },
      placeholder: {
        labelName: "Enter Corrospondence Address",
        labelKey: "HR_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
      },
      required: false,
      pattern: (0, _utils.getPattern)("Address"),
      jsonPath: "Employee[0].user.correspondenceAddress"
    }))
  })
}, {
  style: { overflow: "visible" }
});

var professionalDetails = exports.professionalDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Professional Details",
    labelKey: "HR_PROFESSIONAL_DETAILS_FORM_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  employeeDetailsContainer: (0, _utils.getCommonContainer)({
    employeeId: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Employee ID",
        labelKey: "HR_EMPLOYEE_ID_LABEL"
      },
      placeholder: {
        labelName: "Enter Employee ID",
        labelKey: "HR_EMPLOYEE_ID_PLACEHOLDER"
      },
      pattern: /^[a-zA-Z0-9-!@#\$%\^\&*\)\(+=._]*$/i,
      jsonPath: "Employee[0].code"
    })),
    dateOfAppointment: (0, _extends3.default)({}, (0, _utils.getDateField)({
      label: {
        labelName: "Date of Appointment",
        labelKey: "HR_APPOINTMENT_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter Date of Appointment",
        labelKey: "HR_APPOINTMENT_DATE_PLACEHOLDER"
      },
      isDOB: true,
      maxDate: (0, _utils2.getTodaysDateInYMD)(),
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Employee[0].dateOfAppointment",
      props: {
        inputProps: {
          max: (0, _utils2.getTodaysDateInYMD)()
        }
      }
    })),
    employmentType: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hrms",
      componentPath: "AutosuggestContainer",
      jsonPath: "Employee[0].employeeType",
      props: {
        optionLabel: "status",
        optionValue: "code",
        localePrefix: {
          moduleName: "egov-hrms",
          masterName: "EmployeeType"
        },
        label: {
          labelName: "Employement Type",
          labelKey: "HR_EMPLOYMENT_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Employment Type",
          labelKey: "HR_EMPLOYMENT_TYPE_PLACEHOLDER"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        jsonPath: "Employee[0].employeeType",
        sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeType"
      },
      required: true,
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    },
    status: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hrms",
      componentPath: "AutosuggestContainer",
      jsonPath: "Employee[0].employeeStatus",
      props: {
        optionLabel: "status",
        optionValue: "code",
        disabled: true,
        value: "EMPLOYED",
        localePrefix: {
          moduleName: "egov-hrms",
          masterName: "EmployeeStatus"
        },
        label: { labelName: "Status", labelKey: "HR_STATUS_LABEL" },
        placeholder: {
          labelName: "Select Status",
          labelKey: "HR_STATUS_PLACEHOLDER"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeStatus"
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }
    // role: {
    //   uiFramework: "custom-containers-local",
    //   moduleName: "egov-hrms",
    //   componentPath: "AutosuggestContainer",
    //   jsonPath: "Employee[0].user.roles",
    //   required: true,
    //   props: {
    //     className:"autocomplete-dropdown hrms-role-dropdown",
    //     label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
    //     placeholder: {
    //       labelName: "Select Role",
    //       labelKey: "HR_ROLE_PLACEHOLDER"
    //     },
    //     jsonPath: "Employee[0].user.roles",
    //     sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
    //     labelsFromLocalisation: true,
    //     suggestions: [],
    //     fullwidth: true,
    //     required: true,
    //     inputLabelProps: {
    //       shrink: true
    //     },
    //     localePrefix: {
    //       moduleName: "ACCESSCONTROL_ROLES",
    //       masterName: "ROLES"
    //     },
    //     isMulti: true,
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6
    //   }
    // }
  })
}, {
  style: { overflow: "visible" }
});