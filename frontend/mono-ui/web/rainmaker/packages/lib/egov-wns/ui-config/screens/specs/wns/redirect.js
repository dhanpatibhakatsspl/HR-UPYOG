"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _lodash = require("lodash");

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSewerageDetails = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _uiUtils.httpRequest)("post", "/sw-services/swc/_search", "_search", queryObject);

                    case 3:
                        response = _context.sent;

                        if (response !== null && response !== undefined && response.SewerageConnections && response.SewerageConnections.length > 0) {
                            dispatch((0, _actions.setRoute)("/wns/connection-details?connectionNumber=" + (0, _lodash.get)(response, 'SewerageConnections[0].connectionNo', '') + "&tenantId=" + (0, _lodash.get)(response, 'SewerageConnections[0].tenantId', '') + "&service=" + _commons2.serviceConst.SEWERAGE + "&connectionType=" + (0, _lodash.get)(response, 'SewerageConnections[0].connectionType', '')));
                        }
                        return _context.abrupt("return", response);

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](0);

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 8]]);
    }));

    return function getSewerageDetails(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getWaterDetails = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _uiUtils.httpRequest)("post", "/ws-services/wc/_search", "_search", queryObject);

                    case 3:
                        response = _context2.sent;

                        if (response !== null && response !== undefined && response.WaterConnection && response.WaterConnection.length > 0) {
                            dispatch((0, _actions.setRoute)("/wns/connection-details?connectionNumber=" + (0, _lodash.get)(response, 'WaterConnection[0].connectionNo', '') + "&tenantId=" + (0, _lodash.get)(response, 'WaterConnection[0].tenantId', '') + "&service=" + _commons2.serviceConst.WATER + "&connectionType=" + (0, _lodash.get)(response, 'WaterConnection[0].connectionType', '')));
                        }return _context2.abrupt("return", response);

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2["catch"](0);

                    case 10:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function getWaterDetails(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var header = (0, _utils.getCommonHeader)({
    labelKey: "WS_SEARCH_CONNECTION_HEADER"
});

var beforeInitFn = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject, dispatch, businessService) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(businessService == 'WS')) {
                            _context3.next = 5;
                            break;
                        }

                        _context3.next = 3;
                        return getWaterDetails(queryObject, dispatch);

                    case 3:
                        _context3.next = 8;
                        break;

                    case 5:
                        if (!(businessService == 'SW')) {
                            _context3.next = 8;
                            break;
                        }

                        _context3.next = 8;
                        return getSewerageDetails(queryObject, dispatch);

                    case 8:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function beforeInitFn(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

var redirectScreenConfig = {
    uiFramework: "material-ui",
    name: "redirect",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {

        var connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
        var queryObject = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: connectionNumber }];
        beforeInitFn(queryObject, dispatch, businessService);
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "redirect"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",

                    children: {
                        header: (0, _extends3.default)({
                            gridDefination: {
                                xs: 12,
                                sm: 6
                            }
                        }, header)
                    }
                }
            }
        }

    }
};

exports.default = redirectScreenConfig;