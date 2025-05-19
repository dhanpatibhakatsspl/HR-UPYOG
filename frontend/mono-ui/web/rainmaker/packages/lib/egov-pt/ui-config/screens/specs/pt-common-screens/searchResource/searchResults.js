"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPropertyTable = exports.getQueryRedirectUrl = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../../utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getQueryRedirectUrl = exports.getQueryRedirectUrl = function getQueryRedirectUrl() {
  var url = (0, _commons.getQueryArg)(window.location.href, "redirectUrl");
  var isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
  if (isMode === "MODIFY") {
    var connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var action = (0, _commons.getQueryArg)(window.location.href, "action");
    var modeaction = (0, _commons.getQueryArg)(window.location.href, "modeaction");
    var returnUrl = url + "&connectionNumber=" + connectionNumber + "&tenantId=" + tenantId + "&action=" + action + "&mode=" + isMode;
    returnUrl = modeaction ? returnUrl + '&modeaction=' + modeaction : returnUrl;
    return returnUrl;
  } else {
    url = url.includes('?') ? url : url + '?';
    var applicationNo = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var connectionNo = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
    var actionType = (0, _commons.getQueryArg)(window.location.href, "action");
    url = applicationNo && !url.includes('applicationNumber') ? url + ("&applicationNumber=" + applicationNo) : url;
    url = connectionNo && !url.includes('connectionNumber') ? url + ("&connectionNumber=" + connectionNo) : url;
    url = actionType && !url.includes('action') ? url + ("&action=" + actionType) : url;
    return url;
  }
};

var searchPropertyTable = exports.searchPropertyTable = {
  uiFramework: "custom-molecules",
  moduleName: "egov-pt",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [{
      name: "Unique Property ID",
      labelKey: "PT_COMMON_TABLE_COL_PT_ID",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "span",
            { style: { color: "black", cursor: "auto" } },
            value
          );
        }
      }
    }, { name: "Owner Name", labelKey: "PT_COMMON_TABLE_COL_OWNER_NAME" }, { name: "Address", labelKey: "PT_COMMON_COL_ADDRESS" }, {
      name: "Action",
      labelKey: "PT_COMMON_TABLE_COL_ACTION_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, data) {
          var styleSelect = {};
          styleSelect.color = "red";
          styleSelect.cursor = data.rowData[3] !== "INACTIVE" ? "pointer" : "initial";
          return _react2.default.createElement(_uiContainers.LabelContainer, { style: styleSelect, onClick: function onClick() {
              getSelect(data);
            },
            labelKey: (0, _commons.getStatusKey)(value).labelKey,
            labelName: (0, _commons.getStatusKey)(value).labelName
          });
        }
      }
    }, {
      name: "tenantId",
      labelKey: "PT_COMMON_TABLE_COL_TENANTID_LABEL",
      options: {
        display: false
      }
    }],
    title: { labelKey: "PT_HOME_PROPERTY_RESULTS_TABLE_HEADING", labelName: "Search Results for Properties" },
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

var getSelect = function getSelect(data) {
  var storeData = _store2.default.getState();
  var isCheckFromWNS = (0, _get2.default)(storeData, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.isCheckFromWNS", false);
  if (isCheckFromWNS) {
    if (data.rowData[3] != 'SELECT') {
      return false;
    }
    var isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
    if (isMode === "MODIFY") {
      _store2.default.dispatch((0, _actions.setRoute)(getQueryRedirectUrl() + "&propertyId=" + data.rowData[0]));
    } else {
      _store2.default.dispatch((0, _actions.setRoute)(getQueryRedirectUrl() + "&propertyId=" + data.rowData[0] + "&tenantId=" + data.rowData[4]));
    }
  } else {
    // if ((data.rowData[3] !== 'SELECT') || (data.rowData[3] !== 'INWORKFLOW') ) {
    //   return false;
    // }
    var isSelectApp = true,
        isInWorkflowApp = true;
    if (data.rowData[3] != 'SELECT') isSelectApp = false;
    if (data.rowData[3] != 'INWORKFLOW') isInWorkflowApp = false;
    if (!isSelectApp && !isInWorkflowApp) {
      return false;
    }
    var _isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
    if (_isMode === "MODIFY") {
      _store2.default.dispatch((0, _actions.setRoute)(getQueryRedirectUrl() + "&propertyId=" + data.rowData[0]));
    } else {
      _store2.default.dispatch((0, _actions.setRoute)(getQueryRedirectUrl() + "&propertyId=" + data.rowData[0] + "&tenantId=" + data.rowData[4]));
    }
  }
};