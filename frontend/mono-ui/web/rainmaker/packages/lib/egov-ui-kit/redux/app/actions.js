"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCitizenConsentForm = exports.setCitizenConsertFormData = exports.resetFetchRecords = exports.fetchRemRecords = exports.fetchRecords = exports.fetchInboxRecordsCount = exports.getNotifications = exports.setNotificationsComplete = exports.getNotificationCount = exports.setNotificationCount = exports.fetchUiCommonConstants = exports.fetchUiCommonConfig = exports.setUiCommonConstants = exports.setUiCommonConfig = exports.fetchActionItems = exports.fetchCurrentLocation = exports.addBreadCrumbs = exports.fetchLocalizationLabelForOpenScreens = exports.fetchLocalizationLabel = exports.toggleSnackbarAndSetText = exports.setLocalizationLabels = exports.setBottomNavigationIndex = exports.setPreviousRoute = exports.setRoute = exports.updateActiveRoute = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common");

var _common2 = _interopRequireDefault(_common);

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _util = require("util");

var _endPoints2 = require("../../utils/endPoints");

var _localStorageUtils2 = require("../../utils/localStorageUtils");

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateActiveRoute = exports.updateActiveRoute = function updateActiveRoute(routePath, menuName) {
  (0, _localStorageUtils.localStorageSet)("menuPath", routePath);
  (0, _localStorageUtils.localStorageSet)("menuName", menuName);
  return { type: actionTypes.UPDATE_ACTIVE_ROUTE_PATH, routePath: routePath };
};

var setRoute = exports.setRoute = function setRoute(route) {
  return { type: actionTypes.SET_ROUTE, route: route };
};

var setPreviousRoute = exports.setPreviousRoute = function setPreviousRoute(route) {
  return { type: actionTypes.SET_PREVIOUS_ROUTE, route: route };
};

var setBottomNavigationIndex = exports.setBottomNavigationIndex = function setBottomNavigationIndex(bottomNavigationIndex) {
  return { type: actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX, bottomNavigationIndex: bottomNavigationIndex };
};

var setLocalizationLabels = exports.setLocalizationLabels = function setLocalizationLabels(locale, localizationLabels) {
  window.localStorage.setItem("localization_" + locale, JSON.stringify(localizationLabels));
  (0, _localStorageUtils.setLocale)(locale);
  return { type: actionTypes.ADD_LOCALIZATION, locale: locale, localizationLabels: localizationLabels };
};

var toggleSnackbarAndSetText = exports.toggleSnackbarAndSetText = function toggleSnackbarAndSetText(open) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var variant = arguments[2];

  return {
    type: actionTypes.SHOW_TOAST,
    open: open,
    message: message,
    variant: variant
  };
};

