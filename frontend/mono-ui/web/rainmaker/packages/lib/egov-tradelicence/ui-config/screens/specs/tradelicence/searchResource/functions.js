"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("../../../../..//ui-utils/commons");

var _index = require("../../utils/index");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _utils = require("../../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { LabelContainer } from "egov-ui-framework/ui-containers";

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, response, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            queryObject = [{
              key: "tenantId",
              value: (0, _localStorageUtils.getTenantId)()
            }, { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.tradeLicenseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "ERR_FILL_VALID_FIELDS"
            }, "warning"));
            _context.next = 23;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "ERR_FILL_ONE_FIELDS"
            }, "warning"));
            _context.next = 23;
            break;

          case 13:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            _context.next = 23;
            break;

          case 17:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "daystart")
                  });
                } else if (key === "toDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "dayend")
                  });
                } else {
                  queryObject.push({ key: key, value: searchScreenObject[key].trim().toUpperCase() });
                }
              }
            }
            (0, _commons2.disableFieldAndShowSpinner)('search', "components.div.children.tradeLicenseApplication.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
            _context.next = 21;
            return (0, _commons.getSearchResults)(queryObject);

          case 21:
            response = _context.sent;


            try {
              data = response.Licenses.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_APP_NO', item.applicationNumber || "-"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_LIC_NO', item.licenseNumber || "-"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_TRD_NAME', item.tradeName || "-"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_OWN_NAME', item.tradeLicenseDetail.owners[0].name || "-"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_APP_DATE', (0, _index.convertEpochToDate)(item.applicationDate) || "-"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_FIN_YEAR', item.financialYear || "-"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_APP_TYPE', "TL_TYPE_" + item.applicationType || "NEW"), (0, _defineProperty3.default)(_ref2, 'TL_COMMON_TABLE_COL_STATUS', item.status || "-"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref2, "TL_COMMON_TABLE_COL_STATUS", item.status || "-"), _ref2;
              });

              (0, _commons2.enableFieldAndHideSpinner)('search', "components.div.children.tradeLicenseApplication.children.cardContent.children.button.children.buttonContainer.children.searchButton", dispatch);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", response.Licenses.length));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
              console.log(error);
            }

          case 23:
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
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};