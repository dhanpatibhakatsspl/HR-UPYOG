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

var _reactRedux = require("react-redux");

var _common = require("modules/common");

var _components = require("components");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _PaymentStatus = require("egov-ui-kit/common/propertyTax/PaymentStatus");

var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);

var _createReceipt = require("egov-ui-kit/common/propertyTax/PaymentStatus/Components/createReceipt");

var _actions = require("egov-ui-kit/redux/properties/actions");

var _api = require("egov-ui-kit/utils/api");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _AcknowledgementCard = require("egov-ui-kit/common/propertyTax/AcknowledgementCard");

var _AcknowledgementCard2 = _interopRequireDefault(_AcknowledgementCard);

var _PTHeader = require("egov-ui-kit/common/common/PTHeader");

var _PTHeader2 = _interopRequireDefault(_PTHeader);

var _ActionFooter = require("egov-ui-kit/common/common/ActionFooter");

var _ActionFooter2 = _interopRequireDefault(_ActionFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttons = {
  button2: "Retry"
};

var failureMessages = function failureMessages(billAmount) {
  return {
    Message1: _react2.default.createElement(_translationNode2.default, {
      containerStyle: { paddingTop: "30px" },
      fontSize: 16,
      label: "PT_OOPS",
      labelStyle: { color: "#484848", fontWeight: 500 }
    }),
    Message2: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        null,
        billAmount ? _react2.default.createElement(
          "div",
          {
            "class": "rainmaker-displayInline",
            style: { justifyContent: "center" }
          },
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { paddingTop: "10px" },
            fontSize: 16,
            label: "PT_RECEIPT_FAILURE_MESSAGE1",
            labelStyle: { color: "#484848", fontWeight: 500 }
          }),
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { paddingTop: "10px", margin: "0 3px" },
            fontSize: 16,
            label: billAmount,
            labelStyle: { color: "#484848", fontWeight: 500 }
          }),
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { paddingTop: "10px" },
            fontSize: 16,
            label: "PT_RECEIPT_FAILURE_MESSAGE2",
            labelStyle: { color: "#484848", fontWeight: 500 }
          })
        ) : _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { paddingTop: "10px" },
            fontSize: 16,
            label: "PT_RECEIPT_FAILURE_MESSAGE",
            labelStyle: { color: "#484848", fontWeight: 500 }
          })
        )
      ),
      _react2.default.createElement(_translationNode2.default, {
        containerStyle: { paddingTop: "10px" },
        fontSize: 16,
        label: "PT_RECEIPT_FAILURE_MESSAGE3",
        labelStyle: { color: "#484848", fontWeight: 500 }
      })
    )
  };
};

var icon = _react2.default.createElement(_components.Icon, { action: "navigation", name: "close" });

var PaymentFailure = function (_Component) {
  (0, _inherits3.default)(PaymentFailure, _Component);

  function PaymentFailure() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentFailure);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentFailure.__proto__ || Object.getPrototypeOf(PaymentFailure)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      bill: []
    }, _this.getBill = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tenantId, assessmentNumber, assessmentYear, propertyId) {
        var queryObj;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryObj = [{ key: "propertyId", value: propertyId }, { key: "assessmentNumber", value: assessmentNumber }, { key: "assessmentYear", value: assessmentYear }, { key: "tenantId", value: tenantId }];

                try {
                  // const payload = await httpRequest(
                  //   "pt-calculator-v2/propertytax/_getbill",
                  //   "_create",
                  //   queryObj,
                  //   {}
                  // );
                  // this.setState({ bill: payload["Bill"] });
                } catch (e) {}
                return _context.abrupt("return");

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchProperties = _this$props.fetchProperties,
          match = _this$props.match;
      var _match$params = match.params,
          tenantId = _match$params.tenantId,
          assessmentNumber = _match$params.assessmentNumber,
          assessmentYear = _match$params.assessmentYear,
          propertyId = _match$params.propertyId;

      fetchProperties([{ key: "propertyIds", value: match.params.propertyId }, { key: "tenantId", value: match.params.tenantId }]);
      _this.getBill(tenantId, assessmentNumber, assessmentYear, propertyId);
    }, _this.redirectToReview = function () {
      var _this$props2 = _this.props,
          match = _this$props2.match,
          history = _this$props2.history,
          assessmentNumber = _this$props2.assessmentNumber;
      var _match$params2 = match.params,
          assessmentYear = _match$params2.assessmentYear,
          propertyId = _match$params2.propertyId,
          tenantId = _match$params2.tenantId;

      history.push("/property-tax/assessment-form?assessmentId=" + assessmentNumber + "&purpose=assess&proceedToPayment=true&propertyId=" + propertyId + "&tenantId=" + tenantId + "&FY=" + assessmentYear);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PaymentFailure, [{
    key: "render",
    value: function render() {
      var bill = this.state.bill;
      var _props$match$params = this.props.match.params,
          txnAmount = _props$match$params.txnAmount,
          assessmentYear = _props$match$params.assessmentYear,
          propertyId = _props$match$params.propertyId;

      var amountPaid = (0, _get2.default)(bill[0], "billDetails[0].totalAmount");
      var _props = this.props,
          cities = _props.cities,
          selProperty = _props.selProperty,
          latestPropertyDetails = _props.latestPropertyDetails,
          extraData = _props.extraData;

      var receiptUIDetails = selProperty && bill && cities && txnAmount && (0, _createReceipt.createReceiptUIInfo)(selProperty, bill[0], cities, txnAmount, false, amountPaid, latestPropertyDetails);
      var messages = failureMessages(txnAmount);

      var headerValue = "(" + assessmentYear + ")";

      var header = "PT_PAYMENT_HEADER";
      var subHeaderValue = propertyId;
      var loading = this.props.loading;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            {
              key: 1,
              style: { marginBottom: "50px" },
              className: " col-md-12 col-lg-12"
            },
            _react2.default.createElement(_PTHeader2.default, {
              header: header,
              subHeaderTitle: "PT_PROPERTY_PTUID",
              headerValue: headerValue,
              subHeaderValue: subHeaderValue
            }),
            _react2.default.createElement(_AcknowledgementCard2.default, {
              acknowledgeType: "failed",
              receiptHeader: "PT_TRANSACTION_AMT",
              messageHeader: "PT_OOPS",
              message: "PT_FAILURE_MESSAGE",
              receiptNo: txnAmount ? 'Rs:' + txnAmount : txnAmount
            })
          ),
          _react2.default.createElement(_ActionFooter2.default, {
            key: 2,
            label2: "PT_RETRY_BUTTON",
            primaryAction: this.redirectToReview
          })
        )
      );
    }
  }]);
  return PaymentFailure;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _ref3 = state || {},
      properties = _ref3.properties,
      common = _ref3.common;

  var cities = common.cities;
  var propertiesById = properties.propertiesById,
      loading = properties.loading;

  var selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];
  var latestPropertyDetails = selProperty && (0, _PTCommon.getLatestPropertyDetails)(selProperty.propertyDetails);
  var assessmentNumber = void 0;
  if (latestPropertyDetails && latestPropertyDetails.assessmentNumber) {
    assessmentNumber = latestPropertyDetails.assessmentNumber;
  }
  return { selProperty: selProperty, cities: cities, latestPropertyDetails: latestPropertyDetails, loading: loading, assessmentNumber: assessmentNumber };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchProperties: function fetchProperties(queryObject) {
      return dispatch((0, _actions.fetchProperties)(queryObject));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PaymentFailure);