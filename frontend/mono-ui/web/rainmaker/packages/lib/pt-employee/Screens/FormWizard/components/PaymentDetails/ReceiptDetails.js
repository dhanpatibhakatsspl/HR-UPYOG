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

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _forms = require("./forms");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReceiptInformationHoc = (0, _form2.default)({
  formKey: "receiptInfo",
  copyName: "receiptInfo",
  path: "PropertyTaxPay"
})(_forms.ReceiptInformation);

var ReceiptDetails = function (_Component) {
  (0, _inherits3.default)(ReceiptDetails, _Component);

  function ReceiptDetails() {
    (0, _classCallCheck3.default)(this, ReceiptDetails);
    return (0, _possibleConstructorReturn3.default)(this, (ReceiptDetails.__proto__ || Object.getPrototypeOf(ReceiptDetails)).apply(this, arguments));
  }

  (0, _createClass3.default)(ReceiptDetails, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_components.Card, {
        style: {
          backgroundColor: "rgb(242, 242, 242)", boxShadow: 'none'
        },
        textChildren: _react2.default.createElement(
          "div",
          { className: "receipt-details" },
          _react2.default.createElement(
            "div",
            {
              className: "rainmaker-displayInline",
              style: { paddingLeft: 4, alignItems: "center", boxShadow: 'none!important' }
            },
            _react2.default.createElement(_translationNode2.default, {
              label: "PT_G8_RECEIPT_LABEL",
              fontSize: 16,
              bold: true,
              dark: true,
              containerStyle: { marginLeft: 8 }
            })
          ),
          _react2.default.createElement(ReceiptInformationHoc, null)
        )
      });
    }
  }]);
  return ReceiptDetails;
}(_react.Component);

exports.default = ReceiptDetails;