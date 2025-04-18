"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStayle = {
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: 400,
  letterSpacing: "0.5px",
  lineHeight: "14px",
  textAlign: "left"
};

var returnTransferData = function returnTransferData(value) {
  return Object.keys(value).map(function (key) {
    return _react2.default.createElement(
      "div",
      { className: "flex-child col-sm-3", style: { textAlign: "left" } },
      _react2.default.createElement(_translationNode2.default, { label: key, fontSize: "12px", labelStayle: labelStayle }),
      _react2.default.createElement(_translationNode2.default, { label: value[key], labelClassName: "value", fontSize: "16px" })
    );
  });
};

var TransferDetails = function TransferDetails(_ref) {
  var data = _ref.data;

  return _react2.default.createElement(
    "div",
    { className: "left-line" },
    _.map(data, function (value, index) {
      return _react2.default.createElement(
        "div",
        null,
        index !== 0 && _react2.default.createElement("div", { className: "bottom-line" }),
        _react2.default.createElement(
          "div",
          { className: "flex-container" },
          returnTransferData(value)
        )
      );
    })
  );
};

exports.default = TransferDetails;