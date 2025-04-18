"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = exports.getAddress = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../../ui-utils/commons");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAddress = exports.getAddress = function getAddress(tenantId, locality) {
  if (!tenantId && !locality) {
    return 'NA';
  }
  var address = '';
  var tenantList = tenantId && tenantId.split('.') || [];

  var localityMessage = locality && tenantId && tenantList.length > 1 && (0, _commons.getLocaleLabels)(tenantId, "TENANT_TENANTS_" + (tenantList[0] && tenantList[0].toUpperCase()) + "_" + (tenantList[1] && tenantList[1].toUpperCase())) || '';
  var tenantMessage = locality && tenantId && (0, _commons.getLocaleLabels)(locality, (tenantList[0] && tenantList[0].toUpperCase()) + "_" + (tenantList[1] && tenantList[1].toUpperCase()) + "_REVENUE_" + locality.toUpperCase()) + ',' || '';
  address = tenantMessage + localityMessage;
  return address;
};
var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, key, serviceObject, responseFromAPI, Amendments, resp, amendObj, addtionalObj, usedBills, billTableData, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryObject = [];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenBillAmend", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.searchCard.children.cardContent.children.searchContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid) {
              isSearchBoxFirstRowValid = (0, _get2.default)(searchScreenObject, 'mobileNumber', '') == "" && (0, _get2.default)(searchScreenObject, 'amendmentId', '') == "" && (0, _get2.default)(searchScreenObject, 'consumerCode', '') == "" ? false : true;
            }

            if (isSearchBoxFirstRowValid) {
              _context.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "BILL_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 38;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "BILL_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 38;
            break;

          case 13:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] == "") {
                delete searchScreenObject[key];
              }
            }
            serviceObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.BillingService.BusinessService").filter(function (item) {
              return item.code === searchScreenObject.businesService;
            });
            _context.next = 17;
            return (0, _commons2.getBillAmendSearchResult)(queryObject, dispatch);

          case 17:
            responseFromAPI = _context.sent;
            Amendments = responseFromAPI && responseFromAPI.Amendments || [];

            if (!((0, _get2.default)(searchScreenObject, 'amendmentId', '') != "" && (0, _get2.default)(searchScreenObject, 'consumerCode', '') == "" && (0, _get2.default)(responseFromAPI, 'Amendments[0].consumerCode', '') != '')) {
              _context.next = 23;
              break;
            }

            queryObject.push({
              "key": 'consumerCode',
              "value": (0, _get2.default)(responseFromAPI, 'Amendments[0].consumerCode', '')
            });
            _context.next = 28;
            break;

          case 23:
            if (!((0, _get2.default)(searchScreenObject, 'mobileNumber', '') == "" && (0, _get2.default)(searchScreenObject, 'consumerCode', '') == "" && (0, _get2.default)(searchScreenObject, 'amendmentId', '') != "")) {
              _context.next = 28;
              break;
            }

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.tableData", []));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", 0));

            showHideTable(true, dispatch);
            return _context.abrupt("return");

          case 28:
            _context.next = 30;
            return (0, _commons2.searchBill)(queryObject, dispatch);

          case 30:
            resp = _context.sent;
            amendObj = {};
            addtionalObj = {};

            Amendments.map(function (bill) {
              if (amendObj[bill.consumerCode]) {
                addtionalObj[bill.amendmentId] = bill;
              } else {
                amendObj[bill.consumerCode] = bill;
              }
            });
            usedBills = {};
            billTableData = resp.Bill.map(function (item) {
              var amendTempObj = {};
              if (amendObj[(0, _get2.default)(item, "connectionNo")]) {
                amendTempObj = (0, _extends3.default)({}, amendObj[(0, _get2.default)(item, "connectionNo")]);
                usedBills[(0, _get2.default)(item, "connectionNo", '')] = (0, _extends3.default)({}, item);
                delete amendObj[(0, _get2.default)(item, "connectionNo", '')];
              }
              usedBills[(0, _get2.default)(item, "connectionNo")] = (0, _extends3.default)({}, item);

              return {

                businessService: (0, _get2.default)(amendTempObj, "businessService", (0, _get2.default)(searchScreenObject, 'businessService', '')),
                amendmentId: (0, _get2.default)(amendTempObj, "amendmentId", "NA"),
                consumerCode: (0, _get2.default)(item, "connectionNo"),
                status: (0, _get2.default)(amendTempObj, "status", "NA"),
                consumerName: (0, _get2.default)(item, "additionalDetails.ownerName", "NA"),
                consumerAddress: getAddress((0, _get2.default)(item, "tenantId"), (0, _get2.default)(item, "additionalDetails.locality")),
                tenantId: (0, _get2.default)(item, "tenantId"),
                connectionType: (0, _get2.default)(item, "connectionType", 'Metered')
              };
            });


            Object.keys(addtionalObj).map(function (key) {
              billTableData.push({

                businessService: (0, _get2.default)(addtionalObj[key], "businessService", (0, _get2.default)(searchScreenObject, 'businessService', '')),
                amendmentId: (0, _get2.default)(addtionalObj[key], "amendmentId", "NA"),
                consumerCode: (0, _get2.default)(addtionalObj[key], "consumerCode"),
                status: (0, _get2.default)(addtionalObj[key], "status", "NA"),
                consumerName: (0, _get2.default)(usedBills[(0, _get2.default)(addtionalObj[key], "consumerCode")], "additionalDetails.ownerName", "NA"),
                consumerAddress: getAddress((0, _get2.default)(addtionalObj[key], "tenantId"), (0, _get2.default)(usedBills[(0, _get2.default)(addtionalObj[key], "consumerCode")], "additionalDetails.locality")),
                tenantId: (0, _get2.default)(addtionalObj[key], "tenantId"),
                connectionType: (0, _get2.default)(addtionalObj[key], "connectionType", 'Metered')

              });
            });
            // const bills = (resp && resp.Bill) || [];
            // const respObj = {};
            // bills.map(bill => {
            //   respObj[bill.connectionNo] = bill;
            // })
            // let usedBills = {};
            // const billTableData = Amendments.map(item => {
            //   let billDetails = {}
            //   if (respObj[get(item, "consumerCode", '')]) {
            //     billDetails = respObj[get(item, "consumerCode", '')]
            //     usedBills[get(item, "consumerCode", '')] = { ...billDetails }
            //     delete respObj[get(item, "consumerCode", '')];
            //   } else if (usedBills[get(item, "consumerCode", '')]) {
            //     billDetails = usedBills[get(item, "consumerCode", '')]
            //   } else {
            //     billDetails = {};
            //   }

            //   return {
            //     businessService: get(item, "businessService"),
            //     amendmentId: get(item, "amendmentId", 'NA'),
            //     consumerCode: get(item, "consumerCode"),
            //     status: get(item, "status", "NA"),
            //     consumerName: get(billDetails, "payerName",  get(item, "additionalDetails.payerName", "NA")),
            //     consumerAddress: get(billDetails, "payerAddress",  get(item, "additionalDetails.payerAddress", "NA")),
            //     tenantId: get(item, "tenantId"),
            //     connectionType: get(item, "additionalDetails.connectionType", 'Metered')
            //   };
            // });


            // if (respObj && Object.keys(respObj).length > 0) {

            //   Object.values(respObj).map(billDetail => {
            //     if (billDetail) {
            //       billTableData.push({
            //         businessService: get(billDetail, "businessService"),
            //         amendmentId: 'NA',
            //         consumerCode: get(billDetail, "consumerCode"),
            //         status: "NA",
            //         consumerName: get(billDetail, "payerName", 'NA'),
            //         consumerAddress: get(billDetail, "payerAddress", 'NA'),
            //         tenantId: get(billDetail, "tenantId"),
            //         connectionType: 'Metered'
            //       })
            //     }
            //   })
            // }
            // dispatch(
            //   prepareFinalObject("searchScreenMdmsData.searchResponse", bills)
            // );

            try {
              data = billTableData.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'BILL_COMMON_SERVICE_TYPE', item.businessService || "-"), (0, _defineProperty3.default)(_ref2, "BILL_COMMON_APPLICATION_NO", item.amendmentId || "NA"), (0, _defineProperty3.default)(_ref2, "PAYMENT_COMMON_CONSUMER_CODE", item.consumerCode || "-"), (0, _defineProperty3.default)(_ref2, 'BILL_COMMON_TABLE_COL_CONSUMER_NAME', item.consumerName || "-"), (0, _defineProperty3.default)(_ref2, 'BILL_COMMON_TABLE_CONSUMER_ADDRESS', item.consumerAddress || "-"), (0, _defineProperty3.default)(_ref2, 'BILL_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId || ''), (0, _defineProperty3.default)(_ref2, 'BUSINESS_SERVICE', item.businessService || "-"), (0, _defineProperty3.default)(_ref2, 'SERVICE_CONST', item.businessService == 'WS' ? 'WATER' : item.businessService == 'SW' ? 'SEWERAGE' : 'NA'), (0, _defineProperty3.default)(_ref2, 'CONNECTION_TYPE', item.connectionType || "NA"), _ref2;
              });


              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.tableData", billTableData));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", billTableData.length));

              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
            }

          case 38:
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};