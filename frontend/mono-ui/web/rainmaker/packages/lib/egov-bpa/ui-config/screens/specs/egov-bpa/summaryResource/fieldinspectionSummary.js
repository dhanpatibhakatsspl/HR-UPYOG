"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldinspectionSummary = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var localizationLabels = JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)()));
var transfomedKeys = (0, _commons.transformById)(localizationLabels, "code");

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

var fieldInspectionMultiItem = function fieldInspectionMultiItem() {
  return (0, _utils.getCommonGrayCard)({
    fiCard: (0, _utils.getCommonContainer)({
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

      applicationdate: (0, _utils.getDateField)({
        label: {
          labelName: "BPA_FI_DATE_LABEL_NAME",
          labelKey: "BPA_FI_DATE_LABEL"
        },
        props: {
          className: "tl-trade-type",
          jsonPathUpdatePrefix: "BPA.additionalDetails.fieldinspection_pending",
          jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].date"
        },
        required: true,
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      applicationtime: (0, _utils.getTimeField)({
        label: {
          labelName: "BPA_FI_TIME_LABEL_NAME",
          labelKey: "BPA_FI_TIME_LABEL"
        },
        props: {
          className: "tl-trade-type",
          jsonPathUpdatePrefix: "BPA.additionalDetails.fieldinspection_pending",
          jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].time",
          defaultValue: "00:00",
          style: { marginBottom: 10, paddingRight: 80 }
        },
        required: true,
        defaultValue: "00:00",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      break3: (0, _utils.getBreak)(),
      bpaCheckListContainer: getHeader({
        labelName: "Check List",
        labelKey: "BPA_CHECK_LIST_DETAILS"
      }),
      break1: (0, _utils.getBreak)(),
      questions: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "CheckListContainer",
        props: {
          documents: [],
          buttonLabel: {
            labelName: "UPLOAD FILE",
            labelKey: "BPA_DOC_DET_BTN_UPLOAD_FILE"
          },
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg"
          },
          maxFileSize: 5000,
          jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].questions",
          jsonPathUpdatePrefix: "BPA.additionalDetails.fieldinspection_pending"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        },
        type: "array"
      },
      BlockWiseOccupancyAndUsageDetails: getHeader({
        labelName: "Documents",
        labelKey: "BPA_FIELD_INSPECTION_DOCUMENTS"
      }),
      break2: (0, _utils.getBreak)(),
      documentList: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "NocListContainer",
        props: {
          documents: [],
          jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].docs",
          jsonPathUpdatePrefix: "BPA.additionalDetails.fieldinspection_pending",
          buttonLabel: {
            labelName: "UPLOAD FILE",
            labelKey: "BPA_DOC_DET_BTN_UPLOAD_FILE"
          },
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg",
            multiple: false
          },
          maxFileSize: 5000
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        },
        type: "array"
      }
    })
  });
};

var fieldinspectionSummary = exports.fieldinspectionSummary = (0, _utils.getCommonContainer)({
  summaryContent: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "filed-inspection-summary",
      scheama: fieldInspectionMultiItem(),
      items: [],
      hasAddItem: true,
      isReviewPage: false,
      addItemLabel: {
        labelName: "Add Another Field Inspection Report",
        labelKey: "BPA_ADD_ANOTHER_FI_REPORT_LABEL"
      },
      prefixSourceJsonPath: "children.cardContent.children.fiCard.children",
      sourceJsonPath: "BPA.additionalDetails.fieldinspection_pending",
      headerJsonPath: "children.cardContent.children.fiCard.children.header.children.header.children.dynamicTitle.props.labelName",
      headerName: " "
    },
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 12
    },
    type: "array"
  }
});