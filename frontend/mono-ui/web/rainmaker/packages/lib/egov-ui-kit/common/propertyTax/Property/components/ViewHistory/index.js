"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _TransferDetails = require("./TransferDetails");

var _TransferDetails2 = _interopRequireDefault(_TransferDetails);

require("./index.css");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyStyle = {
  backgroundColor: "#FFFFFF",
  border: "0.5px solid rgba(0, 0, 0, 0)",
  boxShadow: "0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22)",
  height: "625px"
};

var contentStyle = {
  width: "100%",
  maxWidth: "fit-content"
};

var ViewHistoryDialog = function ViewHistoryDialog(_ref) {
  var open = _ref.open,
      closeDialogue = _ref.closeDialogue,
      ownershipInfo = _ref.ownershipInfo;

  return _react2.default.createElement(_components.Dialog, {
    open: open,
    children: [_react2.default.createElement(
      "div",
      { style: { margin: 16 } },
      _react2.default.createElement(_translationNode2.default, { label: "PT_OWNER_HISTORY", fontSize: "20px", labelClassName: "owner-history" }),
      _react2.default.createElement("br", null),
      Object.keys(ownershipInfo).map(function (key) {
        var date = (0, _utils.convertEpochToDate)(Number(key));
        return _react2.default.createElement(
          "div",
          { className: "dialog-content" },
          _react2.default.createElement("div", { className: "oval-class" }),
          _react2.default.createElement(_translationNode2.default, { label: "PT_DATE_OF_TRANSFER", fontSize: "14px", className: "date-of-transfer", labelClassName: "date-of-transfer" }),
          _react2.default.createElement(
            "span",
            { className: "date-of-transfer" },
            "\xA0-\xA0",
            date
          ),
          _react2.default.createElement(_TransferDetails2.default, { data: ownershipInfo[key] })
        );
      })
    )],
    bodyStyle: bodyStyle,
    isClose: true,
    handleClose: closeDialogue,
    onRequestClose: closeDialogue,
    contentStyle: contentStyle,
    autoScrollBodyContent: true,
    contentClassName: "view-history-dialog"
  });
};

exports.default = ViewHistoryDialog;