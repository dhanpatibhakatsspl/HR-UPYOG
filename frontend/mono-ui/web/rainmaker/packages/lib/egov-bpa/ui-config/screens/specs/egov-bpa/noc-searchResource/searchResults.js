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

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      name: "Application No", labelKey: "BPA_COMMON_TABLE_COL_APP_NO"
    }, {
      name: "Source model application number", labelKey: "SOURCE_MODULE_NUMBER"
    }, {
      name: "Source Module", labelKey: "BPA_NOC_MODULE_SOURCE_LABEL"
    },
    // {
    //   name: "Current Owner", labelKey: "WF_INBOX_HEADER_CURRENT_OWNER"
    // },
    {
      name: "Status", labelKey: "BPA_COMMON_TABLE_COL_STATUS_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            {
              style: value === "APPROVED" || value === "AUTO_APPROVED" ? { color: "green" } : value === "INPROGRESS" ? { color: "orange" } : { color: "red" }
            },
            (0, _utils.getTextToLocalMapping)(value)
          );
        }
      }
    }],
    title: { labelKey: "NOC_HOME_SEARCH_RESULTS_TABLE_HEADING", labelName: "Search Results for NOC Applications" },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      viewColumns: false,
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
  var state = rowData[3];
  var applicationNumber = rowData[0];
  var tenantId = (0, _localStorageUtils.getTenantId)();;
  var environment = process.env.NODE_ENV === "production" ? "employee" : "";
  var origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;
  switch (state) {
    case "INITIATED":
      window.location.assign("" + origin + environment + "/egov-bpa/noc-search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId);
      break;
    default:
      window.location.assign("" + origin + environment + "/egov-bpa/noc-search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId);
      break;
  }
};