"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTenantIdCommon = exports.lSRemoveItem = exports.localStorageSet = exports.localStorageGet = exports.clearUserDetails = exports.setStoredModulesList = exports.setReturnUrl = exports.setModule = exports.setLocale = exports.setTenantId = exports.setUserObj = exports.setRefreshToken = exports.setAccessToken = exports.setUserInfo = exports.getStoredModulesList = exports.getLocalizationLabels = exports.getModule = exports.getLocale = exports.getLocalization = exports.getTenantId = exports.getUserInfo = exports.getAccessToken = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appName = process.env.REACT_APP_NAME;

//GET methods
var getAccessToken = exports.getAccessToken = function getAccessToken() {
  return localStorageGet("token");
};
var getUserInfo = exports.getUserInfo = function getUserInfo() {
  return localStorageGet("user-info");
};
var getTenantId = exports.getTenantId = function getTenantId() {
  return localStorageGet("tenant-id");
};
var getLocalization = exports.getLocalization = function getLocalization(key) {
  return localStorage.getItem(key);
};
var getLocale = exports.getLocale = function getLocale() {
  return localStorage.getItem("locale");
};
var getModule = exports.getModule = function getModule() {
  return localStorage.getItem("module");
};
var getLocalizationLabels = exports.getLocalizationLabels = function getLocalizationLabels() {
  return localStorage.getItem("localization_" + getLocale());
};
var getStoredModulesList = exports.getStoredModulesList = function getStoredModulesList() {
  return localStorage.getItem("storedModulesList");
};

//SET methods
var setUserInfo = exports.setUserInfo = function setUserInfo(userInfo) {
  if (process.env.REACT_APP_NAME == "Citizen") {
    localStorageSet("user-info", userInfo, null);
  } else {
    var userObject = JSON.parse(userInfo) || {};
    userObject.roles = userObject.roles && userObject.roles.filter(function (role) {
      return role.tenantId == userObject.tenantId;
    });
    localStorageSet("user-info", JSON.stringify(userObject), null);
  }
};
var setAccessToken = exports.setAccessToken = function setAccessToken(token) {
  localStorageSet("token", token, null);
};
var setRefreshToken = exports.setRefreshToken = function setRefreshToken(refreshToken) {
  localStorageSet("refresh-token", refreshToken, null);
};
var setUserObj = exports.setUserObj = function setUserObj() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  localStorage.setItem("citizen.userRequestObject", user);
  sessionStorage.setItem("Digit.citizen.userRequestObject", JSON.stringify({ value: { info: JSON.parse(user) } }));
};
var setTenantId = exports.setTenantId = function setTenantId(tenantId) {
  localStorageSet("tenant-id", tenantId, null);
  if (process.env.REACT_APP_NAME != "Citizen") {
    window.sessionStorage.clear();
    Object.keys(window.localStorage).filter(function (key) {
      return key.startsWith("Digit");
    }).map(function (key) {
      return localStorage.removeItem(key);
    });
    var userObj = (0, _commons.getUserSearchedResponse)();
    var user = userObj && userObj.user && userObj.user[0] || {};
    user = (0, _extends3.default)({}, user, { tenantId: tenantId });
    setUserObj(JSON.stringify(user));
    setUserInfo(JSON.stringify((0, _extends3.default)({}, user)));
  }
};
var setLocale = exports.setLocale = function setLocale(locale) {
  localStorageSet("locale", locale);
  localStorage.setItem("locale", locale);
  sessionStorage.setItem("Digit.locale", JSON.stringify({ value: locale }));
};
var setModule = exports.setModule = function setModule(moduleName) {
  localStorageSet("module", moduleName);
};
var setReturnUrl = exports.setReturnUrl = function setReturnUrl(url) {
  localStorageSet("returnUrl", url);
};
var setStoredModulesList = exports.setStoredModulesList = function setStoredModulesList(storedModuleList) {
  localStorage.setItem("storedModulesList", storedModuleList);
};

//Remove Items (LOGOUT)
var clearUserDetails = exports.clearUserDetails = function clearUserDetails() {
  window.localStorage.clear();
  window.sessionStorage.clear();
};
//Role specific get-set Methods
var localStorageGet = exports.localStorageGet = function localStorageGet(key, path) {
  var appName = process.env.REACT_APP_NAME;
  var value = null;
  if (path) {
    var data = JSON.parse(window.localStorage.getItem(appName + "." + key)) || null;
    value = get(data, path);
  } else {
    value = window.localStorage.getItem(appName + "." + key) || null;
  }
  return value;
};
var localStorageSet = exports.localStorageSet = function localStorageSet(key, data, path) {
  var appName = process.env.REACT_APP_NAME;
  var storedData = window.localStorage.getItem(appName + "." + key);

  if (path) {
    set(storedData, path, data);
    window.localStorage.setItem(appName + "." + key, storedData);
    window.localStorage.setItem(key, storedData);
  } else {
    window.localStorage.setItem(appName + "." + key, data);
    window.localStorage.setItem(key, data);
  }
};
//Remove Item
var lSRemoveItem = exports.lSRemoveItem = function lSRemoveItem(key) {
  var appName = process.env.REACT_APP_NAME;
  window.localStorage.removeItem(appName + "." + key);
};

// get tenantId for Employee/Citizen
var getTenantIdCommon = exports.getTenantIdCommon = function getTenantIdCommon() {
  return process.env.REACT_APP_NAME === "Citizen" ? JSON.parse(getUserInfo()).permanentCity : getTenantId();
};