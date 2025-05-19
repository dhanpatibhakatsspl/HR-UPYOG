"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@material-ui/core");

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _styles = require("@material-ui/core/styles");

var _withMobileDialog = require("@material-ui/core/withMobileDialog");

var _withMobileDialog2 = _interopRequireDefault(_withMobileDialog);

var _Stepper = require("../Stepper");

var _Stepper2 = _interopRequireDefault(_Stepper);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      marginTop: 24,
      width: "100%"
    }
  };
};

var TaskDialog = function TaskDialog(props) {
  var open = props.open,
      onClose = props.onClose,
      history = props.history;

  var fullscreen = false;
  // Fullscreen covering full mobile screen making it impossible to close dialog. Hence commenting out below line
  if (window.innerWidth <= 768) {
    fullscreen = true;
  }
  return _react2.default.createElement(
    _core.Dialog,
    {
      fullScreen: fullscreen,
      open: open,
      onClose: onClose,
      maxWidth: false,
      style: { zIndex: 2000 },
      className: "task-dialog"
    },
    _react2.default.createElement(_core.DialogContent, {
      children: _react2.default.createElement(_uiAtoms.Container, {
        children: _react2.default.createElement(
          _core.Grid,
          { container: "true", sm: "12", spacing: 16, marginTop: 16 },
          _react2.default.createElement(
            _core.Grid,
            {
              style: { alignItems: "center", display: "flex" },
              item: true,
              sm: 10
            },
            _react2.default.createElement(
              _core.Typography,
              { component: "h2", variant: "subheading" },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelName: "Task Status",
                labelKey: "TL_TASK_STATUS"
              })
            ),
            _react2.default.createElement(
              _core.Grid,
              {
                item: true,
                sm: 2,
                style: {
                  textAlign: "right",
                  cursor: "pointer",
                  position: "absolute",
                  right: "20px"
                },
                onClick: onClose
              },
              _react2.default.createElement(_Close2.default, null)
            )
          ),
          _react2.default.createElement(_Stepper2.default, { content: history })
        )
      })
    })
  );
};

exports.default = (0, _styles.withStyles)(styles)((0, _withMobileDialog2.default)({ breakpoint: 'xs' })(TaskDialog));