"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

require("./index.css");

var _neCollectionConsumerDetails = require("./newCollectionResource/neCollectionConsumerDetails");

var _newCollectionFooter = require("./newCollectionResource/newCollectionFooter");

var _newCollectionServiceDetails = require("./newCollectionResource/newCollectionServiceDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, requestBody, payload, citymodule, liveTenants, helpUrl, _payload, mohallaData, mohallaLocalePrefix, challanNo, requestBody1, _payload2;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            requestBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }, { name: "citymodule" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{ name: "Help" }]
                }]
              }
            };
            _context.prev = 2;
            payload = null;
            _context.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

          case 6:
            payload = _context.sent;


            if (payload) {
              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
              citymodule = (0, _get2.default)(payload, "MdmsRes.tenant.citymodule");
              liveTenants = citymodule && citymodule.filter(function (item) {
                return item.code === "UC";
              });

              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.tenant.citiesByModule", (0, _get2.default)(liveTenants[0], "tenants")));
            }

            helpUrl = (0, _get2.default)(payload, "MdmsRes.common-masters.Help", []).filter(function (item) {
              return item.code === "UC";
            });
            // dispatch(prepareFinalObject("helpFileUrl", helpUrl&&Array.isArray(helpUrl)&&helpUrl.length>1&&helpUrl[0]&&helpUrl[0].URL));

            _context.prev = 9;
            _context.next = 12;
            return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: "" + tenantId }], {});

          case 12:
            _payload = _context.sent;
            mohallaData = _payload && _payload.TenantBoundary[0] && _payload.TenantBoundary[0].boundary && _payload.TenantBoundary[0].boundary.reduce(function (result, item) {
              result.push((0, _extends3.default)({}, item, {
                name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
              }));
              return result;
            }, []);

            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.tenant.localities", mohallaData));

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children.ConsumerLocMohalla", "props.suggestions", mohallaData
            // payload.TenantBoundary && payload.TenantBoundary[0].boundary
            ));
            mohallaLocalePrefix = {
              moduleName: "" + tenantId,
              masterName: "REVENUE"
            };


            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children.ConsumerLocMohalla", "props.localePrefix", mohallaLocalePrefix));
            challanNo = (0, _commons.getQueryArg)(window.location.href, "consumerCode");

            if (challanNo == null) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.City", "props.value", (0, _localStorageUtils.getTenantId)()));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionFooter.children.nextButton", "visible", true));
            }
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](9);

            console.log(_context.t0);
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context.t0.message }, "error"));

          case 26:
            //End of Mohalla data

            requestBody1 = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "BillingService",
                  masterDetails: [{
                    name: "BusinessService",
                    filter: "[?(@.type=='Adhoc')]"
                  }, {
                    name: "TaxHeadMaster"
                  }, {
                    name: "TaxPeriod"
                  }]
                }]
              }
            };
            _context.prev = 27;
            _payload2 = null;
            _context.next = 31;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody1);

          case 31:
            _payload2 = _context.sent;


            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.BillingService", _payload2.MdmsRes.BillingService));
            (0, _utils2.setServiceCategory)((0, _get2.default)(_payload2, "MdmsRes.BillingService.BusinessService", []), dispatch, state);
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](27);

            console.log(_context.t1);

          case 39:
            _context.next = 45;
            break;

          case 41:
            _context.prev = 41;
            _context.t2 = _context["catch"](2);

            console.error("Unable to fetch detail", _context.t2);
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context.t2.message }, "error"));

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 41], [9, 22], [27, 36]]);
  }));

  return function getData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//for update challan
