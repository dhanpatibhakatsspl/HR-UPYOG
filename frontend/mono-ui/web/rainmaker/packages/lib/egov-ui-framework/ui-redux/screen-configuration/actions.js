"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitForm = exports.prepareFinalObject = exports.handleScreenConfigurationFieldChange = exports.hideSpinner = exports.showSpinner = exports.toggleSpinner = exports.toggleSnackbar = exports.unMountScreen = exports.initScreen = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _uiUtils = require("../../ui-utils");

var _actions = require("../app/actions");

var _actionTypes = require("./actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initScreen = exports.initScreen = function initScreen(screenKey, screenConfig) {
  return {
    type: screenActionTypes.INIT_SCREEN,
    screenKey: screenKey,
    screenConfig: screenConfig
  };
};

var unMountScreen = exports.unMountScreen = function unMountScreen(screenKey) {
  return {
    type: screenActionTypes.UNMOUNT_SCREEN,
    screenKey: screenKey
  };
};

var toggleSnackbar = exports.toggleSnackbar = function toggleSnackbar(open, message, error) {
  return {
    type: screenActionTypes.SHOW_NEW_TOAST,
    open: open,
    message: message,
    error: error
  };
};

var toggleSpinner = exports.toggleSpinner = function toggleSpinner() {
  return {
    type: screenActionTypes.TOGGLE_LOADER
  };
};
var showSpinner = exports.showSpinner = function showSpinner() {
  return {
    type: screenActionTypes.SHOW_LOADER
  };
};
var hideSpinner = exports.hideSpinner = function hideSpinner() {
  return {
    type: screenActionTypes.HIDE_LOADER
  };
};

var handleScreenConfigurationFieldChange = exports.handleScreenConfigurationFieldChange = function handleScreenConfigurationFieldChange(screenKey, componentJsonpath, property, value) {
  return {
    type: screenActionTypes.HANDLE_SCREEN_CONFIGURATION_FIELD_CHANGE,
    screenKey: screenKey,
    componentJsonpath: componentJsonpath,
    property: property,
    value: value
  };
};

var prepareFinalObject = exports.prepareFinalObject = function prepareFinalObject(jsonPath, value) {
  return {
    type: screenActionTypes.PREPARE_FINAL_OBJECT,
    jsonPath: jsonPath,
    value: value
  };
};

var submitForm = exports.submitForm = function submitForm(screenKey, method, endpoint, action, redirectionUrl) {
  var bodyObjectsJsonPaths = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var queryObjectJsonPath = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
      var state, screenConfiguration, screenConfig, preparedFinalObject, currentScreenConfig, screenConfigResponse, body, mihy, _body, query, screenConfigBodyData, screenConfigQueryData;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = getState();
              screenConfiguration = state.screenConfiguration;
              screenConfig = screenConfiguration.screenConfig, preparedFinalObject = screenConfiguration.preparedFinalObject;
              currentScreenConfig = screenConfig[screenKey];

              dispatch(showSpinner());

              if (!(0, _utils.validateForm)(screenKey, currentScreenConfig.components, dispatch)) {
                _context.next = 31;
                break;
              }

              _context.prev = 6;
              screenConfigResponse = {};
              // this will eventually moved out to the auth action; bit messy

              if (!(screenKey === "login")) {
                _context.next = 16;
                break;
              }

              body = preparedFinalObject.body;
              mihy = body.mihy;
              _context.next = 13;
              return (0, _uiUtils.loginRequest)(mihy.username, mihy.password);

            case 13:
              screenConfigResponse = _context.sent;
              _context.next = 22;
              break;

            case 16:
              _body = preparedFinalObject.body, query = preparedFinalObject.query;
              screenConfigBodyData = (0, _utils.prepareFinalBodyData)(_body, bodyObjectsJsonPaths);
              screenConfigQueryData = (0, _utils.prepareFinalQueryData)(query, queryObjectJsonPath);
              _context.next = 21;
              return (0, _uiUtils.httpRequest)(method, endpoint, action, [], screenConfigBodyData);

            case 21:
              screenConfigResponse = _context.sent;

            case 22:
              dispatch(toggleSpinner());
              if (redirectionUrl) {
                dispatch((0, _actions.setRoute)(redirectionUrl));
              }
              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](6);

              dispatch(hideSpinner());
              // const { message } = error;
              // throw new Error(error);

            case 29:
              _context.next = 32;
              break;

            case 31:
              dispatch(hideSpinner());

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[6, 26]]);
    }));

    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};