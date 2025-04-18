"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadPrintContainer = exports.applicationSearch = exports.propertySearch = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _commons2 = require("../../../../ui-utils/commons");

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertySearch = exports.propertySearch = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchApiCall(state, dispatch, 0);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function propertySearch(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var applicationSearch = exports.applicationSearch = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchApiCall(state, dispatch, 1);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function applicationSearch(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var removeValidation = function removeValidation(state, dispatch, index) {

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp", "props.error", false));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId", "props.error", false));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo", "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId", "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId", "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo", "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp", "isFieldValid", true));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId", "isFieldValid", true));
};

var getAddress = function getAddress(item) {
  var doorNo = item.address.doorNo != null ? item.address.doorNo + "," : '';
  var buildingName = item.address.buildingName != null ? item.address.buildingName + "," : '';
  var street = item.address.street != null ? item.address.street + "," : '';
  var mohalla = item.address.locality.name ? (0, _commons.getLocaleLabels)("NA", (0, _commons.getTransformedLocale)(item.tenantId) + "_REVENUE_" + item.address.locality.code) + "," : '';
  var city = item.tenantId != null ? (0, _commons.getLocaleLabels)("NA", "TENANT_TENANTS_" + (0, _commons.getTransformedLocale)(item.tenantId)) : '';
  return doorNo + buildingName + street + mohalla + city;
};

