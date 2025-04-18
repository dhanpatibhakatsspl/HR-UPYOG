"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require("components");

var _PTHeader = require("egov-ui-kit/common/common/PTHeader");

var _PTHeader2 = _interopRequireDefault(_PTHeader);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AcknowledgementCard = require("../AcknowledgementCard");

var _AcknowledgementCard2 = _interopRequireDefault(_AcknowledgementCard);

var _receipt = require("./Components/receipt");

var _receipt2 = _interopRequireDefault(_receipt);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
  fontWeight: 500
};
var PaymentStatus = function PaymentStatus(_ref) {
  var assessmentYear = _ref.assessmentYear,
      toggleYearDialogue = _ref.toggleYearDialogue,
      generalMDMSDataById = _ref.generalMDMSDataById,
      noExistingPropertyId = _ref.noExistingPropertyId,
      receiptUIDetails = _ref.receiptUIDetails,
      _ref$receiptDetails = _ref.receiptDetails,
      receiptDetails = _ref$receiptDetails === undefined ? {} : _ref$receiptDetails,
      propertyId = _ref.propertyId,
      floatingButtonColor = _ref.floatingButtonColor,
      icon = _ref.icon,
      messages = _ref.messages,
      buttons = _ref.buttons,
      primaryAction = _ref.primaryAction,
      tenantId = _ref.tenantId,
      receiptImageUrl = _ref.receiptImageUrl;
  var ReceiptNo = receiptDetails.ReceiptNo;

  if (!assessmentYear) {
    if (receiptDetails && receiptDetails.propertyDetails && receiptDetails.propertyDetails[0]) {
      assessmentYear = receiptDetails.propertyDetails[0].financialYear;
    }
  }
  var assessmentNumber = void 0;
  if (receiptDetails && receiptDetails.propertyDetails && receiptDetails.propertyDetails[0]) {
    assessmentNumber = receiptDetails.propertyDetails[0].assessmentNumber;
  }
  var headerValue = '(' + assessmentYear + ')';
  var header = 'PT_PAYMENT_HEADER';
  var subHeaderValue = propertyId;
  var paymentHeader = 'PT_PROPERTY_PAYMENT_SUCCESS';
  process.env.REACT_APP_NAME !== "Citizen" ? paymentHeader = 'PT_PROPERTY_PAYMENT_SUCCESS' : paymentHeader = 'PT_PAYMENT_SUCCESS_MESSAGE';
  var paymentMessage = 'PT_PROPERTY_PAYMENT_NOTIFICATION';
  process.env.REACT_APP_NAME !== "Citizen" ? paymentMessage = 'PT_PROPERTY_PAYMENT_NOTIFICATION' : paymentMessage = 'PT_PROPERTY_PAYMENT_CITIZEN_NOTIFICATION';
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { key: 1, style: { marginBottom: "50px" }, className: " col-md-12 col-lg-12" },
      _react2.default.createElement(_PTHeader2.default, { header: header, subHeaderTitle: "PT_PROPERTY_PTUID", headerValue: headerValue, subHeaderValue: subHeaderValue }),
      _react2.default.createElement(_AcknowledgementCard2.default, { acknowledgeType: "success", receiptHeader: "PT_PMT_RCPT_NO", messageHeader: paymentHeader, message: paymentMessage, receiptNo: ReceiptNo })
    ),
    _react2.default.createElement(
      "div",
      {
        id: "tax-wizard-buttons",
        className: "wizard-footer col-sm-10",
        style: { textAlign: "right" }
      },
      _react2.default.createElement(
        "div",
        { className: "button-container ", style: { float: "right" } },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true,
            label: "PT_ASSESS_PAY_FOR_NEW_YEAR",
            color: "#fe7a51" }),
          className: "pmt-status-back",
          onClick: function onClick() {
            toggleYearDialogue(assessmentNumber);
          },
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
          buttonStyle: { border: "1px solid #fe7a51" },
          style: {}
        }),
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_DOWNLOAD_RECEIPT", color: "#fff" }),
          className: "pmt-status-next",
          backgroundColor: "#fe7a51",
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
          buttonStyle: { border: 0 },
          onClick: function onClick() {
            (0, _receipt2.default)("pt-reciept-citizen", receiptDetails, {}, receiptImageUrl);
          }
        })
      )
    )
  );
};

exports.default = PaymentStatus;