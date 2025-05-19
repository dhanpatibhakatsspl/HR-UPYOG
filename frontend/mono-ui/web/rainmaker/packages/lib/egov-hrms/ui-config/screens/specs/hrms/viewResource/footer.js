"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hrViewFooter = exports.hrCommonFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../../utils");

var _functions = require("./functions");

var routeTo = function routeTo(link) {
  var moduleName = process.env.REACT_APP_NAME === "Citizen" ? '/citizen' : '/employee';
  window.location.href = process.env.NODE_ENV === "production" ? moduleName + link : link;
};
var gotoCreateFlow = function gotoCreateFlow(state, dispatch) {
  var employeeCode = (0, _commons.getQueryArg)(window.location.href, "employeeID");
  var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
  var createUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/create?employeeCode=" + employeeCode + "&tenantId=" + tenantId : "/hrms/create?employeeCode=" + employeeCode + "&tenantId=" + tenantId;
  routeTo(createUrl);
};

var getCommonCreateFooter = function getCommonCreateFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var hrCommonFooter = exports.hrCommonFooter = function hrCommonFooter() {
  return getCommonCreateFooter({
    submitButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        submitButtonLabel: (0, _utils.getLabel)({
          labelName: "SUBMIT",
          labelKey: "HR_SUBMIT_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: _functions.handleCreateUpdateEmployee
      }
    }
  });
};

var hrViewFooter = exports.hrViewFooter = function hrViewFooter() {
  return getCommonCreateFooter({
    deactivateEmployee: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        deactivateEmployeeButtonLabel: (0, _utils.getLabel)({
          labelName: "DEACTIVATE EMPLOYEE",
          labelKey: "HR_DEACTIVATE_EMPLOYEE_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: _utils2.showHideAdhocPopup
      }
    },
    activateEmployee: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        activateEmployeeButtonLabel: (0, _utils.getLabel)({
          labelName: "ACTIVATE EMPLOYEE",
          labelKey: "HR_ACTIVATE_EMPLOYEE_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: _utils2.showHideAdhocPopup
      },

      visible: false
    },
    editDetails: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        editDetailsButtonLabel: (0, _utils.getLabel)({
          labelName: "EDIT DETAILS",
          labelKey: "HR_EDIT_DETAILS_LABEL"
        }),
        editDetailsButtonIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "keyboard_arrow_right"
          }
        }
      },
      onClickDefination: {
        action: "condition",
        callBack: gotoCreateFlow
      }
    }
  });
};