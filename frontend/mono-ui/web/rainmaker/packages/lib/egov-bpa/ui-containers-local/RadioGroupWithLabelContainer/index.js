"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _styles = require("@material-ui/core/styles");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _reactRedux = require("react-redux");

var _Radio = require("@material-ui/core/Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _RadioGroup = require("@material-ui/core/RadioGroup");

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormLabel = require("@material-ui/core/FormLabel");

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex"
    },
    formControl: {
      marginTop: 0,
      paddingBottom: 0
    },
    group: {
      display: "inline-block",
      margin: 0
    },
    radioRoot: {
      marginBottom: 12
    },
    formLabel: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.56,
      color: "rgba(0,0,0,0.87)"
    }
  };
};

var disableRadioButton = {
  pointerEvents: "none",
  opacity: 0.5
};

var RadioButtonsGroupWithLabel = function (_React$Component) {
  (0, _inherits3.default)(RadioButtonsGroupWithLabel, _React$Component);

  function RadioButtonsGroupWithLabel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RadioButtonsGroupWithLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioButtonsGroupWithLabel.__proto__ || Object.getPrototypeOf(RadioButtonsGroupWithLabel)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
      var _this$props = _this.props,
          screenKey = _this$props.screenKey,
          componentJsonpath = _this$props.componentJsonpath,
          jsonPath = _this$props.jsonPath,
          approveCheck = _this$props.approveCheck,
          onFieldChange = _this$props.onFieldChange,
          onChange = _this$props.onChange,
          ValueToHide = _this$props.ValueToHide,
          componentPathToHide = _this$props.componentPathToHide;


      onChange ? onChange(event) : onFieldChange(screenKey, componentJsonpath, "props.value", event.target.value);
      if (event.target.value == ValueToHide) {
        componentPathToHide.map(function (item) {
          onFieldChange(screenKey, item, "visible", false);
        });
      } else {
        componentPathToHide.map(function (item) {
          onFieldChange(screenKey, item, "visible", true);
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RadioButtonsGroupWithLabel, [{
    key: "render",
    value: function render() {
      //  const { classes, buttons, fieldValue } = this.props;
      var _props = this.props,
          label = _props.label,
          classes = _props.classes,
          buttons = _props.buttons,
          defaultValue = _props.defaultValue,
          value = _props.value,
          fieldValue = _props.fieldValue,
          required = _props.required;


      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _FormControl2.default,
          {
            component: "fieldset",
            className: classes.formControl,
            required: required
          },
          _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }
            },
            _react2.default.createElement(
              "div",
              { style: { marginTop: "-16px", marginRight: "16px" } },
              _react2.default.createElement(
                _FormLabel2.default,
                { className: classes.formLabel },
                label && label.key && _react2.default.createElement(_LabelContainer2.default, {
                  className: classes.formLabel,
                  labelName: label.name,
                  labelKey: label.key
                })
              )
            ),
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                _RadioGroup2.default,
                {
                  "aria-label": "Gender",
                  name: "gender1",
                  className: classes.group
                  // value={this.state.value || fieldValue}
                  , value: value || fieldValue || defaultValue,
                  onChange: this.handleChange
                },
                buttons && buttons.map(function (button, index) {
                  return _react2.default.createElement(_FormControlLabel2.default, {
                    disabled: button.disabled ? true : false,
                    key: index,
                    classes: { label: "radio-button-label" },
                    value: button.value,
                    control:
                    // <Radio
                    //   classes={{
                    //     root: "radio-root"
                    //   }}
                    //   color="primary"
                    // />
                    _react2.default.createElement(_Radio2.default, {
                      className: classes.radioRoot,
                      color: "primary"
                    })
                    // label={button.label}
                    , label: _react2.default.createElement(_LabelContainer2.default, {
                      labelName: button.labelName,
                      labelKey: button.labelKey
                    })
                  });
                })
              )
            )
          )
        )
      );
    }
  }]);
  return RadioButtonsGroupWithLabel;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var fieldValue = "";
  var screenConfiguration = state.screenConfiguration;
  var jsonPath = ownprops.jsonPath;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  if (jsonPath) fieldValue = (0, _get2.default)(preparedFinalObject, jsonPath);
  return { preparedFinalObject: preparedFinalObject, jsonPath: jsonPath, fieldValue: fieldValue };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    approveCheck: function approveCheck(jsonPath, value) {
      dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

RadioButtonsGroupWithLabel.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RadioButtonsGroupWithLabel));