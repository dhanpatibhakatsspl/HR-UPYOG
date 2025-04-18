"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _Register = require("../Screens/User/Register");

var _Register2 = _interopRequireDefault(_Register);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _Login = require("../Screens/User/Login");

var _Login2 = _interopRequireDefault(_Login);

var _OTP = require("../Screens/User/OTP");

var _OTP2 = _interopRequireDefault(_OTP);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement("div", null);
};

// pgr citizen specific screens

// user routes
var MyComplaints = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/MyComplaints");
  },
  loading: Loading
});
var ComplaintDetails = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintDetails");
  },
  loading: Loading
});
var ComplaintCreated = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/ComplaintCreated");
  },
  loading: Loading
});
var Feedback = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/Feedback");
  },
  loading: Loading
});
var PGRHome = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/Home");
  },
  loading: Loading
});
var AddComplaint = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/AddComplaint");
  },
  loading: Loading
});
var FeedbackAcknowledge = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/FeedbackAcknowledgement");
  },
  loading: Loading
});

var routes = [{
  path: "user/register",
  component: _Register2.default,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "user/login",
  component: _Login2.default,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "user/otp",
  component: _OTP2.default,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "my-complaints",
  component: MyComplaints,
  needsAuthentication: true,
  options: { title: "CS_HOME_MY_COMPLAINTS", hideBackButton: (0, _commons.getQueryArg)(window.location.href, "smsLink") === "true" || (0, _commons.getQueryArg)(window.location.href, "source") === "whatsapp" ? true : false }
}, {
  path: "complaint-details/:serviceRequestId?",
  component: ComplaintDetails,
  needsAuthentication: true,
  options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY", hideBackButton: (0, _commons.getQueryArg)(window.location.href, "smsLink") === "true" || (0, _commons.getQueryArg)(window.location.href, "source") === "whatsapp" ? true : false }
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
  path: "feedback/:serviceRequestId?",
  component: Feedback,
  needsAuthentication: true,
  options: {
    title: "CS_HEADER_FEEDBACK",
    titleBackground: true // Use this if you need white background for title in web version
  }
}, {
  path: "feedback-acknowledgement",
  component: FeedbackAcknowledge,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT",
    hideTitle: true
  }
}, {
  path: "add-complaint",
  component: AddComplaint,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION"
  }
}, {
  path: "pgr-home",
  component: PGRHome,
  needsAuthentication: true,
  options: {
    // isHomeScreen: true,
    title: "COMMON_BOTTOM_NAVIGATION_COMPLAINTS",
    hideTitle: true,
    redirectionUrl: "/user/register",
    helpButton: true
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
}, {
  path: "complaint-type",
  component: _common.ComplaintType,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
    hideTitle: true
  }
}];

exports.default = routes;