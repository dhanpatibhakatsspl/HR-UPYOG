"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _locationOn = require("material-ui/svg-icons/communication/location-on");

var _locationOn2 = _interopRequireDefault(_locationOn);

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("Label", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with text", function () {
  return _react2.default.createElement(_components.Label, { label: "Location" });
}).add("with primary colour", function () {
  return _react2.default.createElement(_components.Label, { primary: true, labelPosition: "after", label: "Location" });
}).add("with icon after label", function () {
  return _react2.default.createElement(_components.Label, { labelPosition: "before", label: "Location", icon: _react2.default.createElement(_locationOn2.default, null) });
}).add("with icon before label", function () {
  return _react2.default.createElement(_components.Label, { labelPosition: "after", label: "Location", icon: _react2.default.createElement(_locationOn2.default, null) });
});