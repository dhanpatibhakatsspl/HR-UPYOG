"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _addAPhoto = require("material-ui/svg-icons/image/add-a-photo");

var _addAPhoto2 = _interopRequireDefault(_addAPhoto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputProps = {
  accept: "image/*",
  id: "i1",
  multiple: false, //for selecting single or multiple files
  style: {
    display: "none"
  }
};

var AddPhotoStyle = {
  height: "24px",
  width: "24px",
  borderRadius: "50%",
  padding: "12px",
  background: "limegreen"
};
var labelProps = _react2.default.createElement(_addAPhoto2.default, { style: AddPhotoStyle, color: "#FFFFFF" });

(0, _react3.storiesOf)("FilePicker", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("filePicker", function () {
  return _react2.default.createElement(_components.FilePicker, { inputProps: inputProps, pickIcon: labelProps, handleimage: (0, _addonActions.action)("file") });
});