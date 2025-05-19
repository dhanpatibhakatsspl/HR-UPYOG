"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _Label = require("../components/Label");

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dialogProps = {
  style: { width: "90%", height: "95%" },
  open: true,
  children: _react2.default.createElement(
    "p",
    null,
    "Example"
  ),
  actions: [_react2.default.createElement(_Label2.default, {
    label: "CLOSE",
    onClick: function onClick() {
      alert("clicked close");
    }
  }), _react2.default.createElement(_Label2.default, {
    label: "OK",
    onClick: function onClick() {
      alert("clicked ok");
    }
  })]
};

(0, _react3.storiesOf)("Dialog", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("withactions", function () {
  return _react2.default.createElement(_components.Dialog, { dialogProps: dialogProps });
});