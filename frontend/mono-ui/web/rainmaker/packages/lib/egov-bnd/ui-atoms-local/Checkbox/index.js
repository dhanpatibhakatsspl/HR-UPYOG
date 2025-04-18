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

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _reactRedux = require("react-redux");

require("./index.css");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  checked: {}
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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CheckboxLabels.__proto__ || Object.getPrototypeOf(CheckboxLabels)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      checkedG: false
    }, _this.handleChange = function (name) {
      return function (event) {
        _this.setState((0, _defineProperty3.default)({}, name, event.target.checked));
        var _this$props = _this.props,
            jsonPath = _this$props.jsonPath,
            prepareFinalObject = _this$props.prepareFinalObject,
            callBack = _this$props.callBack;


        prepareFinalObject(jsonPath, !_this.state.checkedG);
        callBack && callBack(_store2.default.getState(), _store2.default.dispatch);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CheckboxLabels, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // You don't have to do this check first, but it can help prevent an unneeded render
      if (nextProps.checked !== this.state.checkedG) {
        this.setState({ checkedG: nextProps.checked });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          label = _props.label;

      return _react2.default.createElement(
        "div",
        { style: { display: "table" }, className: "bnd-checkbox" },
        _react2.default.createElement(
          _FormGroup2.default,
          { row: true },
          _react2.default.createElement(_FormControlLabel2.default, {
            classes: { label: "checkbox-label" },
            control: _react2.default.createElement(_Checkbox2.default, {
              checked: this.state.checkedG,
              onChange: this.handleChange("checkedG"),
              value: "checkedG",
              classes: {
                root: classes.root,
                checked: classes.checked
              }
            })
          }),
          _react2.default.createElement(
            "span",
            { style: { paddingTop: "15px", marginLeft: "-15px" } },
            _react2.default.createElement(_LabelContainer2.default, {
              labelName: label.labelValue,
              labelKey: label.labelKey
            })
          )
        )
      );
    }
  }]);
  return CheckboxLabels;
}(_react2.default.Component);

CheckboxLabels.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var jsonPath = ownprops.jsonPath,
      value = ownprops.value,
      sourceJsonPath = ownprops.sourceJsonPath,
      labelsFromLocalisation = ownprops.labelsFromLocalisation,
      data = ownprops.data,
      localePrefix = ownprops.localePrefix;

  var checked = (0, _lodash.get)(state.screenConfiguration.preparedFinalObject, jsonPath, false);
  return { checked: checked };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CheckboxLabels));

//export default withStyles(styles)(CheckboxLabels);