"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _List = require("../components/List");

var _List2 = _interopRequireDefault(_List);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _call = require("material-ui/svg-icons/communication/call");

var _call2 = _interopRequireDefault(_call);

var _email = require("material-ui/svg-icons/communication/email");

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var items = [{
  leftIcon: _react2.default.createElement(_call2.default, null),
  style: { float: "left" }
}, {
  leftIcon: _react2.default.createElement(_email2.default, null),
  style: { float: "left" }
}];
items.map(function (item, index) {
  item.handler = function () {
    alert(index + " is clicked");
  };
});

(0, _react3.storiesOf)("socialShare", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("share", function () {
  return _react2.default.createElement(_List2.default, { items: items });
});