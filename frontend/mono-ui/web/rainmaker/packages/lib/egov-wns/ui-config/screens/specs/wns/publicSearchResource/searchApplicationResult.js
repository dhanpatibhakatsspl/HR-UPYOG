"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.searchApplicationResult = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApplicationResult = exports.searchApplicationResult = {
	uiFramework: "custom-molecules",
	moduleName: "egov-wns",
	componentPath: "Table",
	visible: false,
	props: {
		columns: [{
			name: "Service",
			labelKey: "WS_COMMON_TABLE_COL_SERVICE_LABEL",
			options: {
				filter: false,
				customBodyRender: function customBodyRender(value) {
					return _react2.default.createElement(
						"span",
						{ style: { color: '#000000' } },
						value
					);
				}
			}
		}, {
			name: "Consumer No",
			labelKey: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL",
			options: {
				filter: false,
				customBodyRender: function customBodyRender(value) {
					return _react2.default.createElement(
						"span",
						{ style: { color: '#000000' } },
						value
					);
				}
			}
		}, { name: "Owner Name", labelKey: "WS_COMMON_TABLE_COL_OWN_NAME_LABEL" }, { name: "Address", labelKey: "WS_COMMON_TABLE_COL_ADDRESS" }, { name: "Status", labelKey: "WS_COMMON_TABLE_COL_STATUS_LABEL" }, { name: "Due", labelKey: "WS_COMMON_TABLE_COL_DUE_LABEL" }, { name: "Due Date", labelKey: "WS_COMMON_TABLE_COL_DUE_DATE_LABEL" }, {
			name: "Action",
			labelKey: "WS_COMMON_TABLE_COL_ACTION_LABEL",
			options: {
				filter: false,
				customBodyRender: function customBodyRender(value, tableMeta) {
					return (value.totalAmount >= 0 || value.totalAmount < 0) && value.status === "Active" ? _react2.default.createElement(
						"div",
						{ className: "linkStyle", onClick: function onClick() {
								return getPayDetails(tableMeta);
							} },
						_react2.default.createElement(
							"a",
							null,
							"PAY"
						)
					) : "NA";
				}
			}
		}],
		title: { labelKey: "WS_HOME_SEARCH_RESULTS_TABLE_HEADING", labelName: "Search Results for Water & Sewerage Connections" },
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

var getConnectionDetails = function getConnectionDetails(data) {
	_store2.default.dispatch((0, _actions.setRoute)("connection-details?connectionNumber=" + data.rowData[1] + "&tenantId=" + data.rowData[8] + "&service=" + data.rowData[0] + "&connectionType=" + data.rowData[9] + "&due=" + data.rowData[4]));
};

var getPayDetails = function getPayDetails(tableMeta) {
	_store2.default.dispatch((0, _actions.setRoute)("/withoutAuth/egov-common/pay?consumerCode=" + tableMeta.rowData[7].connectionNo + "&tenantId=" + tableMeta.rowData[7].tenantId + "&businessService=" + tableMeta.rowData[7].businessService));
};