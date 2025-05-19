"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _reactRouterDom = require("react-router-dom");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = { marginLeft: 10, marginTop: 2, cursor: "pointer", marginRight: 10 };

var BreadCrumbs = function BreadCrumbs(_ref) {
  var url = _ref.url,
      history = _ref.history,
      label = _ref.label;

  return _react2.default.createElement(
    "div",
    { className: "rainmaker-displayInline", style: { paddingLeft: 15 } },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "home" },
      _react2.default.createElement(_Icon2.default, { action: "action", name: "home", color: "#fe7a51" })
    ),
    _react2.default.createElement(
      "div",
      { className: "rainmaker-displayInline" },
      _react2.default.createElement(
        "div",
        { style: style },
        " \u276F "
      ),
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, { labelClassName: "breadcrum-label-style", label: label ? label : "" })
      )
    )
  );
};

exports.default = BreadCrumbs;