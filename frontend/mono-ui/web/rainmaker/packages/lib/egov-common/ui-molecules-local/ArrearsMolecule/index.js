"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ArrearTable = require("../../ui-atoms-local/ArrearTable");

var _ArrearTable2 = _interopRequireDefault(_ArrearTable);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrearsMolecule = function ArrearsMolecule(props) {

    var head = {};
    props.fees ? Object.keys(props.fees).map(function (key, ind) {
        var value = [];
        Object.keys(props.fees[key]).map(function (key1) {
            head[key1] = props.fees[key] && props.fees[key][key1] && props.fees[key][key1].order || 0;
        });
    }) : "NA";
    var keys = [];

    keys = Object.keys(head);
    keys.sort(function (x, y) {
        return head[x] - head[y];
    });
    return _react2.default.createElement(_ArrearTable2.default, { headers: [].concat((0, _toConsumableArray3.default)(keys)), values: props.fees, arrears: props.arrears });
};
exports.default = ArrearsMolecule;