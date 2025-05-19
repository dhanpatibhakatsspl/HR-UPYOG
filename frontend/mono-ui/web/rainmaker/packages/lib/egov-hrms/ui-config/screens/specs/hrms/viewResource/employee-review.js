"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.employeeReviewDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./footer");

var _viewAssignmentDetails = require("./view-assignment-details");

var _viewEmployeeDetails = require("./view-employee-details");

var _viewJurisdictionDetails = require("./view-jurisdiction-details");

var employeeReviewDetails = exports.employeeReviewDetails = function employeeReviewDetails(isReview) {
  var viewEmployeeDetails = (0, _viewEmployeeDetails.getEmployeeDetailsView)(isReview);
  var viewJurisdictionDetails = (0, _viewJurisdictionDetails.getJurisdictionDetailsView)(isReview);
  var viewAssignementDetails = (0, _viewAssignmentDetails.getAssignmentDetailsView)(isReview);
  // const viewOtherDetails = getOtherDetailsView(isReview);
  // const viewServiceDetails = getServiceDetailsView(isReview);
  var footer = isReview ? (0, _footer.hrCommonFooter)() : {};
  return (0, _utils.getCommonCard)({
    viewEmployeeDetails: viewEmployeeDetails,
    viewJurisdictionDetails: viewJurisdictionDetails,
    viewAssignementDetails: viewAssignementDetails,
    footer: footer
  });
};