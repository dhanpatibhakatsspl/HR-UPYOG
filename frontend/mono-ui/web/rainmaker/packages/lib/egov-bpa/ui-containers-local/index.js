"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewContainer = exports.DownloadFileContainerForFI = exports.BpaConditionsContainer = exports.FieldInspectionContainer = exports.FeildInspectionCards = exports.CheckListContainer = exports.BpaCheckboxContainer = exports.BpaEstimateCardContainer = exports.NocListContainer = exports.EDCRUploadCard = exports.RadioGroupWithLabelContainer = exports.DialogContainer = exports.ViewBreakupContainer = exports.PaymentRedirectPage = exports.BpaDocumentListContainer = exports.DocumentListContainer = exports.AutosuggestContainer = exports.EstimateCardContainer = exports.DocumentSummaryContainer = exports.DownloadFileContainer = exports.CheckboxContainer = exports.LabelContainer = exports.CustomTabContainer = undefined;

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

var CustomTabContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CustomTabContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var TestContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TestContainer");
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

var BpaDocumentListContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./BpaDocumentListContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var NocListContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NocListContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var LabelContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./LabelContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var CheckboxContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CheckboxContainer");
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
var DocumentSummaryContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DocumentSummaryContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var PreviewContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PreviewContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var EstimateCardContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./EstimateCardContainer");
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

var PaymentRedirectPage = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PaymentRedirectPage");
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

var ViewBreakupContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ViewbreakupDialogContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var RadioGroupWithLabelContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./RadioGroupWithLabelContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var EDCRUploadCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./EDCRUploadCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var BpaEstimateCardContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./BpaEstimateCardContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var BpaCheckboxContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./BpaCheckboxContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var CheckListContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CheckListContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FeildInspectionCards = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./FeildInspectionCards");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FieldInspectionContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./FieldInspectionContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var BpaConditionsContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./BpaConditionsContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var DownloadFileContainerForFI = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DownloadFileContainerForFI");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.CustomTabContainer = CustomTabContainer;
exports.LabelContainer = LabelContainer;
exports.CheckboxContainer = CheckboxContainer;
exports.DownloadFileContainer = DownloadFileContainer;
exports.DocumentSummaryContainer = DocumentSummaryContainer;
exports.EstimateCardContainer = EstimateCardContainer;
exports.AutosuggestContainer = AutosuggestContainer;
exports.DocumentListContainer = DocumentListContainer;
exports.BpaDocumentListContainer = BpaDocumentListContainer;
exports.PaymentRedirectPage = PaymentRedirectPage;
exports.ViewBreakupContainer = ViewBreakupContainer;
exports.DialogContainer = DialogContainer;
exports.RadioGroupWithLabelContainer = RadioGroupWithLabelContainer;
exports.EDCRUploadCard = EDCRUploadCard;
exports.NocListContainer = NocListContainer;
exports.BpaEstimateCardContainer = BpaEstimateCardContainer;
exports.BpaCheckboxContainer = BpaCheckboxContainer;
exports.CheckListContainer = CheckListContainer;
exports.FeildInspectionCards = FeildInspectionCards;
exports.FieldInspectionContainer = FieldInspectionContainer;
exports.BpaConditionsContainer = BpaConditionsContainer;
exports.DownloadFileContainerForFI = DownloadFileContainerForFI;
exports.PreviewContainer = PreviewContainer;