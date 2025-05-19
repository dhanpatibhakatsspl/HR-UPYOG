"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _Card = require("material-ui/Card");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdditionalDetails = function AdditionalDetails(_ref) {
  var estimationDetails = _ref.estimationDetails,
      importantDates = _ref.importantDates,
      optionSelected = _ref.optionSelected;

  var _ref2 = estimationDetails && estimationDetails[0] || {},
      taxHeadEstimates = _ref2.taxHeadEstimates,
      totalAmount = _ref2.totalAmount;

  var fireCess = importantDates.fireCess,
      intrest = importantDates.intrest,
      penalty = importantDates.penalty,
      rebate = importantDates.rebate;


  return _react2.default.createElement(
    _Card.Card,
    {
      style: { marginBottom: 20, padding: '16px', backgroundColor: "rgb(242, 242, 242)", boxShadow: 'none!important' },
      initiallyExpanded: true
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
              label: "Rs " + (totalAmount ? "" + (!(optionSelected === "Partial_Amount") ? parseInt(totalAmount) : parseInt(totalAmount - (0, _get2.default)(taxHeadEstimates[taxHeadEstimates.findIndex(function (item) {
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
          {
            className: "col-sm-6 col-xs-12",
            style: {
              backgroundColor: "rgb(242, 242, 242)",
              marginRight: 100,
              padding: 16
            }
          },
          taxHeadEstimates && taxHeadEstimates.map(function (item, index) {
            return !(0, _isUndefined2.default)(item.estimateAmount) && _react2.default.createElement(
              "div",
              {
                key: index,
                className: "clearfix",
                style: { marginBottom: 8 }
              },
              _react2.default.createElement(
                "div",
                { className: "col-sm-9", style: { padding: 0 } },
                _react2.default.createElement(_translationNode2.default, { label: item.taxHeadCode })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-3" },
                _react2.default.createElement(_translationNode2.default, {
                  containerStyle: { textAlign: "right" },
                  className: "pt-rf-price",
                  label: (item.estimateAmount > 0 && (item.category === "EXEMPTION" || item.category === "REBATE") ? "- " : "") + ("" + (!(optionSelected === "Partial_Amount" && item.taxHeadCode.toLowerCase().indexOf("rebate") !== -1) ? item.estimateAmount : 0))
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
              { className: "col-sm-9", style: { padding: 0 } },
              _react2.default.createElement(_translationNode2.default, { label: "PT_FORM4_TOTAL" })
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-3" },
              _react2.default.createElement(_translationNode2.default, {
                containerStyle: { textAlign: "right" },
                labelStyle: {
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#fe7a51"
                },
                label: totalAmount ? "" + (!(optionSelected === "Partial_Amount") ? parseInt(totalAmount) : parseInt(totalAmount - (0, _get2.default)(taxHeadEstimates[taxHeadEstimates.findIndex(function (item) {
                  return item.taxHeadCode.toLowerCase().indexOf("rebate") !== -1;
                })], "estimateAmount", 0))) : totalAmount === 0 ? "0" : "NA"
              })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "col-sm-6 col-xs-12 date-details-container", style: {
              backgroundColor: "white" } },
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
};

exports.default = AdditionalDetails;