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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchData = exports.fetchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, queryObject, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.prepareFinalObject)("searchResults", ""));
            dispatch((0, _actions.prepareFinalObject)("myApplicationsCount", 0));
            tenantId = (0, _localStorageUtils.getTenantId)() || "";


            if (process.env.REACT_APP_NAME !== "Employee") {
              tenantId = _common2.default.tenantId || (0, _get2.default)(state, "auth.userInfo.permanentCity", "");
            }
            queryObject = [{ key: "tenantId", value: tenantId }];
            _context.next = 7;
            return (0, _commons.getSearchResults)(queryObject);

          case 7:
            response = _context.sent;

            //const mdmsRes = await getMdmsData(dispatch);
            //   let tenants =
            //     mdmsRes &&
            //     mdmsRes.MdmsRes &&
            //     mdmsRes.MdmsRes.tenant.citymodule.find(item => {
            //       if (item.code === "TL") return true;
            //     });
            //   dispatch(
            //     prepareFinalObject(
            //       "applyScreenMdmsData.common-masters.citiesByModule.TL",
            //       tenants
            //     )
            //   );
            try {
              if (response && response.FireNOCs && response.FireNOCs.length > 0) {
                dispatch((0, _actions.prepareFinalObject)("searchResults", response.FireNOCs));
                dispatch((0, _actions.prepareFinalObject)("myApplicationsCount", response.FireNOCs.length));
              }
            } catch (error) {
              console.log(error);
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();