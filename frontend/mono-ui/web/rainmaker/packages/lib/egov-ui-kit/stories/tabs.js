"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _Tabs = require("../components/Tabs");

var _Tabs2 = _interopRequireDefault(_Tabs);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
  label: "My Complaints",
  route: "/my-complaints"
}, {
  label: "Around Me",
  route: "/around-me"
}];

(0, _react3.storiesOf)("Tabs", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with options", function () {
  return _react2.default.createElement(_Tabs2.default, { tabs: tabs, onActive: (0, _addonActions.action)("clicked") });
});