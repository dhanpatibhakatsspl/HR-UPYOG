"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadReceipt = exports.triggerDownload = exports.postPaymentActivity = exports.postPaymentSuccess = exports.downloadCert = exports.loadHospitals = exports.loadMdmsData = exports.loadFullCertDetails = exports.loadCertDetails = exports.getTextToLocalMapping = exports.onActionClick = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.showHideAdhocPopup = exports.gotoApplyWithStep = exports.getFinancialYearDates = exports.getCurrentFinancialYear = exports.convertEpochToDate = exports.ifUserRoleExists = exports.sortByEpoch = exports.getEpochForDate = exports.convertEpochToDateWithTimeIST = exports.convertDateToEpoch = exports.validateFields = exports.getTranslatedLabel = exports.getMdmsData = exports.transformById = exports.getCommonApplyFooter = exports.validateTimeZone = exports.convertEpochToDateCustom = exports.downloadPdf = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _commons3 = require("egov-common/ui-utils/commons");

var _uiUtils = require("../../../../ui-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// sms("sms"),
// email("email"),
// ivr("ivr"),
// mobileapp("mobileapp"),
// whatsapp("whatsapp"),
// csc("csc"),
// web("web");

var downloadPdf = exports.downloadPdf = function downloadPdf(link) {
  var openIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_blank";

  var win = window.open(link, openIn);
  if (win) {
    win.focus();
  } else {
    (0, _actions2.toggleSnackbar)(true, {
      labelName: "Looks like your browser is blocking pop-ups. Allow pop-ups in your browser to download certificate.",
      labelKey: "BND_BROWSER_WARN_BROWSER_BLOCKED"
    }, "error");
  }
};

var convertEpochToDateCustom = exports.convertEpochToDateCustom = function convertEpochToDateCustom(dateEpoch) {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    var dateFromApi = new Date(dateEpoch);
    var month = dateFromApi.getMonth() + 1;
    var day = dateFromApi.getDate();
    var year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return year + "-" + month + "-" + day;
  } else {
    return null;
  }
};

var validateTimeZone = exports.validateTimeZone = function validateTimeZone() {
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz != "Asia/Calcutta" && tz != "Asia/Kolkata") {
      alert("Looks like your system's time zone is not correct! \nChange your system's time zone to Indian Standard Time (UTC+5:30 Chennai,Kolkata,Mumbai,NewDelhi)\nand try again.");
      return false;
    }
  } catch (e) {
    alert("Looks like this browser is very old. Please update your browser and continue");
    return false;
  }
  return true;
};

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var getMdmsData = exports.getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(requestBody) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _uiUtils.httpRequest)("post", "egov-mdms-service/v1/_search", "_search", [], requestBody);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {});

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getMdmsData(_x2) {
    return _ref.apply(this, arguments);
  };
}();

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && (fields[variable].props.disableValidation === undefined || !fields[variable].props.disableValidation) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

var convertDateToEpoch = exports.convertDateToEpoch = function convertDateToEpoch(dateString) {
  var dayStartOrEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "dayend";

  //example input format : "2018-10-02"
  try {
    var parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    var DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
    DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
    if (dayStartOrEnd === "dayend") {
      DateObj.setHours(DateObj.getHours() + 24);
      DateObj.setSeconds(DateObj.getSeconds() - 1);
    }
    return DateObj.getTime();
  } catch (e) {
    return dateString;
  }
};

//Convert IST epoch to IST Date.
var convertEpochToDateWithTimeIST = exports.convertEpochToDateWithTimeIST = function convertEpochToDateWithTimeIST(dateEpoch) {
  var ist = void 0;
  try {
    ist = new Date(dateEpoch).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(",")[0];
    return ist;
  } catch (e) {
    return "Use latest browser.";
    //alert("Catching error");
    // var now = new Date(dateEpoch);
    // var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    // ist = new Date(dateEpoch.getTime() + (5.5 * 60 * 60000))
    // return `${ist.getDate()}/${ist.getMonth()+1}/${ist.getFullYear()}`;
  }
};

var getEpochForDate = exports.getEpochForDate = function getEpochForDate(date) {
  var dateSplit = date.split("/");
  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
};

