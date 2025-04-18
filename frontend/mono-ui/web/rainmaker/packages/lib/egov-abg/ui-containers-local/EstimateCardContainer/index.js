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

  var _ref3 = applyScreenMdmsData || {},
      estimateCardData = _ref3.estimateCardData;
  // const fees = [
  //   {
  //     name: {
  //       labelName: "Advertisement Tax",
  //       labelKey: "ABG_ADVERTISEMENT_TAX_LABEL"
  //     },
  //     value: 5000,
  //     info: {
  //       labelName: "Advertisement Tax",
  //       labelKey: "ABG_ADVERTISEMENT_TAX_INFO"
  //     }
  //   },
  //   {
  //     name: { labelName: "Rebate", labelKey: "ABG_REBATE_LABEL" },
  //     value: -500,
  //     info: { labelName: "Rebate", labelKey: "ABG_REBATE_INFO" }
  //   },
  //   {
  //     name: { labelName: "Penalty", labelKey: "ABG_PENALTY_LABEL" },
  //     value: 0,
  //     info: { labelName: "Penalty", labelKey: "ABG_PENALTY_INFO" }
  //   }
  // ];


  var estimate = {
    header: { labelName: "Bill Details", labelKey: "ABG_BILL_DETAILS_HEADER" },
    fees: estimateCardData
  };
  return { estimate: estimate };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(EstimateCardContainer);