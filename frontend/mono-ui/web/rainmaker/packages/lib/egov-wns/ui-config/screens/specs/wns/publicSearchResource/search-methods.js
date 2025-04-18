"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetFields = exports.getPayload = exports.searchConnections = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _publicSearchUtils = require("./publicSearchUtils");

var _index = require("../../utils/index");

var _commons = require("../../../../../ui-utils/commons");

var _store = require("redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchConnections = exports.searchConnections = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        searchApiCall(state, dispatch);

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function searchConnections(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var removeValidation = function removeValidation(state, dispatch) {
    Object.keys(_publicSearchUtils.ComponentJsonPath).map(function (key) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", _publicSearchUtils.ComponentJsonPath[key], "props.error", false));

        dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", _publicSearchUtils.ComponentJsonPath[key], "isFieldValid", true));

        dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", _publicSearchUtils.ComponentJsonPath[key], "props.helperText", ""));
        return true;
    });
};

var getAddress = function getAddress(item) {
    if (item && item.address) {
        var mohalla = item.address.locality.name && item.address.locality.name != null && item.address.locality.name != 'NA' ? item.address.locality.name + "," : "";
        var city = item.address.city && item.address.city != null && item.address.city != 'NA' ? item.address.city : "";
        if (mohalla == "" && city == "") {
            city = 'NA';
        }
        return mohalla + city;
    }
};

var getPayload = exports.getPayload = function getPayload(searchScreenObject) {
    var querryObject = [];
    if (searchScreenObject) {
        if (searchScreenObject.connectionNumber) {
            querryObject.push({
                key: "connectionNumber",
                value: searchScreenObject.connectionNumber
            });
        }
        if (searchScreenObject.mobileNumber) {
            querryObject.push({
                key: "mobileNumber",
                value: searchScreenObject.mobileNumber
            });
        }
        if (searchScreenObject.ids) {
            querryObject.push({ key: "propertyId", value: searchScreenObject.ids });
        }
        if (searchScreenObject.locality) {
            querryObject.push({
                key: "locality",
                value: searchScreenObject.locality.code
            });
        }
        if (searchScreenObject.tenantId) {
            querryObject.push({
                key: "tenantId",
                value: searchScreenObject.tenantId
            });
        }
        querryObject.push({
            key: "searchType",
            value: "CONNECTION"
        });
    }
    return querryObject;
};

var searchApiCall = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
        var queryObject, searchScreenObject, isSearchBoxFirstRowValid, requestBody, payloadbillingPeriod, tenantId, getSearchResult, getSearchResultForSewerage, waterBillResponse, sewerageBillResponse, waterFinalResponse, sewerageFinalResponse, finalArray, waterConnections, sewerageConnections, combinedSearchResults;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        showHideTable(false, dispatch);
                        queryObject = [{ key: "offset", value: "0" }, { key: "limit", value: 50 }];
                        searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
                        isSearchBoxFirstRowValid = (0, _index.validateFields)("components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children", state, dispatch, "public-search");

                        if (isSearchBoxFirstRowValid) {
                            _context2.next = 7;
                            break;
                        }

                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "Please fill valid fields to search",
                            labelKey: "ERR_PT_FILL_VALID_FIELDS"
                        }, "error"));
                        return _context2.abrupt("return");

                    case 7:
                        if (!(searchScreenObject.tenantId && searchScreenObject.locality && !(searchScreenObject.ids || searchScreenObject.mobileNumber || searchScreenObject.ownerName || searchScreenObject.connectionNumber))) {
                            _context2.next = 12;
                            break;
                        }

                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "Please fill at least one field along with city",
                            labelKey: "PT_SEARCH_SELECT_AT_LEAST_ONE_FIELD_WITH_CITY_AND_LOCALITY"
                        }, "error"));
                        return _context2.abrupt("return");

                    case 12:
                        removeValidation(state, dispatch);
                        requestBody = getPayload(searchScreenObject);
                        payloadbillingPeriod = void 0;
                        tenantId = searchScreenObject.tenantId;
                        _context2.prev = 16;
                        _context2.next = 19;
                        return (0, _commons.getMdmsDataForBill)(tenantId);

                    case 19:
                        payloadbillingPeriod = _context2.sent;
                        _context2.next = 22;
                        return (0, _commons.getOpenSearchResultsForWater)(queryObject, requestBody, dispatch);

                    case 22:
                        getSearchResult = _context2.sent;
                        _context2.next = 25;
                        return (0, _commons.getOpenSearchResultsForSewerage)(queryObject, requestBody, dispatch);

                    case 25:
                        getSearchResultForSewerage = _context2.sent;
                        _context2.next = 28;
                        return (0, _publicSearchUtils.fetchBill)(getSearchResult, searchScreenObject.tenantId, "WS", "WATER", payloadbillingPeriod);

                    case 28:
                        waterBillResponse = _context2.sent;
                        _context2.next = 31;
                        return (0, _publicSearchUtils.fetchBill)(getSearchResultForSewerage, searchScreenObject.tenantId, "SW", "SEWERAGE", payloadbillingPeriod);

                    case 31:
                        sewerageBillResponse = _context2.sent;
                        _context2.next = 34;
                        return (0, _publicSearchUtils.getPropertyWithBillAmount)(getSearchResult, waterBillResponse, "WATER");

                    case 34:
                        waterFinalResponse = _context2.sent;
                        _context2.next = 37;
                        return (0, _publicSearchUtils.getPropertyWithBillAmount)(getSearchResultForSewerage, sewerageBillResponse, "SEWERAGE");

                    case 37:
                        sewerageFinalResponse = _context2.sent;
                        finalArray = [];
                        waterConnections = waterFinalResponse ? waterFinalResponse.WaterConnection.map(function (e) {
                            e.service = _commons.serviceConst.WATER;return e;
                        }) : [];
                        sewerageConnections = waterFinalResponse ? sewerageFinalResponse.SewerageConnections.map(function (e) {
                            e.service = _commons.serviceConst.SEWERAGE;return e;
                        }) : [];
                        combinedSearchResults = waterFinalResponse || waterFinalResponse ? sewerageConnections.concat(waterConnections) : [];

                        finalArray = combinedSearchResults;
                        showResults(finalArray, tenantId, dispatch);
                        _context2.next = 48;
                        break;

                    case 46:
                        _context2.prev = 46;
                        _context2.t0 = _context2["catch"](16);

                    case 48:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[16, 46]]);
    }));

    return function searchApiCall(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplicationResult", "visible", booleanHideOrShow));
};

