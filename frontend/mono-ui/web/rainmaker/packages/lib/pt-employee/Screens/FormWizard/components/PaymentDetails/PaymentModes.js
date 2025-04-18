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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _reactRedux = require("react-redux");

var _components = require("components");

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentModes = function (_Component) {
  (0, _inherits3.default)(PaymentModes, _Component);

  function PaymentModes() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentModes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentModes.__proto__ || Object.getPrototypeOf(PaymentModes)).call.apply(_ref, [this].concat(args))), _this), _this.allFormkeys = ["demandInfo", "chequeInfo", "cardInfo", "cashInfo"], _this.FormDetails = function (_ref2) {
      var _ref2$item = _ref2.item,
          item = _ref2$item === undefined ? {} : _ref2$item;
      var _item$forms = item.forms,
          forms = _item$forms === undefined ? [] : _item$forms;

      return _react2.default.createElement(
        "div",
        { className: "payment-filled-details" },
        forms.map(function (form, index) {
          var title = form.title,
              TransactionForm = form.comp,
              className = form.className;

          return _react2.default.createElement(
            "div",
            { className: className, key: index },
            _react2.default.createElement(_translationNode2.default, { className: "mode-title", label: title }),
            _react2.default.createElement(TransactionForm, { onIconClick: _this.onIconClick })
          );
        })
      );
    }, _this.getListItems = function (items) {
      var _this2 = _this,
          FormDetails = _this2.FormDetails;

      items.map(function (item, index) {
        var TransactionForm = item.form;
        return {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: item.primaryText, className: "list-header" }),
          secondaryText: _react2.default.createElement(_translationNode2.default, { label: item.secondaryText }),
          route: item.route,
          nestedItems: [{
            secondaryText: _react2.default.createElement(FormDetails, { item: item }),
            disabled: true,
            listContainerStyle: { padding: 0 }
          }]
        };
      });
    }, _this.onIconClick = function () {
      var _this$props = _this.props,
          ifscCode = _this$props.ifscCode,
          setFieldProperty = _this$props.setFieldProperty,
          formKey = _this$props.formKey,
          toggleSnackbarAndSetText = _this$props.toggleSnackbarAndSetText,
          handleFieldChange = _this$props.handleFieldChange;

      if (ifscCode) {
        fetch("https://ifsc.razorpay.com/" + ifscCode).then(function (response) {
          return response.json();
        }).then(function (payload) {
          if (payload === "Not Found") {
            handleFieldChange(formKey, "BankName", "");
            handleFieldChange(formKey, "BankBranch", "");
            toggleSnackbarAndSetText(true, {
              labelName: "Bank details not found for this IFSC",
              labelKey: "ERR_BANK_DETAILS_NOT_FOUND_FOR_IFSC"
            }, "error");
          } else {
            setFieldProperty(formKey, "BankName", "hideField", false);
            setFieldProperty(formKey, "BankBranch", "hideField", false);
            var bankName = (0, _get2.default)(payload, "BANK");
            var bankBranch = (0, _get2.default)(payload, "BRANCH");
            handleFieldChange(formKey, "BankName", bankName);
            handleFieldChange(formKey, "BankBranch", bankBranch);
          }
        }).catch(function (error) {});
      }
    }, _this.getPaymentDetails = function () {
      var _this3 = _this,
          FormDetails = _this3.FormDetails;
      var _this$props2 = _this.props,
          currentPaymentMode = _this$props2.currentPaymentMode,
          paymentModeDetails = _this$props2.paymentModeDetails,
          removeForm = _this$props2.removeForm,
          form = _this$props2.form;

      var paymentData = paymentModeDetails.find(function (paymentMode) {
        return paymentMode.code.toLowerCase() === currentPaymentMode.toLowerCase();
      });
      return FormDetails({ item: paymentData });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PaymentModes, [{
    key: "render",
    value: function render() {
      var PaymentModeSelector = this.props.PaymentModeSelector;

      return _react2.default.createElement(_components.Card, {
        style: {
          backgroundColor: "rgb(242, 242, 242)", boxShadow: 'none!important' },
        textChildren: _react2.default.createElement(
          "div",
          { className: "payment-modes", style: { backgroundColor: "rgb(242, 242, 242)!important" } },
          _react2.default.createElement(
            "div",
            {
              className: "payment-mode-header-cont rainmaker-displayInline",
              style: { padding: "0 0 0 16px", backgroundColor: "rgb(242, 242, 242)!important", alignItems: "center" }
            },
            _react2.default.createElement(_translationNode2.default, {
              label: "PT_PAYMENTMODE_MODES_OF_PAYMENT",
              fontSize: 16,
              bold: true,
              dark: true,
              containerStyle: { marginLeft: 8 }
            })
          ),
          _react2.default.createElement(PaymentModeSelector, null),
          this.getPaymentDetails()
        )
      });
    }
  }]);
  return PaymentModes;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var currentPaymentMode = state && state.form && state.form.paymentModes && state.form.paymentModes.fields.mode.value || "cash";
  var ifscCode = (0, _get2.default)(state, "form" + (currentPaymentMode === "Cheque" ? "[chequeInfo]" : "[demandInfo]") + ".fields.ifscCode.value");
  var formKey = currentPaymentMode === "Cheque" ? "chequeInfo" : "demandInfo";
  return { currentPaymentMode: currentPaymentMode, ifscCode: ifscCode, formKey: formKey };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initForm: function initForm(form) {
      return dispatch((0, _actions.initForm)(form));
    },
    removeForm: function removeForm(formKey) {
      return dispatch((0, _actions.removeForm)(formKey));
    },
    setFieldProperty: function setFieldProperty(formKey, fieldKey, propertyName, propertyValue) {
      return dispatch((0, _actions.setFieldProperty)(formKey, fieldKey, propertyName, propertyValue));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PaymentModes);