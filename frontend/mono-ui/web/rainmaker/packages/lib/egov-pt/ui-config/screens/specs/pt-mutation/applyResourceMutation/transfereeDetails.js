"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItemInMultiselect = exports.transfereeDetails = exports.onChangeTypeOfOwnership = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showComponent = function showComponent(dispatch, componentJsonPath, display) {
  var oldStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var displayProps = display ? (0, _extends3.default)({}, oldStyle, { display: 'block' }) : (0, _extends3.default)({}, oldStyle, { display: "none" });
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonPath, "props.style", displayProps));
};

var showDocumentType = function showDocumentType(dispatch, componentJsonPath, display) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonPath, "visible", display));
};

var commonApplicantInformation = function commonApplicantInformation() {
  return (0, _utils.getCommonGrayCard)({

    applicantCard: (0, _utils.getCommonContainer)({

      applicantName: (0, _utils.getTextField)({
        label: {
          labelName: "Name",
          labelKey: "PT_MUTATION_APPLICANT_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "PT_MUTATION_APPLICANT_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "Property.ownersTemp[0].name",
        props: {
          className: "applicant-details-error"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      genderRadioGroup: {
        uiFramework: "custom-containers",
        componentPath: "RadioGroupContainer",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        jsonPath: "Property.ownersTemp[0].gender",
        props: {
          label: { name: "Gender", key: "PT_MUTATION_TRANSFEREE_GENDER_LABEL" },
          className: "applicant-details-error",
          buttons: [{
            labelName: "Male",
            labelKey: "PT_MUTATION_TRANSFEREE_GENDER_MALE_RADIOBUTTON",
            value: "MALE"
          }, {
            labelName: "FEMALE",
            labelKey: "PT_MUTATION_TRANSFEREE_GENDER_FEMALE_RADIOBUTTON",
            value: "FEMALE"
          }, {
            labelName: "Transgender",
            labelKey: "PT_MUTATION_TRANSFEREE_GENDER_TRANSGENDER_RADIOBUTTON",
            value: "TRANSGENDER"
          }],
          jsonPath: "Property.ownersTemp[0].gender",
          required: true,
          errorMessage: "Required"
        },
        required: true,
        type: "array"
      },
      mobileNumber: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No.",
          labelKey: "PT_MUTATION_APPLICANT_MOBILE_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "PT_MUTATION_APPLICANT_MOBILE_NO_PLACEHOLDER"
        },
        required: true,
        props: {
          className: "applicant-details-error"
        },
        title: {
          value: "Please search profile linked to the mobile no.",
          key: "PT_MUTATION_APPLICANT_MOBILE_NO_TOOLTIP_MESSAGE"
        },
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "Property.ownersTemp[0].mobileNumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      alterMobileNo: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No.",
          labelKey: "PT_FORM3_ALT_MOBILE_NO"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "PT_FORM3_ALT_MOBILE_NO_PLACEHOLDER"
        },
        required: false,
        props: {
          className: "applicant-details-error"
        },
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "Property.ownersTemp[0].alternatemobilenumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      guardianName: (0, _utils.getTextField)({
        label: {
          labelName: "Guardian's Name",
          labelKey: "PT_MUTATION_TRANSFEREE_GUARDIAN_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Guardian's Name",
          labelKey: "PT_MUTATION_TRANSFEREE_GUARDIAN_NAME_LABEL_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "Property.ownersTemp[0].fatherOrHusbandName",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      relationshipWithGuardian: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "Relationship with Guardian",
            labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_RELATIONSHIP_LABEL"
          },
          placeholder: {
            labelName: "Select Relationship with Guardian",
            labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_RELATIONSHIP_LABEL_PLACEHOLDER"
          },
          required: true,
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          isClearable: true,
          labelsFromLocalisation: true,
          className: "autocomplete-dropdown",
          jsonPath: "Property.ownersTemp[0].relationship",
          data: [{
            code: "FATHER"
          }, {
            code: "HUSBAND"
          }]
          // sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
        },
        required: true,
        jsonPath: "Property.ownersTemp[0].relationship",
        // sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      },
      //   label: {
      //     labelName: "Relationship with Guardian",
      //     labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_RELATIONSHIP_LABEL"
      //   },
      //   placeholder: {
      //     labelName: "Select Relationship with Guardian",
      //     labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_RELATIONSHIP_LABEL_PLACEHOLDER"
      //   },
      //   required: true,
      //   jsonPath:
      //     "Property.ownersTemp[0].relationship",
      //   data: [
      //     {
      //       code: "FATHER"
      //     },
      //     {
      //       code: "HUSBAND"
      //     }
      //   ],
      //   localePrefix: {
      //     moduleName: "common-masters",
      //     masterName: "OwnerType"
      //   },
      //   //sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
      //   gridDefination: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6
      //   }
      // }),
      applicantEmail: (0, _utils.getTextField)({
        label: {
          labelName: "Email",
          labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_EMAIL_LABEL"
        },
        placeholder: {
          labelName: "Enter Email",
          labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_EMAIL_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Email"),
        errorMessage: "Invalid Email",
        jsonPath: "Property.ownersTemp[0].emailId",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),

      specialApplicantCategory: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "Special Applicant Category",
            labelKey: "PT_MUTATION_TRANSFEREE_SPECIAL_APPLICANT_CATEGORY_LABEL"
          },
          placeholder: {
            labelName: "Select Special Applicant Category",
            labelKey: "PT_MUTATION_TRANSFEREE_SPECIAL_APPLICANT_CATEGORY_PLACEHOLDER"
          },
          required: true,
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          isClearable: true,
          labelsFromLocalisation: true,
          className: "autocomplete-dropdown",
          jsonPath: "Property.ownersTemp[0].ownerType",
          sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType"
        },
        required: true,
        jsonPath: "Property.ownersTemp[0].ownerType",
        sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {

          var dynamicPath = "" + action.componentJsonpath.split('.specialApplicantCategory')[0];

          var categoryDocumentJsonPath = dynamicPath + ".specialCategoryDocument";
          var specialCategoryDocumentTypeJsonPath = dynamicPath + ".specialCategoryDocumentType";

          //  componentJsonpath: "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.items[0].item0.children.cardContent.children.ownerContainer.children.ownerDocumentId"


          //  const thirdStepPath="components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.items[0].item0.children.cardContent.children.ownerContainer.children";
          var thirdStepPath = "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children";

          var categoryDocumentThirdStepJsonPath = thirdStepPath + ".ownerDocumentId.props.style";

          var categoryDocumentTypeThirdStepJsonPath = thirdStepPath + ".ownerSpecialDocumentType.props.style";

          if (action.value === "NONE" || action.value === " ") {
            showComponent(dispatch, categoryDocumentJsonPath, false);
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", categoryDocumentJsonPath, "required", false));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", categoryDocumentJsonPath, "props.value", ""));
            showDocumentType(dispatch, specialCategoryDocumentTypeJsonPath, false);
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", specialCategoryDocumentTypeJsonPath, "required", false));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", specialCategoryDocumentTypeJsonPath, "props.value", ""));
            //showComponent(dispatch, categoryDocumentThirdStepJsonPath, false);

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", categoryDocumentThirdStepJsonPath, "display", "none"));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", categoryDocumentTypeThirdStepJsonPath, "display", "none"));
          } else {
            var documentType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.OwnerTypeDocument", []);
            documentType = documentType.filter(function (document) {
              return action.value === document.ownerTypeCode;
            });
            if (documentType.length == 1) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", specialCategoryDocumentTypeJsonPath, "props.value", documentType[0].code));
            }
            showComponent(dispatch, categoryDocumentJsonPath, true);
            showDocumentType(dispatch, specialCategoryDocumentTypeJsonPath, true);

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", specialCategoryDocumentTypeJsonPath, "props.disabled", true));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", categoryDocumentTypeThirdStepJsonPath, "display", "block"));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", categoryDocumentTypeThirdStepJsonPath, "display", "block"));
          }
        }
      },

      applicantAddress: (0, _utils.getTextField)({
        label: {
          labelName: "Correspondence Address",
          labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "PT_MUTATION_TRANSFEREE_APPLICANT_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Address"),
        required: true,
        errorMessage: "Invalid Address",
        jsonPath: "Property.ownersTemp[0].permanentAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      specialCategoryDocumentType: (0, _utils.getSelectField)({
        label: {
          labelName: "Document Type",
          labelKey: "PT_MUTATION_TRANSFEREE_SPECIAL_CATEGORY_DOCUMENT_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Enter Document Type.",
          labelKey: "PT_MUTATION_TRANSFEREE_SPECIAL_CATEGORY_DOCUMENT_TYPE_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "PropertyTax",
          masterName: "ReasonForTransfer"
        },
        jsonPath: "Property.ownersTemp[0].documentType",
        sourceJsonPath: "applyScreenMdmsData.OwnerTypeDocument",
        required: true,
        visible: false,
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      specialCategoryDocument: (0, _utils.getTextField)({
        label: {
          labelName: "Document Id No.",
          labelKey: "PT_MUTATION_TRANSFEREE_SPECIAL_CATEGORY_DOCUMENT_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Document Id No.",
          labelKey: "PT_MUTATION_TRANSFEREE_SPECIAL_CATEGORY_DOCUMENT_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Address"),
        required: true,
        // errorMessage: "Invalid Address",
        jsonPath: "Property.ownersTemp[0].documentUid",
        // gridDefination: {
        //   xs: 12,
        //   sm: 12,
        //   md: 6
        // },
        props: {
          className: "applicant-details-error",
          style: {
            display: "none"
          }

        }
      })

    })
  });
};

