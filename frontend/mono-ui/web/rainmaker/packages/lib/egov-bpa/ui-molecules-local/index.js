"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NocData = exports.NocDocDetailCard = exports.NocDetailCard = exports.ComparisionLink = exports.UploadCard = exports.MultiDocDetailCard = exports.SingleDocDetailCard = exports.MultiDownloadCard = exports.ActionDialog = exports.CheckList = exports.BpaFeesEstimateCard = exports.DividerWithLabel = exports.UploadMultipleFile = exports.UploadSingleFile = exports.Table = exports.NocList = exports.EdcrSingleApplication = exports.HowItWorks = exports.FeesEstimateCard = exports.MapLocator = exports.BpaDocumentList = exports.DocumentList = exports.CustomTab = exports.Tooltip = exports.RadioButtonsGroup = exports.TestMolecules = undefined;

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

var CustomTab = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CustomTab");
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

var BpaDocumentList = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./BpaDocumentList");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var NocList = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NocList");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var RadioButtonsGroup = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./RadioGroup");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Tooltip = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Tooltip");
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

var UploadMultipleFile = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadMultipleFile");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Table = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Table");
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

var MapLocator = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MapLocator");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FeesEstimateCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./FeesEstimateCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var HowItWorks = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./HowItWorks");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var EdcrSingleApplication = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./EdcrSingleApplication");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var BpaFeesEstimateCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./BpaFeesEstimateCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var CheckList = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CheckList");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ActionDialog = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ActionDialog");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MultiDownloadCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MultiDownloadCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var SingleDocDetailCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./SingleDocDetailCard");
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
var ComparisionLink = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ComparisionLink");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var NocDetailCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NocDetailCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var NocDocDetailCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NocDocDetailCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var NocData = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NocData");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
exports.TestMolecules = TestMolecules;
exports.RadioButtonsGroup = RadioButtonsGroup;
exports.Tooltip = Tooltip;
exports.CustomTab = CustomTab;
exports.DocumentList = DocumentList;
exports.BpaDocumentList = BpaDocumentList;
exports.MapLocator = MapLocator;
exports.FeesEstimateCard = FeesEstimateCard;
exports.HowItWorks = HowItWorks;
exports.EdcrSingleApplication = EdcrSingleApplication;
exports.NocList = NocList;
exports.Table = Table;
exports.UploadSingleFile = UploadSingleFile;
exports.UploadMultipleFile = UploadMultipleFile;
exports.DividerWithLabel = DividerWithLabel;
exports.BpaFeesEstimateCard = BpaFeesEstimateCard;
exports.CheckList = CheckList;
exports.ActionDialog = ActionDialog;
exports.MultiDownloadCard = MultiDownloadCard;
exports.SingleDocDetailCard = SingleDocDetailCard;
exports.MultiDocDetailCard = MultiDocDetailCard;
exports.UploadCard = UploadCard;
exports.ComparisionLink = ComparisionLink;
exports.NocDetailCard = NocDetailCard;
exports.NocDocDetailCard = NocDocDetailCard;
exports.NocData = NocData;