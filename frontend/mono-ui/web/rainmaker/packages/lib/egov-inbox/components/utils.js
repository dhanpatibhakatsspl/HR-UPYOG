'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchLocalisation = exports.asyncForEach = exports.transformLocality = exports.getLimitAndOffset = exports.loadCompleteRecord = exports.convertQueryArgToString = exports.checkUserRole = exports.getUniqueArray = exports.getWfLink = exports.formatWFEsclatedSearch = exports.formatWFSearch = exports.getSlaColorAndType = exports.convertMillisecondsToDays = exports.mobileCheck = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _api = require('./API/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mobileCheck = exports.mobileCheck = function mobileCheck() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var convertMillisecondsToDays = exports.convertMillisecondsToDays = function convertMillisecondsToDays(milliseconds) {
    return Math.round(milliseconds / (1000 * 60 * 60 * 24));
};

var getSlaColorAndType = exports.getSlaColorAndType = function getSlaColorAndType(sla, businessService, wfSlaConfig, wfBusinessConfig) {
    var _ref = wfBusinessConfig[businessService] || {},
        _ref$MAX_SLA = _ref.MAX_SLA,
        MAX_SLA = _ref$MAX_SLA === undefined ? 0 : _ref$MAX_SLA;

    var slaColorType = { esclated: false, nearingEsclation: false, noneType: true, color: '#4CAF50' };
    if (wfSlaConfig) {
        if (MAX_SLA - MAX_SLA * wfSlaConfig.slotPercentage / 100 <= sla && sla <= MAX_SLA) {
            slaColorType.color = wfSlaConfig.positiveSlabColor;
        } else if (0 < sla && sla < MAX_SLA - MAX_SLA * wfSlaConfig.slotPercentage / 100) {
            slaColorType.nearingEsclation = true;
            slaColorType.noneType = false;
            slaColorType.color = wfSlaConfig.middleSlabColor;
        } else {
            slaColorType.esclated = true;
            slaColorType.noneType = false;
            slaColorType.color = wfSlaConfig.negativeSlabColor;
        }
    }
    if (!wfBusinessConfig || !wfBusinessConfig[businessService]) {
        slaColorType.notInitialised = true;
    }
    return slaColorType;
};

var formatWFSearch = exports.formatWFSearch = function formatWFSearch(data) {
    var wfSlaConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var wfBusinessConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var sla = data.businesssServiceSla && convertMillisecondsToDays(data.businesssServiceSla);
    var slaColorAndType = getSlaColorAndType(sla, data.businessService, wfSlaConfig, wfBusinessConfig);
    return {
        'CS_INBOX_MODULE_FILTER': 'CS_COMMON_INBOX_' + data.businessService,
        "BusinessId": data.businessId,
        "WF_INBOX_HEADER_APPLICATION_NO": data.businessId,
        "WF_INBOX_HEADER_STATUS": 'WF_' + data.businessService + '_' + data.state.state,
        "ModuleName": data.moduleName,
        "WF_INBOX_HEADER_CURRENT_OWNER": data.assignes && data.assignes[0] && data.assignes[0].name || "NA",
        "WF_INBOX_HEADER_SLA_DAYS_REMAINING": sla,
        "AppliedOn": new Date(data.auditDetails.createdTime).toLocaleDateString('id-ID'),
        "Esclated": data.escalated,
        "other": (0, _extends3.default)({
            'BusinessService': data.businessService,
            "State": data.state.state,
            uuid: data.assignes && data.assignes[0] && data.assignes[0].uuid,
            sla: data.businesssServiceSla
        }, slaColorAndType)
    };
};
var formatWFEsclatedSearch = exports.formatWFEsclatedSearch = function formatWFEsclatedSearch(data) {
    var wfSlaConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var wfBusinessConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return (0, _extends3.default)({}, formatWFSearch(data, wfSlaConfig, wfBusinessConfig), { Esclated: true });
};

