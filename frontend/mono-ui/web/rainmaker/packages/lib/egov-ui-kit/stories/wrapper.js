"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Card = require("material-ui/Card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = function Wrapper(_ref) {
  var imports = _ref.imports,
      component = _ref.component,
      code = _ref.code,
      children = _ref.children;
  return _react2.default.createElement(
    _Card.Card,
    null,
    _react2.default.createElement(_Card.CardHeader, { title: component, subtitle: "code", actAsExpander: true, showExpandableButton: true }),
    _react2.default.createElement(
      _Card.CardActions,
      null,
      children
    ),
    _react2.default.createElement(
      _Card.CardText,
      { expandable: true },
      _react2.default.createElement(
        _Card.Card,
        null,
        _react2.default.createElement(_Card.CardHeader, { title: "Code" }),
        _react2.default.createElement(
          _Card.CardText,
          null,
          _react2.default.createElement(
            "code",
            null,
            _react2.default.createElement(
              "div",
              null,
              "import React from \"react\";"
            ),
            imports.map(function (item, index) {
              return _react2.default.createElement(
                "div",
                null,
                item,
                _react2.default.createElement("br", null)
              );
            }),
            _react2.default.createElement("br", null),
            _react2.default.createElement(
              "div",
              null,
              "const " + component + "Demo=()=>(",
              _react2.default.createElement("br", null),
              code,
              _react2.default.createElement("br", null),
              ")",
              _react2.default.createElement("br", null),
              "export default " + component + "Demo;"
            )
          )
        )
      )
    )
  );
};

exports.default = Wrapper;