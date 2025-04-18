"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferOwnership = exports.ViewHistory = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _History = require("@material-ui/icons/History");

var _History2 = _interopRequireDefault(_History);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
  letterSpacing: 1.2,
  fontWeight: "500",
  lineHeight: "40px"
};
var buttonStyle = {
  lineHeight: "35px",
  height: "100%",
  backgroundColor: "rgb(242, 242, 242)",
  boxShadow: "none",
  border: "none",
  borderRadius: "2px",
  outline: "none",
  alignItems: "right"
};

var viewHistoryLabel = {
  color: "rgba(0, 0, 0, 0.6)",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: "0.58px",
  lineHeight: "17px",
  textAlign: "left",
  cursor: "pointer",
  paddingRight: "20px"
};

var ViewHistory = exports.ViewHistory = function ViewHistory(_ref) {
  var viewHistory = _ref.viewHistory,
      openDialog = _ref.openDialog;

  return viewHistory && _react2.default.createElement(
    "div",
    { className: "view-history-button",
      onClick: function onClick() {
        openDialog("viewHistory");
      }
    },
    _react2.default.createElement(_History2.default, { style: { position: "relative", top: "7px", right: "2px", cursor: "pointer" } }),
    _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_VIEW_HISTORY", color: "rgb(0, 0, 0, 0.6)", height: "40px", labelStyle: viewHistoryLabel })
  );
};

var TransferOwnership = exports.TransferOwnership = function TransferOwnership(_ref2) {
  var ownershipTransfer = _ref2.ownershipTransfer,
      openDialog = _ref2.openDialog;

  return ownershipTransfer && _react2.default.createElement(_components.Button, {
    className: "transfer-ownership",
    label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_OWNERSHIP_TRANSFER", color: "rgb(254, 122, 81)", fontSize: "16px", height: "40px", labelStyle: labelStyle }),
    buttonStyle: buttonStyle,
    onClick: function onClick() {
      openDialog("docRequired");
    }
  });
};