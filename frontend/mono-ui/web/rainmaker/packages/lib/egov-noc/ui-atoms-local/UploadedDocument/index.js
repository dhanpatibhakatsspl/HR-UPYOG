"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LightTooltip = (0, _styles.withStyles)(function (theme) {
  return {
    tooltip: {
      fontSize: 13
    }
  };
})(_Tooltip2.default);

var UploadedDocument = function UploadedDocument(props) {
  var document = props.document,
      removeDocument = props.removeDocument,
      disabled = props.disabled;

  return _react2.default.createElement(
    LightTooltip,
    { title: document.fileName, arrow: true },
    _react2.default.createElement(
      _Button2.default,
      {
        variant: "outlined",
        style: {
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(5, 5, 5, 0.11999999731779099)",
          minWidth: 300,
          justifyContent: "space-between"
        }
      },
      _react2.default.createElement(
        "div",
        { style: { width: 100, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } },
        document.fileName
      ),
      !disabled && _react2.default.createElement(
        _Icon2.default,
        {
          style: { color: "#E54D42", marginLeft: "16px" },
          onClick: removeDocument
        },
        _react2.default.createElement(
          "i",
          { "class": "material-icons" },
          "highlight_off"
        )
      )
    )
  );
};

exports.default = UploadedDocument;