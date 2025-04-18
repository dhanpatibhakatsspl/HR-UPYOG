"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _inbox = require("material-ui/svg-icons/content/inbox");

var _inbox2 = _interopRequireDefault(_inbox);

var _grade = require("material-ui/svg-icons/action/grade");

var _grade2 = _interopRequireDefault(_grade);

var _send = require("material-ui/svg-icons/content/send");

var _send2 = _interopRequireDefault(_send);

var _drafts = require("material-ui/svg-icons/content/drafts");

var _drafts2 = _interopRequireDefault(_drafts);

var _info = require("material-ui/svg-icons/action/info");

var _info2 = _interopRequireDefault(_info);

var _Avatar = require("material-ui/Avatar");

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require("../components/List");

var _List2 = _interopRequireDefault(_List);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// icons
var items = [{
  primaryText: "Inbox",
  leftIcon: _react2.default.createElement(_inbox2.default, null),
  rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
}, {
  primaryText: "Starred",
  leftIcon: _react2.default.createElement(_grade2.default, null),
  rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
}, {
  primaryText: "Sent Mail",
  leftIcon: _react2.default.createElement(_send2.default, null),
  rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
}, {
  primaryText: "Drafts",
  leftIcon: _react2.default.createElement(_drafts2.default, null),
  initiallyOpen: false,
  primaryTogglesNestedList: true,
  nestedItems: [{
    primaryText: "Inbox",
    leftIcon: _react2.default.createElement(_inbox2.default, null),
    rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
  }, {
    primaryText: "Starred",
    leftIcon: _react2.default.createElement(_grade2.default, null),
    rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
  }, {
    primaryText: "Sent Mail",
    leftIcon: _react2.default.createElement(_send2.default, null),
    rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
  }]
}];

(0, _react3.storiesOf)("List", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with options", function () {
  return _react2.default.createElement(_List2.default, { items: items });
});