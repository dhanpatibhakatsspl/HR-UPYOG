"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValueForNA = exports.getTextToLocalMapping = exports.resetFields = exports.generateBill = exports.createBill = exports.createEstimateData = exports.searchBill = exports.getBill = exports.searchMdmsData = exports.getMdmsData = exports.getReceiptData = exports.applyRequiredValidation = exports.validateOwners = exports.getDetailsForOwner = exports.convertDateTimeToEpoch = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.showHideAdhocPopup = exports.gotoApplyWithStep = exports.getFinancialYearDates = exports.getCurrentFinancialYearForFireNoc = exports.getCurrentFinancialYear = exports.convertEpochToDate = exports.ifUserRoleExists = exports.sortByEpoch = exports.getEpochForDate = exports.convertDateToEpoch = exports.validateFields = exports.getTranslatedLabel = exports.transformById = exports.getCommonApplyFooter = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

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
      if (fields[variable] && fields[variable].componentPath != "DynamicMdmsContainer" && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      } else if (fields[variable] && fields[variable].componentPath == "DynamicMdmsContainer" && fields[variable].props) {
        (function () {
          var _fields$variable$prop = fields[variable].props,
              masterName = _fields$variable$prop.masterName,
              moduleName = _fields$variable$prop.moduleName,
              rootBlockSub = _fields$variable$prop.rootBlockSub,
              dropdownFields = _fields$variable$prop.dropdownFields;

          var isIndex = fields[variable].index || 0;
          dropdownFields.forEach(function (item, i) {
            var isValid = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + isIndex + "]." + item.key, '');
            if (isValid == '' || isValid == 'none') {
              isFormValid = false;
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", fields[variable].componentJsonpath + ".props.dropdownFields[" + i + "]", "isRequired", true));
            }
          });
        })();
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
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1.slice(-2);
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.slice(-2);
  }
  return fiscalYr;
};

var getCurrentFinancialYearForFireNoc = exports.getCurrentFinancialYearForFireNoc = function getCurrentFinancialYearForFireNoc() {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1.slice(-2);
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.slice(-2);
  }
  return fiscalYr;
};

// export const getCurrentFinancialYearForFireNoc = () => {
//   var today = new Date();
//   var curMonth = today.getMonth();
//   var fiscalYr = "";
//   if (curMonth > 3) {
//     var nextYr1 = (today.getFullYear() + 1).toString();
//     fiscalYr = today.getFullYear().toString() + "-" + nextYr1 % 100;
//   } else {
//     var nextYr2 = today.getFullYear().toString();
//     fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.slice(-2) % 100;
//   }
//   return fiscalYr;
// };

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
  var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/apply?step=" + step + applicationNumberQueryString : "/fire-noc/apply?step=" + step + applicationNumberQueryString + "&isSummaryPage=" + true;
  dispatch((0, _actions.setRoute)(applyUrl));
};

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.adhocDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.adhocDialog", "props.open", !toggle));
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

var convertDateTimeToEpoch = exports.convertDateTimeToEpoch = function convertDateTimeToEpoch(dateTimeString) {
  //example input format : "26-07-2018 17:43:21"
  try {
    var parts = dateTimeString.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
    return Date.UTC(+parts[3], parts[2] - 1, +parts[1], +parts[4], +parts[5]);
  } catch (e) {
    return dateTimeString;
  }
};

