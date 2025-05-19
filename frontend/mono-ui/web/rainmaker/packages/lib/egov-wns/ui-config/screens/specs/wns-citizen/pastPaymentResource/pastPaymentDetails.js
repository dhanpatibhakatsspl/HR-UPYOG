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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchData = exports.fetchData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
        var queryObject, response;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        queryObject = [{
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }];
                        _context.next = 3;
                        return (0, _commons.getPastPaymentDetials)(queryObject);

                    case 3:
                        response = _context.sent;

                        try {
                            /*Mseva 2.0 */
                            if (response && response.WaterConnection && response.WaterConnection.length > 0) {
                                dispatch((0, _actions.prepareFinalObject)("pastPaymentsResults", response.WaterConnection));
                                dispatch((0, _actions.prepareFinalObject)("myConnectionCount", response.WaterConnection.length));
                            }
                        } catch (error) {}

                    case 5:
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