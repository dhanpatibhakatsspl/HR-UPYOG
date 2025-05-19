"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApplications = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions = require("egov-ui-kit/redux/app/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _searchMethods = require("./search-methods");

var _functions = require("../searchResource/functions");

var _commons = require("egov-ui-kit/utils/commons");

var _publicSearchUtils = require("./publicSearchUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApplications = exports.searchApplications = (0, _extends3.default)({}, (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Search Property",
    labelKey: "WS_SEARCH_CONNECTION_SUB_HEADER"
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one of the non-mandatory parameter to search for a property",
    labelKey: "WS_PUBLIC_HOME_SEARCH_CONN_RESULTS_DESC"
  }),

  searchPropertyContainer: (0, _utils.getCommonContainer)({
    ulbCity: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "ULB/City",
          labelKey: "WS_SEARCH_ULB_CITY"
        },
        placeholder: {
          labelName: "Select ULB/City",
          labelKey: "WS_SEARCH_ULB_CITY_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        jsonPath: "searchScreen.tenantId",
        sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        className: "autocomplete-dropdown pds-search",
        labelsFromLocalisation: true,
        required: true,
        disabled: false,
        isClearable: false
      },
      required: true,
      jsonPath: "searchScreen.tenantId",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var storageList, index, finalList, payload, mohallaData;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!action.value) {
                    _context.next = 14;
                    break;
                  }

                  _context.prev = 1;
                  storageList = localStorage.getItem("storedModulesList");


                  if (storageList) {
                    storageList = JSON.parse(storageList);
                    index = storageList.indexOf("rainmaker-" + action.value);
                    finalList = storageList.splice(index, 1);

                    finalList = JSON.stringify(storageList);
                    if (index > -1) {
                      localStorage.setItem("storedModulesList", finalList);
                    }
                  }

                  dispatch((0, _actions.fetchLocalizationLabelForOpenScreens)((0, _localStorageUtils.getLocale)(), action.value, action.value));
                  _context.next = 7;
                  return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: action.value }], {});

                case 7:
                  payload = _context.sent;
                  mohallaData = (0, _commons.getMohallaData)(payload, action.value);

                  (0, _publicSearchUtils.applyMohallaData)(mohallaData, action.value, dispatch);
                  _context.next = 14;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](1);

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[1, 12]]);
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
          labelKey: "WS_SEARCH_LOCALITY"
        },
        placeholder: {
          labelName: "Select Locality",
          labelKey: "WS_SEARCH_LOCALITY_PLACEHOLDER"
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
        className: "locality-dropdown autocomplete-dropdown pds-search"
      },
      required: true,
      jsonPath: "searchScreen.locality.code",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    propertyID: (0, _utils.getTextField)({
      label: {
        labelName: "Property ID",
        labelKey: "WS_PROPERTY_ID_LABEL"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "WS_PROPERTY_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_PROPERTY_ID",
      jsonPath: "searchScreen.ids"
    }),
    ownerMobNo: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "WS_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "WS_OWN_DETAIL_MOBILE_NO_PLACEHOLDER"
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
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER"
    }),
    consumerNo: (0, _utils.getTextField)({
      label: {
        labelKey: "WS_MYCONNECTIONS_CONSUMER_NO"
      },
      placeholder: {
        labelKey: "WS_SEARCH_CONNNECTION_CONSUMER_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: (0, _utils.getPattern)("consumerNo"),
      errorMessage: "ERR_INVALID_CONSUMER_NO",
      jsonPath: "searchScreen.connectionNumber"
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
            labelKey: "WS_SEARCH_CONNECTION_RESET_BUTTON"
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
            labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _searchMethods.searchConnections
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
}, {
  style: {
    overflow: "visible"
  }
}));