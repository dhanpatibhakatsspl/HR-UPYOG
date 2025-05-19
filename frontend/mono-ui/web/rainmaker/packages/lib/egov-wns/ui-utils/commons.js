"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocaleLabels = exports.transformById = exports.getOpenSearchResultsForSewerage = exports.getOpenSearchResultsForWater = exports.getMdmsDataForBill = exports.isWorkflowExists = exports.getWaterSource = exports.showHideFieldsFirstStep = exports.isModifyModeAction = exports.isModifyMode = exports.isEditAction = exports.isActiveProperty = exports.getDomainLink = exports.downloadApp = exports.swEstimateCalculation = exports.waterSewerageBillingSearch = exports.waterEstimateCalculation = exports.findAndReplace = exports.downloadBill = exports.billingPeriodMDMS = exports.getSWMyResults = exports.wsDownloadConnectionDetails = exports.createMeterReading = exports.getPastPaymentsForSewerage = exports.getPastPaymentsForWater = exports.getMeterReadingData = exports.getMdmsDataForAutopopulated = exports.getMdmsDataForMeterStatus = exports.findItemInArrayOfObject = exports.handleApplicationNumberDisplay = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.applyForBothWaterAndSewerage = exports.applyForSewerage = exports.applyForWater = exports.applyForWaterOrSewerage = exports.getDisplayDocFormat = exports.checkValue = exports.dataExists = exports.prefillDocuments = exports.prepareDocUploadRedux = exports.downloadAndPrintForNonApply = exports.setWSDocuments = exports.setDocsForEditFlow = exports.prepareDocumentsUploadRedux = exports.prepareDocumentsUploadData = exports.handleMandatoryFeildsOfProperty = exports.validateFeildsForSewerage = exports.validateFeildsForWater = exports.validateConnHolderDetails = exports.validateFeildsForBothWaterAndSewerage = exports.getConsumptionDetails = exports.getPropertyResultsWODispatch = exports.getPropertyResults = exports.getWSMyResults = exports.getWorkFlowData = exports.fetchBill = exports.getDescriptionFromMDMS = exports.getSearchResultsForSewerage = exports.getSearchResults = exports.getPropertyObj = exports.getLocaleLabelsforTL = exports.updateTradeDetails = exports.pushTheDocsUploadedToRedux = exports.serviceConst = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _commons = require("egov-common/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _commons3 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../ui-config/screens/specs/utils");

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceConst = exports.serviceConst = {
    "WATER": "WATER",
    "SEWERAGE": "SEWERAGE"
};

var pushTheDocsUploadedToRedux = exports.pushTheDocsUploadedToRedux = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
        var reduxDocuments, uploadedDocs;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        reduxDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux", {});
                        uploadedDocs = [];

                        if (reduxDocuments !== null && reduxDocuments !== undefined) {
                            dispatch((0, _actions.prepareFinalObject)("DocumentsData", []));
                            Object.keys(reduxDocuments).forEach(function () {
                                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key) {
                                    var docArrayFromFileStore, docs, applyScreenObject, applyScreenObj;
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!(reduxDocuments !== undefined && reduxDocuments[key] !== undefined && reduxDocuments[key].documents !== undefined)) {
                                                        _context.next = 17;
                                                        break;
                                                    }

                                                    reduxDocuments[key].documents.forEach(function (element) {
                                                        if (reduxDocuments[key].dropdown !== undefined) {
                                                            element.documentType = reduxDocuments[key].dropdown.value;
                                                        } else {
                                                            element.documentType = reduxDocuments[key].documentType;
                                                        }
                                                        element.documentCode = reduxDocuments[key].documentCode;
                                                        element.status = "ACTIVE";
                                                        element.id = reduxDocuments[key].id;
                                                    });
                                                    uploadedDocs = uploadedDocs.concat(reduxDocuments[key].documents);
                                                    dispatch((0, _actions.prepareFinalObject)("applyScreen.documents", uploadedDocs));
                                                    _context.next = 6;
                                                    return setDocsForEditFlow(state);

                                                case 6:
                                                    docArrayFromFileStore = _context.sent;

                                                    uploadedDocs.forEach(function (obj) {
                                                        var element = obj.fileStoreId;
                                                        Object.keys(docArrayFromFileStore).forEach(function (resp) {
                                                            docArrayFromFileStore[resp].forEach(function (arr) {
                                                                if (arr.fileStoreId === element) {
                                                                    obj.fileName = arr.fileName;
                                                                }
                                                            });
                                                        });
                                                    });
                                                    docs = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
                                                    _context.next = 11;
                                                    return (0, _commons2.setDocuments)(docs, "applyScreen.documents", "UploadedDocs", dispatch, "WS");

                                                case 11:
                                                    _context.next = 13;
                                                    return (0, _commons2.setDocuments)(docs, "applyScreen.documents", "DocumentsData", dispatch, "WS");

                                                case 13:
                                                    applyScreenObject = findAndReplace((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
                                                    applyScreenObj = findAndReplace(applyScreenObject, 0, null);

                                                    dispatch((0, _actions.prepareFinalObject)("applyScreen", applyScreenObj));
                                                    if ((0, _commons2.getQueryArg)(window.location.href, "action") === "edit") {
                                                        dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", applyScreenObj));
                                                    }

                                                case 17:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined);
                                }));

                                return function (_x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        }

                    case 3:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function pushTheDocsUploadedToRedux(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var updateTradeDetails = exports.updateTradeDetails = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(requestBody) {
        var payload;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], requestBody);

                    case 3:
                        payload = _context3.sent;
                        return _context3.abrupt("return", payload);

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](0);

                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, _context3.t0.message, "error"));

                    case 10:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function updateTradeDetails(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var getLocaleLabelsforTL = exports.getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
    alert(1);
    if (labelKey) {
        var translatedLabel = (0, _utils.getTranslatedLabel)(labelKey, localizationLabels);
        if (!translatedLabel || labelKey === translatedLabel) {
            return label;
        } else {
            return translatedLabel;
        }
    } else {
        return label;
    }
};

var getPropertyObj = exports.getPropertyObj = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(waterConnection, locality, tenantId, isFromSearch) {
        var uuidsArray, uuids, propertyArr, i, queryObject1, payload, j, tempPropertyObj;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        uuidsArray = [];
                        uuids = "";
                        propertyArr = [];
                        i = 0;

                    case 4:
                        if (!(i < waterConnection.length)) {
                            _context4.next = 26;
                            break;
                        }

                        if (!(waterConnection[i].propertyId && waterConnection[i].propertyId !== null && waterConnection[i].propertyId !== "NA")) {
                            _context4.next = 22;
                            break;
                        }

                        if (!uuidsArray.includes(waterConnection[i]['propertyId'])) {
                            uuidsArray.push(waterConnection[i]['propertyId']);
                            uuids += waterConnection[i]['propertyId'] + ",";
                        }

                        if (!(uuidsArray.length % 50 === 0 || uuidsArray.length > 0 && i === waterConnection.length - 1)) {
                            _context4.next = 20;
                            break;
                        }

                        queryObject1 = [];

                        uuids = uuids.substring(0, uuids.length - 1);
                        if (process.env.REACT_APP_NAME === "Citizen") {
                            queryObject1 = [{ key: "propertyIds", value: uuids }];
                        } else {
                            queryObject1 = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantIdCommon)() }, { key: "propertyIds", value: uuids }];
                        }

                        if (locality) {
                            queryObject1.push({ key: "locality", value: locality });
                        }
                        if (tenantId) {
                            queryObject1.push({ key: "tenantId", value: tenantId });
                        }

                        if (!(!window.location.href.includes("propertyId") || isFromSearch)) {
                            _context4.next = 18;
                            break;
                        }

                        _context4.next = 16;
                        return getPropertyResultsWODispatch(queryObject1);

                    case 16:
                        payload = _context4.sent;

                        if (payload.Properties.length > 0) {
                            for (j = 0; j < payload.Properties.length; j++) {
                                propertyArr[payload.Properties[j].propertyId] = payload.Properties[j];
                            }
                        }

                    case 18:
                        uuids = "";
                        uuidsArray = [];

                    case 20:
                        _context4.next = 23;
                        break;

                    case 22:
                        waterConnection[i].property = null;

                    case 23:
                        i++;
                        _context4.next = 4;
                        break;

                    case 26:
                        tempPropertyObj = null;

                        if (Object.keys(propertyArr).length > 0) {
                            for (i = 0; i < waterConnection.length; i++) {
                                if (waterConnection[i].propertyId && waterConnection[i].propertyId !== null && waterConnection[i].propertyId !== "NA") {
                                    if (propertyArr[waterConnection[i].propertyId]) {
                                        tempPropertyObj = propertyArr[waterConnection[i].propertyId] ? propertyArr[waterConnection[i].propertyId] : null;
                                        waterConnection[i].property = tempPropertyObj;
                                        waterConnection[i].tenantId = tempPropertyObj && tempPropertyObj.tenantId ? tempPropertyObj.tenantId : null;
                                        tempPropertyObj = null;
                                    }
                                }
                            }
                        }
                        if ((0, _get2.default)(waterConnection[0], "property.owners")) {
                            waterConnection[0].property.owners = waterConnection[0].property.owners.filter(function (owner) {
                                return owner.status == "ACTIVE";
                            });
                        }
                        if ((0, _get2.default)(waterConnection[0], "property.units") == "NA" && (0, _get2.default)(waterConnection[0], "property.additionalDetails") && (0, _get2.default)(waterConnection[0], "property.additionalDetails.subUsageCategory")) {
                            waterConnection[0].property.units = [];
                            waterConnection[0].property.units.push({ usageCategory: (0, _get2.default)(waterConnection[0], "property.additionalDetails.subUsageCategory") });
                        }
                        return _context4.abrupt("return", waterConnection);

                    case 31:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function getPropertyObj(_x5, _x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var getSearchResults = exports.getSearchResults = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var response, currentTime, result, waterSource, waterSubSource;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_search", "_search", queryObject);

                    case 3:
                        response = _context5.sent;

                        if (!(response.WaterConnection && response.WaterConnection.length == 0)) {
                            _context5.next = 6;
                            break;
                        }

                        return _context5.abrupt("return", response);

                    case 6:
                        currentTime = new Date().getTime();

                        if (filter) {
                            response.WaterConnection = response.WaterConnection.filter(function (app) {
                                return currentTime > app.dateEffectiveFrom && (app.applicationStatus == 'APPROVED' || app.applicationStatus == 'CONNECTION_ACTIVATED');
                            });
                            response.WaterConnection = response.WaterConnection.sort(function (row1, row2) {
                                return row2.auditDetails.createdTime - row1.auditDetails.createdTime;
                            });
                        }

                        result = findAndReplace(response, null, "NA");

                        result.WaterConnection[0].waterSourceSubSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource;
                        waterSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource.split(".")[0];
                        waterSubSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource.split(".")[1];

                        result.WaterConnection[0].waterSource = waterSource;
                        result.WaterConnection[0].waterSubSource = waterSubSource;
                        _context5.next = 16;
                        return getPropertyObj(result.WaterConnection);

                    case 16:
                        result.WaterConnection = _context5.sent;
                        return _context5.abrupt("return", result);

                    case 20:
                        _context5.prev = 20;
                        _context5.t0 = _context5["catch"](0);

                    case 22:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 20]]);
    }));

    return function getSearchResults(_x9) {
        return _ref5.apply(this, arguments);
    };
}();

var getSearchResultsForSewerage = exports.getSearchResultsForSewerage = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(queryObject, dispatch) {
        var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var response, currentTime, result;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context6.prev = 1;
                        _context6.next = 4;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_search", "_search", queryObject);

                    case 4:
                        response = _context6.sent;

                        if (!(response.SewerageConnections && response.SewerageConnections.length == 0)) {
                            _context6.next = 8;
                            break;
                        }

                        dispatch((0, _actions.toggleSpinner)());
                        return _context6.abrupt("return", response);

                    case 8:
                        currentTime = new Date().getTime();

                        if (filter) {
                            response.SewerageConnections = response.SewerageConnections.filter(function (app) {
                                return currentTime > app.dateEffectiveFrom && (app.applicationStatus == 'APPROVED' || app.applicationStatus == 'CONNECTION_ACTIVATED');
                            });
                            response.SewerageConnections = response.SewerageConnections.sort(function (row1, row2) {
                                return row2.auditDetails.createdTime - row1.auditDetails.createdTime;
                            });
                        }
                        result = findAndReplace(response, null, "NA");
                        _context6.next = 13;
                        return getPropertyObj(result.SewerageConnections);

                    case 13:
                        result.SewerageConnections = _context6.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context6.abrupt("return", result);

                    case 18:
                        _context6.prev = 18;
                        _context6.t0 = _context6["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 21:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[1, 18]]);
    }));

    return function getSearchResultsForSewerage(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

var getDescriptionFromMDMS = exports.getDescriptionFromMDMS = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(requestBody, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context7.prev = 1;
                        _context7.next = 4;
                        return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

                    case 4:
                        response = _context7.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context7.abrupt("return", findAndReplace(response, null, "NA"));

                    case 9:
                        _context7.prev = 9;
                        _context7.t0 = _context7["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());
                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context7.t0.message, labelCode: _context7.t0.message }, "error"));

                    case 13:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 9]]);
    }));

    return function getDescriptionFromMDMS(_x14, _x15) {
        return _ref7.apply(this, arguments);
    };
}();

var fetchBill = exports.fetchBill = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context8.prev = 1;
                        _context8.next = 4;
                        return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "_fetchBill", queryObject);

                    case 4:
                        response = _context8.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context8.abrupt("return", findAndReplace(response, null, "NA"));

                    case 9:
                        _context8.prev = 9;
                        _context8.t0 = _context8["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 12:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[1, 9]]);
    }));

    return function fetchBill(_x16, _x17) {
        return _ref8.apply(this, arguments);
    };
}();