var institutionTypeInformation = function institutionTypeInformation() {
  return (0, _utils.getCommonGrayCard)({
    institutionTypeDetailsContainer: (0, _utils.getCommonContainer)({

      privateInstitutionNameDetails: (0, _utils.getTextField)({
        label: {
          labelName: "Institution Name",
          labelKey: "PT_MUTATION_INSTITUTION_NAME"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Institution Name",
          labelKey: "PT_MUTATION_INSTITUTION_NAME_PLACEHOLDER"
        },
        required: true,
        // pattern: getPattern("Name"),
        jsonPath: "Property.institutionTemp.institutionName"
      }),

      privateInstitutionTypeDetails: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "Institution Type",
            labelKey: "PT_MUTATION_INSTITUTION_TYPE"
          },
          placeholder: {
            labelName: "Enter Institution Type",
            labelKey: "PT_MUTATION_INSTITUTION_TYPE_PLACEHOLDER"
          },
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerShipCategory"
          },
          required: true,
          isClearable: true,
          labelsFromLocalisation: true,
          className: "autocomplete-dropdown",
          jsonPath: "Property.institutionTemp.institutionType",
          sourceJsonPath: "applyScreenMdmsData.common-masters.Institutions"
        },
        required: true,
        jsonPath: "Property.institutionTemp.institutionType",
        sourceJsonPath: "applyScreenMdmsData.common-masters.Institutions",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }

    })
  });
};
var institutionInformation = function institutionInformation() {
  return (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonTitle)({
      labelName: "Details of Authorised Person",
      labelKey: "PT_MUTATION_AUTHORISED_PERSON_DETAILS"
    }, {
      style: {
        marginBottom: 18
      }
    }),

    institutionDetailsContainer: (0, _utils.getCommonContainer)({

      authorisedPersonName: (0, _utils.getTextField)({
        label: {
          labelName: "Name",
          labelKey: "PT_MUTATION_AUTHORISED_PERSON_NAME"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "PT_MUTATION_AUTHORISED_PERSON_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Property.institutionTemp.name"
      }),

      authorisedDesignationValue: (0, _utils.getTextField)({
        label: {
          labelName: "Designation",
          labelKey: "PT_MUTATION_AUTHORISED_PERSON_DESIGNATION"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Designation",
          labelKey: "PT_MUTATION_AUTHORISED_PERSON_DESIGNATION_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Property.institutionTemp.designation"
      }),
      authorisedMobile: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile",
          labelKey: "PT_MUTATION_AUTHORISED_MOBILE"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Mobile",
          labelKey: "PT_MUTATION_AUTHORISED_MOBILE_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("MobileNo"),
        jsonPath: "Property.institutionTemp.mobileNumber"
      }), alterMobileNo: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No.",
          labelKey: "PT_FORM3_ALT_MOBILE_NO"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "PT_FORM3_ALT_MOBILE_NO_PLACEHOLDER"
        },
        required: false,
        props: {
          className: "applicant-details-error"
        },
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "Property.ownersTemp[0].alternatemobilenumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorisedLandline: (0, _utils.getTextField)({
        label: {
          labelName: "Landline",
          labelKey: "PT_MUTATION_AUTHORISED_LANDLINE"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Landline",
          labelKey: "PT_MUTATION_AUTHORISED_LANDLINE_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Landline"),
        jsonPath: "Property.institutionTemp.landlineNumber"
      }),
      authorisedEmail: (0, _utils.getTextField)({
        label: {
          labelName: "Email",
          labelKey: "PT_MUTATION_AUTHORISED_EMAIL"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Email",
          labelKey: "PT_MUTATION_AUTHORISED_EMAIL_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Email"),
        jsonPath: "Property.institutionTemp.email"
      }),
      authorisedAddress: (0, _utils.getTextField)({
        label: {
          labelName: "Correspondence Address",
          labelKey: "PT_MUTATION_AUTHORISED_CORRESPONDENCE_ADDRESS"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "PT_MUTATION_AUTHORISED_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Address"),
        jsonPath: "Property.institutionTemp.correspondenceAddress"
      })
    })
  });
};

