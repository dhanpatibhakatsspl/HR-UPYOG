"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAddress = exports.searchApiCall = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

var _utils = require("../../utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var getCurrentTab, currentSearchTab;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideApplicationTable(false, dispatch);
            showHideConnectionTable(false, dispatch);
            getCurrentTab = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "currentTab");
            currentSearchTab = getCurrentTab === undefined ? "SEARCH_CONNECTION" : getCurrentTab;

            if (!(currentSearchTab === "SEARCH_CONNECTION")) {
              _context.next = 10;
              break;
            }

            (0, _index.resetFieldsForApplication)(state, dispatch);
            _context.next = 8;
            return renderSearchConnectionTable(state, dispatch);

          case 8:
            _context.next = 13;
            break;

          case 10:
            (0, _index.resetFieldsForConnection)(state, dispatch);
            _context.next = 13;
            return renderSearchApplicationTable(state, dispatch);

          case 13:
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

var renderSearchConnectionTable = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var queryObject, searchScreenObject, key, waterMeteredDemandExipryDate, waterNonMeteredDemandExipryDate, sewerageNonMeteredDemandExpiryDate, payloadbillingPeriod, mdmsBody, getSearchResult, getSearchResultForSewerage, finalArray, searchWaterConnectionResults, searcSewerageConnectionResults, waterConnections, sewerageConnections, combinedSearchResults, _loop, i;

    return _regenerator2.default.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            queryObject = [];

            queryObject.push({ key: "searchType", value: "CONNECTION" });
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchConnection", {});

            Object.keys(searchScreenObject).forEach(function (key) {
              return searchScreenObject[key] == "" && delete searchScreenObject[key];
            });

            if (!(Object.values(searchScreenObject).length <= 1)) {
              _context3.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please provide the city and any one other field information to search for property.", labelKey: "ERR_PT_COMMON_FILL_MANDATORY_FIELDS" }, "warning"));
            _context3.next = 64;
            break;

          case 8:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context3.next = 12;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            _context3.next = 64;
            break;

          case 12:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({ key: key, value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "daystart") });
                } else if (key === "toDate") {
                  queryObject.push({ key: key, value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "dayend") });
                } else {
                  queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                }
              }
            }
            _context3.prev = 13;
            waterMeteredDemandExipryDate = 0;
            waterNonMeteredDemandExipryDate = 0;
            sewerageNonMeteredDemandExpiryDate = 0;
            payloadbillingPeriod = "";
            _context3.prev = 18;

            // Get the MDMS data for billingPeriod
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantIdCommon)(),
                moduleDetails: [{ moduleName: "ws-services-masters", masterDetails: [{ name: "billingPeriod" }] }, { moduleName: "sw-services-calculation", masterDetails: [{ name: "billingPeriod" }] }]
              }
              //Read metered & non-metered demand expiry date and assign value.
            };
            _context3.next = 22;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 22:
            payloadbillingPeriod = _context3.sent;
            _context3.next = 27;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](18);

          case 27:
            getSearchResult = (0, _commons2.getSearchResults)(queryObject);
            getSearchResultForSewerage = (0, _commons2.getSearchResultsForSewerage)(queryObject, dispatch);
            finalArray = [];
            searchWaterConnectionResults = void 0, searcSewerageConnectionResults = void 0;
            _context3.prev = 31;
            _context3.next = 34;
            return getSearchResult;

          case 34:
            searchWaterConnectionResults = _context3.sent;
            _context3.next = 40;
            break;

          case 37:
            _context3.prev = 37;
            _context3.t1 = _context3["catch"](31);
            finalArray = [];

          case 40:
            _context3.prev = 40;
            _context3.next = 43;
            return getSearchResultForSewerage;

          case 43:
            searcSewerageConnectionResults = _context3.sent;
            _context3.next = 49;
            break;

          case 46:
            _context3.prev = 46;
            _context3.t2 = _context3["catch"](40);
            finalArray = [];

          case 49:
            waterConnections = searchWaterConnectionResults ? searchWaterConnectionResults.WaterConnection.map(function (e) {
              e.service = _commons2.serviceConst.WATER;return e;
            }) : [];
            sewerageConnections = searcSewerageConnectionResults ? searcSewerageConnectionResults.SewerageConnections.map(function (e) {
              e.service = _commons2.serviceConst.SEWERAGE;return e;
            }) : [];
            combinedSearchResults = searchWaterConnectionResults || searcSewerageConnectionResults ? sewerageConnections.concat(waterConnections) : [];
            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
              var element, queryObjectForWaterFetchBill, billResults, updatedDueDate;
              return _regenerator2.default.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      element = combinedSearchResults[i];

                      if (!(element.connectionNo !== "NA" && element.connectionNo !== null)) {
                        _context2.next = 12;
                        break;
                      }

                      queryObjectForWaterFetchBill = void 0;

                      if (element.service === _commons2.serviceConst.WATER) {
                        queryObjectForWaterFetchBill = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantIdCommon)() }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "WS" }];
                      } else {
                        queryObjectForWaterFetchBill = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantIdCommon)() }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "SW" }];
                      }

                      if (element.service === _commons2.serviceConst.WATER && payloadbillingPeriod && payloadbillingPeriod.MdmsRes['ws-services-masters'] && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== null) {
                        payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod.forEach(function (obj) {
                          if (obj.connectionType === 'Metered') {
                            waterMeteredDemandExipryDate = obj.demandExpiryDate;
                          } else if (obj.connectionType === 'Non Metered') {
                            waterNonMeteredDemandExipryDate = obj.demandExpiryDate;
                          }
                        });
                      }
                      if (element.service === _commons2.serviceConst.SEWERAGE && payloadbillingPeriod && payloadbillingPeriod.MdmsRes['sw-services-calculation'] && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== null) {
                        payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod.forEach(function (obj) {
                          if (obj.connectionType === 'Non Metered') {
                            sewerageNonMeteredDemandExpiryDate = obj.demandExpiryDate;
                          }
                        });
                      }

                      // let billResults = await fetchBill(queryObjectForWaterFetchBill, dispatch)
                      // billResults && billResults.Bill &&Array.isArray(billResults.Bill)&&billResults.Bill.length>0? billResults.Bill.map(bill => {
                      //   let updatedDueDate = 0;
                      //   if(element.service === serviceConst.WATER) {
                      //     updatedDueDate = (element.connectionType === 'Metered' ?
                      //     (bill.billDetails[0].toPeriod+waterMeteredDemandExipryDate) :
                      //     (bill.billDetails[0].toPeriod+waterNonMeteredDemandExipryDate));
                      //   } else if (element.service === serviceConst.SEWERAGE) {
                      //     updatedDueDate = bill.billDetails[0].toPeriod + sewerageNonMeteredDemandExpiryDate;
                      //   }
                      //   finalArray.push({
                      //     due: bill.totalAmount,
                      //     dueDate: updatedDueDate,
                      //     service: element.service,
                      //     connectionNo: element.connectionNo,
                      //     name: (element.property)?element.property.owners[0].name:'',
                      //     status: element.status,
                      //     address: handleAddress(element),
                      //     connectionType: element.connectionType,
                      //     tenantId:element.tenantId
                      //   })
                      // }) : finalArray.push({
                      //   due: 'NA',
                      //   dueDate: 'NA',
                      //   service: element.service,
                      //   connectionNo: element.connectionNo,
                      //   name: (element.property)?element.property.owners[0].name:'',
                      //   status: element.status,
                      //   address: handleAddress(element),
                      //   connectionType: element.connectionType,
                      //   tenantId:element.tenantId
                      // })
                      _context2.next = 8;
                      return (0, _commons2.fetchBill)(queryObjectForWaterFetchBill, dispatch);

                    case 8:
                      billResults = _context2.sent;
                      updatedDueDate = 0;

                      billResults && billResults.Bill && Array.isArray(billResults.Bill) && billResults.Bill.length > 0 && billResults.Bill[0].billDetails.map(function (bill) {
                        if (element.service === _commons2.serviceConst.WATER) {
                          updatedDueDate = bill.expiryDate;
                        } else if (element.service === _commons2.serviceConst.SEWERAGE) {
                          updatedDueDate = bill.expiryDate;
                        }
                      });
                      billResults && billResults.Bill && Array.isArray(billResults.Bill) && billResults.Bill.length > 0 ? finalArray.push({
                        due: billResults.Bill[0].totalAmount,
                        dueDate: updatedDueDate,
                        service: element.service,
                        connectionNo: element.connectionNo,
                        name: element.property ? element.property.owners[0].name : '',
                        status: element.status,
                        address: handleAddress(element),
                        connectionType: element.connectionType,
                        tenantId: element.tenantId
                      }) : finalArray.push({
                        due: '0',
                        dueDate: 'NA',
                        service: element.service,
                        connectionNo: element.connectionNo,
                        name: element.property ? element.property.owners[0].name : '',
                        status: element.status,
                        address: handleAddress(element),
                        connectionType: element.connectionType,
                        tenantId: element.tenantId
                      });

                    case 12:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, undefined);
            });
            i = 0;

          case 54:
            if (!(i < combinedSearchResults.length)) {
              _context3.next = 59;
              break;
            }

            return _context3.delegateYield(_loop(i), "t3", 56);

          case 56:
            i++;
            _context3.next = 54;
            break;

          case 59:
            showConnectionResults(finalArray, dispatch);
            _context3.next = 64;
            break;

          case 62:
            _context3.prev = 62;
            _context3.t4 = _context3["catch"](13);

          case 64:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, undefined, [[13, 62], [18, 25], [31, 37], [40, 46]]);
  }));

  return function renderSearchConnectionTable(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var renderSearchApplicationTable = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, getSearchResult, getSearchResultForSewerage, finalArray, searchWaterConnectionResults, searcSewerageConnectionResults, waterConnections, sewerageConnections, combinedSearchResults, appNo, combinedWFSearchResults, i, _element, queryObj, wfResponse, _loop2, _i;

    return _regenerator2.default.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantIdCommon)() }];

            queryObject.push({ key: "isConnectionSearch", value: true });
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch", state, dispatch, "search");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context4.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_FILL_ATLEAST_ONE_FIELD" }, "warning"));
            _context4.next = 68;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context4.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_FILL_ATLEAST_ONE_FIELD" }, "warning"));
            _context4.next = 68;
            break;

          case 13:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context4.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            _context4.next = 68;
            break;

          case 17:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({ key: key, value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "daystart") });
                } else if (key === "toDate") {
                  queryObject.push({ key: key, value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "dayend") });
                } else if (key === "applicationType") {
                  queryObject.push({ key: key, value: searchScreenObject[key].replace(/ /g, '_') });
                } else {
                  queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                }
              }
            }
            _context4.prev = 18;
            getSearchResult = void 0, getSearchResultForSewerage = void 0;

            if (searchScreenObject.applicationType && searchScreenObject.applicationType.toLowerCase().includes('water')) {
              getSearchResult = (0, _commons2.getSearchResults)(queryObject);
            } else if (searchScreenObject.applicationType && searchScreenObject.applicationType.toLowerCase().includes('sewerage')) {
              getSearchResultForSewerage = (0, _commons2.getSearchResultsForSewerage)(queryObject, dispatch);
            } else {
              getSearchResult = (0, _commons2.getSearchResults)(queryObject), getSearchResultForSewerage = (0, _commons2.getSearchResultsForSewerage)(queryObject, dispatch);
            }
            finalArray = [];
            searchWaterConnectionResults = void 0, searcSewerageConnectionResults = void 0;
            _context4.prev = 23;
            _context4.next = 26;
            return getSearchResult;

          case 26:
            searchWaterConnectionResults = _context4.sent;
            _context4.next = 32;
            break;

          case 29:
            _context4.prev = 29;
            _context4.t0 = _context4["catch"](23);
            finalArray = [];

          case 32:
            _context4.prev = 32;
            _context4.next = 35;
            return getSearchResultForSewerage;

          case 35:
            searcSewerageConnectionResults = _context4.sent;
            _context4.next = 41;
            break;

          case 38:
            _context4.prev = 38;
            _context4.t1 = _context4["catch"](32);
            finalArray = [];

          case 41:
            waterConnections = searchWaterConnectionResults ? searchWaterConnectionResults.WaterConnection.map(function (e) {
              e.service = _commons2.serviceConst.WATER;return e;
            }) : [];
            sewerageConnections = searcSewerageConnectionResults ? searcSewerageConnectionResults.SewerageConnections.map(function (e) {
              e.service = _commons2.serviceConst.SEWERAGE;return e;
            }) : [];
            combinedSearchResults = searchWaterConnectionResults || searcSewerageConnectionResults ? sewerageConnections.concat(waterConnections) : [];
            appNo = "";
            combinedWFSearchResults = [];
            i = 0;

          case 47:
            if (!(i < combinedSearchResults.length)) {
              _context4.next = 61;
              break;
            }

            _element = (0, _commons2.findAndReplace)(combinedSearchResults[i], null, "NA");

            if (_element.applicationNo !== "NA" && _element.applicationNo !== undefined) {
              appNo = appNo + _element.applicationNo + ",";
            }

            if (!(i % 50 === 0 || i === combinedSearchResults.length - 1)) {
              _context4.next = 58;
              break;
            }

            //We are trying to fetch 50 WF objects at a time
            appNo = appNo.substring(0, appNo.length - 1);
            queryObj = [{ key: "businessIds", value: appNo }, { key: "history", value: true }, { key: "tenantId", value: (0, _localStorageUtils.getTenantIdCommon)() }];
            _context4.next = 55;
            return (0, _commons2.getWorkFlowData)(queryObj);

          case 55:
            wfResponse = _context4.sent;

            if (wfResponse !== null && wfResponse.ProcessInstances !== null) {
              combinedWFSearchResults = combinedWFSearchResults.concat(wfResponse.ProcessInstances);
            }
            appNo = "";

          case 58:
            i++;
            _context4.next = 47;
            break;

          case 61:
            _loop2 = function _loop2(_i) {
              var element = (0, _commons2.findAndReplace)(combinedSearchResults[_i], null, "NA");
              var appStatus = void 0;
              if (element.applicationNo !== "NA" && element.applicationNo !== undefined) {
                appStatus = combinedWFSearchResults.filter(function (item) {
                  return item.businessId.includes(element.applicationNo);
                })[0];
                if (appStatus !== undefined && appStatus.state !== undefined) {
                  appStatus = appStatus.state.applicationStatus;
                } else {
                  appStatus = "NA";
                }
                if (element.property && element.property.owners && element.property.owners !== "NA" && element.property.owners !== null && element.property.owners.length > 1) {
                  var ownerName = "";
                  element.property.owners.forEach(function (ele) {
                    ownerName = ownerName + ", " + ele.name;
                  });

                  finalArray.push({
                    connectionNo: element.connectionNo,
                    applicationNo: element.applicationNo,
                    applicationType: element.applicationType,
                    name: ownerName.slice(2),
                    applicationStatus: appStatus,
                    address: handleAddress(element),
                    service: element.service,
                    connectionType: element.connectionType,
                    tenantId: element.tenantId
                  });
                } else {
                  finalArray.push({
                    connectionNo: element.connectionNo,
                    applicationNo: element.applicationNo,
                    applicationType: element.applicationType,
                    name: element.property && element.property !== "NA" && element.property.owners ? element.property.owners[0].name : "",
                    applicationStatus: appStatus,
                    address: handleAddress(element),
                    service: element.service,
                    connectionType: element.connectionType,
                    tenantId: element.tenantId
                  });
                }
              }
            };

            /*const queryObj = [
              { key: "businessIds", value: appNo },
              { key: "history", value: true },
              { key: "tenantId", value: getTenantIdCommon() }
            ];
            let Response = await getWorkFlowData(queryObj);*/
            for (_i = 0; _i < combinedSearchResults.length; _i++) {
              _loop2(_i);
            }
            showApplicationResults(finalArray, dispatch);
            _context4.next = 68;
            break;

          case 66:
            _context4.prev = 66;
            _context4.t2 = _context4["catch"](18);

          case 68:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, undefined, [[18, 66], [23, 29], [32, 38]]);
  }));

  return function renderSearchApplicationTable(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var handleAddress = exports.handleAddress = function handleAddress(element) {
  var city = element.property && element.property !== "NA" && element.property.address !== undefined && element.property.address.tenantId !== undefined && element.property.address.tenantId !== null ? (0, _commons.getLocaleLabels)("NA", "TENANT_TENANTS_" + (0, _commons.getTransformedLocale)(element.property.address.tenantId)) : "";
  var localityName = element.property && element.property !== "NA" && element.property.address.locality !== undefined && element.property.address.locality !== null && element.property.address.locality.code !== null ? (0, _commons.getLocaleLabels)("NA", (0, _commons.getTransformedLocale)(element.property.address.tenantId) + "_REVENUE_" + element.property.address.locality.code) : "";

  return city === "" && localityName === "" ? (0, _commons.getLocaleLabels)("NA", "WS_NA") : localityName + ", " + city;
};

var showHideConnectionTable = function showHideConnectionTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var showHideApplicationTable = function showHideApplicationTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchApplicationResults", "visible", booleanHideOrShow));
};

