"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyWithBillAmount = exports.getBill = exports.getSearchBillResult = exports.generateBill = exports.fetchBill = exports.getRequestBody = exports.applyMohallaData = exports.ComponentJsonPath = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("egov-ui-framework/ui-utils/api");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _store = require("redux/store");

var _store2 = _interopRequireDefault(_store);

var _commons = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentJsonPath = exports.ComponentJsonPath = {
  ulbCity: "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ulbCity",
  locality: "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.locality",
  consumerNo: "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.consumerNo",
  ownerMobNo: "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ownerMobNo",
  propertyID: "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.propertyID"
};

var applyMohallaData = exports.applyMohallaData = function applyMohallaData(mohallaData, tenantId, dispatch) {
  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", mohallaData));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", ComponentJsonPath.locality, "props.data", mohallaData));
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

var getRequestBody = exports.getRequestBody = function getRequestBody(searchScreenObject) {
  var requestBody = {};
  if (searchScreenObject) {
    if (searchScreenObject.ownerName) requestBody.name = searchScreenObject.ownerName;
    if (searchScreenObject.mobileNumber) requestBody.mobileNumber = searchScreenObject.mobileNumber;
    if (searchScreenObject.ids) requestBody.propertyIds = searchScreenObject.ids;
    if (searchScreenObject.locality) requestBody.locality = searchScreenObject.locality.code;
    if (searchScreenObject.tenantId) requestBody.tenantId = searchScreenObject.tenantId;
  }
  return requestBody;
};

var fetchBill = exports.fetchBill = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(response, tenantId, billBusinessService, type) {
    var consumerCodes, billData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            consumerCodes = [];

            if (type == "WATER") {
              response.WaterConnection.map(function (item) {
                if (item.connectionNo) consumerCodes.push(item.connectionNo);
              });
            } else {
              response.SewerageConnections.map(function (item) {
                if (item.connectionNo) consumerCodes.push(item.connectionNo);
              });
            }

            _context.next = 4;
            return generateBill(consumerCodes, tenantId, billBusinessService);

          case 4:
            billData = _context.sent;
            return _context.abrupt("return", billData);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchBill(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var generateBill = exports.generateBill = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(consumerCodes, tenantId, businessService) {
    var queryObj, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(consumerCodes && consumerCodes.length > 0 && tenantId)) {
              _context2.next = 9;
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
            _context2.next = 7;
            return getBill(queryObj);

          case 7:
            payload = _context2.sent;
            return _context2.abrupt("return", payload);

          case 9:
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelKey: _context2.t0.message }, "error"));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function generateBill(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var getSearchBillResult = exports.getSearchBillResult = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_search", "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelKey: _context3.t0.message }, "error"));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getSearchBillResult(_x8) {
    return _ref3.apply(this, arguments);
  };
}();

var getBill = exports.getBill = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject) {
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

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getBill(_x9) {
    return _ref4.apply(this, arguments);
  };
}();

var getPropertyWithBillAmount = exports.getPropertyWithBillAmount = function getPropertyWithBillAmount(propertyResponse, billResponse, type, payloadbillingPeriod) {

  try {
    if (billResponse && billResponse.Bill && billResponse.Bill.length > 0) {
      if (type === "WATER") {
        propertyResponse.WaterConnection.map(function (item, key) {

          var waterMeteredDemandExipryDate = 0;
          var waterNonMeteredDemandExipryDate = 0;
          var sewerageNonMeteredDemandExpiryDate = 0;
          if (item.service === _commons.serviceConst.WATER && payloadbillingPeriod.MdmsRes['ws-services-masters'] && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== null) {
            payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod.forEach(function (obj) {
              if (obj.connectionType === 'Metered') {
                waterMeteredDemandExipryDate = obj.demandExpiryDate;
              } else if (obj.connectionType === 'Non Metered') {
                waterNonMeteredDemandExipryDate = obj.demandExpiryDate;
              }
            });
          }
          if (item.service === _commons.serviceConst.SEWERAGE && payloadbillingPeriod.MdmsRes['sw-services-calculation'] && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== null) {
            payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod.forEach(function (obj) {
              if (obj.connectionType === 'Non Metered') {
                sewerageNonMeteredDemandExpiryDate = obj.demandExpiryDate;
              }
            });
          }
          billResponse.Bill.map(function (bill) {
            if (bill.consumerCode === item.connectionNo) {
              propertyResponse.WaterConnection[key].totalAmount = bill.totalAmount;
              if (type === "WATER") {
                propertyResponse.WaterConnection[key].businessService = "WS";
                if (bill && bill.billDetails && bill.billDetails.length > 0 && bill.billDetails[0].toPeriod) {
                  propertyResponse.WaterConnection[key].updatedDueDate = item.connectionType === 'Metered' ? bill.billDetails[0].toPeriod + waterMeteredDemandExipryDate : bill.billDetails[0].toPeriod + waterNonMeteredDemandExipryDate;
                }
              } else {
                propertyResponse.WaterConnection[key].businessService = "SW";
                if (bill && bill.billDetails && bill.billDetails.length > 0 && bill.billDetails[0].toPeriod) propertyResponse.WaterConnection[key].updatedDueDate = bill.billDetails[0].toPeriod + sewerageNonMeteredDemandExpiryDate;
              }
            }
          });
        });
      } else {
        propertyResponse.SewerageConnections.map(function (item, key) {
          var sewerageNonMeteredDemandExpiryDate = 0;
          if (item.service === _commons.serviceConst.SEWERAGE && payloadbillingPeriod.MdmsRes['sw-services-calculation'] && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== null) {
            payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod.forEach(function (obj) {
              if (obj.connectionType === 'Non Metered') {
                sewerageNonMeteredDemandExpiryDate = obj.demandExpiryDate;
              }
            });
          }
          billResponse.Bill.map(function (bill) {
            if (bill.consumerCode === item.connectionNo) {
              propertyResponse.SewerageConnections[key].totalAmount = bill.totalAmount;
              propertyResponse.SewerageConnections[key].businessService = "SW";
              if (bill && bill.billDetails && bill.billDetails.length > 0 && bill.billDetails[0].toPeriod) propertyResponse.SewerageConnections[key].updatedDueDate = bill.billDetails[0].toPeriod + sewerageNonMeteredDemandExpiryDate;
            }
          });
        });
      }
      return propertyResponse;
    } else {
      return propertyResponse;
    }
  } catch (error) {
    _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: error.message, labelKey: error.message }, "error"));
  }
};