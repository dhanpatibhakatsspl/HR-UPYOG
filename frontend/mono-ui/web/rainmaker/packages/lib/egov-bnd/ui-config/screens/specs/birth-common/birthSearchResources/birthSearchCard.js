"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.birthSearchCard = exports.buttonContainer = exports.searchSet2 = exports.searchSet1 = exports.searchSetCommon = exports.showHideConfirmationPopup = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("./../../utils");

var _disclaimerDialog = require("./disclaimerDialog");

var _function = require("./function");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resetFields = function resetFields(state, dispatch) {
  //Clear advanced Search
  var componentPath = "components.div.children.birthSearchCard.children.cardContent.children.searchContainer2.children.details.children";
  for (var child in (0, _get2.default)(state, "screenConfiguration.screenConfig.getCertificate." + componentPath)) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", componentPath + "." + child, "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", componentPath + "." + child, "props.helperText", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", componentPath + "." + child, "props.error", false));
  }

  //Clear Mandatory Search Attributes
  componentPath = "components.div.children.birthSearchCard.children.cardContent.children.searchContainerCommon.children";
  for (var child in (0, _get2.default)(state, "screenConfiguration.screenConfig.getCertificate." + componentPath)) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", componentPath + "." + child, "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", componentPath + "." + child, "props.helperText", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", componentPath + "." + child, "props.error", false));
  }
  if (!(process.env.REACT_APP_NAME === "Citizen")) {
    var tenantId = (0, _localStorageUtils.getTenantId)();
    dispatch((0, _actions.prepareFinalObject)("bnd.birth.tenantId", tenantId));
  }
  dispatch((0, _actions.prepareFinalObject)("bnd.birth.birthSearchResponse", []));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "props.data", []));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "props.tableData", []));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "props.rows", 0));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "visible", false));
};

var cbChanged = function cbChanged(action, state, dispatch) {
  var tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject.bnd.birth, "tenantId");

  (0, _utils2.loadHospitals)(action, state, dispatch, "death", tenantId).then(function (response) {
    if (response && response.MdmsRes && response.MdmsRes["birth-death-service"] && response.MdmsRes["birth-death-service"].hospitalList) {
      var hptList = response.MdmsRes["birth-death-service"].hospitalList;
      var newList = [].concat((0, _toConsumableArray3.default)(hptList.filter(function (hos) {
        return hos.active;
      })), [{
        hospitalName: "Others" }]);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = newList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var hospital = _step.value;

          hospital.code = hospital.hospitalName;
          hospital.name = hospital.hospitalName;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", newList));
    } else {
      dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", [{ code: "Others", name: "Others" }]));
    }
  });
};

var setVisibilityOptionsSet1 = function setVisibilityOptionsSet1(state, dispatch, visible) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.birthSearchCard.children.cardContent.children.searchContainer1", "visible", visible));
};

var setVisibilityOptionsSet2 = function setVisibilityOptionsSet2(state, dispatch, visible) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.birthSearchCard.children.cardContent.children.searchContainer2", "visible", visible));
};

var showHideConfirmationPopup = exports.showHideConfirmationPopup = function showHideConfirmationPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["getCertificate"], "components.div.children.birthSearchCard.children.cardContent.children.disclaimerDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.birthSearchCard.children.cardContent.children.disclaimerDialog", "props.open", !toggle));
};

