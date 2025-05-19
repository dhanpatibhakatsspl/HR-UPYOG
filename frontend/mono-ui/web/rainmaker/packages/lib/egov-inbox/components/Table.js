'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('./API/api');

var _Components = require('./Components');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function Table(_ref) {
    var data = _ref.data,
        header = _ref.header,
        localityData = _ref.localityData,
        sortOrder = _ref.sortOrder,
        t = _ref.t,
        historyComp = _ref.historyComp,
        setSortOrder = _ref.setSortOrder,
        inboxConfig = _ref.inboxConfig,
        historyClick = _ref.historyClick,
        sort = _ref.sort,
        esclatedComp = _ref.esclatedComp,
        isLoading = _ref.isLoading;

    var isMobile = (0, _utils.mobileCheck)();
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        !isMobile && _react2.default.createElement(_Row2.default, (0, _extends3.default)({}, header, { sortOrder: sortOrder, t: t, isHeader: true, sort: sort, setSortOrder: setSortOrder })),
        data.length != 0 && data.map(function (item) {
            return _react2.default.createElement(_Row2.default, (0, _extends3.default)({}, item, { historyClick: historyClick, inboxConfig: inboxConfig, WF_INBOX_HEADER_LOCALITY: localityData && item.BusinessId && (0, _utils.transformLocality)(localityData[item.BusinessId]), historyComp: historyComp, esclatedComp: esclatedComp, t: t, sortOrder: sortOrder }));
        }),
        data.length == 0 && !isLoading && _react2.default.createElement(
            'div',
            null,
            t("COMMON_INBOX_NO_DATA")
        ),
        isLoading && _react2.default.createElement(_Components.Loader, { t: t, cancelSignal: _api.cancelSignal })
    );
};

exports.default = Table;