var getDetailsForOwner = exports.getDetailsForOwner = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, fieldInfo) {
    var cardIndex, ownerNo, owners, oldOwnersArr, matchingOwnerIndex, payload, userInfo, currOwnersArr;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            cardIndex = fieldInfo && fieldInfo.index ? fieldInfo.index : "0";
            ownerNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.owners[" + cardIndex + "].mobileNumber", "");

            if (ownerNo.match((0, _utils.getPattern)("MobileNo"))) {
              _context.next = 6;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Incorrect Number!",
              labelKey: "ERR_MOBILE_NUMBER_INCORRECT"
            }, "error"));
            return _context.abrupt("return");

          case 6:
            owners = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.owners", []);
            //owners from search call before modification.

            oldOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.owners", []);
            //Same no search on Same index

            if (!(owners[cardIndex] && ownerNo === owners[cardIndex].userName)) {
              _context.next = 11;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Owner has been added already!",
              labelKey: "ERR_OWNER_ALREADY_ADDED_TOGGLE_MSG"
            }, "error"));
            return _context.abrupt("return");

          case 11:

            //Same no search in whole array
            matchingOwnerIndex = owners.findIndex(function (item) {
              return item && item.userName === ownerNo;
            });

            if (!(matchingOwnerIndex > -1)) {
              _context.next = 17;
              break;
            }

            if (!(0, _isUndefined2.default)(owners[matchingOwnerIndex].userActive) && owners[matchingOwnerIndex].userActive === false) {
              //rearrange
              dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.owners[" + matchingOwnerIndex + "].userActive", true));
              dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.owners[" + cardIndex + "].userActive", false));
              //Delete if current card was not part of oldOwners array - no need to save.
              if (oldOwnersArr.findIndex(function (item) {
                return item && owners[cardIndex] && owners[cardIndex].userName === item.userName;
              }) == -1) {
                owners.splice(cardIndex, 1);
                dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.owners", owners));
              }
            } else {
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelName: "Owner already added!",
                labelKey: "ERR_OWNER_ALREADY_ADDED_1"
              }, "error"));
            }
            return _context.abrupt("return");

          case 17:
            _context.next = 19;
            return (0, _api.httpRequest)("post", "/user/_search?tenantId=" + _common2.default.tenantId, "_search", [], {
              tenantId: _common2.default.tenantId,
              userName: "" + ownerNo
            });

          case 19:
            payload = _context.sent;

            if (payload && payload.user && payload.user.hasOwnProperty("length")) {
              if (payload.user.length === 0) {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "This mobile number is not registered!",
                  labelKey: "ERR_MOBILE_NUMBER_NOT_REGISTERED"
                }, "info"));
              } else {
                userInfo = payload.user && payload.user[0] && JSON.parse(JSON.stringify(payload.user[0]));

                if (userInfo && userInfo.createdDate) {
                  userInfo.createdDate = convertDateTimeToEpoch(userInfo.createdDate);
                  userInfo.lastModifiedDate = convertDateTimeToEpoch(userInfo.lastModifiedDate);
                  userInfo.pwdExpiryDate = convertDateTimeToEpoch(userInfo.pwdExpiryDate);
                }
                currOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.owners", []);


                currOwnersArr[cardIndex] = userInfo;
                // if (oldOwnersArr.length > 0) {
                //   currOwnersArr.push({
                //     ...oldOwnersArr[cardIndex],
                //     userActive: false
                //   });
                // }
                dispatch((0, _actions2.prepareFinalObject)("FireNOCs[0].fireNOCDetails.applicantDetails.owners", currOwnersArr));
                validateOwners(state, dispatch);
              }
            }

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, "info"));

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 23]]);
  }));

  return function getDetailsForOwner(_x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var validateOwners = exports.validateOwners = function validateOwners(state, dispatch) {
  var ownersJsonPath = "";
  var owners = [];
  var ownership = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "INDIVIDUAL.SINGLEOWNER");
  if (ownership === "INDIVIDUAL.SINGLEOWNER") {
    ownersJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children";
    owners = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, ownersJsonPath, []);
    applyRequiredValidation(owners, state, dispatch);
  } else if (ownership === "INDIVIDUAL.MULTIPLEOWNERS") {
    ownersJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items";

    owners = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, ownersJsonPath, []);
    for (var i = 0; i < owners.length; i++) {
      var obj = owners[i]["item" + i].children.cardContent.children.applicantCard.children;
      applyRequiredValidation(obj, state, dispatch);
    }
  } else {
    ownersJsonPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.applicantCard.children";
    owners = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, ownersJsonPath, []);
    applyRequiredValidation(owners, state, dispatch);
  }
};

var applyRequiredValidation = exports.applyRequiredValidation = function applyRequiredValidation(obj, state, dispatch) {
  Object.keys(obj).map(function (item) {
    var jsonPath = obj[item].jsonPath;
    var componentJsonpath = obj[item].componentJsonpath;
    var isFieldValid = obj[item].isFieldValid;
    var value = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath, null);
    if (value && !isFieldValid) {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", componentJsonpath, "props.error", false));
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", componentJsonpath, "props.helperText", ""));
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", componentJsonpath, "isFieldValid", true));
    }
  });
};

var getReceiptData = exports.getReceiptData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)('FIRENOC'), "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.log(_context2.t0);
            return _context2.abrupt("return", {});

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getReceiptData(_x7) {
    return _ref2.apply(this, arguments);
  };
}();

