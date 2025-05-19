"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradeLocationDetails = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _api = require("../../../../../ui-utils/api");

var _utils2 = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tradeLocationDetails = exports.tradeLocationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Trade Location Details",
    labelKey: "TL_NEW_TRADE_DETAILS_HEADER_TRADE_LOC_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),

  tradeDetailsConatiner: (0, _utils.getCommonContainer)({
    tradeLocCity: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "City",
        labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
      },
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      optionLabel: "name",
      placeholder: { labelName: "Select City", labelKey: "TL_SELECT_CITY" },
      sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
      jsonPath: "Licenses[0].tradeLicenseDetail.address.tenantId",
      required: true,
      props: {
        required: true,
        disabled: true
      }
    }), {
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var payload, mohallaData, mohallaLocalePrefix;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  //Below only runs for citizen - not required here in employee

                  dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address.city", action.value));
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

                  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", mohallaData));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", mohallaData
                  // payload.TenantBoundary && payload.TenantBoundary[0].boundary
                  ));
                  mohallaLocalePrefix = {
                    moduleName: action.value,
                    masterName: "REVENUE"
                  };

                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.localePrefix", mohallaLocalePrefix));
                  _context.next = 15;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](1);

                  console.log(_context.t0);

                case 15:
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
    tradeLocPropertyID: (0, _utils.getTextField)({
      label: {
        labelName: "Property ID",
        labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_LABEL"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_PLACEHOLDER"
      },
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _utils2.getDetailsFromProperty)(state, dispatch);
          }
        }
      },
      title: {
        value: "If you have already assessed your property, then please search your property by your PAID",
        key: "TL_PROPERTY_ID_TOOLTIP_MESSAGE"
      },
      infoIcon: "info_circle",
      jsonPath: "Licenses[0].propertyId"
    }),
    tradeLocDoorHouseNo: (0, _utils.getTextField)({
      label: {
        labelName: "Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("DoorHouseNo"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.doorNo"
    }),
    tradeLocBuilidingName: (0, _utils.getTextField)({
      label: {
        labelName: "Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.buildingName"
    }),
    tradeLocStreetName: (0, _utils.getTextField)({
      label: {
        labelName: "Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.street"
    }),
    tradeLocMohalla: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "AutosuggestContainer",
      jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        label: {
          labelName: "Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
        },
        placeholder: {
          labelName: "Select Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_PLACEHOLDER"
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
        sourceJsonPath: "applyScreenMdmsData.tenant.localities",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        isClearable: true,
        required: true,
        inputLabelProps: {
          shrink: true
          // className: "tradelicense-mohalla-apply"
        } },
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
      }(),
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    tradeLocPincode: (0, _utils.getTextField)({
      label: {
        labelName: "Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Pincode"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.pincode"
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
      jsonPath: "Licenses[0].tradeLicenseDetail.address.latitude",
      onClickDefination: {
        action: "condition",
        callBack: _utils2.showHideMapPopup
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      children: {
        gisTextField: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "GIS Coordinates",
            labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_LABEL"
          },
          placeholder: {
            labelName: "Select your trade location on map",
            labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_PLACEHOLDER"
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.address.latitude",
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
            cursor: "pointer"
          }
        }))
      }
    },
    tradeLocElectricity: (0, _utils.getTextField)({
      label: {
        labelName: "Electricity Connection No.",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Electricity Connection No. of Trade Loaction",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_PLACEHOLDER"
      },
      // pattern: getPattern("ElectricityConnNo"),
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.electricityConnectionNo"
    })
  }, {
    style: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? { "pointer-events": "none" } : {}
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
          popup: (0, _utils2.getMapLocator)()
        }
      }
    }
  }
}, {
  style: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? { "cursor": "not-allowed", overflow: "visible" } : { overflow: "visible" }
});