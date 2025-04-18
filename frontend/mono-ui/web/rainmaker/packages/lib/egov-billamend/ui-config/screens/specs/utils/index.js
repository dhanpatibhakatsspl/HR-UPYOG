"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelPopUp = exports.procedToNextStep = exports.onDemandRevisionBasis = exports.showApplyCityPicker = exports.searchBill = exports.getFetchBill = exports.getTextToLocalMapping = exports.onActionClick = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.getRequiredDocData = exports.showHideAdhocPopup = exports.gotoApplyWithStep = exports.getFinancialYearDates = exports.getCurrentFinancialYear = exports.convertEpochToDate = exports.ifUserRoleExists = exports.sortByEpoch = exports.getEpochForDate = exports.convertDateToEpoch = exports.validateFields = exports.getTranslatedLabel = exports.getMdmsData = exports.transformById = exports.getCommonApplyFooter = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _lodash = require("lodash");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-config/screens/specs/utils");

var _uiUtils = require("../../../../ui-utils");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _reqDocs = require("../../../../ui-containers-local/RequiredDocuments/reqDocs");

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

  var fields = (0, _lodash.get)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _lodash.get)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
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
  var roles = (0, _lodash.get)(userInfo, "roles");
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
  var toggle = (0, _lodash.get)(state.screenConfiguration.screenConfig["search"], "components.adhocDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.adhocDialog", "props.open", !toggle));
};
var getRequiredDocData = exports.getRequiredDocData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, dispatch, moduleDetails, closePopUp) {
    var tenantId, mdmsBody, payload, moduleName, documents, reqDocuments;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = process.env.REACT_APP_NAME === "Citizen" ? JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity : (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: moduleDetails
              }
            };
            _context2.prev = 2;
            payload = null;
            _context2.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context2.sent;
            moduleName = moduleDetails[0].moduleName;
            documents = (0, _lodash.get)(payload.MdmsRes, moduleName + ".documentObj", []);


            if (moduleName === "PropertyTax") {
              payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
            }

            reqDocuments = (0, _reqDocs.getRequiredDocuments)(documents, moduleName, footerCallBackForRequiredDataModal(moduleName, closePopUp));

            (0, _lodash.set)(action, "screenConfig.components.adhocDialog.children.popup", reqDocuments);
            dispatch((0, _actions2.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            return _context2.abrupt("return", { payload: payload, reqDocuments: reqDocuments });

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](2);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 16]]);
  }));

  return function getRequiredDocData(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var footerCallBackForRequiredDataModal = function footerCallBackForRequiredDataModal(moduleName, closePopUp) {
  var connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
  var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
  var businessService = connectionNumber.includes("WS") ? "WS" : "SW";

  switch (moduleName) {

    case "BillAmendment":
      return function (state, dispatch) {
        var applyUrl = "/bill-amend/apply?connectionNumber=" + connectionNumber + "&tenantId=" + tenantId + "&businessService=" + businessService;
        dispatch((0, _actions.setRoute)(applyUrl));
      };
  }
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
          ch1: (0, _utils2.getCommonCard)(children, {
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
      value: (0, _utils2.getCommonCaption)(value)
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

var getFetchBill = exports.getFetchBill = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, action, queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _uiUtils.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context3.t0.message, labelKey: _context3.t0.message }, "error"));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getFetchBill(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var searchBill = exports.searchBill = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch, action, queryObject) {
    var response, billdetails;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _uiUtils.httpRequest)("post", "/billing-service/bill/v2/_search", "", queryObject);

          case 3:
            response = _context4.sent;
            billdetails = (0, _lodash.get)(response, 'Bill[0].billDetails', []);

            (0, _lodash.set)(response, 'Bill[0].billDetails', billdetails.sort(function (x, y) {
              return y.fromPeriod - x.fromPeriod;
            }));
            return _context4.abrupt("return", response);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context4.t0.message, labelKey: _context4.t0.message }, "error"));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 9]]);
  }));

  return function searchBill(_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();

var showApplyCityPicker = exports.showApplyCityPicker = function showApplyCityPicker(state, dispatch) {
  var toggle = (0, _lodash.get)(state.screenConfiguration.screenConfig["apply"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.cityPickerDialog", "props.open", !toggle));
};

var onDemandRevisionBasis = exports.onDemandRevisionBasis = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, dispatch) {
    var isFromOk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var check = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var demandRevisionBasis, previousDemandRevBasisValue, demandArray;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            demandRevisionBasis = (0, _lodash.get)(state.screenConfiguration.preparedFinalObject, "Amendment.amendmentReason", "");
            previousDemandRevBasisValue = (0, _lodash.get)(state.screenConfiguration.preparedFinalObject, "AmendmentTemp.amendmentReason", "");

            if (!(previousDemandRevBasisValue !== demandRevisionBasis && previousDemandRevBasisValue != "" && isFromOk && check)) {
              _context5.next = 6;
              break;
            }

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.billAmdAlertDialog", "props.open", true));
            _context5.next = 86;
            break;

          case 6:
            if (!(previousDemandRevBasisValue == demandRevisionBasis && isFromOk)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 86;
            break;

          case 9:
            demandArray = [];
            _context5.t0 = demandRevisionBasis;
            _context5.next = _context5.t0 === "COURT_CASE_SETTLEMENT" ? 13 : _context5.t0 === "ARREAR_WRITE_OFF" ? 34 : _context5.t0 === "ONE_TIME_SETTLEMENT" ? 34 : _context5.t0 === "DCB_CORRECTION" ? 59 : _context5.t0 === "REMISSION_FOR_PROPERTY_TAX" ? 59 : _context5.t0 === "OTHERS" ? 59 : 84;
            break;

          case 13:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "visible", false));

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "required", true));

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "required", true));

            return _context5.abrupt("break", 86);

          case 34:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "props.value", ""));

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "required", true));

            return _context5.abrupt("break", 86);

          case 59:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate", "required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate", "required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "props.required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "required", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "props.value", ""));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "props.required", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo", "required", true));
            return _context5.abrupt("break", 86);

          case 84:
            demandArray = [false, false, false, false, false, false];
            return _context5.abrupt("break", 86);

          case 86:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function onDemandRevisionBasis(_x17, _x18) {
    return _ref5.apply(this, arguments);
  };
}();

