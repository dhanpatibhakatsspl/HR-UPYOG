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

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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
      text: (0, _get2.default)(owner, "mobile"),
      style: "receipt-table-value",
      border: [true, false, false, false]
    }, {
      text: (0, _get2.default)(owner, "name"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: (0, _get2.default)(owner, "gender"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: (0, _get2.default)(owner, "dob"),
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

var getBuildings = function getBuildings(data) {
  var retbuildings = [];
  data && data.buildings.forEach(function (building) {
    retbuildings.push([{
      text: "Property Type",
      border: [true, true, false, false]
    }, {
      text: " Name of Building",
      border: [false, true, false, false]
    }, {
      text: "Building Usage Type",
      border: [false, true, false, false]
    }, {
      text: "Building Usage Subtype",
      border: [false, true, true, false]
    }]);
    retbuildings.push([{
      text: data.propertyType,
      style: "receipt-table-value",
      border: [true, false, false, false]
    }, {
      text: (0, _get2.default)(building, "name", "NA"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: (0, _get2.default)(building, "usageType", "NA"),
      style: "receipt-table-value",
      border: [false, false, false, false]
    }, {
      text: (0, _get2.default)(building, "usageSubType", "NA"),
      style: "receipt-table-value",
      border: [false, false, true, false]
    }]);
    var headerrow = [];
    var valuerow = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.entries(building.uoms)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            uomkey = _step$value[0],
            uomvalue = _step$value[1];

        headerrow.push({
          text: (0, _receiptTransformer.getMessageFromLocalization)("NOC_PROPERTY_DETAILS_" + (0, _commons.getTransformedLocale)(uomkey) + "_LABEL"),
          border: valuerow.length == 0 ? [true, false, false, false] : valuerow.length == 3 ? [false, false, true, false] : [false, false, false, false]
        });
        valuerow.push({
          text: uomvalue,
          style: "receipt-table-value",
          border: valuerow.length == 0 ? [true, false, false, false] : valuerow.length == 3 ? [false, false, true, false] : [false, false, false, false]
          // left, top ,right ,down
        });
        // draw when elements in one row are four
        if (headerrow.length == 4) {
          retbuildings.push([headerrow[0], headerrow[1], headerrow[2], headerrow[3]], [valuerow[0], valuerow[1], valuerow[2], valuerow[3]]);
          headerrow = [];
          valuerow = [];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (headerrow.length > 0) {
      var i;
      for (i = 4 - headerrow.length; i > 0; i--) {
        headerrow.push({
          text: "",
          border: valuerow.length == 3 ? [false, false, true, false] : [false, false, false, false]
        });
        valuerow.push({
          text: "",
          style: "receipt-table-value",
          border: valuerow.length == 3 ? [false, false, true, false] : [false, false, false, true]
        });
      }
      retbuildings.push([headerrow[0], headerrow[1], headerrow[2], headerrow[3]], [valuerow[0], valuerow[1], valuerow[2], valuerow[3]]);
      headerrow = [];
      valuerow = [];
    }
    // set last row bottom border
    retbuildings[retbuildings.length - 1][0].border[3] = true;
    retbuildings[retbuildings.length - 1][1].border[3] = true;
    retbuildings[retbuildings.length - 1][2].border[3] = true;
    retbuildings[retbuildings.length - 1][3].border[3] = true;
  });
  return retbuildings;
};
var getApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(transformedData, ulbLogo, type) {
    var borderLayout, headerText, nocSubheadOne, nocSubheadTwo, nocDetails, propertyDetails, propertyLocationDetails, applicantDetails, institutionDetails, documents, owners, applicantInformation, amountPaid, paymentInformation, generatedApprovedBy, qrText, qrcode, dd;
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
              // paddingLeft: function(i, node) {
              //   return 5;
              // },
              // paddingRight: function(i, node) {
              //   return 5;
              // },
              // paddingTop: function(i, node) {
              //   return 5;
              // },
              // paddingBottom: function(i, node) {
              //   return 5;
              // }
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
            nocDetails = [{
              text: "NOC DETAILS",
              style: "noc-title"
            }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*"],
                body: [[{
                  text: "NOC Type",
                  border: [true, true, false, false],
                  style: "noc-table-key"
                }, {
                  text: "Provisional NOC No.",
                  border: [false, true, false, false]
                }, {
                  text: "Applicable Fire station",
                  border: [false, true, true, false]
                }], [{
                  text: transformedData.nocType,
                  border: [true, false, false, true],
                  style: "receipt-table-value"
                }, {
                  text: transformedData.provisionalNocNumber,
                  border: [false, false, false, true],
                  style: "receipt-table-value"
                }, {
                  text: transformedData.fireStationId,
                  border: [false, false, true, true],
                  style: "receipt-table-value"
                }]]
              },
              layout: borderLayout
            }];
            propertyDetails = [{
              text: "PROPERTY DETAILS",
              style: "noc-title"
            }, {
              style: "noc-table",
              table: {
                widths: ["*", "*", "*", "*"],
                body: getBuildings(transformedData)
              },
              layout: borderLayout
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
                }], [{
                  text: (0, _receiptTransformer.getMessageFromLocalization)("COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(transformedData.ownershipType)),
                  style: "receipt-table-value",
                  border: [true, false, false, false]
                }, {
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


            if (transformedData.ownershipType.startsWith("INSTITUTION")) {
              applicantDetails = [];
              applicantInformation = [];
            } else {
              institutionDetails = [];
            }

            _context.t0 = type;
            _context.next = _context.t0 === "application" ? 20 : _context.t0 === "receipt" ? 25 : _context.t0 === "certificate" ? 35 : 43;
            break;

          case 20:
            applicantInformation = [];
            amountPaid = [];
            paymentInformation = [];
            generatedApprovedBy = [];
            return _context.abrupt("break", 43);

          case 25:
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
            nocDetails = [];
            propertyDetails = [];
            propertyLocationDetails = [];
            applicantDetails = [];
            documents = [];
            qrText = "Application: " + transformedData.applicationNumber + ", Receipt number: " + transformedData.receiptNumber + ", Date of payment: " + transformedData.paymentDate + ", Fees Paid: " + transformedData.amountPaid + ", Payment mode: " + transformedData.paymentMode + ", Transaction ID: " + transformedData.transactionNumber;
            return _context.abrupt("break", 43);

          case 35:
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
            return _context.abrupt("break", 43);

          case 43:
            _context.next = 45;
            return _qrcode2.default.toDataURL(qrText);

          case 45:
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
                      text: "Fire NOC " + headerText,
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
              }].concat((0, _toConsumableArray3.default)(nocDetails), (0, _toConsumableArray3.default)(propertyDetails), (0, _toConsumableArray3.default)(propertyLocationDetails), (0, _toConsumableArray3.default)(applicantDetails), (0, _toConsumableArray3.default)(documents), (0, _toConsumableArray3.default)(applicantInformation), (0, _toConsumableArray3.default)(institutionDetails), (0, _toConsumableArray3.default)(amountPaid), (0, _toConsumableArray3.default)(paymentInformation), (0, _toConsumableArray3.default)(generatedApprovedBy)),
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

          case 48:
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
    var applicationData, paymentData, mdmsData, ulbLogo, auditorData, transformedData, fileName, application_data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            applicationData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applicationDataForPdf", {});
            paymentData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "receiptDataForPdf", {});
            mdmsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "mdmsDataForPdf", {});
            ulbLogo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "base64UlbLogoForPdf", "");
            auditorData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "userDataForPdf", {});

            if (!(0, _isEmpty2.default)(applicationData)) {
              _context2.next = 10;
              break;
            }

            console.log("Error in application data");
            return _context2.abrupt("return");

          case 10:
            if (!(0, _isEmpty2.default)(mdmsData)) {
              _context2.next = 15;
              break;
            }

            console.log("Error in mdms data");
            return _context2.abrupt("return");

          case 15:
            if (!(0, _isEmpty2.default)(ulbLogo)) {
              _context2.next = 20;
              break;
            }

            console.log("Error in image data");
            return _context2.abrupt("return");

          case 20:
            if (!((type.startsWith("receipt") || type.startsWith("certificate")) && (0, _isEmpty2.default)(auditorData))) {
              _context2.next = 25;
              break;
            }

            console.log("Error in auditor user data");
            return _context2.abrupt("return");

          case 25:
            if (!((type.startsWith("receipt") || type.startsWith("certificate")) && (0, _isEmpty2.default)(paymentData))) {
              _context2.next = 28;
              break;
            }

            console.log("Error in payment data");
            return _context2.abrupt("return");

          case 28:
            transformedData = (0, _extends3.default)({}, applicationData, paymentData, mdmsData, auditorData);
            _context2.t0 = type;
            _context2.next = _context2.t0 === "application_download" ? 32 : _context2.t0 === "application_print" ? 38 : _context2.t0 === "receipt_download" ? 43 : _context2.t0 === "receipt_print" ? 49 : _context2.t0 === "certificate_download" ? 54 : _context2.t0 === "certificate_print" ? 60 : 65;
            break;

          case 32:
            fileName = "noc_application_" + transformedData.applicationNumber;
            _context2.next = 35;
            return getApplicationData(transformedData, ulbLogo, "application");

          case 35:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).download(fileName);
            return _context2.abrupt("break", 66);

          case 38:
            _context2.next = 40;
            return getApplicationData(transformedData, ulbLogo, "application");

          case 40:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).print();
            return _context2.abrupt("break", 66);

          case 43:
            fileName = "noc_receipt_" + transformedData.receiptNumber;
            _context2.next = 46;
            return getApplicationData(transformedData, ulbLogo, "receipt");

          case 46:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).download(fileName);
            return _context2.abrupt("break", 66);

          case 49:
            _context2.next = 51;
            return getApplicationData(transformedData, ulbLogo, "receipt");

          case 51:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).print();
            return _context2.abrupt("break", 66);

          case 54:
            fileName = "noc_certificate_" + transformedData.fireNOCNumber;
            _context2.next = 57;
            return getApplicationData(transformedData, ulbLogo, "certificate");

          case 57:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).download(fileName);
            return _context2.abrupt("break", 66);

          case 60:
            _context2.next = 62;
            return getApplicationData(transformedData, ulbLogo, "certificate");

          case 62:
            application_data = _context2.sent;

            application_data && _pdfmake2.default.createPdf(application_data).print();
            return _context2.abrupt("break", 66);

          case 65:
            return _context2.abrupt("break", 66);

          case 66:
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