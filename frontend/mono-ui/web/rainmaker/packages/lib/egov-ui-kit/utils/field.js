"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _components = require("components");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components2 = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  radioButtonStyle: {
    display: 'flex',
    position: 'inherit',
    top: '-5px'
  },
  labelStyle: {
    font: "12px",
    letterSpacing: 0.6,
    marginBottom: 5,
    marginTop: 14
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px"
  },
  selectedLabelStyle: {
    color: 'rgba(0, 0, 0, 0.44)'
  },
  radioButtonLabelStyle: {
    // lineHeight: 1,
    // marginBottom: 8,
  },
  iconStyle: {
    width: 16,
    height: 27
  }
};

var Field = function Field(_ref) {
  var fieldKey = _ref.fieldKey,
      handleFieldChange = _ref.handleFieldChange,
      _ref$field = _ref.field,
      field = _ref$field === undefined ? {} : _ref$field,
      disabled = _ref.disabled,
      onTextFieldIconClick = _ref.onTextFieldIconClick,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["fieldKey", "handleFieldChange", "field", "disabled", "onTextFieldIconClick"]);

  var renderField = function renderField() {
    var type = field.type,
        tooltip = field.tooltip,
        label = field.label,
        hideField = field.hideField,
        Icon = field.Icon,
        iconRedirectionURL = field.iconRedirectionURL,
        visible = field.visible,
        fieldProps = (0, _objectWithoutProperties3.default)(field, ["type", "tooltip", "label", "hideField", "Icon", "iconRedirectionURL", "visible"]);

    if (fieldProps.dropDownData && fieldProps.dropDownData.length > 0) {
      fieldProps.dropDownData.map(function (data, key) {
        fieldProps.dropDownData[key].code = data.value;
        fieldProps.dropDownData[key].name = data.label;
      });
    }
    if (hideField) return null;
    switch (type) {
      case "textfield":
      case "textarea":
        return _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, rest, fieldProps, { onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          }, multiLine: type === "textarea", disabled: disabled || fieldProps.disabled }));
      case "mobilenumber":
        return _react2.default.createElement(_components.MobileNumberField, (0, _extends3.default)({}, rest, fieldProps, { onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          }, disabled: disabled || fieldProps.disabled }));
      case "number":
      case "password":
        return _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, rest, fieldProps, { type: type, onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          }, disabled: disabled || fieldProps.disabled }));
      case "checkbox":
        return _react2.default.createElement(_components.SingleCheckbox, (0, _extends3.default)({}, rest, fieldProps, { style: { marginTop: "27px" }, onCheck: function onCheck(e) {
            return handleFieldChange(fieldKey, e.target.checked);
          }, disabled: disabled || fieldProps.disabled }));
      case "label":
        return _react2.default.createElement(_components.Label, (0, _extends3.default)({}, rest, fieldProps));
      case "singleValueList":
        return _react2.default.createElement(_components.DropDown, (0, _extends3.default)({}, rest, fieldProps, {
          dropDownData: fieldProps.dropDownData || [],
          onChange: function onChange(e, value, selectedValue) {
            return handleFieldChange(fieldKey, selectedValue);
          }
        }));
      case "textFieldIcon":
        return _react2.default.createElement(_components.TextFieldIcon, (0, _extends3.default)({
          iconPosition: "right",
          Icon: Icon
        }, fieldProps, rest, {
          onIconClick: iconRedirectionURL ? function () {
            window.open(iconRedirectionURL);
          } : function () {
            return onTextFieldIconClick();
          },
          onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          }
        }));
      case "autoSuggestDropdown":
        return _react2.default.createElement(_components.AutoSuggestDropdown, (0, _extends3.default)({}, rest, fieldProps, {
          dataSource: fieldProps && fieldProps.dropDownData || [],
          onChange: function onChange(chosenRequest, index) {
            handleFieldChange(fieldKey, chosenRequest.value);
          }
        }));
      case "radioButton":
        return _react2.default.createElement(
          "div",
          null,
          visible !== false ? _react2.default.createElement(_components2.RadioButton, (0, _extends3.default)({}, rest, fieldProps, {
            style: styles.radioButtonStyle,
            options: fieldProps && fieldProps.options || [],
            radioButtonItemStyle: styles.radioButtonItemStyle,
            radioButtonLabelStyle: styles.radioButtonLabelStyle,
            selectedLabelStyle: styles.selectedLabelStyle,
            className: "radio-button-" + fieldProps.id,
            iconStyle: styles.iconStyle,
            labelStyle: styles.radioButtonLabelStyle,
            valueSelected: fieldProps.value,
            handleChange: function handleChange(e, value) {
              handleFieldChange(fieldKey, value);
            }
          })) : ""
        );

      case "AutocompleteDropdown":
        return _react2.default.createElement(_uiContainers.AutosuggestContainer, {
          id: fieldProps.id,
          type: fieldProps.type,
          required: fieldProps.required,
          jsonPath: fieldProps.jsonPath,
          localePrefix: fieldProps.localePrefix,
          data: fieldProps && fieldProps.dropDownData,
          className: "autocomplete-dropdown",
          label: { labelKey: fieldProps.floatingLabelText },
          placeholder: { labelKey: fieldProps.hintText },
          labelsFromLocalisation: fieldProps.labelsFromLocalisation,
          gridDefination: fieldProps.gridDefination,
          toolTip: fieldProps.toolTip,
          toolTipMessage: fieldProps.toolTipMessage,
          boundary: fieldProps.boundary,
          errorMessage: fieldProps.errorMessage,
          errorStyle: fieldProps.errorStyle,
          pattern: fieldProps.pattern,
          value: fieldProps.value,
          defaultSort: fieldProps.defaultSort,
          canFetchValueFromJsonpath: false,
          formName: fieldProps.formName,
          isClearable: true,
          disabled: disabled || fieldProps.disabled,
          onChange: function onChange(chosenRequest, index) {
            handleFieldChange(fieldKey, chosenRequest.target.value, fieldProps.jsonPath);
          }
        });

      default:
        return null;
    }
  };

  return renderField();
};

exports.default = Field;