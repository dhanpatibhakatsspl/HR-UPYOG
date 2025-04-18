'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Components = require('./Components');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortDown = _Components.svgIcons.SortDown,
    SortUp = _Components.svgIcons.SortUp;


var Row = _react2.default.memo(function (props) {
    var _props$sortOrder = props.sortOrder,
        sortOrder = _props$sortOrder === undefined ? {} : _props$sortOrder,
        id = props.BusinessId,
        t = props.t,
        _props$inboxConfig = props.inboxConfig,
        inboxConfig = _props$inboxConfig === undefined ? {} : _props$inboxConfig;

    var keys = Object.keys(sortOrder);
    keys.sort(function (x, y) {
        return sortOrder[x].order - sortOrder[y].order;
    });

    var isMobile = (0, _utils.mobileCheck)();

    if (isMobile) {
        return _react2.default.createElement(
            'div',
            { className: 'inbox-row-card', key: id, style: { cursor: "pointer" }, onClick: function onClick() {
                    if (inboxConfig) {
                        window.location.href = (0, _utils.getWfLink)(inboxConfig, props.BusinessId, props.other.BusinessService);
                    }
                } },
            keys.map(function (key, index) {
                var isSLA = key == "WF_INBOX_HEADER_SLA_DAYS_REMAINING" && !props.isHeader ? true : false;
                return _react2.default.createElement(
                    'span',
                    { style: { padding: '15px' }, key: index, className: 'row-' + key },
                    _react2.default.createElement(
                        'span',
                        { style: { textAlign: "left" } },
                        isSLA ? "SLA" : t(key)
                    ),
                    ' ',
                    ' : ',
                    _react2.default.createElement(
                        'span',
                        { style: isSLA ? { textAlign: "right", color: "rgba(0, 0, 0, 0.97)", display: "inline-block" } : { textAlign: "right", color: "rgba(0, 0, 0, 0.97)" } },
                        isSLA ? _react2.default.createElement(
                            'span',
                            { className: "jk-inbox-sla-wrapper" },
                            _react2.default.createElement(
                                'span',
                                { style: { backgroundColor: props.other.color }, className: "inbox-cell-badge-primary" },
                                props[key]
                            ),
                            props.Esclated && _react2.default.createElement(
                                'span',
                                { className: 'jk-inbox-eslcated-mark' },
                                props.esclatedComp
                            ),
                            !props.Esclated && _react2.default.createElement(
                                'span',
                                { className: 'jk-inbox-eslcated-mark' },
                                " "
                            )
                        ) : t(props[key]) || t("COMMON_NA")
                    )
                );
            }),
            _react2.default.createElement(
                'span',
                { key: 7, className: 'row-7 history-wrapper-sm' },
                ' ',
                _react2.default.createElement(
                    'span',
                    { style: { textAlign: "left" } },
                    t('CS_COMMON_VIEW_HISTORY_LINK'),
                    ' ',
                    ' '
                ),
                ' ',
                _react2.default.createElement(
                    'span',
                    { className: 'jk-inbox-pointer', onClick: function onClick() {
                            return props.historyClick(id);
                        } },
                    props.historyComp
                )
            )
        );
    }
    return _react2.default.createElement(
        'span',
        { key: id, className: 'inbox-row-holder' },
        keys.map(function (key, index) {
            var isSLA = key == "WF_INBOX_HEADER_SLA_DAYS_REMAINING" && !props.isHeader ? true : false;
            var slaHeader = false;
            var clickFunction = function clickFunction() {};
            if (key == "WF_INBOX_HEADER_SLA_DAYS_REMAINING" && props.isHeader) {
                clickFunction = function clickFunction() {
                    props.setSortOrder(function (state) {
                        return !state;
                    });
                };
                slaHeader = true;
            } else if (key == "WF_INBOX_HEADER_APPLICATION_NO") {
                clickFunction = function clickFunction() {
                    if (inboxConfig) {
                        window.location.href = (0, _utils.getWfLink)(inboxConfig, props.BusinessId, props.other.BusinessService);
                    }
                };
            }
            return _react2.default.createElement(
                'span',
                { style: { width: props.sortOrder[key].width + '%' }, key: index, className: 'row-' + key + (props.isHeader ? '-head inbox-row-header-ele' : "") + ' ' + (slaHeader && "jk-inbox-pointer") + ' inbox-row-element }', onClick: clickFunction },
                isSLA ? _react2.default.createElement(
                    'span',
                    { className: "jk-inbox-sla-wrapper" },
                    _react2.default.createElement(
                        'span',
                        { style: { backgroundColor: props.other.color }, className: "inbox-cell-badge-primary" },
                        props[key]
                    ),
                    props.Esclated && _react2.default.createElement(
                        'span',
                        { className: 'jk-inbox-eslcated-mark' },
                        props.esclatedComp
                    ),
                    !props.Esclated && _react2.default.createElement(
                        'span',
                        { className: 'jk-inbox-eslcated-mark' },
                        ""
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'jk-inbox-pointer', onClick: function onClick() {
                                return props.historyClick(id);
                            } },
                        props.historyComp
                    )
                ) : t(props[key]) || t("COMMON_NA"),
                slaHeader && _react2.default.createElement(
                    'span',
                    { className: 'jk-inbox-pointer' },
                    props.sort ? _react2.default.createElement(SortDown, null) : _react2.default.createElement(SortUp, null)
                )
            );
        })
    );
});

exports.default = Row;