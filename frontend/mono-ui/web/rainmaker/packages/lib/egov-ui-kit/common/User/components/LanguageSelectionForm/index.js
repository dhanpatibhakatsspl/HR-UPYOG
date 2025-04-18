"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _logo_black = require("egov-ui-kit/assets/images/logo_black.png");

var _logo_black2 = _interopRequireDefault(_logo_black);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectedLabelStyle = {
  color: "#ffffff"
};

var selectedStyle = {
  backgroundColor: "#fe7a51",
  border: "1px solid #fe7a51"
};

var defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",
  lineHeight: "44px",
  width: "28.48%",
  padding: "0 16px"
};

var defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0
};

var LanguageSelectionForm = function LanguageSelectionForm(_ref) {
  var items = _ref.items,
      onLanguageSelect = _ref.onLanguageSelect,
      value = _ref.value,
      onClick = _ref.onClick,
      logoUrl = _ref.logoUrl;

  return _react2.default.createElement(_components.Card, {
    className: "col-sm-offset-4 col-sm-4 user-screens-card language-selection-card",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "rainmaker-displayInline", style: { justifyContent: "center", alignItems: "center", marginBottom: "24px" } },
        _react2.default.createElement(
          "div",
          { style: {} },
          _react2.default.createElement(_components.Image, { className: "mseva-logo", source: logoUrl ? logoUrl : _logo_black2.default })
        ),
        _react2.default.createElement(
          "div",
          { style: { marginLeft: "7px" } },
          _react2.default.createElement(_translationNode2.default, { bold: true, fontSize: "23px", label: "|" })
        ),
        _react2.default.createElement(
          "div",
          { style: { marginLeft: "7px" } },
          _react2.default.createElement(_translationNode2.default, { bold: true, color: "black", fontSize: "24px", label: "STATE_LABEL" })
        )
      ),
      _react2.default.createElement(
        "form",
        null,
        _react2.default.createElement(
          "div",
          { className: "rainmaker-displayInline", style: { justifyContent: "center" } },
          items && items.map(function (item, index) {
            return _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_translationNode2.default, { bold: true, label: "LANGUAGE_" + item.value.toUpperCase(), className: "language-label" }),
              index !== items.length - 1 && _react2.default.createElement(
                "span",
                null,
                "|"
              )
            );
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "button-toggle-container" },
          _react2.default.createElement(_components.ButtonGroup, {
            items: items,
            onClick: onClick,
            selected: value,
            defaultStyle: defaultStyle,
            defaultLabelStyle: defaultLabelStyle,
            selectedStyle: selectedStyle,
            selectedLabelStyle: selectedLabelStyle,
            multiple: false
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "button-container" },
          _react2.default.createElement(
            _uiAtoms.Button,
            {
              id: "continue-action",
              className: "lang-continue-button",
              style: {
                height: "48px",
                width: "100%"
              },
              variant: "contained",
              color: "primary",
              onClick: onLanguageSelect
            },
            _react2.default.createElement(_translationNode2.default, { buttonLabel: true, labelStyle: { fontWeight: 500 }, label: "CORE_COMMON_CONTINUE" })
          )
        )
      )
    )
  });
};

exports.default = LanguageSelectionForm;