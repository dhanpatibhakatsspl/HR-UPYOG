"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalculationDetails = function CalculationDetails(_ref) {
  var open = _ref.open,
      closeDialogue = _ref.closeDialogue,
      data = _ref.data;

  return _react2.default.createElement(_components.Dialog, {
    open: open,
    children: [_react2.default.createElement(
      "div",
      { style: { margin: 16 } },
      _react2.default.createElement(_translationNode2.default, { label: "PT_CALCULATION_DETAILS", color: "#484848", fontSize: "20px" }),
      _react2.default.createElement(
        "div",
        { style: { margin: "20px 0px" } },
        _react2.default.createElement(_translationNode2.default, { dark: true, label: "PT_CALCULATION_LOGIC", containerStyle: { marginBottom: 5 } }),
        _react2.default.createElement(_translationNode2.default, { label: "PT_CALCULATION_LOGIC_TEXT" })
      ),
      _react2.default.createElement(
        "div",
        { className: "clearfix" },
        _react2.default.createElement(_translationNode2.default, { containerStyle: { marginBottom: 5 }, dark: true, label: "PT_CHARGE_SLABS" }),
        data.map(function (item) {
          return _react2.default.createElement(
            "div",
            { className: "col-xs-10 padding-0", style: { marginBottom: 5 } },
            _react2.default.createElement(
              "div",
              { className: "col-xs-6 padding-0" },
              _react2.default.createElement(_translationNode2.default, { label: item.label })
            ),
            _react2.default.createElement(
              "div",
              { className: "col-xs-6 padding-0" },
              _react2.default.createElement(_translationNode2.default, { label: item.value, dark: true })
            )
          );
        })
      ),
      _react2.default.createElement(
        "div",
        { className: "text-right", style: { marginTop: 10 } },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_OK", fontSize: "12px" }),
          primary: true,
          style: {
            height: 40,
            lineHeight: "auto",
            minWidth: "150px"
          },
          onClick: closeDialogue
        })
      )
    )],
    bodyStyle: { backgroundColor: "#ffffff" },
    isClose: true,
    handleClose: closeDialogue,
    onRequestClose: closeDialogue,
    contentStyle: { width: "35%" },
    contentClassName: "claculation-details-content"
  });
};

exports.default = CalculationDetails;