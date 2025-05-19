"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.institutionSummary = exports.applicantSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        labelName: "Owner Details",
        labelKey: "PT_OWNERSHIP_INFO_SUB_HEADER"
      }))
      // },
      // editSection: {
      //   componentPath: "Button",
      //   props: {
      //     color: "primary",
      //     style: {
      //       marginTop: "-10px",
      //       marginRight: "-18px"
      //     }
      //   },
      //   gridDefination: {
      //     xs: 4,
      //     align: "right"
      //   },
      //   children: {
      //     editIcon: {
      //       uiFramework: "custom-atoms",
      //       componentPath: "Icon",
      //       props: {
      //         iconName: "edit"
      //       }
      //     },
      //     buttonLabel: getLabel({
      //       labelName: "Edit",
      //       labelKey: "PT_EDIT"
      //     })
      //   }
      // }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        applicantContainer: (0, _utils.getCommonContainer)({
          mobileNo: (0, _utils.getLabelWithValue)({
            labelName: "Mobile No.",
            labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber"
            // callBack: value => {
            //   return value.split(".")[0];
            // }
          }),
          applicantName: (0, _utils.getLabelWithValue)({
            labelName: "Name",
            labelKey: "NOC_APPLICANT_NAME_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }),
          applicantGender: (0, _utils.getLabelWithValue)({
            labelName: "Gender",
            labelKey: "NOC_GENDER_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender"
          }),
          applicantFatherHusbandName: (0, _utils.getLabelWithValue)({
            labelName: "Father/Husband's Name",
            labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].fatherOrHusbandName"
          }),
          applicantDob: (0, _utils.getLabelWithValue)({
            labelName: "Date of Birth",
            labelKey: "NOC_APPLICANT_DOB_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].dob",
            callBack: function callBack(value) {
              return (0, _utils.convertEpochToDate)(value);
            }
          }),
          applicantEmail: (0, _utils.getLabelWithValue)({
            labelName: "Email",
            labelKey: "NOC_APPLICANT_EMAIL_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
          }),
          applicantAddress: (0, _utils.getLabelWithValue)({
            labelName: "Correspondence Address",
            labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress"
          })
        })
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
        labelName: "Owner Details",
        labelKey: "PT_OWNERSHIP_INFO_SUB_HEADER"
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
            labelKey: "PT_EDIT"
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
  body: (0, _utils.getCommonContainer)({
    institutionType: (0, _utils.getLabelWithValue)({
      labelName: "Institution Type",
      labelKey: "PT_INSTITUTION_Type"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
      callBack: function callBack(value) {
        return "COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(value);
      }
    }),
    institutionName: (0, _utils.getLabelWithValue)({
      labelName: "Name of Institution",
      labelKey: "NOC_NAME_OF_INSTITUTION_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionName"
    }),
    telephoneNumber: (0, _utils.getLabelWithValue)({
      labelName: "Official Telephone No.",
      labelKey: "NOC_OFFICIAL_TELEPHONE_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.telephoneNumber"
    }),
    authorizedPersonName: (0, _utils.getLabelWithValue)({
      labelName: "Name of Authorized Person",
      labelKey: "NOC_AUTHORIZED_PERSON_NAME_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
    }),
    designation: (0, _utils.getLabelWithValue)({
      labelName: "Designation in Institution",
      labelKey: "NOC_DESIGNATION_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionDesignation"
    }),
    mobileNumber: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No. of Authorized Person",
      labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber"
    }),
    authorizedEmail: (0, _utils.getLabelWithValue)({
      labelName: "Email of Authorized Person",
      labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
    }),
    officialAddress: (0, _utils.getLabelWithValue)({
      labelName: "Official Correspondence Address",
      labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress"
    })
  })
});