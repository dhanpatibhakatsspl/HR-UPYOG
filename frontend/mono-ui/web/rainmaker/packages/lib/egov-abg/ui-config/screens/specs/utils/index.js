"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeesEstimateCard = exports.createEstimateData = exports.getMergeAndDownloadList = exports.checkValueForNA = exports.setServiceCategory = exports.getTextToLocalMapping = exports.onActionClick = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.showHideAdhocPopup = exports.gotoApplyWithStep = exports.getFinancialYearDates = exports.getCurrentFinancialYear = exports.convertEpochToDate = exports.ifUserRoleExists = exports.sortByEpoch = exports.getEpochForDate = exports.convertDateToEpoch = exports.validateFields = exports.getTranslatedLabel = exports.getMdmsData = exports.transformById = exports.getCommonApplyFooter = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _lodash = require("lodash");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uiUtils = require("../../../../ui-utils");

var _receiptPdf = require("../utils/receiptPdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return function getMdmsData(_x) {
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
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
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
  if (dateEpoch == null || dateEpoch == undefined || dateEpoch == '') {
    return "NA";
  }
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
    default:
      return (0, _commons.getLocaleLabels)("Search Results for Group Bills", label, localisationLabels);
  }
};

var setServiceCategory = exports.setServiceCategory = function setServiceCategory(businessServiceData, dispatch) {
  var nestedServiceData = {};
  businessServiceData.forEach(function (item) {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        var child = (0, _get2.default)(nestedServiceData, item.code.split(".")[0] + ".child", []);
        child.push(item);
        (0, _lodash.set)(nestedServiceData, item.code.split(".")[0] + ".child", child);
      } else {
        (0, _lodash.set)(nestedServiceData, item.code.split(".")[0] + ".code", item.code.split(".")[0]);
        (0, _lodash.set)(nestedServiceData, item.code.split(".")[0] + ".child[0]", item);
      }
    } else {
      (0, _lodash.set)(nestedServiceData, "" + item.code, item);
    }
  });
  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.nestedServiceData", nestedServiceData));
  var serviceCategories = Object.values(nestedServiceData).filter(function (item) {
    return item.code;
  });
  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.serviceCategories", serviceCategories));
};
var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value == null || value == undefined || value == '' ? "NA" : value;
};

var getMergeAndDownloadList = exports.getMergeAndDownloadList = function getMergeAndDownloadList(state, dispatch) {
  var dataLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchDetailsOfGroupBills", {});
  if (searchScreenObject.businesService && searchScreenObject.tenantId && searchScreenObject.locality) {
    switch (searchScreenObject.businesService) {
      case "WS":
        dispatch((0, _actions2.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.mergeDownloadButton.children.mergeButton", "props.data.menu", [{
          label: { labelName: "WATER CONNECTION", labelKey: "ABG_GROUP_BILLS_WATER_CONNECTION_BUTTON" },
          link: function link() {
            (0, _receiptPdf.generateMultipleBills)(state, dispatch, searchScreenObject.tenantId, searchScreenObject.locality, false, "WS", searchScreenObject.consumerCode);
          }
        }, {
          label: { labelName: "WATER & SEWERAGE CONNECTION", labelKey: parseInt(dataLength) == 1 ? "ABG_GROUP_BILLS_SINGLAR_WATER_AND_SEWERAGE_CONNECTION_BUTTON" : "ABG_GROUP_BILLS_WATER_AND_SEWERAGE_CONNECTION_BUTTON" },
          link: function link() {
            (0, _receiptPdf.generateMultipleBills)(state, dispatch, searchScreenObject.tenantId, searchScreenObject.locality, true, "WS", searchScreenObject.consumerCode);
          }
        }]));
        break;
      case "SW":
        dispatch((0, _actions2.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.mergeDownloadButton.children.mergeButton", "props.data.menu", [{
          label: { labelName: "SEWERAGE CONNECTION", labelKey: "ABG_GROUP_BILLS_SEWERAGE_CONNECTION_BUTTON" },
          link: function link() {
            (0, _receiptPdf.generateMultipleBills)(state, dispatch, searchScreenObject.tenantId, searchScreenObject.locality, false, "SW", searchScreenObject.consumerCode);
          }
        }, {
          label: { labelName: "WATER & SEWERAGE CONNECTION", labelKey: parseInt(dataLength) == 1 ? "ABG_GROUP_BILLS_SINGLAR_WATER_AND_SEWERAGE_CONNECTION_BUTTON" : "ABG_GROUP_BILLS_WATER_AND_SEWERAGE_CONNECTION_BUTTON" },
          link: function link() {
            (0, _receiptPdf.generateMultipleBills)(state, dispatch, searchScreenObject.tenantId, searchScreenObject.locality, true, "SW", searchScreenObject.consumerCode);
          }
        }]));
        break;
      default:
        dispatch((0, _actions2.handleScreenConfigurationFieldChange)("groupBills", "components.div.children.mergeDownloadButton.children.mergeButton", "props.data.menu", [{
          label: { labelName: "SEWERAGE CONNECTION", labelKey: "ABG_GROUP_BILLS_MERGE_AND_DOWNLOAD_BUTTON" },
          link: function link() {
            (0, _receiptPdf.generateMultipleBill)(state, dispatch);
          }
        }]));
    }
  }
};

var createEstimateData = exports.createEstimateData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(billData, jsonPath, dispatch) {
    var href = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var getFromReceipt = arguments[4];
    var payload, estimateData, event;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            payload = billData;
            estimateData = payload;

            dispatch((0, _actions2.prepareFinalObject)(jsonPath, estimateData));
            event = new CustomEvent("estimateLoaded", { detail: true });

            window.parent.document.dispatchEvent(event);
            return _context2.abrupt("return", payload);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createEstimateData(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getFeesEstimateCard = function getFeesEstimateCard(props) {
  var sourceJsonPath = props.sourceJsonPath,
      rest = (0, _objectWithoutProperties3.default)(props, ["sourceJsonPath"]);

  return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "EstimateCardContainer",
    props: (0, _extends3.default)({
      sourceJsonPath: sourceJsonPath
    }, rest)
  };
};
exports.getFeesEstimateCard = getFeesEstimateCard;