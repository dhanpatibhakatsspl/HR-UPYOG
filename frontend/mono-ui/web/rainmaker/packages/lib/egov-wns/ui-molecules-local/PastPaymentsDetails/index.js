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

var _reactRedux = require("react-redux");

var _BreadCrumbs = require("../../ui-atoms-local/BreadCrumbs");

var _BreadCrumbs2 = _interopRequireDefault(_BreadCrumbs);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _styles = require("@material-ui/core/styles");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _utils = require("../../ui-config/screens/specs/utils");

var _AssessmentList = require("../common/AssessmentList");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 0
};

var innerDivStyle = {
  padding: "0px",
  borderBottom: "1px solid #e0e0e0"
};
var styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

var PastPayments = function (_Component) {
  (0, _inherits3.default)(PastPayments, _Component);

  function PastPayments() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PastPayments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PastPayments.__proto__ || Object.getPrototypeOf(PastPayments)).call.apply(_ref, [this].concat(args))), _this), _this.iconStyle = {
      marginLeft: "10px",
      height: "20px"
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PastPayments, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          pastPaymentsDetails = _props.pastPaymentsDetails;

      var name = JSON.parse((0, _localStorageUtils.getUserInfo)()).name ? JSON.parse((0, _localStorageUtils.getUserInfo)()).name : "-";
      var date = function date(from, to) {
        if (from !== undefined && to !== 'NA') {
          return (0, _utils.convertEpochToDate)(from) + " - " + (0, _utils.convertEpochToDate)(to);
        } else {
          return "NA";
        }
      };
      var data = pastPaymentsDetails.map(function (element) {
        return _react2.default.createElement(
          "div",
          { style: { marginLeft: '0px', padding: '0px', position: 'relative', borderBottom: '1px solid  rgb(224, 224, 224)', flexgrow: 1 } },
          _react2.default.createElement(
            _Grid2.default,
            { container: true, spacing: 3 },
            _react2.default.createElement(
              _Grid2.default,
              { item: true, xs: 8 },
              _react2.default.createElement(
                "div",
                { className: "incomplete-assesment-info" },
                _react2.default.createElement(_translationNode2.default, {
                  label: "INR " + element.totalAmountPaid,
                  fontSize: "16px",
                  color: "#484848",
                  labelStyle: primaryTextLabelStyle,
                  bold: true
                }),
                _react2.default.createElement(
                  "div",
                  { style: { height: "auto" } },
                  _react2.default.createElement(_translationNode2.default, {
                    label: "" + date(element.paymentDetails[0].bill.billDetails[0].fromPeriod, element.paymentDetails[0].bill.billDetails[0].toPeriod),
                    labelStyle: secondaryTextLabelStyle,
                    fontSize: "14px",
                    containerStyle: secondaryTextContainer,
                    color: "#484848"
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { style: { height: "auto" } },
                  _react2.default.createElement(_translationNode2.default, {
                    label: "Consumer No : " + element.paymentDetails[0].bill.consumerCode,
                    labelStyle: secondaryTextLabelStyle,
                    fontSize: "14px",
                    containerStyle: secondaryTextContainer,
                    color: "#484848"
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { style: { height: "auto" } },
                  _react2.default.createElement(_translationNode2.default, {
                    label: "Owner Name : " + name,
                    labelStyle: secondaryTextLabelStyle,
                    fontSize: "14px",
                    containerStyle: secondaryTextContainer,
                    color: "#484848"
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { style: { height: "auto" } },
                  _react2.default.createElement(_translationNode2.default, {
                    label: "Amount Paid : " + element.totalAmountPaid,
                    labelStyle: secondaryTextLabelStyle,
                    fontSize: "14px",
                    containerStyle: secondaryTextContainer,
                    color: "#484848"
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { style: { height: "auto" } },
                  _react2.default.createElement(_translationNode2.default, {
                    label: element.payerAddress ? element.payerAddress : "NA",
                    labelStyle: secondaryTextLabelStyle,
                    fontSize: "14px",
                    containerStyle: secondaryTextContainer,
                    color: "#484848"
                  })
                )
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true, xs: 4, style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  placeContent: "flex-end"
                } },
              _react2.default.createElement(
                "div",
                { style: { textAlign: "end" } },
                _react2.default.createElement(_translationNode2.default, {
                  label: "" + (0, _utils.convertEpochToDate)(element.transactionDate),
                  fontSize: "14px",
                  color: "#484848",
                  labelStyle: primaryTextLabelStyle,
                  bold: false
                }),
                _react2.default.createElement(
                  "div",
                  { style: { height: "auto" } },
                  (0, _AssessmentList.getItemStatus)(element.totalDue, element.totalAmountPaid, element.paymentDetails[0].bill.tenantId, element.paymentDetails[0].bill.consumerCode, '', element.paymentDetails[0].businessService)
                )
              )
            )
          )
        );
      });
      return _react2.default.createElement(
        "div",
        { "class": "screen screen-with-bredcrumb" },
        _react2.default.createElement(_BreadCrumbs2.default, { url: urls, history: "", label: "WS_COMMON_PAST_PAYMENTS" }),
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(
            "div",
            { className: "rainmaker-card clearfix property-tax-card" },
            _react2.default.createElement(
              "div",
              { className: "list-main-card" },
              _react2.default.createElement(
                "div",
                { style: { padding: '0px 20px', background: 'rgb(255, 255, 255)' } },
                pastPaymentsDetails && pastPaymentsDetails.length > 0 ? data : _react2.default.createElement(
                  "div",
                  { style: {
                      display: "flex",
                      width: "100%",
                      height: '50vh',
                      alignItems: 'center',
                      justifyContent: "center",
                      textAlign: "center"
                    } },
                  _react2.default.createElement(_LabelContainer2.default, {
                    labelKey: "No results Found!"
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);
  return PastPayments;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var pastPaymentsForWater = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "pastPaymentsForWater", []);
  var pastPaymentsForSewerage = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "pastPaymentsForSewerage", []);
  var pastPaymentsDetails = pastPaymentsForWater.concat(pastPaymentsForSewerage);
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  return { screenConfig: screenConfig, pastPaymentsDetails: pastPaymentsDetails };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function (_setRoute) {
      function setRoute(_x) {
        return _setRoute.apply(this, arguments);
      }

      setRoute.toString = function () {
        return _setRoute.toString();
      };

      return setRoute;
    }(function (path) {
      return dispatch(setRoute(path));
    })
    // handleField: (screenKey, jsonPath, fieldKey, value) =>
    //   dispatch(handleField(screenKey, jsonPath, fieldKey, value))
  };
};
exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PastPayments));