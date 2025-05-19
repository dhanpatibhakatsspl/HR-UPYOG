"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _citizenFunctions = require("./citizenSearchResource/citizenFunctions");

var _citypicker = require("./citypicker");

var _utils2 = require("../utils");

var _FormIcon = require("../../../../ui-atoms-local/Icons/FormIcon");

var _FormIcon2 = _interopRequireDefault(_FormIcon);

var _BPAStakeholderRegIcon = require("../../../../ui-atoms-local/Icons/BPAStakeholderRegIcon");

var _BPAStakeholderRegIcon2 = _interopRequireDefault(_BPAStakeholderRegIcon);

var _BPANewPermitIcon = require("../../../../ui-atoms-local/Icons/BPANewPermitIcon");

var _BPANewPermitIcon2 = _interopRequireDefault(_BPANewPermitIcon);

var _commons = require("../../../../ui-utils/commons");

require("../utils/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Building Plan Approval",
  labelKey: "BPA_CITIZEN_COMMON_TITLE"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var stakeHolderRoles = (0, _commons.getStakeHolderRoles)();

var hideBPACard = function hideBPACard() {
  return (0, _utils2.ifUserRoleMatches)(stakeHolderRoles);
};

var displayView = function displayView() {
  return hideBPACard() ? "my-applications" : "my-applications-stakeholder";
};

var cardItems = [{
  label: {
    labelKey: "BPA_COMMON_APPL_NEW_LICENSE",
    labelName: "Register Technical Person/Builder"
  },
  icon: _react2.default.createElement(_BPAStakeholderRegIcon2.default, null),
  route: "apply"
}, {
  label: {
    labelKey: "BPA_COMMON_APPL_NEW_CONSTRUCTION",
    labelName: "Building Permit New Construction"
  },
  hide: hideBPACard(),
  icon: _react2.default.createElement(_BPANewPermitIcon2.default, null),
  route: {
    screenKey: "home",
    jsonPath: "components.cityPickerDialog",
    value: "apply"
  }
}, {
  label: {
    labelKey: "BPA_OC_COMMON_APPL_NEW_CONSTRUCTION",
    labelName: "Occupancy Certificate New Building Construction"
  },
  hide: hideBPACard(),
  icon: _react2.default.createElement(_BPANewPermitIcon2.default, null),
  route: {
    screenKey: "home",
    jsonPath: "components.cityPickerDialogForOC"
  }
}, {
  label: {
    labelKey: "BPA_MY_APPLICATIONS",
    labelName: "My Applications"
  },
  icon: _react2.default.createElement(_FormIcon2.default, null),
  route: displayView()
}];

var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _citizenFunctions.fetchData)(action, state, dispatch);
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
          // listCard: {
          //   uiFramework: "custom-molecules-local",
          //   moduleName: "egov-tradelicence",
          //   componentPath: "HowItWorks"
          // }
        } }
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
    cityPickerDialogForOC: {
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
            }
          },
          children: {
            popup: _citypicker.cityPicker
          }
        }
      }
    }
  }
};

exports.default = tradeLicenseSearchAndResult;