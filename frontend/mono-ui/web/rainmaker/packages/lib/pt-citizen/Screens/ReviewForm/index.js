"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _AssessmentInfo = require("egov-ui-kit/common/propertyTax/Property/components/AssessmentInfo");

var _AssessmentInfo2 = _interopRequireDefault(_AssessmentInfo);

var _DocumentsInfo = require("egov-ui-kit/common/propertyTax/Property/components/DocumentsInfo");

var _DocumentsInfo2 = _interopRequireDefault(_DocumentsInfo);

var _OwnerInfo = require("egov-ui-kit/common/propertyTax/Property/components/OwnerInfo");

var _OwnerInfo2 = _interopRequireDefault(_OwnerInfo);

var _PropertyAddressInfo = require("egov-ui-kit/common/propertyTax/Property/components/PropertyAddressInfo");

var _PropertyAddressInfo2 = _interopRequireDefault(_PropertyAddressInfo);

var _propertyCreateUtils = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyCreateUtils");

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _CalculationDetails = require("./components/CalculationDetails");

var _CalculationDetails2 = _interopRequireDefault(_CalculationDetails);

var _EditIcon = require("./components/EditIcon");

var _EditIcon2 = _interopRequireDefault(_EditIcon);

var _PropertyTaxDetails = require("./components/PropertyTaxDetails");

var _PropertyTaxDetails2 = _interopRequireDefault(_PropertyTaxDetails);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultIconStyle = {
  fill: "#767676",
  width: 22,
  height: 22,
  marginLeft: 15,
  marginRight: 10
};

