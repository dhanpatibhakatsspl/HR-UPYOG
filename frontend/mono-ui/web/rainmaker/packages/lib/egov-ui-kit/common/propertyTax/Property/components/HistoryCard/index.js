"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _components2 = require("egov-ui-kit/components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};
var labelStyle = {
  letterSpacing: 1.2,
  fontWeight: "600",
  lineHeight: "40px"
};
var buttonStyle = {
  float: 'right',
  lineHeight: "35px",
  height: "35px",
  backgroundColor: "rgb(242, 242, 242)",
  boxShadow: "none",
  border: "1px solid rgb(254, 122, 81)",
  borderRadius: "2px",
  outline: "none",
  alignItems: "right"
};
var HistoryCard = function HistoryCard(_ref) {
  var header = _ref.header,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? 'rgb(242, 242, 242)' : _ref$backgroundColor,
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      onHeaderClick = _ref.onHeaderClick,
      errorMessage = _ref.errorMessage;


  return _react2.default.createElement(
    "div",
    null,
    items && _react2.default.createElement(_components.Card, { style: { backgroundColor: backgroundColor, boxShadow: 'none' },
      textChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "pt-rf-title rainmaker-displayInline", onClick: function onClick() {
              return onHeaderClick();
            }, style: { justifyContent: "space-between", margin: '5px 0px 5px 0px', cursor: 'pointer' } },
          _react2.default.createElement(
            "div",
            { className: "rainmaker-displayInline", style: { alignItems: "center", marginLeft: '13px' } },
            header && _react2.default.createElement(_translationNode2.default, {
              labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
              label: header,
              fontSize: "18px"
            })
          ),
          _react2.default.createElement(
            "span",
            { style: { alignItems: "right", cursor: 'pointer' } },
            " ",
            _react2.default.createElement(
              "div",
              { style: IconStyle },
              _react2.default.createElement(_components2.Icon, { action: "hardware", name: "keyboard-arrow-down", color: "#484848", onClick: function onClick() {
                  return onHeaderClick();
                } })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "rainmaker-displayInline", style: { alignItems: "center", marginLeft: '13px' } },
            errorMessage && _react2.default.createElement(_translationNode2.default, {
              labelStyle: { letterSpacing: "0.67px", color: "red", fontWeight: "400", lineHeight: "19px" },
              label: errorMessage,
              fontSize: "16px"
            })
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          items
        )
      )
    })
  );
};

exports.default = HistoryCard;