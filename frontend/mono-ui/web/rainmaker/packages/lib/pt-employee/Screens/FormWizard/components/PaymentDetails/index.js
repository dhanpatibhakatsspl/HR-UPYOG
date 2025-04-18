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

var _ReceiptDetails = require("./ReceiptDetails");

var _ReceiptDetails2 = _interopRequireDefault(_ReceiptDetails);

var _TaxBreakUp = require("./TaxBreakUp");

var _TaxBreakUp2 = _interopRequireDefault(_TaxBreakUp);

var _PaymentModes = require("./PaymentModes");

var _PaymentModes2 = _interopRequireDefault(_PaymentModes);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _components = require("components");

var _forms = require("./forms");

var _AdditionalDetails = require("../ReviewForm/components/AdditionalDetails");

var _AdditionalDetails2 = _interopRequireDefault(_AdditionalDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentModeSelector = (0, _form2.default)({ formKey: "paymentModes" })(_forms.PaymentModeInformation);

var paymentModeDetails = [{
  primaryText: "PT_PAYMENT_CASH",
  code: "Cash",
  forms: [{
    title: "PT_PAYER_DETAILS",
    className: "payer-details",
    comp: (0, _form2.default)({
      formKey: "cashInfo",
      copyName: "cashInfo",
      path: "PropertyTaxPay"
    })(_forms.CashInformation)
  }]
}, {
  primaryText: "PT_PAYMENT_CHQ",
  code: "Cheque",
  forms: [{
    title: "PT_PAYER_DETAILS",
    className: "payer-details",
    comp: (0, _form2.default)({
      formKey: "cashInfo",
      copyName: "cashInfo",
      path: "PropertyTaxPay"
    })(_forms.CashInformation)
  }, {
    title: "PT_CHEQUE_DETAILS",
    className: "cheque-details",
    comp: (0, _form2.default)({
      formKey: "chequeInfo",
      copyName: "chequeInfo",
      path: "PropertyTaxPay"
    })(_forms.ChequeInformation)
  }]
}, {
  primaryText: "PT_PAYMENT_DD",
  code: "DD",
  forms: [{
    title: "PT_PAYER_DETAILS",
    className: "payer-details",
    comp: (0, _form2.default)({
      formKey: "cashInfo",
      copyName: "cashInfo",
      path: "PropertyTaxPay"
    })(_forms.CashInformation)
  }, {
    title: "PT_DEMAND_DRAFT_DETAILS",
    className: "demand-details",
    comp: (0, _form2.default)({
      formKey: "demandInfo",
      copyName: "demandInfo",
      path: "PropertyTaxPay"
    })(_forms.DemandDraftInformation)
  }]
}, {
  primaryText: "PT_PAYMENT_CARD",
  code: "Card",
  forms: [{
    title: "PT_PAYER_DETAILS",
    className: "payer-details",
    comp: (0, _form2.default)({
      formKey: "cashInfo",
      copyName: "cashInfo",
      path: "PropertyTaxPay"
    })(_forms.CashInformation)
  }, {
    title: "PT_CARD_DETAILS",
    className: "card-details",
    comp: (0, _form2.default)({
      formKey: "cardInfo",
      copyName: "cardInfo",
      path: "PropertyTaxPay"
    })(_forms.CardInformation)
  }]
}];

var PaymentDetails = function (_Component) {
  (0, _inherits3.default)(PaymentDetails, _Component);

  function PaymentDetails() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentDetails.__proto__ || Object.getPrototypeOf(PaymentDetails)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      paymentModeDetails: paymentModeDetails,
      valueSelected: "",
      errorText: "",
      totalAmountToBePaid: 0
    }, _this.getErrorMessage = function (value) {
      var _ref2 = _this.props.estimationDetails[0] || {},
          totalAmount = _ref2.totalAmount;

      var errorText = "amount should be numeric";
      if (isFinite(value) && value >= totalAmount) {
        errorText = "can't be greater than " + (parseInt(totalAmount) - 1);
      } else if (isFinite(value) && value <= 100) {
        errorText = "can't be less than 100";
      }
      return errorText;
    }, _this.handleFieldChange = function (event, value) {
      var _this$props = _this.props,
          estimationDetails = _this$props.estimationDetails,
          updateTotalAmount = _this$props.updateTotalAmount;

      var _ref3 = estimationDetails && estimationDetails[0] || {},
          totalAmount = _ref3.totalAmount;

      if (isNaN(parseFloat(value)) || !isFinite(value) || value >= totalAmount || value < 100) {
        _this.setState({
          errorText: _this.getErrorMessage(value)
        }, function () {
          updateTotalAmount && updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
        });
      } else {
        _this.setState({
          errorText: ""
        }, function () {
          updateTotalAmount && updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
        });
      }
    }, _this.onRadioButtonChange = function (e) {
      var _this$props2 = _this.props,
          estimationDetails = _this$props2.estimationDetails,
          updateTotalAmount = _this$props2.updateTotalAmount;

      var _ref4 = estimationDetails && estimationDetails[0] || {},
          totalAmount = _ref4.totalAmount;

      if (e.target.value === "Full_Amount") {
        updateTotalAmount && updateTotalAmount(totalAmount, _this.state.valueSelected === "Full_Amount");
        // this.setState({ totalAmountTobePaid: totalAmount, valueSelected: "Full_Amount" });
      } else {
        updateTotalAmount && updateTotalAmount(100, _this.state.valueSelected === "Partial_Amount");
        // this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // onRadioButtonChange = (e) => {
  //   const inputValue = e.target.value;
  //   this.setState({ totalAmountTobePaid: inputValue });
  // };

  (0, _createClass3.default)(PaymentDetails, [{
    key: "render",


    // updateTotalAmount = (value, isFullPayment) => {
    //   this.setState({
    //     totalAmountToBePaid: value,
    //     isFullPayment,
    //   });
    // };

    value: function render() {
      var _state = this.state,
          paymentModeDetails = _state.paymentModeDetails,
          valueSelected = _state.valueSelected,
          totalAmountTobePaid = _state.totalAmountTobePaid,
          errorText = _state.errorText;
      var _props = this.props,
          estimationDetails = _props.estimationDetails,
          importantDates = _props.importantDates,
          partialAmountError = _props.partialAmountError,
          isPartialPaymentInValid = _props.isPartialPaymentInValid;

      var _ref5 = estimationDetails && estimationDetails[0] || {},
          totalAmount = _ref5.totalAmount;

      return _react2.default.createElement(_components.Card, { style: { backgroundColor: 'white' },
        textChildren: _react2.default.createElement(
          "div",
          { className: "col-sm-12" },
          _react2.default.createElement(
            "div",
            { className: "payment-details" },
            _react2.default.createElement(_TaxBreakUp2.default, {
              estimationDetails: estimationDetails,
              importantDates: importantDates,
              optionSelected: this.props.optionSelected
            }),
            !isPartialPaymentInValid && _react2.default.createElement(_AdditionalDetails2.default, {
              value: this.props.totalAmountToBePaid,
              onRadioButtonChange: this.props.onRadioButtonChange,
              handleFieldChange: this.handleFieldChange,
              optionSelected: this.props.optionSelected,
              errorText: partialAmountError,
              totalAmount: totalAmount && totalAmount,
              estimationDetails: estimationDetails,
              isPartialPaymentInValid: isPartialPaymentInValid
            }),
            totalAmount > 0 && _react2.default.createElement(_PaymentModes2.default, {
              paymentModeDetails: paymentModeDetails,
              PaymentModeSelector: PaymentModeSelector
            }),
            _react2.default.createElement(_ReceiptDetails2.default, null)
          )
        ) });
    }
  }]);
  return PaymentDetails;
}(_react.Component);

exports.default = PaymentDetails;