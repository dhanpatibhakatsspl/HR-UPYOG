"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalDuesButton = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
  letterSpacing: 1.2,
  fontWeight: "600",
  lineHeight: "40px"
};
var buttonStyle = {
  float: 'right',
  backgroundColor: "rgb(242, 242, 242)",
  boxShadow: "none",
  border: "1px solid rgb(254, 122, 81)",
  borderRadius: "2px",
  outline: "none",
  alignItems: "right"
};

var TotalDuesButton = exports.TotalDuesButton = function TotalDuesButton(_ref) {
  var labelText = _ref.labelText,
      onClickAction = _ref.onClickAction,
      primary = _ref.primary;

  return _react2.default.createElement(_components.Button, {
    onClick: function onClick() {
      onClickAction();
    },
    label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: labelText, color: primary ? 'rgb(255, 255, 255)' : 'rgb(254, 122, 81)', fontSize: "16px", labelStyle: labelStyle }),
    primary: primary ? primary : false,
    buttonStyle: primary ? {} : buttonStyle,
    style: { lineHeight: "auto", minWidth: "inherit" }
  });
};