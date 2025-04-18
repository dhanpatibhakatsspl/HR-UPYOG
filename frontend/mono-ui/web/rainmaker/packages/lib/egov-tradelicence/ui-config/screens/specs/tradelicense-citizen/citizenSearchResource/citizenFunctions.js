"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("../../../../../ui-utils/commons");

var _uiUtils = require("../../../../../ui-utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
            _context.prev = 1;
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context.sent;
            return _context.abrupt("return", payload);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function getMdmsData() {
    return _ref.apply(this, arguments);
  };
}();
var fetchData = exports.fetchData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var response, mdmsRes, tenants;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _commons.getSearchResults)();

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return getMdmsData(dispatch);

          case 5:
            mdmsRes = _context2.sent;
            tenants = mdmsRes && mdmsRes.MdmsRes && mdmsRes.MdmsRes.tenant.citymodule.find(function (item) {
              if (item.code === "TL") return true;
            });

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.common-masters.citiesByModule.TL", tenants));
            try {
              /*Mseva 1.0 */
              // let data =
              //   response &&
              //   response.Licenses.map(item => ({
              //     [get(textToLocalMapping, "Application No")]:
              //       item.applicationNumber || "-",
              //     [get(textToLocalMapping, "License No")]: item.licenseNumber || "-",
              //     [get(textToLocalMapping, "Trade Name")]: item.tradeName || "-",
              //     [get(textToLocalMapping, "Owner Name")]:
              //       item.tradeLicenseDetail.owners[0].name || "-",
              //     [get(textToLocalMapping, "Application Date")]:
              //       convertEpochToDate(item.applicationDate) || "-",
              //     tenantId: item.tenantId,
              //     [get(textToLocalMapping, "Status")]:
              //       get(textToLocalMapping, item.status) || "-"
              //   }));

              // dispatch(
              //   handleField(
              //     "home",
              //     "components.div.children.applyCard.children.searchResults",
              //     "props.data",
              //     data
              //   )
              // );
              /*Mseva 2.0 */

              if (response && response.Licenses && response.Licenses.length > 0) {
                dispatch((0, _actions.prepareFinalObject)("searchResults", response.Licenses));
                dispatch((0, _actions.prepareFinalObject)("myApplicationsCount", response.Licenses.length));
              }
            } catch (error) {
              console.log(error);
            }

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchData(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();