//Workflow process instances for application status
var getWorkFlowData = exports.getWorkFlowData = function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(queryObject) {
        var response;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;
                        _context9.next = 3;
                        return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "_search", queryObject);

                    case 3:
                        response = _context9.sent;
                        return _context9.abrupt("return", response);

                    case 7:
                        _context9.prev = 7;
                        _context9.t0 = _context9["catch"](0);

                    case 9:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[0, 7]]);
    }));

    return function getWorkFlowData(_x18) {
        return _ref9.apply(this, arguments);
    };
}();

var getWSMyResults = exports.getWSMyResults = function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(queryObject, consumer, dispatch) {
        var response, i, consumerCode, bService, data;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context10.prev = 1;
                        _context10.next = 4;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_search", "_search", queryObject);

                    case 4:
                        response = _context10.sent;

                        if (!(response.WaterConnection.length > 0)) {
                            _context10.next = 28;
                            break;
                        }

                        _context10.next = 8;
                        return getPropertyObj(response.WaterConnection);

                    case 8:
                        response.WaterConnection = _context10.sent;
                        i = 0;

                    case 10:
                        if (!(i < response.WaterConnection.length)) {
                            _context10.next = 28;
                            break;
                        }

                        response.WaterConnection[i].service = _.capitalize(serviceConst.WATER);
                        consumerCode = "", bService = "";

                        if (consumer === 'APPLICATION') {
                            consumerCode = response.WaterConnection[i].applicationNo;
                            bService = 'WS.ONE_TIME_FEE';
                        } else if (consumer === 'CONNECTION') {
                            consumerCode = response.WaterConnection[i].connectionNo;
                            bService = 'WS';
                        }

                        if (!(consumerCode !== null && consumerCode !== undefined)) {
                            _context10.next = 25;
                            break;
                        }

                        _context10.prev = 15;
                        _context10.next = 18;
                        return (0, _api.httpRequest)("post", "billing-service/bill/v2/_fetchbill", "_fetchbill", [{
                            key: "consumerCode",
                            value: consumerCode
                        }, {
                            key: "tenantId",
                            value: response.WaterConnection[i].property.tenantId
                        }, {
                            key: "businessService",
                            value: bService
                        }]);

                    case 18:
                        data = _context10.sent;

                        if (data && data !== undefined) {
                            if (data.Bill !== undefined && data.Bill.length > 0) {
                                if (data.Bill[0].totalAmount !== 0) {
                                    response.WaterConnection[i].due = data.Bill[0].totalAmount;
                                } else {
                                    response.WaterConnection[i].due = "NA";
                                }
                            }
                        } else {
                            response.WaterConnection[i].due = 0;
                        }

                        _context10.next = 25;
                        break;

                    case 22:
                        _context10.prev = 22;
                        _context10.t0 = _context10["catch"](15);

                        response.WaterConnection[i].due = "NA";

                    case 25:
                        i++;
                        _context10.next = 10;
                        break;

                    case 28:
                        dispatch((0, _actions.toggleSpinner)());
                        return _context10.abrupt("return", findAndReplace(response, null, "NA"));

                    case 32:
                        _context10.prev = 32;
                        _context10.t1 = _context10["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 35:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, undefined, [[1, 32], [15, 22]]);
    }));

    return function getWSMyResults(_x19, _x20, _x21) {
        return _ref10.apply(this, arguments);
    };
}();

var getPropertyResults = exports.getPropertyResults = function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(queryObject, dispatch) {
        var response, k, i;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context11.prev = 1;
                        _context11.next = 4;
                        return (0, _api.httpRequest)("post", "/property-services/property/_search", "_search", queryObject);

                    case 4:
                        response = _context11.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        if (response && response.Properties && response.Properties.length > 0) {
                            for (k = 0; k < response.Properties.length; k++) {
                                if (response.Properties[k] && response.Properties[k].owners && response.Properties[k].owners.length > 0) {
                                    if (response.Properties[k].ownershipCategory == "INDIVIDUAL.SINGLEOWNER" || response.Properties[k].ownershipCategory == "INDIVIDUAL.MULTIPLEOWNERS") {
                                        for (i = 0; i < response.Properties[k].owners.length; i++) {
                                            response.Properties[k].owners[i].correspondenceAddress = response.Properties[k].owners[i].permanentAddress;
                                        }
                                    }
                                }
                            }
                        }
                        return _context11.abrupt("return", findAndReplace(response, null, "NA"));

                    case 10:
                        _context11.prev = 10;
                        _context11.t0 = _context11["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 13:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, undefined, [[1, 10]]);
    }));

    return function getPropertyResults(_x22, _x23) {
        return _ref11.apply(this, arguments);
    };
}();

var getPropertyResultsWODispatch = exports.getPropertyResultsWODispatch = function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(queryObject) {
        var response, k, i;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.prev = 0;
                        _context12.next = 3;
                        return (0, _api.httpRequest)("post", "/property-services/property/_search", "_search", queryObject);

                    case 3:
                        response = _context12.sent;

                        if (response && response.Properties && response.Properties.length > 0) {
                            for (k = 0; k < response.Properties.length; k++) {
                                if (response.Properties[k] && response.Properties[k].owners && response.Properties[k].owners.length > 0) {
                                    if (response.Properties[k].ownershipCategory == "INDIVIDUAL.SINGLEOWNER" || response.Properties[k].ownershipCategory == "INDIVIDUAL.MULTIPLEOWNERS") {
                                        for (i = 0; i < response.Properties[k].owners.length; i++) {
                                            response.Properties[k].owners[i].correspondenceAddress = response.Properties[k].owners[i].permanentAddress;
                                        }
                                    }
                                }
                            }
                        }
                        return _context12.abrupt("return", findAndReplace(response, null, "NA"));

                    case 8:
                        _context12.prev = 8;
                        _context12.t0 = _context12["catch"](0);

                    case 10:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, undefined, [[0, 8]]);
    }));

    return function getPropertyResultsWODispatch(_x24) {
        return _ref12.apply(this, arguments);
    };
}();

var getConsumptionDetails = exports.getConsumptionDetails = function () {
    var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context13.prev = 1;
                        _context13.next = 4;
                        return (0, _api.httpRequest)("post", "/ws-calculator/meterConnection/_search", "_search", queryObject);

                    case 4:
                        response = _context13.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context13.abrupt("return", findAndReplace(response, null, "NA"));

                    case 9:
                        _context13.prev = 9;
                        _context13.t0 = _context13["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());
                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context13.t0.message, labelCode: _context13.t0.message }, "error"));

                    case 13:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, undefined, [[1, 9]]);
    }));

    return function getConsumptionDetails(_x25, _x26) {
        return _ref13.apply(this, arguments);
    };
}();

var validateFeildsForBothWaterAndSewerage = exports.validateFeildsForBothWaterAndSewerage = function validateFeildsForBothWaterAndSewerage(applyScreenObject) {
    var rValue = false;
    if (applyScreenObject.hasOwnProperty("property") && applyScreenObject['property'] !== undefined && applyScreenObject["property"] !== "") {
        rValue = true;
        if (isModifyMode()) {
            return rValue;
        }
    }
    if (rValue && applyScreenObject.hasOwnProperty("water") && applyScreenObject["water"] !== undefined && applyScreenObject["water"] !== "" && applyScreenObject.hasOwnProperty("sewerage") && applyScreenObject["sewerage"] !== undefined && applyScreenObject["sewerage"] !== "" && applyScreenObject.hasOwnProperty("proposedTaps") && applyScreenObject["proposedTaps"] !== undefined && applyScreenObject["proposedTaps"] !== "" && applyScreenObject["proposedTaps"].toString().match(/^[0-9]*$/i) && applyScreenObject.hasOwnProperty("proposedPipeSize") && applyScreenObject["proposedPipeSize"] !== undefined && applyScreenObject["proposedPipeSize"] !== "" && applyScreenObject.hasOwnProperty("proposedWaterClosets") && applyScreenObject["proposedWaterClosets"] !== undefined && applyScreenObject["proposedWaterClosets"] !== "" && applyScreenObject["proposedWaterClosets"].toString().match(/^[0-9]*$/i) && applyScreenObject.hasOwnProperty("proposedToilets") && applyScreenObject["proposedToilets"] !== undefined && applyScreenObject["proposedToilets"] !== "" && applyScreenObject["proposedToilets"].toString().match(/^[0-9]*$/i)) {
        return true;
    } else {
        return false;
    }
};

var validateConnHolderDetails = exports.validateConnHolderDetails = function validateConnHolderDetails(holderData) {
    if (holderData.connectionHolders == null) {
        return true;
    } else if (holderData.connectionHolders && holderData.connectionHolders.length > 0) {
        var holderOwners = holderData.connectionHolders;
        var valid = [];
        for (var i = 0; i < holderOwners.length; i++) {
            if (holderOwners[i].hasOwnProperty("mobileNumber") && holderOwners[i]['mobileNumber'] !== undefined && holderOwners[i]["mobileNumber"] !== "" && holderOwners[i].hasOwnProperty("name") && holderOwners[i]['name'] !== undefined && holderOwners[i]["name"] !== "" && holderOwners[i].hasOwnProperty("fatherOrHusbandName") && holderOwners[i]['fatherOrHusbandName'] !== undefined && holderOwners[i]["fatherOrHusbandName"] !== "" && holderOwners[i].hasOwnProperty("correspondenceAddress") && holderOwners[i]['correspondenceAddress'] !== undefined && holderOwners[i]["correspondenceAddress"] !== "" && holderOwners[i].hasOwnProperty("gender") && holderOwners[i]["gender"] !== undefined && holderOwners[i]["gender"] !== "" && holderOwners[i].hasOwnProperty("ownerType") && holderOwners[i]["ownerType"] !== undefined && holderOwners[i]["ownerType"] !== "" && holderOwners[i].hasOwnProperty("relationship") && holderOwners[i]["relationship"] !== undefined && holderOwners[i]["relationship"] !== "") {
                valid.push(1);
            } else {
                valid.push(0);
            }
        }
        if (valid.includes(0)) {
            return false;
        } else {
            return true;
        }
    }
};

var validateFeildsForWater = exports.validateFeildsForWater = function validateFeildsForWater(applyScreenObject) {
    var rValue = false;
    if (applyScreenObject.hasOwnProperty("property") && applyScreenObject['property'] !== undefined && applyScreenObject["property"] !== "") {
        rValue = true;
        if (isModifyMode()) {
            return rValue;
        }
    }
    if (rValue && applyScreenObject.hasOwnProperty("property") && applyScreenObject['property'] !== undefined && applyScreenObject["property"] !== "" && applyScreenObject.hasOwnProperty("water") && applyScreenObject["water"] !== undefined && applyScreenObject["water"] !== "" && applyScreenObject.hasOwnProperty("sewerage") && applyScreenObject["sewerage"] !== undefined && applyScreenObject["sewerage"] !== "" && applyScreenObject.hasOwnProperty("proposedTaps") && applyScreenObject["proposedTaps"] !== undefined && applyScreenObject["proposedTaps"] !== "" && applyScreenObject["proposedTaps"].toString().match(/^[0-9]*$/i) && applyScreenObject.hasOwnProperty("proposedPipeSize") && applyScreenObject["proposedPipeSize"] !== undefined && applyScreenObject["proposedPipeSize"] !== "") {
        return true;
    } else {
        return false;
    }
};

var validateFeildsForSewerage = exports.validateFeildsForSewerage = function validateFeildsForSewerage(applyScreenObject) {
    var rValue = false;
    if (applyScreenObject.hasOwnProperty("property") && applyScreenObject['property'] !== undefined && applyScreenObject["property"] !== "") {
        rValue = true;
        if (isModifyMode()) {
            return rValue;
        }
    }
    if (rValue && applyScreenObject.hasOwnProperty("water") && applyScreenObject["water"] !== undefined && applyScreenObject["water"] !== "" && applyScreenObject.hasOwnProperty("sewerage") && applyScreenObject["sewerage"] !== undefined && applyScreenObject["sewerage"] !== "" && applyScreenObject.hasOwnProperty("proposedWaterClosets") && applyScreenObject["proposedWaterClosets"] !== undefined && applyScreenObject["proposedWaterClosets"] !== "" && applyScreenObject["proposedWaterClosets"].toString().match(/^[0-9]*$/i) && applyScreenObject.hasOwnProperty("proposedToilets") && applyScreenObject["proposedToilets"] !== undefined && applyScreenObject["proposedToilets"] !== "" && applyScreenObject["proposedToilets"].toString().match(/^[0-9]*$/i)) {
        return true;
    } else {
        return false;
    }
};

var handleMandatoryFeildsOfProperty = exports.handleMandatoryFeildsOfProperty = function handleMandatoryFeildsOfProperty(applyScreenObject) {
    var propertyObject = findAndReplace(applyScreenObject, "NA", null);
    if (propertyObject.hasOwnProperty("propertyId") && propertyObject['propertyId'] !== undefined && propertyObject["propertyId"] !== "" && propertyObject.hasOwnProperty("propertyType") && propertyObject["propertyType"] !== undefined && propertyObject["propertyType"] !== "" && propertyObject.hasOwnProperty("usageCategory") && propertyObject["usageCategory"] !== undefined && propertyObject["usageCategory"] !== "" && propertyObject.hasOwnProperty("landArea") && propertyObject["landArea"] !== undefined && propertyObject["landArea"] !== "" &&
    // propertyObject.hasOwnProperty("rainWaterHarvesting") && propertyObject["rainWaterHarvesting"] !== undefined && propertyObject["rainWaterHarvesting"] !== "" &&
    propertyObject.hasOwnProperty("owners") && propertyObject["owners"] !== undefined && propertyObject["owners"] !== "" && validatePropertyOwners(applyScreenObject) && handleAddressObjectInProperty(applyScreenObject.address)) {
        return true;
    } else {
        return false;
    }
};

