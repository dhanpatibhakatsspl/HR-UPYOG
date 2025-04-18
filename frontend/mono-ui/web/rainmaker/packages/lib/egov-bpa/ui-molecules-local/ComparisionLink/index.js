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

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    // fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.375em'
  },
  linkDetails: {
    // color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Roboto',
    lineHeight: '19px',
    letterSpacing: '0.67px',
    textDecoration: 'none'
  }
};

var ComparisionLink = function (_React$Component) {
  (0, _inherits3.default)(ComparisionLink, _React$Component);

  function ComparisionLink() {
    (0, _classCallCheck3.default)(this, ComparisionLink);
    return (0, _possibleConstructorReturn3.default)(this, (ComparisionLink.__proto__ || Object.getPrototypeOf(ComparisionLink)).apply(this, arguments));
  }

  (0, _createClass3.default)(ComparisionLink, [{
    key: "render",
    value: function render() {
      var comparisonDetails = this.props.comparisonDetails;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _Typography2.default,
          { variant: "h2", style: { textAlign: "center", fontWeight: "bold" }, gutterBottom: true },
          "Comparison Report"
        ),
        _react2.default.createElement(
          _Typography2.default,
          { variant: "subtitle2", gutterBottom: true },
          "Few parameters in the diagram are deviating more than the allowed value from the permit eDCR to that of the OC eDCR. You will not be allowed to create an application.",
          _react2.default.createElement(
            "div",
            { style: { padding: "10" } },
            "Please refer the comparison report from this link to get the violation details."
          ),
          _react2.default.createElement("br", null)
        ),
        _react2.default.createElement(
          _Typography2.default,
          { variant: "subtitle1", style: { padding: "10" }, gutterBottom: true },
          _react2.default.createElement(
            "a",
            {
              href: comparisonDetails ? comparisonDetails.report : "",
              target: "_blank"
            },
            comparisonDetails ? comparisonDetails.report : ""
          )
        ),
        _react2.default.createElement(
          _Typography2.default,
          { variant: "subtitle1", style: { textAlign: "center", padding: "10" }, gutterBottom: true },
          "You can contact ULB for further queries."
        )
      );
    }
  }]);
  return ComparisionLink;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration,
      app = state.app;
  var localizationLabels = app.localizationLabels;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var comparisonDetails = preparedFinalObject.comparisonDetails;


  return {
    localizationLabels: localizationLabels,
    comparisonDetails: comparisonDetails ? comparisonDetails : false
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps)(ComparisionLink));