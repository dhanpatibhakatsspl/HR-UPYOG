"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = exports.textToLocalMapping = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

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
  "Owner Name": (0, _commons.getLocaleLabels)("Owner Name", "NOC_COMMON_TABLE_COL_OWN_NAME_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Application Date": (0, _commons.getLocaleLabels)("Application Date", "NOC_COMMON_TABLE_COL_APP_DATE_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  Status: (0, _commons.getLocaleLabels)("Status", "NOC_COMMON_TABLE_COL_STATUS_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  INITIATED: (0, _commons.getLocaleLabels)("Initiated,", "NOC_INITIATED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  APPLIED: (0, _commons.getLocaleLabels)("Applied", "NOC_APPLIED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  DOCUMENTVERIFY: (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_FIRENOC_DOCUMENTVERIFY", (0, _commons.getTransformedLocalStorgaeLabels)()),
  APPROVED: (0, _commons.getLocaleLabels)("Approved", "NOC_APPROVED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  REJECTED: (0, _commons.getLocaleLabels)("Rejected", "NOC_REJECTED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  CANCELLED: (0, _commons.getLocaleLabels)("Cancelled", "NOC_CANCELLED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  PENDINGAPPROVAL: (0, _commons.getLocaleLabels)("Pending for Approval", "WF_FIRENOC_PENDINGAPPROVAL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  PENDINGPAYMENT: (0, _commons.getLocaleLabels)("Pending payment", "WF_FIRENOC_PENDINGPAYMENT", (0, _commons.getTransformedLocalStorgaeLabels)()),
  FIELDINSPECTION: (0, _commons.getLocaleLabels)("Pending for Field Inspection", "WF_FIRENOC_FIELDINSPECTION", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Search Results for Fire-NOC Applications": (0, _commons.getLocaleLabels)("Search Results for Fire-NOC Applications", "NOC_HOME_SEARCH_RESULTS_TABLE_HEADING", (0, _commons.getTransformedLocalStorgaeLabels)())
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Application No",
      labelKey: "TL_COMMON_TABLE_COL_APP_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return _react2.default.createElement(
            "a",
            { href: "javascript:void(0)", onClick: function onClick() {
                return onRowClick(tableMeta.rowData);
              } },
            value
          );
        }
      }
    }, {
      labelName: "NOC No",
      labelKey: "NOC_COMMON_TABLE_COL_NOC_NO_LABEL"
    }, {
      labelName: "NOC Type",
      labelKey: "NOC_TYPE_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            { style: { color: '#000000' } },
            (0, _commons.getLocaleLabels)("NA", (0, _commons.getTransformedLocale)("FN_" + value))
          );
        }
      }
    }, {
      labelName: "Owner Name",
      labelKey: "NOC_COMMON_TABLE_COL_OWN_NAME_LABEL"
    }, {
      labelName: "Application Date",
      labelKey: "NOC_COMMON_TABLE_COL_APP_DATE_LABEL"
    }, {
      labelName: "Status",
      labelKey: "NOC_COMMON_TABLE_COL_STATUS_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value === "APPROVED" ? { color: "green" } : { color: "red" },
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
    }],
    title: {
      labelName: "Search Results for Fire-NOC Applications",
      labelKey: "NOC_HOME_SEARCH_RESULTS_TABLE_HEADING"
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

var onRowClick = function onRowClick(rowData) {
  switch (rowData[5]) {
    case "INITIATED":
      (0, _formActionUtils.routeTo)("apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
      break;
    default:
      (0, _formActionUtils.routeTo)("search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6]);
      break;
  }
};