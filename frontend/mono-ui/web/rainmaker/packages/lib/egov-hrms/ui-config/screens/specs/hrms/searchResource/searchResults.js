"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = exports.getTextToLocalMapping = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Employee ID":
      return (0, _commons.getLocaleLabels)("Employee ID", "HR_COMMON_TABLE_COL_EMP_ID", localisationLabels);
    case "Name":
      return (0, _commons.getLocaleLabels)("Name", "HR_COMMON_TABLE_COL_NAME", localisationLabels);
    case "Role":
      return (0, _commons.getLocaleLabels)("Role", "HR_COMMON_TABLE_COL_ROLE", localisationLabels);
    case "Designation":
      return (0, _commons.getLocaleLabels)("Designation", "HR_COMMON_TABLE_COL_DESG", localisationLabels);
    case "Department":
      return (0, _commons.getLocaleLabels)("Department", "HR_COMMON_TABLE_COL_DEPT", localisationLabels);
    case "Status":
      return (0, _commons.getLocaleLabels)("Status", "HR_COMMON_TABLE_COL_STATUS", localisationLabels);
    case "Search Results for Employee":
      return (0, _commons.getLocaleLabels)("Search Results for Employee", "HR_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);
    case "Tenant ID":
      return (0, _commons.getLocaleLabels)("Tenant ID", "HR_COMMON_TABLE_COL_TENANT_ID", localisationLabels);
  }
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Employee ID",
      labelKey: "HR_COMMON_TABLE_COL_EMP_ID"
    }, {
      labelName: "Name",
      labelKey: "HR_COMMON_TABLE_COL_NAME"
    }, {
      labelName: "Role",
      labelKey: "HR_COMMON_TABLE_COL_ROLE"
    }, {
      labelName: "Designation",
      labelKey: "HR_COMMON_TABLE_COL_DESG"
    }, {
      labelName: "Department",
      labelKey: "HR_COMMON_TABLE_COL_DEPT"
    }, {
      labelName: "Status",
      labelKey: "HR_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value === "ACTIVE" ? { color: "green" } : { color: "red" },
            labelKey: (0, _commons.getStatusKey)(value).labelKey,
            labelName: (0, _commons.getStatusKey)(value).labelName
          });
        }
      }
    }, {
      labelName: "Tenant ID",
      labelKey: "HR_COMMON_TABLE_COL_TENANT_ID",
      name: "tenantId",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "Search Results for Employee",
      labelKey: "HR_HOME_SEARCH_RESULTS_TABLE_HEADING"
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: function onRowClick(row, index) {
        _onRowClick(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: function sortingFn(data, i, sortDateOrder) {
        var epochDates = data.reduce(function (acc, curr) {
          acc.push([].concat((0, _toConsumableArray3.default)(curr), [(0, _utils.getEpochForDate)(curr[4], "dayend")]));
          return acc;
        }, []);
        var order = sortDateOrder === "asc" ? true : false;
        var finalData = (0, _utils.sortByEpoch)(epochDates, !order).map(function (item) {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

var _onRowClick = function _onRowClick(rowData) {
  (0, _formActionUtils.routeTo)("view?employeeID=" + rowData[0] + "&tenantId=" + rowData[6]);
};