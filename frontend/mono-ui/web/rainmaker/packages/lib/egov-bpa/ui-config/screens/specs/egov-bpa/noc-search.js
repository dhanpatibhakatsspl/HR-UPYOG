"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNOCMdmsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("../../../../ui-utils/api");

var _nocApplication = require("./noc-searchResource/nocApplication");

var _searchResults = require("./noc-searchResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "NOC Application",
  labelKey: "NOC_APPLICATION_HEADER"
});

var getNOCMdmsData = exports.getNOCMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, mdmsBody) {
    var payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 3:
            payload = _context.sent;
            return _context.abrupt("return", payload);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getNOCMdmsData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getMdmsData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "NOC",
                  masterDetails: [{
                    name: "NocType"
                  }]
                }]
              }
            };
            _context2.next = 3;
            return getNOCMdmsData(action, state, dispatch, mdmsBody);

          case 3:
            payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            setNocTypeResponse(action, state, dispatch);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMdmsData(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var setNocTypeResponse = function setNocTypeResponse(action, state, dispatch) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var nocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.NOC.NocType", []);
  userInfo.roles && userInfo.roles.map(function (role) {
    nocData.map(function (nocType) {
      if (role.code === nocType.NocUserRole) {
        // let NocType = nocType.code.split("_").join(" ");
        dispatch((0, _actions.prepareFinalObject)("nocType", nocType.code));
      }
    });
  });
};

var BpaSearchAndResult = {
  uiFramework: "material-ui",
  name: "noc-search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _nocApplication.resetFields)(state, dispatch);
    getMdmsData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "noc-search"
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
        nocApplication: _nocApplication.nocApplication,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = BpaSearchAndResult;