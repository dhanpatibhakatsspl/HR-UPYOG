"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Step = require("@material-ui/core/Step");

var _Step2 = _interopRequireDefault(_Step);

var _StepLabel = require("@material-ui/core/StepLabel");

var _StepLabel2 = _interopRequireDefault(_StepLabel);

var _Stepper = require("@material-ui/core/Stepper");

var _Stepper2 = _interopRequireDefault(_Stepper);

var _styles = require("@material-ui/core/styles");

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var theme = (0, _styles.createMuiTheme)({
  overrides: {
    MuiStepIcon: {
      completed: {
        color: '#39CB74!important'
      },
      active: {
        color: '#fe7a51!important'
      }
    }
  }
});

var ptSteps = ["PT_PROPERTY_ADDRESS_SUB_HEADER", "PT_ASSESMENT_INFO_SUB_HEADER", "PT_OWNERSHIP_INFO_SUB_HEADER", "PT_DOCUMENT_INFO", "PT_COMMON_SUMMARY"];

var WizardComponent = function WizardComponent(_ref) {
  var downloadAcknowledgementForm = _ref.downloadAcknowledgementForm,
      content = _ref.content,
      header = _ref.header,
      footer = _ref.footer,
      onTabClick = _ref.onTabClick,
      selected = _ref.selected,
      closeDialogue = _ref.closeDialogue,
      dialogueOpen = _ref.dialogueOpen,
      onPayButtonClick = _ref.onPayButtonClick,
      formValidIndexArray = _ref.formValidIndexArray,
      updateIndex = _ref.updateIndex,
      backLabel = _ref.backLabel,
      nextLabel = _ref.nextLabel,
      history = _ref.history,
      nextButtonEnabled = _ref.nextButtonEnabled;

  selected == 5 || selected == 7 ? selected == 5 ? backLabel = 'PT_APPLICATION_BUTTON_DOWN_CONF' : backLabel = 'PT_ASSESS_PAY_FOR_NEW_YEAR' : backLabel;
  return _react2.default.createElement(
    "div",
    { className: "wizard-cont active-step-" + selected },
    selected < 5 && _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        _styles.MuiThemeProvider,
        { theme: theme },
        _react2.default.createElement(
          _Stepper2.default,
          {
            activeStep: selected,
            alternativeLabel: true,
            style: {
              background: "inherit"
            },
            className: "stepper-container"
          },
          ptSteps.map(function (label) {
            return _react2.default.createElement(
              _Step2.default,
              { key: label },
              _react2.default.createElement(
                _StepLabel2.default,
                null,
                _react2.default.createElement(_translationNode2.default, { label: label })
              )
            );
          })
        )
      )
    ),
    selected < 4 && _react2.default.createElement(
      "div",
      null,
      header
    ),
    _react2.default.createElement(
      "div",
      { className: "wizard-content clearfix" },
      content
    ),
    footer,
    _react2.default.createElement(
      "div",
      { id: "tax-wizard-buttons", className: "wizard-footer col-sm-10", style: { textAlign: "right" } },
      _react2.default.createElement(
        "div",
        { className: "button-container col-xs-10", style: { float: "right" } },
        selected != 5 && selected != 4 && _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: backLabel, color: "#fe7a51" }),
          onClick: function onClick() {
            selected - 1 === -1 ? history.push("/pt-mutation/propertySearch") : onTabClick(selected - 1);
          },
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
          buttonStyle: { border: "1px solid #fe7a51" },
          style: { marginRight: 45, width: "30%" }
        }),
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: nextLabel, color: "#fff" }),
          style: { width: "30%" },
          backgroundColor: "#fe7a51",
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
          buttonStyle: { border: 0 }
          // onClick={
          //   selected === 4
          //     ? onPayButtonClick
          //     : () => {
          //         updateIndex(selected + 1);
          //       }
          // }
          , onClick: selected === 7 ? onPayButtonClick : function () {
            updateIndex(selected + 1);
          },
          disabled: !nextButtonEnabled
        })
      )
    )
  );
};

exports.default = WizardComponent;