var getWfLink = exports.getWfLink = function getWfLink() {
    var inboxConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var no = arguments[1];
    var service = arguments[2];

    var defaultUrl = inboxConfig[service].redirectConfig.DEFAULT || '';
    defaultUrl = defaultUrl.replace("^WFBID^", no);
    defaultUrl = defaultUrl.replace("^WFTNID^", localStorage.getItem("inb-tenantId"));
    return defaultUrl;
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var getUniqueArray = exports.getUniqueArray = function getUniqueArray(array) {
    return array.filter(onlyUnique);
};

var checkUserRole = exports.checkUserRole = function checkUserRole() {
    var mdmsRoles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var userRoles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var validService = false;
    mdmsRoles && mdmsRoles.map(function (mdmsRole) {
        if (userRoles && userRoles.includes(mdmsRole)) {
            validService = true;
        };
    });
    return validService;
};
var convertQueryArgToString = exports.convertQueryArgToString = function convertQueryArgToString() {
    var queryArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return queryArg.reduce(function (prev, curr) {
        return prev + ('' + (prev == "" ? "" : "&")) + curr.key + '=' + curr.value;
    }, '');
};

var loadCompleteRecord = exports.loadCompleteRecord = function loadCompleteRecord(_ref2) {
    var _ref2$limit = _ref2.limit,
        limit = _ref2$limit === undefined ? 100 : _ref2$limit,
        _ref2$offset = _ref2.offset,
        offset = _ref2$offset === undefined ? 0 : _ref2$offset,
        setLoadedAll = _ref2.setLoadedAll,
        setLoadAll = _ref2.setLoadAll,
        setData = _ref2.setData,
        setLocalityData = _ref2.setLocalityData,
        loadLocalityData = _ref2.loadLocalityData,
        localitySearcher = _ref2.localitySearcher;

    /* limit should have count data; */
    var businessIds = [];
    (0, _api.wfSearch)([{ key: "tenantId", value: "pb.amritsar" }, { key: "offset", value: offset }, { key: "limit", value: limit }]).then(function (resp) {
        return resp.ProcessInstances.map(function (data) {
            businessIds.push(data.businessId);
            return formatWFSearch(data);
        });
    }).then(function (response) {
        if (localitySearcher) {
            getUniqueArray(Object.values(localitySearcher)).map(function (key) {
                return loadLocalityData(key, businessIds, setLocalityData);
            });
        }
        setLoadedAll(true);
        setLoadAll(false);
        setData(response);
    });
};

var getLimitAndOffset = exports.getLimitAndOffset = function getLimitAndOffset() {
    var countObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _countObject$totalCou = countObject.totalCount,
        totalCount = _countObject$totalCou === undefined ? 0 : _countObject$totalCou,
        _countObject$loadedCo = countObject.loadedCount,
        loadedCount = _countObject$loadedCo === undefined ? 0 : _countObject$loadedCo;

    var limit = 0;
    var offset = 100;
    if (countObject) {
        limit = totalCount - loadedCount;
        offset = loadedCount;
    }
    // limit = 40 // dev
    return { limit: limit, offset: offset };
};

var transformLocality = exports.transformLocality = function transformLocality(locality) {
    var tenantId = localStorage.getItem("inb-tenantId");
    if (!tenantId || !locality) {
        return "COMMON_NA";
    }
    return tenantId.toUpperCase().replace(".", "_") + '_REVENUE_' + locality;
};

var asyncForEach = exports.asyncForEach = function asyncForEach(array, cb) {
    array.forEach(function (ele) {
        return setTimeout(cb.call(ele), 0);
    });
};

var fetchLocalisation = exports.fetchLocalisation = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var myHeaders, raw, requestOptions, localisationResponse, transformedData;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        myHeaders = new Headers();

                        myHeaders.append("Content-Type", "application/json");

                        raw = JSON.stringify({
                            "RequestInfo": {
                                "apiId": "emp",
                                "ver": "1.0",
                                "ts": "10-03-2017 00:00:00",
                                "action": "create",
                                "did": "1",
                                "key": "abcdkey",
                                "msgId": "20170310130900",
                                "requesterId": "jagan",
                                "authToken": "0849501b-e1e0-42b9-8bc6-970a2018ba8f",
                                "userInfo": {
                                    "id": 1
                                }
                            }
                        });
                        requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };
                        _context.next = 6;
                        return fetch(window.location.origin + '/localization/messages/v1/_search?locale=en_IN&tenantId=pb&module=rainmaker-common', requestOptions).then(function (response) {
                            return response.text();
                        }).then(function (result) {
                            return JSON.parse(result);
                        }).then(function (result) {
                            return result.messages;
                        }).catch(function (error) {
                            return console.log('error', error);
                        });

                    case 6:
                        localisationResponse = _context.sent;
                        transformedData = localisationResponse.reduce(function (curr, acm) {
                            curr[acm.code] = acm.message;
                            return (0, _extends3.default)({}, curr);
                        }, {});

                        localStorage.setItem("inbox-localisationData", JSON.stringify(transformedData));

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function fetchLocalisation() {
        return _ref3.apply(this, arguments);
    };
}();