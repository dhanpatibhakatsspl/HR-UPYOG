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

var _toggleFeilds = require("../CheckboxContainer/toggleFeilds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex",
      marginBottom: 0
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
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 0.56,
      marginTop: 14
    }
  };
};

var disableRadioButton = {
  pointerEvents: "none",
  opacity: 0.5
};

var RadioButtonsGroup = function (_React$Component) {
  (0, _inherits3.default)(RadioButtonsGroup, _React$Component);

  function RadioButtonsGroup() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RadioButtonsGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioButtonsGroup.__proto__ || Object.getPrototypeOf(RadioButtonsGroup)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
      var _this$props = _this.props,
          screenKey = _this$props.screenKey,
          componentJsonpath = _this$props.componentJsonpath,
          onFieldChange = _this$props.onFieldChange,
          onChange = _this$props.onChange;

      onChange ? onChange(event) : onFieldChange(screenKey, componentJsonpath, "props.value", event.target.value);
      if (event.target.value === "Self") {
        (0, _toggleFeilds.togglePlumberFeilds)(onFieldChange, false);
      } else {
        (0, _toggleFeilds.togglePlumberFeilds)(onFieldChange, true);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RadioButtonsGroup, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          required = _props.required,
          preparedFinalObject = _props.preparedFinalObject;
      var applyScreen = preparedFinalObject.applyScreen;
      var additionalDetails = applyScreen.additionalDetails;

      var value = additionalDetails !== undefined && additionalDetails.detailsProvidedBy !== undefined ? additionalDetails.detailsProvidedBy : "";
      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _FormControl2.default,
          {
            component: "fieldset",
            className: classes.formControl,
            required: required },
          _react2.default.createElement(
            _FormLabel2.default,
            { className: classes.formLabel },
            _react2.default.createElement(_LabelContainer2.default, {
              className: classes.formLabel,
              labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
            })
          ),
          _react2.default.createElement(
            _RadioGroup2.default,
            {
              "aria-label": "Gender",
              name: "gender1",
              value: value,
              className: classes.group,
              onChange: this.handleChange },
            _react2.default.createElement(_FormControlLabel2.default, {
              classes: { label: "radio-button-label" },
              value: "ULB",
              control: _react2.default.createElement(_Radio2.default, { className: classes.radioRoot, color: "primary" }),
              label: _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_PLUMBER_ULB" })
            }),
            _react2.default.createElement(_FormControlLabel2.default, {
              value: "Self",
              classes: { label: "radio-button-label" },
              control: _react2.default.createElement(_Radio2.default, { className: classes.radioRoot, color: "primary" }),
              label: _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_PLUMBER_SELF" })
            })
          )
        )
      );
    }
  }]);
  return RadioButtonsGroup;
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

RadioButtonsGroup.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RadioButtonsGroup));