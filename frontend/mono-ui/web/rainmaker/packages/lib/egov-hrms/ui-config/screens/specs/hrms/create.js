"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _lodash = require("lodash");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

require("../../../../index.css");

var _uiUtils = require("../../../../ui-utils");

var _assignmentDetails = require("./createResource/assignment-details");

var _employeeDetails = require("./createResource/employee-details");

var _footer = require("./createResource/footer");

var _jurisdictionDetails = require("./createResource/jurisdiction-details");

var _otherDetails = require("./createResource/other-details");

var _serviceDetails = require("./createResource/service-details");

var _employeeReview = require("./viewResource/employee-review");

var _functions = require("./viewResource/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Employee Details", labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER" }, {
  labelName: "Jurisdiction & Assignment Details",
  labelKey: "HR_DETAILS_HEADER"
},
// { labelName: "Assignment Details", labelKey: "HR_ASSIGN_DET_HEADER" },
{ labelName: "Summary", labelKey: "HR_SUMMARY_DETAILS" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);
// export const queryValue = getQueryArg(
//   window.location.href,
//   "applicationNumber"
// );

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Create New Employee",
    labelKey: "HR_COMMON_CREATE_EMPLOYEE_HEADER"
  })
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    employeeDetails: _employeeDetails.employeeDetails,
    professionalDetails: _employeeDetails.professionalDetails
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    jurisdictionDetails: _jurisdictionDetails.jurisdictionDetails,
    assignmentDetails: _assignmentDetails.assignmentDetails
  },
  visible: false
};

// export const formwizardThirdStep = {
//   uiFramework: "custom-atoms",
//   componentPath: "Form",
//   props: {
//     id: "apply_form3"
//   },
//   children: {
//     assignmentDetails
//   },
//   visible: false
// };
var reviewDetails = (0, _employeeReview.employeeReviewDetails)(true);
var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",

  props: {
    id: "apply_form3"
  },
  children: {
    reviewDetails: reviewDetails
  },
  visible: false
};

// export const formwizardFifthStep = {
//   uiFramework: "custom-atoms",
//   componentPath: "Form",
//   props: {
//     id: "apply_form5"
//   },
//   children: {
//     otherDetails
//   },
//   visible: false
// };

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, tenantId) {
    var mdmsBody, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "Department",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "Designation",
                    filter: "[?(@.active == true)]"
                  }]
                }, {
                  moduleName: "ACCESSCONTROL-ROLES",
                  masterDetails: [{
                    name: "roles",
                    filter: "$.[?(@.code!='CITIZEN')]"
                  }]
                }, {
                  moduleName: "egov-location",
                  masterDetails: [{
                    name: "TenantBoundary"
                    // filter: "$.*.hierarchyType"
                  }]
                }, {
                  moduleName: "egov-hrms",
                  masterDetails: [{
                    name: "Degree",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "EmployeeStatus",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "EmployeeType",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "DeactivationReason",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "EmploymentTest",
                    filter: "[?(@.active == true)]"
                  }, {
                    name: "Specalization",
                    filter: "[?(@.active == true)]"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{ name: "tenants" }]
                }]
              }
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData", (0, _get2.default)(response, "MdmsRes")));
            setRolesList(state, dispatch);
            setHierarchyList(state, dispatch);
            return _context.abrupt("return", true);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getYearsList = function getYearsList(startYear, state, dispatch) {
  var currentYear = new Date().getFullYear(),
      years = [];
  startYear = startYear || 1980;

  while (startYear <= currentYear) {
    var yearNumbers = startYear++;
    years.push({ code: yearNumbers.toString(), name: yearNumbers.toString() });
  }

  dispatch((0, _actions.prepareFinalObject)("yearsList", years));
};

var setRolesList = function setRolesList(state, dispatch) {
  var rolesList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.ACCESSCONTROL-ROLES.roles", []);
  var furnishedRolesList = rolesList.filter(function (item) {
    return item.code;
  });
  dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData.furnishedRolesList", furnishedRolesList));
};

var setHierarchyList = function setHierarchyList(state, dispatch) {
  var tenantBoundary = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary", []);
  var hierarchyList = (0, _map2.default)(tenantBoundary, "hierarchyType", []);
  dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData.hierarchyList", hierarchyList));
};

var freezeEmployedStatus = function freezeEmployedStatus(state, dispatch) {
  var employeeStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].employeeStatus");
  if (!employeeStatus) {
    dispatch((0, _actions.prepareFinalObject)("Employee[0].employeeStatus", "EMPLOYED"));
  }
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "create",
  // hasBeforeInitAsync:true,
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("empPhoneNumber", ""));
    var pickedTenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    pickedTenant && dispatch((0, _actions.prepareFinalObject)("Employee[0].tenantId", pickedTenant));
    var empTenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].tenantId");
    (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardFirstStep.children.professionalDetails.children.cardContent.children.employeeDetailsContainer.children.employeeId.props.disabled", false);

    var tenantId = pickedTenant || empTenantId || (0, _localStorageUtils.getTenantId)();
    var mdmsDataStatus = getMdmsData(state, dispatch, tenantId);
    var employeeCode = (0, _commons.getQueryArg)(window.location.href, "employeeCode");
    employeeCode && (0, _functions.getEmployeeData)(state, dispatch, employeeCode, tenantId);
    getYearsList(1950, state, dispatch);
    freezeEmployedStatus(state, dispatch);
    // if (mdmsDataStatus) {
    //   setHierarchyList(state, dispatch);
    // }
    //   dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    //   dispatch(prepareFinalObject("LicensesTemp", []));
    //   // getData(action, state, dispatch);
    //   getData(action, state, dispatch).then(responseAction => {
    //     const queryObj = [{ key: "tenantId", value: tenantId }];
    //     getBoundaryData(action, state, dispatch, queryObj);
    //     let props = get(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
    //       {}
    //     );
    //     props.value = tenantId;
    //     props.disabled = true;
    //     set(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
    //       props
    //     );
    //     dispatch(
    //       prepareFinalObject(
    //         "Licenses[0].tradeLicenseDetail.address.city",
    //         tenantId
    //       )
    //     );
    //     //hardcoding license type to permanent
    //     set(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLicenseType.props.value",
    //       "PERMANENT"
    //     );
    //   });

    var step = (0, _commons.getQueryArg)(window.location.href, "step");
    if (step && Number(step) > 0) {
      (0, _lodash.set)(action.screenConfig, "components.div.children.stepper.props.activeStep", Number(step));
      (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardFifthStep.visible", step == '4' ? true : false);
      (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardFourthStep.visible", step == '3' ? true : false);
      (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardThirdStep.visible", step == '2' ? true : false);
      (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardSecondStep.visible", step == '1' ? true : false);
      (0, _lodash.set)(action.screenConfig, "components.div.children.formwizardFirstStep.visible", step == '0' ? true : false);
    }
    dispatch((0, _actions.prepareFinalObject)("existingPhoneNumbers", []));
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        stepper: stepper,
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        // formwizardFourthStep,
        // formwizardFifthStep,
        footer: _footer.footer
      }
      // breakUpDialog: {
      //   uiFramework: "custom-containers-local",
      //   componentPath: "ViewBreakupContainer",
      //   props: {
      //     open: false,
      //     maxWidth: "md",
      //     screenKey: "apply"
      //   }
      // }
    } }
};

exports.default = screenConfig;