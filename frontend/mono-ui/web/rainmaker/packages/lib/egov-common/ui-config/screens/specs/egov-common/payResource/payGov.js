"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePayment = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makePayment = exports.makePayment = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, data) {
    var myHeaders, requestOptions;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myHeaders = new Headers();

            myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
            myHeaders.append("Access-Control-Allow-Origin", "*");

            requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: data,
              "mode": "no-cors",
              redirect: 'follow'
            };


            fetch(url, requestOptions).then(function (response) {
              return response.text();
            }).then(function (result) {
              return console.log(result);
            }).catch(function (error) {
              return console.log('error', error);
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function makePayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();