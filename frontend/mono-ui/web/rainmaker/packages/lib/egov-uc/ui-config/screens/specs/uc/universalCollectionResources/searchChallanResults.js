"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchChallanResults = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchChallanResults = exports.SearchChallanResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelName: "Challan No",
      labelKey: "UC_CHALLAN_NO_LABEL",
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
      labelName: "Consumer Name",
      labelKey: "UC_COMMON_TABLE_COL_PAYEE_NAME"
    }, {
      labelName: "Service Type",
      labelKey: "UC_SERVICE_TYPE_LABEL"
    }, {
      labelName: "Status",
      labelKey: "UC_COMMON_TABLE_COL_STATUS",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value.includes("CANCELLED") ? { color: "red" } : { color: "green" },
            labelKey: (0, _commons.getStatusKey)(value).labelKey,
            labelName: (0, _commons.getStatusKey)(value).labelName
          });
        }
      }
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false,
        viewColumns: false
      }
    }, {
      labelName: "BusinessService",
      labelKey: "BUSINESS_SERVICE",
      options: {
        display: false,
        viewColumns: false
      }
    }],
    title: {
      labelName: "Search Results",
      labelKey: "COMMON_TABLE_SEARCH_RESULT"
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
    customSortColumn: {}

  }
};

var onRowClick = function onRowClick(rowData) {
  window.location.href = "search-preview?applicationNumber=" + rowData[0] + "&businessService=" + rowData[5] + "&tenantId=" + rowData[4] + "&status=" + rowData[3];
};