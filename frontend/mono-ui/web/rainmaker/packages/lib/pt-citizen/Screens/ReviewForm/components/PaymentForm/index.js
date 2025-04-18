"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _PaymentAmountDetails = require("../PaymentAmountDetails");

var _PaymentAmountDetails2 = _interopRequireDefault(_PaymentAmountDetails);

var _CalculationDetails = require("../CalculationDetails");

var _CalculationDetails2 = _interopRequireDefault(_CalculationDetails);

var _PropertyTaxDetails = require("../PropertyTaxDetails");

var _PropertyTaxDetails2 = _interopRequireDefault(_PropertyTaxDetails);

var _components = require("components");

var _api = require("egov-ui-kit/utils/api");

var _reactRedux = require("react-redux");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentForm = function (_Component) {
  (0, _inherits3.default)(PaymentForm, _Component);

  function PaymentForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentForm.__proto__ || Object.getPrototypeOf(PaymentForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      valueSelected: "Full_Amount",
      importantDates: {},
      totalAmountTobePaid: 0,
      errorText: "",
      pattern: false,
      minLength: 1,
      maxLength: 11,
      calculationDetails: false

    }, _this.getImportantDates = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var currentTenantId, ImpDatesResponse, _ImpDatesResponse$Mdm, Interest, FireCess, Rebate, Penalty, financialYr, intrest, fireCess, rebate, penalty;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              currentTenantId = _this.props.currentTenantId;
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], {
                MdmsCriteria: {
                  tenantId: currentTenantId,
                  moduleDetails: [{
                    moduleName: "PropertyTax",
                    masterDetails: [{
                      name: "Rebate"
                    }, {
                      name: "Penalty"
                    }, {
                      name: "Interest"
                    }, {
                      name: "FireCess"
                    }]
                  }]
                }
              });

            case 4:
              ImpDatesResponse = _context.sent;

              if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
                _ImpDatesResponse$Mdm = ImpDatesResponse.MdmsRes.PropertyTax, Interest = _ImpDatesResponse$Mdm.Interest, FireCess = _ImpDatesResponse$Mdm.FireCess, Rebate = _ImpDatesResponse$Mdm.Rebate, Penalty = _ImpDatesResponse$Mdm.Penalty;
                financialYr = _this.props.financialYr;
                intrest = (0, _PTCommon.findCorrectDateObjPenaltyIntrest)(financialYr, Interest);
                fireCess = (0, _PTCommon.findCorrectDateObj)(financialYr, FireCess);
                rebate = (0, _PTCommon.findCorrectDateObj)(financialYr, Rebate);
                penalty = (0, _PTCommon.findCorrectDateObjPenaltyIntrest)(financialYr, Penalty);

                _this.setState({
                  importantDates: {
                    intrest: intrest,
                    fireCess: fireCess,
                    rebate: rebate,
                    penalty: penalty
                  }
                });
              }
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              alert(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 8]]);
    })), _this.getErrorMessage = function (value) {
      var _ref3 = _this.props.estimationDetails[0] || {},
          totalAmount = _ref3.totalAmount;

      var errorText = "amount should be numeric";
      if (isFinite(value) && value >= totalAmount) {
        errorText = "can't be greater than " + (parseInt(totalAmount) - 1);
      } else if (isFinite(value) && value <= 100) {
        errorText = "can't be less than 100";
      }
      return errorText;
    }, _this.handleFieldChange = function (event, value) {
      var _ref4 = _this.props.estimationDetails[0] || {},
          totalAmount = _ref4.totalAmount;

      if (isNaN(parseFloat(value)) || !isFinite(value) || value >= totalAmount || value < 100) {
        _this.setState({
          errorText: _this.getErrorMessage(value)
        }, function () {
          _this.props.updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
        });
      } else {
        _this.setState({
          errorText: ""
        }, function () {
          _this.props.updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
        });
      }
    }, _this.updateTotalAmount = function (value) {
      return _this.props.updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
    }, _this.onRadioButtonChange = function (e) {
      var estimationDetails = _this.props.estimationDetails;

      var _ref5 = estimationDetails[0] || {},
          totalAmount = _ref5.totalAmount;

      if (e.target.value === "Full_Amount") {
        _this.setState({
          totalAmountTobePaid: totalAmount,
          valueSelected: "Full_Amount",
          errorText: ""
        }, function () {
          _this.updateTotalAmount(_this.props.totalAmountToBePaid);
        });
      } else {
        _this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" }, function () {
          _this.updateTotalAmount(100);
        });
      }
    }, _this.openCalculationDetails = function () {
      _this.setState({ calculationDetails: true });
    }, _this.closeCalculationDetails = function () {
      _this.setState({ calculationDetails: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PaymentForm, [{
    key: "componentDidMount",


    // componentWillReceiveProps(nextProps) {
    //   let { estimationDetails: nextEstimationDetails } = nextProps;
    //   const { totalAmountToBePaid } = this.state
    //   const { totalAmount: nextTotalAmount } = this.props.estimationDetails[0] || 0
    //   if (totalAmountToBePaid !== nextTotalAmount && !isNaN(parseFloat(nextTotalAmount)) && isFinite(nextTotalAmount)) {
    //     this.setState({
    //       totalAmountTobePaid: nextTotalAmount,
    //     })
    //   }
    // }

    value: function componentDidMount() {
      this.getImportantDates();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var handleFieldChange = this.handleFieldChange,
          onRadioButtonChange = this.onRadioButtonChange;
      var _state = this.state,
          valueSelected = _state.valueSelected,
          importantDates = _state.importantDates,
          errorText = _state.errorText;
      var _props = this.props,
          estimationDetails = _props.estimationDetails,
          totalAmountToBePaid = _props.totalAmountToBePaid,
          isPartialPaymentInValid = _props.isPartialPaymentInValid;

      var _ref6 = estimationDetails[0] || {},
          totalAmount = _ref6.totalAmount;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Card, {

          textChildren: _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-xs-12", style: { alignItems: "center" } },
            _react2.default.createElement(_PropertyTaxDetails2.default, {
              estimationDetails: estimationDetails,
              importantDates: importantDates,
              openCalculationDetails: this.openCalculationDetails,
              optionSelected: valueSelected
            }),
            !this.props.isCompletePayment && _react2.default.createElement(_CalculationDetails2.default, {
              open: this.state.calculationDetails,
              data: this.props.calculationScreenData,
              closeDialogue: function closeDialogue() {
                return _this3.closeCalculationDetails();
              }
            }),
            !isPartialPaymentInValid && _react2.default.createElement(_PaymentAmountDetails2.default, {
              value: valueSelected === "Partial_Amount" ? totalAmountToBePaid : totalAmount,
              onRadioButtonChange: onRadioButtonChange,
              handleFieldChange: handleFieldChange,
              optionSelected: valueSelected,
              totalAmount: totalAmount && totalAmount,
              estimationDetails: estimationDetails,
              errorText: errorText
            })
          )
        })
      );
    }
  }]);
  return PaymentForm;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch({ type: "SET_ROUTE", route: route });
    }
  };
};
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(PaymentForm);