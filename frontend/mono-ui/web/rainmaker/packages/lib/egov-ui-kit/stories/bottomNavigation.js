"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _Paper = require("material-ui/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _BottomNavigation = require("../components/BottomNavigation");

var _BottomNavigation2 = _interopRequireDefault(_BottomNavigation);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _webfontloader = require("webfontloader");

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _FontIcon = require("material-ui/FontIcon");

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _locationOn = require("material-ui/svg-icons/communication/location-on");

var _locationOn2 = _interopRequireDefault(_locationOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fonts
var recentsIcon = _react2.default.createElement(
  _FontIcon2.default,
  { className: "material-icons" },
  "restore"
);

//Web font loader

var favoritesIcon = _react2.default.createElement(
  _FontIcon2.default,
  { className: "material-icons" },
  "favorite"
);
var nearbyIcon = _react2.default.createElement(_locationOn2.default, null);

// load material icons
_webfontloader2.default.load({
  google: {
    families: ["Material+Icons"]
  }
});

var options = [{
  label: "Recents",
  icon: recentsIcon,
  route: "/recents"
}, {
  label: "Favourites",
  icon: favoritesIcon,
  route: "/favourites"
}, {
  label: "Nearby",
  icon: nearbyIcon,
  route: "/nearby"
}];

(0, _react3.storiesOf)("Bottom Navigation", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with options", function () {
  return _react2.default.createElement(
    _Paper2.default,
    { zDepth: 1 },
    _react2.default.createElement(_BottomNavigation2.default, { selectedIndex: 0, options: options, handleChange: (0, _addonActions.action)("clicked") })
  );
});