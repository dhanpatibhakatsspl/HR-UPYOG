"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployeeData = exports.createUpdateEmployee = exports.handleCreateUpdateEmployee = exports.furnishEmployeeData = exports.setRolesList = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../..//ui-utils/commons");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SET ALL SIMPLE DATES IN YMD FORMAT
var setDateInYmdFormat = function setDateInYmdFormat(obj, values) {
  values.forEach(function (element) {
    (0, _set2.default)(obj, element, (0, _utils.epochToYmdDate)((0, _get2.default)(obj, element)));
  });
};

// SET ALL MULTIPLE OBJECT DATES IN YMD FORMAT
var setAllDatesInYmdFormat = function setAllDatesInYmdFormat(obj, values) {
  values.forEach(function (element) {
    var elemObject = (0, _get2.default)(obj, "" + element.object, []) === null ? [] : (0, _get2.default)(obj, "" + element.object, []);

    var _loop = function _loop(i) {
      element.values.forEach(function (item) {
        (0, _set2.default)(obj, element.object + "[" + i + "]." + item, (0, _utils.epochToYmdDate)((0, _get2.default)(obj, element.object + "[" + i + "]." + item)));
      });
    };

    for (var i = 0; i < elemObject.length; i++) {
      _loop(i);
    }
  });
};

// SET ALL MULTIPLE OBJECT EPOCH DATES YEARS
var setAllYears = function setAllYears(obj, values) {
  values.forEach(function (element) {
    var elemObject = (0, _get2.default)(obj, "" + element.object, []) === null ? [] : (0, _get2.default)(obj, "" + element.object, []);

    var _loop2 = function _loop2(i) {
      element.values.forEach(function (item) {
        var ymd = (0, _utils.epochToYmdDate)((0, _get2.default)(obj, element.object + "[" + i + "]." + item));
        var year = ymd ? ymd.substring(0, 4) : null;
        year && (0, _set2.default)(obj, element.object + "[" + i + "]." + item, year);
      });
    };

    for (var i = 0; i < elemObject.length; i++) {
      _loop2(i);
    }
  });
};

var setRolesData = function setRolesData(obj) {
  var roles = (0, _get2.default)(obj, "user.roles", []);
  var newRolesArray = [];
  roles.forEach(function (element) {
    newRolesArray.push({
      label: element.name,
      value: element.code
    });
  });
  (0, _set2.default)(obj, "user.roles", newRolesArray);
};

var returnEmptyArrayIfNull = function returnEmptyArrayIfNull(value) {
  if (value === null || value === undefined) {
    return [];
  } else {
    return value;
  }
};

var setRolesList = exports.setRolesList = function setRolesList(state, dispatch) {

  var jurisdictions = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].jurisdictions", []);

  jurisdictions.map(function (judis, ind) {
    var furnishedRolesList = judis && judis.roles && Array.isArray(judis.roles) && judis.roles.map(function (role) {
      return " " + (0, _commons.getLocaleLabels)("NA", "ACCESSCONTROL_ROLES_ROLES_" + (0, _commons.getTransformedLocale)(role.code || role.value));
    }) || [];
    dispatch((0, _actions2.prepareFinalObject)("Employee[0].jurisdictions[" + ind + "].furnishedRolesList", furnishedRolesList.join()));
  });

  // let rolesList = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   `Employee[0].user.roles`,
  //   []
  // );
  // let furnishedRolesList = rolesList.map(item => {
  //   return " " + item.label;
  // });
  // dispatch(
  //   prepareFinalObject(
  //     "Employee[0].jurisdictions[0].furnishedRolesList",
  //     furnishedRolesList.join()
  //   )
  // );
};

