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

(0, _react3.storiesOf)("TimeLine", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    {
      imports: ["import { TimeLine } from \"<Egov-Reusable-Components-Location>\";"],
      component: "TimeLine",
      code: "<TimeLine\n        header={{\n          title: \"URL Avatar\",\n          subtitle: \"Subtitle\",\n          avatar: \"images/jsa-128.jpg\"\n        }}\n        // media={{overlay:{{<TimeLineTitle title=\"Overlay title\" subtitle=\"Overlay subtitle\" />)}}}}\n        mediaChildren={\n          <img src=\"images/nature-600-337.jpg\" alt=\"\" />\n        }\n        title={{\n          title:\"TimeLine title\",\n          subtitle:\"TimeLine subtitle\"\n        }}\n        textChildren={\n          <div>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis\n            pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate\n            interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.\n            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.\n          </div>\n        }\n        actionChildren={\n          <div>\n            <Button\n              primary={true}\n              label=\"Button with primary\"\n              onClick={action(\"clicked\")}\n            />\n            <Button\n              primary={true}\n              label=\"Button with secondry\"\n              onClick={action(\"clicked\")}\n            />\n          </div>\n        }\n\n      />"
    },
    _react2.default.createElement(_components.TimeLine, {
      divStyle: { maxWidth: 380, maxHeight: 400, margin: "auto" },
      stepperProps: {
        activeStep: 0,
        orientation: "vertical"
      },
      steps: [{
        labelChildren: "Select campaign settings 1",
        contentChildren: _react2.default.createElement(
          "p",
          null,
          "For each ad campaign that you create, you can control how much youre willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more."
        )
      }, {
        labelChildren: "Select campaign settings 2",
        contentChildren: _react2.default.createElement(
          "p",
          null,
          "For each ad campaign that you create, you can control how much youre willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more."
        )
      }, {
        labelChildren: "Select campaign settings 3",
        contentChildren: _react2.default.createElement(
          "p",
          null,
          "For each ad campaign that you create, you can control how much youre willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more."
        )
      }]
      // header={{
      //   title: "URL Avatar",
      //   subtitle: "Subtitle",
      //   avatar: "images/jsa-128.jpg"
      // }}
      // mediaChildren={<img src="images/nature-600-337.jpg" alt="" />}
      // title={{
      //   title: "TimeLine title",
      //   subtitle: "TimeLine subtitle"
      // }}
      // textChildren={
      //   <div>
      //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
      //     mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
      //     vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
      //     pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
      //     lobortis odio.
      //   </div>
      // }
      // actionChildren={
      //   <div>
      //     <Button
      //       primary={true}
      //       label="Button with primary"
      //       onClick={action("clicked")}
      //     />
      //     <Button
      //       primary={true}
      //       label="Button with secondry"
      //       onClick={action("clicked")}
      //     />
      //   </div>
      // }
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
        { href: "http://www.material-ui.com/#/components/stepper", target: "_blank", rel: "noopener noreferrer" },
        "Stepper"
      )
    )
  );
});