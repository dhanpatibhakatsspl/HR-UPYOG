"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDownloadItems = exports.generatePdfFromDiv = undefined;

var _receiptPdf = require("egov-ui-framework/ui-config/screens/specs/utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generatePdfFromDiv = exports.generatePdfFromDiv = function generatePdfFromDiv(action, applicationNumber) {
  var target = document.querySelector("#custom-atoms-div");
  (0, _html2canvas2.default)(target, {
    onclone: function onclone(clonedDoc) {
      // clonedDoc.getElementById("custom-atoms-footer")[
      //   "data-html2canvas-ignore"
      // ] = "true";
      clonedDoc.getElementById("custom-atoms-footer").style.display = "none";
    }
  }).then(function (canvas) {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    var doc = new _jspdf2.default("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    if (action === "download") {
      doc.save("preview-" + applicationNumber + ".pdf");
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

var getDownloadItems = exports.getDownloadItems = function getDownloadItems(status, applicationNumber, state) {
  var tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)("certificate_download", state);
    },
    leftIcon: "book"
  };
  var tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)("certificate_print", state);
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)("receipt_download", state);
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)("receipt_print", state);
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      generatePdfFromDiv("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      generatePdfFromDiv("print", applicationNumber);
    },
    leftIcon: "assignment"
  };

  switch (status) {
    case "APPROVED":
      return {
        downloadMenu: [tlCertificateDownloadObject, receiptDownloadObject, applicationDownloadObject],
        printMenu: [tlCertificatePrintObject, receiptPrintObject, applicationPrintObject]
      };

    // case "pending_approval":
    //   return {
    //     downloadMenu: [receiptDownloadObject, applicationDownloadObject],
    //     printMenu: [receiptPrintObject, applicationPrintObject]
    //   };

    default:
      return {
        downloadMenu: [applicationDownloadObject],
        printMenu: [applicationPrintObject]
      };
      break;
  }
};