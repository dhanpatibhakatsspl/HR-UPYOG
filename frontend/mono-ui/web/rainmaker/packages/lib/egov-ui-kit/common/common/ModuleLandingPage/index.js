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

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _styles = require("@material-ui/core/styles");

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _translationNode = require("../../../utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      borderRadius: 0,
      marginTop: 0,
      height: 110,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      cursor: "pointer"
    },
    icon: {
      color: "#fe7a51"
    },
    item: {
      padding: 8
    }
  };
};

var ModuleLandingPage = function (_React$Component) {
  (0, _inherits3.default)(ModuleLandingPage, _React$Component);

  function ModuleLandingPage() {
    (0, _classCallCheck3.default)(this, ModuleLandingPage);
    return (0, _possibleConstructorReturn3.default)(this, (ModuleLandingPage.__proto__ || Object.getPrototypeOf(ModuleLandingPage)).apply(this, arguments));
  }

  (0, _createClass3.default)(ModuleLandingPage, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          items = _props.items,
          history = _props.history;

      return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        items.map(function (obj) {
          return _react2.default.createElement(
            _Grid2.default,
            { className: classes.item, item: true, xs: true, sm: true, align: "center" },
            _react2.default.createElement(
              _Card2.default,
              {
                className: classes.paper + " module-card-style",
                onClick: function onClick(e) {
                  history.push(obj.route);
                }
              },
              _react2.default.createElement(
                _CardContent2.default,
                { classes: { root: "card-content-style" } },
                obj.icon,
                _react2.default.createElement(_translationNode2.default, { label: obj.label, fontSize: 14, color: "rgba(0, 0, 0, 0.8700000047683716)", dynamicArray: obj.dynamicArray })
              )
            )
          );
        })
      );
    }
  }]);
  return ModuleLandingPage;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(ModuleLandingPage);