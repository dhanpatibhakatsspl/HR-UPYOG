"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadMultipleFile = exports.UploadCard = exports.MultiDocDetailCard = exports.TestMolecules = undefined;

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

var MultiDocDetailCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MultiDocDetailCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadMultipleFile = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadMultipleFile");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestMolecules = TestMolecules;
exports.MultiDocDetailCard = MultiDocDetailCard;
exports.UploadCard = UploadCard;
exports.UploadMultipleFile = UploadMultipleFile;