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

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BpaEstimateCardContainer = function (_Component) {
  (0, _inherits3.default)(BpaEstimateCardContainer, _Component);

  function BpaEstimateCardContainer() {
    (0, _classCallCheck3.default)(this, BpaEstimateCardContainer);
    return (0, _possibleConstructorReturn3.default)(this, (BpaEstimateCardContainer.__proto__ || Object.getPrototypeOf(BpaEstimateCardContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(BpaEstimateCardContainer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_uiMoleculesLocal.BpaFeesEstimateCard, { estimate: this.props.estimate });
    }
  }]);
  return BpaEstimateCardContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;

  var fees = (0, _get2.default)(screenConfiguration, "preparedFinalObject.applyScreenMdmsData.estimateCardData", []);
  var estimate = {
    header: { labelName: "Fee Estimate", labelKey: "BPA_SUMMARY_FEE_EST" },
    fees: fees
  };
  return { estimate: estimate };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(BpaEstimateCardContainer);