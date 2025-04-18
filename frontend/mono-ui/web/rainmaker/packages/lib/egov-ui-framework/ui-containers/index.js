"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyLabelConatiner = exports.AcknowledgementContainer = exports.DynamicMdmsContainer = exports.DialogContainer = exports.AutosuggestContainer = exports.DownloadFileContainer = exports.CustomTabContainer = exports.SnackbarContainer = exports.MultiItem = exports.LabelContainer = exports.RadioGroupContainer = exports.TextFieldContainer = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LinearSpinner = require("../ui-atoms/LinearSpinner");

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement(_LinearSpinner2.default, null);
};

var LabelContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./LabelContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var TextFieldContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TextFieldContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MultiItem = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MultiItem");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var SnackbarContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./SnackbarContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var CustomTabContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CustomTabContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var DownloadFileContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DownloadFileContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var RadioGroupContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./RadioGroupContainer");
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

var DialogContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DialogContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var DynamicMdmsContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DynamicMdmsContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var AcknowledgementContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./AcknowledgementContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ModifyLabelConatiner = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ModifyLabelConatiner");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TextFieldContainer = TextFieldContainer;
exports.RadioGroupContainer = RadioGroupContainer;
exports.LabelContainer = LabelContainer;
exports.MultiItem = MultiItem;
exports.SnackbarContainer = SnackbarContainer;
exports.CustomTabContainer = CustomTabContainer;
exports.DownloadFileContainer = DownloadFileContainer;
exports.AutosuggestContainer = AutosuggestContainer;
exports.DialogContainer = DialogContainer;
exports.DynamicMdmsContainer = DynamicMdmsContainer;
exports.AcknowledgementContainer = AcknowledgementContainer;
exports.ModifyLabelConatiner = ModifyLabelConatiner;