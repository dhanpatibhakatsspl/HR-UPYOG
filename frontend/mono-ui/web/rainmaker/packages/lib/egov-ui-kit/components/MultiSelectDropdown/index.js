"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _Select = require("@material-ui/core/Select");

var _Select2 = _interopRequireDefault(_Select);

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _translationNode = require("../../utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _reactRedux = require("react-redux");

var _commons = require("egov-ui-framework/ui-utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floatingLabelStyle = {
  fontSize: "12px",
  color: "rgba(0, 0, 0, 0.6000000238418579)",
  fontWeight: 500,
  transform: "scale(1) translate(0px, -16px)",
  top: 30
};

var requiredStyle = {
  color: "red"
};

var styles = function styles(theme) {
  return {
    icon: {
      right: "-22px"
    }
  };
};

var MultiSelectDropDown = function (_React$Component) {
  (0, _inherits3.default)(MultiSelectDropDown, _React$Component);

  function MultiSelectDropDown() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MultiSelectDropDown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MultiSelectDropDown.__proto__ || Object.getPrototypeOf(MultiSelectDropDown)).call.apply(_ref, [this].concat(args))), _this), _this.renderSelectMenuItems = function (dropDownData, value) {
      var localizationLabels = _this.props.localizationLabels;

      return dropDownData.map(function (option, index) {
        return _react2.default.createElement(
          _MenuItem2.default,
          {
            style: { color: "black!important" },
            className: "menu-class",
            key: option.label,
            value: option.value,
            primaryText: _react2.default.createElement(_translationNode2.default, { label: value })
          },
          _react2.default.createElement(_core.Checkbox, { checked: value.indexOf(option.value) > -1, style: { color: 'rgb(254, 122, 81)' } }),
          _react2.default.createElement(_core.ListItemText, { primary: _react2.default.createElement(_translationNode2.default, { label: option.label, color: "rgba(0,0,0,0.87)" }) })
        );
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultiSelectDropDown, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          menuInnerDivStyle = _props.menuInnerDivStyle,
          errorText = _props.errorText,
          localePrefix = _props.localePrefix,
          _props$errorStyle = _props.errorStyle,
          errorStyle = _props$errorStyle === undefined ? {} : _props$errorStyle,
          value = _props.value,
          _props$fullWidth = _props.fullWidth,
          fullWidth = _props$fullWidth === undefined ? false : _props$fullWidth,
          labelStyle = _props.labelStyle,
          required = _props.required,
          dropDownData = _props.dropDownData,
          children = _props.children,
          selected = _props.selected,
          onChange = _props.onChange,
          menuStyle = _props.menuStyle,
          id = _props.id,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          floatingLabelText = _props.floatingLabelText,
          underlineStyle = _props.underlineStyle,
          hintText = _props.hintText,
          hintStyle = _props.hintStyle,
          jsonPath = _props.jsonPath,
          dataFetchConfig = _props.dataFetchConfig,
          errorMessage = _props.errorMessage,
          prefix = _props.prefix,
          autoWidth = _props.autoWidth,
          updateDependentFields = _props.updateDependentFields,
          beforeFieldChange = _props.beforeFieldChange,
          localizationLabels = _props.localizationLabels,
          classes = _props.classes,
          rest = (0, _objectWithoutProperties3.default)(_props, ["className", "menuInnerDivStyle", "errorText", "localePrefix", "errorStyle", "value", "fullWidth", "labelStyle", "required", "dropDownData", "children", "selected", "onChange", "menuStyle", "id", "style", "floatingLabelText", "underlineStyle", "hintText", "hintStyle", "jsonPath", "dataFetchConfig", "errorMessage", "prefix", "autoWidth", "updateDependentFields", "beforeFieldChange", "localizationLabels", "classes"]);

      return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement(
          "span",
          { style: floatingLabelStyle },
          " ",
          floatingLabelText
        ),
        _react2.default.createElement(
          _Select2.default,
          (0, _extends3.default)({
            multiple: true,
            errorText: errorText,
            errorStyle: errorStyle,
            className: "dropdown " + className,
            id: id,
            style: style,
            menuStyle: menuStyle,
            fullWidth: fullWidth,
            labelStyle: labelStyle,
            onChange: onChange,
            selected: "Select",
            value: value,
            hintText: hintText,
            floatingLabelFixed: true,
            floatingLabelText: [floatingLabelText, required ? _react2.default.createElement(
              "span",
              { key: "error-" + className, style: requiredStyle },
              " ",
              "*"
            ) : null],
            floatingLabelStyle: floatingLabelStyle
          }, rest, {
            input: _react2.default.createElement(_core.Input, { id: "select-multiple-checkbox" }),
            renderValue: function renderValue(selected) {
              return selected.map(function (item) {
                return prefix ? (0, _commons.getLocaleLabels)(item, "" + prefix + item, localizationLabels) : (0, _commons.getLocaleLabels)(item, item, localizationLabels);
              }).join(', ');
            } }),
          dropDownData && this.renderSelectMenuItems(dropDownData, value)
        )
      );
    }
  }]);
  return MultiSelectDropDown;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var localizationLabels = state.app.localizationLabels;

  return { localizationLabels: localizationLabels };
};

MultiSelectDropDown.propTypes = {
  fullWidth: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  selected: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, null)(MultiSelectDropDown));