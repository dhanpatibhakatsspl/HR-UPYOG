"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require("../../utils");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: true,
  props: {
    data: [],
    columns: [{
      labelName: "Application No",
      labelKey: "TL_COMMON_TABLE_COL_APP_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return React.createElement(
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
      labelName: "Status",
      labelKey: "TL_COMMON_TABLE_COL_STATUS"
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }],
    // columns: {
    //   [get(textToLocalMapping, "Application No")]: {
    //     format: rowData => {
    //       return (
    //         <Link to={onRowClick(rowData)}>
    //           {rowData[get(textToLocalMapping, "Application No")]}
    //         </Link>
    //       );
    //     }
    //   },
    //   [get(textToLocalMapping, "License No")]: {},
    //   [get(textToLocalMapping, "Trade Name")]: {},
    //   [get(textToLocalMapping, "Owner Name")]: {},
    //   [get(textToLocalMapping, "Application Date")]: {},
    //   [get(textToLocalMapping, "Status")]: {
    //     format: rowData => {
    //       let value = rowData[get(textToLocalMapping, "Status")];
    //       let color = "";
    //       if (value.indexOf(get(textToLocalMapping, "APPROVED")) !== -1) {
    //         color = "green";
    //       } else {
    //         color = "red";
    //       }
    //       return (
    //         <span
    //           style={{
    //             color: color,
    //             fontSize: "14px",
    //             fontWeight: 400
    //           }}
    //         >
    //           {value}
    //         </span>
    //       );
    //     }
    //   }
    // },
    title: {
      labelName: "MY_APPLICATIONS",
      labelKey: "TL_MY_APPLICATIONS"
    },
    options: {
      filter: false,
      download: false,
      responsive: "scroll",
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