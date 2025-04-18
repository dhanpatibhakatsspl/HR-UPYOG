"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = exports.billDownload = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-common/ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _commons3 = require("egov-ui-kit/utils/commons");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var billDownload = exports.billDownload = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(consumerCode, tenantId, billKey, searchURL, service) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (billKey == "ws-bill") {
              (0, _commons3.downloadWNSBillFromConsumer)(consumerCode, tenantId, service);
            } else {
              (0, _commons.downloadBill)(consumerCode, tenantId, billKey, searchURL);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function billDownload(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Bill No.",
      labelKey: "ABG_COMMON_TABLE_COL_BILL_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return _react2.default.createElement(
            "a",
            { href: "javascript:void(0)",
              onClick: function onClick() {
                billDownload(tableMeta.rowData[1], tableMeta.rowData[10], tableMeta.rowData[9], tableMeta.rowData[12], tableMeta.rowData[7]);
              }
            },
            value
          );
        }
      }
    }, {
      labelName: "Consumer Code",
      labelKey: "PAYMENT_COMMON_CONSUMER_CODE",
      options: {
        display: false
      }
    }, {
      labelName: "Consumer Name",
      labelKey: "ABG_COMMON_TABLE_COL_CONSUMER_NAME"
    }, {
      labelName: "Bill Date",
      labelKey: "ABG_COMMON_TABLE_COL_BILL_DATE"
    }, {
      labelName: "Bill Amount(Rs)",
      labelKey: "ABG_COMMON_TABLE_COL_BILL_AMOUNT"
    }, {
      labelName: "Status",
      labelKey: "ABG_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            null,
            (0, _commons2.getLocaleLabels)(value.toUpperCase(), value.toUpperCase())
          );
        }

      }
    }, {
      labelName: "Action",
      labelKey: "ABG_COMMON_TABLE_COL_ACTION",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return value === "ABG_PAY" ? tableMeta.rowData[4] > 0 ? getActionButton(value, tableMeta) : tableMeta.rowData[4] <= 0 && tableMeta.rowData[13] ? getActionButton(value, tableMeta) : "" : getActionButton(value, tableMeta);
        }
      }
    }, {
      labelKey: "BUSINESS_SERVICE",
      labelName: "Business Service",
      options: {
        display: false
      }
    }, {
      labelKey: "RECEIPT_KEY",
      labelName: "Receipt Key",
      options: {
        display: false
      }
    }, {
      labelName: "Bill Key",
      labelKey: "BILL_KEY",
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
      labelName: "Bill Id",
      labelKey: "BILL_ID",
      options: {
        display: false
      }
    }, {
      labelName: "Bill Search Url",
      labelKey: "BILL_SEARCH_URL",
      options: {
        display: false
      }
    }, {
      labelName: "Advance Payment",
      labelKey: "ADVANCE_PAYMENT",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "Search Results for Bill",
      labelKey: "BILL_GENIE_SEARCH_TABLE_HEADER"
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
      column: "Bill Date",
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

var getActionButton = function getActionButton(value, tableMeta) {
  return _react2.default.createElement(
    "a",
    { href: "javascript:void(0)",
      style: {
        color: "#FE7A51",
        cursor: "pointer"
      },
      onClick: function onClick(value) {
        var appName = process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee";
        if (tableMeta.rowData[5] === "PAID") {
          var receiptQueryString = [{ key: "billIds", value: tableMeta.rowData[11] }, { key: "tenantId", value: tableMeta.rowData[10] }, { key: "businessService", value: tableMeta.rowData[7] }];
          (0, _commons.download)(receiptQueryString, "download", tableMeta.rowData[8] || 'consolidatedreceipt', 'PAYMENT');
        } else {
          var url = process.env.NODE_ENV === "development" ? "/egov-common/pay?consumerCode=" + tableMeta.rowData[1] + "&tenantId=" + tableMeta.rowData[10] + "&businessService=" + tableMeta.rowData[7] : "/" + appName + "/egov-common/pay?consumerCode=" + tableMeta.rowData[1] + "&tenantId=" + tableMeta.rowData[10] + "&businessService=" + tableMeta.rowData[7];
          document.location.href = "" + document.location.origin + url;
        }
      }
    },
    (0, _commons2.getLocaleLabels)(value, (0, _commons2.getTransformedLocale)("" + value))
  );
};