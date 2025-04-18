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

(0, _react3.storiesOf)("Card", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    {
      imports: ["import { Card, CardTitle } from \"<Egov-Reusable-Components-Location>\";", "import { Button } from \"<Egov-Reusable-Components-Location>\";"],
      component: "Card",
      code: "<Card\n        header={{\n          title: \"URL Avatar\",\n          subtitle: \"Subtitle\",\n          avatar: \"images/jsa-128.jpg\"\n        }}\n        // media={{overlay:{{<CardTitle title=\"Overlay title\" subtitle=\"Overlay subtitle\" />)}}}}\n        mediaChildren={\n          <img src=\"images/nature-600-337.jpg\" alt=\"\" />\n        }\n        title={{\n          title:\"Card title\",\n          subtitle:\"Card subtitle\"\n        }}\n        textChildren={\n          <div>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis\n            pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate\n            interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.\n            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.\n          </div>\n        }\n        actionChildren={\n          <div>\n            <Button\n              primary={true}\n              label=\"Button with primary\"\n              onClick={action(\"clicked\")}\n            />\n            <Button\n              primary={true}\n              label=\"Button with secondry\"\n              onClick={action(\"clicked\")}\n            />\n          </div>\n        }\n\n      />"
    },
    _react2.default.createElement(_components.Card, {
      header: {
        title: "URL Avatar",
        subtitle: "Subtitle",
        avatar: "images/jsa-128.jpg"
      },
      mediaChildren: _react2.default.createElement("img", { src: "images/nature-600-337.jpg", alt: "" }),
      title: {
        title: "Card title",
        subtitle: "Card subtitle"
      },
      textChildren: _react2.default.createElement(
        "div",
        null,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
      ),
      actionChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Button, { primary: true, label: "Button with primary", onClick: (0, _addonActions.action)("clicked") }),
        _react2.default.createElement(_components.Button, { primary: true, label: "Button with secondry", onClick: (0, _addonActions.action)("clicked") })
      )
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
        { href: "http://www.material-ui.com/#/components/card", target: "_blank", rel: "noopener noreferrer" },
        "Card"
      )
    )
  );
});