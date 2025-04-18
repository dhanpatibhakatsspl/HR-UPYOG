"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiContainers = require("egov-ui-framework/ui-containers");

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
  fontSize: "16px",
  height: "fit-content"
};

// function ApplicationNoContainer(props) {
//   const { number } = props;
//   return <div style={styles}>Challan No. {number}</div>;
// }

var ApplicationNoContainer = function ApplicationNoContainer(props) {
  var number = props.number,
      label = props.label;

  return _react2.default.createElement(
    "div",
    { style: styles },
    _react2.default.createElement(_uiContainers.LabelContainer, {
      labelName: label.labelValue,
      labelKey: label.labelKey
    }),
    _react2.default.createElement(
      "span",
      null,
      " "
    ),
    number
  );
};

exports.default = ApplicationNoContainer;