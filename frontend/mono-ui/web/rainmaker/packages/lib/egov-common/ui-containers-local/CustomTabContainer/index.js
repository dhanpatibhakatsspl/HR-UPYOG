"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _RenderScreen = require("egov-ui-framework/ui-molecules/RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _reactRedux = require("react-redux");

var _CustomTab = require("../../ui-molecules-local/CustomTab");

var _CustomTab2 = _interopRequireDefault(_CustomTab);

var _paymentMethods = require("./payment-methods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiItem = function (_React$Component) {
  (0, _inherits3.default)(MultiItem, _React$Component);

  function MultiItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MultiItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MultiItem.__proto__ || Object.getPrototypeOf(MultiItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tabIndex: 0,
      tabs: undefined
    }, _this.methods = {
      CASH: "cash",
      CHEQUE: "cheque",
      DD: "DD",
      CARD: "card",
      OFFLINE_NEFT: "offline_neft",
      OFFLINE_RTGS: "offline_rtgs",
      POSTAL_ORDER: "postal_order"
    }, _this.fieldsToReset = ["ReceiptTemp[0].Bill[0].payer", "ReceiptTemp[0].Bill[0].paidBy", "ReceiptTemp[0].Bill[0].payerMobileNumber", "ReceiptTemp[0].instrument.transactionNumber", "ReceiptTemp[0].instrument.transactionDateInput", "ReceiptTemp[0].instrument.ifscCode", "ReceiptTemp[0].instrument.instrumentNumber", "ReceiptTemp[0].instrument.transactionNumberConfirm", "ReceiptTemp[0].instrument.bank.name", "ReceiptTemp[0].instrument.branchName"], _this.componentDidMount = function () {
      var _this$props = _this.props,
          state = _this$props.state,
          dispatch = _this$props.dispatch,
          tabs = _this$props.tabs;

      _this.props.dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection", "props.tabs", tabs));
      _this.setState({
        tabs: tabs
      });
      _this.resetFields(dispatch, state);
      _this.setPayernameAndMobile(0);
    }, _this.componentWillReceiveProps = function (nextProps) {
      var tabs = (0, _get2.default)(nextProps, "tabs");
      var previousTabs = (0, _get2.default)(_this.props, "tabs");
      if (tabs.length != previousTabs.length) {
        _this.props.dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection", "props.tabs", tabs));
        _this.setState({
          tabs: tabs
        });
      }
    }, _this.resetAllFields = function (children, dispatch, state) {
      for (var child in children) {
        if (children[child].children) {
          for (var innerChild in children[child].children) {
            if ((0, _get2.default)(state.screenConfiguration.screenConfig["pay"], children[child].children[innerChild].componentJsonpath + ".props.value")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "props.value", ""));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "isFieldValid", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "props.helperText", ""));
            }
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "props.error", false));
          }
        }
      }
    }, _this.resetFields = function (dispatch, state) {
      var finalObject = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
      var ifscCode = (0, _get2.default)(finalObject, "ReceiptTemp[0].instrument.ifscCode");
      var transactionDateInput = (0, _get2.default)(finalObject, "ReceiptTemp[0].instrument.transactionDateInput");
      var transactionNumber = (0, _get2.default)(finalObject, "ReceiptTemp[0].instrument.transactionNumber");
      var bankName = (0, _get2.default)(finalObject, "ReceiptTemp[0].instrument.bank.name");
      var branchName = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.branchName");
      if (bankName && branchName) {
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.bank.name", ""));
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.branchName", ""));
      }
      if (ifscCode) {
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.ifscCode", ""));
      }
      if (transactionDateInput) {
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.transactionDateInput", ""));
      }
      if (transactionNumber) {
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.transactionNumber", ""));
      }
      var objectJsonPath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs";
      var instrumentTypes = (0, _get2.default)(state.screenConfiguration.screenConfig["pay"], objectJsonPath);

      instrumentTypes.forEach(function (item) {
        var tabContent = (0, _get2.default)(item, "tabContent");
        var children = Object.values(tabContent)[0].children;
        _this.resetAllFields(children, dispatch, state);
      });
    }, _this.setInstrumentType = function (value, dispatch) {
      dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", value));
    }, _this.onTabChange = function (tabIndex, dispatch, state) {
      var tabs = _this.state.tabs;

      _this.resetFields(dispatch, state);
      _this.setInstrumentType((0, _get2.default)(tabs[tabIndex], "code"), dispatch);
      _this.setPayernameAndMobile(tabIndex);
    }, _this.onTabClick = function (tabIndex) {
      var _this$props2 = _this.props,
          state = _this$props2.state,
          dispatch = _this$props2.dispatch;

      _this.onTabChange(tabIndex, dispatch, state);
      _this.setState({ tabIndex: tabIndex });
    }, _this.setPayernameAndMobile = function () {
      var tabIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _this$props3 = _this.props,
          state = _this$props3.state,
          dispatch = _this$props3.dispatch,
          tabs = _this$props3.tabs;

      var tabValue = (0, _get2.default)(tabs[tabIndex], "code", '').toLowerCase();

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + tabIndex + "].tabContent." + tabValue + ".children.payeeDetails.children.paidBy", "props.value", "COMMON_OWNER"));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + tabIndex + "].tabContent." + tabValue + ".children.payeeDetails.children.payerName", "props.value", (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].payerName", '')));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + tabIndex + "].tabContent." + tabValue + ".children.payeeDetails.children.payerMobileNo", "props.value", (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].mobileNumber", '')));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultiItem, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          uiFramework = _props.uiFramework,
          onFieldChange = _props.onFieldChange,
          onComponentClick = _props.onComponentClick,
          screenKey = _props.screenKey,
          componentJsonpath = _props.componentJsonpath;
      var onTabClick = this.onTabClick;

      var tabs = (0, _get2.default)(this.state, "tabs", this.props.tabs);
      // this.props.dispatch(handleField("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection", "props.tabs", tabs));
      var transFormedProps = (0, _extends3.default)({}, this.props, {
        tabs: tabs.map(function (tab, key) {
          return (0, _extends3.default)({}, tab, {
            tabContent: _react2.default.createElement(_RenderScreen2.default, {
              key: key,
              screenKey: screenKey,
              components: (0, _cloneDeep2.default)((0, _commons.addComponentJsonpath)(tab.tabContent, componentJsonpath + ".props.tabs[" + key + "].tabContent")),
              uiFramework: uiFramework,
              onFieldChange: onFieldChange,
              onComponentClick: onComponentClick
            })
          });
        })
      });
      return _react2.default.createElement(_CustomTab2.default, (0, _extends3.default)({ handleClick: onTabClick, tabs: tabs }, transFormedProps));
    }
  }]);
  return MultiItem;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var jsonPath = ownProps.jsonPath;

  var businessServiceDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath);
  var notAllowedTypes = (0, _get2.default)(businessServiceDetails, "collectionModesNotAllowed");
  var tabs = _paymentMethods.paymentMethods && _paymentMethods.paymentMethods.reduce(function (acc, item) {
    var index = notAllowedTypes && notAllowedTypes.findIndex(function (type) {
      return item.code == type;
    });
    if (index === -1) {
      acc.push((0, _extends3.default)({}, item));
    }
    return acc;
  }, []);
  return { state: state, tabs: tabs };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MultiItem);