var sortByEpoch = exports.sortByEpoch = function sortByEpoch(data, order) {
  if (order) {
    return data.sort(function (a, b) {
      return a[a.length - 1] - b[b.length - 1];
    });
  } else {
    return data.sort(function (a, b) {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
};

var ifUserRoleExists = exports.ifUserRoleExists = function ifUserRoleExists(role) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var roles = (0, _get2.default)(userInfo, "roles");
  var roleCodes = roles ? roles.map(function (role) {
    return role.code;
  }) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

var convertEpochToDate = exports.convertEpochToDate = function convertEpochToDate(dateEpoch) {
  var dateFromApi = new Date(dateEpoch);
  var month = dateFromApi.getMonth() + 1;
  var day = dateFromApi.getDate();
  var year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return day + "/" + month + "/" + year;
};

var getCurrentFinancialYear = exports.getCurrentFinancialYear = function getCurrentFinancialYear() {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

var getFinancialYearDates = exports.getFinancialYearDates = function getFinancialYearDates(format, et) {
  /** Return the starting date and ending date (1st April to 31st March)
   *  of the financial year of the given date in ET. If no ET given then
   *  return the dates for the current financial year */
  var date = !et ? new Date() : new Date(et);
  var curMonth = date.getMonth();
  var financialDates = { startDate: "NA", endDate: "NA" };
  if (curMonth > 3) {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = "01/04/" + date.getFullYear().toString();
        financialDates.endDate = "31/03/" + (date.getFullYear() + 1).toString();
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = date.getFullYear().toString() + "-04-01";
        financialDates.endDate = (date.getFullYear() + 1).toString() + "-03-31";
        break;
    }
  } else {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = "01/04/" + (date.getFullYear() - 1).toString();
        financialDates.endDate = "31/03/" + date.getFullYear().toString();
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = (date.getFullYear() - 1).toString() + "-04-01";
        financialDates.endDate = date.getFullYear().toString() + "-03-31";
        break;
    }
  }
  return financialDates;
};

var gotoApplyWithStep = exports.gotoApplyWithStep = function gotoApplyWithStep(state, dispatch, step) {
  var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
  var applicationNumberQueryString = applicationNumber ? "&applicationNumber=" + applicationNumber : "";
  var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/abg/apply?step=" + step + applicationNumberQueryString : "/abg/apply?step=" + step + applicationNumberQueryString;
  dispatch((0, _actions.setRoute)(applyUrl));
};

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["search"], "components.adhocDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.adhocDialog", "props.open", !toggle));
};

var getCommonGrayCard = exports.getCommonGrayCard = function getCommonGrayCard(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      body: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          ch1: (0, _utils.getCommonCard)(children, {
            style: {
              backgroundColor: "rgb(242, 242, 242)",
              boxShadow: "none",
              borderRadius: 0,
              overflow: "visible"
            }
          })
        },
        gridDefination: {
          xs: 12
        }
      }
    },
    gridDefination: {
      xs: 12
    }
  };
};

var getLabelOnlyValue = exports.getLabelOnlyValue = function getLabelOnlyValue(value) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 6,
      sm: 4
    },
    props: (0, _extends3.default)({
      style: {
        marginBottom: "16px"
      }
    }, props),
    children: {
      value: (0, _utils.getCommonCaption)(value)
    }
  };
};

