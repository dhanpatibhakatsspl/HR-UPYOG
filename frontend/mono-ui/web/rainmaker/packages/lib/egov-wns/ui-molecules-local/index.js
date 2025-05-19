"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionFooter = exports.OwnerHeader = exports.FeesEstimateOverviewCard = exports.WnsHowItWorks = exports.Applications = exports.MyApplications = exports.NewConnection = exports.MeterReadingEditable = exports.MeterReading = exports.PastPaymentsDetails = exports.MyConnections = exports.DividerWithLabel = exports.PastPayments = exports.HowItWorks = exports.FeesEstimateCard = exports.MapLocator = exports.DocumentList = exports.UploadSingleFile = exports.Tooltip = exports.TestMolecules = undefined;

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

var DocumentList = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DocumentList");
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
var NewConnection = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NewConnection");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var MyApplications = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MyApplications");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var Applications = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Applications");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MyConnections = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MyConnections");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MeterReading = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MeterReading");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var PastPayments = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PastPayments");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var WnsHowItWorks = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./WnsHowItWorks");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var PastPaymentsDetails = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PastPaymentsDetails");
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

var MeterReadingEditable = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MeterReadingEditable");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FeesEstimateOverviewCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./FeeEstimateOverviewCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var OwnerHeader = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./OwnerHeader");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ActionFooter = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ActionFooter");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestMolecules = TestMolecules;
exports.Tooltip = Tooltip;
exports.UploadSingleFile = UploadSingleFile;
exports.DocumentList = DocumentList;
exports.MapLocator = MapLocator;
exports.FeesEstimateCard = FeesEstimateCard;
exports.HowItWorks = HowItWorks;
exports.PastPayments = PastPayments;
exports.DividerWithLabel = DividerWithLabel;
exports.MyConnections = MyConnections;
exports.PastPaymentsDetails = PastPaymentsDetails;
exports.MeterReading = MeterReading;
exports.MeterReadingEditable = MeterReadingEditable;
exports.NewConnection = NewConnection;
exports.MyApplications = MyApplications;
exports.Applications = Applications;
exports.WnsHowItWorks = WnsHowItWorks;
exports.FeesEstimateOverviewCard = FeesEstimateOverviewCard;
exports.OwnerHeader = OwnerHeader;
exports.ActionFooter = ActionFooter;