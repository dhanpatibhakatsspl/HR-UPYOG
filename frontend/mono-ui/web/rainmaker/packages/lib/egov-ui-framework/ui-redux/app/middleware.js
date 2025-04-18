"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("./actionTypes");

var app = function app(store) {
  return function (next) {
    return function (action) {
      var type = action.type;


      if (type === _actionTypes.SHOW_TOAST) {
        var state = store.getState();
        var toastObject = state.screenConfiguration.toastObject;
        // dispatch the action only if the intetipon

        if (action.open && action.message && action.message.length || toastObject.open && toastObject.message && toastObject.message.length && !action.open && (!action.message || !action.message.length)) {
          next(action);
        }
        return;
      }
      next(action);
    };
  };
};

exports.default = app;