var searchSetCommon = exports.searchSetCommon = (0, _utils.getCommonContainer)({
  cantonmentSelect: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bnd",
    componentPath: "AutosuggestContainer",
    jsonPath: "bnd.birth.tenantId",
    sourceJsonPath: "bnd.allTenants",
    visible: true,
    autoSelect: true,
    props: {
      autoSelect: true,
      isDisabled: false,
      //isClearable:true,
      className: "autocomplete-dropdown",
      suggestions: [],
      disabled: false, //getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
      label: {
        labelName: "Select Cantonment",
        labelKey: "BND_APPL_CANT"
      },
      placeholder: {
        labelName: "Select Cantonment",
        labelKey: "BND_APPL_CANT_PLACEHOLDER"
      },
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      labelsFromLocalisation: true,
      required: true,
      errorText: "Required",
      jsonPath: "bnd.birth.tenantId",
      sourceJsonPath: "bnd.allTenants",
      inputLabelProps: {
        shrink: true
      },
      onClickHandler: function onClickHandler(action, state, dispatch) {}
    },
    gridDefination: {
      xs: 12,
      sm: 4
    },
    required: true,
    beforeFieldChange: function beforeFieldChange(action, state, dispatch) {},
    afterFieldChange: function afterFieldChange(action, state, dispatch) {
      cbChanged(action, state, dispatch);
    }
  },
  dob: (0, _utils.getDateField)({
    label: { labelName: "DOB", labelKey: "BND_BIRTH_DOB" },
    placeholder: {
      labelName: "Date of Birth",
      labelKey: "BND_BIRTH_DOB_PLACEHOLDER"
    },
    jsonPath: "bnd.birth.dob",
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
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }),
  fromdate: (0, _utils.getDateField)({
    label: { labelName: "DOB", labelKey: "BND_BIRTH_FROM_DATE" },
    placeholder: {
      labelName: "FromDate of Search",
      labelKey: "BND_BIRTH_DOB_PLACEHOLDER"
    },
    jsonPath: "bnd.birth.fromdate",
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
    },
    visible: process.env.REACT_APP_NAME === "Employee" ? true : false
  }),
  todate: (0, _utils.getDateField)({
    label: { labelName: "DOB", labelKey: "BND_BIRTH_TO_DATE" },
    placeholder: {
      labelName: "ToDate of Search",
      labelKey: "BND_BIRTH_DOB_PLACEHOLDER"
    },
    jsonPath: "bnd.birth.todate",
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
    },
    visible: process.env.REACT_APP_NAME === "Employee" ? true : false
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
      code: "1",
      label: "MALE"
    }, {
      code: "2",
      label: "FEMALE"
    }, {
      code: "3",
      label: "TRANSGENDER"
    }],
    props: {
      disabled: false
    },
    gridDefination: {
      xs: 12,
      sm: 4
    },
    jsonPath: "bnd.birth.gender",
    autoSelect: true,
    visible: true,
    beforeFieldChange: function beforeFieldChange(action, state, dispatch) {},
    afterFieldChange: function afterFieldChange(action, state, dispatch) {}
  })
});

var searchSet1 = exports.searchSet1 = (0, _utils.getCommonContainer)({
  // registrationNo: getTextField({
  //   label: {
  //     labelName: "Registration No",
  //     labelKey: "BND_REG_NO_LABEL"
  //   },
  //   placeholder: {
  //     labelName: "Registration No",
  //     labelKey: "BND_REG_NO_PLACEHOLDER"
  //   },
  //   required:true,
  //   visible: true,
  //   jsonPath: "bnd.birth.registrationNo",
  //   gridDefination: {
  //     xs: 12,
  //     sm: 4
  //   }
  // }),
  clickHereLink: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bnd",
    componentPath: "LinkButton",
    props: {
      disableValidation: true,
      url: "teat",
      labelKey: "BND_DONT_KNOW_REGNO_MSG",
      onClickDefination: {
        callBack: function callBack(state, dispatch) {
          setVisibilityOptionsSet1(state, dispatch, false);
          setVisibilityOptionsSet2(state, dispatch, true);
        }
      }
    },
    gridDefination: { xs: 12, sm: 4, md: 4 }
  }
});

