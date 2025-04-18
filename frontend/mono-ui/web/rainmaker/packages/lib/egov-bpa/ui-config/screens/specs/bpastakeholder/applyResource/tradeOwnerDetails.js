"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradeOwnerDetails = exports.OwnerInfoCard = exports.getOwnerEmailField = exports.getOwnerDOBField = exports.getGenderRadioButton = exports.getOwnerMobNoField = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOwnerMobNoField = exports.getOwnerMobNoField = (0, _utils.getTextField)({
  label: {
    labelName: "Mobile No.",
    labelKey: "BPA_APPLICANT_MOBILE_NO_LABEL"
  },
  placeholder: {
    labelName: "Enter Mobile No.",
    labelKey: "BPA_ENTER_APPLICANT_MOBILE_NO_PLACEHOLDER"
  },
  iconObj: {
    label: "+91 |",
    position: "start"
  },
  required: true,
  pattern: (0, _utils.getPattern)("MobileNo"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber"
});

var getGenderRadioButton = exports.getGenderRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 12,
    md: 6
  },
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
  props: {
    label: {
      name: "Gender",
      key: "BPA_COMMON_GENDER_LABEL"
    },
    //     {
    //       label: "Husband",
    //       labelKey: "COMMON_RELATION_HUSBAND",
    //       value: "HUSBAND"
    //     }
    //   ],
    //   "Licenses[0].tradeLicenseDetail.owners[0].relationship",
    //   ""
    // );

    buttons: [{
      labelName: "Male",
      labelKey: "COMMON_GENDER_MALE",
      value: "MALE"
    }, {
      label: "Female",
      labelKey: "COMMON_GENDER_FEMALE",
      value: "FEMALE"
    }, {
      label: "Transgender",
      labelKey: "COMMON_GENDER_TRANSGENDER",
      value: "TRANSGENDER"
    }],
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
    required: true
  },
  required: true,
  type: "array"
};

var getOwnerDOBField = exports.getOwnerDOBField = (0, _utils.getDateField)({
  label: { labelName: "Date of Birth", labelKey: "BPA_APPLICANT_DOB_LABEL" },
  placeholder: {
    labelName: "Enter Date of Birth",
    labelKey: "BPA_NEW_OWNER_DETAILS_DOB_PLACEHOLDER"
  },
  required: true,
  pattern: (0, _utils.getPattern)("Date"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
  props: {
    inputProps: {
      max: (0, _utils2.getTodaysDateInYMD)()
    }
  }
});

var getOwnerEmailField = exports.getOwnerEmailField = (0, _utils.getTextField)({
  label: {
    labelName: "Email",
    labelKey: "BPA_APPLICANT_EMAIL_LABEL"
  },
  placeholder: {
    labelName: "Enter Email",
    labelKey: "BPA_ENTER_APPLICANT_EMAIL_PLACEHOLDER"
  },
  pattern: (0, _utils.getPattern)("Email"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId",
  required: true
});

var OwnerInfoCard = exports.OwnerInfoCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Applicant Details",
    labelKey: "BPA_COMMON_AP_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  tradeUnitCardContainer: (0, _utils.getCommonContainer)({
    ownerName: (0, _utils.getTextField)({
      label: {
        labelName: "Applicant Name",
        labelKey: "BPA_APPLICANT_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Applicant Name",
        labelKey: "BPA_APPLICANT_NAME_LABEL_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Name"),
      jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name"
    }),
    getGenderRadioButton: getGenderRadioButton,
    ownerDOB: (0, _extends3.default)({}, (0, _utils.getDateField)({
      label: {
        labelName: "Date of Birth",
        labelKey: "BPA_EMP_APPLICATION_DOB"
      },
      placeholder: {
        labelName: "Enter Date of Birth",
        labelKey: "BPA_NEW_OWNER_DETAILS_DOB_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      isDOB: true,
      errorMessage: "TL_DOB_ERROR_MESSAGE",
      jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
      minValue: (0, _utils2.getHundredYearOldDateForDOB)(),
      maxValue: (0, _utils2.getEighteenYearOldDateForDOB)(),
      props: {
        inputProps: {
          max: (0, _utils2.getTodaysDateInYMD)()
        }
      }
    })),
    getOwnerMobNoField: getOwnerMobNoField,
    getOwnerEmailField: getOwnerEmailField,
    ownerPAN: (0, _utils.getTextField)({
      label: {
        labelName: "PAN No.",
        labelKey: "BPA_APPLICANT_PAN_LABEL"
      },
      placeholder: {
        labelName: "Enter Owner's PAN No.",
        labelKey: "BPA_ENTER_APPLICANT_PAN_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("PAN"),
      jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].pan"
    })
  })
});

var tradeOwnerDetails = exports.tradeOwnerDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Trade Owner Details",
    labelKey: "BPA_NEW_OWNER_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  OwnerInfoCard: OwnerInfoCard
});