var fetchLocalizationLabel = exports.fetchLocalizationLabel = function fetchLocalizationLabel() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en_IN';
  var module = arguments[1];
  var tenantId = arguments[2];
  var isFromModule = arguments[3];

  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var storedModuleList, moduleName, localeModule, resultArray, tenantModule, isCommonScreen, payload1, newList, payload2, prevLocalisationLabels;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              storedModuleList = [];

              if ((0, _localStorageUtils2.getStoredModulesList)() !== null) {
                storedModuleList = JSON.parse((0, _localStorageUtils2.getStoredModulesList)());
              }
              moduleName = (0, _localStorageUtils2.getModule)();
              localeModule = void 0;

              if (moduleName === 'rainmaker-common') {
                localeModule = 'rainmaker-common';
              } else if (storedModuleList.includes('rainmaker-common')) {
                localeModule = moduleName;
              } else {
                localeModule = moduleName ? "rainmaker-common," + moduleName : "rainmaker-common";
              }
              _context.prev = 5;
              resultArray = [], tenantModule = "", isCommonScreen = void 0;

              if (module != null) {
                tenantModule = "rainmaker-" + module;
              }

              if (window.location.href.includes("/language-selection") || window.location.href.includes("/user/register") || window.location.href.includes("/user/login") || window.location.href.includes("/withoutAuth")) {
                if (moduleName && storedModuleList.includes(moduleName) === false || moduleName == null) isCommonScreen = true;
              }

              if (window.location.href.includes("/inbox")) {
                if (moduleName && storedModuleList.includes("rainmaker-common")) isFromModule = false;
              }

              if (!(moduleName && storedModuleList.includes(moduleName) === false || isFromModule || isCommonScreen)) {
                _context.next = 15;
                break;
              }

              _context.next = 13;
              return (0, _api.httpRequest)(_endPoints.LOCALATION.GET.URL, _endPoints.LOCALATION.GET.ACTION, [{ key: "module", value: localeModule }, { key: "locale", value: locale }, { key: "tenantId", value: _common2.default.tenantId }]);

            case 13:
              payload1 = _context.sent;

              resultArray = [].concat((0, _toConsumableArray3.default)(payload1.messages));

            case 15:
              if (!(module && storedModuleList.includes(tenantModule) === false)) {
                _context.next = 27;
                break;
              }

              storedModuleList.push(tenantModule);
              newList = JSON.stringify(storedModuleList);

              if (!module) {
                _context.next = 24;
                break;
              }

              _context.next = 21;
              return (0, _api.httpRequest)(_endPoints.LOCALATION.GET.URL, _endPoints.LOCALATION.GET.ACTION, [{ key: "module", value: "rainmaker-" + module }, { key: "locale", value: locale }, { key: "tenantId", value: tenantId ? tenantId : _common2.default.tenantId }]);

            case 21:
              _context.t0 = _context.sent;
              _context.next = 25;
              break;

            case 24:
              _context.t0 = [];

            case 25:
              payload2 = _context.t0;

              if (payload2 && payload2.messages) {
                (0, _localStorageUtils2.setStoredModulesList)(newList);
                resultArray = [].concat((0, _toConsumableArray3.default)(resultArray), (0, _toConsumableArray3.default)(payload2.messages));
              }

            case 27:
              prevLocalisationLabels = [];

              if ((0, _localStorageUtils2.getLocalizationLabels)() != null && !isCommonScreen && storedModuleList.length > 0) {
                prevLocalisationLabels = JSON.parse((0, _localStorageUtils2.getLocalizationLabels)());
              }
              resultArray = [].concat((0, _toConsumableArray3.default)(prevLocalisationLabels), (0, _toConsumableArray3.default)(resultArray));
              localStorage.removeItem("localization_" + (0, _localStorageUtils.getLocale)());
              dispatch(setLocalizationLabels(locale, resultArray));
              _context.next = 36;
              break;

            case 34:
              _context.prev = 34;
              _context.t1 = _context["catch"](5);

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[5, 34]]);
    }));

    return function (_x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

var fetchLocalizationLabelForOpenScreens = exports.fetchLocalizationLabelForOpenScreens = function fetchLocalizationLabelForOpenScreens() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en_IN';
  var module = arguments[1];
  var tenantId = arguments[2];
  var isFromModule = arguments[3];

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var storedModuleList, moduleName, localeModule, resultArray, tenantModule, isCommonScreen, payload2, prevLocalisationLabels;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              storedModuleList = [];

              if ((0, _localStorageUtils2.getStoredModulesList)() !== null) {
                storedModuleList = JSON.parse((0, _localStorageUtils2.getStoredModulesList)());
              }
              moduleName = (0, _localStorageUtils2.getModule)();
              localeModule = void 0;

              if (moduleName === 'rainmaker-common') {
                localeModule = 'rainmaker-common';
              } else if (storedModuleList.includes('rainmaker-common')) {
                localeModule = moduleName;
              } else {
                localeModule = moduleName ? "rainmaker-common," + moduleName : "rainmaker-common";
              }
              _context2.prev = 5;
              resultArray = [], tenantModule = "", isCommonScreen = void 0;

              if (module != null) {
                tenantModule = "rainmaker-" + module;
              }

              if (!(module && storedModuleList.includes(tenantModule) === false)) {
                _context2.next = 19;
                break;
              }

              storedModuleList.push(tenantModule);

              if (!module) {
                _context2.next = 16;
                break;
              }

              _context2.next = 13;
              return (0, _api.httpRequest)(_endPoints.LOCALATION.GET.URL, _endPoints.LOCALATION.GET.ACTION, [{ key: "module", value: "rainmaker-" + module }, { key: "locale", value: locale }, { key: "tenantId", value: tenantId ? tenantId : _common2.default.tenantId }]);

            case 13:
              _context2.t0 = _context2.sent;
              _context2.next = 17;
              break;

            case 16:
              _context2.t0 = [];

            case 17:
              payload2 = _context2.t0;

              if (payload2 && payload2.messages) {
                resultArray = [].concat((0, _toConsumableArray3.default)(resultArray), (0, _toConsumableArray3.default)(payload2.messages));
              }

            case 19:
              prevLocalisationLabels = [];

              if ((0, _localStorageUtils2.getLocalizationLabels)() != null && !isCommonScreen && storedModuleList.length > 0) {
                prevLocalisationLabels = JSON.parse((0, _localStorageUtils2.getLocalizationLabels)());
              }
              resultArray = [].concat((0, _toConsumableArray3.default)(prevLocalisationLabels), (0, _toConsumableArray3.default)(resultArray));
              localStorage.removeItem("localization_" + (0, _localStorageUtils.getLocale)());
              dispatch(setLocalizationLabels(locale, resultArray));
              _context2.next = 28;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t1 = _context2["catch"](5);

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[5, 26]]);
    }));

    return function (_x5) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var setActionItems = function setActionItems(payload) {
  return {
    type: actionTypes.FETCH_ACTIONMENU,
    payload: payload
  };
};

