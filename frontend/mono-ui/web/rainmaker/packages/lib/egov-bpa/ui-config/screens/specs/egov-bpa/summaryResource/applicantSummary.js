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

var _footer = require("../applyResource/footer");

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
        labelName: "Owner Information",
        labelKey: "BPA_OWNER_INFO_TITLE"
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
            (0, _footer.changeStep)(state, dispatch, "", 2);
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
      scheama: (0, _utils.getCommonContainer)({
        // applicantContainer: getCommonContainer({
        mobileNo: (0, _utils.getLabelWithValue)({
          labelName: "Mobile No.",
          labelKey: "BPA_APPLICANT_MOBILE_NO_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].mobileNumber",
          callBack: _index.checkValueForNA
        }),
        applicantName: (0, _utils.getLabelWithValue)({
          labelName: "Name",
          labelKey: "BPA_OWNER_NAME_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].name",
          callBack: _index.checkValueForNA
        }),
        applicantGender: (0, _utils.getLabelWithValue)({
          labelName: "Gender",
          labelKey: "BPA_GENDER_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].gender",
          callBack: _index.checkValueForNA
        }),
        applicantFatherHusbandName: (0, _utils.getLabelWithValue)({
          labelName: "Guardian Name",
          labelKey: "BPA_APPLICANT_GUARDIAN_NAME_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].fatherOrHusbandName",
          callBack: _index.checkValueForNA
        }),
        applicantRelation: (0, _utils.getLabelWithValue)({
          labelName: "Relationship",
          labelKey: "BPA_APPLICANT_RELATIONSHIP_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].relationship",
          callBack: _index.checkValueForNA
        }),
        applicantDob: (0, _utils.getLabelWithValue)({
          labelName: "Date of Birth",
          labelKey: "BPA_APPLICANT_DOB_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].dob",
          callBack: function callBack(value) {
            return (0, _utils.convertEpochToDate)(value) || _index.checkValueForNA;
          }
        }),
        applicantEmail: (0, _utils.getLabelWithValue)({
          labelName: "Email",
          labelKey: "BPA_APPLICANT_EMAIL_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].emailId",
          callBack: _index.checkValueForNA
        }),
        applicantPan: (0, _utils.getLabelWithValue)({
          labelName: "PAN No.",
          labelKey: "BPA_APPLICANT_PAN_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].pan",
          callBack: _index.checkValueForNA
        }),
        applicantAddress: (0, _utils.getLabelWithValue)({
          labelName: "Correspondence Address",
          labelKey: "BPA_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
        }, {
          jsonPath: "BPA.landInfo.owners[0].correspondenceAddress",
          callBack: _index.checkValueForNA
        }),
        break: (0, _utils.getBreak)()
        // })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "BPA.landInfo.owners",
      prefixSourceJsonPath: "children",
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
        labelName: "Institution Details",
        labelKey: "BPA_INSTITUTION_DETAILS_HEADER"
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
            (0, _index.gotoApplyWithStep)(state, dispatch, 2);
          }
        }
      }
    }
  },
  body: (0, _utils.getCommonContainer)({
    institutionType: (0, _utils.getLabelWithValue)({
      labelName: "Institution Type",
      labelKey: "BPA_INSTITUTION_TYPE_LABEL"
    }, {
      jsonPath: "BPA.landInfo.ownerShipType",
      callBack: function callBack(value) {
        return "COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(value) || _index.checkValueForNA;
      }
    }),
    institutionName: (0, _utils.getLabelWithValue)({
      labelName: "Name of Institution",
      labelKey: "BPA_NAME_OF_INSTITUTION_LABEL"
    }, {
      jsonPath: "BPA.landInfo.additionalDetail.institutionName",
      callBack: _index.checkValueForNA
    }),
    telephoneNumber: (0, _utils.getLabelWithValue)({
      labelName: "Official Telephone No.",
      labelKey: "BPA_TELEPHONE_NUMBER_LABEL"
    }, {
      jsonPath: "BPA.landInfo.additionalDetail.telephoneNumber",
      callBack: _index.checkValueForNA
    }),
    authorizedPersonName: (0, _utils.getLabelWithValue)({
      labelName: "Name of Authorized Person",
      labelKey: "BPA_AUTHORIZED_PERSON_LABEL"
    }, {
      jsonPath: "BPA.landInfo.owners[0].name",
      callBack: _index.checkValueForNA
    }),
    designation: (0, _utils.getLabelWithValue)({
      labelName: "Designation in Institution",
      labelKey: "BPA_INSTITUTION_DESIGNATION_LABEL"
    }, {
      jsonPath: "BPA.landInfo.additionalDetail.institutionDesignation",
      callBack: _index.checkValueForNA
    }),
    mobileNumber: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No. of Authorized Person",
      labelKey: "BPA_AUTHORIZED_PERSON_MOBILE_LABEL"
    }, {
      jsonPath: "BPA.landInfo.owners[0].mobileNumber",
      callBack: _index.checkValueForNA
    }),
    authorizedEmail: (0, _utils.getLabelWithValue)({
      labelName: "Email of Authorized Person",
      labelKey: "BPA_AUTHORIZED_PERSON_EMAIL_LABEL"
    }, {
      jsonPath: "BPA.landInfo.owners[0].emailId",
      callBack: _index.checkValueForNA
    }),
    officialAddress: (0, _utils.getLabelWithValue)({
      labelName: "Official Correspondence Address",
      labelKey: "BPA_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
    }, {
      jsonPath: "BPA.landInfo.owners[0].correspondenceAddress",
      callBack: _index.checkValueForNA
    })
  })
});