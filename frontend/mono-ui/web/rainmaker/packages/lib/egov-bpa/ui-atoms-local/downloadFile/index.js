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

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _styles = require("@material-ui/core/styles");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import "./index.css";
var styles = {
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    // fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.375em'
  },
  linkDetails: {
    color: 'rgb(245, 117, 66)',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Roboto',
    lineHeight: '19px',
    letterSpacing: '0.67px',
    textDecoration: 'none',
    '&:hover': {
      color: 'rgb(245, 117, 66)'
    },
    '&:active': {
      color: 'rgb(245, 117, 66)'
    },
    '&:visited': {
      color: 'rgb(245, 117, 66)'
    },
    '&:link': {
      color: 'rgb(245, 117, 66)'
    }

  }
};

var downloadFile = function (_React$Component) {
  (0, _inherits3.default)(downloadFile, _React$Component);

  function downloadFile() {
    (0, _classCallCheck3.default)(this, downloadFile);
    return (0, _possibleConstructorReturn3.default)(this, (downloadFile.__proto__ || Object.getPrototypeOf(downloadFile)).apply(this, arguments));
  }

  (0, _createClass3.default)(downloadFile, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$label = _props.label,
          label = _props$label === undefined ? {} : _props$label,
          _props$linkDetail = _props.linkDetail,
          linkDetail = _props$linkDetail === undefined ? {} : _props$linkDetail,
          classes = _props.classes,
          localizationLabels = _props.localizationLabels;
      var value = this.props.value;

      var translatedLabel = (0, _commons.getLocaleLabels)(label.labelName, label.labelKey, localizationLabels);
      var translatedLabelLink = (0, _commons.getLocaleLabels)(linkDetail.labelName, linkDetail.labelKey, localizationLabels);
      var downloadLink = void 0;
      if (value && !value.includes("https") && window.location.href.includes("https")) {
        downloadLink = value.replace(/http/g, "https");
      }
      value = downloadLink ? downloadLink : value;
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: classes.root },
          translatedLabel
        ),
        _react2.default.createElement(
          "a",
          { className: classes.linkDetails, href: value, target: "_blank", rel: "noopener noreferrer" },
          translatedLabelLink
        )
      );
    }
  }]);
  return downloadFile;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var jsonPath = ownprops.jsonPath,
      value = ownprops.value;
  var screenConfiguration = state.screenConfiguration,
      app = state.app;
  var localizationLabels = app.localizationLabels;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  var fieldValue = value === undefined ? (0, _get2.default)(preparedFinalObject, jsonPath) : value;
  return { value: fieldValue, localizationLabels: localizationLabels };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps)(downloadFile));