var fetchInboxCount = function fetchInboxCount(payload) {
  return {
    type: actionTypes.FETCH_INBOX_COUNT,
    payload: payload
  };
};
var fetchInboxRecords = function fetchInboxRecords(payload) {
  return {
    type: actionTypes.FETCH_INBOX_RECORDS,
    payload: payload
  };
};
var fetchInboxRecordsError = function fetchInboxRecordsError(payload) {
  return {
    type: actionTypes.FETCH_INBOX_RECORDS_ERROR,
    payload: payload
  };
};
var fetchInboxRecordsPending = function fetchInboxRecordsPending() {
  return {
    type: actionTypes.FETCH_INBOX_RECORDS_PENDING
  };
};
var fetchRemInboxRecords = function fetchRemInboxRecords(payload) {
  return {
    type: actionTypes.FETCH_REM_INBOX_RECORDS_COMPLETE,
    payload: payload
  };
};
var fetchResetInboxRecords = function fetchResetInboxRecords() {
  return {
    type: actionTypes.FETCH_RESET_INBOX_RECORDS
  };
};

var fetchRemInboxRecordsError = function fetchRemInboxRecordsError(payload) {
  return {
    type: actionTypes.FETCH_REM_INBOX_RECORDS_ERROR,
    payload: payload
  };
};
var fetchRemInboxRecordsPending = function fetchRemInboxRecordsPending() {
  return {
    type: actionTypes.FETCH_REM_INBOX_RECORDS_PENDING
  };
};
var fetchActionItemsError = function fetchActionItemsError(payload) {
  return {
    type: actionTypes.FETCH_ACTIONMENU_ERROR,
    payload: payload
  };
};
var fetchActionItemsPending = function fetchActionItemsPending() {
  return {
    type: actionTypes.FETCH_ACTIONMENU_PENDING
  };
};

var setCurrentLocation = function setCurrentLocation(currentLocation) {
  return {
    type: actionTypes.SET_USER_CURRENT_LOCATION,
    currentLocation: currentLocation
  };
};

var addBreadCrumbs = exports.addBreadCrumbs = function addBreadCrumbs(url) {
  return { type: actionTypes.ADD_BREADCRUMB_ITEM, url: url };
};

