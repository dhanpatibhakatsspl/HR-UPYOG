"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OthersContainer = exports.DisabledComponent = exports.ApplicationNoContainer = exports.AutoSuggest = exports.ArrearTable = exports.TestAtoms = exports.LinkComponent = undefined;

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
var ArrearTable = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ArrearTable");
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
var ApplicationNoContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ApplicationNo");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var OthersContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./OthersContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DisabledComponent = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DisabledComponent");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var LinkComponent = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./LinkComponent");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.LinkComponent = LinkComponent;
exports.TestAtoms = TestAtoms;
exports.ArrearTable = ArrearTable;
exports.AutoSuggest = AutoSuggest;
exports.ApplicationNoContainer = ApplicationNoContainer;
exports.DisabledComponent = DisabledComponent;
exports.OthersContainer = OthersContainer;