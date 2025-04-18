"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionDetails = exports.sortpayloadDataObj = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-billamend/ui-config/screens/specs/utils");

var _commons = require("egov-billamend/ui-utils/commons");

var _utils2 = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

var _commons3 = require("../../../../ui-utils/commons");

var _utils3 = require("../utils");

var _connectionDetailsDownload = require("./connectionDetailsResource/connectionDetailsDownload");

var _connectionDetailsFooter = require("./connectionDetailsResource/connectionDetailsFooter");

var _ownerDeatils = require("./connectionDetailsResource/owner-deatils");

var _propertyDetails = require("./connectionDetailsResource/property-details");

var _serviceDetails = require("./connectionDetailsResource/service-details");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
var connectionNumber = (0, _commons2.getQueryArg)(window.location.href, "connectionNumber");
var service = (0, _commons2.getQueryArg)(window.location.href, "service");

var getApplicationNumber = function getApplicationNumber(dispatch, connectionsObj) {
  var appNos = "";
  if (connectionsObj.length > 1) {
    for (var i = 0; i < connectionsObj.length; i++) {
      appNos += connectionsObj[i].applicationNo + ",";
    }
    appNos = appNos.slice(0, -1);
  } else {
    appNos = connectionsObj[0].applicationNo;
  }
  dispatch((0, _actions.prepareFinalObject)("applicationNos", appNos));
};
var showHideConnectionHolder = function showHideConnectionHolder(dispatch, connectionHolders) {
  if (connectionHolders != "NA" && connectionHolders.length > 0) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.connectionHolders", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.connectionHoldersSameAsOwner", "visible", false));
  } else {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.connectionHolders", "visible", false));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.connectionHoldersSameAsOwner", "visible", true));
  }
};
var sortpayloadDataObj = exports.sortpayloadDataObj = function sortpayloadDataObj(connectionObj) {
  return connectionObj.sort(function (a, b) {
    return a.additionalDetails.appCreatedDate < b.additionalDetails.appCreatedDate ? 1 : -1;
  });
};

var getActiveConnectionObj = function getActiveConnectionObj(connectionsObj) {
  var getActiveConnectionObj = "";
  for (var i = 0; i < connectionsObj.length; i++) {
    if (connectionsObj[i] && connectionsObj[i].applicationStatus === "CONNECTION_ACTIVATED" || connectionsObj[i].applicationStatus === "APPROVED") {
      getActiveConnectionObj = connectionsObj[i];
      break;
    }
  }
  return getActiveConnectionObj;
};

var searchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, connectionNumber) {
    var queryObject, serviceUrl, payloadData, sewerageConnection, propTenantId, propertyTpe, propertyTypeParams, mdmsPropertyType, lat, long, queryObjForBill, bill, billAMDSearch, amendments, _payloadData, waterConnection, _propTenantId, _propertyTpe, _propertyTypeParams, _mdmsPropertyType, _lat, _long, _queryObjForBill, _bill, _billAMDSearch, _amendments, _service, connectionType, getRedirectionURL, editSection;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            /**
             * This methods holds the api calls and the responses of fetch bill and search connection for both water and sewerage service
             */
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: connectionNumber }, { key: "searchType", value: "CONNECTION" }];
            serviceUrl = (0, _commons2.getQueryArg)(window.location.href, "service");

            if (!(serviceUrl === _commons3.serviceConst.SEWERAGE)) {
              _context2.next = 48;
              break;
            }

            _context2.next = 5;
            return (0, _commons3.getSearchResultsForSewerage)(queryObject, dispatch, true);

          case 5:
            payloadData = _context2.sent;

            if (!(payloadData !== null && payloadData !== undefined && payloadData.SewerageConnections.length > 0)) {
              _context2.next = 46;
              break;
            }

            payloadData.SewerageConnections = sortpayloadDataObj(payloadData.SewerageConnections);

            sewerageConnection = getActiveConnectionObj(payloadData.SewerageConnections);
            propTenantId = _common2.default.tenantId;

            sewerageConnection.service = serviceUrl;

            if (!(sewerageConnection.property.propertyType !== undefined)) {
              _context2.next = 18;
              break;
            }

            propertyTpe = "[?(@.code  == " + JSON.stringify(sewerageConnection.property.propertyType) + ")]";
            propertyTypeParams = {
              MdmsCriteria: {
                tenantId: propTenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "PropertyType", filter: "" + propertyTpe }]
                }]
              }
            };
            _context2.next = 16;
            return (0, _commons3.getDescriptionFromMDMS)(propertyTypeParams, dispatch);

          case 16:
            mdmsPropertyType = _context2.sent;

            if (mdmsPropertyType !== undefined && mdmsPropertyType !== null && mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name !== undefined && mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name !== null) {
              sewerageConnection.property.propertyTypeData = mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name; //propertyType from Mdms
            } else {
              sewerageConnection.property.propertyTypeData = "NA";
            }

          case 18:

            if (sewerageConnection.noOfToilets === undefined) {
              sewerageConnection.noOfToilets = "NA";
            }
            if (sewerageConnection.noOfToilets === 0) {
              sewerageConnection.noOfToilets = "0";
            }
            sewerageConnection.connectionExecutionDate = (0, _utils2.convertEpochToDate)(sewerageConnection.connectionExecutionDate);
            lat = sewerageConnection.property.address.locality.latitude ? sewerageConnection.property.address.locality.latitude : "NA";
            long = sewerageConnection.property.address.locality.longitude ? sewerageConnection.property.address.locality.longitude : "NA";

            sewerageConnection.property.address.locality.locationOnMap = lat + " " + long;

            /*if (sewerageConnection.property.usageCategory !== undefined) {
              const propertyUsageType = "[?(@.code  == " + JSON.stringify(sewerageConnection.property.usageCategory) + ")]"
              let propertyUsageTypeParams = { MdmsCriteria: { tenantId: "pb", moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "UsageCategoryMajor", filter: `${propertyUsageType}` }] }] } }
              const mdmsPropertyUsageType = await getDescriptionFromMDMS(propertyUsageTypeParams, dispatch)
              if (mdmsPropertyUsageType !== undefined && mdmsPropertyUsageType !== null && mdmsPropertyUsageType.MdmsRes.PropertyTax.PropertyType !== undefined && mdmsPropertyUsageType.MdmsRes.PropertyTax.PropertyType[0].name !== null) {
                sewerageConnection.property.propertyUsageType = mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor[0].name;//propertyUsageType from Mdms
              } else {
                sewerageConnection.property.propertyTypeData = "NA"
              }
            }*/
            showHideConnectionHolder(dispatch, sewerageConnection.connectionHolders);
            queryObjForBill = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: connectionNumber
            }, {
              key: "businessService",
              value: "SW"
            }];
            _context2.next = 28;
            return (0, _utils3.getDemand)(queryObjForBill, dispatch);

          case 28:
            bill = _context2.sent;

            if (!(process.env.REACT_APP_NAME !== "Citizen")) {
              _context2.next = 35;
              break;
            }

            _context2.next = 32;
            return (0, _commons.getBillAmdSearchResult)(queryObjForBill, dispatch);

          case 32:
            _context2.t0 = _context2.sent;
            _context2.next = 36;
            break;

          case 35:
            _context2.t0 = [];

          case 36:
            billAMDSearch = _context2.t0;
            amendments = (0, _get2.default)(billAMDSearch, "Amendments", []);

            amendments = amendments && Array.isArray(amendments) && amendments.filter(function (amendment) {
              return amendment.status === 'INWORKFLOW';
            });
            dispatch((0, _actions.prepareFinalObject)("BILL_FOR_WNS", bill));
            dispatch((0, _actions.prepareFinalObject)("isAmendmentInWorkflow", amendments && Array.isArray(amendments) && amendments.length == 0 ? true : false));

            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", sewerageConnection));
            getApplicationNumber(dispatch, payloadData.SewerageConnections);

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.sewerDetails", "visible", true));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails", "visible", false));

            if (sewerageConnection && sewerageConnection.length > 0 && sewerageConnection[0].uom) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.sewerDetails.children.unitOfMeasurement", "visible", true));
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.sewerDetails.children.unitOfMeasurement", "visible", false));
            }

          case 46:
            _context2.next = 97;
            break;

          case 48:
            if (!(serviceUrl === _commons3.serviceConst.WATER)) {
              _context2.next = 97;
              break;
            }

            _context2.next = 51;
            return (0, _commons3.getSearchResults)(queryObject, true);

          case 51:
            _payloadData = _context2.sent;

            if (!(_payloadData !== null && _payloadData !== undefined && _payloadData.WaterConnection.length > 0)) {
              _context2.next = 97;
              break;
            }

            _payloadData.WaterConnection = sortpayloadDataObj(_payloadData.WaterConnection);
            waterConnection = getActiveConnectionObj(_payloadData.WaterConnection);

            waterConnection.service = serviceUrl;
            _propTenantId = _common2.default.tenantId;

            if (waterConnection.connectionExecutionDate !== undefined) {
              waterConnection.connectionExecutionDate = (0, _utils2.convertEpochToDate)(waterConnection.connectionExecutionDate);
            } else {
              waterConnection.connectionExecutionDate = "NA";
            }
            if (waterConnection.noOfTaps === undefined) {
              waterConnection.noOfTaps = "NA";
            }
            if (waterConnection.noOfTaps === 0) {
              waterConnection.noOfTaps = "0";
            }
            if (waterConnection.pipeSize === 0) {
              waterConnection.pipeSize = "0";
            }

            if (!(waterConnection.property.propertyType !== undefined)) {
              _context2.next = 68;
              break;
            }

            _propertyTpe = "[?(@.code  == " + JSON.stringify(waterConnection.property.propertyType) + ")]";
            _propertyTypeParams = {
              MdmsCriteria: {
                tenantId: _propTenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "PropertyType", filter: "" + _propertyTpe }]
                }]
              }
            };
            _context2.next = 66;
            return (0, _commons3.getDescriptionFromMDMS)(_propertyTypeParams, dispatch);

          case 66:
            _mdmsPropertyType = _context2.sent;

            waterConnection.property.propertyTypeData = _mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name !== undefined ? _mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name : "NA"; //propertyType from Mdms

          case 68:
            _lat = waterConnection.property.address.locality.latitude;
            _long = waterConnection.property.address.locality.longitude;

            waterConnection.property.address.locality.locationOnMap = _lat + " " + _long;

            /*if (waterConnection.property.usageCategory !== undefined) {
              const propertyUsageType = "[?(@.code  == " + JSON.stringify(waterConnection.property.usageCategory) + ")]"
              let propertyUsageTypeParams = { MdmsCriteria: { tenantId: "pb", moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "UsageCategoryMajor", filter: `${propertyUsageType}` }] }] } }
              const mdmsPropertyUsageType = await getDescriptionFromMDMS(propertyUsageTypeParams, dispatch)
              if (mdmsPropertyUsageType !== undefined && mdmsPropertyUsageType !== null && mdmsPropertyUsageType.MdmsRes.PropertyTax.PropertyType !== undefined && mdmsPropertyUsageType.MdmsRes.PropertyTax.PropertyType[0].name !== null) {
                waterConnection.property.propertyUsageType = mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor[0].name;//propertyUsageType from Mdms
              } else {
                waterConnection.property.propertyTypeData = "NA"
              }
            }*/
            _queryObjForBill = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: connectionNumber
            }, {
              key: "businessService",
              value: "WS"
            }];
            _context2.next = 74;
            return (0, _utils3.getDemand)(_queryObjForBill, dispatch);

          case 74:
            _bill = _context2.sent;

            if (!(process.env.REACT_APP_NAME !== "Citizen")) {
              _context2.next = 81;
              break;
            }

            _context2.next = 78;
            return (0, _commons.getBillAmdSearchResult)(_queryObjForBill, dispatch);

          case 78:
            _context2.t1 = _context2.sent;
            _context2.next = 82;
            break;

          case 81:
            _context2.t1 = [];

          case 82:
            _billAMDSearch = _context2.t1;
            _amendments = (0, _get2.default)(_billAMDSearch, "Amendments", []);

            _amendments = _amendments && Array.isArray(_amendments) && _amendments.filter(function (amendment) {
              return amendment.status === 'INWORKFLOW';
            });
            dispatch((0, _actions.prepareFinalObject)("BILL_FOR_WNS", _bill));
            dispatch((0, _actions.prepareFinalObject)("isAmendmentInWorkflow", _amendments && Array.isArray(_amendments) && _amendments.length == 0 ? true : false));
            showHideConnectionHolder(dispatch, waterConnection.connectionHolders);
            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", waterConnection));
            getApplicationNumber(dispatch, _payloadData.WaterConnection);
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.sewerDetails", "visible", false));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails", "visible", true));

            _service = (0, _commons2.getQueryArg)(window.location.href, "service");
            connectionType = (0, _commons2.getQueryArg)(window.location.href, "connectionType");

            getRedirectionURL = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
                var getTenant, connectionNumber, environment, origin;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        getTenant = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
                        connectionNumber = (0, _commons2.getQueryArg)(window.location.href, "connectionNumber");
                        environment = process.env.NODE_ENV === "production" ? process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee" : "";
                        origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;

                        window.location.assign("" + origin + environment + "/wns/meter-reading?connectionNos=" + connectionNumber + "&tenantId=" + getTenant);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function getRedirectionURL(_x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }();

            editSection = {
              componentPath: "Button",
              props: { color: "primary", style: { margin: "-16px" } },
              visible: true,
              gridDefination: { xs: 12, sm: 12, align: "left" },
              children: { buttonLabel: (0, _utils2.getLabel)({ labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL" }) },
              onClickDefination: {
                action: "condition",
                callBack: getRedirectionURL
              }
            };

            if (_service === "WATER" && connectionType === "Metered") {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails.children", "editSection", editSection));
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("connection-details", "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.waterDetails.children", "editSection", {}));
            }

          case 97:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function searchResults(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var beforeInitFn = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch, connectionNumber) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!connectionNumber) {
              _context3.next = 3;
              break;
            }

            _context3.next = 3;
            return searchResults(action, state, dispatch, connectionNumber);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function beforeInitFn(_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var headerrow = (0, _utils2.getCommonContainer)({
  header: (0, _utils2.getCommonHeader)({ labelKey: "WS_SEARCH_CONNECTIONS_DETAILS_HEADER" }),
  connectionNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: {
      number: (0, _commons2.getQueryArg)(window.location.href, "connectionNumber")
    }
  }
});

var serviceDetails = (0, _serviceDetails.getServiceDetails)();

var propertyDetails = (0, _propertyDetails.getPropertyDetails)(false);

var ownerDetails = (0, _ownerDeatils.getOwnerDetails)(false);

var connectionHolders = (0, _ownerDeatils.connHolderDetailsSummary)();

var connectionHoldersSameAsOwner = (0, _ownerDeatils.connHolderDetailsSameAsOwnerSummary)();

var getConnectionDetailsFooterAction = (0, _utils3.ifUserRoleExists)('WS_CEMP') ? _connectionDetailsFooter.connectionDetailsFooter : {};

var connectionDetails = exports.connectionDetails = (0, _utils2.getCommonCard)({
  serviceDetails: serviceDetails,
  propertyDetails: propertyDetails,
  ownerDetails: ownerDetails,
  connectionHolders: connectionHolders,
  connectionHoldersSameAsOwner: connectionHoldersSameAsOwner
});
var getMDMSData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "BillingService",
                  masterDetails: [{
                    name: "BusinessService"
                  }]
                }, {
                  moduleName: "BillAmendment",
                  masterDetails: [{ name: "documentObj" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "uiCommonPay"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }]
              }
            };
            _context4.prev = 2;

            (0, _utils.getRequiredDocData)(action, dispatch, [{
              moduleName: "BillAmendment",
              masterDetails: [{ name: "documentObj" }]
            }]);
            _context4.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context4.sent;

            payload.MdmsRes.BillingService.BusinessService = payload.MdmsRes.BillingService.BusinessService.filter(function (service) {
              return service.isBillAmendmentEnabled;
            });
            dispatch((0, _actions.prepareFinalObject)("connectDetailsData", payload.MdmsRes));
            _context4.next = 13;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 11]]);
  }));

  return function getMDMSData(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
var getDataForBillAmendment = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getMDMSData(action, state, dispatch);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getDataForBillAmendment(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
var screenConfig = {
  uiFramework: "material-ui",
  name: "connection-details",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", {}));
    var connectionNo = (0, _commons2.getQueryArg)(window.location.href, "connectionNumber");
    getDataForBillAmendment(action, state, dispatch);

    beforeInitFn(action, state, dispatch, connectionNo);
    (0, _utils.getRequiredDocData)(action, dispatch, [{
      moduleName: "BillAmendment",
      masterDetails: [{ name: "documentObj" }]
    }]);
    (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.header1.children.connectionNumber.props.number", connectionNo);
    (0, _set2.default)(action, "screenConfig.components.div.children.getConnectionDetailsFooterAction.children.takeAction.props.connectionNumber", connectionNo);
    // set(
    //   action,
    //   "screenConfig.components.div.children.connectionDetails.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.editSection.onClickDefination.path",
    //   `meter-reading?connectionNos=${connectionNo}&tenantId=${getQueryArg(window.location.href, "tenantId")}`
    // );


    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview",
        id: "connection-details"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 7
              }
            }, headerrow),
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" } //, dsplay: "block"
              },
              gridDefination: {
                xs: 12,
                sm: 5,
                align: "right"
              },
              children: {
                connectionDetailsDownload: _connectionDetailsDownload.connectionDetailsDownload
              }
            }
          }
        },
        connectionDetails: connectionDetails,
        getConnectionDetailsFooterAction: getConnectionDetailsFooterAction
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "connection-details"
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = screenConfig;