var fetchCurrentLocation = exports.fetchCurrentLocation = function fetchCurrentLocation() {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var currAddress;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _commons.getCurrentAddress)();

            case 2:
              currAddress = _context3.sent;

              dispatch(setCurrentLocation(currAddress));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x6) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var fetchActionItems = exports.fetchActionItems = function fetchActionItems(role, ts) {
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch, getState) {
      var payload, inboxPath, state, app, inbox, _ref5, _ref5$loaded, loaded, _ref5$loading, loading;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch(fetchActionItemsPending());
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _api.httpRequest)(_endPoints.ACTIONMENU.GET.URL, _endPoints.ACTIONMENU.GET.ACTION, [], role, [], ts);

            case 4:
              payload = _context4.sent;
              inboxPath = process.env.NODE_ENV === "production" ? "/employee/inbox" : "/inbox";

              if (payload && window.location.pathname == inboxPath && payload.actions && Array.isArray(payload.actions) && payload.actions.some && payload.actions.some(function (x) {
                return x.name == "rainmaker-common-workflow";
              })) {
                state = getState();
                app = state.app;
                inbox = app.inbox;
                _ref5 = inbox || {}, _ref5$loaded = _ref5.loaded, loaded = _ref5$loaded === undefined ? false : _ref5$loaded, _ref5$loading = _ref5.loading, loading = _ref5$loading === undefined ? false : _ref5$loading;
                // loaded == false && loading == false && dispatch(fetchInboxRecordsCount());
                // loaded == false && loading == false && dispatch(fetchRecords());
              }
              dispatch(setActionItems(payload.actions));
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);

              dispatch(fetchActionItemsError(_context4.t0.message));
              // dispatch(complaintFetchError(error.message));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 10]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var setUiCommonConfig = exports.setUiCommonConfig = function setUiCommonConfig(payload) {
  return {
    type: actionTypes.FETCH_UI_COMMON_CONFIG,
    payload: payload
  };
};

var setUiCommonConstants = exports.setUiCommonConstants = function setUiCommonConstants(payload) {
  return {
    type: actionTypes.FETCH_UI_COMMON_CONSTANTS,
    payload: payload
  };
};

var fetchUiCommonConfig = exports.fetchUiCommonConfig = function fetchUiCommonConfig() {
  _util.debug;
  return function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch) {
      var requestBody, payload, MdmsRes, commonMasters, UiCommonConfig;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              requestBody = {
                MdmsCriteria: {
                  tenantId: _common2.default.tenantId,
                  moduleDetails: [{
                    moduleName: "common-masters",
                    masterDetails: [{
                      name: "uiCommonConfig"
                    }]
                  }]
                }
              };
              _context5.prev = 1;
              _context5.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 4:
              payload = _context5.sent;
              MdmsRes = payload.MdmsRes;
              commonMasters = MdmsRes["common-masters"];
              UiCommonConfig = commonMasters["uiCommonConfig"];

              dispatch(setUiCommonConfig(UiCommonConfig[0]));
              _context5.next = 13;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[1, 11]]);
    }));

    return function (_x9) {
      return _ref6.apply(this, arguments);
    };
  }();
};

var fetchUiCommonConstants = exports.fetchUiCommonConstants = function fetchUiCommonConstants() {
  _util.debug;
  return function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dispatch) {
      var requestBody, payload, MdmsRes, commonMasters, UiCommonConstants;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              requestBody = {
                MdmsCriteria: {
                  tenantId: _common2.default.tenantId,
                  moduleDetails: [{
                    moduleName: "common-masters",
                    masterDetails: [{
                      name: "uiCommonConstants"
                    }]
                  }]
                }
              };
              _context6.prev = 1;
              _context6.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 4:
              payload = _context6.sent;
              MdmsRes = payload.MdmsRes;
              commonMasters = MdmsRes["common-masters"];
              UiCommonConstants = commonMasters["uiCommonConstants"];

              dispatch(setUiCommonConstants(UiCommonConstants[0]));
              _context6.next = 13;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](1);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[1, 11]]);
    }));

    return function (_x10) {
      return _ref7.apply(this, arguments);
    };
  }();
};

var setNotificationCount = exports.setNotificationCount = function setNotificationCount(count) {
  return {
    type: actionTypes.GET_NOTIFICATION_COUNT,
    count: count
  };
};

var getNotificationCount = exports.getNotificationCount = function getNotificationCount(queryObject, requestBody) {
  return function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(dispatch, getState) {
      var payload;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _api.httpRequest)(_endPoints.EVENTSCOUNT.GET.URL, _endPoints.EVENTSCOUNT.GET.ACTION, queryObject, requestBody);

            case 3:
              payload = _context7.sent;

              dispatch(setNotificationCount(payload.unreadCount));
              _context7.next = 9;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 7]]);
    }));

    return function (_x11, _x12) {
      return _ref8.apply(this, arguments);
    };
  }();
};

