"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCardVisibility = exports.prepareDocumentsView = exports.showHideMutationDetailsCard = exports.getLabelIfNotNull = exports.downloadReceitForm = exports.downloadCertificateForm = exports.getpayments = exports.fetchBill = exports.checkValueForNA = exports.getTextToLocalMapping = exports.getRequiredDocData = exports.getTodaysDateInYMD = exports.resetFields = exports.generateBill = exports.createEstimateData = exports.searchBill = exports.getBill = exports.getUserDataFromUuid = exports.getMdmsData = exports.getReceiptData = exports.getDetailsForOwner = exports.convertDateTimeToEpoch = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.showHideAdhocPopup = exports.gotoApplyWithStep = exports.getFinancialYearDates = exports.getCurrentFinancialYear = exports.convertEpochToDate = exports.ifUserRoleExists = exports.sortByEpoch = exports.getEpochForDate = exports.convertDateToEpoch = exports.validateFields = exports.getTranslatedLabel = exports.transformById = exports.getCommonApplyFooter = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _commons = require("egov-common/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _commons3 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _api = require("../../../../ui-utils/api");

var _commons4 = require("../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "pt-apply-wizard-footer"
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
  if (fields.isFieldValid === false) {
    return false;
  }
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
  var applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "consumerCode");
  var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
  var applicationNumberQueryString = applicationNumber ? "consumerCode=" + applicationNumber + "&tenantId=" + tenantId : "";
  var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/pt-mutation/apply?" + applicationNumberQueryString + "&step=" + step : "/pt-mutation/apply?" + applicationNumberQueryString + "&step=" + step;
  _store2.default.dispatch((0, _actions.setRoute)(applyUrl));
};

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch, screenKey) {

  // let link = `/property-tax/assessment-form`;
  // let moduleName = process.env.REACT_APP_NAME === "Citizen" ? '/citizen' : '/employee';
  // window.location.href = process.env.NODE_ENV === "production" ? moduleName + link : link;


  // dispatch(setRoute(`/property-tax/assessment-form`));


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

            if (!(ownerNo === owners[cardIndex].userName)) {
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
              return item.userName === ownerNo;
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
                return owners[cardIndex].userName === item.userName;
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
            return (0, _api.httpRequest)("post", "/user/_search?tenantId=pb", "_search", [], {
              tenantId: "pb",
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

var getReceiptData = exports.getReceiptData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_search", "", queryObject);

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

// Get user data from uuid API call
var getUserDataFromUuid = exports.getUserDataFromUuid = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(bodyObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            // const response = await httpRequest(
            //   "post",
            //   "/user/_search",
            //   "",
            //   [],
            //   bodyObject
            // );

            response = (0, _commons3.getUserSearchedResponse)();
            return _context4.abrupt("return", response);

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);

            console.log(_context4.t0);
            return _context4.abrupt("return", {});

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 5]]);
  }));

  return function getUserDataFromUuid(_x9) {
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
              key: "consumerCode",
              value: applicationNumber
            }];

            // Get Receipt

            _context6.next = 4;
            return (0, _api.httpRequest)("post", "/collection-services/receipts/_search", "", queryObject);

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