var onActionClick = exports.onActionClick = function onActionClick(rowData) {
  switch (rowData[8]) {
    case "PAY":
      return "";
    case "DOWNLOAD RECEIPT":
      "";
    case "GENERATE NEW RECEIPT":
      "";
  }
};

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Bill No.":
      return (0, _commons.getLocaleLabels)("Bill No.", "ABG_COMMON_TABLE_COL_BILL_NO", localisationLabels);

    case "Consumer Name":
      return (0, _commons.getLocaleLabels)("Consumer Name", "ABG_COMMON_TABLE_COL_CONSUMER_NAME", localisationLabels);

    case "Service Category":
      return (0, _commons.getLocaleLabels)("Service Category", "ABG_COMMON_TABLE_COL_SERVICE_CATEGORY", localisationLabels);
    case "Bill Date":
      return (0, _commons.getLocaleLabels)("Bill Date", "ABG_COMMON_TABLE_COL_BILL_DATE", localisationLabels);

    case "Bill Amount(Rs)":
      return (0, _commons.getLocaleLabels)("Bill Amount(Rs)", "ABG_COMMON_TABLE_COL_BILL_AMOUNT", localisationLabels);

    case "Status":
      return (0, _commons.getLocaleLabels)("Status", "ABG_COMMON_TABLE_COL_STATUS", localisationLabels);
    case "Action":
      return (0, _commons.getLocaleLabels)("Action", "ABG_COMMON_TABLE_COL_ACTION", localisationLabels);

    case "Consumer ID":
      return (0, _commons.getLocaleLabels)("Consumer ID", "ABG_COMMON_TABLE_COL_CONSUMER_ID", localisationLabels);

    case "Owner Name":
      return (0, _commons.getLocaleLabels)("Owner Name", "ABG_COMMON_TABLE_COL_OWN_NAME", localisationLabels);

    case "Download":
      return (0, _commons.getLocaleLabels)("Download", "ABG_COMMON_TABLE_COL_DOWNLOAD_BUTTON");

    case "View button":
      return (0, _commons.getLocaleLabels)("Action", "ABG_COMMON_TABLE_COL_VIEW_BUTTON", localisationLabels);

    case "ACTIVE":
      return (0, _commons.getLocaleLabels)("Pending", "BILL_GENIE_ACTIVE_LABEL", localisationLabels);

    case "CANCELLED":
      return (0, _commons.getLocaleLabels)("Cancelled", "BILL_GENIE_CANCELLED_LABEL", localisationLabels);

    case "PAID":
      return (0, _commons.getLocaleLabels)("Paid", "BILL_GENIE_PAID_LABEL", localisationLabels);
    case "PAY":
    case "PARTIALLY PAID":
      return (0, _commons.getLocaleLabels)("PAY", "BILL_GENIE_PAY", localisationLabels);
    case "EXPIRED":
      return (0, _commons.getLocaleLabels)("Expired", "BILL_GENIE_EXPIRED", localisationLabels);
    case "GENERATE NEW BILL":
      return (0, _commons.getLocaleLabels)("GENERATE NEW BILL", "BILL_GENIE_GENERATE_NEW_BILL", localisationLabels);

    case "DOWNLOAD RECEIPT":
      return (0, _commons.getLocaleLabels)("DOWNLOAD RECEIPT", "BILL_GENIE_DOWNLOAD_RECEIPT", localisationLabels);
    case "Search Results for Bill":
      return (0, _commons.getLocaleLabels)("Search Results for Bill", "BILL_GENIE_SEARCH_TABLE_HEADER", localisationLabels);
    case "PARTIALLY_PAID":
    case "PARTIALLY PAID":
      return (0, _commons.getLocaleLabels)("Partially Paid", "BILL_GENIE_PARTIALLY_PAID", localisationLabels);
    case "BILL_GENIE_GROUP_SEARCH_HEADER":
      return (0, _commons.getLocaleLabels)("Search Results for Group Bills", "BILL_GENIE_GROUP_SEARCH_HEADER", localisationLabels);
  }
};

var loadCertDetails = exports.loadCertDetails = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, data) {
    var requestBody, queryParams, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            requestBody = {};
            queryParams = [{ key: "tenantId", value: data.tenantId }, { key: "id", value: data.id }];


            if (data.birthcertificateno) queryParams.push({
              key: "birthcertificateno",
              value: data.birthcertificateno
            });else if (data.deathcertificateno) queryParams.push({
              key: "deathcertificateno",
              value: data.deathcertificateno
            });

            _context2.prev = 3;
            payload = null;
            _context2.next = 7;
            return (0, _uiUtils.httpRequest)("post", "/birth-death-services/" + data.module + "/_viewcertdata", "_viewcertdata", queryParams, requestBody);

          case 7:
            payload = _context2.sent;
            return _context2.abrupt("return", payload);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);

            (0, _actions2.toggleSnackbar)(true, {
              labelName: "Api Error",
              labelKey: "ERR_API_ERROR"
            }, "error");
            //return {"RequestInfo":{"apiId":"Mihy","ver":".01","ts":null,"resMsgId":"uief87324","msgId":"20170310130900|en_IN","status":"successful"},"BirthCertificate":[{"id":"1","createdby":null,"createdtime":null,"dateofbirth":1614063655148,"dateofreport":1614063655148,"firstname":"san","gender":1,"hospitalname":null,"informantsaddress":null,"informantsname":null,"lastname":null,"middlename":null,"placeofbirth":"Bangalore","registrationno":"2021-1","remarks":null,"lastmodifiedby":null,"lastmodifiedtime":null,"counter":0,"tenantid":null,"fullname":"SRI V S","birthFatherInfo":{"id":null,"aadharno":null,"createdby":null,"createdtime":null,"education":null,"emailid":null,"firstname":"abc","lastname":null,"middlename":null,"mobileno":null,"nationality":null,"proffession":null,"religion":null,"lastmodifiedby":null,"lastmodifiedtime":null,"fullname":"R S H"},"birthMotherInfo":{"id":null,"aadharno":null,"createdby":null,"createdtime":null,"education":null,"emailid":null,"firstname":"abc1","lastname":null,"middlename":null,"mobileno":null,"nationality":null,"proffession":null,"religion":null,"lastmodifiedby":null,"lastmodifiedtime":null,"fullname":"S V H"},"birthPermaddr":{"fullAddress":"100 112 CROSS 108 Church Servant Qtr. Jalapahar"},"birthPresentaddr":{"fullAddress":"100 112 CROSS 108 Church Servant Qtr. Jalapahar"}}]};

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 11]]);
  }));

  return function loadCertDetails(_x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

var loadFullCertDetails = exports.loadFullCertDetails = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch, data) {
    var requestBody, queryParams, payload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            requestBody = {};
            queryParams = [{ key: "tenantId", value: data.tenantId }, { key: "id", value: data.id }];
            payload = null;
            _context3.prev = 3;
            _context3.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/birth-death-services/" + data.module + "/_viewfullcertdata", "_viewcertdata", queryParams, requestBody);

          case 6:
            payload = _context3.sent;
            return _context3.abrupt("return", payload);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);

            (0, _actions2.toggleSnackbar)(true, {
              labelName: "Api Error",
              labelKey: "ERR_API_ERROR"
            }, "error");
            return _context3.abrupt("return", payload);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 10]]);
  }));

  return function loadFullCertDetails(_x10, _x11, _x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}();

