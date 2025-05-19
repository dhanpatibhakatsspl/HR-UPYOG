"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _wrapper = require("./wrapper.js");

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("TextField", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    {
      imports: ["import { TextField } from \"<Egov-Reusable-Components-Location>\";"],
      component: "TextField",
      code: "<TextField\n              label=\"Test\"\n              isRequired={true}\n              errorMessage={\"please enter valid\"}\n              value={\"test Value\"}\n              disabled=false\n              hide=floatingLabelStyle\n              className={\"\"}\n              onChange={action(\"clicked\")}\n      />"
    },
    _react2.default.createElement(_components.TextField, {
      label: "Test",
      isRequired: true,
      errorMessage: "Please enter a valid Message",
      value: "test Value",
      disabled: false,
      hide: false,
      className: "",
      onChange: (0, _addonActions.action)("clicked")
    })
  );
});