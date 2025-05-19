"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkFlowContainer = exports.TaskStatusContainer = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LinearSpinner = require("egov-ui-framework/ui-atoms/LinearSpinner");

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement(_LinearSpinner2.default, null);
};

var TaskStatusContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TaskStatusContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var WorkFlowContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./WorkFlowContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TaskStatusContainer = TaskStatusContainer;
exports.WorkFlowContainer = WorkFlowContainer;