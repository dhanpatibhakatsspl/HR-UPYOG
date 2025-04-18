"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pdfmake = require("pdfmake/build/pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _commons = require("egov-ui-framework/ui-utils/commons.js");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _receiptTransformer = require("./receiptTransformer");

var _vfs_fonts = require("./vfs_fonts");

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pdfMakeCustom.fonts = {
//   Camby:{
//           normal: 'Cambay-Regular.ttf',
//           bold: 'Cambay-Regular.ttf',
//           italics: 'Cambay-Regular.ttf',
//           bolditalics: 'Cambay-Regular.ttf'
//   },

// };


// pdfMakeCustom.vfs = pdfFonts.vfs;
var tableborder = {
  hLineColor: function hLineColor(i, node) {
    return "#979797";
  },
  vLineColor: function vLineColor(i, node) {
    return "#979797";
  },
  hLineWidth: function hLineWidth(i, node) {
    return 0.5;
  },
  vLineWidth: function vLineWidth(i, node) {
    return 0.5;
  }
};

var noborder = {
  hLineWidth: function hLineWidth(i, node) {
    return 0;
  },
  vLineWidth: function vLineWidth(i, node) {
    return 0;
  }
};

var borderKey = [true, true, false, true];
var borderValue = [false, true, true, true];
var receiptTableWidth = ["*", "*", "*", "*"];
var payableAmountTable = ["*", "*", "*", "*", "*", "*"];
var payableAmountBorderKey = [true, true, true, true, true, true, true];
var payableInfoTable3 = ["*", "*", "*"];
var accessoriesTable = ["24%", "76%"];

var getLocaleForTradeType = function getLocaleForTradeType(tradeType) {
  if (tradeType && tradeType.split("/").length) {
    var tradeTypeSplitted = tradeType.toUpperCase().split("/");
    if (tradeTypeSplitted.length === 3) {
      return (0, _commons.getLocaleLabels)("NA", tradeTypeSplitted[0].trim()) + "/" + (0, _commons.getLocaleLabels)("NA", tradeTypeSplitted[1].trim()) + "/" + (0, _commons.getLocaleLabels)("NA", tradeTypeSplitted[2].trim().trim());
    } else {
      return (0, _commons.getLocaleLabels)("NA", tradeTypeSplitted[0].trim()) + "/" + (0, _commons.getLocaleLabels)("NA", tradeTypeSplitted[1].trim());
    }
  } else {
    return tradeType;
  }
};

var getAssesories = function getAssesories(accessories) {
  if (accessories) {
    var splittedAccessories = accessories.split("(");
    return splittedAccessories.length ? (0, _commons.getLocaleLabels)("NA", splittedAccessories[0]) + "(" + splittedAccessories[1] : "NA";
  } else {
    return "NA";
  }
};

var getCorporationName = function getCorporationName(corporationName, actualAddress) {
  if (corporationName) {
    //const splittedName = corporationName.split(" ");
    return (0, _commons.getLocaleLabels)("TL_LOCALIZATION_ULBGRADE_MC1", "TL_LOCALIZATION_ULBGRADE_MC1") + " " + (0, _commons.getLocaleLabels)("TENANT_TENANTS_" + actualAddress.tenantId.replace('.', '_').toUpperCase(), "TENANT_TENANTS_" + actualAddress.tenantId.replace('.', '_').toUpperCase());
  } else {
    return "NA";
  }
};

var getReceiptData = function getReceiptData(transformedData, ulbLogo) {
  var owners = transformedData.owners.map(function (owner) {
    return [{
      text: (0, _commons.getLocaleLabels)("Owner Name", "TL_LOCALIZATION_OWNER_NAME"),
      border: [true, true, false, true],
      style: "receipt-table-key"
    }, {
      text: owner.name }, {
      text: (0, _commons.getLocaleLabels)("Owner Mobile", "TL_LOCALIZATION_OWNER_MOBILE"),
      border: [true, true, false, true],
      style: "receipt-table-key"
    }, { text: owner.mobile }];
  });
  var receiptData = {
    defaultStyle: {
      font: "Camby"
    },
    content: [{
      style: "tl-head",
      table: {
        widths: [50, "*", 100],
        body: [[{
          image: ulbLogo,
          width: 50,
          height: 61.25,
          margin: [41, 12, 10, 10]
        }, {
          //stack is used here to give multiple sections one after another in same body
          stack: [{
            text: getCorporationName(transformedData.corporationName, transformedData.actualAddress),
            style: "receipt-logo-header"
          }, {
            text: (0, _commons.getLocaleLabels)("Trade License Payment reciept", "TL_LOCALIZATION_PAYMENT_RECIEPT"),
            style: "receipt-logo-sub-header"
          }],
          alignment: "center",
          margin: [56, 23, 0, 0]
        }, {
          text: [{
            //     text: `Receipt No.\n ${transformedData.receiptNumber}`,
            text: (0, _commons.getLocaleLabels)("Receipt No.", "TL_LOCALIZATION_RECIEPT_NO") + transformedData.receiptNumber,
            bold: true,
            style: "receipt-no"
          }],
          alignment: "center",
          margin: [-50, 30, 0, 2]
        }]]
      },
      layout: noborder
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: (0, _commons.getLocaleLabels)("Application Type", "TL_LOCALIZATION_APPLICATION_TYPE"),
          bold: true
        }, {
          text: (0, _commons.getLocaleLabels)("TL_LOCALIZATION_" + transformedData.applicationType.replace('.', '_'), "TL_LOCALIZATION_" + transformedData.applicationType.replace('.', '_')),
          bold: false
        }],

        alignment: "left"
      }, {
        text: [{
          text: (0, _commons.getLocaleLabels)("Old License No.", "TL_LOCALIZATION_OLD_LICENSE_NO"),
          bold: true
        }, {
          text: transformedData.oldLicenseNumber,
          bold: false
        }],
        alignment: "right"
      }]
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: (0, _commons.getLocaleLabels)("Application No.", "TL_LOCALIZATION_APPLICATION_NO"),
          bold: true
        }, {
          text: transformedData.applicationNumber,
          bold: false
        }],

        alignment: "left"
      }, {
        text: [{
          text: (0, _commons.getLocaleLabels)("Reciept No.", "TL_LOCALIZATION_RECIEPT_NO"),
          bold: true
        }, {
          text: transformedData.receiptNumber,
          bold: false
        }],
        alignment: "right"
      }]
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: (0, _commons.getLocaleLabels)("Financial Year", "TL_LOCALIZATION_FINANCIAL_YEAR"),
          bold: true
        }, {
          text: transformedData.financialYear,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: (0, _commons.getLocaleLabels)("Payment Date", "TL_LOCALIZATION_PAYMENT_DATE"),
          bold: true
        }, {
          text: transformedData.paymentDate,
          bold: false
        }],
        alignment: "right"
      }]
    }, { text: (0, _commons.getLocaleLabels)("Trade Details", "TL_LOCALIZATION_TRADE_DETAILS"), style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: (0, _commons.getLocaleLabels)(" Trade Name", "TL_LOCALIZATION_TRADE_NAME"),
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.tradeName, border: borderValue }, {
          text: (0, _commons.getLocaleLabels)("Trade Category", "TL_LOCALIZATION_TRADE_CATEGORY"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: (0, _commons.getLocaleLabels)("NA", transformedData.tradeCategory),
          border: borderValue
        }]]
      },
      layout: tableborder
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: accessoriesTable,
        body: [[{
          text: (0, _commons.getLocaleLabels)("Trade Type", "TL_LOCALIZATION_TRADE_TYPE"),
          border: [true, false, false, true],
          style: "receipt-table-key"
        }, {
          text: getLocaleForTradeType(transformedData.tradeTypeReceipt),
          border: [false, false, true, true]
        }], [{
          text: (0, _commons.getLocaleLabels)("Accessories", "TL_LOCALIZATION_ACCESSORIES"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: getAssesories(transformedData.accessoriesList),
          border: borderValue
        }]]
      },
      layout: tableborder
    }, { text: (0, _commons.getLocaleLabels)("Trade Category", "TL_LOCALIZATION_TRADE_CATEGORY"), style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: (0, _commons.getLocaleLabels)("House Door No.", "TL_LOCALIZATION_HOUSE_DOOR_NO"),
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.doorNo,
          border: borderValue
        }, {
          text: (0, _commons.getLocaleLabels)("Building Name", "TL_LOCALIZATION_BUILDING_NAME"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.buildingName,
          border: borderValue
        }], [{
          text: (0, _commons.getLocaleLabels)("Street Name", "TL_LOCALIZATION_STREET_NAME"),
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.streetName, border: borderValue }, {
          text: (0, _commons.getLocaleLabels)("Locality", "TL_LOCALIZATION_LOCALITY"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: (0, _commons.getLocaleLabels)("NA", (transformedData.actualAddress.tenantId.replace('.', '_') + '_REVENUE_' + transformedData.actualAddress.locality.code).toUpperCase()) + " " + (0, _commons.getLocaleLabels)("NA", transformedData.city),
          border: borderValue
        }]]
      },
      layout: tableborder
    }, { text: (0, _commons.getLocaleLabels)("Ownership Information", "TL_LOCALIZATION_OWNERSHIP_INFORMATION"), style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: owners
      },
      layout: tableborder
    }, { text: (0, _commons.getLocaleLabels)("Payable Amount", "TL_LOCALIZATION_PAYABLE_AMOUNT"), style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: payableAmountTable,
        body: [[{
          text: (0, _commons.getLocaleLabels)("Trade License Fee", "TL_LOCALIZATION_TRADE_LICENSE_FEE"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Penalty", "TL_LOCALIZATION_PENALTY"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Rebate", "TL_LOCALIZATION_REBATE"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Adhoc Penalty", "TL_LOCALIZATION_ADHOC_PENALTY"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Adhoc Rebate", "TL_LOCALIZATION_ADHOC_REBATE"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Total", "TL_LOCALIZATION_TOTAL"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }], [{
          text: transformedData.tlFee,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlPenalty,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlRebate,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlAdhocPenalty,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlAdhocRebate,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.totalAmount,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }]]
      },
      layout: tableborder
    }, { text: (0, _commons.getLocaleLabels)("Payment Information", "TL_LOCALIZATION_PAYMENT_INFORMATION"), style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: (0, _commons.getLocaleLabels)("Total Amount Paid:", "TL_LOCALIZATION_TOTAL_AMOUNT_PAID"),
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.amountPaid, border: borderValue }, {
          text: (0, _commons.getLocaleLabels)("Amount Due:", "TL_LOCALIZATION_AMOUNT_DUE"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.amountDue,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: payableInfoTable3,
        body: [[{
          text: (0, _commons.getLocaleLabels)("Payment Mode", "TL_LOCALIZATION_PAYMENT_MODE"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Transaction ID/ Cheque/ DD No.", "TL_LOCALIZATION_TRANSACTION_ID"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: (0, _commons.getLocaleLabels)("Bank Name & Branch", "TL_LOCALIZATION_BANK_NAME_WITH_BRANCH"),
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }], [{
          text: transformedData.paymentMode,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.transactionNumber,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.bankAndBranch,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }]]
      },
      layout: tableborder
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: (0, _commons.getLocaleLabels)("G8 Receipt No:", "TL_LOCALIZATION_G8_RECEIPT_NO"),
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.g8ReceiptNo, border: borderValue }, {
          text: (0, _commons.getLocaleLabels)("G8 Receipt Issue Date:", "TL_LOCALIZATION_G8_RECEIPT_ISSUE_DATE"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.g8ReceiptDate,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, {
      style: "receipt-approver",
      columns: [{
        text: [{
          text: (0, _commons.getLocaleLabels)("Generated By:", "TL_LOCALIZATION_GENERATED_BY"),
          bold: true
        }, {
          text: transformedData.auditorName,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: (0, _commons.getLocaleLabels)("Commissioner/EO", "TL_LOCALIZATION_COMMISSIONER_OR_EO"),
          bold: true
        }],
        alignment: "right"
      }]
    }],
    footer: [{
      text: (0, _commons.getLocaleLabels)("Note:\n1. Payment received by cheque/demand draft shall be subject to realization.\n2. This document is not a proof of Property Ownership.\n3. This is a computer generated document, hence requires no signature.", "TL_LOCALIZATION_NOTE"),
      style: "receipt-footer"
    }],
    styles: {
      "tl-head": {
        fillColor: "#F2F2F2",
        margin: [-41, -41, -41, 0]
      },
      "pt-reciept-citizen-header": {
        fontSize: 12,
        bold: true,
        margin: [0, 8, 0, 0], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [0, 16, 0, 8], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848"
      },
      "receipt-assess-table": {
        fontSize: 10,
        color: "#484848",
        margin: [0, 8, 0, 0]
      },
      "receipt-assess-table-header": {
        bold: true,
        fillColor: "#D8D8D8",
        color: "#484848"
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: true
      },
      "receipt-table-value": {
        color: "#484848"
      },
      "receipt-logo-header": {
        color: "#484848",
        //  fontFamily: fontName,
        fontSize: 16,
        bold: true,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        //  fontFamily: fontName,
        fontSize: 13,
        letterSpacing: 1.6,
        margin: [0, 6, 0, 0]
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [30, -20, 0, 0]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "receipt-approver": {
        fontSize: 10,
        bold: true,
        margin: [0, 60, 0, 8], //left top right bottom
        color: "#484848"
      }
    }
  };
  return receiptData;
};

var getCertificateData = function getCertificateData(transformedData, ulbLogo) {
  var tlCertificateData = {
    defaultStyle: {
      font: "Camby"
    },
    content: [{
      table: {
        widths: ["*"],
        body: [[{
          stack: [{
            image: ulbLogo,
            width: 50,
            height: 61.25,
            alignment: "center"
          }, {
            text: getCorporationName(transformedData.corporationName, transformedData.actualAddress),
            style: "receipt-logo-header",
            margin: [0, 10, 0, 0]
            // font:"Roboto"
          }, {
            text: (0, _commons.getLocaleLabels)("TL_LOCALIZATION_CORPORATION_ADDRESS", "TL_LOCALIZATION_CORPORATION_ADDRESS") + "\n" + (0, _commons.getLocaleLabels)("Contact : ", "TL_LOCALIZATION_CORPORATION_CONTACT") + transformedData.corporationContact + "\n" + (0, _commons.getLocaleLabels)("Website : ", "TL_LOCALIZATION_CORPORATION_WEBSITE") + transformedData.corporationWebsite + "\n" + (0, _commons.getLocaleLabels)("Email : ", "TL_LOCALIZATION_CORPORATION_EMAIL") + transformedData.corporationEmail,
            style: "receipt-logo-sub-text",
            margin: [0, 8, 0, 0]

          }, {
            text: (0, _commons.getLocaleLabels)("TRADE LICENSE CERTIFICATE", "TL_LOCALIZATION_TRADE_LICENSE_CERTIFICATE"),
            style: "receipt-logo-sub-header",
            margin: [0, 30, 0, 0]
          }],
          alignment: "center",
          margin: [0, 0, 0, 0]
        }]]
      },
      layout: noborder
    }, {
      style: "tl-certificate-data",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade License Number", "TL_LOCALIZATION_TRADE_LICENSE_NO")
      }, {
        width: "*",
        text: transformedData.licenseNumber

      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Application Number", "TL_LOCALIZATION_APPLICATION_NO")
      }, {
        width: "*",
        text: transformedData.applicationNumber

      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Receipt Number", "TL_LOCALIZATION_RECIEPT_NO")
      }, {
        width: "*",
        text: transformedData.receiptNumber

      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Financial Year", "TL_LOCALIZATION_FINANCIAL_YEAR")
      }, {
        width: "*",
        text: transformedData.financialYear

      }]
    }, {
      style: "tl-certificate-data",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade Name", "TL_LOCALIZATION_TRADE_NAME")
      }, {
        width: "*",
        text: transformedData.tradeName
        //  font: "Roboto"
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade Owner Name", "TL_LOCALIZATION_TRADE_OWNER_NAME")
      }, {
        width: "*",
        text: transformedData.ownersList
        //   font: "Roboto"
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade Owner Contact", "TL_LOCALIZATION_TRADE_OWNER_CONTACT")
      }, {
        width: "*",
        text: transformedData.owners[0].mobile
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade Address", "TL_LOCALIZATION_TRADE_ADDRESS")
      }, {
        width: "*",
        //text: transformedData.address
        text: (0, _commons.getLocaleLabels)("NA", (transformedData.actualAddress.tenantId.replace('.', '_') + '_REVENUE_' + transformedData.actualAddress.locality.code).toUpperCase()) + " " + (0, _commons.getLocaleLabels)("NA", transformedData.city)

        //    font: "Roboto"
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade Type", "TL_LOCALIZATION_TRADE_TYPE")
      }, {
        width: "*",
        text: getLocaleForTradeType(transformedData.tradeTypeCertificate)

      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Accessories", "TL_LOCALIZATION_ACCESSORIES")
      }, {
        width: "*",
        text: getAssesories(transformedData.accessoriesList)

      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("Trade License Fee", "TL_LOCALIZATION_TRADE_LICENSE_FEE")
      }, {
        width: "*",
        text: (0, _commons.getLocaleLabels)("Rs.", "TL_LOCALIZATION_TRADE_LICENSE_RS") + transformedData.totalAmount
        //     font: "Roboto"
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("License Issue Date", "TL_LOCALIZATION_LICENSE_ISSUE_DATE")
      }, {
        width: "*",
        text: transformedData.licenseIssueDate

      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: (0, _commons.getLocaleLabels)("License Validity", "TL_LOCALIZATION_LICENSE_VALIDITY")
      }, {
        width: "*",
        text: transformedData.licenseValidity.startDate + (0, _commons.getLocaleLabels)("To", "TL_LOCALIZATION_TRADE_LICENSE_TO") + transformedData.licenseValidity.endDate

      }]
    }, {
      style: "tl-certificate-footer",
      columns: [{
        text: [{
          text: (0, _commons.getLocaleLabels)("Approved By:", "TL_LOCALIZATION_APPROVED_BY")
        }, {
          text: transformedData.auditorName

        }],
        alignment: "left"
      }, {
        text: [{
          text: (0, _commons.getLocaleLabels)("Commissioner/EO", "TL_LOCALIZATION_COMMISSIONER_OR_EO"),
          bold: false
        }],
        alignment: "right"
      }]
    }],
    footer: [{
      text: transformedData.Disclaimer,
      style: "receipt-footer"
    }],
    //define all the styles here
    styles: {
      "pt-reciept-citizen-header": {
        fontSize: 14,
        margin: [0, 24, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "tl-certificate-data": {
        fontSize: 14,
        margin: [0, 12, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "tl-certificate-data-2": {
        fontSize: 14,
        margin: [0, 8, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },

      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [0, 16, 0, 8], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848"
      },
      "receipt-assess-table": {
        fontSize: 10,
        color: "#484848",
        margin: [0, 8, 0, 0]
      },
      "receipt-assess-table-header": {
        bold: true,
        fillColor: "#D8D8D8",
        color: "#484848"
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: true
      },
      "receipt-table-value": {
        color: "#484848"
      },
      "receipt-logo-header": {
        color: "#1E1E1E",

        fontSize: 18,
        bold: true,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-text": {
        color: "#656565",

        fontSize: 14,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#1E1E1E",

        fontSize: 16,
        letterSpacing: 1.6,
        bold: true
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [10, -25, 5, 5]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "tl-certificate-footer": {
        fontSize: 14,
        margin: [0, 50, 0, 0], //left top right bottom
        color: "#1E1E1E"
      }
    }
  };

  return tlCertificateData;
};

var generateReceipt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, type) {
    var data1, data2, data3, data4, data5, ulbLogo, transformedData, certificate_data, receipt_data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _pdfmake2.default.vfs = _vfs_fonts2.default.vfs;
            _pdfmake2.default.fonts = {
              Camby: {
                normal: 'Cambay-Regular.ttf',
                bold: 'Cambay-Regular.ttf',
                italics: 'Cambay-Regular.ttf',
                bolditalics: 'Cambay-Regular.ttf'
              }

            };
            data1 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "applicationDataForReceipt", {});
            data2 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "receiptDataForReceipt", {});
            data3 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "mdmsDataForReceipt", {});
            data4 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "userDataForReceipt", {});
            data5 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject.Licenses[0].tradeLicenseDetail, "address", {});
            ulbLogo = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "base64UlbLogo", "");

            if (!_lodash2.default.isEmpty(data1)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return");

          case 12:
            if (!_lodash2.default.isEmpty(data2)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return");

          case 16:
            if (!_lodash2.default.isEmpty(data3)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return");

          case 20:
            if (!_lodash2.default.isEmpty(data4)) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return");

          case 24:
            if (!_lodash2.default.isEmpty(ulbLogo)) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return");

          case 26:
            transformedData = (0, _extends3.default)({}, data1, data2, data3, data4, {
              actualAddress: data5
            });
            _context.t0 = type;
            _context.next = _context.t0 === "certificate_download" ? 30 : _context.t0 === "certificate_print" ? 33 : _context.t0 === "receipt_download" ? 36 : _context.t0 === "receipt_print" ? 39 : 42;
            break;

          case 30:
            certificate_data = getCertificateData(transformedData, ulbLogo);

            certificate_data &&
            //  pdfMakeCustom.createPdf(certificate_data).download("tl_certificate.pdf");
            _pdfmake2.default.createPdf(certificate_data).open();
            return _context.abrupt("break", 43);

          case 33:
            certificate_data = getCertificateData(transformedData, ulbLogo);
            certificate_data && _pdfmake2.default.createPdf(certificate_data).print();
            return _context.abrupt("break", 43);

          case 36:
            receipt_data = getReceiptData(transformedData, ulbLogo);


            receipt_data &&
            //   pdfMakeCustom.createPdf(receipt_data).download("tl_receipt.pdf");
            _pdfmake2.default.createPdf(receipt_data).open();
            return _context.abrupt("break", 43);

          case 39:
            receipt_data = getReceiptData(transformedData, ulbLogo);
            receipt_data && _pdfmake2.default.createPdf(receipt_data).print();
            return _context.abrupt("break", 43);

          case 42:
            return _context.abrupt("break", 43);

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function generateReceipt(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = generateReceipt;