var setNotificationsComplete = exports.setNotificationsComplete = function setNotificationsComplete(payload) {
  return {
    type: actionTypes.GET_NOTIFICATIONS_COMPLETE,
    payload: payload
  };
};

var setNotificationsPending = function setNotificationsPending() {
  return {
    type: actionTypes.GET_NOTIFICATIONS_PENDING
  };
};

var setNotificationsError = function setNotificationsError() {
  return {
    type: actionTypes.GET_NOTIFICATIONS_ERROR
  };
};

var getNotifications = exports.getNotifications = function getNotifications(queryObject, requestBody) {
  return function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(dispatch, getState) {
      var payload, transformedEvents;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              dispatch(setNotificationsPending());
              _context8.prev = 1;
              _context8.next = 4;
              return (0, _api.httpRequest)(_endPoints.NOTIFICATIONS.GET.URL, _endPoints.NOTIFICATIONS.GET.ACTION, queryObject, requestBody);

            case 4:
              payload = _context8.sent;
              _context8.next = 7;
              return (0, _commons.getTransformedNotifications)(payload.events);

            case 7:
              transformedEvents = _context8.sent;

              dispatch(setNotificationsComplete(transformedEvents));
              _context8.next = 14;
              break;

            case 11:
              _context8.prev = 11;
              _context8.t0 = _context8["catch"](1);

              dispatch(setNotificationsError(_context8.t0.message));

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[1, 11]]);
    }));

    return function (_x13, _x14) {
      return _ref9.apply(this, arguments);
    };
  }();
};

