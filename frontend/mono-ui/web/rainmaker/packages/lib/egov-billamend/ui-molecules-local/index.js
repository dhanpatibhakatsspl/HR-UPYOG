"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadSingleFile = exports.DocumentList = exports.DividerWithLabel = exports.DemandRevisionDetailsCard = exports.FeeEstimateCard = exports.TestMolecules = undefined;

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
var TestMolecules = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TestMolecules");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FeeEstimateCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./FeeEstimateCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DemandRevisionDetailsCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DemandRevisionDetailsCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DividerWithLabel = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DividerWithLabel");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DocumentList = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DocumentList");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadSingleFile = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadSingleFile");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestMolecules = TestMolecules;
exports.FeeEstimateCard = FeeEstimateCard;
exports.DemandRevisionDetailsCard = DemandRevisionDetailsCard;
exports.DividerWithLabel = DividerWithLabel;
exports.DocumentList = DocumentList;
exports.UploadSingleFile = UploadSingleFile;