"use strict";

require("babel-polyfill");

require("url-search-params-polyfill");

require("rainmaker-employee/src/webview/web-share-shim.bundle.min");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

require("rainmaker-employee/src/webview/sms");

var _App = require("./App");

var _App2 = _interopRequireDefault(_App);

var _store = require("redux/store");

var _store2 = _interopRequireDefault(_store);

var _theme = require("rainmaker-employee/src/config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _themeNew = require("rainmaker-employee/src/config/themeNew");

var _themeNew2 = _interopRequireDefault(_themeNew);

var _webfontloader = require("webfontloader");

var _webfontloader2 = _interopRequireDefault(_webfontloader);

require("egov-ui-kit/assets/styles/bootstrap-customized.css");

require("egov-ui-kit/assets/styles/app.css");

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _styles = require("@material-ui/core/styles");

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import injectTapEventPlugin from "react-tap-event-plugin";
//Web font loader
// support for older browsers
var muiThemeV0 = (0, _getMuiTheme2.default)(_theme2.default); // v1.x

// styles


// sms listener

var themeVX = (0, _styles.createMuiTheme)(_themeNew2.default);
// to eliminate the click delay
// injectTapEventPlugin();

// load material icons
_webfontloader2.default.load({
  google: {
    families: ["Material+Icons", "Roboto"]
  }
});

// move it to a env file
window.basename = process.env.NODE_ENV === "production" ? "/employee" : "";
// hardcoded the base; to be changed soon!!!!!
(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(
    _styles.MuiThemeProvider,
    { theme: themeVX },
    _react2.default.createElement(
      _materialUi.MuiThemeProvider,
      { muiTheme: muiThemeV0 },
      _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        { basename: window.basename },
        _react2.default.createElement(_App2.default, null)
      )
    )
  )
), document.getElementById("root"));