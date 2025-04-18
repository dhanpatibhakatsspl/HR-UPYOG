"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _uiContainers = require("egov-ui-framework/ui-containers");

require("./index.scss");

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

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
      checkedG: true
    }, _this.handleChange = function (name) {
      return function (event) {
        // this.setState({ [name]: event.target.checked });
        var _this$props = _this.props,
            jsonPath = _this$props.jsonPath,
            prepareFinalObject = _this$props.prepareFinalObject,
            preparedFinalObject = _this$props.preparedFinalObject;

        var checkedG = (0, _get2.default)(preparedFinalObject, jsonPath, false);
        prepareFinalObject(jsonPath, !checkedG);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CheckboxLabels, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          content = _props.content,
          jsonPath = _props.jsonPath,
          preparedFinalObject = _props.preparedFinalObject;

      var checkedG = (0, _get2.default)(preparedFinalObject, jsonPath, false);
      return _react2.default.createElement(
        _FormGroup2.default,
        { row: true },
        _react2.default.createElement(_FormControlLabel2.default, {
          classes: { label: "checkbox-label" },
          control: _react2.default.createElement(_Checkbox2.default, {
            checked: checkedG,
            onChange: this.handleChange("checkedG"),
            value: "checkedG",
            classes: {
              root: classes.root,
              checked: classes.checked
            }
          }),
          label: _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: content,
            labelKey: content
          })
        })
      );
    }
  }]);
  return CheckboxLabels;
}(_react2.default.Component);

CheckboxLabels.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var preparedFinalObject = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject', {});
  return { preparedFinalObject: (0, _extends3.default)({}, preparedFinalObject) };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};
exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _styles.withStyles)(styles)(CheckboxLabels)));