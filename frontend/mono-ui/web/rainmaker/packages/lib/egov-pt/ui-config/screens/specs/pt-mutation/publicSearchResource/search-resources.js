"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPropertyDetails = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions = require("egov-ui-kit/redux/app/actions");

var _uiUtils = require("../../../../../ui-utils");

var _searchMethods = require("./search-methods");

var _commons = require("egov-ui-kit/utils/commons");

var _publicSearchUtils = require("./publicSearchUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchPropertyDetails = exports.searchPropertyDetails = (0, _extends3.default)({}, (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Search Property",
    labelKey: "SEARCH_PROPERTY"
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one of the non-mandatory parameter to search for a property",
    labelKey: "PT_HOME_SEARCH_PROPERTY_SUB_HEADING"
  }),

  searchPropertyContainer: (0, _utils.getCommonContainer)({
    ulbCity: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "ULB/City",
          labelKey: "PT_SEARCH_ULB_CITY"
        },
        placeholder: {
          labelName: "Select ULB/City",
          labelKey: "PT_SEARCH_ULB_CITY_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        jsonPath: "searchScreen.tenantId",
        sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        className: "autocomplete-dropdown",
        labelsFromLocalisation: true,
        required: true,
        disabled: false,
        isClearable: true
      },
      required: true,
      jsonPath: "searchScreen.tenantId",
      gridDefination: {
        xs: 12,
        sm: 3
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var payload, mohallaData;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!action.value) {
                    _context.next = 13;
                    break;
                  }

                  _context.prev = 1;

                  dispatch((0, _actions.fetchLocalizationLabelForOpenScreens)((0, _localStorageUtils.getLocale)(), action.value, action.value));
                  _context.next = 5;
                  return (0, _uiUtils.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: action.value }], {});

                case 5:
                  payload = _context.sent;
                  mohallaData = (0, _commons.getMohallaData)(payload, action.value);

                  (0, _publicSearchUtils.applyMohallaData)(mohallaData, action.value, dispatch);
                  _context.next = 13;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](1);

                  console.log(_context.t0);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[1, 10]]);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
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
        isClearable: true,
        labelsFromLocalisation: true,
        jsonPath: "searchScreen.locality.code",
        sourceJsonPath: "applyScreenMdmsData.tenant.localities",
        className: "locality-dropdown autocomplete-dropdown"
      },
      required: true,
      jsonPath: "searchScreen.locality.code",
      gridDefination: {
        xs: 12,
        sm: 3
      },
      beforeFieldChange: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function beforeFieldChange(_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    ownerName: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Name",
        labelKey: "PT_SEARCHPROPERTY_TABEL_OWNERNAME"
      },
      placeholder: {
        labelName: "Enter Property Owner Name",
        labelKey: "PT_SEARCH_OWNER_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Name"),
      errorMessage: "Invalid Name",
      jsonPath: "searchScreen.ownerName",
      props: {
        className: "applicant-details-error"
      },
      gridDefination: {
        xs: 12,
        sm: 3
      }
    }),
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
        sm: 3
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: (0, _utils.getPattern)("MobileNo"),
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER"
    }),
    propertyID: (0, _utils.getTextField)({
      label: {
        labelName: "Property ID",
        labelKey: "PT_MUTATION_PID"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "PT_PROPERTY_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 3
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_PROPERTY_ID",
      jsonPath: "searchScreen.ids"
    })
  }),
  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      resetButton: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
          // align: "center"
        },
        props: {
          className: "public-domain-search-buttons",
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
          callBack: _searchMethods.resetFields
        }
      },
      searchButton: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-pt",
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
          // align: "center"
        },
        props: {
          variant: "contained",
          className: "public-domain-search-buttons",
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
          callBack: _searchMethods.propertySearch
        }
      }
    })
  }),
  props: {
    style: {
      position: "relative",
      top: "60px"
    }
  }
}));