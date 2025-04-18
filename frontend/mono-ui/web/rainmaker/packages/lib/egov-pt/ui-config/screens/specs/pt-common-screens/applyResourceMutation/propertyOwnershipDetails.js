"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItemInMultiselect = exports.propertyOwnershipDetails = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _props;

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

  var displayProps = display ? (0, _extends3.default)({}, oldStyle, {
    display: 'block'
  }) : (0, _extends3.default)({}, oldStyle, {
    display: "none"
  });
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", componentJsonPath, "props.style", displayProps));
};
var institutionTypeInformation = function institutionTypeInformation() {
  return (0, _utils.getCommonGrayCard)({
    institutionTypeDetailsContainer: (0, _utils.getCommonContainer)({

      privateInstitutionNameDetails: (0, _utils.getTextField)({
        label: {
          labelName: "Institution Name",
          labelKey: "PT_COMMON_INSTITUTION_NAME"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Institution Name",
          labelKey: "PT_COMMON_INSTITUTION_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Property.institution.name"
      }),
      privateInstitutionTypeDetails: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        jsonPath: "Property.institution.type", //db sake
        required: true,
        props: {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: {
            labelName: "Institution Type",
            labelKey: "PT_COMMON_INSTITUTION_TYPE"
          },
          placeholder: {
            labelName: "Enter Institution Type",
            labelKey: "PT_COMMON_INSTITUTION_TYPE_PLACEHOLDER"
          },
          jsonPath: "Property.institution.type",
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerShipCategory"
          },
          required: true,
          sourceJsonPath: "applyScreenMdmsData.common-masters.Institutions",
          labelsFromLocalisation: true,
          suggestions: [],
          fullwidth: true,
          isClearable: true,
          inputLabelProps: {
            shrink: true
          }

        },
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }
    })
  });
};
var institutionInformation = function institutionInformation() {
  return (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonTitle)({
      labelName: "Details of Authorised Person",
      labelKey: "PT_COMMON_AUTHORISED_PERSON_DETAILS"
    }, {
      style: {
        marginBottom: 18
      }
    }),

    institutionDetailsContainer: (0, _utils.getCommonContainer)({
      authorisedPersonName: (0, _utils.getTextField)({
        label: {
          labelName: "Name",
          labelKey: "PT_COMMON_AUTHORISED_PERSON_NAME"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "PT_COMMON_AUTHORISED_PERSON_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Property.owners[0].name"
      }),

      authorisedDesignationValue: (0, _utils.getTextField)({
        label: {
          labelName: "Designation",
          labelKey: "PT_COMMON_AUTHORISED_PERSON_DESIGNATION"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Designation",
          labelKey: "PT_COMMON_AUTHORISED_PERSON_DESIGNATION_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Property.institution.designation"
      }),
      authorisedMobile: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile",
          labelKey: "PT_COMMON_AUTHORISED_MOBILE"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Mobile",
          labelKey: "PT_COMMON_AUTHORISED_MOBILE_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("MobileNo"),
        jsonPath: "Property.owners[0].mobileNumber"
      }),
      authorisedLandline: (0, _utils.getTextField)({
        label: {
          labelName: "Landline",
          labelKey: "PT_COMMON_AUTHORISED_LANDLINE"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Landline",
          labelKey: "PT_COMMON_AUTHORISED_LANDLINE_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Landline"),
        jsonPath: "Property.institution.landlineNumber"
      }),
      authorisedAddress: (0, _utils.getTextField)({
        label: {
          labelName: "Correspondence Address",
          labelKey: "PT_COMMON_AUTHORISED_CORRESPONDENCE_ADDRESS"
        },
        props: {
          className: "applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "PT_COMMON_AUTHORISED_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Address"),
        jsonPath: "Property.owners[0].correspondenceAddress"
      }),
      sameAsPropertyAddress: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "CheckboxContainerPTCommon",
        gridDefination: { xs: 12, sm: 12, md: 12 },
        props: {
          labelKey: "PT_COMMON_SAME_AS_PROPERTY_ADDRESS",
          jsonPath: "Property.owners[0].sameAsPropertyAddress",
          required: false,
          destinationJsonPath: "correspondenceAddress"
        },
        required: false,
        type: "array",
        jsonPath: "Property.owners[0].sameAsPropertyAddress"
      }
    })
  });
};
var commonApplicantInformation = function commonApplicantInformation() {
  return (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonTitle)({
      labelName: "Details of Authorised Person",
      labelKey: "PT_COMMON_OWNER_INFORMATION"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    applicantCard: (0, _utils.getCommonContainer)({
      mobileNumber: (0, _utils.getTextField)({
        label: {
          labelName: "Mobile No.",
          labelKey: "PT_COMMON_APPLICANT_MOBILE_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "PT_COMMON_APPLICANT_MOBILE_NO_PLACEHOLDER"
        },
        required: true,
        props: {
          className: "applicant-details-error"
        },
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "Property.owners[0].mobileNumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      applicantName: (0, _utils.getTextField)({
        label: {
          labelName: "Name",
          labelKey: "PT_COMMON_APPLICANT_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "PT_COMMON_APPLICANT_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "Property.owners[0].name",
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
        jsonPath: "Property.owners[0].gender",
        props: {
          label: { name: "Gender", key: "PT_COMMON_GENDER_LABEL" },
          className: "applicant-details-error",
          buttons: [{
            labelName: "Male",
            labelKey: "PT_COMMON_GENDER_MALE",
            value: "MALE"
          }, {
            labelName: "FEMALE",
            labelKey: "PT_COMMON_GENDER_FEMALE",
            value: "FEMALE"
          }, {
            labelName: "Transgender",
            labelKey: "PT_COMMON_GENDER_TRANSGENDER",
            value: "TRANSGENDER"
          }],
          jsonPath: "Property.owners[0].gender",
          required: true,
          errorMessage: "Required"
        },
        required: true,
        type: "array"
      },
      guardianName: (0, _utils.getTextField)({
        label: {
          labelName: "Father/Husband's Name",
          labelKey: "PT_COMMON_FATHER_OR_HUSBAND_NAME"
        },
        placeholder: {
          labelName: "Enter Father/Husband's Name",
          labelKey: "PT_COMMON_ENTER_FATHER_OR_HUSBAND_NAME"
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "Property.owners[0].fatherOrHusbandName",
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
        jsonPath: "Property.owners[0].relationship", //db sake
        required: true,
        props: {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: {
            labelName: "Relationship with Guardian",
            labelKey: "PT_COMMON_APPLICANT_RELATIONSHIP_LABEL"
          },
          placeholder: {
            labelName: "Select Relationship with Guardian",
            labelKey: "PT_COMMON_APPLICANT_RELATIONSHIP_PLACEHOLDER"
          },
          required: true,
          jsonPath: "Property.owners[0].relationship",
          data: [{ code: "FATHER" }, { code: "HUSBAND" }],
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          labelsFromLocalisation: true,
          suggestions: [],
          fullwidth: true,
          isClearable: true,
          inputLabelProps: {
            shrink: true
          }
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      },
      specialApplicantCategory: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        jsonPath: "Property.owners[0].ownerType",
        required: true,
        props: {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          className: "hr-generic-selectfield autocomplete-dropdown",
          label: {
            labelName: "Special Applicant Category",
            labelKey: "PT_COMMON_SPECIAL_APPLICANT_CATEGORY_LABEL"
          },
          placeholder: {
            labelName: "Select Special Applicant Category",
            labelKey: "PT_COMMON_SPECIAL_APPLICANT_CATEGORY_PLACEHOLDER"
          },
          jsonPath: "Property.owners[0].ownerType",
          required: true,
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
          labelsFromLocalisation: true,
          suggestions: [],
          fullwidth: true,
          isClearable: true,
          inputLabelProps: {
            shrink: true
          }
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      },
      applicantAddress: (0, _utils.getTextField)({
        label: {
          labelName: "Correspondence Address",
          labelKey: "PT_COMMON_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "PT_COMMON_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        pattern: (0, _utils.getPattern)("Address"),
        required: true,
        errorMessage: "Invalid Address",
        jsonPath: "Property.owners[0].permanentAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          className: "applicant-details-error"
        }
      }),
      sameAsPropertyAddress: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "CheckboxContainerPTCommon",
        gridDefination: { xs: 12, sm: 12, md: 12 },
        props: {
          labelKey: "PT_COMMON_SAME_AS_PROPERTY_ADDRESS",
          jsonPath: "Property.owners[0].sameAsPropertyAddress",
          required: false,
          destinationJsonPath: "permanentAddress"
        },
        type: "array",
        jsonPath: "Property.owners[0].sameAsPropertyAddress"
      }
    })
  });
};

var propertyOwnershipDetails = exports.propertyOwnershipDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Transferee Details",
    labelKey: "PT_COMMON_PROPERTY_OWNERSHIP_DETAILS_HEADER"
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
        jsonPath: "Property.ownershipCategory",
        props: (_props = {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          className: "hr-generic-selectfield autocomplete-dropdown",
          label: {
            labelName: "Ownership Type",
            labelKey: "PT_COMMON_OWNERSHIP_TYPE"
          },
          placeholder: {
            labelName: "Select Ownership Type",
            labelKey: "PT_COMMON_SELECT_OWNERSHIP_TYPE"
          },
          jsonPath: "Property.ownershipCategory",
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerShipCategory"
          },
          required: true,
          sourceJsonPath: "OwnershipCategory"
        }, (0, _defineProperty3.default)(_props, "required", true), (0, _defineProperty3.default)(_props, "isClearable", true), (0, _defineProperty3.default)(_props, "labelsFromLocalisation", true), (0, _defineProperty3.default)(_props, "inputLabelProps", {
          shrink: true
        }), _props),
        required: true,
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {

          var path = "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children.privateInstitutionTypeDetails";

          var applicantType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.Institutions", []);
          var applicantSubType = applicantType.filter(function (item) {
            return item.active && item.parent.startsWith(action.value);
          });
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", path, "props.data", applicantSubType));

          var singleApplicantContainerJsonPath = "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer";
          var multipleApplicantContainerJsonPath = "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer";
          var institutionContainerJsonPath = "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";
          var institutionTypeContainerJsonPath = "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";

          if (action.value.includes("SINGLEOWNER")) {
            showComponent(dispatch, singleApplicantContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + singleApplicantContainerJsonPath + ".props.style"));
            showComponent(dispatch, multipleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + multipleApplicantContainerJsonPath + ".props.style"));
            showComponent(dispatch, institutionContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + institutionContainerJsonPath + ".props.style"));
            showComponent(dispatch, institutionTypeContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + institutionTypeContainerJsonPath + ".props.style"));
          } else if (action.value.includes("INSTITUTIONAL")) {
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", path, "required", false));

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", path, "props.value", ''));
            (0, _set2.default)(state.screenConfiguration.preparedFinalObject, "Property.institution.type", "");
            dispatch((0, _actions.prepareFinalObject)("Property.institution.type", ""));
            showComponent(dispatch, singleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + singleApplicantContainerJsonPath + ".props.style"));
            showComponent(dispatch, multipleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + multipleApplicantContainerJsonPath + ".props.style"));
            showComponent(dispatch, institutionContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + institutionContainerJsonPath + ".props.style"));
            showComponent(dispatch, institutionTypeContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + institutionTypeContainerJsonPath + ".props.style"));
          } else if (action.value.includes("MULTIPLEOWNERS")) {
            showComponent(dispatch, singleApplicantContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + singleApplicantContainerJsonPath + ".props.style"));
            showComponent(dispatch, multipleApplicantContainerJsonPath, true, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + multipleApplicantContainerJsonPath + ".props.style"));
            showComponent(dispatch, institutionContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + institutionContainerJsonPath + ".props.style"));
            showComponent(dispatch, institutionTypeContainerJsonPath, false, (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property." + institutionTypeContainerJsonPath + ".props.style"));

            addItemInMultiselect(state, dispatch);
          }
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
              labelKey: "PT_COMMON_ADD_APPLICANT_LABEL"
            },
            sourceJsonPath: "Property.owners",
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
          display: "none",
          width: "100%"
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
      screenKey = _dynamicInput$screenK === undefined ? "register-property" : _dynamicInput$screenK,
      _dynamicInput$sourceJ = dynamicInput.sourceJsonPath,
      sourceJsonPath = _dynamicInput$sourceJ === undefined ? "Property.owners" : _dynamicInput$sourceJ,
      _dynamicInput$prefixS = dynamicInput.prefixSourceJsonPath,
      prefixSourceJsonPath = _dynamicInput$prefixS === undefined ? "children.cardContent.children.applicantCard.children" : _dynamicInput$prefixS,
      _dynamicInput$compone = dynamicInput.componentJsonpath,
      componentJsonpath = _dynamicInput$compone === undefined ? "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo" : _dynamicInput$compone;

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