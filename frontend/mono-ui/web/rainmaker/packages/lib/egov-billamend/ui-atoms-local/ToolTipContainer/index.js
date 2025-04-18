"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require("@material-ui/core/styles");

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _commons = require("egov-ui-framework/ui-utils/commons");

require("./index.css");

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlTooltip = (0, _styles.withStyles)(function (theme) {
  return {
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      // maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #000000"
    },
    popper: {
      zIndex: 99999999
    }
  };
})(_Tooltip2.default);

var ToolTipContainer = function ToolTipContainer(props) {
  return _react2.default.createElement(
    HtmlTooltip,
    {
      title: _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _Typography2.default,
          { color: "inherit" },
          (0, _commons2.getLocaleLabels)("BILL_" + props.toolTipData[0].code.substr(0, props.toolTipData[0].code.indexOf(".")) + "_TOOLTIP_MESSAGE", "BILL_" + props.toolTipData[0].code.substr(0, props.toolTipData[0].code.indexOf(".")) + "_TOOLTIP_MESSAGE")
        ),
        props.toolTipData.map(function (item, index) {
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "span",
              null,
              index + 1,
              "."
            ),
            "\xA0\xA0",
            (0, _commons2.getLocaleLabels)(item.code, item.code)
          );
        })
      )
    },
    _react2.default.createElement(
      _Icon2.default,
      { className: "toolTipIcon" },
      _react2.default.createElement(
        "i",
        { "class": "material-icons", style: { fontSize: 18 } },
        "info_circle"
      )
    )
  );
};

exports.default = ToolTipContainer;