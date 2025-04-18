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

var _uiAtoms = require("../../ui-atoms");

var _reactRedux = require("react-redux");

var _actions = require("../../ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SnackbarContainer = function (_Component) {
  (0, _inherits3.default)(SnackbarContainer, _Component);

  function SnackbarContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SnackbarContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SnackbarContainer.__proto__ || Object.getPrototypeOf(SnackbarContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function (event, reason) {
      var toggleSnackbar = _this.props.toggleSnackbar;

      toggleSnackbar(false, "", "");
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SnackbarContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          variant = _props.variant,
          message = _props.message;

      return _react2.default.createElement(_uiAtoms.Snackbar, {
        onClose: this.handleClose,
        open: open,
        variant: variant,
        message: message
      });
    }
  }]);
  return SnackbarContainer;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbar: function toggleSnackbar(open, message, variant) {
      dispatch((0, _actions.toggleSnackbar)(open, message, variant));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(SnackbarContainer);