var searchSet2 = exports.searchSet2 = (0, _utils.getCommonContainer)({
  registrationNo: (0, _utils.getTextField)({
    label: {
      labelName: "Registration No",
      labelKey: "BND_REG_NO_LABEL"
    },
    placeholder: {
      labelName: "Registration No",
      labelKey: "BND_REG_NO_LABEL"
    },
    required: false,
    visible: true,
    jsonPath: "bnd.birth.registrationNo",
    gridDefination: {
      xs: 12,
      sm: 4
    }
  }),
  hospital: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bnd",
    componentPath: "AutosuggestContainer",
    jsonPath: "bnd.birth.hosptialId",
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
        labelKey: "BND_BIRTH_APPL_HOSP"
      },
      placeholder: {
        labelName: "Select Hospital",
        labelKey: "BND_BIRTH_APPL_HOSP_PLACEHOLDER"
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
  fathersName: (0, _utils.getTextField)({
    label: {
      labelName: "Father's Name",
      labelKey: "BND_FATHERS_NAME_LABEL"
    },
    placeholder: {
      labelName: "Father's Name",
      labelKey: "BND_FATHERS_NAME_PLACEHOLDER"
    },
    required: false,
    visible: true,
    jsonPath: "bnd.birth.fathersName",
    gridDefination: {
      xs: 12,
      sm: 4
    }
  }),
  mothersName: (0, _utils.getTextField)({
    label: {
      labelName: "Mother's Name",
      labelKey: "BND_MOTHERS_NAME_LABEL"
    },
    placeholder: {
      labelName: "Mother's Name",
      labelKey: "BND_MOTHERS_NAME_PLACEHOLDER"
    },
    required: false,
    visible: true,
    jsonPath: "bnd.birth.mothersName",
    gridDefination: {
      xs: 12,
      sm: 4
    }
  })
  // clickHereLink: {
  //   uiFramework: "custom-atoms-local",
  //   moduleName: "egov-bnd",
  //   componentPath: "LinkButton",
  //   props: {
  //     disableValidation:true,
  //     url: "teat" ,
  //     labelKey:"BND_DONT_KNOW_DETAILS_MSG",
  //     onClickDefination: {
  //       callBack: (state, dispatch) => {
  //         setVisibilityOptionsSet1(state,dispatch,true);
  //         setVisibilityOptionsSet2(state,dispatch,false);
  //       }
  //     },
  //   },
  //   gridDefination: { xs: 12, sm: 4, md: 4 }
  // },
});

var buttonContainer = exports.buttonContainer = (0, _utils.getCommonContainer)({
  firstCont: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 3
    }
  },
  resetButton: {
    componentPath: "Button",
    gridDefination: {
      xs: 12,
      sm: 3
      // align: "center"
    },
    props: {
      variant: "outlined",
      style: {
        color: "#696969",
        // backgroundColor: "#FE7A51",
        border: "#696969 solid 1px",
        borderRadius: "2px",
        width: window.innerWidth > 480 ? "80%" : "100%",
        height: "48px"
      }
    },
    children: {
      buttonLabel: (0, _utils.getLabel)({
        labelName: "RESET",
        labelKey: "BND_RESET_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: resetFields
    }
  },
  searchButton: {
    componentPath: "Button",
    gridDefination: {
      xs: 12,
      sm: 3
      // align: "center"
    },
    props: {
      variant: "contained",
      style: {
        color: "white",
        backgroundColor: "#696969",
        borderRadius: "2px",
        width: window.innerWidth > 480 ? "80%" : "100%",
        height: "48px"
      }
    },
    children: {
      buttonLabel: (0, _utils.getLabel)({
        labelName: "SEARCH",
        labelKey: "BND_SEARCH_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        (0, _function.searchApiCall)(state, dispatch);
      }
    }
  },

  lastCont: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 3
    }
  }
});

var birthSearchCard = exports.birthSearchCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Search Bill",
    labelKey: "BND_SEARCH_REGISTRY"
  }),
  // subheader: getCommonSubHeader({
  //   labelName: "Provide at least one parameter to search for an application",
  //   labelKey: "ABG_SEARCH_BILL_COMMON_SUB_HEADER"
  // }),

  break1: (0, _utils.getBreak)(),
  searchContainerCommon: searchSetCommon,
  //break1: getBreak(),
  divider1: (0, _utils.getDivider)(),
  searchContainer1: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {},
    children: {
      details: searchSet1
    },
    visible: false
  },
  importantNote2: (0, _utils.getCommonCaption)({
    labelName: "Imp Note",
    labelKey: "BND_SELECTION_NOTE"
  }, {
    disableValidation: true,
    style: {
      color: "#ff8100",
      fontSize: "16px"
    }
  }),
  break2: (0, _utils.getBreak)(),
  searchContainer2: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {},
    children: {
      details: searchSet2
    },
    visible: true
  },
  buttonContainer: buttonContainer,
  disclaimerDialog: {
    componentPath: "Dialog",
    props: {
      open: false,
      maxWidth: "sm",
      disableValidation: true
    },
    children: {
      dialogContent: {
        componentPath: "DialogContent",
        props: {
          classes: {
            root: "city-picker-dialog-style"
          }
          // style: { minHeight: "180px", minWidth: "365px" }
        },
        children: {
          popup: _disclaimerDialog.disclaimerDialog
        }
      }
    }
  }
});