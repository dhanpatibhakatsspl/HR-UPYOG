"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("../../../../../ui-utils/commons");

var _index = require("../../utils/index");

var _utils = require("../../utils");

var _uiUtils = require("../../../../../ui-utils");

var _functions = require("../../wns/searchResource/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key;
    return _regenerator2.default.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            showHideTable(false, dispatch);
            queryObject = [{ key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context4.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_FILL_MANDATORY_FIELDS" }, "warning"));
            _context4.next = 18;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context4.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_FILL_MANDATORY_FIELDS" }, "warning"));
            _context4.next = 18;
            break;

          case 13:
            if (!((searchScreenObject["propertyId"] === undefined || searchScreenObject["propertyId"] === "") && (searchScreenObject["mobileNumber"] === undefined || searchScreenObject["mobileNumber"] === "") && (searchScreenObject["connectionNumber"] === undefined || searchScreenObject["connectionNumber"] === "") && (searchScreenObject["oldConnectionNumber"] === undefined || searchScreenObject["oldConnectionNumber"] === ""))) {
              _context4.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_FILL_VALID_FIELDS" }, "warning"));
            _context4.next = 18;
            break;

          case 17:
            return _context4.delegateYield( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
              var tenantId, waterMeteredDemandExipryDate, waterNonMeteredDemandExipryDate, sewerageNonMeteredDemandExpiryDate, payloadbillingPeriod;
              return _regenerator2.default.wrap(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      for (key in searchScreenObject) {
                        if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                        }
                      }
                      tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchScreen.tenantId");
                      waterMeteredDemandExipryDate = 0;
                      waterNonMeteredDemandExipryDate = 0;
                      sewerageNonMeteredDemandExpiryDate = 0;
                      payloadbillingPeriod = void 0;
                      _context3.prev = 6;
                      return _context3.delegateYield( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                        var mdmsBody, getSearchResult, getSearchResultForSewerage, finalArray, searchWaterConnectionResults, searcSewerageConnectionResults, waterConnections, sewerageConnections, combinedSearchResults, _loop, i;

                        return _regenerator2.default.wrap(function _callee$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.prev = 0;

                                // Get the MDMS data for billingPeriod
                                mdmsBody = {
                                  MdmsCriteria: {
                                    tenantId: tenantId,
                                    moduleDetails: [{ moduleName: "ws-services-masters", masterDetails: [{ name: "billingPeriod" }] }, { moduleName: "sw-services-calculation", masterDetails: [{ name: "billingPeriod" }] }]
                                  }
                                  //Read metered & non-metered demand expiry date and assign value.
                                };
                                _context2.next = 4;
                                return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

                              case 4:
                                payloadbillingPeriod = _context2.sent;
                                _context2.next = 9;
                                break;

                              case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2["catch"](0);

                              case 9:
                                if (queryObject.length > 0) queryObject.push({ key: "searchType", value: "CONNECTION" });
                                getSearchResult = (0, _commons.getSearchResults)(queryObject);
                                getSearchResultForSewerage = (0, _commons.getSearchResultsForSewerage)(queryObject, dispatch);
                                finalArray = [];
                                searchWaterConnectionResults = void 0, searcSewerageConnectionResults = void 0;
                                _context2.prev = 14;
                                _context2.next = 17;
                                return getSearchResult;

                              case 17:
                                searchWaterConnectionResults = _context2.sent;
                                _context2.next = 23;
                                break;

                              case 20:
                                _context2.prev = 20;
                                _context2.t1 = _context2["catch"](14);
                                finalArray = [];

                              case 23:
                                _context2.prev = 23;
                                _context2.next = 26;
                                return getSearchResultForSewerage;

                              case 26:
                                searcSewerageConnectionResults = _context2.sent;
                                _context2.next = 32;
                                break;

                              case 29:
                                _context2.prev = 29;
                                _context2.t2 = _context2["catch"](23);
                                finalArray = [];

                              case 32:
                                waterConnections = searchWaterConnectionResults ? searchWaterConnectionResults.WaterConnection.map(function (e) {
                                  e.service = _commons.serviceConst.WATER;return e;
                                }) : [];
                                sewerageConnections = searcSewerageConnectionResults ? searcSewerageConnectionResults.SewerageConnections.map(function (e) {
                                  e.service = _commons.serviceConst.SEWERAGE;return e;
                                }) : [];
                                combinedSearchResults = searchWaterConnectionResults || searcSewerageConnectionResults ? sewerageConnections.concat(waterConnections) : [];
                                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
                                  var element, queryObjectForWaterFetchBill, billResults;
                                  return _regenerator2.default.wrap(function _loop$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          element = combinedSearchResults[i];

                                          if (!(element.property && element.property !== "NA" && element.connectionNo !== null && element.connectionNo !== 'NA')) {
                                            _context.next = 10;
                                            break;
                                          }

                                          queryObjectForWaterFetchBill = void 0;

                                          if (element.service === _commons.serviceConst.WATER) {
                                            queryObjectForWaterFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "WS" }];
                                          } else {
                                            queryObjectForWaterFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "SW" }];
                                          }

                                          if (element.service === _commons.serviceConst.WATER && payloadbillingPeriod.MdmsRes['ws-services-masters'] && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== null) {
                                            payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod.forEach(function (obj) {
                                              if (obj.connectionType === 'Metered') {
                                                waterMeteredDemandExipryDate = obj.demandExpiryDate;
                                              } else if (obj.connectionType === 'Non Metered') {
                                                waterNonMeteredDemandExipryDate = obj.demandExpiryDate;
                                              }
                                            });
                                          }
                                          if (element.service === _commons.serviceConst.SEWERAGE && payloadbillingPeriod.MdmsRes['sw-services-calculation'] && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== null) {
                                            payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod.forEach(function (obj) {
                                              if (obj.connectionType === 'Non Metered') {
                                                sewerageNonMeteredDemandExpiryDate = obj.demandExpiryDate;
                                              }
                                            });
                                          }

                                          _context.next = 8;
                                          return (0, _commons.fetchBill)(queryObjectForWaterFetchBill, dispatch);

                                        case 8:
                                          billResults = _context.sent;

                                          billResults && billResults.Bill && Array.isArray(billResults.Bill) && billResults.Bill.length > 0 ? billResults.Bill.map(function (bill) {
                                            var updatedDueDate = 0;
                                            if (element.service === _commons.serviceConst.WATER) {
                                              updatedDueDate = element.connectionType === 'Metered' ? bill.billDetails[0].toPeriod + waterMeteredDemandExipryDate : bill.billDetails[0].toPeriod + waterNonMeteredDemandExipryDate;
                                            } else if (element.service === _commons.serviceConst.SEWERAGE) {
                                              updatedDueDate = bill.billDetails[0].toPeriod + sewerageNonMeteredDemandExpiryDate;
                                            }
                                            var obj = {
                                              due: bill.totalAmount,
                                              dueDate: updatedDueDate,
                                              service: element.service,
                                              connectionNo: element.connectionNo,
                                              name: element.property && element.property !== "NA" && element.property.owners ? element.property.owners[0].name : '',
                                              status: element.status,
                                              address: (0, _functions.handleAddress)(element),
                                              tenantId: element.tenantId,
                                              connectionType: element.connectionType
                                            };
                                            finalArray.push(obj);
                                          }) : finalArray.push({
                                            due: 'NA',
                                            dueDate: 'NA',
                                            service: element.service,
                                            connectionNo: element.connectionNo,
                                            name: element.property && element.property !== "NA" && element.property.owners ? element.property.owners[0].name : '',
                                            status: element.status,
                                            address: (0, _functions.handleAddress)(element),
                                            tenantId: element.tenantId,
                                            connectionType: element.connectionType
                                          });

                                        case 10:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  }, _loop, undefined);
                                });
                                i = 0;

                              case 37:
                                if (!(i < combinedSearchResults.length)) {
                                  _context2.next = 42;
                                  break;
                                }

                                return _context2.delegateYield(_loop(i), "t3", 39);

                              case 39:
                                i++;
                                _context2.next = 37;
                                break;

                              case 42:
                                showResults(finalArray, dispatch, tenantId);

                              case 43:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee, undefined, [[0, 7], [14, 20], [23, 29]]);
                      })(), "t0", 8);

                    case 8:
                      _context3.next = 12;
                      break;

                    case 10:
                      _context3.prev = 10;
                      _context3.t1 = _context3["catch"](6);

                    case 12:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee2, undefined, [[6, 10]]);
            })(), "t0", 18);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var showResults = function showResults(connections, dispatch, tenantId) {
  var data = connections.map(function (item) {
    var _ref2;

    return _ref2 = {}, (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_SERVICE_LABEL", item.service), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL", item.connectionNo), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_OWN_NAME_LABEL", item.name), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_STATUS_LABEL", item.status), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_DUE_LABEL", item.due), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_ADDRESS", item.address), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_DUE_DATE_LABEL", item.dueDate !== undefined && item.dueDate !== "NA" ? (0, _index.convertEpochToDate)(item.dueDate) : item.dueDate), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_TENANTID_LABEL", item.tenantId), (0, _defineProperty3.default)(_ref2, "WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL", item.connectionType), _ref2;
  });

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", connections.length));
  showHideTable(true, dispatch);
};