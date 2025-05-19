"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("../../../../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchData = exports.fetchData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
        var finalResponse, queryObject, response, swResponse, myApplicationsCount;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        finalResponse = [];
                        queryObject = [{
                            key: "mobileNumber",
                            value: JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber
                        }, {
                            key: "tenantId",
                            value: JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity ? JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity : JSON.parse((0, _localStorageUtils.getUserInfo)()).roles[0].tenantId
                        }];
                        _context.next = 4;
                        return (0, _commons.getWSMyResults)(queryObject, 'APPLICATION', dispatch);

                    case 4:
                        response = _context.sent;
                        _context.next = 7;
                        return (0, _commons.getSWMyResults)(queryObject, 'APPLICATION', dispatch);

                    case 7:
                        swResponse = _context.sent;


                        if (response && response.WaterConnection && response.WaterConnection.length > 0 && swResponse && swResponse.SewerageConnections && swResponse.SewerageConnections.length > 0) {
                            finalResponse = [].concat((0, _toConsumableArray3.default)(response.WaterConnection), (0, _toConsumableArray3.default)(swResponse.SewerageConnections));
                        } else if (response && response.WaterConnection && response.WaterConnection.length > 0) {
                            finalResponse = response.WaterConnection;
                        } else {
                            if (swResponse && swResponse.SewerageConnections && swResponse.SewerageConnections.length > 0) {
                                finalResponse = swResponse.SewerageConnections;
                            }
                        }
                        try {
                            /*Mseva 2.0 */
                            if (finalResponse && finalResponse.length > 0) {
                                dispatch((0, _actions.prepareFinalObject)("myApplicationResults", finalResponse));
                                dispatch((0, _actions.prepareFinalObject)("myApplicationsCount", finalResponse.length));
                                myApplicationsCount = finalResponse.length;

                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("my-applications", "components.div.children.header.children.key", "props.dynamicArray", myApplicationsCount ? [myApplicationsCount] : [0]));
                            }
                        } catch (error) {};

                    case 11:
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