var setDeactivationDocuments = function setDeactivationDocuments(state, dispatch) {
  // GET THE DEACTIVATION DOCUMENTS FROM UPLOAD FILE COMPONENT
  var deactivationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "deactivationDocuments", []);
  // FORMAT THE NEW DOCUMENTS ARRAY ACCORDING TO THE REQUIRED STRUCTURE
  var addedDocuments = deactivationDocuments.map(function (document) {
    return {
      documentName: (0, _get2.default)(document, "fileName", ""),
      documentId: (0, _get2.default)(document, "fileStoreId", ""),
      referenceType: "DEACTIVATION"
    };
  });
  // GET THE PREVIOUS DOCUMENTS FROM EMPLOYEE OBJECT
  var documents = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].documents", []);
  // ADD THE NEW DOCUMENTS TO PREVIOUS DOCUMENTS
  documents = [].concat((0, _toConsumableArray3.default)(documents), (0, _toConsumableArray3.default)(addedDocuments));
  // SAVE THE DOCUMENTS BACK TO EMPLOYEE
  dispatch((0, _actions2.prepareFinalObject)("Employee[0].documents", documents));
};
var setActivationDocuments = function setActivationDocuments(state, dispatch) {
  // GET THE DEACTIVATION DOCUMENTS FROM UPLOAD FILE COMPONENT
  var activationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ActivationDocuments", []);
  // FORMAT THE NEW DOCUMENTS ARRAY ACCORDING TO THE REQUIRED STRUCTURE
  var addedDocuments = activationDocuments.map(function (document) {
    return {
      documentName: (0, _get2.default)(document, "fileName", ""),
      documentId: (0, _get2.default)(document, "fileStoreId", ""),
      referenceType: "ACTIVATION"
    };
  });
  // GET THE PREVIOUS DOCUMENTS FROM EMPLOYEE OBJECT
  var documents = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].documents", []);
  // ADD THE NEW DOCUMENTS TO PREVIOUS DOCUMENTS
  documents = [].concat((0, _toConsumableArray3.default)(documents), (0, _toConsumableArray3.default)(addedDocuments));
  // SAVE THE DOCUMENTS BACK TO EMPLOYEE
  dispatch((0, _actions2.prepareFinalObject)("Employee[0].documents", documents));
};

// Remove objects from Arrays not having the specified key (eg. "id")
// and add the key-value isActive:false in those objects having the key
// so as to deactivate them after the API call
var handleDeletedCards = function handleDeletedCards(jsonObject, jsonPath, key) {
  var originalArray = (0, _get2.default)(jsonObject, jsonPath, []);
  var modifiedArray = originalArray.filter(function (element) {
    return element.hasOwnProperty(key) || !element.hasOwnProperty("isDeleted");
  });
  modifiedArray = modifiedArray.map(function (element) {
    if (element.hasOwnProperty("isDeleted")) {
      element["isActive"] = false;
    }
    return element;
  });
  (0, _set2.default)(jsonObject, jsonPath, modifiedArray);
};

var furnishEmployeeData = exports.furnishEmployeeData = function furnishEmployeeData(state, dispatch) {
  var employeeObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee", []);
  setDateInYmdFormat(employeeObject[0], ["dateOfAppointment", "user.dob"]);
  setAllDatesInYmdFormat(employeeObject[0], [{ object: "assignments", values: ["fromDate", "toDate"] }, { object: "serviceHistory", values: ["serviceFrom", "serviceTo"] }]);
  setAllYears(employeeObject[0], [{ object: "education", values: ["yearOfPassing"] }, { object: "tests", values: ["yearOfPassing"] }]);
  setRolesData(employeeObject[0]);
  setRolesList(state, dispatch);
  dispatch((0, _actions2.prepareFinalObject)("Employee", employeeObject));
};

var handleCreateUpdateEmployee = exports.handleCreateUpdateEmployee = function handleCreateUpdateEmployee(state, dispatch) {
  var uuid = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].uuid", null);
  if (uuid) {
    createUpdateEmployee(state, dispatch, "UPDATE");
  } else {
    createUpdateEmployee(state, dispatch, "CREATE");
  }
};

