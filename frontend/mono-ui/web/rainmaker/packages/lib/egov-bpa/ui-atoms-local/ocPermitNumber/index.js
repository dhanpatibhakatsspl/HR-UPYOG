"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
  color: "rgba(255, 255, 255, 0.8700000047683716)",
  marginLeft: "8px",
  paddingLeft: "19px",
  paddingRight: "19px",
  textAlign: "center",
  verticalAlign: "middle",
  lineHeight: "35px",
  fontSize: "16px"
};

function ocPermitNumber(props) {
  var number = props.number;

  return _react2.default.createElement(
    "div",
    { style: styles },
    _react2.default.createElement(_LabelContainer2.default, { labelName: "OC Permit No.", labelKey: "BPA_APPLICATION_OC_PERMIT_NO_CODE", dynamicArray: [number] })
  );
}

exports.default = ocPermitNumber;