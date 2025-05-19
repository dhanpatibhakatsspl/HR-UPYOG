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

var _commons = require("egov-common/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Receipt No.",
      labelKey: "UC_COMMON_TABLE_COL_RECEIPT_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return _react2.default.createElement(
            "div",
            { onClick: function onClick(value) {
                var receiptQueryString = [{ key: "receiptNumbers", value: tableMeta.rowData[0] }, { key: "tenantId", value: tableMeta.rowData[7] }, { key: "businessService", value: tableMeta.rowData[8] }];
                (0, _commons.download)(receiptQueryString, "download", tableMeta.rowData[6] || "consolidatedreceipt", 'PAYMENT');
              } },
            _react2.default.createElement(
              "a",
              { href: "javascript:void(0)" },
              value
            )
          );
        }
      }
    }, {
      labelName: "Consumer Code",
      labelKey: "UC_COMMON_TABLE_COL_CONSUMERCODE"
    }, {
      labelName: "Payee Name",
      labelKey: "UC_COMMON_TABLE_COL_PAYEE_NAME"
    }, {
      labelName: "Service Type",
      labelKey: "UC_SERVICE_TYPE_LABEL"
    }, {
      labelName: "Date",
      labelKey: "UC_COMMON_TABLE_COL_DATE"
    }, {
      labelName: "Amount[INR]",
      labelKey: "UC_COMMON_TABLE_COL_AMOUNT"
    }, {
      labelName: "Status",
      labelKey: "UC_COMMON_TABLE_COL_STATUS",
      options: {
        display: false,
        viewColumns: false
      }
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false,
        viewColumns: false
      }
    }, {
      labelName: "Service Type",
      labelKey: "SERVICE",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "Search Results for Payments",
      labelKey: "COMMON_TABLE_SEARCH_RESULT_PAYMENTS"
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Date",
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

var onRowClick = function onRowClick(rowData) {
  var receiptQueryString = [{ key: "receiptNumbers", value: rowData[0] }, { key: "tenantId", value: rowData[7] }];
  (0, _commons.download)(receiptQueryString);
};