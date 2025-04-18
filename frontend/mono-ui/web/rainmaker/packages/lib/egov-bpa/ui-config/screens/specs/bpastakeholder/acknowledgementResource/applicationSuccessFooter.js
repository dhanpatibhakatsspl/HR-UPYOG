"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicationSuccessFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var generatePdfAndDownload = function generatePdfAndDownload(state, dispatch, action, applicationNumber, tenant) {
  dispatch((0, _actions.toggleSnackbar)(true, {
    labelName: "Preparing confirmation form, please wait...",
    labelKey: "ERR_PREPARING_CONFIRMATION_FORM"
  }, "info"));
  var iframe = document.createElement("iframe");
  iframe.src = document.location.origin + window.basename + ("/tradelicence/search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenant);
  var hasIframeLoaded = false,
      hasEstimateLoaded = false;
  iframe.onload = function (e) {
    hasIframeLoaded = true;
    if (hasEstimateLoaded) {
      downloadConfirmationForm();
    }
  };
  window.document.addEventListener("estimateLoaded", handleEvent, false);
  function handleEvent(e) {
    if (e.detail && iframe.contentDocument) {
      hasEstimateLoaded = true;
      if (hasIframeLoaded) {
        downloadConfirmationForm();
      }
    }
  }
  function downloadConfirmationForm() {
    var target = iframe.contentDocument.querySelector("#material-ui-tradeReviewDetails");
    (0, _html2canvas2.default)(target).then(function (canvas) {
      document.querySelector("#custom-atoms-iframeForPdf").removeChild(iframe);
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
        doc.save("application_summary_" + applicationNumber + ".pdf");
      } else if (action === "print") {
        doc.autoPrint();
        window.open(doc.output("bloburl"), "_blank");
      }
    });
  }

  // To hide the iframe
  iframe.style.cssText = "position: absolute; opacity:0; z-index: -9999; width: 900px; height: 100%";
  document.querySelector("#custom-atoms-iframeForPdf").appendChild(iframe);

  // let iframe = document.querySelector("#custom-containers-local-iframe");
  // let target = iframe.contentDocument.querySelector(
  //   "#material-ui-tradeReviewDetails"
  // );
  // html2canvas(target, {
  //   onclone: function(clonedDoc) {
  //     clonedDoc.getElementById(
  //       "material-ui-tradeReviewDetails"
  //     ).style.display = "block";
  //   }
  // }).then(canvas => {
  //   var data = canvas.toDataURL();
  //   var docDefinition = {
  //     content: [
  //       {
  //         image: data,
  //         width: 500
  //       }
  //     ]
  //   };
  //   if (action === "download") {
  //     pdfMake.createPdf(docDefinition).download("application_summary.pdf");
  //   } else if (action === "print") {
  //     pdfMake.createPdf(docDefinition).print();
  //   }
  // });
};

var applicationSuccessFooter = exports.applicationSuccessFooter = function applicationSuccessFooter(state, dispatch, applicationNumber, tenant) {
  //const baseURL = getBaseURL();
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  var authlink = true;
  if (window.location.pathname.includes("openlink")) {
    authlink = false;
  }
  // const redirectionURL = roleExists ? "/tradelicense-citizen/home" : "/inbox";
  /* Mseva 2.0 changes */
  var redirectionURL = "/";
  var gotHomeKey = "GO TO HOME";
  var gotLabelName = "TL_COMMON_BUTTON_HOME";
  if (window.location.pathname.includes("openlink")) {
    gotLabelName = "PROCEED TO LOGIN";
    gotHomeKey = "BPA_COMMON_PROCEED_NEXT";
  }
  var payURL = "/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenant + "&businessService=BPAREG";
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "290px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: gotLabelName,
          labelKey: gotHomeKey
        })
      },
      onClickDefination: {
        action: "page_change",
        path: redirectionURL
      }
    },
    proceedToPay: {
      componentPath: "Button",
      visible: authlink,
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        collectPaymentButtonLabel: (0, _utils.getLabel)({
          labelName: "PROCEED TO PAYMENT",
          labelKey: "BPA_PROCEED_PAYMENT"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: payURL
      }
      // collectPaymentButton: {
      //   componentPath: "Button",
      //   props: {
      //     variant: "contained",
      //     color: "primary",
      //     style: {
      //       minWidth: "200px",
      //       height: "48px",
      //       marginRight: "40px"
      //     }
      //   },
      //   children: {
      //     collectPaymentButtonLabel: getLabel({
      //       labelName: "COLLECT PAYMENT",
      //       labelKey: "TL_COLLECT_PAYMENT"
      //     })
      //   },
      //   onClickDefination: {
      //     action: "page_change",
      //     path: `/egov-ui-framework/tradelicence/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
      //   },
      //   roleDefination: {
      //     rolePath: "user-info.roles",
      //     roles: ["TL_CEMP"]
      //   }
      // }
    } });
};