"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setResidentialList = exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _functions = require("../../bpastakeholder/searchResource/functions");

var _utils = require("../../utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, queryObject, searchScreenObject, key, response, businessIdToOwnerMappingForBPA, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            tenantId = (0, _localStorageUtils.getTenantId)();
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            // const isSearchBoxFirstRowValid = validateFields(
            //   "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children",
            //   state,
            //   dispatch,
            //   "search"
            // );

            // if (!(isSearchBoxFirstRowValid)) {
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
            // } else

            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "BPA_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 29;
            break;

          case 8:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context.next = 12;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            _context.next = 29;
            break;

          case 12:
            //  showHideProgress(true, dispatch);
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
            _context.prev = 13;
            _context.next = 16;
            return (0, _commons.getBpaSearchResults)(queryObject);

          case 16:
            response = _context.sent;
            _context.next = 19;
            return (0, _functions.getWorkFlowDataForBPA)((0, _get2.default)(response, "BPA"));

          case 19:
            businessIdToOwnerMappingForBPA = _context.sent;

            // const response = searchSampleResponse();

            data = response.BPA.map(function (item) {
              var _ref2;

              return _ref2 = {}, (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_APP_NO", item.applicationNo || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL", item.landInfo && item.landInfo.owners && item.landInfo.owners.map(function (items) {
                return items.isPrimaryOwner ? items.name : "";
              })), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_APP_DATE_LABEL", (0, _index.convertEpochToDate)(parseInt((0, _get2.default)(item, "auditDetails.createdTime"))) || "-"), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_STATUS_LABEL", (0, _utils.getTextToLocalMapping)("WF_BPA_" + (0, _get2.default)(businessIdToOwnerMappingForBPA[item.applicationNo], "state", null))), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref2, "SERVICE_TYPE", (0, _get2.default)(item, "businessService", null)), (0, _defineProperty3.default)(_ref2, "BPA_COMMON_TABLE_COL_APP_STATUS_LABEL", item.status || ""), _ref2;
            });

            // if (data && data.length > 0) {
            //   data.map(items => {
            //     if (items && items["Application Date"]) {
            //       const date = items["Application Date"].split("/");
            //       items["Application Date"] = `${date[1]}/${date[0]}/${date[2]}`
            //     }
            //   });
            // }

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.rows", response.BPA.length));
            //showHideProgress(false, dispatch);
            showHideTable(true, dispatch);
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](13);

            console.log(_context.t0);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[13, 26]]);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var setResidentialList = exports.setResidentialList = function setResidentialList(state, dispatch) {
  var residentialList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPAs[0].BPADetails.blockwiseusagedetails.residential", []);
  var furnishedRolesList = residentialList.map(function (item) {
    return " " + item.label;
  });
  dispatch((0, _actions.prepareFinalObject)("bpa.summary.residential", furnishedRolesList.join()));
};