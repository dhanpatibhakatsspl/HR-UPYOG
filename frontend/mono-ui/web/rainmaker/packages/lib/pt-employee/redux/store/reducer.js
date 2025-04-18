"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("rainmaker-employee/src/redux/store/actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  mdms: {}
};

var employeeReducer = function employeeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.DOCUMENT_TYPES_MDMS_SUCCESS:
      return (0, _extends3.default)({}, state, {
        mdms: (0, _extends3.default)({}, state.mdms, {
          document: (0, _extends3.default)({}, action.data)
        })
      });
    default:
      return state;
  }
};

exports.default = employeeReducer;