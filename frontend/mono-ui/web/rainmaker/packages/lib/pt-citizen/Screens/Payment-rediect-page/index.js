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

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/common/actions");

var _api = require("egov-ui-kit/utils/api");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentRedirect = function (_React$Component) {
  (0, _inherits3.default)(PaymentRedirect, _React$Component);

  function PaymentRedirect() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentRedirect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentRedirect.__proto__ || Object.getPrototypeOf(PaymentRedirect)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var history, search, pgUpdateResponse, consumerCode, tenantId, txnAmount;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              history = _this.props.history;
              search = _this.props.location.search;
              _context.prev = 2;
              _context.next = 5;
              return (0, _api.httpRequest)("pg-service/transaction/v1/_update" + search, "_update", [], {});

            case 5:
              pgUpdateResponse = _context.sent;
              consumerCode = (0, _get2.default)(pgUpdateResponse, "Transaction[0].consumerCode");
              tenantId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].tenantId");
              txnAmount = (0, _get2.default)(pgUpdateResponse, "Transaction[0].txnAmount");

              if ((0, _get2.default)(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
                _this.props.toggleSpinner();
                history.push("/property-tax/payment-failure/" + consumerCode.split(":")[0] + "/" + tenantId + "/" + consumerCode.split(":")[1] + "/" + (0, _localStorageUtils.localStorageGet)("assessmentYear") + "/" + txnAmount);
              } else {
                //let transactionId = get(pgUpdateResponse, "Transaction[0].receipt[0].transactionId");
                _this.props.toggleSpinner();
                history.push("/property-tax/payment-success/" + consumerCode.split(":")[0] + "/" + tenantId);
              }
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);

              _this.props.toggleSpinner();
              alert(_context.t0);
              // history.push("/property-tax/payment-success/"+moduleId.split("-",(moduleId.split("-").length-1)).join("-"))

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[2, 12]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PaymentRedirect, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.toggleSpinner();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null);
    }
  }]);
  return PaymentRedirect;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSpinner: function toggleSpinner() {
      return dispatch((0, _actions.toggleSpinner)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(PaymentRedirect);