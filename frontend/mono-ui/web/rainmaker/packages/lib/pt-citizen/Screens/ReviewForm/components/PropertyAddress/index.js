"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertyAddress = function PropertyAddress(_ref) {
  var form = _ref.form,
      icon = _ref.icon,
      editIcon = _ref.editIcon,
      component = _ref.component;

  return _react2.default.createElement(_components.Card, {
    textChildren: _react2.default.createElement(
      "div",
      { style: { backgroundColor: 'lightgray' } },
      _react2.default.createElement(
        "div",
        { className: "pt-rf-title rainmaker-displayInline", style: { justifyContent: "space-between" } },
        _react2.default.createElement(
          "div",
          { className: "rainmaker-displayInline", style: { alignItems: "center" } },
          _react2.default.createElement(
            "span",
            { className: "pt-rf-icon" },
            icon
          ),
          _react2.default.createElement(_translationNode2.default, { className: "pt-rf-title-text", label: "PT_PROPERTY_ADDRESS_SUB_HEADER" })
        ),
        _react2.default.createElement(
          "span",
          { style: { alignItems: "right" } },
          editIcon
        )
      ),
      component
    )
  });
};

exports.default = PropertyAddress;