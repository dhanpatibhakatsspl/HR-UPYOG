"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Declaration = function Declaration(_ref) {
  var open = _ref.open,
      closeDialogue = _ref.closeDialogue,
      selected = _ref.selected,
      updateIndex = _ref.updateIndex;

  return _react2.default.createElement(_components.Dialog, {
    open: open,
    children: [_react2.default.createElement(
      "div",
      { style: { margin: 16 } },
      _react2.default.createElement(_translationNode2.default, { label: "PT_FINAL_DECLARATION", color: "#484848", fontSize: "20px" }),
      _react2.default.createElement(_translationNode2.default, { label: "PT_FINAL_DECLARATION_MESSAGE", color: "#767676", containerStyle: { margin: "8px 0px" } }),
      _react2.default.createElement(
        "div",
        { className: "text-right" },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_AGREE_CONTINUE", fontSize: "12px" }),
          primary: true,
          style: {
            height: 40,
            lineHeight: "auto",
            minWidth: "inherit"
          },
          onClick: function onClick(e) {
            updateIndex(selected + 1);
          }
        })
      )
    )],
    bodyStyle: { backgroundColor: "#ffffff" },
    isClose: true,
    handleClose: closeDialogue,
    onRequestClose: closeDialogue,
    contentStyle: { width: "35%" }
  });
};

exports.default = Declaration;