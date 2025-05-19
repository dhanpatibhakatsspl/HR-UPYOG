"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _people = require("../assets/people.png");

var _people2 = _interopRequireDefault(_people);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("ProfileSection", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with Location", function () {
  return _react2.default.createElement(_components.ProfileSection, {
    imgStyle: style,
    cardStyles: cardStyles,
    nameStyle: label1,
    locationStyle: label2,
    name: _label1,
    location: _label2,
    imgSrc: _people2.default
  });
});

var style = { borderRadius: "50%", width: 127, height: 127 };
var cardStyles = {
  width: "84.5%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  paddingTop: 30,
  paddingBottom: 30,
  backgroundColor: "#e0e0e0"
};
var label1 = {
  paddingTop: 10,
  fontFamily: "Roboto",
  fontSize: 7,
  fontWeight: 500,
  fontStyle: "normal",
  fontStretch: "normal",
  lineHeight: "normal",
  letterSpacing: 0.3,
  color: "#484848",
  padding: 0,
  textTransform: "none"
};
var iconStyle = {
  height: "18px",
  width: "18px",
  paddingTop: 12
};

var label2 = {
  fontFamily: "Roboto",
  fontSize: 7,
  fontWeight: 500
  // display: 'none'
};

var _label1 = "Name";
var _label2 = "Location";