"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require("egov-ui-kit/redux/auth/actions");

var _actionTypes = require("./actionTypes");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions2 = require("../app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(store) {
  return function (next) {
    return function (action) {
      var type = action.type;

      var state = store.getState();
      var notifications = (0, _get2.default)(state.app, "notificationObj.notificationsById");

      if (type === _actionTypes.USER_SEARCH_SUCCESS) {
        if (process.env.REACT_APP_NAME === "Citizen") {
          var permanentCity = action.user && action.user.permanentCity;
          var queryObject = [{
            key: "tenantId",
            value: permanentCity ? permanentCity : (0, _localStorageUtils.getTenantId)()
          }];
          var requestBody = {
            RequestInfo: {
              apiId: "org.egov.pt",
              ver: "1.0",
              ts: 1502890899493,
              action: "asd",
              did: "4354648646",
              key: "xyz",
              msgId: "654654",
              requesterId: "61",
              authToken: (0, _localStorageUtils.getAccessToken)()
            }
          };
          if (window.location.pathname === "/" || window.location.pathname === "/citizen/" || window.location.pathname === "/employee/inbox") {
            store.dispatch((0, _actions2.getNotifications)(queryObject, requestBody));
            store.dispatch((0, _actions2.getNotificationCount)(queryObject, requestBody));
          }
        }
      }

      if (/(_ERROR|_FAILURE)$/.test(type) && action.error === "INVALID_TOKEN") {
        store.dispatch((0, _actions.refreshTokenRequest)());
      } else {
        next(action);
      }
    };
  };
};

exports.default = auth;