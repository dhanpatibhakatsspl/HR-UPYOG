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

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _styles = require("@material-ui/core/styles");

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _reactRouterDom = require("react-router-dom");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _LabelContainer = require("../../ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      borderRadius: 0,
      marginTop: 0,
      height: 110,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      cursor: "pointer"
    },
    icon: {
      color: "#fe7a51"
    },
    item: {
      padding: 8
    }
  };
};

var LandingPage = function (_React$Component) {
  (0, _inherits3.default)(LandingPage, _React$Component);

  function LandingPage() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LandingPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LandingPage.__proto__ || Object.getPrototypeOf(LandingPage)).call.apply(_ref, [this].concat(args))), _this), _this.onCardCLick = function (route) {
      var _this$props = _this.props,
          screenConfig = _this$props.screenConfig,
          handleField = _this$props.handleField,
          setRoute = _this$props.setRoute,
          moduleName = _this$props.moduleName,
          jsonPath = _this$props.jsonPath,
          value = _this$props.value;

      if (typeof route === "string") {
        setRoute(route);
      } else {
        if (moduleName === "fire-noc") {
          (0, _actions2.prepareFinalObject)("FireNOCs", [{ "fireNOCDetails.fireNOCType": "NEW" }]);
        }
        var toggle = (0, _get2.default)(screenConfig[route.screenKey], route.jsonPath + ".props.open", false);
        handleField(route.screenKey, route.jsonPath, "props.open", !toggle);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LandingPage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          items = _props.items,
          applicationCount = _props.applicationCount;

      return _react2.default.createElement(
        _Grid2.default,
        { container: true, className: "landing-page-main-grid" },
        items.map(function (obj) {
          return !obj.hide ? _react2.default.createElement(
            _Grid2.default,
            {
              className: classes.item,
              item: true,
              xs: 12 / items.length,
              sm: 12 / items.length,
              align: "center"
            },
            _react2.default.createElement(
              _Card2.default,
              {
                className: classes.paper + " module-card-style",
                onClick: function onClick() {
                  return _this2.onCardCLick(obj.route);
                }
              },
              _react2.default.createElement(
                _CardContent2.default,
                { classes: { root: "card-content-style" } },
                obj.icon,
                _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement(_LabelContainer2.default, {
                    labelKey: obj.label.labelKey,
                    labelName: obj.label.labelName,
                    style: {
                      fontSize: 14,
                      color: "rgba(0, 0, 0, 0.8700000047683716)"
                    },
                    dynamicArray: applicationCount ? [applicationCount] : [0]
                  })
                )
              )
            )
          ) : null;
        })
      );
    }
  }]);
  return LandingPage;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  var moduleName = (0, _get2.default)(state.screenConfiguration, "moduleName");
  var applicationCount = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "myApplicationsCount");
  return { screenConfig: screenConfig, moduleName: moduleName, applicationCount: applicationCount };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleField: function handleField(screenKey, jsonPath, fieldKey, value) {
      return dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, jsonPath, fieldKey, value));
    },
    setRoute: function setRoute(path) {
      return dispatch((0, _actions.setRoute)(path));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions2.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LandingPage));