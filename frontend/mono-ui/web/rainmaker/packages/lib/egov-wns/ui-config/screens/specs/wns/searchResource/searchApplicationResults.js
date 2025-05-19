"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApplicationResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApplicationResults = exports.searchApplicationResults = {
  uiFramework: "custom-molecules",
  moduleName: "egov-wns",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      name: "Consumer No",
      labelKey: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, data) {
          if (data.rowData[0] !== "NA" && data.rowData[0] !== null) {
            return _react2.default.createElement(
              "div",
              { className: "linkStyle", onClick: function onClick() {
                  return getConnectionDetails(data);
                } },
              _react2.default.createElement(
                "a",
                null,
                value
              )
            );
          } else {
            return _react2.default.createElement(
              "p",
              null,
              value
            );
          }
        }
      }
    }, {
      name: "Application No",
      labelKey: "WS_COMMON_TABLE_COL_APP_NO_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, data) {
          if (data.rowData[1] !== "NA" && data.rowData[1] !== null) {
            return _react2.default.createElement(
              "div",
              { className: "linkStyle", onClick: function onClick() {
                  return getApplicationDetails(data);
                } },
              _react2.default.createElement(
                "a",
                null,
                value
              )
            );
          } else {
            return _react2.default.createElement(
              "p",
              null,
              value
            );
          }
        }
      }
    }, {
      name: "Application Type",
      labelKey: "WS_COMMON_TABLE_COL_APP_TYPE_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            { style: { color: '#000000' } },
            (0, _commons.getLocaleLabels)("NA", (0, _commons.getTransformedLocale)("WS_" + value))
          );
        }
      }
    }, { name: "Owner Name", labelKey: "WS_COMMON_TABLE_COL_OWN_NAME_LABEL" }, {
      name: "Application Status", labelKey: "WS_COMMON_TABLE_COL_APPLICATION_STATUS_LABEL", options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            { style: { color: '#000000' } },
            (0, _commons.getLocaleLabels)("NA", (0, _commons.getTransformedLocale)("CS_" + value))
          );
        }
      }
    }, { name: "Address", labelKey: "WS_COMMON_TABLE_COL_ADDRESS" }, {
      name: "tenantId",
      labelKey: "WS_COMMON_TABLE_COL_TENANTID_LABEL",
      options: {
        display: false
      }
    }, {
      name: "service",
      labelKey: "WS_COMMON_TABLE_COL_SERVICE_LABEL",
      options: {
        display: false
      }
    }, {
      name: "connectionType",
      labelKey: "WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL",
      options: {
        display: false
      }
    }],
    title: { labelKey: "WS_HOME_SEARCH_APPLICATION_RESULTS_TABLE_HEADING", labelName: "Search Results for Water & Sewerage Application" },
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
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

var getApplicationDetails = function getApplicationDetails(data) {
  var connectionNo = "" + data.rowData[0];
  if (connectionNo && connectionNo !== 'NA' && data.rowData[2].includes('MODIFY')) {
    _store2.default.dispatch((0, _actions.setRoute)("search-preview?applicationNumber=" + data.rowData[1] + "&tenantId=" + data.rowData[6] + "&history=true&service=" + data.rowData[7] + "&mode=MODIFY"));
  } else {
    _store2.default.dispatch((0, _actions.setRoute)("search-preview?applicationNumber=" + data.rowData[1] + "&tenantId=" + data.rowData[6] + "&history=true&service=" + data.rowData[7]));
  }
};

var getConnectionDetails = function getConnectionDetails(data) {
  _store2.default.dispatch((0, _actions.setRoute)("connection-details?connectionNumber=" + data.rowData[0] + "&tenantId=" + data.rowData[6] + "&service=" + data.rowData[7] + "&connectionType=" + data.rowData[8]));
};