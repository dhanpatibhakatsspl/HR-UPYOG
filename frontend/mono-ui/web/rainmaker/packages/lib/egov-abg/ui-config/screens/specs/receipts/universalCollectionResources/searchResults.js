"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _commons = require("egov-common/ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _commons3 = require("egov-ui-kit/utils/commons");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Receipt No.",
      labelKey: "CR_COMMON_TABLE_COL_RECEIPT_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return _react2.default.createElement(
            "div",
            { onClick: function onClick(value) {
                var receiptQueryString = [{ key: "receiptNumbers", value: tableMeta.rowData[0] }, { key: "tenantId", value: tableMeta.rowData[8] }, { key: "businessService", value: tableMeta.rowData[9] }];
                (0, _commons.download)(receiptQueryString, "download", tableMeta.rowData[7] || 'consolidatedreceipt', 'PAYMENT');
              }, style: { color: '#2196F3' } },
            value
          );
        }
      }
    }, {
      labelName: "Date",
      labelKey: "CR_COMMON_TABLE_COL_DATE"
    }, {
      labelName: "Consumer code",
      labelKey: "CR_COMMON_TABLE_CONSUMERCODE"
    }, {
      labelName: "Payee Name",
      labelKey: "CR_COMMON_TABLE_COL_PAYEE_NAME"
    }, {
      labelName: "Service Type",
      labelKey: "CR_SERVICE_TYPE_LABEL"
    }, {
      labelName: "Status",
      labelKey: "CR_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            { style: { color: '#000000' } },
            (0, _commons2.getLocaleLabels)("NA", (0, _commons2.getTransformedLocale)("RC_" + value))
          );
        }
      }
    }, {
      labelName: "Action",
      labelKey: "CR_COMMON_TABLE_ACTION",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return _react2.default.createElement(
            "div",
            { onClick: function onClick(value) {
                if (tableMeta.rowData[6] == 'CANCEL') {

                  (0, _commons3.setRoute)("/receipts/viewReceipt?receiptNumbers=" + tableMeta.rowData[0] + "&tenantId=" + tableMeta.rowData[8] + "&businessService=" + tableMeta.rowData[9]);
                }
              }, style: { color: tableMeta.rowData[6] == 'CANCEL' ? 'rgb(254, 122, 81)' : "inherit", cursor: tableMeta.rowData[6] == 'CANCEL' ? 'pointer' : "initial" } },
            (0, _commons2.getLocaleLabels)("NA", "RC_" + value)
          );
        }
      }
    }, {
      labelName: "Receipt Key",
      labelKey: "RECEIPT_KEY",
      options: {
        display: false
      }
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }, {
      labelName: "SERVICE TYPE",
      labelKey: "SERVICE_TYPE",
      options: {
        display: false
      }
    }],
    title: {
      labelKey: "COMMON_TABLE_SEARCH_RESULT_RECIEPT",
      labelName: "COMMON_TABLE_SEARCH_RESULT_RECIEPT"
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