var loadMdmsData = exports.loadMdmsData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch) {
    var requestBody, payload, citymodule, liveTenants;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            requestBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }, { name: "citymodule" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{ name: "Help" }]
                }]
              }
            };
            _context4.prev = 1;
            payload = null;
            _context4.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

          case 5:
            payload = _context4.sent;

            if (payload) {
              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
              citymodule = (0, _get2.default)(payload, "MdmsRes.tenant.citymodule");
              liveTenants = citymodule && citymodule.filter(function (item) {
                return item.code === "UC";
              });

              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.tenant.citiesByModule", (0, _get2.default)(liveTenants[0], "tenants")));
            }
            return _context4.abrupt("return", payload);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 10]]);
  }));

  return function loadMdmsData(_x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();

var loadHospitals = exports.loadHospitals = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch, module, tenantId) {
    var requestBody, payload, queryParams;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            requestBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "birth-death-service",
                  masterDetails: [{
                    name: "hospitalList"
                  }]
                }]
              }
            };
            payload = null;
            queryParams = [{ key: "tenantId", value: tenantId }];
            _context5.prev = 3;
            _context5.next = 6;
            return (0, _uiUtils.httpRequest)("post", "egov-mdms-service/v1/_search", "_search", queryParams, requestBody);

          case 6:
            payload = _context5.sent;
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);

            (0, _actions2.toggleSnackbar)(true, {
              labelName: "",
              labelKey: "ERR_API_ERROR"
            }, "error");

          case 12:
            return _context5.abrupt("return", payload);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[3, 9]]);
  }));

  return function loadHospitals(_x17, _x18, _x19, _x20, _x21) {
    return _ref5.apply(this, arguments);
  };
}();

var downloadCert = exports.downloadCert = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(tenantId, id, module) {
    var requestBody, payload, queryParams;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            requestBody = {};
            payload = null;
            queryParams = [{ key: "tenantId", value: tenantId }, { key: "id", value: id }, { key: "source", value: (0, _commons.captureSource)() }];
            _context6.prev = 3;
            _context6.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/birth-death-services/" + module + "/_download", "_download", queryParams, requestBody);

          case 6:
            payload = _context6.sent;
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](3);

            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context6.t0.message, labelCode: _context6.t0.message }, "error"));
            // store.dispatch(
            //   toggleSnackbar(
            //     true,
            //     {
            //       labelName: "Could not initiate download",
            //       labelKey: "ERR_API_ERROR"
            //     },
            //     "error"
            //   )
            // );
            //toBeRemoved
            //payload = {consumerCode:"CH-CB-AGRA-2020-001504", filestoreId:"4f0d9299-7fa0-4af6-9077-389ebf2367c4", tenantId: "pb.agra"};

          case 12:
            return _context6.abrupt("return", payload);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[3, 9]]);
  }));

  return function downloadCert(_x22, _x23, _x24) {
    return _ref6.apply(this, arguments);
  };
}();

