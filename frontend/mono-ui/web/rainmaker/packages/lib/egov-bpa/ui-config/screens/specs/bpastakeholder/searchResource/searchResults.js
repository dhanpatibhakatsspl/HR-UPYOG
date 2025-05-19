"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      name: "Application No", labelKey: "BPA_COMMON_TABLE_COL_APP_NO"
    }, {
      name: "Applicant Name", labelKey: "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL"
    }, {
      name: "Licensee Type", labelKey: "BPA_COMMON_TABLE_COL_LICENSEE_TYPE"
    }, {
      name: "Status", labelKey: "BPA_COMMON_TABLE_COL_STATUS_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            {
              style: value === "APPROVED" ? { color: "green" } : { color: "red" }
            },
            (0, _utils.getTextToLocalMapping)(value)
          );
        }
      }
    }, {
      name: "Assigned To", labelKey: "BPA_COMMON_TABLE_COL_ASSIGN_TO"
    }, {
      name: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }],
    title: { labelKey: "BPA_HOME_SEARCH_RESULTS_HEADING", labelName: "Search Results for Trade License Applications" },
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
  switch (rowData[5]) {
    case "INITIATED":
      window.location.href = "apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[5];
      break;
    default:
      window.location.href = "search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[5];
      break;
  }
};