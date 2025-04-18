"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _YearDialogue = require("../YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlankAssessment = function BlankAssessment(_ref) {
  var noAssessmentMessage = _ref.noAssessmentMessage,
      button = _ref.button,
      dialogueOpen = _ref.dialogueOpen,
      closeDialogue = _ref.closeDialogue,
      onButtonClick = _ref.onButtonClick,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    { className: "no-assessment-message-cont" },
    _react2.default.createElement(_translationNode2.default, { label: noAssessmentMessage, dark: true, fontSize: "16px" }),
    button && _react2.default.createElement(_components.Button, {
      className: "assessment-button",
      primary: true,
      label: _react2.default.createElement(_translationNode2.default, { label: "PT_NO_ASSESSMENT_BUTTON", labelClassName: "no-assessment-button-label-style", color: "#ffffff", buttonLabel: true, dark: true }),
      style: {
        height: 36,
        lineHeight: "auto",
        minWidth: "inherit"
      },
      onClick: onButtonClick
    }),
    _react2.default.createElement(_YearDialogue2.default, { open: dialogueOpen, history: history, closeDialogue: closeDialogue })
  );
};

exports.default = BlankAssessment;