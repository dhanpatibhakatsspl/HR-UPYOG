"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _commons = require("egov-ui-framework/ui-utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function licenceNoContainer(props) {
  var number = props.number;

  return _react2.default.createElement(
    "div",
    { className: "application-no-container" },
    _react2.default.createElement(_LabelContainer2.default, { labelName: "License No.", labelKey: "TL_LICENSE_NO_CODE", dynamicArray: [number] })
  );
}
exports.default = licenceNoContainer;