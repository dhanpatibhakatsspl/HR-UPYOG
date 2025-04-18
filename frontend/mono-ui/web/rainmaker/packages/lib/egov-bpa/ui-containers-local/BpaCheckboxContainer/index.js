"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _styles = require("@material-ui/core/styles");

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _reactRedux = require("react-redux");

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _utils = require("../../ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.scss");

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

var BpaCheckboxContainer = function (_React$Component) {
  (0, _inherits3.default)(BpaCheckboxContainer, _React$Component);

  function BpaCheckboxContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BpaCheckboxContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BpaCheckboxContainer.__proto__ || Object.getPrototypeOf(BpaCheckboxContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fieldValue: true
    }, _this.handleChange = function (name) {
      return function (event) {
        var _this$props = _this.props,
            jsonPath = _this$props.jsonPath,
            approveCheck = _this$props.approveCheck,
            fieldValue = _this$props.fieldValue;

        approveCheck(jsonPath, !fieldValue);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BpaCheckboxContainer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var fieldValue = nextProps.fieldValue,
          jsonPath = nextProps.jsonPath,
          approveCheck = nextProps.approveCheck;

      if (this.props.fieldValue != fieldValue) {
        approveCheck(jsonPath, fieldValue);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$label = _props.label,
          label = _props$label === undefined ? {} : _props$label,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? {} : _props$placeholder,
          jsonPath = _props.jsonPath,
          _props$iconObj = _props.iconObj,
          iconObj = _props$iconObj === undefined ? {} : _props$iconObj,
          value = _props.value,
          dropdownData = _props.dropdownData,
          _props$data = _props.data,
          data = _props$data === undefined ? [] : _props$data,
          _props$optionValue = _props.optionValue,
          optionValue = _props$optionValue === undefined ? "code" : _props$optionValue,
          _props$optionLabel = _props.optionLabel,
          optionLabel = _props$optionLabel === undefined ? "code" : _props$optionLabel,
          sourceJsonPath = _props.sourceJsonPath,
          classes = _props.classes,
          componentJsonpath = _props.componentJsonpath,
          fieldValue = _props.fieldValue,
          localizationLabels = _props.localizationLabels,
          rest = (0, _objectWithoutProperties3.default)(_props, ["label", "placeholder", "jsonPath", "iconObj", "value", "dropdownData", "data", "optionValue", "optionLabel", "sourceJsonPath", "classes", "componentJsonpath", "fieldValue", "localizationLabels"]);


      var translatedLabel = "";
      if (label && label.labelKey && Array.isArray(label.labelKey)) {
        label.labelKey.forEach(function (key) {
          translatedLabel += (0, _commons.getLocaleLabels)(key, key, localizationLabels) + " ";
        });
      } else {
        translatedLabel = (0, _commons.getLocaleLabels)(label.labelName, label.labelKey, localizationLabels);
      }

      return _react2.default.createElement(
        _FormGroup2.default,
        { row: true },
        _react2.default.createElement(_FormControlLabel2.default, {
          classes: { label: "bpacheckbox-label" },
          key: fieldValue,
          control: _react2.default.createElement(_Checkbox2.default, {
            checked: fieldValue,
            onChange: this.handleChange(fieldValue),
            value: fieldValue,
            classes: {
              root: classes.root,
              checked: classes.checked
            }
          }),
          label: translatedLabel
        })
      );
    }
  }]);
  return BpaCheckboxContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var fieldValue = false;
  var screenConfiguration = state.screenConfiguration,
      app = state.app;
  var localizationLabels = app.localizationLabels;
  var jsonPath = ownprops.jsonPath;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  if (jsonPath) fieldValue = (0, _get2.default)(preparedFinalObject, jsonPath);
  return { preparedFinalObject: preparedFinalObject, jsonPath: jsonPath, fieldValue: fieldValue, localizationLabels: localizationLabels };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    approveCheck: function approveCheck(jsonPath, value) {
      dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

BpaCheckboxContainer.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BpaCheckboxContainer));