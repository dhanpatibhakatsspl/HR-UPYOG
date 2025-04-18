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

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _styles = require("@material-ui/core/styles");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _reactRedux = require("react-redux");

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      marginBottom: 8
    },
    container: {
      paddingBottom: 10
    },
    rightAlign: {
      textAlign: "right"
    }
  };
};

var closebuttonStyle = {
  width: "25px",
  height: "25px",
  color: "#767676"
};

var closeIcon = "close";

var getMultiItem = function getMultiItem(billingslabData, classes, style) {
  return billingslabData.map(function (item, index) {
    return _react2.default.createElement(
      _Grid2.default,
      { sm: 12, className: classes.container, container: true },
      _react2.default.createElement(
        _Grid2.default,
        { sm: 9 },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelKey: item.taxHeadCode,
          style: {
            color: "rgba(0, 0, 0, 0.6000000238418579)",
            fontSize: "14px",
            fontWeigt: 400,
            lineSpacing: "17px",
            marginRight: "10px"
          }
        })
      ),
      _react2.default.createElement(
        _Grid2.default,
        { sm: 3, className: classes.rightAlign },
        _react2.default.createElement(_uiAtoms.Label, {
          label: "Rs " + item.estimateAmount,
          style: {
            color: "rgba(0, 0, 0, 0.8700000047683716)",
            fontSize: "14px",
            fontWeigt: 400,
            lineSpacing: "17px"
          }
        })
      )
    );
  });
};

var getMultiItemForTax = function getMultiItemForTax(billingslabData, classes, style) {
  return billingslabData.map(function (item, index) {
    return _react2.default.createElement(
      _Grid2.default,
      { sm: 12, className: classes.container, container: true },
      _react2.default.createElement(
        _Grid2.default,
        { sm: 9 },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelKey: item.taxHeadCode,
          style: {
            color: "rgba(0, 0, 0, 0.8700000047683716)",
            fontSize: "16px",
            fontWeigt: 400,
            lineSpacing: "19px",
            marginRight: "10px"
          }
        })
      ),
      _react2.default.createElement(
        _Grid2.default,
        { sm: 3, className: classes.rightAlign },
        _react2.default.createElement(_uiAtoms.Label, {
          label: "Rs " + item.estimateAmount,
          style: {
            color: "rgba(0, 0, 0, 0.8700000047683716)",
            fontSize: "14px",
            fontWeigt: 400,
            lineSpacing: "17px"
          }
        })
      )
    );
  });
};

