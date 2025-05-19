"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApplication = exports.searchProperty = exports.searchApplicationDetails = exports.searchPropertyDetails = exports.cityChange = exports.resetFields = exports.ComponentJsonPath = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ComponentJsonPath;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _uiUtils = require("../../../../ui-utils");

var _functions = require("./functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentJsonPath = exports.ComponentJsonPath = (_ComponentJsonPath = {
  ulbCity: "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity",
  locality: "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.locality",
  ownerName: "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerName",
  ownerMobNo: "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
  propertyID: "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyID"
}, (0, _defineProperty3.default)(_ComponentJsonPath, "ownerName", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerName"), (0, _defineProperty3.default)(_ComponentJsonPath, "doorNo", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.doorNo"), _ComponentJsonPath);

var applyMohallaData = function applyMohallaData(mohallaData, tenantId, dispatch) {
  dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.tenant.localities", mohallaData));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.data", mohallaData
  // payload.TenantBoundary && payload.TenantBoundary[0].boundary
  ));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.errorMessage", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ulbCity, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ulbCity, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ulbCity, "props.isFieldValid", true));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.locality", ""));
  var mohallaLocalePrefix = {
    moduleName: tenantId,
    masterName: "REVENUE"
  };
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.localePrefix", mohallaLocalePrefix));
};

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  if (process.env.REACT_APP_NAME == "Citizen") {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity", "props.value", ""));

    dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.tenantId", ''));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity", "props.isDisabled", false));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity", "isDisabled", false));
  } else {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity", "props.isDisabled", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity", "isDisabled", true));
  }

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId", "props.value", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.acknowledgementIds", ''));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ulbCity, "props.errorMessage", ""));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ulbCity, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ulbCity, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.locality, "props.errorMessage", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.locality", ''));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.ids", ''));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.mobileNumber", ''));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.oldPropertyId", ''));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.errorMessage", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.name", ''));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.doorNo, "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.doorNo, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.doorNo, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.doorNo, "props.errorMessage", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.doorNo", ''));
};

