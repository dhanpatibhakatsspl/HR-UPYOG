"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NocNumber = exports.LinkAtom = exports.ocPermitNumber = exports.UploadedDocument = exports.NoteAtom = exports.PermitListCondition = exports.MenuListCompositionForBpa = exports.PermitNumber = exports.TradeLicenseIcon = exports.MenuButton = exports.Asteric = exports.MapLocation = exports.Checkbox = exports.ApplicationNoContainer = exports.FormIcon = exports.downloadFile = exports.AutoSuggest = exports.TestAtoms = undefined;

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

var downloadFile = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./downloadFile");
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

var Checkbox = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Checkbox");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MapLocation = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MapLocation");
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

var Asteric = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Asteric");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MenuButton = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MenuButton");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FormIcon = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Icons/FormIcon");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

// const ApplicationNumber = Loadable({
//   loader: () => import("./ApplicationNumber"),
//   loading: () => <Loading />
// });

var TradeLicenseIcon = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Icons/TradeLicenseIcon");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var PermitNumber = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PermitNumber");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MenuListCompositionForBpa = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MenuListCompositionForBpa");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var PermitListCondition = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PermitListCondition");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var NoteAtom = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./NoteAtom");
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

var ocPermitNumber = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ocPermitNumber");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var LinkAtom = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./LinkAtom");
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
exports.AutoSuggest = AutoSuggest;
exports.downloadFile = downloadFile;
exports.FormIcon = FormIcon;
exports.ApplicationNoContainer = ApplicationNoContainer;
exports.Checkbox = Checkbox;
exports.MapLocation = MapLocation;
exports.Asteric = Asteric;
exports.MenuButton = MenuButton;
exports.TradeLicenseIcon = TradeLicenseIcon;
exports.PermitNumber = PermitNumber;
exports.MenuListCompositionForBpa = MenuListCompositionForBpa;
exports.PermitListCondition = PermitListCondition;
exports.NoteAtom = NoteAtom;
exports.UploadedDocument = UploadedDocument;
exports.ocPermitNumber = ocPermitNumber;
exports.LinkAtom = LinkAtom;
exports.NocNumber = NocNumber;