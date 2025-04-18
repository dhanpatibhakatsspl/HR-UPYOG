"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutosuggestContainer = exports.DialogContainer = exports.CheckBoxContainer = exports.AdjustmentAmountContainer = exports.DocumentListContainer = exports.EstimateCardContainer = undefined;

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

var EstimateCardContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./EstimateCardContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var DocumentListContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DocumentListContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var AdjustmentAmountContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./AdjustmentAmountContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var CheckBoxContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CheckBoxContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DialogContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DialogContainer");
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

exports.EstimateCardContainer = EstimateCardContainer;
exports.DocumentListContainer = DocumentListContainer;
exports.AdjustmentAmountContainer = AdjustmentAmountContainer;
exports.CheckBoxContainer = CheckBoxContainer;
exports.DialogContainer = DialogContainer;
exports.AutosuggestContainer = AutosuggestContainer;