var handleAddressObjectInProperty = function handleAddressObjectInProperty(address) {
    if (address !== undefined && address !== null && address !== {}) {
        if (address.hasOwnProperty("city") && address['city'] !== undefined && address["city"] !== "" && address["city"] !== null && address.hasOwnProperty("doorNo") && address["doorNo"] !== undefined && address["doorNo"] !== "" && address["doorNo"] !== null && address.hasOwnProperty("locality") && address.locality.name !== undefined && address.locality.name !== "" && address.locality.name !== null) {
            return true;
        } else {
            return false;
        }
    }
};

var validatePropertyOwners = function validatePropertyOwners(applyScreenObject) {
    if (applyScreenObject.owners && applyScreenObject.owners.length > 0) {
        var owners = applyScreenObject.owners;
        var valid = [];
        for (var i = 0; i < owners.length; i++) {
            if (owners[i].hasOwnProperty("mobileNumber") && owners[i]['mobileNumber'] !== undefined && owners[i]["mobileNumber"] !== "" && owners[i].hasOwnProperty("name") && owners[i]['name'] !== undefined && owners[i]["name"] !== "" && owners[i].hasOwnProperty("fatherOrHusbandName") && owners[i]['fatherOrHusbandName'] !== undefined && owners[i]["fatherOrHusbandName"] !== "" && owners[i].hasOwnProperty("correspondenceAddress") && owners[i]['correspondenceAddress'] !== undefined && owners[i]["correspondenceAddress"] !== "") {
                valid.push(1);
            } else {
                valid.push(0);
            }
        }
        if (valid.includes(0)) {
            return false;
        } else {
            return true;
        }
    }
};

var prepareDocumentsUploadData = exports.prepareDocumentsUploadData = function prepareDocumentsUploadData(state, dispatch) {
    var currentDoc = isModifyMode() ? 'ModifyConnectionDocuments' : 'Documents';
    var documents = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.ws-services-masters." + currentDoc, []);
    documents = documents.filter(function (item) {
        return item.active;
    });
    var documentsContract = [];
    var tempDoc = {};
    documents.forEach(function (doc) {
        var card = {};
        card["code"] = doc.documentType;
        card["title"] = doc.documentType;
        card["cards"] = [];
        tempDoc[doc.documentType] = card;
    });

    documents.forEach(function (doc) {
        // Handle the case for multiple muildings
        var card = {};
        card["name"] = doc.code;
        card["code"] = doc.code;
        card["required"] = doc.required ? true : false;
        if (doc.hasDropdown && doc.dropdownData) {
            var dropdown = {};
            dropdown.label = "WS_SELECT_DOC_DD_LABEL";
            dropdown.required = true;
            dropdown.menu = doc.dropdownData.filter(function (item) {
                return item.active;
            });
            dropdown.menu = dropdown.menu.map(function (item) {
                return { code: item.code, label: (0, _commons2.getTransformedLocale)(item.code), name: (0, _commons2.getTransformedLocale)(item.code) };
            });
            card["dropdown"] = dropdown;
        }
        tempDoc[doc.documentType].cards.push(card);
    });

    Object.keys(tempDoc).forEach(function (key) {
        documentsContract.push(tempDoc[key]);
    });

    dispatch((0, _actions.prepareFinalObject)("documentsContract", documentsContract));
};

var parserFunction = function parserFunction(state) {
    var queryObject = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen", {})));
    var parsedObject = {
        roadCuttingArea: parseInt(queryObject.roadCuttingArea),
        meterInstallationDate: (0, _utils.convertDateToEpoch)(queryObject.meterInstallationDate),
        connectionExecutionDate: (0, _utils.convertDateToEpoch)(queryObject.connectionExecutionDate),
        dateEffectiveFrom: (0, _utils.convertDateToEpoch)(queryObject.dateEffectiveFrom),
        proposedWaterClosets: parseInt(queryObject.proposedWaterClosets),
        proposedToilets: parseInt(queryObject.proposedToilets),
        noOfTaps: parseInt(queryObject.noOfTaps),
        noOfWaterClosets: parseInt(queryObject.noOfWaterClosets),
        noOfToilets: parseInt(queryObject.noOfToilets),
        proposedTaps: parseInt(queryObject.proposedTaps),
        propertyId: queryObject.property ? queryObject.property.propertyId : null,
        additionalDetails: {
            initialMeterReading: queryObject.additionalDetails !== undefined && queryObject.additionalDetails.initialMeterReading !== undefined ? parseFloat(queryObject.additionalDetails.initialMeterReading) : null,
            detailsProvidedBy: queryObject.additionalDetails !== undefined && queryObject.additionalDetails.detailsProvidedBy !== undefined && queryObject.additionalDetails.detailsProvidedBy !== null ? queryObject.additionalDetails.detailsProvidedBy : ""
        }
    };
    queryObject = (0, _extends3.default)({}, queryObject, parsedObject);
    return queryObject;
};

var prepareDocumentsUploadRedux = exports.prepareDocumentsUploadRedux = function () {
    var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(state, dispatch) {
        var documentsUploadRedux, documentsList, index;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        documentsUploadRedux = state.screenConfiguration.preparedFinalObject.documentsUploadRedux;
                        documentsList = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsContract", []);
                        index = 0;

                        documentsList.forEach(function (docType) {
                            docType.cards && docType.cards.forEach(function (card) {
                                if (card.subCards) {
                                    card.subCards.forEach(function (subCard) {
                                        var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
                                        var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
                                        var oldDocSubCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentSubCode");
                                        if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
                                            documentsUploadRedux[index] = {
                                                documentType: docType.code,
                                                documentCode: card.name,
                                                documentSubCode: subCard.name
                                            };
                                        }
                                        index++;
                                    });
                                } else {
                                    var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
                                    var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
                                    if (oldDocType != docType.code || oldDocCode != card.name) {
                                        documentsUploadRedux[index] = {
                                            documentType: docType.code,
                                            documentCode: card.name,
                                            isDocumentRequired: card.required,
                                            isDocumentTypeRequired: card.dropdown ? card.dropdown.required : false
                                        };
                                    }
                                }
                                index++;
                            });
                        });
                        (0, _actions.prepareFinalObject)("documentsUploadRedux", documentsUploadRedux);

                    case 5:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, undefined);
    }));

    return function prepareDocumentsUploadRedux(_x27, _x28) {
        return _ref14.apply(this, arguments);
    };
}();

var setDocsForEditFlow = exports.setDocsForEditFlow = function () {
    var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(state) {
        var applicationDocuments, uploadedDocuments, fileStoreIds, fileUrlPayload;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        applicationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.documents", []);
                        uploadedDocuments = {};
                        fileStoreIds = applicationDocuments && applicationDocuments.map(function (item) {
                            return item.fileStoreId;
                        }).join(",");
                        _context15.t0 = fileStoreIds;

                        if (!_context15.t0) {
                            _context15.next = 8;
                            break;
                        }

                        _context15.next = 7;
                        return (0, _commons2.getFileUrlFromAPI)(fileStoreIds);

                    case 7:
                        _context15.t0 = _context15.sent;

                    case 8:
                        fileUrlPayload = _context15.t0;

                        if (fileUrlPayload !== undefined && fileUrlPayload !== null) {
                            applicationDocuments && applicationDocuments.forEach(function (item, index) {
                                uploadedDocuments[index] = [{
                                    fileName: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent((0, _commons2.getFileUrl)(fileUrlPayload[item.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1),
                                    fileStoreId: item.fileStoreId,
                                    fileUrl: Object.values(fileUrlPayload)[index]
                                }];
                            });
                        }
                        return _context15.abrupt("return", uploadedDocuments);

                    case 11:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, undefined);
    }));

    return function setDocsForEditFlow(_x29) {
        return _ref15.apply(this, arguments);
    };
}();

var setWSDocuments = exports.setWSDocuments = function () {
    var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(payload, sourceJsonPath, businessService) {
        var uploadedDocData, fileStoreIds, fileUrlPayload, reviewDocData;
        return _regenerator2.default.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        uploadedDocData = (0, _get2.default)(payload, sourceJsonPath);

                        if (!(uploadedDocData !== "NA" && uploadedDocData.length > 0)) {
                            _context16.next = 11;
                            break;
                        }

                        fileStoreIds = uploadedDocData && uploadedDocData.map(function (item) {
                            return item.fileStoreId;
                        }).join(",");
                        _context16.t0 = fileStoreIds;

                        if (!_context16.t0) {
                            _context16.next = 8;
                            break;
                        }

                        _context16.next = 7;
                        return (0, _commons2.getFileUrlFromAPI)(fileStoreIds);

                    case 7:
                        _context16.t0 = _context16.sent;

                    case 8:
                        fileUrlPayload = _context16.t0;
                        reviewDocData = uploadedDocData && uploadedDocData.map(function (item, index) {
                            return {
                                title: (businessService + "_" + item.documentType).replace(".", "_") || "",
                                link: fileUrlPayload && fileUrlPayload[item.fileStoreId] && (0, _commons2.getFileUrl)(fileUrlPayload[item.fileStoreId]) || "",
                                linkText: "View",
                                name: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent((0, _commons2.getFileUrl)(fileUrlPayload[item.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1)
                            };
                        });
                        return _context16.abrupt("return", reviewDocData);

                    case 11:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, undefined);
    }));

    return function setWSDocuments(_x30, _x31, _x32) {
        return _ref16.apply(this, arguments);
    };
}();

var downloadAndPrintForNonApply = exports.downloadAndPrintForNonApply = function () {
    var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(state, dispatch) {
        var documentPath, _state$screenConfigur, WaterConnection, SewerageConnection;

        return _regenerator2.default.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        documentPath = void 0;
                        _state$screenConfigur = state.screenConfiguration.preparedFinalObject, WaterConnection = _state$screenConfigur.WaterConnection, SewerageConnection = _state$screenConfigur.SewerageConnection;

                        if (WaterConnection.length > 0 && SewerageConnection.length > 0 || WaterConnection.length > 0) {
                            documentPath = 'WaterConnection[0].documents';
                        } else if (SewerageConnection.length > 0) {
                            documentPath = 'SewerageConnection[0].documents';
                        }
                        _context17.next = 5;
                        return (0, _commons2.setDocuments)(state.screenConfiguration.preparedFinalObject, documentPath, "DocumentsData", dispatch, "WS");

                    case 5:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, undefined);
    }));

    return function downloadAndPrintForNonApply(_x33, _x34) {
        return _ref17.apply(this, arguments);
    };
}();

var prepareDocUploadRedux = exports.prepareDocUploadRedux = function () {
    var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(state, dispatch) {
        var documentsUploadRedux, uploadedDocs, payload, documentPath, _state$screenConfigur2, WaterConnection, SewerageConnection, docs, i;

        return _regenerator2.default.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        documentsUploadRedux = {}, uploadedDocs = [];
                        payload = state.screenConfiguration.preparedFinalObject;
                        documentPath = void 0;
                        _state$screenConfigur2 = state.screenConfiguration.preparedFinalObject, WaterConnection = _state$screenConfigur2.WaterConnection, SewerageConnection = _state$screenConfigur2.SewerageConnection;

                        if (!(WaterConnection !== undefined && WaterConnection.length > 0 && SewerageConnection !== undefined && SewerageConnection.length > 0 || WaterConnection !== undefined && WaterConnection.length > 0)) {
                            _context18.next = 11;
                            break;
                        }

                        documentPath = payload.WaterConnection[0].documents;
                        _context18.next = 8;
                        return setWSDocuments(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].documents", "WS");

                    case 8:
                        uploadedDocs = _context18.sent;
                        _context18.next = 16;
                        break;

                    case 11:
                        if (!(SewerageConnection !== undefined && SewerageConnection.length > 0)) {
                            _context18.next = 16;
                            break;
                        }

                        documentPath = payload.SewerageConnection[0].documents;
                        _context18.next = 15;
                        return setWSDocuments(state.screenConfiguration.preparedFinalObject, "SewerageConnection[0].documents", "WS");

                    case 15:
                        uploadedDocs = _context18.sent;

                    case 16:
                        if (uploadedDocs !== undefined && uploadedDocs !== null && uploadedDocs.length > 0) {
                            documentsUploadRedux = uploadedDocs && uploadedDocs.length && uploadedDocs.map(function (item, key) {
                                var docUploadRedux = {};
                                docUploadRedux[key] = { documents: [{ fileName: item.name, fileUrl: item.link, fileStoreId: documentPath[key].fileStoreId }] };
                                var splittedString = documentPath[key].documentType.split(".");
                                if (splittedString[1] === "ADDRESSPROOF") {
                                    docUploadRedux[key].dropdown = { value: splittedString.join(".") };
                                } else if (splittedString[1] === "IDENTITYPROOF") {
                                    docUploadRedux[key].dropdown = { value: splittedString.join(".") };
                                } else {
                                    docUploadRedux[key].documentType = documentPath[key].documentType;
                                }
                                docUploadRedux[key].id = documentPath[key].id;
                                docUploadRedux[key].isDocumentRequired = true;
                                docUploadRedux[key].isDocumentTypeRequired = true;
                                return docUploadRedux;
                            });
                            docs = {};

                            for (i = 0; i < documentsUploadRedux.length; i++) {
                                docs[i] = documentsUploadRedux[i][i];
                            }
                            dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", docs));
                        }

                    case 17:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, undefined);
    }));

    return function prepareDocUploadRedux(_x35, _x36) {
        return _ref18.apply(this, arguments);
    };
}();

