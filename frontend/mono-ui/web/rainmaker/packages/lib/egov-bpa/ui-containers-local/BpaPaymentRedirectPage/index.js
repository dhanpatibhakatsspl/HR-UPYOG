"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("../../ui-utils/api");

var _reactRouter = require("react-router");

var _commons = require("../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BpaPaymentRedirect = function (_Component) {
  (0, _inherits3.default)(BpaPaymentRedirect, _Component);

  function BpaPaymentRedirect() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BpaPaymentRedirect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BpaPaymentRedirect.__proto__ || Object.getPrototypeOf(BpaPaymentRedirect)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var search, pgUpdateResponse, consumerCode, tenantId, queryObject, response, financialYear, transactionId;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              search = _this.props.location.search;
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)("post", "pg-service/transaction/v1/_update" + search, "_update", [], {});

            case 4:
              pgUpdateResponse = _context.sent;
              consumerCode = (0, _get2.default)(pgUpdateResponse, "Transaction[0].consumerCode");
              tenantId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].tenantId");
              queryObject = [{
                key: "tenantId",
                value: tenantId
              }, {
                key: "applicationNos",
                value: consumerCode
              }];
              _context.next = 10;
              return (0, _commons.getAppSearchResults)(queryObject);

            case 10:
              response = _context.sent;
              financialYear = (0, _get2.default)(response.Licenses[0], "financialYear");

              if ((0, _get2.default)(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
                window.location.href = (process.env.NODE_ENV === "production" ? "/citizen" : "") + "/tradelicence/acknowledgement?purpose=" + "pay" + "&status=" + "failure" + "&applicationNumber=" + consumerCode + "&FY=" + financialYear + "&tenantId=" + tenantId;
              } else {
                transactionId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].txnId");

                window.location.href = (process.env.NODE_ENV === "production" ? "/citizen" : "") + "/tradelicence/acknowledgement?purpose=" + "pay" + "&status=" + "success" + "&applicationNumber=" + consumerCode + "&FY=" + financialYear + "&tenantId=" + tenantId + "&secondNumber=" + transactionId;
              }
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](1);

              alert(_context.t0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 15]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BpaPaymentRedirect, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null);
    }
  }]);
  return BpaPaymentRedirect;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)(BpaPaymentRedirect);