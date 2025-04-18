"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var diffInDates = function diffInDates(date1, date2) {
  var diffTime = Math.abs(date2 - date1);
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
var getUpdatedStatus = function getUpdatedStatus(item) {
  if (item.status == "DONE") {
    return diffInDates(new Date(Number(item.lastmodifiedtime)), new Date()) < 2 && item.filestoreid ? item.status : "EXPIRED";
  } else if (item.status == "INPROGRESS") {
    return item.recordscompleted === item.totalrecords && !item.filestoreid && item.recordscompleted != 0 ? "FAILED" : item.status;
  } else {
    return item.status;
  }
};
var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, responseFromAPI, bills, billTableData, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryObject = [{
              key: "offset",
              value: 0
            }, { key: "limit", value: 100 }];
            _context.next = 4;
            return (0, _commons2.getBulkPdfRecords)(dispatch, queryObject);

          case 4:
            responseFromAPI = _context.sent;
            bills = responseFromAPI && responseFromAPI.groupBillrecords || [];
            billTableData = bills.map(function (item) {
              return {
                createdtime: (0, _get2.default)(item, "createdtime"),
                locality: (0, _get2.default)(item, "locality"),
                tenantId: (0, _get2.default)(item, "tenantId"),
                jobid: (0, _get2.default)(item, "jobid"),
                consumercode: (0, _get2.default)(item, "consumercode"),
                bussinessService: (0, _get2.default)(item, "bussinessService"),
                isConsolidated: (0, _get2.default)(item, "isConsolidated"),
                lastmodifiedtime: (0, _get2.default)(item, "lastmodifiedtime"),
                totalrecords: (0, _get2.default)(item, "totalrecords"),
                recordscompleted: (0, _get2.default)(item, "recordscompleted"),
                filestoreid: (0, _get2.default)(item, "filestoreid"),
                status: (0, _get2.default)(item, "status")
              };
            });

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.billSearchResponse", bills));

            try {
              data = billTableData.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, "TL_DATE_LABEL", item.createdtime || "-"), (0, _defineProperty3.default)(_ref2, "PAYMENT_COMMON_CONSUMER_CODE", item.consumercode || "-"), (0, _defineProperty3.default)(_ref2, "CS_INBOX_LOCALITY_FILTER", (0, _commons.getTransformedLocale)(item.tenantId) + "_REVENUE_" + item.locality || "-"), (0, _defineProperty3.default)(_ref2, "BUSINESS_SERVICE", "BILLINGSERVICE_BUSINESSSERVICE_" + item.bussinessService || "-"), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_STATUS", item.recordscompleted / item.totalrecords * 100 || ""), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_COL_ACTION", item.filestoreid || ""), (0, _defineProperty3.default)(_ref2, "ABG_COMMON_TABLE_TENANT", item.tenantId || "NA"), (0, _defineProperty3.default)(_ref2, "ABG_IS_FAILED", diffInDates(new Date(Number(item.lastmodifiedtime)), new Date()) > 1 || item.filestoreid == null && item.recordscompleted == item.totalrecords), (0, _defineProperty3.default)(_ref2, "ABG_RETRY_OBJ", {
                  locality: item.locality,
                  consumercode: item.consumercode,
                  isConsolidated: item.isConsolidated,
                  bussinessService: item.bussinessService
                }), (0, _defineProperty3.default)(_ref2, "ABG_PROGRESS_OBJ", {
                  recordscompleted: item.recordscompleted,
                  totalrecords: item.totalrecords,
                  status: getUpdatedStatus(item),
                  jobid: item.jobid,
                  cancel: item.status == "CANCEL",
                  success: diffInDates(new Date(Number(item.lastmodifiedtime)), new Date()) < 2 && item.status == "DONE" && item.filestoreid,
                  failed: item.recordscompleted === item.totalrecords && item.recordscompleted != 0 && !item.filestoreid && diffInDates(new Date(Number(item.lastmodifiedtime)), new Date()) < 2,
                  expired: diffInDates(new Date(Number(item.lastmodifiedtime)), new Date()) > 1 || !item.filestoreid,
                  progress: item.status == "INPROGRESS"
                }), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billDownload", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billDownload", "components.div.children.searchResults", "props.tableData", billTableData));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("billDownload", "components.div.children.searchResults", "props.rows", billTableData.length));

              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billDownload", "components.div.children.searchResults", "visible", booleanHideOrShow));
};