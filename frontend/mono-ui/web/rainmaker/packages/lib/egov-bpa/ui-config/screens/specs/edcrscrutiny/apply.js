"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdown = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _documentList = require("./documentList");

var _functions = require("./functions");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "New Building Plan Scrutiny",
  labelKey: "BPA_SCRUTINY_TITLE"
});

var dropdown = exports.dropdown = {
  uiFramework: "custom-containers",
  componentPath: "AutosuggestContainer",
  jsonPath: "Scrutiny[0].tenantId",
  required: true,
  props: {
    style: {
      width: "100%",
      cursor: "pointer"
    },
    label: {
      labelName: "CITY",
      labelKey: "EDCR_SCRUTINY_CITY"
    },
    placeholder: {
      labelName: "Select City",
      labelKey: "EDCR_SCRUTINY_CITY_PLACEHOLDER"
    },
    localePrefix: {
      moduleName: "TENANT",
      masterName: "TENANTS"
    },
    sourceJsonPath: "applyScreenMdmsData.tenantData",
    labelsFromLocalisation: true,
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    suggestions: [],
    fullwidth: true,
    required: true,
    isClearable: true,
    inputLabelProps: {
      shrink: true
      // className: "tradelicense-mohalla-apply"
    } },
  beforeFieldChange: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function beforeFieldChange(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(),
  gridDefination: {
    xs: 12,
    sm: 6
  }
};

var buildingInfoCard = (0, _utils.getCommonCard)({
  buildingPlanCardContainer: (0, _utils.getCommonContainer)({
    inputdetails: (0, _utils.getCommonContainer)({
      dropdown: dropdown,
      dummyDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 6
        },
        visible: true,
        props: {
          disabled: true
        }
      },
      applicantName: (0, _utils.getTextField)({
        label: {
          labelName: "Applicant Name",
          labelKey: "EDCR_SCRUTINY_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Applicant Name",
          labelKey: "EDCR_SCRUTINY_NAME_LABEL_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: true,
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Scrutiny[0].applicantName"
      }),
      // serviceType: {
      //   ...getSelectField({
      //     label: {
      //       labelName: "Service Type",
      //       labelKey: "BPA_SCRUTINY_SERVICETYPE_LABEL"
      //     },
      //     placeholder: {
      //       labelName: "Select Service Type",
      //       labelKey: "BPA_SCRUTINY_SERVICETYPE_PLACEHOLDER"
      //     },
      //     required: true,
      //     gridDefination: {
      //       xs: 12,
      //       sm: 6
      //     }
      //   })
      // },
      dummyDiv1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 6
        },
        visible: true,
        props: {
          disabled: true
        }
      }
    }),
    dummyDiv2: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 12
      },
      visible: true,
      props: {
        disabled: true
      },
      children: {
        documentList: _documentList.documentList
      }
    },

    buttonContainer: (0, _utils.getCommonContainer)({
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
            color: "#FE7A51",
            // backgroundColor: "#FE7A51",
            border: "#FE7A51 solid 1px",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "CLEAR FORM",
            labelKey: "BPA_SCRUTINY_CLEARFORM_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.resetFields
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
            backgroundColor: "#FE7A51",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "SUBMIT",
            labelKey: "EDCR_SCRUTINY_SUBMIT_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _functions.submitFields)(state, dispatch);
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
    })
  })
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("Scrutiny[0]", {}));
    dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0]", {}));
    (0, _functions.fetchMDMSData)(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header)
          }
        },
        buildingInfoCard: buildingInfoCard
      }
    }
  }
};
exports.default = screenConfig;