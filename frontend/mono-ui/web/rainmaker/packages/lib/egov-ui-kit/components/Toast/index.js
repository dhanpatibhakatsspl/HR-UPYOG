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

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _translationNode = require("../../utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _CheckCircle = require("@material-ui/icons/CheckCircle");

var _CheckCircle2 = _interopRequireDefault(_CheckCircle);

var _Error = require("@material-ui/icons/Error");

var _Error2 = _interopRequireDefault(_Error);

var _Info = require("@material-ui/icons/Info");

var _Info2 = _interopRequireDefault(_Info);

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _green = require("@material-ui/core/colors/green");

var _green2 = _interopRequireDefault(_green);

var _amber = require("@material-ui/core/colors/amber");

var _amber2 = _interopRequireDefault(_amber);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Snackbar = require("@material-ui/core/Snackbar");

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _SnackbarContent = require("@material-ui/core/SnackbarContent");

var _SnackbarContent2 = _interopRequireDefault(_SnackbarContent);

var _Warning = require("@material-ui/icons/Warning");

var _Warning2 = _interopRequireDefault(_Warning);

var _actions = require("egov-ui-kit/redux/app/actions");

var _styles = require("@material-ui/core/styles");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class Toast extends React.Component {
//   render() {
//     const { open = false, autoHideDuration = 4000, error = true, message, variant } = this.props;
//     const { labelKey } = message;
//     return (
//       <Snackbar
//         open={open}
//         id="toast-message"
//         // message={message}
//         message={<Label label={labelKey} color="#fff" />}
//         autoHideDuration={autoHideDuration}
//         style={{ pointerEvents: "none", width: "95%", whiteSpace: "nowrap", justifyContent: "center" }}
//         bodyStyle={{
//           pointerEvents: "initial",
//           maxWidth: "none",
//           lineHeight: "20px",
//           height: "auto",
//           maxHeight: "60px",
//           padding: "5px",
//           whiteSpace: "pre-line",
//           textAlign: "center",
//         }}
//       />
//     );
//   }
// }
var variantIcon = {
  success: _CheckCircle2.default,
  warning: _Warning2.default,
  error: _Error2.default,
  info: _Info2.default
};

var styles1 = function styles1(theme) {
  return {
    success: {
      backgroundColor: _green2.default[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: _amber2.default[700]
    },
    icon: {
      fontSize: 20,
      color: "#ffffff"
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
    },
    message: {
      display: "flex",
      alignItems: "center",
      color: "#ffffff"
    }
  };
};

var MySnackbarContent = function MySnackbarContent(props) {
  var classes = props.classes,
      className = props.className,
      message = props.message,
      onClose = props.onClose,
      variant = props.variant,
      other = (0, _objectWithoutProperties3.default)(props, ["classes", "className", "message", "onClose", "variant"]);
  var labelName = message.labelName,
      labelKey = message.labelKey;

  var Icon = variantIcon[variant];
  return _react2.default.createElement(_SnackbarContent2.default, (0, _extends3.default)({
    className: (0, _classnames2.default)(classes[variant], className),
    "aria-describedby": "client-snackbar",
    message: _react2.default.createElement(
      "span",
      { id: "client-snackbar", className: classes.message },
      _react2.default.createElement(Icon, { className: (0, _classnames2.default)(classes.icon, classes.iconVariant) }),
      _react2.default.createElement(_translationNode2.default, { label: labelKey, color: "#ffffff" })
    ),
    action: [_react2.default.createElement(
      _IconButton2.default,
      {
        key: "close",
        "aria-label": "Close",
        color: "inherit",
        className: classes.close,
        onClick: onClose
      },
      _react2.default.createElement(_Close2.default, { className: classes.icon })
    )]
  }, other));
};

MySnackbarContent.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string,
  message: _propTypes2.default.node,
  onClose: _propTypes2.default.func,
  variant: _propTypes2.default.oneOf(["success", "warning", "error", "info"]).isRequired
};

var MySnackbarContentWrapper = (0, _styles.withStyles)(styles1)(MySnackbarContent);

var styles2 = function styles2(theme) {
  return {
    margin: {
      margin: theme.spacing.unit
    }
  };
};

var Toast = function (_React$Component) {
  (0, _inherits3.default)(Toast, _React$Component);

  function Toast() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Toast);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleClose = function (event, reason) {
      var toggleSnackbarAndSetText = _this.props.toggleSnackbarAndSetText;

      toggleSnackbarAndSetText(false, "", "");
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Toast, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$autoHideDurati = _props.autoHideDuration,
          autoHideDuration = _props$autoHideDurati === undefined ? 5000 : _props$autoHideDurati,
          classes = _props.classes,
          open = _props.open,
          message = _props.message,
          variant = _props.variant;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _Snackbar2.default,
          {
            open: open,
            autoHideDuration: autoHideDuration,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            },
            onClose: this.handleClose
          },
          _react2.default.createElement(MySnackbarContentWrapper, {
            variant: variant ? variant : "error",
            className: classes.margin,
            message: message,
            onClose: this.handleClose
          })
        )
      );
    }
  }]);
  return Toast;
}(_react2.default.Component);

Toast.propTypes = {
  open: _propTypes2.default.bool,
  variant: _propTypes2.default.string,
  autoHideDuration: _propTypes2.default.number,
  classes: _propTypes2.default.object.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, variant) {
      dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, variant));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles2)((0, _reactRedux.connect)(null, mapDispatchToProps)(Toast));