"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = exports.getDesigName = exports.getDeptName = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../..//ui-utils/commons");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDeptName = exports.getDeptName = function getDeptName(state, codes) {
  var deptMdmsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.common-masters.Department", []);
  var codeNames = codes.map(function (code) {
    return (0, _get2.default)((0, _find2.default)(deptMdmsData, { code: code }), "name", "");
  });
  return codeNames.join();
};

var getDesigName = exports.getDesigName = function getDesigName(state, codes) {
  var desigMdmsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.common-masters.Designation", []);
  var codeNames = codes.map(function (code) {
    return (0, _get2.default)((0, _find2.default)(desigMdmsData, { code: code }), "name", "");
  });
  return codeNames.join();
};

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var _ref2, localisationLabels, tenantId, queryObject, searchScreenObject, isSearchFormValid, key, response, data;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = state.app || {}, localisationLabels = _ref2.localisationLabels;

            showHideTable(false, dispatch);
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "hrmsSearchScreen.ulb") || (0, _localStorageUtils.getTenantId)();
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "hrmsSearchScreen", {});
            isSearchFormValid = (0, _utils.validateFields)("components.div.children.searchForm.children.cardContent.children.searchFormContainer.children", state, dispatch, "search");

            if (isSearchFormValid) {
              _context.next = 10;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "ERR_FILL_VALID_FIELDS"
            }, "warning"));
            _context.next = 19;
            break;

          case 10:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x.trim() === "";
            }))) {
              _context.next = 14;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "ERR_FILL_ONE_FIELDS"
            }, "warning"));
            _context.next = 19;
            break;

          case 14:
            // Add selected search fields to queryobject
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
            }
            _context.next = 17;
            return (0, _commons2.getSearchResults)(queryObject.filter(function (query) {
              return query.key != 'ulb';
            }), dispatch);

          case 17:
            response = _context.sent;

            try {
              data = response.Employees.map(function (item) {
                var _ref3;

                // GET ALL CURRENT DESIGNATIONS OF EMPLOYEE
                var currentDesignations = (0, _get2.default)(item, "assignments", []).filter(function (assignment) {
                  return assignment.isCurrentAssignment;
                }).map(function (assignment) {
                  return (0, _commons.getLocaleLabels)("NA", "COMMON_MASTERS_DESIGNATION_" + assignment.designation);
                });

                // GET ALL CURRENT DEPARTMENTS OF EMPLOYEE
                var currentDepartments = (0, _get2.default)(item, "assignments", []).filter(function (assignment) {
                  return assignment.isCurrentAssignment;
                }).map(function (assignment) {
                  return (0, _commons.getLocaleLabels)("NA", "COMMON_MASTERS_DEPARTMENT_" + assignment.department);
                });
                var role = (0, _get2.default)(item, "user.roles", []).map(function (role) {

                  return " " + (0, _commons.getLocaleLabels)("NA", "ACCESSCONTROL_ROLES_ROLES_" + (0, _commons.getTransformedLocale)(role.code));
                }).join();
                return _ref3 = {}, (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_EMP_ID", (0, _get2.default)(item, "code", "-") || "-"), (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_NAME", (0, _get2.default)(item, "user.name", "-") || "-"), (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_ROLE", (0, _get2.default)(item, "user.roles", false) ? role && role.length < 50 ? role : role.slice(0, 50) + "..." : "-"), (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_DESG", currentDesignations && currentDesignations.length && currentDesignations.join && currentDesignations.join(',') || "-"), (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_DEPT", currentDepartments && currentDepartments.length && currentDepartments.join && currentDepartments.join(',') || "-"), (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_STATUS", (0, _get2.default)(item, "isActive", false) ? "ACTIVE" : "INACTIVE" || "-"), (0, _defineProperty3.default)(_ref3, "HR_COMMON_TABLE_COL_TENANT_ID", (0, _get2.default)(item, "tenantId", "-")), _ref3;
              });


              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", response.Employees.length));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Unable to parse search results!" }, "error"));
            }

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};