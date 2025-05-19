"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = exports.textToLocalMapping = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils = require("../../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocalTextFromCode = function getLocalTextFromCode(localCode) {
  return JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN")).find(function (item) {
    return item.code === localCode;
  });
};

var textToLocalMapping = exports.textToLocalMapping = {
  "Application No": (0, _commons.getLocaleLabels)("Application No", "NOC_COMMON_TABLE_COL_APP_NO_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "NOC No": (0, _commons.getLocaleLabels)("NOC No", "NOC_COMMON_TABLE_COL_NOC_NO_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "NOC Type": (0, _commons.getLocaleLabels)("NOC Type", "NOC_TYPE_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Owner Name": (0, _commons.getLocaleLabels)("Owner Name", "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Application Date": (0, _commons.getLocaleLabels)("Application Date", "BPA_COMMON_TABLE_COL_APP_DATE_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  Status: (0, _commons.getLocaleLabels)("Status", "BPA_COMMON_TABLE_COL_STATUS_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  INITIATED: (0, _commons.getLocaleLabels)("Initiated,", "NOC_INITIATED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  APPLIED: (0, _commons.getLocaleLabels)("Applied", "NOC_APPLIED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  DOCUMENTVERIFY: (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_FIRENOC_DOCUMENTVERIFY", (0, _commons.getTransformedLocalStorgaeLabels)()),
  APPROVED: (0, _commons.getLocaleLabels)("Approved", "NOC_APPROVED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  REJECTED: (0, _commons.getLocaleLabels)("Rejected", "NOC_REJECTED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  CANCELLED: (0, _commons.getLocaleLabels)("Cancelled", "NOC_CANCELLED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  PENDINGAPPROVAL: (0, _commons.getLocaleLabels)("Pending for Approval", "WF_FIRENOC_PENDINGAPPROVAL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  PENDINGPAYMENT: (0, _commons.getLocaleLabels)("Pending payment", "WF_FIRENOC_PENDINGPAYMENT", (0, _commons.getTransformedLocalStorgaeLabels)()),
  FIELDINSPECTION: (0, _commons.getLocaleLabels)("Pending for Field Inspection", "WF_FIRENOC_FIELDINSPECTION", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Search Results for BPA Applications": (0, _commons.getLocaleLabels)("Search Results for BPA Applications", "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING", (0, _commons.getTransformedLocalStorgaeLabels)())
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      name: "Application No", labelKey: "BPA_COMMON_TABLE_COL_APP_NO"
    }, {
      name: "Owner Name", labelKey: "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL"
    }, {
      name: "Application Date", labelKey: "BPA_COMMON_TABLE_COL_APP_DATE_LABEL"
    }, {
      name: "Status", labelKey: "BPA_COMMON_TABLE_COL_STATUS_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            {
              style: value === "Approved" ? { color: "green" } : { color: "red" }
            },
            value
          );
        }
      }
    }, {
      name: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }, {
      name: "serviceType",
      labelKey: "SERVICE_TYPE",
      options: {
        display: false
      }
    }],
    title: { labelKey: "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING", labelName: "Search Results for BPA Applications" },
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
  var tenantId = rowData[4];
  if (rowData[5] == "BPA_OC") {
    var environment = process.env.NODE_ENV === "production" ? "employee" : "";
    var origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;
    switch (state) {
      case "INITIATED":
        window.location.assign("" + origin + environment + "/oc-bpa/apply?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId);
        break;
      default:
        window.location.assign("" + origin + environment + "/oc-bpa/search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId);
        break;
    }
  } else {
    var type = "HIGH";
    if (rowData[5] == "BPA_LOW") {
      type = "LOW";
    }
    switch (state) {
      case "INITIATED":
        window.location.href = "apply?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId + "&type=" + type;
        break;
      default:
        window.location.href = "search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId + "&type=" + type;
        break;
    }
  }
};