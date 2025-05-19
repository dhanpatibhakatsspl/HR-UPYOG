"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _components = require("components");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
  fontFamily: "Roboto",
  fontSize: 16,
  fontWeight: 500,
  fontStyle: "normal",
  letterSpacing: 0.7,
  color: "#484848",
  marginLeft: 14
};

var AddRebateExemption = function (_React$Component) {
  (0, _inherits3.default)(AddRebateExemption, _React$Component);

  function AddRebateExemption() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AddRebateExemption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddRebateExemption.__proto__ || Object.getPrototypeOf(AddRebateExemption)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showExtraPenaltyField: false,
      showExtraExemptField: false,
      exemptValue: null,
      initialTaxValue: 0,
      isTaxValueInitialized: false
    }, _this.validateForm = function () {
      var _this$props = _this.props,
          adhocPenalty = _this$props.adhocPenalty,
          adhocPenaltyReason = _this$props.adhocPenaltyReason,
          adhocOtherPenaltyReason = _this$props.adhocOtherPenaltyReason,
          adhocExemption = _this$props.adhocExemption,
          adhocExemptionReason = _this$props.adhocExemptionReason,
          adhocOtherExemptionReason = _this$props.adhocOtherExemptionReason;

      if (adhocPenaltyReason == 'Others' && !(adhocOtherPenaltyReason && adhocOtherPenaltyReason.length > 0) || adhocExemptionReason == 'Others' && !(adhocOtherExemptionReason && adhocOtherExemptionReason.length > 0)) {
        alert('Enter Other Reason');
        return false;
      }
      if (adhocPenalty && adhocPenalty != '' && Number(adhocPenalty) > 0 && (!adhocPenaltyReason || adhocPenaltyReason.length == 0)) {
        alert('Select any Reason');
        return false;
      } else if (adhocExemption && adhocExemption != '' && Number(adhocExemption) > 0 && (!adhocExemptionReason || adhocExemptionReason.length == 0)) {
        alert('Select any Reason');
        return false;
      }
      return true;
    }, _this.onChangePenaltyField = function (value) {
      var show = false;
      var setFieldProperty = _this.props.setFieldProperty;

      if (value === "Others") {
        show = true;
        setFieldProperty("additionalRebate", "otherPenaltyReason", "required", true);
      } else {
        show = false;
        setFieldProperty("additionalRebate", "otherPenaltyReason", "required", false);
      }
      _this.setState({
        showExtraPenaltyField: show
      });
      _this.props.prepareFinalObject("adhocExemptionPenalty.adhocPenaltyReason", value);
    }, _this.onChangeExemptField = function (value) {
      var show = false;
      var setFieldProperty = _this.props.setFieldProperty;

      if (value === "Others") {
        show = true;
        setFieldProperty("additionalRebate", "otherExemptionReason", "required", true);
      } else {
        show = false;
        setFieldProperty("additionalRebate", "otherExemptionReason", "required", false);
      }
      _this.setState({
        showExtraExemptField: show
      });
      _this.props.prepareFinalObject("adhocExemptionPenalty.adhocExemptionReason", value);
    }, _this.updateValueToEstimate = function () {
      var _this$props2 = _this.props,
          adhocPenalty = _this$props2.adhocPenalty,
          adhocExemption = _this$props2.adhocExemption,
          estimateResponse = _this$props2.estimateResponse,
          prepareFinalObject = _this$props2.prepareFinalObject;


      adhocPenalty = adhocPenalty && adhocPenalty != '' ? Number.parseInt(adhocPenalty) : 0;
      adhocExemption = adhocExemption && adhocExemption != '' ? Number.parseInt(adhocExemption) : 0;
      estimateResponse = (0, _formUtils.getFormattedEstimate)(estimateResponse, adhocPenalty, adhocExemption);
      /*  let { taxHeadEstimates, initialAmount: totalAmount, adhocPenaltyAmt: initialAdhocPenaltyAmt, adhocExemptionAmt: initialAdhocExemptionAmt } = estimateResponse[0] || {};
         let adhocPenaltyAmt = adhocPenalty && adhocPenalty != '' ? Number.parseInt(adhocPenalty) : 0
       let adhocExemptionAmt = adhocExemption && adhocExemption != '' ? Number.parseInt(adhocExemption) : 0
       taxHeadEstimates.map(taxHead => {
         if (taxHead.taxHeadCode == "PT_TIME_PENALTY") {
           taxHead.estimateAmount = initialAdhocPenaltyAmt + adhocPenaltyAmt;
         }
         if (taxHead.taxHeadCode == "PT_TIME_REBATE") {
           taxHead.estimateAmount = initialAdhocExemptionAmt + adhocExemptionAmt;
         }
       }
       );
       estimateResponse[0].totalAmount = totalAmount + adhocPenaltyAmt - adhocExemptionAmt; */
      prepareFinalObject('estimateResponse', [].concat((0, _toConsumableArray3.default)(estimateResponse)));
    }, _this.onSubmit = function () {
      var _this$props3 = _this.props,
          handleClose = _this$props3.handleClose,
          displayFormErrors = _this$props3.displayFormErrors,
          adhocPenalty = _this$props3.adhocPenalty,
          additionalRebate = _this$props3.additionalRebate,
          adhocExemption = _this$props3.adhocExemption,
          estimateResponse = _this$props3.estimateResponse;
      var exemptValue = _this.state.exemptValue;

      var _ref2 = estimateResponse[0] || {},
          taxHeadEstimates = _ref2.taxHeadEstimates,
          totalAmount = _ref2.totalAmount;

      var ownerExemption = 0;
      taxHeadEstimates.map(function (taxHead) {
        if (taxHead.taxHeadCode == "PT_TAX") {
          totalAmount = taxHead.estimateAmount;
        }
        if (taxHead.taxHeadCode == "PT_OWNER_EXEMPTION") {
          ownerExemption = taxHead.estimateAmount || 0;
        }
      });

      if (adhocExemption >= 0) {
        if (adhocExemption > totalAmount) {
          if (_this.validateForm(additionalRebate)) {
            alert("Adhoc Exemption cannot be greater than the estimated tax for the given property");
            return;
          } else {
            displayFormErrors("additionalRebate");
          }
        } else {
          if (_this.validateForm(additionalRebate)) {
            // exemptValue !== null &&
            // this.props.handleFieldChange("adhocExemption", exemptValue);
            // updateEstimate();
            if (ownerExemption + totalAmount == 0) {
              alert("Adhoc Exemption cannot be applied for the given property as it has owner exemption");
              return;
            }
            _this.updateValueToEstimate();
            handleClose();
          } else {
            displayFormErrors("additionalRebate");
          }
        }
        displayFormErrors("additionalRebate");
      }
      if (adhocPenalty >= 0) {
        if (!_this.validateForm(additionalRebate)) {
          displayFormErrors("additionalRebate");
        } else {
          _this.updateValueToEstimate();
          handleClose();
          // updateEstimate();
        }
      }
    }, _this.resetFields = function () {
      _this.props.prepareFinalObject('adhocExemptionPenalty', {});
    }, _this.componentDidMount = function () {
      _this.resetFields();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AddRebateExemption, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          adhocPenalty = _props.adhocPenalty,
          adhocPenaltyReason = _props.adhocPenaltyReason,
          adhocOtherPenaltyReason = _props.adhocOtherPenaltyReason,
          adhocExemption = _props.adhocExemption,
          adhocExemptionReason = _props.adhocExemptionReason,
          adhocOtherExemptionReason = _props.adhocOtherExemptionReason,
          estimateResponse = _props.estimateResponse,
          prepareFinalObject = _props.prepareFinalObject,
          fields = _props.fields;

      var _ref3 = fields || {},
          adhocPenaltyForm = _ref3.adhocPenalty,
          adhocPenaltyReasonForm = _ref3.adhocPenaltyReason,
          adhocExemptionForm = _ref3.adhocExemption,
          adhocExemptionReasonForm = _ref3.adhocExemptionReason,
          otherExemptionReasonForm = _ref3.otherExemptionReason,
          otherPenaltyReasonForm = _ref3.otherPenaltyReason;

      var _ref4 = estimateResponse[0] || {},
          taxHeadEstimates = _ref4.taxHeadEstimates,
          totalAmount = _ref4.totalAmount;

      taxHeadEstimates.map(function (taxHead) {
        if (taxHead.taxHeadCode == "PT_TAX") {
          totalAmount = taxHead.estimateAmount;
        }
      });
      // const { handleFieldChange, fields,totalAmount } = this.props;
      var _state = this.state,
          showExtraExemptField = _state.showExtraExemptField,
          showExtraPenaltyField = _state.showExtraPenaltyField,
          exemptValue = _state.exemptValue;
      // let {
      //   adhocPenalty,
      //   adhocPenaltyReason,
      //   adhocExemption,
      //   adhocExemptionReason,
      //   otherExemptionReason,
      //   otherPenaltyReason
      // } = fields || {};

      if (!sessionStorage.getItem('taxValue')) {
        sessionStorage.setItem('taxValue', totalAmount);
      }
      if (!this.state.isTaxValueInitialized) {

        this.setState({
          isTaxValueInitialized: true,
          initialTaxValue: totalAmount
        });
      }
      // adhocExemption = { ...adhocExemption, value: exemptValue };


      //     adhocPenalty
      // adhocPenaltyReason
      // adhocExemption
      // adhocExemptionReason
      return _react2.default.createElement(
        "div",
        { className: "add-rebate-box" },
        _react2.default.createElement(
          "div",
          { className: "pt-emp-penalty-charges col-xs-12" },
          _react2.default.createElement(_translationNode2.default, {
            label: "PT_ADDITIONAL_CHARGES",
            className: "rebate-box-labels",
            labelStyle: labelStyle
          }),
          _react2.default.createElement(
            "div",
            { className: "adhocPenalty col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              onChange: function onChange(e, value) {
                return prepareFinalObject("adhocExemptionPenalty.adhocPenalty", value);
              }
              // {...adhocPenalty}
            }, adhocPenaltyForm, {
              value: adhocPenalty

            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "adhocPenaltyReason col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.DropDown, (0, _extends3.default)({
              onChange: function onChange(e) {
                return _this2.onChangePenaltyField(e.target.innerText);
              }
            }, adhocPenaltyReasonForm, {
              value: adhocPenaltyReason
            }))
          ),
          showExtraPenaltyField && _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              onChange: function onChange(e, value) {
                return prepareFinalObject("adhocExemptionPenalty.adhocOtherPenaltyReason", value);
              },
              fullWidth: true
            }, otherPenaltyReasonForm, {
              value: adhocOtherPenaltyReason
            }))
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "pt-emp-rebate-charges col-xs-12" },
          _react2.default.createElement(_translationNode2.default, {

            label: "PT_ADDITIONAL_REBATE",
            labelStyle: labelStyle }),
          _react2.default.createElement(
            "div",
            { className: "adhocExemption col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              onChange: function onChange(e, value) {
                return prepareFinalObject("adhocExemptionPenalty.adhocExemption", value);
              }
            }, adhocExemptionForm, {
              value: adhocExemption
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "adhocExemptionReason col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.DropDown, (0, _extends3.default)({
              onChange: function onChange(e) {
                return _this2.onChangeExemptField(e.target.innerText);
              }
            }, adhocExemptionReasonForm, {
              value: adhocExemptionReason
            }))
          ),
          showExtraExemptField && _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              onChange: function onChange(e, value) {
                return prepareFinalObject("adhocExemptionPenalty.adhocOtherExemptionReason", value);
              },
              fullWidth: true
            }, otherExemptionReasonForm, {
              value: adhocOtherExemptionReason
            }))
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "pt-rebate-box-btn" },
          _react2.default.createElement(_components.Button, {
            primary: true,
            style: {
              boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)"
            },
            className: "add-rebate-action-button",
            onClick: this.onSubmit,
            buttonLabel: true,
            label: _react2.default.createElement(_translationNode2.default, { label: "CS_COMMON_SUBMIT", buttonLabel: true })
          })
        )
      );
    }
  }]);
  return AddRebateExemption;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration,
      form = state.form;
  var _form$additionalRebat = form.additionalRebate,
      additionalRebate = _form$additionalRebat === undefined ? {} : _form$additionalRebat;
  var _additionalRebate$fie = additionalRebate.fields,
      fields = _additionalRebate$fie === undefined ? {} : _additionalRebate$fie;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.estimateResponse,
      estimateResponse = _preparedFinalObject$ === undefined ? [] : _preparedFinalObject$,
      _preparedFinalObject$2 = preparedFinalObject.adhocExemptionPenalty,
      adhocExemptionPenalty = _preparedFinalObject$2 === undefined ? {} : _preparedFinalObject$2;
  var adhocPenalty = adhocExemptionPenalty.adhocPenalty,
      adhocPenaltyReason = adhocExemptionPenalty.adhocPenaltyReason,
      adhocOtherPenaltyReason = adhocExemptionPenalty.adhocOtherPenaltyReason,
      adhocExemption = adhocExemptionPenalty.adhocExemption,
      adhocExemptionReason = adhocExemptionPenalty.adhocExemptionReason,
      adhocOtherExemptionReason = adhocExemptionPenalty.adhocOtherExemptionReason;


  return {
    adhocPenalty: adhocPenalty,
    adhocPenaltyReason: adhocPenaltyReason, adhocOtherPenaltyReason: adhocOtherPenaltyReason,
    adhocExemption: adhocExemption,
    adhocExemptionReason: adhocExemptionReason, adhocOtherExemptionReason: adhocOtherExemptionReason, estimateResponse: [].concat((0, _toConsumableArray3.default)(estimateResponse)), fields: fields
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setFieldProperty: function setFieldProperty(formKey, fieldKey, propertyName, propertyValue) {
      return dispatch((0, _actions2.setFieldProperty)(formKey, fieldKey, propertyName, propertyValue));
    },
    displayFormErrors: function displayFormErrors(formKey) {
      return dispatch((0, _actions2.displayFormErrors)(formKey));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddRebateExemption);