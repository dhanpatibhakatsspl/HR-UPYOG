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

var _reactRedux = require("react-redux");

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _toggleFeilds = require("../CheckboxContainer/toggleFeilds");

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
      checkedG: null
    }, _this.componentDidMount = function () {
      /*const { preparedFinalObject, approveCheck, jsonPath, onFieldChange } = this.props;    
      let isChecked = get(preparedFinalObject, jsonPath);
      if (isChecked) this.setState({ checkedG: isChecked });
      else {
        this.setState({ checkedG: true })
        this.updateOwnerFileds();
      } */
      var _this$props = _this.props,
          classes = _this$props.classes,
          content = _this$props.content,
          label = _this$props.label,
          isChecked = _this$props.isChecked,
          approveCheck = _this$props.approveCheck,
          onFieldChange = _this$props.onFieldChange,
          jsonPath = _this$props.jsonPath;

      if (isChecked === false) {
        (0, _toggleFeilds.toggleConnHolderDetails)(onFieldChange, true);
        approveCheck(jsonPath, isChecked);
      } else {
        (0, _toggleFeilds.toggleConnHolderDetails)(onFieldChange, false);
        approveCheck(jsonPath, isChecked);
      }
    }, _this.updateOwnerFileds = function () {
      var _this$props2 = _this.props,
          sourceJsonPaths = _this$props2.sourceJsonPaths,
          destinationJsonPaths = _this$props2.destinationJsonPaths,
          disbaleComponentJsonPaths = _this$props2.disbaleComponentJsonPaths,
          onFieldChange = _this$props2.onFieldChange,
          screenKey = _this$props2.screenKey,
          preparedFinalObject = _this$props2.preparedFinalObject,
          approveCheck = _this$props2.approveCheck,
          jsonPath = _this$props2.jsonPath,
          state = _this$props2.state;


      (0, _toggleFeilds.toggleConnHolderDetails)(onFieldChange, false);
      approveCheck(jsonPath, _this.props.isChecked);
    }, _this.handleChange = function (name) {
      return function (event) {
        var _this$props3 = _this.props,
            sourceJsonPaths = _this$props3.sourceJsonPaths,
            destinationJsonPaths = _this$props3.destinationJsonPaths,
            disbaleComponentJsonPaths = _this$props3.disbaleComponentJsonPaths,
            onFieldChange = _this$props3.onFieldChange,
            screenKey = _this$props3.screenKey,
            preparedFinalObject = _this$props3.preparedFinalObject,
            approveCheck = _this$props3.approveCheck,
            jsonPath = _this$props3.jsonPath;


        var isChecked = event.target.checked;
        if (isChecked) {
          (0, _toggleFeilds.toggleConnHolderDetails)(onFieldChange, false);
        } else {
          (0, _toggleFeilds.toggleConnHolderDetails)(onFieldChange, true);
        }

        _this.setState((0, _defineProperty3.default)({}, name, isChecked), function () {
          return approveCheck(jsonPath, isChecked);
        });
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CheckboxLabels, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          content = _props.content,
          label = _props.label;

      var isChecked = this.state.checkedG === null ? this.props.isChecked : this.state.checkedG;
      return _react2.default.createElement(
        _FormGroup2.default,
        { row: true },
        _react2.default.createElement(_FormControlLabel2.default, {
          classes: { label: "checkbox-label" },
          control: _react2.default.createElement(_Checkbox2.default, {
            checked: isChecked,
            onChange: this.handleChange("checkedG"),
            value: isChecked,
            classes: {
              root: classes.root,
              checked: classes.checked
            }
          }),
          label: label && label.key && _react2.default.createElement(_LabelContainer2.default, {
            className: classes.formLabel,
            labelName: label.name,
            labelKey: label.key
          })
        })
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
    }
  };
};

CheckboxLabels.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CheckboxLabels));

// if(sourceJsonPaths){
//   sourceJsonPaths.forEach((sourceJSonPath, index) => {
//     // approveCheck(
//     //   destinationJsonPaths[index],
//     //   get(preparedFinalObject, sourceJSonPath)
//     // );
//     onFieldChange(
//       screenKey,
//       disbaleComponentJsonPaths[index],
//       "props.value",
//       get(preparedFinalObject, sourceJSonPath)
//     );
//   });
// }


// sourceJsonPaths &&
// destinationJsonPaths &&
// destinationJsonPaths.forEach((destinationJsonPath, index) => {
//   approveCheck(destinationJsonPath[index], "");
// });

// disbaleComponentJsonPaths &&
//   disbaleComponentJsonPaths.map(componentJsonPath => {
//     onFieldChange(
//       screenKey,
//       componentJsonPath,
//       "props.disabled",
//       event.target.checked
//     );
//   });
//true

// disbaleComponentJsonPaths &&
//   disbaleComponentJsonPaths.forEach((disbaleComponentJsonPath, index) => {
//     approveCheck(disbaleComponentJsonPath[index], "");
//   });
// disbaleComponentJsonPaths &&
//   disbaleComponentJsonPaths.map(componentJsonPath => {
//     onFieldChange(screenKey, componentJsonPath, "props.value", "");
//   });


//  this.updateOwnerFileds();
// if(destinationJsonPaths){
//   destinationJsonPaths.forEach((destinationJsonPath, index) => {
//     approveCheck(
//       destinationJsonPaths[index],
//       get(preparedFinalObject, destinationJsonPath)
//     );
//     onFieldChange(
//       screenKey,
//       disbaleComponentJsonPaths[index],
//       "props.value",
//       get(preparedFinalObject, destinationJsonPath)
//     );
//   });
// }