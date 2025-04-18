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

var _Stepper = require("@material-ui/core/Stepper");

var _Stepper2 = _interopRequireDefault(_Stepper);

var _Step = require("@material-ui/core/Step");

var _Step2 = _interopRequireDefault(_Step);

var _StepLabel = require("@material-ui/core/StepLabel");

var _StepLabel2 = _interopRequireDefault(_StepLabel);

var _StepContent = require("@material-ui/core/StepContent");

var _StepContent2 = _interopRequireDefault(_StepContent);

var _TaskStatusComponents = require("../TaskStatusComponents");

var _TaskStatusComponents2 = _interopRequireDefault(_TaskStatusComponents);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _uiContainers = require("egov-ui-framework/ui-containers");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      marginTop: 24,
      width: "100%"
    }
  };
};

var VerticalLinearStepper = function (_React$Component) {
  (0, _inherits3.default)(VerticalLinearStepper, _React$Component);

  function VerticalLinearStepper() {
    (0, _classCallCheck3.default)(this, VerticalLinearStepper);
    return (0, _possibleConstructorReturn3.default)(this, (VerticalLinearStepper.__proto__ || Object.getPrototypeOf(VerticalLinearStepper)).apply(this, arguments));
  }

  (0, _createClass3.default)(VerticalLinearStepper, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          content = _props.content;


      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _Stepper2.default,
          { orientation: "vertical" },
          content.map(function (item, index) {
            return item && _react2.default.createElement(
              _Step2.default,
              { key: index, active: true },
              _react2.default.createElement(
                _StepLabel2.default,
                { classes: { label: "stepper-label" } },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelName: (0, _TaskStatusComponents.getCurrentStatus)(item.state.applicationStatus),
                  labelKey: item.businessService ? "WF_" + item.businessService.toUpperCase() + "_" + item.state.applicationStatus : ""
                }),
                item.isExclamationMark ? _react2.default.createElement(
                  "span",
                  { style: { padding: "4px 0 0 4px" } },
                  _react2.default.createElement(
                    "i",
                    { "class": "material-icons", style: { color: "rgb(244, 67, 54)" } },
                    "error"
                  )
                ) : ""
              ),
              _react2.default.createElement(
                _StepContent2.default,
                null,
                _react2.default.createElement(_TaskStatusComponents2.default, { currentObj: item, index: index }),
                _react2.default.createElement(_Divider2.default, { className: classes.root })
              )
            );
          })
        )
      );
    }
  }]);
  return VerticalLinearStepper;
}(_react2.default.Component);

VerticalLinearStepper.propTypes = {
  classes: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(VerticalLinearStepper);