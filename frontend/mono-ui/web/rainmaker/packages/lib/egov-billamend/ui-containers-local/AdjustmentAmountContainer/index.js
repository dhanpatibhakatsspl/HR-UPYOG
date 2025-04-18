"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _styles = require("@material-ui/core/styles");

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _CheckBoxContainer = require("../CheckBoxContainer");

var _CheckBoxContainer2 = _interopRequireDefault(_CheckBoxContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    textField: {
      textAlign: "right",
      maxWidth: "90%"
    },
    input: {
      padding: "10px 0px 2px 10px !important",
      textAlign: "right !important",
      "&:before": {
        border: "2px solid rgba(0, 0, 0, 0.42) !important",
        height: "40px !important",
        borderRadius: "5px !important",
        padding: "0.5rem",
        textAlign: "right"
      },
      "&:after": {
        border: "2px solid #DB6844 !important",
        height: "40px !important",
        borderRadius: "5px !important",
        padding: "0.5rem",
        textAlign: "right"
      }
    }
  };
};

var themeStyles = function themeStyles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentSubCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "10px",
      border: "#d6d6d6",
      borderStyle: "solid",
      borderWidth: "1px"
    },
    documentIcon: {
      backgroundColor: "#FFFFFF",
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "0.83px",
      lineHeight: "24px",
      marginTop: "20px"
    },
    documentSuccess: {
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39CB74",
      color: "white",
      marginTop: "20px"
    },
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none"
    },
    iconDiv: {
      display: "flex",
      alignItems: "center"
    },
    descriptionDiv: {
      alignItems: "center",
      display: "block",
      marginTop: "20px"
    },
    formControl: {
      minWidth: 250,
      padding: "0px"
    },
    fileUploadDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingTop: "5px",
      "& input": {
        display: "none"
      }
    }
  };
};

var lableStyle = {
  display: "flex",
  alignItems: "center"
};

var taxAmountStyle = {
  fontWeight: "500",
  color: 'rgba(0, 0, 0, 0.87)'
};
var taxHeadsLabel = {
  display: "flex",
  alignItems: "center",
  fontWeight: 600
};

