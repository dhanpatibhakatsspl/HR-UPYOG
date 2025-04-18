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

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _List = require("@material-ui/core/List");

var _List2 = _interopRequireDefault(_List);

var _ListItem = require("@material-ui/core/ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require("@material-ui/core/ListItemText");

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _ListItemSecondaryAction = require("@material-ui/core/ListItemSecondaryAction");

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _KeyboardArrowRight = require("@material-ui/icons/KeyboardArrowRight");

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      margin: "2px 8px",
      backgroundColor: theme.palette.background.paper
    }
  };
};

var NewConnection = function (_React$Component) {
  (0, _inherits3.default)(NewConnection, _React$Component);

  function NewConnection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, NewConnection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = NewConnection.__proto__ || Object.getPrototypeOf(NewConnection)).call.apply(_ref, [this].concat(args))), _this), _this.clickHandler = function (route) {
      var _this$props = _this.props,
          screenConfig = _this$props.screenConfig,
          handleField = _this$props.handleField,
          setRoute = _this$props.setRoute,
          moduleName = _this$props.moduleName,
          jsonPath = _this$props.jsonPath,
          value = _this$props.value;


      var toggle = (0, _get2.default)(screenConfig[route.screenKey], route.jsonPath + ".props.open", false);
      handleField(route.screenKey, route.jsonPath, "props.open", !toggle);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(NewConnection, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          items = _props.items;


      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _List2.default,
          { component: "nav", onClick: function onClick() {
              return _this2.clickHandler(items.route);
            } },
          _react2.default.createElement(
            _ListItem2.default,
            { button: true },
            _react2.default.createElement(_ListItemText2.default, {
              primary: _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: "WS_COMMON_APPL_NEW_CONNECTION",
                style: {
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.8700000047683716)"
                }
              })
            }),
            _react2.default.createElement(
              _ListItemSecondaryAction2.default,
              null,
              _react2.default.createElement(
                _IconButton2.default,
                { edge: "end" },
                _react2.default.createElement(_KeyboardArrowRight2.default, null)
              )
            )
          )
        )
      );
    }
  }]);
  return NewConnection;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  var moduleName = (0, _get2.default)(state.screenConfiguration, "moduleName");
  return { screenConfig: screenConfig, moduleName: moduleName };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleField: function handleField(screenKey, jsonPath, fieldKey, value) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, jsonPath, fieldKey, value));
    },
    setRoute: function setRoute(path) {
      return dispatch((0, _actions2.setRoute)(path));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NewConnection));