"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultIconStyle = {
  width: 19,
  height: 20,
  marginRight: 8,
  fill: "#fe7a51"
};

var EditIcon = function EditIcon(_ref) {
  var onIconClick = _ref.onIconClick;

  return _react2.default.createElement(
    "div",
    { className: "rainmaker-displayInline", onClick: onIconClick, style: { cursor: "pointer", marginRight: 5 } },
    _react2.default.createElement(_components.Icon, { style: defaultIconStyle, action: "image", name: "edit" }),
    _react2.default.createElement(_translationNode2.default, { label: "PT_EDIT_TEXT", color: "#fe7a51", fontSize: "16px" })
  );
};

exports.default = EditIcon;