var onChangeTypeOfOwnership = exports.onChangeTypeOfOwnership = function onChangeTypeOfOwnership(action, state, dispatch) {
  var addItemMultiOwner = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var path = "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children.privateInstitutionTypeDetails";

  var applicantType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.Institutions", []);
  var applicantSubType = applicantType.filter(function (item) {
    return item.active && item.parent.startsWith(action.value);
  });
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path, "props.data", applicantSubType));

  // let applicantType = get(
  //   state,
  //   "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
  //   []
  // );

  var singleApplicantContainerJsonPath = "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer";
  var multipleApplicantContainerJsonPath = "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer";
  var institutionContainerJsonPath = "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";
  var institutionTypeContainerJsonPath = "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";
  var singleMultipleOwnerPath = "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transfereeSummary";
  var institutionPath = "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transfereeInstitutionSummary";

  if (action.value.includes("SINGLEOWNER")) {
    showComponent(dispatch, singleApplicantContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + singleApplicantContainerJsonPath + ".props.style"));
    showComponent(dispatch, multipleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + multipleApplicantContainerJsonPath + ".props.style"));
    showComponent(dispatch, institutionContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionContainerJsonPath + ".props.style"));
    showComponent(dispatch, institutionTypeContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionTypeContainerJsonPath + ".props.style"));
    showComponent(dispatch, singleMultipleOwnerPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + singleMultipleOwnerPath + ".props.style"));
    showComponent(dispatch, institutionPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionPath + ".props.style"));
  } else if (action.value.includes("INSTITUTIONAL")) {
    showComponent(dispatch, singleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + singleApplicantContainerJsonPath + ".props.style"));
    showComponent(dispatch, multipleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + multipleApplicantContainerJsonPath + ".props.style"));
    showComponent(dispatch, institutionContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionContainerJsonPath + ".props.style"));
    showComponent(dispatch, institutionTypeContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionTypeContainerJsonPath + ".props.style"));
    showComponent(dispatch, singleMultipleOwnerPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + singleMultipleOwnerPath + ".props.style"));
    showComponent(dispatch, institutionPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionPath + ".props.style"));
  } else if (action.value.includes("MULTIPLEOWNERS")) {
    showComponent(dispatch, singleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + singleApplicantContainerJsonPath + ".props.style"));
    showComponent(dispatch, multipleApplicantContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + multipleApplicantContainerJsonPath + ".props.style"));
    showComponent(dispatch, institutionContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionContainerJsonPath + ".props.style"));
    showComponent(dispatch, institutionTypeContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionTypeContainerJsonPath + ".props.style"));
    showComponent(dispatch, singleMultipleOwnerPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + singleMultipleOwnerPath + ".props.style"));
    showComponent(dispatch, institutionPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.apply." + institutionPath + ".props.style"));

    // let applicant = get(state, 'screenConfiguration.preparedFinalObject.Property.ownersTemp', []);
    // if (applicant && applicant.length == 0) {

    //   const owner1 = get(state, 'screenConfiguration.screenConfig.apply.components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[0]', { item0: {} });
    //   dispatch(handleField("apply", "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[1]", "item1", owner1.item0))

    // }
    if (addItemMultiOwner) {
      addItemInMultiselect(state, dispatch);
    }
  }
};

