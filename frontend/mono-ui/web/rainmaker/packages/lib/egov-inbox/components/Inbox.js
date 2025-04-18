'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('./API/api');

var _ErrorBoundary = require('./ErrorBoundary');

var _ErrorBoundary2 = _interopRequireDefault(_ErrorBoundary);

var _inboxUtil = require('./inboxUtil');

require('./index.css');

var _TableFilterWrapper = require('./TableFilterWrapper');

var _TableFilterWrapper2 = _interopRequireDefault(_TableFilterWrapper);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Initdata = _inboxUtil.inboxHelperFunction.Initdata,
    sortOrder = _inboxUtil.inboxHelperFunction.sortOrder,
    getEsclationRecords = _inboxUtil.inboxHelperFunction.getEsclationRecords,
    loadAssignedToMeCount = _inboxUtil.inboxHelperFunction.loadAssignedToMeCount;


var WfTable = function WfTable(props) {
    var _props$user = props.user,
        user = _props$user === undefined ? {} : _props$user,
        _props$historyComp = props.historyComp,
        historyComp = _props$historyComp === undefined ? null : _props$historyComp,
        historyClick = props.historyClick,
        _props$esclatedComp = props.esclatedComp,
        esclatedComp = _props$esclatedComp === undefined ? null : _props$esclatedComp;
    var _props$t = props.t,
        newT = _props$t === undefined ? function (key) {
        return key;
    } : _props$t;

    var t = function t(key) {
        return newT(key && typeof key == "string" && key.toUpperCase());
    };
    localStorage.setItem("inb-uuid", user.uuid);
    localStorage.setItem("inb-tenantId", user.tenantId);
    localStorage.setItem("inb-stateTenant", user.permanentCity);

    var _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        isLoading = _useState2[0],
        setIsLoading = _useState2[1];

    var _useState3 = (0, _react.useState)([]),
        _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
        data = _useState4[0],
        setData = _useState4[1];

    var _useState5 = (0, _react.useState)({ loaded: false, load: false, data: [] }),
        _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
        esclationData = _useState6[0],
        setEsclationData = _useState6[1];

    var _useState7 = (0, _react.useState)({}),
        _useState8 = (0, _slicedToArray3.default)(_useState7, 2),
        localityData = _useState8[0],
        setLocalityData = _useState8[1];

    var _useState9 = (0, _react.useState)(0),
        _useState10 = (0, _slicedToArray3.default)(_useState9, 2),
        count = _useState10[0],
        setCount = _useState10[1];

    var _useState11 = (0, _react.useState)({ all: 0, assignedToMe: 0, esclated: 0 }),
        _useState12 = (0, _slicedToArray3.default)(_useState11, 2),
        countData = _useState12[0],
        setCountData = _useState12[1];

    var _useState13 = (0, _react.useState)({}),
        _useState14 = (0, _slicedToArray3.default)(_useState13, 2),
        serviceCount = _useState14[0],
        setServiceCount = _useState14[1];

    var _useState15 = (0, _react.useState)({}),
        _useState16 = (0, _slicedToArray3.default)(_useState15, 2),
        wfSlaConfig = _useState16[0],
        setWfSlaConfig = _useState16[1];

    var _useState17 = (0, _react.useState)(false),
        _useState18 = (0, _slicedToArray3.default)(_useState17, 2),
        canLoadAll = _useState18[0],
        setLoadAll = _useState18[1];

    var _useState19 = (0, _react.useState)(false),
        _useState20 = (0, _slicedToArray3.default)(_useState19, 2),
        loadedAll = _useState20[0],
        setLoadedAll = _useState20[1];

    var _useState21 = (0, _react.useState)([]),
        _useState22 = (0, _slicedToArray3.default)(_useState21, 2),
        businessServices = _useState22[0],
        setBusinessServices = _useState22[1];

    var _useState23 = (0, _react.useState)({}),
        _useState24 = (0, _slicedToArray3.default)(_useState23, 2),
        localitySearcher = _useState24[0],
        setLocalitySearcher = _useState24[1];

    var _useState25 = (0, _react.useState)({}),
        _useState26 = (0, _slicedToArray3.default)(_useState25, 2),
        wfBusinessConfig = _useState26[0],
        setWfBusinessConfig = _useState26[1];

    var _useState27 = (0, _react.useState)({}),
        _useState28 = (0, _slicedToArray3.default)(_useState27, 2),
        applicationStates = _useState28[0],
        setApplicationStates = _useState28[1];

    var _useState29 = (0, _react.useState)({}),
        _useState30 = (0, _slicedToArray3.default)(_useState29, 2),
        paginationConfig = _useState30[0],
        setPaginationConfig = _useState30[1];

    var _useState31 = (0, _react.useState)({}),
        _useState32 = (0, _slicedToArray3.default)(_useState31, 2),
        inboxConfig = _useState32[0],
        setInboxConfig = _useState32[1];

    var _useState33 = (0, _react.useState)([]),
        _useState34 = (0, _slicedToArray3.default)(_useState33, 2),
        localities = _useState34[0],
        setSetLocalities = _useState34[1];

    (0, _react.useEffect)(function () {
        if (canLoadAll && !loadedAll) {

            businessServices.map(function (service) {
                setIsLoading(true);
                var limitOffsetObject = (0, _utils.getLimitAndOffset)(serviceCount[service]);
                Initdata({
                    businessService: service,
                    loadAllData: true,
                    serviceCount: serviceCount,
                    limit: limitOffsetObject.limit,
                    offset: limitOffsetObject.offset,
                    setCount: setCount, setServiceCount: setServiceCount, setData: setData,
                    setIsLoading: setIsLoading, setLocalityData: setLocalityData,
                    localityModule: localitySearcher[service],
                    wfSlaConfig: wfSlaConfig,
                    wfBusinessConfig: wfBusinessConfig,
                    setSetLocalities: setSetLocalities,
                    setApplicationStates: setApplicationStates
                });
            });
        }
    }, [canLoadAll, businessServices]);

    (0, _react.useEffect)(function () {
        if (esclationData.load) {
            setIsLoading(true);
            getEsclationRecords({
                setCountData: setCountData,
                setData: setEsclationData,
                setIsLoading: setIsLoading, setLocalityData: setLocalityData,
                localityModule: localitySearcher,
                wfSlaConfig: wfSlaConfig,
                wfBusinessConfig: wfBusinessConfig,
                setSetLocalities: setSetLocalities,
                setApplicationStates: setApplicationStates
            });
        }
    }, [esclationData]);

    (0, _react.useEffect)(function () {
        (0, _api.getInboxConfig)(user.permanentCity || "pb").then(function (response) {
            setWfSlaConfig(response.MdmsRes["common-masters"].wfSlaConfig[0]);
            setPaginationConfig(response.MdmsRes["common-masters"].TablePaginationOptions[0]);
            setInboxConfig(response.MdmsRes["common-masters"].CommonInboxConfig.reduce(function (prev, curr) {
                prev[curr.BusinessService] = curr;
                return (0, _extends3.default)({}, prev);
            }, {}));
            loadAssignedToMeCount(setCountData);
            setLocalitySearcher(response.MdmsRes["common-masters"].CommonInboxConfig.filter(function (config) {
                return config.locality;
            }).reduce(function (prev, curr) {
                prev[curr.BusinessService] = curr.localityModule;
                return (0, _extends3.default)({}, prev);
            }, {}));
            var businessServices = response.MdmsRes["common-masters"].CommonInboxConfig.filter(function (config) {
                return config.active;
            }) || [];
            if (user.tenantId) {
                businessServices = businessServices.filter(function (service) {
                    return (0, _utils.checkUserRole)(service.roles, props.user.roles.map(function (role) {
                        return role.code;
                    }));
                });
            }
            businessServices = businessServices.map(function (config) {
                return config.BusinessService;
            });
            // businessServices = ["NewTL"] //dev
            setBusinessServices(businessServices);
        });
        return function () {
            setData([]);
            setBusinessServices([]);
            setLocalityData({});
            setCount(0);
            setServiceCount({});
            setPaginationConfig({});
            setWfSlaConfig({});
            setInboxConfig({});
            setLocalitySearcher({});
        };
    }, []);

    (0, _react.useEffect)(function () {
        if (businessServices && businessServices.length > 0) {
            (0, _api.wfBusinessSearch)([{ key: "tenantId", value: user.tenantId }, { key: "businessServices", value: businessServices.join(',') }]).then(function (resp) {
                if (resp) {
                    var wfService = resp.BusinessServices.reduce(function (prev, curr) {
                        curr.MAX_SLA = (0, _utils.convertMillisecondsToDays)(curr.businessServiceSla);
                        prev[curr.businessService] = curr;
                        return (0, _extends3.default)({}, prev);
                    }, {});
                    return wfService;
                }
            }).then(function (updatedResp) {
                updatedResp && setWfBusinessConfig(function (state) {
                    return (0, _extends3.default)({}, state, updatedResp);
                });
                updatedResp && businessServices.map(function (service) {
                    setIsLoading(true);
                    Initdata({
                        businessService: service, setCount: setCount,
                        // businessServices.length>1?60:100
                        // limit: businessServices.length > 1 ? 20 : 40,  // dev
                        limit: businessServices.length > 1 ? 60 : 100,
                        offset: 0,
                        setServiceCount: setServiceCount, setData: setData, setIsLoading: setIsLoading,
                        setLocalityData: setLocalityData, localityModule: localitySearcher[service],
                        wfSlaConfig: wfSlaConfig,
                        wfBusinessConfig: updatedResp,
                        setSetLocalities: setSetLocalities,
                        setApplicationStates: setApplicationStates
                    });
                });
            });
        }
    }, [businessServices]);

    (0, _react.useEffect)(function () {
        if (serviceCount) {
            if (Object.values(serviceCount).every(function (service) {
                return service.loadedCount == service.totalCount || service.totalCount - service.loadedCount < 100;
            }) && loadedAll == false && canLoadAll == true) {
                setLoadedAll(true);
                setLoadAll(false);
            }
        }
    }, [serviceCount]);

    (0, _react.useEffect)(function () {
        if (count > 0) {
            setCountData(function (state) {
                return (0, _extends3.default)({}, state, { all: count });
            });
            !esclationData.loaded && !esclationData.load && setEsclationData({ loaded: false, load: true, data: [] });
        }
    }, [count]);

    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            'div',
            { style: { margin: "10px" } },
            _react2.default.createElement(_TableFilterWrapper2.default, { data: [].concat((0, _toConsumableArray3.default)(data)),
                count: count,
                countData: countData,
                esclationData: esclationData,
                inboxConfig: inboxConfig,
                t: t,
                historyComp: historyComp,
                esclatedComp: esclatedComp,
                uuid: user.uuid,
                applicationStates: applicationStates,
                localities: localities,
                loadedAll: loadedAll,
                header: Object.keys(sortOrder).reduce(function (prev, curr) {
                    prev[curr] = curr;
                    return (0, _extends3.default)({}, prev);
                }, {}),
                businessServices: businessServices,
                isLoading: isLoading,
                localityData: localityData,
                paginationConfig: paginationConfig,
                sortOrder: sortOrder,
                setBusinessServices: setBusinessServices,
                historyClick: historyClick,
                setLoadAll: setLoadAll,
                setEsclationData: setEsclationData,
                setData: setData,
                wfSlaConfig: wfSlaConfig,
                setIsLoading: setIsLoading,
                wfBusinessConfig: wfBusinessConfig
            })
        )
    );
};
var Inbox = function Inbox(props) {
    return _react2.default.createElement(
        _ErrorBoundary2.default,
        null,
        _react2.default.createElement(WfTable, props)
    );
};
exports.default = Inbox;