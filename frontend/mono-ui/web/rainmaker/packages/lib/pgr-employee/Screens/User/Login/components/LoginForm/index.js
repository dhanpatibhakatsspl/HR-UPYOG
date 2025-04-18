"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _components = require("components");

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _msevaPunjab = require("egov-ui-kit/assets/images/mseva-punjab.png");

var _msevaPunjab2 = _interopRequireDefault(_msevaPunjab);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginForm = function LoginForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      onForgotPasswdCLick = _ref.onForgotPasswdCLick;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(_components.Card, {
    className: "user-screens-card col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "web-user-logo", style: { marginBottom: "24px" } },
        _react2.default.createElement(_components.Image, {
          className: "mseva-logo employee-login-logo",
          source: "" + _msevaPunjab2.default
        })
      ),
      _react2.default.createElement(_translationNode2.default, {
        style: { marginBottom: "12px" },
        className: "text-center",
        bold: true,
        dark: true,
        fontSize: 16,
        label: "LOGIN"
      }),
      _react2.default.createElement(_components.TextField, (0, _extends3.default)({
        onChange: function onChange(e, value) {
          return handleFieldChange("username", value);
        }
      }, fields.username)),
      _react2.default.createElement(_components.TextField, (0, _extends3.default)({
        onChange: function onChange(e, value) {
          return handleFieldChange("password", value);
        }
      }, fields.password)),
      _react2.default.createElement(_common.CityPicker, {
        onChange: handleFieldChange,
        fieldKey: "city",
        field: fields.city
      }),
      _react2.default.createElement(_components.Button, (0, _extends3.default)({}, submit, { fullWidth: true, primary: true }))
    )
  });
};

exports.default = LoginForm;