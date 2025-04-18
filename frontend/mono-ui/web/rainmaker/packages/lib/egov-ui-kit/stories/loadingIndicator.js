"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  container: {
    height: "100%",
    width: "100%",
    position: "fixed",
    backgroundColor: "rgba(189,189,189,0.5)",
    zIndex: 9998,
    left: 0,
    top: 0
  },
  containerHide: {
    display: "none",
    position: "relative"
  },
  refresh: {
    display: "block",
    position: "relative",
    zIndex: 9999,
    marginLeft: "48%",
    marginTop: "23%"
  }
};

(0, _react3.storiesOf)("LoadingIndicator", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("load", function () {
  return _react2.default.createElement(_components.LoadingIndicator, { status: "loading", size: 40, left: 50, top: 0, loadingColor: "#8B008B", style: style.refresh });
});