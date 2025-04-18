"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.handleCreateUpdateEmployee = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.callBackForNext = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

var _functions = require("../viewResource/functions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveToReview = function moveToReview(dispatch) {
  var reviewUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/review" : "/hrms/review";
  dispatch((0, _actions.setRoute)(reviewUrl));
};

var callBackForNext = exports.callBackForNext = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var activeStep, isFormValid, isEmployeeDetailsValid, isProfessionalDetailsValid, tenantId, errorMessage, existingPhoneNumbers, queryObject, response, jurisdictionDetailsPath, jurisdictionDetailsItems, isJurisdictionDetailsValid, j, assignmentDetailsPath, assignmentDetailsItems, isAssignmentDetailsValid, assignmentsData, atLeastOneCurrentAssignmentSelected, _errorMessage, assignmentInvalid, errorMessage1, jurisdictions, deletedJurisdictions, deletedJurisdiction, rolesList, baseTenant, repeatedTenant, tenants, errorMessage2, errorMessage3, _errorMessage2;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["create"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;

            if (!(activeStep === 0)) {
              _context.next = 36;
              break;
            }

            isEmployeeDetailsValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.employeeDetails.children.cardContent.children.employeeDetailsContainer.children", state, dispatch, "create");
            isProfessionalDetailsValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.professionalDetails.children.cardContent.children.employeeDetailsContainer.children", state, dispatch, "create");

            if (!(isEmployeeDetailsValid && isProfessionalDetailsValid)) {
              isFormValid = false;
            }
            tenantId = (0, _localStorageUtils.getTenantId)();
            errorMessage = {
              labelName: "Mobile number already exists . Please try with different mobile number",
              labelKey: "ERR_MOBILE_NUMBER_EXISTS_FIELDS"
            };
            existingPhoneNumbers = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "existingPhoneNumbers", []);

            if (!((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "empPhoneNumber") != (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber"))) {
              _context.next = 35;
              break;
            }

            if (!existingPhoneNumbers.includes((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber"))) {
              _context.next = 15;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "error"));
            return _context.abrupt("return");

          case 15:
            dispatch((0, _actions2.showSpinner)());
            _context.prev = 16;
            queryObject = [{
              key: "phone",
              value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber")
            }, {
              key: "tenantId",
              value: tenantId
            }];
            _context.next = 20;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_search", "", queryObject);

          case 20:
            response = _context.sent;

            dispatch((0, _actions2.hideSpinner)());

            if (!(response && response.Employees && response.Employees.length == 0)) {
              _context.next = 25;
              break;
            }

            _context.next = 28;
            break;

          case 25:
            dispatch((0, _actions2.prepareFinalObject)("existingPhoneNumbers", [].concat((0, _toConsumableArray3.default)(existingPhoneNumbers), [(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber")])));

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "error"));
            return _context.abrupt("return");

          case 28:
            _context.next = 35;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](16);

            dispatch((0, _actions2.hideSpinner)());
            dispatch((0, _actions2.toggleSnackbar)(true, (0, _extends3.default)({}, errorMessage, { labelKey: 'HRMS_SEARCH_ERROR' }), "error"));
            return _context.abrupt("return");

          case 35:

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("create", "components.div.children.formwizardSecondStep.children.jurisdictionDetails.children.cardContent.children.jurisdictionDetailsCard", "props.items", []));

          case 36:
            if (!(activeStep === 1)) {
              _context.next = 85;
              break;
            }

            jurisdictionDetailsPath = "components.div.children.formwizardSecondStep.children.jurisdictionDetails.children.cardContent.children.jurisdictionDetailsCard.props.items";
            jurisdictionDetailsItems = (0, _get2.default)(state.screenConfiguration.screenConfig.create, jurisdictionDetailsPath, []);
            isJurisdictionDetailsValid = true;

            for (j = 0; j < jurisdictionDetailsItems.length; j++) {
              if ((jurisdictionDetailsItems[j].isDeleted === undefined || jurisdictionDetailsItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(jurisdictionDetailsPath + "[" + j + "].item" + j + ".children.cardContent.children.jnDetailsCardContainer.children", state, dispatch, "create")) isJurisdictionDetailsValid = false;
            }
            if (!isJurisdictionDetailsValid) {
              isFormValid = false;
            }
            assignmentDetailsPath = "components.div.children.formwizardSecondStep.children.assignmentDetails.children.cardContent.children.assignmentDetailsCard.props.items";
            assignmentDetailsItems = (0, _get2.default)(state.screenConfiguration.screenConfig.create, assignmentDetailsPath, []);
            isAssignmentDetailsValid = true;

            for (j = 0; j < assignmentDetailsItems.length; j++) {
              if ((assignmentDetailsItems[j].isDeleted === undefined || assignmentDetailsItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(assignmentDetailsPath + "[" + j + "].item" + j + ".children.cardContent.children.asmtDetailsCardContainer.children", state, dispatch, "create")) isAssignmentDetailsValid = false;
            }
            assignmentsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject.Employee[0], "assignments", []);
            atLeastOneCurrentAssignmentSelected = assignmentsData.some(function (assignment) {
              return assignment.isCurrentAssignment;
            });

            if (atLeastOneCurrentAssignmentSelected) {
              _context.next = 52;
              break;
            }

            _errorMessage = {
              labelName: "Please select at least one current assignment",
              labelKey: "ERR_SELECT_CURRENT_ASSIGNMENT"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage, "warning"));
            return _context.abrupt("return");

          case 52:
            assignmentInvalid = false;

            assignmentsData.map(function (assignment) {
              if (assignment.isCurrentAssignment) {} else if (!assignment.isCurrentAssignment && !assignment.toDate) {
                assignmentInvalid = true;
              } else if (new Date(assignment.toDate) - new Date(assignment.fromDate) < 0) {
                assignmentInvalid = true;
              }
            });

            if (!assignmentInvalid) {
              _context.next = 59;
              break;
            }

            isFormValid = false;
            errorMessage1 = {
              labelName: "Please select at least one current assignment",
              labelKey: "ERR_INAVLID_ASSIGNMENT"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage1, "warning"));
            return _context.abrupt("return");

          case 59:
            if (!isAssignmentDetailsValid) {
              isFormValid = false;
            }

            jurisdictions = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].jurisdictions", []);
            deletedJurisdictions = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "deletedJurisdiction", []);
            deletedJurisdiction = [];

            deletedJurisdiction = jurisdictions.filter(function (jurisdiction) {
              return jurisdiction.isDeleted === false && jurisdiction.isActive;
            });
            deletedJurisdiction = [].concat((0, _toConsumableArray3.default)(deletedJurisdictions), (0, _toConsumableArray3.default)(deletedJurisdiction));
            jurisdictions = jurisdictions.filter(function (jurisdiction) {
              return jurisdiction.isDeleted !== false;
            });
            rolesList = [];
            baseTenant = false;
            repeatedTenant = false;
            tenants = [];

            jurisdictions.map(function (judis) {
              judis && judis.roles && Array.isArray(judis.roles) && judis.roles.map(function (role) {
                rolesList.push((0, _extends3.default)({}, role, { tenantId: judis.boundary, code: role.value, name: role.label }));
              });
              if (judis && judis.boundary && judis.boundary == (0, _commons.getQueryArg)(window.location.href, 'tenantId')) {
                baseTenant = true;
              }
              if (judis && judis.boundary && tenants.includes(judis.boundary)) {
                repeatedTenant = true;
              }
              tenants.push(judis.boundary);
            });

            if (baseTenant) {
              _context.next = 75;
              break;
            }

            errorMessage2 = {
              labelName: "Please select at least one Role in Base Tenant",
              labelKey: "ERR_BASE_TENANT_MANDATORY"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage2, "warning"));
            return _context.abrupt("return");

          case 75:
            if (!repeatedTenant) {
              _context.next = 79;
              break;
            }

            errorMessage3 = {
              labelName: "Please select at least one Role in Base Tenant",
              labelKey: "ERR_INVALID_JURISDICTION"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage3, "warning"));
            return _context.abrupt("return");

          case 79:

            dispatch((0, _actions2.prepareFinalObject)("deletedJurisdiction", [].concat((0, _toConsumableArray3.default)(deletedJurisdiction))));

            dispatch((0, _actions2.prepareFinalObject)("Employee[0].jurisdictions", [].concat((0, _toConsumableArray3.default)(jurisdictions))));
            dispatch((0, _actions2.prepareFinalObject)("Employee[0].user.roles", rolesList));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("create", "components.div.children.formwizardThirdStep.children.reviewDetails.children.cardContent.children.viewJurisdictionDetails.children.cardContent.children.viewOne", "props.items", []));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("create", "components.div.children.formwizardSecondStep.children.jurisdictionDetails.children.cardContent.children.jurisdictionDetailsCard", "props.items", []));
            (0, _functions.setRolesList)(state, dispatch);

          case 85:
            if (activeStep === 2) {}
            if (activeStep === 4) {
              moveToReview(dispatch);
            }
            if (activeStep !== 4) {
              if (isFormValid) {
                changeStep(state, dispatch);
              } else {
                _errorMessage2 = {
                  labelName: "Please fill all fields",
                  labelKey: "ERR_FILL_ALL_FIELDS"
                };

                dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage2, "warning"));
              }
            }

          case 88:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[16, 30]]);
  }));

  return function callBackForNext(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["create"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
  } else {
    activeStep = defaultActiveStep;
  }

  var isPreviousButtonVisible = activeStep > 0 ? true : false;
  var isNextButtonVisible = activeStep < 2 ? true : false;
  var isPayButtonVisible = activeStep === 2 ? true : false;
  var actionDefination = [{
    path: "components.div.children.stepper.props",
    property: "activeStep",
    value: activeStep
  }, {
    path: "components.div.children.footer.children.previousButton",
    property: "visible",
    value: isPreviousButtonVisible
  }, {
    path: "components.div.children.footer.children.nextButton",
    property: "visible",
    value: isNextButtonVisible
  }, {
    path: "components.div.children.footer.children.payButton",
    property: "visible",
    value: isPayButtonVisible
  }];
  (0, _utils.dispatchMultipleFieldChangeAction)("create", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

var renderSteps = exports.renderSteps = function renderSteps(activeStep, dispatch) {
  switch (activeStep) {
    case 0:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardFirstStep"), dispatch);
      break;
    case 1:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardSecondStep"), dispatch);
      break;
    case 2:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardThirdStep"), dispatch);
      break;
    case 3:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardFifthStep"), dispatch);
  }
};

var getActionDefinationForStepper = exports.getActionDefinationForStepper = function getActionDefinationForStepper(path) {
  var actionDefination = [{
    path: "components.div.children.formwizardFirstStep",
    property: "visible",
    value: true
  }, {
    path: "components.div.children.formwizardSecondStep",
    property: "visible",
    value: false
  }, {
    path: "components.div.children.formwizardThirdStep",
    property: "visible",
    value: false
  }];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], {
      value: false
    });
    if (path === actionDefination[i].path) {
      actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], {
        value: true
      });
    }
  }
  return actionDefination;
};

var callBackForPrevious = exports.callBackForPrevious = function callBackForPrevious(state, dispatch) {
  changeStep(state, dispatch, "previous");
};

var handleCreateUpdateEmployee = exports.handleCreateUpdateEmployee = function handleCreateUpdateEmployee(state, dispatch) {
  var uuid = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].uuid", null);
  if (uuid) {
    (0, _functions.createUpdateEmployee)(state, dispatch, "UPDATE");
  } else {
    (0, _functions.createUpdateEmployee)(state, dispatch, "CREATE");
  }
};
var footer = exports.footer = (0, _utils2.getCommonApplyFooter)({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: "HR_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
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
      nextButtonLabel: (0, _utils.getLabel)({
        labelName: "Next Step",
        labelKey: "HR_COMMON_BUTTON_NXT_STEP"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  payButton: {
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
        labelName: "Submit",
        labelKey: "HR_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: handleCreateUpdateEmployee
    },
    visible: false
  }
});