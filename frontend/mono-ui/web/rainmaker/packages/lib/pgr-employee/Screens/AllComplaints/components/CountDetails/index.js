"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  box: {}

};

var CountDetails = function CountDetails(_ref) {
  var count = _ref.count,
      total = _ref.total,
      status = _ref.status;

  return _react2.default.createElement(
    "div",
    { className: "box" },
    _react2.default.createElement(
      "div",
      { className: "count-details" },
      "Showing ",
      count,
      " of ",
      total,
      " ",
      status,
      " complaints"
    )
  );
};

exports.default = CountDetails;