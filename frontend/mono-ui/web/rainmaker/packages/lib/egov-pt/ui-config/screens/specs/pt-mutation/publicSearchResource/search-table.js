"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPropertyTable = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../../utils");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchPropertyTable = exports.searchPropertyTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "propertyTab",
    columns: [{ labelName: "Property ID", labelKey: "PT_MUTATION_PID" }, { labelName: "Owner Name", labelKey: "PT_COMMON_TABLE_COL_OWNER_NAME" }, { labelName: "Address", labelKey: "PT_COMMON_COL_ADDRESS" }, {
      labelName: "Property Status",
      labelKey: "PT_COMMON_TABLE_PROPERTY_STATUS"
    }, { labelName: "Amount Due", labelKey: "PT_AMOUNT_DUE" }, {
      labelName: "Action",
      labelKey: "PT_COMMON_TABLE_COL_ACTION_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return value.totalAmount > 0 && value.status === "ACTIVE" ? getPayButton(tableMeta) : value.totalAmount === 0 && value.status === "ACTIVE" && value.isAdvancePaymentAllowed ? getPayButton(tableMeta) : "";
        }
      }
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }, {
      labelName: "Advance Payment",
      labelKey: "ADVANCE_PAYMENT",
      options: {
        display: false
      }
    }],
    title: {
      labelName: "Search Results for Properties",
      labelKey: "PT_HOME_PROPERTY_RESULTS_TABLE_HEADING"
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: false,
      hint: "",
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

var payAmount = function payAmount(tableMeta) {
  var data = tableMeta.rowData[5] || {};
  // if(data.warningEnabled&&data.isInvalidNum){
  //   store.dispatch(prepareFinalObject("pt-warning-popup", { link: `/withoutAuth/egov-common/pay?consumerCode=${tableMeta.rowData[0]}&tenantId=${tableMeta.rowData[6]}&businessService=PT`, UpdateNumber: data.UpdateNumber, showPopup: true }));
  // }else{
  (0, _commons.setRoute)("/withoutAuth/egov-common/pay?consumerCode=" + tableMeta.rowData[0] + "&tenantId=" + tableMeta.rowData[6] + "&businessService=PT");
  // }  
};

var getPayButton = function getPayButton(tableMeta) {
  return _react2.default.createElement(
    "a",
    { href: "javascript:void(0)",
      onClick: function onClick() {
        return payAmount(tableMeta);
      },
      style: { color: "#FE7A51" }
    },
    _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "PT_TOTALDUES_PAY", labelName: "PAY" })
  );
};