var createEstimateData = exports.createEstimateData = function createEstimateData(billObject) {
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

var generateBill = exports.generateBill = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(dispatch, applicationNumber, tenantId) {
    var queryObj, payload, estimateData;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            if (!(applicationNumber && tenantId)) {
              _context7.next = 7;
              break;
            }

            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "applicationNumber",
              value: applicationNumber
            }];
            _context7.next = 5;
            return getBill(queryObj);

          case 5:
            payload = _context7.sent;

            // let payload = sampleGetBill();
            if (payload && payload.Bill[0]) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              estimateData = createEstimateData(payload.Bill[0]);

              estimateData && estimateData.length && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
            }

          case 7:
            _context7.next = 12;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);

            console.log(_context7.t0);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 9]]);
  }));

  return function generateBill(_x14, _x15, _x16) {
    return _ref7.apply(this, arguments);
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
var getTodaysDateInYMD = exports.getTodaysDateInYMD = function getTodaysDateInYMD() {
  var date = new Date();
  //date = date.valueOf();
  var month = date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() + "-" + month + "-" + day;
  // date = epochToYmdDate(date);
  return date;
};

var getRequiredDocData = exports.getRequiredDocData = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            tenantId = process.env.REACT_APP_NAME === "Citizen" ? "pb.amritsar" : (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "MutationDocuments" }]
                }]
              }
            };
            _context8.prev = 2;
            payload = null;
            _context8.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context8.sent;

            dispatch((0, _actions2.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](2);

            console.log(_context8.t0);

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[2, 10]]);
  }));

  return function getRequiredDocData(_x17, _x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}();

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons2.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Unique Property ID":
      return (0, _commons2.getLocaleLabels)("Unique Property ID", "PT_COMMON_TABLE_COL_PT_ID", localisationLabels);
    case "Unique Property Id":
      return (0, _commons2.getLocaleLabels)("Unique Property Id", "PT_COMMON_TABLE_COL_UNIQ_PT_ID", localisationLabels);
    case "Action":
      return (0, _commons2.getLocaleLabels)("Action", "PT_COMMON_TABLE_COL_ACTION_LABEL", localisationLabels);

    case "Application No":
      return (0, _commons2.getLocaleLabels)("Application No.", "PT_COMMON_TABLE_COL_APP_NO", localisationLabels);

    case "Application Type":
      return (0, _commons2.getLocaleLabels)("Application Type", "PT_COMMON_TABLE_COL_APP_TYPE", localisationLabels);

    case "Owner Name":
      return (0, _commons2.getLocaleLabels)("Owner Name", "PT_COMMON_TABLE_COL_OWNER_NAME", localisationLabels);

    case "Guardian Name":
      return (0, _commons2.getLocaleLabels)("Guardian Name", "PT_GUARDIAN_NAME", localisationLabels);
    case "Existing Property Id":
      return (0, _commons2.getLocaleLabels)("Existing Property Id", "PT_COMMON_COL_EXISTING_PROP_ID", localisationLabels);

    case "Address":
      return (0, _commons2.getLocaleLabels)("Address", "PT_COMMON_COL_ADDRESS", localisationLabels);

    case "Status":
      return (0, _commons2.getLocaleLabels)("Status", "PT_COMMON_TABLE_COL_STATUS_LABEL", localisationLabels);
    case "ACTIVE":
      return (0, _commons2.getLocaleLabels)("Active,", "PT_ACTIVE", localisationLabels);
    case "INITIATED":
      return (0, _commons2.getLocaleLabels)("Initiated,", "PT_INITIATED", localisationLabels);
    case "APPLIED":
      (0, _commons2.getLocaleLabels)("Applied", "PT_APPLIED", localisationLabels);
    case "PAID":
      (0, _commons2.getLocaleLabels)("Paid", "WF_NEWPT_PENDINGAPPROVAL", localisationLabels);

    case "APPROVED":
      return (0, _commons2.getLocaleLabels)("Approved", "PT_APPROVED", localisationLabels);
    case "REJECTED":
      return (0, _commons2.getLocaleLabels)("Rejected", "PT_REJECTED", localisationLabels);
    case "CANCELLED":
      return (0, _commons2.getLocaleLabels)("Cancelled", "PT_CANCELLED", localisationLabels);
    case "PENDINGAPPROVAL ":
      return (0, _commons2.getLocaleLabels)("Pending for Approval", "WF_PT_PENDINGAPPROVAL", localisationLabels);
    case "PENDINGPAYMENT":
      return (0, _commons2.getLocaleLabels)("Pending payment", "WF_PT_PENDINGPAYMENT", localisationLabels);
    case "DOCUMENTVERIFY":
      return (0, _commons2.getLocaleLabels)("Pending for Document Verification", "WF_PT_DOCUMENTVERIFY", localisationLabels);
    case "FIELDINSPECTION":
      return (0, _commons2.getLocaleLabels)("Pending for Field Inspection", "WF_PT_FIELDINSPECTION", localisationLabels);

    case "Search Results for PT Applications":
      return (0, _commons2.getLocaleLabels)("Search Results for PT Applications", "PT_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);

    case "Search Results for Properties":
      return (0, _commons2.getLocaleLabels)("Search Results for Properties", "PT_HOME_PROPERTY_RESULTS_TABLE_HEADING", localisationLabels);

    case "Search Results for Property Application":
      return (0, _commons2.getLocaleLabels)("Search Results for Property Application", "PT_HOME_APPLICATION_RESULTS_TABLE_HEADING", localisationLabels);

    case "MY_APPLICATIONS":
      return (0, _commons2.getLocaleLabels)("My Applications", "TL_MY_APPLICATIONS", localisationLabels);
    case "INWORKFLOW":
      return (0, _commons2.getLocaleLabels)("In Workflow", "INWORKFLOW", localisationLabels);
    case "Property ID":
      return (0, _commons2.getLocaleLabels)("Property ID", "PT_MUTATION_PID", localisationLabels);
    default:
      return (0, _commons2.getLocaleLabels)(label, label, localisationLabels);
  }
};

var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value == null || value == undefined || value == '' ? "NA" : value;
};
var fetchBill = exports.fetchBill = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

          case 3:
            response = _context9.sent;
            return _context9.abrupt("return", response);

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);

            console.log(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 7]]);
  }));

  return function fetchBill(_x20) {
    return _ref9.apply(this, arguments);
  };
}();
var getpayments = exports.getpayments = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(queryObject) {
    var businessService, response;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            businessService = '';

            queryObject && Array.isArray(queryObject) && queryObject.map(function (query) {
              if (query.key == "businessService") {
                businessService = query.value;
              }
            });

            _context10.prev = 2;
            _context10.next = 5;
            return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)(businessService), "", queryObject);

          case 5:
            response = _context10.sent;
            return _context10.abrupt("return", response);

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](2);

            console.log(_context10.t0);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[2, 9]]);
  }));

  return function getpayments(_x21) {
    return _ref10.apply(this, arguments);
  };
}();

