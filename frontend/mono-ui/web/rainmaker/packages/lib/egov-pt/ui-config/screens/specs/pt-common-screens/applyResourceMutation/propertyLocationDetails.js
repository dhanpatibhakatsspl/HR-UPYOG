"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyLocationDetails = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getTextField;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

var _api = require("../../../../../ui-utils/api");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertyLocationDetails = exports.propertyLocationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Mutation Details",
    labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  propertyLocationDetailsContainer: (0, _utils.getCommonContainer)({
    city: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      jsonPath: "Property.address.city",
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        optionLabel: "name",
        optionValue: "code",
        className: "hr-generic-selectfield autocomplete-dropdown",
        label: {
          labelKey: "PT_COMMON_CITY",
          labelName: "City"
        },
        placeholder: {
          labelKey: "PT_COMMON_CITY_PLACEHOLDER",
          labelName: "Select City"
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        inputLabelProps: {
          shrink: true
        },
        sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
        jsonPath: "Property.address.city" //db sake
      },
      required: true,
      gridDefination: {
        xs: 12,
        sm: 6
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var payload, mohallaData, mohallaLocalePrefix;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  //Below only runs for citizen - not required here in employee
                  dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), action.value, action.value));

                  dispatch((0, _actions.prepareFinalObject)("Property.address.city", action.value));
                  _context.prev = 2;
                  _context.next = 5;
                  return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: action.value }], {});

                case 5:
                  payload = _context.sent;
                  mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
                    result.push((0, _extends3.default)({}, item, {
                      name: action.value.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
                    }));
                    return result;
                  }, []);

                  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", mohallaData));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla", "props.suggestions", mohallaData));
                  mohallaLocalePrefix = {
                    moduleName: action.value,
                    masterName: "REVENUE"
                  };

                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla", "props.localePrefix", mohallaLocalePrefix));
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](2);

                  console.log(_context.t0);

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[2, 13]]);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    localityOrMohalla: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      jsonPath: "Property.address.locality.code", //db sake
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        label: {
          labelName: "Locality/Mohalla",
          labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA"
        },
        placeholder: {
          labelName: "Enter Mohalla",
          labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA_PLACEHOLDER"
        },
        jsonPath: "Property.address.locality.code", //db sake
        sourceJsonPath: "applyScreenMdmsData.tenant.localities",
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
    },

    doorNo: (0, _utils.getTextField)({
      label: {
        labelKey: "PT_COMMON_DOOR_NO_LABEL"
      },
      placeholder: {
        labelKey: "PT_COMMON_SEARCH_DOOR_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "PT_COMMON_ERR_INVALID_DOOR_NO",
      jsonPath: "Property.address.doorNo"
    }),
    buildingOrColonyName: (0, _utils.getTextField)((_getTextField = {
      label: {
        labelKey: "PT_COMMON_BUILDING_COLONY_LABEL"
      },
      placeholder: {
        labelKey: "PT_COMMON_SEARCH_BUILDING_COLONY_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: /^[a-zA-Z0-9-]*$/i
    }, (0, _defineProperty3.default)(_getTextField, "pattern", (0, _utils.getPattern)("BuildingStreet")), (0, _defineProperty3.default)(_getTextField, "errorMessage", "PT_COMMON_ERR_INVALID_BUILDING_COLONY"), (0, _defineProperty3.default)(_getTextField, "jsonPath", "Property.address.buildingName"), _getTextField))
  })
}, {
  style: {
    overflow: "visible"
  }
});