"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcknowledgementReceipt = undefined;

var _pdfmake = require("pdfmake/build/pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _vfs_fonts = require("./vfs_fonts");

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

var _commons = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pdfmake2.default.vfs = _vfs_fonts2.default.vfs;
//import pdfFonts from "pdfmake/build/vfs_fonts";


_pdfmake2.default.fonts = {
  Camby: {
    normal: "Cambay-Regular.ttf",
    bold: "Cambay-Regular.ttf",
    italics: "Cambay-Regular.ttf",
    bolditalics: "Cambay-Regular.ttf"
  }
};

var AcknowledgementReceipt = exports.AcknowledgementReceipt = function AcknowledgementReceipt(role, details, generalMDMSDataById, receiptImageUrl, isEmployeeReceipt) {
  console.log("details--" + details);
  console.log(generalMDMSDataById);
  var data = void 0;
  var owners = details.owners,
      address = details.address,
      propertyDetails = details.propertyDetails,
      header = details.header,
      propertyId = details.propertyId;

  var dateArray = new Date(propertyDetails[0].assessmentDate).toDateString().split(" ");
  var assessmentDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[3];
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

  var tableborderNone = {
    hLineColor: function hLineColor(i, node) {
      return "#F2F2F2";
    },
    vLineColor: function vLineColor(i, node) {
      return "#F2F2F2";
    },
    hLineWidth: function hLineWidth(i, node) {
      return 0;
    },
    vLineWidth: function vLineWidth(i, node) {
      return 0;
    }
  };

  var transform = function transform(value, masterName) {
    // console.log(generalMDMSDataById);
    if (value) {
      return generalMDMSDataById && generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][value].code : "NA";
    } else {
      return "NA";
    }
  };

  switch (role) {
    case "pt-reciept-citizen":
      // let floorData = propertyDetails[0].noOfFloors || 1;

      // data for floor details
      var getFloorDetails = function getFloorDetails() {
        var bodyData = [];
        var _propertyDetails$ = propertyDetails[0],
            units = _propertyDetails$.units,
            propertySubType = _propertyDetails$.propertySubType;

        var dataRow = [];
        if (units && units.length) {
          dataRow.push({ text: (0, _commons.getLocaleLabels)("Floor", "PT_ACK_LOCALIZATION_FLOOR"), style: "receipt-assess-table-header" });
          dataRow.push({ text: (0, _commons.getLocaleLabels)("Usage Type", "PT_ACK_LOCALIZATION_USAGE_TYPE"), style: "receipt-assess-table-header" });
          dataRow.push({ text: (0, _commons.getLocaleLabels)("Sub Usage Type", "PT_ACK_LOCALIZATION_SUB_USAGE_TYPE"), style: "receipt-assess-table-header" });
          dataRow.push({ text: (0, _commons.getLocaleLabels)("Occupancy", "PT_ACK_LOCALIZATION_OCCUPANCY"), style: "receipt-assess-table-header" });
          dataRow.push({
            text: (0, _commons.getLocaleLabels)("Built Area/Total Annual Rent(sq yards)", "PT_ACK_LOCALIZATION_BUILTAREA_TOTAL_RENT"),
            style: "receipt-assess-table-header"
          });
          bodyData.push(dataRow);
          units && units.map(function (unit) {
            dataRow = [];
            dataRow.push((0, _commons.getLocaleLabels)("PROPERTYTAX_FLOOR_" + transform(unit.floorNo, "Floor"), "PROPERTYTAX_FLOOR_" + transform(unit.floorNo, "Floor")));
            dataRow.push((0, _commons.getLocaleLabels)("PROPERTYTAX_BILLING_SLAB_" + transform(unit.usageCategoryMajor === "NONRESIDENTIAL" ? unit.usageCategoryMinor : unit.usageCategoryMajor, unit.usageCategoryMajor === "NONRESIDENTIAL" ? "UsageCategoryMinor" : "UsageCategoryMajor"), "PROPERTYTAX_BILLING_SLAB_" + transform(unit.usageCategoryMajor === "NONRESIDENTIAL" ? unit.usageCategoryMinor : unit.usageCategoryMajor, unit.usageCategoryMajor === "NONRESIDENTIAL" ? "UsageCategoryMinor" : "UsageCategoryMajor")));
            dataRow.push((0, _commons.getLocaleLabels)("PROPERTYTAX_BILLING_SLAB_" + transform(unit.usageCategoryDetail ? unit.usageCategoryDetail : unit.usageCategorySubMinor, unit.usageCategoryDetail ? "UsageCategoryDetail" : "UsageCategorySubMinor"), "PROPERTYTAX_BILLING_SLAB_" + transform(unit.usageCategoryDetail ? unit.usageCategoryDetail : unit.usageCategorySubMinor, unit.usageCategoryDetail ? "UsageCategoryDetail" : "UsageCategorySubMinor")));
            dataRow.push((0, _commons.getLocaleLabels)("PROPERTYTAX_OCCUPANCYTYPE_" + transform(unit.occupancyType, "OccupancyType"), "PROPERTYTAX_OCCUPANCYTYPE_" + transform(unit.occupancyType, "OccupancyType")));
            if (unit.occupancyType === "RENTED") {
              dataRow.push(unit.arv || "");
            } else {
              dataRow.push("" + Math.round(unit.unitArea * 100) / 100 || "");
            }

            bodyData.push(dataRow);
          });
          return bodyData;
        } else {
          return null;
        }
      };

      var floorData = getFloorDetails();

      var borderKey = [true, true, false, true];
      var borderValue = [false, true, true, true];
      var receiptTableWidth = ["*", "*", "*", "*"];

      var getOwnerDetails = function getOwnerDetails(ownerArray, noOfColumns) {
        var propertyDetails = details.propertyDetails;

        var _ref = propertyDetails[0] || {},
            institution = _ref.institution;

        var isInstitution = propertyDetails && propertyDetails.length ? propertyDetails[0].ownershipCategory === "INSTITUTIONALPRIVATE" || propertyDetails[0].ownershipCategory === "INSTITUTIONALGOVERNMENT" : false;
        var transformedArray = ownerArray.map(function (item, index) {
          return [{
            text: (0, _commons.getLocaleLabels)("Owner", "PT_ACK_LOCALIZATION_OWNER") + ownerArray.length > 1 ? index + 1 : "" + (0, _commons.getLocaleLabels)("Name", "PT_ACK_LOCALIZATION_NAME"),
            border: borderKey,
            style: "receipt-table-key"
          }, {
            text: item.name || "",
            border: borderValue
          }, {
            text: item.relationship === "FATHER" ? (0, _commons.getLocaleLabels)("Father's Name", "PT_ACK_LOCALIZATION_FATHERS_NAME") : (0, _commons.getLocaleLabels)("Husband's Name", "PT_ACK_LOCALIZATION_HUSBAND_NAME"),
            border: borderKey,
            style: "receipt-table-key"
          }, {
            text: item.fatherOrHusbandName || "",
            border: borderValue
          }];
        });
        var flatArray = transformedArray.reduce(function (acc, val) {
          return acc.concat(val);
        }, []);

        if (flatArray.length % noOfColumns !== 0) {
          flatArray.push({
            text: "",
            border: borderKey,
            style: "receipt-table-key"
          }, {
            text: "",
            border: borderValue
          });
        }

        var newArray = [];
        return isInstitution ? [[{
          text: (0, _commons.getLocaleLabels)("Institution Name", "PT_ACK_LOCALIZATION_INSTITUTION_NAME"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: institution.name || "",
          border: borderValue
        }, {
          text: (0, _commons.getLocaleLabels)("Authorised Person", "PT_ACK_LOCALIZATION_AUTHORISED_PERSON"),
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: ownerArray[0].name || "",
          border: borderValue
        }]] : newArray;
      };

      data = {
        defaultStyle: {
          font: "Camby"
        },
        content: [{
          style: "pt-reciept-citizen-table",
          margin: [0, 0, 0, 18],
          table: {
            widths: ["15%", "85%"],
            alignment: "left",
            body: [[{
              image: receiptImageUrl || _pblogo2.default,
              width: 40,
              margin: [10, 10, 10, 10]
            }, {
              //stack is used here to give multiple sections one after another in same body
              stack: [{
                text: (0, _commons.getLocaleLabels)(("TENANT_TENANTS_" + address.tenantId.replace(".", "_")).toUpperCase(), ("TENANT_TENANTS_" + address.tenantId.replace(".", "_")).toUpperCase()) + " " + (0, _commons.getLocaleLabels)(("CORPORATION", "PT_ACK_CORPORATION_HEADER").toUpperCase(), ("CORPORATION", "PT_ACK_CORPORATION_HEADER").toUpperCase()),
                style: "receipt-logo-header"
              }, {
                text: (0, _commons.getLocaleLabels)("PT_ACK_PROPERTY_TAX_ASSESS_ACKNOWLEDGEMENT", "PT_ACK_PROPERTY_TAX_ASSESS_ACKNOWLEDGEMENT") || "",
                style: "receipt-logo-sub-header"
              }],
              alignment: "left",
              margin: [0, 5, 0, 0]
            }]]
          },
          layout: tableborderNone
        }, {
          style: "receipt-header-details",
          columns: [{
            text: [{
              text: "Property ID:",
              bold: true
            }, propertyId || (0, _commons.getLocaleLabels)("PT_LOCALIZATION_NOT_AVAILABLE", "PT_LOCALIZATION_NOT_AVAILABLE")],
            alignment: "left"
          },
          //   {
          //     text: [
          //       {
          //         text: "Assessment No.",
          //         bold: true,
          //       },
          //       "PT-AS-2020-02-13-018679" || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE", "PT_LOCALIZATION_NOT_AVAILABLE"),
          //     ],
          //     alignment: "center",
          //   },
          {
            text: [{
              text: (0, _commons.getLocaleLabels)("Date:", "PT_ACK_LOCALIZATION_DATE"),
              bold: true
            }, assessmentDate || ""],

            alignment: "right"
          }]
        }, { text: "PROPERTY ADDRESS", style: "pt-reciept-citizen-subheader" }, {
          style: "receipt-header-details",
          columns: [{
            stack: [{
              text: "City: ",
              bold: true
            }, {
              text: address.city || ""
            }],
            width: 140,
            margin: [0, 10, 0, 10]
          }, {
            stack: [{
              text: "Door/House No. ",
              bold: true
            }, { text: address.doorNo || "" }],
            width: 140,
            margin: [0, 10, 0, 10]
          }, {
            stack: [{
              text: "Building/Company Name: ",
              bold: true
            }, { text: address.buildingName || "Shobha apartments" }],
            width: 140,
            margin: [0, 10, 0, 10]
          }, {
            stack: [{
              text: "Street Name: ",
              bold: true
            }, { text: address.street || "3rd block" }],
            width: 140,
            margin: [0, 10, 0, 10]
          }]
        }, {
          style: "receipt-header-details",
          columns: [{
            stack: [{
              text: "Mohalla: ",
              bold: true
            }, { text: address.locality.name || "Ajit Nagar" }],
            width: 140,
            margin: [0, 10, 0, 10]
          }, {
            stack: [{
              text: "Pincode: ",
              bold: true
            }, { text: address.pincode || "123456" }],
            width: 140,
            margin: [0, 10, 0, 10]
          }, {
            stack: [{
              text: "Existing Proprty ID: ",
              bold: true
            }, { text: details.oldPropertyId || "PT-107-023456" }],
            width: 140,
            margin: [0, 10, 0, 10]
          }]
        },
        //   {
        //     style: "pt-reciept-citizen-table",
        //     table: {
        //         widths: ['12.5%','12.5%','27%','18%','17.5%','12.5%'],
        //       body: [
        //         [
        //           { text: getLocaleLabels("Existing Property ID:","PT_ACK_LOCALIZATION_EXISTING_PROPERTY_ID"), border: borderKey, style: "receipt-table-key" },
        //           { text: details.existingPropertyId || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE","PT_LOCALIZATION_NOT_AVAILABLE"), border: borderValue },
        //           { text: getLocaleLabels("Property Tax Unique ID:","PT_ACK_LOCALIZATION_PROPERTY_TAX_UNIQUE_ID"),  border: borderKey, style: "receipt-table-key" },
        //           { text: details.propertyId || "", border: borderValue }, //need to confirm this data
        //           { text: getLocaleLabels("Assessment No:","PT_ACK_LOCALIZATION_ASSESSMENT_NO"), border: borderKey, style: "receipt-table-key" },
        //           { text: propertyDetails[0].assessmentNumber || "", border: borderValue },
        //         ],
        //       ],
        //     },
        //     layout: tableborder,
        //   },
        { text: (0, _commons.getLocaleLabels)("PROPERTY ADDRESS", "PT_ACK_LOCALIZATION_PROPERTY_ADDRESS"), style: "pt-reciept-citizen-subheader" }],

        styles: {
          "pt-reciept-citizen-subheader": {
            fontSize: 12,
            bold: true,
            margin: [0, 16, 0, 8], //left top right bottom
            color: "#484848"
          },
          "pt-reciept-citizen-table": {
            fontSize: 10,
            color: "#484848",
            fillColor: "#F2F2F2"
          },
          "receipt-assess-table": {
            fontSize: 12,
            color: "#484848",
            margin: [0, 8, 0, 0]
          },
          "receipt-assess-table-header": {
            bold: true,
            fillColor: "#D8D8D8",
            color: "#484848"
          },
          "receipt-header-details": {
            fontSize: 12,
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
            fontSize: 16,
            bold: true,
            // decoration: "underline",
            // decorationStyle: "solid",
            decorationColor: "#484848"
          },
          "receipt-logo-sub-header": {
            color: "#484848",
            fontSize: 13,
            // decoration: "underline",
            // decorationStyle: "solid",
            decorationColor: "#484848"
          },
          "receipt-footer": {
            color: "#484848",
            fontSize: 8,
            margin: [0, 0, 0, 5]
          }
        }
      };

      break;
    default:
  }
  // data && pdfMake.createPdf(data).download(`${propertyDetails[0].assessmentNumber}.pdf`);
  data && _pdfmake2.default.createPdf(data).open();
};