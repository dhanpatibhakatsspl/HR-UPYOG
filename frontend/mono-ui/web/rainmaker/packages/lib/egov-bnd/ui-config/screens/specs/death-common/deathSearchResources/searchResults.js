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

var _commons = require("egov-common/ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _deathSearchCard = require("./deathSearchCard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
    // {
    //   labelName: "Bill No.",
    //   labelKey: "ABG_COMMON_TABLE_COL_BILL_NO",
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <a href="javascript:void(0)"
    //         onClick={() => {
    //           const receiptQueryString = [
    //             {
    //               key: 'challanNo',
    //               value: tableMeta.rowData[1]
    //             },
    //             { key: 'tenantId', value: tableMeta.rowData[10] }];
    //             downloadChallan(receiptQueryString,"download");
    //          // downloadBill(tableMeta.rowData[1], tableMeta.rowData[10], tableMeta.rowData[9],tableMeta.rowData[12]);
    //         }}
    //       >
    //         {value}
    //       </a>
    //     )
    //   }
    // },
    {
      labelName: "Id",
      labelKey: "BND_COMMON_TABLE_ID",
      options: {
        display: false,
        viewColumns: false
      }
    }, {
      labelName: "Registration Number",
      labelKey: "BND_COMMON_TABLE_REGNO"
    }, {
      labelName: "Name",
      labelKey: "BND_COMMON_NAME"
    }, {
      labelName: "Death Date",
      labelKey: "BND_DEATH_DATE"
    }, {
      labelName: "Gender",
      labelKey: "BND_COMMON_GENDER"
    }, {
      labelName: "Mother's Name",
      labelKey: "BND_COMMON_MOTHERSNAME"
    }, {
      labelName: "Father's Name",
      labelKey: "BND_COMMON_FATHERSNAME"
    }, {
      labelName: "Spouse's Name",
      labelKey: "BND_SPOUSE_NAME_LABEL"
    }, {
      labelName: "Action",
      labelKey: "BND_COMMON_TABLE_ACTION",
      options: {
        display: process.env.REACT_APP_NAME === "Citizen",
        viewColumns: process.env.REACT_APP_NAME === "Citizen",
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return value === "PAY AND DOWNLOAD" ? tableMeta.rowData[4] > 0 ? getActionButton(value, tableMeta) : tableMeta.rowData[4] <= 0 && tableMeta.rowData[13] ? getActionButton(value, tableMeta) : "" : getActionButton(value, tableMeta);
        }
      }
    },
    // {
    //   labelName: "Status",
    //   labelKey: "ABG_COMMON_TABLE_COL_STATUS",
    //   options:{
    //     filter: false,
    //     customBodyRender: value => (
    //       <span>
    //          {getLocaleLabels(value.toUpperCase(),value.toUpperCase())}
    //       </span>
    //     )
    //   }
    // },
    // {
    //   labelName: "Action",
    //   labelKey: "ABG_COMMON_TABLE_COL_ACTION",
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta) => value === "PAY" ? (tableMeta.rowData[4] > 0 ? getActionButton(value, tableMeta):(tableMeta.rowData[4] <= 0 && tableMeta.rowData[13] ? getActionButton(value, tableMeta) : "")) : getActionButton(value, tableMeta)
    //   }
    // },
    {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false,
        viewColumns: false
      }
    }, {
      labelName: "Business Service",
      labelKey: "BUSINESS_SERVICE",
      options: {
        display: false,
        viewColumns: false
      }
    }, {
      labelName: "BND_VIEW_CERTIFICATE",
      labelKey: "BND_VIEW_CERTIFICATE",
      options: {
        display: process.env.REACT_APP_NAME === "Employee",
        viewColumns: process.env.REACT_APP_NAME === "Employee",
        customBodyRender: function customBodyRender(value, tableMeta) {
          return getViewButton(value, tableMeta);
        }
      }
    }],
    title: {
      labelName: "Search Results for Death",
      labelKey: "BND_SEARCH_TABLE_HEADER"
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      ignoreFirstColumnHover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Death Date",
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
    {
      href: "javascript:void(0)",
      style: {
        color: "#FE7A51",
        cursor: "pointer"
      },
      onClick: function onClick(value) {
        var tenantId = tableMeta.rowData[9];
        var id = tableMeta.rowData[0];
        var action = tableMeta.rowData[8];
        var businessService = tableMeta.rowData[10];

        _store2.default.dispatch((0, _actions.prepareFinalObject)("bnd.death.download.certificateId", id));
        _store2.default.dispatch((0, _actions.prepareFinalObject)("bnd.death.download.tenantId", tenantId));
        _store2.default.dispatch((0, _actions.prepareFinalObject)("bnd.death.download.businessService", businessService));

        (0, _deathSearchCard.showHideConfirmationPopup)(_store2.default.getState(), _store2.default.dispatch, "getCertificate");

        //}
      }
    },
    (0, _commons2.getLocaleLabels)(value, value)
  );
};

var getViewButton = function getViewButton(value, tableMeta) {
  return _react2.default.createElement(
    "a",
    {
      href: "javascript:void(0)",
      style: {
        color: "#FE7A51",
        cursor: "pointer"
      },
      onClick: function onClick(value) {
        var id = tableMeta.rowData[0];
        var tenantId = tableMeta.rowData[9];
        var url = "/employee/bnd-common/fullViewCertificate?tenantId=" + tenantId + "&certificateId=" + id + "&module=death";
        document.location.href = "" + document.location.origin + url;
      }
    },
    (0, _commons2.getLocaleLabels)(value, value)
  );
};