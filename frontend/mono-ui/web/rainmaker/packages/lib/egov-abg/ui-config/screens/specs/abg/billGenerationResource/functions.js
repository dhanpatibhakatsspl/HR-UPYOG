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

var _index = require("../../utils/index");

var _searchResults = require("./searchResults");

var _utils = require("../../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
              value: JSON.parse((0, _localStorageUtils.getUserInfo)()).tenantId
            }, { key: "limit", value: "10" }, { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.fireNOCApplication.children.cardContent.children.searchContainer.children", state, dispatch, "billGeneration");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.fireNOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children", state, dispatch, "billGeneration");


            if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
              dispatch((0, _actions.toggleSnackbar)(true, "Please fill valid fields to start search", "warning"));
            } else if (Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            })) {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "Please fill at least one field to start search",
                labelKey: "NOC_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
              }, "warning"));
            } else if ((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0) {
              dispatch((0, _actions.toggleSnackbar)(true, "Please fill From Date", "warning"));
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

              response = [{
                jobId: "TL-JLD-2018",
                dateCreated: 1554332357000,
                status: "Success"
                //Add download button
              }];

              try {
                data = response.map(function (item) {
                  var _ref2;

                  return _ref2 = {}, (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Job ID No."), item.jobId || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Date Created"), (0, _index.convertEpochToDate)(item.dateCreated) || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Status"), item.status || "-"), (0, _defineProperty3.default)(_ref2, "tenantId", item.tenantId), _ref2;
                });


                dispatch((0, _actions.handleScreenConfigurationFieldChange)("billGeneration", "components.div.children.searchResults", "props.data", data));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("billGeneration", "components.div.children.searchResults"));
                showHideTable(true, dispatch);
              } catch (error) {
                dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
              }
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("billGeneration", "components.div.children.searchResults", "visible", booleanHideOrShow));
};