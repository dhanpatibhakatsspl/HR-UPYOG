"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bpaLocationDetails = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _api = require("../../../../../ui-utils/api");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bpaLocationDetails = exports.bpaLocationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Location Details",
    labelKey: "BPA_NEW_TRADE_DETAILS_HEADER_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  bpaDetailsConatiner: (0, _utils.getCommonContainer)({
    tradeLocCity: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "City",
        labelKey: "BPA_CITY_LABEL"
      },
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      optionLabel: "name",
      placeholder: { labelName: "Select City", labelKey: "BPA_SELECT_CITY" },
      sourceJsonPath: "citiesByModule.TL.tenants",
      jsonPath: "BPA.landInfo.address.city",
      required: true,
      props: {
        required: true,
        disabled: true,
        className: "tl-trade-type"
      }
    }), {
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var payload, mohallaData, mohallaLocalePrefix;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.address.city", action.value));
                  _context.prev = 1;
                  _context.next = 4;
                  return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: action.value }], {});

                case 4:
                  payload = _context.sent;
                  mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
                    result.push((0, _extends3.default)({}, item, {
                      name: action.value.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
                    }));
                    return result;
                  }, []);

                  dispatch((0, _actions.prepareFinalObject)("mohalla.tenant.localities", mohallaData));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", mohallaData
                  // payload.TenantBoundary && payload.TenantBoundary[0].boundary
                  ));
                  mohallaLocalePrefix = {
                    moduleName: action.value,
                    masterName: "REVENUE"
                  };

                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.localePrefix", mohallaLocalePrefix));
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
    }),
    tradeLocDoorHouseNo: (0, _utils.getTextField)({
      visible: false,
      label: {
        labelName: "Door/House No.",
        labelKey: "BPA_DETAILS_DOOR_NO_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Door/House No.",
        labelKey: "BPA_DETAILS_DOOR_NO_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("DoorHouseNo"),
      jsonPath: "BPA.landInfo.address.doorNo"
    }),
    tradeLocBuilidingName: (0, _utils.getTextField)({
      label: {
        labelName: "Building/Colony Name",
        labelKey: "BPA_DETAILS_BLDG_NAME_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Building/Colony Name",
        labelKey: "BPA_DETAILS_BLDG_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "BPA.landInfo.address.buildingName"
    }),
    tradeLocStreetName: (0, _utils.getTextField)({
      label: {
        labelName: "Street Name",
        labelKey: "BPA_DETAILS_SRT_NAME_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Street Name",
        labelKey: "BPA_DETAILS_SRT_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "BPA.landInfo.address.street"
    }),
    tradeLocMohalla: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "AutosuggestContainer",
      jsonPath: "BPA.landInfo.address.locality.code",
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        label: {
          labelName: "Mohalla",
          labelKey: "BPA_DETAILS_MOHALLA_LABEL"
        },
        placeholder: {
          labelName: "Select Mohalla",
          labelKey: "BPA_DETAILS_MOHALLA_PLACEHOLDER"
        },
        jsonPath: "BPA.landInfo.address.locality.code",
        sourceJsonPath: "mohalla.tenant.localities",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        required: true,
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
    tradeLocPincode: (0, _utils.getTextField)({
      label: {
        labelName: "Pincode",
        labelKey: "BPA_DETAILS_PIN_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Pincode",
        labelKey: "BPA_DETAILS_PIN_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Pincode"),
      jsonPath: "BPA.landInfo.address.pincode"
    }),
    tradeLocGISCoord: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "gis-div-css",
        style: {
          width: "100%",
          cursor: "pointer"
        }
      },
      jsonPath: "BPA.landInfo.address.geoLocation.latitude",
      onClickDefination: {
        action: "condition",
        callBack: _utils2.showHideBpaMapPopup
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      children: {
        gisTextField: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "GIS Coordinates",
            labelKey: "BPA_DETAILS_GIS_CORD_LABEL"
          },
          placeholder: {
            labelName: "Select your trade location on map",
            labelKey: "BPA_DETAILS_GIS_CORD_PLACEHOLDER"
          },
          jsonPath: "BPA.landInfo.address.geoLocation.latitude",
          iconObj: {
            iconName: "gps_fixed",
            position: "end"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            disabled: true,
            cursor: "pointer",
            className: "tl-trade-type"
          }
        }))
      }
    }

  }),
  mapsDialog: {
    componentPath: "Dialog",
    props: {
      open: false
    },
    children: {
      dialogContent: {
        componentPath: "DialogContent",
        children: {
          popup: (0, _utils2.getBpaMapLocator)()
        }
      }
    }
  }
}, {
  style: { overflow: "visible" }
});