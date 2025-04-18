"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Checkbox = require("material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLabelStyle = {
  fontFamily: "Roboto, sans-serif"
};

var defaultStyle = {
  marginBottom: "21px"
};

var selectedLabelStyle = {
  color: "#00bcd1"
};
var checkBoxWidth = {
  width: "20px",
  display: "inline-block"
};

var SingleCheckboxUi = function SingleCheckboxUi(_ref) {
  var defaultValue = _ref.defaultValue,
      value = _ref.value,
      floatingLabelText = _ref.floatingLabelText,
      labelStyle = _ref.labelStyle,
      onCheck = _ref.onCheck,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      checkedIcon = _ref.checkedIcon,
      iconStyle = _ref.iconStyle,
      containerClassName = _ref.containerClassName,
      id = _ref.id,
      disabled = _ref.disabled,
      _ref$isSeperateLabel = _ref.isSeperateLabel,
      isSeperateLabel = _ref$isSeperateLabel === undefined ? "" : _ref$isSeperateLabel;

  var renderCheckbox = function renderCheckbox() {
    return _react2.default.createElement(
      "div",
      { style: isSeperateLabel ? { display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: "-20px", marginLeft: "-3px" } : {} },
      _react2.default.createElement(_Checkbox2.default, {
        id: id,
        defaultValue: defaultValue,
        label: isSeperateLabel ? "" : floatingLabelText,
        onCheck: onCheck,
        style: isSeperateLabel ? (0, _extends3.default)({}, defaultStyle, style, checkBoxWidth) : (0, _extends3.default)({}, defaultStyle, style),
        iconStyle: iconStyle,
        checked: typeof value === "boolean" ? value : value === "true" ? true : false,
        checkedIcon: checkedIcon,
        labelStyle: (0, _extends3.default)({}, defaultLabelStyle, labelStyle, selectedLabelStyle),
        disabled: disabled
      }),
      isSeperateLabel && _react2.default.createElement(
        "span",
        { style: { marginTop: "10px", marginLeft: "10px" } },
        isSeperateLabel
      )
    );
  };

  return _react2.default.createElement(
    "div",
    { className: containerClassName + " checkbox-container" },
    renderCheckbox()
  );
};

SingleCheckboxUi.propTypes = {
  floatingLabelText: _propTypes2.default.node.isRequired,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]).isRequired,
  defaultValue: _propTypes2.default.string,
  onCheck: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = SingleCheckboxUi;