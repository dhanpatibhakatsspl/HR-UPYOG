"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _Badge = require("material-ui/Badge");

var _Badge2 = _interopRequireDefault(_Badge);

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _notifications = require("material-ui/svg-icons/social/notifications");

var _notifications2 = _interopRequireDefault(_notifications);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _wrapper = require("./wrapper.js");

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("AppBar", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    {
      imports: ["import { AppBar} from \"<Egov-Reusable-Components-Location>\";", "import Badge from \"material-ui/Badge\";", "import IconButton from \"material-ui/IconButton\";", "import NotificationsIcon from \"material-ui/svg-icons/social/notifications\";"],
      component: "AppBar",
      code: "<AppBar\n        title=\"Mseva / Home\"\n        iconElementRight={\n          <Badge\n            badgeContent={10}\n            secondary={true}\n            badgeStyle={{ top: 2, right: 2}}\n            style={{padding:\"0\"}}\n          >\n            <IconButton style={{color:\"white\"}} tooltip=\"Notifications\" onClick={action(\"notification clicked\")}>\n              <NotificationsIcon />\n            </IconButton>\n          </Badge>\n        }\n        onLeftIconButtonClick={action(\"menu clicked\")}\n      />"
    },
    _react2.default.createElement(_components.AppBar, {
      title: "Mseva / Home",
      iconElementRight: _react2.default.createElement(
        _Badge2.default,
        { badgeContent: 10, secondary: true, badgeStyle: { top: 2, right: 2 }, style: { padding: "0" } },
        _react2.default.createElement(
          _IconButton2.default,
          { tooltip: "Notifications", onClick: (0, _addonActions.action)("notification clicked") },
          _react2.default.createElement(_notifications2.default, { color: "white" })
        )
      ),
      onLeftIconButtonClick: (0, _addonActions.action)("menu clicked")
    }),
    _react2.default.createElement("br", null),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "div",
      null,
      "For more props information please visit",
      " ",
      _react2.default.createElement(
        "a",
        { href: "http://www.material-ui.com/#/components/app-bar", target: "_blank", rel: "noopener noreferrer" },
        "AppBar"
      )
    )
  );
});