var AdjustmentAmountContainer = function (_Component) {
  (0, _inherits3.default)(AdjustmentAmountContainer, _Component);

  function AdjustmentAmountContainer(props) {
    (0, _classCallCheck3.default)(this, AdjustmentAmountContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AdjustmentAmountContainer.__proto__ || Object.getPrototypeOf(AdjustmentAmountContainer)).call(this, props));

    _this.handleAmountChange = function (e, field, key) {
      var _this$props = _this.props,
          data = _this$props.data,
          rest = (0, _objectWithoutProperties3.default)(_this$props, ["data"]);

      var re = /^(\d+)?([.]?\d{0,2})?$/; ///^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        var event = e.target;
        var details = (0, _extends3.default)({}, data),
            value = event.value,
            endSplitValue = e.target.value.split('.')[1],
            initialSplitValue = e.target.value.split('.')[0];
        if (endSplitValue && endSplitValue.length > 0) {
          value = initialSplitValue * 1 + "." + endSplitValue;
        } else if (initialSplitValue && initialSplitValue.length > 0 && endSplitValue != "") {
          value = initialSplitValue * 1;
        } else if (endSplitValue == "") {
          value = initialSplitValue * 1 + ".";
        }
        if (field == "reducedAmount") details[key]["reducedAmountValue"] = value;
        if (field == "additionalAmount") details[key]["additionalAmountValue"] = value;
        _this.props.prepareFinalObject("fetchBillDetailsssss", details);
      }
    };

    _this.handleCheckBoxChange = function (field) {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          rest = (0, _objectWithoutProperties3.default)(_this$props2, ["data"]);

      var details = (0, _extends3.default)({}, data);
      if (field === "reducedAmount") {
        var reducedAmount = _this.state.reducedAmount;
        if (reducedAmount) {
          if ((typeof details === "undefined" ? "undefined" : (0, _typeof3.default)(details)) == "object") {
            details = Object.values(details);
          }
          details.forEach(function (data) {
            if (data.additionalAmountValue) data.additionalAmountValue = 0;
          });
          _this.props.prepareFinalObject("fetchBillDetailsssss", details);
          _this.setState({ additionalAmount: true });
          _this.props.prepareFinalObject("BILL.AMOUNTTYPE", "reducedAmount");
        }
        _this.setState({ reducedAmount: !reducedAmount });
      } else if (field === "additionalAmount") {
        var additionalAmount = _this.state.additionalAmount;
        if (additionalAmount) {
          if ((typeof details === "undefined" ? "undefined" : (0, _typeof3.default)(details)) == "object") {
            details = Object.values(details);
          }
          details.forEach(function (data) {
            if (data.reducedAmountValue) {
              data.reducedAmountValue = 0;
            }
          });
          _this.props.prepareFinalObject("fetchBillDetailsssss", details);
          _this.setState({ reducedAmount: true });
          _this.props.prepareFinalObject("BILL.AMOUNTTYPE", "additionalAmount");
        }
        _this.setState({ additionalAmount: !additionalAmount });
      }
    };

    _this.getHeaderTaxCard = function (card, key) {
      var _this$props3 = _this.props,
          classes = _this$props3.classes,
          amountType = _this$props3.amountType,
          _this$props3$searchBi = _this$props3.searchBillDetails,
          searchBillDetails = _this$props3$searchBi === undefined ? {} : _this$props3$searchBi,
          rest = (0, _objectWithoutProperties3.default)(_this$props3, ["classes", "amountType", "searchBillDetails"]);

      var disableValue = amountType == "reducedAmount" ? true : false;
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _Grid2.default,
          { container: true },
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3, style: lableStyle },
            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: (0, _commons.getTransformedLocale)("BILL_" + card.taxHeadCode) })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3, style: lableStyle },
            _react2.default.createElement(_uiContainers.LabelContainer, { classes: taxAmountStyle, labelKey: (0, _get2.default)(searchBillDetails, card.taxHeadCode, '0') || '0' })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3 },
            _react2.default.createElement(_TextField2.default, {
              variant: "outlined",
              name: (0, _commons.getTransformedLocale)(card.taxHeadCode),
              value: card.reducedAmountValue ? card.reducedAmountValue : 0,
              className: classes.textField,
              onChange: function onChange(event) {
                return _this.handleAmountChange(event, "reducedAmount", key);
              },
              InputProps: {
                className: classes.input,
                disabled: !disableValue
              },
              inputProps: {
                style: { textAlign: "right", paddingRight: "0.5rem" }
              }
            })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3 },
            _react2.default.createElement(_TextField2.default, {
              variant: "outlined",
              value: card.additionalAmountValue ? card.additionalAmountValue : 0,
              className: classes.textField,
              name: (0, _commons.getTransformedLocale)(card.taxHeadCode),
              onChange: function onChange(event) {
                return _this.handleAmountChange(event, "additionalAmount", key);
              },
              InputProps: {
                className: classes.input,
                disabled: disableValue
              },
              inputProps: {
                style: { textAlign: "right", paddingRight: "0.5rem" }
              }
            })
          )
        )
      );
    };

    _this.state = {
      reducedAmount: false,
      additionalAmount: true,
      reducedAmountValue: 0,
      additionalAmountValue: 0,
      data: {
        WATER_TAX: { reducedAmount: 0, additionalAmount: 0 },

        WATER_CESS: { reducedAmount: 0, additionalAmount: 0 },

        INTEREST: { reducedAmount: 0, additionalAmount: 0 },

        PENALTY: { reducedAmount: 0, additionalAmount: 0 }
      }
    };
    return _this;
  }

  (0, _createClass3.default)(AdjustmentAmountContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          amountType = _props.amountType,
          rest = (0, _objectWithoutProperties3.default)(_props, ["data", "amountType"]);

      var checkedValue = amountType == "reducedAmount" ? true : false;
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _Grid2.default,
          { container: true },
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3, style: taxHeadsLabel },
            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: (0, _commons.getTransformedLocale)("TAX_HEADS") })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3, style: taxHeadsLabel },
            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: (0, _commons.getTransformedLocale)("TAX_CURRENT_AMOUNT") })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3 },
            _react2.default.createElement(_CheckBoxContainer2.default, {
              labelName: "Reduced Amount (Rs)",
              labelKey: "BILL_REDUCED_AMOUNT_RS",
              name: "reducedAmount",
              checked: !checkedValue,
              changeMethod: this.handleCheckBoxChange
            })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3, sm: 3, md: 3 },
            _react2.default.createElement(_CheckBoxContainer2.default, {
              labelName: "Additional Amount (Rs)",
              labelKey: "BILL_ADDITIONAL_AMOUNT_RS",
              name: "additionalAmount",
              checked: checkedValue,
              changeMethod: this.handleCheckBoxChange
            })
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          data && data.length > 0 && data.map(function (card, index) {
            return _react2.default.createElement(
              "div",
              null,
              _this2.getHeaderTaxCard(card, index++)
            );
          })
        )
      );
    }
  }]);
  return AdjustmentAmountContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var moduleName = screenConfiguration.moduleName,
      preparedFinalObject = screenConfiguration.preparedFinalObject;


  var amount = (0, _get2.default)(preparedFinalObject, "BILL.AMOUNT", []);
  var amountType = (0, _get2.default)(preparedFinalObject, "BILL.AMOUNTTYPE", "");
  var searchBillDetails = (0, _get2.default)(preparedFinalObject, "searchBillDetails-bill", {});

  var data = (0, _get2.default)(preparedFinalObject, "fetchBillDetails", []);
  return { amount: amount, moduleName: moduleName, data: data, amountType: amountType, searchBillDetails: searchBillDetails };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AdjustmentAmountContainer));