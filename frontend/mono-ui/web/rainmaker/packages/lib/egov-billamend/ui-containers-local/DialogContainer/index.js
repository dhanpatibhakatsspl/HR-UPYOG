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

var _core = require("@material-ui/core");

var _DialogContent = require("@material-ui/core/DialogContent");

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _styles = require("@material-ui/core/styles");

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogContainer = function (_React$Component) {
  (0, _inherits3.default)(DialogContainer, _React$Component);

  function DialogContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DialogContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
      var _this$props = _this.props,
          screenKey = _this$props.screenKey,
          handleField = _this$props.handleField,
          setRoute = _this$props.setRoute,
          redirectUrl = _this$props.redirectUrl;

      handleField(screenKey, "components.adhocDialog", "props.open", false);
      if (redirectUrl) {
        setRoute(redirectUrl);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DialogContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          maxWidth = _props.maxWidth,
          children = _props.children;

      var DialogContent = (0, _styles.withStyles)(function (theme) {
        return {
          root: {
            paddingBottom: 0,
            position: "relative",
            top: 0
          }
        };
      })(_DialogContent2.default);

      var DialogContainer = (0, _styles.withStyles)(function (theme) {
        return {
          root: {
            zIndex: 13333
          }
        };
      })(_core.Dialog);

      var CloseButton = (0, _styles.withStyles)(function (theme) {
        return {
          root: {
            justifyContent: "flex-end",
            float: "right",
            paddingRight: 0,
            zIndex: 1333,
            right: 20,
            paddingTop: 0,
            position: "absolute",
            "&:hover": {
              backgroundColor: "#FFF"
            }
          }
        };
      })(_IconButton2.default);

      return _react2.default.createElement(
        DialogContainer,
        { open: open, maxWidth: maxWidth, onClose: this.handleClose },
        _react2.default.createElement(
          CloseButton,
          { "aria-label": "Close" },
          _react2.default.createElement(_Close2.default, { onClick: this.handleClose })
        ),
        _react2.default.createElement(DialogContent, { children: children })
      );
    }
  }]);
  return DialogContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;
  var screenKey = ownProps.screenKey;
  var screenConfig = screenConfiguration.screenConfig;

  var open = (0, _get2.default)(screenConfig, screenKey + ".components.adhocDialog.props.open");

  return {
    open: open,
    screenKey: screenKey,
    screenConfig: screenConfig
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { handleField: function handleField(a, b, c, d) {
      return dispatch((0, _actions2.handleScreenConfigurationFieldChange)(a, b, c, d));
    }, setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    } };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogContainer);