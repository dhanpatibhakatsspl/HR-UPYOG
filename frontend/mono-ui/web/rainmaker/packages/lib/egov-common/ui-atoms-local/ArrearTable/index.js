'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _styles = require('@material-ui/core/styles');

var _Table = require('@material-ui/core/Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableBody = require('@material-ui/core/TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require('@material-ui/core/TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('@material-ui/core/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _LabelContainer = require('egov-ui-framework/ui-containers/LabelContainer');

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto',
            boxShadow: 'none'
        },
        table: {
            minWidth: 700
        },
        cell: {
            textAlign: 'left',
            padding: '4px 10px'
        }
    };
};

function ArrearTable(props) {
    var classes = props.classes,
        _props$headers = props.headers,
        headers = _props$headers === undefined ? [] : _props$headers,
        _props$values = props.values,
        values = _props$values === undefined ? [] : _props$values,
        _props$arrears = props.arrears,
        arrears = _props$arrears === undefined ? 0 : _props$arrears;


    return _react2.default.createElement(
        _Paper2.default,
        { className: classes.root },
        _react2.default.createElement(
            _Table2.default,
            { className: classes.table },
            _react2.default.createElement(
                _TableHead2.default,
                null,
                _react2.default.createElement(
                    _TableRow2.default,
                    null,
                    _react2.default.createElement(
                        _TableCell2.default,
                        { className: classes.cell, style: { fontSize: 'medium', textAlign: 'left' } },
                        _react2.default.createElement(_LabelContainer2.default, {
                            labelName: 'CS_BILL_PERIOD',
                            labelKey: 'CS_BILL_PERIOD',
                            style: { fontSize: 'medium' }
                        })
                    ),
                    headers.map(function (header, ind) {
                        return _react2.default.createElement(
                            _TableCell2.default,
                            { className: classes.cell, key: ind },
                            _react2.default.createElement(_LabelContainer2.default, {
                                labelName: header,
                                labelKey: header,
                                style: { fontSize: 'medium' }
                            })
                        );
                    })
                )
            ),
            _react2.default.createElement(
                _TableBody2.default,
                null,
                Object.values(values).map(function (row, ind) {
                    return _react2.default.createElement(
                        _TableRow2.default,
                        { key: ind },
                        _react2.default.createElement(
                            _TableCell2.default,
                            { className: classes.cell, component: 'th', scope: 'row', style: { textAlign: 'left' } },
                            Object.keys(values)[ind]
                        ),
                        headers.map(function (header, i) {
                            return _react2.default.createElement(
                                _TableCell2.default,
                                { className: classes.cell, key: i },
                                row[header] && row[header]['value'] || '0'
                            );
                        })
                    );
                }),
                _react2.default.createElement(
                    _TableRow2.default,
                    null,
                    _react2.default.createElement(_TableCell2.default, { className: classes.cell, style: { textAlign: 'left' } }),
                    headers.map(function (header, ind) {
                        if (ind == headers.length - 1) {
                            return _react2.default.createElement(
                                _TableCell2.default,
                                { className: classes.cell, key: ind },
                                parseInt(arrears)
                            );
                        } else if (ind == headers.length - 2) {
                            return _react2.default.createElement(
                                _TableCell2.default,
                                { className: classes.cell, key: ind },
                                _react2.default.createElement(_LabelContainer2.default, {
                                    labelName: 'COMMON_ARREARS_TOTAL',
                                    labelKey: 'COMMON_ARREARS_TOTAL'
                                })
                            );
                        } else {
                            return _react2.default.createElement(_TableCell2.default, { className: classes.cell, key: ind });
                        }
                    })
                )
            )
        )
    );
}

ArrearTable.propTypes = {
    classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(ArrearTable);