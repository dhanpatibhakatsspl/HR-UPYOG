"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompletedTransformedItems = exports.getTransformedItems = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _commons = require("egov-ui-kit/utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 5
};

var getTransformedItems = exports.getTransformedItems = function getTransformedItems(propertiesById) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "INR 1300.00", fontSize: "16px", color: "#484848", bold: true, labelStyle: primaryTextLabelStyle }),

        secondaryText: _react2.default.createElement(
          "div",
          { style: { height: "auto", marginTop: 0 } },
          _react2.default.createElement(_translationNode2.default, {
            label: item && item.financialYear,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: (0, _commons.getCommaSeperatedAddress)(curr.address.buildingName, curr.address.street),
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "Assessment No.: " + item.assessmentNumber,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          })
        ),
        date: (0, _commons.getDateFromEpoch)(item.assessmentDate),
        status: "Paid",

        receipt: true
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};

var getCompletedTransformedItems = exports.getCompletedTransformedItems = function getCompletedTransformedItems() {
  var assessmentsByStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var cities = arguments[1];
  var localizationLabels = arguments[2];
  var propertyId = arguments[3];
  var property = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  assessmentsByStatus.sort(function (x, y) {
    return x.financialYear.localeCompare(y.financialYear);
  });
  return assessmentsByStatus && Object.values(assessmentsByStatus).map(function (item, index) {
    return {
      primaryText: _react2.default.createElement(
        "div",
        { className: "assesment-history-info", style: { backgroundColor: 'rgb(242, 242, 242)' } },
        _react2.default.createElement(
          "div",
          { style: { height: "auto", marginTop: 0 } },
          _react2.default.createElement(
            "div",
            { style: { padding: "5px 0px 0px 0px" }, className: "pt-assessment-info  " },
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-key" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "19px" },
                label: "PT_ASSESSMENT_YEAR",
                fontSize: "15px"
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-value" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 1.87)", fontWeight: "400", lineHeight: "19px" },
                label: "  " + (item && item.financialYear),
                fontSize: "15px"
              })
            )
          ),
          (0, _get2.default)(item, "receiptInfo.totalAmount") != null && _react2.default.createElement(
            "div",
            { style: { padding: "5px 0px 0px 0px" }, className: "pt-assessment-info  " },
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-key" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "19px" },
                label: "PT_AMOUNT_PAID",
                fontSize: "15px"
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-value" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 1.87)", fontWeight: "400", lineHeight: "19px" },
                label: " Rs " + (0, _get2.default)(item, "receiptInfo.totalAmount"),
                fontSize: "15px"
              })
            )
          ),
          _react2.default.createElement(
            "div",
            { style: { padding: "5px 0px 0px 0px" }, className: "pt-assessment-info  " },
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-key" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "19px" },
                label: "PT_ASSESSMENT_NO",
                fontSize: "15px"
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-value" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 1.87)", fontWeight: "400", lineHeight: "19px" },
                label: "  " + item.assessmentNumber,
                fontSize: "15px"
              })
            )
          ),
          _react2.default.createElement("div", { style: { padding: "5px 0px 0px 0px" }, className: "pt-assessment-info  " }),
          _react2.default.createElement(
            "div",
            { style: { padding: "5px 0px 0px 0px" }, className: "pt-assessment-info  " },
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-key" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "19px" },
                label: "PT_ASSESSMENT_DATE",
                fontSize: "15px"
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-assessment-value" },
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 1.87)", fontWeight: "400", lineHeight: "19px" },
                label: "  " + (0, _commons.getDateFromEpoch)(item.assessmentDate),
                fontSize: "15px"
              })
            )
          )
        ),
        index !== Object.values(assessmentsByStatus).length - 1 && _react2.default.createElement(_Divider2.default, { style: { marginBottom: 0, marginTop: "15px" } })
      ),
      epocDate: item.assessmentDate,
      financialYear: item.financialYear,
      assessmentNo: item.assessmentNumber,
      latestAssessmentNumber: item.latestAssessmentNumber || item.assessmentNumber,
      propertyId: item.propertyId || propertyId || '',
      propertyDetails: item,
      property: item.property || property,
      tenantId: item.tenantId,
      status: (0, _get2.default)(item, "receiptInfo.status") || 'Pending',
      consumerCode: item.propertyId || propertyId || '',
      receipt: true,
      localizationLabels: localizationLabels,
      cities: cities
    };
  });
};