'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./App.css');

var _Inbox = require('./components/Inbox');

var _Inbox2 = _interopRequireDefault(_Inbox);

var _utils = require('./components/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
    var _useState = (0, _react.useState)(JSON.parse(localStorage.getItem("inbox-localisationData")) || {}),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        localisationData = _useState2[0],
        setData = _useState2[1];

    var userObject = {
        "id": 32563,
        "uuid": "8d1dfdc5-13e8-4800-89f9-de284089da9c",
        "userName": "QASV",
        "name": "Supervisor",
        "mobileNumber": "7899898989",
        "emailId": null,
        "locale": null,
        "type": "EMPLOYEE",
        "roles": [{
            "name": "TL Counter Employee",
            "code": "TL_CEMP",
            "tenantId": "pb.amritsar"
        }, {
            "name": "Auto Escalation Supervisor",
            "code": "SUPERVISOR",
            "tenantId": "pb.amritsar"
        }, {
            "name": "Auto Escalation Employee",
            "code": "AUTO_ESCALATE",
            "tenantId": "pb.amritsar"
        }],
        "active": true,
        "tenantId": "pb.amritsar",
        "permanentCity": "pb"
    };
    userObject.auth = "73ff17e9-1b47-4207-a91c-bf09c951b72b";
    localStorage.setItem("Employee.token", userObject.auth);

    (0, _react.useEffect)(function () {
        localisationData && Object.keys(localisationData).length == 0 && (0, _utils.fetchLocalisation)();
        return function () {};
    }, []);

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Inbox2.default, { user: userObject, t: function t(key) {
                return localisationData && localisationData[key] ? localisationData[key] : key;
            }, historyClick: function historyClick(e) {
                return console.log("history", e);
            }, historyComp: _react2.default.createElement(
                'span',
                null,
                'HH'
            ), esclatedComp: _react2.default.createElement(
                'span',
                null,
                'I'
            ) })
    );
}

exports.default = App;