var prefillDocuments = exports.prefillDocuments = function () {
    var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(payload, destJsonPath, dispatch) {
        var documentsUploadRedux, uploadedDocs, docs, _i, tempDoc, docType, dList, i, key;

        return _regenerator2.default.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        documentsUploadRedux = {};
                        // const uploadedDocData = get(payload, sourceJsonPath);

                        _context19.next = 3;
                        return setWSDocuments(payload, "applyScreen.documents", "WS");

                    case 3:
                        uploadedDocs = _context19.sent;

                        if (uploadedDocs !== undefined && uploadedDocs !== null && uploadedDocs.length > 0) {
                            documentsUploadRedux = uploadedDocs && uploadedDocs.length && uploadedDocs.map(function (item, key) {
                                var docUploadRedux = {};
                                docUploadRedux[key] = { documents: [{ fileName: item.name, fileUrl: item.link, fileStoreId: payload.applyScreen.documents[key].fileStoreId }] };
                                var splittedString = payload.applyScreen.documents[key].documentType.split(".");
                                if (splittedString[1] === "ADDRESSPROOF") {
                                    docUploadRedux[key].dropdown = { value: splittedString.join(".") };
                                } else if (splittedString[1] === "IDENTITYPROOF") {
                                    docUploadRedux[key].dropdown = { value: splittedString.join(".") };
                                } else {
                                    docUploadRedux[key].dropdown = { value: payload.applyScreen.documents[key].documentType };
                                }
                                docUploadRedux[key].documentType = payload.applyScreen.documents[key].documentType;
                                docUploadRedux[key].id = payload.applyScreen.documents[key].id;
                                docUploadRedux[key].isDocumentRequired = true;
                                docUploadRedux[key].isDocumentTypeRequired = true;
                                return docUploadRedux;
                            });
                            docs = {};

                            for (_i = 0; _i < documentsUploadRedux.length; _i++) {
                                docs[_i] = documentsUploadRedux[_i][_i];
                            }

                            tempDoc = {}, docType = "";
                            dList = isModifyMode() ? payload.applyScreenMdmsData['ws-services-masters'].ModifyConnectionDocuments : payload.applyScreenMdmsData['ws-services-masters'].Documents;

                            if (dList !== undefined && dList !== null) {
                                dList = isModifyMode() ? getDisplayDocFormat(dList) : dList;
                                for (i = 0; i < dList.length; i++) {
                                    for (key in docs) {
                                        docType = docs[key].documentType;
                                        if (dList[i].code === docType.substring(0, docType.lastIndexOf("."))) {
                                            tempDoc[i] = docs[key];
                                        } else if (dList[i].code === docType) {
                                            tempDoc[i] = docs[key];
                                        }
                                    }
                                }
                            } else {
                                tempDoc = docs;
                            }

                            dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", tempDoc));
                            dispatch((0, _actions.prepareFinalObject)(destJsonPath, tempDoc));
                        }

                    case 5:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, undefined);
    }));

    return function prefillDocuments(_x37, _x38, _x39) {
        return _ref19.apply(this, arguments);
    };
}();
var dataExists = exports.dataExists = function dataExists(code, temp) {
    return temp.some(function (el) {
        return el.code === code;
    });
};
var checkValue = exports.checkValue = function checkValue(i, documentTypea, temp, dataList) {
    for (var j = i; j < dataList.length; j++) {
        var isCheck = dataExists(dataList[j].code, temp);
        if (documentTypea == dataList[j].documentType && !isCheck) {
            return dataList[j];
        }
    }
};
var getDisplayDocFormat = exports.getDisplayDocFormat = function getDisplayDocFormat(dataList) {
    var tempDoc = [];
    for (var i = 0; i < dataList.length; i++) {
        if (i == 0) {
            tempDoc[i] = dataList[i];
        } else {
            var getNextDoc = checkValue(i, tempDoc[i - 1].documentType, tempDoc, dataList);
            if (getNextDoc) {
                tempDoc[i] = getNextDoc;
            } else {
                tempDoc[i] = dataList.find(function (el) {
                    return tempDoc.find(function (o, i) {
                        return el.code != o.code && !dataExists(el.code, tempDoc);
                    });
                });
            }
        }
    }
    return tempDoc;
};
var applyForWaterOrSewerage = exports.applyForWaterOrSewerage = function () {
    var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(state, dispatch) {
        var response, _response, _response2;

        return _regenerator2.default.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        if (!((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.water") && (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.sewerage"))) {
                            _context20.next = 7;
                            break;
                        }

                        _context20.next = 3;
                        return applyForBothWaterAndSewerage(state, dispatch);

                    case 3:
                        response = _context20.sent;
                        return _context20.abrupt("return", response);

                    case 7:
                        if (!(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
                            _context20.next = 14;
                            break;
                        }

                        _context20.next = 10;
                        return applyForSewerage(state, dispatch);

                    case 10:
                        _response = _context20.sent;
                        return _context20.abrupt("return", _response);

                    case 14:
                        _context20.next = 16;
                        return applyForWater(state, dispatch);

                    case 16:
                        _response2 = _context20.sent;
                        return _context20.abrupt("return", _response2);

                    case 18:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, undefined);
    }));

    return function applyForWaterOrSewerage(_x40, _x41) {
        return _ref20.apply(this, arguments);
    };
}();

var applyForWater = exports.applyForWater = function () {
    var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(state, dispatch) {
        var queryObject, waterId, method, tenantId, response, queryObjectForUpdate, waterSource, waterSubSource, searchQueryObject, searchResponse, _waterSource;

        return _regenerator2.default.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        queryObject = parserFunction(state);
                        waterId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].id");
                        method = waterId ? "UPDATE" : "CREATE";
                        _context21.prev = 3;
                        tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].property.tenantId");
                        response = void 0;

                        queryObject.tenantId = queryObject && queryObject.property && queryObject.property.tenantId ? queryObject.property.tenantId : null;

                        if (!(method === "UPDATE")) {
                            _context21.next = 34;
                            break;
                        }

                        queryObject.additionalDetails.appCreatedDate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].additionalDetails.appCreatedDate");
                        queryObjectForUpdate = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0]");
                        waterSource = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceType", null);
                        waterSubSource = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSubSource", null);

                        queryObjectForUpdate.waterSource = queryObjectForUpdate.waterSource ? queryObjectForUpdate.waterSource : waterSource;
                        queryObjectForUpdate.waterSubSource = queryObjectForUpdate.waterSubSource ? queryObjectForUpdate.waterSubSource : waterSubSource;
                        (0, _set2.default)(queryObjectForUpdate, "tenantId", tenantId);
                        queryObjectForUpdate = (0, _extends3.default)({}, queryObjectForUpdate, queryObject);
                        (0, _set2.default)(queryObjectForUpdate, "processInstance.action", "SUBMIT_APPLICATION");
                        (0, _set2.default)(queryObjectForUpdate, "waterSource", getWaterSource(queryObjectForUpdate.waterSource, queryObjectForUpdate.waterSubSource));
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        if ((0, _typeof3.default)(queryObjectForUpdate.additionalDetails) !== 'object') {
                            queryObjectForUpdate.additionalDetails = {};
                        }
                        queryObjectForUpdate.additionalDetails.locality = queryObjectForUpdate.property.address.locality.code;
                        queryObjectForUpdate = findAndReplace(queryObjectForUpdate, "NA", null);
                        _context21.next = 25;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_update", "", [], { WaterConnection: queryObjectForUpdate });

                    case 25:
                        searchQueryObject = [{ key: "tenantId", value: queryObjectForUpdate.tenantId }, { key: "applicationNumber", value: queryObjectForUpdate.applicationNo }];
                        _context21.next = 28;
                        return getSearchResults(searchQueryObject);

                    case 28:
                        searchResponse = _context21.sent;

                        dispatch((0, _actions.prepareFinalObject)("WaterConnection", searchResponse.WaterConnection));
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        _context21.next = 60;
                        break;

                    case 34:
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        if ((0, _typeof3.default)(queryObject.additionalDetails) !== 'object') {
                            queryObject.additionalDetails = {};
                        }
                        queryObject.additionalDetails.locality = queryObject.property.address.locality.code;
                        (0, _set2.default)(queryObject, "processInstance.action", "INITIATE");
                        queryObject = findAndReplace(queryObject, "NA", null);
                        if (isModifyMode()) {
                            (0, _set2.default)(queryObject, "waterSource", getWaterSource(queryObject.waterSource, queryObject.waterSubSource));
                        }
                        (0, _set2.default)(queryObject, "channel", process.env.REACT_APP_NAME === "Citizen" ? "CITIZEN" : "CFC_COUNTER");
                        _context21.next = 44;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_create", "", [], { WaterConnection: queryObject });

                    case 44:
                        response = _context21.sent;

                        dispatch((0, _actions.prepareFinalObject)("WaterConnection", response.WaterConnection));
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);

                        if (!isModifyMode()) {
                            _context21.next = 59;
                            break;
                        }

                        _context21.next = 51;
                        return getPropertyObj(response.WaterConnection, "", "", true);

                    case 51:
                        response.WaterConnection = _context21.sent;

                        response.WaterConnection[0].water = true;
                        _waterSource = response.WaterConnection[0].waterSource.split(".");

                        response.WaterConnection[0].waterSource = _waterSource[0];
                        response.WaterConnection[0].service = "Water";
                        response.WaterConnection[0].waterSubSource = _waterSource[1];
                        dispatch((0, _actions.prepareFinalObject)("applyScreen", response.WaterConnection[0]));
                        dispatch((0, _actions.prepareFinalObject)("modifyAppCreated", true));

                    case 59:
                        if (!isModifyMode()) {
                            setApplicationNumberBox(state, dispatch);
                        }

                    case 60:
                        return _context21.abrupt("return", true);

                    case 63:
                        _context21.prev = 63;
                        _context21.t0 = _context21["catch"](3);

                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context21.t0.message }, "error"));
                        return _context21.abrupt("return", false);

                    case 69:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, undefined, [[3, 63]]);
    }));

    return function applyForWater(_x42, _x43) {
        return _ref21.apply(this, arguments);
    };
}();

var applyForSewerage = exports.applyForSewerage = function () {
    var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(state, dispatch) {
        var queryObject, sewerId, method, tenantId, response, queryObjectForUpdate, searchQueryObject, searchResponse;
        return _regenerator2.default.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        queryObject = parserFunction(state);
                        sewerId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].id");
                        method = sewerId ? "UPDATE" : "CREATE";
                        _context22.prev = 3;
                        tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].property.tenantId");
                        response = void 0;

                        (0, _set2.default)(queryObject, "tenantId", tenantId);
                        queryObject.tenantId = queryObject && queryObject.property && queryObject.property.tenantId ? queryObject.property.tenantId : null;

                        if (!(method === "UPDATE")) {
                            _context22.next = 30;
                            break;
                        }

                        queryObject.additionalDetails.appCreatedDate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "SewerageConnection[0].additionalDetails.appCreatedDate");
                        queryObjectForUpdate = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0]");

                        queryObjectForUpdate = (0, _extends3.default)({}, queryObjectForUpdate, queryObject);
                        (0, _set2.default)(queryObjectForUpdate, "processInstance.action", "SUBMIT_APPLICATION");
                        (0, _set2.default)(queryObjectForUpdate, "connectionType", "Non Metered");
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        if ((0, _typeof3.default)(queryObjectForUpdate.additionalDetails) !== 'object') {
                            response.SewerageConnection[0].additionalDetails = {};
                        }
                        queryObjectForUpdate.additionalDetails.locality = queryObjectForUpdate.property.address.locality.code;
                        queryObjectForUpdate = findAndReplace(queryObjectForUpdate, "NA", null);
                        _context22.next = 21;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_update", "", [], { SewerageConnection: queryObjectForUpdate });

                    case 21:
                        searchQueryObject = [{ key: "tenantId", value: queryObjectForUpdate.tenantId }, { key: "applicationNumber", value: queryObjectForUpdate.applicationNo }];
                        _context22.next = 24;
                        return getSearchResultsForSewerage(searchQueryObject, dispatch);

                    case 24:
                        searchResponse = _context22.sent;

                        dispatch((0, _actions.prepareFinalObject)("SewerageConnection", searchResponse.SewerageConnections));
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        _context22.next = 52;
                        break;

                    case 30:
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        if ((0, _typeof3.default)(queryObject.additionalDetails) !== 'object') {
                            response.SewerageConnection[0].additionalDetails = {};
                        }
                        queryObject.additionalDetails.locality = queryObject.property.address.locality.code;
                        (0, _set2.default)(queryObject, "processInstance.action", "INITIATE");
                        queryObject = findAndReplace(queryObject, "NA", null);
                        (0, _set2.default)(queryObject, "channel", process.env.REACT_APP_NAME === "Citizen" ? "CITIZEN" : "CFC_COUNTER");
                        _context22.next = 39;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_create", "", [], { SewerageConnection: queryObject });

                    case 39:
                        response = _context22.sent;

                        dispatch((0, _actions.prepareFinalObject)("SewerageConnection", response.SewerageConnections));
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);

                        if (!isModifyMode()) {
                            _context22.next = 51;
                            break;
                        }

                        _context22.next = 46;
                        return getPropertyObj(response.SewerageConnections, "", "", true);

                    case 46:
                        response.SewerageConnections = _context22.sent;

                        response.SewerageConnections[0].sewerage = true;
                        response.SewerageConnections[0].service = "Sewerage";
                        dispatch((0, _actions.prepareFinalObject)("applyScreen", response.SewerageConnections[0]));
                        dispatch((0, _actions.prepareFinalObject)("modifyAppCreated", true));

                    case 51:
                        if (!isModifyMode()) {
                            setApplicationNumberBox(state, dispatch);
                        }

                    case 52:
                        return _context22.abrupt("return", true);

                    case 55:
                        _context22.prev = 55;
                        _context22.t0 = _context22["catch"](3);

                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context22.t0.message }, "error"));
                        return _context22.abrupt("return", false);

                    case 61:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, undefined, [[3, 55]]);
    }));

    return function applyForSewerage(_x44, _x45) {
        return _ref22.apply(this, arguments);
    };
}();

