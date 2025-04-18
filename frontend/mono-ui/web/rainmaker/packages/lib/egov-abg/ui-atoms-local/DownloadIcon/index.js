"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownloadIcon = function DownloadIcon(props) {
    var fill = props.fill;

    return _react2.default.createElement(
        "svg",
        {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: fill },
        _react2.default.createElement("path", { d: "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" })
    );
};

exports.default = DownloadIcon;