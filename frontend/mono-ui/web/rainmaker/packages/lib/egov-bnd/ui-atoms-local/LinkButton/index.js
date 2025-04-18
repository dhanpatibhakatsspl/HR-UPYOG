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

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  color: "rgba(0, 0, 0, 0.87)",
  marginLeft: "3%",
  marginTop: "7%",
  lineHeight: "35px",
  fontSize: "16px"
};

var clickHereStyles = {
  cursor: "pointer",
  textDecoration: "none",
  color: "#FE7A51"
};

var LinkButton = function (_React$Component) {
  (0, _inherits3.default)(LinkButton, _React$Component);

  function LinkButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LinkButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LinkButton.__proto__ || Object.getPrototypeOf(LinkButton)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (onClickDefination) {
      var _this$props = _this.props,
          state = _this$props.state,
          dispatchAction = _this$props.dispatchAction;
      var callBack = onClickDefination.callBack;

      if (typeof callBack === "function") {
        callBack(state, dispatchAction);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LinkButton, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onClickDefination = _props.onClickDefination,
          labelKey = _props.labelKey;
      var _onClick = this.onClick;

      return _react2.default.createElement(
        "div",
        { style: styles },
        _react2.default.createElement(
          "a",
          { href: "javascript:void(0)", onClick: function onClick() {
              return _onClick(onClickDefination);
            } },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            style: clickHereStyles,
            labelKey: labelKey })
        )
      );
    }
  }]);
  return LinkButton;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var onClickDefination = ownprops.onClickDefination;

  return { state: state, screenConfiguration: screenConfiguration, preparedFinalObject: preparedFinalObject, onClickDefination: onClickDefination };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchAction: dispatch
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LinkButton);