var cityChange = exports.cityChange = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var payload, mohallaData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), value, value));
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: value }], {});

          case 4:
            payload = _context.sent;
            mohallaData = (0, _commons.getMohallaData)(payload, value);

            applyMohallaData(mohallaData, value, dispatch);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function cityChange(_x) {
    return _ref.apply(this, arguments);
  };
}();
var searchPropertyDetails = exports.searchPropertyDetails = (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Search Property",
    labelKey: "SEARCH_PROPERTY"
  }),

  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one non-mandatory parameter to search for an application",
    labelKey: "PT_HOME_SEARCH_RESULTS_DESC"
  }),
  ulbCityContainer: (0, _utils.getCommonContainer)({
    ulbCity: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        className: "autocomplete-dropdown",
        suggestions: [],
        label: {
          labelName: "ULB",
          labelKey: "PT_ULB_CITY"
        },
        placeholder: {
          labelName: "Select ULB",
          labelKey: "PT_ULB_CITY_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        jsonPath: "ptSearchScreen.tenantId",
        sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        labelsFromLocalisation: true,
        required: true,
        disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
        inputLabelProps: {
          shrink: true
        }
      },
      required: true,
      jsonPath: "ptSearchScreen.tenantId",
      sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      beforeFieldChange: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (action.value) {
                    cityChange(dispatch, action.value);
                  }

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function beforeFieldChange(_x3, _x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    locality: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Locality",
          labelKey: "PT_SEARCH_LOCALITY"
        },
        placeholder: {
          labelName: "Select Locality",
          labelKey: "PT_SEARCH_LOCALITY_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        required: true,
        labelsFromLocalisation: true,
        jsonPath: "ptSearchScreen.locality",
        sourceJsonPath: "searchScreenMdmsData.tenant.localities",
        className: "locality-dropdown autocomplete-dropdown"
      },
      required: true,
      jsonPath: "ptSearchScreen.locality",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    },

    ownerMobNo: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4

      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: (0, _utils.getPattern)("MobileNo"),
      jsonPath: "ptSearchScreen.mobileNumber",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER"
    }),
    ownerName: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Name",
        labelKey: "PT_SEARCHPROPERTY_TABEL_OWNERNAME"
      },
      placeholder: {
        labelName: "Enter Property Owner Name",
        labelKey: "PT_SEARCH_OWNER_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("SearchOwnerName"),
      errorMessage: "Invalid Name",
      helperText: "PT_MIN_3CHAR",
      jsonPath: "ptSearchScreen.name",
      props: {
        className: "applicant-details-error"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      afterFieldChange: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (action.value.match(/^[^{0-9}^\$\"<>?\\\\~!@#$%^()+={}\[\]*,/_:;“”‘’]{3,50}$/i) || action.value.length == 0) {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.error", false));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "isFieldValid", true));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.errorMessage", ""));
                  } else {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.error", true));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "isFieldValid", false));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", ComponentJsonPath.ownerName, "props.errorMessage", action.value.length < 3 ? (0, _commons2.getLocaleLabels)("PT_ERR_MIN3CHAR", "PT_ERR_MIN3CHAR") : (0, _commons2.getLocaleLabels)("PT_ERR_INVALID_TEXT", "PT_ERR_INVALID_TEXT")));
                  }

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function afterFieldChange(_x6, _x7, _x8) {
          return _ref3.apply(this, arguments);
        };
      }()
    }),
    propertyTaxUniqueId: (0, _utils.getTextField)({
      label: {
        labelName: "Property Tax Unique Id",
        labelKey: "PT_PROPERTY_UNIQUE_ID"
      },
      placeholder: {
        labelName: "Enter Property Tax Unique Id",
        labelKey: "PT_PROPERTY_UNIQUE_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4

      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_PROPERTY_ID",
      jsonPath: "ptSearchScreen.ids"
    }),
    existingPropertyId: (0, _utils.getTextField)({
      label: {
        labelName: "Existing Property ID",
        labelKey: "PT_EXISTING_PROPERTY_ID"
      },
      placeholder: {
        labelName: "Enter Existing Property ID",
        labelKey: "PT_EXISTING_PROPERTY_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4

      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_PROPERTY_ID",
      jsonPath: "ptSearchScreen.oldPropertyId"
    }),
    doorNo: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Name",
        labelKey: "PT_SEARCHPROPERTY_TABEL_DOOR_NO"
      },
      placeholder: {
        labelName: "Enter Property Owner Name",
        labelKey: "PT_SEARCH_DOOR_NO_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("DoorHouseNo"),
      errorMessage: "Invalid No",
      jsonPath: "ptSearchScreen.doorNo",
      props: {
        className: "applicant-details-error"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  }),
  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "black",
            borderColor: "black",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Reset",
            labelKey: "PT_HOME_RESET_BUTTON"
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
          sm: 6
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Search",
            labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.propertySearch
        }
      }
    })
  })
});

var searchApplicationDetails = exports.searchApplicationDetails = (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Search Application",
    labelKey: "SEARCH_APPLICATION"
  }),

  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one non-mandatory parameter to search for an application",
    labelKey: "PT_HOME_SEARCH_RESULTS_DESC"
  }),
  appNumberContainer: (0, _utils.getCommonContainer)({
    propertyTaxApplicationNo: (0, _utils.getTextField)({
      label: {
        labelName: "Application No",
        labelKey: "PT_PROPERTY_APPLICATION_NO"
      },
      placeholder: {
        labelName: "Enter Application No",
        labelKey: "PT_PROPERTY_APPLICATION_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4

      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_APPLICATION_NO",
      jsonPath: "ptSearchScreen.acknowledgementIds"
    }),
    ownerMobNoProp: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "PT_HOME_SEARCH_APP_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4

      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: (0, _utils.getPattern)("MobileNo"),
      jsonPath: "ptSearchScreen.mobileNumber",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER"
    }),
    applicationPropertyTaxUniqueId: (0, _utils.getTextField)({
      label: {
        labelName: "Property Tax Unique Id",
        labelKey: "PT_PROPERTY_UNIQUE_ID"
      },
      placeholder: {
        labelName: "Enter Property Tax Unique Id",
        labelKey: "PT_PROPERTY_UNIQUE_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4

      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_PROPERTY_ID",
      jsonPath: "ptSearchScreen.ids"
    })
  }),
  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "black",
            borderColor: "black",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Reset",
            labelKey: "PT_HOME_RESET_BUTTON"
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
          sm: 6
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Search",
            labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.applicationSearch
        }
      }
    })
  })
});

var searchProperty = exports.searchProperty = (0, _utils.getCommonContainer)({
  searchPropertyDetails: searchPropertyDetails

});

var searchApplication = exports.searchApplication = (0, _utils.getCommonContainer)({
  searchApplicationDetails: searchApplicationDetails
});