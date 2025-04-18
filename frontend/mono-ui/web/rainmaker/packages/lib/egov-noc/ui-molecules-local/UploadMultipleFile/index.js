"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _UploadedDocument = require("../../ui-atoms-local/UploadedDocument");

var _UploadedDocument2 = _interopRequireDefault(_UploadedDocument);

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadMultipleFile = function UploadMultipleFile(_ref) {
  var uploaded = _ref.uploaded,
      classes = _ref.classes,
      handleFileUpload = _ref.handleFileUpload,
      documents = _ref.documents,
      _removeDocument = _ref.removeDocument,
      onButtonClick = _ref.onButtonClick,
      inputProps = _ref.inputProps,
      buttonLabel = _ref.buttonLabel,
      id = _ref.id;

  if (!inputProps.multiple) {
    inputProps.multiple = inputProps.multiple == false ? true : false;
  }
  return _react2.default.createElement(
    "div",
    null,
    uploaded && _react2.default.createElement(
      "div",
      null,
      documents && documents.map(function (document, documentIndex) {
        return _react2.default.createElement(
          "div",
          { className: "divellip", key: documentIndex },
          document && _react2.default.createElement(_UploadedDocument2.default, {
            document: document,
            removeDocument: function removeDocument() {
              return _removeDocument(documentIndex);
            },
            disabled: !document.isClickable
          })
        );
      })
    ),
    _react2.default.createElement(_uiAtoms.UploadFile, {
      buttonProps: {
        variant: "outlined",
        color: "primary",
        onClick: onButtonClick
      },
      id: id,
      handleFileUpload: handleFileUpload,
      inputProps: (0, _extends3.default)({}, inputProps),
      classes: classes,
      buttonLabel: buttonLabel
    })
  );
};

exports.default = UploadMultipleFile;