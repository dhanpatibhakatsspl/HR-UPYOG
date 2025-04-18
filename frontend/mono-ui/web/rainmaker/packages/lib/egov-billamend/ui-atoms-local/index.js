"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuButton = exports.AutoSuggest = exports.ToolTipContainer = exports.ConsumerNo = exports.TestAtoms = undefined;

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
var TestAtoms = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TestAtoms");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ConsumerNo = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ConsumerNo");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ToolTipContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ToolTipContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var AutoSuggest = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./AutoSuggest");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var MenuButton = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MenuButton");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestAtoms = TestAtoms;
exports.ConsumerNo = ConsumerNo;
exports.ToolTipContainer = ToolTipContainer;
exports.AutoSuggest = AutoSuggest;
exports.MenuButton = MenuButton;