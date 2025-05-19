"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetFields = exports.propertySearch = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertySearch = exports.propertySearch = function () {
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

  return function propertySearch(_x, _x2) {
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
    var doorNo = item.address.doorNo != null ? item.address.doorNo + "," : "";
    var buildingName = item.address.buildingName != null ? item.address.buildingName + "," : "";
    var street = item.address.street != null ? item.address.street + "," : "";
    var mohalla = item.address.locality.name ? item.address.locality.name + "," : "";
    var city = item.address.city != null ? item.address.city : "";
    return doorNo + buildingName + street + mohalla + city;
  }
};

var searchApiCall = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var searchScreenObject, isSearchBoxFirstRowValid, isAdvancePaymentAllowed, warningEnabled, UpdateNumber, querryObject, response, billResponse, finalResponse, propertyData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            showHideTable(false, dispatch);

            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});

            // if (
            //   searchScreenObject.tenantId === "" ||
            //   searchScreenObject.locality === ""
            // ) {
            //   dispatch(
            //     toggleSnackbar(
            //       true,
            //       {
            //         labelName: "Please fill valid fields to search",
            //         labelKey: "ERR_FIRENOC_FILL_VALID_FIELDS"
            //       },
            //       "error"
            //     )
            //   );
            //   return;
            // }

            isSearchBoxFirstRowValid = (0, _index.validateFields)("components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children", state, dispatch, "public-search");

            if (isSearchBoxFirstRowValid) {
              _context2.next = 6;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to search",
              labelKey: "ERR_PT_FILL_VALID_FIELDS"
            }, "error"));
            return _context2.abrupt("return");

          case 6:
            if (!(searchScreenObject.tenantId && searchScreenObject.locality && !(searchScreenObject.ids || searchScreenObject.mobileNumber || searchScreenObject.ownerName))) {
              _context2.next = 11;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field along with city and locality",
              labelKey: "PT_SEARCH_SELECT_AT_LEAST_ONE_FIELD_WITH_CITY_AND_LOCALITY"
            }, "error"));
            return _context2.abrupt("return");

          case 11:
            removeValidation(state, dispatch);
            isAdvancePaymentAllowed = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");
            warningEnabled = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PropertyTax.UpdateNumber[0].warningEnabled", false);
            UpdateNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PropertyTax.UpdateNumber[0]", {});
            querryObject = (0, _publicSearchUtils.getPayload)(searchScreenObject);
            _context2.prev = 16;

            localStorage.setItem("pt-searched-locality", searchScreenObject.locality.code);
            _context2.next = 20;
            return (0, _commons.getSearchResults)(querryObject);

          case 20:
            response = _context2.sent;
            _context2.next = 23;
            return (0, _publicSearchUtils.fetchBill)(dispatch, response, searchScreenObject.tenantId, "PT");

          case 23:
            billResponse = _context2.sent;
            finalResponse = (0, _publicSearchUtils.getPropertyWithBillAmount)(response, billResponse);
            propertyData = finalResponse.Properties.map(function (item) {
              var _ref3;

              return _ref3 = {}, (0, _defineProperty3.default)(_ref3, "PT_MUTATION_PID", item.propertyId || "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_COL_OWNER_NAME", item.owners[0].name || "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_COL_ADDRESS", getAddress(item) || "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_PROPERTY_STATUS", item.status || "-"), (0, _defineProperty3.default)(_ref3, "PT_AMOUNT_DUE", item.totalAmount || item.totalAmount === 0 ? item.totalAmount : "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_COL_ACTION_LABEL", { status: item.status, totalAmount: item.totalAmount, isAdvancePaymentAllowed: isAdvancePaymentAllowed, warningEnabled: warningEnabled, UpdateNumber: UpdateNumber }), (0, _defineProperty3.default)(_ref3, "TENANT_ID", item.tenantId || "-"), (0, _defineProperty3.default)(_ref3, "ADVANCE_PAYMENT", isAdvancePaymentAllowed), _ref3;
            });


            dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchPropertyTable", "props.data", propertyData));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchPropertyTable", "props.rows", response.Properties.length));

            //showHideProgress(false, dispatch);
            showHideTable(true, dispatch);
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](16);

            //showHideProgress(false, dispatch);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelKey: _context2.t0.message }, "error"));
            console.log(_context2.t0);

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[16, 31]]);
  }));

  return function searchApiCall(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", "components.div.children.searchPropertyTable", "visible", booleanHideOrShow));
};

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  Object.keys(_publicSearchUtils.ComponentJsonPath).map(function (key) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", _publicSearchUtils.ComponentJsonPath[key], "props.value", ""));
    return true;
  });
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("public-search", _publicSearchUtils.ComponentJsonPath["locality"], "props.data", []));
  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", []));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.tenantId", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.locality.code", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.ids", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.mobileNumber", ""));
  dispatch((0, _actions.prepareFinalObject)("ptSearchScreen.ownerName", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen.tenantId", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen.locality.code", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen.ids", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen.mobileNumber", ""));
  dispatch((0, _actions.prepareFinalObject)("searchScreen.ownerName", ""));
  removeValidation(state, dispatch);
};