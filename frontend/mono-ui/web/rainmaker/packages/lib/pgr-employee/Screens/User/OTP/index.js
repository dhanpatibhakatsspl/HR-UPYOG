"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _common = require("modules/common");

var _OTPForm = require("./components/OTPForm");

var _OTPForm2 = _interopRequireDefault(_OTPForm);

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/auth/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTPFormHOC = (0, _form2.default)({ formKey: "employeeOTP" })(_OTPForm2.default);

var OTP = function (_Component) {
  (0, _inherits3.default)(OTP, _Component);

  function OTP() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OTP);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OTP.__proto__ || Object.getPrototypeOf(OTP)).call.apply(_ref, [this].concat(args))), _this), _this.resendOTP = function () {
      var _this$props = _this.props,
          sendOTP = _this$props.sendOTP,
          forgotPasswdFormKey = _this$props.forgotPasswdFormKey;

      sendOTP(forgotPasswdFormKey);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(OTP, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          phoneNumber = _props.phoneNumber,
          loading = _props.loading,
          toggleSnackbarAndSetText = _props.toggleSnackbarAndSetText;
      var resendOTP = this.resendOTP;
      //className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8"

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(
          _common.Banner,
          null,
          _react2.default.createElement(OTPFormHOC, { toggleSnackbarAndSetText: toggleSnackbarAndSetText, resendOTP: resendOTP, phoneNumber: phoneNumber })
        )
      );
    }
  }]);
  return OTP;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var authenticating = state.auth.authenticating;
  var previousRoute = state.app.previousRoute;

  var phoneNumber = null;
  var forgotPasswdFormKey = "employeeForgotPasswd";
  var forgotPasswdform = state.form[forgotPasswdFormKey] || {};
  if (forgotPasswdform.fields && forgotPasswdform.fields.username) {
    phoneNumber = forgotPasswdform.fields.username.value;
  }
  return { previousRoute: previousRoute, phoneNumber: phoneNumber, loading: authenticating, forgotPasswdFormKey: forgotPasswdFormKey };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    sendOTP: function sendOTP(otp) {
      return dispatch((0, _actions2.sendOTP)(otp));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OTP);