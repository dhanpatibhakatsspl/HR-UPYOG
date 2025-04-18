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

var _components = require("components");

var _actions = require("egov-ui-kit/redux/properties/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

var _PTCommon = require("../../../../../../../utils/PTCommon");

var _HistoryCard = require("../../../../../Property/components/HistoryCard");

var _HistoryCard2 = _interopRequireDefault(_HistoryCard);

var _AssessmentHistory = require("../AssessmentHistory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentHistory = function (_Component) {
    (0, _inherits3.default)(PaymentHistory, _Component);

    function PaymentHistory(props) {
        (0, _classCallCheck3.default)(this, PaymentHistory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PaymentHistory.__proto__ || Object.getPrototypeOf(PaymentHistory)).call(this, props));

        _this.state = {
            items: [],
            showItems: false,
            errorMessage: "PT_PAYMENT_HISTORY_ERROR"
        };
        return _this;
    }

    (0, _createClass3.default)(PaymentHistory, [{
        key: "getBillPeriod",
        value: function getBillPeriod() {
            var billDetails = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var latest = billDetails.sort(function (x, y) {
                return y.fromPeriod - x.fromPeriod;
            });
            var billPeriod = (0, _PTCommon.getFormattedDate)(latest[latest.length - 1].fromPeriod) + ' to ' + (0, _PTCommon.getFormattedDate)(latest[0].toPeriod);
            return billPeriod;
        }
    }, {
        key: "getTransformedPaymentHistory",
        value: function getTransformedPaymentHistory() {
            var _this2 = this;

            var labelStyle = {
                letterSpacing: 1.2,
                fontWeight: "600",
                lineHeight: "35px"
            };
            var buttonStyle = {
                float: 'right',
                lineHeight: "35px",
                height: "35px",
                backgroundColor: "rgb(242, 242, 242)",
                boxShadow: "none",
                border: "1px solid rgb(254, 122, 81)",
                borderRadius: "2px",
                outline: "none",
                alignItems: "right"
            };
            var _props = this.props,
                _props$Payments = _props.Payments,
                Payments = _props$Payments === undefined ? [] : _props$Payments,
                downloadReceipt = _props.downloadReceipt;

            var paymentHistoryItems = Payments.map(function (payment, index) {
                var amount = payment.totalAmountPaid == 0 ? '0' : payment.totalAmountPaid;
                return _react2.default.createElement(
                    "div",
                    null,
                    (0, _AssessmentHistory.getFullRow)("PT_HISTORY_RECEIPT_NO", payment.paymentDetails[0].receiptNumber ? '' + payment.paymentDetails[0].receiptNumber : "NA", 12),
                    (0, _AssessmentHistory.getFullRow)("PT_HISTORY_AMOUNT_PAID", amount ? 'Rs ' + amount : "PT_NA", 12),
                    (0, _AssessmentHistory.getFullRow)("PT_HISTORY_PAYMENT_STATUS", payment.paymentStatus ? "CS_" + payment.paymentStatus : "PT_NA", 12),
                    (0, _AssessmentHistory.getFullRow)("PT_HISTORY_PAYMENT_DATE", payment.transactionDate ? (0, _PTCommon.getFormattedDate)(payment.transactionDate) : "NA", 12),
                    (0, _AssessmentHistory.getFullRow)("PT_HISTORY_BILL_NO", payment.paymentDetails[0].bill.billNumber ? '' + payment.paymentDetails[0].bill.billNumber : "NA", 12),
                    (0, _AssessmentHistory.getFullRow)("PT_HISTORY_BILL_PERIOD", _this2.getBillPeriod(payment.paymentDetails[0].bill.billDetails), 6),
                    _react2.default.createElement(
                        "div",
                        { className: "col-sm-6 col-xs-12", style: { marginBottom: 10, marginTop: 5 } },
                        _react2.default.createElement(
                            "div",
                            { className: "assess-history", style: { float: "right" } },
                            _react2.default.createElement(_components.Button, {
                                label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_DOWNLOAD_RECEIPT", color: "rgb(254, 122, 81)", fontSize: "16px", height: "35px", labelStyle: labelStyle }),
                                buttonStyle: buttonStyle,
                                onClick: function onClick() {
                                    var receiptQueryString = [{ key: "consumerCode", value: (0, _get2.default)(payment, 'paymentDetails[0].bill.consumerCode') }, { key: "tenantId", value: payment.paymentDetails[0].tenantId }, { key: "bussinessService", value: 'PT' }];
                                    downloadReceipt(receiptQueryString);
                                    // lastElement.onClick();
                                }
                            })
                        )
                    )
                );
            });
            return paymentHistoryItems;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props$Payments2 = this.props.Payments,
                Payments = _props$Payments2 === undefined ? [] : _props$Payments2;


            var paymentHistoryItem = [];
            if (Payments.length > 0) {
                paymentHistoryItem = this.getTransformedPaymentHistory();
            }
            var items = this.state.showItems ? this.state.items : [];
            var errorMessage = this.state.showItems && items.length == 0 ? this.state.errorMessage : '';
            return _react2.default.createElement(_HistoryCard2.default, { header: 'PT_PAYMENT_HISTORY', items: items, errorMessage: errorMessage, onHeaderClick: function onHeaderClick() {
                    console.log("clicked");
                    _this3.setState({ showItems: !_this3.state.showItems, items: paymentHistoryItem });
                } });
        }
    }]);
    return PaymentHistory;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    var _ref = state.properties || {},
        _ref$Bill = _ref.Bill,
        Bill = _ref$Bill === undefined ? [] : _ref$Bill,
        _ref$Payments = _ref.Payments,
        Payments = _ref$Payments === undefined ? [] : _ref$Payments;

    var propertyId = decodeURIComponent(ownProps.match.params.propertyId);

    return {
        propertyId: propertyId,
        Bill: Bill,
        Payments: Payments
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        downloadReceipt: function downloadReceipt(receiptQueryString) {
            return dispatch((0, _actions.downloadReceipt)(receiptQueryString));
        }
    };
};
//   [
//     { key: "consumerCodes", value: decodeURIComponent(this.props.match.params.propertyId) },
//     { key: "tenantId", value: this.props.match.params.tenantId }
// //   ]

exports.default = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(PaymentHistory);