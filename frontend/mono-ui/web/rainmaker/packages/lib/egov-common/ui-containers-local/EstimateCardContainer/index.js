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

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

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
      return _react2.default.createElement(_uiMoleculesLocal.FeesEstimateCard, { estimate: this.props.estimate, isArrears: this.props.isArrears });
    }
  }]);
  return EstimateCardContainer;
}(_react.Component);

var sortBillDetails = function sortBillDetails() {
  var billDetails = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var sortedBillDetails = [];
  sortedBillDetails = billDetails.sort(function (x, y) {
    return y.fromPeriod - x.fromPeriod;
  });
  return sortedBillDetails;
};
var formatTaxHeaders = function formatTaxHeaders() {
  var billDetail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var formattedFees = [];
  var _billDetail$billAccou = billDetail.billAccountDetails,
      billAccountDetails = _billDetail$billAccou === undefined ? [] : _billDetail$billAccou;

  var billAccountDetailsSorted = (0, _orderBy2.default)(billAccountDetails, ["amount"], ["asce"]);
  formattedFees = billAccountDetailsSorted.map(function (taxHead) {
    return {
      info: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      name: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      value: taxHead.amount
    };
  });
  formattedFees.reverse();
  return formattedFees;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;


  var fees = formatTaxHeaders(sortBillDetails((0, _get2.default)(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []))[0]);
  // const fees = get(screenConfiguration, "preparedFinalObject.applyScreenMdmsData.estimateCardData", []);
  var billDetails = (0, _get2.default)(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []);
  var isArrears = (0, _get2.default)(screenConfiguration, "preparedFinalObject.isArrears");
  var totalAmount = 0;
  var arrears = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = billDetails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var billDetail = _step.value;

      totalAmount += billDetail.amount;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (totalAmount > 0) {
    arrears = totalAmount - billDetails[0].amount;
    arrears = arrears.toFixed(2);
  }
  var estimate = {
    header: { labelName: "Fee Estimate", labelKey: "NOC_FEE_ESTIMATE_HEADER" },
    fees: fees,
    totalAmount: totalAmount,
    arrears: arrears
  };
  return { estimate: estimate, isArrears: isArrears };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(EstimateCardContainer);