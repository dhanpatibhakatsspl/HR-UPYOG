"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _commons = require("egov-common/ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../../utils");

var _receiptPdf = require("../../utils/receiptPdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStatusColumn = function getStatusColumn(value, tableMeta) {
  var meta = tableMeta && tableMeta.rowData[9] || {};

  var status = meta.status;
  switch (status) {
    case "DONE":
      return _react2.default.createElement(
        "div",
        { "class": "progress", style: { marginTop: "15px" } },
        _react2.default.createElement(
          "div",
          {
            "class": "progress-bar progress-bar-" + "success",
            role: "progressbar",
            ariaValuenow: 100,
            ariaValuemin: "0",
            ariaValuemax: 100,
            style: {
              fontSize: "inherit",
              fontWeight: "600",
              color: "black",
              width: Number(100).toFixed() + "%"
            }
          },
          _react2.default.createElement(
            "span",
            { style: { position: "unset" } },
            Number(100).toFixed() + "%"
          )
        )
      );
    case "INPROGRESS":
      return _react2.default.createElement(
        "div",
        { "class": "progress", style: { marginTop: "15px" } },
        _react2.default.createElement(
          "div",
          {
            "class": "progress-bar progress-bar-" + "success",
            role: "progressbar",
            ariaValuenow: tableMeta.rowData[9] && tableMeta.rowData[9].recordscompleted,
            ariaValuemin: "0",
            ariaValuemax: tableMeta.rowData[9] && tableMeta.rowData[9].totalrecords,
            style: {
              fontSize: "inherit",
              fontWeight: "600",
              color: "black",
              width: Number(value).toFixed() + "%"
            }
          },
          _react2.default.createElement(
            "span",
            { style: { position: "unset" } },
            value ? Number(value).toFixed() + "%" : (0, _commons2.getLocaleLabels)("GRP_BILL_INITIATED", "GRP_BILL_INITIATED")
          )
        )
      );
    case "FAILED":
    case "EXPIRED":
      return _react2.default.createElement(
        "div",
        { "class": "progress", style: { marginTop: "15px" } },
        _react2.default.createElement(
          "div",
          {
            "class": "progress-bar progress-bar-" + "danger",
            role: "progressbar",
            ariaValuenow: 100,
            ariaValuemin: "0",
            ariaValuemax: 100,
            style: {
              fontSize: "inherit",
              fontWeight: "600",
              color: "black",
              width: Number(100).toFixed() + "%"
            }
          },
          _react2.default.createElement(
            "span",
            { style: { position: "unset" } },
            (0, _commons2.getLocaleLabels)("GRP_BILL_" + status, "GRP_BILL_" + status)
          )
        )
      );
    case "CANCEL":
      return _react2.default.createElement(
        "div",
        { "class": "progress", style: { marginTop: "15px" } },
        _react2.default.createElement(
          "div",
          {
            "class": "progress-bar progress-bar-" + "danger",
            role: "progressbar",
            ariaValuenow: 100,
            ariaValuemin: "0",
            ariaValuemax: 100,
            style: {
              fontSize: "inherit",
              fontWeight: "600",
              color: "black",
              width: Number(100).toFixed() + "%"
            }
          },
          _react2.default.createElement(
            "span",
            { style: { position: "unset" } },
            (0, _commons2.getLocaleLabels)("GRP_BILL_CANCELLED", "GRP_BILL_CANCELLED")
          )
        )
      );
    case "DUMMY":
      return _react2.default.createElement(
        "div",
        { "class": "progress", style: { marginTop: "15px" } },
        _react2.default.createElement(
          "div",
          {
            "class": "progress-bar progress-bar-" + (tableMeta.rowData[7] ? "danger" : "success"),
            role: "progressbar",
            ariaValuenow: tableMeta.rowData[9] && tableMeta.rowData[9].recordscompleted,
            ariaValuemin: "0",
            ariaValuemax: tableMeta.rowData[9] && tableMeta.rowData[9].totalrecords,
            style: {
              fontSize: "inherit",
              fontWeight: "600",
              color: "black",
              width: Number(value).toFixed() + "%"
            }
          },
          _react2.default.createElement(
            "span",
            { style: { position: "unset" } },
            value ? tableMeta.rowData[7] ? (0, _commons2.getLocaleLabels)(value == 100 ? "GRP_BILL_EXPIRED" : "GRP_BILL_FAILED", value == 100 ? "GRP_BILL_EXPIRED" : "GRP_BILL_FAILED") : Number(value).toFixed() + "%" : (0, _commons2.getLocaleLabels)("GRP_BILL_INITIATED", "GRP_BILL_INITIATED")
          )
        )
      );
  }
};

