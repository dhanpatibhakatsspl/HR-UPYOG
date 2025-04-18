"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicationSuccessFooter = exports.DownloadAndPrint = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _commons = require("../../../../../ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _generateWSAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateWSAcknowledgement");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

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

var getCommonDownloadPrint = function getCommonDownloadPrint(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: { textAlign: "right", display: "flex" }
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
  iframe.src = document.location.origin + window.basename + ("/wns/search-preview?applicationNumber=" + applicationNumber + "&tenantId=" + tenant);
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

var handleAppDownloadAndPrint = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, action) {
    var applicationNumber, applicationNumberWater, applicationNumberSewerage, _state$screenConfigur, WaterConnection, DocumentsData, SewerageConnection, filteredDocs, WSstoreData, connTypeSewerage, connTypeWater, WSRequestBody, fileName, connType, cc, _SewerageConnection, SWRequestBody, _connTypeWater, water, _fileName, _connType, _connTypeSewerage, SWstoreData, _SWRequestBody, _fileName2;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
            applicationNumberWater = (0, _commons2.getQueryArg)(window.location.href, "applicationNumberWater");
            applicationNumberSewerage = (0, _commons2.getQueryArg)(window.location.href, "applicationNumberSewerage");
            _state$screenConfigur = state.screenConfiguration.preparedFinalObject, WaterConnection = _state$screenConfigur.WaterConnection, DocumentsData = _state$screenConfigur.DocumentsData, SewerageConnection = _state$screenConfigur.SewerageConnection;
            filteredDocs = DocumentsData;

            filteredDocs && filteredDocs.map(function (val) {
              if (val.title.includes("WS_OWNER.IDENTITYPROOF.")) {
                val.title = "WS_OWNER.IDENTITYPROOF";
              } else if (val.title.includes("WS_OWNER.ADDRESSPROOF.")) {
                val.title = "WS_OWNER.ADDRESSPROOF";
              }
            });

            if (!(applicationNumberWater && applicationNumberSewerage)) {
              _context.next = 30;
              break;
            }

            WaterConnection[0].pdfDocuments = filteredDocs;
            SewerageConnection[0].pdfDocuments = filteredDocs;
            WSstoreData = (0, _cloneDeep2.default)(WaterConnection);
            connTypeSewerage = SewerageConnection[0].connectionType;
            connTypeWater = WaterConnection[0].connectionType;
            WSRequestBody = (0, _cloneDeep2.default)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}));
            fileName = action === "print" ? "print" : "application.pdf";

            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", WSstoreData[0]));
            connType = connTypeWater === null ? "Metered" : connTypeWater;
            _context.next = 18;
            return (0, _generateWSAcknowledgement.generateWSAcknowledgement)(WSRequestBody, fileName, "WATER", connType);

          case 18:
            cc = _context.sent;

            if (!cc) {
              _context.next = 28;
              break;
            }

            _SewerageConnection = state.screenConfiguration.preparedFinalObject.SewerageConnection;

            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", _SewerageConnection[0]));
            SWRequestBody = (0, _cloneDeep2.default)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}));

            fileName = action === "print" ? "print" : "sewerage-application.pdf";
            _context.next = 26;
            return (0, _generateWSAcknowledgement.generateWSAcknowledgement)(SWRequestBody, fileName, "SEWERAGE", connTypeSewerage);

          case 26:
            cc = _context.sent;

            if (cc) {
              dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", WSstoreData[0]));
            }

          case 28:
            _context.next = 31;
            break;

          case 30:
            if (applicationNumber) {

              if (applicationNumber.includes("WS")) {
                _connTypeWater = WaterConnection[0].connectionType;
                water = (0, _cloneDeep2.default)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}));
                _fileName = action === "print" ? "print" : "application.pdf";
                _connType = _connTypeWater === null ? "Metered" : _connTypeWater;

                cc = (0, _generateWSAcknowledgement.generateWSAcknowledgement)(water, _fileName, "WATER", _connType);
              } else if (applicationNumber.includes("SW")) {
                _connTypeSewerage = SewerageConnection[0].connectionType;
                SWstoreData = (0, _cloneDeep2.default)(SewerageConnection);

                dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", SWstoreData[0]));
                _SWRequestBody = (0, _cloneDeep2.default)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}));
                _fileName2 = action === "print" ? "print" : "sewerage-application.pdf";

                cc = (0, _generateWSAcknowledgement.generateWSAcknowledgement)(_SWRequestBody, _fileName2, "SEWERAGE", _connTypeSewerage);
              }
            }

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function handleAppDownloadAndPrint(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var DownloadAndPrint = exports.DownloadAndPrint = function DownloadAndPrint(state, dispatch, applicationNumber, tenant) {
  return getCommonDownloadPrint({
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "160px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "WS_COMMON_BUTTON_DOWNLOAD"
          // labelKey: "WS_APPLICATION_BUTTON_DOWN_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          handleAppDownloadAndPrint(state, dispatch, "download");
        }
      }
    },
    printFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "160px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printFormButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "WS_COMMON_BUTTON_PRINT"
          // labelKey: "WS_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          handleAppDownloadAndPrint(state, dispatch, "print");
        }
      }
    }
  });
};

var applicationSuccessFooter = exports.applicationSuccessFooter = function applicationSuccessFooter(state, dispatch, applicationNumber, tenant) {
  //const baseURL = getBaseURL();
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  // const redirectionURL = roleExists ? "/tradelicense-citizen/home" : "/inbox";
  /* Mseva 2.0 changes */
  var redirectionURL = roleExists ? "/" : "/inbox";
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "15%",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "HOME",
          labelKey: "WS_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: redirectionURL
      }
    }
  });
};