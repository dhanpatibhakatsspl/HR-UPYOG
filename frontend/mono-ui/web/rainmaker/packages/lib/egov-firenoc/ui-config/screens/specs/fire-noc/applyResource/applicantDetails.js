"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicantDetails = exports.updateUsageType = exports.triggerUpdateByKey = exports.updateOwnerShipEdit = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../../utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateOwnerShipEdit = exports.updateOwnerShipEdit = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tradeSubOwnershipCat, tradeOwnershipCat, ownerInfoCards, singleCard;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tradeSubOwnershipCat = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", '');
            tradeOwnershipCat = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType", tradeSubOwnershipCat.split('.')[0]);

            if (tradeSubOwnershipCat) {
              tradeOwnershipCat = tradeSubOwnershipCat.split(".")[0];
            } else {
              tradeOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.tradeOwner.ownershipTransformed[0].code", "");
              tradeSubOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.tradeOwner.ownershipTransformed." + tradeOwnershipCat + "[0].code", "");
              (0, _set2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat);

              dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat));
            }

            (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", tradeOwnershipCat);
            (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.common-masters.tradeOwner.selectedValues[0].ownership", tradeOwnershipCat);
            try {

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.tradeOwner.selectedValues[0].ownership", tradeOwnershipCat));

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.tradeOwner.subOwnershipTransformed.allDropdown[0]", (0, _commons.getObjectValues)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.tradeOwner.tradeOwnerTransformed." + tradeOwnershipCat, []))));

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.tradeOwner.selectedValues[0].subOwnership", tradeSubOwnershipCat));
              //handlefield for Type of OwnerShip while setting drop down values as beforeFieldChange won't be callled
              if (tradeOwnershipCat === "INDIVIDUAL") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", false));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", true));
              }

              //handlefield for type of sub ownership while setting drop down values as beforeFieldChange won't be callled

              if (tradeSubOwnershipCat === "INDIVIDUAL.SINGLEOWNER") {
                ownerInfoCards = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, //hardcoded to apply screen
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items");

                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", false));
                if (ownerInfoCards && ownerInfoCards.length > 1) {
                  singleCard = ownerInfoCards.slice(0, 1); //get the first element if multiple cards present

                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.items", singleCard));
                  dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners").slice(0, 1)));
                }
              }

              if (tradeSubOwnershipCat === "INDIVIDUAL.MULTIPLEOWNERS") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", true));
              }
            } catch (e) {
              console.log(e);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateOwnerShipEdit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var triggerUpdateByKey = exports.triggerUpdateByKey = function triggerUpdateByKey(state, keyIndex, value, dispatch) {
  if (dispatch == "set") {
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.common-masters.applicantDetails.selectedValues[" + keyIndex + "]", value);
  } else {
    dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.applicantDetails." + keyIndex, value));
  }
};
var updateUsageType = exports.updateUsageType = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var subUsageType, usageType, i, formObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            subUsageType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", '') || '';
            usageType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType", subUsageType.split('.')[0]);
            i = 0;
            formObj = {
              applicantType: usageType, applicantSubType: subUsageType
            };

            triggerUpdateByKey(state, i, formObj, 'set');

            triggerUpdateByKey(state, "applicantSubTypeTransformed.allDropdown[" + i + "]", (0, _commons.getObjectValues)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.common-masters.applicantDetails.applicantDetailsTransformed." + usageType, [])), dispatch);

            triggerUpdateByKey(state, "selectedValues[" + i + "]", formObj, dispatch);

            if (subUsageType) {
              beforeFieldChangeApplicantSubType({ dispatch: dispatch, state: state, value: subUsageType });
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateUsageType(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var showComponent = function showComponent(dispatch, componentJsonPath, display) {
  var displayProps = display ? {} : { display: "none" };
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonPath, "props.style", displayProps));
};

var commonApplicantInformation = function commonApplicantInformation() {
  return (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "Applicant Information",
      labelKey: "NOC_APPLICANT_INFORMATION_SUBHEADER"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    applicantCard: (0, _utils.getCommonContainer)({
      mobileNumber: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No.",
          labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "NOC_ENTER_APPLICANT_MOBILE_NO_PLACEHOLDER"
        },
        required: true,
        props: {
          className: "applicant-details-error"
        },
        title: {
          value: "Please search profile linked to the mobile no.",
          key: "NOC_APPLICANT_MOBILE_NO_TOOLTIP_MESSAGE"
        },
        // infoIcon: "info_circle",
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber",
        // iconObj: {
        //   iconName: "search",
        //   position: "end",
        //   color: "#FE7A51",
        //   onClickDefination: {
        //     action: "condition",
        //     callBack: (state, dispatch, fieldInfo) => {
        //       getDetailsForOwner(state, dispatch, fieldInfo);
        //     }
        //   }
        // },
        // props: {
        //   style: {
        //     maxWidth: "450px"
        //   }
        // },
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
          labelKey: "NOC_APPLICANT_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "NOC_ENTER_APPLICANT_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender",
        props: {
          label: { name: "Gender", key: "NOC_GENDER_LABEL" },
          className: "applicant-details-error",
          buttons: [{
            labelName: "Male",
            labelKey: "NOC_GENDER_MALE_RADIOBUTTON",
            value: "MALE"
          }, {
            labelName: "FEMALE",
            labelKey: "NOC_GENDER_FEMALE_RADIOBUTTON",
            value: "FEMALE"
          }, {
            labelName: "Transgender",
            labelKey: "NOC_GENDER_TRANSGENDER_RADIOBUTTON",
            value: "TRANSGENDER"
          }],
          jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender"
          // required: true
        },
        type: "array"
      },
      applicantDob: (0, _utils.getDateField)({
        label: {
          labelName: "Date Of Birth",
          labelKey: "NOC_APPLICANT_DOB_LABEL"
        },
        placeholder: {
          labelName: "DD/MM/YYYY",
          labelKey: "NOC_ENTER_APPLICANT_DOB_PLACEHOLDER"
        },
        required: true,
        isDOB: true,
        pattern: (0, _utils.getPattern)("Date"),
        errorMessage: "Invalid Date",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].dob",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error",
          inputProps: {
            max: (0, _commons.getTodaysDateInYMD)()
          }
        }
      }),
      applicantEmail: (0, _utils.getTextField)({
        label: {
          labelName: "Email",
          labelKey: "NOC_APPLICANT_EMAIL_LABEL"
        },
        placeholder: {
          labelName: "Enter Email",
          labelKey: "NOC_ENTER_APPLICANT_EMAIL_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Email"),
        errorMessage: "Invalid Email",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId",
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
          labelName: "Father/Husband's Name",
          labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Father/Husband's Name",
          labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].fatherOrHusbandName",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].relationship",
        props: {
          label: {
            name: "Relationship",
            key: "NOC_APPLICANT_RELATIONSHIP_LABEL",
            className: "applicant-details-error"
          },
          buttons: [{
            labelName: "Father",
            labelKey: "NOC_APPLICANT_RELATIONSHIP_FATHER_RADIOBUTTON",
            value: "FATHER"
          }, {
            label: "Husband",
            labelKey: "NOC_APPLICANT_RELATIONSHIP_HUSBAND_RADIOBUTTON",
            value: "HUSBAND"
          }],
          jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].relationship",
          required: true
        },
        required: true,
        type: "array"
      },
      applicantPan: (0, _utils.getTextField)({
        label: {
          labelName: "PAN No.",
          labelKey: "NOC_APPLICANT_PAN_LABEL"
        },
        placeholder: {
          labelName: "Enter Applicant's PAN No.",
          labelKey: "NOC_ENTER_APPLICANT_PAN_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("PAN"),
        errorMessage: "Invalid PAN",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].pan",
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
          labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "NOC_ENTER_APPLICANT_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Address"),
        errorMessage: "Invalid Address",
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress",
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
        moduleName: "egov-firenoc",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "Special Applicant Category",
            labelKey: "NOC_SPECIAL_APPLICANT_CATEGORY_LABEL"
          },
          placeholder: {
            labelName: "Select Special Applicant Category",
            labelKey: "NOC_SPECIAL_APPLICANT_CATEGORY_PLACEHOLDER"
          },
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
          jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].ownerType",
          required: true,
          isClearable: true,
          labelsFromLocalisation: true,
          className: "autocomplete-dropdown",
          defaultSort: false
        },
        required: true,
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].ownerType",
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
    header: (0, _utils.getCommonSubHeader)({
      labelName: "Applicant Information",
      labelKey: "NOC_APPLICANT_INFORMATION_SUBHEADER"
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionName",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.telephoneNumber",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionDesignation",
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

        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId",
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    })
  });
};

