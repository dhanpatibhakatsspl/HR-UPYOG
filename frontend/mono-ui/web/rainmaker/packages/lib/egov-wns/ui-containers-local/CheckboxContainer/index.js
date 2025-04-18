"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _reactRedux = require("react-redux");

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormLabel = require("@material-ui/core/FormLabel");

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

var _toggleFeilds = require("./toggleFeilds");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  formControl: {
    marginTop: 0,
    paddingBottom: 0
  },
  group: {
    display: "inline-block",
    margin: 0
  },
  checked: {},
  radioRoot: {
    marginBottom: 12
  },
  formLabel: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.56
  }
};

var CheckboxLabels = function (_React$Component) {
  (0, _inherits3.default)(CheckboxLabels, _React$Component);

  function CheckboxLabels() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CheckboxLabels);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CheckboxLabels.__proto__ || Object.getPrototypeOf(CheckboxLabels)).call.apply(_ref, [this].concat(args))), _this), _this.state = { checkedSewerage: false, checkedWater: false, interChange: false }, _this.handleWater = function (name) {
      return function (event) {
        var _this$setState;

        var _this$props = _this.props,
            jsonPathWater = _this$props.jsonPathWater,
            approveCheck = _this$props.approveCheck,
            onFieldChange = _this$props.onFieldChange;

        _this.setState((_this$setState = {}, (0, _defineProperty3.default)(_this$setState, name, event.target.checked), (0, _defineProperty3.default)(_this$setState, "interChange", true), _this$setState), function () {
          if (_this.state.checkedWater) {
            (0, _toggleFeilds.toggleWater)(onFieldChange, true);
            if (_this.state.checkedSewerage) {
              (0, _toggleFeilds.toggleSewerage)(onFieldChange, true);
            } else {
              (0, _toggleFeilds.toggleSewerage)(onFieldChange, false);
            }
          } else {
            (0, _toggleFeilds.toggleWater)(onFieldChange, false);
          }
          approveCheck(jsonPathWater, _this.state.checkedWater);
        });
      };
    }, _this.handleSewerage = function (name) {
      return function (event) {
        var _this$setState2;

        var _this$props2 = _this.props,
            jsonPathSewerage = _this$props2.jsonPathSewerage,
            approveCheck = _this$props2.approveCheck,
            onFieldChange = _this$props2.onFieldChange;

        _this.setState((_this$setState2 = {}, (0, _defineProperty3.default)(_this$setState2, name, event.target.checked), (0, _defineProperty3.default)(_this$setState2, "interChange", true), _this$setState2), function () {
          if (_this.state.checkedSewerage) {
            (0, _toggleFeilds.toggleSewerage)(onFieldChange, true);
            if (_this.state.checkedWater) {
              (0, _toggleFeilds.toggleWater)(onFieldChange, true);
            } else {
              (0, _toggleFeilds.toggleWater)(onFieldChange, false);
            }
          } else {
            (0, _toggleFeilds.toggleSewerage)(onFieldChange, false);
          }
          approveCheck(jsonPathSewerage, _this.state.checkedSewerage);
        });
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CheckboxLabels, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var preparedFinalObject = this.props.preparedFinalObject;

      var checkedWater = preparedFinalObject && preparedFinalObject.applyScreen.water ? preparedFinalObject.applyScreen.water : false;
      var checkedSewerage = preparedFinalObject && preparedFinalObject.applyScreen.sewerage ? preparedFinalObject.applyScreen.sewerage : false;
      this.setState({ checkedSewerage: checkedSewerage, checkedWater: checkedWater });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          required = _props.required,
          preparedFinalObject = _props.preparedFinalObject,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled;

      var checkedWater = void 0,
          checkedSewerage = void 0;
      if (this.state.interChange) {
        checkedWater = this.state.checkedWater;
        checkedSewerage = this.state.checkedSewerage;
      } else {
        checkedWater = preparedFinalObject && preparedFinalObject.applyScreen.water ? preparedFinalObject.applyScreen.water : false;
        checkedSewerage = preparedFinalObject && preparedFinalObject.applyScreen.sewerage ? preparedFinalObject.applyScreen.sewerage : false;
      }

      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _FormControl2.default,
          { component: "fieldset", className: classes.formControl, required: required },
          _react2.default.createElement(
            _FormLabel2.default,
            { className: classes.formLabel },
            _react2.default.createElement(_LabelContainer2.default, { className: classes.formLabel, labelKey: "WS_APPLY_FOR" })
          ),
          _react2.default.createElement(
            _FormGroup2.default,
            { row: true },
            _react2.default.createElement(_FormControlLabel2.default, {
              classes: { label: "checkbox-button-label" },
              control: _react2.default.createElement(_Checkbox2.default, {
                checked: checkedWater,
                onChange: this.handleWater("checkedWater"),
                classes: { root: classes.radioRoot, checked: classes.checked },
                color: "primary",
                disabled: disabled
              }),
              label: _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_APPLY_WATER" })
            }),
            _react2.default.createElement(_FormControlLabel2.default, {
              classes: { label: "checkbox-button-label" },
              control: _react2.default.createElement(_Checkbox2.default, {
                checked: checkedSewerage,
                onChange: this.handleSewerage("checkedSewerage"),
                classes: { root: classes.radioRoot, checked: classes.checked },
                color: "primary",
                disabled: disabled
              }),
              label: _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_APPLY_SEWERAGE" })
            })
          )
        )
      );
    }
  }]);
  return CheckboxLabels;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration;
  var jsonPathWater = ownprops.jsonPathWater,
      jsonPathSewerage = ownprops.jsonPathSewerage;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  return { preparedFinalObject: preparedFinalObject, jsonPathWater: jsonPathWater, jsonPathSewerage: jsonPathSewerage };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { approveCheck: function approveCheck(jsonPath, value) {
      dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    } };
};

CheckboxLabels.propTypes = { classes: _propTypes2.default.object.isRequired };

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CheckboxLabels));