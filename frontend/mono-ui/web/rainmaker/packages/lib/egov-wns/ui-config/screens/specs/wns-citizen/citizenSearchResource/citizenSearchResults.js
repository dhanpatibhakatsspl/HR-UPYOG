"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: true,
  props: {
    data: [],
    columns: [(0, _utils.getTextToLocalMapping)("Application No"), (0, _utils.getTextToLocalMapping)("License No"), (0, _utils.getTextToLocalMapping)("Trade Name"), (0, _utils.getTextToLocalMapping)("Owner Name"), (0, _utils.getTextToLocalMapping)("Application Date"), (0, _utils.getTextToLocalMapping)("Status"), {
      name: "tenantId",
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
    title: (0, _utils.getTextToLocalMapping)("MY_APPLICATIONS"),
    options: {
      filter: false,
      download: false,
      responsive: "scroll",
      selectableRows: false,
      hover: true,
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
  switch (rowData[5]) {
    case "INITIATED":
      window.location.href = "apply?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6];
      break;
    default:
      window.location.href = "search-preview?applicationNumber=" + rowData[0] + "&tenantId=" + rowData[6];
      break;
  }
};