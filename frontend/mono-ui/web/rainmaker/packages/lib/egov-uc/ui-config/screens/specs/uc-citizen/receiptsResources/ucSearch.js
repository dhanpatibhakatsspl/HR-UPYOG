"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UCSearchCard = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _function = require("./function");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
//const hasApproval = getQueryArg(window.location.href, "hasApproval");
var enableButton = true;
//enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

var resetFields = function resetFields(state, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.receiptNumber", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.serviceType", "props.value", ""));
  var userName = JSON.parse((0, _localStorageUtils.getUserInfo)()).userName;
  dispatch((0, _actions.prepareFinalObject)("ucSearchScreen.mobileNumber", userName));
  // dispatch(
  //   handleField(
  //     "search",
  //     "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.mobileNo",
  //     "props.value",
  //     ""
  //   )
  // );
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.fromDate", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.toDate", "props.value", ""));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.consumerCodes", "props.value", ""));
};

var UCSearchCard = exports.UCSearchCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Search Receipt",
    labelKey: "UC_SEARCH_COMMON_HEADER"
  }),
  subheader: (0, _utils.getCommonSubHeader)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "UC_SEARCH_COMMON_SUB_HEADER"
  }),
  searchContainer: (0, _utils.getCommonContainer)({
    receiptNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Receipt Number.",
        labelKey: "UC_RECEPIT_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Receipt No.",
        labelKey: "UC_ENTER_RECEPIT_NO_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "ucSearchScreen.receiptNumbers",
      // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    serviceType: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-uc",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Service Category",
          labelKey: "UC_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select Service Category",
          labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },
        className: "autocomplete-dropdown",
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        sourceJsonPath: "applyScreenMdmsData.serviceCategories",
        jsonPath: "searchScreenMdmsData.businessServiceSelected"
      },
      required: true,
      jsonPath: "searchScreenMdmsData.businessServiceSelected",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var serviceCategory, selectedCategory, serviceTypes;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  serviceCategory = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.serviceCategories");
                  selectedCategory = serviceCategory.find(function (item) {
                    return item.code === action.value;
                  });
                  serviceTypes = selectedCategory && (selectedCategory.child && selectedCategory.child.length > 0 ? selectedCategory.child.map(function (item) {
                    return item.code;
                  }) : selectedCategory.code);

                  dispatch((0, _actions.prepareFinalObject)("ucSearchScreen.businessServices", serviceTypes));
                  return _context.abrupt("return", action);

                case 5:
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
    consumerCodes: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Code",
        labelKey: "ABG_PT_CONSUMER_CODE_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Code",
        labelKey: "ABG_PT_CONSUMER_CODE_LABEL_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "ucSearchScreen.consumerCodes",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    mobileNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No.",
        labelKey: "UC_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile NO.",
        labelKey: "UC_MOBILE_NO_PLACEHOLDER"
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
      props: {
        disabled: true
      },
      pattern: (0, _utils.getPattern)("MobileNo"),
      errorMessage: "Invalid Mobile No..",
      jsonPath: "ucSearchScreen.mobileNumber"
    }),

    fromDate: (0, _utils.getDateField)({
      label: {
        labelName: "From Date",
        labelKey: "UC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter From Date",
        labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
      },
      visible: false,
      required: false,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "ucSearchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    toDate: (0, _utils.getDateField)({
      label: {
        labelName: "To Date",
        labelKey: "UC_TO_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter From Date",
        labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
      },
      visible: false,
      required: false,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "ucSearchScreen.toDate",

      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  }),

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
          labelName: "RESET",
          labelKey: "UC_RESET_BUTTON"
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
          labelKey: "UC_SEARCH_BUTTON"
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
  })
}, {
  style: { overflow: "visible" }
});