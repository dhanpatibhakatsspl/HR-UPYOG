"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _Home = require("../screens/Home");

var _Home2 = _interopRequireDefault(_Home);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _wrapper = require("./wrapper.js");

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("PGR Screens", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("Home", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    { imports: ["import Home from \"../pgr/home\";"], component: "Home", code: "<Home/>" },
    _react2.default.createElement(_Home2.default, null),
    _react2.default.createElement("br", null),
    _react2.default.createElement("br", null)
  );
});