var getChallanSearchRes = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var challanNo, tenantId, businessService, searchpayload, fetchbillPayload, bService, consumerDetailsDisableFldList;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            challanNo = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
            _context2.next = 6;
            return (0, _api.httpRequest)("post", "/echallan-services/eChallan/v1/_search?challanNo=" + challanNo + "&tenantId=" + tenantId + "&businessService=" + businessService, "_search", [], {});

          case 6:
            searchpayload = _context2.sent;

            if (!(searchpayload && searchpayload.challans.length > 0 && searchpayload.challans[0].applicationStatus === "ACTIVE")) {
              _context2.next = 28;
              break;
            }

            _context2.next = 10;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill?consumerCode=" + challanNo + "&businessService=" + businessService + "&tenantId=" + tenantId, "", [], {});

          case 10:
            fetchbillPayload = _context2.sent;

            //Set the bill detail
            fetchbillPayload && dispatch((0, _actions2.prepareFinalObject)("ChallanTaxHeads", (0, _get2.default)(fetchbillPayload, "Bill[0].billDetails[0].billAccountDetails", [])));
            bService = searchpayload.challans[0].businessService;

            searchpayload.challans[0].consumerType = bService.split(".")[0];
            searchpayload.challans[0].amount = [];

            dispatch((0, _actions2.prepareFinalObject)("Challan", searchpayload.challans));
            //Update the field status
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.header.children.challanNumber", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.header.children.challanNumber", "props.number", challanNo));

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.header.children.header.children.key", "props.labelKey", "UC_EDIT_CHALLAN_HEADER"));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.City", "props.value", tenantId));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceCategory", "props.disabled", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceType", "props.disabled", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.toDate", "props.disabled", false));

            consumerDetailsDisableFldList = ["ConsumerName", "ConsumerMobileNo", "ConsumerHouseNo", "ConsumerBuilidingName", "ConsumerStreetName", "ConsumerLocMohalla", "ConsumerPinCode"];

            consumerDetailsDisableFldList.forEach(function (item) {

              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children." + item, "props.disabled", true));
            });
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionFooter.children.updateChallan", "visible", true));
            // dispatch(
            //   handleField(
            //     "newCollection",
            //     "components.div.children.newCollectionFooter.children.cancelChallan",
            //     "visible",
            //     true
            //   )
            // );

            _context2.next = 29;
            break;

          case 28:
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: "Unable to find Challan Detail. Please search with valid Challan Detail" }, "error"));

          case 29:
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](0);

            console.error("Unable to fetch detail", _context2.t0);
            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context2.t0.message }, "error"));

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 31]]);
  }));

  return function getChallanSearchRes(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var newCollection = {
  uiFramework: "material-ui",
  name: "newCollection",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions2.toggleSpinner)());

    var tenantId = (0, _localStorageUtils.getTenantId)();
    var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
    dispatch((0, _actions3.fetchLocalizationLabel)(locale, tenantId, tenantId));
    //Flush previous data 
    dispatch((0, _actions2.prepareFinalObject)("ChallanTaxHeads", []));
    dispatch((0, _actions2.prepareFinalObject)("Challan", []));
    getData(action, state, dispatch);
    if ((0, _commons.getQueryArg)(window.location.href, "consumerCode") != null) {
      getChallanSearchRes(action, state, dispatch);
    }
    dispatch((0, _actions2.toggleSpinner)());
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "newCollection"
      },
      children: {
        header: (0, _utils.getCommonContainer)({
          header: (0, _utils.getCommonHeader)({
            labelName: "New Challan",
            labelKey: "UC_COMMON_HEADER"
          }),
          challanNumber: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-uc",
            componentPath: "ApplicationNoContainer",
            props: {
              number: "NA",
              label: {
                labelKey: "PAYMENT_UC_CONSUMER_CODE"
              }
            },
            visible: false
          }
        }),

        buttonDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            className: "searchreceipt-commonButton",
            style: { textAlign: "right", display: "block" }
          },
          children: {
            searchChallan: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                className: "gen-challan-btn"
                // style: {
                //   color: "primary",
                //   borderRadius: "2px",
                //   width: "250px",
                //   height: "48px",
                //   marginRight: "16px",
                // },
                //className: "uc-searchAndPayBtn-button",
              },
              children: {
                buttonLabel: (0, _utils.getLabel)({
                  labelName: "Challan Search",
                  labelKey: "ACTION_TEST_CHALLAN_SEARCH"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {
                  openChallanSearchForm(state, dispatch);
                }
              }
            },
            searchAndPayBtn: {
              componentPath: "Button",
              //visible: enableButton,
              props: {
                variant: "outlined",
                color: "primary",
                className: "gen-challan-btn"
                // style: {
                //   color: "primary",
                //   borderRadius: "2px",
                //   width: "250px",
                //   height: "48px",
                //   marginRight: "16px"
                // }
              },
              children: {
                buttonLabel: (0, _utils.getLabel)({
                  labelName: "Search And Pay",
                  labelKey: "UC_SEARCHANDPAY_LABEL"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {
                  openPayBillForm(state, dispatch);
                }
              }
            }

          }
        },

        newCollectionConsumerDetailsCard: _neCollectionConsumerDetails.newCollectionConsumerDetailsCard,
        newCollectionServiceDetailsCard: _newCollectionServiceDetails.newCollectionServiceDetailsCard,
        newCollectionFooter: _newCollectionFooter.newCollectionFooter
      }
    }
  }
};

exports.default = newCollection;


var openChallanSearchForm = function openChallanSearchForm(state, dispatch) {
  var path = "/uc/searchChallan";
  dispatch((0, _actions.setRoute)(path));
};

var openPayBillForm = function openPayBillForm(state, dispatch) {
  var path = "/abg/billSearch";
  dispatch((0, _actions.setRoute)(path));
};