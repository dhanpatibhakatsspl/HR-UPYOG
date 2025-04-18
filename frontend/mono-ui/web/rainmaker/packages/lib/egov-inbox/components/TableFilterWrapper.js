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

var _api = require('./API/api');

var _Components = require('./Components');

var _TablePaginationWrapper = require('./TablePaginationWrapper');

var _TablePaginationWrapper2 = _interopRequireDefault(_TablePaginationWrapper);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkStringValid = function checkStringValid() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return str.match(new RegExp(/^([a-zA-Z0-9-]){4,25}$/)) ? true : false;
};

var SortDown = _Components.svgIcons.SortDown,
    SortUp = _Components.svgIcons.SortUp;


var checkFilterCondition = function checkFilterCondition(element, filters, localityData, uuid) {
    var condition = false;
    if (filters.selected_none) {
        condition = true;
    } else {
        if (filters.service != "ALL" && element.other.BusinessService != filters.service) {
            return false;
        } else if (filters.status != "ALL" && element.other.State != filters.status) {
            return false;
        } else if (filters.locality != "ALL" && localityData[element.BusinessId] != filters.locality) {
            return false;
        } else if (!filters.assigned_to_all) {
            if (filters.assigned_to_me && element.other.uuid != uuid) {
                return false;
            }
        } else if (!filters.total_records) {
            if (element.other.nearingEsclation != filters.nearing_sla_records) {
                return false;
            } else if (element.other.esclated != filters.sla_breached) {
                return false;
            }
        }
        condition = true;
    }
    return condition;
};

var reducer = function reducer(state, action) {
    switch (action.type) {
        case 'service':
            return (0, _extends3.default)({}, state, { selected_none: action.value == "ALL" ? true : false, service: action.value });
        case 'locality':
            return (0, _extends3.default)({}, state, { selected_none: action.value == "ALL" ? true : false, locality: action.value });
        case 'status':
            return (0, _extends3.default)({}, state, { selected_none: action.value == "ALL" ? true : false, status: action.value });
        case 'assigned_to_me':
            return (0, _extends3.default)({}, state, { selected_none: false, assigned_to_all: false, assigned_to_me: true, esclated: false });
        case 'assigned_to_all':
            return (0, _extends3.default)({}, state, { selected_none: true, assigned_to_all: true, assigned_to_me: false, esclated: false });
        case 'esclated':
            return (0, _extends3.default)({}, state, { selected_none: false, assigned_to_all: false, assigned_to_me: false, esclated: true });
        case 'total_records':
            return (0, _extends3.default)({}, state, { selected_none: true, sla_breached: false, nearing_sla_records: false, total_records: true });
        case 'nearing_sla_records':
            return (0, _extends3.default)({}, state, { selected_none: false, sla_breached: false, total_records: false, nearing_sla_records: true });
        case 'sla_breached':
            return (0, _extends3.default)({}, state, { selected_none: false, nearing_sla_records: false, total_records: false, sla_breached: true });
        case 'reset':
            return (0, _extends3.default)({}, initialState);
        default:
            throw new Error();
    }
};
var initialState = {
    service: "ALL", locality: "ALL", status: "ALL", assigned_to_me: false, assigned_to_all: true,
    esclated: false,
    total_records: true,
    nearing_sla_records: false,
    sla_breached: false,
    selected_none: true
};

