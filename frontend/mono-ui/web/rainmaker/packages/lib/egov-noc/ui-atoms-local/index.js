"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NocNumber = exports.UploadedDocument = exports.TestAtoms = undefined;

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

var UploadedDocument = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadedDocument");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var NocNumber = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NocNumber");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestAtoms = TestAtoms;
exports.UploadedDocument = UploadedDocument;
exports.NocNumber = NocNumber;