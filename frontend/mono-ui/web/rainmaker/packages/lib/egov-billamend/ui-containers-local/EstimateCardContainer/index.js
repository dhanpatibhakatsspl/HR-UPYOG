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

var _FeeEstimateCard = require("../../ui-molecules-local/FeeEstimateCard");

var _FeeEstimateCard2 = _interopRequireDefault(_FeeEstimateCard);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

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
      return _react2.default.createElement(_FeeEstimateCard2.default, { estimate: this.props.estimate, searchBillDetails: this.props.searchBillDetails });
    }
  }]);
  return EstimateCardContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;

  var fees = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.AmendmentTemp[0].estimateCardData", {});
  var searchBillDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchBillDetails-bill", {});

  var amountType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BILL.AMOUNTTYPE", "");
  var estimate = {
    fees: fees,
    extra: [{ textLeft: "The approval note amount will be automatically applied in the upcoming bill" }],
    amountType: amountType
  };
  return { estimate: estimate, searchBillDetails: searchBillDetails };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(EstimateCardContainer);