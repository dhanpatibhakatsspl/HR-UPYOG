"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewBill = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _propertyDetails = require("./viewBillResource/propertyDetails");

var _ownerDetails = require("./viewBillResource/ownerDetails");

var _serviceDetails = require("./viewBillResource/serviceDetails");

var _viewBillFooter = require("./viewBillResource/viewBillFooter");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var consumerCode = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
var service = (0, _commons.getQueryArg)(window.location.href, "service");

var processBills = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, data, viewBillTooltip, dispatch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data.Bill[0].billDetails.forEach(function (bills) {
              var des = void 0,
                  obj = void 0,
                  groupBillDetails = [];
              bills.billAccountDetails.forEach(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(element) {
                  var cessKey, body, res, arrayData, bPeriodMDMS, expiryDemandDate, dataArray, sortedBills, forward, currentDemand, keyExist, totalArrears, finalArray;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          cessKey = element.taxHeadCode;
                          body = void 0;

                          if (service === _commons2.serviceConst.WATER) {
                            body = { "MdmsCriteria": { "tenantId": (0, _localStorageUtils.getTenantId)(), "moduleDetails": [{ "moduleName": "ws-services-calculation", "masterDetails": [{ "name": cessKey }] }] } };
                          } else {
                            body = { "MdmsCriteria": { "tenantId": (0, _localStorageUtils.getTenantId)(), "moduleDetails": [{ "moduleName": "sw-services-calculation", "masterDetails": [{ "name": cessKey }] }] } };
                          }
                          _context.next = 5;
                          return (0, _commons2.getDescriptionFromMDMS)(body, dispatch);

                        case 5:
                          res = _context.sent;

                          if (res !== null && res !== undefined && res.MdmsRes !== undefined && res.MdmsRes !== null) {
                            if (service === _commons2.serviceConst.WATER) {
                              des = res.MdmsRes["ws-services-calculation"];
                            } else {
                              des = res.MdmsRes["sw-services-calculation"];
                            }
                            if (des !== null && des !== undefined && des[cessKey] !== undefined && des[cessKey][0] !== undefined && des[cessKey][0] !== null) {
                              groupBillDetails.push({ key: cessKey, value: des[cessKey][0].description, amount: element.amount, order: element.order });
                            } else {
                              groupBillDetails.push({ key: cessKey, value: 'Please put some description in mdms for this Key', amount: element.amount, order: element.order });
                            }
                            if (groupBillDetails.length >= bills.billAccountDetails.length) {
                              arrayData = groupBillDetails.sort(function (a, b) {
                                return parseInt(a.order) - parseInt(b.order);
                              });

                              obj = { bill: arrayData, fromPeriod: bills.fromPeriod, toPeriod: bills.toPeriod, demandId: bills.demandId };
                              viewBillTooltip.push(obj);
                            }
                            if (viewBillTooltip.length >= data.Bill[0].billDetails.length) {
                              bPeriodMDMS = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "billingPeriodMDMS", {});
                              // let expiryDemandDate = billingPeriodMDMS(bills.toPeriod,bPeriodMDMS,service);

                              expiryDemandDate = bills.expiryDate;
                              dataArray = [{
                                total: data.Bill[0].totalAmount,
                                expiryDate: expiryDemandDate
                              }];
                              sortedBills = viewBillTooltip.sort(function (a, b) {
                                return b.toPeriod - a.toPeriod;
                              });
                              forward = 0;
                              currentDemand = sortedBills[0];

                              if (data.Bill[0].totalAmount < 0) {
                                sortedBills.forEach(function (e) {
                                  e.bill.forEach(function (cur) {
                                    if (cur.key === "WS_ADVANCE_CARRYFORWARD" || cur.key === "SW_ADVANCE_CARRYFORWARD") {
                                      forward = forward + cur.amount;
                                    }
                                  });
                                });
                                keyExist = false;

                                currentDemand.bill.forEach(function (cur) {
                                  if (cur.key === "WS_ADVANCE_CARRYFORWARD" || cur.key === "SW_ADVANCE_CARRYFORWARD") {
                                    cur.amount = forward;
                                    keyExist = true;
                                  }
                                });
                                if (!keyExist) {
                                  currentDemand.bill.push({
                                    amount: forward,
                                    key: "ADVANCE_CARRYFORWARD",
                                    order: 2,
                                    value: "Please put some description in mdms for this key"
                                  });
                                }
                              }
                              totalArrears = 0;

                              if (data.Bill[0].totalAmount > 0) {
                                sortedBills.shift();
                                sortedBills.forEach(function (e) {
                                  e.bill.forEach(function (o) {
                                    totalArrears = totalArrears + o.amount;
                                  });
                                });
                              }

                              finalArray = [{
                                arrears: totalArrears,
                                arrearsDescription: "Total outstanding payment of previous billing cycles.",
                                description: currentDemand,
                                data: dataArray
                              }];

                              dispatch((0, _actions.prepareFinalObject)("viewBillToolipData", finalArray));
                            }
                          }

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x5) {
                  return _ref2.apply(this, arguments);
                };
              }());
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processBills(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var fetchMDMSForBillPeriod = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    var requestBody, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            requestBody = {
              "MdmsCriteria": {
                "tenantId": tenantId,
                "moduleDetails": [{ "moduleName": "ws-services-masters", "masterDetails": [{ "name": "billingPeriod" }] }, { "moduleName": "sw-services-calculation", "masterDetails": [{ "name": "billingPeriod" }] }]
              }
            };
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _commons2.getDescriptionFromMDMS)(requestBody, dispatch);

          case 4:
            response = _context3.sent;

            dispatch((0, _actions.prepareFinalObject)("billingPeriodMDMS", response.MdmsRes));
            _context3.next = 10;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function fetchMDMSForBillPeriod(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var searchResults = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch, consumerCode) {
    var queryObjForSearch, queryObjectForConsumptionDetails, viewBillTooltip, data, serviceUrl, meterReadingsData, payload, queryObjectForFetchBill, _queryObjectForFetchBill, _payload, _viewBillTooltip;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            queryObjForSearch = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: consumerCode }];
            queryObjectForConsumptionDetails = [{ key: "tenantId", value: tenantId }, { key: "connectionNos", value: consumerCode }];
            viewBillTooltip = [], data = void 0;
            serviceUrl = (0, _commons.getQueryArg)(window.location.href, "service");

            if (!(serviceUrl === _commons2.serviceConst.WATER)) {
              _context4.next = 32;
              break;
            }

            _context4.next = 7;
            return (0, _commons2.getConsumptionDetails)(queryObjectForConsumptionDetails, dispatch);

          case 7:
            meterReadingsData = _context4.sent;
            _context4.next = 10;
            return (0, _commons2.getSearchResultsForCurrentBill)(queryObjForSearch, true);

          case 10:
            payload = _context4.sent;
            queryObjectForFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: consumerCode }, { key: "businessService", value: "WS" }];
            _context4.next = 14;
            return (0, _commons2.fetchBill)(queryObjectForFetchBill, dispatch);

          case 14:
            data = _context4.sent;

            if (!(payload !== null && payload !== undefined && data !== null && data !== undefined)) {
              _context4.next = 30;
              break;
            }

            if (!(payload.WaterConnection.length > 0 && data.Bill.length > 0)) {
              _context4.next = 30;
              break;
            }

            payload.WaterConnection[0].service = serviceUrl;
            _context4.next = 20;
            return processBills(state, data, viewBillTooltip, dispatch);

          case 20:
            if (meterReadingsData !== null && meterReadingsData !== undefined && meterReadingsData.meterReadings.length > 0) {
              payload.WaterConnection[0].consumption = meterReadingsData.meterReadings[0].currentReading - meterReadingsData.meterReadings[0].lastReading;
              payload.WaterConnection[0].currentMeterReading = meterReadingsData.meterReadings[0].currentReading;
              payload.WaterConnection[0].lastMeterReading = meterReadingsData.meterReadings[0].lastReading;
              meterReadingsData.meterReadings[0].currentReadingDate = (0, _utils.convertEpochToDate)(meterReadingsData.meterReadings[0].currentReadingDate);
              meterReadingsData.meterReadings[0].lastReading = meterReadingsData.meterReadings[0].lastReading === 0 ? "0" : meterReadingsData.meterReadings[0].lastReading;
            }

            if (payload.WaterConnection[0].additionalDetails.adhocPenaltyComment === 'NA' || payload.WaterConnection[0].additionalDetails.adhocPenaltyComment === null || payload.WaterConnection[0].additionalDetails.adhocPenaltyComment === undefined) {
              payload.WaterConnection[0].additionalDetails.adhocPenaltyComment = "";
            }
            if (payload.WaterConnection[0].additionalDetails.adhocRebateComment === 'NA' || payload.WaterConnection[0].additionalDetails.adhocRebateComment === null || payload.WaterConnection[0].additionalDetails.adhocRebateComment === undefined) {
              payload.WaterConnection[0].additionalDetails.adhocRebateComment = "";
            }
            if (payload.WaterConnection[0].additionalDetails.adhocPenaltyReason === 'NA' || payload.WaterConnection[0].additionalDetails.adhocPenaltyReason === null || payload.WaterConnection[0].additionalDetails.adhocPenaltyReason === undefined) {
              payload.WaterConnection[0].additionalDetails.adhocPenaltyReason = "";
            }
            if (payload.WaterConnection[0].additionalDetails.adhocRebateReason === 'NA' || payload.WaterConnection[0].additionalDetails.adhocRebateReason === null || payload.WaterConnection[0].additionalDetails.adhocRebateReason === undefined) {
              payload.WaterConnection[0].additionalDetails.adhocRebateReason = "";
            }

            if (payload.WaterConnection[0] && payload.WaterConnection[0].connectionType === "Metered") {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.waterMeterDetails", "visible", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails", "visible", false));
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails", "visible", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.waterMeterDetails", "visible", false));
            }
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.sewerDetails", "visible", false));
            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", payload.WaterConnection[0]));
            dispatch((0, _actions.prepareFinalObject)("billData", data.Bill[0]));
            dispatch((0, _actions.prepareFinalObject)("consumptionDetails[0]", meterReadingsData.meterReadings[0]));

          case 30:
            _context4.next = 55;
            break;

          case 32:
            if (!(serviceUrl === _commons2.serviceConst.SEWERAGE)) {
              _context4.next = 55;
              break;
            }

            _queryObjectForFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: consumerCode }, { key: "businessService", value: "SW" }];
            _context4.next = 36;
            return (0, _commons2.getSearchResultsForSewerage)(queryObjForSearch, dispatch, true);

          case 36:
            _payload = _context4.sent;
            _context4.next = 39;
            return (0, _commons2.fetchBill)(_queryObjectForFetchBill, dispatch);

          case 39:
            data = _context4.sent;
            _viewBillTooltip = [];

            if (!(_payload !== null && _payload !== undefined && data !== null && data !== undefined)) {
              _context4.next = 55;
              break;
            }

            if (!(_payload.SewerageConnections.length > 0 && data.Bill.length > 0)) {
              _context4.next = 55;
              break;
            }

            _payload.SewerageConnections[0].service = serviceUrl;
            _context4.next = 46;
            return processBills(state, data, _viewBillTooltip, dispatch);

          case 46:
            if (_payload.SewerageConnections[0].additionalDetails.adhocPenaltyComment === 'NA' || _payload.SewerageConnections[0].additionalDetails.adhocPenaltyComment === null || _payload.SewerageConnections[0].additionalDetails.adhocPenaltyComment === undefined) {
              _payload.SewerageConnections[0].additionalDetails.adhocPenaltyComment = "";
            }
            if (_payload.SewerageConnections[0].additionalDetails.adhocRebateComment === 'NA' || _payload.SewerageConnections[0].additionalDetails.adhocRebateComment === null || _payload.SewerageConnections[0].additionalDetails.adhocRebateComment === undefined) {
              _payload.SewerageConnections[0].additionalDetails.adhocRebateComment = "";
            }
            if (_payload.SewerageConnections[0].additionalDetails.adhocPenaltyReason === 'NA' || _payload.SewerageConnections[0].additionalDetails.adhocPenaltyReason === null || _payload.SewerageConnections[0].additionalDetails.adhocPenaltyReason === undefined) {
              _payload.SewerageConnections[0].additionalDetails.adhocPenaltyReason = "";
            }
            if (_payload.SewerageConnections[0].additionalDetails.adhocRebateReason === 'NA' || _payload.SewerageConnections[0].additionalDetails.adhocRebateReason === null || _payload.SewerageConnections[0].additionalDetails.adhocRebateReason === undefined) {
              _payload.SewerageConnections[0].additionalDetails.adhocRebateReason = "";
            }
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.sewerDetails", "visible", true));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails", "visible", false));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("viewBill", "components.div.children.viewBill.children.cardContent.children.serviceDetails.children.cardContent.children.waterMeterDetails", "visible", false));
            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", _payload.SewerageConnections[0]));
            dispatch((0, _actions.prepareFinalObject)("billData", data.Bill[0]));

          case 55:
            (0, _utils2.createEstimateData)(data, "screenConfiguration.preparedFinalObject.billData.billDetails", dispatch, {}, {});

          case 56:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function searchResults(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var validatePropertyTaxName = function validatePropertyTaxName(mdmsPropertyUsageType) {
  if (mdmsPropertyUsageType !== undefined && mdmsPropertyUsageType !== null && mdmsPropertyUsageType.MdmsRes !== undefined && mdmsPropertyUsageType.MdmsRes !== null && mdmsPropertyUsageType.MdmsRes.PropertyTax !== undefined && mdmsPropertyUsageType.MdmsRes.PropertyTax !== null && mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor !== undefined && mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor !== null && mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor.length > 0) {
    return mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor[0].name;
  } else {
    return "NA";
  }
};

var beforeInitFn = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch, consumerCode) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!consumerCode) {
              _context5.next = 5;
              break;
            }

            _context5.next = 3;
            return fetchMDMSForBillPeriod(action, state, dispatch);

          case 3:
            _context5.next = 5;
            return searchResults(action, state, dispatch, consumerCode);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function beforeInitFn(_x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

var billHeader = function billHeader() {
  var service = (0, _commons.getQueryArg)(window.location.href, "service");
  if (service === "WATER") {
    return (0, _utils.getCommonHeader)({ labelKey: "WS_COMMON_WATER_BILL_HEADER" });
  } else {
    return (0, _utils.getCommonHeader)({ labelKey: "WS_COMMON_SEWERAGE_BILL_HEADER" });
  }
};

var headerrow = (0, _utils.getCommonContainer)({
  header: billHeader(),
  consumerCode: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: { number: consumerCode }
  }
});

