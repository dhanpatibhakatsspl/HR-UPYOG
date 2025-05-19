"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _gotoHomeFooter = require("./acknowledgementResource/gotoHomeFooter");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _functions = require("./functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, tenant, reporturl, edcrnumber) {
  var headerrow = {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: { display: "flex", alignItems: "flex-start" }
    },
    children: {
      header1: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "New Building Plan Scrutiny",
          labelKey: "EDCR_ACKNOWLEDGEMENT_COMMON_CARD"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }, {
        style: { display: "flex" }
      }),
      buttons: (0, _acknowledgementUtils.downloadPrintContainer)(reporturl)
    }
  };
  if (purpose === "apply" && status === "success") {
    return {
      headerrow: headerrow,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          // style: {
          //   position: "absolute",
          //   width: "95%"
          // }
        },
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Building plan eDCR scrutiny is Accepted",
              labelKey: "EDCR_ACKNOWLEDGEMENT_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "This plan can now be used for creating permit application",
              labelKey: "EDCR_ACKNOWLEDGEMENT_SUCCESS_COMMENT"
            },
            tailText: {
              labelName: "Building Plan Scrutiny Number",
              labelKey: "EDCR_NUMBER_LABEL"
            },
            number: edcrnumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "apply" && status === "rejected") {
    return {
      headerrow: headerrow,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Building plan eDCR is Not Accepted",
              labelKey: "EDCR_REJECTION_MESSAGE"
            },
            body: {
              labelName: "Please make corrections in the diagram and try again",
              labelKey: "EDCR_REJECTION_COMMENT"
            }
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose == "apply" && status == "aborted") {
    return {
      headerrow: headerrow,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Building plan eDCR is Aborted",
              labelKey: "EDCR_ABORTED_MESSAGE"
            },
            body: {
              labelName: "The uploaded plan is not drawn as per the standard's , please check the layers and colour coding standards and try again",
              labelKey: "EDCR_ABORTED_COMMENT"
            }
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "ocapply" && status === "success") {
    return {
      headerrow: headerrow,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Occupancy Certificate eDCR Scrutiny is Accepted",
              labelKey: "EDCR_OC_ACKNOWLEDGEMENT_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "This plan can now be used for creating oc permit application",
              labelKey: "EDCR_OC_ACKNOWLEDGEMENT_SUCCESS_COMMENT"
            },
            tailText: {
              labelName: "OC Plan Number",
              labelKey: "EDCR_OC_NUMBER_LABEL"
            },
            number: edcrnumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "ocapply" && status === "rejected") {
    return {
      headerrow: headerrow,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Occupancy Certificate eDCR is Not Accepted",
              labelKey: "EDCR_OC_REJECTION_MESSAGE"
            },
            body: {
              labelName: "Please make corrections in the diagram and try again",
              labelKey: "EDCR_OC_REJECTION_COMMENT"
            }
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose == "ocapply" && status == "aborted") {
    return {
      headerrow: headerrow,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Occupancy Certificate eDCR is Aborted",
              labelKey: "EDCR_OC_ABORTED_MESSAGE"
            },
            body: {
              labelName: "The uploaded plan is not drawn as per the standard's , please check the layers and colour coding standards and try again",
              labelKey: "EDCR_OC_ABORTED_COMMENT"
            }
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  }
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");

    (0, _functions.getSearchResultsfromEDCRWithApplcationNo)(applicationNumber, tenant).then(function (response) {
      if (response.data.edcrDetail.length > 0) {
        var data = getAcknowledgementCard(state, dispatch, purpose, status, response.data.edcrDetail[0].applicationNumber, tenant, response.data.edcrDetail[0].planReport, response.data.edcrDetail[0].edcrNumber);
        (0, _set2.default)(action, "screenConfig.components.div.children", data);
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div", "children", data));
        if (purpose == "ocapply" && status == "success") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.ocCreateApp", "visible", true));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.bpaCreateApp", "visible", false));
        } else if (purpose == "apply" && status == "success") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.bpaCreateApp", "visible", true));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.ocCreateApp", "visible", false));
        } else {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.ocCreateApp", "visible", false));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.bpaCreateApp", "visible", false));
        }
      }
    }).catch(function (error) {
      console.error("error while searching " + error.message);
    });
    return action;
  }
};

exports.default = screenConfig;