var beforeFieldChangeApplicantType = function beforeFieldChangeApplicantType(reqObj) {
  var dispatch = reqObj.dispatch,
      state = reqObj.state,
      value = reqObj.value;

  dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType", value));
};

var beforeFieldChangeApplicantSubType = function beforeFieldChangeApplicantSubType(reqObj) {
  var dispatch = reqObj.dispatch,
      state = reqObj.state,
      value = reqObj.value;

  dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", value));
  var singleApplicantContainerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer";
  var multipleApplicantContainerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer";
  var institutionContainerJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";
  if (value.includes("SINGLEOWNER")) {
    showComponent(dispatch, singleApplicantContainerJsonPath, true);
    showComponent(dispatch, multipleApplicantContainerJsonPath, false);
    showComponent(dispatch, institutionContainerJsonPath, false);
    // showComponent(dispatch, applicantSubtypeJsonPath, false);
  } else if (value.includes("MULTIPLEOWNERS")) {
    showComponent(dispatch, singleApplicantContainerJsonPath, false);
    showComponent(dispatch, multipleApplicantContainerJsonPath, true);
    showComponent(dispatch, institutionContainerJsonPath, false);
    // showComponent(dispatch, applicantSubtypeJsonPath, false);
  } else if (value.includes("INSTITUTIONAL")) {
    showComponent(dispatch, singleApplicantContainerJsonPath, false);
    showComponent(dispatch, multipleApplicantContainerJsonPath, false);
    showComponent(dispatch, institutionContainerJsonPath, true);
    // showComponent(dispatch, applicantSubtypeJsonPath, true);
  }
};

var applicantDetails = exports.applicantDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Applicant Details",
    labelKey: "NOC_APPLICANT_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  break: (0, _utils.getBreak)(),
  applicantTypeContainer: (0, _utils.getCommonContainer)({
    applicantTypeSelection: (0, _utils.getCommonContainer)({
      dynamicMdms: {
        uiFramework: "custom-containers",
        componentPath: "DynamicMdmsContainer",
        props: {
          dropdownFields: [{
            key: 'applicantType',
            isRequired: false,
            requiredValue: true,
            fieldType: "autosuggest",
            className: "applicant-details-error autocomplete-dropdown",
            callBack: beforeFieldChangeApplicantType
          }, {
            key: 'applicantSubType',
            isRequired: false,
            requiredValue: true,
            fieldType: "autosuggest",
            className: "applicant-details-error autocomplete-dropdown",
            callBack: beforeFieldChangeApplicantSubType
          }],
          required: true,
          callBackEdit: updateUsageType,
          moduleName: "common-masters",
          masterName: "OwnerShipCategory",
          rootBlockSub: 'applicantDetails'
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
              labelKey: "NOC_ADD_APPLICANT_LABEL"
            },
            sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
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