var showConnectionResults = function showConnectionResults(connections, dispatch) {
  var data = connections.map(function (item) {
    var _ref4;

    return _ref4 = {}, (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_SERVICE_LABEL", item.service), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL", item.connectionNo), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_OWN_NAME_LABEL", item.name), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_STATUS_LABEL", item.status), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_DUE_LABEL", item.due), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_ADDRESS", item.address), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_DUE_DATE_LABEL", item.dueDate !== undefined && item.dueDate !== "NA" ? (0, _index.convertEpochToDate)(item.dueDate) : item.dueDate), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_TENANTID_LABEL", item.tenantId), (0, _defineProperty3.default)(_ref4, "WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL", item.connectionType), _ref4;
  });
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", connections.length));
  showHideConnectionTable(true, dispatch);
};

var getApplicationType = function getApplicationType(applicationType) {
  return applicationType ? applicationType.split("_").join(" ") : applicationType;
};
var showApplicationResults = function showApplicationResults(connections, dispatch) {
  var data = connections.map(function (item) {
    var _ref5;

    return _ref5 = {}, (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL", item.connectionNo), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_APP_NO_LABEL", item.applicationNo), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_APP_TYPE_LABEL", getApplicationType(item.applicationType)), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_OWN_NAME_LABEL", item.name), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_APPLICATION_STATUS_LABEL", item.applicationStatus.split("_").join(" ")), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_ADDRESS", item.address), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_TENANTID_LABEL", item.tenantId), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_SERVICE_LABEL", item.service), (0, _defineProperty3.default)(_ref5, "WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL", item.connectionType), _ref5;
  });
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchApplicationResults", "props.data", data));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchApplicationResults", "props.rows", connections.length));
  showHideApplicationTable(true, dispatch);
};