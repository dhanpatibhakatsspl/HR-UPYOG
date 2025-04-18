"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOCALATION = exports.LOCALATION = {
  GET: {
    URL: "localization/messages/v1/_search",
    ACTION: "_search"
  }
};

var COMPLAINT = exports.COMPLAINT = {
  GET: {
    URL: "rainmaker-pgr/v1/requests/_search",
    ACTION: "_search"
  }
};

var DRAFTS = exports.DRAFTS = {
  GET: {
    URL: "pt-services-v2/drafts/_search",
    ACTION: "_search"
  }
};

var FILE_UPLOAD = exports.FILE_UPLOAD = {
  POST: {
    URL: "filestore/v1/files"
  }
};

var CATEGORY = exports.CATEGORY = {
  GET: {
    URL: "egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};

var AUTH = exports.AUTH = {
  LOGOUT: {
    URL: "/user/_logout",
    ACTION: "_logout"
  }
};

var USER = exports.USER = {
  SEARCH: {
    URL: "/user/_search",
    ACTION: "search"
  },
  UPDATE: {
    URL: "/profile/_update",
    ACTION: "create"
  }
};

var OTP = exports.OTP = {
  RESEND: {
    URL: "/user-otp/v1/_send",
    ACTION: "_send"
  }
};

var EMPLOYEE = exports.EMPLOYEE = {
  GET: {
    URL: "/egov-hrms/employees/_search",
    ACTION: "_search"
  }
};

var EMPLOYEE_ASSIGN = exports.EMPLOYEE_ASSIGN = {
  GET: {
    URL: "/egov-hrms/employees/_search",
    ACTION: "_search"
  }
};

var CITIZEN = exports.CITIZEN = {
  GET: {
    URL: "/user/v1/_search",
    ACTION: "_search"
  }
};

var MDMS = exports.MDMS = {
  GET: {
    URL: "/egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};

var TENANT = exports.TENANT = {
  POST: {
    URL: "egov-location/location/v11/tenant/_search",
    ACTION: "_search"
  }
};

var SPEC = exports.SPEC = {
  GET: {
    URL: "spec-directory",
    ACTION: "_search"
  }
};

var CITY = exports.CITY = {
  GET: {
    URL: "/egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};

var FLOOR = exports.FLOOR = {
  GET: {
    URL: "/egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};
var ACTIONMENU = exports.ACTIONMENU = {
  GET: {
    URL: "/access/v1/actions/mdms/_get",
    ACTION: "_get"
  }
};
var INBOXRECORDS = exports.INBOXRECORDS = {
  GET: {
    URL: "/egov-workflow-v2/egov-wf/process/_search",
    ACTION: "_search"
  }
};
var INBOXRECORDSCOUNT = exports.INBOXRECORDSCOUNT = {
  GET: {
    URL: "/egov-workflow-v2/egov-wf/process/_count",
    ACTION: "_get"
  }
};
var INBOXESCALTEDRECORDS = exports.INBOXESCALTEDRECORDS = {
  GET: {
    URL: "/egov-workflow-v2/egov-wf/escalate/_search",
    ACTION: "_search"
  }
};

var PROPERTY = exports.PROPERTY = {
  GET: {
    URL: "/property-services/property/_search",
    ACTION: "_get"
  }
};

var DRAFT = exports.DRAFT = {
  GET: {
    URL: "/pt-services-v2/drafts/_search",
    ACTION: "_get"
  }
};

var PGService = exports.PGService = {
  GET: {
    URL: "/pg-service/transaction/v1/_search",
    ACTION: "_get"
  }
};

var RECEIPT = exports.RECEIPT = {
  GET: {
    URL: "/collection-services/receipts/_search",
    ACTION: "_get"
  }
};

var BOUNDARY = exports.BOUNDARY = {
  GET: {
    URL: "/egov-location/location/v11/boundarys/_search",
    ACTION: "_get"
  }
};

var EVENTSCOUNT = exports.EVENTSCOUNT = {
  GET: {
    URL: "/egov-user-event/v1/events/notifications/_count",
    ACTION: "_search"
  }
};

var NOTIFICATIONS = exports.NOTIFICATIONS = {
  GET: {
    URL: "/egov-user-event/v1/events/_search",
    ACTION: "_search"
  }
};

var FETCHBILL = exports.FETCHBILL = {
  GET: {
    URL: "/billing-service/bill/v2/_fetchbill",
    ACTION: "_get"
  }
};
var FETCHRECEIPT = exports.FETCHRECEIPT = {
  GET: {
    ACTION: "_search"
  }
};
var DOWNLOADRECEIPT = exports.DOWNLOADRECEIPT = {
  GET: {
    URL: "/pdf-service/v1/_create",
    ACTION: "_get"
  }
};
var FETCHASSESSMENTS = exports.FETCHASSESSMENTS = {
  GET: {
    URL: "/property-services/assessment/_search",
    ACTION: "_search"
  }
};
var PAYMENTSEARCH = exports.PAYMENTSEARCH = {
  GET: {
    URL: "/collection-services/payments/",
    ACTION: "_search"
  }
};