var getMdmsData = exports.getMdmsData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "egov-mdms-service/v1/_get", "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            console.log(_context3.t0);
            return _context3.abrupt("return", {});

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getMdmsData(_x8) {
    return _ref3.apply(this, arguments);
  };
}();

var searchMdmsData = exports.searchMdmsData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(mdmsBody) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            console.log(_context4.t0);
            return _context4.abrupt("return", {});

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function searchMdmsData(_x9) {
    return _ref4.apply(this, arguments);
  };
}();

var getBill = exports.getBill = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.httpRequest)("post", "/firenoc-calculator/v1/_getbill", "", queryObject);

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);

            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function getBill(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

var searchBill = exports.searchBill = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dispatch, applicationNumber, tenantId) {
    var queryObject, payload, response, billData, estimateData;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }];

            // Get Receipt

            _context6.next = 4;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)("FIRENOC"), "", queryObject);

          case 4:
            payload = _context6.sent;
            _context6.next = 7;
            return getBill([{
              key: "tenantId",
              value: tenantId
            }, {
              key: "applicationNumber",
              value: applicationNumber
            }]);

          case 7:
            response = _context6.sent;


            // If pending payment then get bill else get receipt
            billData = (0, _get2.default)(payload, "Receipt[0].Bill") || (0, _get2.default)(response, "Bill");


            if (billData) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", billData));
              estimateData = createEstimateData(billData[0]);

              estimateData && estimateData.length && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
            }
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);

            console.log(_context6.t0);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 12]]);
  }));

  return function searchBill(_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

var isApplicationPaid = function isApplicationPaid(currentStatus, workflowCode) {
  var isPAID = false;
  // if (currentStatus === "CITIZENACTIONREQUIRED") {
  //   return true;
  // }
  var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));

  if (!(0, _isEmpty2.default)(businessServiceData)) {
    var tlBusinessService = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData")).filter(function (item) {
      return item.businessService === workflowCode;
    });
    var states = tlBusinessService && tlBusinessService.length > 0 && tlBusinessService[0].states;
    for (var i = 0; i < states.length; i++) {
      if (states[i].state === currentStatus) {
        break;
      }
      if (states[i].actions && states[i].actions.filter(function (item) {
        return item.action === "PAY";
      }).length > 0) {
        isPAID = true;
        break;
      }
    }
  } else {
    isPAID = false;
  }

  return isPAID;
};

var createEstimateData = exports.createEstimateData = function createEstimateData(billObject, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", [billObject]));
  var billDetails = billObject && billObject.billDetails;
  var fees = billDetails && billDetails[0].billAccountDetails && billDetails[0].billAccountDetails.map(function (item) {
    return {
      name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
      value: item.amount,
      info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
    };
  });
  return fees;
};

var createBill = exports.createBill = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

          case 3:
            response = _context7.sent;
            return _context7.abrupt("return", response);

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);

            if (_context7.t0.code != "EG_BS_BILL_NO_DEMANDS_FOUND") {
              dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context7.t0.message, labelKey: _context7.t0.message }, "warning"));
              console.error(_context7.t0);
            }

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 7]]);
  }));

  return function createBill(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

var generateBill = exports.generateBill = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(dispatch, applicationNumber, tenantId, status) {
    var queryObj, billQueryObj, isPAID, payload, estimateData;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            if (!(applicationNumber && tenantId && status)) {
              _context8.next = 19;
              break;
            }

            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: applicationNumber
            }, { key: "businessService", value: "FIRENOC" }];
            billQueryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }];
            isPAID = isApplicationPaid(status, "FIRENOC");

            if (!isPAID) {
              _context8.next = 11;
              break;
            }

            _context8.next = 8;
            return getReceiptData(billQueryObj);

          case 8:
            _context8.t0 = _context8.sent;
            _context8.next = 14;
            break;

          case 11:
            _context8.next = 13;
            return createBill(queryObj, dispatch);

          case 13:
            _context8.t0 = _context8.sent;

          case 14:
            payload = _context8.t0;
            estimateData = payload ? isPAID ? payload && payload.Payments && payload.Payments.length > 0 && createEstimateData(payload.Payments[0].paymentDetails[0].bill, dispatch) : payload && createEstimateData(payload.Bill[0], dispatch) : [];

            estimateData = estimateData || [];
            (0, _set2.default)(estimateData, "payStatus", isPAID);
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
            // if (payload && payload.Bill[0]) {
            //   dispatch(prepareFinalObject("ReceiptTemp[0].Bill", payload.Bill));
            //   const estimateData = createEstimateData(payload.Bill[0]);
            //   estimateData &&
            //     estimateData.length &&
            //     dispatch(
            //       prepareFinalObject(
            //         "applyScreenMdmsData.estimateCardData",
            //         estimateData
            //       )
            //     );
            // }

          case 19:
            _context8.next = 24;
            break;

          case 21:
            _context8.prev = 21;
            _context8.t1 = _context8["catch"](0);

            console.log(_context8.t1);

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 21]]);
  }));

  return function generateBill(_x16, _x17, _x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}();

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.NOCNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.applicationNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.ownerMobNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.applicationNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.fromDate", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.toDate", "props.value", ""));
};