var applyForBothWaterAndSewerage = exports.applyForBothWaterAndSewerage = function () {
    var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23(state, dispatch) {
        var method, queryObject, waterId, sewerId, tenantId, response, queryObjectForUpdateWater, waterSource, waterSubSource, queryObjectForUpdateSewerage, searchQueryObjectWater, searchQueryObjectSewerage, searchResponse, sewerageResponse, _sewerageResponse;

        return _regenerator2.default.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        method = void 0;
                        queryObject = parserFunction(state);
                        waterId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].id");
                        sewerId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].id");

                        if (waterId && sewerId) {
                            method = "UPDATE";
                        } else {
                            method = "CREATE";
                        };
                        _context23.prev = 6;
                        tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].property.tenantId");
                        response = void 0;

                        (0, _set2.default)(queryObject, "tenantId", tenantId);
                        queryObject.tenantId = queryObject && queryObject.property && queryObject.property.tenantId ? queryObject.property.tenantId : null;

                        if (!(method === "UPDATE")) {
                            _context23.next = 52;
                            break;
                        }

                        queryObjectForUpdateWater = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0]");
                        waterSource = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceType", null);
                        waterSubSource = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSubSource", null);

                        queryObjectForUpdateWater.waterSource = queryObjectForUpdateWater.waterSource ? queryObjectForUpdateWater.waterSource : waterSource;
                        queryObjectForUpdateWater.waterSubSource = queryObjectForUpdateWater.waterSubSource ? queryObjectForUpdateWater.waterSubSource : waterSubSource;
                        queryObjectForUpdateSewerage = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0]");

                        queryObjectForUpdateWater = (0, _extends3.default)({}, queryObjectForUpdateWater, queryObject);
                        queryObjectForUpdateWater = findAndReplace(queryObjectForUpdateWater, "NA", null);
                        queryObjectForUpdateSewerage = (0, _extends3.default)({}, queryObjectForUpdateSewerage, queryObject);
                        queryObjectForUpdateSewerage = findAndReplace(queryObjectForUpdateSewerage, "NA", null);
                        (0, _set2.default)(queryObjectForUpdateWater, "processInstance.action", "SUBMIT_APPLICATION");
                        (0, _set2.default)(queryObjectForUpdateWater, "waterSource", getWaterSource(queryObjectForUpdateWater.waterSource, queryObjectForUpdateWater.waterSubSource));
                        (0, _set2.default)(queryObjectForUpdateSewerage, "processInstance.action", "SUBMIT_APPLICATION");
                        (0, _set2.default)(queryObjectForUpdateSewerage, "connectionType", "Non Metered");

                        (0, _set2.default)(queryObjectForUpdateSewerage, "additionalDetails.appCreatedDate", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "SewerageConnection[0].additionalDetails.appCreatedDate"));
                        (0, _set2.default)(queryObjectForUpdateWater, "additionalDetails.appCreatedDate", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].additionalDetails.appCreatedDate"));
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        if ((0, _typeof3.default)(queryObjectForUpdateWater.additionalDetails) !== 'object') {
                            queryObjectForUpdateWater.additionalDetails = {};
                        }
                        queryObjectForUpdateWater.additionalDetails.locality = queryObjectForUpdateWater.property.address.locality.code;
                        if ((0, _typeof3.default)(queryObjectForUpdateSewerage.additionalDetails) !== 'object') {
                            queryObjectForUpdateSewerage.additionalDetails = {};
                        }
                        queryObjectForUpdateSewerage.additionalDetails.locality = queryObjectForUpdateSewerage.property.address.locality.code;
                        _context23.next = 36;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_update", "", [], { WaterConnection: queryObjectForUpdateWater });

                    case 36:
                        _context23.next = 38;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_update", "", [], { SewerageConnection: queryObjectForUpdateSewerage });

                    case 38:
                        searchQueryObjectWater = [{ key: "tenantId", value: queryObjectForUpdateWater.tenantId }, { key: "applicationNumber", value: queryObjectForUpdateWater.applicationNo }];
                        searchQueryObjectSewerage = [{ key: "tenantId", value: queryObjectForUpdateSewerage.tenantId }, { key: "applicationNumber", value: queryObjectForUpdateSewerage.applicationNo }];
                        _context23.next = 42;
                        return getSearchResults(searchQueryObjectWater);

                    case 42:
                        searchResponse = _context23.sent;
                        _context23.next = 45;
                        return getSearchResultsForSewerage(searchQueryObjectSewerage, dispatch);

                    case 45:
                        sewerageResponse = _context23.sent;

                        dispatch((0, _actions.prepareFinalObject)("WaterConnection", searchResponse.WaterConnection));
                        dispatch((0, _actions.prepareFinalObject)("SewerageConnection", sewerageResponse.SewerageConnections));
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        _context23.next = 69;
                        break;

                    case 52:
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        if ((0, _typeof3.default)(queryObject.additionalDetails) !== 'object') {
                            queryObject.additionalDetails = {};
                        }
                        queryObject.additionalDetails.locality = queryObject.property.address.locality.code;
                        (0, _set2.default)(queryObject, "processInstance.action", "INITIATE");
                        (0, _set2.default)(queryObject, "channel", process.env.REACT_APP_NAME === "Citizen" ? "CITIZEN" : "CFC_COUNTER");
                        queryObject = findAndReplace(queryObject, "NA", null);
                        _context23.next = 61;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_create", "_create", [], { WaterConnection: queryObject });

                    case 61:
                        response = _context23.sent;
                        _context23.next = 64;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_create", "_create", [], { SewerageConnection: queryObject });

                    case 64:
                        _sewerageResponse = _context23.sent;

                        dispatch((0, _actions.prepareFinalObject)("WaterConnection", response.WaterConnection));
                        dispatch((0, _actions.prepareFinalObject)("SewerageConnection", _sewerageResponse.SewerageConnections));
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);

                    case 69:
                        if (!isModifyMode()) {
                            setApplicationNumberBox(state, dispatch);
                        }
                        return _context23.abrupt("return", true);

                    case 73:
                        _context23.prev = 73;
                        _context23.t0 = _context23["catch"](6);

                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
                        (0, _commons2.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
                        dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context23.t0.message }, "error"));
                        return _context23.abrupt("return", false);

                    case 79:
                    case "end":
                        return _context23.stop();
                }
            }
        }, _callee23, undefined, [[6, 73]]);
    }));

    return function applyForBothWaterAndSewerage(_x46, _x47) {
        return _ref23.apply(this, arguments);
    };
}();

var getImageUrlByFile = exports.getImageUrlByFile = function getImageUrlByFile(file) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var fileurl = e.target.result;
            resolve(fileurl);
        };
    });
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
    var size = parseFloat(file.size / 1024).toFixed(2);
    return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
    var mimeType = file["type"];
    return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var setApplicationNumberBox = function setApplicationNumberBox(state, dispatch) {
    var applicationNumberWater = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].applicationNo", null);
    var applicationNumberSewerage = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].applicationNo", null);
    if (applicationNumberSewerage && applicationNumberWater) {
        handleApplicationNumberDisplayForBoth(dispatch, applicationNumberWater, applicationNumberSewerage);
    } else if (applicationNumberWater) {
        handleApplicationNumberDisplay(dispatch, applicationNumberWater);
    } else {
        handleApplicationNumberDisplay(dispatch, applicationNumberSewerage);
    }
};

var handleApplicationNumberDisplay = exports.handleApplicationNumberDisplay = function handleApplicationNumberDisplay(dispatch, applicationNumber) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumberWater", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumberWater", "props.number", applicationNumber));
};

var handleApplicationNumberDisplayForBoth = function handleApplicationNumberDisplayForBoth(dispatch, applicationNumberWater, applicationNumberSewerage) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumberWater", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumberWater", "props.number", applicationNumberWater));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumberSewerage", "visible", true));

    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumberSewerage", "props.number", applicationNumberSewerage));
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
    for (var i = 0; i < arr.length; i++) {
        if (conditionCheckerFn(arr[i])) {
            return arr[i];
        }
    }
};

var getMdmsDataForMeterStatus = exports.getMdmsDataForMeterStatus = function () {
    var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(dispatch) {
        var mdmsBody, payload, data;
        return _regenerator2.default.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        mdmsBody = {
                            MdmsCriteria: {
                                tenantId: _common2.default.tenantId,
                                "moduleDetails": [{
                                    "moduleName": "ws-services-calculation",
                                    "masterDetails": [{
                                        "name": "MeterStatus",
                                        "filter": "$.*.name"
                                    }]
                                }]
                            }
                        };
                        _context24.prev = 1;
                        payload = null;
                        _context24.next = 5;
                        return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

                    case 5:
                        payload = _context24.sent;
                        data = payload.MdmsRes['ws-services-calculation'].MeterStatus.map(function (ele) {
                            return { code: ele };
                        });

                        payload.MdmsRes['ws-services-calculation'].MeterStatus = data;
                        dispatch((0, _actions.prepareFinalObject)("meterMdmsData", payload.MdmsRes));

                        _context24.next = 13;
                        break;

                    case 11:
                        _context24.prev = 11;
                        _context24.t0 = _context24["catch"](1);

                    case 13:
                    case "end":
                        return _context24.stop();
                }
            }
        }, _callee24, undefined, [[1, 11]]);
    }));

    return function getMdmsDataForMeterStatus(_x48) {
        return _ref24.apply(this, arguments);
    };
}();
var getMdmsDataForAutopopulated = exports.getMdmsDataForAutopopulated = function () {
    var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25(dispatch) {
        var connectionNo, queryObject, data, res, connectionType, mdmsBody, payload, billingCycle;
        return _regenerator2.default.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        _context25.prev = 0;
                        connectionNo = (0, _commons2.getQueryArg)(window.location.href, "connectionNos");
                        queryObject = [{
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }, { key: "offset", value: "0" }, { key: "connectionNumber", value: connectionNo }];
                        _context25.next = 5;
                        return getSearchResults(queryObject);

                    case 5:
                        data = _context25.sent;
                        res = findAndReplace(data, null, "NA");
                        connectionType = res.WaterConnection[0].connectionType;
                        mdmsBody = {
                            MdmsCriteria: {
                                tenantId: _common2.default.tenantId,
                                "moduleDetails": [{
                                    "moduleName": "ws-services-masters",
                                    "masterDetails": [{
                                        "name": "billingPeriod",
                                        "filter": "*"
                                    }]
                                }]
                            }
                        };
                        _context25.prev = 9;
                        _context25.next = 12;
                        return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

                    case 12:
                        payload = _context25.sent;
                        billingCycle = void 0;

                        payload.MdmsRes['ws-services-masters'].billingPeriod.map(function (x) {
                            if (x.connectionType === connectionType) {
                                billingCycle = x.billingCycle;
                            }
                        });
                        dispatch((0, _actions.prepareFinalObject)("billingCycle", billingCycle));
                        _context25.next = 20;
                        break;

                    case 18:
                        _context25.prev = 18;
                        _context25.t0 = _context25["catch"](9);

                    case 20:
                        _context25.next = 24;
                        break;

                    case 22:
                        _context25.prev = 22;
                        _context25.t1 = _context25["catch"](0);

                    case 24:
                    case "end":
                        return _context25.stop();
                }
            }
        }, _callee25, undefined, [[0, 22], [9, 18]]);
    }));

    return function getMdmsDataForAutopopulated(_x49) {
        return _ref25.apply(this, arguments);
    };
}();

var getMeterReadingData = exports.getMeterReadingData = function () {
    var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26(dispatch) {
        var queryObject, response, data;
        return _regenerator2.default.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        queryObject = [{
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }, {
                            key: "connectionNos",
                            value: (0, _commons2.getQueryArg)(window.location.href, "connectionNos")
                        }, { key: "offset", value: "0" }];
                        _context26.prev = 1;
                        _context26.next = 4;
                        return getConsumptionDetails(queryObject, dispatch);

                    case 4:
                        response = _context26.sent;
                        data = findAndReplace(response, null, "NA");

                        if (data && data.meterReadings && data.meterReadings.length > 0) {
                            dispatch((0, _actions.prepareFinalObject)("consumptionDetails", data.meterReadings));
                            dispatch((0, _actions.prepareFinalObject)("consumptionDetailsCount", data.meterReadings.length));
                        }
                        _context26.next = 11;
                        break;

                    case 9:
                        _context26.prev = 9;
                        _context26.t0 = _context26["catch"](1);

                    case 11:
                    case "end":
                        return _context26.stop();
                }
            }
        }, _callee26, undefined, [[1, 9]]);
    }));

    return function getMeterReadingData(_x50) {
        return _ref26.apply(this, arguments);
    };
}();

var getPastPaymentsForWater = exports.getPastPaymentsForWater = function () {
    var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27(dispatch) {
        var queryObjectForWS, responseOfWS, consumerCodesList, uniqueConsumberCodes, queryObject, response, userNumber, filteredArray;
        return _regenerator2.default.wrap(function _callee27$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());

                        queryObjectForWS = [{
                            key: "mobileNumber",
                            value: JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber
                        }, {
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }, {
                            key: "searchType",
                            value: "CONNECTION"
                        }];

                        // let queryObject = [
                        //     {
                        //         key: "tenantId",
                        //         value: getTenantIdCommon()
                        //     },
                        //     // {
                        //     //     key: "businessService",
                        //     //     value: "WS"
                        //     // },
                        //     {
                        //         key: "uuid",
                        //         value: JSON.parse(getUserInfo()).uuid.toString()
                        //     },
                        // ];

                        _context27.prev = 2;
                        _context27.next = 5;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_search", "_search", queryObjectForWS);

                    case 5:
                        responseOfWS = _context27.sent;
                        consumerCodesList = [];

                        if (responseOfWS && responseOfWS.WaterConnection) {
                            responseOfWS.WaterConnection.map(function (data) {
                                if (data.connectionNo) consumerCodesList.push(data.connectionNo);
                            });
                        }

                        uniqueConsumberCodes = consumerCodesList.filter(function (item, i, ar) {
                            return ar.indexOf(item) === i;
                        });
                        queryObject = [{
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }, {
                            key: "consumerCodes",
                            value: uniqueConsumberCodes.join(',')
                        }];
                        _context27.next = 12;
                        return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)("WS", true), "_search", queryObject);

                    case 12:
                        response = _context27.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        if (response && response.Payments) {
                            userNumber = Number(JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber);
                            filteredArray = response.Payments.filter(function (data) {
                                return data.mobileNumber == userNumber;
                            });
                            // dispatch(prepareFinalObject("pastPaymentsForWater", response.Payments));

                            dispatch((0, _actions.prepareFinalObject)("pastPaymentsForWater", filteredArray));
                        }
                        return _context27.abrupt("return", findAndReplace(response, null, "NA"));

                    case 19:
                        _context27.prev = 19;
                        _context27.t0 = _context27["catch"](2);

                        dispatch((0, _actions.toggleSpinner)());
                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context27.t0.message, labelCode: _context27.t0.message }, "error"));

                    case 23:
                    case "end":
                        return _context27.stop();
                }
            }
        }, _callee27, undefined, [[2, 19]]);
    }));

    return function getPastPaymentsForWater(_x51) {
        return _ref27.apply(this, arguments);
    };
}();

