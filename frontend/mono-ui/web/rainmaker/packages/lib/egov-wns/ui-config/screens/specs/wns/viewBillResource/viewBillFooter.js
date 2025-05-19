"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewBillFooter = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const connectionNo = getQueryArg(window.location.href, "connectionNumber");
// const tenantId = getQueryArg(window.location.href, "tenantId");
// const businessService = connectionNo.includes("WS") ? "WS" : "SW";

var getRedirectionForPayment = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var connectionNo, tenantId, businessService, environment, origin;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            connectionNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].connectionNo", "");

            if (!connectionNo) {
              connectionNo = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
            };
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].tenantId", "");

            if (!tenantId) {
              tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            }
            businessService = connectionNo.includes("WS") ? "WS" : "SW";
            environment = "";

            if (process.env.NODE_ENV === "production") {
              environment = process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee";
            }
            origin = process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;

            window.location.assign("" + origin + environment + "/egov-common/pay?consumerCode=" + connectionNo + "&tenantId=" + tenantId + "&businessService=" + businessService);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getRedirectionForPayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var callDownloadBill = function callDownloadBill(mode) {
  var conCode = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
  var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
  var businessService = (0, _commons.getQueryArg)(window.location.href, "connectionNumber") && (0, _commons.getQueryArg)(window.location.href, "connectionNumber").includes("WS") ? "WS" : "SW";

  (0, _commons2.downloadWNSBillFromConsumer)(conCode, tenantId, businessService);
  /* const val = [
    {
      key: 'consumerCode',
      value: getQueryArg(window.location.href, "connectionNumber")
    },
    { key: 'tenantId', value: tenantId },
    {
      key: "businessService", value: businessService
    }
  ]
  downloadBill(val, mode); */
};

var viewBillFooter = exports.viewBillFooter = (0, _utils2.getCommonApplyFooter)("BOTTOM", {
  downloadButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadButton: (0, _utils.getLabel)({
        labelKey: "WS_COMMON_DOWNLOAD_BILL"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        callDownloadBill("download");
      }
    }
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      payButtonLabel: (0, _utils.getLabel)({
        labelKey: "WS_COMMON_PAY"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: getRedirectionForPayment
    }
  }
});