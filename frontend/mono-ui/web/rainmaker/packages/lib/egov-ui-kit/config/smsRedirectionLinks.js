"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commons = require("../utils/commons");

/**
 * Example SMS URLs :
 * Generic way : "/otpLogin?mobileNo=8050579149&redirectTo={any_redirection_url}"
 * specific way : "/otpLogin?mobileNo=8050579149&redirectTo=uc-citizen/smsViewReceipt&params=pb.amritsar,05/2019-20/002226"  for UC.
 */

var getSmsRedirectionLink = function getSmsRedirectionLink(url) {
  var redirectionTo = (0, _commons.getQueryArg)(url, "redirectTo");
  var params = (0, _commons.getQueryArg)(url, "params");
  var mobileNo = (0, _commons.getQueryArg)(url, "mobileNo");
  // if(url.includes('digit-ui')){
  //   return `/${url.split("redirectTo=")[1]}`;
  // }
  switch (redirectionTo) {
    case "uc-citizen/smsViewReceipt":
      return "/" + redirectionTo + "?smsLink=true&mobileNo=" + mobileNo + "&tenantId=" + params.split(",")[0] + "&receiptNo=" + params.split(",")[1];
    default:
      //For generic redirections & no params
      var redirectionUrl = "/" + url.split("redirectTo=")[1] + ("&smsLink=true&mobileNo=" + mobileNo);
      return redirectionUrl;
  }
};

exports.default = getSmsRedirectionLink;