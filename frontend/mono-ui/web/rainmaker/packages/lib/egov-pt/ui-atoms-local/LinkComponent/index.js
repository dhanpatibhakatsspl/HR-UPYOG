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

var _components = require("components");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkComponent = function (_Component) {
  (0, _inherits3.default)(LinkComponent, _Component);

  function LinkComponent() {
    (0, _classCallCheck3.default)(this, LinkComponent);
    return (0, _possibleConstructorReturn3.default)(this, (LinkComponent.__proto__ || Object.getPrototypeOf(LinkComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(LinkComponent, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          warningPopup = _props.warningPopup,
          prepareFinalObject = _props.prepareFinalObject,
          showPopup = _props.showPopup;

      return showPopup ? _react2.default.createElement(_components.WarningPopup, {
        open: showPopup,
        link: warningPopup.link,
        UpdateNumber: warningPopup.UpdateNumber,
        closeDialog: function closeDialog() {
          prepareFinalObject("pt-warning-popup.showPopup", false);
        },
        type: "LINKNUM" }) : _react2.default.createElement("span", null);
    }
  }]);
  return LinkComponent;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  var warningPopup = preparedFinalObject['pt-warning-popup'] || {};
  var showPopup = warningPopup.showPopup;


  return { warningPopup: warningPopup, showPopup: showPopup };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LinkComponent);