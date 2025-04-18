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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _Card = require("material-ui/Card");

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

require("./index.css");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertyTaxDetails = function (_React$Component) {
  (0, _inherits3.default)(PropertyTaxDetails, _React$Component);

  function PropertyTaxDetails() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PropertyTaxDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PropertyTaxDetails.__proto__ || Object.getPrototypeOf(PropertyTaxDetails)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isExpanded: true
    }, _this.toggleExpander = function () {
      return _this.setState({
        isExpanded: !_this.state.isExpanded
      });
    }, _this.componentDidMount = function () {
      // document
      //   .getElementsByClassName("tax-calculation-card-header")[0]
      //   .addEventListener("click", this.toggleExpander);
      _this.props.prepareFinalObject('adhocExemptionPenalty', {});
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PropertyTaxDetails, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          estimationDetails = _props.estimationDetails,
          importantDates = _props.importantDates,
          addRebateBox = _props.addRebateBox,
          optionSelected = _props.optionSelected,
          openCalculationDetails = _props.openCalculationDetails,
          estimateResponse = _props.estimateResponse;

      // const { taxHeadEstimates, totalAmount } = estimationDetails[0] || {};

      var _ref2 = estimateResponse[0] || {},
          taxHeadEstimates = _ref2.taxHeadEstimates,
          totalAmount = _ref2.totalAmount;

      var fireCess = importantDates.fireCess,
          intrest = importantDates.intrest,
          penalty = importantDates.penalty,
          rebate = importantDates.rebate;
      var isExpanded = this.state.isExpanded;

      return _react2.default.createElement(
        _Card.Card,
        {
          style: { marginBottom: 20, "background-color": "rgb(242, 242, 242)", padding: '16px', boxShadow: 'none' }

        },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "clearfix fare-section" },
            _react2.default.createElement(
              "div",
              { className: "col-sm-12" },
              _react2.default.createElement(
                "div",
                { style: { float: 'left' } },
                _react2.default.createElement(_translationNode2.default, { label: "PT_HOME_PROPERTY_TAX", lineHeight: "19px", letterSpacing: "0.67px", fontSize: "18px", color: "rgba(0, 0, 0, 0.87)" })
              ),
              _react2.default.createElement(
                "div",
                { style: { float: 'right' } },
                _react2.default.createElement(_translationNode2.default, { label: "PT_TOTAL_AMOUNT" })
              )
            ),
            " "
          ),
          _react2.default.createElement(
            "div",
            { className: "clearfix fare-section" },
            _react2.default.createElement(
              "div",
              {
                className: "col-sm-12" },
              _react2.default.createElement(
                "div",
                { style: { float: 'right' } },
                _react2.default.createElement(_translationNode2.default, {
                  className: "property-dues-total-amount",
                  label: "Rs " + (totalAmount ? "" + (!(optionSelected === "Partial_Amount") ? parseInt(totalAmount) : parseInt(totalAmount - get(taxHeadEstimates[taxHeadEstimates.findIndex(function (item) {
                    return item.taxHeadCode.toLowerCase().indexOf("rebate") !== -1;
                  })], "estimateAmount", 0))) : totalAmount === 0 ? "0" : "NA"),
                  fontSize: "24px",
                  color: "#484848",
                  fontWeight: "600"
                })
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "clearfix fare-section" },
            _react2.default.createElement(
              "div",
              { className: "bill-details col-sm-6" },
              _react2.default.createElement(
                "div",
                {
                  className: "col-sm-10",
                  style: { backgroundColor: "rgb(242, 242, 242)", padding: 16 }
                },
                taxHeadEstimates && taxHeadEstimates.map(function (item, index) {
                  return !(0, _isUndefined2.default)(item.estimateAmount) && _react2.default.createElement(
                    "div",
                    { className: "clearfix", style: { marginBottom: 8 } },
                    _react2.default.createElement(
                      "div",
                      { className: "col-sm-9 col-xs-9", style: { padding: 0 } },
                      _react2.default.createElement(_translationNode2.default, { label: item.taxHeadCode })
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "col-sm-3 col-xs-3", style: { padding: 0, whiteSpace: "no-wrap" } },
                      _react2.default.createElement(_translationNode2.default, {
                        containerStyle: { textAlign: "right" },
                        className: "pt-rf-price",
                        label: (item.estimateAmount > 0 && (item.taxHeadCode === "PT_ADVANCE_CARRYFORWARD" || item.category === "EXEMPTION" || item.category === "REBATE") ? "" : "") + ("" + item.estimateAmount)
                      })
                    )
                  );
                }),
                _react2.default.createElement(_components.Divider, {
                  className: "reciept-divider",
                  inset: true,
                  lineStyle: { marginLeft: 0, marginRight: 0, height: 2 }
                }),
                _react2.default.createElement(
                  "div",
                  { className: "clearfix", style: { marginTop: 8 } },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-9 col-xs-9", style: { padding: 0 } },
                    _react2.default.createElement(_translationNode2.default, { label: "PT_FORM4_TOTAL" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-3 col-xs-3", style: { padding: 0 } },
                    _react2.default.createElement(_translationNode2.default, {
                      containerStyle: { textAlign: "right" },
                      labelStyle: {
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "#fe7a51"
                      },
                      label: "" + parseInt(totalAmount)
                    })
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                {
                  style: { padding: 0 },
                  className: "col-sm-6 rebate-button"
                },
                _react2.default.createElement(_FlatButton2.default, {
                  label: _react2.default.createElement(_translationNode2.default, {
                    label: "PT_CALCULATION_ADD_REBATE/CHARGES",
                    buttonLabel: true,
                    bold: true,
                    fontSize: "12px",
                    color: "rgb(254, 122, 81)"
                  }),
                  primary: true,
                  style: {
                    // float: "left",
                    height: 40,
                    lineHeight: "auto",
                    minWidth: "inherit"
                  },
                  onClick: function onClick() {
                    return addRebateBox(true);
                  }
                })
              ),
              " ",
              _react2.default.createElement(
                "div",
                {
                  style: { padding: 0 },
                  className: "col-sm-4 view-detail-button"

                },
                _react2.default.createElement(_FlatButton2.default, {
                  label: _react2.default.createElement(_translationNode2.default, {
                    label: "PT_CALCULATION_DETAILS",
                    buttonLabel: true,
                    bold: true,
                    fontSize: "12px",
                    color: "rgb(254, 122, 81)"
                  }),
                  primary: true,
                  style: {
                    height: 40,
                    lineHeight: "auto",
                    minWidth: "inherit"
                  },
                  onClick: function onClick() {
                    openCalculationDetails();
                  }
                })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6", style: { backgroundColor: 'white' } },
              _react2.default.createElement(
                "div",
                { className: "date-details" },
                _react2.default.createElement(_translationNode2.default, {
                  containerStyle: { marginBottom: 16 },
                  color: "#484848",
                  label: "PT_FORM4_IMPORTANT_DATES",
                  bold: true
                }),
                _react2.default.createElement(
                  "ul",
                  null,
                  rebate && rebate.endingDay && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                      "span",
                      null,
                      _react2.default.createElement(_translationNode2.default, {
                        label: "Last Date for Rebate (" + rebate.rate + "% of PT)"
                      })
                    ),
                    _react2.default.createElement(
                      "span",
                      null,
                      "" + rebate.endingDay
                    )
                  ),
                  penalty && penalty.startingDay && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                      "span",
                      null,
                      _react2.default.createElement(_translationNode2.default, {
                        label: "Penalty (" + penalty.rate + "% of PT) applied from"
                      })
                    ),
                    _react2.default.createElement(
                      "span",
                      null,
                      "" + penalty.startingDay
                    )
                  ),
                  intrest && intrest.startingDay && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                      "span",
                      null,
                      _react2.default.createElement(_translationNode2.default, {
                        label: "Interest (" + intrest.rate + "% p.a. daily) applied from"
                      })
                    ),
                    _react2.default.createElement(
                      "span",
                      null,
                      "" + intrest.startingDay
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return PropertyTaxDetails;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.estimateResponse,
      estimateResponse = _preparedFinalObject$ === undefined ? [] : _preparedFinalObject$;


  return {
    estimateResponse: [].concat((0, _toConsumableArray3.default)(estimateResponse))
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PropertyTaxDetails);