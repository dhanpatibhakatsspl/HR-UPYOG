"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldSummary = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var fieldSummaryContent = function fieldSummaryContent() {
  return (0, _utils.getCommonGrayCard)({
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _utils.getCommonContainer)({
          statictitle: (0, _utils.getLabel)("Field Inspection", "BPA_FI_REPORT", { labelKey: "BPA_FI_REPORT" }),
          dynamicTitle: (0, _utils.getLabel)("Test", "abc", { labelName: "UYT" })
        })
      }
    },
    // lableData : getCommonContainer({
    fieldSummaryDate: (0, _utils.getLabelWithValue)({
      labelName: "BPA_FI_DATE_LABEL_NAME",
      labelKey: "BPA_FI_DATE_LABEL"
    }, {
      jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].date",
      callBack: function callBack(value) {
        return (0, _utils.convertEpochToDate)(value) || checkValueForNA;
      }
    }),
    fieldSummaryTime: (0, _utils.getLabelWithValue)({
      labelName: "BPA_FI_TIME_LABEL_NAME",
      labelKey: "BPA_FI_TIME_LABEL"
    }, {
      jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].time",
      callBack: function callBack(value) {
        return modifyTimeFormat(value);
      }
    }),
    // }),
    checkListDetailsContainer: getHeader({
      labelName: "Check List",
      labelKey: "BPA_CHECK_LIST_DETAILS"
    }),
    fieldInspectionDetailsCard: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "FieldInspectionContainer",
      props: {
        jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].questions",
        jsonPathUpdatePrefix: "BPA.additionalDetails.fieldinspection_pending",
        className: "noc-review-documents"
      }
    },
    break: (0, _utils.getBreak)(),
    documentsDetailsContainer: getHeader({
      labelName: "Documents",
      labelKey: "BPA_FIELD_INSPECTION_DOCUMENTS"
    }),
    fiDocumentDetailsCard: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "DownloadFileContainerForFI",
      props: {
        jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].docs",
        jsonPathUpdatePrefix: "BPA.additionalDetails.fieldinspection_pending",
        className: "noc-review-documents"
      }
    }
  });
};

var fieldSummary = exports.fieldSummary = (0, _utils.getCommonContainer)({
  summaryContent: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "filed-inspection-summary",
      scheama: fieldSummaryContent(),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      prefixSourceJsonPath: "children.cardContent.children",
      afterPrefixJsonPath: "children.value.children.key",
      sourceJsonPath: "BPA.additionalDetails.fieldinspection_pending",
      headerJsonPath: "children.cardContent.children.header.children.header.children.dynamicTitle.props.labelName",
      headerName: " "
    },
    type: "array"
  }
});

var modifyTimeFormat = function modifyTimeFormat(value) {
  if (value) {
    var time = 12 - Number(value.split(':')[0]);
    if (time < 0) {
      time = time * -1;
      return time + ":" + value.split(':')[1] + " PM";
    } else if (time == 0) {
      return 12 + ":" + value.split(':')[1] + " PM";
    } else if (time == 12) {
      return 12 + ":" + value.split(':')[1] + " AM";
    } else {
      return value + " AM";
    }
  } else {
    return "NA";
  }
};