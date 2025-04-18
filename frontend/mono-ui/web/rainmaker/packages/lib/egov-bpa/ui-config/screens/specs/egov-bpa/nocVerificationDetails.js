"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocVerificationDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var nocVerificationDetails = exports.nocVerificationDetails = (0, _utils.getCommonCard)({
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "NocListContainer",
    props: {
      documents: [{
        name: "Identity ",
        required: true,
        jsonPath: "bpa.documents.identityProof",
        selector: {
          inputLabel: "Select Document",
          menuItems: [{ value: "AADHAAR", label: "Aadhaar Card" }, { value: "VOTERID", label: "Voter ID Card" }, { value: "DRIVING", label: "Driving License" }]
        }
      }, {
        name: "Address Proof ",
        required: true,
        jsonPath: "bpa.documents.addressProof",
        selector: {
          inputLabel: "Select Document",
          menuItems: [{ value: "ELECTRICITYBILL", label: "Electricity Bill" }, { value: "DL", label: "Driving License" }, { value: "VOTERID", label: "Voter ID Card" }]
        }
      }],
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
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