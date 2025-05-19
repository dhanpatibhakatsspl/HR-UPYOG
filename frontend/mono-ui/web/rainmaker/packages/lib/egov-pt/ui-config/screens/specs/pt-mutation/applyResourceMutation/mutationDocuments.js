"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var documentDetails = exports.documentDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Required Documents",
    labelKey: "PT_MUTATION_DOCUMENTS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  subText: (0, _utils.getCommonParagraph)({
    labelName: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "PT_MUTATION_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: (0, _utils.getBreak)(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pt",
    componentPath: "DocumentListContainer",
    props: {
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "PT_MUTATION_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      // description: "Only .jpg and .pdf files. 6MB max file size.",
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      maxFileSize: 5000
    },
    type: "array"
  }
});