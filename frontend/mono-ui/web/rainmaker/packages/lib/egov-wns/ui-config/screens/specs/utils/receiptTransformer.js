"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadReceiptGenerationData = exports.loadUserNameData = exports.loadMdmsData = exports.loadReceiptData = exports.loadApplicationData = exports.loadUlbLogo = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _store = require("../../../../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifNotNull = function ifNotNull(value) {
  return !["", "NA", "null", null].includes(value);
};

var nullToNa = function nullToNa(value) {
  return ["", "NA", "null", null].includes(value) ? "NA" : value;
};

var createAddress = function createAddress(doorNo, buildingName, street, locality, city) {
  var address = "";
  address += ifNotNull(doorNo) ? doorNo + ", " : "";
  address += ifNotNull(buildingName) ? buildingName + ", " : "";
  address += ifNotNull(street) ? street + ", " : "";
  address += locality + ", ";
  address += city;
  return address;
};

var epochToDate = function epochToDate(et) {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
};

var getMessageFromLocalization = function getMessageFromLocalization(code) {
  var messageObject = JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)())).find(function (item) {
    return item.code == code;
  });
  return messageObject ? messageObject.message : code;
};

var loadUlbLogo = exports.loadUlbLogo = function loadUlbLogo(tenantid) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    _store2.default.dispatch((0, _actions.prepareFinalObject)("base64UlbLogo", canvas.toDataURL()));
    canvas = null;
  };
  img.src = "/pb-egov-assets/" + tenantid + "/logo.png";
};

var loadApplicationData = exports.loadApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(applicationNumber, tenant) {
    var data, queryObject, response, cityCode, ownersData, licenseIssueDate, licenseValidTo, tradeUnitsFromResponse, transformedTradeData, accessories;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {};
            queryObject = [{ key: "tenantId", value: tenant }, { key: "applicationNumber", value: applicationNumber }];
            _context.next = 4;
            return (0, _utils.getSearchResults)(queryObject);

          case 4:
            response = _context.sent;


            if (response && response.Licenses && response.Licenses.length > 0) {
              data.applicationNumber = nullToNa((0, _get2.default)(response, "Licenses[0].applicationNumber", "NA"));
              data.oldLicenseNumber = nullToNa((0, _get2.default)(response, "Licenses[0].oldLicenseNumber", "NA"));
              data.applicationType = getMessageFromLocalization(nullToNa((0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType", "NA")));
              data.licenseNumber = nullToNa((0, _get2.default)(response, "Licenses[0].licenseNumber", "NA"));
              data.financialYear = nullToNa((0, _get2.default)(response, "Licenses[0].financialYear", "NA"));
              data.tradeName = nullToNa((0, _get2.default)(response, "Licenses[0].tradeName", "NA"));
              data.doorNo = nullToNa((0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.address.doorNo", "NA"));
              data.buildingName = nullToNa((0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.address.buildingName", "NA"));
              data.streetName = nullToNa((0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.address.street", "NA"));
              data.locality = (0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.address.locality.name", "NA");
              cityCode = nullToNa((0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.address.tenantId", "NA"));

              data.city = getMessageFromLocalization("TENANT_TENANTS_" + (0, _commons.getTransformedLocale)(cityCode));
              /** Make owners data array */
              ownersData = (0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.owners", []);

              data.owners = ownersData.map(function (owner) {
                return {
                  name: (0, _get2.default)(owner, "name", "NA"),
                  mobile: (0, _get2.default)(owner, "mobileNumber", "NA")
                };
              });
              data.ownersList = ownersData.map(function (owner) {
                return (0, _get2.default)(owner, "name", "NA");
              }).join(", ");
              /** End */
              licenseIssueDate = (0, _get2.default)(response, "Licenses[0].issuedDate", "NA");

              data.licenseIssueDate = nullToNa(epochToDate(licenseIssueDate));
              data.licenseExpiryDate = nullToNa(epochToDate((0, _get2.default)(response, "Licenses[0].validTo", "NA")));
              licenseValidTo = (0, _get2.default)(response, "Licenses[0].validTo", "NA");

              data.licenseValidity = (0, _utils.getFinancialYearDates)("dd/mm/yyyy", licenseValidTo);
              /** Trade settings */
              tradeUnitsFromResponse = (0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.tradeUnits", null);
              transformedTradeData = tradeUnitsFromResponse.reduce(function (res, curr) {
                var tradeCategory = "NA";
                var tradeType = "NA";
                var tradeSubType = "NA";
                var tradeCode = curr.tradeType;
                if (tradeCode) {
                  var tradeCodeArray = tradeCode.split(".");
                  if (tradeCodeArray.length == 1) {
                    tradeCategory = nullToNa(tradeCode);
                  } else if (tradeCodeArray.length == 2) {
                    tradeCategory = nullToNa(tradeCodeArray[0]);
                    tradeType = nullToNa(tradeCode);
                  } else if (tradeCodeArray.length > 2) {
                    tradeCategory = nullToNa(tradeCodeArray[0]);
                    tradeType = nullToNa(tradeCodeArray[1]);
                    tradeSubType = nullToNa(tradeCode);
                  }
                }
                /** End */

                res.tradeCategory.push(getMessageFromLocalization("TRADELICENSE_TRADETYPE_" + tradeCategory));

                res.tradeTypeReceipt.push(getMessageFromLocalization("TRADELICENSE_TRADETYPE_" + tradeType) + " / " + getMessageFromLocalization("TRADELICENSE_TRADETYPE_" + (0, _commons.getTransformedLocale)(tradeSubType)));
                res.tradeTypeCertificate.push(getMessageFromLocalization("TRADELICENSE_TRADETYPE_" + tradeCategory) + " / " + getMessageFromLocalization("TRADELICENSE_TRADETYPE_" + tradeType) + " / " + getMessageFromLocalization("TRADELICENSE_TRADETYPE_" + (0, _commons.getTransformedLocale)(tradeSubType)));
                return res;
              }, {
                tradeCategory: [],
                tradeTypeReceipt: [],
                tradeTypeCertificate: []
              });


              data.tradeCategory = transformedTradeData.tradeCategory.join(", ");
              data.tradeTypeReceipt = transformedTradeData.tradeTypeReceipt.join(", ");
              data.tradeTypeCertificate = transformedTradeData.tradeTypeCertificate.join(", ");
              data.address = nullToNa(createAddress(data.doorNo, data.buildingName, data.streetName, data.locality, data.city));
              accessories = (0, _get2.default)(response, "Licenses[0].tradeLicenseDetail.accessories", []);

              if (accessories && accessories.length > 0) {
                data.accessoriesList = response.Licenses[0].tradeLicenseDetail.accessories.map(function (item) {
                  return getMessageFromLocalization("TRADELICENSE_ACCESSORIESCATEGORY_" + (0, _commons.getTransformedLocale)(item.accessoryCategory)) + "(" + (item.count ? item.count : "0") + ")";
                }).reduce(function (pre, cur) {
                  return pre.concat(", " + cur);
                });
              } else {
                data.accessoriesList = "";
              }
              loadUserNameData(response.Licenses[0].auditDetails.lastModifiedBy);
            }

            _store2.default.dispatch((0, _actions.prepareFinalObject)("applicationDataForReceipt", data));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadApplicationData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var loadReceiptData = exports.loadReceiptData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(consumerCode, tenant) {
    var data, queryObject, response, tlAdhocPenalty, tlAdhocRebate;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = {};
            queryObject = [{
              key: "tenantId",
              value: tenant
            }, {
              key: "consumerCode",
              value: consumerCode
            }];
            _context2.next = 4;
            return (0, _utils.getReceiptData)(queryObject);

          case 4:
            response = _context2.sent;


            if (response && response.Receipt && response.Receipt.length > 0) {
              data.receiptNumber = nullToNa((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", "NA"));
              data.amountPaid = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].amountPaid", 0);
              data.totalAmount = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].totalAmount", 0);
              data.amountDue = data.totalAmount - data.amountPaid;
              data.paymentMode = nullToNa((0, _get2.default)(response, "Receipt[0].instrument.instrumentType.name", "NA"));
              data.transactionNumber = nullToNa((0, _get2.default)(response, "Receipt[0].instrument.transactionNumber", "NA"));
              data.bankName = (0, _get2.default)(response, "Receipt[0].instrument.bank.name", "NA");
              data.branchName = (0, _get2.default)(response, "Receipt[0].instrument.branchName", null);
              data.bankAndBranch = nullToNa(data.bankName && data.branchName ? data.bankName + ", " + data.branchName : (0, _get2.default)(data, "bankName", "NA"));
              data.paymentDate = nullToNa(epochToDate((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptDate", 0)));
              data.g8ReceiptNo = nullToNa((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber", "NA"));
              data.g8ReceiptDate = nullToNa(epochToDate((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate", 0)));
              /** START TL Fee, Adhoc Penalty/Rebate Calculation */
              tlAdhocPenalty = 0, tlAdhocRebate = 0;

              response.Receipt[0].Bill[0].billDetails[0].billAccountDetails.map(function (item) {
                var desc = item.taxHeadCode ? item.taxHeadCode : "";
                if (desc === "TL_TAX") {
                  data.tlFee = item.amount;
                } else if (desc === "TL_ADHOC_PENALTY") {
                  tlAdhocPenalty = item.amount;
                } else if (desc === "TL_ADHOC_REBATE") {
                  tlAdhocRebate = item.amount;
                }
              });
              data.tlPenalty = "NA";
              data.tlRebate = "NA";
              data.tlAdhocPenalty = tlAdhocPenalty;
              data.tlAdhocRebate = tlAdhocRebate;
              /** END */
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("receiptDataForReceipt", data));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loadReceiptData(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var loadMdmsData = exports.loadMdmsData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(tenantid) {
    var localStorageLabels, localizationLabels, data, queryObject, response, ulbData, ulbGrade, cityKey;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            localStorageLabels = JSON.parse(window.localStorage.getItem("localization_" + (0, _localStorageUtils.getLocale)()));
            localizationLabels = (0, _commons.transformById)(localStorageLabels, "code");
            data = {};
            queryObject = [{
              key: "tenantId",
              value: "" + tenantid
            }, {
              key: "moduleName",
              value: "tenant"
            }, {
              key: "masterName",
              value: "tenants"
            }];
            _context3.next = 6;
            return (0, _utils.getMdmsData)(queryObject);

          case 6:
            response = _context3.sent;


            if (response && response.MdmsRes && response.MdmsRes.tenant.tenants.length > 0) {
              ulbData = response.MdmsRes.tenant.tenants.find(function (item) {
                return item.code == tenantid;
              });
              /** START Corporation name generation logic */

              ulbGrade = (0, _get2.default)(ulbData, "city.ulbGrade", "NA") ? (0, _commons.getUlbGradeLabel)((0, _get2.default)(ulbData, "city.ulbGrade", "NA")) : "MUNICIPAL CORPORATION";
              cityKey = "TENANT_TENANTS_" + (0, _get2.default)(ulbData, "code", "NA").toUpperCase().replace(/[.]/g, "_");


              data.corporationName = (0, _commons.getTranslatedLabel)(ulbGrade, localizationLabels) + " " + (0, _commons.getTranslatedLabel)(cityKey, localizationLabels).toUpperCase() + " ";

              /** END */
              data.corporationAddress = (0, _get2.default)(ulbData, "address", "NA");
              data.corporationContact = (0, _get2.default)(ulbData, "contactNumber", "NA");
              data.corporationWebsite = (0, _get2.default)(ulbData, "domainUrl", "NA");
              data.corporationEmail = (0, _get2.default)(ulbData, "emailId", "NA");
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("mdmsDataForReceipt", data));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function loadMdmsData(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var loadUserNameData = exports.loadUserNameData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(uuid) {
    var data, bodyObject, response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = {};
            bodyObject = {
              uuid: [uuid]
            };
            _context4.next = 4;
            return (0, _utils.getUserDataFromUuid)(bodyObject);

          case 4:
            response = _context4.sent;


            if (response && response.user && response.user.length > 0) {
              data.auditorName = (0, _get2.default)(response, "user[0].name", "NA");
            }
            data.Disclaimer = getMessageFromLocalization("TL_RECEIPT_FOOTER_1");
            _store2.default.dispatch((0, _actions.prepareFinalObject)("userDataForReceipt", data));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function loadUserNameData(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

/** Data used for creation of receipt is generated and stored in local storage here */
var loadReceiptGenerationData = exports.loadReceiptGenerationData = function loadReceiptGenerationData(applicationNumber, tenant) {
  /** Logo loaded and stored in local storage in base64 */
  loadUlbLogo(tenant);
  loadApplicationData(applicationNumber, tenant); //PB-TL-2018-09-27-000004
  loadReceiptData(applicationNumber, tenant); //PT-107-001330:AS-2018-08-29-001426     //PT consumerCode
  loadMdmsData(tenant);
};