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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var circlebuttonStyle = {
  width: "80px",
  height: "100px",
  color: "green"
};

var SuccessPTPopupContainer = function (_React$Component) {
  (0, _inherits3.default)(SuccessPTPopupContainer, _React$Component);

  function SuccessPTPopupContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SuccessPTPopupContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SuccessPTPopupContainer.__proto__ || Object.getPrototypeOf(SuccessPTPopupContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
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

  (0, _createClass3.default)(SuccessPTPopupContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          maxWidth = _props.maxWidth,
          children = _props.children;

      return _react2.default.createElement(
        _core.Dialog,
        { open: open, maxWidth: maxWidth, onClose: this.handleClose, DisableBackdropClick: true },
        _react2.default.createElement(_core.DialogContent, { children: [_react2.default.createElement(
            "div",
            { style: { color: "black" } },
            _react2.default.createElement(
              "h1",
              { style: { margin: "0px 0px 25px 0px" } },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelName: "Property Created Successfully",
                labelKey: "PT_COMMON_PROPERTY_CREATED_SUCCESSFULLY"
              })
            ),
            _react2.default.createElement(
              "div",
              { style: { height: "100px" } },
              _react2.default.createElement(
                "div",
                { style: { height: "100px", float: "left" } },
                _react2.default.createElement(
                  _Icon2.default,
                  { style: circlebuttonStyle },
                  _react2.default.createElement(
                    "i",
                    { style: { fontSize: '75px' }, "class": "material-icons" },
                    "check_circle"
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { style: { height: "100px", color: "black", paddingTop: '1px' } },
                _react2.default.createElement(
                  "h3",
                  { style: { margin: "10px 0px" } },
                  _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelName: "Property Registered Successfully!",
                    labelKey: "PT_COMMON_PROPERTY_REGISTERED_SUCCESSFULLY"
                  })
                ),
                _react2.default.createElement(
                  "p",
                  { style: { color: "black" } },
                  _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelName: "Redirecting to Water & Sewerage Application",
                    labelKey: "PT_COMMON_REDIRECTING_TO_WATER_&_SEWERAGE_APPLICATION"
                  })
                )
              )
            )
          )] })
      );
    }
  }]);
  return SuccessPTPopupContainer;
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
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(a, b, c, d));
    }, setRoute: function setRoute(route) {
      return dispatch((0, _actions2.setRoute)(route));
    } };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SuccessPTPopupContainer);