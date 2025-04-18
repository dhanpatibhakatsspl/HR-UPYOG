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

var _reactRedux = require("react-redux");

var _common = require("modules/common");

var _components = require("components");

var _PaymentStatus = require("egov-ui-kit/common/propertyTax/PaymentStatus");

var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);

var _actions = require("egov-ui-kit/redux/properties/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _actions3 = require("egov-ui-kit/redux/common/actions");

var _createReceipt = require("egov-ui-kit/common/propertyTax/PaymentStatus/Components/createReceipt");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _common2 = require("config/common.js");

var _common3 = _interopRequireDefault(_common2);

var _YearDialogue = require("egov-ui-kit/common/propertyTax/YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentSuccess = function (_Component) {
  (0, _inherits3.default)(PaymentSuccess, _Component);

  function PaymentSuccess(props) {
    (0, _classCallCheck3.default)(this, PaymentSuccess);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PaymentSuccess.__proto__ || Object.getPrototypeOf(PaymentSuccess)).call(this, props));

    _this.state = {
      imageUrl: "",
      yearDialogue: {
        dialogueOpen: false,
        urlToAppend: ''
      }
    };

    _this.toggleYearDialogue = function () {
      _this.setState({
        yearDialogue: {
          dialogueOpen: !_this.state.yearDialogue.dialogueOpen,
          urlToAppend: "/property-tax/assessment-form?assessmentId=" + _this.props.match.params.assessmentId + "&purpose=assess&propertyId=" + _this.props.match.params.propertyId + "&tenantId=" + _this.props.match.params.tenantId
        }
      });
    };

    _this.icon = _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" });
    _this.buttons = {
      button1: "Link previous payments",
      button2: "PT_FINISH_BUTTON"
    };

    _this.successMessages = function (financialYear) {
      return {
        Message1: _react2.default.createElement(
          "div",
          {
            className: "rainmaker-displayInline",
            style: { justifyContent: "center" }
          },
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { paddingTop: "10px" },
            fontSize: 16,
            label: "PT_TAX",
            labelStyle: { color: "#484848", fontWeight: 500 }
          }),
          financialYear && _react2.default.createElement(_translationNode2.default, {
            containerStyle: { margin: "0 3px", paddingTop: "10px" },
            fontSize: 16,
            label: "(" + financialYear + ")",
            labelStyle: { color: "#484848", fontWeight: 500 }
          })
        ),
        Message2: _react2.default.createElement(_translationNode2.default, {
          containerStyle: { paddingTop: "10px" },
          fontSize: 16,
          label: "PT_RECEIPTS_SUCCESS_MESSAGE4",
          labelStyle: { color: "#484848", fontWeight: 500 }
        })
      };
    };

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchProperties = _this$props.fetchProperties,
          fetchReceipts = _this$props.fetchReceipts,
          match = _this$props.match,
          fetchGeneralMDMSData = _this$props.fetchGeneralMDMSData;
      var tenantId = match.params.tenantId;

      var requestBody = {
        MdmsCriteria: {
          tenantId: _common3.default.tenantId,
          moduleDetails: [{
            moduleName: "PropertyTax",
            masterDetails: [{
              name: "Floor"
            }, {
              name: "UsageCategoryMajor"
            }, {
              name: "UsageCategoryMinor"
            }, {
              name: "UsageCategorySubMinor"
            }, {
              name: "OccupancyType"
            }, {
              name: "PropertyType"
            }, {
              name: "PropertySubType"
            }, {
              name: "UsageCategoryDetail"
            }]
          }]
        }
      };
      fetchGeneralMDMSData(requestBody, "PropertyTax", ["Floor", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor", "OccupancyType", "PropertyType", "PropertySubType", "UsageCategoryDetail"]);
      fetchProperties([{ key: "propertyIds", value: match.params.propertyId }, { key: "tenantId", value: match.params.tenantId }]);
      fetchReceipts([{ key: "tenantId", value: match.params.tenantId }, {
        key: "consumerCode",
        value: "" + match.params.propertyId
      }]);
      _this.convertImgToDataURLviaCanvas(_this.createImageUrl(match.params.tenantId), function (data) {
        this.setState({ imageUrl: data });
      }.bind(_this));
      _this.props.clearForms();
      _this.props.updatePrepareFormDataFromDraft({});
    };

    _this.goToHome = function () {
      /* Mseva 2.0 changes */
      _this.props.history.push("/");
    };

    _this.convertImgToDataURLviaCanvas = function (url, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    };

    _this.createImageUrl = function (tenantId) {
      return "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/" + tenantId + "/logo.png";
    };

    return _this;
  }

  (0, _createClass3.default)(PaymentSuccess, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          generalMDMSDataById = _props.generalMDMSDataById,
          history = _props.history,
          loading = _props.loading;
      var assessmentYear = this.props.match.params.assessmentYear;
      var imageUrl = this.state.imageUrl;
      var toggleYearDialogue = this.toggleYearDialogue;


      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        this.state.yearDialogue.dialogueOpen && _react2.default.createElement(_YearDialogue2.default, { open: this.state.yearDialogue.dialogueOpen, history: history, urlToAppend: this.state.yearDialogue.urlToAppend, closeDialogue: toggleYearDialogue }),
        _react2.default.createElement(_PaymentStatus2.default, {
          receiptUIDetails: this.props.receiptUIDetails,
          receiptDetails: this.props.receiptDetails,
          floatingButtonColor: "#22b25f",
          icon: this.icon,
          toggleYearDialogue: toggleYearDialogue,
          assessmentYear: assessmentYear,
          messages: this.successMessages(assessmentYear),
          buttons: this.buttons,
          propertyId: this.props.match.params.propertyId,
          primaryAction: this.goToHome,
          noExistingPropertyId: !this.props.existingPropertyId,
          generalMDMSDataById: generalMDMSDataById && generalMDMSDataById,
          receiptImageUrl: imageUrl && imageUrl,
          extraData: this.props.extraData
        })
      );
    }
  }]);
  return PaymentSuccess;
}(_react.Component);

