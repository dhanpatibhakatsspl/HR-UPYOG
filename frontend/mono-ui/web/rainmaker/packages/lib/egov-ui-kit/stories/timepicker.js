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

(0, _react3.storiesOf)("TimePicker", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    {
      imports: ["import { TimePicker } from \"<Egov-Reusable-Components-Location>\";"],
      component: "TimePicker",
      code: "<TimePicker\n          onChange={action(\"clicked\")}\n          autoOk={true}\n          floatingLabelText=\"Test Date Picker\"\n      />"
    },
    _react2.default.createElement(_components.TimePicker, { onChange: (0, _addonActions.action)("clicked"), autoOk: true, floatingLabelText: "Test Time Picker" }),
    _react2.default.createElement("br", null),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "div",
      null,
      "For more props information please visit",
      " ",
      _react2.default.createElement(
        "a",
        { href: "http://www.material-ui.com/#/components/time-picker", target: "_blank", rel: "noopener noreferrer" },
        "Time picker"
      )
    )
  );
});