"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Counter = function Counter(props) {
    var _useState = (0, _react.useState)(30),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        state = _useState2[0],
        setstate = _useState2[1];

    (0, _react.useEffect)(function () {
        if (state > 0) {
            setTimeout(function () {
                return setstate(function (newstate) {
                    return newstate - 1;
                });
            }, 1000);
        } else if (state == 0 && props.otpButton) {
            props.updateState();
        }
    }, [state]);

    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        state
    );
};
exports.default = Counter;