var estimate = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelKey: "UC_VIEWBILL_DETAILS_HEADER" }),
  estimateSection: (0, _utils2.getFeesEstimateCard)({ sourceJsonPath: "viewBillToolipData" })
});

var propertyDetails = (0, _propertyDetails.getProperty)();
var ownerDetails = (0, _ownerDetails.getOwner)();
var serviceDetails = (0, _serviceDetails.getService)();

var viewBill = exports.viewBill = (0, _utils.getCommonCard)({
  estimate: estimate,
  serviceDetails: serviceDetails,
  propertyDetails: propertyDetails,
  ownerDetails: ownerDetails
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "viewBill",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    consumerCode = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
    dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", {}));
    dispatch((0, _actions.prepareFinalObject)("billData", {}));
    dispatch((0, _actions.prepareFinalObject)("billingPeriodMDMS", {}));
    dispatch((0, _actions.prepareFinalObject)("consumptionDetails", []));
    dispatch((0, _actions.prepareFinalObject)("searchScreen", {}));
    dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", {}));
    dispatch((0, _actions.prepareFinalObject)("viewBillToolipData", []));
    dispatch((0, _actions.prepareFinalObject)("UpdateBillCriteria", {}));

    // To set the application no. at the  top
    (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.consumerCode.props.number", consumerCode);

    var service = (0, _commons.getQueryArg)(window.location.href, "service");
    if (service == "SEWERAGE") {
      (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.header.children.key.props.labelKey", "WS_COMMON_SEWERAGE_BILL_HEADER");
    } else {
      (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.header.children.key.props.labelKey", "WS_COMMON_WATER_BILL_HEADER");
    }

    // set(action,"screenConfig.components.adhocDialog.children.popup",adhocPopupViewBill);
    beforeInitFn(action, state, dispatch, consumerCode);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: { className: "common-div-css search-preview" },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: { header1: (0, _extends3.default)({ gridDefination: { xs: 12, sm: 8 } }, headerrow) }
        },
        viewBill: viewBill,
        viewBillFooter: _viewBillFooter.viewBillFooter
      }
    }
  }
};

exports.default = screenConfig;