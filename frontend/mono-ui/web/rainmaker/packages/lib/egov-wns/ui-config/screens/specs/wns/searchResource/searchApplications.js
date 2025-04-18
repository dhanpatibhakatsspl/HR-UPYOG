"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApplications = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApplications = exports.searchApplications = (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelKey: "WS_SEARCH_APPLICATION_SUB_HEADER"
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelKey: "WS_HOME_SEARCH_RESULTS_DESC"
  }),
  wnsApplicationSearch: (0, _utils.getCommonContainer)({
    consumerNo: (0, _utils.getTextField)({
      label: {
        labelKey: "WS_HOME_SEARCH_RESULTS_CONSUMER_NO_LABEL"
      },
      placeholder: {
        labelKey: "WS_HOME_SEARCH_RESULTS_CONSUMER_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: (0, _utils.getPattern)("consumerNo"),
      errorMessage: "ERR_INVALID_CONSUMER_NO",
      jsonPath: "searchScreen.connectionNumber"
    }),
    applicationNo: (0, _utils.getTextField)({
      label: {
        labelKey: "WS_ACK_COMMON_APP_NO_LABEL"
      },
      placeholder: {
        labelKey: "WS_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-_/]*$/i,
      errorMessage: "ERR_INVALID_APPLICATION_NO",
      jsonPath: "searchScreen.applicationNumber"
    }),

    ownerMobNo: (0, _utils.getTextField)({
      label: {
        labelKey: "WS_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelKey: "WS_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
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
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.mobileNumber"
    }),
    applicationType: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      jsonPath: "searchScreen.applicationType",
      localePrefix: {
        moduleName: "WS",
        masterName: "APPLICATION_TYPE"
      },
      props: {
        className: "autocomplete-dropdown",
        style: {
          width: "100%",
          cursor: "pointer",
          zIndex: 2000
        },
        label: { labelName: "To Date", labelKey: "WS_APPLICATION_TYPE_LABEL" },
        placeholder: { labelName: "Select to Date", labelKey: "WS_COMMON_APPLICATION_TYPE_PLACEHOLDER" },
        sourceJsonPath: "applyScreenMdmsData.searchScreen.applicationType",
        jsonPath: "searchScreen.applicationType",
        required: false,
        isClearable: true,
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        inputLabelProps: {
          shrink: true
        },
        localePrefix: {
          moduleName: "WS",
          masterName: "APPLICATION_TYPE"
        }
      },
      required: false,
      gridDefination: { xs: 12, sm: 4 },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (action.value === "NEW WATER CONNECTION" || action.value === "NEW SEWERAGE CONNECTION") {
                    dispatch((0, _actions.prepareFinalObject)("appTypewithAppStatus", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.searchScreen.applicationStatusNew")));
                  } else if (action.value === "MODIFY WATER CONNECTION" || action.value === "MODIFY SEWERAGE CONNECTION") {
                    dispatch((0, _actions.prepareFinalObject)("appTypewithAppStatus", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.searchScreen.applicationStatusModify")));
                  }

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    applicationstatus: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      jsonPath: "searchScreen.applicationStatus",
      props: {
        className: "autocomplete-dropdown",
        label: {
          labelKey: "WS_HOME_SEARCH_RESULTS_APP_STATUS_LABEL",
          labelName: "Status"
        },
        placeholder: {
          labelKey: "WS_HOME_SEARCH_RESULTS_APP_STATUS_PLACEHOLDER",
          labelName: "Select Placeholder"
        },
        required: false,
        isClearable: true,
        labelsFromLocalisation: true,
        jsonPath: "searchScreen.applicationStatus",
        sourceJsonPath: "appTypewithAppStatus"
      },
      required: false,
      gridDefination: { xs: 12, sm: 4 }
    },

    fromDate: (0, _utils.getDateField)({
      label: { labelName: "From Date", labelKey: "WS_COMMON_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "Select From Date",
        labelKey: "WS_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: (0, _utils.getPattern)("Date"),
      errorMessage: "ERR_INVALID_DATE"
    }),

    toDate: (0, _utils.getDateField)({
      label: { labelName: "To Date", labelKey: "WS_COMMON_TO_DATE_LABEL" },
      placeholder: {
        labelName: "Select to Date",
        labelKey: "WS_COMMON_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: (0, _utils.getPattern)("Date"),
      errorMessage: "ERR_INVALID_DATE",
      required: false
    })
  }),

  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      resetButton: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 6 },
        props: {
          variant: "outlined",
          style: {
            color: "rgba(0, 0, 0, 0.6000000238418579)",
            borderColor: "rgba(0, 0, 0, 0.6000000238418579)",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: { buttonLabel: (0, _utils.getLabel)({ labelKey: "WS_SEARCH_CONNECTION_RESET_BUTTON" }) },
        onClickDefination: {
          action: "condition",
          callBack: _utils2.resetFieldsForApplication
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 6 },
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
        children: { buttonLabel: (0, _utils.getLabel)({ labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON" }) },
        onClickDefination: {
          action: "condition",
          callBack: _functions.searchApiCall
        }
      }
    })
  })
});