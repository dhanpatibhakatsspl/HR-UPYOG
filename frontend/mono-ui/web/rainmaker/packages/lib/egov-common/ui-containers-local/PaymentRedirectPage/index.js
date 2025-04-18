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

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentRedirect = function (_Component) {
  (0, _inherits3.default)(PaymentRedirect, _Component);

  function PaymentRedirect() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentRedirect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentRedirect.__proto__ || Object.getPrototypeOf(PaymentRedirect)).call.apply(_ref, [this].concat(args))), _this), _this.getBusinessServiceMdmsData = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tenantId) {
        var prepareFinalObject, mdmsBody, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                prepareFinalObject = _this.props.prepareFinalObject;
                mdmsBody = {
                  MdmsCriteria: {
                    tenantId: tenantId,
                    moduleDetails: [{
                      moduleName: "BillingService",
                      masterDetails: [{ name: "BusinessService" }]
                    }, {
                      moduleName: "common-masters",
                      masterDetails: [{ name: "uiCommonPay" }]
                    }]
                  }
                };
                _context.prev = 2;
                payload = null;
                _context.next = 6;
                return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

              case 6:
                payload = _context.sent;

                prepareFinalObject("businessServiceMdmsData", payload.MdmsRes);
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);

                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[2, 10]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.checkPublicSearch = function () {
      return (0, _commons.isPublicSearch)();
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var search, _this$props, reduxObj, prepareFinalObject, txnQuery, isPublicSearch, pgUpdateResponse, consumerCode, tenantId, url, ackFailureUrl, srcQuery, searchResponse, businessService, transactionId;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              search = _this.props.location.search;
              _this$props = _this.props, reduxObj = _this$props.reduxObj, prepareFinalObject = _this$props.prepareFinalObject;
              txnQuery = search.split('&')[0].replace('eg_pg_txnid', 'transactionId');

              console.log(txnQuery, 'txnQuery');
              isPublicSearch = _this.checkPublicSearch();
              _context2.prev = 5;
              _context2.next = 8;
              return (0, _api.httpRequest)("post", "pg-service/transaction/v1/_update" + txnQuery, "_update", [], {});

            case 8:
              pgUpdateResponse = _context2.sent;
              consumerCode = (0, _get2.default)(pgUpdateResponse, "Transaction[0].consumerCode");
              tenantId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].tenantId");

              if (!((0, _get2.default)(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE")) {
                _context2.next = 17;
                break;
              }

              url = "/egov-common/acknowledgement?status=" + "failure" + "&consumerCode=" + consumerCode + "&tenantId=" + tenantId + "&businessService=" + (0, _get2.default)(pgUpdateResponse, "Transaction[0].module", localStorage.getItem('pay-businessService'));
              ackFailureUrl = isPublicSearch ? "/withoutAuth" + url : url;

              _this.props.setRoute(ackFailureUrl);
              _context2.next = 24;
              break;

            case 17:
              srcQuery = "?tenantId=" + tenantId + "&consumerCodes=" + consumerCode;
              _context2.next = 20;
              return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)((0, _get2.default)(pgUpdateResponse, "Transaction[0].module", localStorage.getItem('pay-businessService')) || localStorage.getItem('pay-businessService')) + srcQuery, "_search", [], {});

            case 20:
              searchResponse = _context2.sent;
              businessService = (0, _get2.default)(searchResponse, "Payments[0].paymentDetails[0].businessService");
              transactionId = (0, _get2.default)(searchResponse, "Payments[0].paymentDetails[0].receiptNumber");

              _this.getBusinessServiceMdmsData(tenantId).then(function (response) {
                var commonPayDetails = (0, _get2.default)(reduxObj, "businessServiceMdmsData.common-masters.uiCommonPay");
                var index = commonPayDetails && commonPayDetails.findIndex(function (item) {
                  return item.code == businessService;
                });
                if (index > -1) {
                  prepareFinalObject("commonPayInfo", commonPayDetails[index]);
                } else {
                  var details = commonPayDetails.filter(function (item) {
                    return item.code === "DEFAULT";
                  });
                  prepareFinalObject("commonPayInfo", details);
                }
                var moduleName = "egov-common";
                if (businessService && businessService.indexOf("BPA") > -1) {
                  moduleName = "egov-bpa";
                }
                var url = "/" + moduleName + "/acknowledgement?status=" + "success" + "&consumerCode=" + consumerCode + "&tenantId=" + tenantId + "&receiptNumber=" + transactionId + "&businessService=" + businessService + "&purpose=" + "pay";
                var ackSuccessUrl = isPublicSearch ? "/withoutAuth" + url : url;
                _this.props.setRoute(ackSuccessUrl);
              });

            case 24:
              _context2.next = 29;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](5);

              alert(_context2.t0);

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[5, 26]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PaymentRedirect, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null);
    }
  }]);
  return PaymentRedirect;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var reduxObj = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
  return { reduxObj: reduxObj };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions2.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouterDom.withRouter)(PaymentRedirect));