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

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _styles = require("@material-ui/core/styles");

var _Icon = require("egov-ui-kit/components/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    webRoot: {
      flexGrow: 1,
      width: "9em",
      padding: "1%"
    },
    webRoot1: {
      flexGrow: "unset",
      width: "11em",
      padding: "1%"
    },
    mobileRoot: {
      flexGrow: 1,
      padding: '1%',
      width: "25%"
    },
    mobileRoot1: {
      flexGrow: 1,
      padding: '1%',
      width: "33%"
    },
    paper: {
      borderRadius: 0,
      marginTop: 0,
      height: 90,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      cursor: "pointer",
      whiteSpace: "nowrap"
    },
    icon: {
      color: "#fe7a51"
    },
    item: {
      padding: 8
    }
  };
};

// const services = [
//   {
//     label: "Complaints",
//     icon: <Icon className="service-icon" action="custom" name="comment-plus" />,
//     route: "/pgr-home",
//   },
//   { label: "Property Tax", icon: <Icon className="service-icon" action="custom" name="home-city-outline" />, route: "/property-tax" },
//   { label: "Trade License", icon: <Icon className="service-icon" action="custom" name="trade-license" />, route: "/tradelicense-citizen/home" },
//   { label: "Fire Noc", icon: <Icon className="service-icon" action="custom" name="fire" />, route: "fire-noc/home" },
// ];

var ServiceList = function (_React$Component) {
  (0, _inherits3.default)(ServiceList, _React$Component);

  function ServiceList() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ServiceList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ServiceList.__proto__ || Object.getPrototypeOf(ServiceList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      actionList: []
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ServiceList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var menu = nextProps.menu;

      var list = void 0;
      if (process.env.REACT_APP_NAME === "Citizen") {
        list = menu && menu.filter(function (item) {
          return item.url === "card" && item.name.startsWith("rainmaker-citizen");
        });
      } else {
        list = menu && menu.filter(function (item) {
          return item.url === "card";
        });
      }
      this.setState({
        actionList: list
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          history = _props.history;
      var actionList = this.state.actionList;

      return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        _react2.default.createElement(
          _Hidden2.default,
          { smUp: true },
          actionList.map(function (service) {
            service.leftIcon = service.name == "digit-ui FSM" ? "custom:localShipping" : service.leftIcon;
            var translatedLabel = service.displayName.toUpperCase().replace(/[.:\-\s]/g, "_");

            return _react2.default.createElement(
              _Grid2.default,
              { className: actionList.length === 6 || actionList.length === 5 || actionList.length === 9 ? classes.mobileRoot1 : classes.mobileRoot, item: true, align: "center" },
              _react2.default.createElement(
                _Card2.default,
                {
                  className: classes.paper,
                  onClick: function onClick(e) {
                    if (service.navigationURL && service.navigationURL.includes('digit-ui')) {
                      window.location.href = service.navigationURL;
                      return;
                    } else {
                      history.push(service.navigationURL);
                    }
                  }
                },
                _react2.default.createElement(
                  _CardContent2.default,
                  { classes: { root: "card-content-style" } },
                  _react2.default.createElement(_Icon2.default, { className: "service-icon", action: service.leftIcon.split(":")[0], name: service.leftIcon.split(":")[1] }),
                  _react2.default.createElement(_translationNode2.default, { className: "service-label-cont", label: "ACTION_TEST_" + translatedLabel, fontSize: 12, color: "rgba(0, 0, 0, 0.87)" })
                )
              )
            );
          })
        ),
        _react2.default.createElement(
          _Hidden2.default,
          { xsDown: true },
          actionList.map(function (service) {
            var translatedLabel = service.displayName.toUpperCase().replace(/[.:\-\s]/g, "_");
            return _react2.default.createElement(
              _Grid2.default,
              { className: actionList.length > 10 ? classes.webRoot1 : classes.webRoot, item: true, align: "center" },
              _react2.default.createElement(
                _Card2.default,
                {
                  className: classes.paper + " service-module-style",
                  onClick: function onClick(e) {
                    if (service.navigationURL && service.navigationURL.includes('digit-ui')) {
                      window.location.href = service.navigationURL;
                      return;
                    } else {
                      history.push(service.navigationURL);
                    }
                  }
                },
                _react2.default.createElement(
                  _CardContent2.default,
                  { classes: { root: "card-content-style" } },
                  _react2.default.createElement(_Icon2.default, { className: "service-icon", action: service.leftIcon.split(":")[0], name: service.leftIcon.split(":")[1] }),
                  _react2.default.createElement(_translationNode2.default, { className: "service-label-cont", label: "ACTION_TEST_" + translatedLabel, fontSize: 14, color: "rgba(0, 0, 0, 0.87)" })
                )
              )
            );
          })
        )
      );
    }
  }]);
  return ServiceList;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth,
      app = state.app;
  var menu = app.menu;
  var userInfo = auth.userInfo;

  var name = auth && userInfo.name;

  return { name: name, menu: menu };
};
exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, null)(ServiceList));