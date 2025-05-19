"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentAndNocDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var documentAndNocDetails = exports.documentAndNocDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Required Documents",
    labelKey: "BPA_DOCUMENT_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  subText: (0, _utils.getCommonParagraph)({
    labelName: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "BPA_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: (0, _utils.getBreak)(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "BpaDocumentListContainer",
    props: {
      documents: [],
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
    type: "array"
  }
});