var procedToNextStep = exports.procedToNextStep = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch) {
    var demandRevBasisValue, toggle;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            demandRevBasisValue = (0, _lodash.get)(state.screenConfiguration.preparedFinalObject, "Amendment.amendmentReason", "");

            dispatch((0, _actions2.prepareFinalObject)("documentsUploadRedux", {}));
            dispatch((0, _actions2.prepareFinalObject)("documentsContract", []));
            dispatch((0, _actions2.prepareFinalObject)("AmendmentTemp.amendmentReason", demandRevBasisValue));
            dispatch((0, _actions2.prepareFinalObject)("AmendmentTemp.isPreviousDemandRevBasisValue", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.demandRevisionBasis", "props.value", demandRevBasisValue));
            onDemandRevisionBasis(state, dispatch, false);
            toggle = (0, _lodash.get)(state.screenConfiguration.screenConfig["apply"], "components.billAmdAlertDialog.props.open", false);

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.billAmdAlertDialog", "props.open", !toggle));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function procedToNextStep(_x21, _x22) {
    return _ref6.apply(this, arguments);
  };
}();

var cancelPopUp = exports.cancelPopUp = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(state, dispatch) {
    var previousDemandRevBasisValue, toggle;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            previousDemandRevBasisValue = (0, _lodash.get)(state.screenConfiguration.preparedFinalObject, "AmendmentTemp.amendmentReason", "");

            dispatch((0, _actions2.prepareFinalObject)("AmendmentTemp.isPreviousDemandRevBasisValue", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.demandRevisionBasis", "props.value", previousDemandRevBasisValue));
            toggle = (0, _lodash.get)(state.screenConfiguration.screenConfig["apply"], "components.billAmdAlertDialog.props.open", false);

            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.billAmdAlertDialog", "props.open", !toggle));

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function cancelPopUp(_x23, _x24) {
    return _ref7.apply(this, arguments);
  };
}();