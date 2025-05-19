"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.institutionSummary = exports.institutionSummaryDetail = exports.applicantSummary = exports.applicantSummaryDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicantSummaryDetails = exports.applicantSummaryDetails = {
  mobileNo: (0, _utils.getLabelWithValue)({
    labelName: "Mobile No.",
    labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber",
    callBack: _index.checkValueForNA
  }),
  applicantName: (0, _utils.getLabelWithValue)({
    labelName: "Name",
    labelKey: "NOC_APPLICANT_NAME_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
    callBack: _index.checkValueForNA
  }),
  applicantGender: (0, _utils.getLabelWithValue)({
    labelName: "Gender",
    labelKey: "NOC_GENDER_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender",
    callBack: _index.checkValueForNA
  }),
  applicantFatherHusbandName: (0, _utils.getLabelWithValue)({
    labelName: "Father/Husband's Name",
    labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].fatherOrHusbandName",
    callBack: _index.checkValueForNA
  }),
  applicantRelation: (0, _utils.getLabelWithValue)({
    labelName: "Relationship",
    labelKey: "NOC_APPLICANT_RELATIONSHIP_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].relationship",
    callBack: _index.checkValueForNA
  }),
  applicantDob: (0, _utils.getLabelWithValue)({
    labelName: "Date of Birth",
    labelKey: "NOC_APPLICANT_DOB_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].dob",
    callBack: function callBack(value) {
      return value ? (0, _utils.convertEpochToDate)(value) : "NA";
    }
  }),
  applicantEmail: (0, _utils.getLabelWithValue)({
    labelName: "Email",
    labelKey: "NOC_APPLICANT_EMAIL_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId",
    callBack: _index.checkValueForNA
  }),
  applicantPan: (0, _utils.getLabelWithValue)({
    labelName: "PAN",
    labelKey: "NOC_APPLICANT_PAN_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].pan",
    callBack: _index.checkValueForNA
  }),
  applicantAddress: (0, _utils.getLabelWithValue)({
    labelName: "Correspondence Address",
    labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress",
    callBack: _index.checkValueForNA
  })
};

var applicantSummary = exports.applicantSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Applicant Details",
        labelKey: "NOC_APPLICANT_DETAILS_HEADER"
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
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _index.gotoApplyWithStep)(state, dispatch, 2);
          }
        }
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        applicantContainer: (0, _utils.getCommonContainer)(applicantSummaryDetails)
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
      prefixSourceJsonPath: "children.cardContent.children.applicantContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});

var institutionSummaryDetail = exports.institutionSummaryDetail = {
  institutionType: (0, _utils.getLabelWithValue)({
    labelName: "Institution Type",
    labelKey: "NOC_INSTITUTION_TYPE_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
    callBack: function callBack(value) {
      return value ? "COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(value) : "NA";
    }
  }),
  institutionName: (0, _utils.getLabelWithValue)({
    labelName: "Name of Institution",
    labelKey: "NOC_NAME_OF_INSTITUTION_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionName",
    callBack: _index.checkValueForNA
  }),
  telephoneNumber: (0, _utils.getLabelWithValue)({
    labelName: "Official Telephone No.",
    labelKey: "NOC_OFFICIAL_TELEPHONE_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.telephoneNumber",
    callBack: _index.checkValueForNA
  }),
  authorizedPersonName: (0, _utils.getLabelWithValue)({
    labelName: "Name of Authorized Person",
    labelKey: "NOC_AUTHORIZED_PERSON_NAME_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
    callBack: _index.checkValueForNA
  }),
  designation: (0, _utils.getLabelWithValue)({
    labelName: "Designation in Institution",
    labelKey: "NOC_DESIGNATION_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionDesignation",
    callBack: _index.checkValueForNA
  }),
  mobileNumber: (0, _utils.getLabelWithValue)({
    labelName: "Mobile No. of Authorized Person",
    labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber",
    callBack: _index.checkValueForNA
  }),
  authorizedEmail: (0, _utils.getLabelWithValue)({
    labelName: "Email of Authorized Person",
    labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId",
    callBack: _index.checkValueForNA
  }),
  officialAddress: (0, _utils.getLabelWithValue)({
    labelName: "Official Correspondence Address",
    labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress",
    callBack: _index.checkValueForNA
  })
};
var institutionSummary = exports.institutionSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Institution Details",
        labelKey: "NOC_INSTITUTION_DETAILS_HEADER"
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
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _index.gotoApplyWithStep)(state, dispatch, 2);
          }
        }
      }
    }
  },
  body: (0, _utils.getCommonContainer)(institutionSummaryDetail)
});