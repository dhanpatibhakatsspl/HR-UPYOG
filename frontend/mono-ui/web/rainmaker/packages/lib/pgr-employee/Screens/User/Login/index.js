"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _common = require("modules/common");

var _LoginForm = require("./components/LoginForm");

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginFormHOC = (0, _form2.default)({ formKey: "employeeLogin" })(_LoginForm2.default);

var Login = function Login() {
  // className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8"
  return _react2.default.createElement(
    _common.Banner,
    { hideBackButton: true },
    _react2.default.createElement(LoginFormHOC, null)
  );
};

exports.default = Login;