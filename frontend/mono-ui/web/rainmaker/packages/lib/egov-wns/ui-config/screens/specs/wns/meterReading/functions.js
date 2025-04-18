"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("../../../../../ui-utils/commons");

var _index = require("../../utils/index");

var _utils = require("../../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            queryObject = [{
              key: "tenantId",
              value: (0, _localStorageUtils.getTenantIdCommon)()
            }, {
              "connectionNos": (0, _commons2.getQueryArg)(window.location.href, "connectionNos")
            }, { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.tradeLicenseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children", state, dispatch, "search");


            if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "Please fill valid fields to start search",
                labelKey: "ERR_FILL_VALID_FIELDS"
              }, "warning"));
            } else if (Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            })) {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "Please fill at least one field to start search",
                labelKey: "ERR_FILL_ONE_FIELDS"
              }, "warning"));
            } else if ((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0) {
              dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            } else {
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
                    queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                  }
                }
              }

              // const response = await getConsumptionDetails(queryObject);
              // try {
              //   let data = response.meterReadings.map(item => ({
              //     [getTextToLocalMapping("Billing Period")]: item.billingPeriod || "-",
              //     [getTextToLocalMapping("License No")]: item.licenseNumber || "-",
              //     [getTextToLocalMapping("Trade Name")]: item.tradeName || "-",
              //     [getTextToLocalMapping("Owner Name")]:
              //       item.tradeLicenseDetail.owners[0].name || "-",
              //     [getTextToLocalMapping("Application Date")]:
              //       convertEpochToDate(item.applicationDate) || "-",
              //     [getTextToLocalMapping("Status")]: item.status || "-",
              //     ["tenantId"]: item.tenantId
              //   }));

              //   dispatch(
              //     handleField(
              //       "search",
              //       "components.div.children.searchResults",
              //       "props.data",
              //       data
              //     )
              //   );
              //   dispatch(
              //     handleField(
              //       "search",
              //       "components.div.children.searchResults",
              //       "props.title",
              //       `${getTextToLocalMapping(
              //         "Search Results for Trade License Applications"
              //       )} (${response.Licenses.length})`
              //     )
              //   );
              //   showHideTable(true, dispatch);
              // } catch (error) {
              //   dispatch(toggleSnackbar(true, error.message, "error"));
              // }
            }

          case 6:
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
var getMdmsData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{ name: "citymodule" }]
                }]
              }
            };
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context2.sent;
            return _context2.abrupt("return", payload);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function getMdmsData() {
    return _ref2.apply(this, arguments);
  };
}();