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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

var _utils = require("../../ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CheckboxLabels.__proto__ || Object.getPrototypeOf(CheckboxLabels)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      checkedG: false
    }, _this.validator = function () {
      var preparedFinalObject = _this.props.preparedFinalObject;

      var city = (0, _get2.default)(preparedFinalObject, "Property.address.city");
      var locality = (0, _get2.default)(preparedFinalObject, "Property.address.locality.code");
      var doorNo = (0, _get2.default)(preparedFinalObject, "Property.address.doorNo");
      var buildingName = (0, _get2.default)(preparedFinalObject, "Property.address.buildingName");
      if (!_.isUndefined(city) && !_.isUndefined(locality) && !_.isUndefined(doorNo) && !_.isUndefined(buildingName)) {
        return true;
      } else {
        return false;
      }
    }, _this.handleChange = function (name) {
      return function (event) {
        var _this$props = _this.props,
            jsonPath = _this$props.jsonPath,
            approveCheck = _this$props.approveCheck,
            destinationJsonPath = _this$props.destinationJsonPath,
            preparedFinalObject = _this$props.preparedFinalObject,
            raiseSnackbarAlert = _this$props.raiseSnackbarAlert;


        if (_this.validator()) {
          var city = (0, _get2.default)(preparedFinalObject, "Property.address.city");
          var locality = (0, _get2.default)(preparedFinalObject, "Property.address.locality.code");
          var doorNo = (0, _get2.default)(preparedFinalObject, "Property.address.doorNo");
          var buildingName = (0, _get2.default)(preparedFinalObject, "Property.address.buildingName");
          var finalAddress = doorNo + ", " + buildingName + ", " + (0, _utils.getTextToLocalMapping)(city.toUpperCase().replace(/[.]/g, "_") + '_REVENUE_' + locality) + ", " + city.split(".")[1];
          _this.setState((0, _defineProperty3.default)({}, name, event.target.checked), function () {
            approveCheck(jsonPath, _this.state.checkedG);
            finalAddress = _this.state.checkedG ? finalAddress : '';
            var itemObj = jsonPath.lastIndexOf('.');
            approveCheck(jsonPath.substring(0, itemObj + 1) + destinationJsonPath, finalAddress);
          });
        } else {
          raiseSnackbarAlert("PT_COMMON_PROPERTY_LOCATION_FIELD_REQUIRED", "warning");
        }
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CheckboxLabels, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          labelKey = _props.labelKey,
          required = _props.required;


      return _react2.default.createElement(
        "div",
        {
          className: classes.root
        },
        _react2.default.createElement(
          _FormControl2.default,
          {
            component: "fieldset",
            className: classes.formControl,
            required: required
          },
          _react2.default.createElement(
            _FormGroup2.default,
            { row: true },
            _react2.default.createElement(_FormControlLabel2.default, {
              classes: { label: "checkbox-button-label" },
              control: _react2.default.createElement(_Checkbox2.default, {
                checked: this.state.checkedG,
                onChange: this.handleChange("checkedG"),
                classes: {
                  root: classes.radioRoot,
                  checked: classes.checked
                },
                color: "primary"
              }),
              label: _react2.default.createElement(_LabelContainer2.default, { labelKey: labelKey })
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
  var jsonPath = ownprops.jsonPath;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  return { preparedFinalObject: preparedFinalObject, jsonPath: jsonPath };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    approveCheck: function approveCheck(jsonPath, value) {
      dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    },
    raiseSnackbarAlert: function raiseSnackbarAlert(labelKey, value) {
      dispatch((0, _actions.toggleSnackbar)(true, {
        labelKey: labelKey
      }, value));
    }
  };
};

CheckboxLabels.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CheckboxLabels));