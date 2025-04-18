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
      labelName: "License No",
      labelKey: "TL_COMMON_TABLE_COL_LIC_NO"
    }, {
      labelName: "Trade Name",
      labelKey: "TL_COMMON_TABLE_COL_TRD_NAME"
    }, {
      labelName: "Owner Name",
      labelKey: "TL_COMMON_TABLE_COL_OWN_NAME"
    }, {
      labelName: "Application Date",
      labelKey: "TL_COMMON_TABLE_COL_APP_DATE"
    }, {
      labelName: "Financial Year",
      labelKey: "TL_COMMON_TABLE_COL_FIN_YEAR"
    }, {
      labelName: "Application Type",
      labelKey: "TL_COMMON_TABLE_COL_APP_TYPE",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            null,
            (0, _commons.getLocaleLabels)(value, value)
          );
        }
      }
    }, {
      labelName: "Status",
      labelKey: "TL_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value.includes("APPROVED") ? { color: "green" } : { color: "red" },
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
      labelName: "Status",
      labelKey: "TL_COMMON_TABLE_COL_STATUS",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "Search Results for Trade License Applications",
      labelKey: "TL_HOME_SEARCH_RESULTS_TABLE_HEADING"
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
  switch (rowData[7]) {
    case "INITIATED":
      if (rowData[6] == "TL_TYPE_RENEWAL") {
        (0, _formActionUtils.routeTo)("apply?applicationNumber=" + rowData[0] + "&licenseNumber=" + rowData[1] + "&action=EDITRENEWAL&tenantId=" + rowData[8]);
      } else {
        (0, _formActionUtils.routeTo)("apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[8]);
      }
      break;
    default:
      (0, _formActionUtils.routeTo)("search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[8]);
      break;
  }
};