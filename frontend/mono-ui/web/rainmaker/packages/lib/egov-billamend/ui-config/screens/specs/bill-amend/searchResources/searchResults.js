"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConnectionDetails = function getConnectionDetails(data) {
  if (data.rowData[0] == "WS" || data.rowData[0] == "SW") {
    (0, _formActionUtils.routeTo)("/wns/redirect?connectionNumber=" + data.rowData[2] + "&tenantId=" + data.rowData[6] + "&businessService=" + data.rowData[0]);
  } else {
    // routeTo(`/wns/connection-details?connectionNumber=${data.rowData[2]}&tenantId=${data.rowData[6]}&service=${data.rowData[8]}&connectionType=${data.rowData[9]}`)
  }
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Bill No.",
      labelKey: "BILL_COMMON_SERVICE_TYPE",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return _react2.default.createElement(
            "span",
            { style: { "color": "rgba(0, 0, 0, 0.87)", "cursor": "text" } },
            value
          );
        }
      }
    }, {
      labelName: "Application No",
      labelKey: "BILL_COMMON_APPLICATION_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return value == 'NA' ? _react2.default.createElement(
            "span",
            { style: { "color": "rgba(0, 0, 0, 0.87)", "cursor": "text" } },
            value
          ) : _react2.default.createElement(
            "a",
            { href: "javascript:void(0)",
              onClick: function onClick() {
                var link = "/bill-amend/search-preview?tenantId=" + tableMeta.rowData[6] + "&applicationNumber=" + tableMeta.rowData[1] + "&businessService=" + tableMeta.rowData[0];
                (0, _formActionUtils.routeTo)(link);
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
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta, updateValue) {
          return _react2.default.createElement(
            "a",
            { href: "javascript:void(0)",
              onClick: function onClick() {
                getConnectionDetails(tableMeta);
              }
            },
            value
          );
        }
      }
    }, {
      labelName: "Consumer Name",
      labelKey: "BILL_COMMON_TABLE_COL_CONSUMER_NAME"
    }, {
      labelName: "Consumer Name",
      labelKey: "BILL_COMMON_TABLE_CONSUMER_ADDRESS"
    }, {
      labelName: "Status",
      labelKey: "BILL_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value === "ACTIVE" || value === "CONSUMED" ? { color: "green" } : { color: "red" },
            labelKey: (0, _commons.getStatusKey)(value).labelKey,
            labelName: (0, _commons.getStatusKey)(value).labelName
          });
        }
      }
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }, {
      labelKey: "BUSINESS_SERVICE",
      labelName: "Business Service",
      options: {
        display: false
      }
    }, {
      labelKey: "SERVICE_CONST",
      labelName: "Service Constant",
      options: {
        display: false
      }
    }, {
      labelKey: "CONNECTION_TYPE",
      labelName: "Connection Type",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "Search Results for Bill",
      labelKey: "BILL_SEARCH_TABLE_HEADER"
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