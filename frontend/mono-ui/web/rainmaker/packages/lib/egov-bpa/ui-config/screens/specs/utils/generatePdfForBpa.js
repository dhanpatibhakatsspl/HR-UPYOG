"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _pdfmake = require("pdfmake/build/pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _vfs_fonts = require("pdfmake/build/vfs_fonts");

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

var _qrcode = require("qrcode");

var _qrcode2 = _interopRequireDefault(_qrcode);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _receiptTransformer = require("./receiptTransformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pdfmake2.default.vfs = _vfs_fonts2.default.pdfMake.vfs;

var getOwners = function getOwners(data) {
  var retowners = [];
  data.owners.forEach(function (owner) {
    retowners.push([{
      text: "Mobile No.",
      border: [true, true, false, false]
    }, {
      text: "Name",
      border: [false, true, false, false]
    }, {
      text: "Gender",
      border: [false, true, false, false]
    }, {
      text: "Date of Birth",
      border: [false, true, true, false]
    }], [{
      text: owner.mobile, //get(owner, "mobile"),
      style: "receipt-table-value",
      border: [true, false, false, false]
    }, {
      text: owner.name, //get(owner, "name"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: owner.gender, //get(owner, "gender"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: owner.dob, //get(owner, "dob"),
      style: "receipt-table-value",
      border: [false, false, true, false]
    }], [{
      text: "",
      border: [true, false, false, false]
    }, {
      text: "",
      border: [false, false, false, false]
    }, {
      text: "",
      border: [false, false, false, false]
    }, {
      text: "",
      border: [false, false, true, false]
    }], [{
      text: "Father/Husband's Name",
      border: [true, false, false, false]
    }, {
      text: "Relationship",
      border: [false, false, false, false]
    }, {
      text: "Email",
      border: [false, false, false, false]
    }, {
      text: "PAN No.",
      border: [false, false, true, false]
    }], [{
      text: (0, _get2.default)(owner, "fatherHusbandName"),
      style: "receipt-table-value",
      border: [true, false, false, false]
    }, {
      text: (0, _get2.default)(owner, "relationship"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: (0, _get2.default)(owner, "email"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: (0, _get2.default)(owner, "pan"),
      style: "receipt-table-value",
      border: [false, false, true, false]
    }], [{
      text: "",
      border: [true, false, false, false]
    }, {
      text: "",
      border: [false, false, false, false]
    }, {
      text: "",
      border: [false, false, false, false]
    }, {
      text: "",
      border: [false, false, true, false]
    }], [{
      text: "Correspondence Address",
      border: [true, false, false, false]
    }, {
      text: "",
      border: [false, false, false, false]
    }, {
      text: "",
      border: [false, false, false, false]
    }, {
      text: "",
      border: [false, false, true, false]
    }], [{
      text: (0, _get2.default)(owner, "address"),
      style: "receipt-table-value",
      border: [true, false, false, true]
    }, {
      text: "",
      style: "receipt-table-value",
      border: [false, false, false, true]
    }, {
      text: "",
      style: "receipt-table-value",
      border: [false, false, false, true]
    }, {
      text: "",
      style: "receipt-table-value",
      border: [false, false, true, true]
    }]);
  });
  return retowners;
};

var getApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(transformedData, ulbLogo, type) {
    var borderLayout, headerText, nocSubheadOne, nocSubheadTwo, propertyLocationDetails, applicantDetails, institutionDetails, documents, owners, applicantInformation, amountPaid, paymentInformation, generatedApprovedBy, qrText, qrcode, dd;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            borderLayout = {
              hLineWidth: function hLineWidth(i, node) {
                return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
              },
              vLineWidth: function vLineWidth(i, node) {
                return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
              },
              hLineColor: function hLineColor(i, node) {
                return i === 0 || i === node.table.body.length ? "#979797" : "#979797";
              },
              vLineColor: function vLineColor(i, node) {
                return i === 0 || i === node.table.widths.length ? "#979797" : "#979797";
              }
            };
            headerText = "Application Confirmation";
            nocSubheadOne = [{
              text: [{
                text: "Application No.     ",
                bold: true
              }, {
                text: transformedData.applicationNumber,
                bold: false
              }],
              alignment: "left"
            }, {
              text: [{
                text: "Date of Application ",
                bold: true
              }, {
                text: transformedData.applicationDate,
                bold: false
              }],
              alignment: "right"
            }];
            nocSubheadTwo = [{
              text: [{
                text: "Application Mode ",
                bold: true
              }, {
                text: transformedData.applicationMode,
                bold: false
              }],
              alignment: "left"
            }];
            propertyLocationDetails = [{
              text: "PROPERTY LOCATION DETAILS",
              style: "noc-title"
            }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*", "*"],
                body: [[{
                  text: "Property Id",
                  border: [true, true, false, false]
                }, {
                  text: "City",
                  border: [false, true, false, false]
                }, {
                  text: "Door/House No.",
                  border: [false, true, false, false]
                }, {
                  text: "Building/Company Name",
                  border: [false, true, true, false]
                }], [{
                  text: transformedData.propertyId,
                  style: "receipt-table-value",
                  border: [true, false, false, false]
                }, {
                  text: transformedData.city,
                  style: "receipt-table-value",
                  border: [false, false, false, false]
                }, {
                  text: transformedData.door,
                  style: "receipt-table-value",
                  border: [false, false, false, false]
                }, {
                  text: transformedData.buildingName,
                  style: "receipt-table-value",
                  border: [false, false, true, false]
                }], [{
                  text: "Street Name",
                  border: [true, false, false, false]
                }, {
                  text: " Mohalla",
                  border: [false, false, false, false]
                }, {
                  text: "Pincode",
                  border: [false, false, false, false]
                }, {
                  text: "Location on Map",
                  border: [false, false, true, false]
                }], [{
                  text: transformedData.street,
                  style: "receipt-table-value",
                  border: [true, false, false, true]
                }, {
                  text: transformedData.mohalla,
                  style: "receipt-table-value",
                  border: [false, false, false, true]
                }, {
                  text: transformedData.pincode,
                  style: "receipt-table-value",
                  border: [false, false, false, true]
                }, {
                  text: transformedData.gis,
                  style: "receipt-table-value",
                  border: [false, false, true, true]
                }]]
              },
              layout: borderLayout
            }];
            applicantDetails = [{
              text: "APPLICANT DETAILS",
              style: "noc-title"
            }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*", "*"],
                body: getOwners(transformedData)
              },
              layout: borderLayout
            }];
            institutionDetails = [{
              text: "INSTITUTION DETAILS",
              style: "noc-title"
            }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*", "*"],
                body: [[{
                  text: "Type of Institution",
                  border: [true, true, false, false]
                }, {
                  text: "Name of Institute",
                  border: [false, true, false, false]
                }, {
                  text: "Official Telephone No.",
                  border: [false, true, false, false]
                }, {
                  text: "Authorized Person",
                  border: [false, true, true, false]
                }], [
                // {
                //   text: getMessageFromLocalization(
                //     `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(
                //       transformedData.ownershipType
                //     )}`
                //   ),
                //   style: "receipt-table-value",
                //   border: [true, false, false, false]
                // },
                {
                  text: transformedData.institutionName,
                  style: "receipt-table-value",
                  border: [false, false, false, false]
                }, {
                  text: transformedData.telephoneNumber,
                  style: "receipt-table-value",
                  border: [false, false, false, false]
                }, {
                  text: transformedData.owners[0].name,
                  style: "receipt-table-value",
                  border: [false, false, true, false]
                }], [{
                  text: "Designation in Institution",
                  border: [true, false, false, false]
                }, {
                  text: "Mobile No. of Authorized Person",
                  border: [false, false, false, false]
                }, {
                  text: "Email of Authorized Person",
                  border: [false, false, false, false]
                }, {
                  text: "Official Correspondence Address",
                  border: [false, false, true, false]
                }], [{
                  text: transformedData.institutionDesignation,
                  style: "receipt-table-value",
                  border: [true, false, false, true]
                }, {
                  text: transformedData.owners[0].mobile,
                  style: "receipt-table-value",
                  border: [false, false, false, true]
                }, {
                  text: transformedData.owners[0].email,
                  style: "receipt-table-value",
                  border: [false, false, false, true]
                }, {
                  text: transformedData.owners[0].address,
                  style: "receipt-table-value",
                  border: [false, false, true, true]
                }]]
              },
              layout: borderLayout
            }];
            documents = [];
            owners = transformedData.owners.map(function (owner) {
              return [{
                text: "Applicant Name",
                border: [true, true, false, true],
                style: "receipt-table-value"
              }, { text: owner.name, border: [false, true, true, true] }, {
                text: "Mobile No.",
                border: [true, true, false, true],
                style: "receipt-table-value"
              }, { text: owner.mobile, border: [false, true, true, true] }];
            });
            applicantInformation = [{ text: "APPLICANT INFORMATION", style: "noc-title" }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*", "*"],
                body: owners
              },
              layout: borderLayout
            }];
            amountPaid = [{ text: "AMOUNT PAID", style: "noc-title" }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*", "*"],
                body: [[{
                  text: "NOC Fee",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }, {
                  text: "NOC Taxes",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }, {
                  text: "Adhoc Penalty/Rebate",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }, {
                  text: "TOTAL",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }], [{
                  text: transformedData.nocFee,
                  border: [true, true, true, true],
                  alignment: "center"
                }, {
                  text: transformedData.nocTaxes,
                  border: [true, true, true, true],
                  alignment: "center"
                }, {
                  text: transformedData.nocAdhocPenaltyRebate,
                  border: [true, true, true, true],
                  alignment: "center"
                }, {
                  text: transformedData.totalAmount,
                  border: [true, true, true, true],
                  alignment: "center"
                }]]
              },
              layout: borderLayout
            }];
            paymentInformation = [{ text: "PAYMENT INFORMATION", style: "noc-title" }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*"],
                body: [[{
                  text: "Payment Mode",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }, {
                  text: "Transaction ID/ Cheque/ DD No.",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }, {
                  text: "Bank Name & Branch",
                  border: [true, true, true, true],
                  style: "receipt-table-value",
                  alignment: "center"
                }], [{
                  text: transformedData.paymentMode,
                  border: [true, true, true, true],
                  alignment: "center"
                }, {
                  text: transformedData.transactionNumber,
                  border: [true, true, true, true],
                  alignment: "center"
                }, {
                  text: transformedData.bankAndBranch,
                  border: [true, true, true, true],
                  alignment: "center"
                }]]
              },
              layout: borderLayout
            }];
            generatedApprovedBy = [{
              style: "receipt-approver",
              columns: [{
                text: [{
                  text: "Generated by: ",
                  bold: true
                }, {
                  text: transformedData.auditorName,
                  bold: false
                }],
                alignment: "left"
              }, {
                text: [{
                  text: "Commissioner/EO",
                  bold: true
                }],
                alignment: "right"
              }]
            }];
            qrText = "Application: " + transformedData.applicationNumber + ", Date: " + transformedData.applicationDate + ", Buildings: " + transformedData.propertyType + ", Applicant: " + transformedData.owners[0].name + ", Address: " + transformedData.address;

            // if (transformedData.ownershipType.startsWith("INSTITUTION")) {
            // applicantDetails = [];
            // applicantInformation = [];
            // } else {
            //   institutionDetails = [];
            // }

            _context.t0 = type;
            _context.next = _context.t0 === "application" ? 17 : _context.t0 === "receipt" ? 22 : _context.t0 === "certificate" ? 30 : 38;
            break;

          case 17:
            applicantInformation = [];
            amountPaid = [];
            paymentInformation = [];
            generatedApprovedBy = [];
            return _context.abrupt("break", 38);

          case 22:
            headerText = "Payment Receipt";
            nocSubheadOne = [{
              text: [{
                text: "Application No.            ",
                bold: true
              }, {
                text: transformedData.applicationNumber,
                bold: false
              }],
              alignment: "left"
            }, {
              text: [{
                text: "Date of Payment   ",
                bold: true
              }, {
                text: transformedData.paymentDate,
                bold: false
              }],
              alignment: "right"
            }];
            nocSubheadTwo = [{
              text: [{
                text: "Payment Receipt No.  ",
                bold: true
              }, {
                text: transformedData.receiptNumber,
                bold: false
              }],
              alignment: "left"
            }];
            propertyLocationDetails = [];
            applicantDetails = [];
            documents = [];
            qrText = "Application: " + transformedData.applicationNumber + ", Receipt number: " + transformedData.receiptNumber + ", Date of payment: " + transformedData.paymentDate + ", Fees Paid: " + transformedData.amountPaid + ", Payment mode: " + transformedData.paymentMode + ", Transaction ID: " + transformedData.transactionNumber;
            return _context.abrupt("break", 38);

          case 30:
            headerText = "Certificate";
            nocSubheadOne = [{
              text: [{
                text: "Fire NOC No. ",
                bold: true
              }, {
                text: transformedData.fireNOCNumber,
                bold: false
              }],
              alignment: "left"
            }, {
              text: [{
                text: "Application No. ",
                bold: true
              }, {
                text: transformedData.applicationNumber,
                bold: false
              }],
              alignment: "right"
            }];
            nocSubheadTwo = [{
              text: [{
                text: "Date of Issue ",
                bold: true
              }, {
                text: transformedData.issuedDate,
                bold: false
              }],
              alignment: "left"
            }, {
              text: [{
                text: "Valid Till ",
                bold: true
              }, {
                text: transformedData.validTo,
                bold: false
              }],
              alignment: "right"
            }];
            applicantDetails = [];
            documents = [];
            generatedApprovedBy = [{
              style: "receipt-approver",
              columns: [{
                text: [{
                  text: "Approved by: ",
                  bold: true
                }, {
                  text: transformedData.auditorName,
                  bold: false
                }],
                alignment: "left"
              }, {
                text: [{
                  text: "Commissioner/EO",
                  bold: true
                }],
                alignment: "right"
              }]
            }];
            qrText = "Application: " + transformedData.applicationNumber + ", NOC Number: " + transformedData.fireNOCNumber + ", Date of Issue: " + transformedData.issuedDate + ", Valid Till: " + transformedData.validTo + ", Buildings: " + transformedData.propertyType + ", Applicant: " + transformedData.owners[0].name;
            return _context.abrupt("break", 38);

          case 38:
            _context.next = 40;
            return _qrcode2.default.toDataURL(qrText);

          case 40:
            qrcode = _context.sent;
            dd = {
              content: [{
                style: "noc-head",
                table: {
                  widths: [120, "*", 120],
                  body: [[{
                    image: ulbLogo,
                    width: 60,
                    height: 61.25,
                    margin: [51, 12, 10, 10]
                  }, {
                    stack: [{
                      text: transformedData.corporationName,
                      style: "receipt-logo-header"
                    }, {
                      text: "BPA " + headerText,
                      style: "receipt-logo-sub-header"
                    }],
                    alignment: "left",
                    margin: [10, 23, 0, 0]
                  }, {
                    image: qrcode,
                    width: 70,
                    height: 70,
                    margin: [50, 8, 8, 8],
                    alignment: "right"
                  }]]
                },
                layout: "noBorders"
              }, {
                style: "noc-subhead",
                columns: nocSubheadOne
              }, {
                style: "noc-subhead",
                columns: nocSubheadTwo
              }].concat((0, _toConsumableArray3.default)(propertyLocationDetails), (0, _toConsumableArray3.default)(applicantDetails), (0, _toConsumableArray3.default)(documents), (0, _toConsumableArray3.default)(applicantInformation), (0, _toConsumableArray3.default)(amountPaid), (0, _toConsumableArray3.default)(paymentInformation), (0, _toConsumableArray3.default)(generatedApprovedBy)),
              footer: [],
              styles: {
                "noc-head": {
                  fillColor: "#F2F2F2",
                  margin: [-70, -41, -81, 0]
                },
                "receipt-logo-header": {
                  color: "#484848",
                  fontFamily: "Roboto",
                  fontSize: 16,
                  bold: true,
                  letterSpacing: 0.74,
                  margin: [0, 0, 0, 5]
                },
                "receipt-logo-sub-header": {
                  color: "#484848",
                  fontFamily: "Roboto",
                  fontSize: 13,
                  letterSpacing: 0.6
                },
                "noc-subhead": {
                  fontSize: 12,
                  bold: true,
                  margin: [-18, 8, 0, 0],
                  color: "#484848"
                },
                "noc-title": {
                  fontSize: 10,
                  bold: true,
                  margin: [-18, 16, 8, 8],
                  color: "#484848",
                  fontWeight: 500
                },
                "noc-table": {
                  fontSize: 10,
                  color: "#484848",
                  margin: [-20, -2, -8, -8]
                },
                "receipt-header-details": {
                  fontSize: 9,
                  margin: [0, 0, 0, 8],
                  color: "#484848"
                },
                "noc-table-key": {
                  color: "#484848",
                  bold: false,
                  fontSize: 10
                },
                "receipt-table-value": {
                  color: "#484848",
                  bold: true,
                  fontSize: 10
                },
                "receipt-footer": {
                  color: "#484848",
                  fontSize: 8,
                  margin: [-6, 15, -15, -10]
                },
                "receipt-no": {
                  color: "#484848",
                  fontSize: 10
                },
                "receipt-approver": {
                  fontSize: 12,
                  bold: true,
                  margin: [-20, 30, -10, 0],
                  color: "#484848"
                }
              }
            };
            return _context.abrupt("return", dd);

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getApplicationData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var generatePdf = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, type) {
    var applicationData, paymentData, ulbLogo, transformedData, fileName, application_data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            applicationData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applicationDataForPdf", {});
            paymentData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "receiptDataForPdf", {});
            // let mdmsData = get(
            //   state.screenConfiguration.preparedFinalObject,
            //   "mdmsDataForPdf",
            //   {}
            // );

            ulbLogo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "base64UlbLogoForPdf", "");
            // let auditorData = get(
            //   state.screenConfiguration.preparedFinalObject,
            //   "userDataForPdf",
            //   {}
            // );

            if (!(0, _isEmpty2.default)(applicationData)) {
              _context2.next = 8;
              break;
            }

            console.log("Error in application data");
            return _context2.abrupt("return");

          case 8:
            if (!(0, _isEmpty2.default)(ulbLogo)) {
              _context2.next = 11;
              break;
            }

            console.log("Error in image data");
            return _context2.abrupt("return");

          case 11:
            // else if (
            //   (type.startsWith("receipt") || type.startsWith("certificate")) &&
            //   isEmpty(auditorData)
            // ) {
            //   console.log("Error in auditor user data");
            //   return;
            // }
            //  else if (
            //   (type.startsWith("receipt") || type.startsWith("certificate")) &&
            //   isEmpty(paymentData)
            // ) {
            //   console.log("Error in payment data");
            //   return;
            // }
            transformedData = (0, _extends3.default)({}, applicationData, paymentData);
            _context2.t0 = type;
            _context2.next = _context2.t0 === "application_download" ? 15 : _context2.t0 === "application_print" ? 21 : _context2.t0 === "receipt_download" ? 26 : _context2.t0 === "receipt_print" ? 32 : _context2.t0 === "certificate_download" ? 37 : _context2.t0 === "certificate_print" ? 43 : 48;
            break;

          case 15:
            fileName = "bpa_application_" + transformedData.applicationNumber;
            _context2.next = 18;
            return getApplicationData(transformedData, ulbLogo, "application");

          case 18:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).download(fileName);
            return _context2.abrupt("break", 49);

          case 21:
            _context2.next = 23;
            return getApplicationData(transformedData, ulbLogo, "application");

          case 23:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).print();
            return _context2.abrupt("break", 49);

          case 26:
            fileName = "noc_receipt_" + transformedData.receiptNumber;
            _context2.next = 29;
            return getApplicationData(transformedData, ulbLogo, "receipt");

          case 29:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).download(fileName);
            return _context2.abrupt("break", 49);

          case 32:
            _context2.next = 34;
            return getApplicationData(transformedData, ulbLogo, "receipt");

          case 34:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).print();
            return _context2.abrupt("break", 49);

          case 37:
            fileName = "noc_certificate_" + transformedData.fireNOCNumber;
            _context2.next = 40;
            return getApplicationData(transformedData, ulbLogo, "certificate");

          case 40:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).download(fileName);
            return _context2.abrupt("break", 49);

          case 43:
            _context2.next = 45;
            return getApplicationData(transformedData, ulbLogo, "certificate");

          case 45:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).print();
            return _context2.abrupt("break", 49);

          case 48:
            return _context2.abrupt("break", 49);

          case 49:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function generatePdf(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = generatePdf;