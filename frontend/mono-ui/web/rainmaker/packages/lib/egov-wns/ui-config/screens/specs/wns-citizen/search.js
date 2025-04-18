"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMdmsData = exports.getData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _citizenApplication = require("./searchResource/citizenApplication");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _searchResults = require("./searchResource/searchResults");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _uiUtils = require("../../../../ui-utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = hasButton && hasButton === "false" ? false : true;

var header = (0, _utils.getCommonHeader)({
    labelKey: "WS_SEARCH_CONNECTION_HEADER"
});
var waterAndSewerageSearchAndResult = {
    uiFramework: "material-ui",
    name: "search",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
        dispatch((0, _actions2.prepareFinalObject)("searchScreen", {}));
        var data = (0, _find2.default)(businessServiceData, { businessService: "NewTL" });

        var _ref = data || [],
            states = _ref.states;

        getData(action, state, dispatch).then(function (responseAction) {});
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "search"
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
                },
                citizenApplication: _citizenApplication.citizenApplication,
                breakAfterSearch: (0, _utils.getBreak)(),
                searchResults: _searchResults.searchResults
            }
        }
    }
};

var getData = exports.getData = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getMdmsData(action, state, dispatch);

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getData(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getMdmsData = exports.getMdmsData = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
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
                                    masterDetails: [{
                                        name: "tenants"
                                    }, {
                                        name: "citymodule"
                                    }]
                                }]
                            }
                        };
                        _context2.prev = 1;
                        payload = null;
                        _context2.next = 5;
                        return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

                    case 5:
                        payload = _context2.sent;


                        dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
                        payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
                        dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.tenant", payload.MdmsRes.tenant));
                        _context2.next = 13;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2["catch"](1);

                    case 13:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 11]]);
    }));

    return function getMdmsData(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = waterAndSewerageSearchAndResult;