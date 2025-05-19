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

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _List = require("@material-ui/core/List");

var _List2 = _interopRequireDefault(_List);

var _ListItem = require("@material-ui/core/ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require("@material-ui/core/ListItemText");

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _ListItemSecondaryAction = require("@material-ui/core/ListItemSecondaryAction");

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _KeyboardArrowRight = require("@material-ui/icons/KeyboardArrowRight");

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      margin: "16px 8px",
      backgroundColor: theme.palette.background.paper
    }
  };
};

var HowItWorks = function (_React$Component) {
  (0, _inherits3.default)(HowItWorks, _React$Component);

  function HowItWorks() {
    (0, _classCallCheck3.default)(this, HowItWorks);
    return (0, _possibleConstructorReturn3.default)(this, (HowItWorks.__proto__ || Object.getPrototypeOf(HowItWorks)).apply(this, arguments));
  }

  (0, _createClass3.default)(HowItWorks, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _List2.default,
          { component: "nav" },
          _react2.default.createElement(
            _ListItem2.default,
            { button: true },
            _react2.default.createElement(_ListItemText2.default, {
              primary: _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: "COMMON_HOW_IT_WORKS",
                labelName: "How it works?",
                style: {
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.8700000047683716)"
                }
              })
            }),
            _react2.default.createElement(
              _ListItemSecondaryAction2.default,
              null,
              _react2.default.createElement(
                _IconButton2.default,
                { edge: "end" },
                _react2.default.createElement(_KeyboardArrowRight2.default, null)
              )
            )
          )
        )
      );
    }
  }]);
  return HowItWorks;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(HowItWorks);