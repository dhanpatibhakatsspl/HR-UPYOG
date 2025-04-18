"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelText = function labelText(label, labelStyle, labelClassName, required, secondaryText, isConcat, dynamicValue, dynamicArray, indexNumber) {
  //   return isConcat ? (
  //     label && dynamicValue ? (
  //       <div data-localization={`${label}${dynamicValue}`} className="rainmaker-displayInline">
  //         <span style={labelStyle}>{label}</span>
  //         <span style={labelStyle}>{dynamicValue}</span>
  //       </div>
  //     ) : (
  //       ""
  //     )
  //   ) : label && label.length ? (
  //     <div data-localization={label} className={`label-text ${labelClassName}`} style={labelStyle}>
  //       {label} {secondaryText}
  //       {required && <span style={{ color: "red" }}> *</span>}
  //     </div>
  //   ) : (
  //     ""
  //   );
  // };

  if (label && label.length) {
    if (dynamicArray) {
      if (label) {
        var displayLabel = label;
        if (dynamicArray.length > 1) {
          dynamicArray.forEach(function (item, index) {
            displayLabel = displayLabel.replace(new RegExp("\\{" + index + "\\}", "gm"), item);
          });
        } else {
          var index = 0;
          displayLabel = displayLabel.replace(new RegExp("\\{" + index + "\\}", "gm"), dynamicArray[0]);
        }

        return _react2.default.createElement(
          "div",
          { "data-localization": displayLabel, className: "label-text " + labelClassName, style: labelStyle },
          _react2.default.createElement(
            "span",
            { style: labelStyle },
            displayLabel
          )
        );
      }
    } else {
      return _react2.default.createElement(
        "div",
        { "data-localization": label, className: "label-text " + labelClassName, style: labelStyle },
        indexNumber && _react2.default.createElement(
          "span",
          null,
          indexNumber,
          "."
        ),
        " ",
        label,
        " ",
        secondaryText,
        required && _react2.default.createElement(
          "span",
          { style: { color: "red" } },
          " *"
        )
      );
    }
  } else {
    return "";
  }
};

var Label = function Label(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      label = _ref.label,
      color = _ref.color,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? 14 : _ref$fontSize,
      _ref$dark = _ref.dark,
      dark = _ref$dark === undefined ? false : _ref$dark,
      _ref$upperCase = _ref.upperCase,
      upperCase = _ref$upperCase === undefined ? false : _ref$upperCase,
      _ref$bold = _ref.bold,
      bold = _ref$bold === undefined ? false : _ref$bold,
      _ref$containerStyle = _ref.containerStyle,
      containerStyle = _ref$containerStyle === undefined ? {} : _ref$containerStyle,
      _ref$labelStyle = _ref.labelStyle,
      labelStyle = _ref$labelStyle === undefined ? {} : _ref$labelStyle,
      _ref$labelClassName = _ref.labelClassName,
      labelClassName = _ref$labelClassName === undefined ? "" : _ref$labelClassName,
      _ref$buttonLabel = _ref.buttonLabel,
      buttonLabel = _ref$buttonLabel === undefined ? false : _ref$buttonLabel,
      id = _ref.id,
      required = _ref.required,
      dynamicValue = _ref.dynamicValue,
      dynamicArray = _ref.dynamicArray,
      isConcat = _ref.isConcat,
      indexNumber = _ref.indexNumber,
      _ref$secondaryText = _ref.secondaryText,
      secondaryText = _ref$secondaryText === undefined ? "" : _ref$secondaryText;

  var additionalStyles = {};

  if (color) {
    additionalStyles.color = color;
  }
  if (!color && buttonLabel) {
    additionalStyles.color = "#ffffff";
  }
  if (dark) {
    additionalStyles.color = "#484848";
  }
  if (bold) {
    additionalStyles.fontWeight = 500;
  }
  if (fontSize) {
    additionalStyles.fontSize = fontSize;
  }
  if (upperCase) {
    additionalStyles.textTransform = "uppercase";
  }

  if (Object.keys(labelStyle).length || Object.keys(additionalStyles).length) {
    labelStyle = Object.assign({}, labelStyle, additionalStyles);
  }

  return _react2.default.createElement(
    "div",
    { id: id, style: containerStyle, className: buttonLabel ? "button-label-container " + className : "label-container " + className },
    labelText(label, labelStyle, labelClassName, required, secondaryText, isConcat, dynamicValue, dynamicArray, indexNumber)
  );
};

Label.propTypes = {
  label: _propTypes2.default.string,
  color: _propTypes2.default.string,
  bold: _propTypes2.default.bool,
  upperCase: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  containerStyle: _propTypes2.default.object,
  labelStyle: _propTypes2.default.object,
  labelClassName: _propTypes2.default.string,
  indexNumber: _propTypes2.default.number
};

exports.default = Label;