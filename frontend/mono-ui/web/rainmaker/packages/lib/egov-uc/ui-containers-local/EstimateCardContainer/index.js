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

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EstimateCardContainer = function (_Component) {
  (0, _inherits3.default)(EstimateCardContainer, _Component);

  function EstimateCardContainer() {
    (0, _classCallCheck3.default)(this, EstimateCardContainer);
    return (0, _possibleConstructorReturn3.default)(this, (EstimateCardContainer.__proto__ || Object.getPrototypeOf(EstimateCardContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(EstimateCardContainer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_uiMoleculesLocal.FeesEstimateCard, { estimate: this.props.estimate });
    }
  }]);
  return EstimateCardContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _ref = state.screenConfiguration || {},
      preparedFinalObject = _ref.preparedFinalObject;

  var _ref2 = preparedFinalObject || {},
      applyScreenMdmsData = _ref2.applyScreenMdmsData;

  var estimateCardData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, ownProps.sourceJsonPath, []);
  var payStatus = estimateCardData.payStatus;
  estimateCardData = estimateCardData && estimateCardData.map(function (fees) {
    if (fees.name && fees.name.labelKey) fees.name.labelKey = (0, _commons.getTransformedLocale)(fees.name.labelKey);
    if (fees.info && fees.info.labelKey) fees.info.labelKey = (0, _commons.getTransformedLocale)(fees.name.labelKey);
    return fees;
  });

  var estimate = {
    header: { labelName: "Fee Estimate", labelKey: "UC_FEE_ESTIMATE_HEADER" },
    fees: estimateCardData,
    payStatus: payStatus
  };
  return { estimate: estimate };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(EstimateCardContainer);