var downloadCertificateForm = exports.downloadCertificateForm = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(oldProperties, pdfcode, tenantId, applicationNumber) {
    var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'download';
    var queryStr, DOWNLOADRECEIPT, response, Properties, document, oldFileStoreId;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            queryStr = [{ key: "key", value: pdfcode }, { key: "tenantId", value: tenantId }];
            DOWNLOADRECEIPT = {
              GET: {
                URL: "/pdf-service/v1/_create",
                ACTION: "_get"
              }
            };
            _context11.next = 4;
            return (0, _commons4.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "acknowledgementIds", value: applicationNumber }]);

          case 4:
            response = _context11.sent;
            Properties = (0, _get2.default)(response, "Properties", oldProperties);
            document = (0, _get2.default)(Properties[0], "documents").filter(function (item) {
              return item.documentType == "PTMUTATION";
            });
            oldFileStoreId = document && (0, _get2.default)(document[0], "fileStoreId");

            if (oldFileStoreId) {
              (0, _commons.downloadReceiptFromFilestoreID)(oldFileStoreId, mode, tenantId);
            } else {

              try {
                (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Properties: Properties }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
                  res.filestoreIds[0];
                  if (res && res.filestoreIds && res.filestoreIds.length > 0) {
                    res.filestoreIds.map(function (fileStoreId) {
                      (0, _commons.downloadReceiptFromFilestoreID)(fileStoreId, mode, tenantId);
                    });
                  } else {
                    console.log("Error In Acknowledgement form Download");
                  }
                });
              } catch (exception) {
                alert('Some Error Occured while downloading Acknowledgement form!');
              }
            }

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function downloadCertificateForm(_x22, _x23, _x24, _x25) {
    return _ref11.apply(this, arguments);
  };
}();

var downloadReceitForm = exports.downloadReceitForm = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(tenantId, applicationNumber) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'download';
    var queryObj;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }, {
              key: "businessService",
              value: 'PT.MUTATION'
            }];


            (0, _commons.download)(queryObj, mode, "consolidatedreceipt", 'PAYMENT');

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function downloadReceitForm(_x27, _x28) {
    return _ref12.apply(this, arguments);
  };
}();
var getLabelIfNotNull = exports.getLabelIfNotNull = function getLabelIfNotNull(label, value, props) {
  var labelObj = (0, _utils.getLabelWithValue)(label, value, props);
  return labelObj;
};

var showHideMutationDetailsCard = exports.showHideMutationDetailsCard = function showHideMutationDetailsCard(action, state, dispatch) {
  var isMutationDetailsCard = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.PropertyConfiguration[0].Mutation.MutationDetails");
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.mutationDetails", "props.hidden", !isMutationDetailsCard));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.mutationSummary", "props.hidden", !isMutationDetailsCard));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.mutationSummary", "props.hidden", !isMutationDetailsCard));
};

var prepareDocumentsView = exports.prepareDocumentsView = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(state, dispatch) {
    var documentsPreview, allDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            documentsPreview = [];
            allDocuments = state.screenConfiguration.preparedFinalObject.Property.documents;


            allDocuments && allDocuments.forEach(function (doc) {
              documentsPreview.push({
                title: (0, _commons2.getTransformedLocale)(doc.documentType),
                fileStoreId: doc.fileStoreId,
                linkText: "View"
              });
            });
            fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context13.next = 10;
              break;
            }

            _context13.next = 7;
            return (0, _commons2.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context13.t0 = _context13.sent;
            _context13.next = 11;
            break;

          case 10:
            _context13.t0 = {};

          case 11:
            fileUrls = _context13.t0;

            documentsPreview = documentsPreview.map(function (doc, index) {
              doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons2.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
              doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons2.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              return doc;
            });
            dispatch((0, _actions2.prepareFinalObject)("documentsUploadRedux", documentsPreview));

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function prepareDocumentsView(_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}();

var setCardVisibility = exports.setCardVisibility = function setCardVisibility(state, action, dispatch) {
  var owners = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property.owners");
  if (owners && owners.length > 0) {
    owners.map(function (owner) {
      if (owner.ownerType != 'NONE' && owner.status == "ACTIVE") {
        (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transferorDetails.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID.props.style.display", 'block');
        (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transferorDetails.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.props.style.display", 'block');
        (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID.props.style.display", 'block');
        (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.props.style.display", 'block');
      }
    });
  }
  if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "").includes("MULTIPLEOWNERS")) {
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style", { display: "none" });
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.props.style", {});
  } else if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property.ownershipCategory", "").includes("INSTITUTIONAL")) {
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transferorDetails.props.style", { display: "none" });
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorSummary.props.style", { display: "none" });
  } else {
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transferorInstitutionDetails.props.style", { display: "none" });
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorInstitutionSummary.props.style", { display: "none" });
  }
};