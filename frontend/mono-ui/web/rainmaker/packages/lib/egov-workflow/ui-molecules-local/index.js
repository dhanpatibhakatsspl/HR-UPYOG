"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskStatusComponents = exports.TaskDialog = exports.ActionDialog = exports.Footer = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LinearSpinner = require("egov-ui-framework//ui-atoms/LinearSpinner");

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement(_LinearSpinner2.default, null);
};

var Footer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Footer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ActionDialog = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ActionDialog");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var TaskDialog = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TaskDialog");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var TaskStatusComponents = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TaskStatusComponents");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.Footer = Footer;
exports.ActionDialog = ActionDialog;
exports.TaskDialog = TaskDialog;
exports.TaskStatusComponents = TaskStatusComponents;