// export const getRequiredDocData = async (action, state, dispatch) => {
//   let tenantId =
//     process.env.REACT_APP_NAME === "Citizen" ? JSON.parse(getUserInfo()).permanentCity : getTenantId();
//   let mdmsBody = {
//     MdmsCriteria: {
//       tenantId: tenantId,
//       moduleDetails: [
//         {
//           moduleName: "FireNoc",
//           masterDetails: [{ name: "Documents" }]
//         }
//       ]
//     }
//   };
//   try {
//     let payload = null;
//     payload = await httpRequest(
//       "post",
//       "/egov-mdms-service/v1/_search",
//       "_search",
//       [],
//       mdmsBody
//     );
//     dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
//   } catch (e) {
//     console.log(e);
//   }
// };

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Application No":
      return (0, _commons.getLocaleLabels)("Application No", "TL_COMMON_TABLE_COL_APP_NO", localisationLabels);

    case "NOC No":
      return (0, _commons.getLocaleLabels)("NOC No", "NOC_COMMON_TABLE_COL_NOC_NO_LABEL", localisationLabels);

    case "NOC Type":
      return (0, _commons.getLocaleLabels)("NOC Type", "NOC_TYPE_LABEL", localisationLabels);
    case "Owner Name":
      return (0, _commons.getLocaleLabels)("Owner Name", "NOC_COMMON_TABLE_COL_OWN_NAME_LABEL", localisationLabels);

    case "Application Date":
      return (0, _commons.getLocaleLabels)("Application Date", "NOC_COMMON_TABLE_COL_APP_DATE_LABEL", localisationLabels);

    case "Status":
      return (0, _commons.getLocaleLabels)("Status", "NOC_COMMON_TABLE_COL_STATUS_LABEL", localisationLabels);

    case "INITIATED":
      return (0, _commons.getLocaleLabels)("Initiated,", "NOC_INITIATED", localisationLabels);
    case "APPLIED":
      (0, _commons.getLocaleLabels)("Applied", "NOC_APPLIED", localisationLabels);
    case "PAID":
      (0, _commons.getLocaleLabels)("Paid", "WF_NEWTL_PENDINGAPPROVAL", localisationLabels);

    case "APPROVED":
      return (0, _commons.getLocaleLabels)("Approved", "NOC_APPROVED", localisationLabels);
    case "REJECTED":
      return (0, _commons.getLocaleLabels)("Rejected", "NOC_REJECTED", localisationLabels);
    case "CANCELLED":
      return (0, _commons.getLocaleLabels)("Cancelled", "NOC_CANCELLED", localisationLabels);
    case "PENDINGAPPROVAL ":
      return (0, _commons.getLocaleLabels)("Pending for Approval", "WF_FIRENOC_PENDINGAPPROVAL", localisationLabels);
    case "PENDINGPAYMENT":
      return (0, _commons.getLocaleLabels)("Pending payment", "WF_FIRENOC_PENDINGPAYMENT", localisationLabels);
    case "DOCUMENTVERIFY":
      return (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_FIRENOC_DOCUMENTVERIFY", localisationLabels);
    case "FIELDINSPECTION":
      return (0, _commons.getLocaleLabels)("Pending for Field Inspection", "WF_FIRENOC_FIELDINSPECTION", localisationLabels);

    case "Search Results for Fire-NOC Applications":
      return (0, _commons.getLocaleLabels)("Search Results for Fire-NOC Applications", "NOC_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);

    case "MY_APPLICATIONS":
      return (0, _commons.getLocaleLabels)("My Applications", "TL_MY_APPLICATIONS", localisationLabels);
  }
};

var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value == null || value == undefined || value == '' ? "NA" : value;
};