var ViewBreakupContainer = function (_React$Component) {
  (0, _inherits3.default)(ViewBreakupContainer, _React$Component);

  function ViewBreakupContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ViewBreakupContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ViewBreakupContainer.__proto__ || Object.getPrototypeOf(ViewBreakupContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      style: {
        color: "rgba(0, 0, 0, 0.8700000047683716)",
        fontSize: "20px",
        fontWeigt: 500,
        lineSpacing: "28px",
        marginTop: 25,
        marginRight: 5
      }
    }, _this.getGridItem = function (total, classes, style) {

      return _react2.default.createElement(
        _Grid2.default,
        { sm: 12, className: classes.container, container: true },
        _react2.default.createElement(
          _Grid2.default,
          { sm: 9 },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: "Total",
            labelKey: "PT_FORM4_TOTAL",
            style: style ? style : {
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              fontSize: "14px",
              fontWeigt: 400,
              lineSpacing: "17px",
              marginRight: "10px"
            }
          })
        ),
        _react2.default.createElement(
          _Grid2.default,
          { sm: 3, className: classes.rightAlign },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: "Rs " + total,
            style: style ? style : {
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              fontSize: "14px",
              fontWeigt: 400,
              lineSpacing: "17px"
            }
          })
        )
      );
    }, _this.handleClose = function () {
      var screenKey = _this.props.screenKey;

      _this.props.handleField(screenKey, "components.breakUpDialog", "props.open", false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ViewBreakupContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          appUnitData = _props.appUnitData,
          serviceUnitData = _props.serviceUnitData,
          appTotal = _props.appTotal,
          serviceTotal = _props.serviceTotal,
          totalAmount = _props.totalAmount,
          taxUnitData = _props.taxUnitData,
          taxTotal = _props.taxTotal,
          classes = _props.classes;
      var style = this.state.style;
      var getGridItem = this.getGridItem,
          handleClose = this.handleClose;


      return _react2.default.createElement(_Dialog2.default, {
        open: open,
        onClose: handleClose,
        fullWidth: true,
        children: [serviceTotal > 0 || appTotal > 0 ? _react2.default.createElement(
          "div",
          { style: { padding: "26px" } },
          _react2.default.createElement(
            "div",
            {
              onClick: handleClose,
              style: { float: "right", cursor: "pointer" }
            },
            _react2.default.createElement(
              _Icon2.default,
              { style: closebuttonStyle },
              " ",
              _react2.default.createElement(
                "i",
                { "class": "material-icons" },
                closeIcon,
                " "
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { style: { paddingBottom: "16px", paddingTop: "8px" } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelName: "Calculation Breakup",
              labelKey: "WS_CALCULATION_BREAKUP",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "20px",
                fontWeigt: 500,
                lineSpacing: "28px"
              }
            })
          ),
          appUnitData && appUnitData.length > 0 && _react2.default.createElement(
            "div",
            { style: { paddingBottom: "12px" } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: "WS_APPLICATION_FEE_HEADER",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "16px",
                fontWeigt: 400,
                lineSpacing: "19px"
              }
            })
          ),
          appUnitData && appUnitData.length > 0 && getMultiItem(appUnitData, classes),
          _react2.default.createElement(_Divider2.default, { className: classes.root }),
          appUnitData && appUnitData.length > 0 && getGridItem(appTotal, classes),
          serviceUnitData && serviceUnitData.length > 0 && _react2.default.createElement(
            "div",
            { style: { paddingBottom: "12px", marginTop: 20 } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: "WS_SERVICE_FEE_HEADER",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "16px",
                fontWeigt: 400,
                lineSpacing: "19px"
              }
            })
          ),
          serviceUnitData && serviceUnitData.length > 0 && getMultiItem(serviceUnitData, classes),
          _react2.default.createElement(_Divider2.default, { className: classes.root }),
          serviceUnitData && serviceUnitData.length > 0 && getGridItem(serviceTotal, classes),
          taxUnitData && taxUnitData.length > 0 && getMultiItemForTax(taxUnitData, classes),
          _react2.default.createElement(_Divider2.default, { className: classes.root }),
          getGridItem(totalAmount, classes, style)
        ) : _react2.default.createElement(
          "div",
          { style: { padding: "16px", width: "500px" } },
          _react2.default.createElement(
            "div",
            { style: { paddingBottom: "16px" } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: "WS_CALCULATION_BREAKUP",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "20px",
                fontWeigt: 500,
                lineSpacing: "28px"
              }
            })
          ),
          getGridItem(totalAmount, classes, style)
        )]
      });
    }
  }]);
  return ViewBreakupContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps, dispatch) {
  var screenConfiguration = state.screenConfiguration;
  var screenKey = ownProps.screenKey;
  var screenConfig = screenConfiguration.screenConfig,
      preparedFinalObject = screenConfiguration.preparedFinalObject;

  var serviceUnitData = (0, _get2.default)(preparedFinalObject, "dataCalculation.billSlabData.CHARGES");
  var appUnitData = (0, _get2.default)(preparedFinalObject, "dataCalculation.billSlabData.FEE");
  var taxUnitData = (0, _get2.default)(preparedFinalObject, "dataCalculation.billSlabData.TAX");

  var appTotal = (0, _get2.default)(preparedFinalObject, "dataCalculation.fee");
  var serviceTotal = (0, _get2.default)(preparedFinalObject, "dataCalculation.charge");

  var totalAmount = (0, _get2.default)(preparedFinalObject, "dataCalculation.totalAmount");

  var taxTotal = (0, _get2.default)(preparedFinalObject, "dataCalculation.taxAmount");

  var open = (0, _get2.default)(screenConfig, screenKey + ".components.breakUpDialog.props.open");

  return {
    open: open,
    appUnitData: appUnitData,
    serviceUnitData: serviceUnitData,
    appTotal: appTotal,
    serviceTotal: serviceTotal,
    taxUnitData: taxUnitData,
    taxTotal: taxTotal,
    totalAmount: totalAmount,
    screenKey: screenKey,
    screenConfig: screenConfig
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { handleField: function handleField(a, b, c, d) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(a, b, c, d));
    } };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewBreakupContainer));