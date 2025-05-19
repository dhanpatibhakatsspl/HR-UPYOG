"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMdmsData = exports.loadPtBillData = exports.loadUlbLogo = undefined;

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

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifNotNull = function ifNotNull(value) {
  return !["", "NA", "null", null].includes(value);
};

var nullToNa = function nullToNa(value) {
  return ["", "NA", "null", null].includes(value) ? "NA" : value;
};

var epochToDate = function epochToDate(et) {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
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
  img.src = "/" + _common2.default.tenantId + "-egov-assets/" + tenantid + "/logo.png";
};

var loadPtBillData = exports.loadPtBillData = function loadPtBillData(response) {
  // const ulbData = loadMdmsData(getTenantId())
  var data = {};
  var orderedResponse = (0, _orderBy2.default)(response.billDetails, "fromPeriod", "desc");

  var taxHeads = orderedResponse[0].billAccountDetails.reduce(function (acc, item, index) {
    if (index < 9) {
      acc[(0, _commons.getLocaleLabels)("", item.taxHeadCode, (0, _commons.getTransformedLocalStorgaeLabels)())] = item.amount;
    }
    return acc;
  }, []);
  var fromDate = epochToDate((0, _get2.default)(response, "billDetails[0].fromPeriod"));
  var toDate = epochToDate((0, _get2.default)(response, "billDetails[0].toPeriod"));
  data.header = (0, _get2.default)(_store2.default.getState(), "");
  data.billPeriod = fromDate + " - " + toDate;
  data.billDate = epochToDate((0, _get2.default)(response, "billDate"));
  data.dueDate = epochToDate((0, _get2.default)(response, "billDetails[0].expiryDate"));
  data.billNumber = nullToNa((0, _get2.default)(response, "billNumber"));
  data.payerName = nullToNa((0, _get2.default)(response, "payerName"));
  data.mobileNumber = nullToNa((0, _get2.default)(response, "mobileNumber"));
  data.amountPaid = (0, _get2.default)(response, "billDetails[0].amountPaid", 0);
  data.totalAmount = (0, _get2.default)(response, "totalAmount", 0);
  data.amountDue = data.totalAmount - data.amountPaid;
  data.payerAddress = (0, _get2.default)(response, "payerAddress");
  data.propertyId = (0, _get2.default)(response, "consumerCode").split(":")[0];
  data.g8ReceiptNo = nullToNa((0, _get2.default)(response, "billDetails[0].manualReceiptNumber", "None"));
  data.taxHeads = taxHeads;
  return data;

  // store.dispatch(prepareFinalObject("receiptDataForReceipt", data));
};

var loadMdmsData = exports.loadMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tenantid) {
    var data, mdmsBody, response, ulbData, ulbGrade, name;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {};
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantid,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{ name: "tenants" }]
                }]
              }
            };
            _context.next = 4;
            return (0, _utils.getMdmsData)(mdmsBody);

          case 4:
            response = _context.sent;


            if (response && response.MdmsRes && response.MdmsRes.tenant.tenants.length > 0) {
              ulbData = response.MdmsRes.tenant.tenants.find(function (item) {
                return item.code == tenantid;
              });

              /** START Corporation name generation logic */

              ulbGrade = (0, _get2.default)(ulbData, "city.ulbGrade", "NA");
              name = (0, _get2.default)(ulbData, "city.name", "NA");

              if (ulbGrade) {
                if (ulbGrade === "NP") {
                  data.corporationName = name.toUpperCase() + " NAGAR PANCHAYAT";
                } else if (ulbGrade === "Municipal Corporation") {
                  data.corporationName = name.toUpperCase() + " MUNICIPAL CORPORATION";
                } else if (ulbGrade.includes("MC Class")) {
                  data.corporationName = name.toUpperCase() + " MUNICIPAL COUNCIL";
                } else {
                  data.corporationName = name.toUpperCase() + " MUNICIPAL CORPORATION";
                }
              } else {
                data.corporationName = name.toUpperCase() + " MUNICIPAL CORPORATION";
              }
              /** END */
              data.corporationAddress = (0, _get2.default)(ulbData, "address", "NA");
              data.corporationContact = (0, _get2.default)(ulbData, "contactNumber", "NA");
              data.corporationWebsite = (0, _get2.default)(ulbData, "domainUrl", "NA");
              data.corporationEmail = (0, _get2.default)(ulbData, "emailId", "NA");
            }

            _store2.default.dispatch((0, _actions.prepareFinalObject)("mdmsDataForReceipt", data));
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadMdmsData(_x) {
    return _ref.apply(this, arguments);
  };
}();

/** Data used for creation of receipt is generated and stored in local storage here */
// export const loadReceiptGenerationData = (applicationNumber, tenant) => {
//   /** Logo loaded and stored in local storage in base64 */
//   // loadApplicationData(applicationNumber, tenant); //PB-TL-2018-09-27-000004
//   loadBillData(applicationNumber, tenant); //PT-107-001330:AS-2018-08-29-001426     //PT consumerCode
//   loadMdmsData(tenant);
// };