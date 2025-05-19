"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bpaSummaryDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _basicSummary = require("./summaryResource/basicSummary");

var _scrutinySummary = require("./summaryResource/scrutinySummary");

var _applicantSummary = require("./summaryResource/applicantSummary");

var _applyDocSummary = require("./summaryResource/applyDocSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _noc = require("./noc");

var bpaSummaryDetails = exports.bpaSummaryDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Please review your Application and Submit",
    labelKey: "BPA_SUMMARY_HEADER"
  }),
  estimateSummary: _estimateSummary.estimateSummary,
  basicSummary: _basicSummary.basicSummary,
  scrutinySummary: _scrutinySummary.scrutinySummary,
  applicantSummary: _applicantSummary.applicantSummary,
  applyDocSummary: _applyDocSummary.applyDocSummary,
  nocDetailsApply: _noc.nocDetailsApply
});