var transfereeDetails = exports.transfereeDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Transferee Details",
    labelKey: "PT_MUTATION_TRANSFEREE_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  break: (0, _utils.getBreak)(),
  applicantTypeContainer: (0, _utils.getCommonContainer)({
    applicantTypeSelection: (0, _utils.getCommonContainer)({
      applicantType: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "Ownership Type",
            labelKey: "PT_MUTATION_APPLICANT_TYPE_LABEL"
          },
          placeholder: {
            labelName: "Select Ownership Type",
            labelKey: "PT_MUTATION_APPLICANT_TYPE_LABEL_PLACEHOLDER"
          },
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerShipCategory"
          },
          required: true,
          isClearable: true,
          labelsFromLocalisation: true,
          className: "applicant-details-error autocomplete-dropdown",
          jsonPath: "Property.ownershipCategoryTemp",
          sourceJsonPath: "applyScreenMdmsData.DropdownsData.OwnershipCategory"
        },
        required: true,
        jsonPath: "Property.ownershipCategoryTemp",
        sourceJsonPath: "applyScreenMdmsData.DropdownsData.OwnershipCategory",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
          onChangeTypeOfOwnership(action, state, dispatch);
        }
      }
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
              labelName: "Add Applicant",
              labelKey: "PT_MUTATION_ADD_APPLICANT_LABEL"
            },
            sourceJsonPath: "Property.ownersTemp",
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
        institutionType: institutionTypeInformation(),
        institutionInfo: institutionInformation()
      }
    }
  })
});

