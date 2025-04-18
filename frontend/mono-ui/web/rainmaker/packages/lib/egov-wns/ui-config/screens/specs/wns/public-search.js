"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

require("./index.css");

var _searchResources = require("./publicSearchResource/search-resources");

var _searchApplicationResult = require("./publicSearchResource/searchApplicationResult");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
var tenant = (0, _localStorageUtils.getTenantId)();

var getMDMSData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
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
                                    masterDetails: [{
                                        name: "tenants"
                                    }, { name: "citymodule" }]
                                }]
                            }
                        };
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

                    case 4:
                        payload = _context.sent;

                        payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
                        dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
                        _context.next = 9;
                        return (0, _commons2.getBusinessServiceMdmsData)(dispatch, _common2.default.tenantId, "wns");

                    case 9:
                        _context.next = 13;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context["catch"](1);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 11]]);
    }));

    return function getMDMSData(_x) {
        return _ref.apply(this, arguments);
    };
}();
var screenConfig = {
    uiFramework: "material-ui",
    name: "public-search",

    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        (0, _localStorageUtils.setModule)((0, _commons2.getModuleName)());
        var tenantId = (0, _localStorageUtils.getTenantId)();
        // dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
        getMDMSData(dispatch);

        return action;
    },

    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "public-domain-search, public-domain-search-position",
                id: "search"
            },
            children: {
                searchApplications: _searchResources.searchApplications,
                breakAfterSearch3: (0, _utils.getBreak)(),
                searchApplicationResult: _searchApplicationResult.searchApplicationResult,
                breakAfterSearch4: (0, _utils.getBreak)()
            }
        }
    }
};

exports.default = screenConfig;