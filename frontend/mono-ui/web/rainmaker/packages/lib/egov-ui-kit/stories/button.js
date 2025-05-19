"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("Button", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with text", function () {
  return _react2.default.createElement(_components.Button, { label: "Hello", onClick: (0, _addonActions.action)("clicked") });
}).add("with some emoji", function () {
  return _react2.default.createElement(_components.Button, { label: "\uD83D\uDE00 \uD83D\uDE0E \uD83D\uDC4D \uD83D\uDCAF", onClick: (0, _addonActions.action)("clicked") });
}).add("with primary true", function () {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_components.Button, { primary: true, label: "Button with primary", onClick: (0, _addonActions.action)("clicked") })
  );
}).add("with disabled", function () {
  return _react2.default.createElement(_components.Button, { disabled: true, label: "I am disabled" });
});