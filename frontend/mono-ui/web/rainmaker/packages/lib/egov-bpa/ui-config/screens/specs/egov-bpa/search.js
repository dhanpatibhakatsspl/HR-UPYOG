"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _utils2 = require("../utils");

var _bpaApplication = require("./searchResource/bpaApplication");

var _pendingApprovals = require("./searchResource/pendingApprovals");

var _searchResults = require("./searchResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var header = (0, _utils.getCommonHeader)({
  labelName: "BPA",
  labelKey: "BPA_TITLE_LABEL"
});

var pageResetAndChange = function pageResetAndChange(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("BPA's", [{ "bpaDetails.bpaType": "NEW" }]));
  // dispatch(setRoute("/tradelicence/apply"));
};

var startApplyFlow = function startApplyFlow(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("BPAs", []));
  dispatch((0, _actions2.prepareFinalObject)("scrutinyDetails", {}));
  var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/citySelection" : "/egov-bpa/citySelection";
  dispatch((0, _actions.setRoute)(applyUrl));
};

var BpaSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _bpaApplication.resetFields)(state, dispatch);
    var tenantId = (0, _localStorageUtils.getTenantId)();
    var BSqueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "BPA" }];
    (0, _commons.setBusinessServiceDataToLocalStorage)(BSqueryObject, dispatch);
    var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
    var data = (0, _find2.default)(businessServiceData, { businessService: "BPA" });

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
    // getRequiredDocData(action, state, dispatch).then(() => {
    //   let documents = get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.searchScreenMdmsData.BPA.Documents",
    //     []
    //   );
    //   set(
    //     action,
    //     "screenConfig.components.adhocDialog.children.popup",
    //     // getRequiredDocuments(documents)
    //   );
    // });
    //for service and app type
    (0, _utils2.getTenantMdmsData)(action, state, dispatch);
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
            //       labelKey: "BPA_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
            //     })
            //   },
            //   onClickDefination: {
            //     action: "condition",
            //     callBack: (state, dispatch) => {
            //       showApplyCityPicker(state, dispatch)
            //     }
            //   }
            // }
          }
        },
        pendingApprovals: _pendingApprovals.pendingApprovals,
        BPAApplication: _bpaApplication.BPAApplication,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    },
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
            }
          },
          children: {
            popup: (0, _utils.getCommonContainer)({
              header: (0, _utils.getCommonHeader)({
                labelName: "Select City",
                labelKey: "BPA_SELECT_CITY"
              }),
              cityPicker: (0, _utils.getCommonContainer)({
                cityDropdown: {
                  uiFramework: "custom-containers-local",
                  moduleName: "egov-bpa",
                  componentPath: "AutosuggestContainer",
                  jsonPath: "citiesByModule.citizenTenantId",
                  required: true,
                  gridDefination: {
                    xs: 12,
                    sm: 12
                  },
                  props: {
                    style: {
                      width: "100%",
                      cursor: "pointer"
                    },
                    localePrefix: {
                      moduleName: "TENANT",
                      masterName: "TENANTS"
                    },
                    className: "citizen-city-picker",
                    label: {
                      labelName: "City",
                      labelKey: "BPA_CITY_LABEL"
                    },
                    placeholder: { labelName: "Select City", labelKey: "BPA_SELECT_CITY" },
                    jsonPath: "BPA.address.city",
                    sourceJsonPath: "citiesByModule.TL.tenants",
                    labelsFromLocalisation: true,
                    fullwidth: true,
                    required: true,
                    isClearable: true,
                    inputLabelProps: {
                      shrink: true
                    }
                  }
                },
                div: {
                  uiFramework: "custom-atoms",
                  componentPath: "Div",
                  children: {
                    selectButton: {
                      componentPath: "Button",
                      props: {
                        variant: "contained",
                        color: "primary",
                        style: {
                          width: "40px",
                          height: "20px",
                          marginRight: "4px",
                          marginTop: "16px"
                        }
                      },
                      children: {
                        previousButtonLabel: (0, _utils.getLabel)({
                          labelName: "SELECT",
                          labelKey: "BPA_CITIZEN_SELECT_BUTTON"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: _utils2.applyForm
                      }
                    },
                    cancelButton: {
                      componentPath: "Button",
                      props: {
                        variant: "outlined",
                        color: "primary",
                        style: {
                          width: "40px",
                          height: "20px",
                          marginRight: "4px",
                          marginTop: "16px"
                        }
                      },
                      children: {
                        previousButtonLabel: (0, _utils.getLabel)({
                          labelName: "CANCEL",
                          labelKey: "BPA_CITIZEN_CANCEL_BUTTON"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: _utils2.showApplyCityPicker
                      }
                    }
                  }
                }
              })
            })
          }
        }
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "search"
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = BpaSearchAndResult;