"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyWithBillAmount = exports.getBill = exports.generateBill = exports.fetchBill = exports.getTenantName = exports.getPayload = exports.getSearchResults = exports.applyMohallaData = exports.ComponentJsonPath = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("egov-ui-framework/ui-utils/api");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentJsonPath = exports.ComponentJsonPath = {
  ulbCity: "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.ulbCity",
  locality: "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.locality",
  ownerName: "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.ownerName",
  ownerMobNo: "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.ownerMobNo",
  propertyID: "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.propertyID"
};

var applyMohallaData = exports.applyMohallaData = function applyMohallaData(mohallaData, tenantId, dispatch) {
  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", mohallaData));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.data", mohallaData
  // payload.TenantBoundary && payload.TenantBoundary[0].boundary
  ));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.errorMessage", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.ulbCity, "props.helperText", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.ulbCity, "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.ulbCity, "props.isFieldValid", true));
  dispatch((0, _actions.prepareFinalObject)("searchScreen.locality.code", ""));
  var mohallaLocalePrefix = {
    moduleName: tenantId,
    masterName: "REVENUE"
  };
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.localePrefix", mohallaLocalePrefix));
};

var getSearchResults = exports.getSearchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(requestPayload) {
    var PUBLIC_SEARCH, searchResponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            PUBLIC_SEARCH = {
              GET: {
                URL: "egov-searcher/property-services/propertyopensearch/_get",
                ACTION: "_get"
              }
            };
            _context.next = 3;
            return (0, _api.httpRequest)("post", PUBLIC_SEARCH.GET.URL, PUBLIC_SEARCH.GET.ACTION, [], { searchCriteria: requestPayload });

          case 3:
            searchResponse = _context.sent;
            return _context.abrupt("return", searchResponse);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getSearchResults(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getPayload = exports.getPayload = function getPayload(searchScreenObject) {
  var querryObject = [];
  if (searchScreenObject) {
    if (searchScreenObject.ownerName) {
      querryObject.push({
        key: "name",
        value: searchScreenObject.ownerName
      });
    }
    if (searchScreenObject.mobileNumber) {
      querryObject.push({
        key: "mobileNumber",
        value: searchScreenObject.mobileNumber
      });
    }
    if (searchScreenObject.ids) {
      querryObject.push({ key: "propertyIds", value: searchScreenObject.ids });
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
  }
  return querryObject;
};

var getTenantName = exports.getTenantName = function getTenantName(tenantId, state) {
  var cityObject = (0, _get2.default)(state.common, "cities", []);
  if (cityObject && cityObject.length > 0) {
    return cityObject[cityObject.findIndex(function (item) {
      return item.key.indexOf(tenantId) !== -1;
    })].name;
  }
};

var fetchBill = exports.fetchBill = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, response, tenantId, billBusinessService) {
    var consumerCodes, billData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            consumerCodes = [];

            response.Properties.map(function (item) {
              consumerCodes.push(item.propertyId);
            });
            _context2.next = 4;
            return generateBill(dispatch, consumerCodes, tenantId, billBusinessService);

          case 4:
            billData = _context2.sent;
            return _context2.abrupt("return", billData);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchBill(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var generateBill = exports.generateBill = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, consumerCodes, tenantId, businessService) {
    var queryObj, payload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!(consumerCodes && consumerCodes.length > 0 && tenantId)) {
              _context3.next = 9;
              break;
            }

            queryObj = [{
              key: "tenantId",
              value: tenantId
            }];

            queryObj.push({
              key: "consumerCode",
              value: consumerCodes.join(",")
            });
            if (businessService) {
              queryObj.push({
                key: "businessService",
                value: businessService
              });
            }
            _context3.next = 7;
            return (0, _commons.getSearchBillResult)(queryObj, dispatch);

          case 7:
            payload = _context3.sent;
            return _context3.abrupt("return", payload);

          case 9:
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelKey: _context3.t0.message }, "error"));
            console.log(_context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 11]]);
  }));

  return function generateBill(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var getBill = exports.getBill = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context4.t0.message, labelKey: _context4.t0.message }, "error"));
            console.log(_context4.t0, "fetxh");

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getBill(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var getPropertyWithBillAmount = exports.getPropertyWithBillAmount = function getPropertyWithBillAmount(propertyResponse, billResponse) {
  try {
    if (billResponse && billResponse.Bill && billResponse.Bill.length > 0) {
      propertyResponse.Properties.map(function (item, key) {
        billResponse.Bill.map(function (bill) {
          if (bill.consumerCode === item.propertyId) {
            propertyResponse.Properties[key].totalAmount = bill.totalAmount;
          }
        });
      });
      return propertyResponse;
    } else {
      return propertyResponse;
    }
  } catch (error) {
    dispatch((0, _actions.toggleSnackbar)(true, { labelName: error.message, labelKey: error.message }, "error"));
    console.log(error, "Bill Error");
  }
};