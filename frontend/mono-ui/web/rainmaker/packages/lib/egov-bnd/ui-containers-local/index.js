"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutosuggestContainer = exports.TestContainer = undefined;

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

var TestContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TestContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var AutosuggestContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./AutosuggestContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestContainer = TestContainer;
exports.AutosuggestContainer = AutosuggestContainer;