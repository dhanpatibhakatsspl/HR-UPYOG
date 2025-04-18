'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Components = require('./Components');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrowBack = _Components.svgIcons.ArrowBack,
    ArrowToLast = _Components.svgIcons.ArrowToLast,
    ArrowToFirst = _Components.svgIcons.ArrowToFirst,
    ArrowForward = _Components.svgIcons.ArrowForward;


var reducer = function reducer(state, action) {
    var page = state.page,
        nextPage = state.nextPage,
        prevPage = state.prevPage,
        rowsPerPage = state.rowsPerPage;

    switch (action.type) {
        case 'initMDMS':
            return (0, _extends3.default)({}, state, { initMDMS: true, rowsPerPage: action.value.defaultValue, rowsPerPageOptions: action.value.rowsPerPageOptions });
        case 'change_rows_per_page':
            page = 0;
            rowsPerPage = Number(action.value);
            nextPage = action.dataCount - rowsPerPage - rowsPerPage * page > 0 ? true : false;
            return (0, _extends3.default)({}, state, { page: page, rowsPerPage: rowsPerPage, prevPage: false, nextPage: nextPage });
        case 'next_page':
            page += 1;
            nextPage = action.value - rowsPerPage - rowsPerPage * page > 0 ? true : false;
            return (0, _extends3.default)({}, state, { page: page, prevPage: true, nextPage: nextPage });
        case 'prev_page':
            page -= 1;
            prevPage = page == 0 ? false : true;
            return (0, _extends3.default)({}, state, { page: page, prevPage: prevPage, nextPage: true });
        case 'first_page':
            return (0, _extends3.default)({}, state, { page: 0, prevPage: false, nextPage: true });
        case 'last_page':
            return (0, _extends3.default)({}, state, { page: Math.ceil(action.value / rowsPerPage) - 1, prevPage: true, nextPage: false });
        case 'total_records':
            return (0, _extends3.default)({}, state, { selected_none: false, sla_breached: false, nearing_sla_records: false, total_records: true });
        case 'reset':
            return (0, _extends3.default)({}, initialState);
        default:
            throw new Error();
    }
};
var initialState = {
    prevPage: false,
    nextPage: true,
    rowsPerPageOptions: [25, 100],
    page: 0,
    rowsPerPage: 100,
    initMDMS: false
};

var TablePaginationWrapper = function TablePaginationWrapper(_ref) {
    var data = _ref.data,
        t = _ref.t,
        paginationConfig = _ref.paginationConfig,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['data', 't', 'paginationConfig']);

    var _useReducer = (0, _react.useReducer)(reducer, initialState),
        _useReducer2 = (0, _slicedToArray3.default)(_useReducer, 2),
        pagination = _useReducer2[0],
        setPaginationDispatch = _useReducer2[1];

    var _useState = (0, _react.useState)([]),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        filteredData = _useState2[0],
        setFilteredData = _useState2[1];

    var dataCount = data.length;
    var _pagination$rowsPerPa = pagination.rowsPerPageOptions,
        rowsPerPageOptions = _pagination$rowsPerPa === undefined ? [] : _pagination$rowsPerPa,
        page = pagination.page,
        rowsPerPage = pagination.rowsPerPage,
        initMDMS = pagination.initMDMS,
        prevPage = pagination.prevPage,
        nextPage = pagination.nextPage;


    (0, _react.useEffect)(function () {
        if (paginationConfig && paginationConfig.rowsPerPageOptions && !initMDMS) {
            setPaginationDispatch({ type: 'initMDMS', value: paginationConfig });
        }
    }, [paginationConfig]);

    (0, _react.useEffect)(function () {
        setPaginationDispatch({ type: 'change_rows_per_page', value: rowsPerPage, dataCount: dataCount });
    }, [data]);

    (0, _react.useEffect)(function () {
        var newData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setFilteredData(newData);
    }, [pagination]);

    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_Table2.default, (0, _extends3.default)({ data: [].concat((0, _toConsumableArray3.default)(filteredData)), t: t }, rest)),
        _react2.default.createElement(
            'span',
            { key: "inbox-pagination", className: 'inbox-row-holder jk-pagination-holder' },
            _react2.default.createElement(
                'span',
                { className: ' inbox-row' },
                ' ',
                t("COMMON_INBOX_ROWS_LABEL"),
                ' '
            ),
            _react2.default.createElement(_Components.FilterDropdown, { showOptionAll: false, t: t, className: 'inbox-pagination-dropdown', data: rowsPerPageOptions.map(function (value) {
                    return { key: '' + value, value: '' + value };
                }), name: 'page', value: rowsPerPage, id: 'page', onChangeFunction: function onChangeFunction(e) {
                    return setPaginationDispatch({ type: 'change_rows_per_page', value: e.target.value, dataCount: dataCount });
                } }),
            _react2.default.createElement(ArrowToFirst, { className: ' inbox-row ' + (prevPage ? 'inbox-page-button' : 'inbox-page-button-disabled inbox-page-button-disabled1'), onClick: function onClick(e) {
                    return prevPage && setPaginationDispatch({ type: 'first_page' });
                } }),
            _react2.default.createElement(ArrowBack, { className: 'inbox-row ' + (prevPage ? 'inbox-page-button' : 'inbox-page-button-disabled') + ' ', onClick: function onClick(e) {
                    return prevPage && setPaginationDispatch({ type: 'prev_page', value: dataCount });
                } }),
            _react2.default.createElement(ArrowForward, { className: ' inbox-row ' + (nextPage ? 'inbox-page-button' : 'inbox-page-button-disabled'), onClick: function onClick(e) {
                    return nextPage && setPaginationDispatch({ type: 'next_page', value: dataCount });
                } }),
            _react2.default.createElement(ArrowToLast, { className: ' inbox-row ' + (nextPage ? 'inbox-page-button' : 'inbox-page-button-disabled inbox-page-button-disabled1'), onClick: function onClick(e) {
                    return nextPage && setPaginationDispatch({ type: 'last_page', value: dataCount });
                } })
        )
    );
};

exports.default = TablePaginationWrapper;