var getPastPaymentsForSewerage = exports.getPastPaymentsForSewerage = function () {
    var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28(dispatch) {
        var queryObjectForSW, responseOfSW, consumerCodesList, uniqueConsumberCodes, queryObject, response, userNumber, filteredArray;
        return _regenerator2.default.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        // let queryObject = [
                        //     {
                        //         key: "tenantId",
                        //         value: getTenantIdCommon()
                        //     },
                        //     // {
                        //     //     key: "businessService",
                        //     //     value: "SW"
                        //     // },
                        //     {
                        //         key: "uuid",
                        //         value: JSON.parse(getUserInfo()).uuid.toString()
                        //     }
                        // ];
                        queryObjectForSW = [{
                            key: "mobileNumber",
                            value: JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber
                        }, {
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }, {
                            key: "searchType",
                            value: "CONNECTION"
                        }];
                        _context28.prev = 2;
                        _context28.next = 5;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_search", "_search", queryObjectForSW);

                    case 5:
                        responseOfSW = _context28.sent;
                        consumerCodesList = [];

                        if (responseOfSW && responseOfSW.SewerageConnections) {
                            responseOfSW.SewerageConnections.map(function (data) {
                                if (data.connectionNo) consumerCodesList.push(data.connectionNo);
                            });
                        }

                        uniqueConsumberCodes = consumerCodesList.filter(function (item, i, ar) {
                            return ar.indexOf(item) === i;
                        });
                        queryObject = [{
                            key: "tenantId",
                            value: (0, _localStorageUtils.getTenantIdCommon)()
                        }, {
                            key: "consumerCodes",
                            value: uniqueConsumberCodes.join(',')
                        }];
                        _context28.next = 12;
                        return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)("SW", true), "_search", queryObject);

                    case 12:
                        response = _context28.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        if (response && response.Payments) {
                            userNumber = Number(JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber);
                            filteredArray = response.Payments.filter(function (data) {
                                return data.mobileNumber == userNumber;
                            });
                            // dispatch(prepareFinalObject("pastPaymentsForSewerage", response.Payments));

                            dispatch((0, _actions.prepareFinalObject)("pastPaymentsForSewerage", filteredArray));
                        }
                        return _context28.abrupt("return", findAndReplace(response, null, "NA"));

                    case 19:
                        _context28.prev = 19;
                        _context28.t0 = _context28["catch"](2);

                        dispatch((0, _actions.toggleSpinner)());
                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context28.t0.message, labelCode: _context28.t0.message }, "error"));

                    case 23:
                    case "end":
                        return _context28.stop();
                }
            }
        }, _callee28, undefined, [[2, 19]]);
    }));

    return function getPastPaymentsForSewerage(_x52) {
        return _ref28.apply(this, arguments);
    };
}();

var createMeterReading = exports.createMeterReading = function () {
    var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29(dispatch, body) {
        var response, todayDate;
        return _regenerator2.default.wrap(function _callee29$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context29.prev = 1;
                        _context29.next = 4;
                        return (0, _api.httpRequest)("post", "/ws-calculator/meterConnection/_create", "", [], { meterReadings: body });

                    case 4:
                        response = _context29.sent;

                        if (response && response !== undefined && response !== null) {
                            getMeterReadingData(dispatch);
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.secondContainer.children.status.props", "value", "Working"));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props", "disabled", false));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "disabled", false));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont", "visible", true));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont", "visible", false));
                            todayDate = new Date();

                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "value", todayDate));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props", "value", ""));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props", "value", ""));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props", "labelName", ""));
                        }
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable", "visible", false));
                        dispatch((0, _actions.prepareFinalObject)("metereading", {}));
                        dispatch((0, _actions.toggleSpinner)());
                        _context29.next = 15;
                        break;

                    case 11:
                        _context29.prev = 11;
                        _context29.t0 = _context29["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());
                        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context29.t0.message, labelCode: _context29.t0.message }, "error"));

                    case 15:
                    case "end":
                        return _context29.stop();
                }
            }
        }, _callee29, undefined, [[1, 11]]);
    }));

    return function createMeterReading(_x53, _x54) {
        return _ref29.apply(this, arguments);
    };
}();

var wsDownloadConnectionDetails = exports.wsDownloadConnectionDetails = function wsDownloadConnectionDetails(receiptQueryString, mode) {
    var FETCHCONNECTIONDETAILS = {
        GET: {
            URL: "/ws-services/wc/_search",
            ACTION: "_post"
        }
    };
    var DOWNLOADCONNECTIONDETAILS = {
        GET: {
            URL: "/pdf-service/v1/_create",
            ACTION: "_get"
        }
    };

    var FETCHSWCONNECTIONDETAILS = {
        GET: {
            URL: "/sw-services/swc/_search",
            ACTION: "_post"
        }
    };
    var service = (0, _commons2.getQueryArg)(window.location.href, "service");

    switch (service) {
        case serviceConst.WATER:
            try {
                (0, _api.httpRequest)("post", FETCHCONNECTIONDETAILS.GET.URL, FETCHCONNECTIONDETAILS.GET.ACTION, receiptQueryString).then(function () {
                    var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30(payloadReceiptDetails) {
                        var queryStr;
                        return _regenerator2.default.wrap(function _callee30$(_context30) {
                            while (1) {
                                switch (_context30.prev = _context30.next) {
                                    case 0:
                                        queryStr = [{ key: "key", value: "ws-consolidatedacknowlegment" }, { key: "tenantId", value: _common2.default.tenantId }];
                                        _context30.next = 3;
                                        return getPropertyObj(payloadReceiptDetails.WaterConnection);

                                    case 3:
                                        payloadReceiptDetails.WaterConnection = _context30.sent;

                                        if (payloadReceiptDetails.WaterConnection[0].property.additionalDetails.isRainwaterHarvesting !== undefined && payloadReceiptDetails.WaterConnection[0].property.additionalDetails.isRainwaterHarvesting !== null) {
                                            if (payloadReceiptDetails.WaterConnection[0].property.additionalDetails.isRainwaterHarvesting === true) {
                                                payloadReceiptDetails.WaterConnection[0].property.additionalDetails.isRainwaterHarvesting = 'SCORE_YES';
                                            } else {
                                                payloadReceiptDetails.WaterConnection[0].property.additionalDetails.isRainwaterHarvesting = 'SCORE_NO';
                                            }
                                        }
                                        (0, _api.httpRequest)("post", DOWNLOADCONNECTIONDETAILS.GET.URL, DOWNLOADCONNECTIONDETAILS.GET.ACTION, queryStr, { WaterConnection: payloadReceiptDetails.WaterConnection }, { 'Accept': _common2.default.singleInstance ? 'application/pdf,application/json' : 'application/pdf' }, { responseType: 'arraybuffer' }).then(function (res) {
                                            (0, _commons.downloadReceiptFromFilestoreID)(res.filestoreIds[0], mode);
                                        });

                                    case 6:
                                    case "end":
                                        return _context30.stop();
                                }
                            }
                        }, _callee30, undefined);
                    }));

                    return function (_x55) {
                        return _ref30.apply(this, arguments);
                    };
                }());
            } catch (exception) {
                alert('Some Error Occured while downloading!');
            }
            break;
        case serviceConst.SEWERAGE:
            try {
                (0, _api.httpRequest)("post", FETCHSWCONNECTIONDETAILS.GET.URL, FETCHSWCONNECTIONDETAILS.GET.ACTION, receiptQueryString).then(function () {
                    var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31(payloadReceiptDetails) {
                        var queryStr;
                        return _regenerator2.default.wrap(function _callee31$(_context31) {
                            while (1) {
                                switch (_context31.prev = _context31.next) {
                                    case 0:
                                        queryStr = [{ key: "key", value: "ws-consolidatedsewerageconnection" }, { key: "tenantId", value: _common2.default.tenantId }];
                                        _context31.next = 3;
                                        return getPropertyObj(payloadReceiptDetails.SewerageConnections);

                                    case 3:
                                        payloadReceiptDetails.SewerageConnections = _context31.sent;

                                        (0, _api.httpRequest)("post", DOWNLOADCONNECTIONDETAILS.GET.URL, DOWNLOADCONNECTIONDETAILS.GET.ACTION, queryStr, { SewerageConnections: payloadReceiptDetails.SewerageConnections }, { 'Accept': _common2.default.singleInstance ? 'application/pdf,application/json' : 'application/pdf' }, { responseType: 'arraybuffer' }).then(function (res) {
                                            (0, _commons.downloadReceiptFromFilestoreID)(res.filestoreIds[0], mode);
                                        });

                                    case 5:
                                    case "end":
                                        return _context31.stop();
                                }
                            }
                        }, _callee31, undefined);
                    }));

                    return function (_x56) {
                        return _ref31.apply(this, arguments);
                    };
                }());
            } catch (exception) {
                alert('Some Error Occured while downloading!');
            }
            break;
    }
};

var getSWMyResults = exports.getSWMyResults = function () {
    var _ref32 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee32(queryObject, consumer, dispatch) {
        var response, i, consumerCode, bService, data;
        return _regenerator2.default.wrap(function _callee32$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context32.prev = 1;
                        _context32.next = 4;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_search", "_search", queryObject);

                    case 4:
                        response = _context32.sent;

                        if (!(response.SewerageConnections.length > 0)) {
                            _context32.next = 28;
                            break;
                        }

                        _context32.next = 8;
                        return getPropertyObj(response.SewerageConnections);

                    case 8:
                        response.SewerageConnections = _context32.sent;
                        i = 0;

                    case 10:
                        if (!(i < response.SewerageConnections.length)) {
                            _context32.next = 28;
                            break;
                        }

                        response.SewerageConnections[i].service = _.capitalize(serviceConst.SEWERAGE);
                        consumerCode = "", bService = "";

                        if (consumer === 'APPLICATION') {
                            consumerCode = response.SewerageConnections[i].applicationNo;
                            bService = 'SW.ONE_TIME_FEE';
                        } else if (consumer === 'CONNECTION') {
                            consumerCode = response.SewerageConnections[i].connectionNo;
                            bService = 'SW';
                        }

                        if (!(consumerCode !== undefined && consumerCode !== null)) {
                            _context32.next = 25;
                            break;
                        }

                        _context32.prev = 15;
                        _context32.next = 18;
                        return (0, _api.httpRequest)("post", "billing-service/bill/v2/_fetchbill?consumerCode=" + consumerCode + "&tenantId=" + response.SewerageConnections[i].property.tenantId + "&businessService=" + bService, "_fetchbill"
                        // queryObject
                        );

                    case 18:
                        data = _context32.sent;

                        if (data && data !== undefined) {
                            if (data.Bill !== undefined && data.Bill.length > 0) {
                                response.SewerageConnections[i].due = data.Bill[0].totalAmount;
                            }
                        } else {
                            response.SewerageConnections[i].due = 0;
                        }

                        _context32.next = 25;
                        break;

                    case 22:
                        _context32.prev = 22;
                        _context32.t0 = _context32["catch"](15);

                        response.SewerageConnections[i].due = "NA";

                    case 25:
                        i++;
                        _context32.next = 10;
                        break;

                    case 28:
                        dispatch((0, _actions.toggleSpinner)());
                        return _context32.abrupt("return", findAndReplace(response, null, "NA"));

                    case 32:
                        _context32.prev = 32;
                        _context32.t1 = _context32["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 35:
                    case "end":
                        return _context32.stop();
                }
            }
        }, _callee32, undefined, [[1, 32], [15, 22]]);
    }));

    return function getSWMyResults(_x57, _x58, _x59) {
        return _ref32.apply(this, arguments);
    };
}();