var fetchInboxRecordsCount = exports.fetchInboxRecordsCount = function fetchInboxRecordsCount() {
  return function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(dispatch, getState) {
      var tenantId, requestBody, payload, state, app, inboxRemData, _ref11, _ref11$loaded, remainingDataLoaded;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              tenantId = (0, _localStorageUtils.getTenantId)();
              requestBody = [{ key: "tenantId", value: tenantId }];
              _context9.next = 5;
              return (0, _api.httpRequest)(_endPoints2.INBOXRECORDSCOUNT.GET.URL, _endPoints2.INBOXRECORDSCOUNT.GET.ACTION, requestBody);

            case 5:
              payload = _context9.sent;
              state = getState();
              app = state.app;
              inboxRemData = app.inboxRemData;
              _ref11 = inboxRemData || {}, _ref11$loaded = _ref11.loaded, remainingDataLoaded = _ref11$loaded === undefined ? false : _ref11$loaded;

              remainingDataLoaded == false && payload > 100 && dispatch(fetchRemRecords(payload));
              dispatch(fetchInboxCount(payload));
              _context9.next = 17;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9["catch"](0);

              dispatch(fetchInboxRecordsError(_context9.t0.message));

            case 17:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[0, 14]]);
    }));

    return function (_x15, _x16) {
      return _ref10.apply(this, arguments);
    };
  }();
};
var fetchRecords = exports.fetchRecords = function fetchRecords() {
  return function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(dispatch, getState) {
      var tenantId, requestBody, escRequestBody, payload, escalatedPayload;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              dispatch(fetchInboxRecordsPending());
              _context10.prev = 1;
              tenantId = (0, _localStorageUtils.getTenantId)();
              requestBody = [{ key: "tenantId", value: tenantId }, { key: "offset", value: 0 }, { key: "limit", value: 100 }];
              escRequestBody = [{ key: "tenantId", value: tenantId }];
              _context10.next = 7;
              return (0, _api.httpRequest)(_endPoints2.INBOXRECORDS.GET.URL, _endPoints2.INBOXRECORDS.GET.ACTION, requestBody);

            case 7:
              payload = _context10.sent;

              if (!(payload.ProcessInstances && payload.ProcessInstances.length > 0 && payload.ProcessInstances.length != 100)) {
                _context10.next = 13;
                break;
              }

              _context10.next = 11;
              return (0, _api.httpRequest)(_endPoints2.INBOXESCALTEDRECORDS.GET.URL, _endPoints2.INBOXESCALTEDRECORDS.GET.ACTION, escRequestBody);

            case 11:
              escalatedPayload = _context10.sent;

              escalatedPayload.ProcessInstances && escalatedPayload.ProcessInstances.length > 0 && escalatedPayload.ProcessInstances.forEach(function (data) {
                data.isEscalatedApplication = true;
                payload.ProcessInstances.push(data);
              });

            case 13:
              dispatch(fetchInboxRecords(payload.ProcessInstances));
              _context10.next = 19;
              break;

            case 16:
              _context10.prev = 16;
              _context10.t0 = _context10["catch"](1);

              dispatch(fetchInboxRecordsError(_context10.t0.message));

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[1, 16]]);
    }));

    return function (_x17, _x18) {
      return _ref12.apply(this, arguments);
    };
  }();
};
var fetchRemRecords = exports.fetchRemRecords = function fetchRemRecords() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(dispatch, getState) {
      var tenantId, requestBody, escRequestBody, payload, escalatedPayload;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              dispatch(fetchRemInboxRecordsPending());
              _context11.prev = 1;
              tenantId = (0, _localStorageUtils.getTenantId)();

              count = localStorage.getItem('jk-test-inbox-record-count') || count;
              requestBody = [{ key: "tenantId", value: tenantId }, { key: "offset", value: 100 }, { key: "limit", value: count - 100 }];
              escRequestBody = [{ key: "tenantId", value: tenantId }];
              _context11.next = 8;
              return (0, _api.httpRequest)(_endPoints2.INBOXRECORDS.GET.URL, _endPoints2.INBOXRECORDS.GET.ACTION, requestBody);

            case 8:
              payload = _context11.sent;

              if (!(payload.ProcessInstances && payload.ProcessInstances.length > 0)) {
                _context11.next = 14;
                break;
              }

              _context11.next = 12;
              return (0, _api.httpRequest)(_endPoints2.INBOXESCALTEDRECORDS.GET.URL, _endPoints2.INBOXESCALTEDRECORDS.GET.ACTION, escRequestBody);

            case 12:
              escalatedPayload = _context11.sent;

              escalatedPayload.ProcessInstances && escalatedPayload.ProcessInstances.length > 0 && escalatedPayload.ProcessInstances.forEach(function (data) {
                data.isEscalatedApplication = true;
                payload.ProcessInstances.push(data);
              });

            case 14:
              dispatch(fetchRemInboxRecords(payload.ProcessInstances));
              _context11.next = 20;
              break;

            case 17:
              _context11.prev = 17;
              _context11.t0 = _context11["catch"](1);

              dispatch(fetchRemInboxRecordsError(_context11.t0.message));

            case 20:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, undefined, [[1, 17]]);
    }));

    return function (_x20, _x21) {
      return _ref13.apply(this, arguments);
    };
  }();
};
var resetFetchRecords = exports.resetFetchRecords = function resetFetchRecords() {
  return function () {
    var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(dispatch, getState) {
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              dispatch(fetchResetInboxRecords());

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function (_x22, _x23) {
      return _ref14.apply(this, arguments);
    };
  }();
};

var setCitizenConsertFormData = exports.setCitizenConsertFormData = function setCitizenConsertFormData(payload) {
  return {
    type: actionTypes.FETCH_CITIZEN_CONSENT_FORM,
    payload: payload
  };
};

var fetchCitizenConsentForm = exports.fetchCitizenConsentForm = function fetchCitizenConsentForm() {
  return function () {
    var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(dispatch) {
      var requestBody, payload, MdmsRes, commonMasters, citizenConsertFormData;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              requestBody = {
                MdmsCriteria: {
                  tenantId: _common2.default.tenantId,
                  moduleDetails: [{
                    moduleName: "common-masters",
                    masterDetails: [{
                      name: "CitizenConsentForm"
                    }]
                  }]
                }
              };
              _context13.prev = 1;
              _context13.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 4:
              payload = _context13.sent;
              MdmsRes = payload.MdmsRes;
              commonMasters = MdmsRes["common-masters"];
              citizenConsertFormData = commonMasters["CitizenConsentForm"];

              dispatch(setCitizenConsertFormData(citizenConsertFormData[0]));
              _context13.next = 13;
              break;

            case 11:
              _context13.prev = 11;
              _context13.t0 = _context13["catch"](1);

            case 13:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, undefined, [[1, 11]]);
    }));

    return function (_x24) {
      return _ref15.apply(this, arguments);
    };
  }();
};