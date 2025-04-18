"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _mapPin = require("../assets/mapPin.png");

var _mapPin2 = _interopRequireDefault(_mapPin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currLoc = {};
var showMyAddress = true;
var myLocation = { lat: 12.972442, lng: 77.580643 };

if (showMyAddress === true && myLocation) {
  currLoc = myLocation;
} else if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    currLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
  });
}

var setPickedLocation = function setPickedLocation(lat, lng, index) {
  if (_.isUndefined(index)) index = 0;
};

var styles = {
  boxSizing: "border-box",
  border: "1px solid transparent",
  width: "65%",
  height: "32px",
  marginTop: "10px",
  padding: "0 12px",
  borderRadius: "3px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  fontSize: "14px",
  outline: "none",
  textOverflow: "ellipses"
};

(0, _react3.storiesOf)("MapLocation", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("with a marker", function () {
  return _react2.default.createElement(_components.MapLocation, { currLoc: currLoc, styles: styles, setLocation: setPickedLocation, icon: _mapPin2.default });
});