var billingPeriodMDMS = exports.billingPeriodMDMS = function billingPeriodMDMS(toPeriod, payloadbillingPeriod, service) {
    var connectionType = (0, _commons2.getQueryArg)(window.location.href, "connectionType");
    var demandExipryDate = 0;
    if (service === serviceConst.WATER && payloadbillingPeriod['ws-services-masters'] && payloadbillingPeriod['ws-services-masters'].billingPeriod !== undefined && payloadbillingPeriod['ws-services-masters'].billingPeriod !== null) {
        payloadbillingPeriod['ws-services-masters'].billingPeriod.forEach(function (obj) {
            if (obj.connectionType === 'Metered' && connectionType === "Metered") {
                demandExipryDate = obj.demandExpiryDate;
            } else if (obj.connectionType === 'Non Metered' && connectionType === "Non Metered") {
                demandExipryDate = obj.demandExpiryDate;
            }
        });
    }

    if (service === serviceConst.SEWERAGE && payloadbillingPeriod['sw-services-calculation'] && payloadbillingPeriod['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod['sw-services-calculation'].billingPeriod !== null) {
        payloadbillingPeriod['sw-services-calculation'].billingPeriod.forEach(function (obj) {
            if (obj.connectionType === 'Non Metered') {
                demandExipryDate = obj.demandExpiryDate;
            }
        });
    }
    return toPeriod + demandExipryDate;
};

var downloadBill = exports.downloadBill = function downloadBill(receiptQueryString, mode) {
    var FETCHBILL = {
        GET: {
            URL: "/billing-service/bill/v2/_fetchbill",
            ACTION: "_get"
        }
    };
    var DOWNLOADBILL = {
        GET: {
            URL: "/pdf-service/v1/_create",
            ACTION: "_get"
        }
    };

    var requestBody = {
        "MdmsCriteria": {
            "tenantId": (0, _localStorageUtils.getTenantIdCommon)(),
            "moduleDetails": [{ "moduleName": "ws-services-masters", "masterDetails": [{ "name": "billingPeriod" }] }, { "moduleName": "sw-services-calculation", "masterDetails": [{ "name": "billingPeriod" }] }]
        }
    };

    try {

        (0, _api.httpRequest)("post", FETCHBILL.GET.URL, FETCHBILL.GET.ACTION, receiptQueryString).then(function (payloadReceiptDetails) {
            var queryStr = [{ key: "key", value: "ws-bill" }, { key: "tenantId", value: _common2.default.tenantId }];
            var data = [];
            payloadReceiptDetails.Bill[0].billDetails.map(function (curEl) {
                return data.push(curEl);
            });
            var sortData = data.sort(function (a, b) {
                return b.toPeriod - a.toPeriod;
            });
            var tenant = sortData[0].tenantId;
            var demandId = sortData[0].demandId;
            var queryString = [{ key: "demandId", value: demandId }, { key: "tenantId", value: tenant }];
            var billTotalAmount = payloadReceiptDetails.Bill[0].totalAmount;

            (0, _api.httpRequest)("post", "/billing-service/demand/_search", "_demand", queryString).then(function (getDemandBills) {
                var demandAmount = getDemandBills.Demands[0].demandDetails.reduce(function (accum, item) {
                    return accum + item.taxAmount;
                }, 0);
                var partiallyPaid = getDemandBills.Demands[0].demandDetails.reduce(function (accm, item) {
                    return accm + item.collectionAmount;
                }, 0);
                if (billTotalAmount <= 0) {
                    // We do have Advance. This value is already adjusted from the actual demand.
                    // i.e. The entire demand is adjusted hence billTotalAmount becomes <= 0
                    payloadReceiptDetails.Bill[0].AdvanceAdjustedValue = partiallyPaid > 0 ? partiallyPaid : 0;
                } else {
                    // We have some Bill Amount. There are two possibilities.
                    // 1 - There was some advance and it is adjusted
                    // 2 - This is the balance of the previous Bill amount after partial payment - no adjustment
                    if (partiallyPaid >= 0) {
                        //There is some amount paid partially. Hence AdvanceAdjusted must be 0
                        payloadReceiptDetails.Bill[0].AdvanceAdjustedValue = 0;
                    } else {
                        payloadReceiptDetails.Bill[0].AdvanceAdjustedValue = demandAmount - billTotalAmount;
                    }
                }

                // We need to calculate Arrears only when the bill[0].totalAmount is > 0
                // Else we have advance Amount.
                if (billTotalAmount > 0) {
                    sortData.shift();
                    var totalAmount = 0;
                    var previousArrears = 0;
                    if (sortData.length > 0) {
                        var totalArrearsAmount = sortData.map(function (el) {
                            return el.amount + totalAmount;
                        });
                        previousArrears = totalArrearsAmount.reduce(function (a, b) {
                            return a + b;
                        });
                    }
                    payloadReceiptDetails.Bill[0].arrearAmount = previousArrears.toFixed(2);
                }

                payloadReceiptDetails.Bill[0].billDetails.sort(function (a, b) {
                    return b.toPeriod - a.toPeriod;
                });
                (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody).then(function (payloadbillingPeriod) {
                    var waterMeteredDemandExipryDate = 0,
                        waterNonMeteredDemandExipryDate = 0,
                        sewerageNonMeteredDemandExpiryDate = 0;
                    var service = payloadReceiptDetails.Bill && payloadReceiptDetails.Bill.length > 0 && payloadReceiptDetails.Bill[0].businessService ? payloadReceiptDetails.Bill[0].businessService : 'WS';
                    if (service === 'WS' && payloadbillingPeriod.MdmsRes['ws-services-masters'] && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== null) {
                        payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod.forEach(function (obj) {
                            if (obj.connectionType === 'Metered' && (0, _commons2.getQueryArg)(window.location.href, "connectionType") === "Metered") {
                                payloadReceiptDetails.Bill[0].billDetails[0]['expiryDate'] = payloadReceiptDetails.Bill[0].billDetails[0].toPeriod + obj.demandExpiryDate;
                            } else if (obj.connectionType === 'Non Metered' && (0, _commons2.getQueryArg)(window.location.href, "connectionType") === "Non Metered") {
                                payloadReceiptDetails.Bill[0].billDetails[0]['expiryDate'] = payloadReceiptDetails.Bill[0].billDetails[0].toPeriod + obj.demandExpiryDate;
                            }
                        });
                    }

                    if (service === "SW" && payloadbillingPeriod.MdmsRes['sw-services-calculation'] && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== null) {
                        payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod.forEach(function (obj) {
                            if (obj.connectionType === 'Non Metered') {
                                payloadReceiptDetails.Bill[0].billDetails[0]['expiryDate'] = payloadReceiptDetails.Bill[0].billDetails[0].toPeriod + obj.demandExpiryDate;
                            }
                        });
                    }

                    (0, _api.httpRequest)("post", DOWNLOADBILL.GET.URL, DOWNLOADBILL.GET.ACTION, queryStr, { Bill: payloadReceiptDetails.Bill }, { 'Accept': 'application/pdf' }, { responseType: 'arraybuffer' }).then(function (res) {
                        (0, _commons.downloadReceiptFromFilestoreID)(res.filestoreIds[0], mode);
                    });
                });
            });
        });
    } catch (exception) {
        alert('Some Error Occured while downloading Bill!');
    }
};

var findAndReplace = exports.findAndReplace = function findAndReplace(obj, oldValue, newValue) {
    Object.keys(obj).forEach(function (key) {
        if (obj[key] instanceof Object || obj[key] instanceof Array) findAndReplace(obj[key], oldValue, newValue);
        obj[key] = obj[key] === oldValue ? newValue : obj[key];
    });
    return obj;
};

// api call to calculate water estimate
var waterEstimateCalculation = exports.waterEstimateCalculation = function () {
    var _ref33 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee33(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee33$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context33.prev = 1;
                        _context33.next = 4;
                        return (0, _api.httpRequest)("post", "ws-calculator/waterCalculator/_estimate", "_estimate", [], {
                            isconnectionCalculation: false,
                            CalculationCriteria: queryObject
                        });

                    case 4:
                        response = _context33.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context33.abrupt("return", findAndReplace(response, null, "NA"));

                    case 9:
                        _context33.prev = 9;
                        _context33.t0 = _context33["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 12:
                    case "end":
                        return _context33.stop();
                }
            }
        }, _callee33, undefined, [[1, 9]]);
    }));

    return function waterEstimateCalculation(_x60, _x61) {
        return _ref33.apply(this, arguments);
    };
}();

// api call to calculate water estimate
var waterSewerageBillingSearch = exports.waterSewerageBillingSearch = function () {
    var _ref34 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee34(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee34$(_context34) {
            while (1) {
                switch (_context34.prev = _context34.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context34.prev = 1;
                        _context34.next = 4;
                        return (0, _api.httpRequest)("post", "billing-service/bill/v2/_search", "", queryObject);

                    case 4:
                        response = _context34.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context34.abrupt("return", findAndReplace(response, null, "NA"));

                    case 9:
                        _context34.prev = 9;
                        _context34.t0 = _context34["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 12:
                    case "end":
                        return _context34.stop();
                }
            }
        }, _callee34, undefined, [[1, 9]]);
    }));

    return function waterSewerageBillingSearch(_x62, _x63) {
        return _ref34.apply(this, arguments);
    };
}();

// api call to calculate sewerage estimate
var swEstimateCalculation = exports.swEstimateCalculation = function () {
    var _ref35 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee35(queryObject, dispatch) {
        var response;
        return _regenerator2.default.wrap(function _callee35$(_context35) {
            while (1) {
                switch (_context35.prev = _context35.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context35.prev = 1;
                        _context35.next = 4;
                        return (0, _api.httpRequest)("post", "sw-calculator/sewerageCalculator/_estimate", "_estimate", [], {
                            isconnectionCalculation: false,
                            CalculationCriteria: queryObject
                        });

                    case 4:
                        response = _context35.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context35.abrupt("return", findAndReplace(response, null, "NA"));

                    case 9:
                        _context35.prev = 9;
                        _context35.t0 = _context35["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 12:
                    case "end":
                        return _context35.stop();
                }
            }
        }, _callee35, undefined, [[1, 9]]);
    }));

    return function swEstimateCalculation(_x64, _x65) {
        return _ref35.apply(this, arguments);
    };
}();
// to download application 
var downloadApp = exports.downloadApp = function () {
    var _ref36 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee36(wnsConnection, type, mode, dispatch) {
        var estFileStrID, sanFileStrID, tenantName, appNo, queryStr, apiUrl, appService, estKey, queryObjectForEst, DOWNLOADCONNECTIONDETAILS, estResponse, obj, slaDetails, states, findSLA, i, j, connectionExecutionDate;
        return _regenerator2.default.wrap(function _callee36$(_context36) {
            while (1) {
                switch (_context36.prev = _context36.next) {
                    case 0:
                        estFileStrID = wnsConnection[0].additionalDetails.estimationFileStoreId;
                        sanFileStrID = wnsConnection[0].additionalDetails.sanctionFileStoreId;

                        if (!(type === 'estimateNotice' && estFileStrID !== undefined && estFileStrID !== null)) {
                            _context36.next = 7;
                            break;
                        }

                        (0, _commons.downloadReceiptFromFilestoreID)(estFileStrID, mode);
                        return _context36.abrupt("return", false);

                    case 7:
                        if (!(type === 'sanctionLetter' && sanFileStrID !== undefined && sanFileStrID !== null)) {
                            _context36.next = 10;
                            break;
                        }

                        (0, _commons.downloadReceiptFromFilestoreID)(sanFileStrID, mode);
                        return _context36.abrupt("return", false);

                    case 10:
                        tenantName = wnsConnection[0].property.tenantId;

                        tenantName = tenantName.split('.')[1];

                        wnsConnection[0].tenantName = tenantName.toUpperCase();
                        appNo = wnsConnection[0].applicationNo;
                        queryStr = [{ key: "tenantId", value: _common2.default.tenantId }];
                        apiUrl = void 0, appService = void 0, estKey = void 0, queryObjectForEst = void 0;

                        if (wnsConnection[0].service === serviceConst.WATER) {

                            // for Estimate api 
                            if (wnsConnection[0].property.rainWaterHarvesting !== undefined && wnsConnection[0].property.rainWaterHarvesting !== null) {
                                if (wnsConnection[0].property.rainWaterHarvesting === 'SCORE_YES') {
                                    wnsConnection[0].property.rainWaterHarvesting = true;
                                } else if (wnsConnection[0].property.rainWaterHarvesting === 'SCORE_NO') {
                                    wnsConnection[0].property.rainWaterHarvesting = false;
                                }
                            }
                            apiUrl = "ws-calculator/waterCalculator/_estimate";
                            appService = "ws-applicationwater";
                            queryObjectForEst = [{
                                applicationNo: appNo,
                                tenantId: (0, _localStorageUtils.getTenantIdCommon)(),
                                waterConnection: wnsConnection[0]
                            }];
                        } else {
                            apiUrl = "sw-calculator/sewerageCalculator/_estimate";
                            appService = "ws-applicationsewerage";
                            queryObjectForEst = [{
                                applicationNo: appNo,
                                tenantId: (0, _localStorageUtils.getTenantIdCommon)(),
                                sewerageConnection: wnsConnection[0]
                            }];
                        }

                        DOWNLOADCONNECTIONDETAILS = {
                            GET: {
                                URL: "/pdf-service/v1/_create",
                                ACTION: "_get"
                            }
                        };
                        _context36.t0 = type;
                        _context36.next = _context36.t0 === 'application' ? 21 : _context36.t0 === 'estimateNotice' ? 23 : _context36.t0 === 'sanctionLetter' ? 26 : 29;
                        break;

                    case 21:
                        queryStr.push({ key: "key", value: appService });
                        return _context36.abrupt("break", 29);

                    case 23:
                        appService = "ws-estimationnotice";
                        queryStr.push({ key: "key", value: appService });
                        return _context36.abrupt("break", 29);

                    case 26:
                        appService = "ws-sanctionletter";
                        queryStr.push({ key: "key", value: appService });
                        return _context36.abrupt("break", 29);

                    case 29:
                        _context36.prev = 29;
                        _context36.next = 32;
                        return (0, _api.httpRequest)("post", apiUrl, "_estimate", [], {
                            isconnectionCalculation: false,
                            CalculationCriteria: queryObjectForEst
                        });

                    case 32:
                        estResponse = _context36.sent;


                        wnsConnection[0].totalAmount = estResponse.Calculation[0].totalAmount;
                        wnsConnection[0].applicationFee = estResponse.Calculation[0].fee;
                        wnsConnection[0].serviceFee = estResponse.Calculation[0].charge;
                        wnsConnection[0].tax = estResponse.Calculation[0].taxAmount;

                        obj = {};

                        if (type === 'estimateNotice' || type === 'sanctionLetter') {
                            estResponse.Calculation[0].taxHeadEstimates.map(function (val) {
                                val.taxHeadCode = val.taxHeadCode.substring(3);
                            });
                            wnsConnection[0].pdfTaxhead = estResponse.Calculation[0].taxHeadEstimates;

                            obj = {
                                WnsConnection: wnsConnection
                            };
                        }

                        if (!(type === 'sanctionLetter')) {
                            _context36.next = 64;
                            break;
                        }

                        _context36.next = 42;
                        return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/businessservice/_search?tenantId=" + wnsConnection[0].property.tenantId + "&businessService=WS", "_search");

                    case 42:
                        slaDetails = _context36.sent;
                        states = [], findSLA = false;
                        i = 0;

                    case 45:
                        if (!(i < slaDetails.BusinessServices.length)) {
                            _context36.next = 62;
                            break;
                        }

                        states = slaDetails.BusinessServices[i].states;

                        if (!findSLA) {
                            _context36.next = 49;
                            break;
                        }

                        return _context36.abrupt("break", 62);

                    case 49:
                        if (!(states.length > 0)) {
                            _context36.next = 59;
                            break;
                        }

                        j = 0;

                    case 51:
                        if (!(j < states.length)) {
                            _context36.next = 59;
                            break;
                        }

                        if (!(states[j]['state'] && states[j]['state'] !== undefined && states[j]['state'] !== null && states[j]['state'] !== "" && states[j]['state'] === 'PENDING_FOR_CONNECTION_ACTIVATION')) {
                            _context36.next = 56;
                            break;
                        }

                        wnsConnection[0].sla = states[j]['sla'] / 86400000;
                        findSLA = true;
                        return _context36.abrupt("break", 59);

                    case 56:
                        j++;
                        _context36.next = 51;
                        break;

                    case 59:
                        i++;
                        _context36.next = 45;
                        break;

                    case 62:
                        connectionExecutionDate = new Date(wnsConnection[0].connectionExecutionDate);

                        wnsConnection[0].slaDate = connectionExecutionDate.setDate(connectionExecutionDate.getDate() + wnsConnection[0].sla);

                    case 64:

                        if (type === 'application') {
                            if (wnsConnection[0].property && wnsConnection[0].property.units && wnsConnection[0].property.units.length > 0 && wnsConnection[0].property.units[0].usageCategory) {
                                wnsConnection[0].property.propertySubUsageType = wnsConnection[0].property.units[0].usageCategory;
                            }
                            if (wnsConnection[0].service === serviceConst.WATER) {
                                if (wnsConnection[0].property.rainWaterHarvesting !== undefined && wnsConnection[0].property.rainWaterHarvesting !== null) {
                                    if (wnsConnection[0].property.rainWaterHarvesting === true) {
                                        wnsConnection[0].property.rainWaterHarvesting = 'SCORE_YES';
                                    } else {
                                        wnsConnection[0].property.rainWaterHarvesting = 'SCORE_NO';
                                    }
                                }
                                obj = {
                                    WaterConnection: wnsConnection
                                };
                            } else {
                                obj = {
                                    SewerageConnection: wnsConnection
                                };
                            }
                        }
                        _context36.next = 67;
                        return (0, _api.httpRequest)("post", DOWNLOADCONNECTIONDETAILS.GET.URL, DOWNLOADCONNECTIONDETAILS.GET.ACTION, queryStr, obj, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
                            res.filestoreIds[0];
                            if (res && res.filestoreIds && res.filestoreIds.length > 0) {
                                res.filestoreIds.map(function (fileStoreId) {
                                    if (type === "sanctionLetter") {
                                        _store2.default.dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].additionalDetails.sanctionFileStoreId", fileStoreId));
                                    } else if (type === "estimateNotice") {
                                        _store2.default.dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].additionalDetails.estimationFileStoreId", fileStoreId));
                                    }
                                    (0, _commons.downloadReceiptFromFilestoreID)(fileStoreId, mode);
                                });
                            } else {}
                        });

                    case 67:
                        _context36.next = 72;
                        break;

                    case 69:
                        _context36.prev = 69;
                        _context36.t1 = _context36["catch"](29);

                        alert('Some Error Occured while downloading!');

                    case 72:
                    case "end":
                        return _context36.stop();
                }
            }
        }, _callee36, undefined, [[29, 69]]);
    }));

    return function downloadApp(_x66, _x67, _x68, _x69) {
        return _ref36.apply(this, arguments);
    };
}();

