"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _utils2 = require("../utils");

var _commons = require("egov-common/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//returns action object
var getMyApplications = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var queryParams, payload, tenantId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            queryParams = [];
            payload = null;
            tenantId = (0, _localStorageUtils.getTenantId)();
            _context.next = 6;
            return (0, _api.httpRequest)("post", "birth-death-services/death/_searchapplications?tenantId=" + tenantId, "_search", queryParams, {});

          case 6:
            payload = _context.sent;
            return _context.abrupt("return", payload);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            (0, _actions.toggleSnackbar)(true, {
              labelName: "Could not load lease Details",
              labelKey: "ERR_API_ERROR"
            }, "error");

          case 13:
            return _context.abrupt("return", null);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function getMyApplications(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var certificateDowloadHandler = function certificateDowloadHandler(fileStoreId) {
  //Download Certificate by sending filestoreid and mode
  (0, _commons.downloadReceiptFromFilestoreID)(fileStoreId, "download");
};

var downloadReceiptHandler = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(consumerCode, tenantId) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _utils2.downloadReceipt)(consumerCode, tenantId);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function downloadReceiptHandler(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var header = (0, _utils.getCommonHeader)({
  labelName: "My Applications",
  labelKey: "BND_CITIZEN_MY_APPLICATIONS"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var myApplications = {
  uiFramework: "material-ui",
  name: "myApplications",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.toggleSpinner)());
    getMyApplications().then(function (response) {
      dispatch((0, _actions.toggleSpinner)());
      try {
        dispatch((0, _actions.prepareFinalObject)("searchResults", response.applications));
      } catch (e) {
        (0, _actions.toggleSnackbar)(true, {
          labelName: "Could not load lease Details",
          labelKey: "ERR_API_ERROR"
        }, "error");
      }
    });

    return action;
  },

  afterInitForm: function afterInitForm(action, state, dispatch) {},
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-bnd",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            contents: [{
              label: "BND_APPL_DATE",
              jsonPath: "applicationDate",
              isDate: true
            }, {
              label: "BND_CERT_REG_NO",
              jsonPath: "regNo"
            }, {
              label: "BND_CERT_NAME",
              jsonPath: "name"
            }, {
              label: "BND_APPL_TYPE",
              jsonPath: "applicationType",
              prefix: "BND_"
            }, {
              label: "BND_APPL_STATUS",
              jsonPath: "status",
              prefix: "BND_STATUS_"
            }],
            moduleName: "DEATH",
            homeURL: "/death-citizen/home",
            certificateDowloadHandler: certificateDowloadHandler,
            downloadReceiptHandler: downloadReceiptHandler
          }
        }
      }
    }
  }
};
exports.default = myApplications;