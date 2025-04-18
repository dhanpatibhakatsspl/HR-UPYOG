"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRoute = undefined;

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var setRoute = exports.setRoute = function setRoute(route) {
  return { type: actionTypes.SET_ROUTE, route: route };
};