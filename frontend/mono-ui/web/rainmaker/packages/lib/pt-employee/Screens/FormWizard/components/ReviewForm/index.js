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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _addRebateBox = require("./components/addRebateBox");

var _addRebateBox2 = _interopRequireDefault(_addRebateBox);

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
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10,
  totalAmountTobePaid: ""
};

var AddRebatePopUp = (0, _form2.default)({ formKey: "additionalRebate", path: "PropertyTaxPay" })(_addRebateBox2.default);

var ReviewForm = function (_Component) {
  (0, _inherits3.default)(ReviewForm, _Component);

  function ReviewForm() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ReviewForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReviewForm.__proto__ || Object.getPrototypeOf(ReviewForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      valueSelected: "",
      showRebateBox: false,
      calculationDetails: false
    }, _this.handleOptionsChange = function (event, value) {
      _this.setState({ valueSelected: value });
    }, _this.onRadioButtonChange = function (e) {
      var inputValue = e.target.value;
      _this.setState({ totalAmountTobePaid: inputValue });
    }, _this.addRebateBox = function (show) {
      _this.setState({
        showRebateBox: show
      });
    }, _this.updateCalculation = function () {
      _this.addRebateBox(false);
      // const { updateEstimate } = this.props;
      // updateEstimate();
    }, _this.openCalculationDetails = function () {
      _this.setState({ calculationDetails: true });
    }, _this.closeCalculationDetails = function () {
      _this.setState({ calculationDetails: false });
    }, _this.editIcon = _react2.default.createElement(_components.Icon, { onClick: _this.handleEdit, style: defaultIconStyle, color: "#ffffff", action: "image", name: "edit" }), _this.onEditButtonClick = function (index) {
      var _this$props = _this.props,
          onTabClick = _this$props.onTabClick,
          prepareFinalObject = _this$props.prepareFinalObject;

      prepareFinalObject("propertiesEdited", true);
      onTabClick(index);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ReviewForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.getEstimates();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var addRebateBox = this.addRebateBox,
          updateCalculation = this.updateCalculation,
          onEditButtonClick = this.onEditButtonClick;
      var showRebateBox = this.state.showRebateBox;
      var _props = this.props,
          stepZero = _props.stepZero,
          stepTwo = _props.stepTwo,
          stepOne = _props.stepOne,
          estimationDetails = _props.estimationDetails,
          importantDates = _props.importantDates,
          totalAmount = _props.totalAmount;
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
              addRebateBox: addRebateBox,
              openCalculationDetails: this.openCalculationDetails
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
                } }) : null })
          )
        }),
        !this.props.isCompletePayment && _react2.default.createElement(_CalculationDetails2.default, {
          open: this.state.calculationDetails,
          data: this.props.calculationScreenData,
          closeDialogue: function closeDialogue() {
            return _this2.closeCalculationDetails();
          }
        }),
        _react2.default.createElement(
          "div",
          { className: "pt-rebate-exemption-box" },
          _react2.default.createElement(_components.Dialog, {
            open: showRebateBox,
            children: [_react2.default.createElement(
              "div",
              { className: "pt-rebate-box" },
              _react2.default.createElement(AddRebatePopUp, { handleClose: function handleClose() {
                  return addRebateBox(false);
                } })
            )],
            bodyStyle: { backgroundColor: "#ffffff" },
            isClose: true,
            handleClose: function handleClose() {
              return addRebateBox(false);
            },
            onRequestClose: function onRequestClose() {
              return addRebateBox(false);
            },
            contentStyle: { width: "56%" },
            contentClassName: "rebate-modal-content"
          })
        )
      );
    }
  }]);
  return ReviewForm;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _state$common = state.common,
      common = _state$common === undefined ? {} : _state$common,
      screenConfiguration = state.screenConfiguration;

  var _ref2 = common || {},
      generalMDMSDataById = _ref2.generalMDMSDataById;

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