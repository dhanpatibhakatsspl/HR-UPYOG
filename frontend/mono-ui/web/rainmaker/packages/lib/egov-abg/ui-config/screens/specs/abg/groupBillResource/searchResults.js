"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("egov-ui-framework/ui-utils/api.js");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

var _searchResults = require("../billSearchResources/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConsumerDetail = function getConsumerDetail(propertyResponse) {
  return {
    propertyId: (0, _get2.default)(propertyResponse, "Properties[0].propertyId", "NA"),
    name: (0, _get2.default)(propertyResponse, "Properties[0].propertyDetails[0].owners[0].name", "NA"),
    mobileno: (0, _get2.default)(propertyResponse, "Properties[0].propertyDetails[0].owners[0].mobileNumber", "NA"),
    address: (0, _get2.default)(propertyResponse, "Properties[0].address.city", "NA"),
    locality: (0, _get2.default)(propertyResponse, "Properties[0].address.locality.name", "NA")
  };
};

var getBillDetails = function getBillDetails(billResponse) {
  var requiredData = [];

  var billAccountDetails = (0, _get2.default)(billResponse, "Receipt[0].Bill[0].billDetails[0].billAccountDetails", []);
  for (var i = 0; i < billAccountDetails.length; i++) {
    var obj = {
      TaxHead: billAccountDetails[i].taxHeadCode,
      Amount: billAccountDetails[i].amount,
      Arrear: 0,
      Adjustmeents: 0,
      Total: 0
    };
    requiredData.push(obj);
  }
};

var onDownloadClick = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rowData) {
    var queryObject1, queryObject2, propertyendpoint, propertyResponse, billendpoint, billResponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject1 = [{
              key: "ids",
              value: rowData["Property ID"]
            }, {
              key: "tenantId",
              value: (0, _localStorageUtils.localStorageGet)("tenant-id")
            }];
            queryObject2 = [{
              key: "consumerCode",
              value: rowData["Property ID"] + ":" + rowData["Assessment No"]
            }, {
              key: "tenantId",
              value: (0, _localStorageUtils.localStorageGet)("tenant-id")
            }];
            propertyendpoint = "/pt-services-v2/property/_search";
            _context.next = 5;
            return (0, _api.httpRequest)("post", propertyendpoint, "", queryObject1);

          case 5:
            propertyResponse = _context.sent;
            billendpoint = "/collection-services-v1/receipts/_search";
            _context.next = 9;
            return (0, _api.httpRequest)("post", billendpoint, "", queryObject2);

          case 9:
            billResponse = _context.sent;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function onDownloadClick(_x) {
    return _ref.apply(this, arguments);
  };
}();

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      labelKey: "ABG_COMMON_TABLE_COL_BILL_NO",
      labelName: "Bill No.",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return _react2.default.createElement(
            "a",
            { href: "javascript:void(0)", onClick: function onClick() {
                return (0, _searchResults.billDownload)(tableMeta.rowData[1], tableMeta.rowData[5], tableMeta.rowData[7], tableMeta.rowData[6], tableMeta.rowData[8]);
              } },
            value
          );
        }
      }
    }, { labelName: "Consumer ID", labelKey: "ABG_COMMON_TABLE_COL_CONSUMER_ID" }, { labelName: "Owner Name", labelKey: "ABG_COMMON_TABLE_COL_OWN_NAME" }, { labelName: "Bill Date", labelKey: "ABG_COMMON_TABLE_COL_BILL_DATE" }, { labelName: "Status", labelKey: "ABG_COMMON_TABLE_COL_STATUS" }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }, {
      labelName: "business URL",
      labelKey: "BUSINESS_URL",
      options: {
        display: false
      }
    }, {
      labelName: "Bill Key",
      labelKey: "BILL_KEY",
      options: {
        display: false
      }
    }, {
      labelKey: "BUSINESS_SERVICE",
      labelName: "Business Service",
      options: {
        display: false
      }
    }],
    title: { labelName: "Search Results for Group Bills", labelKey: "BILL_GENIE_GROUP_SEARCH_HEADER" },
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
      column: "Date Created",
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