var searchApiCall = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, index) {
    var searchScreenObject, query, form1, form2, isSearchBoxFirstRowValid, isownerCityRowValid, isownerLocalityRowValid, isownerDoorNoRowValid, isownerNameRowValid, isownerMobNoRowValid, ispropertyTaxUniqueIdRowValid, isexistingPropertyIdRowValid, ispropertyTaxApplicationNoRowValid, ispropertyTaxApplicationOwnerNoRowValid, ispropertyTaxApplicationPidRowValid, formValid, key, queryObject, response, propertyData, applicationData;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            showHideTable(false, dispatch, 0);
            showHideTable(false, dispatch, 1);

            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ptSearchScreen", {});

            Object.keys(searchScreenObject).map(function (key) {
              searchScreenObject[key] = searchScreenObject[key] && typeof searchScreenObject[key] == 'string' && searchScreenObject[key].trim();
            });

            if (!(!searchScreenObject.tenantId && index == 0)) {
              _context3.next = 7;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to search",
              labelKey: "ERR_PT_FILL_VALID_FIELDS"
            }, "error"));
            return _context3.abrupt("return");

          case 7:
            query = { "tenantId": searchScreenObject.tenantId };

            if (index == 1 && process.env.REACT_APP_NAME == "Citizen") {
              query = {};
            }

            form1 = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails", state, dispatch, "propertySearch");
            form2 = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails", state, dispatch, "propertySearch");
            // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails"
            // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails"
            // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo"

            isSearchBoxFirstRowValid = (0, _index.validateFields)("components.div.children.captureMutationDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchProperty.children.searchPropertyDetails.children.ulbCityContainer.children", state, dispatch, "propertySearch");
            isownerCityRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity", state, dispatch, "propertySearch");
            isownerLocalityRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.locality", state, dispatch, "propertySearch") || searchScreenObject.locality == "";
            isownerDoorNoRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.doorNo", state, dispatch, "propertySearch") || searchScreenObject.doorNo == "";
            isownerNameRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerName", state, dispatch, "propertySearch") || searchScreenObject.name == "";
            isownerMobNoRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo", state, dispatch, "propertySearch") || searchScreenObject.mobileNumber == '';
            ispropertyTaxUniqueIdRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId", state, dispatch, "propertySearch") || searchScreenObject.ids == '';
            isexistingPropertyIdRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId", state, dispatch, "propertySearch") || searchScreenObject.oldPropertyId == '';
            ispropertyTaxApplicationNoRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo", state, dispatch, "propertySearch") || searchScreenObject.acknowledgementIds == '';
            ispropertyTaxApplicationOwnerNoRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp", state, dispatch, "propertySearch") || searchScreenObject.mobileNumber == '';
            ispropertyTaxApplicationPidRowValid = (0, _index.validateFields)("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId", state, dispatch, "propertySearch") || searchScreenObject.ids == '';
            formValid = false;

            if (index == 0) {
              if (searchScreenObject.locality != "" && (searchScreenObject.ids != '' || searchScreenObject.mobileNumber != '' || searchScreenObject.oldPropertyId != '' || searchScreenObject.name != '' || searchScreenObject.doorNo != '')) {
                formValid = true;
              }
            } else {
              if (searchScreenObject.ids != '' || searchScreenObject.mobileNumber != '' || searchScreenObject.acknowledgementIds != '') {
                formValid = true;
              }
            }

            if (formValid) {
              _context3.next = 27;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to search",
              labelKey: "ERR_PT_FILL_VALID_FIELDS"
            }, "error"));
            return _context3.abrupt("return");

          case 27:
            if (isSearchBoxFirstRowValid) {
              _context3.next = 30;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to search",
              labelKey: "ERR_PT_FILL_VALID_FIELDS"
            }, "error"));
            return _context3.abrupt("return");

          case 30:
            if (!(index == 0 && !(isSearchBoxFirstRowValid && isownerCityRowValid && ispropertyTaxUniqueIdRowValid && isexistingPropertyIdRowValid && isownerMobNoRowValid && isownerLocalityRowValid && isownerDoorNoRowValid && isownerNameRowValid))) {
              _context3.next = 35;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field along with city",
              labelKey: "PT_INVALID_INPUT"
            }, "error"));
            return _context3.abrupt("return");

          case 35:
            if (!(index == 1 && !(ispropertyTaxApplicationPidRowValid && ispropertyTaxApplicationOwnerNoRowValid && ispropertyTaxApplicationNoRowValid))) {
              _context3.next = 38;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field along with city",
              labelKey: "PT_INVALID_INPUT"
            }, "error"));
            return _context3.abrupt("return");

          case 38:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.keys(searchScreenObject).length == 1 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context3.next = 43;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field along with city",
              labelKey: "PT_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE_OTHER_THAN_CITY"
            }, "error"));
            return _context3.abrupt("return");

          case 43:

            removeValidation(state, dispatch, index);
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                if (key === "tenantId") {} else if (key === "ids") {
                  query["propertyIds"] = searchScreenObject[key].trim();
                } else {
                  query[key] = searchScreenObject[key].trim();
                }
              }
            }
            queryObject = [];

            Object.keys(query).map(function (key) {
              queryObject.push({
                key: key, value: key == "doorNo" ? encodeURIComponent(query[key]) : query[key]
              });
            });
            _context3.prev = 47;

            (0, _commons.disableField)('propertySearch', "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
            (0, _commons.disableField)('propertySearch', "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);

            /* Fuzzy serach seperate API implementation */
            /* const response = (searchScreenObject['doorNo'] || searchScreenObject['name']) && index == 0 ? await getSearchResults(queryObject, {}, "/property-services/property/fuzzy/_search") : await getSearchResults(queryObject); */

            _context3.next = 52;
            return (0, _commons2.getSearchResults)(queryObject);

          case 52:
            response = _context3.sent;
            propertyData = response.Properties.map(function (item) {
              var _ref4;

              return _ref4 = {}, (0, _defineProperty3.default)(_ref4, "PT_COMMON_TABLE_COL_PT_ID", item.propertyId || "-"), (0, _defineProperty3.default)(_ref4, "PT_COMMON_TABLE_COL_OWNER_NAME", item.owners[0].name || "-"), (0, _defineProperty3.default)(_ref4, "PT_GUARDIAN_NAME", item.owners[0].fatherOrHusbandName || "-"), (0, _defineProperty3.default)(_ref4, "PT_COMMON_COL_EXISTING_PROP_ID", item.oldPropertyId || "-"), (0, _defineProperty3.default)(_ref4, "PT_COMMON_COL_ADDRESS", getAddress(item) || "-"), (0, _defineProperty3.default)(_ref4, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref4, "PT_COMMON_TABLE_COL_STATUS_LABEL", item.status || "-"), _ref4;
            });
            applicationData = response.Properties.map(function (item) {
              var _ref5;

              return _ref5 = {}, (0, _defineProperty3.default)(_ref5, "PT_COMMON_TABLE_COL_APP_NO", item || "-"), (0, _defineProperty3.default)(_ref5, "PT_COMMON_TABLE_COL_PT_ID", item || "-"), (0, _defineProperty3.default)(_ref5, "PT_COMMON_TABLE_COL_APP_TYPE", item.creationReason ? _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "PT." + item.creationReason, labelKey: "PT." + item.creationReason }) : "NA"), (0, _defineProperty3.default)(_ref5, "PT_COMMON_TABLE_COL_OWNER_NAME", item.owners[0].name || "-"), (0, _defineProperty3.default)(_ref5, "PT_COMMON_COL_ADDRESS", getAddress(item) || "-"), (0, _defineProperty3.default)(_ref5, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref5, "PT_COMMON_TABLE_COL_STATUS_LABEL", item.status || "-"), (0, _defineProperty3.default)(_ref5, "temporary", item), _ref5;
            });

            (0, _commons.enableField)('propertySearch', "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
            (0, _commons.enableField)('propertySearch', "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchPropertyTable", "props.data", propertyData));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchPropertyTable", "props.rows", response.Properties.length));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchApplicationTable", "props.data", applicationData));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchApplicationTable", "props.rows", response.Properties.length));
            //showHideProgress(false, dispatch);
            showHideTable(true, dispatch, index);
            _context3.next = 69;
            break;

          case 64:
            _context3.prev = 64;
            _context3.t0 = _context3["catch"](47);

            //showHideProgress(false, dispatch);
            (0, _commons.enableField)('propertySearch', "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
            (0, _commons.enableField)('propertySearch', "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelKey: _context3.t0.message }, "error"));

          case 69:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[47, 64]]);
  }));

  return function searchApiCall(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch, index) {
  if (index == 0) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchPropertyTable", "visible", booleanHideOrShow));
  } else {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchApplicationTable", "visible", booleanHideOrShow));
  }
};

var downloadPrintContainer = exports.downloadPrintContainer = function downloadPrintContainer(action, state, dispatch, status, applicationNumber, tenantId) {
  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var ptMutationCertificateDownloadObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: function link() {},
    leftIcon: "book"
  };
  var ptMutationCertificatePrintObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: function link() {
      console.log("clicked");
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: function link() {
      console.log("clicked");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: function link() {
      console.log("clicked");
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: function link() {
      console.log("clicked");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: function link() {
      console.log("clicked");
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [ptMutationCertificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [ptMutationCertificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-pt",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "MT_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "pt-download-button" },
              menu: downloadMenu
            }
          }
        },
        printMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-pt",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "PRINT", labelKey: "MT_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "pt-print-button" },
              menu: printMenu
            }
          }
        }

      }
      // gridDefination: {
      //   xs: 12,
      //   sm: 6
      // }
    }
  };
};