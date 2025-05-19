"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  labelStyle: {
    color: "#484848",
    letterSpacing: 0.7,
    marginLeft: 8
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px"
  },
  selectedLabelStyle: {
    color: "#fe7a51"
  },
  radioButtonLabelStyle: {
    lineHeight: 1,
    marginTop: "3px"
  }
};
// import TextField from "material-ui/TextField";

var inputBaseStyle = {
  paddingBottom: 10,
  fontSize: "16px",
  color: "#484848",
  letterSpacing: "0.7px"
};
var floatingLabelBaseStyle = {
  top: 30,
  fontSize: "14px",
  letterSpacing: "0.6px"
};
var AdditionalDetails = function AdditionalDetails(_ref) {
  var optionSelected = _ref.optionSelected,
      handleFieldChange = _ref.handleFieldChange,
      onRadioButtonChange = _ref.onRadioButtonChange,
      value = _ref.value,
      errorText = _ref.errorText;

  return _react2.default.createElement(_components.Card, {
    style: {
      backgroundColor: "rgb(242, 242, 242)" },
    className: "tax-calculation-card-header",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        {
          className: "rainmaker-displayInline",
          style: { marginTop: 10, alignItems: "center" }
        },
        _react2.default.createElement(_translationNode2.default, {
          label: "PT_PAY_AMOUNT_TO_BE_PAID",
          fontSize: 16,
          bold: true,
          labelStyle: styles.labelStyle
        })
      ),
      _react2.default.createElement(
        "div",
        { className: "clearfix" },
        _react2.default.createElement(
          "div",
          {
            className: "col-sm-6",
            style: { paddingTop: 25, paddingLeft: 8 }
          },
          _react2.default.createElement(
            "div",
            { className: "property-amount-radio" },
            _react2.default.createElement(
              "div",
              { className: "amt-radio" },
              _react2.default.createElement("input", {
                style: { marginRight: "4px 8px 0px 0px" },
                type: "radio",
                checked: optionSelected === "Full_Amount",
                onClick: onRadioButtonChange,
                value: "Full_Amount",
                name: "radio"
              }),
              _react2.default.createElement(_translationNode2.default, {
                label: "PT_FULL_AMOUNT",
                color: "#4848484",
                labelStyle: styles.radioButtonLabelStyle
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "amt-radio" },
              _react2.default.createElement("input", {
                style: { marginRight: "4px 8px 0px 0px" },
                type: "radio",
                checked: optionSelected === "Partial_Amount",
                onClick: onRadioButtonChange,
                value: "Partial_Amount",
                name: "radio"
              }),
              _react2.default.createElement(_translationNode2.default, {
                label: "PT_PARTIAL_AMOUNT",
                color: "#4848484",
                labelStyle: styles.radioButtonLabelStyle
              })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "col-sm-6 amtToPay" },
          _react2.default.createElement(_components.TextField, {
            id: "amount-to-be-paid",
            onChange: function onChange(e, value) {
              return handleFieldChange(e, value);
            },
            value: value,
            floatingLabelText: _react2.default.createElement(_translationNode2.default, {
              label: "PT_AMOUNT_TO_PAY_INR",
              color: "rgba(0,0,0,0.60)"
            }),
            floatingLabelShrinkStyle: {
              fontSize: "12px",
              transform: "scale(1) translate(0px, -16px)",
              fontWeight: 500,
              zIndex: 0
            },
            floatingLabelFixed: true,
            inputStyle: inputBaseStyle,
            floatingLabelStyle: floatingLabelBaseStyle,
            underlineFocusStyle: { borderColor: "#e0e0e0" },
            disabled: optionSelected === "Full_Amount",
            required: true,
            errorText: errorText,
            underlineDisabledStyle: { borderBottom: "1px solid #e0e0e0" }
          })
        )
      ),
      optionSelected && optionSelected === "Partial_Amount" && _react2.default.createElement(
        "div",
        {
          className: "rainmaker-displayInline",
          style: {
            padding: "12px 0px 12px 12px",
            backgroundColor: "#f2f2f2",
            marginTop: 10,
            border: "1px solid #5aaafa",
            borderLeft: "5px solid #5aaafa"
          }
        },
        _react2.default.createElement(_components.Icon, { action: "action", name: "info", color: "#30588c" }),
        _react2.default.createElement(_translationNode2.default, {
          containerStyle: { marginLeft: 16 },
          fontSize: "14px",
          color: "#484848",
          label: "PT_PAYMENTAMOUNT_PARTIALPAY_NOREBATE"
        })
      )
    )
  });
};

exports.default = AdditionalDetails;