var postPaymentSuccess = exports.postPaymentSuccess = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(data) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _store2.default.dispatch((0, _actions2.toggleSpinner)());
            setTimeout(function () {
              postPaymentActivity(data);
              _store2.default.dispatch((0, _actions2.toggleSpinner)());
            }, 4000); //Give 2 sec gap so that the screen is loaded correctly

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function postPaymentSuccess(_x25) {
    return _ref7.apply(this, arguments);
  };
}();

var postPaymentActivity = exports.postPaymentActivity = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(data) {
    var doDownloadCertificate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var queryParams, module, response, mode;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            if (!(data.tenantId && data.consumerCode)) {
              _context8.next = 11;
              break;
            }

            _store2.default.dispatch((0, _actions2.toggleSpinner)());
            queryParams = [{ key: "tenantId", value: data.tenantId }, { key: "consumerCode", value: data.consumerCode }];
            module = data.businessService == "BIRTH_CERT" ? "birth" : "death";
            _context8.next = 7;
            return (0, _uiUtils.httpRequest)("post", "birth-death-services/" + module + "/_getfilestoreid", "getfilestoreid", queryParams, {} //{ searchCriteria: queryObject }
            );

          case 7:
            response = _context8.sent;

            _store2.default.dispatch((0, _actions2.toggleSpinner)());
            if (doDownloadCertificate && response && response.filestoreId) {
              mode = "download";

              (0, _commons3.downloadReceiptFromFilestoreID)(response.filestoreId, mode);

              _store2.default.dispatch((0, _actions2.hideSpinner)());
              /*
              Redirection removed
              setTimeout(() => {
                // store.dispatch(toggleSpinner());
                store.dispatch(setRoute(`/${module}-citizen/myApplications`));
              }, 5000); //Give 5 sec gap redirect to my applications page.
              */
            }
            return _context8.abrupt("return", response);

          case 11:
            _context8.next = 17;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSpinner)());
            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context8.t0.message, labelCode: _context8.t0.message }, "error"));

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 13]]);
  }));

  return function postPaymentActivity(_x26) {
    return _ref8.apply(this, arguments);
  };
}();

var triggerDownload = exports.triggerDownload = function triggerDownload(module) {
  var state = _store2.default.getState();
  var certificateId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.bnd." + module + ".download.certificateId");
  var tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.bnd." + module + ".download.tenantId");
  var businessService = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.bnd." + module + ".download.businessService");

  downloadCert(tenantId, certificateId, module).then(function (response) {
    if (response && response.consumerCode) {
      // Redirect to payment page
      var appName = process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee";

      var url = process.env.NODE_ENV === "development" ? "/egov-common/pay?consumerCode=" + response.consumerCode + "&tenantId=" + tenantId + "&businessService=" + businessService : "/" + appName + "/egov-common/pay?consumerCode=" + response.consumerCode + "&tenantId=" + tenantId + "&businessService=" + businessService;
      document.location.href = "" + document.location.origin + url;
    } else if (response && response.filestoreId) {
      (0, _commons3.downloadReceiptFromFilestoreID)(response.filestoreId, "download");
    }
  });
};

var downloadReceipt = exports.downloadReceipt = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(consumerCode, tenantId) {
    var state, queryParams, response, mode, receiptQueryString;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            state = _store2.default.getState();


            _store2.default.dispatch((0, _actions2.toggleSpinner)());
            queryParams = [{ key: "tenantId", value: tenantId }, { key: "consumerCodes", value: consumerCode }];
            _context9.next = 5;
            return (0, _uiUtils.httpRequest)("post", "collection-services/payments/_search", "_search", queryParams, {} //{ searchCriteria: queryObject }
            );

          case 5:
            response = _context9.sent;

            _store2.default.dispatch((0, _actions2.toggleSpinner)());
            if (response && response.Payments && response.Payments.length > 0) {
              if (response.Payments[0].fileStoreId) {
                mode = "download";

                (0, _commons3.downloadReceiptFromFilestoreID)(response.Payments[0].fileStoreId, mode);
              } else {
                receiptQueryString = [{ key: "consumerCode", value: consumerCode }, { key: "tenantId", value: tenantId }, {
                  key: "bussinessService",
                  value: response.Payments[0].paymentDetails[0].businessService
                }];

                (0, _commons3.downloadConReceipt)(receiptQueryString, "consolidatedreceipt", "PAYMENT", "RECEIPT-" + consumerCode + ".pdf");
              }
            } else {
              _store2.default.dispatch((0, _actions.setRoute)("/uc-citizen/search"));
            }
            return _context9.abrupt("return", response);

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function downloadReceipt(_x28, _x29) {
    return _ref9.apply(this, arguments);
  };
}();