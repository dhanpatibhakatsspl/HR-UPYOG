"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inboxHelperFunction = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("./API/api");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortOrder = {
    'CS_INBOX_MODULE_FILTER': { order: 1, width: 70 },
    "WF_INBOX_HEADER_APPLICATION_NO": { order: 0, width: 100 },
    "WF_INBOX_HEADER_STATUS": { order: 2, width: 80 },
    "WF_INBOX_HEADER_LOCALITY": { order: 3, width: 90 },
    "WF_INBOX_HEADER_CURRENT_OWNER": { order: 4, width: 40 },
    "WF_INBOX_HEADER_SLA_DAYS_REMAINING": { order: 5, width: 70 }
    // "AppliedOn": 5,
};

var loadLocalityData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(localityService, businessIds, setLocalityData, setSetLocalities) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _api.getLocalityData)(localityService, businessIds).then(function (response) {
                            setLocalityData(function (state) {
                                return (0, _extends3.default)({}, state, response);
                            });
                            var localities = Object.values(response).reduce(function (prev, curr) {
                                prev[curr] = curr;
                                return (0, _extends3.default)({}, prev);
                            }, {});
                            setSetLocalities(function (state) {
                                return (0, _extends3.default)({}, state, localities);
                            });
                        });

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function loadLocalityData(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

var loadAssignedToMeCount = function loadAssignedToMeCount(setCountData) {
    try {
        (0, _api.wfSearch)([{ key: "tenantId", value: localStorage.getItem("inb-tenantId") }]).then(function (response) {
            return setCountData(function (state) {
                return (0, _extends3.default)({}, state, { assignedToMe: response.totalCount });
            });
        }).catch(function (err) {
            console.error(err);
        });
    } catch (e) {
        console.log(e);
    }
};

var Initdata = function Initdata(props) {

    try {
        var businessIds = [];
        var status = {};
        (0, _api.wfSearch)([{ key: "tenantId", value: localStorage.getItem("inb-tenantId") }, { key: "offset", value: props.offset || 0 }, { key: "limit", value: props.limit || "10" }, { key: "businessService", value: props.businessService }]).then(function (resp) {
            props.setServiceCount(function (state) {
                if (state[props.businessService]) {
                    var loadedCount = resp.ProcessInstances && resp.ProcessInstances.length || 0;
                    if (state[props.businessService].loadedCount) {
                        loadedCount += state[props.businessService].loadedCount;
                    }
                    state[props.businessService] = (0, _extends3.default)({}, state[props.businessService], { loadedCount: loadedCount });
                } else {
                    state[props.businessService] = { loadedCount: resp.ProcessInstances && resp.ProcessInstances.length || 0 };
                }
                return (0, _extends3.default)({}, state);
            });
            return resp.ProcessInstances.map(function (data) {
                businessIds.push(data.businessId);
                status["WF_" + data.businessService.toUpperCase() + "_" + data.state.state] = data.state.state;
                return (0, _utils.formatWFSearch)(data, props.wfSlaConfig, props.wfBusinessConfig);
            });
        }).then(function (resp) {
            props.setIsLoading(false);
            props.setData(function (state) {
                return state.concat(resp);
            });
            if (status) {
                props.setApplicationStates(function (state) {
                    return (0, _extends3.default)({}, state, status);
                });
            }
            if (props.localityModule && businessIds.length > 0) {
                loadLocalityData(props.localityModule, businessIds, props.setLocalityData, props.setSetLocalities);
            }
        }).catch(function (err) {
            props.setIsLoading(false);
            console.error(err);
        });

        //    loadAllData:true,
        // loadedCount:totalCount,

        if (!props.loadAllData) {
            (0, _api.workflowSearchCount)(props.businessService).then(function (resp) {
                resp && typeof resp == "number" && props.setServiceCount(function (state) {
                    if (state[props.businessService]) {
                        state[props.businessService] = (0, _extends3.default)({}, state[props.businessService], { totalCount: resp });
                    } else {
                        state[props.businessService] = { totalCount: resp };
                    }
                    return (0, _extends3.default)({}, state);
                });
                resp && typeof resp == "number" && props.setCount(function (state) {
                    return state + resp;
                });
            }).catch(function (err) {
                props.setIsLoading(false);
                console.error(err);
            });
        }
    } catch (e) {
        console.log(e);
    }
};

var getEsclationRecords = function getEsclationRecords(props) {

    try {
        var service = '';
        var businessIds = [];
        var status = {};
        (0, _api.wfEsclationSearch)([{ key: "tenantId", value: localStorage.getItem("inb-tenantId") }]).then(function (resp) {
            props.setCountData(function (state) {
                return (0, _extends3.default)({}, state, { esclated: resp.totalCount });
            });
            return resp.ProcessInstances.map(function (data) {
                businessIds.push(data.businessId);
                service = data.businessService;
                status["WF_" + data.businessService.toUpperCase() + "_" + data.state.state] = data.state.state;
                return (0, _utils.formatWFEsclatedSearch)(data, props.wfSlaConfig, props.wfBusinessConfig);
            });
        }).then(function (resp) {
            props.setIsLoading(false);
            props.setData({ loaded: true, load: false, data: resp });
            if (status) {
                props.setApplicationStates(function (state) {
                    return (0, _extends3.default)({}, state, status);
                });
            }
            if (props.localityModule && props.localityModule[service] && businessIds.length > 0) {
                loadLocalityData(props.localityModule[service], businessIds, props.setLocalityData, props.setSetLocalities);
            }
        }).catch(function (err) {
            props.setIsLoading(false);
            console.error(err);
        });
    } catch (e) {
        console.log(e);
    }
};

var inboxHelperFunction = exports.inboxHelperFunction = {
    Initdata: Initdata,
    loadLocalityData: loadLocalityData,
    sortOrder: sortOrder,
    loadAssignedToMeCount: loadAssignedToMeCount,
    getEsclationRecords: getEsclationRecords
};