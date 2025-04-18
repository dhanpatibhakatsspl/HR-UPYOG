"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocDetailsSearch = exports.nocDetailsApply = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../utils/index");

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

var nocDetailsApply = exports.nocDetailsApply = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "NOC Details",
    labelKey: "BPA_NOC_DETAILS"
  }, {
    style: {
      marginBottom: "10px"
    }
  }),
  // fireNocDetailsCard: getCommonCard({
  documentDetailsCard: {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "NocDetailCard",
    props: {
      jsonPath: "nocForPreview",
      sourceJsonPath: "documentDetailsPreview",
      className: "noc-review-documents",
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg",
        multiple: false
      },
      maxFileSize: 6000
    }
    // }),
  } });

var nocDetailsSearch = exports.nocDetailsSearch = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "NOC Details",
    labelKey: "BPA_NOC_DETAILS"
  }, {
    style: {
      marginBottom: "10px"
    }
  }),
  // fireNocDetailsCard: getCommonCard({
  documentDetailsCard: {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "NocDetailCard",
    props: {
      jsonPath: "nocForPreview",
      sourceJsonPath: "documentDetailsPreview",
      className: "noc-review-documents",
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg",
        multiple: false
      },
      maxFileSize: 6000
    }
    // }),
  } });