var showResults = function showResults(connections, tenantId, dispatch) {
    var data = connections.map(function (item) {
        var _ref3;

        return _ref3 = {}, (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_SERVICE_LABEL", item.service), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL", item.connectionNo ? item.connectionNo : "NA"), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_OWN_NAME_LABEL", (0, _get2.default)(item, "property.owners[0].name", "NA")), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_STATUS_LABEL", item.status), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_DUE_LABEL", item.totalAmount || item.totalAmount === 0 ? item.totalAmount : "NA"), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_ADDRESS", getAddress((0, _get2.default)(item, "property", {}))), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_DUE_DATE_LABEL", item.updatedDueDate !== undefined ? (0, _index.convertEpochToDate)(item.updatedDueDate) : "NA"), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_TENANTID_LABEL", tenantId), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL", item.connectionType), (0, _defineProperty3.default)(_ref3, "WS_COMMON_TABLE_COL_ACTION_LABEL", { status: item.status, totalAmount: item.totalAmount, connectionNo: item.connectionNo, businessService: item.businessService, tenantId: item.tenantId }), _ref3;
    });
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplicationResult", "props.data", data));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplicationResult", "props.rows", connections.length));
    showHideTable(true, dispatch);
};

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
    var ulbCityValue = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchScreen.tenantId", "");
    var localityValue = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchScreen.locality.code", "");
    if (ulbCityValue) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ulbCity", "props.value", ""));
    }

    if (localityValue) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.locality", "props.value", ""));
    }

    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ownerMobNo", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.propertyID", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.consumerNo", "props.value", ""));
    removeValidation(state, dispatch);
};