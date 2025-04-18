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

var _commons = require("egov-common/ui-utils/commons");

var _uiMolecules = require("egov-ui-framework/ui-molecules");

var _actions = require("egov-ui-kit/redux/app/actions");

var _utils = require("egov-ui-kit/redux/app/utils");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _components2 = require("./components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

var labelStyle = {
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: 400,
  letterSpacing: "0.58px",
  lineHeight: "17px",
  textAlign: "left",
  paddingRight: "20px"
};

var TotalDues = function (_React$Component) {
  (0, _inherits3.default)(TotalDues, _React$Component);

  function TotalDues() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TotalDues);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TotalDues.__proto__ || Object.getPrototypeOf(TotalDues)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      url: "", invalidNumber: "",
      showWarning: false,
      isAlternate: false
    }, _this.onClickAction = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(consumerCode, tenantId) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = _this;
                _context.next = 3;
                return (0, _commons.downloadBill)(consumerCode, tenantId, "property-bill");

              case 3:
                _context.t1 = _context.sent;
                _context.t2 = {
                  url: _context.t1
                };

                _context.t0.setState.call(_context.t0, _context.t2);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.close = function () {
      _this.setState({ showWarning: false });
    }, _this.checkValidProeprty = function () {
      var _this$props = _this.props,
          properties = _this$props.properties,
          updateNumberConfig = _this$props.updateNumberConfig;
      var _properties$owners = properties.owners,
          owners = _properties$owners === undefined ? [] : _properties$owners;

      var returnValue = true;
      owners = owners && owners.filter(function (owner) {
        return owner.status == "ACTIVE";
      });
      owners && owners.map(function (owner) {
        if (process.env.REACT_APP_NAME !== "Citizen") {
          if (owner.mobileNumber == updateNumberConfig.invalidNumber || !owner.mobileNumber.match(updateNumberConfig['invalidPattern'])) {
            _this.setState({ showWarning: true, invalidNumber: owner.mobileNumber, isAlternate: false });
            returnValue = false;
          } else if (owner.alternatemobilenumber && (owner.alternatemobilenumber == updateNumberConfig.invalidNumber || !owner.alternatemobilenumber.match(updateNumberConfig['invalidPattern']))) {
            _this.setState({ showWarning: true, invalidNumber: owner.alternatemobilenumber, isAlternate: true });
            returnValue = false;
          }
        } else {
          if (owner.mobileNumber == updateNumberConfig.invalidNumber || !owner.mobileNumber.match(updateNumberConfig['invalidPattern']) && owner.mobileNumber == JSON.parse(getUserInfo()).mobileNumber) {
            _this.setState({ showWarning: true, invalidNumber: owner.mobileNumber, isAlternate: false });
            returnValue = false;
          } else if (owner.alternatemobilenumber != null && (owner.alternatemobilenumber == updateNumberConfig.invalidNumber || !owner.alternatemobilenumber.match(updateNumberConfig['invalidPattern']) && owner.alternatemobilenumber == JSON.parse(getUserInfo()).mobileNumber)) {
            _this.setState({ showWarning: true, invalidNumber: owner.alternatemobilenumber, isAlternate: true });
            returnValue = false;
          }
        }
      });
      return returnValue;
    }, _this.payAction = function (consumerCode, tenantId) {
      var status = (0, _get2.default)(_this.props, 'propertyDetails[0].status', '');
      if (status != "ACTIVE") {
        _this.props.toggleSnackbarAndSetText(true, { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" }, "error");
      } else {
        _this.checkValidProeprty() && (0, _formUtils.routeToCommonPay)(consumerCode, tenantId);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TotalDues, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          totalBillAmountDue = _props.totalBillAmountDue,
          consumerCode = _props.consumerCode,
          tenantId = _props.tenantId,
          isAdvanceAllowed = _props.isAdvanceAllowed,
          history = _props.history,
          properties = _props.properties,
          updateNumberConfig = _props.updateNumberConfig;

      var envURL = "/egov-common/pay";
      var payAction = this.payAction;

      var data = { value: "PT_TOTALDUES_TOOLTIP", key: "PT_TOTALDUES_TOOLTIP" };
      return _react2.default.createElement(
        "div",
        { className: "", id: "pt-header-due-amount" },
        _react2.default.createElement(
          "div",
          { className: "col-xs-6 col-sm-3 flex-child", style: { minHeight: "60px" } },
          _react2.default.createElement(_translationNode2.default, { buttonLabel: false, label: "PT_TOTAL_DUES", color: "rgba(0, 0, 0, 0.74)", labelStyle: labelStyle, fontSize: "14px" }),
          _react2.default.createElement(_translationNode2.default, {
            label: "Rs ",
            secondaryText: totalBillAmountDue ? totalBillAmountDue : 0,
            labelStyle: labelStyle,
            fontSize: "24px",
            fontWeight: "500",
            color: "rgb(0, 0, 0, 0.87)",
            height: "35px"
          })
        ),
        _react2.default.createElement(_uiMolecules.Tooltip, {
          className: "totaldues-tooltip-icon",
          val: data,
          icon: "info_circle",
          style: { position: "absolute", left: "160px", top: "30px" }
        }),
        _react2.default.createElement("div", { className: "col-xs-6 col-sm-3 flex-child", style: { minHeight: "60px" } }),
        _react2.default.createElement(
          "div",
          { className: "col-xs-6 col-sm-3 flex-child-button" },
          _react2.default.createElement(_components.UpdateMobile, {
            closeDue: this.close,
            number: this.state.invalidNumber,
            type: "WARNING",
            showWarning: this.state.showWarning,
            key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
            tenantId: properties.tenantId,
            propertyId: properties.propertyId,
            updateNumberConfig: updateNumberConfig,
            isAlternate: this.state.isAlternate
          })
        ),
        (totalBillAmountDue > 0 || totalBillAmountDue === 0 && isAdvanceAllowed) && _react2.default.createElement(
          "div",
          { id: "pt-flex-child-button", className: "col-xs-12 col-sm-3 flex-child-button" },
          _react2.default.createElement(
            "div",
            { style: { float: "right" } },
            _react2.default.createElement(_components2.TotalDuesButton, {

              primary: true,
              labelText: "PT_TOTALDUES_PAY",
              onClickAction: function onClickAction() {
                payAction(consumerCode, tenantId);
              }
            })
          )
        )
      );
    }
  }]);
  return TotalDues;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _ref3 = state.properties || {},
      propertiesById = _ref3.propertiesById;

  var propertyId = ownProps.consumerCode;
  var selPropertyDetails = propertiesById[propertyId] || {};
  var propertyDetails = selPropertyDetails.propertyDetails || [];
  return {
    propertyDetails: propertyDetails,
    propertyId: propertyId
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouterDom.withRouter)(TotalDues));