var createUpdateEmployee = exports.createUpdateEmployee = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, action) {
    var pickedTenant, tenantId, queryObject, employeeObject, deletedJurisdiction, employeeJurisdictions, isDeactivateEmployeeDetailsValid, _isDeactivateEmployeeDetailsValid, jurisdictions, i, assignments, _i, assignmentObject, serviceHistory, _i2, education, _i3, educationYearOfPassing, tests, _i4, testsYearOfPassing, roles, processedRoles, response, employeeId, acknowledgementUrl, employee, _response, _employeeId, _acknowledgementUrl, _response2, _employeeId2, _acknowledgementUrl2, _response3, _employeeId3, _acknowledgementUrl3;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pickedTenant = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].tenantId");
            tenantId = pickedTenant || (0, _localStorageUtils.getTenantId)();
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }];
            employeeObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee", []);


            handleDeletedCards(employeeObject[0], "jurisdictions", "id");
            handleDeletedCards(employeeObject[0], "assignments", "id");
            handleDeletedCards(employeeObject[0], "serviceHistory", "id");
            handleDeletedCards(employeeObject[0], "education", "id");
            handleDeletedCards(employeeObject[0], "tests", "id");
            deletedJurisdiction = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "deletedJurisdiction", []);
            employeeJurisdictions = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].jurisdictions", []);

            deletedJurisdiction.map(function (jurisdiction) {
              return jurisdiction.isActive = false;
            });

            // DEACTIVATE EMPLOYEE VALIDATIONS

            if (!(action === "DEACTIVATE")) {
              _context.next = 19;
              break;
            }

            isDeactivateEmployeeDetailsValid = (0, _utils.validateFields)("components.adhocDialog.children.popup.children.body.children", state, dispatch, "view");

            if (isDeactivateEmployeeDetailsValid) {
              _context.next = 17;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill mandatory Fields!",
              labelKey: "ERR_FILL_MANDATORY_FIELDS"
            }, "warning"));
            return _context.abrupt("return");

          case 17:
            _context.next = 24;
            break;

          case 19:
            if (!(action === "ACTIVATE")) {
              _context.next = 24;
              break;
            }

            _isDeactivateEmployeeDetailsValid = (0, _utils.validateFields)("components.adhocDialog.children.popup.children.body.children", state, dispatch, "view");

            if (_isDeactivateEmployeeDetailsValid) {
              _context.next = 24;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill mandatory Fields!",
              labelKey: "ERR_FILL_MANDATORY_FIELDS"
            }, "warning"));
            return _context.abrupt("return");

          case 24:

            // SET TENANT IDS IF THEY DO NOT ALREADY EXIST
            !(0, _get2.default)(employeeObject[0], "tenantId") && (0, _set2.default)(employeeObject[0], "tenantId", tenantId);
            !(0, _get2.default)(employeeObject[0], "user.tenantId") && (0, _set2.default)(employeeObject[0], "user.tenantId", tenantId);

            //SET TENANT IDS IN ALL NEWLY ADDED JURISDICTIONS, DOESNT CHANGE ALREADY PRESENT
            jurisdictions = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "jurisdictions", []));

            for (i = 0; i < jurisdictions.length; i++) {
              (0, _set2.default)(employeeObject[0], "jurisdictions[" + i + "].tenantId", tenantId);
            }

            (0, _set2.default)(employeeObject[0], "dateOfAppointment", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "dateOfAppointment"), "dayStart"));
            (0, _set2.default)(employeeObject[0], "user.dob", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "user.dob"), "dayStart"));

            assignments = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "assignments", []));

            for (_i = 0; _i < assignments.length; _i++) {
              (0, _set2.default)(employeeObject[0], "assignments[" + _i + "].fromDate", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "assignments[" + _i + "].fromDate"), "dayStart"));
              (0, _set2.default)(employeeObject[0], "assignments[" + _i + "].toDate", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "assignments[" + _i + "].toDate"), "dayStart"));

              // Set isCurrentAssignment to false if key not present
              assignmentObject = (0, _get2.default)(employeeObject[0], "assignments[" + _i + "]");

              if (!assignmentObject.hasOwnProperty("isCurrentAssignment")) {
                (0, _set2.default)(employeeObject[0], "assignments[" + _i + "][\"isCurrentAssignment\"]", false);
              }
            }

            // Set employee id null in case of blank
            if ((0, _get2.default)(employeeObject[0], "code") === "") {
              (0, _set2.default)(employeeObject[0], "code", null);
            }

            serviceHistory = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "serviceHistory", []));

            for (_i2 = 0; _i2 < serviceHistory.length; _i2++) {
              (0, _set2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceFrom", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceFrom"), "dayStart"));
              (0, _set2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceTo", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceTo"), "dayStart"));
            }

            // FORMAT EDUCATION PASSING DATES TO EPOCH
            education = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "education", []));

            for (_i3 = 0; _i3 < education.length; _i3++) {
              educationYearOfPassing = (0, _get2.default)(employeeObject[0], "education[" + _i3 + "].yearOfPassing");

              educationYearOfPassing.toString().match(/\d{4}/g) && (0, _set2.default)(employeeObject[0], "education[" + _i3 + "].yearOfPassing", (0, _utils.convertDateToEpoch)(educationYearOfPassing + "-01-01"), "dayStart");
            }

            // FORMAT TESTS PASSING DATES TO EPOCH
            tests = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "tests", []));

            for (_i4 = 0; _i4 < tests.length; _i4++) {
              testsYearOfPassing = (0, _get2.default)(employeeObject[0], "tests[" + _i4 + "].yearOfPassing");

              testsYearOfPassing.toString().match(/\d{4}/g) && (0, _set2.default)(employeeObject[0], "tests[" + _i4 + "].yearOfPassing", (0, _utils.convertDateToEpoch)(testsYearOfPassing + "-01-01"), "dayStart");
            }

            // PROCESS ALL ROLES IN REQUIRED FORMAT
            roles = (0, _get2.default)(employeeObject[0], "user.roles", []);
            processedRoles = roles.map(function (item) {
              return {
                code: item.value,
                name: item.label,
                tenantId: item.tenantId
              };
            });

            (0, _set2.default)(employeeObject[0], "user.roles", processedRoles);

            if (!(action === "CREATE")) {
              _context.next = 57;
              break;
            }

            _context.prev = 43;
            _context.next = 46;
            return (0, _commons2.createEmployee)(queryObject, employeeObject, dispatch);

          case 46:
            response = _context.sent;
            employeeId = (0, _get2.default)(response, "Employees[0].code");
            acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/acknowledgement?purpose=create&status=success&applicationNumber=" + employeeId : "/hrms/acknowledgement?purpose=create&status=success&applicationNumber=" + employeeId;

            dispatch((0, _actions.setRoute)(acknowledgementUrl));
            _context.next = 55;
            break;

          case 52:
            _context.prev = 52;
            _context.t0 = _context["catch"](43);

            furnishEmployeeData(state, dispatch);

          case 55:
            _context.next = 115;
            break;

          case 57:
            if (!(action === "UPDATE")) {
              _context.next = 76;
              break;
            }

            _context.prev = 58;


            // const fileStoreid=await convertToFilestoreid(get(employeeObject[0],'user.photo'));

            // set(employeeObject[0],'user.photo',fileStoreid);
            if ((0, _get2.default)(employeeObject[0], 'user.photo', null)) {
              (0, _set2.default)(employeeObject[0], 'user.photo', (0, _get2.default)(employeeObject[0], 'user.identificationMark', null));
            }
            employee = {};

            employee = (0, _extends3.default)({}, employeeObject[0]);
            (0, _set2.default)(employee, 'jurisdictions', [].concat((0, _toConsumableArray3.default)(employeeJurisdictions), (0, _toConsumableArray3.default)(deletedJurisdiction)));
            _context.next = 65;
            return (0, _commons2.updateEmployee)(queryObject, [employee], dispatch);

          case 65:
            _response = _context.sent;
            _employeeId = _response && (0, _get2.default)(_response, "Employees[0].code");
            _acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/acknowledgement?purpose=update&status=success&applicationNumber=" + _employeeId : "/hrms/acknowledgement?purpose=update&status=success&applicationNumber=" + _employeeId;

            dispatch((0, _actions.setRoute)(_acknowledgementUrl));
            _context.next = 74;
            break;

          case 71:
            _context.prev = 71;
            _context.t1 = _context["catch"](58);

            furnishEmployeeData(state, dispatch);

          case 74:
            _context.next = 115;
            break;

          case 76:
            if (!(action === "DEACTIVATE")) {
              _context.next = 96;
              break;
            }

            _context.prev = 77;

            if ((0, _get2.default)(employeeObject[0], 'user.photo', null)) {
              (0, _set2.default)(employeeObject[0], 'user.photo', (0, _get2.default)(employeeObject[0], 'user.identificationMark', null));
            }
            (0, _set2.default)(employeeObject[0], "isActive", false);
            (0, _set2.default)(employeeObject[0], "deactivationDetails[0].effectiveFrom", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "deactivationDetails[0].effectiveFrom"), "dayStart"));
            setDeactivationDocuments(state, dispatch);
            _context.next = 84;
            return (0, _commons2.updateEmployee)(queryObject, employeeObject, dispatch);

          case 84:
            _response2 = _context.sent;
            _employeeId2 = _response2 && (0, _get2.default)(_response2, "Employees[0].code");

            (0, _utils.showHideAdhocPopup)(state, dispatch);
            _acknowledgementUrl2 = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/acknowledgement?purpose=deactivate&status=success&applicationNumber=" + _employeeId2 : "/hrms/acknowledgement?purpose=deactivate&status=success&applicationNumber=" + _employeeId2;

            dispatch((0, _actions.setRoute)(_acknowledgementUrl2));
            _context.next = 94;
            break;

          case 91:
            _context.prev = 91;
            _context.t2 = _context["catch"](77);

            furnishEmployeeData(state, dispatch);

          case 94:
            _context.next = 115;
            break;

          case 96:
            if (!(action === "ACTIVATE")) {
              _context.next = 115;
              break;
            }

            _context.prev = 97;

            if ((0, _get2.default)(employeeObject[0], 'user.photo', null)) {
              (0, _set2.default)(employeeObject[0], 'user.photo', (0, _get2.default)(employeeObject[0], 'user.identificationMark', null));
            }
            (0, _set2.default)(employeeObject[0], "reActivateEmployee", true);
            (0, _set2.default)(employeeObject[0], "isActive", true);
            (0, _set2.default)(employeeObject[0], "reactivationDetails[0].effectiveFrom", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "reactivationDetails[0].effectiveFrom"), "dayStart"));
            setActivationDocuments(state, dispatch);
            _context.next = 105;
            return (0, _commons2.updateEmployee)(queryObject, employeeObject, dispatch);

          case 105:
            _response3 = _context.sent;
            _employeeId3 = _response3 && (0, _get2.default)(_response3, "Employees[0].code");

            (0, _utils.showHideAdhocPopup)(state, dispatch);
            _acknowledgementUrl3 = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/acknowledgement?purpose=activate&status=success&applicationNumber=" + _employeeId3 : "/hrms/acknowledgement?purpose=activate&status=success&applicationNumber=" + _employeeId3;

            dispatch((0, _actions.setRoute)(_acknowledgementUrl3));
            _context.next = 115;
            break;

          case 112:
            _context.prev = 112;
            _context.t3 = _context["catch"](97);

            furnishEmployeeData(state, dispatch);

          case 115:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[43, 52], [58, 71], [77, 91], [97, 112]]);
  }));

  return function createUpdateEmployee(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getEmployeeData = exports.getEmployeeData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, employeeId, tenantId) {
    var queryObject, response, judis, roles;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryObject = [{
              key: "codes",
              value: employeeId
            }, {
              key: "tenantId",
              value: tenantId
            }];
            _context2.next = 3;
            return (0, _commons2.getSearchResults)(queryObject, dispatch);

          case 3:
            response = _context2.sent;

            dispatch((0, _actions2.prepareFinalObject)("Employee", (0, _get2.default)(response, "Employees")));
            dispatch((0, _actions2.prepareFinalObject)("empPhoneNumber", (0, _get2.default)(response, "Employees[0].user.mobileNumber", '')));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("create", "components.div.children.headerDiv.children.header.children.header.children.key", "props", {
              labelName: "Edit Employee",
              labelKey: "HR_COMMON_EDIT_EMPLOYEE_HEADER"
            }));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("create", "components.div.children.formwizardFirstStep.children.professionalDetails.children.cardContent.children.employeeDetailsContainer.children.employeeId", "props.disabled", true));

            judis = (0, _get2.default)(response, 'Employees[0].jurisdictions', []);
            roles = (0, _get2.default)(response, 'Employees[0].user.roles', []);

            judis.map(function (judis) {
              if (judis.boundary) {
                judis.roles = roles.filter(function (role) {
                  return role.tenantId == judis.boundary;
                }).map(function (role) {
                  return (0, _extends3.default)({}, role, { value: role.code, label: role.name });
                });
              }
            });
            dispatch((0, _actions2.prepareFinalObject)("Employee", (0, _get2.default)(response, "Employees")));

            if ((0, _get2.default)(response, "Employees[0].isActive", false)) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.div.children.footer.children.activateEmployee", "visible", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.div.children.footer.children.deactivateEmployee", "visible", true));
              dispatch((0, _actions2.prepareFinalObject)("employeeStatus", 'DEACTIVATE'));
              showActivateDetails(dispatch, false);
            } else {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.div.children.footer.children.activateEmployee", "visible", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.div.children.footer.children.deactivateEmployee", "visible", false));
              dispatch((0, _actions2.prepareFinalObject)("employeeStatus", 'ACTIVATE'));
              showActivateDetails(dispatch, true);
            }
            furnishEmployeeData(state, dispatch);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getEmployeeData(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var showActivateDetails = function showActivateDetails(dispatch) {
  var activate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.body.children.deactivationReason", "jsonPath", activate ? "Employee[0].reactivationDetails[0].reasonForReactivation" : "Employee[0].deactivationDetails[0].reasonForDeactivation"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.body.children.deactivationReason", "props.jsonPath", activate ? "Employee[0].reactivationDetails[0].reasonForReactivation" : "Employee[0].deactivationDetails[0].reasonForDeactivation"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.body.children.deactivationReason", "props.placeholder.labelKey", activate ? "HR_ACTIVATION_REASON_SELECT" : "HR_DEACTIVATION_REASON_SELECT"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.body.children.deactivationReason", "props.label.labelKey", activate ? "HR_ACTIVATION_REASON" : "HR_DEACTIVATION_REASON"));

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.body.children.effectiveDate", "jsonPath", activate ? "Employee[0].reactivationDetails[0].effectiveFrom" : "Employee[0].deactivationDetails[0].effectiveFrom"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.body.children.effectiveDate", "props.jsonPath", activate ? "Employee[0].reactivationDetails[0].effectiveFrom" : "Employee[0].deactivationDetails[0].effectiveFrom"));

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.orderNo", "jsonPath", activate ? "Employee[0].reactivationDetails[0].orderNo" : "Employee[0].deactivationDetails[0].orderNo"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.orderNo", "props.jsonPath", activate ? "Employee[0].reactivationDetails[0].orderNo" : "Employee[0].deactivationDetails[0].orderNo"));

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.remarks", "jsonPath", activate ? "Employee[0].reactivationDetails[0].remarks" : "Employee[0].deactivationDetails[0].remarks"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.remarks", "props.jsonPath", activate ? "Employee[0].reactivationDetails[0].remarks" : "Employee[0].deactivationDetails[0].remarks"));

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.upload", "jsonPath", activate ? "ActivationDocuments" : "deactivationDocuments"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.upload.children.uploadButton", "props.jsonPath", activate ? "ActivationDocuments" : "deactivationDocuments"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.nonMandatoryBody.children.upload", "props.jsonPath", activate ? "ActivationDocuments" : "deactivationDocuments"));

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.buttonDiv.children.deactivateButton.children.previousButtonLabel", "props.labelKey", activate ? "HR_ACTIVATE_EMPLOYEE_LABEL" : "HR_DEACTIVATE_EMPLOYEE_LABEL"));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog.children.popup.children.header.children.div1.children.div.children.key", "props.labelKey", activate ? "HR_ACTIVATE_EMPLOYEE_HEAD" : "HR_DEACTIVATE_EMPLOYEE_HEAD"));
};