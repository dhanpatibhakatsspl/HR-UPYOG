"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentModeInformation = exports.CardInformation = exports.ReceiptInformation = exports.DemandDraftInformation = exports.ChequeInformation = exports.CashInformation = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeDateToFormat = function changeDateToFormat(date) {
  var dateObj = new Date(date);
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var dt = dateObj.getDate();
  dt = dt < 10 ? "0" + dt : dt;
  month = month < 10 ? "0" + month : month;
  return dt + "-" + month + "-" + year;
};

var CashInformation = function CashInformation(_ref) {
  var form = _ref.form,
      formKey = _ref.formKey,
      handleFieldChange = _ref.handleFieldChange;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "clearfix" },
    _react2.default.createElement(
      "div",
      { className: "col-sm-12 general-form-cont-padding" },
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "paidBy", field: fields.paidBy, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement("div", { style: { height: 64, marginBottom: 14 } })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "payerName", field: fields.payerName, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "payerMobile", field: fields.payerMobile, handleFieldChange: handleFieldChange })
      )
    )
  );
};

var ChequeInformation = function ChequeInformation(_ref2) {
  var form = _ref2.form,
      formKey = _ref2.formKey,
      handleFieldChange = _ref2.handleFieldChange,
      onIconClick = _ref2.onIconClick;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "clearfix" },
    _react2.default.createElement(
      "div",
      { className: "col-sm-12 general-form-cont-padding" },
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "chequeNo", field: fields.chequeNo, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_components.DatePicker, (0, _extends3.default)({
          onChange: function onChange(first, object) {
            var e = { target: { value: object } };
            handleFieldChange("chequeDate", e.target.value);
          },
          formatDate: function formatDate(date) {
            return changeDateToFormat(date);
          },
          textFieldStyle: { cursor: "pointer" }
        }, fields.chequeDate)),
        _react2.default.createElement(
          "div",
          { className: "datepicker-icon", onClick: function onClick(e) {
              return e.preventDefault;
            } },
          _react2.default.createElement(_components.Icon, { action: "action", name: "date-range" })
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding ifsc-field" },
        _react2.default.createElement(_field2.default, { fieldKey: "ifscCode", field: fields.ifscCode, onTextFieldIconClick: onIconClick, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement("div", { className: "col-sm-6", style: { height: 72, marginTop: 14 } }),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "BankName", field: fields.BankName, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "BankBranch", field: fields.BankBranch, handleFieldChange: handleFieldChange })
      )
    )
  );
};

var ReceiptInformation = function ReceiptInformation(_ref3) {
  var form = _ref3.form,
      formKey = _ref3.formKey,
      handleFieldChange = _ref3.handleFieldChange;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "clearfix", style: { paddingLeft: 10 } },
    _react2.default.createElement(
      "div",
      { className: "col-sm-12 general-form-cont-padding" },
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "receiptNo", field: fields.receiptNo, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_components.DatePicker, (0, _extends3.default)({
          onChange: function onChange(first, object) {
            var e = { target: { value: object } };
            handleFieldChange("receiptDate", e.target.value);
          },
          formatDate: function formatDate(date) {
            return changeDateToFormat(date);
          },
          textFieldStyle: { cursor: "pointer" }
        }, fields.receiptDate)),
        _react2.default.createElement(
          "div",
          { className: "datepicker-icon", onClick: function onClick(e) {
              return e.preventDefault;
            } },
          _react2.default.createElement(_components.Icon, { action: "action", name: "date-range" })
        )
      )
    )
  );
};

var DemandDraftInformation = function DemandDraftInformation(_ref4) {
  var form = _ref4.form,
      formKey = _ref4.formKey,
      handleFieldChange = _ref4.handleFieldChange,
      onIconClick = _ref4.onIconClick;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "clearfix" },
    _react2.default.createElement(
      "div",
      { className: "col-sm-12 general-form-cont-padding" },
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "demandNo", field: fields.demandNo, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_components.DatePicker, (0, _extends3.default)({
          onChange: function onChange(first, object) {
            var e = { target: { value: object } };
            handleFieldChange("demandDate", e.target.value);
          },
          formatDate: function formatDate(date) {
            return changeDateToFormat(date);
          },
          textFieldStyle: { cursor: "pointer" }
        }, fields.demandDate)),
        _react2.default.createElement(
          "div",
          { className: "datepicker-icon", onClick: function onClick(e) {
              return e.preventDefault;
            } },
          _react2.default.createElement(_components.Icon, { action: "action", name: "date-range" })
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding ifsc-field" },
        _react2.default.createElement(_field2.default, { fieldKey: "ifscCode", field: fields.ifscCode, onTextFieldIconClick: onIconClick, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement("div", { className: "col-sm-6", style: { height: 72, marginTop: 14 } }),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "BankName", field: fields.BankName, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "BankBranch", field: fields.BankBranch, handleFieldChange: handleFieldChange })
      )
    )
  );
};

var CardInformation = function CardInformation(_ref5) {
  var form = _ref5.form,
      formKey = _ref5.formKey,
      handleFieldChange = _ref5.handleFieldChange;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "clearfix" },
    _react2.default.createElement(
      "div",
      { className: "col-sm-12 general-form-cont-padding" },
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "cardDigits", field: fields.cardDigits, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement("div", { style: { height: 64, marginBottom: 14 } })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "receiptNo", field: fields.receiptNo, handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-sm-6 general-field-padding" },
        _react2.default.createElement(_field2.default, { fieldKey: "confirmReceiptNo", field: fields.confirmReceiptNo, handleFieldChange: handleFieldChange })
      )
    )
  );
};

var PaymentModeInformation = function PaymentModeInformation(_ref6) {
  var form = _ref6.form,
      formKey = _ref6.formKey,
      handleFieldChange = _ref6.handleFieldChange;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "payment-mode-info" },
    _react2.default.createElement(_field2.default, { fieldKey: "mode", field: fields.mode, handleFieldChange: handleFieldChange })
  );
};

exports.CashInformation = CashInformation;
exports.ChequeInformation = ChequeInformation;
exports.DemandDraftInformation = DemandDraftInformation;
exports.ReceiptInformation = ReceiptInformation;
exports.CardInformation = CardInformation;
exports.PaymentModeInformation = PaymentModeInformation;