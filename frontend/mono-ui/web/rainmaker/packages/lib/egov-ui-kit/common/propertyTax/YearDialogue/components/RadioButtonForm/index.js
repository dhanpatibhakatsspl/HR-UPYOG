"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelContainerStyle = {
  marginTop: window.screen.width > 768 ? "-2px" : "3px"
};

var RadioButtonForm = function RadioButtonForm(_ref) {
  var label = _ref.label,
      form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      selectedYear = _ref.selectedYear,
      handleRadioButton = _ref.handleRadioButton,
      history = _ref.history,
      urlToAppend = _ref.urlToAppend;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "property-amount-radio" },
    _react2.default.createElement(
      "div",
      { className: "amt-radio", style: { padding: '5px' } },
      _react2.default.createElement("input", {
        type: "radio",
        onClick: handleRadioButton,
        checked: selectedYear === label,
        value: label,
        name: "radio"
      }),
      _react2.default.createElement(_translationNode2.default, {
        label: label,
        fontSize: "18px",
        color: "#484848",
        containerStyle: labelContainerStyle
      })
    )
  );
};

exports.default = RadioButtonForm;