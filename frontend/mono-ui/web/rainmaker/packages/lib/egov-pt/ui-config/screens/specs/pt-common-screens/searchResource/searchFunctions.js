"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertySearch = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _index = require("../../utils/index");

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

var getAddress = function getAddress(item) {
  var doorNo = item.address.doorNo != null ? item.address.doorNo + "," : '';
  var buildingName = item.address.buildingName != null ? item.address.buildingName + "," : '';
  var street = item.address.street != null ? item.address.street + "," : '';
  var mohalla = item.address.locality.name ? item.address.locality.name + "," : '';
  var city = item.address.city != null ? item.address.city : '';
  return doorNo + buildingName + street + mohalla + city;
};

var searchApiCall = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var searchScreenObject, queryObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, response, propertyData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            showHideTable(false, dispatch);

            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            queryObject = [];
            isSearchBoxFirstRowValid = (0, _index.validateFields)("components.div.children.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children", state, dispatch, "propertySearch");
            isSearchBoxSecondRowValid = (0, _index.validateFields)("components.div.children.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children", state, dispatch, "propertySearch");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context2.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please provide the city and any one other field information to search for property.", labelKey: "ERR_PT_COMMON_FILL_MANDATORY_FIELDS" }, "warning"));
            _context2.next = 32;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context2.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please provide the city and any one other field information to search for property.", labelKey: "ERR_PT_COMMON_FILL_MANDATORY_FIELDS" }, "warning"));
            _context2.next = 32;
            break;

          case 13:
            if (!((searchScreenObject["propertyIds"] === undefined || searchScreenObject["propertyIds"] === "") && (searchScreenObject["mobileNumber"] === undefined || searchScreenObject["mobileNumber"] === "") && (searchScreenObject["oldpropertyids"] === undefined || searchScreenObject["oldpropertyids"] === ""))) {
              _context2.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "In addition to City, please provide any one of the other parameters to search for property.", labelKey: "ERR_PT_COMMON_FILL_VALID_FIELDS" }, "warning"));
            _context2.next = 32;
            break;

          case 17:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
            }
            _context2.prev = 18;
            _context2.next = 21;
            return (0, _commons.getSearchResults)(queryObject);

          case 21:
            response = _context2.sent;
            propertyData = response.Properties.map(function (item) {
              var _ref3;

              return _ref3 = {}, (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_COL_PT_ID", item.propertyId || "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_COL_OWNER_NAME", item.owners.filter(function (owner) {
                return owner.status == "ACTIVE";
              }).map(function (owner) {
                return owner.name;
              }).join(",") || "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_COL_ADDRESS", getAddress(item) || "-"), (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_COL_ACTION_LABEL", item.status === 'ACTIVE' ? "SELECT" : item.status), (0, _defineProperty3.default)(_ref3, "PT_COMMON_TABLE_COL_TENANTID_LABEL", item.tenantId), _ref3;
            });


            dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchPropertyTable", "props.data", propertyData));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchPropertyTable", "props.rows", response.Properties.length));

            showHideTable(true, dispatch);
            _context2.next = 32;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](18);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelKey: _context2.t0.message }, "error"));
            console.log(_context2.t0);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[18, 28]]);
  }));

  return function searchApiCall(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("propertySearch", "components.div.children.searchPropertyTable", "visible", booleanHideOrShow));
};