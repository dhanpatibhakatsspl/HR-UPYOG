"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newRegistrationForm = exports.getcheckboxvalue = exports.getAddressForm = exports.getPersonDetailsForm = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPersonDetailsForm = exports.getPersonDetailsForm = function getPersonDetailsForm(type) {
  return (0, _utils.getCommonContainer)({
    firstName: (0, _utils.getTextField)({
      label: {
        labelName: "First Name",
        labelKey: "BND_FIRSTNAME_LABEL"
      },
      placeholder: {
        labelName: "First Name",
        labelKey: "BND_FIRSTNAME_LABEL"
      },
      required: true,
      visible: true,
      pattern: _constants.patterns["name"],
      jsonPath: "bnd.birth.newRegistration." + type + ".firstname",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    middlename: (0, _utils.getTextField)({
      label: {
        labelName: "Middle Name",
        labelKey: "BND_MIDDLENAME_LABEL"
      },
      placeholder: {
        labelName: "Middle Name",
        labelKey: "BND_MIDDLENAME_LABEL"
      },
      required: false,
      visible: true,
      pattern: _constants.patterns["name"],
      jsonPath: "bnd.birth.newRegistration." + type + ".middlename",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    lastname: (0, _utils.getTextField)({
      label: {
        labelName: "Last Name",
        labelKey: "BND_LASTNAME_LABEL"
      },
      placeholder: {
        labelName: "Last Name",
        labelKey: "BND_LASTNAME_LABEL"
      },
      required: true,
      visible: true,
      pattern: _constants.patterns["name"],
      jsonPath: "bnd.birth.newRegistration." + type + ".lastname",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    aadharNo: (0, _utils.getTextField)({
      label: {
        labelName: "Aadhar No",
        labelKey: "BND_AADHAR_NO"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Aadhar No",
        labelKey: "BND_AADHAR_NO"
      },
      required: false,
      pattern: (0, _utils.getPattern)("AadharNo"),
      jsonPath: "bnd.birth.newRegistration." + type + ".aadharno",
      // iconObj: {
      //   iconName: "search",
      //   position: "end",
      //   color: "#FE7A51",
      //   onClickDefination: {
      //     action: "condition",
      //     callBack: (state, dispatch, fieldInfo) => {
      //       alert("hey")
      //       //getDetailsForOwner(state, dispatch, fieldInfo); //useme
      //     }
      //   }
      // },
      title: {
        value: "Please search owner profile linked to the mobile no.",
        key: "BND_AADHAR_NO"
      },
      //infoIcon: "info_circle",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    emailId: (0, _utils.getTextField)({
      label: {
        labelName: "emailId",
        labelKey: "BND_EMAIL_ID"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "emailId",
        labelKey: "BND_EMAIL_ID"
      },
      required: false,
      pattern: (0, _utils.getPattern)("Email"),
      jsonPath: "bnd.birth.newRegistration." + type + ".emailid",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    mobNo: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No.",
        labelKey: "CORE_COMMON_MOBILE_NUMBER"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Mobile No.",
        labelKey: "CORE_COMMON_MOBILE_NUMBER"
      },
      required: false,
      pattern: (0, _utils.getPattern)("MobileNo"),
      jsonPath: "bnd.birth.newRegistration." + type + ".mobileno",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    education: (0, _utils.getTextField)({
      label: {
        labelName: "Education",
        labelKey: "BND_EDUCATION"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Education",
        labelKey: "BND_EDUCATION"
      },
      required: false,
      pattern: _constants.patterns["commonPattern"],
      jsonPath: "bnd.birth.newRegistration." + type + ".education",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    profession: (0, _utils.getTextField)({
      label: {
        labelName: "Profession",
        labelKey: "BND_PROFESSION"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Profession",
        labelKey: "BND_PROFESSION"
      },
      required: false,
      pattern: _constants.patterns["commonPattern"],
      jsonPath: "bnd.birth.newRegistration." + type + ".proffession",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    nationality: (0, _utils.getTextField)({
      label: {
        labelName: "nationality",
        labelKey: "BND_NATIONALITY"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "nationality",
        labelKey: "BND_NATIONALITY"
      },
      required: true,
      pattern: _constants.patterns["commonPattern"],
      jsonPath: "bnd.birth.newRegistration." + type + ".nationality",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    religion: (0, _utils.getTextField)({
      label: {
        labelName: "religion",
        labelKey: "BND_RELIGION"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "religion",
        labelKey: "BND_RELIGION"
      },
      required: false,
      pattern: _constants.patterns["commonPattern"],
      jsonPath: "bnd.birth.newRegistration." + type + ".religion",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  });
};

var getAddressForm = exports.getAddressForm = function getAddressForm(type) {
  var mandatory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return (0, _utils.getCommonContainer)({
    buildingNo: (0, _utils.getTextField)({
      label: {
        labelName: "buildingno",
        labelKey: "BND_BUILDINGNO_LABEL"
      },
      placeholder: {
        labelName: "buildingno",
        labelKey: "BND_BUILDINGNO_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressBig"],
      jsonPath: "bnd.birth.newRegistration." + type + ".buildingno",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    houseNo: (0, _utils.getTextField)({
      label: {
        labelName: "houseno",
        labelKey: "BND_HOUSENO_LABEL"
      },
      placeholder: {
        labelName: "houseno",
        labelKey: "BND_HOUSENO_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressBig"],
      jsonPath: "bnd.birth.newRegistration." + type + ".houseno",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    streetname: (0, _utils.getTextField)({
      label: {
        labelName: "streetname",
        labelKey: "BND_STREETNAME_LABEL"
      },
      placeholder: {
        labelName: "streetname",
        labelKey: "BND_STREETNAME_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressBig"],
      jsonPath: "bnd.birth.newRegistration." + type + ".streetname",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    locality: (0, _utils.getTextField)({
      label: {
        labelName: "locality",
        labelKey: "BND_LOCALITY_LABEL"
      },
      placeholder: {
        labelName: "locality",
        labelKey: "BND_LOCALITY_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressBig"],
      jsonPath: "bnd.birth.newRegistration." + type + ".locality",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    tehsil: (0, _utils.getTextField)({
      label: {
        labelName: "tehsil",
        labelKey: "BND_TEHSIL_LABEL"
      },
      placeholder: {
        labelName: "tehsil",
        labelKey: "BND_TEHSIL_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressTehsil"],
      jsonPath: "bnd.birth.newRegistration." + type + ".tehsil",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    district: (0, _utils.getTextField)({
      label: {
        labelName: "district",
        labelKey: "BND_DISTRICT_LABEL"
      },
      placeholder: {
        labelName: "district",
        labelKey: "BND_DISTRICT_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressSmall"],
      jsonPath: "bnd.birth.newRegistration." + type + ".district",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    city: (0, _utils.getTextField)({
      label: {
        labelName: "city",
        labelKey: "BND_CITY_LABEL"
      },
      placeholder: {
        labelName: "city",
        labelKey: "BND_CITY_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressSmall"],
      jsonPath: "bnd.birth.newRegistration." + type + ".city",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    state: (0, _utils.getTextField)({
      label: {
        labelName: "state",
        labelKey: "BND_STATE_LABEL"
      },
      placeholder: {
        labelName: "city",
        labelKey: "BND_STATE_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressSmall"],
      jsonPath: "bnd.birth.newRegistration." + type + ".state",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    pinno: (0, _utils.getTextField)({
      label: {
        labelName: "pinno",
        labelKey: "BND_PINNO_LABEL"
      },
      placeholder: {
        labelName: "pinno",
        labelKey: "BND_PINNO_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: (0, _utils.getPattern)("Pincode"),
      jsonPath: "bnd.birth.newRegistration." + type + ".pinno",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    country: (0, _utils.getTextField)({
      label: {
        labelName: "country",
        labelKey: "BND_COUNTRY_LABEL"
      },
      placeholder: {
        labelName: "country",
        labelKey: "BND_COUNTRY_LABEL"
      },
      required: mandatory,
      visible: true,
      pattern: _constants.patterns["addressSmall"],
      jsonPath: "bnd.birth.newRegistration." + type + ".country",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  });
};
var getcheckboxvalue = exports.getcheckboxvalue = function getcheckboxvalue(state, dispatch) {
  var checkBoxState = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.checkboxforaddress");
  if (checkBoxState) {
    var birthpresentmaddr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthPresentaddr");
    for (var key in birthpresentmaddr) {
      dispatch((0, _actions.prepareFinalObject)("bnd.birth.newRegistration.birthPermaddr." + key, (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthPresentaddr." + key)));
    }dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents", "visible", false));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.header", "visible", false));
    var presentAddrConfig = (0, _get2.default)(state.screenConfiguration.screenConfig.newRegistration, "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children");
    for (var key in presentAddrConfig) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children." + key, "required", false));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children." + key, "props.required", false));
    }
    var addrConfig = (0, _get2.default)(state.screenConfiguration.screenConfig.newRegistration, "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children");
    for (var key in addrConfig) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children." + key, "required", true));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children." + key, "props.required", true));
    }
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.header.children.key", "props.labelKey", "BND_BIRTH_ADDR_PERM"));
  } else {
    var birthpermaddr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthPermaddr");
    for (var key in birthpermaddr) {
      dispatch((0, _actions.prepareFinalObject)("bnd.birth.newRegistration.birthPermaddr." + key, ""));
    }var _presentAddrConfig = (0, _get2.default)(state.screenConfiguration.screenConfig.newRegistration, "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children");
    for (var key in _presentAddrConfig) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children." + key, "required", true));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children." + key, "props.required", true));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children." + key, "props.value", ""));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children." + key, "props.error", false));
    }
    var _addrConfig = (0, _get2.default)(state.screenConfiguration.screenConfig.newRegistration, "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children");
    for (var key in _addrConfig) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children." + key, "required", false));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children." + key, "props.required", false));
    }
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.header", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.header.children.key", "props.labelKey", "BND_PRESENT_ADDR_DURING_BIRTH"));
  }
};

var newRegistrationForm = exports.newRegistrationForm = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "New Registration",
    labelKey: (0, _commons.getQueryArg)(window.location.href, "action") === "EDIT" ? "BND_EDIT_REGISTRATION" : "BND_NEW_REGISTRATION"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  subText: (0, _utils.getCommonParagraph)({
    labelName: "(*) marked items are mandatory",
    labelKey: "BND_NEW_REGISTRATION_SUBTEXT"
  }),
  checkBox: {
    required: true,
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bnd",
    componentPath: "Checkbox",
    props: {
      label: {
        labelKey: "BND_IS_LEGACY_RECORD",
        labelName: "BND_IS_LEGACY_RECORD"
      },
      jsonPath: "bnd.birth.newRegistration.isLegacyRecord"
    }
  },
  registrationInfo: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_REGISTRATION"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    registrationInfoCont: (0, _utils.getCommonContainer)({
      registrationNo: (0, _utils.getTextField)({
        label: {
          labelName: "RegistrationNo",
          labelKey: "BND_REG_NO_LABEL"
        },
        placeholder: {
          labelName: "Registration No",
          labelKey: "BND_REG_NO_LABEL"
        },
        required: true,
        visible: true,
        pattern: _constants.patterns["registrationNo"],
        jsonPath: "bnd.birth.newRegistration.registrationno",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      hospitalName: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bnd",
        componentPath: "AutosuggestContainer",
        jsonPath: "bnd.birth.newRegistration.hospitalname",
        sourceJsonPath: "bnd.allHospitals",
        visible: true,
        autoSelect: true,
        props: {
          autoSelect: true,
          //isClearable:true,
          className: "autocomplete-dropdown",
          suggestions: [],
          disabled: false, //getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
          label: {
            labelName: "Select Hospital",
            labelKey: "BND_HOSPITALNAME_LABEL"
          },
          placeholder: {
            labelName: "Select Hospital",
            labelKey: "BND_HOSPITALNAME_LABEL_PLACEHOLDER"
          },
          localePrefix: {
            moduleName: "TENANT",
            masterName: "TENANTS"
          },
          labelsFromLocalisation: false,
          required: false,
          jsonPath: "bnd.birth.hosptialId",
          sourceJsonPath: "bnd.allHospitals",
          inputLabelProps: {
            shrink: true
          },
          onClickHandler: function onClickHandler(action, state, dispatch) {}
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {},
        afterFieldChange: function afterFieldChange(action, state, dispatch) {}
      },

      dateOfReporting: (0, _utils.getDateField)({
        label: { labelName: "DOB", labelKey: "BND_DOR" },
        placeholder: {
          labelName: "Date of Reporting",
          labelKey: "BND_DOR_PLACEHOLDER"
        },
        jsonPath: "bnd.birth.newRegistration.dateofreportepoch",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        pattern: (0, _utils.getPattern)("Date"),
        errorMessage: "ERR_INVALID_DATE",
        required: true,
        props: {
          inputProps: {
            max: (0, _commons.getTodaysDateInYMD)()
          }
        }
      })
    })
  }),
  childInfo: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_INFO_OF_CHILD"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    infoOfChild: (0, _utils.getCommonContainer)({
      dob: (0, _utils.getDateField)({
        label: { labelName: "DOB", labelKey: "BND_BIRTH_DOB" },
        placeholder: {
          labelName: "Date of Birth",
          labelKey: "BND_BIRTH_DOB"
        },
        jsonPath: "bnd.birth.newRegistration.dateofbirthepoch",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        pattern: (0, _utils.getPattern)("Date"),
        errorMessage: "ERR_INVALID_DATE",
        required: true,
        props: {
          inputProps: {
            max: (0, _commons.getTodaysDateInYMD)()
          }
        }
      }),
      gender: (0, _utils.getSelectField)({
        label: {
          labelName: "Select Gender",
          labelKey: "BND_GENDER"
        },
        placeholder: {
          labelName: "Select Gender",
          labelKey: "BND_GENDER_PLACEHOLDER"
        },
        required: true,
        localePrefix: {
          moduleName: "BIRTH",
          masterName: "GENDER"
        },
        data: [{
          code: "Male",
          label: "Male"
        }, {
          code: "Female",
          label: "Female"
        }, {
          code: "Others",
          label: "Others"
        }],
        props: {
          disabled: false
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        jsonPath: "bnd.birth.newRegistration.genderStr",
        autoSelect: true,
        visible: true,
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {},
        afterFieldChange: function afterFieldChange(action, state, dispatch) {}
      }),
      firstName: (0, _utils.getTextField)({
        label: {
          labelName: "First Name",
          labelKey: "BND_FIRSTNAME_LABEL"
        },
        placeholder: {
          labelName: "First Name",
          labelKey: "BND_FIRSTNAME_LABEL"
        },
        required: false,
        visible: true,
        pattern: _constants.patterns["name"],
        jsonPath: "bnd.birth.newRegistration.firstname",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      middlename: (0, _utils.getTextField)({
        label: {
          labelName: "Middle Name",
          labelKey: "BND_MIDDLENAME_LABEL"
        },
        placeholder: {
          labelName: "Middle Name",
          labelKey: "BND_MIDDLENAME_LABEL"
        },
        required: false,
        visible: true,
        pattern: _constants.patterns["name"],
        jsonPath: "bnd.birth.newRegistration.middlename",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      lastname: (0, _utils.getTextField)({
        label: {
          labelName: "Last Name",
          labelKey: "BND_LASTNAME_LABEL"
        },
        placeholder: {
          labelName: "Last Name",
          labelKey: "BND_LASTNAME_LABEL"
        },
        required: false,
        visible: true,
        pattern: _constants.patterns["name"],
        jsonPath: "bnd.birth.newRegistration.lastname",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      })
    })
  }),
  placeInfo: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_BIRTH_PLACE"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    placeOfBirth: (0, _utils.getCommonContainer)({
      firstName: (0, _utils.getTextField)({
        label: {
          labelName: "Place of Birth",
          labelKey: "BND_BIRTH_PLACE"
        },
        placeholder: {
          labelName: "Place of Birth",
          labelKey: "BND_BIRTH_PLACE"
        },
        required: true,
        visible: true,
        pattern: _constants.patterns["addressBig"],
        jsonPath: "bnd.birth.newRegistration.placeofbirth",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      })
    })
  }),
  fathersInfo: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_FATHERS_INFO"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    fathersInfo: getPersonDetailsForm("birthFatherInfo")
  }),
  mothersInfo: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_MOTHERS_INFO"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    mothersInfo: getPersonDetailsForm("birthMotherInfo")
  }),
  addrTimeOfBirth: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_PRESENT_ADDR_DURING_BIRTH"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    addrTimeOfBirth: getAddressForm("birthPresentaddr")
  }),

  permAddressofParents: (0, _utils.getCommonGrayCard)({
    checkBoxforaddress: {
      required: true,
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bnd",
      componentPath: "Checkbox",
      props: {
        label: {
          labelKey: "PRESENT_TO_PERM_ADDR_SWITCH_BIRTH",
          labelName: "PRESENT_TO_PERM_ADDR_SWITCH_BIRTH"
        },
        jsonPath: "bnd.birth.newRegistration.checkboxforaddress",
        callBack: function callBack(state, dispatch) {
          getcheckboxvalue(state, dispatch);
        }
      }
    },
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_BIRTH_ADDR_PERM"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    permAddressofParents: getAddressForm("birthPermaddr", true)
  }),
  informantsInfo: (0, _utils.getCommonGrayCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "",
      labelKey: "BND_INFORMANTS_INFO"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    informantInfo: (0, _utils.getCommonContainer)({
      informantName: (0, _utils.getTextField)({
        label: {
          labelName: "informants name",
          labelKey: "CORE_COMMON_NAME"
        },
        placeholder: {
          labelName: "informants name",
          labelKey: "CORE_COMMON_NAME"
        },
        required: false,
        visible: true,
        pattern: _constants.patterns["name"],
        jsonPath: "bnd.birth.newRegistration.informantsname",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      informantsAddress: (0, _utils.getTextField)({
        label: {
          labelName: "informants address",
          labelKey: "BND_ADDRESS"
        },
        placeholder: {
          labelName: "informants address",
          labelKey: "BND_ADDRESS"
        },
        required: false,
        visible: true,
        pattern: _constants.patterns["addressBig"],
        jsonPath: "bnd.birth.newRegistration.informantsaddress",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      })
    })
  }),
  remarks: (0, _utils.getTextField)({
    label: {
      labelName: "remarks",
      labelKey: "BND_REMARKS_LABEL"
    },
    placeholder: {
      labelName: "remarks",
      labelKey: "BND_REMARKS_LABEL"
    },
    required: false,
    visible: true,
    pattern: _constants.patterns["remarks"],
    jsonPath: "bnd.birth.newRegistration.remarks",
    gridDefination: {
      xs: 12,
      sm: 4
    }
  })
});