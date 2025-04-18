"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("egov-ui-kit/components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchPropertyForm = function SearchPropertyForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      formKey = _ref.formKey,
      onSearchClick = _ref.onSearchClick,
      onResetClick = _ref.onResetClick;

  var fields = form.fields || {};

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    _react2.default.createElement(_components.Card, {
      textChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "search-form-header" },
          _react2.default.createElement(_translationNode2.default, {
            label: "PT_SEARCH_PROPERTY",
            dark: true,
            fontSize: 18,
            fontWeight: 1200,
            bold: true
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "PT_SEARCHPROPERTY_SEARCH_CONDITION",
            dark: false,
            fontSize: 14,
            bold: false
          })
        ),
        _react2.default.createElement(
          "div",
          { className: formKey + " col-sm-12" },
          Object.keys(fields).map(function (fieldKey, index) {
            return _react2.default.createElement(
              "div",
              {
                style: fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {},
                key: index,
                className: fields[fieldKey].numcols ? "col-sm-" + fields[fieldKey].numcols : "col-sm-6"
              },
              _react2.default.createElement(_field2.default, { fieldKey: fieldKey, field: fields[fieldKey], handleFieldChange: handleFieldChange })
            );
          }),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12" },
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 reset-property-btn" },
              _react2.default.createElement(_components.Button, {
                label: _react2.default.createElement(_translationNode2.default, {
                  label: "PT_RESET_BUTTON",
                  buttonLabel: true,
                  fontSize: "16px",
                  color: "rgb(72, 72, 72)"
                }),
                className: "",
                onClick: function onClick() {
                  return onResetClick();
                },
                primary: false,
                backgroundColor: "white",
                fullWidth: true,
                style: {
                  backgroundColor: "white"

                }
              })
            ),
            _react2.default.createElement(
              "div",
              { className: " col-sm-6  search-property-btn" },
              _react2.default.createElement(_components.Button, {
                label: _react2.default.createElement(_translationNode2.default, {
                  label: "PT_SEARCH_BUTTON",
                  buttonLabel: true,
                  fontSize: "16px"
                }),
                className: "",
                onClick: function onClick() {
                  return onSearchClick(form, formKey);
                },
                primary: false,
                backgroundColor: "grey",
                labelStyle: { color: "white" },
                fullWidth: true,
                style: {
                  color: "white",
                  backgroundColor: "rgb(105, 105, 105)"
                }
              })
            )
          )
        )
      )
    })
  );
};

exports.default = SearchPropertyForm;