var TableFilterWrapper = function TableFilterWrapper(_ref) {
    var businessServices = _ref.businessServices,
        countData = _ref.countData,
        setData = _ref.setData,
        setLoadAll = _ref.setLoadAll,
        count = _ref.count,
        uuid = _ref.uuid,
        loadedAll = _ref.loadedAll,
        _ref$localities = _ref.localities,
        localities = _ref$localities === undefined ? [] : _ref$localities,
        localityData = _ref.localityData,
        t = _ref.t,
        esclationData = _ref.esclationData,
        setEsclationData = _ref.setEsclationData,
        applicationStates = _ref.applicationStates,
        setIsLoading = _ref.setIsLoading,
        setBusinessServices = _ref.setBusinessServices,
        wfSlaConfig = _ref.wfSlaConfig,
        isLoading = _ref.isLoading,
        wfBusinessConfig = _ref.wfBusinessConfig,
        data = _ref.data,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['businessServices', 'countData', 'setData', 'setLoadAll', 'count', 'uuid', 'loadedAll', 'localities', 'localityData', 't', 'esclationData', 'setEsclationData', 'applicationStates', 'setIsLoading', 'setBusinessServices', 'wfSlaConfig', 'isLoading', 'wfBusinessConfig', 'data']);

    var isMobile = (0, _utils.mobileCheck)();

    var _useState = (0, _react.useState)(""),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        searchText = _useState2[0],
        setSearchText = _useState2[1];

    var _useState3 = (0, _react.useState)([]),
        _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
        searchRecord = _useState4[0],
        setSearchRecord = _useState4[1];

    var _useReducer = (0, _react.useReducer)(reducer, initialState),
        _useReducer2 = (0, _slicedToArray3.default)(_useReducer, 2),
        filters = _useReducer2[0],
        setFiltersDispatch = _useReducer2[1];

    var _useState5 = (0, _react.useState)(true),
        _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
        sort = _useState6[0],
        setSortOrder = _useState6[1];

    var _useState7 = (0, _react.useState)(data || []),
        _useState8 = (0, _slicedToArray3.default)(_useState7, 2),
        filteredData = _useState8[0],
        setFilteredData = _useState8[1];

    (0, _react.useEffect)(function () {
        if (checkStringValid(searchText)) {

            var timer = setTimeout(function () {
                setIsLoading(true);
                if (filters.esclated) {
                    (0, _api.wfSearch)([{ key: "businessIds", value: searchText }, { key: "tenantId", value: localStorage.getItem("inb-tenantId") }]).then(function (resp) {
                        return resp && resp.ProcessInstances && (0, _api.wfEsclationSearch)([{ key: "businessIds", value: resp.ProcessInstances.map(function (res) {
                                return res.businessId;
                            }).join(',') }, { key: "tenantId", value: localStorage.getItem("inb-tenantId") }]);
                    }).then(function (resp) {
                        return resp && resp.ProcessInstances && resp.ProcessInstances.filter(function (wfrec) {
                            return businessServices.includes(wfrec.businessService);
                        }).map(function (wfRecord) {
                            return (0, _utils.formatWFSearch)(wfRecord, wfSlaConfig, wfBusinessConfig);
                        });
                    }).then(function (response) {
                        return setSearchRecord(response ? response : []);
                    }).then(function (e) {
                        return setIsLoading(false);
                    });
                } else {
                    (0, _api.wfSearch)([{ key: "businessIds", value: searchText }, { key: "tenantId", value: localStorage.getItem("inb-tenantId") }]).then(function (resp) {
                        return resp && resp.ProcessInstances && resp.ProcessInstances.filter(function (wfrec) {
                            return businessServices.includes(wfrec.businessService);
                        }).map(function (wfRecord) {
                            return (0, _utils.formatWFSearch)(wfRecord, wfSlaConfig, wfBusinessConfig);
                        });
                    }).then(function (response) {
                        return setSearchRecord(response ? response : []);
                    }).then(function (e) {
                        return setIsLoading(false);
                    });
                }
            }, 1000);
            return function () {
                clearTimeout(timer);
                (0, _api.cancelSignal)();
            };
        }
    }, [searchText]);

    (0, _react.useEffect)(function () {
        if (searchRecord.length != 0 && checkStringValid(searchText)) {
            var newData = searchRecord.filter(function (element) {
                return checkFilterCondition(element, filters, localityData, uuid);
            });
            setFilteredData(newData);
            // setFilteredData([...searchRecord]);
        } else if (checkStringValid(searchText) && searchRecord.length == 0) {
            setFilteredData([]);
        } else if (filters.esclated) {
            var _newData = esclationData.data.filter(function (element) {
                return checkFilterCondition(element, filters, localityData, uuid);
            });
            setFilteredData(_newData);
            // setFilteredData([...esclationData.data]);
        } else if (filters.selected_none) {
            setFilteredData(data);
        } else {
            !loadedAll && setLoadAll(true); //dev
            var _newData2 = data.filter(function (element) {
                return checkFilterCondition(element, filters, localityData, uuid);
            });
            setFilteredData(_newData2);
        }
    }, [filters, data, searchRecord, esclationData]);
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            'div',
            { className: 'jk-inbox-first-element' },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h4',
                    null,
                    '  ',
                    t("WF_MY_WORKLIST")
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'jk-inbox-search-holder' },
                _react2.default.createElement(
                    'label',
                    { 'for': 'inbox-search', className: 'jk-inbox-search-label' },
                    '     ',
                    t("CS_INBOX_SEARCH")
                ),
                _react2.default.createElement('input', { id: 'inbox-search', disabled: isLoading, style: { borderColor: searchText.length !== 0 && !checkStringValid(searchText) ? "red" : "black" }, type: 'text', onChange: function onChange(e) {
                        return setSearchText(e.target.value);
                    }, value: searchText, placeholder: t("INBOX_ENTER_BID") }),
                searchText.length !== 0 && !checkStringValid(searchText) && _react2.default.createElement(
                    'span',
                    { style: { color: "red" } },
                    t("ERR_INVALID_APPID")
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'inbox-filter-wrapper' },
            _react2.default.createElement(_Components.FilterDropdown, { t: t, header: "CS_INBOX_MODULE_FILTER", data: businessServices.map(function (service) {
                    return { key: 'CS_COMMON_INBOX_' + service, value: service };
                }), name: 'businessService', value: filters.service, id: 'businessService', onChangeFunction: function onChangeFunction(e) {
                    return setFiltersDispatch({ type: 'service', value: e.target.value });
                } }),
            _react2.default.createElement(_Components.FilterDropdown, { t: t, header: "CS_INBOX_LOCALITY_FILTER", data: Object.values(localities).map(function (locality) {
                    return { key: (0, _utils.transformLocality)(locality), value: locality };
                }), name: 'locality', value: filters.locality, id: 'locality', onChangeFunction: function onChangeFunction(e) {
                    return setFiltersDispatch({ type: 'locality', value: e.target.value });
                } }),
            _react2.default.createElement(_Components.FilterDropdown, { t: t, header: "CS_INBOX_STATUS_FILTER", data: Object.keys(applicationStates).map(function (key) {
                    return { key: '' + key, value: applicationStates[key] };
                }), name: 'status', value: filters.status, id: 'status', onChangeFunction: function onChangeFunction(e) {
                    return setFiltersDispatch({ type: 'status', value: e.target.value });
                } }),
            _react2.default.createElement(
                'div',
                { className: 'inbox-filter-clear-buttons' },
                _react2.default.createElement(
                    'button',
                    { className: 'clear-button jk-inbox-pointer', onClick: function onClick() {
                            !loadedAll && setLoadAll(true);
                        } },
                    t("CS_INBOX_LOAD_ALL")
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'inbox-filter-clear-buttons' },
                _react2.default.createElement(
                    'button',
                    { className: 'clear-button jk-inbox-pointer', onClick: function onClick() {
                            setFiltersDispatch({ type: 'reset' });
                            setSearchText("");
                        } },
                    t("CS_INBOX_CLEAR")
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'inbox-taskboard-holder' },
            _react2.default.createElement(
                'div',
                { className: 'inbox-taskboard-card inbox-task-total', style: !filters.total_records ? { border: 'none' } : {}, onClick: function onClick() {
                        setFiltersDispatch({ type: 'total_records' });
                    } },
                t("WF_TOTAL_TASK"),
                _react2.default.createElement(
                    'span',
                    { className: 'inbox-task-font' },
                    filters.selected_none && searchText === "" ? count : filteredData.length
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'inbox-taskboard-card inbox-task-nearing-sla', style: !filters.nearing_sla_records ? { border: "none" } : {}, onClick: function onClick() {
                        setFiltersDispatch({ type: 'nearing_sla_records' });
                    } },
                t("WF_TOTAL_NEARING_SLA"),
                _react2.default.createElement(
                    'span',
                    { className: 'inbox-task-font' },
                    filteredData.filter(function (item) {
                        return item.other.nearingEsclation;
                    }).length
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'inbox-taskboard-card inbox-task-esclated-sla', style: !filters.sla_breached ? { border: "none" } : {}, onClick: function onClick() {
                        setFiltersDispatch({ type: 'sla_breached' });
                    } },
                t("WF_ESCALATED_SLA"),
                _react2.default.createElement(
                    'span',
                    { className: 'inbox-task-font' },
                    filteredData.filter(function (item) {
                        return item.other.esclated;
                    }).length
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { style: { backgroundColor: "white" } },
            _react2.default.createElement(
                'div',
                { className: "jk-inbox-tab-header-holder" },
                _react2.default.createElement(
                    'span',
                    { className: 'assigned-inbox inb-all-tab ' + (filters.assigned_to_all && "jk-selected-header"), onClick: function onClick() {
                            setFiltersDispatch({ type: 'assigned_to_all' });
                        } },
                    t("COMMON_INBOX_TAB_ALL"),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { style: { display: "inline-block" } },
                        ' ( ' + countData.all + ' )'
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'assigned-inbox inb-me-tab ' + (filters.assigned_to_me && "jk-selected-header"), onClick: function onClick() {
                            setFiltersDispatch({ type: 'assigned_to_me' });
                        } },
                    t("COMMON_INBOX_TAB_ASSIGNED_TO_ME"),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { style: { display: "inline-block" } },
                        ' ( ' + countData.assignedToMe + ' )'
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'assigned-inbox inb-esc-tab ' + (filters.esclated && "jk-selected-header"), onClick: function onClick() {
                            !esclationData.loaded && !esclationData.load && setEsclationData({ loaded: false, load: true, data: [] });
                            setFiltersDispatch({ type: 'esclated' });
                        } },
                    t("COMMON_INBOX_TAB_ESCALATED"),
                    _react2.default.createElement(
                        'span',
                        { style: { display: "inline-block" } },
                        ' ',
                        ' ( ' + countData.esclated + ' )'
                    )
                ),
                isMobile && _react2.default.createElement(
                    'span',
                    { className: 'jk-inbox-pointer jk-sort-ico', onClick: function onClick() {
                            return setSortOrder(function (state) {
                                return !state;
                            });
                        } },
                    sort ? _react2.default.createElement(SortDown, null) : _react2.default.createElement(SortUp, null)
                )
            ),
            _react2.default.createElement(_TablePaginationWrapper2.default, (0, _extends3.default)({ sort: sort, data: [].concat((0, _toConsumableArray3.default)(filteredData.sort(function (x, y) {
                    return sort ? x.other.sla - y.other.sla : y.other.sla - x.other.sla;
                }))), t: t, setSortOrder: setSortOrder, isLoading: isLoading, localityData: localityData }, rest))
        )
    );
};

exports.default = TableFilterWrapper;