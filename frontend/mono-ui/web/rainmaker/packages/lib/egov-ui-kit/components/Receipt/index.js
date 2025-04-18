"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Receipt = function Receipt(_ref) {
  var receiptItems = _ref.receiptItems,
      header = _ref.header;

  return receiptItems && _react2.default.createElement(
    "div",
    { className: "clearfix", style: { height: "inherit", marginTop: "10px", marginBottom: "15px" } },
    header && _react2.default.createElement(_translationNode2.default, { label: header, dark: true, bold: true, containerStyle: { margin: "5px 0 10px 0" } }),
    _react2.default.createElement(
      "div",
      { className: "col-xs-12 col-sm-12", style: { padding: "0px" } },
      receiptItems.map(function (item, index) {
        return _react2.default.createElement(
          "div",
          { key: index, className: "col-sm-3 col-xs-12", style: { marginBottom: 10 } },
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-xs-12", style: { padding: 0 } },
            _react2.default.createElement(_translationNode2.default, {
              labelStyle: { letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "1.375em" },
              label: item.key,
              fontSize: "12px"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-xs-12", style: { padding: "5px 0px 0px 0px" } },
            _react2.default.createElement(_translationNode2.default, {
              labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
              label: item.value,
              fontSize: "16px"
            })
          )
        );
      })
    )
  );
};
exports.default = Receipt;