"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFinalAssessments = exports.getTransactionsforCompletedAssessments = exports.getCompletedTransformedItems = exports.getTransformedItems = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _commons = require("egov-ui-kit/utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

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

var getTransformedItems = exports.getTransformedItems = function getTransformedItems(propertiesById, cities, localizationLabels) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr && curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        primaryText: _react2.default.createElement(_translationNode2.default, {
          label: "INR " + (0, _get2.default)(curr, "amountPaid"),
          fontSize: "16px",
          color: "#484848",
          bold: true,
          labelStyle: primaryTextLabelStyle
        }),

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
            label: (0, _commons.getCommaSeperatedAddress)(curr.address, cities),
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
        epocDate: item.assessmentDate,
        financialYear: item.financialYear,
        assessmentNo: item.assessmentNumber,
        propertyId: curr.propertyId,
        propertyDetails: item,
        property: curr,
        tenantId: curr.tenantId,
        date: (0, _commons.getDateFromEpoch)(item.assessmentDate),
        status: "Paid",
        consumerCode: curr.propertyId + ":" + item.assessmentNumber,
        receipt: true,
        localizationLabels: localizationLabels
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};

var getTransactionsforIncompleteAssessments = function getTransactionsforIncompleteAssessments(payments) {
  var failedTransactionsConsumercode = payments && Object.values(payments).map(function (transaction) {
    return transaction.consumerCode;
  });
  return failedTransactionsConsumercode && failedTransactionsConsumercode.reduce(function (result, current) {
    if (!result[current.split(":")[0]]) result[current.split(":")[0]] = [];
    result[current.split(":")[0]].push(current.split(":")[1]);
    return result;
  }, {});
};

var getCompletedTransformedItems = exports.getCompletedTransformedItems = function getCompletedTransformedItems(assessmentsByStatus, cities, localizationLabels) {
  return assessmentsByStatus && Object.values(assessmentsByStatus).map(function (item, index) {
    return {
      primaryText: _react2.default.createElement(
        "div",
        { className: "complated-assesment-info" },
        _react2.default.createElement(_translationNode2.default, {
          label: "INR " + (0, _get2.default)(item, "receiptInfo.totalAmount"),
          fontSize: "16px",
          color: "#484848",
          bold: true,
          labelStyle: primaryTextLabelStyle
        }),
        _react2.default.createElement(
          "div",
          { style: { height: "auto", marginTop: 0 } },
          _react2.default.createElement(_translationNode2.default, {
            label: item && item.financialYear,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: (0, _commons.getCommaSeperatedAddress)(item.address, cities),
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
        )
      ),
      // secondaryText: (
      //   <div style={{ height: "auto", marginTop: 0 }}>
      //     <Label label={item && item.financialYear} containerStyle={secondaryTextContainer} labelStyle={secondaryTextLabelStyle} color="#484848" />
      //     <Label
      //       label={getCommaSeperatedAddress(item.address, cities)}
      //       containerStyle={secondaryTextContainer}
      //       labelStyle={secondaryTextLabelStyle}
      //       color="#484848"
      //     />
      //     <Label
      //       label={`Assessment No.: ${item.assessmentNumber}`}
      //       containerStyle={secondaryTextContainer}
      //       labelStyle={secondaryTextLabelStyle}
      //       color="#484848"
      //     />
      //   </div>
      // ),
      epocDate: item.assessmentDate,
      financialYear: item.financialYear,
      assessmentNo: item.assessmentNumber,
      propertyId: item.propertyId,
      propertyDetails: item,
      property: item.property,
      tenantId: item.tenantId,
      date: (0, _commons.getDateFromEpoch)(item.assessmentDate),
      status: (0, _get2.default)(item, "receiptInfo.status"),
      consumerCode: item.propertyId + ":" + item.assessmentNumber,
      receipt: true,
      localizationLabels: localizationLabels,
      cities: cities
    };
  });
};

var getTransactionsforCompletedAssessments = exports.getTransactionsforCompletedAssessments = function getTransactionsforCompletedAssessments(payments) {
  var failedTransactionsConsumercode = payments && Object.values(payments).map(function (transaction) {
    return {
      consumerCode: transaction.moduleId,
      amountPaid: transaction.txnAmount
    };
  });
  return failedTransactionsConsumercode && failedTransactionsConsumercode.reduce(function (result, current) {
    if (!result[current.consumerCode.split(":")[0]]) result[current.consumerCode.split(":")[0]] = [];
    var resultValue = {
      assessmentNo: current.consumerCode.split(":")[1],
      amountPaid: current.amountPaid
    };
    result[current.consumerCode.split(":")[0]].push(resultValue);
    return result;
  }, {});
};

var getPropertiesByIdTransactions = function getPropertiesByIdTransactions(propertiesById, transactions) {
  return transactions && Object.keys(transactions).reduce(function (result, moduleId) {
    if (propertiesById[moduleId] && !result[moduleId]) result[moduleId] = [];
    if (propertiesById[moduleId]) {
      result[moduleId] = propertiesById[moduleId];
    }
    return result;
  }, {});
};

var filterData = function filterData(propertiesById, propertyName, ids) {
  return (0, _defineProperty3.default)({}, propertyName, (0, _extends3.default)({}, propertiesById[propertyName], {
    amountPaid: ids && ids[0] && ids[0].amountPaid && ids[0].amountPaid,
    propertyDetails: propertiesById && propertiesById[propertyName]["propertyDetails"] && propertiesById[propertyName]["propertyDetails"].filter(function (item) {
      return ids.indexOf(item.assessmentNumber) !== -1 || ids && ids[0] && ids[0].assessmentNo;
    })
  }));
};

var mergeFinalData = function mergeFinalData(propertiesById, failedTransObj) {
  return propertiesById && Object.keys(propertiesById).reduce(function (result, current) {
    result[current] = filterData(propertiesById, current, failedTransObj[current])[current];
    return result;
  }, {});
};

var getFinalAssessments = exports.getFinalAssessments = function getFinalAssessments(payments, propertiesById) {
  var url = window.location.pathname.includes("completed-assessments");
  var failedTransObj = url ? payments && getTransactionsforCompletedAssessments(payments) : payments && getTransactionsforIncompleteAssessments(payments);
  var failedProperties = failedTransObj && propertiesById && getPropertiesByIdTransactions(propertiesById, failedTransObj);
  return failedProperties && mergeFinalData(failedProperties, failedTransObj);
};