var getActionColumn = function getActionColumn(value, tableMeta) {
  var meta = tableMeta && tableMeta.rowData[9] || {};

  var status = meta.status;
  switch (status) {
    case "DONE":
      return _react2.default.createElement(
        "span",
        { "class": "jk-tooltip" },
        _react2.default.createElement(
          "div",
          {
            style: { color: "#FE7A51", cursor: "pointer" },
            onClick: function onClick() {
              (0, _commons.downloadMultipleFileFromFilestoreIds)([value], "download", tableMeta.rowData[6]);
            }
          },
          _react2.default.createElement(
            "span",
            { "class": "jk-tooltiptext" },
            (0, _commons2.getLocaleLabels)("ABG_DOWNLOAD_EXPIREDIN", "ABG_DOWNLOAD_EXPIREDIN")
          ),
          (0, _commons2.getLocaleLabels)("GRP_BILL_ACT_DOWNLOAD", "GRP_BILL_ACT_DOWNLOAD")
        )
      );

    case "INPROGRESS":
      var val = meta.recordscompleted / meta.totalrecords * 100;
      return val ? _react2.default.createElement(
        "div",
        {
          style: { color: "#FE7A51", cursor: "pointer" },
          onClick: function onClick() {
            (0, _receiptPdf.cancelGeneratedJob)(_store2.default.dispatch, meta.jobid);
          }
        },
        (0, _commons2.getLocaleLabels)("GRP_BILL_ACT_CANCEL", "GRP_BILL_ACT_CANCEL")
      ) : _react2.default.createElement(
        "span",
        null,
        (0, _commons2.getLocaleLabels)("CMN_NA", "CMN_NA")
      );
    case "FAILED":
    case "EXPIRED":
      return _react2.default.createElement(
        "div",
        {
          style: { color: "#FE7A51", cursor: "pointer" },
          onClick: function onClick() {
            var state = _store2.default.getState();
            var commonPayDetails = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.searchScreenMdmsData.common-masters.uiCommonPay", []);
            var billkey = (0, _get2.default)(commonPayDetails.filter(function (item) {
              return item.code == tableMeta.rowData[8].bussinessService;
            })[0], "billKey", "");
            (0, _receiptPdf.downloadMultipleBills)([], billkey, tableMeta.rowData[6], tableMeta.rowData[8].locality, tableMeta.rowData[8].isConsolidated, tableMeta.rowData[8].bussinessService, tableMeta.rowData[8].consumercode, _store2.default.dispatch);
          }
        },
        (0, _commons2.getLocaleLabels)("GRP_BILL_ACT_RETRY", "GRP_BILL_ACT_RETRY")
      );
    case "CANCEL":
      return _react2.default.createElement(
        "span",
        null,
        (0, _commons2.getLocaleLabels)("CMN_NA", "CMN_NA")
      );
    case "DUMMY":
      return _react2.default.createElement(
        "span",
        { "class": "jk-tooltip" },
        value || meta.success || meta.failed || meta.expired ? _react2.default.createElement(
          "div",
          {
            style: { color: "#FE7A51", cursor: "pointer" },
            onClick: function onClick() {
              if (meta.success) {
                var state = _store2.default.getState();

                var commonPayDetails = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.searchScreenMdmsData.common-masters.uiCommonPay", []);
                var billkey = (0, _get2.default)(commonPayDetails.filter(function (item) {
                  return item.code == tableMeta.rowData[8].bussinessService;
                })[0], "billKey", "");
                (0, _receiptPdf.downloadMultipleBills)([], billkey, tableMeta.rowData[6], tableMeta.rowData[8].locality, tableMeta.rowData[8].isConsolidated, tableMeta.rowData[8].bussinessService, tableMeta.rowData[8].consumercode, _store2.default.dispatch);
              } else {
                (0, _commons.downloadMultipleFileFromFilestoreIds)([value], "download", tableMeta.rowData[6]);
              }
            }
          },
          meta.expired && _react2.default.createElement(
            "span",
            { "class": "jk-tooltiptext" },
            (0, _commons2.getLocaleLabels)("ABG_DOWNLOAD_EXPIREDIN", "ABG_DOWNLOAD_EXPIREDIN")
          ),
          (0, _commons2.getLocaleLabels)(!meta.success ? "GRP_BILL_ACT_RETRY" : "GRP_BILL_ACT_DOWNLOAD", !tableMeta.rowData[8].success ? "GRP_BILL_ACT_RETRY" : "GRP_BILL_ACT_DOWNLOAD")
        ) : meta && meta.recordscompleted > 0 ? _react2.default.createElement(
          "div",
          {
            style: { color: "#FE7A51", cursor: "pointer" },
            onClick: function onClick() {
              (0, _receiptPdf.cancelGeneratedJob)(_store2.default.dispatch, meta.jobid);
            }
          },
          (0, _commons2.getLocaleLabels)("GRP_BILL_ACT_CANCEL", "GRP_BILL_ACT_CANCEL")
        ) : (0, _commons2.getLocaleLabels)("CMN_NA", "CMN_NA")
      );
  }
};
var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Bill No.",
      labelKey: "TL_DATE_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return _react2.default.createElement(
            "span",
            { style: { cursor: "initial", color: "black" } },
            new Date(Number(value)).toLocaleDateString()
          );
        }
      }
    }, {
      labelName: "Consumer Name",
      labelKey: "BUSINESS_SERVICE",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          var replaceKey = tableMeta.rowData[8].bussinessService == "WS" ? "_WS" : "_SW";
          var replaceWith = tableMeta.rowData[8].bussinessService == "WS" ? "_SW" : "_WS";
          var newKey = value.replace(replaceKey, replaceWith);
          return _react2.default.createElement(
            "span",
            null,
            tableMeta.rowData[8].isConsolidated ? (0, _commons2.getLocaleLabels)(value, value) + " , " + (0, _commons2.getLocaleLabels)(newKey, newKey) : (0, _commons2.getLocaleLabels)(value, value)
          );
        }
      }
    }, {
      labelName: "Bill Date",
      labelKey: "CS_INBOX_LOCALITY_FILTER",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            null,
            (0, _commons2.getLocaleLabels)(value, value)
          );
        }
      }
    }, {
      labelName: "Bill Amount(Rs)",
      labelKey: "PAYMENT_COMMON_CONSUMER_CODE"
    }, {
      labelName: "Status",
      labelKey: "ABG_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return getStatusColumn(value, tableMeta);
        }
      }
    }, {
      labelName: "Action",
      labelKey: "ABG_COMMON_TABLE_COL_ACTION",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          var meta = tableMeta && tableMeta.rowData[9] || {};
          return meta ? getActionColumn(value, tableMeta) : _react2.default.createElement(
            "span",
            null,
            (0, _commons2.getLocaleLabels)("CMN_NA", "CMN_NA")
          );
        }
      }
    }, {
      name: "connectionType",
      labelKey: "ABG_COMMON_TABLE_TENANT",
      options: {
        display: false
      }
    }, {
      name: "connectionType",
      labelKey: "ABG_IS_FAILED",
      options: {
        display: false
      }
    }, {
      name: "connectionType",
      labelKey: "ABG_RETRY_OBJ",
      options: {
        display: false
      }
    }, {
      name: "connectionType",
      labelKey: "ABG_PROGRESS_OBJ",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "",
      labelKey: "GRP_BILL_LIST_OF_JOBS"
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
      column: (0, _commons2.getLocaleLabels)("TL_DATE_LABEL", "TL_DATE_LABEL"),
      sortingFn: function sortingFn(data, i, sortDateOrder) {
        var epochDates = data.reduce(function (acc, curr) {
          acc.push([curr[0]]);
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