var addItemInMultiselect = exports.addItemInMultiselect = function addItemInMultiselect(state, dispatch) {
  var dynamicInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _dynamicInput$screenK = dynamicInput.screenKey,
      screenKey = _dynamicInput$screenK === undefined ? "apply" : _dynamicInput$screenK,
      _dynamicInput$sourceJ = dynamicInput.sourceJsonPath,
      sourceJsonPath = _dynamicInput$sourceJ === undefined ? "Property.ownersTemp" : _dynamicInput$sourceJ,
      _dynamicInput$prefixS = dynamicInput.prefixSourceJsonPath,
      prefixSourceJsonPath = _dynamicInput$prefixS === undefined ? "children.cardContent.children.applicantCard.children" : _dynamicInput$prefixS,
      _dynamicInput$compone = dynamicInput.componentJsonpath,
      componentJsonpath = _dynamicInput$compone === undefined ? "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo" : _dynamicInput$compone;

  var screenConfig = (0, _get2.default)(state, "screenConfiguration.screenConfig", {});
  var scheama = (0, _get2.default)(screenConfig, screenKey + "." + componentJsonpath + ".props.scheama", {});
  var items = (0, _get2.default)(screenConfig, screenKey + "." + componentJsonpath + ".props.items", []);
  var itemsLength = items.length;

  if (sourceJsonPath) {
    var multiItemContent = (0, _get2.default)(scheama, prefixSourceJsonPath, {});
    for (var variable in multiItemContent) {
      if (multiItemContent.hasOwnProperty(variable) && multiItemContent[variable].props && multiItemContent[variable].props.jsonPath) {
        var prefixJP = multiItemContent[variable].props.jsonPathUpdatePrefix ? multiItemContent[variable].props.jsonPathUpdatePrefix : sourceJsonPath;
        var splitedJsonPath = multiItemContent[variable].props.jsonPath.split(prefixJP);
        if (splitedJsonPath.length > 1) {
          var propertyName = splitedJsonPath[1].split("]");
          if (propertyName.length > 1) {
            multiItemContent[variable].jsonPath = prefixJP + "[" + itemsLength + "]" + propertyName[1];
            multiItemContent[variable].props.jsonPath = prefixJP + "[" + itemsLength + "]" + propertyName[1];
            multiItemContent[variable].index = itemsLength;
          }
        }
      }
    }

    (0, _set2.default)(scheama, prefixSourceJsonPath, multiItemContent);
  }
  items[itemsLength] = (0, _cloneDeep2.default)((0, _commons.addComponentJsonpath)((0, _defineProperty3.default)({}, "item" + itemsLength, scheama), componentJsonpath + ".props.items[" + itemsLength + "]"));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentJsonpath, "props.items", items));
};