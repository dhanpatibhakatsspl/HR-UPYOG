"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _msevaPunjab = require("egov-ui-kit/assets/images/mseva-punjab.png");

var _msevaPunjab2 = _interopRequireDefault(_msevaPunjab);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTPForm = function OTPForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      toggleSnackbarAndSetText = _ref.toggleSnackbarAndSetText,
      form = _ref.form,
      resendOTP = _ref.resendOTP,
      phoneNumber = _ref.phoneNumber;

  var fields = form.fields || {};
  var submit = form.submit;

  var _ref2 = fields || {},
      newPassword = _ref2.newPassword,
      confirmnewpassword = _ref2.confirmnewpassword;

  return _react2.default.createElement(_components.Card, {
    className: "user-screens-card forgot-passwd-card col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4",
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
        className: "text-center",
        bold: true,
        dark: true,
        fontSize: 16,
        label: "CORE_COMMON_FORGOT_PASSWORD_LABEL"
      }),
      _react2.default.createElement(
        "div",
        { className: "citizen-otp-sent-message", style: { marginTop: 24 } },
        _react2.default.createElement(_translationNode2.default, { label: "CORE_OTP_SENT_MESSAGE" }),
        _react2.default.createElement(_translationNode2.default, { label: phoneNumber })
      ),
      _react2.default.createElement(_translationNode2.default, {
        label: "CORE_EMPLOYEE_OTP_CHECK_MESSAGE",
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        fontSize: "12px"
      }),
      _react2.default.createElement(
        "form",
        null,
        _react2.default.createElement(_components.TextField, (0, _extends3.default)({
          errorStyle: { bottom: "0px" },
          onChange: function onChange(e, value) {
            return handleFieldChange("otpReference", value);
          },
          id: "otp"
        }, fields.otpReference, {
          fullWidth: true,
          type: "number"
        })),
        _react2.default.createElement(
          "div",
          {
            style: { marginBottom: 0 },
            className: "text-right employee-resend-otp-text"
          },
          _react2.default.createElement(_translationNode2.default, {
            id: "otp-trigger",
            className: "otp-prompt",
            label: "CORE_OTP_NOT_RECEIVE"
          }),
          _react2.default.createElement(
            "span",
            { style: { cursor: "pointer" }, onClick: function onClick() {
                return resendOTP();
              } },
            _react2.default.createElement(_translationNode2.default, {
              id: "otp-resend",
              className: "otp-resend",
              label: "CORE_OTP_RESEND"
            })
          )
        ),
        _react2.default.createElement(_components.TextField, (0, _extends3.default)({
          onChange: function onChange(e, value) {
            return handleFieldChange("newPassword", value);
          }
        }, fields.newPassword)),
        _react2.default.createElement(_components.TextField, (0, _extends3.default)({
          style: { marginBottom: 24 },
          onChange: function onChange(e, value) {
            return handleFieldChange("confirmnewpassword", value);
          }
        }, fields.confirmnewpassword)),
        _react2.default.createElement(_components.Button, (0, _extends3.default)({}, submit, {
          onClick: function onClick(e) {
            if (newPassword.value !== confirmnewpassword.value) {
              e.preventDefault();
              toggleSnackbarAndSetText(true, {
                labelName: "Password do not match",
                labelKey: "ERR_PASSWORD_DO_NOT_MATCH"
              }, "error");
            }
          },
          fullWidth: true,
          primary: true
        }))
      )
    )
  });
};

exports.default = OTPForm;