var getLatestPropertyDetails = function getLatestPropertyDetails(propertyDetailsArray) {
  if (propertyDetailsArray.length > 1) {
    return propertyDetailsArray.reduce(function (acc, curr) {
      return acc.assessmentDate > curr.assessmentDate ? acc : curr;
    });
  } else {
    return propertyDetailsArray[0];
  }
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _ref = state || {},
      properties = _ref.properties,
      common = _ref.common,
      app = _ref.app;

  var localizationLabels = app.localizationLabels;
  var cities = common.cities;

  var _ref2 = state.common || {},
      generalMDMSDataById = _ref2.generalMDMSDataById;

  var propertiesById = properties.propertiesById,
      receipts = properties.receipts,
      loading = properties.loading;

  var selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];
  var existingPropertyId = selProperty && selProperty.oldPropertyId;
  var latestPropertyDetails = selProperty && getLatestPropertyDetails(selProperty.propertyDetails);
  var rawReceiptDetails = receipts && receipts[0];
  var lastAmount = receipts && (0, _get2.default)(receipts[0], "Bill[0].billDetails[0].totalAmount");
  var totalAmountBeforeLast = receipts && receipts.reduce(function (acc, curr, index) {
    if (index !== 0) {
      acc += (0, _get2.default)(curr, "Bill[0].billDetails[0].amountPaid");
    }
    return acc;
  }, 0);
  var totalAmountToPay = lastAmount + totalAmountBeforeLast;
  var totalAmountPaid = receipts && receipts.reduce(function (acc, curr) {
    acc += (0, _get2.default)(curr, "Bill[0].billDetails[0].amountPaid");
    return acc;
  }, 0);
  var receiptUIDetails = selProperty && cities && (0, _createReceipt.createReceiptUIInfo)(selProperty, rawReceiptDetails, cities, totalAmountToPay, true, totalAmountPaid, latestPropertyDetails);
  var receiptDetails = selProperty && rawReceiptDetails && cities && (0, _createReceipt.createReceiptDetails)(selProperty, latestPropertyDetails, rawReceiptDetails, localizationLabels, cities, totalAmountToPay, totalAmountPaid);
  return {
    loading: loading,
    receiptUIDetails: receiptUIDetails,
    receiptDetails: receiptDetails,
    cities: cities,
    existingPropertyId: existingPropertyId,
    generalMDMSDataById: generalMDMSDataById,
    extraData: {
      property: selProperty,
      receipt: rawReceiptDetails
    }
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchProperties: function fetchProperties(queryObject) {
      return dispatch((0, _actions.fetchProperties)(queryObject));
    },
    fetchReceipts: function fetchReceipts(queryObject) {
      return dispatch((0, _actions.fetchReceipts)(queryObject));
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName, key) {
      return dispatch((0, _actions3.fetchGeneralMDMSData)(requestBody, moduleName, masterName, key));
    },
    updatePrepareFormDataFromDraft: function updatePrepareFormDataFromDraft(prepareFormData) {
      return dispatch((0, _actions3.updatePrepareFormDataFromDraft)(prepareFormData));
    },
    clearForms: function clearForms() {
      return dispatch((0, _actions2.clearForms)());
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PaymentSuccess);