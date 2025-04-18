"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _ArrearsMolecule = require("../../ui-molecules-local/ArrearsMolecule");

var _ArrearsMolecule2 = _interopRequireDefault(_ArrearsMolecule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBillingPeriod = function getBillingPeriod(from, to) {
  var fromDate = new Date(from);
  var toDate = new Date(to);
  if (toDate.getYear() - fromDate.getYear() != 0) {
    return "FY" + (fromDate.getYear() + 1900) + "-" + (toDate.getYear() - 100);
  }
  return fromDate.toLocaleDateString() + "-" + toDate.toLocaleDateString();
};

var ArrearsCardContainer = function (_Component) {
  (0, _inherits3.default)(ArrearsCardContainer, _Component);

  function ArrearsCardContainer(props) {
    (0, _classCallCheck3.default)(this, ArrearsCardContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ArrearsCardContainer.__proto__ || Object.getPrototypeOf(ArrearsCardContainer)).call(this, props));

    _this.state = {
      showArrearsCard: false
    };

    _this.buttonOnClick = function () {
      _this.setState({ showArrearsCard: !_this.state.showArrearsCard });
    };

    return _this;
  }

  (0, _createClass3.default)(ArrearsCardContainer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_LabelContainer2.default, {
          labelName: 'CS_ARREARS_DETAILS',
          labelKey: 'CS_ARREARS_DETAILS',
          style: { fontSize: 'medium' }
        }),
        this.props.estimate.arrears != 0 && this.state.showArrearsCard && _react2.default.createElement(_ArrearsMolecule2.default, { fees: this.props.estimate.fees, arrears: this.props.estimate.arrears }),
        this.props.estimate.arrears == 0 && this.state.showArrearsCard && _react2.default.createElement(
          "div",
          null,
          " ",
          _react2.default.createElement(_LabelContainer2.default, {
            labelName: 'CS_NO_ARREARS',
            labelKey: 'CS_NO_ARREARS'
          })
        ),
        this.state.showArrearsCard && _react2.default.createElement(
          "button",
          { style: { float: "right", color: '#FE7A51', border: '0px' }, onClick: this.buttonOnClick },
          _react2.default.createElement(_LabelContainer2.default, {
            labelName: 'CS_HIDE_CARD',
            labelKey: 'CS_HIDE_CARD'
          })
        ),
        !this.state.showArrearsCard && _react2.default.createElement(
          "button",
          { style: { float: "right", color: '#FE7A51', border: '0px' }, onClick: this.buttonOnClick },
          _react2.default.createElement(_LabelContainer2.default, {
            labelName: 'CS_SHOW_CARD',
            labelKey: 'CS_SHOW_CARD'
          })
        )
      );
    }
  }]);
  return ArrearsCardContainer;
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


  var formattedFees = {};
  var _billDetail$billAccou = billDetail.billAccountDetails,
      billAccountDetails = _billDetail$billAccou === undefined ? [] : _billDetail$billAccou;

  var billAccountDetailsSorted = (0, _orderBy2.default)(billAccountDetails, ["amount"], ["asce"]);

  billAccountDetailsSorted.map(function (taxHead) {
    formattedFees[taxHead.taxHeadCode] = { value: taxHead.amount, order: taxHead.order };
  });

  formattedFees['TL_COMMON_TOTAL_AMT'] = { value: billDetail.amount, order: 10 };
  return formattedFees;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;


  var fees = {};
  var sortedBillDetails = [].concat((0, _toConsumableArray3.default)(sortBillDetails((0, _get2.default)(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []))));

  sortedBillDetails.shift();
  sortedBillDetails.map(function (bill) {
    var fee = formatTaxHeaders(bill);
    var expiryDate = new Date(bill.expiryDate);
    // fee['CS_BILL_NO'] = { value: get(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billNumber", 'NA'), order: -2 }
    fee['CS_BILL_NO'] = { value: (0, _get2.default)(bill, "billNumber", 'NA'), order: -2 };
    fee['CS_BILL_DUEDATE'] = { value: expiryDate && expiryDate.toLocaleDateString && expiryDate.toLocaleDateString() || 'NA', order: -1 };
    fees[getBillingPeriod(bill.fromPeriod, bill.toPeriod)] = fee;
  });

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

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(ArrearsCardContainer);