var getDomainLink = exports.getDomainLink = function getDomainLink() {
    var link = "";
    if (process.env.NODE_ENV !== "development") {
        link += "/" + process.env.REACT_APP_NAME.toLowerCase();
    }
    return link;
};

var isActiveProperty = exports.isActiveProperty = function isActiveProperty(propertyObj) {
    var storeData = _store2.default.getState();
    var ptWorkflowDetails = (0, _get2.default)(storeData, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PropertyTax.PTWorkflow", []);
    var status = true;
    if (ptWorkflowDetails && ptWorkflowDetails.length > 0) {
        ptWorkflowDetails.forEach(function (data) {
            if (data.enable) {
                if (data.businessService.includes("WNS")) {
                    if (propertyObj.status === 'INACTIVE' || propertyObj.status === 'INWORKFLOW') {
                        status = false;
                    }
                } else {
                    if (propertyObj.status === 'INACTIVE') {
                        status = false;
                    }
                }
            }
        });
    } else {
        if (propertyObj.status === 'INACTIVE' || propertyObj.status === 'INWORKFLOW') {
            status = false;
        }
    }

    return status;
};
var isEditAction = exports.isEditAction = function isEditAction() {
    var isMode = (0, _commons2.getQueryArg)(window.location.href, "action");
    return isMode && isMode.toUpperCase() === 'EDIT';
};
var isModifyMode = exports.isModifyMode = function isModifyMode() {
    var isMode = (0, _commons2.getQueryArg)(window.location.href, "mode");
    return isMode && isMode.toUpperCase() === 'MODIFY';
};

var isModifyModeAction = exports.isModifyModeAction = function isModifyModeAction() {
    var isMode = (0, _commons2.getQueryArg)(window.location.href, "modeaction");
    return isMode && isMode.toUpperCase() === 'EDIT';
};

var showHideFieldsFirstStep = exports.showHideFieldsFirstStep = function showHideFieldsFirstStep(dispatch, propertyId, value) {
    if (propertyId) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.propertyID", "props.value", propertyId));
    }
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyIDDetails", "visible", value));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.Details", "visible", value));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.ownerDetails", "visible", value));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails", "visible", value));
};

var getWaterSource = exports.getWaterSource = function getWaterSource(waterSource, waterSubSource) {
    //Check waterSource has both major and minor
    if (waterSource && waterSource != "NA") {
        var source = waterSource.split(".");
        if (source[0] && source[0] !== "NA" && source[1] && source[1] !== "NA") {
            return waterSource;
        }
        if (waterSubSource && waterSubSource !== 'NA') {
            waterSource += "." + waterSubSource;
        }
    }
    return waterSource;
};

var isWorkflowExists = exports.isWorkflowExists = function () {
    var _ref37 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee37(queryObj) {
        var payload, isApplicationApproved, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pInstance;

        return _regenerator2.default.wrap(function _callee37$(_context37) {
            while (1) {
                switch (_context37.prev = _context37.next) {
                    case 0:
                        _context37.prev = 0;
                        _context37.next = 3;
                        return (0, _api.httpRequest)("post", "/egov-workflow-v2/egov-wf/process/_search", "_search", queryObj);

                    case 3:
                        payload = _context37.sent;
                        isApplicationApproved = false;

                        if (!(payload && payload.ProcessInstances && payload.ProcessInstances.length > 0)) {
                            _context37.next = 33;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context37.prev = 9;
                        _iterator = payload.ProcessInstances[Symbol.iterator]();

                    case 11:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context37.next = 19;
                            break;
                        }

                        pInstance = _step.value;

                        isApplicationApproved = pInstance.state.isTerminateState;

                        if (isApplicationApproved) {
                            _context37.next = 16;
                            break;
                        }

                        return _context37.abrupt("break", 19);

                    case 16:
                        _iteratorNormalCompletion = true;
                        _context37.next = 11;
                        break;

                    case 19:
                        _context37.next = 25;
                        break;

                    case 21:
                        _context37.prev = 21;
                        _context37.t0 = _context37["catch"](9);
                        _didIteratorError = true;
                        _iteratorError = _context37.t0;

                    case 25:
                        _context37.prev = 25;
                        _context37.prev = 26;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 28:
                        _context37.prev = 28;

                        if (!_didIteratorError) {
                            _context37.next = 31;
                            break;
                        }

                        throw _iteratorError;

                    case 31:
                        return _context37.finish(28);

                    case 32:
                        return _context37.finish(25);

                    case 33:
                        return _context37.abrupt("return", isApplicationApproved);

                    case 36:
                        _context37.prev = 36;
                        _context37.t1 = _context37["catch"](0);

                    case 38:
                    case "end":
                        return _context37.stop();
                }
            }
        }, _callee37, undefined, [[0, 36], [9, 21, 25, 33], [26,, 28, 32]]);
    }));

    return function isWorkflowExists(_x70) {
        return _ref37.apply(this, arguments);
    };
}();

var getMdmsDataForBill = exports.getMdmsDataForBill = function () {
    var _ref38 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee38(tenantId) {
        var mdmsBody;
        return _regenerator2.default.wrap(function _callee38$(_context38) {
            while (1) {
                switch (_context38.prev = _context38.next) {
                    case 0:
                        _context38.prev = 0;

                        // Get the MDMS data for billingPeriod
                        mdmsBody = {
                            MdmsCriteria: {
                                tenantId: tenantId,
                                moduleDetails: [{ moduleName: "ws-services-masters", masterDetails: [{ name: "billingPeriod" }] }, { moduleName: "sw-services-calculation", masterDetails: [{ name: "billingPeriod" }] }]
                            }
                            //Read metered & non-metered demand expiry date and assign value.
                        };
                        _context38.next = 4;
                        return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

                    case 4:
                        return _context38.abrupt("return", _context38.sent);

                    case 7:
                        _context38.prev = 7;
                        _context38.t0 = _context38["catch"](0);

                    case 9:
                    case "end":
                        return _context38.stop();
                }
            }
        }, _callee38, undefined, [[0, 7]]);
    }));

    return function getMdmsDataForBill(_x71) {
        return _ref38.apply(this, arguments);
    };
}();

var getOpenSearchResultsForWater = exports.getOpenSearchResultsForWater = function () {
    var _ref39 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee39(queryObject, requestBody, dispatch) {
        var response, currentTime, locality, tenantId, result, waterSource, waterSubSource;
        return _regenerator2.default.wrap(function _callee39$(_context39) {
            while (1) {
                switch (_context39.prev = _context39.next) {
                    case 0:
                        _context39.prev = 0;
                        _context39.next = 3;
                        return (0, _api.httpRequest)("post", "/ws-services/wc/_search", "_search", requestBody);

                    case 3:
                        response = _context39.sent;

                        if (!(response.WaterConnection && response.WaterConnection.length == 0)) {
                            _context39.next = 6;
                            break;
                        }

                        return _context39.abrupt("return", response);

                    case 6:
                        currentTime = new Date().getTime(), locality = void 0, tenantId = void 0;
                        result = findAndReplace(response, null, "NA");

                        result.WaterConnection[0].waterSourceSubSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource;
                        waterSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource.split(".")[0];
                        waterSubSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource.split(".")[1];

                        result.WaterConnection[0].waterSource = waterSource;
                        result.WaterConnection[0].waterSubSource = waterSubSource;
                        requestBody.forEach(function (value) {
                            if (value.key == "locality") {
                                locality = value.value;
                            } else if (value.key == "tenantId") {
                                tenantId = value.value;
                            }
                        });
                        _context39.next = 16;
                        return getPropertyObj(result.WaterConnection, locality, tenantId);

                    case 16:
                        result.WaterConnection = _context39.sent;
                        return _context39.abrupt("return", result);

                    case 20:
                        _context39.prev = 20;
                        _context39.t0 = _context39["catch"](0);

                    case 22:
                    case "end":
                        return _context39.stop();
                }
            }
        }, _callee39, undefined, [[0, 20]]);
    }));

    return function getOpenSearchResultsForWater(_x72, _x73, _x74) {
        return _ref39.apply(this, arguments);
    };
}();

var getOpenSearchResultsForSewerage = exports.getOpenSearchResultsForSewerage = function () {
    var _ref40 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee40(queryObject, requestBody, dispatch) {
        var response, currentTime, result, locality, tenantId;
        return _regenerator2.default.wrap(function _callee40$(_context40) {
            while (1) {
                switch (_context40.prev = _context40.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        _context40.prev = 1;
                        _context40.next = 4;
                        return (0, _api.httpRequest)("post", "/sw-services/swc/_search", "_search", requestBody);

                    case 4:
                        response = _context40.sent;

                        if (!(response.SewerageConnections && response.SewerageConnections.length == 0)) {
                            _context40.next = 8;
                            break;
                        }

                        dispatch((0, _actions.toggleSpinner)());
                        return _context40.abrupt("return", response);

                    case 8:
                        currentTime = new Date().getTime();
                        result = findAndReplace(response, null, "NA"), locality = void 0, tenantId = void 0;

                        requestBody.forEach(function (value) {
                            if (value.key == "locality") {
                                locality = value.value;
                            } else if (value.key == "tenantId") {
                                tenantId = value.value;
                            }
                        });
                        _context40.next = 13;
                        return getPropertyObj(result.SewerageConnections, locality, tenantId);

                    case 13:
                        result.SewerageConnections = _context40.sent;

                        dispatch((0, _actions.toggleSpinner)());
                        return _context40.abrupt("return", result);

                    case 18:
                        _context40.prev = 18;
                        _context40.t0 = _context40["catch"](1);

                        dispatch((0, _actions.toggleSpinner)());

                    case 21:
                    case "end":
                        return _context40.stop();
                }
            }
        }, _callee40, undefined, [[1, 18]]);
    }));

    return function getOpenSearchResultsForSewerage(_x75, _x76, _x77) {
        return _ref40.apply(this, arguments);
    };
}();

var transformById = exports.transformById = function transformById(payload, id) {
    return payload && payload.reduce(function (result, item) {
        result[item[id]] = (0, _extends3.default)({}, item);

        return result;
    }, {});
};

var getLocaleLabels = exports.getLocaleLabels = function getLocaleLabels(label, labelKey, localizationLabels) {
    if (!localizationLabels) localizationLabels = transformById(JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)())), "code");
    if (labelKey) {
        label = labelKey;
    }
    if (label) {
        var translatedLabel = (0, _utils.getTranslatedLabel)(label, localizationLabels);
        if (!translatedLabel || label === translatedLabel) {
            return translatedLabel;
        } else {
            return translatedLabel;
        }
    } else {
        return label;
    }
};