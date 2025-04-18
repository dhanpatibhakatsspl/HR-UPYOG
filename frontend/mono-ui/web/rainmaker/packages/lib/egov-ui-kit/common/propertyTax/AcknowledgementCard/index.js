"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AcknowledgementCard = function AcknowledgementCard(props) {
  var _props$acknowledgeTyp = props.acknowledgeType,
      acknowledgeType = _props$acknowledgeTyp === undefined ? 'success' : _props$acknowledgeTyp,
      _props$messageHeader = props.messageHeader,
      messageHeader = _props$messageHeader === undefined ? '' : _props$messageHeader,
      _props$message = props.message,
      message = _props$message === undefined ? '' : _props$message,
      _props$receiptHeader = props.receiptHeader,
      receiptHeader = _props$receiptHeader === undefined ? 'PT_APPLICATION_NO_LABEL' : _props$receiptHeader,
      _props$receiptNo = props.receiptNo,
      receiptNo = _props$receiptNo === undefined ? '' : _props$receiptNo;

  var icon = void 0;
  var iconColor = void 0;
  if (acknowledgeType == 'success') {
    icon = 'done';
    iconColor = '#39CB74';
  } else if (acknowledgeType == 'failed') {
    icon = 'close';
    iconColor = '#E54D42';
  } else {
    icon = 'done';
    iconColor = '#39CB74';
  }

  return _react2.default.createElement(_components.Card, { style: { backgroundColor: 'white' },
    textChildren: _react2.default.createElement(
      "div",
      { className: "MuiCardContent-root-97" },
      _react2.default.createElement(
        "div",
        { className: "ack-header MuiGrid-container-98", id: "material-ui-applicationSuccessContainer" },
        _react2.default.createElement(
          "div",
          { className: "MuiAvatar-root-195 MuiAvatar-colorDefault-196", id: "material-ui-avatar", style: { width: '72px', height: '72px', backgroundColor: iconColor } },
          _react2.default.createElement(
            _FloatingActionButton2.default,
            { className: "floating-button", style: { boxShadow: 0 }, backgroundColor: iconColor },
            _react2.default.createElement(
              "i",
              { id: "custom-atoms-body", className: "material-icons", style: { fontSize: "50px" } },
              icon
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "ack-body", id: "custom-atoms-body" },
          _react2.default.createElement(
            "h1",
            { className: "MuiTypography-root-8 MuiTypography-headline-13", id: "material-ui-header" },
            _react2.default.createElement(
              "span",
              { id: "custom-containers-key" },
              " ",
              _react2.default.createElement(_translationNode2.default, { label: messageHeader, color: "rgba(0, 0, 0, 0.87)", fontSize: "24px", fontWeight: "400", fontFamily: "Roboto", lineHeight: "1.35417em" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "ack-sub-body", id: "custom-atoms-paragraph" },
            _react2.default.createElement(
              "span",
              null,
              " ",
              _react2.default.createElement(_translationNode2.default, { label: message, color: "rgba(0, 0, 0, 0.6)", fontFamily: "Roboto" })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "ack-text", id: "custom-atoms-tail" },
          receiptNo && _react2.default.createElement(
            "h1",
            { className: "MuiTypography-root-8 MuiTypography-headline-13", id: "material-ui-text", style: { fontSize: '16px', fontWeight: "400", color: 'rgba(0, 0, 0, 0.6)' } },
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement(_translationNode2.default, { label: receiptHeader, fontSize: "16px", fontWeight: "400", color: "rgba(0, 0, 0, 0.6)" })
            )
          ),
          receiptNo && _react2.default.createElement(
            "h1",
            { className: "MuiTypography-root-8 MuiTypography-headline-13", id: "material-ui-paragraph", style: { fontSize: '24px', fontWeight: "500" } },
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement(_translationNode2.default, { label: receiptNo, fontSize: "24px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "500" })
            )
          )
        )
      )
    ) });
};

exports.default = AcknowledgementCard;