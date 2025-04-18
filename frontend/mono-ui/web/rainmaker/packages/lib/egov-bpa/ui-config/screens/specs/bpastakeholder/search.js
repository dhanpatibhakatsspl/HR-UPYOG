"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _tradeLicenseApplication = require("./searchResource/tradeLicenseApplication");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _pendingApprovals = require("./searchResource/pendingApprovals");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _searchResults = require("./searchResource/searchResults");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
// import { progressStatus } from "./searchResource/progressStatus";

var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var pageResetAndChange = function pageResetAndChange(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("Licenses", [{ licenseType: "PERMANENT" }]));
  dispatch((0, _actions2.prepareFinalObject)("LicensesTemp", []));
  dispatch((0, _actions.setRoute)("/tradelicence/apply"));
};

var header = (0, _utils.getCommonHeader)({
  labelName: "Stakeholder Registraton",
  labelKey: "BPA_COMMON_TITLE"
});
var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
    var data = (0, _find2.default)(businessServiceData, { businessService: "ARCHITECT" });

    var _ref = data || [],
        states = _ref.states;

    if (states && states.length > 0) {
      var status = states.map(function (item, index) {
        return {
          code: item.state
        };
      });
      dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.searchScreen.status", status.filter(function (item) {
        return item.code != null;
      })));
    }

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
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
            // newApplicationButton: {
            //   componentPath: "Button",
            //   gridDefination: {
            //     xs: 12,
            //     sm: 6,
            //     align: "right"
            //   },
            //   visible: enableButton,
            //   props: {
            //     variant: "contained",
            //     color: "primary",
            //     style: {
            //       color: "white",
            //       borderRadius: "2px",
            //       width: "250px",
            //       height: "48px"
            //     }
            //   },

            //   children: {
            //     plusIconInsideButton: {
            //       uiFramework: "custom-atoms",
            //       componentPath: "Icon",
            //       props: {
            //         iconName: "add",
            //         style: {
            //           fontSize: "24px"
            //         }
            //       }
            //     },

            //     buttonLabel: getLabel({
            //       labelName: "NEW APPLICATION",
            //       labelKey: "TL_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
            //     })
            //   },
            //   onClickDefination: {
            //     action: "condition",
            //     callBack: (state, dispatch) => {
            //       pageResetAndChange(state, dispatch);
            //     }
            //   },
            //   roleDefination: {
            //     rolePath: "user-info.roles",
            //     path : "tradelicence/apply"

            //   }
            // }
          }
        },
        pendingApprovals: _pendingApprovals.pendingApprovals,
        tradeLicenseApplication: _tradeLicenseApplication.tradeLicenseApplication,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = tradeLicenseSearchAndResult;