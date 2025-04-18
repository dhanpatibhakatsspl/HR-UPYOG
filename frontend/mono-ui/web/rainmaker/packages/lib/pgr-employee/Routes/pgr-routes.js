"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _common = require("../modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement("div", null);
};

// pgr employee specific screens


var Login = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/User/Login");
  },
  loading: Loading
});
var OTP = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/User/OTP");
  },
  loading: Loading
});

var RequestReAssign = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/RequestReAssign");
  },
  loading: Loading
});
var AllComplaints = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/AllComplaints");
  },
  loading: Loading
});
var ComplaintResolved = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintResolved");
  },
  loading: Loading
});
var ComplaintCreated = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintCreated");
  },
  loading: Loading
});
var ComplaintSummary = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintDetails");
  },
  loading: Loading
});
var AssignComplaint = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/AssignComplaint");
  },
  loading: Loading
});
var EmployeeDirectory = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/EmployeeDirectory");
  },
  loading: Loading
});
var ClosedComplaints = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ClosedComplaints");
  },
  loading: Loading
});
var RejectComplaint = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/RejectComplaint");
  },
  loading: Loading
});
var ComplaintRejected = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintRejected");
  },
  loading: Loading
});
var ComplaintAssigned = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintAssigned");
  },
  loading: Loading
});
var ResolveSuccess = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ResolveSuccess");
  },
  loading: Loading
});
var ReassignSuccess = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ReassignSuccess");
  },
  loading: Loading
});
var CreateComplaint = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/CreateComplaint");
  },
  loading: Loading
});
var SearchScreen = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/SearchScreen");
  },
  loading: Loading
});

// import CreateEmployee from "modules/employee/pgr/CreateEmployee";
var redirectionUrl = "/user/login";
var routes = [{
  path: "user/login",
  component: Login,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "user/otp",
  component: OTP,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "all-complaints",
  component: AllComplaints,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "ES_OPEN_COMPLAINTS_HEADER",
    hideTitle: false,
    redirectionUrl: redirectionUrl,
    hideFor: "ao",
    customFor: "csr",
    customTitle: "ES_ALL_COMPLAINTS_HEADER"
  }
}, {
  path: "search-complaint",
  component: SearchScreen,
  needsAuthentication: true,
  options: { hideFooter: true, title: "CORE_COMMON_SEARCH_COMPLAINT" }
}, {
  path: "complaint-resolved/:serviceRequestId?",
  component: ComplaintResolved,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
    titleBackground: true, // Use this if you need white background for title in web version
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-details/:serviceRequestId",
  component: ComplaintSummary,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_HEADER_COMPLAINT_SUMMARY",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "closed-complaints",
  component: ClosedComplaints,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "ES_CLOSED_COMPLAINTS_HEADER",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-reassigned/:serviceRequestId?",
  component: ComplaintAssigned,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "ES_COMPLAINT_REASSIGNED_HEADER",
    hideTitle: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "resolve-success",
  component: ResolveSuccess,
  needsAuthentication: true,
  options: {
    hideBackButton: true,
    hideFooter: true,
    title: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED",
    hideTitle: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "reassign-success",
  component: ReassignSuccess,
  needsAuthentication: true,
  options: {
    hideBackButton: true,
    hideFooter: true,
    hideTitle: true,
    title: "CS_COMMON_RE-ASSIGN REQUESTED",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-assigned/:serviceRequestId?",
  component: ComplaintAssigned,
  needsAuthentication: true,
  options: {
    hideBackButton: true,
    hideFooter: true,
    hideTitle: true,
    title: "ES_COMPLAINT_ASSIGNED_HEADER",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-rejected",
  component: ComplaintRejected,
  needsAuthentication: true,
  options: {
    title: "ES_COMPLAINT_REJECTED_HEADER",
    hideTitle: true,
    hideFooter: true,
    redirectionUrl: redirectionUrl,
    hideBackButton: true
  }
}, {
  path: "assign-complaint/:serviceRequestId?",
  component: AssignComplaint,
  needsAuthentication: true,
  options: {
    title: "ES_ASSIGN_TO_EMPLOYEE_HEADER",
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "reassign-complaint/:serviceRequestId?",
  component: AssignComplaint,
  needsAuthentication: true,
  options: {
    title: "ES_REASSIGN_TO_EMPLOYEE_HEADER",
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "employee-directory",
  component: EmployeeDirectory,
  needsAuthentication: true,
  options: {
    title: "ES_EMPLOYEE_DIRECTORY_HEADER",
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "reject-complaint/:serviceRequestId?",
  component: RejectComplaint,
  needsAuthentication: true,
  options: {
    title: "ES_REASON_TO_REJECT_HEADER",
    titleBackground: true, // Use this if you need white background for title in web version
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "request-reassign/:serviceRequestId?",
  component: RequestReAssign,
  needsAuthentication: true,
  options: {
    title: "CS_HEADER_REQUEST_REASSIGN",
    titleBackground: true, // Use this if you need white background for title in web version
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "create-complaint",
  component: CreateComplaint,
  needsAuthentication: true,
  options: {
    title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION",
    hideFooter: true,
    redirectionUrl: redirectionUrl,
    isHomeScreen: true
  }
}, {
  path: "complaint-submitted",
  component: ComplaintCreated,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_HEADER_COMPLAINT_SUBMITTED",
    hideTitle: true,
    hideBackButton: true
  }
}, {
  path: "reopen-complaint/:serviceRequestId?",
  component: _common.ReOpenComplaint,
  needsAuthentication: true,
  options: {
    title: "CS_HEADER_REOPEN_COMPLAINT",
    titleBackground: true // Use this if you need white background for title in web version
  }
}, {
  path: "reopen-acknowledgement",
  component: _common.ReopenAcknowledgement,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    title: "CS_COMMON_COMPLAINT_REOPENED",
    hideTitle: true
  }
  // {
  //   path: "create-employee",
  //   component: CreateEmployee,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     title: "Create Employee",
  //     hideTitle: true,
  //     hideBackButton: true
  //   }
  // }
}];

exports.default = routes;