var ReviewForm = function (_Component) {
  (0, _inherits3.default)(ReviewForm, _Component);

  function ReviewForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ReviewForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReviewForm.__proto__ || Object.getPrototypeOf(ReviewForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      valueSelected: "Full_Amount",
      importantDates: {},
      totalAmountTobePaid: 0,
      errorText: "",
      pattern: false,
      minLength: 1,
      maxLength: 11,
      termsAccepted: false,
      calculationDetails: false
    }, _this.getImportantDates = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var currentTenantId, ImpDatesResponse, _ImpDatesResponse$Mdm, Interest, FireCess, Rebate, Penalty, financialYr, intrest, fireCess, rebate, penalty;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              currentTenantId = _this.props.currentTenantId;
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], {
                MdmsCriteria: {
                  tenantId: currentTenantId,
                  moduleDetails: [{
                    moduleName: "PropertyTax",
                    masterDetails: [{
                      name: "Rebate"
                    }, {
                      name: "Penalty"
                    }, {
                      name: "Interest"
                    }, {
                      name: "FireCess"
                    }]
                  }]
                }
              });

            case 4:
              ImpDatesResponse = _context.sent;

              if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
                _ImpDatesResponse$Mdm = ImpDatesResponse.MdmsRes.PropertyTax, Interest = _ImpDatesResponse$Mdm.Interest, FireCess = _ImpDatesResponse$Mdm.FireCess, Rebate = _ImpDatesResponse$Mdm.Rebate, Penalty = _ImpDatesResponse$Mdm.Penalty;
                financialYr = _this.props.financialYr;
                intrest = (0, _PTCommon.findCorrectDateObjPenaltyIntrest)(financialYr, Interest);
                fireCess = (0, _PTCommon.findCorrectDateObj)(financialYr, FireCess);
                rebate = (0, _PTCommon.findCorrectDateObj)(financialYr, Rebate);
                penalty = (0, _PTCommon.findCorrectDateObjPenaltyIntrest)(financialYr, Penalty);

                _this.setState({
                  importantDates: {
                    intrest: intrest,
                    fireCess: fireCess,
                    rebate: rebate,
                    penalty: penalty
                  }
                });
              }
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              alert(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 8]]);
    })), _this.getErrorMessage = function (value) {
      var _ref3 = _this.props.estimationDetails[0] || {},
          totalAmount = _ref3.totalAmount;

      var errorText = "amount should be numeric";
      if (isFinite(value) && value >= totalAmount) {
        errorText = "can't be greater than " + (parseInt(totalAmount) - 1);
      } else if (isFinite(value) && value <= 100) {
        errorText = "can't be less than 100";
      }
      return errorText;
    }, _this.handleFieldChange = function (event, value) {
      var _ref4 = _this.props.estimationDetails[0] || {},
          totalAmount = _ref4.totalAmount;

      if (isNaN(parseFloat(value)) || !isFinite(value) || value >= totalAmount || value < 100) {
        _this.setState({
          errorText: _this.getErrorMessage(value)
        }, function () {
          _this.props.updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
        });
      } else {
        _this.setState({
          errorText: ""
        }, function () {
          _this.props.updateTotalAmount(value, _this.state.valueSelected === "Full_Amount", _this.state.errorText);
        });
      }
    }, _this.updateTotalAmount = function (value) {
      return _this.props.updateTotalAmount(value, _this.state.valueSelected === "Full_Amount");
    }, _this.onRadioButtonChange = function (e) {
      var estimationDetails = _this.props.estimationDetails;

      var _ref5 = estimationDetails[0] || {},
          totalAmount = _ref5.totalAmount;

      if (e.target.value === "Full_Amount") {
        _this.setState({
          totalAmountTobePaid: totalAmount,
          valueSelected: "Full_Amount",
          errorText: ""
        }, function () {
          _this.updateTotalAmount(_this.props.totalAmountToBePaid);
        });
      } else {
        _this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" }, function () {
          _this.updateTotalAmount(100);
        });
      }
    }, _this.onEditButtonClick = function (index) {
      var _this$props = _this.props,
          onTabClick = _this$props.onTabClick,
          prepareFinalObject = _this$props.prepareFinalObject;

      prepareFinalObject("propertiesEdited", true);
      onTabClick(index);
    }, _this.openCalculationDetails = function () {
      _this.setState({ calculationDetails: true });
    }, _this.closeCalculationDetails = function () {
      _this.setState({ calculationDetails: false });
    }, _this.editIcon = _react2.default.createElement(_components.Icon, {
      onClick: _this.handleEdit,
      style: defaultIconStyle,
      color: "#ffffff",
      action: "image",
      name: "edit"
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ReviewForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getImportantDates();
      this.props.getEstimates();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var handleFieldChange = this.handleFieldChange,
          onRadioButtonChange = this.onRadioButtonChange,
          onEditButtonClick = this.onEditButtonClick;
      var _state = this.state,
          valueSelected = _state.valueSelected,
          importantDates = _state.importantDates,
          errorText = _state.errorText;
      var _props = this.props,
          stepZero = _props.stepZero,
          stepTwo = _props.stepTwo,
          stepOne = _props.stepOne,
          estimationDetails = _props.estimationDetails,
          totalAmountToBePaid = _props.totalAmountToBePaid,
          isPartialPaymentInValid = _props.isPartialPaymentInValid,
          termsAccepted = _props.termsAccepted,
          termsError = _props.termsError,
          isAssesment = _props.isAssesment,
          toggleTerms = _props.toggleTerms;

      var _ref6 = estimationDetails[0] || {},
          totalAmount = _ref6.totalAmount;

      var _props2 = this.props,
          _props2$generalMDMSDa = _props2.generalMDMSDataById,
          generalMDMSDataById = _props2$generalMDMSDa === undefined ? {} : _props2$generalMDMSDa,
          _props2$location = _props2.location,
          location = _props2$location === undefined ? {} : _props2$location,
          OldProperty = _props2.OldProperty;
      var search = location.search;


      var purpose = (0, _formUtils.getPurpose)();

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Card, {
          textChildren: _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-xs-12", style: { alignItems: "center" } },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                label: 'PT_APPLICATION_SUMMARY',
                fontSize: "20px"
              })
            ),
            _formUtils.formWizardConstants[purpose].isEstimateDetails && _react2.default.createElement(_PropertyTaxDetails2.default, {
              estimationDetails: estimationDetails,
              importantDates: importantDates,
              openCalculationDetails: this.openCalculationDetails,
              optionSelected: valueSelected
            }),
            _react2.default.createElement(_PropertyAddressInfo2.default, { OldProperty: OldProperty, generalMDMSDataById: generalMDMSDataById, properties: this.props.properties, editIcon: _formUtils.formWizardConstants[purpose].isEditButton ? _react2.default.createElement(_EditIcon2.default, { onIconClick: function onIconClick() {
                  return onEditButtonClick(0);
                } }) : null }),
            _react2.default.createElement(_AssessmentInfo2.default, { OldProperty: OldProperty, generalMDMSDataById: generalMDMSDataById, properties: this.props.properties, editIcon: _formUtils.formWizardConstants[purpose].isEditButton ? _react2.default.createElement(_EditIcon2.default, { onIconClick: function onIconClick() {
                  return onEditButtonClick(1);
                } }) : null }),
            _react2.default.createElement(_OwnerInfo2.default, { OldProperty: OldProperty, generalMDMSDataById: generalMDMSDataById, properties: this.props.properties, editIcon: _formUtils.formWizardConstants[purpose].canEditOwner ? _react2.default.createElement(_EditIcon2.default, { onIconClick: function onIconClick() {
                  return onEditButtonClick(2);
                } }) : null }),
            _react2.default.createElement(_DocumentsInfo2.default, { generalMDMSDataById: generalMDMSDataById, documentsUploaded: this.props.documentsUploadRedux, editIcon: _formUtils.formWizardConstants[purpose].isEditButton ? _react2.default.createElement(_EditIcon2.default, { onIconClick: function onIconClick() {
                  return onEditButtonClick(3);
                } }) : null }),
            _react2.default.createElement(
              "div",
              null,
              !this.props.isCompletePayment && _react2.default.createElement(_CalculationDetails2.default, {
                open: this.state.calculationDetails,
                data: this.props.calculationScreenData,
                closeDialogue: function closeDialogue() {
                  return _this3.closeCalculationDetails();
                }
              }),
              _react2.default.createElement(
                "p",
                { className: "declaration-main-header" },
                "DECLARATION"
              ),
              _react2.default.createElement(_components.SingleCheckbox, {
                id: "rcpt",
                errorMessage: _react2.default.createElement(_translationNode2.default, { label: termsError }),
                errorText: _react2.default.createElement(_translationNode2.default, { label: termsError }),
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { label: "PT_FINAL_DECLARATION_MESSAGE", color: "#767676" }),
                value: termsAccepted,
                onCheck: function onCheck() {
                  toggleTerms();
                }
              }),
              termsError && _react2.default.createElement(_translationNode2.default, {
                label: termsError,
                containerStyle: {
                  marginTop: "-22px",
                  color: "#f44336",
                  "margin-left": "4px"
                },
                fontSize: "14px",
                color: "red"
              })
            )
          )
        })
      );
    }
  }]);
  return ReviewForm;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _state$common = state.common,
      common = _state$common === undefined ? {} : _state$common,
      screenConfiguration = state.screenConfiguration;

  var _ref7 = common || {},
      generalMDMSDataById = _ref7.generalMDMSDataById;

  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var documentsUploadRedux = preparedFinalObject.documentsUploadRedux,
      OldProperty = preparedFinalObject.OldProperty;

  documentsUploadRedux = (0, _propertyCreateUtils.convertToArray)(documentsUploadRedux);
  return {
    ownProps: ownProps,
    generalMDMSDataById: generalMDMSDataById,
    documentsUploadRedux: documentsUploadRedux,
    OldProperty: OldProperty
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch({ type: "SET_ROUTE", route: route });
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReviewForm);