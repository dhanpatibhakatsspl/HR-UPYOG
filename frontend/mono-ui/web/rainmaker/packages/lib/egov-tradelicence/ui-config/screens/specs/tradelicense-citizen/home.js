"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _citizenFunctions = require("./citizenSearchResource/citizenFunctions");

var _citypicker = require("./citypicker");

var _FormIcon = require("../../../../ui-atoms-local/Icons/FormIcon");

var _FormIcon2 = _interopRequireDefault(_FormIcon);

var _TradeLicenseIcon = require("../../../../ui-atoms-local/Icons/TradeLicenseIcon");

var _TradeLicenseIcon2 = _interopRequireDefault(_TradeLicenseIcon);

require("../utils/index.css");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Trade License",
  labelKey: "TL_COMMON_TL"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var cardItems = [{
  label: {
    labelKey: "TL_APPLY_TRADELICENSE",
    labelName: "Apply for Trade License"
  },
  icon: _react2.default.createElement(_TradeLicenseIcon2.default, null),
  route: {
    screenKey: "home",
    jsonPath: "components.cityPickerDialog"
  }
}, {
  label: {
    labelKey: "TL_MY_APPLICATIONS",
    labelName: "My Applications"
  },
  icon: _react2.default.createElement(_FormIcon2.default, null),
  route: "my-applications"
}];

var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)('citiesByModule.citizenTenantId', ''));
    (0, _citizenFunctions.fetchData)(action, state, dispatch);
    var moduleDetails = [{
      moduleName: 'TradeLicense',
      masterDetails: [{ name: 'Documents' }]
    }];
    (0, _commons.getRequiredDocData)(action, dispatch, moduleDetails, state);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      // props: {
      //   className: "common-div-css"
      // },
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        listCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-tradelicence",
          componentPath: "HowItWorks"
        }
      }
    },
    // div: {
    //   uiFramework: "custom-atoms",
    //   componentPath: "Div",
    //   props: {
    //     className: "common-div-css"
    //   },
    //   children: {
    //     header: header,
    //     applyCard: {
    //       uiFramework: "custom-atoms",
    //       componentPath: "Div",
    //       children: {
    //         card: getCommonCard({
    //           applicationSuccessContainer: getCommonContainer({
    //             icon: {
    //               uiFramework: "custom-atoms",
    //               componentPath: "Icon",
    //               props: {
    //                 iconName: "book",
    //                 variant: "outlined",
    //                 style: {
    //                   fontSize: "110px",
    //                   width: 120,
    //                   height: 100,
    //                   color: "rgba(0, 0, 0, 0.6)",
    //                   marginLeft: -22
    //                 },
    //                 iconSize: "110px"
    //               }
    //             },
    //             body: {
    //               uiFramework: "custom-atoms",
    //               componentPath: "Div",
    //               children: {
    //                 header: getCommonHeader({
    //                   labelName: "Apply for New Trade License",
    //                   labelKey: "TL_COMMON_APPL_NEW_LIC"
    //                 }),
    //                 break: getBreak(),
    //                 applyButton: {
    //                   componentPath: "Button",
    //                   props: {
    //                     variant: "contained",
    //                     color: "primary",
    //                     style: {
    //                       width: "200px",
    //                       height: "48px",
    //                       marginRight: "40px"
    //                     }
    //                   },
    //                   children: {
    //                     collectPaymentButtonLabel: getLabel({
    //                       labelName: "APPLY",
    //                       labelKey: "TL_APPLY"
    //                     })
    //                   },
    //                   onClickDefination: {
    //                     action: "condition",
    //                     callBack: showCityPicker
    //                   },
    //                   roleDefination: {
    //                     rolePath: "user-info.roles",
    //                     roles: ["CITIZEN"]
    //                   }
    //                 }
    //               }
    //             }
    //           })
    //         }),
    //         break: getBreak(),
    //         searchResults: searchResults
    //       }
    //     }
    //   }
    // },
    cityPickerDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "md"
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
              // style: { minHeight: "180px", minWidth: "365px" }
            } },
          children: {
            popup: _citypicker.cityPicker
          }
        }
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "home"
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = tradeLicenseSearchAndResult;