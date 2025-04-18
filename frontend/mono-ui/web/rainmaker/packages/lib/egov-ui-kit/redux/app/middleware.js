"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("./actionTypes");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app(store) {
  return function (next) {
    return function (action) {
      var type = action.type;

      if (type === _actionTypes.SHOW_TOAST) {
        var state = store.getState();
        var toast = state.app.toast;
        // dispatch the action only if the intetipon
        // if (
        //   (action.open && action.message && action.message.length) ||
        //   (toast.open && toast.message && toast.message.length && !action.open && (!action.message || !action.message.length))
        // ) {
        //   next(action);
        // }

        //  if ((action.open && action.message && !isEmpty(action.message)) || (toast.open && toast.message && !isEmpty(action.message) && !action.open)) {

        next(action);
        // }
        return;
      }
      if (type === _actionTypes.ADD_LOCALIZATION) {
        if (window.location.pathname.search("/services/EGF/") !== -1) {
          localeChangeLableEvent();
        }
      }
      next(action);
    };
  };
};

function localeChangeLableEvent() {
  var event = new CustomEvent("loacaleChangeEvent");
  window.dispatchEvent(event);
}

exports.default = app;