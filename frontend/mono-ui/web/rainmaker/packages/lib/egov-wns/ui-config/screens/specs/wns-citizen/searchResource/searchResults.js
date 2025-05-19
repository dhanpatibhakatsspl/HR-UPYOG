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

var _reactRouterDom = require("react-router-dom");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _commons = require("../../../../../ui-utils/commons");

require("./index.css");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  moduleName: "egov-wns",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      name: "Service",
      labelKey: "WS_COMMON_TABLE_COL_SERVICE_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            { style: { color: '#000000' } },
            value
          );
        }
      }
    },
    // { name: "Consumer No",  labelKey: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL" },
    {
      name: "Consumer No",
      labelKey: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, index) {
          return _react2.default.createElement(
            "div",
            { className: "linkStyle", onClick: function onClick() {
                return getConnectionDetails(index);
              } },
            _react2.default.createElement(
              "a",
              null,
              value
            )
          );
        }
      }
    }, { name: "Owner Name", labelKey: "WS_COMMON_TABLE_COL_OWN_NAME_LABEL" }, { name: "Status", labelKey: "WS_COMMON_TABLE_COL_STATUS_LABEL" }, { name: "Due", labelKey: "WS_COMMON_TABLE_COL_DUE_LABEL" }, { name: "Address", labelKey: "WS_COMMON_TABLE_COL_ADDRESS" }, { name: "Due Date", labelKey: "WS_COMMON_TABLE_COL_DUE_DATE_LABEL" }, {
      name: "Action",
      labelKey: "PT_COMMON_TABLE_COL_ACTION_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, data) {
          if (data.rowData[4] !== undefined && typeof data.rowData[4] === 'number') {
            return _react2.default.createElement(
              "div",
              { className: "linkStyle", onClick: function onClick() {
                  return getViewBillDetails(data);
                }, style: { color: '#fe7a51', textTransform: 'uppercase' } },
              _react2.default.createElement(_LabelContainer2.default, {
                labelKey: "CS_COMMON_PAY",
                style: {
                  color: "#fe7a51",
                  fontSize: 14
                }
              })
            );
          } else {
            return "NA";
          }
        }
      }
    }, {
      name: "Tenant Id",
      labelKey: "WS_COMMON_TABLE_COL_TENANTID_LABEL",
      options: {
        display: false
      }
    }, {
      name: "Connection Type",
      labelKey: "WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL",
      options: {
        display: false
      }
    }],
    title: {
      labelKey: "WS_HOME_SEARCH_RESULTS_TABLE_HEADING",
      labelName: "Search Results for Water & Sewerage Connections"
    },
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

var getConnectionDetails = function getConnectionDetails(data) {
  var environment = process.env.NODE_ENV === "production" ? "citizen" : "";
  var origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;
  window.location.assign("" + origin + environment + "/wns/connection-details?connectionNumber=" + data.rowData[1] + "&tenantId=" + data.rowData[8] + "&service=" + data.rowData[0] + "&connectionType=" + data.rowData[9] + "&due=" + data.rowData[4]);
};

var getViewBillDetails = function getViewBillDetails(data) {
  _store2.default.dispatch((0, _actions.setRoute)("/wns/viewBill?connectionNumber=" + data.rowData[1] + "&tenantId=" + data.rowData[8] + "&service=" + data.rowData[0] + "&connectionType=" + data.rowData[9]));
};