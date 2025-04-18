"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicantDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showComponent = function showComponent(dispatch, componentJsonPath, display) {
  var displayProps = display ? {} : { display: "none" };
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonPath, "props.style", displayProps));
};

var commonApplicantInformation = function commonApplicantInformation() {
  return (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "Owner Information",
      labelKey: "BPA_OWNER_INFORMATION"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    applicantCard: (0, _utils.getCommonContainer)({
      mobileNumber: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No.",
          labelKey: "BPA_APPLICANT_MOBILE_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "BPA_ENTER_APPLICANT_MOBILE_NO_PLACEHOLDER"
        },
        required: true,
        props: {
          className: "applicant-details-error"
        },
        title: {
          value: "Please search profile linked to the mobile no.",
          key: "NOC_APPLICANT_MOBILE_NO_TOOLTIP_MESSAGE"
        },
        infoIcon: "info_circle",
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "BPA.landInfo.owners[0].mobileNumber",
        iconObj: {
          iconName: "search",
          position: "end",
          color: "#FE7A51",
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch, fieldInfo) {
              (0, _utils2.getBpaDetailsForOwner)(state, dispatch, fieldInfo);
            }
          }
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      dummyDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true
        }
      },
      applicantName: (0, _utils.getTextField)({
        label: {
          labelName: "Name",
          labelKey: "BPA_APPLICANT_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "BPA_ENTER_APPLICANT_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "BPA.landInfo.owners[0].name",
        props: {
          className: "applicant-details-error"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      genderRadioGroup: (0, _utils.getSelectField)({
        label: {
          labelName: "Gender",
          labelKey: "BPA_APPLICANT_GENDER_LABEL"
        },
        placeholder: {
          labelName: "Select Gender",
          labelKey: "BPA_APPLICANT_GENDER_PLACEHOLDER"
        },
        required: true,
        optionValue: "code",
        optionLabel: "label",
        jsonPath: "BPA.landInfo.owners[0].gender",
        data: [{
          code: "MALE",
          label: "COMMON_GENDER_MALE"
        }, {
          code: "FEMALE",
          label: "COMMON_GENDER_FEMALE"
        }, {
          code: "TRANSGENDER",
          label: "COMMON_GENDER_TRANSGENDER"
        }],
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      applicantDob: (0, _extends3.default)({}, (0, _utils.getDateField)({
        label: {
          labelName: "Date Of Birth",
          labelKey: "BPA_APPLICANT_DOB_LABEL"
        },
        placeholder: {
          labelName: "DD/MM/YYYY",
          labelKey: "BPA_ENTER_APPLICANT_DOB_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Date"),
        isDOB: true,
        errorMessage: "BPA_DOB_ERROR_MESSAGE",
        jsonPath: "BPA.landInfo.owners[0].dob",
        props: {
          className: "applicant-details-error",
          inputProps: {
            max: (0, _utils2.getTodaysDateInYMD)()
          }
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })),
      applicantEmail: (0, _utils.getTextField)({
        label: {
          labelName: "Email",
          labelKey: "BPA_APPLICANT_EMAIL_LABEL"
        },
        placeholder: {
          labelName: "Enter Email",
          labelKey: "BPA_ENTER_APPLICANT_EMAIL_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Email"),
        errorMessage: "BPA_INVALID_EMIAL",
        jsonPath: "BPA.landInfo.owners[0].emailId",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      fatherHusbandName: (0, _utils.getTextField)({
        label: {
          labelName: "Guardian Name",
          labelKey: "BPA_APPLICANT_GUARDIAN_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Guardian Name",
          labelKey: "BPA_APPLICANT_GUARDIAN_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "BPA.landInfo.owners[0].fatherOrHusbandName",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      relationshipRadioGroup: {
        uiFramework: "custom-containers",
        componentPath: "RadioGroupContainer",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        jsonPath: "BPA.landInfo.owners[0].relationship",
        props: {
          label: {
            name: "Relationship",
            key: "BPA_APPLICANT_RELATIONSHIP_LABEL",
            className: "applicant-details-error"
          },
          buttons: [{
            labelName: "Father",
            labelKey: "BPA_APPLICANT_RELATIONSHIP_FATHER_RADIOBUTTON",
            value: "FATHER"
          }, {
            label: "Husband",
            labelKey: "BPA_APPLICANT_RELATIONSHIP_HUSBAND_RADIOBUTTON",
            value: "HUSBAND"
          }],
          jsonPath: "BPA.landInfo.owners[0].relationship",
          required: true
        },
        required: true,
        type: "array"
      },
      applicantPan: (0, _utils.getTextField)({
        label: {
          labelName: "PAN No.",
          labelKey: "BPA_APPLICANT_PAN_LABEL"
        },
        placeholder: {
          labelName: "Enter Applicant's PAN No.",
          labelKey: "BPA_ENTER_APPLICANT_PAN_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("PAN"),
        errorMessage: "Invalid PAN",
        jsonPath: "BPA.landInfo.owners[0].pan",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      applicantAddress: (0, _utils.getTextField)({
        label: {
          labelName: "Correspondence Address",
          labelKey: "BPA_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "BPA_ENTER_APPLICANT_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Address"),
        errorMessage: "BPA_INVALID_ADDRESS",
        jsonPath: "BPA.landInfo.owners[0].correspondenceAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      primaryOwner: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "BpaCheckboxContainer",
        jsonPath: "BPA.landInfo.owners[0].isPrimaryOwner",
        props: {
          label: {
            labelName: "Is Primary Owner ?",
            labelKey: "BPA_IS_PRIMARY_OWNER_LABEL"
          },
          jsonPath: "BPA.landInfo.owners[0].isPrimaryOwner"
        },
        type: "array"
      }
    })
  });
};

var institutionInformation = function institutionInformation() {
  return (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "Owner Information",
      labelKey: "NOC_OWNER_INFO_TITLE"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    applicantCard: (0, _utils.getCommonContainer)({
      institutionName: (0, _utils.getTextField)({
        label: {
          labelName: "Name of Institution",
          labelKey: "NOC_INSTITUTION_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of Institution",
          labelKey: "NOC_ENTER_INSTITUTION_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        required: true,
        jsonPath: "BPA.landInfo.additionalDetail.institutionName",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      telephoneNumber: (0, _utils.getTextField)({
        label: {
          labelName: "Official Telephone No.",
          labelKey: "NOC_TELEPHONE_NUMBER_LABEL"
        },
        placeholder: {
          labelName: "Enter Official Telephone No.",
          labelKey: "NOC_ENTER_TELEPHONE_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "Invalid Number",
        jsonPath: "BPA.landInfo.additionalDetail.telephoneNumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorisedPerson: (0, _utils.getTextField)({
        label: {
          labelName: "Name of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of Authorized Person",
          labelKey: "NOC_ENTER_AUTHORIZED_PERSON_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "BPA.landInfo.owners[0].name",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      designation: (0, _utils.getTextField)({
        label: {
          labelName: "Designation in Institution",
          labelKey: "NOC_INSTITUTION_DESIGNATION_LABEL"
        },
        placeholder: {
          labelName: "Enter designation of Institution",
          labelKey: "NOC_ENTER_INSTITUTION_DESIGNATION_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Designation Name",
        jsonPath: "BPA.landInfo.additionalDetail.institutionDesignation",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorizedPersonMobile: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No. of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No. of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "Invalid MobileNo.",

        jsonPath: "BPA.landInfo.owners[0].mobileNumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorizedPersonEmail: (0, _utils.getTextField)({
        label: {
          labelName: "Email of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
        },
        placeholder: {
          labelName: "Enter Email of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Email"),
        errorMessage: "Invalid Email",
        required: true,
        jsonPath: "BPA.landInfo.owners[0].emailId",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      officialCorrespondenceAddress: (0, _utils.getTextField)({
        label: {
          labelName: "Official Correspondence Address",
          labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Official Correspondence Address ",
          labelKey: "NOC_ENTER_OFFICIAL_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Address"),
        errorMessage: "Invalid Address",
        jsonPath: "BPA.landInfo.owners[0].correspondenceAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    })
  });
};

var applicantDetails = exports.applicantDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Owner Details",
    labelKey: "BPA_APPLICANT_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  break: (0, _utils.getBreak)(),
  applicantTypeContainer: (0, _utils.getCommonContainer)({
    applicantTypeSelection: (0, _utils.getCommonContainer)({
      applicantType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
        label: {
          labelName: "Owner Type",
          labelKey: "BPA_OWNER_TYPE"
        },
        placeholder: {
          labelName: "Select Owner Type",
          labelKey: "BPA_OWNER_TYPE_PLACEHOLDER"
        },
        jsonPath: "BPA.landInfo.ownerShipMajorType",
        localePrefix: {
          moduleName: "common-masters",
          masterName: "OwnerShipCategory"
        },
        required: true,
        sourceJsonPath: "applyScreenMdmsData.DropdownsData.OwnershipCategory",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }), {
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
          var path = action.componentJsonpath.replace(/.applicantType$/, ".applicantSubType");
          var applicantType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory", []);
          var applicantSubType = applicantType.filter(function (item) {
            return item.active && item.code.startsWith(action.value);
          });
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path, "props.data", applicantSubType));
        }
      }),
      applicantSubType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
        label: {
          labelName: "Type of Owner - Subtype",
          labelKey: "BPA_OWNER_SUB_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Owner Subtype",
          labelKey: "BPA_OWNER_SUB_TYPE_PLACEHOLDER"
        },
        jsonPath: "BPA.landInfo.ownershipCategory",
        localePrefix: {
          moduleName: "common-masters",
          masterName: "OwnerShipCategory"
        },
        required: true,
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }), {
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
          var singleApplicantContainerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer";
          var multipleApplicantContainerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer";
          var institutionContainerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";
          var primaryOwnerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children.primaryOwner";
          if (action.value.includes("SINGLEOWNER")) {
            showComponent(dispatch, singleApplicantContainerJsonPath, true);
            showComponent(dispatch, multipleApplicantContainerJsonPath, false);
            showComponent(dispatch, institutionContainerJsonPath, false);
            dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.owners[0].isPrimaryOwner", true));
          } else if (action.value.includes("MULTIPLEOWNERS")) {
            showComponent(dispatch, singleApplicantContainerJsonPath, false);
            showComponent(dispatch, multipleApplicantContainerJsonPath, true);
            showComponent(dispatch, institutionContainerJsonPath, false);
            dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.owners[0].isPrimaryOwner", false));
          } else if (action.value.includes("INSTITUTIONAL")) {
            showComponent(dispatch, singleApplicantContainerJsonPath, false);
            showComponent(dispatch, multipleApplicantContainerJsonPath, false);
            showComponent(dispatch, institutionContainerJsonPath, true);
          }
        }
      })
    }),
    singleApplicantContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        individualApplicantInfo: commonApplicantInformation()
      }
    },
    multipleApplicantContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          display: "none"
        }
      },
      children: {
        multipleApplicantInfo: {
          uiFramework: "custom-containers",
          componentPath: "MultiItem",
          props: {
            scheama: commonApplicantInformation(),
            items: [],
            addItemLabel: {
              labelName: "Add Owner",
              labelKey: "BPA_ADD_OWNER"
            },
            sourceJsonPath: "BPA.landInfo.owners",
            prefixSourceJsonPath: "children.cardContent.children.applicantCard.children"
          },
          type: "array"
        }
      }
    },
    institutionContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          display: "none"
        }
      },
      children: {
        institutionInfo: institutionInformation()
      }
    }
  })
});