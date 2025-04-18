"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// if using img-circle dont use border radius,remember circular images should have a border radius of 50%

(0, _react3.storiesOf)("Image", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("default usage", function () {
  return _react2.default.createElement(_components.Image, { source: "http://via.placeholder.com/350x250" });
}).add("image with circle", function () {
  return _react2.default.createElement(_components.Image, { className: "img-circle", style: { borderRadius: "50%", width: "100px", height: "100px" }, source: "http://via.placeholder.com/350x250" });
});