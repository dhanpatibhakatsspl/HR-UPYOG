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

var _reactRedux = require("react-redux");

var _LinearSpinner = require("../../ui-atoms/LinearSpinner");

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _Item = require("../../ui-atoms/Layout/Item");

var _Item2 = _interopRequireDefault(_Item);

var _remoteComponentPaths = require("ui-config/commonConfig/remote-component-paths");

var _remoteComponentPaths2 = _interopRequireDefault(_remoteComponentPaths);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _moduleConfig = require("./moduleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentInterface = function (_React$Component) {
  (0, _inherits3.default)(ComponentInterface, _React$Component);

  function ComponentInterface(props) {
    (0, _classCallCheck3.default)(this, ComponentInterface);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentInterface.__proto__ || Object.getPrototypeOf(ComponentInterface)).call(this, props));

    _this.state = { module: null, error: null, errorInfo: null };
    return _this;
  }

  (0, _createClass3.default)(ComponentInterface, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          componentPath = _props.componentPath,
          uiFramework = _props.uiFramework,
          moduleName = _props.moduleName;

      var LoadableComponent = null;
      var selfRunning = process.env.REACT_APP_SELF_RUNNING === "true" ? true : false;
      switch (uiFramework) {
        // case "carbon":
        //   LoadableComponent = Loadable({
        //     loader: () =>
        //       import("carbon-components-react").then(
        //         module => module[componentPath]
        //       ),
        //     loading: () => <LinearProgress />
        //   });
        //   break;
        case "custom-atoms":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("../../ui-atoms").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-molecules":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("../../ui-molecules").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-containers":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("../../ui-containers").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-atoms-local":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return !selfRunning ? (0, _remoteComponentPaths2.default)(moduleName, "ui-atoms-local").then(function (module) {
                return module[componentPath];
              }) : import("ui-atoms-local").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-molecules-local":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return !selfRunning ? (0, _remoteComponentPaths2.default)(moduleName, "ui-molecules-local").then(function (module) {
                return module[componentPath];
              }) : import("ui-molecules-local").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;

        case "custom-containers-local":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return !selfRunning ? (0, _remoteComponentPaths2.default)(moduleName, "ui-containers-local").then(function (module) {
                return module[componentPath];
              }) : import("ui-containers-local").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "material-ui":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("@material-ui/core").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
      }
      this.setState({ module: LoadableComponent });
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      // You can also log error messages to an error reporting service here
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.state.module; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

      var _props2 = this.props,
          id = _props2.id,
          uiFramework = _props2.uiFramework,
          props = _props2.props,
          children = _props2.children,
          gridDefination = _props2.gridDefination,
          _props2$visible = _props2.visible,
          visible = _props2$visible === undefined ? true : _props2$visible,
          _props2$roleDefinatio = _props2.roleDefination,
          roleDefination = _props2$roleDefinatio === undefined ? {} : _props2$roleDefinatio,
          applicationStatus = _props2.applicationStatus,
          menu = _props2.menu,
          bpaTradeType = _props2.bpaTradeType;


      if (this.state.errorInfo) {
        // Error path
        console.error("Egov-ui-framework-error", this.state.error && this.state.error.toString());
        console.error("Egov-ui-framework-errorInfo", this.state.errorInfo.componentStack);
        console.error("Egov-ui-framework-component-details", this.props);

        return null;
      }

      if (visible && !(0, _isEmpty2.default)(roleDefination)) {
        var splitList = (0, _get2.default)(roleDefination, "rolePath").split(".");
        var localdata = JSON.parse((0, _localStorageUtils.localStorageGet)(splitList[0]));
        var localRoles = (0, _get2.default)(localdata, splitList.slice(1).join("."), localdata);
        var roleCodes = localRoles && localRoles.map(function (elem) {
          return (0, _get2.default)(elem, "code");
        });
        if ((0, _get2.default)(roleDefination, "roles")) {
          var roles = (0, _get2.default)(roleDefination, "roles");
          var found = roles.some(function (elem) {
            return roleCodes.includes(elem);
          });
          visible = found;
        } else if ((0, _get2.default)(roleDefination, "path")) {
          var isApplicable = menu && menu.find(function (item) {
            return item.navigationURL == (0, _get2.default)(roleDefination, "path");
          });
          visible = isApplicable ? isApplicable : false;
        } else if ((0, _get2.default)(roleDefination, "action")) {
          var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
          var data = (0, _find2.default)(businessServiceData, {
            businessService: (0, _moduleConfig.getModuleName)(window.location.pathname, bpaTradeType)
          });
          var filteredData = data && data.states && data.states.reduce(function (res, curr) {
            if (curr && curr.actions && curr.applicationStatus === applicationStatus && curr.actions.filter(function (item) {
              return item.roles.some(function (elem) {
                return roleCodes.includes(elem);
              });
            }).length > 0) {
              var filteredAction = curr.actions.filter(function (item) {
                return item.roles.some(function (elem) {
                  return roleCodes.includes(elem);
                });
              });

              filteredAction.forEach(function (item) {
                return res.push(item.action);
              });
            }
            return res;
          }, []);
          var actions = filteredData;
          var _found = actions && actions.length > 0 ? actions.includes((0, _get2.default)(roleDefination, "action")) : false;
          visible = _found;
        }
      }

      if (gridDefination) {
        return Component && visible && _react2.default.createElement(
          _Item2.default,
          gridDefination,
          _react2.default.createElement(
            Component,
            (0, _extends3.default)({ id: uiFramework + "-" + id }, props),
            children && children
          )
        );
      } else {
        return Component && visible && _react2.default.createElement(
          Component,
          (0, _extends3.default)({ id: uiFramework + "-" + id }, props),
          children && children
        );
      }
    }
  }]);
  return ComponentInterface;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;

  var menu = (0, _get2.default)(state.app, "menu", []);
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  var moduleName = (0, _moduleConfig.getModuleName)(window.location.pathname);
  var jsonPath = "";
  if (moduleName === "FIRENOC") {
    jsonPath = "FireNOCs[0].fireNOCDetails.status";
  } else if (moduleName === "NewTL") {
    jsonPath = "Licenses[0].status";
  } else if (moduleName === "BPA" || moduleName === "BPA_LOW" || moduleName === "BPA_OC") {
    jsonPath = "BPA.status";
  } else {
    jsonPath = "Licenses[0].status";
  }
  var applicationStatus = (0, _get2.default)(preparedFinalObject, jsonPath);
  var bpaTradeType = "";
  if (window.location.pathname.includes("bpastakeholder")) {
    bpaTradeType = (0, _get2.default)(preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType", "");
  }
  return { applicationStatus: applicationStatus, menu: menu, bpaTradeType: bpaTradeType };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(ComponentInterface);