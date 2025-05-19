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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var goToHome = (0, _gotoHomeFooter.gotoHomeFooter)();

var goToInbox = (0, _gotoHomeFooter.gotoInboxFooter)();

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant) {
  if (purpose === "create" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Create New Employee",
          labelKey: "HR_COMMON_CREATE_EMPLOYEE_HEADER"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          disabled: {
            uiFramework: "custom-atoms-local",
            componentPath: "DisableBackComponent",
            moduleName: "egov-hrms"
          },
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Created Successfully",
              labelKey: "HR_CREATE_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "A notification has been sent to the created Employee at registered Mobile No.",
              labelKey: "HR_CREATE_SUCCESS_SUBHEADER"
            },
            tailText: {
              labelName: "Employee ID",
              labelKey: "HR_EMP_ID_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      goToHome: goToHome
    };
  } else if (purpose === "update" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Update Employee",
          labelKey: "HR_COMMON_UPDATE_EMPLOYEE_HEADER"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          disabled: {
            uiFramework: "custom-atoms-local",
            componentPath: "DisableBackComponent",
            moduleName: "egov-hrms"
          },
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Updated Successfully",
              labelKey: "HR_UPDATE_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "A notification has been sent to the Employee at registered Mobile No.",
              labelKey: "HR_UPDATE_SUCCESS_SUBHEADER"
            },
            tailText: {
              labelName: "Employee ID",
              labelKey: "HR_EMP_ID_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      goToHome: goToHome
    };
  } else if (purpose === "updatepassword" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Update Employee",
          labelKey: "HR_COMMON_UPDATE_EMPLOYEE_HEADER"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          disabled: {
            uiFramework: "custom-atoms-local",
            componentPath: "DisableBackComponent",
            moduleName: "egov-hrms"
          },
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Updated Successfully",
              labelKey: "HR_UPDATE_PASSWORD_SUCCESS_MESSAGE"
            }
          })
        }
      },
      goToInbox: goToInbox
    };
  } else if (purpose === "deactivate" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Deactivated Employee",
          labelKey: "HR_COMMON_DEACTIVATED_EMPLOYEE_HEADER"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",

        children: {
          disabled: {
            uiFramework: "custom-atoms-local",
            componentPath: "DisableBackComponent",
            moduleName: "egov-hrms"
          },

          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Deactivated Successfully",
              labelKey: "HR_DEACTIVATE_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "A notification has been sent to the Employee at registered Mobile No.",
              labelKey: "HR_DEACTIVATE_SUCCESS_SUBHEADER"
            },
            tailText: {
              labelName: "Employee ID",
              labelKey: "HR_EMP_ID_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      goToHome: goToHome
    };
  } else if (purpose === "activate" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Deactivated Employee",
          labelKey: "HR_COMMON_REACTIVATED_EMPLOYEE_HEADER"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",

        children: {
          disabled: {
            uiFramework: "custom-atoms-local",
            componentPath: "DisableBackComponent",
            moduleName: "egov-hrms"
          },

          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Deactivated Successfully",
              labelKey: "HR_RACTIVATE_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "A notification has been sent to the Employee at registered Mobile No.",
              labelKey: "HR_REACTIVATE_SUCCESS_SUBHEADER"
            },
            tailText: {
              labelName: "Employee ID",
              labelKey: "HR_EMP_ID_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      goToHome: goToHome
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
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;