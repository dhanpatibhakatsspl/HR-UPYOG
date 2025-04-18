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

function ApplicationNoContainer(props) {
  var number = props.number;

  var isEditRenewal = (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "action") === "DIRECTRENEWAL";
  var isSubmitRenewal = (0, _commons.getQueryArg)(window.location.href, "purpose") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "purpose") === "DIRECTRENEWAL";
  if (isEditRenewal || isSubmitRenewal) {
    var licenseNumber = (0, _commons.getQueryArg)(window.location.href, "licenseNumber") || "";
    return _react2.default.createElement(
      "div",
      { className: "application-no-container" },
      _react2.default.createElement(_LabelContainer2.default, { labelName: "License No.", labelKey: "TL_LICENSE_NO_CODE", dynamicArray: [licenseNumber] })
    );
  } else return _react2.default.createElement(
    "div",
    { className: "application-no-container" },
    _react2.default.createElement(_LabelContainer2.default, { labelName: "Application No.", labelKey: "TL_APPLICATION_NO_CODE", dynamicArray: [number] })
  );
}
exports.default = ApplicationNoContainer;